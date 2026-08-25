import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const navbarSource = readFileSync(
  resolve(process.cwd(), "client/src/components/Navbar.tsx"),
  "utf8",
);

describe("navigation dropdown regression guard", () => {
  it("uses browser-native details controls for every desktop dropdown", () => {
    expect(navbarSource).toContain("<details\n                key={item.label}");
    expect(navbarSource).toContain('className="relative group"');

    for (const label of ["NEM 3.0", "Services", "About Us", "Locations", "Company"]) {
      expect(navbarSource).toContain(`label: "${label}"`);
    }
  });

  it("uses browser-native details controls for mobile dropdowns", () => {
    expect(navbarSource).toContain('<details key={label} className="border-b border-white/8 group">');
    expect(navbarSource).not.toContain("setOpenDropdown");
    expect(navbarSource).not.toContain("setMobileAccordion");
  });

  it("closes desktop dropdowns on mouse leave, outside click, and Escape", () => {
    expect(navbarSource).toContain('onMouseLeave={closeDesktopMenus}');
    expect(navbarSource).toContain('document.addEventListener("pointerdown", handleOutsidePointerDown)');
    expect(navbarSource).toContain('event.key === "Escape"');
    expect(navbarSource).toContain('if ((event.target as HTMLElement).closest("a")) closeDesktopMenus()');
  });
});
