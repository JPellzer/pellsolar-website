import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("shared visual asset reliability", () => {
  it("does not leave the Solar Repair hero tied to the removed WordPress image", () => {
    const source = readFileSync(
      path.resolve(process.cwd(), "client/src/pages/SolarRepair.tsx"),
      "utf8"
    );

    expect(source).not.toContain("/wp-content/uploads/2026/03/Modern-home-solar-with-car.jpg");
    expect(source).toContain('/manus-storage/solar-home-main-v2_0ad97127.jpg');
  });

  it("uses working location-query map embeds for California and Idaho service areas", () => {
    const california = readFileSync(
      path.resolve(process.cwd(), "client/src/pages/California.tsx"),
      "utf8"
    );
    const idaho = readFileSync(
      path.resolve(process.cwd(), "client/src/pages/Idaho.tsx"),
      "utf8"
    );

    expect(california).toContain("maps?q=Inland%20Empire%2C%20California&output=embed");
    expect(idaho).toContain("maps?q=Boise%2C%20Idaho&output=embed");
    expect(california).not.toContain("0x2c8e4e5c5a5a5a5a");
    expect(idaho).not.toContain("0x9f5a9d0b0b0b0b0b");
  });

  it("uses a cache-busted Powerwall image with a permanent fallback in the homepage NEM section", () => {
    const home = readFileSync(
      path.resolve(process.cwd(), "client/src/pages/Home.tsx"),
      "utf8"
    );

    expect(home).toContain("powerwall3-solar-meter_c7511143.png?v=20260819");
    expect(home).toContain("tesla-powerwall-house_f27a908c.jpeg?v=20260819");
    expect(home).not.toContain("powerwall-wall-mount_05bfd5f1.jpg");
  });

  it("shows the five user-provided authentic Powerwall installation assets on the Tesla Powerwall page", () => {
    const powerwall = readFileSync(
      path.resolve(process.cwd(), "client/src/pages/TeslaPowerwall.tsx"),
      "utf8"
    );

    expect(powerwall).toContain("Real Tesla Powerwall Installations");
    expect(powerwall).toContain("powerwall-exterior-finished_5ef809f3.webp");
    expect(powerwall).toContain("powerwall-exterior-side_13ec911c.webp");
    expect(powerwall).toContain("powerwall-garage-finished_f3ce548a.webp");
    expect(powerwall).toContain("powerwall-garage-detail_61b5ec4b.webp");
    expect(powerwall).toContain("powerwall-garage-dual_f641f620.webp");
  });

  it("uses Pell Solar’s verified public Powerwall video and permits public video and map frames", () => {
    const powerwall = readFileSync(
      path.resolve(process.cwd(), "client/src/pages/TeslaPowerwall.tsx"),
      "utf8"
    );
    const server = readFileSync(
      path.resolve(process.cwd(), "server/_core/index.ts"),
      "utf8"
    );

    expect(powerwall).toContain("https://www.youtube.com/embed/yzb6ols_ffE");
    expect(powerwall).not.toContain("https://www.youtube.com/embed/0mKoEBCRpJk");
    expect(server).toContain("frame-src 'self' https://challenges.cloudflare.com https://www.youtube.com https://www.youtube-nocookie.com https://www.google.com");
  });
});
