import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");
const sitemapPath = path.join(projectRoot, "client/public/sitemap.xml");
const outputPath = path.join(projectRoot, "reports/live-media-audit.json");
const csvPath = path.join(projectRoot, "reports/live-media-audit.csv");
const baseOrigin = process.env.AUDIT_ORIGIN || "https://pellsolar.com";
const timeoutMs = 15_000;

function absoluteUrl(value, pageUrl) {
  try {
    return new URL(value, pageUrl).href;
  } catch {
    return null;
  }
}

function extractUrls(html, pageUrl) {
  const urls = new Set();
  const attributePattern = /(?:src|poster)=["']([^"']+)["']/gi;
  const srcsetPattern = /srcset=["']([^"']+)["']/gi;
  const cssPattern = /url\((?:["']?)([^"')]+)(?:["']?)\)/gi;
  for (const pattern of [attributePattern, cssPattern]) {
    let match;
    while ((match = pattern.exec(html))) {
      const value = match[1].trim();
      if (!value || value.startsWith("data:") || value.startsWith("#") || value.startsWith("mailto:") || value.startsWith("tel:") || value.includes("${")) continue;
      const url = absoluteUrl(value, pageUrl);
      if (url) urls.add(url);
    }
  }
  let srcsetMatch;
  while ((srcsetMatch = srcsetPattern.exec(html))) {
    for (const candidate of srcsetMatch[1].split(",")) {
      const value = candidate.trim().split(/\s+/)[0];
      if (!value || value.startsWith("data:") || value.includes("${")) continue;
      const url = absoluteUrl(value, pageUrl);
      if (url) urls.add(url);
    }
  }
  return [...urls];
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { redirect: "follow", signal: controller.signal, ...options });
  } finally {
    clearTimeout(timer);
  }
}

async function pool(items, concurrency, worker) {
  const results = [];
  let cursor = 0;
  const workers = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (cursor < items.length) {
      const item = items[cursor++];
      results.push(await worker(item));
    }
  });
  await Promise.all(workers);
  return results;
}

const sitemap = await readFile(sitemapPath, "utf8");
const routes = [...sitemap.matchAll(/<loc>https:\/\/pellsolar\.com([^<]*)<\/loc>/g)].map((match) => match[1] || "/");
const pageUrls = [...new Set(routes)].map((route) => new URL(route, baseOrigin).href);

const pages = await pool(pageUrls, 8, async (pageUrl) => {
  try {
    const response = await fetchWithTimeout(pageUrl);
    const html = await response.text();
    return { pageUrl, status: response.status, assets: extractUrls(html, pageUrl), error: null };
  } catch (error) {
    return { pageUrl, status: null, assets: [], error: String(error) };
  }
});

const assetMap = new Map();
for (const page of pages) {
  for (const asset of page.assets) {
    if (!assetMap.has(asset)) assetMap.set(asset, new Set());
    assetMap.get(asset).add(page.pageUrl);
  }
}

const assets = await pool([...assetMap.entries()], 12, async ([assetUrl, pagesUsingAsset]) => {
  try {
    const response = await fetchWithTimeout(assetUrl, { method: "HEAD" });
    const needsFallback = response.status === 405 || response.status === 403;
    const finalResponse = needsFallback ? await fetchWithTimeout(assetUrl, { method: "GET" }) : response;
    return {
      assetUrl,
      status: finalResponse.status,
      contentType: finalResponse.headers.get("content-type") || "",
      pages: [...pagesUsingAsset],
      error: null,
    };
  } catch (error) {
    return { assetUrl, status: null, contentType: "", pages: [...pagesUsingAsset], error: String(error) };
  }
});

const failedPages = pages.filter((page) => page.status !== 200);
const failedAssets = assets.filter((asset) => !asset.status || asset.status >= 400);
const report = {
  auditedAt: new Date().toISOString(),
  origin: baseOrigin,
  totals: { pages: pages.length, assets: assets.length, failedPages: failedPages.length, failedAssets: failedAssets.length },
  failedPages,
  failedAssets,
  pages,
};

await writeFile(outputPath, JSON.stringify(report, null, 2));
const rows = [
  ["type", "url", "status", "content_type", "used_on", "error"],
  ...failedPages.map((page) => ["page", page.pageUrl, page.status ?? "", "", "", page.error ?? ""]),
  ...failedAssets.map((asset) => ["asset", asset.assetUrl, asset.status ?? "", asset.contentType, asset.pages.join(" | "), asset.error ?? ""]),
];
const escapeCsv = (value) => `"${String(value).replaceAll('"', '""')}"`;
await writeFile(csvPath, rows.map((row) => row.map(escapeCsv).join(",")).join("\n") + "\n");

console.log(JSON.stringify(report.totals));
