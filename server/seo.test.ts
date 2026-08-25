import { describe, expect, it } from "vitest";
import { getSeoMeta } from "../shared/seo";
import { activeTerritoryCities } from "../client/src/pages/cities/ActiveTerritoryCity";

describe("getSeoMeta", () => {
  it("returns the requested route-specific title and canonical for a city page", () => {
    const meta = getSeoMeta("/solar/rancho-cucamonga-ca");

    expect(meta.title).toBe("Solar Installation in Rancho Cucamonga, CA | Pell Solar");
    expect(meta.canonicalPath).toBe("/solar/rancho-cucamonga-ca");
    expect(meta.description).toContain("Rancho Cucamonga");
    expect(meta.noindex).toBeUndefined();
  });

  it("returns the Idaho-specific title required for the Treasure Valley page", () => {
    const meta = getSeoMeta("/idaho");

    expect(meta.title).toBe("Solar Installation in Boise & Treasure Valley, ID | Pell Solar");
    expect(meta.canonicalPath).toBe("/idaho");
  });

  it("gives the quote page a dedicated title and canonical rather than the homepage metadata", () => {
    const meta = getSeoMeta("/get-quote?utm_source=google");

    expect(meta.title).toBe("Get a Free Solar Quote | Pell Solar");
    expect(meta.canonicalPath).toBe("/get-quote");
  });

  it("keeps public utility pages crawlable rather than classifying them as 404s", () => {
    for (const path of ["/upload-bill", "/referral-program", "/solar-demo", "/sms-updates"]) {
      const meta = getSeoMeta(path);
      expect(meta.notFound).toBeUndefined();
      expect(meta.canonicalPath).toBe(path);
    }
  });

  it("keeps private admin routes out of search results", () => {
    const meta = getSeoMeta("/admin/chat/123");

    expect(meta.noindex).toBe(true);
    expect(meta.canonicalPath).toBeUndefined();
  });

  it("marks unknown routes as genuine 404s", () => {
    const meta = getSeoMeta("/this-route-does-not-exist");

    expect(meta.notFound).toBe(true);
  });

  it("keeps Upland and every active-LSA-territory city in the crawlable metadata registry", () => {
    const pages = Object.entries(activeTerritoryCities);

    expect(pages).toHaveLength(22);
    expect(activeTerritoryCities["upland-ca"]?.city).toBe("Upland");

    const titles = new Set<string>();
    for (const [slug, cityPage] of pages) {
      const meta = getSeoMeta(`/solar/${slug}`);
      expect(meta.notFound).toBeUndefined();
      expect(meta.title).toBe(`Solar Installation in ${cityPage.city}, CA | Pell Solar`);
      expect(meta.description).toContain(cityPage.city);
      expect(meta.canonicalPath).toBe(`/solar/${slug}`);
      titles.add(meta.title);
    }

    expect(titles.size).toBe(pages.length);
  });
});
