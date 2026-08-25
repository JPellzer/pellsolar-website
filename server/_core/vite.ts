import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";
import superjson from "superjson";
import { CANONICAL_ORIGIN, SITE_NAME, type SeoMeta } from "../../shared/seo";
import { getLocalBusinessJsonLd } from "../../shared/localBusiness";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

function buildHeadTags(head: SeoMeta, nonce: string): string {
  const title = escapeHtml(head.title);
  const description = escapeHtml(head.description);
  const canonical = head.canonicalPath ? `${CANONICAL_ORIGIN}${head.canonicalPath}` : "";
  const image = head.ogImage
    ? (head.ogImage.startsWith("http") ? head.ogImage : `${CANONICAL_ORIGIN}${head.ogImage}`)
    : "";
  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta property="og:type" content="${head.ogType ?? "website"}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta name="twitter:card" content="${image ? "summary_large_image" : "summary"}" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
  ];
  if (canonical) {
    tags.push(`<link rel="canonical" href="${escapeHtml(canonical)}" />`);
    tags.push(`<meta property="og:url" content="${escapeHtml(canonical)}" />`);
  }
  if (image) {
    tags.push(`<meta property="og:image" content="${escapeHtml(image)}" />`);
    tags.push(`<meta name="twitter:image" content="${escapeHtml(image)}" />`);
  }
  if (!head.noindex && !head.notFound) {
    tags.push(`<script nonce="${nonce}" type="application/ld+json">${getLocalBusinessJsonLd()}</script>`);
  }
  if (head.noindex || head.notFound) tags.push(`<meta name="robots" content="noindex, follow" />`);
  return tags.join("\n");
}

function composeHtml(template: string, appHtml: string, head: SeoMeta, dehydratedState: unknown, nonce = ""): string {
  const serialized = JSON.stringify(superjson.serialize(dehydratedState)).replace(/</g, "\\u003c");
  return template
    .replaceAll("%CSP_NONCE%", nonce)
    .replace("</body>", () => `<script nonce="${nonce}">window.__RQ_STATE__ = ${serialized}</script></body>`)
    .replace("<!--app-head-->", () => buildHeadTags(head, nonce))
    .replace("<!--app-html-->", () => appHtml);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/entry-client.tsx"`,
        `src="/src/entry-client.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");
      const { html, dehydratedState, head } = await render(url);
      res
        .status(head.notFound ? 404 : 200)
        .set({ "Content-Type": "text/html", "Cache-Control": "no-cache" })
        .end(composeHtml(page, html, head, dehydratedState, res.locals.cspNonce ?? ""));
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  app.use((req, res, next) => {
    if (req.path === "/index.html") return res.redirect(301, "/");
    if (req.path !== "/" && /\/+$/ .test(req.path)) {
      const query = req.originalUrl.slice(req.path.length);
      return res.redirect(301, (req.path.replace(/\/+$/, "") || "/") + query);
    }
    next();
  });

  app.use(express.static(distPath, { index: false, redirect: false }));

  app.use("*", async (req, res) => {
    const templatePath = path.resolve(distPath, "index.html");
    try {
      const template = await fs.promises.readFile(templatePath, "utf-8");
      const serverEntryPath = path.resolve(import.meta.dirname, "server-ssr", "entry-server.js");
      const { render } = await import(serverEntryPath);
      const { html, dehydratedState, head } = await render(req.originalUrl);
      res
        .status(head.notFound ? 404 : 200)
        .set({ "Content-Type": "text/html", "Cache-Control": "no-cache" })
        .end(composeHtml(template, html, head, dehydratedState, res.locals.cspNonce ?? ""));
    } catch (error) {
      console.error("[SSR] render failed; serving client shell", error);
      const template = await fs.promises.readFile(templatePath, "utf-8");
      const fallback: SeoMeta = { title: SITE_NAME, description: "Pell Solar solar and battery installation." };
      res.status(200).set({ "Content-Type": "text/html", "Cache-Control": "no-cache" }).end(
        template
          .replaceAll("%CSP_NONCE%", res.locals.cspNonce ?? "")
          .replace("<!--app-head-->", () => buildHeadTags(fallback, res.locals.cspNonce ?? ""))
      );
    }
  });
}
