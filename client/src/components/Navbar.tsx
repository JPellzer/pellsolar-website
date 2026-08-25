import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, Upload } from "lucide-react";

const LOGO = "/manus-storage/pell-logo-yellow_77e86543.png";
const REFERRAL_APP_URL = "https://pellsolar-crm-prod.onrender.com/app";
const REFERRAL_PAGE = "/referral-program";

// Dropdown items matching pellsolar.com exactly
const SERVICES_ITEMS = [
  { label: "Solar Systems", href: "/solar-panel-systems" },
  { label: "Financing", href: "/financing" },
  { label: "Leasing", href: "/solar-lease" },
  { label: "Batteries", href: "/battery-backup" },
  { label: "EV Charging", href: "/ev-charging" },
  { label: "Solar Service", href: "/solar-repair" },
  { label: "Upload Bill for Estimate", href: "/upload-bill" },
];

const ABOUT_ITEMS = [
  { label: "About Us", href: "/about" },
  { label: "Portfolio", href: "/our-work" },
  { label: "Customer Reviews", href: "/reviews" },
  { label: "Refer a Friend", href: "/refer" },
];

const LOCATIONS_ITEMS = [
  { label: "California", href: "/california" },
  { label: "Idaho", href: "/idaho" },
];

const COMPANY_ITEMS = [
  { label: "Admin Login", href: "/admin" },
  { label: "Team Login (CRM)", href: "https://pellsolar-crm-prod.onrender.com/" },
];

type DropItem = { label: string; href: string; desc?: string };

function DropdownItems({ items }: { items: DropItem[] }) {
  return (
    <>
      {items.map((item) => {
        const isExternal = item.href.startsWith("http");
        const inner = (
          <div className="px-4 py-2.5 hover:bg-[#0B1D51]/5 cursor-pointer transition-colors">
            <div className="text-sm text-gray-700 font-medium hover:text-[#0B1D51]">{item.label}</div>
            {item.desc && <div className="text-xs text-gray-400 mt-0.5">{item.desc}</div>}
          </div>
        );
        return isExternal ? (
          <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">{inner}</a>
        ) : (
          <Link key={item.label} href={item.href}>{inner}</Link>
        );
      })}
    </>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const desktopNavRef = useRef<HTMLDivElement>(null);

  const closeDesktopMenus = () => {
    desktopNavRef.current
      ?.querySelectorAll<HTMLDetailsElement>("details[open]")
      .forEach((menu) => menu.removeAttribute("open"));
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    closeDesktopMenus();
  }, [location]);

  useEffect(() => {
    const handleOutsidePointerDown = (event: PointerEvent) => {
      const desktopNav = desktopNavRef.current;
      if (desktopNav && !desktopNav.contains(event.target as Node)) {
        closeDesktopMenus();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDesktopMenus();
    };

    document.addEventListener("pointerdown", handleOutsidePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handleOutsidePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const isHome = location === "/";
  const isTransparent = isHome && !scrolled && !mobileOpen;

  // Nav items matching pellsolar.com exactly
  const navItems: { label: string; href?: string; dropdown?: DropItem[] }[] = [
    { label: "NEM 3.0", dropdown: [
      { label: "NEM 3.0 Explained", href: "/nem-3", desc: "How California's new solar rules work" },
      { label: "Interactive Solar Demo", href: "/solar-demo", desc: "See your solar system in action" },
    ] },
    { label: "Batteries", href: "/battery-backup" },
    { label: "Services", dropdown: SERVICES_ITEMS },
    { label: "Financing", href: "/financing" },
    { label: "About Us", dropdown: ABOUT_ITEMS },
    { label: "Locations", dropdown: LOCATIONS_ITEMS },
    { label: "Company", dropdown: COMPANY_ITEMS },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-300 ${
        isTransparent ? "bg-[#0B1D51]/80 backdrop-blur-sm" : "bg-[#0B1D51] shadow-lg"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center h-[84px] gap-2">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 mr-2">
            <img src={LOGO} alt="Pell Solar" className="h-20 w-auto object-contain" />
          </Link>

          {/* Desktop Nav — center items */}
          <div
            ref={desktopNavRef}
            className="hidden xl:flex items-center gap-0 flex-1"
            onMouseLeave={closeDesktopMenus}
            onClick={(event) => {
              if ((event.target as HTMLElement).closest("a")) closeDesktopMenus();
            }}
          >
            {navItems.map((item) => item.dropdown ? (
              <details
                key={item.label}
                className="relative group"
                onToggle={(event) => {
                  if (!event.currentTarget.open) return;
                  desktopNavRef.current
                    ?.querySelectorAll<HTMLDetailsElement>("details[open]")
                    .forEach((menu) => {
                      if (menu !== event.currentTarget) menu.removeAttribute("open");
                    });
                }}
              >
                <summary className="flex items-center gap-1 text-white/90 hover:text-white px-3 py-2 text-[13px] font-semibold transition-colors hover:bg-white/10 rounded whitespace-nowrap cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  {item.label}
                  <ChevronDown size={12} className="transition-transform group-open:rotate-180" />
                </summary>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2" style={{ zIndex: 1000 }}>
                  <div className="bg-white rounded-xl shadow-2xl border border-gray-100 py-2 min-w-[220px]">
                    <DropdownItems items={item.dropdown} />
                  </div>
                </div>
              </details>
            ) : (
              <Link
                key={item.label}
                href={item.href!}
                className="flex items-center text-white/90 hover:text-white px-3 py-2 text-[13px] font-semibold transition-colors hover:bg-white/10 rounded whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side — GET A QUOTE + UPLOAD A BILL */}
          <div className="hidden xl:flex items-center gap-2 ml-auto flex-shrink-0">
            <Link
              href="/get-quote"
              className="flex items-center gap-1.5 bg-[#FED44D] text-[#0B1D51] px-5 py-2.5 rounded font-extrabold text-[13px] tracking-wider shadow hover:bg-[#f5c800] transition-all whitespace-nowrap"
            >
              GET A QUOTE →
            </Link>
            <Link
              href="/upload-bill"
              className="flex items-center gap-1.5 bg-[#0B1D51] border border-[#2BABE2] text-[#2BABE2] px-4 py-2.5 rounded font-bold text-[13px] tracking-wider hover:bg-[#2BABE2]/10 transition-all whitespace-nowrap"
            >
              <Upload size={13} />
              UPLOAD A BILL
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="xl:hidden ml-auto text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="xl:hidden bg-[#0B1D51] border-t border-white/10 px-6 pb-6 pt-4 max-h-[85vh] overflow-y-auto">
          {/* Nav items */}
          {navItems.map(({ label, href, dropdown }) =>
            dropdown ? (
              <details key={label} className="border-b border-white/8 group">
                <summary className="flex items-center justify-between w-full py-3 text-white/90 text-base font-semibold cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  {label}
                  <ChevronDown
                    size={16}
                    className="transition-transform text-[#FED44D] group-open:rotate-180"
                  />
                </summary>
                <div className="pb-3 pl-4">
                  {dropdown.map((s) =>
                    s.href.startsWith("http") ? (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-white/60 py-2 text-sm hover:text-white transition-colors"
                      >
                        {s.label}
                      </a>
                    ) : (
                      <Link
                        key={s.label}
                        href={s.href}
                        className="block text-white/60 py-2 text-sm hover:text-white transition-colors"
                      >
                        {s.label}
                      </Link>
                    )
                  )}
                </div>
              </details>
            ) : (
              <Link
                key={label}
                href={href!}
                className="block text-white/90 py-3 text-base font-semibold border-b border-white/8"
              >
                {label}
              </Link>
            )
          )}

          {/* CTA buttons */}
          <div className="mt-4 flex flex-col gap-3">
            <Link
              href="/get-quote"
              className="block w-full text-center bg-[#FED44D] text-[#0B1D51] py-4 rounded font-extrabold text-base tracking-wide"
            >
              GET A QUOTE →
            </Link>
            <Link
              href="/upload-bill"
              className="block w-full text-center border border-[#2BABE2] text-[#2BABE2] py-3 rounded font-bold text-sm tracking-wide"
            >
              UPLOAD A BILL
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
