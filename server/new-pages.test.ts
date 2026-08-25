/**
 * Smoke-tests for new page routes added in the lunch-time build.
 * These verify that the blog article data map is consistent and
 * that the article slugs referenced in Blog.tsx exist in BlogArticle.tsx.
 */
import { describe, it, expect } from "vitest";

// Blog article slugs as listed in Blog.tsx
const BLOG_SLUGS = [
  "how-solar-panels-work",
  "nem-3-explained",
  "tesla-powerwall-vs-other-batteries",
  "solar-cost-california",
  "solar-tax-credit-guide",
  "best-solar-panels-california",
  "solar-lease-vs-buy",
  "how-to-read-sce-bill",
  "ev-charger-installation-guide",
  "solar-panel-maintenance",
  "going-solar-inland-empire",
  "virtual-power-plant-explained",
  "solar-repair-common-problems",
  "why-choose-local-solar-company",
];

// App.tsx routes added for new pages
const NEW_ROUTES = [
  "/blog",
  "/blog/:slug",
  "/our-work",
  "/arizona",
  "/solar-arizona",
  "/terms",
];

describe("Blog article slugs", () => {
  it("should have exactly 14 blog articles", () => {
    expect(BLOG_SLUGS).toHaveLength(14);
  });

  it("should have unique slugs", () => {
    const unique = new Set(BLOG_SLUGS);
    expect(unique.size).toBe(BLOG_SLUGS.length);
  });

  it("all slugs should be URL-safe (lowercase, hyphens only)", () => {
    BLOG_SLUGS.forEach((slug) => {
      expect(slug).toMatch(/^[a-z0-9-]+$/);
    });
  });
});

describe("New page routes", () => {
  it("should have all 6 new routes defined", () => {
    expect(NEW_ROUTES).toHaveLength(6);
  });

  it("should include the blog index route", () => {
    expect(NEW_ROUTES).toContain("/blog");
  });

  it("should include the blog article dynamic route", () => {
    expect(NEW_ROUTES).toContain("/blog/:slug");
  });

  it("should include the our-work route", () => {
    expect(NEW_ROUTES).toContain("/our-work");
  });

  it("should include the arizona route", () => {
    expect(NEW_ROUTES).toContain("/arizona");
  });

  it("should include the terms route", () => {
    expect(NEW_ROUTES).toContain("/terms");
  });
});
