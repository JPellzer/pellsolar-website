import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { renderToString } from "react-dom/server";
import { QueryClient, dehydrate, QueryClientProvider } from "@tanstack/react-query";
import { TRPCClientError, httpBatchLink } from "@trpc/client";
import { useLocation, Link, useSearch, useParams, useRoute, Switch, Route, Router } from "wouter";
import superjson from "superjson";
import { createTRPCReact } from "@trpc/react-query";
import * as React from "react";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { toast, Toaster } from "sonner";
import { ChevronDown, Upload, X, Menu, ArrowRight, CheckCircle, Phone, Image, FileText, Shield, Award, Users, Heart, Clock, MapPin, Mail, Sun, Plus, ImageIcon, Trash2, RefreshCw, XCircle, MessageCircle, Download, LogOut, Star, TrendingUp, BarChart3, ChevronRight, ArrowLeft, ExternalLink, Save, BookOpen, Calendar, Zap, Monitor, Wrench, Home as Home$1, Battery, AlertCircle, AlertTriangle, Bug, Settings, ChevronUp, Loader2, Bot, CheckCircle2, XIcon, PanelLeftIcon, LayoutDashboard, PanelLeft, Power, User, Send, Search, Check } from "lucide-react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
const trpc = createTRPCReact();
const SITE_NAME = "Pell Solar";
const DEFAULT_DESCRIPTION = "Solar panel and battery installation for homeowners across Southern California and Idaho. Request a free custom solar quote from Pell Solar.";
const OG_IMAGE = "/manus-storage/solar-home-main-v2_0ad97127.jpg";
const cityNames = {
  "anaheim-ca": "Anaheim",
  "bakersfield-ca": "Bakersfield",
  "baldwin-park-ca": "Baldwin Park",
  "brea-ca": "Brea",
  "burbank-ca": "Burbank",
  "chino-ca": "Chino",
  "chino-hills-ca": "Chino Hills",
  "corona-ca": "Corona",
  "el-monte-ca": "El Monte",
  "fontana-ca": "Fontana",
  "fresno-ca": "Fresno",
  "fullerton-ca": "Fullerton",
  "garden-grove-ca": "Garden Grove",
  "glendora-ca": "Glendora",
  "inland-empire-ca": "Inland Empire",
  "irvine-ca": "Irvine",
  "la-habra-ca": "La Habra",
  "lakewood-ca": "Lakewood",
  "lancaster-ca": "Lancaster",
  "long-beach-ca": "Long Beach",
  "los-angeles-ca": "Los Angeles",
  "murrieta-ca": "Murrieta",
  "ontario-ca": "Ontario",
  "orange-ca": "Orange",
  "palmdale-ca": "Palmdale",
  "pomona-ca": "Pomona",
  "rancho-cucamonga-ca": "Rancho Cucamonga",
  "riverside-ca": "Riverside",
  "san-bernardino-ca": "San Bernardino",
  "santa-ana-ca": "Santa Ana",
  "temecula-ca": "Temecula",
  "thousand-oaks-ca": "Thousand Oaks",
  "torrance-ca": "Torrance",
  "ventura-ca": "Ventura",
  "upland-ca": "Upland",
  "montclair-ca": "Montclair",
  "claremont-ca": "Claremont",
  "rialto-ca": "Rialto",
  "colton-ca": "Colton",
  "jurupa-valley-ca": "Jurupa Valley",
  "moreno-valley-ca": "Moreno Valley",
  "san-dimas-ca": "San Dimas",
  "la-verne-ca": "La Verne",
  "covina-ca": "Covina",
  "west-covina-ca": "West Covina",
  "eastvale-ca": "Eastvale",
  "norco-ca": "Norco",
  "redlands-ca": "Redlands",
  "highland-ca": "Highland",
  "loma-linda-ca": "Loma Linda",
  "bloomington-ca": "Bloomington",
  "grand-terrace-ca": "Grand Terrace",
  "hacienda-heights-ca": "Hacienda Heights",
  "walnut-ca": "Walnut",
  "diamond-bar-ca": "Diamond Bar",
  "azusa-ca": "Azusa"
};
const pageMeta = {
  "/": {
    title: "Solar & Battery Installation, Southern California & Idaho | Pell Solar",
    description: "Pell Solar designs and installs solar panels, home batteries, and EV charging for homeowners in Southern California and Idaho. Get a free custom quote.",
    canonicalPath: "/"
  },
  "/get-quote": {
    title: "Get a Free Solar Quote | Pell Solar",
    description: "Get a free custom solar and battery quote from Pell Solar. Share your home and energy needs to start designing a system for your household.",
    canonicalPath: "/get-quote"
  },
  "/about": {
    title: "About Pell Solar | Southern California Solar Company",
    description: "Learn about Pell Solar, a family-owned solar company serving Southern California and Idaho with solar panels, home batteries, and energy guidance.",
    canonicalPath: "/about"
  },
  "/reviews": {
    title: "Pell Solar Customer Reviews | Solar Installation Reviews",
    description: "Read customer feedback about Pell Solar’s solar panel, battery backup, and EV charging installations across Southern California and Idaho.",
    canonicalPath: "/reviews"
  },
  "/schedule": {
    title: "Schedule a Solar Consultation | Pell Solar",
    description: "Schedule a consultation with Pell Solar to discuss solar panels, battery backup, EV charging, and your home’s energy needs.",
    canonicalPath: "/schedule"
  },
  "/upload-bill": {
    title: "Upload Your Utility Bill for a Solar Estimate | Pell Solar",
    description: "Upload a utility bill or energy-use file so Pell Solar can prepare a more accurate solar and battery estimate for your home.",
    canonicalPath: "/upload-bill"
  },
  "/referral-program": {
    title: "Pell Solar Referral Program | Earn Referral Rewards",
    description: "Learn how to refer friends and family to Pell Solar and access the Pell Solar referral program.",
    canonicalPath: "/referral-program"
  },
  "/solar-demo": {
    title: "Interactive Solar & Battery Demo | Pell Solar",
    description: "See how a Pell Solar system can connect solar panels, battery storage, home energy use, and EV charging.",
    canonicalPath: "/solar-demo"
  },
  "/sms-updates": {
    title: "SMS Updates | Pell Solar",
    description: "Sign up to receive Pell Solar service and appointment updates by text message.",
    canonicalPath: "/sms-updates"
  },
  "/solar-panel-systems": {
    title: "Solar Panel Installation in Southern California | Pell Solar",
    description: "Explore custom residential solar panel systems from Pell Solar, including design, installation, monitoring, and energy production for Southern California homes.",
    canonicalPath: "/solar-panel-systems"
  },
  "/tesla-powerwall": {
    title: "Tesla Powerwall Installation in Southern California | Pell Solar",
    description: "Learn about Tesla Powerwall home battery installation from Pell Solar for backup power, solar self-consumption, and time-of-use energy management.",
    canonicalPath: "/tesla-powerwall"
  },
  "/battery-backup": {
    title: "Home Battery Backup in Southern California | Pell Solar",
    description: "Pell Solar installs home battery backup systems that store solar energy, support outage preparedness, and help manage peak electricity use.",
    canonicalPath: "/battery-backup"
  },
  "/ev-charging": {
    title: "EV Charger Installation in Southern California | Pell Solar",
    description: "Add convenient home EV charging with professional installation from Pell Solar, designed to work with your home electrical system and solar plans.",
    canonicalPath: "/ev-charging"
  },
  "/financing": {
    title: "Solar Financing Options in Southern California | Pell Solar",
    description: "Compare solar financing, leasing, and payment options with Pell Solar to find a solar and battery plan that fits your household budget.",
    canonicalPath: "/financing"
  },
  "/solar-repair": {
    title: "Solar Repair in Southern California | Pell Solar",
    description: "Get help with solar repair, system diagnostics, equipment issues, and service needs from Pell Solar in Southern California.",
    canonicalPath: "/solar-repair"
  },
  "/service-warranty": {
    title: "Solar Service & Warranty Support in Southern California | Pell Solar",
    description: "Learn about Pell Solar service and warranty support for solar panels, inverters, batteries, monitoring, and installed energy systems.",
    canonicalPath: "/service-warranty"
  },
  "/solar-lease": {
    title: "Solar Lease Options in Southern California | Pell Solar",
    description: "Explore solar lease options from Pell Solar for predictable monthly payments and professionally designed solar and battery systems.",
    canonicalPath: "/solar-lease"
  },
  "/nem-3": {
    title: "NEM 3.0 Solar & Battery Guide for Southern California | Pell Solar",
    description: "Understand California NEM 3.0 and why pairing solar with battery storage can help households use more of the energy they produce.",
    canonicalPath: "/nem-3"
  },
  "/california": {
    title: "Solar & Battery Installation in California | Pell Solar",
    description: "Pell Solar provides solar panel, battery backup, and EV charging solutions for homeowners throughout Southern California.",
    canonicalPath: "/california"
  },
  "/idaho": {
    title: "Solar Installation in Boise & Treasure Valley, ID | Pell Solar",
    description: "Pell Solar provides solar panel, battery backup, and EV charging solutions for homeowners in Boise, Meridian, Nampa, Eagle, Kuna, and Treasure Valley.",
    canonicalPath: "/idaho"
  },
  "/our-work": {
    title: "Solar Installation Projects in Southern California | Pell Solar",
    description: "Browse completed Pell Solar installations, including solar panels, home batteries, EV charging, and residential energy projects.",
    canonicalPath: "/our-work"
  },
  "/blog": {
    title: "Solar & Battery Insights | Pell Solar Blog",
    description: "Read practical solar, battery backup, EV charging, financing, and NEM 3.0 guidance for homeowners from Pell Solar.",
    canonicalPath: "/blog"
  },
  "/privacy-policy": {
    title: "Privacy Policy | Pell Solar",
    description: "Read Pell Solar’s privacy policy and information practices.",
    canonicalPath: "/privacy-policy"
  },
  "/terms": {
    title: "Terms & Conditions | Pell Solar",
    description: "Read the Pell Solar website terms and conditions.",
    canonicalPath: "/terms"
  }
};
const blogArticles = {
  "how-solar-panels-work": { title: "How Solar Panels Work: A Simple Guide for Homeowners", description: "Learn how solar panels convert sunlight into usable electricity, how inverters work, and how solar energy supports your home." },
  "nem-3-explained": { title: "NEM 3.0 Explained: What California Homeowners Need to Know", description: "Understand California NEM 3.0, solar export rates, and why battery storage matters for new solar homeowners." },
  "tesla-powerwall-vs-other-batteries": { title: "Tesla Powerwall vs. Other Home Batteries", description: "Compare Tesla Powerwall with other home battery options and learn which energy-storage features matter for your home." },
  "solar-cost-california": { title: "How Much Do Solar Panels Cost in California?", description: "Understand the factors that affect residential solar costs in California, including system size, equipment, energy use, and financing." },
  "solar-tax-credit-guide": { title: "Solar Tax Credit Guide for Homeowners", description: "Review the key considerations around solar incentives and tax-credit eligibility when planning a residential solar project." },
  "best-solar-panels-california": { title: "Best Solar Panels for California Homes", description: "Learn how panel efficiency, warranties, roof design, and monitoring features influence the right solar equipment for a California home." },
  "solar-lease-vs-buy": { title: "Solar Lease vs. Buy: Which Is Better?", description: "Compare solar lease and ownership options to understand monthly payments, long-term control, and the questions to ask before choosing." },
  "how-to-read-sce-bill": { title: "How to Read Your SCE Bill", description: "Learn how to review Southern California Edison bill details, energy use, and the information helpful for planning solar and battery storage." },
  "ev-charger-installation-guide": { title: "Home EV Charger Installation Guide", description: "Understand the planning, electrical requirements, and installation steps for adding a convenient home EV charger." },
  "solar-panel-maintenance": { title: "Solar Panel Maintenance Tips for Homeowners", description: "Learn practical ways to monitor solar performance, keep equipment maintained, and know when to request professional solar service." },
  "going-solar-inland-empire": { title: "Going Solar in the Inland Empire", description: "A local guide to solar panels, battery backup, utility bills, and energy planning for Inland Empire homeowners." },
  "virtual-power-plant-explained": { title: "Virtual Power Plants Explained", description: "Learn how virtual power plant programs can use connected home batteries to support the grid during periods of peak demand." },
  "solar-repair-common-problems": { title: "Common Solar Repair Problems and Fixes", description: "Understand common solar-system issues, warning signs, and when to contact a qualified professional for solar repair service." },
  "why-choose-local-solar-company": { title: "Why Choose a Local Solar Company?", description: "Learn how local solar expertise, permitting familiarity, service support, and accountability can shape your installation experience." }
};
function normalizePath(urlOrPath) {
  const path = urlOrPath.split("?")[0] || "/";
  return (path.replace(/\/+$/, "") || "/").toLowerCase();
}
function getSeoMeta(urlOrPath) {
  const path = normalizePath(urlOrPath);
  if (path.startsWith("/admin") || path === "/unsubscribe" || path === "/thank-you") {
    return { title: SITE_NAME, description: DEFAULT_DESCRIPTION, noindex: true };
  }
  const cityMatch = path.match(/^\/solar\/([^/]+)$/);
  if (cityMatch) {
    const city = cityNames[cityMatch[1]];
    if (city) {
      return {
        title: `Solar Installation in ${city}, CA | ${SITE_NAME}`,
        description: `Explore solar panel and battery installation options for homeowners in ${city}, California. Request a free custom solar quote from Pell Solar.`,
        canonicalPath: `/solar/${cityMatch[1]}`,
        ogImage: OG_IMAGE
      };
    }
  }
  const articleMatch = path.match(/^\/blog\/([^/]+)$/);
  if (articleMatch) {
    const article = blogArticles[articleMatch[1]];
    if (article) {
      return {
        title: `${article.title} | ${SITE_NAME}`,
        description: article.description,
        canonicalPath: `/blog/${articleMatch[1]}`,
        ogType: "article",
        ogImage: OG_IMAGE
      };
    }
  }
  const canonicalAliases = {
    "/refer": "/referral-program",
    "/upload-your-bill": "/upload-bill",
    "/solar-california": "/california",
    "/solar-idaho": "/idaho",
    "/solar-panels": "/solar-panel-systems",
    "/solar-financing": "/financing",
    "/nem-3-0": "/nem-3",
    "/terms-and-conditions": "/terms"
  };
  const canonicalPath = canonicalAliases[path] ?? path;
  const meta = pageMeta[canonicalPath];
  if (meta) return { ...meta, canonicalPath, ogImage: OG_IMAGE };
  return { title: `Page Not Found | ${SITE_NAME}`, description: DEFAULT_DESCRIPTION, notFound: true };
}
const LOGO$1 = "/manus-storage/pell-logo-yellow_77e86543.png";
const SERVICES_ITEMS = [
  { label: "Solar Systems", href: "/solar-panel-systems" },
  { label: "Financing", href: "/financing" },
  { label: "Leasing", href: "/solar-lease" },
  { label: "Batteries", href: "/battery-backup" },
  { label: "EV Charging", href: "/ev-charging" },
  { label: "Solar Service", href: "/solar-repair" },
  { label: "Upload Bill for Estimate", href: "/upload-bill" }
];
const ABOUT_ITEMS = [
  { label: "About Us", href: "/about" },
  { label: "Portfolio", href: "/our-work" },
  { label: "Customer Reviews", href: "/reviews" },
  { label: "Refer a Friend", href: "/refer" }
];
const LOCATIONS_ITEMS = [
  { label: "California", href: "/california" },
  { label: "Idaho", href: "/idaho" }
];
const COMPANY_ITEMS = [
  { label: "Admin Login", href: "/admin" },
  { label: "Team Login (CRM)", href: "https://pellsolar-crm-prod.onrender.com/" }
];
function DropdownItems({ items }) {
  return /* @__PURE__ */ jsx(Fragment, { children: items.map((item) => {
    const isExternal = item.href.startsWith("http");
    const inner = /* @__PURE__ */ jsxs("div", { className: "px-4 py-2.5 hover:bg-[#0B1D51]/5 cursor-pointer transition-colors", children: [
      /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-700 font-medium hover:text-[#0B1D51]", children: item.label }),
      item.desc && /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-400 mt-0.5", children: item.desc })
    ] });
    return isExternal ? /* @__PURE__ */ jsx("a", { href: item.href, target: "_blank", rel: "noopener noreferrer", children: inner }, item.label) : /* @__PURE__ */ jsx(Link, { href: item.href, children: inner }, item.label);
  }) });
}
function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const desktopNavRef = useRef(null);
  const closeDesktopMenus = () => {
    desktopNavRef.current?.querySelectorAll("details[open]").forEach((menu) => menu.removeAttribute("open"));
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
    const handleOutsidePointerDown = (event) => {
      const desktopNav = desktopNavRef.current;
      if (desktopNav && !desktopNav.contains(event.target)) {
        closeDesktopMenus();
      }
    };
    const handleKeyDown = (event) => {
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
  const navItems = [
    { label: "NEM 3.0", dropdown: [
      { label: "NEM 3.0 Explained", href: "/nem-3", desc: "How California's new solar rules work" },
      { label: "Interactive Solar Demo", href: "/solar-demo", desc: "See your solar system in action" }
    ] },
    { label: "Batteries", href: "/battery-backup" },
    { label: "Services", dropdown: SERVICES_ITEMS },
    { label: "Financing", href: "/financing" },
    { label: "About Us", dropdown: ABOUT_ITEMS },
    { label: "Locations", dropdown: LOCATIONS_ITEMS },
    { label: "Company", dropdown: COMPANY_ITEMS }
  ];
  return /* @__PURE__ */ jsxs(
    "nav",
    {
      className: `fixed top-0 left-0 right-0 z-[999] transition-all duration-300 ${isTransparent ? "bg-[#0B1D51]/80 backdrop-blur-sm" : "bg-[#0B1D51] shadow-lg"}`,
      children: [
        /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center h-[84px] gap-2", children: [
          /* @__PURE__ */ jsx(Link, { href: "/", className: "flex-shrink-0 mr-2", children: /* @__PURE__ */ jsx("img", { src: LOGO$1, alt: "Pell Solar", className: "h-20 w-auto object-contain" }) }),
          /* @__PURE__ */ jsx(
            "div",
            {
              ref: desktopNavRef,
              className: "hidden xl:flex items-center gap-0 flex-1",
              onMouseLeave: closeDesktopMenus,
              onClick: (event) => {
                if (event.target.closest("a")) closeDesktopMenus();
              },
              children: navItems.map((item) => item.dropdown ? /* @__PURE__ */ jsxs(
                "details",
                {
                  className: "relative group",
                  onToggle: (event) => {
                    if (!event.currentTarget.open) return;
                    desktopNavRef.current?.querySelectorAll("details[open]").forEach((menu) => {
                      if (menu !== event.currentTarget) menu.removeAttribute("open");
                    });
                  },
                  children: [
                    /* @__PURE__ */ jsxs("summary", { className: "flex items-center gap-1 text-white/90 hover:text-white px-3 py-2 text-[13px] font-semibold transition-colors hover:bg-white/10 rounded whitespace-nowrap cursor-pointer list-none [&::-webkit-details-marker]:hidden", children: [
                      item.label,
                      /* @__PURE__ */ jsx(ChevronDown, { size: 12, className: "transition-transform group-open:rotate-180" })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "absolute top-full left-1/2 -translate-x-1/2 pt-2", style: { zIndex: 1e3 }, children: /* @__PURE__ */ jsx("div", { className: "bg-white rounded-xl shadow-2xl border border-gray-100 py-2 min-w-[220px]", children: /* @__PURE__ */ jsx(DropdownItems, { items: item.dropdown }) }) })
                  ]
                },
                item.label
              ) : /* @__PURE__ */ jsx(
                Link,
                {
                  href: item.href,
                  className: "flex items-center text-white/90 hover:text-white px-3 py-2 text-[13px] font-semibold transition-colors hover:bg-white/10 rounded whitespace-nowrap",
                  children: item.label
                },
                item.label
              ))
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "hidden xl:flex items-center gap-2 ml-auto flex-shrink-0", children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                href: "/get-quote",
                className: "flex items-center gap-1.5 bg-[#FED44D] text-[#0B1D51] px-5 py-2.5 rounded font-extrabold text-[13px] tracking-wider shadow hover:bg-[#f5c800] transition-all whitespace-nowrap",
                children: "GET A QUOTE →"
              }
            ),
            /* @__PURE__ */ jsxs(
              Link,
              {
                href: "/upload-bill",
                className: "flex items-center gap-1.5 bg-[#0B1D51] border border-[#2BABE2] text-[#2BABE2] px-4 py-2.5 rounded font-bold text-[13px] tracking-wider hover:bg-[#2BABE2]/10 transition-all whitespace-nowrap",
                children: [
                  /* @__PURE__ */ jsx(Upload, { size: 13 }),
                  "UPLOAD A BILL"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "xl:hidden ml-auto text-white p-2",
              onClick: () => setMobileOpen(!mobileOpen),
              children: mobileOpen ? /* @__PURE__ */ jsx(X, { size: 26 }) : /* @__PURE__ */ jsx(Menu, { size: 26 })
            }
          )
        ] }) }),
        mobileOpen && /* @__PURE__ */ jsxs("div", { className: "xl:hidden bg-[#0B1D51] border-t border-white/10 px-6 pb-6 pt-4 max-h-[85vh] overflow-y-auto", children: [
          navItems.map(
            ({ label, href, dropdown }) => dropdown ? /* @__PURE__ */ jsxs("details", { className: "border-b border-white/8 group", children: [
              /* @__PURE__ */ jsxs("summary", { className: "flex items-center justify-between w-full py-3 text-white/90 text-base font-semibold cursor-pointer list-none [&::-webkit-details-marker]:hidden", children: [
                label,
                /* @__PURE__ */ jsx(
                  ChevronDown,
                  {
                    size: 16,
                    className: "transition-transform text-[#FED44D] group-open:rotate-180"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "pb-3 pl-4", children: dropdown.map(
                (s) => s.href.startsWith("http") ? /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: s.href,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "block text-white/60 py-2 text-sm hover:text-white transition-colors",
                    children: s.label
                  },
                  s.label
                ) : /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: s.href,
                    className: "block text-white/60 py-2 text-sm hover:text-white transition-colors",
                    children: s.label
                  },
                  s.label
                )
              ) })
            ] }, label) : /* @__PURE__ */ jsx(
              Link,
              {
                href,
                className: "block text-white/90 py-3 text-base font-semibold border-b border-white/8",
                children: label
              },
              label
            )
          ),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-col gap-3", children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                href: "/get-quote",
                className: "block w-full text-center bg-[#FED44D] text-[#0B1D51] py-4 rounded font-extrabold text-base tracking-wide",
                children: "GET A QUOTE →"
              }
            ),
            /* @__PURE__ */ jsx(
              Link,
              {
                href: "/upload-bill",
                className: "block w-full text-center border border-[#2BABE2] text-[#2BABE2] py-3 rounded font-bold text-sm tracking-wide",
                children: "UPLOAD A BILL"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function GoogleIcon({ size = 32 }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 48 48",
      style: { flexShrink: 0 },
      "aria-label": "Google",
      children: [
        /* @__PURE__ */ jsx("circle", { cx: "24", cy: "24", r: "24", fill: "#ffffff" }),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "#4285F4",
            d: "M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.5 6.5 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "#34A853",
            d: "M6.3 14.7l6.6 4.8C14.5 16.1 19 13 24 13c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.5 6.5 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "#FBBC05",
            d: "M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.4 35.6 26.8 36.5 24 36.5c-5.2 0-9.6-3.2-11.3-7.8l-6.6 5.1C9.6 39.6 16.3 44 24 44z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "#EA4335",
            d: "M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.3 4.1-4.2 5.4l6.2 5.2C37 38.2 44 33 44 24c0-1.2-.1-2.4-.4-3.5z"
          }
        )
      ]
    }
  );
}
function YelpIcon({ size = 32 }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 384 512",
      style: { flexShrink: 0 },
      "aria-label": "Yelp",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          fill: "#D32323",
          d: "M42.9 240.3l99.6 48.6c19.2 9.4 16.2 37.5-4.5 42.7L30.5 358.5c-3.2.8-6.4.9-9.6.3s-6.2-1.8-8.9-3.7-4.9-4.3-6.6-7.1-2.7-5.9-3.1-9.2c-3.3-28.8-.2-57.9 9-85.3 1-3.1 2.7-5.9 4.9-8.3s4.9-4.2 7.9-5.5 6.2-1.8 9.5-1.8 6.4.9 9.3 2.3zm44 239.3c23.8 16.3 50.9 27.3 79.4 32.1 3.2.6 6.5.4 9.6-.4s6.1-2.3 8.6-4.4 4.6-4.6 6-7.5 2.3-6.1 2.4-9.4l3.9-110.8c.7-21.3-25.5-31.9-39.8-16.1L82.8 445.5c-2.2 2.4-3.8 5.3-4.8 8.4s-1.3 6.4-.9 9.6 1.5 6.3 3.1 9.1 3.9 5.2 6.6 7zM232.2 369.7l58.8 94c1.7 2.8 4 5.1 6.8 6.9s5.8 3 9 3.5 6.5.3 9.7-.5 6.1-2.4 8.6-4.4c22.3-18.4 40.3-41.5 52.7-67.6 1.4-2.9 2.1-6.1 2.2-9.4s-.6-6.5-1.9-9.4-3.2-5.7-5.6-7.8-5.2-3.9-8.3-4.9L258.7 335.7c-20.3-6.5-37.8 15.8-26.5 33.9zM380.6 237.4c-11.5-26.5-28.7-50.2-50.4-69.3-2.4-2.1-5.3-3.7-8.4-4.7s-6.4-1.2-9.6-.8-6.3 1.5-9.1 3.2-5.1 4-6.9 6.7l-62 91.9c-11.9 17.7 4.7 40.6 25.2 34.7L366 268.6c3.1-.9 6-2.5 8.5-4.6s4.5-4.7 5.8-7.7 2.1-6.2 2.2-9.4-.6-6.5-1.9-9.5zM62.1 30.2c-2.8 1.4-5.4 3.3-7.4 5.7s-3.6 5.2-4.5 8.2-1.2 6.2-.9 9.3 1.3 6.1 2.9 8.9L156.3 242.6c11.7 20.2 42.6 11.9 42.6-11.4V22.9c0-3.1-.6-6.3-1.8-9.2s-3.1-5.5-5.4-7.6-5-3.8-8-4.8-6.1-1.4-9.3-1.2c-39 3.1-77 13.3-112.3 30.1z"
        }
      )
    }
  );
}
function YouTubeIcon({ size = 32 }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 48 48",
      style: { flexShrink: 0 },
      "aria-label": "YouTube",
      children: [
        /* @__PURE__ */ jsx("circle", { cx: "24", cy: "24", r: "24", fill: "#FF0000" }),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "white",
            d: "M33 24l-13 7.5V16.5L33 24z"
          }
        )
      ]
    }
  );
}
const CITY_LINKS = [
  { name: "Anaheim", href: "/solar/anaheim-ca" },
  { name: "Azusa", href: "/solar/azusa-ca" },
  { name: "Bakersfield", href: "/solar/bakersfield-ca" },
  { name: "Baldwin Park", href: "/solar/baldwin-park-ca" },
  { name: "Bloomington", href: "/solar/bloomington-ca" },
  { name: "Brea", href: "/solar/brea-ca" },
  { name: "Burbank", href: "/solar/burbank-ca" },
  { name: "Chino", href: "/solar/chino-ca" },
  { name: "Chino Hills", href: "/solar/chino-hills-ca" },
  { name: "Claremont", href: "/solar/claremont-ca" },
  { name: "Colton", href: "/solar/colton-ca" },
  { name: "Corona", href: "/solar/corona-ca" },
  { name: "Covina", href: "/solar/covina-ca" },
  { name: "Diamond Bar", href: "/solar/diamond-bar-ca" },
  { name: "Eastvale", href: "/solar/eastvale-ca" },
  { name: "El Monte", href: "/solar/el-monte-ca" },
  { name: "Fontana", href: "/solar/fontana-ca" },
  { name: "Fresno", href: "/solar/fresno-ca" },
  { name: "Fullerton", href: "/solar/fullerton-ca" },
  { name: "Garden Grove", href: "/solar/garden-grove-ca" },
  { name: "Glendora", href: "/solar/glendora-ca" },
  { name: "Grand Terrace", href: "/solar/grand-terrace-ca" },
  { name: "Hacienda Heights", href: "/solar/hacienda-heights-ca" },
  { name: "Highland", href: "/solar/highland-ca" },
  { name: "Inland Empire", href: "/solar/inland-empire-ca" },
  { name: "Irvine", href: "/solar/irvine-ca" },
  { name: "Jurupa Valley", href: "/solar/jurupa-valley-ca" },
  { name: "La Habra", href: "/solar/la-habra-ca" },
  { name: "La Verne", href: "/solar/la-verne-ca" },
  { name: "Lakewood", href: "/solar/lakewood-ca" },
  { name: "Lancaster", href: "/solar/lancaster-ca" },
  { name: "Loma Linda", href: "/solar/loma-linda-ca" },
  { name: "Long Beach", href: "/solar/long-beach-ca" },
  { name: "Los Angeles", href: "/solar/los-angeles-ca" },
  { name: "Montclair", href: "/solar/montclair-ca" },
  { name: "Moreno Valley", href: "/solar/moreno-valley-ca" },
  { name: "Murrieta", href: "/solar/murrieta-ca" },
  { name: "Norco", href: "/solar/norco-ca" },
  { name: "Ontario", href: "/solar/ontario-ca" },
  { name: "Orange", href: "/solar/orange-ca" },
  { name: "Palmdale", href: "/solar/palmdale-ca" },
  { name: "Pomona", href: "/solar/pomona-ca" },
  { name: "Rancho Cucamonga", href: "/solar/rancho-cucamonga-ca" },
  { name: "Redlands", href: "/solar/redlands-ca" },
  { name: "Rialto", href: "/solar/rialto-ca" },
  { name: "Riverside", href: "/solar/riverside-ca" },
  { name: "San Bernardino", href: "/solar/san-bernardino-ca" },
  { name: "San Dimas", href: "/solar/san-dimas-ca" },
  { name: "Santa Ana", href: "/solar/santa-ana-ca" },
  { name: "Temecula", href: "/solar/temecula-ca" },
  { name: "Thousand Oaks", href: "/solar/thousand-oaks-ca" },
  { name: "Torrance", href: "/solar/torrance-ca" },
  { name: "Upland", href: "/solar/upland-ca" },
  { name: "Ventura", href: "/solar/ventura-ca" },
  { name: "Walnut", href: "/solar/walnut-ca" },
  { name: "West Covina", href: "/solar/west-covina-ca" }
];
const LOGO = "/manus-storage/pell-logo-yellow_77e86543.png";
function Footer() {
  return /* @__PURE__ */ jsxs("footer", { style: { background: "#060f2e" }, className: "text-white", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 lg:px-12 py-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Link, { href: "/", className: "inline-block mb-3", children: /* @__PURE__ */ jsx("img", { src: LOGO, alt: "Pell Solar", className: "h-20 w-auto" }) }),
          /* @__PURE__ */ jsx("p", { className: "text-white/70 text-sm italic mb-5", children: "Let the Sun Shine In" }),
          /* @__PURE__ */ jsx("address", { className: "not-italic", children: /* @__PURE__ */ jsxs("ul", { className: "list-none p-0 m-0 flex flex-col gap-2.5 text-sm", children: [
            /* @__PURE__ */ jsx("li", { className: "text-white font-semibold tracking-wide", children: "Pell Solar Inc." }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-white/80", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[#2BABE2] mt-0.5", children: "📍" }),
              /* @__PURE__ */ jsx("span", { children: "1326 Monte Vista Ave #7, Upland, CA 91786" })
            ] }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: "tel:8666468499", className: "flex items-center gap-2 text-white/80 no-underline hover:text-[#FED44D] transition-colors", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[#2BABE2]", children: "📞" }),
              /* @__PURE__ */ jsx("span", { children: "(866) 646-8499 — Toll-Free" })
            ] }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: "tel:7144553401", className: "flex items-center gap-2 text-white/80 no-underline hover:text-[#FED44D] transition-colors", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[#2BABE2]", children: "📞" }),
              /* @__PURE__ */ jsx("span", { children: "(714) 455-3401 — California" })
            ] }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: "mailto:info@pellsolar.com", className: "flex items-center gap-2 text-white/80 no-underline hover:text-[#FED44D] transition-colors", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[#2BABE2]", children: "✉" }),
              /* @__PURE__ */ jsx("span", { children: "info@pellsolar.com" })
            ] }) }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2 text-white/70", children: [
              /* @__PURE__ */ jsx("span", { children: "🕐" }),
              /* @__PURE__ */ jsx("span", { children: "Mon - Sat: 8:00 AM - 5:00 PM" })
            ] }),
            /* @__PURE__ */ jsx("li", { className: "text-white/70 text-xs", children: "California Contractor License: CSLB #949122" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "text-white font-bold text-sm uppercase tracking-wider mb-5", children: "Quick Links" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-none p-0 m-0 flex flex-col gap-2.5", children: [
            [
              { href: "/", label: "Home" },
              { href: "/about", label: "About Us" },
              { href: "/financing", label: "Financing" },
              { href: "/nem-3", label: "NEM 3.0" },
              { href: "/solar-panel-systems", label: "Solar Systems" },
              { href: "/tesla-powerwall", label: "Tesla Powerwall" },
              { href: "/solar-lease", label: "Leasing" },
              { href: "/reviews", label: "Reviews" },
              { href: "/get-quote", label: "Get a Free Quote" }
            ].map(({ href, label }) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href, className: "text-white/80 no-underline text-sm hover:text-white transition-colors", children: label }) }, href)),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
              Link,
              {
                href: "/referral-program",
                className: "text-[#FED44D] no-underline text-sm font-semibold hover:text-white transition-colors",
                children: "⚡ Referral Program"
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "text-white font-bold text-sm uppercase tracking-wider mb-5", children: "Reviews" }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
            /* @__PURE__ */ jsxs("a", { href: "https://www.yelp.com/biz/pell-solar-ontario", target: "_blank", rel: "noopener noreferrer", className: "flex items-center gap-3 no-underline group", children: [
              /* @__PURE__ */ jsx(YelpIcon, { size: 36 }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "text-white font-bold text-sm group-hover:text-[#FED44D] transition-colors", children: "Yelp" }),
                /* @__PURE__ */ jsx("div", { className: "text-white/70 text-xs", children: "View current reviews on Yelp" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("a", { href: "https://www.google.com/search?q=pell+solar+reviews", target: "_blank", rel: "noopener noreferrer", className: "flex items-center gap-3 no-underline group", children: [
              /* @__PURE__ */ jsx(GoogleIcon, { size: 36 }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "text-white font-bold text-sm group-hover:text-[#FED44D] transition-colors", children: "Google" }),
                /* @__PURE__ */ jsx("div", { className: "text-white/70 text-xs", children: "View current reviews on Google" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("a", { href: "https://www.youtube.com/@PellSolar", target: "_blank", rel: "noopener noreferrer", className: "flex items-center gap-3 no-underline group", children: [
              /* @__PURE__ */ jsx(YouTubeIcon, { size: 36 }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "text-white font-bold text-sm group-hover:text-[#FED44D] transition-colors", children: "YouTube" }),
                /* @__PURE__ */ jsx("div", { className: "text-white/70 text-xs", children: "Watch our videos" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "text-white font-bold text-sm uppercase tracking-wider mb-5", children: "Service Areas" }),
          /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[#FED44D] font-bold text-sm mb-1", children: "Southern California" }),
            /* @__PURE__ */ jsx("p", { className: "text-white/80 text-sm leading-relaxed m-0", children: "Inland Empire, LA County, Orange County, San Bernardino, Riverside" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[#FED44D] font-bold text-sm mb-1", children: "Idaho" }),
            /* @__PURE__ */ jsx("p", { className: "text-white/80 text-sm leading-relaxed m-0", children: "Boise, Meridian, Nampa, Eagle, Kuna, Treasure Valley" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mt-10 pt-8 border-t border-white/10", "aria-labelledby": "footer-cities-heading", children: [
        /* @__PURE__ */ jsx("h4", { id: "footer-cities-heading", className: "text-white font-bold text-sm uppercase tracking-wider mb-4", children: "Cities We Serve" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-5 gap-y-1.5", children: CITY_LINKS.map(({ href, name }) => /* @__PURE__ */ jsx(
          Link,
          {
            href,
            className: "text-white/65 no-underline text-xs hover:text-white transition-colors leading-5",
            children: name
          },
          href
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "border-t border-white/10 py-5", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center gap-3", children: [
        /* @__PURE__ */ jsx("p", { className: "text-white/70 text-xs m-0 text-center md:text-left", children: "© 2026 Pell Solar Inc. All rights reserved. | Serving Southern California & Idaho" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-xs", children: [
          /* @__PURE__ */ jsx(Link, { href: "/privacy-policy", className: "text-white/60 no-underline hover:text-white/90 transition-colors", children: "Privacy Policy" }),
          /* @__PURE__ */ jsx("span", { className: "text-white/20", children: "|" }),
          /* @__PURE__ */ jsx(Link, { href: "/terms", className: "text-white/60 no-underline hover:text-white/90 transition-colors", children: "Terms & Conditions" }),
          /* @__PURE__ */ jsx("span", { className: "text-white/20", children: "|" }),
          /* @__PURE__ */ jsx(Link, { href: "/sms-updates", className: "text-white/60 no-underline hover:text-white/90 transition-colors", children: "SMS Updates" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: "/get-quote",
          className: "bg-[#FED44D] text-[#0B1D51] font-extrabold text-xs px-6 py-3 rounded-full no-underline hover:bg-[#f5c800] transition-colors uppercase tracking-wide",
          children: "GET YOUR FREE QUOTE"
        }
      )
    ] }) })
  ] });
}
function LiveReviewLinks({ tone = "light", className = "", compact = false }) {
  const { data: googleReview } = trpc.reviewSummary.google.useQuery(void 0, {
    staleTime: 6 * 60 * 60 * 1e3,
    retry: 1
  });
  const labelClass = tone === "dark" ? "text-white" : "text-gray-800";
  const detailClass = tone === "dark" ? "text-white/70" : "text-gray-500";
  const cardClass = compact ? "flex items-center gap-2 no-underline" : `flex items-center gap-3 rounded-lg no-underline ${tone === "dark" ? "" : "border border-gray-200 bg-white px-5 py-3 hover:shadow-md"}`;
  return /* @__PURE__ */ jsxs("div", { className: `flex flex-wrap items-center justify-center gap-4 ${className}`, children: [
    /* @__PURE__ */ jsxs("a", { href: "https://www.google.com/search?q=Pell+Solar+reviews", target: "_blank", rel: "noopener noreferrer", className: cardClass, children: [
      /* @__PURE__ */ jsx(GoogleIcon, { size: compact ? 30 : 24 }),
      /* @__PURE__ */ jsxs("span", { children: [
        /* @__PURE__ */ jsx("span", { className: `block font-bold text-sm ${labelClass}`, children: "Google Reviews" }),
        /* @__PURE__ */ jsx("span", { className: `block text-xs ${detailClass}`, children: googleReview ? `${googleReview.rating.toFixed(1)} · ${googleReview.reviewCount} current Google reviews` : "View current Google reviews" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("a", { href: "https://www.yelp.com/biz/pell-solar-ontario", target: "_blank", rel: "noopener noreferrer", className: cardClass, children: [
      /* @__PURE__ */ jsx(YelpIcon, { size: compact ? 30 : 24 }),
      /* @__PURE__ */ jsxs("span", { children: [
        /* @__PURE__ */ jsx("span", { className: `block font-bold text-sm ${labelClass}`, children: "Yelp Reviews" }),
        /* @__PURE__ */ jsx("span", { className: `block text-xs ${detailClass}`, children: "View current reviews on Yelp" })
      ] })
    ] })
  ] });
}
const REFERRAL_QR_IMG$1 = "/manus-storage/pell-solar-referral-qr_b0d91c44.png";
const REFERRAL_APP_URL$1 = "https://pellsolar-crm-prod.onrender.com/app";
const HERO_IMG$e = "/manus-storage/solar-home-main-v2_0ad97127.jpg";
const SOLAR_PANELS_IMG$1 = "/manus-storage/california-home_f656624c.jpg";
const POWERWALL_IMG$1 = "/manus-storage/powerwall3-solar-meter_c7511143.png?v=20260819";
const EV_IMG = "/manus-storage/ev-charger_9b89efa1.jpg";
const POWERWALL_WALL_IMG = "/manus-storage/powerwall3-solar-meter_c7511143.png?v=20260819";
const POWERWALL_FALLBACK_IMG$2 = "/manus-storage/tesla-powerwall-house_f27a908c.jpeg?v=20260819";
function RenterPopup({ onClose }) {
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", style: { background: "rgba(0,0,0,0.7)" }, children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center relative", children: [
    /* @__PURE__ */ jsx("button", { onClick: onClose, className: "absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none", children: "×" }),
    /* @__PURE__ */ jsx("div", { className: "text-5xl mb-4", children: "🏢" }),
    /* @__PURE__ */ jsx("h3", { className: "text-2xl font-extrabold text-[#0B1D51] mb-3", style: { fontFamily: "'Montserrat', sans-serif" }, children: "We Install for Homeowners" }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-4 leading-relaxed", children: "Solar installations require homeowner approval. If you're renting, you'll need your landlord's consent to install solar." }),
    /* @__PURE__ */ jsxs("div", { className: "bg-[#FED44D]/20 border border-[#FED44D] rounded-xl p-4 mb-6", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[#0B1D51] font-bold text-sm", children: "💰 Know a homeowner? Refer them and earn cash!" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm mt-1", children: "We pay referral bonuses for every installation that closes." })
    ] }),
    /* @__PURE__ */ jsx(
      "a",
      {
        href: "tel:8666468499",
        className: "block w-full bg-[#2BABE2] text-white font-bold py-3 rounded-xl hover:bg-[#1a9fd4] transition-colors text-sm no-underline mb-2",
        children: "Call Us — (866) 646-8499"
      }
    ),
    /* @__PURE__ */ jsx(
      "a",
      {
        href: "tel:7144553401",
        className: "block w-full bg-[#0B1D51] text-[#FED44D] font-bold py-2.5 rounded-xl hover:bg-[#162a6e] transition-colors text-sm no-underline mb-3",
        children: "CA Local — (714) 455-3401"
      }
    ),
    /* @__PURE__ */ jsx("button", { onClick: onClose, className: "text-gray-500 text-sm hover:text-gray-700 transition-colors", children: "Close" })
  ] }) });
}
function InlineQuoteWidget() {
  const [showRenterPopup, setShowRenterPopup] = useState(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    showRenterPopup && /* @__PURE__ */ jsx(RenterPopup, { onClose: () => setShowRenterPopup(false) }),
    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[520px] bg-white rounded-2xl shadow-2xl overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "px-6 py-5 text-center", style: { background: "linear-gradient(135deg, #2BABE2 0%, #1a7fc4 45%, #0f5fa0 100%)" }, children: [
        /* @__PURE__ */ jsx("p", { className: "text-white/80 text-xs uppercase tracking-widest font-semibold", children: "No Cost · No Obligation" }),
        /* @__PURE__ */ jsxs("h3", { className: "text-white text-xl font-extrabold mt-1.5", style: { fontFamily: "'Montserrat', sans-serif" }, children: [
          "How Much Can ",
          /* @__PURE__ */ jsx("span", { className: "text-[#FED44D]", children: "You" }),
          " Save?"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "p-4", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
        /* @__PURE__ */ jsxs(
          Link,
          {
            href: "/get-quote?ownership=own",
            className: "flex flex-col items-center justify-center gap-2 p-4 rounded-xl transition-all text-center no-underline hover:opacity-90 active:scale-95",
            style: { background: "#FED44D", border: "2px solid #F5A623", minHeight: "100px" },
            children: [
              /* @__PURE__ */ jsx("span", { className: "text-3xl", children: "🏠" }),
              /* @__PURE__ */ jsx("span", { className: "font-extrabold text-[#0B1D51] text-xs uppercase tracking-wide leading-tight", children: "I OWN MY HOME" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setShowRenterPopup(true),
            className: "flex flex-col items-center justify-center gap-2 p-4 rounded-xl transition-all text-center hover:opacity-90 active:scale-95",
            style: { background: "#2BABE2", border: "2px solid #1a9fd4", minHeight: "100px" },
            children: [
              /* @__PURE__ */ jsx("span", { className: "text-3xl", children: "🏢" }),
              /* @__PURE__ */ jsx("span", { className: "font-extrabold text-white text-xs uppercase tracking-wide leading-tight", children: "I'M RENTING" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Link,
          {
            href: "/solar-repair#service-form",
            className: "flex flex-col items-center justify-center gap-2 p-4 rounded-xl transition-all text-center no-underline hover:opacity-90 active:scale-95",
            style: { background: "#22C55E", border: "2px solid #16A34A", minHeight: "100px" },
            children: [
              /* @__PURE__ */ jsx("span", { className: "text-3xl", children: "🔧" }),
              /* @__PURE__ */ jsx("span", { className: "font-extrabold text-white text-xs uppercase tracking-wide leading-tight", children: "SERVICE CALL" })
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "px-4 pb-5 text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-xs mb-1", children: "Call Us 24/7 — Schedule a Consultation" }),
        /* @__PURE__ */ jsx("a", { href: "tel:8666468499", className: "text-[#2BABE2] font-extrabold text-xl hover:text-[#1a9fd4] transition-colors no-underline block", children: "(866) 646-8499" }),
        /* @__PURE__ */ jsxs("a", { href: "tel:7144553401", className: "text-[#0B1D51] font-bold text-sm hover:text-[#162a6e] transition-colors no-underline block mt-0.5", children: [
          "(714) 455-3401 ",
          /* @__PURE__ */ jsx("span", { className: "text-gray-400 font-normal", children: "CA Local" })
        ] })
      ] })
    ] })
  ] });
}
const faqs = [
  { q: "How long does installation take?", a: "Most residential systems are installed in 1–2 days. The complete process — from approval and site survey through permitting, installation, and SCE activation — typically takes 6–10 weeks total. We handle every step so you don't have to.", link: { text: "Get your free quote and we'll walk you through the timeline →", href: "/get-quote" } },
  { q: "Will solar panels void my roof warranty?", a: "No — a properly installed solar system will not void your roof warranty. We use industry-standard IronRidge racking and flashing systems that are engineered specifically to maintain your roof's weatherproofing.", link: { text: "Learn more about our solar panel systems →", href: "/solar-panel-systems" } },
  { q: "What happens if I sell my house?", a: "Solar increases your home's value. Homes with solar sell for an average of 3–4% more than comparable homes without solar. If you have a solar lease, the lease can be transferred to the new homeowner.", link: { text: "Explore your ownership and financing options →", href: "/financing" } },
  { q: "Is solar still worth it under NEM 3.0?", a: "Absolutely yes — when the system is designed correctly. The solution is pairing solar with a Tesla Powerwall battery. Store your energy and use it during peak hours (4–9 PM) when Edison charges the highest rates.", link: { text: "Read our full NEM 3.0 guide →", href: "/nem-3" } },
  { q: "How much does solar cost?", a: "Solar Lease ($0 down): Monthly payments start at $234/month for a 16-panel system with Tesla Powerwall. Financing: Purchase your system with a solar loan. Cash Purchase: The lowest total cost with a typical payback period of 5–8 years.", link: { text: "View our lease packages and pricing →", href: "/financing" } },
  { q: "Do I need a battery?", a: "Under NEM 3.0, a battery is essential for maximizing your savings. With a Tesla Powerwall 3, your excess solar energy is stored and used from 4–9 PM when Edison charges the highest rates.", link: { text: "Learn more about Tesla Powerwall 3 →", href: "/tesla-powerwall" } }
];
const steps = [
  { num: 1, title: "Quote & Approval", desc: "It all starts with a free consultation. We review your electricity bill, assess your roof using satellite imagery, and design a system sized specifically for your home. Once you decide to move forward, we get you approved for your preferred payment option — $0 down solar lease, financing, or cash.", timeline: "Same day to a few days for approval" },
  { num: 2, title: "Site Survey", desc: "Once approved, we schedule a professional site survey at your home. Our team verifies all roof measurements, identifies the best locations for your Tesla Powerwall battery, and evaluates your electrical panel.", timeline: "Scheduled within 1–2 weeks of approval" },
  { num: 3, title: "Engineering & Permits", desc: "After the site survey, we send you a contract to review and sign. Engineering usually takes 3–4 business days. We handle all city permitting — timelines vary from a few days to 2–6 weeks.", timeline: "2–6 weeks depending on city" },
  { num: 4, title: "Installation", desc: "Most residential systems are installed in 1–2 days. Our own licensed electricians and installers do every job — we never outsource. We pull permits and handle HOA.", timeline: "1–2 days on-site" },
  { num: 5, title: "Activation", desc: "After installation, we schedule a final building inspection. SCE typically takes 2–30 days to install the smart meter. Once installed and PTO is granted, your system is fully activated.", timeline: "2–30 days for SCE smart meter" }
];
function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white text-gray-900", style: { fontFamily: "'Inter', system-ui, sans-serif" }, children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs(
      "section",
      {
        className: "relative min-h-[90vh] flex items-center",
        style: { backgroundImage: `url(${HERO_IMG$e})`, backgroundSize: "cover", backgroundPosition: "center" },
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0", style: { background: "rgba(11,29,81,0.40)" } }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-7xl mx-auto px-6 py-28 flex flex-col items-center gap-8 w-full text-center", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-white max-w-3xl", children: [
              /* @__PURE__ */ jsx("div", { className: "inline-flex items-center gap-2 border border-white/40 text-white text-xs font-bold uppercase tracking-wider px-5 py-2 rounded-full mb-6", children: "Tesla Certified Installer · Family-Owned" }),
              /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl lg:text-[56px] font-extrabold leading-[1.1] mb-6", style: { fontFamily: "'Montserrat', sans-serif" }, children: [
                "Your Home Deserves Solar Done by People Who",
                " ",
                /* @__PURE__ */ jsx("span", { style: { color: "#FED44D" }, children: "Actually Care" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl text-white/80 mb-6 leading-relaxed max-w-2xl mx-auto", children: "We are not a national chain. We are a family business focused on helping homeowners evaluate solar and battery options for their properties." }),
              /* @__PURE__ */ jsx("div", { className: "inline-flex items-center gap-2 bg-[#FED44D] text-[#0B1D51] font-extrabold text-sm uppercase tracking-wide px-6 py-3 rounded-full mb-2", children: "$0 Down — Tax Credit Built Into Your Lease ▼" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center", children: /* @__PURE__ */ jsx(InlineQuoteWidget, {}) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx("section", { className: "bg-[#0B1D51] py-4 border-t border-white/10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center gap-6 md:gap-12 text-white text-sm", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Local Solar & Battery Team" }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "bg-[#E31937] text-white font-bold text-xs px-2 py-0.5 rounded", children: "TESLA" }),
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Certified" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Southern California & Idaho" }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "font-extrabold text-lg", style: { color: "#FED44D" }, children: "$0" }),
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Down Options" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "font-extrabold", style: { color: "#2BABE2" }, children: "#949122" }),
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Licensed Contractor" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-5 bg-white border-b border-gray-100", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center gap-5", children: /* @__PURE__ */ jsx(LiveReviewLinks, {}) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center max-w-3xl mx-auto mb-14", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-gray-900 mb-4", children: "What We Do" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg", children: "Custom-engineered solar, battery, and EV charging systems — designed and managed by our team from start to finish." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-8", children: [
        { img: SOLAR_PANELS_IMG$1, title: "Solar Panel Systems", desc: "Every system is custom-designed for your roof, your energy usage, and NEM 3.0. Premium panels with 25-year warranties.", href: "/solar-panel-systems" },
        { img: POWERWALL_IMG$1, fallback: POWERWALL_FALLBACK_IMG$2, title: "Tesla Powerwall Battery", desc: "Store your solar energy and power your home during peak hours. Whole-home backup when the grid goes down.", href: "/tesla-powerwall" },
        { img: EV_IMG, title: "EV Charger Installation", desc: "Level 2 Tesla Wall Connector and universal charger installs. Charge your car with free solar energy from your roof.", href: "/ev-charging" }
      ].map((card) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border border-gray-200 overflow-hidden card-hover", children: [
        /* @__PURE__ */ jsx("div", { className: "h-56 overflow-hidden", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: card.img,
            alt: card.title,
            className: "w-full h-full object-cover hover:scale-105 transition-transform duration-500",
            onError: card.fallback ? (event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = card.fallback;
            } : void 0
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-900 mb-3", children: card.title }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm leading-relaxed mb-4", children: card.desc }),
          /* @__PURE__ */ jsxs(Link, { href: card.href, className: "flex items-center gap-1 font-bold text-sm no-underline", style: { color: "#2BABE2" }, children: [
            "LEARN MORE ",
            /* @__PURE__ */ jsx(ArrowRight, { size: 14 })
          ] })
        ] })
      ] }, card.title)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-gray-50", children: /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto px-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row items-start gap-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-gray-900 mb-6", children: "The Tax Credit Didn't Disappear — It Moved Into Your Lease" }),
        /* @__PURE__ */ jsxs("div", { className: "text-gray-700 text-base leading-relaxed space-y-4", children: [
          /* @__PURE__ */ jsx("p", { children: "Even in 2026, the Federal Solar Tax Credit is still available — it just works differently depending on how you go solar. With a solar lease, the system is owned by the leasing provider, which allows them to claim the federal incentive on the hardware and installation." }),
          /* @__PURE__ */ jsx("p", { children: "That savings is then built directly into your lease structure, helping reduce your overall cost without requiring you to purchase the system upfront." }),
          /* @__PURE__ */ jsxs("p", { children: [
            "The result? You can go solar with ",
            /* @__PURE__ */ jsx("strong", { children: "$0 down" }),
            ", predictable monthly payments, and battery options available — while still benefiting from the federal incentive through the lease program."
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "border-l-4 border-[#2BABE2] bg-[#2BABE2]/10 rounded-r-xl p-4 mt-6 mb-6", children: /* @__PURE__ */ jsx("p", { className: "font-bold text-[#0B1D51] text-sm uppercase tracking-wide", children: "YOUR TAX CREDIT SAVINGS DIDN'T DISAPPEAR, THEY JUST MOVED!" }) }),
        /* @__PURE__ */ jsx(Link, { href: "/solar-lease", className: "btn-green inline-block", children: "SEE OUR $0 DOWN LEASE OPTIONS →" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 max-w-lg w-full", children: [
        /* @__PURE__ */ jsx("div", { className: "rounded-2xl overflow-hidden shadow-lg aspect-video", children: /* @__PURE__ */ jsx(
          "iframe",
          {
            src: "https://www.youtube.com/embed/lhsDln_0Lzc",
            title: "The Solar Tax Credit Is Gone — But There's a Loophole (2026)",
            allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
            allowFullScreen: true,
            className: "w-full h-full",
            style: { border: "none" }
          }
        ) }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-xs mt-2 text-center", children: "▶ Watch & Learn How It Works" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto px-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row items-center gap-12", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-1 max-w-md", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: POWERWALL_WALL_IMG,
          alt: "Tesla Powerwall 3",
          className: "w-full rounded-2xl shadow-lg",
          onError: (event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = POWERWALL_FALLBACK_IMG$2;
          }
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-gray-900 mb-6", children: "NEM 3.0 Changed the Game — But Solar Still Works" }),
        /* @__PURE__ */ jsxs("div", { className: "text-gray-700 text-base leading-relaxed space-y-4", children: [
          /* @__PURE__ */ jsxs("p", { children: [
            "Under California's new NEM 3.0 rules, the credits you get for sending solar energy back to the grid are much lower than before. That means ",
            /* @__PURE__ */ jsx("strong", { children: "solar panels alone are no longer enough" }),
            " to eliminate your bill."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            "The solution? Pair your panels with a ",
            /* @__PURE__ */ jsx("strong", { children: "Tesla Powerwall battery" }),
            ". Store your energy during the day and use it from 4–9 PM when Edison charges the most."
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "border-l-4 border-[#2BABE2] bg-[#2BABE2]/10 rounded-r-xl p-4 mt-4 mb-6", children: /* @__PURE__ */ jsxs("p", { className: "text-gray-800 text-sm", children: [
          /* @__PURE__ */ jsx("strong", { children: "Our approach:" }),
          " We build every system 25% bigger than your usage and pair it with a Powerwall. The goal is ",
          /* @__PURE__ */ jsx("strong", { children: "zero grid power during peak hours, every single day" }),
          "."
        ] }) }),
        /* @__PURE__ */ jsx(Link, { href: "/nem-3", className: "btn-green inline-block", children: "LEARN HOW NEM 3.0 WORKS →" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-14", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-gray-900 mb-4", children: "How Your Solar Home Works" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg max-w-2xl mx-auto", children: "A Pell Solar system works around the clock — generating power, storing it, and protecting you from peak rates and outages." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10", children: [
        { img: "/manus-storage/how-it-works-1-panels_9b6c6456.jpg", step: "1", time: "7am – 4pm", title: "Panels Generate Power", desc: "Your solar panels produce clean electricity all day. Excess energy charges your Powerwall battery automatically.", color: "#facc15" },
        { img: "/manus-storage/how-it-works-2-battery_fcab8965.jpg", step: "2", time: "All Day", title: "Battery Charges Up", desc: "Your Tesla Powerwall 3 stores the solar energy your home doesn't use immediately — ready for when you need it most.", color: "#22c55e" },
        { img: "/manus-storage/how-it-works-3-peak_8b018b6c.jpg", step: "3", time: "4pm – 9pm", title: "Battery Beats Peak Rates", desc: "Edison charges up to 47¢/kWh during peak hours. Your Powerwall kicks in automatically so you pay $0 to the grid.", color: "#f97316" },
        { img: "/manus-storage/how-it-works-4-backup_586e5b35.jpg", step: "4", time: "Any Time", title: "Whole-Home Backup", desc: "If the grid goes down, your Powerwall keeps your entire home running — lights, AC, refrigerator — without interruption.", color: "#60a5fa" }
      ].map((card) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border border-gray-200 overflow-hidden card-hover", children: [
        /* @__PURE__ */ jsxs("div", { className: "h-44 overflow-hidden relative", children: [
          /* @__PURE__ */ jsx("img", { src: card.img, alt: card.title, className: "w-full h-full object-cover hover:scale-105 transition-transform duration-500" }),
          /* @__PURE__ */ jsxs("div", { className: "absolute top-3 left-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-[#0B1D51]", style: { background: card.color }, children: card.step }),
            /* @__PURE__ */ jsx("span", { className: "text-white text-xs font-bold bg-black/50 rounded-full px-2 py-0.5 backdrop-blur-sm", children: card.time })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-extrabold text-gray-900 text-base mb-2", children: card.title }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm leading-relaxed", children: card.desc })
        ] })
      ] }, card.step)) }),
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx(Link, { href: "/solar-demo", className: "btn-navy inline-block mr-4", children: "▶ WATCH INTERACTIVE DEMO" }),
        /* @__PURE__ */ jsx(Link, { href: "/get-quote?ownership=own", className: "btn-green inline-block", children: "GET MY FREE QUOTE" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16", style: { background: "#2BABE2" }, children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-white mb-4", children: "See How Much You Can Save" }),
      /* @__PURE__ */ jsx("p", { className: "text-white/80 text-lg mb-8 max-w-2xl mx-auto", children: "Every system is custom-designed based on your roof, your usage, and your goals. Get a free estimate in minutes." }),
      /* @__PURE__ */ jsx(Link, { href: "/get-quote", className: "btn-gold inline-block text-lg px-10 py-4", children: "GET YOUR FREE QUOTE" })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-gray-900 mb-4", children: "Your Solar Journey — Step by Step" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg", children: "Click each step to see exactly what happens. We handle everything from start to finish." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-3 mb-10", children: steps.map((s, i) => /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setActiveStep(i),
          className: "flex items-center gap-2 px-5 py-3 rounded-lg font-bold text-sm transition-all",
          style: {
            background: activeStep === i ? "#0B1D51" : "#f3f4f6",
            color: activeStep === i ? "white" : "#374151"
          },
          children: [
            /* @__PURE__ */ jsx(
              "span",
              {
                className: "w-7 h-7 rounded-full flex items-center justify-center text-xs font-black",
                style: {
                  background: activeStep === i ? "#FED44D" : "#d1d5db",
                  color: activeStep === i ? "#0B1D51" : "#6b7280"
                },
                children: s.num
              }
            ),
            s.title
          ]
        },
        i
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto bg-white rounded-2xl p-8 border border-gray-200 shadow-sm", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-gray-900 mb-4", children: [
          "Step ",
          steps[activeStep].num,
          ": ",
          steps[activeStep].title
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed mb-4", children: steps[activeStep].desc }),
        /* @__PURE__ */ jsx("div", { className: "border-l-4 border-[#2BABE2] pl-4", children: /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-sm", children: [
          /* @__PURE__ */ jsx("strong", { children: "Timeline:" }),
          " ",
          steps[activeStep].timeline
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-center mt-8", children: /* @__PURE__ */ jsx(Link, { href: "/get-quote", className: "btn-green inline-block", children: "GET STARTED — IT'S FREE" }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-14", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-gray-900 mb-4", children: "Solar + Battery Packages — $0 Down" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg max-w-2xl mx-auto", children: "Two plans designed to fit your home and your energy bill. All include Tesla Powerwall 3, Smart Meter, full installation, and a 25-year warranty." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8 max-w-4xl mx-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border border-gray-200 p-8 card-hover", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-extrabold text-gray-900 mb-1", children: "Solar Shield" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm mb-4", children: "For homes with SCE bills around $320/mo" }),
          /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsx("span", { className: "text-4xl font-black text-gray-900", children: "$234" }),
            /* @__PURE__ */ jsx("span", { className: "text-gray-500 text-lg", children: "/mo" })
          ] }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-2.5 mb-8", children: ["16 Solar Panels", "1 Tesla Powerwall 3 (13.5 kWh)", "1 Tesla Smart Meter", "Peak-hour grid protection (4–9pm)", "25-Year Full System Warranty", "25-Year Battery Warranty", "Professional Installation", "Permitting and Inspections", "24/7 Monitoring via Tesla App"].map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-sm text-gray-700", children: [
            /* @__PURE__ */ jsx(CheckCircle, { size: 16, style: { color: "#2BABE2", marginTop: "2px", flexShrink: 0 } }),
            item
          ] }, i)) }),
          /* @__PURE__ */ jsx(Link, { href: "/get-quote", className: "btn-navy w-full block text-center", children: "Get This Package" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-8 card-hover relative", style: { border: "2px solid #2BABE2" }, children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -top-3 left-1/2 -translate-x-1/2 text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full", style: { background: "#2BABE2" }, children: "Most Popular" }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-extrabold text-gray-900 mb-1", children: "Solar Shield+" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm mb-4", children: "For homes with SCE bills around $580/mo" }),
          /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsx("span", { className: "text-4xl font-black text-gray-900", children: "$307" }),
            /* @__PURE__ */ jsx("span", { className: "text-gray-500 text-lg", children: "/mo" })
          ] }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-2.5 mb-8", children: ["32 Solar Panels", "1 Tesla Powerwall 3 (13.5 kWh)", "1 Tesla Smart Meter", "Peak-hour grid protection (4–9pm)", "25-Year Full System Warranty", "25-Year Battery Warranty", "Professional Installation", "Permitting and Inspections", "24/7 Monitoring via Tesla App"].map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-sm text-gray-700", children: [
            /* @__PURE__ */ jsx(CheckCircle, { size: 16, style: { color: "#2BABE2", marginTop: "2px", flexShrink: 0 } }),
            item
          ] }, i)) }),
          /* @__PURE__ */ jsx(Link, { href: "/get-quote", className: "btn-green w-full block text-center", children: "Get This Package" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-center text-gray-500 text-sm mt-6", children: "*Final system size and pricing based on site evaluation." }),
      /* @__PURE__ */ jsx("div", { className: "text-center mt-4", children: /* @__PURE__ */ jsx(Link, { href: "/financing", className: "font-bold hover:underline transition-colors", style: { color: "#2BABE2" }, children: "VIEW FULL PACKAGE DETAILS →" }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto px-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row items-center gap-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-gray-900 mb-6", children: "Tesla Powerwall 3" }),
        /* @__PURE__ */ jsxs("div", { className: "text-gray-700 text-base leading-relaxed space-y-4", children: [
          /* @__PURE__ */ jsxs("p", { children: [
            "Keep your home powered during outages with the ",
            /* @__PURE__ */ jsx("strong", { children: "Tesla Powerwall 3" }),
            " — a compact battery with an integrated solar inverter that delivers seamless backup protection and increased energy savings."
          ] }),
          /* @__PURE__ */ jsx("p", { children: "A single unit can power your entire home during a grid outage, automatically switching on without delay. It stores excess solar energy, lowers your electricity bills, and is built to withstand extreme weather." }),
          /* @__PURE__ */ jsxs("p", { children: [
            "As a ",
            /* @__PURE__ */ jsx("strong", { children: "Tesla Certified Installer" }),
            ", Pell Solar handles every step — from design and permitting to professional installation."
          ] })
        ] }),
        /* @__PURE__ */ jsx(Link, { href: "/tesla-powerwall", className: "btn-green mt-8 inline-block", children: "LEARN ABOUT POWERWALL →" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 max-w-md", children: /* @__PURE__ */ jsx("img", { src: POWERWALL_IMG$1, alt: "Tesla Powerwall 3", className: "w-full rounded-2xl shadow-lg" }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-gray-900 mb-3", children: "What Our Customers Say" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-base", children: "Read current, independently published customer feedback from Google and Yelp." })
      ] }),
      /* @__PURE__ */ jsx(LiveReviewLinks, { className: "mb-8" }),
      /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx(Link, { href: "/reviews", className: "btn-green", children: "READ CUSTOMER FEEDBACK →" }) })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "py-20 relative overflow-hidden", style: { background: "linear-gradient(135deg, #0B1D51 0%, #0f2a6b 50%, #0B1D51 100%)" }, children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none", style: { background: "radial-gradient(circle, rgba(254,212,77,0.10) 0%, transparent 70%)", transform: "translate(30%, -30%)" } }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-72 h-72 rounded-full pointer-events-none", style: { background: "radial-gradient(circle, rgba(43,171,226,0.10) 0%, transparent 70%)", transform: "translate(-30%, 30%)" } }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-6 relative z-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-14", children: [
          /* @__PURE__ */ jsx("div", { className: "inline-flex items-center gap-2 border text-xs font-bold uppercase tracking-widest px-5 py-2 rounded-full mb-6", style: { borderColor: "rgba(254,212,77,0.4)", background: "rgba(254,212,77,0.12)", color: "#FED44D" }, children: "⚡ Referral Program" }),
          /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5", style: { fontFamily: "'Montserrat', sans-serif" }, children: [
            "Know Someone Who Needs Solar?",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { style: { color: "#FED44D" }, children: "Earn Up to $2,000 Cash." })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg max-w-xl mx-auto leading-relaxed", style: { color: "rgba(255,255,255,0.72)" }, children: "Our customers are our best salespeople. Sign up free, share your personal link, and get paid when your friends go solar — no selling required." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-10 items-start", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-widest mb-4", style: { color: "rgba(255,255,255,0.45)" }, children: "How much you earn" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 rounded-2xl p-5 mb-4 transition-colors", style: { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }, children: [
              /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl", style: { background: "rgba(254,212,77,0.18)" }, children: "☀️" }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsx("div", { className: "font-bold text-white text-base", children: "Solar + Battery System" }),
                /* @__PURE__ */ jsx("div", { className: "text-sm", style: { color: "rgba(255,255,255,0.55)" }, children: "Friend installs panels + Powerwall" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "font-extrabold text-xl whitespace-nowrap", style: { fontFamily: "'Montserrat', sans-serif", color: "#FED44D" }, children: "$500–$2,000" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 rounded-2xl p-5 mb-4 transition-colors", style: { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }, children: [
              /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl", style: { background: "rgba(43,171,226,0.18)" }, children: "🔋" }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsx("div", { className: "font-bold text-white text-base", children: "Battery-Only Install" }),
                /* @__PURE__ */ jsx("div", { className: "text-sm", style: { color: "rgba(255,255,255,0.55)" }, children: "Friend adds a Powerwall to existing solar" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "font-extrabold text-xl whitespace-nowrap", style: { fontFamily: "'Montserrat', sans-serif", color: "#FED44D" }, children: "$250–$500" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs leading-relaxed mb-8", style: { color: "rgba(255,255,255,0.35)" }, children: "Reward scales with system size. Paid after installation is complete. No limit on how many friends you can refer." }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-2xl p-5", style: { background: "rgba(254,212,77,0.08)", border: "1px solid rgba(254,212,77,0.22)" }, children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed italic mb-3", style: { color: "rgba(255,255,255,0.80)" }, children: `"I referred my neighbor and got a check in the mail two months later. Easiest $500 I've ever made."` }),
              /* @__PURE__ */ jsx("p", { className: "text-sm font-bold", style: { color: "#FED44D" }, children: "— Michael P., Fontana CA" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-8 mt-10 pt-8", style: { borderTop: "1px solid rgba(255,255,255,0.10)" }, children: [
              { num: "90%", label: "of our business\ncomes from referrals" },
              { num: "$0", label: "cost to join\nthe program" },
              { num: "$2K", label: "max reward\nper referral" }
            ].map((s) => /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "font-extrabold text-3xl", style: { fontFamily: "'Montserrat', sans-serif", color: "#FED44D" }, children: s.num }),
              /* @__PURE__ */ jsx("div", { className: "text-xs mt-1 leading-relaxed", style: { color: "rgba(255,255,255,0.50)" }, children: s.label })
            ] }, s.num)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-3xl p-8 text-center", style: { boxShadow: "0 24px 60px rgba(0,0,0,0.28)" }, children: [
            /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5", style: { background: "linear-gradient(135deg, #2BABE2 0%, #0B1D51 100%)", boxShadow: "0 8px 24px rgba(43,171,226,0.35)" }, children: "☀️" }),
            /* @__PURE__ */ jsxs("h3", { className: "text-xl font-extrabold text-gray-900 mb-3", style: { fontFamily: "'Montserrat', sans-serif" }, children: [
              "Join the Pell Solar",
              /* @__PURE__ */ jsx("br", {}),
              "Referral Program"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 leading-relaxed mb-6", children: "Create your free account in 2 minutes. Get your personal referral link and track every referral in real time." }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-3 mb-7 text-left", children: [
              { n: "1", text: /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("strong", { className: "text-gray-900", children: "Sign up free" }),
                " — takes 2 minutes, no credit card"
              ] }) },
              { n: "2", text: /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("strong", { className: "text-gray-900", children: "Get your link" }),
                " — share by text, email, or social media"
              ] }) },
              { n: "3", text: /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("strong", { className: "text-gray-900", children: "Get paid" }),
                " — we send your reward when the job is done"
              ] }) }
            ].map((step) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0 mt-0.5", style: { background: "#2BABE2" }, children: step.n }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 leading-relaxed", children: step.text })
            ] }, step.n)) }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center mb-6", children: [
              /* @__PURE__ */ jsx("div", { className: "rounded-2xl p-3 mb-2", style: { background: "#f8fafc", border: "1px solid #e5e7eb" }, children: /* @__PURE__ */ jsx("img", { src: REFERRAL_QR_IMG$1, alt: "Scan to join Pell Solar Referral Program", className: "w-32 h-32" }) }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 font-medium", children: "📱 Point your phone camera here to sign up" })
            ] }),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: REFERRAL_APP_URL$1,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "block w-full font-extrabold text-sm text-white py-4 rounded-2xl mb-3 transition-all hover:opacity-90 no-underline",
                style: { background: "linear-gradient(135deg, #2BABE2 0%, #1a7fc4 100%)", letterSpacing: ".04em" },
                children: "CREATE MY FREE ACCOUNT →"
              }
            ),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-400", children: [
              "Already have an account?",
              " ",
              /* @__PURE__ */ jsx("a", { href: REFERRAL_APP_URL$1, target: "_blank", rel: "noopener noreferrer", className: "font-semibold no-underline hover:underline", style: { color: "#2BABE2" }, children: "Log in here" })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-gray-900 mb-3", children: "Common Questions" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-base", children: "Straight answers to the questions we hear most." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: faqs.map((faq, i) => /* @__PURE__ */ jsxs("div", { className: "border border-gray-200 rounded-xl overflow-hidden", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setOpenFaq(openFaq === i ? null : i),
            className: "w-full flex items-center justify-between px-6 py-4 text-left font-bold text-gray-900 hover:bg-gray-50 transition-colors",
            children: [
              faq.q,
              /* @__PURE__ */ jsx("span", { className: "text-2xl font-light ml-4", style: { color: "#2BABE2" }, children: openFaq === i ? "−" : "+" })
            ]
          }
        ),
        openFaq === i && /* @__PURE__ */ jsxs("div", { className: "px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100", children: [
          /* @__PURE__ */ jsx("p", { className: "mt-4", children: faq.a }),
          faq.link && /* @__PURE__ */ jsx(Link, { href: faq.link.href, className: "mt-3 inline-block font-semibold text-sm no-underline hover:underline", style: { color: "#2BABE2" }, children: faq.link.text })
        ] })
      ] }, i)) })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const API_KEY = void 0;
const FORGE_BASE_URL = "https://forge.butterfly-effect.dev";
const MAPS_PROXY_URL = `${FORGE_BASE_URL}/v1/maps/proxy`;
function loadMapsScript() {
  if (window.google?.maps?.places) return Promise.resolve();
  if (window._mapsScriptLoading) return window._mapsScriptLoading;
  window._mapsScriptLoading = new Promise((resolve, reject) => {
    const existing = document.querySelector("script[data-maps-proxy]");
    if (existing) {
      existing.addEventListener("load", () => resolve());
      return;
    }
    const script = document.createElement("script");
    script.src = `${MAPS_PROXY_URL}/maps/api/js?key=${API_KEY}&v=weekly&libraries=marker,places,geocoding,geometry`;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-maps-proxy", "true");
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Maps"));
    document.head.appendChild(script);
  });
  return window._mapsScriptLoading;
}
function AddressAutocomplete({
  value,
  onChange,
  placeholder = "Start typing your address…",
  className = "",
  style,
  id,
  required
}) {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let cancelled = false;
    loadMapsScript().then(() => {
      if (!cancelled) setReady(true);
    }).catch(console.error);
    return () => {
      cancelled = true;
    };
  }, []);
  useEffect(() => {
    if (!ready || !inputRef.current) return;
    if (autocompleteRef.current) return;
    const ac = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ["address"],
      componentRestrictions: { country: "us" },
      fields: ["formatted_address", "address_components"]
    });
    ac.addListener("place_changed", () => {
      const place = ac.getPlace();
      if (!place.address_components) return;
      const get = (type) => place.address_components.find((c) => c.types.includes(type))?.long_name ?? "";
      const getShort = (type) => place.address_components.find((c) => c.types.includes(type))?.short_name ?? "";
      const streetNumber = get("street_number");
      const route = get("route");
      const city = get("locality") || get("sublocality") || get("neighborhood") || get("administrative_area_level_2");
      const state = getShort("administrative_area_level_1");
      const zip = get("postal_code");
      const street = [streetNumber, route].filter(Boolean).join(" ");
      const full = place.formatted_address ?? `${street}, ${city}, ${state} ${zip}`;
      onChange(full, { street, city, state, zip, full });
    });
    autocompleteRef.current = ac;
  }, [ready, onChange]);
  return /* @__PURE__ */ jsx(
    "input",
    {
      ref: inputRef,
      id,
      type: "text",
      value,
      onChange: (e) => onChange(e.target.value, { street: e.target.value, city: "", state: "", zip: "", full: e.target.value }),
      placeholder,
      className,
      style,
      required,
      autoComplete: "off"
    }
  );
}
const INLAND_EMPIRE_ZIPS = /* @__PURE__ */ new Set([
  // San Bernardino County
  "91701",
  "91702",
  "91708",
  "91709",
  "91710",
  "91711",
  "91730",
  "91737",
  "91739",
  "91740",
  "91741",
  "91743",
  "91750",
  "91752",
  "91758",
  "91759",
  "91761",
  "91762",
  "91763",
  "91764",
  "91765",
  "91766",
  "91767",
  "91768",
  "91769",
  "91773",
  "91784",
  "91785",
  "91786",
  "91789",
  "91790",
  "91791",
  "91792",
  "91793",
  "92301",
  "92304",
  "92305",
  "92307",
  "92308",
  "92309",
  "92310",
  "92311",
  "92312",
  "92313",
  "92314",
  "92315",
  "92316",
  "92317",
  "92318",
  "92320",
  "92321",
  "92322",
  "92323",
  "92324",
  "92325",
  "92326",
  "92327",
  "92328",
  "92329",
  "92331",
  "92332",
  "92333",
  "92334",
  "92335",
  "92336",
  "92337",
  "92338",
  "92339",
  "92340",
  "92341",
  "92342",
  "92344",
  "92345",
  "92346",
  "92347",
  "92350",
  "92352",
  "92354",
  "92356",
  "92357",
  "92358",
  "92359",
  "92363",
  "92364",
  "92365",
  "92366",
  "92368",
  "92369",
  "92371",
  "92372",
  "92373",
  "92374",
  "92375",
  "92376",
  "92377",
  "92378",
  "92382",
  "92385",
  "92386",
  "92391",
  "92392",
  "92393",
  "92394",
  "92395",
  "92397",
  "92398",
  "92399",
  "92401",
  "92402",
  "92403",
  "92404",
  "92405",
  "92406",
  "92407",
  "92408",
  "92410",
  "92411",
  "92412",
  "92413",
  "92414",
  "92415",
  "92418",
  "92423",
  "92424",
  "92427",
  // Riverside County
  "91752",
  "92201",
  "92202",
  "92203",
  "92210",
  "92211",
  "92220",
  "92223",
  "92225",
  "92226",
  "92230",
  "92234",
  "92235",
  "92236",
  "92239",
  "92240",
  "92241",
  "92242",
  "92247",
  "92248",
  "92249",
  "92250",
  "92251",
  "92252",
  "92253",
  "92254",
  "92255",
  "92256",
  "92257",
  "92258",
  "92260",
  "92261",
  "92262",
  "92263",
  "92264",
  "92270",
  "92274",
  "92275",
  "92276",
  "92277",
  "92278",
  "92280",
  "92281",
  "92282",
  "92283",
  "92284",
  "92285",
  "92286",
  "92292",
  "92501",
  "92502",
  "92503",
  "92504",
  "92505",
  "92506",
  "92507",
  "92508",
  "92509",
  "92513",
  "92514",
  "92515",
  "92516",
  "92517",
  "92518",
  "92519",
  "92521",
  "92522",
  "92530",
  "92531",
  "92532",
  "92536",
  "92539",
  "92543",
  "92544",
  "92545",
  "92546",
  "92548",
  "92549",
  "92551",
  "92552",
  "92553",
  "92554",
  "92555",
  "92556",
  "92557",
  "92561",
  "92562",
  "92563",
  "92564",
  "92567",
  "92570",
  "92571",
  "92572",
  "92581",
  "92582",
  "92583",
  "92584",
  "92585",
  "92586",
  "92587",
  "92589",
  "92590",
  "92591",
  "92592",
  "92593",
  "92595",
  "92596"
]);
const LA_COUNTY_ZIPS = /* @__PURE__ */ new Set([
  "90001",
  "90002",
  "90003",
  "90004",
  "90005",
  "90006",
  "90007",
  "90008",
  "90010",
  "90011",
  "90012",
  "90013",
  "90014",
  "90015",
  "90016",
  "90017",
  "90018",
  "90019",
  "90020",
  "90021",
  "90022",
  "90023",
  "90024",
  "90025",
  "90026",
  "90027",
  "90028",
  "90029",
  "90031",
  "90032",
  "90033",
  "90034",
  "90035",
  "90036",
  "90037",
  "90038",
  "90039",
  "90040",
  "90041",
  "90042",
  "90043",
  "90044",
  "90045",
  "90046",
  "90047",
  "90048",
  "90049",
  "90056",
  "90057",
  "90058",
  "90059",
  "90061",
  "90062",
  "90063",
  "90064",
  "90065",
  "90066",
  "90067",
  "90068",
  "90069",
  "90071",
  "90077",
  "90089",
  "90094",
  "90095",
  "90210",
  "90211",
  "90212",
  "90230",
  "90232",
  "90245",
  "90247",
  "90248",
  "90249",
  "90250",
  "90254",
  "90255",
  "90260",
  "90261",
  "90262",
  "90265",
  "90266",
  "90270",
  "90272",
  "90274",
  "90275",
  "90277",
  "90278",
  "90280",
  "90290",
  "90291",
  "90292",
  "90293",
  "90301",
  "90302",
  "90303",
  "90304",
  "90305",
  "90401",
  "90402",
  "90403",
  "90404",
  "90405",
  "90501",
  "90502",
  "90503",
  "90504",
  "90505",
  "90506",
  "90601",
  "90602",
  "90603",
  "90604",
  "90605",
  "90606",
  "90620",
  "90621",
  "90623",
  "90630",
  "90631",
  "90638",
  "90640",
  "90650",
  "90660",
  "90670",
  "90680",
  "90701",
  "90703",
  "90706",
  "90710",
  "90712",
  "90713",
  "90715",
  "90716",
  "90717",
  "90720",
  "90723",
  "90731",
  "90732",
  "90740",
  "90744",
  "90745",
  "90746",
  "90755",
  "90802",
  "90803",
  "90804",
  "90805",
  "90806",
  "90807",
  "90808",
  "90810",
  "90813",
  "90814",
  "90815",
  "90822",
  "90831",
  "91001",
  "91006",
  "91007",
  "91010",
  "91011",
  "91016",
  "91020",
  "91024",
  "91030",
  "91040",
  "91042",
  "91101",
  "91103",
  "91104",
  "91105",
  "91106",
  "91107",
  "91108",
  "91201",
  "91202",
  "91203",
  "91204",
  "91205",
  "91206",
  "91207",
  "91208",
  "91210",
  "91214",
  "91301",
  "91302",
  "91303",
  "91304",
  "91306",
  "91307",
  "91311",
  "91316",
  "91320",
  "91321",
  "91324",
  "91325",
  "91326",
  "91330",
  "91331",
  "91335",
  "91340",
  "91342",
  "91343",
  "91344",
  "91345",
  "91350",
  "91351",
  "91352",
  "91354",
  "91355",
  "91356",
  "91360",
  "91361",
  "91362",
  "91364",
  "91367",
  "91371",
  "91381",
  "91384",
  "91387",
  "91390",
  "91401",
  "91402",
  "91403",
  "91405",
  "91406",
  "91411",
  "91423",
  "91436",
  "91501",
  "91502",
  "91503",
  "91504",
  "91505",
  "91506",
  "91601",
  "91602",
  "91604",
  "91605",
  "91606",
  "91607",
  "91608",
  "91702",
  "91706",
  "91722",
  "91723",
  "91724",
  "91731",
  "91732",
  "91733",
  "91744",
  "91745",
  "91746",
  "91748",
  "91754",
  "91755",
  "91770",
  "91775",
  "91776",
  "91780",
  "91801",
  "91803"
]);
const ORANGE_COUNTY_ZIPS = /* @__PURE__ */ new Set([
  "90620",
  "90621",
  "90623",
  "90630",
  "90631",
  "90638",
  "90680",
  "90720",
  "90740",
  "92602",
  "92603",
  "92604",
  "92606",
  "92610",
  "92612",
  "92614",
  "92615",
  "92617",
  "92618",
  "92620",
  "92624",
  "92625",
  "92626",
  "92627",
  "92628",
  "92629",
  "92630",
  "92637",
  "92646",
  "92647",
  "92648",
  "92649",
  "92651",
  "92652",
  "92653",
  "92654",
  "92655",
  "92656",
  "92657",
  "92658",
  "92659",
  "92660",
  "92661",
  "92662",
  "92663",
  "92672",
  "92673",
  "92674",
  "92675",
  "92676",
  "92677",
  "92678",
  "92679",
  "92683",
  "92684",
  "92685",
  "92688",
  "92691",
  "92692",
  "92693",
  "92694",
  "92697",
  "92698",
  "92701",
  "92702",
  "92703",
  "92704",
  "92705",
  "92706",
  "92707",
  "92708",
  "92711",
  "92712",
  "92728",
  "92735",
  "92780",
  "92781",
  "92782",
  "92799",
  "92801",
  "92802",
  "92803",
  "92804",
  "92805",
  "92806",
  "92807",
  "92808",
  "92809",
  "92811",
  "92812",
  "92814",
  "92815",
  "92816",
  "92817",
  "92821",
  "92822",
  "92823",
  "92831",
  "92832",
  "92833",
  "92834",
  "92835",
  "92836",
  "92837",
  "92838",
  "92840",
  "92841",
  "92842",
  "92843",
  "92844",
  "92845",
  "92846",
  "92850",
  "92856",
  "92857",
  "92859",
  "92861",
  "92862",
  "92863",
  "92864",
  "92865",
  "92866",
  "92867",
  "92868",
  "92869",
  "92870",
  "92871",
  "92885",
  "92886",
  "92887"
]);
const IDAHO_ZIPS = /* @__PURE__ */ new Set([
  // Boise
  "83701",
  "83702",
  "83703",
  "83704",
  "83705",
  "83706",
  "83707",
  "83708",
  "83709",
  "83711",
  "83712",
  "83713",
  "83714",
  "83715",
  "83716",
  "83717",
  "83718",
  "83719",
  "83720",
  "83722",
  "83725",
  "83726",
  "83728",
  "83729",
  // Meridian
  "83642",
  "83646",
  "83680",
  // Eagle
  "83616",
  // Nampa
  "83651",
  "83652",
  "83653",
  "83686",
  "83687",
  // Caldwell
  "83605",
  "83606",
  "83607",
  // Kuna
  "83634",
  // Star
  "83669",
  // Garden City
  "83714",
  // Middleton
  "83644",
  // Emmett
  "83617",
  // Mountain Home
  "83647",
  // Twin Falls
  "83301",
  "83303",
  // Pocatello
  "83201",
  "83202",
  "83204",
  "83205",
  "83206",
  // Idaho Falls
  "83401",
  "83402",
  "83403",
  "83404",
  "83405",
  // Coeur d'Alene
  "83814",
  "83815",
  "83816"
]);
const ARIZONA_ZIPS = /* @__PURE__ */ new Set([
  // Phoenix metro
  "85001",
  "85002",
  "85003",
  "85004",
  "85005",
  "85006",
  "85007",
  "85008",
  "85009",
  "85010",
  "85011",
  "85012",
  "85013",
  "85014",
  "85015",
  "85016",
  "85017",
  "85018",
  "85019",
  "85020",
  "85021",
  "85022",
  "85023",
  "85024",
  "85025",
  "85026",
  "85027",
  "85028",
  "85029",
  "85030",
  "85031",
  "85032",
  "85033",
  "85034",
  "85035",
  "85036",
  "85037",
  "85038",
  "85040",
  "85041",
  "85042",
  "85043",
  "85044",
  "85045",
  "85048",
  "85050",
  "85051",
  "85053",
  "85054",
  "85083",
  "85085",
  "85086",
  "85087",
  // Scottsdale
  "85250",
  "85251",
  "85252",
  "85253",
  "85254",
  "85255",
  "85256",
  "85257",
  "85258",
  "85259",
  "85260",
  "85261",
  "85262",
  "85266",
  "85267",
  "85268",
  // Tempe / Mesa / Chandler / Gilbert
  "85201",
  "85202",
  "85203",
  "85204",
  "85205",
  "85206",
  "85207",
  "85208",
  "85209",
  "85210",
  "85212",
  "85213",
  "85215",
  "85224",
  "85225",
  "85226",
  "85233",
  "85234",
  "85236",
  "85244",
  "85246",
  "85248",
  "85249",
  "85284",
  "85285",
  "85286",
  "85295",
  "85296",
  "85297",
  "85298",
  "85299",
  // Glendale / Peoria / Surprise
  "85301",
  "85302",
  "85303",
  "85304",
  "85305",
  "85306",
  "85307",
  "85308",
  "85309",
  "85310",
  "85311",
  "85312",
  "85318",
  "85320",
  "85323",
  "85326",
  "85331",
  "85335",
  "85338",
  "85339",
  "85340",
  "85342",
  "85345",
  "85351",
  "85353",
  "85354",
  "85355",
  "85357",
  "85358",
  "85361",
  "85363",
  "85372",
  "85373",
  "85374",
  "85375",
  "85376",
  "85377",
  "85378",
  "85379",
  "85380",
  "85381",
  "85382",
  "85383",
  "85385",
  "85387",
  "85388",
  "85390",
  "85392",
  "85395",
  "85396",
  // Tucson
  "85701",
  "85702",
  "85703",
  "85704",
  "85705",
  "85706",
  "85707",
  "85708",
  "85709",
  "85710",
  "85711",
  "85712",
  "85713",
  "85714",
  "85715",
  "85716",
  "85717",
  "85718",
  "85719",
  "85720",
  "85721",
  "85722",
  "85723",
  "85724",
  "85725",
  "85726",
  "85728",
  "85730",
  "85731",
  "85732",
  "85733",
  "85734",
  "85735",
  "85736",
  "85737",
  "85738",
  "85739",
  "85740",
  "85741",
  "85742",
  "85743",
  "85744",
  "85745",
  "85746",
  "85747",
  "85748",
  "85749",
  "85750",
  "85751",
  "85752",
  "85754",
  "85755",
  "85756",
  "85757",
  "85775"
]);
const SERVICE_AREA_ZIPS = /* @__PURE__ */ new Set([
  ...Array.from(INLAND_EMPIRE_ZIPS),
  ...Array.from(LA_COUNTY_ZIPS),
  ...Array.from(ORANGE_COUNTY_ZIPS),
  ...Array.from(IDAHO_ZIPS),
  ...Array.from(ARIZONA_ZIPS)
]);
function isInServiceArea(zip) {
  return SERVICE_AREA_ZIPS.has(zip.trim());
}
function getServiceAreaLabel(zip) {
  const z = zip.trim();
  if (INLAND_EMPIRE_ZIPS.has(z)) return "Inland Empire, CA";
  if (LA_COUNTY_ZIPS.has(z)) return "Los Angeles County, CA";
  if (ORANGE_COUNTY_ZIPS.has(z)) return "Orange County, CA";
  if (IDAHO_ZIPS.has(z)) return "Idaho";
  if (ARIZONA_ZIPS.has(z)) return "Arizona";
  return "";
}
const ATTRIBUTION_SESSION_KEY = "pell-solar:attribution";
const ATTRIBUTION_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid"];
function clean(value) {
  const trimmed = value?.trim();
  return trimmed || void 0;
}
function getSessionStorage() {
  if (typeof window === "undefined") return void 0;
  try {
    return window.sessionStorage;
  } catch {
    return void 0;
  }
}
function extractAttribution(search) {
  const params = typeof search === "string" ? new URLSearchParams(search) : search;
  return ATTRIBUTION_KEYS.reduce((result, key) => {
    const value = clean(params.get(key));
    if (value) result[key] = value;
    return result;
  }, {});
}
function readSessionAttribution(storage = getSessionStorage()) {
  if (!storage) return {};
  try {
    const parsed = JSON.parse(storage.getItem(ATTRIBUTION_SESSION_KEY) || "{}");
    return ATTRIBUTION_KEYS.reduce((result, key) => {
      const value = clean(parsed[key]);
      if (value) result[key] = value;
      return result;
    }, {});
  } catch {
    return {};
  }
}
function captureAttribution(search, storage = getSessionStorage()) {
  const captured = extractAttribution(search);
  const existing = readSessionAttribution(storage);
  const combined = { ...existing, ...captured };
  if (storage && Object.keys(captured).length > 0) {
    try {
      storage.setItem(ATTRIBUTION_SESSION_KEY, JSON.stringify(combined));
    } catch {
    }
  }
  return combined;
}
function hasAttribution(data) {
  return Object.values(data).some(Boolean);
}
function deriveLeadSource(defaultSource, attribution) {
  const gclid = clean(attribution?.gclid);
  const utmSource = clean(attribution?.utm_source);
  if (gclid || utmSource?.toLowerCase() === "google") return "google-ads";
  return utmSource || defaultSource;
}
const HERO_IMG$d = "/manus-storage/solar-home-main-v2_0ad97127.jpg";
const LOGO_URL = "/manus-storage/pell-logo-yellow_77e86543.png";
function OptionBtn({
  selected,
  onClick,
  icon,
  label,
  sub,
  color = "yellow"
}) {
  const colorMap = {
    yellow: {
      bg: selected ? "#e8c000" : "#FED44D",
      border: selected ? "#c9a800" : "#F5A623",
      text: "#0B1D51",
      subText: "#555",
      shadow: "rgba(254,212,77,0.4)"
    },
    cyan: {
      bg: selected ? "#1a9fd4" : "#2BABE2",
      border: selected ? "#1588b5" : "#1a9fd4",
      text: "#ffffff",
      subText: "rgba(255,255,255,0.8)",
      shadow: "rgba(43,171,226,0.4)"
    },
    green: {
      bg: selected ? "#16A34A" : "#22C55E",
      border: selected ? "#15803d" : "#16A34A",
      text: "#ffffff",
      subText: "rgba(255,255,255,0.8)",
      shadow: "rgba(34,197,94,0.4)"
    },
    navy: {
      bg: selected ? "#1e3a6e" : "#0B1D51",
      border: selected ? "#FED44D" : "#1e3a6e",
      text: "#ffffff",
      subText: "#aaa",
      shadow: "rgba(254,212,77,0.3)"
    }
  };
  const c = colorMap[color];
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onClick,
      style: {
        background: c.bg,
        border: `2px solid ${c.border}`,
        boxShadow: selected ? `0 0 0 3px ${c.shadow}, 0 4px 16px ${c.shadow}` : `0 2px 8px rgba(0,0,0,0.12)`,
        transform: selected ? "translateY(-2px) scale(1.02)" : void 0,
        borderRadius: "12px",
        padding: "8px 10px",
        cursor: "pointer",
        color: c.text,
        fontWeight: 800,
        textTransform: "uppercase",
        letterSpacing: "0.6px",
        textAlign: "center",
        minHeight: "48px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s ease",
        lineHeight: 1.3,
        fontSize: "13px"
      },
      children: [
        /* @__PURE__ */ jsx("span", { style: { fontSize: "20px", marginBottom: "3px", display: "block" }, children: icon }),
        /* @__PURE__ */ jsx("span", { children: label }),
        sub && /* @__PURE__ */ jsx("span", { style: { fontSize: "10px", color: c.subText, marginTop: "4px", textTransform: "none", fontWeight: 400 }, children: sub })
      ]
    }
  );
}
function Sidebar$1({ step, form }) {
  const totalSteps = 9;
  const pct = Math.min(Math.round((step - 1) / (totalSteps - 1) * 100), 100);
  const dashArray = `${pct}, 100`;
  const summaryRows = [
    form.ownership && { label: "Property", value: form.ownership === "own" ? "I Own My Home" : "I'm Renting" },
    form.propertyType && { label: "Property type", value: form.propertyType === "family" ? "Family Home / Townhouse" : form.propertyType === "apartment" ? "Apartment / Condo" : "Commercial Property" },
    form.zipCode && { label: "Zip code", value: form.zipCode },
    form.existingSolar && { label: "Existing solar", value: form.existingSolar === "yes" ? "Yes" : "No" },
    form.interestSelection && { label: "Interested in", value: form.interestSelection === "solar" ? "Solar Only" : form.interestSelection === "battery" ? "Battery Only" : "Solar + Battery" },
    form.whyInterested && { label: "Why solar", value: form.whyInterested },
    form.paymentPref && { label: "Financing", value: form.paymentPref.charAt(0).toUpperCase() + form.paymentPref.slice(1) },
    form.monthlyBill && { label: "Current bill", value: "$" + form.monthlyBill + "/mo" }
  ].filter(Boolean);
  return /* @__PURE__ */ jsxs("div", { style: {
    background: "#ffffff",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
    color: "#0B1D51",
    width: "300px",
    minWidth: "300px",
    position: "sticky",
    top: "20px"
  }, children: [
    /* @__PURE__ */ jsxs("div", { style: {
      background: "linear-gradient(135deg, #2BABE2 0%, #1a7fc4 50%, #0f5fa0 100%)",
      padding: "18px 20px"
    }, children: [
      /* @__PURE__ */ jsx("img", { src: LOGO_URL, alt: "Pell Solar", style: { height: "38px", objectFit: "contain" } }),
      /* @__PURE__ */ jsx("div", { style: { fontSize: "13px", color: "rgba(255,255,255,0.85)", marginTop: "6px" }, children: "Free Custom Solar Quote" })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { padding: "20px 20px" }, children: [
      /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: "16px", marginBottom: "18px" }, children: [
        /* @__PURE__ */ jsxs("div", { style: { flexShrink: 0, position: "relative", width: "80px", height: "90px" }, children: [
          /* @__PURE__ */ jsxs("svg", { style: { width: "80px", height: "80px", transform: "rotate(-90deg)" }, viewBox: "0 0 36 36", children: [
            /* @__PURE__ */ jsx("path", { d: "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831", fill: "none", stroke: "#e5e7eb", strokeWidth: "3" }),
            /* @__PURE__ */ jsx("path", { d: "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831", fill: "none", stroke: "#FED44D", strokeWidth: "3", strokeDasharray: dashArray, strokeLinecap: "round" })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { position: "absolute", top: "36px", left: "50%", transform: "translate(-50%, -50%)", fontSize: "18px", fontWeight: 800, color: "#0B1D51" }, children: [
            pct,
            "%"
          ] }),
          /* @__PURE__ */ jsx("div", { style: { textAlign: "center", fontSize: "10px", fontWeight: 600, color: "#6b7280", marginTop: "2px" }, children: "Complete" })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { flex: 1 }, children: [
          /* @__PURE__ */ jsx("div", { style: { fontSize: "12px", color: "#374151", lineHeight: 1.5 }, children: "Answer a few quick questions for a custom solar installation quote." }),
          /* @__PURE__ */ jsx("div", { style: { fontSize: "11px", color: "#6b7280", marginTop: "6px" }, children: "CSLB #949122" })
        ] })
      ] }),
      summaryRows.length > 0 && /* @__PURE__ */ jsxs("div", { style: { marginBottom: "16px" }, children: [
        /* @__PURE__ */ jsx("div", { style: { fontSize: "13px", fontWeight: 700, color: "#0B1D51", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "1px" }, children: "Solar Requirements" }),
        /* @__PURE__ */ jsx("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: "13px" }, children: /* @__PURE__ */ jsx("tbody", { children: summaryRows.map((r, i) => /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { style: { padding: "7px 0", color: "#2BABE2", fontWeight: 600, borderBottom: "1px solid #e5e7eb", width: "45%" }, children: r.label }),
          /* @__PURE__ */ jsx("td", { style: { padding: "7px 0", color: "#1f2937", textAlign: "left", borderBottom: "1px solid #e5e7eb" }, children: r.value })
        ] }, i)) }) })
      ] }),
      /* @__PURE__ */ jsx("hr", { style: { border: "none", borderTop: "1px solid #e5e7eb", margin: "14px 0" } }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { style: { fontSize: "12px", fontWeight: 700, color: "#0B1D51", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "1px" }, children: "Why PellSolar?" }),
        /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: "7px" }, children: [
          { bold: "Family-Owned", rest: "Solar Company" },
          { bold: "License #949122", rest: "— CA, ID" },
          { bold: "Tesla Certified Installer", rest: "" },
          { bold: "Current Reviews", rest: "— Google & Yelp" },
          { bold: "$0 Down", rest: "Lease & Financing" }
        ].map(({ bold, rest }) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#374151" }, children: [
          /* @__PURE__ */ jsx("span", { style: { color: "#22C55E", fontSize: "14px" }, children: "✓" }),
          /* @__PURE__ */ jsxs("span", { children: [
            /* @__PURE__ */ jsx("strong", { style: { color: "#0B1D51" }, children: bold }),
            " ",
            rest
          ] })
        ] }, bold)) }),
        /* @__PURE__ */ jsxs("div", { style: { marginTop: "14px", paddingTop: "14px", borderTop: "1px solid #e5e7eb" }, children: [
          /* @__PURE__ */ jsxs("div", { style: { fontSize: "11px", color: "#6b7280" }, children: [
            "California: ",
            /* @__PURE__ */ jsx("a", { href: "tel:+17148804416", style: { color: "#2BABE2", fontWeight: 600 }, children: "(714) 880-4416" })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { fontSize: "11px", color: "#6b7280", marginTop: "3px" }, children: [
            "Idaho: ",
            /* @__PURE__ */ jsx("a", { href: "tel:+12085031416", style: { color: "#2BABE2", fontWeight: 600 }, children: "(208) 503-1416" })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function BillUpload({ file, onFile, onClear }) {
  const [dragging, setDragging] = useState(false);
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) onFile(f);
  }, [onFile]);
  const handleChange = (e) => {
    const f = e.target.files?.[0];
    if (f) onFile(f);
  };
  if (file) {
    const isImage = file.type.startsWith("image/");
    return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 p-4 rounded-xl border-2 border-yellow-400 bg-yellow-50", children: [
      /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-lg flex items-center justify-center bg-yellow-100", children: isImage ? /* @__PURE__ */ jsx(Image, { className: "w-6 h-6 text-yellow-600" }) : /* @__PURE__ */ jsx(FileText, { className: "w-6 h-6 text-yellow-600" }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsx("p", { className: "font-semibold text-gray-900 truncate", children: file.name }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500", children: [
          (file.size / 1024 / 1024).toFixed(2),
          " MB"
        ] })
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: onClear, className: "p-1.5 rounded-full bg-yellow-100 hover:bg-yellow-200", children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4 text-gray-600" }) })
    ] });
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onDragOver: (e) => {
        e.preventDefault();
        setDragging(true);
      },
      onDragLeave: () => setDragging(false),
      onDrop: handleDrop,
      className: `relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${dragging ? "border-yellow-400 bg-yellow-50" : "border-gray-300 bg-gray-50 hover:border-[#2BABE2] hover:bg-blue-50"}`,
      children: [
        /* @__PURE__ */ jsx("input", { type: "file", accept: ".pdf,.jpg,.jpeg,.png,.webp,.heic", onChange: handleChange, className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer" }),
        /* @__PURE__ */ jsx(Upload, { className: "w-10 h-10 mx-auto mb-3 text-gray-400" }),
        /* @__PURE__ */ jsx("p", { className: "font-semibold text-gray-700 text-sm", children: "Drop your utility bill here" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mt-1", children: "or click to browse · PDF, JPG, PNG accepted · Max 10MB" })
      ]
    }
  );
}
function QuotePage() {
  const [, navigate] = useLocation();
  const search = useSearch();
  const searchParams = new URLSearchParams(search);
  const prefillOwnership = searchParams.get("ownership") || "";
  const prefillPropertyType = searchParams.get("propertyType") || "";
  const prefillZipCode = searchParams.get("zipCode") || "";
  const prefillExistingSolar = searchParams.get("existingSolar") || "";
  const prefillWhyInterested = searchParams.get("whyInterested") || "";
  const prefillPaymentPref = searchParams.get("paymentPref") || "";
  const hasHomepagePrefill = !!(prefillOwnership && prefillPropertyType && prefillZipCode && prefillPaymentPref);
  const initialStep = hasHomepagePrefill ? 8 : prefillOwnership === "own" ? 2 : 1;
  const [step, setStep] = useState(initialStep);
  const [uploading, setUploading] = useState(false);
  const [showRenterPopup, setShowRenterPopup] = useState(false);
  const [zipStatus, setZipStatus] = useState("idle");
  const formCardRef = useRef(null);
  const [form, setForm] = useState({
    ownership: prefillOwnership,
    propertyType: prefillPropertyType,
    zipCode: prefillZipCode,
    existingSolar: prefillExistingSolar,
    interestSelection: "",
    interestOtherText: "",
    whyInterested: prefillWhyInterested,
    paymentPref: prefillPaymentPref,
    monthlyBill: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    billFile: null,
    billFileKey: "",
    billFileUrl: "",
    billFileName: "",
    smsConsent: false
  });
  const createLead = trpc.leads.create.useMutation({
    onSuccess: (data, variables) => {
      const searchParams2 = new URLSearchParams();
      if (data.isDuplicate) searchParams2.set("returning", "1");
      if (data.dealId) searchParams2.set("deal_id", String(data.dealId));
      if (data.id) searchParams2.set("lead_id", String(data.id));
      const params = searchParams2.toString() ? `?${searchParams2.toString()}` : "";
      navigate(`/thank-you${params}`);
      setStep(10);
    },
    onError: (err) => {
      const msg = err?.message ?? "";
      if (msg.includes("rate") || msg.includes("Too many")) {
        toast.error("You've already submitted recently. We'll be in touch soon!");
      } else if (msg.includes("duplicate") || msg.includes("already")) {
        toast.error("Looks like you're already in our system! We'll be in touch soon.");
      } else {
        toast.error("Something went wrong. Please try again or call us at (714) 455-3401.");
      }
    }
  });
  const geocodeQuery = trpc.geo.geocodeZip.useQuery(
    { zip: form.zipCode },
    { enabled: form.zipCode.length === 5, staleTime: 6e4 }
  );
  const update = (patch) => setForm((f) => ({ ...f, ...patch }));
  const selectAndAdvance = (patch) => {
    update(patch);
    setTimeout(() => setStep((s) => Math.min(s + 1, 9)), 250);
  };
  useEffect(() => {
    if (!formCardRef.current) return;
    const top = formCardRef.current.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }, [step]);
  const handleOwnershipSelect = (val) => {
    if (val === "rent") {
      update({ ownership: "rent" });
      setShowRenterPopup(true);
    } else {
      selectAndAdvance({ ownership: "own" });
    }
  };
  useEffect(() => {
    if (showRenterPopup) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showRenterPopup]);
  const uploadBill = async (file) => {
    setUploading(true);
    try {
      const base64Data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const res = await fetch("/api/upload-bill", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ fileName: file.name, contentType: file.type, base64Data }) });
      if (!res.ok) throw new Error("Upload failed");
      return await res.json();
    } catch {
      toast.error("Bill upload failed. You can still submit without it.");
      return null;
    } finally {
      setUploading(false);
    }
  };
  const handleSubmit = async () => {
    const attribution = captureAttribution(search);
    const source = deriveLeadSource("quote-page", attribution);
    let billKey = form.billFileKey, billUrl = form.billFileUrl, billName = form.billFileName;
    if (form.billFile && !billKey) {
      const result = await uploadBill(form.billFile);
      if (result) {
        billKey = result.key;
        billUrl = result.publicUrl || result.url;
        billName = form.billFile.name;
      }
    }
    createLead.mutate({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      address: form.address,
      city: form.city || void 0,
      state: form.state || void 0,
      zip: form.zipCode || void 0,
      ownershipType: form.ownership === "own" ? "homeowner" : "renter",
      propertyType: form.propertyType === "family" ? "family_home" : form.propertyType === "apartment" ? "apartment" : form.propertyType === "commercial" ? "commercial" : void 0,
      zipCode: form.zipCode || void 0,
      existingSolar: form.existingSolar === "yes" ? true : form.existingSolar === "no" ? false : void 0,
      solarMotivation: form.whyInterested === "Long-Term Energy Price Stability" ? "price_stability" : form.whyInterested === "Reduce Electricity Bills" ? "reduce_bills" : form.whyInterested === "Create a More Energy-Efficient All-Electric Home" ? "all_electric" : form.whyInterested ? "other" : void 0,
      paymentPreference: form.paymentPref === "leasing" || form.paymentPref === "financing" || form.paymentPref === "cash" ? form.paymentPref : void 0,
      monthlyBillRange: form.monthlyBill || "unknown",
      interestType: ["solar", "battery", "solar_battery", "ev_charger", "other"].includes(form.interestSelection) ? form.interestSelection : "solar",
      interestOtherText: form.interestSelection === "other" ? form.interestOtherText : void 0,
      source,
      billFileKey: billKey || void 0,
      billFileUrl: billUrl || void 0,
      billFileName: billName || void 0,
      utmData: hasAttribution(attribution) ? attribution : void 0,
      _hp: ""
      // honeypot — always empty for real users
    });
  };
  const canSubmit = !!(form.firstName && form.lastName && form.email && form.phone);
  const ActionBtn = ({ onClick, disabled, children }) => /* @__PURE__ */ jsx(
    "button",
    {
      onClick,
      disabled,
      style: {
        background: disabled ? "#d1d5db" : "#FED44D",
        color: disabled ? "#9ca3af" : "#0B1D51",
        fontSize: "15px",
        fontWeight: 800,
        textTransform: "uppercase",
        letterSpacing: "1.5px",
        padding: "12px 32px",
        border: "none",
        borderRadius: "50px",
        cursor: disabled ? "not-allowed" : "pointer",
        width: "100%",
        marginTop: "12px",
        transition: "all 0.2s ease",
        boxShadow: disabled ? "none" : "0 4px 20px rgba(254,212,77,0.45)"
      },
      children
    }
  );
  const totalSteps = 9;
  const StepHeader = ({ stepNum }) => /* @__PURE__ */ jsxs("div", { style: {
    background: "linear-gradient(135deg, #2BABE2 0%, #1a7fc4 50%, #0f5fa0 100%)",
    padding: "14px 22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  }, children: [
    stepNum > 1 ? /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setStep((s) => Math.max(1, s - 1)),
        style: { background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "20px", padding: "5px 12px", color: "#fff", fontSize: "12px", fontWeight: 700, cursor: "pointer", letterSpacing: "0.5px" },
        children: "← Back"
      }
    ) : /* @__PURE__ */ jsx("div", { style: { width: "60px" } }),
    /* @__PURE__ */ jsxs("div", { style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsxs("div", { style: { fontSize: "11px", color: "rgba(255,255,255,0.75)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }, children: [
        "Step ",
        stepNum,
        " of ",
        totalSteps
      ] }),
      /* @__PURE__ */ jsx("div", { style: { width: "120px", height: "4px", background: "rgba(255,255,255,0.25)", borderRadius: "2px", marginTop: "5px" }, children: /* @__PURE__ */ jsx("div", { style: { width: `${stepNum / totalSteps * 100}%`, height: "100%", background: "#FED44D", borderRadius: "2px", transition: "width 0.3s ease" } }) })
    ] }),
    /* @__PURE__ */ jsx("div", { style: { width: "60px" } })
  ] });
  const StepHeading = ({ children }) => /* @__PURE__ */ jsx("div", { style: {
    fontSize: "15px",
    fontWeight: 800,
    textAlign: "center",
    marginBottom: "12px",
    color: "#0B1D51",
    fontFamily: "'Montserrat', sans-serif",
    lineHeight: 1.35
  }, children });
  return /* @__PURE__ */ jsxs("div", { style: { minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", background: "#f0f4f8" }, children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("div", { style: {
      backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15)), url(${HERO_IMG$d})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      minHeight: "100vh",
      paddingTop: "120px",
      paddingBottom: "60px"
    }, children: [
      showRenterPopup && /* @__PURE__ */ jsx("div", { style: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }, children: /* @__PURE__ */ jsxs("div", { style: { background: "#fff", borderRadius: "20px", maxWidth: "480px", width: "90%", padding: "40px", position: "relative", boxShadow: "0 20px 60px rgba(0,0,0,0.35)", textAlign: "center" }, children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              setShowRenterPopup(false);
              update({ ownership: "" });
            },
            style: { position: "absolute", top: "14px", right: "14px", background: "none", border: "2px solid #2BABE2", borderRadius: "50%", width: "34px", height: "34px", fontSize: "18px", cursor: "pointer", color: "#2BABE2", display: "flex", alignItems: "center", justifyContent: "center" },
            children: "×"
          }
        ),
        /* @__PURE__ */ jsx("div", { style: { fontSize: "48px", marginBottom: "12px" }, children: "🏢" }),
        /* @__PURE__ */ jsx("h2", { style: { fontSize: "22px", fontWeight: 800, color: "#0B1D51", margin: "0 0 16px 0", fontFamily: "'Montserrat', sans-serif" }, children: "Thanks for your interest!" }),
        /* @__PURE__ */ jsx("p", { style: { color: "#666", fontSize: "14px", lineHeight: 1.6, margin: "0 0 12px 0" }, children: "At this time, we only sell and install solar systems for homeowners." }),
        /* @__PURE__ */ jsxs("div", { style: { background: "#FED44D20", border: "1px solid #FED44D", borderRadius: "12px", padding: "14px", margin: "0 0 16px 0" }, children: [
          /* @__PURE__ */ jsx("p", { style: { color: "#0B1D51", fontWeight: 700, fontSize: "14px", margin: 0 }, children: "💰 Know a homeowner? Refer them and earn cash!" }),
          /* @__PURE__ */ jsx("p", { style: { color: "#666", fontSize: "13px", margin: "6px 0 0" }, children: "We pay referral bonuses for every installation that closes." })
        ] }),
        /* @__PURE__ */ jsx("p", { style: { color: "#666", fontSize: "14px", lineHeight: 1.6, margin: "0 0 20px 0" }, children: "If you know friends, family, or neighbors who own their home, send them our way." }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              setShowRenterPopup(false);
              update({ ownership: "" });
            },
            style: { padding: "12px 32px", background: "#2BABE2", color: "#fff", border: "none", borderRadius: "50px", fontWeight: 700, fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px", cursor: "pointer" },
            children: "Close"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxs("div", { style: { maxWidth: "1100px", margin: "0 auto", padding: "0 20px 10px 20px", display: "flex", justifyContent: "center", gap: "28px", alignItems: "flex-start", flexWrap: "wrap" }, children: [
        /* @__PURE__ */ jsxs("div", { ref: formCardRef, style: { width: "100%", maxWidth: "600px", scrollMarginTop: "72px" }, children: [
          /* @__PURE__ */ jsxs("div", { style: { background: "#ffffff", borderRadius: "20px", overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.2)" }, children: [
            /* @__PURE__ */ jsxs("div", { style: {
              background: "linear-gradient(135deg, #2BABE2 0%, #1a7fc4 45%, #0f5fa0 100%)",
              padding: "18px 24px 16px",
              display: "flex",
              alignItems: "center",
              gap: "14px"
            }, children: [
              /* @__PURE__ */ jsx("img", { src: LOGO_URL, alt: "Pell Solar", style: { height: "42px", objectFit: "contain", flexShrink: 0 } }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h1", { style: { fontSize: "15px", fontWeight: 800, color: "#FED44D", lineHeight: 1.2, fontFamily: "'Montserrat', sans-serif", textTransform: "uppercase", letterSpacing: "0.5px", margin: 0 }, children: "Get Your Free Solar Quote" }),
                /* @__PURE__ */ jsx("div", { style: { fontSize: "11px", color: "rgba(255,255,255,0.85)", marginTop: "3px" }, children: "No cost · No obligation · Takes 2 minutes" })
              ] })
            ] }),
            step >= 1 && step <= 9 && /* @__PURE__ */ jsx(StepHeader, { stepNum: step }),
            /* @__PURE__ */ jsxs("div", { style: { padding: "16px 20px 16px" }, children: [
              step === 1 && /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(StepHeading, { children: "Get a custom solar quote for your property" }),
                /* @__PURE__ */ jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }, children: [
                  /* @__PURE__ */ jsx(
                    OptionBtn,
                    {
                      selected: form.ownership === "own",
                      onClick: () => handleOwnershipSelect("own"),
                      icon: "🏠",
                      label: "I Own My Home",
                      color: "yellow"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    OptionBtn,
                    {
                      selected: form.ownership === "rent",
                      onClick: () => handleOwnershipSelect("rent"),
                      icon: "🏢",
                      label: "I'm Renting",
                      color: "cyan"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("div", { style: { marginTop: "10px", textAlign: "center" }, children: /* @__PURE__ */ jsx("a", { href: "/schedule", style: { display: "inline-flex", alignItems: "center", gap: "8px", background: "#22C55E", color: "#fff", fontWeight: 800, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.6px", padding: "12px 24px", borderRadius: "50px", textDecoration: "none", boxShadow: "0 4px 14px rgba(34,197,94,0.35)" }, children: "🔧 Service Call" }) })
              ] }),
              step === 2 && /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(StepHeading, { children: "What type of property do you have?" }),
                /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }, children: [
                  { val: "family", icon: "🏡", label: "Family Home", color: "yellow" },
                  { val: "apartment", icon: "🏢", label: "Apartment / Condo", color: "cyan" },
                  { val: "commercial", icon: "🏗️", label: "Commercial", color: "navy" }
                ].map((o) => /* @__PURE__ */ jsx(
                  OptionBtn,
                  {
                    selected: form.propertyType === o.val,
                    onClick: () => selectAndAdvance({ propertyType: o.val }),
                    icon: o.icon,
                    label: o.label,
                    color: o.color
                  },
                  o.val
                )) })
              ] }),
              step === 3 && /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(StepHeading, { children: "What is your zip code?" }),
                /* @__PURE__ */ jsxs("div", { style: { maxWidth: "280px", margin: "0 auto" }, children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      inputMode: "numeric",
                      maxLength: 5,
                      value: form.zipCode,
                      onChange: (e) => {
                        const val = e.target.value.replace(/\D/g, "").slice(0, 5);
                        update({ zipCode: val });
                        setZipStatus("idle");
                      },
                      placeholder: "e.g. 93722",
                      style: {
                        width: "100%",
                        textAlign: "center",
                        fontSize: "26px",
                        fontWeight: 700,
                        padding: "12px",
                        border: `2px solid ${zipStatus === "invalid" ? "#ef4444" : zipStatus === "valid" ? "#22c55e" : "#e0e0e0"}`,
                        borderRadius: "14px",
                        background: "#f9fafb",
                        outline: "none",
                        boxSizing: "border-box",
                        transition: "border-color 0.2s",
                        letterSpacing: "6px"
                      },
                      onFocus: (e) => e.target.style.borderColor = "#2BABE2",
                      onBlur: (e) => e.target.style.borderColor = zipStatus === "invalid" ? "#ef4444" : zipStatus === "valid" ? "#22c55e" : "#e0e0e0"
                    }
                  ),
                  form.zipCode.length === 5 && /* @__PURE__ */ jsx("div", { style: { marginTop: "10px", borderRadius: "12px", overflow: "hidden", border: "2px solid #e0e0e0", height: "140px", background: "#f0f4f8", display: "flex", alignItems: "center", justifyContent: "center" }, children: geocodeQuery.isLoading ? /* @__PURE__ */ jsx("p", { style: { color: "#888", fontSize: "13px", margin: 0 }, children: "📍 Loading map..." }) : geocodeQuery.data?.found ? /* @__PURE__ */ jsx(
                    "iframe",
                    {
                      title: "zip-map",
                      width: "100%",
                      height: "140",
                      frameBorder: "0",
                      style: { border: 0, display: "block" },
                      src: `https://maps.google.com/maps?q=${geocodeQuery.data.lat},${geocodeQuery.data.lng}&z=12&output=embed`,
                      allowFullScreen: true
                    }
                  ) : /* @__PURE__ */ jsxs("p", { style: { color: "#888", fontSize: "13px", margin: 0 }, children: [
                    "📍 ",
                    form.zipCode
                  ] }) }),
                  zipStatus === "invalid" && /* @__PURE__ */ jsxs("div", { style: {
                    marginTop: "10px",
                    background: "#fef2f2",
                    border: "1px solid #fecaca",
                    borderRadius: "10px",
                    padding: "10px 12px",
                    textAlign: "center"
                  }, children: [
                    /* @__PURE__ */ jsx("p", { style: { color: "#dc2626", fontWeight: 700, fontSize: "13px", margin: 0 }, children: "😔 We don't currently serve this area" }),
                    /* @__PURE__ */ jsxs("p", { style: { color: "#6b7280", fontSize: "12px", margin: "4px 0 0" }, children: [
                      "We serve Southern California and Idaho. Call us at ",
                      /* @__PURE__ */ jsx("a", { href: "tel:8666468499", style: { color: "#2BABE2", fontWeight: 700 }, children: "(866) 646-8499" }),
                      " to check if we're expanding near you."
                    ] })
                  ] }),
                  zipStatus === "valid" && /* @__PURE__ */ jsx("div", { style: {
                    marginTop: "10px",
                    background: "#f0fdf4",
                    border: "1px solid #bbf7d0",
                    borderRadius: "10px",
                    padding: "8px 12px",
                    textAlign: "center"
                  }, children: /* @__PURE__ */ jsxs("p", { style: { color: "#16a34a", fontWeight: 700, fontSize: "13px", margin: 0 }, children: [
                    "✅ Great news — we serve ",
                    getServiceAreaLabel(form.zipCode),
                    "!"
                  ] }) }),
                  /* @__PURE__ */ jsx(
                    ActionBtn,
                    {
                      onClick: () => {
                        if (form.zipCode.length < 5) return;
                        const valid = isInServiceArea(form.zipCode);
                        setZipStatus(valid ? "valid" : "invalid");
                        if (valid) setTimeout(() => setStep(4), 800);
                      },
                      disabled: form.zipCode.length < 5,
                      children: "Check Zip Code"
                    }
                  )
                ] })
              ] }),
              step === 4 && /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(StepHeading, { children: "Do you have existing solar panels?" }),
                /* @__PURE__ */ jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }, children: [
                  /* @__PURE__ */ jsx(
                    OptionBtn,
                    {
                      selected: form.existingSolar === "yes",
                      onClick: () => selectAndAdvance({ existingSolar: "yes" }),
                      icon: "☀️",
                      label: "Yes",
                      color: "yellow"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    OptionBtn,
                    {
                      selected: form.existingSolar === "no",
                      onClick: () => selectAndAdvance({ existingSolar: "no" }),
                      icon: "✖",
                      label: "No",
                      color: "cyan"
                    }
                  )
                ] })
              ] }),
              step === 5 && /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(StepHeading, { children: "What are you interested in?" }),
                /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: "8px" }, children: [
                  { val: "solar", icon: "☀️", label: "Solar Only", sub: "Panels + Installation", color: "yellow" },
                  { val: "battery", icon: "🔋", label: "Battery Only", sub: "Tesla Powerwall & Backup", color: "cyan" },
                  { val: "solar_battery", icon: "⚡", label: "Solar + Battery", sub: "Complete Energy System", color: "green" },
                  { val: "ev_charger", icon: "🚗", label: "EV Charger", sub: "Home EV Charging Station", color: "navy" },
                  { val: "other", icon: "💬", label: "Other / Not Sure", sub: "Tell us what you need", color: "navy" }
                ].map((o) => /* @__PURE__ */ jsx(
                  OptionBtn,
                  {
                    selected: form.interestSelection === o.val,
                    onClick: () => {
                      update({ interestSelection: o.val });
                      if (o.val !== "other" && o.val !== "ev_charger") {
                        setTimeout(() => setStep(6), 180);
                      }
                    },
                    icon: o.icon,
                    label: o.label,
                    sub: o.sub,
                    color: o.color
                  },
                  o.val
                )) }),
                form.interestSelection === "other" && /* @__PURE__ */ jsxs("div", { style: { marginTop: "12px" }, children: [
                  /* @__PURE__ */ jsx(
                    "textarea",
                    {
                      value: form.interestOtherText,
                      onChange: (e) => update({ interestOtherText: e.target.value }),
                      placeholder: "Tell us what you're looking for (e.g. roofing, solar repair, just exploring...)",
                      rows: 3,
                      style: {
                        width: "100%",
                        padding: "12px",
                        border: "2px solid #e0e0e0",
                        borderRadius: "12px",
                        fontSize: "14px",
                        fontFamily: "inherit",
                        resize: "none",
                        outline: "none",
                        boxSizing: "border-box",
                        background: "#f9fafb"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    ActionBtn,
                    {
                      onClick: () => setStep(7),
                      disabled: false,
                      children: "Continue →"
                    }
                  )
                ] }),
                form.interestSelection === "ev_charger" && /* @__PURE__ */ jsx("div", { style: { marginTop: "12px" }, children: /* @__PURE__ */ jsx(
                  ActionBtn,
                  {
                    onClick: () => setStep(7),
                    disabled: false,
                    children: "Continue →"
                  }
                ) })
              ] }),
              step === 6 && /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs(StepHeading, { children: [
                  "Why are you interested in installing solar at your",
                  " ",
                  form.propertyType === "family" ? "family home/townhouse" : form.propertyType === "apartment" ? "apartment/condo" : form.propertyType === "commercial" ? "commercial property" : "home",
                  "?"
                ] }),
                /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: "8px" }, children: [
                  { val: "Long-Term Energy Price Stability", icon: "📈", color: "yellow" },
                  { val: "Reduce Electricity Bills", icon: "💡", color: "cyan" },
                  { val: "Create a More Energy-Efficient, All-Electric Home", icon: "🏠", color: "green" },
                  { val: "Other", icon: "💬", color: "navy" }
                ].map((o) => /* @__PURE__ */ jsx(
                  OptionBtn,
                  {
                    selected: form.whyInterested === o.val,
                    onClick: () => selectAndAdvance({ whyInterested: o.val }),
                    icon: o.icon,
                    label: o.val,
                    color: o.color
                  },
                  o.val
                )) })
              ] }),
              step === 7 && /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(StepHeading, { children: "Are you considering leasing, financing, or cash?" }),
                /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: "8px" }, children: [
                  { val: "leasing", icon: "📋", label: "Leasing", color: "yellow" },
                  { val: "financing", icon: "🏦", label: "Financing", color: "cyan" },
                  { val: "cash", icon: "💰", label: "Cash", color: "green" }
                ].map((o) => /* @__PURE__ */ jsx(
                  OptionBtn,
                  {
                    selected: form.paymentPref === o.val,
                    onClick: () => selectAndAdvance({ paymentPref: o.val }),
                    icon: o.icon,
                    label: o.label,
                    color: o.color
                  },
                  o.val
                )) })
              ] }),
              step === 8 && /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(StepHeading, { children: "What is your average monthly electricity bill?" }),
                /* @__PURE__ */ jsxs("div", { style: { maxWidth: "240px", margin: "0 auto" }, children: [
                  /* @__PURE__ */ jsxs("div", { style: { position: "relative" }, children: [
                    /* @__PURE__ */ jsx("span", { style: { position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "18px", fontWeight: 700, color: "#999" }, children: "$" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        inputMode: "numeric",
                        value: form.monthlyBill,
                        onChange: (e) => update({ monthlyBill: e.target.value.replace(/\D/g, "") }),
                        placeholder: "250",
                        style: {
                          width: "100%",
                          textAlign: "center",
                          fontSize: "26px",
                          fontWeight: 700,
                          padding: "12px 60px 12px 40px",
                          border: "2px solid #e0e0e0",
                          borderRadius: "14px",
                          background: "#f9fafb",
                          outline: "none",
                          boxSizing: "border-box",
                          transition: "border-color 0.2s"
                        },
                        onFocus: (e) => e.target.style.borderColor = "#2BABE2",
                        onBlur: (e) => e.target.style.borderColor = "#e0e0e0"
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { style: { position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", fontSize: "12px", fontWeight: 600, color: "#999" }, children: "/Month" })
                  ] }),
                  /* @__PURE__ */ jsx(ActionBtn, { onClick: () => {
                    if (form.monthlyBill) setStep(9);
                  }, disabled: !form.monthlyBill, children: "One Last Step" })
                ] })
              ] }),
              step === 9 && /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(StepHeading, { children: "Fill out this form and our team will reach out about your solar savings" }),
                /* @__PURE__ */ jsxs("div", { style: { maxWidth: "480px", margin: "0 auto" }, children: [
                  /* @__PURE__ */ jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }, children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("label", { style: { display: "block", fontSize: "12px", fontWeight: 700, color: "#444", marginBottom: "5px", textTransform: "uppercase", letterSpacing: "0.5px" }, children: "First Name *" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: form.firstName,
                          onChange: (e) => update({ firstName: e.target.value }),
                          placeholder: "John",
                          style: { width: "100%", padding: "11px 14px", border: "2px solid #e0e0e0", borderRadius: "10px", background: "#f9fafb", fontSize: "14px", outline: "none", boxSizing: "border-box" },
                          onFocus: (e) => e.target.style.borderColor = "#2BABE2",
                          onBlur: (e) => e.target.style.borderColor = "#e0e0e0"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("label", { style: { display: "block", fontSize: "12px", fontWeight: 700, color: "#444", marginBottom: "5px", textTransform: "uppercase", letterSpacing: "0.5px" }, children: "Last Name *" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "text",
                          value: form.lastName,
                          onChange: (e) => update({ lastName: e.target.value }),
                          placeholder: "Smith",
                          style: { width: "100%", padding: "11px 14px", border: "2px solid #e0e0e0", borderRadius: "10px", background: "#f9fafb", fontSize: "14px", outline: "none", boxSizing: "border-box" },
                          onFocus: (e) => e.target.style.borderColor = "#2BABE2",
                          onBlur: (e) => e.target.style.borderColor = "#e0e0e0"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { style: { marginBottom: "12px" }, children: [
                    /* @__PURE__ */ jsx("label", { style: { display: "block", fontSize: "12px", fontWeight: 700, color: "#444", marginBottom: "5px", textTransform: "uppercase", letterSpacing: "0.5px" }, children: "Email Address *" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "email",
                        value: form.email,
                        onChange: (e) => update({ email: e.target.value }),
                        placeholder: "john@example.com",
                        style: { width: "100%", padding: "11px 14px", border: "2px solid #e0e0e0", borderRadius: "10px", background: "#f9fafb", fontSize: "14px", outline: "none", boxSizing: "border-box" },
                        onFocus: (e) => e.target.style.borderColor = "#2BABE2",
                        onBlur: (e) => e.target.style.borderColor = "#e0e0e0"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { style: { marginBottom: "12px" }, children: [
                    /* @__PURE__ */ jsx("label", { style: { display: "block", fontSize: "12px", fontWeight: 700, color: "#444", marginBottom: "5px", textTransform: "uppercase", letterSpacing: "0.5px" }, children: "Phone Number *" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "tel",
                        value: form.phone,
                        onChange: (e) => update({ phone: e.target.value }),
                        placeholder: "(714) 555-0100",
                        style: { width: "100%", padding: "11px 14px", border: "2px solid #e0e0e0", borderRadius: "10px", background: "#f9fafb", fontSize: "14px", outline: "none", boxSizing: "border-box" },
                        onFocus: (e) => e.target.style.borderColor = "#2BABE2",
                        onBlur: (e) => e.target.style.borderColor = "#e0e0e0"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { style: { marginBottom: "12px" }, children: [
                    /* @__PURE__ */ jsx("label", { style: { display: "block", fontSize: "12px", fontWeight: 700, color: "#444", marginBottom: "5px", textTransform: "uppercase", letterSpacing: "0.5px" }, children: "Home Address" }),
                    /* @__PURE__ */ jsx(
                      AddressAutocomplete,
                      {
                        value: form.address,
                        onChange: (full, parts) => update({ address: full, city: parts.city, state: parts.state, zipCode: parts.zip || form.zipCode }),
                        placeholder: "Start typing your address…",
                        id: "quote-address",
                        style: { width: "100%", padding: "11px 14px", border: "2px solid #e0e0e0", borderRadius: "10px", background: "#f9fafb", fontSize: "14px", outline: "none", boxSizing: "border-box" }
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { style: { marginBottom: "8px" }, children: [
                    /* @__PURE__ */ jsxs("p", { style: { fontSize: "12px", fontWeight: 700, color: "#444", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }, children: [
                      "Upload Your Utility Bill ",
                      /* @__PURE__ */ jsx("span", { style: { color: "#ffffff", fontWeight: 700, textTransform: "none", fontSize: "10px", background: "#2BABE2", padding: "2px 8px", borderRadius: "12px", marginLeft: "8px", letterSpacing: "0.5px" }, children: "OPTIONAL" })
                    ] }),
                    /* @__PURE__ */ jsx(BillUpload, { file: form.billFile, onFile: (f) => update({ billFile: f, billFileName: f.name }), onClear: () => update({ billFile: null, billFileKey: "", billFileUrl: "", billFileName: "" }) })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { style: { margin: "12px 0 8px", padding: "12px 14px", background: "#f0f9ff", border: "1.5px solid #2BABE2", borderRadius: "10px", display: "flex", alignItems: "flex-start", gap: "10px" }, children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "checkbox",
                        id: "sms-consent",
                        checked: form.smsConsent ?? false,
                        onChange: (e) => update({ smsConsent: e.target.checked }),
                        style: { marginTop: "2px", width: "16px", height: "16px", flexShrink: 0, accentColor: "#2BABE2", cursor: "pointer" }
                      }
                    ),
                    /* @__PURE__ */ jsxs("label", { htmlFor: "sms-consent", style: { fontSize: "12px", color: "#374151", lineHeight: 1.5, cursor: "pointer" }, children: [
                      "I agree to receive SMS text messages from Pell Solar about my solar project (appointment reminders, installation updates, project status). Reply ",
                      /* @__PURE__ */ jsx("strong", { children: "STOP" }),
                      " to opt out at any time. Msg & data rates may apply.",
                      " ",
                      /* @__PURE__ */ jsx("a", { href: "/terms-and-conditions", target: "_blank", rel: "noopener noreferrer", style: { color: "#2BABE2", fontWeight: 600 }, children: "Terms" }),
                      " &amp; ",
                      /* @__PURE__ */ jsx("a", { href: "/privacy-policy", target: "_blank", rel: "noopener noreferrer", style: { color: "#2BABE2", fontWeight: 600 }, children: "Privacy Policy" }),
                      ".",
                      /* @__PURE__ */ jsx("span", { style: { display: "block", marginTop: "3px", color: "#6b7280", fontSize: "11px" }, children: "Consent is not required to receive a quote or purchase services." })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx(ActionBtn, { onClick: handleSubmit, disabled: !canSubmit || createLead.isPending || uploading, children: createLead.isPending || uploading ? "Submitting..." : "Submit My Quote" })
                ] })
              ] }),
              step === 10 && /* @__PURE__ */ jsxs("div", { style: { padding: "40px 16px", textAlign: "center" }, children: [
                /* @__PURE__ */ jsx("div", { style: { width: "80px", height: "80px", borderRadius: "50%", background: "linear-gradient(135deg, #FED44D, #F5A623)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: "40px", boxShadow: "0 8px 24px rgba(254,212,77,0.4)" }, children: "☀️" }),
                /* @__PURE__ */ jsx("h2", { style: { fontSize: "28px", fontWeight: 800, color: "#0B1D51", marginBottom: "10px", fontFamily: "'Montserrat', sans-serif" }, children: "You're All Set!" }),
                /* @__PURE__ */ jsxs("p", { style: { color: "#555", fontSize: "16px", marginBottom: "6px" }, children: [
                  "Thank you, ",
                  /* @__PURE__ */ jsx("strong", { children: form.firstName }),
                  "! Your quote request has been received."
                ] }),
                /* @__PURE__ */ jsx("p", { style: { color: "#888", marginBottom: "28px", fontSize: "14px" }, children: "A Pell Solar specialist will contact you within 1 business day." }),
                /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }, children: [
                  /* @__PURE__ */ jsxs("a", { href: "tel:+18666468499", style: { display: "inline-flex", alignItems: "center", gap: "8px", background: "#FED44D", color: "#0B1D51", fontWeight: 800, padding: "13px 26px", borderRadius: "50px", textDecoration: "none", fontSize: "14px", boxShadow: "0 4px 16px rgba(254,212,77,0.4)" }, children: [
                    /* @__PURE__ */ jsx(Phone, { size: 15 }),
                    " Call Us Now"
                  ] }),
                  /* @__PURE__ */ jsx(Link, { href: "/", style: { display: "inline-flex", alignItems: "center", background: "#0B1D51", color: "#fff", fontWeight: 700, padding: "13px 26px", borderRadius: "50px", textDecoration: "none", fontSize: "14px" }, children: "Back to Home" })
                ] })
              ] })
            ] })
          ] }),
          step <= 9 && /* @__PURE__ */ jsx("div", { style: {
            background: "linear-gradient(135deg, #0f5fa0 0%, #1a7fc4 100%)",
            borderRadius: "0 0 16px 16px",
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginTop: "-4px"
          }, children: /* @__PURE__ */ jsxs("div", { style: { flex: 1 }, children: [
            /* @__PURE__ */ jsx("div", { style: { fontSize: "13px", fontWeight: 800, color: "#FED44D", textTransform: "uppercase", lineHeight: 1.3, letterSpacing: "0.3px" }, children: "YOUR TAX CREDIT SAVINGS DIDN'T DISAPPEAR, THEY JUST MOVED!" }),
            /* @__PURE__ */ jsx("a", { href: "https://www.youtube.com/@PellSolar", target: "_blank", rel: "noopener noreferrer", style: { color: "rgba(255,255,255,0.85)", fontSize: "11px", textDecoration: "underline", marginTop: "3px", display: "inline-block", fontWeight: 600 }, children: "Watch This Video to Learn How →" })
          ] }) })
        ] }),
        step <= 9 && /* @__PURE__ */ jsx("div", { className: "hidden lg:block", children: /* @__PURE__ */ jsx(Sidebar$1, { step, form }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
function AboutUs() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white", style: { fontFamily: "'Inter', system-ui, sans-serif" }, children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("section", { className: "py-24 md:py-32", style: { background: "linear-gradient(135deg, #0B1D51 0%, #0d2460 50%, #0B1D51 100%)" }, children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "inline-block border border-[#FED44D]/60 text-[#FED44D] text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full mb-8", children: "FAMILY-OWNED SOLAR COMPANY" }),
      /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 leading-tight", style: { fontFamily: "'Montserrat', sans-serif" }, children: [
        "Powering Homes with ",
        /* @__PURE__ */ jsx("span", { style: { color: "#FED44D" }, children: "Solar & Storage." })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-white/70 text-lg max-w-2xl mx-auto mb-10", children: "Pell Solar is a family-owned solar company serving Southern California and Idaho. We install solar panels, Tesla Powerwall batteries, Enphase systems, and electrical panels — and we stand behind every job we do." }),
      /* @__PURE__ */ jsx(Link, { href: "/get-quote", className: "inline-block font-bold text-lg px-10 py-4 rounded-full no-underline transition-all hover:opacity-90 mb-12", style: { background: "#FED44D", color: "#0B1D51" }, children: "GET YOUR FREE QUOTE" }),
      /* @__PURE__ */ jsx(LiveReviewLinks, { tone: "dark" })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12 bg-[#0B1D51]", children: /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center", children: [
      { value: "#949122", label: "CA License" },
      { value: "Solar", label: "Panel Systems" },
      { value: "Battery", label: "Storage Options" },
      { value: "2", label: "States Served" }
    ].map((stat) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "text-3xl md:text-4xl font-black text-[#FED44D]", children: stat.value }),
      /* @__PURE__ */ jsx("div", { className: "text-white/70 text-sm font-semibold mt-1", children: stat.label })
    ] }, stat.label)) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx("div", { className: "text-center mb-14", children: /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-extrabold text-gray-900 mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: [
        "Our ",
        /* @__PURE__ */ jsx("span", { className: "text-[#2BABE2]", children: "Story" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-12 items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-5 text-gray-600 text-lg leading-relaxed", children: [
          /* @__PURE__ */ jsx("p", { children: "Pell Solar serves homeowners across Southern California and Idaho with solar, battery storage, electrical-panel, and EV-charging solutions tailored to each property." }),
          /* @__PURE__ */ jsx("p", { children: "Our process starts with your home, energy use, and goals. We provide a clear consultation and a custom system recommendation before you decide whether to move forward." }),
          /* @__PURE__ */ jsxs("p", { children: [
            "We are a family-owned company with a physical Upland office and California contractor license ",
            /* @__PURE__ */ jsx("strong", { className: "text-gray-900", children: "CSLB #949122" }),
            ". We aim to make every step—from consultation through installation—clear and well coordinated."
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [
          { year: "01", event: "Free consultation and energy-use review" },
          { year: "02", event: "Custom solar and battery system design" },
          { year: "03", event: "Permitting, installation, and activation support" }
        ].map((item, i) => /* @__PURE__ */ jsxs("div", { className: "flex gap-4 items-center", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 text-right flex-shrink-0", children: /* @__PURE__ */ jsx("span", { className: "font-black text-[#2BABE2] text-base tabular-nums", children: item.year }) }),
          /* @__PURE__ */ jsx("div", { className: "w-px h-8 bg-[#2BABE2]/30 flex-shrink-0" }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 bg-gray-50 rounded-xl p-3 border border-gray-200", children: /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-sm", children: item.event }) })
        ] }, i)) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx("div", { className: "text-center mb-14", children: /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-extrabold text-gray-900 mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: [
        "What We ",
        /* @__PURE__ */ jsx("span", { className: "text-[#2BABE2]", children: "Stand For" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto", children: [
        { icon: Shield, title: "Licensed & Insured", desc: "California Contractor License #949122. Fully licensed in CA and ID. General liability and workers' comp insurance on every job." },
        { icon: Award, title: "Tesla Certified", desc: "We meet Tesla's strict standards for Powerwall installation quality, customer service, and technical expertise." },
        { icon: Users, title: "In-House Team", desc: "Our own licensed electricians and installers do every job. We never outsource to subcontractors." },
        { icon: Heart, title: "Honest Pricing", desc: "No hidden fees, no bait-and-switch. The price we quote is the price you pay. We'll tell you if solar doesn't make sense for your home." },
        { icon: Clock, title: "Fast Response", desc: "We answer the phone. If you need service, we respond within 1 business day. No call centers, no runaround." },
        { icon: CheckCircle, title: "Quality First", desc: "We use only tier-1 equipment with 25-year warranties. Every installation is done to the highest standard — because our name is on it." }
      ].map((card) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow", children: [
        /* @__PURE__ */ jsx(card.icon, { size: 28, className: "text-[#2BABE2] mb-4" }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900 mb-2", style: { fontFamily: "'Montserrat', sans-serif" }, children: card.title }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm leading-relaxed", children: card.desc })
      ] }, card.title)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-[#0B1D51]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx("div", { className: "text-center mb-14", children: /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-white mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Our Offices" }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8 max-w-4xl mx-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
            /* @__PURE__ */ jsx(MapPin, { size: 24, className: "text-[#FED44D]" }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white", children: "California Office" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-white/80 text-sm", children: [
            /* @__PURE__ */ jsx("p", { children: "1326 Monte Vista Ave #7" }),
            /* @__PURE__ */ jsx("p", { children: "Upland, CA 91786" }),
            /* @__PURE__ */ jsxs("p", { className: "pt-2", children: [
              /* @__PURE__ */ jsx("strong", { className: "text-white", children: "Phone:" }),
              " ",
              /* @__PURE__ */ jsx("a", { href: "tel:8666468499", className: "text-[#FED44D] no-underline", children: "(866) 646-8499" }),
              " — Toll-Free"
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("strong", { className: "text-white", children: "Local:" }),
              " ",
              /* @__PURE__ */ jsx("a", { href: "tel:7144553401", className: "text-[#FED44D] no-underline", children: "(714) 455-3401" })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "pt-2", children: [
              /* @__PURE__ */ jsx("strong", { className: "text-white", children: "Hours:" }),
              " Mon–Sat 8:00 AM – 5:00 PM"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
            /* @__PURE__ */ jsx(MapPin, { size: 24, className: "text-[#FED44D]" }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white", children: "Idaho Office" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-white/80 text-sm", children: [
            /* @__PURE__ */ jsx("p", { children: "Serving the Boise Metro Area" }),
            /* @__PURE__ */ jsx("p", { children: "Meridian, ID" }),
            /* @__PURE__ */ jsxs("p", { className: "pt-2", children: [
              /* @__PURE__ */ jsx("strong", { className: "text-white", children: "Phone:" }),
              " ",
              /* @__PURE__ */ jsx("a", { href: "tel:2085031416", className: "text-[#FED44D] no-underline", children: "(208) 503-1416" })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "pt-2", children: [
              /* @__PURE__ */ jsx("strong", { className: "text-white", children: "Email:" }),
              " ",
              /* @__PURE__ */ jsx("a", { href: "mailto:info@pellsolar.com", className: "text-[#FED44D] no-underline", children: "info@pellsolar.com" })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "pt-2", children: [
              /* @__PURE__ */ jsx("strong", { className: "text-white", children: "Hours:" }),
              " Mon–Sat 8:00 AM – 5:00 PM"
            ] })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-6 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-gray-900 mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Ready to Work With a Company That Cares?" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg mb-8 max-w-2xl mx-auto", children: "Free consultation. No pressure. No obligation. Just honest advice from a family-owned solar company." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [
        /* @__PURE__ */ jsxs(Link, { href: "/get-quote", className: "btn-green text-lg px-10 py-4 inline-flex items-center gap-2", children: [
          "Get Your Free Quote ",
          /* @__PURE__ */ jsx(ArrowRight, { size: 18 })
        ] }),
        /* @__PURE__ */ jsxs("a", { href: "tel:8666468499", className: "text-[#0B1D51] font-bold text-lg flex items-center gap-2 no-underline hover:text-[#2BABE2] transition-colors", children: [
          /* @__PURE__ */ jsx(Phone, { size: 18 }),
          " (866) 646-8499"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const HERO_IMG$c = "/manus-storage/solar-home-main-v2_0ad97127.jpg";
function Reviews() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white", style: { fontFamily: "'Inter', system-ui, sans-serif" }, children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("section", { className: "relative py-28 md:py-36", style: { backgroundImage: `url(${HERO_IMG$c})`, backgroundSize: "cover", backgroundPosition: "center top" }, children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#0B1D51]/70" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-3xl mx-auto px-6 text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "inline-block bg-[#0B1D51]/70 border border-white/20 text-white/80 text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full mb-6", children: "PELL SOLAR — CUSTOMER FEEDBACK" }),
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-extrabold text-white mb-5", style: { fontFamily: "'Montserrat', sans-serif" }, children: [
          "Read Current Customer ",
          /* @__PURE__ */ jsx("span", { className: "text-[#FED44D]", children: "Reviews" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-white/80 text-lg leading-relaxed mb-10", children: "For current, independently published customer feedback, visit Pell Solar’s Google and Yelp profiles directly." }),
        /* @__PURE__ */ jsx(LiveReviewLinks, { tone: "dark" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-extrabold text-gray-900 mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Independent Review Sources" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg leading-relaxed mb-10", children: "Review scores and counts can change. We show the current Google summary when it is available and link directly to both platforms so you can read the latest feedback in context." }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6 text-left", children: [
        /* @__PURE__ */ jsxs("a", { href: "https://www.google.com/search?q=Pell+Solar+reviews", target: "_blank", rel: "noopener noreferrer", className: "block rounded-2xl border border-gray-200 p-7 no-underline hover:shadow-md transition-shadow", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-extrabold text-xl text-[#0B1D51] mb-2", children: "Google Reviews" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "View the current rating, review count, and recent customer feedback on Google." })
        ] }),
        /* @__PURE__ */ jsxs("a", { href: "https://www.yelp.com/biz/pell-solar-ontario", target: "_blank", rel: "noopener noreferrer", className: "block rounded-2xl border border-gray-200 p-7 no-underline hover:shadow-md transition-shadow", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-extrabold text-xl text-[#0B1D51] mb-2", children: "Yelp Reviews" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Read current Yelp feedback directly on Yelp’s business profile." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-12", children: /* @__PURE__ */ jsx(Link, { href: "/get-quote", className: "btn-green", children: "GET YOUR FREE QUOTE" }) })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const HERO_IMG$b = "/manus-storage/solar-home-main-v2_0ad97127.jpg";
function ScheduleCall() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white", style: { fontFamily: "'Inter', system-ui, sans-serif" }, children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("section", { className: "relative py-28 md:py-36", style: { backgroundImage: `url(${HERO_IMG$b})`, backgroundSize: "cover", backgroundPosition: "center" }, children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#0B1D51]/45" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-7xl mx-auto px-6 text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[#FED44D] font-bold text-sm tracking-widest uppercase mb-4", children: "TALK TO A SOLAR EXPERT" }),
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6", style: { fontFamily: "'Montserrat', sans-serif" }, children: [
          "Schedule a ",
          /* @__PURE__ */ jsx("span", { className: "text-[#2BABE2]", children: "Call" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-white/80 max-w-3xl mx-auto mb-8", children: "Talk directly to a Pell Solar specialist. No call centers, no runaround — just honest answers to your solar questions from a family-owned company." })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-14", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-extrabold text-gray-900 mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: [
          "Call Us ",
          /* @__PURE__ */ jsx("span", { className: "text-[#2BABE2]", children: "Anytime" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg max-w-2xl mx-auto", children: "Our team is available Monday through Saturday. You can also call our toll-free number 24/7." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-14", children: [
        /* @__PURE__ */ jsxs("a", { href: "tel:8666468499", className: "bg-[#2BABE2] text-white rounded-2xl p-6 text-center hover:bg-[#1e96cc] transition-colors no-underline group", children: [
          /* @__PURE__ */ jsx(Phone, { size: 28, className: "mx-auto mb-3" }),
          /* @__PURE__ */ jsx("div", { className: "text-2xl font-black mb-1", children: "(866) 646-8499" }),
          /* @__PURE__ */ jsx("div", { className: "text-green-200 text-sm font-semibold", children: "Toll-Free — 24/7" })
        ] }),
        /* @__PURE__ */ jsxs("a", { href: "tel:7148804416", className: "bg-[#0B1D51] text-white rounded-2xl p-6 text-center hover:bg-[#0f2766] transition-colors no-underline", children: [
          /* @__PURE__ */ jsx(MapPin, { size: 28, className: "mx-auto mb-3 text-[#FED44D]" }),
          /* @__PURE__ */ jsx("div", { className: "text-2xl font-black mb-1", children: "(714) 880-4416" }),
          /* @__PURE__ */ jsx("div", { className: "text-white/60 text-sm font-semibold", children: "California Office" })
        ] }),
        /* @__PURE__ */ jsxs("a", { href: "tel:2085031416", className: "bg-[#0B1D51] text-white rounded-2xl p-6 text-center hover:bg-[#0f2766] transition-colors no-underline", children: [
          /* @__PURE__ */ jsx(MapPin, { size: 28, className: "mx-auto mb-3 text-[#FED44D]" }),
          /* @__PURE__ */ jsx("div", { className: "text-2xl font-black mb-1", children: "(208) 503-1416" }),
          /* @__PURE__ */ jsx("div", { className: "text-white/60 text-sm font-semibold", children: "Idaho Office" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8 max-w-4xl mx-auto", children: [
        /* @__PURE__ */ jsxs("a", { href: "mailto:info@pellsolar.com", className: "flex items-center gap-4 bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow no-underline", children: [
          /* @__PURE__ */ jsx(Mail, { size: 28, className: "text-[#2BABE2] flex-shrink-0" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "font-bold text-gray-900 text-lg", children: "Email Us" }),
            /* @__PURE__ */ jsx("div", { className: "text-[#2BABE2]", children: "info@pellsolar.com" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Link, { href: "/get-quote", className: "flex items-center gap-4 bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow no-underline", children: [
          /* @__PURE__ */ jsx(ArrowRight, { size: 28, className: "text-[#2BABE2] flex-shrink-0" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "font-bold text-gray-900 text-lg", children: "Get a Quote Online" }),
            /* @__PURE__ */ jsx("div", { className: "text-gray-500", children: "We respond within 1 business day" })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx("div", { className: "text-center mb-14", children: /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-extrabold text-gray-900 mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: [
        "What to ",
        /* @__PURE__ */ jsx("span", { className: "text-[#2BABE2]", children: "Expect" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6", children: [
        { step: "1", title: "Quick Chat", desc: "Tell us about your home, your electric bill, and what you're looking for. Takes about 5 minutes." },
        { step: "2", title: "Custom Design", desc: "We'll design a system sized specifically for your home and energy usage. No cookie-cutter solutions." },
        { step: "3", title: "Clear Pricing", desc: "You'll get a detailed proposal with exact pricing — no hidden fees, no surprises, no pressure." },
        { step: "4", title: "Your Decision", desc: "Take your time. We don't use high-pressure sales tactics. If solar doesn't make sense, we'll tell you." }
      ].map((card) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 border border-gray-200 text-center hover:shadow-lg transition-shadow", children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-[#2BABE2] text-white font-black text-lg flex items-center justify-center mx-auto mb-4", children: card.step }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900 mb-2", style: { fontFamily: "'Montserrat', sans-serif" }, children: card.title }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm leading-relaxed", children: card.desc })
      ] }, card.step)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-[#0B1D51]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx("div", { className: "text-center mb-14", children: /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-white mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Office Hours" }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8 max-w-3xl mx-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-4", children: "California Office" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-white/80 text-sm", children: [
            /* @__PURE__ */ jsx("p", { children: "1326 Monte Vista Ave #7, Upland, CA 91786" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 pt-2", children: [
              /* @__PURE__ */ jsx(Clock, { size: 14, className: "text-[#FED44D]" }),
              /* @__PURE__ */ jsx("span", { children: "Mon–Sat: 8:00 AM – 5:00 PM" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-4", children: "Idaho Office" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-white/80 text-sm", children: [
            /* @__PURE__ */ jsx("p", { children: "Serving the Boise Metro Area, Meridian, ID" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 pt-2", children: [
              /* @__PURE__ */ jsx(Clock, { size: 14, className: "text-[#FED44D]" }),
              /* @__PURE__ */ jsx("span", { children: "Mon–Sat: 8:00 AM – 5:00 PM" })
            ] })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-6 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-gray-900 mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Ready to Get Started?" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg mb-8 max-w-2xl mx-auto", children: "Free consultation. No pressure. No obligation. Family-owned solar company." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [
        /* @__PURE__ */ jsxs(Link, { href: "/get-quote", className: "btn-green text-lg px-10 py-4 inline-flex items-center gap-2", children: [
          "Get Your Free Quote ",
          /* @__PURE__ */ jsx(ArrowRight, { size: 18 })
        ] }),
        /* @__PURE__ */ jsxs("a", { href: "tel:8666468499", className: "text-[#0B1D51] font-bold text-lg flex items-center gap-2 no-underline hover:text-[#2BABE2] transition-colors", children: [
          /* @__PURE__ */ jsx(Phone, { size: 18 }),
          " (866) 646-8499"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const HERO_IMG$a = "/manus-storage/solar-home-main-v2_0ad97127.jpg";
function PrivacyPolicyPage() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white", style: { fontFamily: "'Inter', system-ui, sans-serif" }, children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("section", { className: "relative py-20 flex items-center", style: { backgroundImage: `linear-gradient(135deg, rgba(11,29,81,0.5), rgba(11,29,81,0.3)), url(${HERO_IMG$a})`, backgroundSize: "cover", backgroundPosition: "center" }, children: /* @__PURE__ */ jsxs("div", { className: "relative z-10 container mx-auto px-6 pt-12", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[#2BABE2] font-bold text-xs tracking-widest uppercase mb-3", children: "LEGAL" }),
      /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-extrabold text-white mb-4 max-w-2xl", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Privacy Policy" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-200 max-w-xl mb-8 leading-relaxed", children: "Your privacy matters to us. This policy explains how Pell Solar collects, uses, and protects your personal information." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
        /* @__PURE__ */ jsx(Link, { href: "/get-quote", className: "btn-green", children: "Get Your Free Quote" }),
        /* @__PURE__ */ jsxs("a", { href: "tel:8666468499", className: "btn-navy flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Phone, { size: 16, className: "text-yellow-400" }),
          " (866) 646-8499 | (714) 455-3401 CA"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 max-w-3xl", children: /* @__PURE__ */ jsxs("div", { className: "prose prose-gray max-w-none text-gray-600 leading-relaxed", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: /* @__PURE__ */ jsx("strong", { children: "Last Updated: April 25, 2026" }) }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Pell Solar Inc." }),
        " (“Pell Solar,” “we,” “us,” or “our”) is committed to protecting the privacy of our customers and website visitors. This Privacy Policy describes how we collect, use, disclose, and protect your personal information when you visit our website (pellsolar.com), use our services, or interact with us in any way."
      ] }),
      /* @__PURE__ */ jsx("p", { children: "By using our website or services, you agree to the terms of this Privacy Policy." }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mt-8 mb-4", children: "Information We Collect" }),
      /* @__PURE__ */ jsx("p", { children: "We may collect the following types of personal information:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Contact Information:" }),
          " Name, email address, phone number, mailing address."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Project Information:" }),
          " Property address, utility account details, roof specifications, energy usage data, and other details related to your solar installation."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Financial Information:" }),
          " Payment information necessary to process transactions (handled securely through third-party payment processors)."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Website Usage Data:" }),
          " IP address, browser type, operating system, pages visited, and cookies."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Communications:" }),
          " Records of emails, text messages, phone calls, and other communications between you and Pell Solar."
        ] })
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mt-8 mb-4", children: "How We Use Your Information" }),
      /* @__PURE__ */ jsx("p", { children: "We use the information we collect for the following purposes:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: "To provide, maintain, and improve our solar installation and service offerings." }),
        /* @__PURE__ */ jsx("li", { children: "To communicate with you about your solar project, including appointment scheduling, installation updates, permit and utility status, and service notifications." }),
        /* @__PURE__ */ jsx("li", { children: "To send you text messages if you have opted in to our SMS program (see SMS/Text Messaging Privacy section below)." }),
        /* @__PURE__ */ jsx("li", { children: "To process payments and manage your account." }),
        /* @__PURE__ */ jsx("li", { children: "To respond to your inquiries and provide customer support." }),
        /* @__PURE__ */ jsx("li", { children: "To comply with legal obligations and protect our rights." })
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mt-8 mb-4", children: "SMS/Text Messaging Privacy" }),
      /* @__PURE__ */ jsx("p", { children: "This section applies to individuals who opt in to receive text messages from Pell Solar Inc." }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "What We Collect for SMS:" }),
        " When you opt in to our SMS program, we collect your mobile phone number, first and last name, and your consent to receive text messages."
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "How We Use SMS Data:" }),
        " We use your mobile phone number solely to send you text messages related to your solar project, including but not limited to: appointment confirmations and reminders, site survey scheduling, installation updates, inspection scheduling, permit and utility status updates (including PTO), service updates, and general project communications. We do not use your phone number for telemarketing or unsolicited promotional messages."
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "No Sharing of SMS Data:" }),
        " We do not sell, rent, share, or disclose your mobile phone number, SMS opt-in data, or any information collected in connection with our SMS program to any third parties for their marketing or promotional purposes. This includes but is not limited to lead generators, data brokers, and affiliate marketers. We may share your phone number only with our SMS service provider (Twilio) solely for the purpose of delivering text messages on our behalf."
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Message Frequency:" }),
        " Message frequency varies depending on the status of your solar project. You can typically expect 2–10 messages per month during active project phases."
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Message and Data Rates:" }),
        " Standard message and data rates may apply depending on your mobile carrier and plan. Pell Solar is not responsible for any charges imposed by your mobile carrier."
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Opt-Out:" }),
        " You may opt out of receiving text messages at any time by replying ",
        /* @__PURE__ */ jsx("strong", { children: "STOP" }),
        " to any message you receive from us. After opting out, you will receive one final confirmation message and will no longer receive SMS communications from Pell Solar unless you re-enroll."
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Help:" }),
        " For assistance with our SMS program, reply ",
        /* @__PURE__ */ jsx("strong", { children: "HELP" }),
        " to any message or contact us at ",
        /* @__PURE__ */ jsx("a", { href: "tel:8666468499", className: "text-[#2BABE2]", children: "(866) 646-8499 | (714) 455-3401 CA" }),
        " or ",
        /* @__PURE__ */ jsx("a", { href: "mailto:info@pellsolar.com", className: "text-[#2BABE2]", children: "info@pellsolar.com" }),
        "."
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Consent:" }),
        " Consent to receive text messages is not a condition of purchasing any goods or services from Pell Solar Inc."
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mt-8 mb-4", children: "How We Share Your Information" }),
      /* @__PURE__ */ jsx("p", { children: "We do not sell your personal information. We may share your information in the following limited circumstances:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Service Providers:" }),
          " We share information with third-party service providers who assist us in operating our business, such as payment processors, SMS delivery providers, email service providers, and CRM platforms. These providers are contractually obligated to protect your data and use it only for the purposes we specify."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Legal Requirements:" }),
          " We may disclose your information if required by law, regulation, legal process, or governmental request."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Business Transfers:" }),
          " In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "With Your Consent:" }),
          " We may share information for purposes not described in this policy with your explicit consent."
        ] })
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mt-8 mb-4", children: "Cookies and Tracking" }),
      /* @__PURE__ */ jsx("p", { children: "Our website may use cookies and similar tracking technologies to improve your browsing experience and analyze website traffic. You can manage your cookie preferences through your browser settings." }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mt-8 mb-4", children: "Data Security" }),
      /* @__PURE__ */ jsx("p", { children: "We implement reasonable technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure." }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mt-8 mb-4", children: "Data Retention" }),
      /* @__PURE__ */ jsx("p", { children: "We retain your personal information for as long as necessary to fulfill the purposes described in this policy, including to satisfy legal, accounting, or reporting obligations. If you opt out of our SMS program, we will promptly cease sending you text messages and remove your phone number from our active messaging list." }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mt-8 mb-4", children: "Your Rights" }),
      /* @__PURE__ */ jsx("p", { children: "Depending on your location, you may have the following rights:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Access:" }),
          " Request a copy of the personal information we hold about you."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Correction:" }),
          " Request correction of inaccurate or incomplete information."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Deletion:" }),
          " Request deletion of your personal information, subject to legal obligations."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Opt-Out:" }),
          " Opt out of text messages by replying STOP. Opt out of marketing emails by clicking the unsubscribe link."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "To exercise any of these rights, contact us at ",
        /* @__PURE__ */ jsx("a", { href: "mailto:info@pellsolar.com", className: "text-[#2BABE2]", children: "info@pellsolar.com" }),
        " or ",
        /* @__PURE__ */ jsx("a", { href: "tel:8666468499", className: "text-[#2BABE2]", children: "(866) 646-8499 | (714) 455-3401 CA" }),
        "."
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mt-8 mb-4", children: "Children's Privacy" }),
      /* @__PURE__ */ jsx("p", { children: "Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children." }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mt-8 mb-4", children: "Changes to This Privacy Policy" }),
      /* @__PURE__ */ jsx("p", { children: "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated “Last Updated” date. Your continued use of our website or services after any changes constitutes your acceptance of the updated policy." }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mt-8 mb-4", children: "Contact Us" }),
      /* @__PURE__ */ jsx("p", { children: "If you have questions about this Privacy Policy, please contact us:" }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Pell Solar Inc." }),
        /* @__PURE__ */ jsx("br", {}),
        "Phone: ",
        /* @__PURE__ */ jsx("a", { href: "tel:8666468499", className: "text-[#2BABE2]", children: "(866) 646-8499 | (714) 455-3401 CA" }),
        /* @__PURE__ */ jsx("br", {}),
        "Email: ",
        /* @__PURE__ */ jsx("a", { href: "mailto:info@pellsolar.com", className: "text-[#2BABE2]", children: "info@pellsolar.com" }),
        /* @__PURE__ */ jsx("br", {}),
        "Website: pellsolar.com"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mt-8", children: "Last updated: April 25, 2026 | Pell Solar Inc. | 1326 Monte Vista Ave #7, Upland, CA 91786" })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-[#0B1D51]", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-white mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Ready to Get Started?" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-300 text-lg mb-8 max-w-2xl mx-auto", children: "Free consultation. No pressure. No obligation. Family-owned solar company." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
        /* @__PURE__ */ jsx(Link, { href: "/get-quote", className: "btn-gold text-lg px-10 py-4", children: "Get Your Free Quote" }),
        /* @__PURE__ */ jsxs("a", { href: "tel:8666468499", className: "flex items-center justify-center gap-2 bg-white/10 text-white rounded-xl px-6 py-4 font-bold hover:bg-white/20 transition-colors", children: [
          /* @__PURE__ */ jsx(Phone, { size: 18, className: "text-yellow-400" }),
          " (866) 646-8499 | (714) 455-3401 CA"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
function Terms() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white", style: { fontFamily: "'Inter', system-ui, sans-serif" }, children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("section", { className: "bg-[#0B1D51] py-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6 text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-extrabold text-white mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Terms & Conditions" }),
      /* @__PURE__ */ jsx("p", { className: "text-white/70 text-lg", children: "Last updated: April 25, 2026" })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "\n            [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4\n            [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-6 [&_h3]:mb-2\n            [&_p]:text-gray-700 [&_p]:leading-relaxed [&_p]:mb-4\n            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul>li]:text-gray-700 [&_ul>li]:mb-1\n            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol>li]:text-gray-700 [&_ol>li]:mb-1\n            [&_strong]:font-bold [&_strong]:text-gray-900\n            [&_a]:text-[#2BABE2] [&_a]:font-semibold\n          ", children: [
        /* @__PURE__ */ jsx("p", { children: 'These Terms and Conditions ("Terms") govern your use of the Pell Solar website located at pellsolar.com (the "Site") and any services provided by Pell Solar, Inc. ("Pell Solar," "we," "us," or "our"). By accessing or using the Site, you agree to be bound by these Terms. If you do not agree, please do not use the Site.' }),
        /* @__PURE__ */ jsx("h2", { children: "1. Use of the Site" }),
        /* @__PURE__ */ jsx("p", { children: "You may use the Site for lawful purposes only. You agree not to:" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: "Use the Site in any way that violates applicable federal, state, or local laws or regulations" }),
          /* @__PURE__ */ jsx("li", { children: "Transmit any unsolicited or unauthorized advertising or promotional material" }),
          /* @__PURE__ */ jsx("li", { children: "Attempt to gain unauthorized access to any portion of the Site or its related systems" }),
          /* @__PURE__ */ jsx("li", { children: "Interfere with or disrupt the integrity or performance of the Site" }),
          /* @__PURE__ */ jsx("li", { children: "Collect or harvest any personally identifiable information from the Site" })
        ] }),
        /* @__PURE__ */ jsx("h2", { children: "2. Quote Requests and Lead Submissions" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "When you submit a quote request or contact form on the Site, you authorize Pell Solar to contact you by phone, email, or text message regarding solar products and services. You may opt out of communications at any time by contacting us at ",
          /* @__PURE__ */ jsx("a", { href: "mailto:info@pellsolar.com", children: "info@pellsolar.com" }),
          " or by replying STOP to any text message."
        ] }),
        /* @__PURE__ */ jsx("p", { children: "Quote requests are not binding contracts. All pricing, system design, and financing terms are subject to a formal proposal and signed agreement." }),
        /* @__PURE__ */ jsx("h2", { children: "3. Pricing and Estimates" }),
        /* @__PURE__ */ jsx("p", { children: "All pricing displayed on the Site is for illustrative purposes only and represents typical or starting prices. Actual pricing depends on system size, roof type, equipment selection, local permit fees, and other factors. Pell Solar will provide a formal written quote after assessing your specific situation." }),
        /* @__PURE__ */ jsx("p", { children: "Monthly payment estimates assume qualification for financing programs and are subject to credit approval. Savings estimates are projections based on historical utility rates and typical system performance — actual savings may vary." }),
        /* @__PURE__ */ jsx("h2", { children: "4. Intellectual Property" }),
        /* @__PURE__ */ jsx("p", { children: "All content on the Site — including text, graphics, logos, images, and software — is the property of Pell Solar or its content suppliers and is protected by United States and international copyright laws. You may not reproduce, distribute, modify, or create derivative works from any Site content without our express written permission." }),
        /* @__PURE__ */ jsx("p", { children: 'The Pell Solar name, logo, and "Let the Sun Shine In" tagline are trademarks of Pell Solar, Inc. All rights reserved.' }),
        /* @__PURE__ */ jsx("h2", { children: "5. Third-Party Links" }),
        /* @__PURE__ */ jsx("p", { children: "The Site may contain links to third-party websites, including manufacturer sites, financing partners, and review platforms. These links are provided for your convenience only. Pell Solar has no control over the content of those sites and accepts no responsibility for them or for any loss or damage that may arise from your use of them." }),
        /* @__PURE__ */ jsx("h2", { children: "6. Disclaimer of Warranties" }),
        /* @__PURE__ */ jsx("p", { children: 'THE SITE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. PELL SOLAR DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.' }),
        /* @__PURE__ */ jsx("p", { children: "We do not warrant that the Site will be uninterrupted, error-free, or free of viruses or other harmful components. We do not warrant the accuracy, completeness, or usefulness of any information on the Site." }),
        /* @__PURE__ */ jsx("h2", { children: "7. Limitation of Liability" }),
        /* @__PURE__ */ jsx("p", { children: "TO THE FULLEST EXTENT PERMITTED BY LAW, PELL SOLAR SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SITE OR RELIANCE ON ANY INFORMATION PROVIDED THEREIN, EVEN IF PELL SOLAR HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES." }),
        /* @__PURE__ */ jsx("p", { children: "Our total liability to you for any claim arising from your use of the Site shall not exceed $100." }),
        /* @__PURE__ */ jsx("h2", { children: "8. Installation Services" }),
        /* @__PURE__ */ jsx("p", { children: "Solar installation services are governed by a separate written contract between you and Pell Solar. These Terms do not constitute a service agreement. All installation warranties, guarantees, and service terms are set forth in the installation contract." }),
        /* @__PURE__ */ jsx("p", { children: "Pell Solar is licensed by the California Contractors State License Board (CSLB License #949122) and holds all required licenses in the states where we operate." }),
        /* @__PURE__ */ jsx("h2", { children: "9. Privacy" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Your use of the Site is also governed by our ",
          /* @__PURE__ */ jsx(Link, { href: "/privacy-policy", children: "Privacy Policy" }),
          ", which is incorporated into these Terms by reference. By using the Site, you consent to the collection and use of your information as described in the Privacy Policy."
        ] }),
        /* @__PURE__ */ jsx("h2", { children: "10. Changes to These Terms" }),
        /* @__PURE__ */ jsx("p", { children: "We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the Site. Your continued use of the Site after any changes constitutes your acceptance of the new Terms. We encourage you to review these Terms periodically." }),
        /* @__PURE__ */ jsx("h2", { children: "11. Governing Law" }),
        /* @__PURE__ */ jsx("p", { children: "These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any dispute arising from these Terms shall be resolved in the state or federal courts located in San Bernardino County, California." }),
        /* @__PURE__ */ jsx("h2", { children: "12. SMS/Text Messaging Terms" }),
        /* @__PURE__ */ jsx("p", { children: "By opting in to receive text messages from Pell Solar Inc., you agree to the following terms:" }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Program Description:" }),
          " Pell Solar Inc. offers an SMS notification program that provides customers with text message updates about their solar project. Messages may include appointment confirmations and reminders, site survey scheduling, installation updates, inspection scheduling, permit and utility status updates (including PTO approval), service updates, and general project communications."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Enrollment and Consent:" }),
          " You may enroll in our SMS program by: (1) completing the SMS opt-in form on our website at pellsolar.com/sms-updates, (2) providing verbal consent during a sales consultation or service appointment, or (3) signing a Pell Solar installation agreement that includes SMS consent language. By enrolling, you expressly consent to receive automated and recurring text messages from Pell Solar Inc. at the mobile phone number you provide. Consent is not required as a condition of purchasing any goods or services."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Message Frequency:" }),
          " Message frequency varies depending on the status of your solar project. During active project phases, you may receive approximately 2–10 messages per month. During inactive periods, message frequency may be lower or zero."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Message and Data Rates:" }),
          " Standard message and data rates may apply. Pell Solar Inc. is not responsible for any fees charged by your mobile carrier. Contact your carrier for details about your text messaging plan."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Opt-Out:" }),
          " You may opt out of receiving text messages at any time by replying ",
          /* @__PURE__ */ jsx("strong", { children: "STOP" }),
          " to any text message received from Pell Solar Inc. After sending STOP, you will receive one final confirmation message confirming your opt-out. You will not receive further SMS messages unless you re-enroll."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Help:" }),
          " For help or questions about the SMS program, reply ",
          /* @__PURE__ */ jsx("strong", { children: "HELP" }),
          " to any text message received from Pell Solar. You will receive a response: “Pell Solar: For assistance, call (866) 646-8499 or (714) 455-3401 (CA) or email info@pellsolar.com. Reply STOP to opt out. Msg & data rates may apply. Msg frequency varies.”"
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Supported Carriers:" }),
          " Supported carriers include but are not limited to AT&T, Verizon, T-Mobile, Sprint, U.S. Cellular, and other major US wireless carriers. Carriers are not liable for delayed or undelivered messages."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Privacy:" }),
          " Pell Solar Inc. does not sell, rent, or share your mobile phone number or SMS opt-in data with third parties for marketing or promotional purposes. For complete details, see our ",
          /* @__PURE__ */ jsx(Link, { href: "/privacy-policy", children: "Privacy Policy" }),
          "."
        ] }),
        /* @__PURE__ */ jsx("h2", { children: "13. Contact Us" }),
        /* @__PURE__ */ jsx("p", { children: "If you have questions about these Terms, please contact us:" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("strong", { children: "Pell Solar, Inc." }) }),
          /* @__PURE__ */ jsx("li", { children: "1326 Monte Vista Ave #7, Upland, CA 91786" }),
          /* @__PURE__ */ jsxs("li", { children: [
            "Phone: ",
            /* @__PURE__ */ jsx("a", { href: "tel:8666468499", children: "(866) 646-8499" }),
            " | ",
            /* @__PURE__ */ jsx("a", { href: "tel:7144553401", children: "(714) 455-3401" }),
            " (CA Local)"
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            "Email: ",
            /* @__PURE__ */ jsx("a", { href: "mailto:info@pellsolar.com", children: "info@pellsolar.com" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsx(Link, { href: "/privacy-policy", className: "text-[#2BABE2] font-semibold no-underline hover:underline", children: "View Privacy Policy →" }),
        /* @__PURE__ */ jsx(Link, { href: "/", className: "text-gray-500 font-medium no-underline hover:text-gray-800", children: "← Back to Home" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
function SmsOptIn() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    consent: false
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  function validate() {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "First name is required.";
    if (!form.lastName.trim()) e.lastName = "Last name is required.";
    if (!form.phone.trim()) e.phone = "Mobile phone number is required.";
    else if (!/^\+?[\d\s\-().]{7,}$/.test(form.phone))
      e.phone = "Please enter a valid phone number.";
    if (!form.email.trim()) e.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email address.";
    if (!form.consent)
      e.consent = "You must check the consent box to sign up for SMS updates.";
    return e;
  }
  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return /* @__PURE__ */ jsxs("div", { style: { background: "#f8f9fb", minHeight: "100vh", paddingTop: 80, paddingBottom: 60 }, children: [
    /* @__PURE__ */ jsx("div", { style: { background: "linear-gradient(135deg, #0B1D51 0%, #1a3a8f 100%)", padding: "48px 24px 40px", textAlign: "center", marginBottom: 0 }, children: /* @__PURE__ */ jsxs("div", { style: { maxWidth: 680, margin: "0 auto" }, children: [
      /* @__PURE__ */ jsx("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 16 }, children: /* @__PURE__ */ jsx("img", { src: "/pell-solar-logo.png", alt: "Pell Solar", style: { height: 48 }, onError: (e) => {
        e.target.style.display = "none";
      } }) }),
      /* @__PURE__ */ jsx("h1", { style: { color: "#FED44D", fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 800, margin: "0 0 12px", letterSpacing: "-0.5px" }, children: "Stay Informed About Your Solar Project" }),
      /* @__PURE__ */ jsx("p", { style: { color: "rgba(255,255,255,0.85)", fontSize: "1rem", margin: 0, lineHeight: 1.6 }, children: "Sign up to receive text message updates from Pell Solar Inc. about your solar project." })
    ] }) }),
    /* @__PURE__ */ jsx("div", { style: { maxWidth: 680, margin: "0 auto", padding: "0 16px" }, children: submitted ? (
      /* Confirmation Message */
      /* @__PURE__ */ jsxs("div", { style: { background: "#fff", borderRadius: 16, padding: "48px 32px", textAlign: "center", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", marginTop: 32 }, children: [
        /* @__PURE__ */ jsx("div", { style: { fontSize: 56, marginBottom: 16 }, children: "✅" }),
        /* @__PURE__ */ jsx("h2", { style: { color: "#0B1D51", fontSize: "1.5rem", fontWeight: 700, marginBottom: 16 }, children: "You're Enrolled!" }),
        /* @__PURE__ */ jsxs("p", { style: { color: "#444", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: 24 }, children: [
          "Thank you! You have been enrolled in Pell Solar SMS updates. You will receive a confirmation text shortly. Reply ",
          /* @__PURE__ */ jsx("strong", { children: "STOP" }),
          " at any time to opt out."
        ] }),
        /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsx("a", { style: { display: "inline-block", background: "#FED44D", color: "#0B1D51", fontWeight: 700, padding: "14px 32px", borderRadius: 8, textDecoration: "none", fontSize: "0.95rem" }, children: "← Back to Home" }) })
      ] })
    ) : (
      /* Opt-In Form */
      /* @__PURE__ */ jsxs("div", { style: { background: "#fff", borderRadius: 16, padding: "36px 32px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", marginTop: 32 }, children: [
        /* @__PURE__ */ jsx("p", { style: { color: "#555", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: 28, borderLeft: "4px solid #2BABE2", paddingLeft: 16, background: "#f0f8ff", borderRadius: "0 8px 8px 0", padding: "12px 16px" }, children: "Messages may include appointment confirmations, site survey scheduling, installation updates, inspection scheduling, permit and utility status updates, PTO notifications, service updates, and general project communications." }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, noValidate: true, children: [
          /* @__PURE__ */ jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }, children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { style: { display: "block", color: "#0B1D51", fontWeight: 600, fontSize: "0.9rem", marginBottom: 6 }, children: [
                "First Name ",
                /* @__PURE__ */ jsx("span", { style: { color: "#e53e3e" }, children: "*" })
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: form.firstName,
                  onChange: (e) => setForm({ ...form, firstName: e.target.value }),
                  placeholder: "John",
                  style: { width: "100%", padding: "12px 14px", border: errors.firstName ? "2px solid #e53e3e" : "2px solid #e2e8f0", borderRadius: 8, fontSize: "1rem", outline: "none", boxSizing: "border-box" }
                }
              ),
              errors.firstName && /* @__PURE__ */ jsx("p", { style: { color: "#e53e3e", fontSize: "0.8rem", marginTop: 4 }, children: errors.firstName })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { style: { display: "block", color: "#0B1D51", fontWeight: 600, fontSize: "0.9rem", marginBottom: 6 }, children: [
                "Last Name ",
                /* @__PURE__ */ jsx("span", { style: { color: "#e53e3e" }, children: "*" })
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: form.lastName,
                  onChange: (e) => setForm({ ...form, lastName: e.target.value }),
                  placeholder: "Smith",
                  style: { width: "100%", padding: "12px 14px", border: errors.lastName ? "2px solid #e53e3e" : "2px solid #e2e8f0", borderRadius: 8, fontSize: "1rem", outline: "none", boxSizing: "border-box" }
                }
              ),
              errors.lastName && /* @__PURE__ */ jsx("p", { style: { color: "#e53e3e", fontSize: "0.8rem", marginTop: 4 }, children: errors.lastName })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { marginBottom: 16 }, children: [
            /* @__PURE__ */ jsxs("label", { style: { display: "block", color: "#0B1D51", fontWeight: 600, fontSize: "0.9rem", marginBottom: 6 }, children: [
              "Mobile Phone Number ",
              /* @__PURE__ */ jsx("span", { style: { color: "#e53e3e" }, children: "*" })
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "tel",
                value: form.phone,
                onChange: (e) => setForm({ ...form, phone: e.target.value }),
                placeholder: "(555) 555-5555",
                style: { width: "100%", padding: "12px 14px", border: errors.phone ? "2px solid #e53e3e" : "2px solid #e2e8f0", borderRadius: 8, fontSize: "1rem", outline: "none", boxSizing: "border-box" }
              }
            ),
            errors.phone && /* @__PURE__ */ jsx("p", { style: { color: "#e53e3e", fontSize: "0.8rem", marginTop: 4 }, children: errors.phone })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { marginBottom: 24 }, children: [
            /* @__PURE__ */ jsxs("label", { style: { display: "block", color: "#0B1D51", fontWeight: 600, fontSize: "0.9rem", marginBottom: 6 }, children: [
              "Email Address ",
              /* @__PURE__ */ jsx("span", { style: { color: "#e53e3e" }, children: "*" })
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                value: form.email,
                onChange: (e) => setForm({ ...form, email: e.target.value }),
                placeholder: "john@example.com",
                style: { width: "100%", padding: "12px 14px", border: errors.email ? "2px solid #e53e3e" : "2px solid #e2e8f0", borderRadius: 8, fontSize: "1rem", outline: "none", boxSizing: "border-box" }
              }
            ),
            errors.email && /* @__PURE__ */ jsx("p", { style: { color: "#e53e3e", fontSize: "0.8rem", marginTop: 4 }, children: errors.email })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { background: "#f8f9fb", border: errors.consent ? "2px solid #e53e3e" : "2px solid #e2e8f0", borderRadius: 10, padding: "16px 18px", marginBottom: 24 }, children: [
            /* @__PURE__ */ jsxs("label", { style: { display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer" }, children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: form.consent,
                  onChange: (e) => setForm({ ...form, consent: e.target.checked }),
                  style: { width: 20, height: 20, marginTop: 2, flexShrink: 0, accentColor: "#0B1D51", cursor: "pointer" }
                }
              ),
              /* @__PURE__ */ jsxs("span", { style: { color: "#333", fontSize: "0.85rem", lineHeight: 1.6 }, children: [
                "By checking this box, I agree to receive automated and recurring text messages from Pell Solar Inc. at the mobile phone number provided above. Messages relate to my solar project including appointment confirmations, scheduling, installation updates, permit status, and service communications. Message frequency varies based on project status, typically 2–10 messages per month. Message and data rates may apply. Consent is not a condition of purchase or service. You can opt out at any time by replying ",
                /* @__PURE__ */ jsx("strong", { children: "STOP" }),
                " to any message. Reply ",
                /* @__PURE__ */ jsx("strong", { children: "HELP" }),
                " for assistance. View our",
                " ",
                /* @__PURE__ */ jsx(Link, { href: "/privacy-policy", children: /* @__PURE__ */ jsx("a", { style: { color: "#2BABE2", textDecoration: "underline" }, children: "Privacy Policy" }) }),
                " ",
                "and",
                " ",
                /* @__PURE__ */ jsx(Link, { href: "/terms-and-conditions", children: /* @__PURE__ */ jsx("a", { style: { color: "#2BABE2", textDecoration: "underline" }, children: "Terms and Conditions" }) }),
                "."
              ] })
            ] }),
            errors.consent && /* @__PURE__ */ jsx("p", { style: { color: "#e53e3e", fontSize: "0.8rem", marginTop: 8, marginLeft: 32 }, children: errors.consent })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              style: { width: "100%", background: "#FED44D", color: "#0B1D51", fontWeight: 800, fontSize: "1rem", padding: "16px", borderRadius: 10, border: "none", cursor: "pointer", letterSpacing: "0.5px", textTransform: "uppercase" },
              children: "Sign Up for SMS Updates"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { style: { marginTop: 24, padding: "16px", background: "#f8f9fb", borderRadius: 8, borderLeft: "3px solid #ccc" }, children: /* @__PURE__ */ jsxs("p", { style: { color: "#666", fontSize: "0.78rem", lineHeight: 1.6, margin: 0 }, children: [
          "Pell Solar Inc. respects your privacy. We will never sell, rent, or share your mobile phone number or any information collected through this SMS opt-in program with third parties for marketing or promotional purposes. Supported carriers include all major US carriers. T-Mobile is not liable for delayed or undelivered messages. For questions about this SMS program, contact us at",
          " ",
          /* @__PURE__ */ jsx("a", { href: "tel:+18666468499", style: { color: "#2BABE2" }, children: "(866) 646-8499" }),
          " or",
          " ",
          /* @__PURE__ */ jsx("a", { href: "mailto:info@pellsolar.com", style: { color: "#2BABE2" }, children: "info@pellsolar.com" }),
          "."
        ] }) })
      ] })
    ) })
  ] });
}
const HERO_IMG$9 = "/manus-storage/california-home_f656624c.jpg";
const CA_REGIONS = [
  {
    name: "Inland Empire",
    counties: ["San Bernardino County", "Riverside County"],
    cities: ["Ontario", "Upland", "Rancho Cucamonga", "Fontana", "San Bernardino", "Riverside", "Corona", "Temecula", "Murrieta", "Redlands", "Yucaipa", "Beaumont", "Hemet", "Lake Elsinore", "Menifee", "Eastvale", "Banning", "Claremont", "Glendora"]
  },
  {
    name: "Los Angeles County",
    counties: ["Los Angeles County"],
    cities: ["Los Angeles", "Pasadena", "West Covina", "Pomona", "Diamond Bar", "Long Beach", "Burbank", "Lancaster", "Palmdale"]
  },
  {
    name: "Orange County",
    counties: ["Orange County"],
    cities: ["Anaheim", "Irvine", "Orange", "Fullerton", "Garden Grove", "Santa Ana"]
  },
  {
    name: "Ventura & Central CA",
    counties: ["Ventura County", "Kern County"],
    cities: ["Ventura", "Thousand Oaks", "Bakersfield", "Palm Springs"]
  }
];
const CA_ZIP_PREFIXES$1 = ["900", "901", "902", "903", "904", "905", "906", "907", "908", "909", "910", "911", "912", "913", "914", "915", "916", "917", "918", "919", "920", "921", "922", "923", "924", "925", "926", "927", "928", "930", "931", "932", "933", "934", "935", "936", "937", "938", "939", "940", "941", "942", "943", "944", "945", "946", "947", "948", "949", "950", "951", "952", "953", "954", "955", "956", "957", "958", "959", "960", "961"];
const ID_ZIP_PREFIXES$1 = ["836", "837", "838", "839"];
function isServiceableZip$1(zip) {
  const prefix3 = zip.slice(0, 3);
  if (CA_ZIP_PREFIXES$1.includes(prefix3)) return "ca";
  if (ID_ZIP_PREFIXES$1.includes(prefix3)) return "id";
  return null;
}
function SolarPanelsinCaliforniaPage() {
  const [zip, setZip] = useState("");
  const [zipResult, setZipResult] = useState(null);
  const checkZip = () => {
    if (zip.length !== 5) return;
    const result = isServiceableZip$1(zip);
    setZipResult(result ?? "no");
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white", style: { fontFamily: "'Inter', system-ui, sans-serif" }, children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("section", { className: "relative py-20 flex items-center", style: { backgroundImage: `linear-gradient(135deg, rgba(11,29,81,0.55), rgba(11,29,81,0.35)), url(${HERO_IMG$9})`, backgroundSize: "cover", backgroundPosition: "center" }, children: /* @__PURE__ */ jsxs("div", { className: "relative z-10 container mx-auto px-6 pt-12", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[#2BABE2] font-bold text-xs tracking-widest uppercase mb-3", children: "CALIFORNIA SOLAR" }),
      /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-extrabold text-white mb-4 max-w-2xl", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Solar Panels in California" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-200 max-w-xl mb-8 leading-relaxed", children: "Pell Solar serves homeowners throughout Southern California, including the Inland Empire, LA County, Orange County, and beyond." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
        /* @__PURE__ */ jsx(Link, { href: "/get-quote", className: "inline-block bg-[#FED44D] text-[#0B1D51] font-bold px-8 py-3 rounded-lg no-underline hover:opacity-90 transition-opacity", children: "Get Your Free Quote" }),
        /* @__PURE__ */ jsxs("a", { href: "tel:8666468499", className: "inline-flex items-center gap-2 bg-white/10 text-white font-bold px-8 py-3 rounded-lg hover:bg-white/20 transition-colors", children: [
          /* @__PURE__ */ jsx(Phone, { size: 16, className: "text-yellow-400" }),
          " (866) 646-8499"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12 bg-[#0B1D51]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-xl mx-auto px-6 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-white mb-2", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Do We Serve Your Area?" }),
      /* @__PURE__ */ jsx("p", { className: "text-white/60 text-sm mb-5", children: "Enter your zip code to find out instantly." }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            maxLength: 5,
            value: zip,
            onChange: (e) => {
              setZip(e.target.value.replace(/\D/g, ""));
              setZipResult(null);
            },
            onKeyDown: (e) => e.key === "Enter" && checkZip(),
            placeholder: "Enter zip code",
            className: "flex-1 px-4 py-3 rounded-lg text-gray-900 font-semibold text-center text-lg focus:outline-none focus:ring-2 focus:ring-[#FED44D]"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: checkZip,
            className: "bg-[#FED44D] text-[#0B1D51] font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity",
            children: "Check"
          }
        )
      ] }),
      zipResult === "ca" && /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-center gap-2 text-green-400 font-semibold", children: [
        /* @__PURE__ */ jsx(CheckCircle, { size: 18 }),
        " Great news — we serve your area in Southern California!"
      ] }),
      zipResult === "id" && /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-center gap-2 text-green-400 font-semibold", children: [
        /* @__PURE__ */ jsx(CheckCircle, { size: 18 }),
        " Great news — we serve your area in Idaho!"
      ] }),
      zipResult === "no" && /* @__PURE__ */ jsxs("div", { className: "mt-4 text-white/60 text-sm", children: [
        "We don't currently serve that zip code. Call us at ",
        /* @__PURE__ */ jsx("a", { href: "tel:8666468499", className: "text-[#FED44D] font-semibold", children: "(866) 646-8499" }),
        " to check if we can help."
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-extrabold text-gray-900 mb-3 text-center", style: { fontFamily: "'Montserrat', sans-serif" }, children: [
        "Where We Install in ",
        /* @__PURE__ */ jsx("span", { className: "text-[#2BABE2]", children: "California" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-center mb-10 max-w-2xl mx-auto", children: "We cover all of Southern California — from the Inland Empire to the coast. If you're in the greater Los Angeles, Orange County, or Inland Empire area, we can help." }),
      /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-6 mb-10", children: CA_REGIONS.map((region) => /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:border-[#2BABE2] transition-colors", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsx(MapPin, { size: 18, className: "text-[#2BABE2]" }),
          /* @__PURE__ */ jsx("h3", { className: "font-extrabold text-[#0B1D51] text-lg", style: { fontFamily: "'Montserrat', sans-serif" }, children: region.name })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 uppercase tracking-wider mb-3", children: region.counties.join(" • ") }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm leading-relaxed", children: region.cities.join(", ") })
      ] }, region.name)) }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#0B1D51] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsx(MapPin, { size: 18, className: "text-[#FED44D]" }),
            /* @__PURE__ */ jsx("h3", { className: "font-extrabold text-white text-lg", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Idaho — Treasure Valley" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-white/60 text-sm", children: "Boise · Meridian · Nampa · Eagle · Kuna · Star · Caldwell" })
        ] }),
        /* @__PURE__ */ jsx("a", { href: "tel:2085031416", className: "shrink-0 bg-[#FED44D] text-[#0B1D51] font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap", children: "(208) 503-1416" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "pb-16 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx("div", { className: "rounded-2xl overflow-hidden shadow-md border border-gray-200", style: { height: "380px" }, children: /* @__PURE__ */ jsx(
        "iframe",
        {
          title: "Pell Solar Service Area Map",
          src: "https://www.google.com/maps?q=Inland%20Empire%2C%20California&output=embed",
          width: "100%",
          height: "100%",
          style: { border: 0 },
          allowFullScreen: true,
          loading: "lazy",
          referrerPolicy: "no-referrer-when-downgrade"
        }
      ) }),
      /* @__PURE__ */ jsx("p", { className: "text-center text-gray-400 text-xs mt-3", children: "Serving Southern California & Idaho's Treasure Valley" })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 max-w-3xl text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-extrabold text-gray-900 mb-6", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Why California Is Perfect for Solar" }),
      /* @__PURE__ */ jsxs("div", { className: "text-gray-600 text-lg leading-relaxed space-y-4", children: [
        /* @__PURE__ */ jsx("p", { children: "California has the highest electricity rates in the continental US and some of the best solar resources in the world. With 5.5–6.5 average peak sun hours per day, a properly designed solar system can eliminate your electric bill entirely." }),
        /* @__PURE__ */ jsx("p", { children: "Under NEM 3.0, pairing solar with a Tesla Powerwall battery is essential for maximizing savings. Store your energy during the day and use it from 4–9 PM when Edison charges the highest rates." })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-[#0B1D51]", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-white mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Ready to Get Started?" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-300 text-lg mb-8 max-w-2xl mx-auto", children: "Free consultation. No pressure. No obligation. Family-owned solar company." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
        /* @__PURE__ */ jsx(Link, { href: "/get-quote", className: "inline-block bg-[#FED44D] text-[#0B1D51] font-bold text-lg px-10 py-4 rounded-lg no-underline hover:opacity-90 transition-opacity", children: "Get Your Free Quote" }),
        /* @__PURE__ */ jsxs("a", { href: "tel:8666468499", className: "inline-flex items-center justify-center gap-2 bg-white/10 text-white rounded-lg px-6 py-4 font-bold hover:bg-white/20 transition-colors", children: [
          /* @__PURE__ */ jsx(Phone, { size: 18, className: "text-yellow-400" }),
          " (866) 646-8499"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const HERO_IMG$8 = "/manus-storage/idaho-home_f4a8226d.jpg";
const ID_REGIONS = [
  {
    name: "Boise Metro",
    counties: ["Ada County"],
    cities: ["Boise", "Meridian", "Eagle", "Star", "Garden City", "Kuna"]
  },
  {
    name: "Treasure Valley West",
    counties: ["Canyon County"],
    cities: ["Nampa", "Caldwell", "Middleton", "Notus", "Parma"]
  }
];
const ID_ZIP_PREFIXES = ["836", "837", "838", "839"];
const CA_ZIP_PREFIXES = ["900", "901", "902", "903", "904", "905", "906", "907", "908", "909", "910", "911", "912", "913", "914", "915", "916", "917", "918", "919", "920", "921", "922", "923", "924", "925", "926", "927", "928", "930", "931", "932", "933", "934", "935", "936", "937", "938", "939", "940", "941", "942", "943", "944", "945", "946", "947", "948", "949", "950", "951", "952", "953", "954", "955", "956", "957", "958", "959", "960", "961"];
function isServiceableZip(zip) {
  const prefix3 = zip.slice(0, 3);
  if (CA_ZIP_PREFIXES.includes(prefix3)) return "ca";
  if (ID_ZIP_PREFIXES.includes(prefix3)) return "id";
  return null;
}
function SolarPanelsinIdahoPage() {
  const [zip, setZip] = useState("");
  const [zipResult, setZipResult] = useState(null);
  const checkZip = () => {
    if (zip.length !== 5) return;
    const result = isServiceableZip(zip);
    setZipResult(result ?? "no");
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white", style: { fontFamily: "'Inter', system-ui, sans-serif" }, children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("section", { className: "relative py-20 flex items-center", style: { backgroundImage: `linear-gradient(135deg, rgba(11,29,81,0.55), rgba(11,29,81,0.35)), url(${HERO_IMG$8})`, backgroundSize: "cover", backgroundPosition: "center" }, children: /* @__PURE__ */ jsxs("div", { className: "relative z-10 container mx-auto px-6 pt-12", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[#2BABE2] font-bold text-xs tracking-widest uppercase mb-3", children: "IDAHO SOLAR" }),
      /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-extrabold text-white mb-4 max-w-2xl", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Solar Panels in Idaho" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-200 max-w-xl mb-8 leading-relaxed", children: "Pell Solar serves the Treasure Valley — Boise, Meridian, Nampa, Eagle, Kuna, and surrounding areas. Idaho's net metering program makes solar an excellent investment." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
        /* @__PURE__ */ jsx(Link, { href: "/get-quote", className: "inline-block bg-[#FED44D] text-[#0B1D51] font-bold px-8 py-3 rounded-lg no-underline hover:opacity-90 transition-opacity", children: "Get Your Free Quote" }),
        /* @__PURE__ */ jsxs("a", { href: "tel:2085031416", className: "inline-flex items-center gap-2 bg-white/10 text-white font-bold px-8 py-3 rounded-lg hover:bg-white/20 transition-colors", children: [
          /* @__PURE__ */ jsx(Phone, { size: 16, className: "text-yellow-400" }),
          " (208) 503-1416"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12 bg-[#0B1D51]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-xl mx-auto px-6 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-white mb-2", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Do We Serve Your Area?" }),
      /* @__PURE__ */ jsx("p", { className: "text-white/60 text-sm mb-5", children: "Enter your zip code to find out instantly." }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            maxLength: 5,
            value: zip,
            onChange: (e) => {
              setZip(e.target.value.replace(/\D/g, ""));
              setZipResult(null);
            },
            onKeyDown: (e) => e.key === "Enter" && checkZip(),
            placeholder: "Enter zip code",
            className: "flex-1 px-4 py-3 rounded-lg text-gray-900 font-semibold text-center text-lg focus:outline-none focus:ring-2 focus:ring-[#FED44D]"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: checkZip,
            className: "bg-[#FED44D] text-[#0B1D51] font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity",
            children: "Check"
          }
        )
      ] }),
      zipResult === "id" && /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-center gap-2 text-green-400 font-semibold", children: [
        /* @__PURE__ */ jsx(CheckCircle, { size: 18 }),
        " Great news — we serve your area in Idaho!"
      ] }),
      zipResult === "ca" && /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-center gap-2 text-green-400 font-semibold", children: [
        /* @__PURE__ */ jsx(CheckCircle, { size: 18 }),
        " Great news — we also serve Southern California!"
      ] }),
      zipResult === "no" && /* @__PURE__ */ jsxs("div", { className: "mt-4 text-white/60 text-sm", children: [
        "We don't currently serve that zip code. Call us at ",
        /* @__PURE__ */ jsx("a", { href: "tel:2085031416", className: "text-[#FED44D] font-semibold", children: "(208) 503-1416" }),
        " to check if we can help."
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-extrabold text-gray-900 mb-3 text-center", style: { fontFamily: "'Montserrat', sans-serif" }, children: [
        "Where We Install in the ",
        /* @__PURE__ */ jsx("span", { className: "text-[#2BABE2]", children: "Treasure Valley" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-center mb-10 max-w-2xl mx-auto", children: "We cover the entire Boise metro area and Canyon County. If you're in the Treasure Valley, we can design and install your system." }),
      /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-6 mb-8", children: ID_REGIONS.map((region) => /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:border-[#2BABE2] transition-colors", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsx(MapPin, { size: 18, className: "text-[#2BABE2]" }),
          /* @__PURE__ */ jsx("h3", { className: "font-extrabold text-[#0B1D51] text-lg", style: { fontFamily: "'Montserrat', sans-serif" }, children: region.name })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 uppercase tracking-wider mb-3", children: region.counties.join(" • ") }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm leading-relaxed", children: region.cities.join(", ") })
      ] }, region.name)) }),
      /* @__PURE__ */ jsx("div", { className: "rounded-2xl overflow-hidden shadow-md border border-gray-200 mb-8", style: { height: "320px" }, children: /* @__PURE__ */ jsx(
        "iframe",
        {
          title: "Pell Solar Idaho Service Area",
          src: "https://www.google.com/maps?q=Boise%2C%20Idaho&output=embed",
          width: "100%",
          height: "100%",
          style: { border: 0 },
          allowFullScreen: true,
          loading: "lazy",
          referrerPolicy: "no-referrer-when-downgrade"
        }
      ) }),
      /* @__PURE__ */ jsx("p", { className: "text-center text-gray-400 text-xs", children: "Idaho Office: Eagle, ID — serving the entire Treasure Valley" })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 max-w-4xl", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-extrabold text-gray-900 mb-6 text-center", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Solar in the Treasure Valley" }),
      /* @__PURE__ */ jsxs("div", { className: "text-gray-600 text-lg leading-relaxed space-y-4 max-w-3xl mx-auto mb-12", children: [
        /* @__PURE__ */ jsx("p", { children: "Idaho offers some of the best solar incentives in the region. With Idaho Power's net metering program, you receive full retail credit for excess solar energy — making solar panels an excellent investment for Treasure Valley homeowners." }),
        /* @__PURE__ */ jsx("p", { children: "Boise averages 5.5 peak sun hours per day, and Idaho Power's rates continue to rise. A properly sized solar system can eliminate your electric bill and protect you from future rate increases." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-6", children: [
        { title: "Net Metering", desc: "Idaho Power offers full retail credit for excess solar energy sent back to the grid.", icon: "⚡" },
        { title: "Federal Tax Credit", desc: "Claim the federal solar tax credit when you purchase or finance your system.", icon: "💰" },
        { title: "Property Tax Exemption", desc: "Solar installations are exempt from property tax increases in Idaho.", icon: "🏠" }
      ].map(({ title, desc, icon }) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 border border-gray-200 text-center shadow-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "text-3xl mb-3", children: icon }),
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-900 mb-2", children: title }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm", children: desc })
      ] }, title)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-[#0B1D51]", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-white mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Ready to Get Started?" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-300 text-lg mb-8 max-w-2xl mx-auto", children: "Free consultation. No pressure. No obligation. Family-owned solar company." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
        /* @__PURE__ */ jsx(Link, { href: "/get-quote", className: "inline-block bg-[#FED44D] text-[#0B1D51] font-bold text-lg px-10 py-4 rounded-lg no-underline hover:opacity-90 transition-opacity", children: "Get Your Free Quote" }),
        /* @__PURE__ */ jsxs("a", { href: "tel:2085031416", className: "inline-flex items-center justify-center gap-2 bg-white/10 text-white rounded-lg px-6 py-4 font-bold hover:bg-white/20 transition-colors", children: [
          /* @__PURE__ */ jsx(Phone, { size: 18, className: "text-yellow-400" }),
          " (208) 503-1416"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const FILTERS = [
  { key: "all", label: "All Projects" },
  { key: "solar", label: "Solar Panels" },
  { key: "battery", label: "Battery + Solar" },
  { key: "ev-charging", label: "EV Charging" },
  { key: "roofing", label: "Roofing" },
  { key: "other", label: "Other" }
];
function OurWork() {
  const [active, setActive] = useState("all");
  const { data: photos = [], isLoading } = trpc.photos.list.useQuery(
    { category: active === "all" ? void 0 : active },
    { staleTime: 6e4 }
  );
  const filtered = photos;
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white", style: { fontFamily: "'Inter', system-ui, sans-serif" }, children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs(
      "section",
      {
        className: "relative py-28 md:py-36",
        style: { backgroundImage: `url(/manus-storage/installers-on-roof_392a0eff.png)`, backgroundSize: "cover", backgroundPosition: "center top" },
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#0B1D51]/60" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-4xl mx-auto px-6 text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[#FED44D] font-bold text-sm tracking-widest uppercase mb-4", children: "OUR WORK • LICENSED CALIFORNIA CONTRACTOR" }),
            /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6", style: { fontFamily: "'Montserrat', sans-serif" }, children: [
              "Real Installations on ",
              /* @__PURE__ */ jsx("span", { style: { color: "#FED44D" }, children: "Real Homes" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-lg text-white/80 max-w-3xl mx-auto mb-10", children: "Every system you see here was custom-designed, permitted, and installed by our own licensed crews. No subcontractors. No shortcuts. Browse our completed projects across Southern California and Idaho." }),
            /* @__PURE__ */ jsx(Link, { href: "/get-quote", className: "inline-block font-bold text-lg px-10 py-4 rounded-full no-underline transition-all hover:opacity-90", style: { background: "#FED44D", color: "#0B1D51" }, children: "GET YOUR FREE QUOTE →" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx("section", { className: "py-10 bg-white border-b border-gray-100", children: /* @__PURE__ */ jsx("div", { className: "max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center", children: [
      { num: "Solar", label: "PANEL SYSTEMS" },
      { num: "Battery", label: "STORAGE OPTIONS" },
      { num: "EV", label: "CHARGING" },
      { num: "#949122", label: "CA LICENSE" }
    ].map((s) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "text-3xl md:text-4xl font-extrabold", style: { color: "#2BABE2", fontFamily: "'Montserrat', sans-serif" }, children: s.num }),
      /* @__PURE__ */ jsx("div", { className: "text-xs font-bold tracking-widest text-gray-500 mt-1", children: s.label })
    ] }, s.label)) }) }),
    /* @__PURE__ */ jsx("section", { className: "pt-10 pb-4 bg-white", children: /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto px-6 flex flex-wrap gap-3 justify-center", children: FILTERS.filter((f) => f.key === "all" || photos.some((p) => p.category === f.key) || active === f.key).map((f) => /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setActive(f.key),
        className: "px-5 py-2 rounded-full text-sm font-bold transition-all border cursor-pointer",
        style: active === f.key ? { background: "#2BABE2", color: "#fff", borderColor: "#2BABE2" } : { background: "white", color: "#0B1D51", borderColor: "#d1d5db" },
        children: f.label
      },
      f.key
    )) }) }),
    /* @__PURE__ */ jsx("section", { className: "pb-16 bg-white", children: /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto px-4 pt-6", children: isLoading ? /* @__PURE__ */ jsx("div", { className: "columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4", children: Array.from({ length: 9 }).map((_, i) => /* @__PURE__ */ jsx("div", { className: "break-inside-avoid rounded-xl bg-gray-100 animate-pulse", style: { height: `${180 + i % 3 * 60}px` } }, i)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-20 text-gray-400", children: [
      /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold", children: "No photos in this category yet." }),
      /* @__PURE__ */ jsx("p", { className: "text-sm mt-2", children: "Check back soon — we're always adding new projects." })
    ] }) : /* @__PURE__ */ jsx("div", { className: "columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4", children: filtered.map((item) => /* @__PURE__ */ jsxs("div", { className: "break-inside-avoid relative group overflow-hidden rounded-xl shadow-md", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: item.imageUrl,
          alt: item.title,
          className: "w-full object-cover transition-transform duration-300 group-hover:scale-105",
          style: { display: "block", minHeight: "180px" },
          loading: "lazy"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4", children: [
        /* @__PURE__ */ jsx("span", { className: "inline-block text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded mb-1", style: { background: "#FED44D", color: "#0B1D51" }, children: item.category === "ev-charging" ? "EV Charging" : item.category.charAt(0).toUpperCase() + item.category.slice(1) }),
        /* @__PURE__ */ jsx("p", { className: "text-white text-sm font-semibold leading-tight", children: item.title }),
        item.location && /* @__PURE__ */ jsxs("p", { className: "text-white/60 text-xs mt-0.5", children: [
          "📍 ",
          item.location
        ] })
      ] })
    ] }, item.id)) }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-[#0B1D51] text-center", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-white mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Want Your Home to Look Like This?" }),
      /* @__PURE__ */ jsx("p", { className: "text-white/70 text-lg mb-8", children: "Every project starts with a free consultation. We'll evaluate your roof, your usage, and design a system that eliminates your electric bill." }),
      /* @__PURE__ */ jsx(Link, { href: "/get-quote", className: "inline-block font-bold text-lg px-10 py-4 rounded-full no-underline transition-all hover:opacity-90", style: { background: "#FED44D", color: "#0B1D51" }, children: "GET YOUR FREE QUOTE" })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-white", children: /* @__PURE__ */ jsx("div", { className: "max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center", children: [
      { title: "Family-Owned", body: "A local solar company serving Southern California and Idaho." },
      { title: "Tesla Certified", body: "Factory-trained to install Powerwall, solar, and Wall Connectors." },
      { title: "Our Own Crews", body: "Licensed electricians and installers on every job. We never outsource." },
      { title: "Personalized Service", body: "Straightforward guidance from consultation through installation and support." }
    ].map((c) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "font-extrabold text-lg mb-2", style: { color: "#0B1D51", fontFamily: "'Montserrat', sans-serif" }, children: c.title }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm", children: c.body })
    ] }, c.title)) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-extrabold text-center mb-10", style: { color: "#0B1D51", fontFamily: "'Montserrat', sans-serif" }, children: "Explore More" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: [
        { href: "/solar-panel-systems", title: "Solar Panel Systems", body: "See how we design & build your system" },
        { href: "/tesla-powerwall", title: "Tesla Powerwall 3", body: "Whole-home backup & peak protection" },
        { href: "/financing", title: "Financing Options", body: "$0 down, flexible monthly payments" },
        { href: "/nem-3", title: "NEM 3.0 Explained", body: "Why batteries are essential now" },
        { href: "/reviews", title: "Customer Reviews", body: "Read current feedback on Google and Yelp" },
        { href: "/ev-charging", title: "EV Charging", body: "Tesla Wall Connector installation" }
      ].map((c) => /* @__PURE__ */ jsxs(Link, { href: c.href, className: "block p-6 bg-white rounded-xl shadow-sm border border-gray-100 no-underline hover:shadow-md transition-shadow", children: [
        /* @__PURE__ */ jsx("div", { className: "font-bold text-base mb-1", style: { color: "#0B1D51" }, children: c.title }),
        /* @__PURE__ */ jsx("div", { className: "text-gray-500 text-sm", children: c.body })
      ] }, c.href)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-[#0B1D51] text-center", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-extrabold text-white mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Ready to Go Solar with People Who Care?" }),
      /* @__PURE__ */ jsx("p", { className: "text-white/70 mb-8", children: "No pressure. No oversized systems. No outsourced crews. Just honest recommendations and professional installation you can rely on." }),
      /* @__PURE__ */ jsx(Link, { href: "/get-quote", className: "inline-block font-bold text-lg px-10 py-4 rounded-full no-underline transition-all hover:opacity-90", style: { background: "#FED44D", color: "#0B1D51" }, children: "GET YOUR FREE CONSULTATION" }),
      /* @__PURE__ */ jsx("p", { className: "text-white/40 text-xs mt-6", children: "Contractor License #949122 • Serving Southern California & Idaho" })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const getLoginUrl = (returnPath) => {
  const path = returnPath || "/admin";
  return `/api/oauth/google?return=${encodeURIComponent(path)}`;
};
function useAuth(options) {
  const { redirectOnUnauthenticated = false, redirectPath = getLoginUrl() } = {};
  const utils = trpc.useUtils();
  const meQuery = trpc.auth.me.useQuery(void 0, {
    retry: false,
    refetchOnWindowFocus: false
  });
  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      utils.auth.me.setData(void 0, null);
    }
  });
  const logout = useCallback(async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      if (error instanceof TRPCClientError && error.data?.code === "UNAUTHORIZED") {
        return;
      }
      throw error;
    } finally {
      utils.auth.me.setData(void 0, null);
      await utils.auth.me.invalidate();
    }
  }, [logoutMutation, utils]);
  const state = useMemo(() => {
    localStorage.setItem(
      "manus-runtime-user-info",
      JSON.stringify(meQuery.data)
    );
    return {
      user: meQuery.data ?? null,
      loading: meQuery.isLoading || logoutMutation.isPending,
      error: meQuery.error ?? logoutMutation.error ?? null,
      isAuthenticated: Boolean(meQuery.data)
    };
  }, [
    meQuery.data,
    meQuery.error,
    meQuery.isLoading,
    logoutMutation.error,
    logoutMutation.isPending
  ]);
  useEffect(() => {
    if (!redirectOnUnauthenticated) return;
    if (meQuery.isLoading || logoutMutation.isPending) return;
    if (state.user) return;
    if (typeof window === "undefined") return;
    if (window.location.pathname === redirectPath) return;
    window.location.href = redirectPath;
  }, [
    redirectOnUnauthenticated,
    redirectPath,
    logoutMutation.isPending,
    meQuery.isLoading,
    state.user
  ]);
  return {
    ...state,
    refresh: () => meQuery.refetch(),
    logout
  };
}
const CATEGORY_LABELS = {
  solar: "Solar Panels",
  battery: "Battery + Solar",
  "ev-charging": "EV Charging",
  roofing: "Roofing",
  other: "Other"
};
function AdminPhotos() {
  const { user, loading: authLoading } = useAuth();
  const utils = trpc.useUtils();
  const [showUpload, setShowUpload] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("solar");
  const [location, setLocation] = useState("");
  const [featured, setFeatured] = useState(false);
  const [preview, setPreview] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [mimeType, setMimeType] = useState("image/jpeg");
  const fileRef = useRef(null);
  const { data: photos = [], isLoading } = trpc.photos.list.useQuery({});
  const uploadMutation = trpc.photos.upload.useMutation({
    onSuccess: () => {
      utils.photos.list.invalidate();
      toast.success("Photo uploaded successfully!");
      resetForm();
    },
    onError: (e) => toast.error("Upload failed: " + e.message)
  });
  const deleteMutation = trpc.photos.delete.useMutation({
    onSuccess: () => {
      utils.photos.list.invalidate();
      toast.success("Photo deleted.");
    },
    onError: (e) => toast.error("Delete failed: " + e.message)
  });
  function resetForm() {
    setTitle("");
    setDescription("");
    setCategory("solar");
    setLocation("");
    setFeatured(false);
    setPreview(null);
    setImageData(null);
    setShowUpload(false);
  }
  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setMimeType(file.type || "image/jpeg");
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result;
      setPreview(result);
      setImageData(result.split(",")[1]);
    };
    reader.readAsDataURL(file);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!imageData) {
      toast.error("Please select an image.");
      return;
    }
    if (!title.trim()) {
      toast.error("Please add a title.");
      return;
    }
    uploadMutation.mutate({ title, description, imageData, mimeType, category, location, featured });
  }
  if (authLoading) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50", children: /* @__PURE__ */ jsx("div", { className: "animate-spin w-8 h-8 rounded-full border-4 border-gray-200 border-t-blue-500" }) });
  }
  if (!user) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "text-center max-w-sm", children: [
      /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6", style: { background: "rgba(15,31,61,0.08)" }, children: /* @__PURE__ */ jsx(Sun, { className: "w-8 h-8", style: { color: "var(--navy)" } }) }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-3", style: { color: "var(--navy)" }, children: "Admin Login Required" }),
      /* @__PURE__ */ jsx("a", { href: getLoginUrl(), children: /* @__PURE__ */ jsx("button", { className: "btn-navy px-8 py-3 rounded-xl w-full", children: "Sign In" }) })
    ] }) });
  }
  if (user.role !== "admin") {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-4", children: "Admin access required." }),
      /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsx("button", { className: "btn-navy mt-2 px-6 py-2.5 rounded-xl text-sm", children: "Back to Home" }) })
    ] }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsx("header", { className: "bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40", children: /* @__PURE__ */ jsxs("div", { className: "container h-16 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full flex items-center justify-center", style: { background: "linear-gradient(135deg, #0f1f3d 0%, #1a3260 100%)" }, children: /* @__PURE__ */ jsx(Sun, { className: "w-4 h-4 text-yellow-400" }) }),
          /* @__PURE__ */ jsxs("span", { className: "font-bold text-base", style: { color: "var(--navy)", fontFamily: "'Playfair Display', serif" }, children: [
            "PELL ",
            /* @__PURE__ */ jsx("span", { style: { color: "var(--gold)" }, children: "SOLAR" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("span", { className: "text-gray-300 text-lg", children: "/" }),
        /* @__PURE__ */ jsx(Link, { href: "/admin", className: "text-sm font-medium text-gray-500 hover:text-gray-800", children: "CRM" }),
        /* @__PURE__ */ jsx("span", { className: "text-gray-300 text-lg", children: "/" }),
        /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-gray-600", children: "Photo Gallery" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setShowUpload(true),
            className: "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors",
            style: { background: "var(--navy)" },
            children: [
              /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
              "Add Photo"
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-600", children: [
          /* @__PURE__ */ jsx("div", { className: "w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold", style: { color: "var(--navy)" }, children: user?.name?.[0] ?? "A" }),
          /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: user?.name ?? "Admin" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "container py-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", style: { color: "var(--navy)" }, children: "Our Work Gallery" }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-500 mt-1", children: [
            photos.length,
            " photos — shown live on the ",
            /* @__PURE__ */ jsx(Link, { href: "/our-work", className: "underline", children: "Our Work" }),
            " page."
          ] })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setShowUpload(true),
            className: "hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors",
            style: { background: "var(--navy)" },
            children: [
              /* @__PURE__ */ jsx(Upload, { className: "w-4 h-4" }),
              "Upload New Photo"
            ]
          }
        )
      ] }),
      showUpload && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-6 border-b border-gray-100", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", style: { color: "var(--navy)" }, children: "Upload Job Photo" }),
          /* @__PURE__ */ jsx("button", { onClick: resetForm, className: "p-2 rounded-full hover:bg-gray-100 transition-colors", children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5 text-gray-500" }) })
        ] }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "p-6 space-y-4", children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              onClick: () => fileRef.current?.click(),
              className: "border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-blue-400 transition-colors",
              children: [
                preview ? /* @__PURE__ */ jsx("img", { src: preview, alt: "preview", className: "max-h-48 mx-auto rounded-lg object-cover" }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2 text-gray-400", children: [
                  /* @__PURE__ */ jsx(ImageIcon, { className: "w-10 h-10" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "Click to select a photo" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs", children: "JPG, PNG, HEIC up to 10MB" })
                ] }),
                /* @__PURE__ */ jsx("input", { ref: fileRef, type: "file", accept: "image/*", className: "hidden", onChange: handleFileChange })
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-1", children: "Title *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: title,
                onChange: (e) => setTitle(e.target.value),
                placeholder: "e.g. 32-Panel System — Chino Hills",
                className: "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-1", children: "Category" }),
              /* @__PURE__ */ jsx(
                "select",
                {
                  value: category,
                  onChange: (e) => setCategory(e.target.value),
                  className: "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400",
                  children: Object.entries(CATEGORY_LABELS).map(([k, v]) => /* @__PURE__ */ jsx("option", { value: k, children: v }, k))
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-1", children: "Location" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: location,
                  onChange: (e) => setLocation(e.target.value),
                  placeholder: "e.g. Chino Hills, CA",
                  className: "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-1", children: "Description (optional)" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                value: description,
                onChange: (e) => setDescription(e.target.value),
                placeholder: "Brief description of the install...",
                rows: 2,
                className: "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 cursor-pointer", children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                onClick: () => setFeatured(!featured),
                className: `w-10 h-6 rounded-full transition-colors ${featured ? "bg-blue-500" : "bg-gray-200"} relative`,
                children: /* @__PURE__ */ jsx("div", { className: `absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${featured ? "translate-x-5" : "translate-x-1"}` })
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-gray-700", children: "Featured photo (shown prominently)" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3 pt-2", children: [
            /* @__PURE__ */ jsx("button", { type: "button", onClick: resetForm, className: "flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors", children: "Cancel" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: uploadMutation.isPending || !imageData,
                className: "flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors disabled:opacity-50",
                style: { background: "var(--navy)" },
                children: uploadMutation.isPending ? "Uploading..." : "Upload Photo"
              }
            )
          ] })
        ] })
      ] }) }),
      isLoading ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4", children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ jsx("div", { className: "aspect-square rounded-xl bg-gray-100 animate-pulse" }, i)) }) : photos.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-24 text-gray-400", children: [
        /* @__PURE__ */ jsx(ImageIcon, { className: "w-12 h-12 mx-auto mb-4 opacity-30" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold", children: "No photos yet" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm mt-2", children: 'Click "Add Photo" to upload your first job photo.' })
      ] }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4", children: photos.map((photo) => /* @__PURE__ */ jsxs("div", { className: "group relative aspect-square rounded-xl overflow-hidden shadow-sm border border-gray-100", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: photo.imageUrl,
            alt: photo.title,
            className: "w-full h-full object-cover transition-transform duration-300 group-hover:scale-105",
            loading: "lazy"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-200 flex flex-col justify-between p-3 opacity-0 group-hover:opacity-100", children: [
          /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => {
                if (confirm(`Delete "${photo.title}"?`)) deleteMutation.mutate({ id: photo.id });
              },
              className: "p-1.5 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors",
              children: /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5" })
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-white text-xs font-semibold leading-tight", children: photo.title }),
            photo.location && /* @__PURE__ */ jsxs("p", { className: "text-white/60 text-xs mt-0.5", children: [
              "📍 ",
              photo.location
            ] })
          ] })
        ] }),
        photo.featured === 1 && /* @__PURE__ */ jsx("div", { className: "absolute top-2 left-2", children: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded", style: { background: "#FED44D", color: "#0B1D51" }, children: [
          /* @__PURE__ */ jsx(CheckCircle, { className: "w-2.5 h-2.5" }),
          " FEATURED"
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-2 left-2", children: /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold px-1.5 py-0.5 rounded bg-black/60 text-white", children: CATEGORY_LABELS[photo.category] ?? photo.category }) })
      ] }, photo.id)) })
    ] })
  ] });
}
const STATUS_COLORS$1 = {
  New: "status-New",
  Contacted: "status-Contacted",
  Quoted: "status-Quoted",
  Closed: "status-Closed",
  Lost: "status-Lost"
};
const STATUS_ICONS = {
  New: Star,
  Contacted: Phone,
  Quoted: TrendingUp,
  Closed: CheckCircle,
  Lost: XCircle
};
const SOURCE_LABELS$1 = {
  homepage: "Homepage",
  financing: "Financing Page",
  about: "About Page",
  "quote-page": "Quote Page",
  "upload-bill": "Upload Bill",
  "google-ads": "Google Ads",
  other: "Other"
};
function StatCard({ label, value, icon: Icon, color }) {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-gray-500", children: label }),
      /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl flex items-center justify-center", style: { background: `${color}20` }, children: /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5", style: { color } }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold", style: { color: "var(--navy)", fontFamily: "'Playfair Display', serif" }, children: value })
  ] });
}
function exportToCSV(leads) {
  const headers = ["ID", "First Name", "Last Name", "Email", "Phone", "Address", "Ownership", "Monthly Bill", "Interest", "Status", "Source", "Notes", "Date"];
  const rows = leads.map((l) => [
    l.id,
    l.firstName,
    l.lastName,
    l.email,
    l.phone,
    l.address ?? "",
    l.ownershipType,
    l.monthlyBillRange ?? "",
    l.interestType,
    l.status,
    l.source,
    (l.notes ?? "").replace(/\n/g, " "),
    new Date(l.createdAt).toLocaleDateString()
  ]);
  const csv = [headers, ...rows].map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `pell-solar-leads-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
function AdminDashboard() {
  const { user, loading, isAuthenticated } = useAuth();
  const logout = trpc.auth.logout.useMutation({ onSuccess: () => {
    window.location.href = "/";
  } });
  const [statusFilter, setStatusFilter] = useState("All");
  const statsQuery = trpc.leads.stats.useQuery(void 0, { enabled: isAuthenticated && user?.role === "admin" });
  const leadsQuery = trpc.leads.list.useQuery(
    statusFilter === "All" ? {} : { status: statusFilter },
    { enabled: isAuthenticated && user?.role === "admin" }
  );
  const exportQuery = trpc.leads.export.useQuery(void 0, { enabled: false });
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50", children: /* @__PURE__ */ jsx(RefreshCw, { className: "w-8 h-8 animate-spin", style: { color: "var(--gold)" } }) });
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "text-center max-w-sm", children: [
      /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6", style: { background: "rgba(15,31,61,0.08)" }, children: /* @__PURE__ */ jsx(Sun, { className: "w-8 h-8", style: { color: "var(--navy)" } }) }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-3", style: { color: "var(--navy)" }, children: "Admin Login Required" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 mb-6", children: "Please sign in to access the Pell Solar CRM dashboard." }),
      /* @__PURE__ */ jsx("a", { href: getLoginUrl("/admin"), children: /* @__PURE__ */ jsx("button", { className: "btn-navy px-8 py-3 rounded-xl w-full", children: "Sign In" }) })
    ] }) });
  }
  if (user?.role !== "admin") {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx(XCircle, { className: "w-12 h-12 text-red-400 mx-auto mb-4" }),
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-800", children: "Access Denied" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 mt-2", children: "You need admin privileges to view this page." }),
      /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsx("button", { className: "btn-navy mt-6 px-6 py-2.5 rounded-xl text-sm", children: "Back to Home" }) })
    ] }) });
  }
  const stats = statsQuery.data;
  const leads = leadsQuery.data ?? [];
  const handleExport = async () => {
    const result = await exportQuery.refetch();
    if (result.data) exportToCSV(result.data);
  };
  const STATUS_TABS = ["All", "New", "Contacted", "Quoted", "Closed", "Lost"];
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsx("header", { className: "bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40", children: /* @__PURE__ */ jsxs("div", { className: "container h-16 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full flex items-center justify-center", style: { background: "linear-gradient(135deg, #0f1f3d 0%, #1a3260 100%)" }, children: /* @__PURE__ */ jsx(Sun, { className: "w-4 h-4 text-yellow-400" }) }),
          /* @__PURE__ */ jsxs("span", { className: "font-bold text-base", style: { color: "var(--navy)", fontFamily: "'Playfair Display', serif" }, children: [
            "PELL ",
            /* @__PURE__ */ jsx("span", { style: { color: "var(--gold)" }, children: "SOLAR" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("span", { className: "text-gray-300 text-lg", children: "/" }),
        /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-gray-600", children: "CRM Dashboard" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(Link, { href: "/admin/chat", children: /* @__PURE__ */ jsxs("button", { className: "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-colors", style: { color: "var(--navy)" }, children: [
          /* @__PURE__ */ jsx(MessageCircle, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Live Chat" })
        ] }) }),
        /* @__PURE__ */ jsx(Link, { href: "/admin/chat-history", children: /* @__PURE__ */ jsxs("button", { className: "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:bg-purple-50 hover:border-purple-300 transition-colors", style: { color: "var(--navy)" }, children: [
          /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Chat History" })
        ] }) }),
        /* @__PURE__ */ jsx(Link, { href: "/admin/photos", children: /* @__PURE__ */ jsxs("button", { className: "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors", style: { color: "var(--navy)" }, children: [
          /* @__PURE__ */ jsx(ImageIcon, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Photos" })
        ] }) }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleExport,
            className: "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors",
            style: { color: "var(--navy)" },
            children: [
              /* @__PURE__ */ jsx(Download, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Export CSV" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => logout.mutate(),
            className: "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors",
            style: { color: "var(--navy)" },
            title: "Sign Out",
            children: [
              /* @__PURE__ */ jsx(LogOut, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Sign Out" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-600", children: [
          /* @__PURE__ */ jsx("div", { className: "w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold", style: { color: "var(--navy)" }, children: user?.name?.[0] ?? "A" }),
          /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: user?.name ?? "Admin" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "container py-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", style: { color: "var(--navy)" }, children: "Lead Pipeline" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 mt-1", children: "All submitted quote requests and their current status." })
      ] }),
      stats && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8", children: [
        /* @__PURE__ */ jsx(StatCard, { label: "Total Leads", value: stats.total, icon: Users, color: "var(--navy)" }),
        /* @__PURE__ */ jsx(StatCard, { label: "New", value: stats.byStatus["New"] ?? 0, icon: Star, color: "#3b82f6" }),
        /* @__PURE__ */ jsx(StatCard, { label: "Contacted", value: stats.byStatus["Contacted"] ?? 0, icon: Phone, color: "#f59e0b" }),
        /* @__PURE__ */ jsx(StatCard, { label: "Quoted", value: stats.byStatus["Quoted"] ?? 0, icon: TrendingUp, color: "#8b5cf6" }),
        /* @__PURE__ */ jsx(StatCard, { label: "Closed", value: stats.byStatus["Closed"] ?? 0, icon: CheckCircle, color: "#10b981" }),
        /* @__PURE__ */ jsx(StatCard, { label: "Lost", value: stats.byStatus["Lost"] ?? 0, icon: XCircle, color: "#ef4444" })
      ] }),
      stats && Object.keys(stats.bySource).length > 0 && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsx(BarChart3, { className: "w-5 h-5", style: { color: "var(--gold-dark)" } }),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold", style: { color: "var(--navy)" }, children: "Leads by Source" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3", children: Object.entries(stats.bySource).map(([source, count]) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-sm", children: [
          /* @__PURE__ */ jsx("span", { className: "font-medium", style: { color: "var(--navy)" }, children: SOURCE_LABELS$1[source] ?? source }),
          /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 rounded-full text-xs font-bold text-white", style: { background: "var(--navy)" }, children: count })
        ] }, source)) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-2 flex-wrap mb-6", children: STATUS_TABS.map((s) => /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setStatusFilter(s),
          className: `px-4 py-2 rounded-xl text-sm font-medium transition-all ${statusFilter === s ? "text-white shadow-sm" : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"}`,
          style: statusFilter === s ? { background: "var(--navy)" } : {},
          children: [
            s,
            s !== "All" && stats?.byStatus[s] !== void 0 && /* @__PURE__ */ jsxs("span", { className: "ml-1.5 text-xs opacity-70", children: [
              "(",
              stats.byStatus[s],
              ")"
            ] })
          ]
        },
        s
      )) }),
      /* @__PURE__ */ jsx("div", { className: "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden", children: leadsQuery.isLoading ? /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center py-20", children: /* @__PURE__ */ jsx(RefreshCw, { className: "w-6 h-6 animate-spin text-gray-400" }) }) : leads.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-20", children: [
        /* @__PURE__ */ jsx(Users, { className: "w-12 h-12 text-gray-300 mx-auto mb-4" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 font-medium", children: "No leads found" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mt-1", children: statusFilter === "All" ? "Submit a quote request to see leads here." : `No leads with status "${statusFilter}".` })
      ] }) : /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { className: "border-b border-gray-100", children: ["Name", "Contact", "Bill Range", "Interest", "Source", "Status", "Date", ""].map((h) => /* @__PURE__ */ jsx("th", { className: "px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide", children: h }, h)) }) }),
        /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-50", children: leads.map((lead) => {
          const StatusIcon = STATUS_ICONS[lead.status] ?? Star;
          return /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50 transition-colors", children: [
            /* @__PURE__ */ jsxs("td", { className: "px-5 py-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "font-semibold text-sm", style: { color: "var(--navy)" }, children: [
                lead.firstName,
                " ",
                lead.lastName
              ] }),
              lead.address && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 text-xs text-gray-400 mt-0.5", children: [
                /* @__PURE__ */ jsx(MapPin, { className: "w-3 h-3" }),
                /* @__PURE__ */ jsx("span", { className: "truncate max-w-[140px]", children: lead.address })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("td", { className: "px-5 py-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-xs text-gray-600 mb-1", children: [
                /* @__PURE__ */ jsx(Mail, { className: "w-3 h-3" }),
                /* @__PURE__ */ jsx("a", { href: `mailto:${lead.email}`, className: "hover:underline truncate max-w-[140px]", children: lead.email })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-xs text-gray-600", children: [
                /* @__PURE__ */ jsx(Phone, { className: "w-3 h-3" }),
                /* @__PURE__ */ jsx("a", { href: `tel:${lead.phone}`, className: "hover:underline", children: lead.phone })
              ] })
            ] }),
            /* @__PURE__ */ jsx("td", { className: "px-5 py-4", children: /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-700", children: lead.monthlyBillRange ?? "—" }) }),
            /* @__PURE__ */ jsx("td", { className: "px-5 py-4", children: /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-700 capitalize", children: lead.interestType }) }),
            /* @__PURE__ */ jsx("td", { className: "px-5 py-4", children: /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: SOURCE_LABELS$1[lead.source] ?? lead.source }) }),
            /* @__PURE__ */ jsx("td", { className: "px-5 py-4", children: /* @__PURE__ */ jsxs("span", { className: `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS$1[lead.status]}`, children: [
              /* @__PURE__ */ jsx(StatusIcon, { className: "w-3 h-3" }),
              lead.status
            ] }) }),
            /* @__PURE__ */ jsx("td", { className: "px-5 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 text-xs text-gray-400", children: [
              /* @__PURE__ */ jsx(Clock, { className: "w-3 h-3" }),
              new Date(lead.createdAt).toLocaleDateString()
            ] }) }),
            /* @__PURE__ */ jsx("td", { className: "px-5 py-4", children: /* @__PURE__ */ jsx(Link, { href: `/admin/leads/${lead.id}`, children: /* @__PURE__ */ jsxs("button", { className: "flex items-center gap-1 text-xs font-medium hover:underline", style: { color: "var(--navy)" }, children: [
              "View ",
              /* @__PURE__ */ jsx(ChevronRight, { className: "w-3.5 h-3.5" })
            ] }) }) })
          ] }, lead.id);
        }) })
      ] }) }) })
    ] })
  ] });
}
const STATUS_COLORS = {
  New: "status-New",
  Contacted: "status-Contacted",
  Quoted: "status-Quoted",
  Closed: "status-Closed",
  Lost: "status-Lost"
};
const SOURCE_LABELS = {
  homepage: "Homepage",
  financing: "Financing Page",
  about: "About Page",
  "quote-page": "Quote Page",
  "upload-bill": "Upload Bill",
  "google-ads": "Google Ads",
  other: "Other"
};
const STATUSES = ["New", "Contacted", "Quoted", "Closed", "Lost"];
function LeadDetail() {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const leadId = parseInt(id ?? "0");
  const utils = trpc.useUtils();
  const leadQuery = trpc.leads.getById.useQuery({ id: leadId }, { enabled: !!leadId && isAuthenticated && user?.role === "admin" });
  const [notes, setNotes] = useState(null);
  const [savingNotes, setSavingNotes] = useState(false);
  const updateStatus = trpc.leads.updateStatus.useMutation({
    onSuccess: () => {
      toast.success("Status updated");
      utils.leads.getById.invalidate({ id: leadId });
      utils.leads.list.invalidate();
    },
    onError: () => toast.error("Failed to update status")
  });
  const updateNotes = trpc.leads.updateNotes.useMutation({
    onSuccess: () => {
      toast.success("Notes saved");
      setSavingNotes(false);
      utils.leads.getById.invalidate({ id: leadId });
    },
    onError: () => {
      toast.error("Failed to save notes");
      setSavingNotes(false);
    }
  });
  if (!isAuthenticated || user?.role !== "admin") {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx(XCircle, { className: "w-12 h-12 text-red-400 mx-auto mb-4" }),
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-800", children: "Access Denied" }),
      /* @__PURE__ */ jsx(Link, { href: "/admin", children: /* @__PURE__ */ jsx("button", { className: "btn-navy mt-6 px-6 py-2.5 rounded-xl text-sm", children: "Go to Dashboard" }) })
    ] }) });
  }
  if (leadQuery.isLoading) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50", children: /* @__PURE__ */ jsx(RefreshCw, { className: "w-8 h-8 animate-spin", style: { color: "var(--gold)" } }) });
  }
  if (!leadQuery.data) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 mb-4", children: "Lead not found." }),
      /* @__PURE__ */ jsx(Link, { href: "/admin", children: /* @__PURE__ */ jsx("button", { className: "btn-navy px-6 py-2.5 rounded-xl text-sm", children: "Back to Dashboard" }) })
    ] }) });
  }
  const lead = leadQuery.data;
  const currentNotes = notes ?? lead.notes ?? "";
  const status = lead.status;
  const handleSaveNotes = () => {
    setSavingNotes(true);
    updateNotes.mutate({ id: leadId, notes: currentNotes });
  };
  const isBillImage = lead.billFileName && /\.(jpg|jpeg|png|webp|heic|heif)$/i.test(lead.billFileName);
  const billViewUrl = lead.billFileKey ? `/manus-storage/${lead.billFileKey}` : lead.billFileUrl ?? void 0;
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsx("header", { className: "bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40", children: /* @__PURE__ */ jsxs("div", { className: "container h-16 flex items-center gap-4", children: [
      /* @__PURE__ */ jsx(Link, { href: "/admin", children: /* @__PURE__ */ jsxs("button", { className: "flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }),
        " Back to Dashboard"
      ] }) }),
      /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "/" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: "w-7 h-7 rounded-full flex items-center justify-center", style: { background: "linear-gradient(135deg, #0f1f3d 0%, #1a3260 100%)" }, children: /* @__PURE__ */ jsx(Sun, { className: "w-3.5 h-3.5 text-yellow-400" }) }),
        /* @__PURE__ */ jsxs("span", { className: "font-semibold text-sm", style: { color: "var(--navy)" }, children: [
          lead.firstName,
          " ",
          lead.lastName
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "container py-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h1", { className: "text-3xl font-bold", style: { color: "var(--navy)", fontFamily: "'Playfair Display', serif" }, children: [
            lead.firstName,
            " ",
            lead.lastName
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-500 mt-1", children: [
            "Lead #",
            lead.id,
            " · Submitted ",
            new Date(lead.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("span", { className: `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${STATUS_COLORS[status]}`, children: status })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg mb-5", style: { color: "var(--navy)" }, children: "Contact Information" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-lg flex items-center justify-center", style: { background: "rgba(245,166,35,0.12)" }, children: /* @__PURE__ */ jsx(Mail, { className: "w-4 h-4", style: { color: "var(--gold-dark)" } }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: "Email" }),
                  /* @__PURE__ */ jsx("a", { href: `mailto:${lead.email}`, className: "font-medium text-sm hover:underline", style: { color: "var(--navy)" }, children: lead.email })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-lg flex items-center justify-center", style: { background: "rgba(245,166,35,0.12)" }, children: /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4", style: { color: "var(--gold-dark)" } }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: "Phone" }),
                  /* @__PURE__ */ jsx("a", { href: `tel:${lead.phone}`, className: "font-medium text-sm hover:underline", style: { color: "var(--navy)" }, children: lead.phone })
                ] })
              ] }),
              lead.address && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-lg flex items-center justify-center", style: { background: "rgba(245,166,35,0.12)" }, children: /* @__PURE__ */ jsx(MapPin, { className: "w-4 h-4", style: { color: "var(--gold-dark)" } }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: "Address" }),
                  /* @__PURE__ */ jsx("p", { className: "font-medium text-sm", style: { color: "var(--navy)" }, children: lead.address })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg mb-5", style: { color: "var(--navy)" }, children: "Lead Qualification" }),
            /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-4", children: [
              { label: "Ownership", value: lead.ownershipType === "homeowner" ? "Homeowner" : "Renter" },
              { label: "Property Type", value: lead.propertyType ? lead.propertyType === "family_home" ? "Family Home / Townhouse" : lead.propertyType === "apartment" ? "Apartment / Condo" : "Commercial Property" : "Not specified" },
              { label: "Zip Code", value: lead.zipCode ?? "Not specified" },
              { label: "Existing Solar", value: lead.existingSolar === 1 ? "Yes" : lead.existingSolar === 0 ? "No" : "Not specified" },
              { label: "Solar Motivation", value: lead.solarMotivation ? lead.solarMotivation === "price_stability" ? "Long-Term Price Stability" : lead.solarMotivation === "reduce_bills" ? "Reduce Electricity Bills" : lead.solarMotivation === "all_electric" ? "All-Electric Home" : "Other" : "Not specified" },
              { label: "Payment Preference", value: lead.paymentPreference ? lead.paymentPreference.charAt(0).toUpperCase() + lead.paymentPreference.slice(1) : "Not specified" },
              { label: "Monthly Bill Range", value: lead.monthlyBillRange ?? "Not specified" },
              { label: "Interest", value: lead.interestType.charAt(0).toUpperCase() + lead.interestType.slice(1) },
              { label: "Lead Source", value: SOURCE_LABELS[lead.source] ?? lead.source }
            ].map(({ label, value }) => /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-gray-50", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mb-1", children: label }),
              /* @__PURE__ */ jsx("p", { className: "font-semibold text-sm", style: { color: "var(--navy)" }, children: value })
            ] }, label)) })
          ] }),
          billViewUrl && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg mb-4", style: { color: "var(--navy)" }, children: "Uploaded Utility Bill" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-gray-50", children: [
              /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-lg flex items-center justify-center bg-white border border-gray-200", children: isBillImage ? /* @__PURE__ */ jsx(Image, { className: "w-6 h-6 text-blue-500" }) : /* @__PURE__ */ jsx(FileText, { className: "w-6 h-6 text-red-500" }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsx("p", { className: "font-medium text-sm truncate", style: { color: "var(--navy)" }, children: lead.billFileName ?? "Utility Bill" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: isBillImage ? "Image file" : "PDF document" })
              ] }),
              /* @__PURE__ */ jsxs(
                "a",
                {
                  href: billViewUrl,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "flex items-center gap-1.5 text-sm font-medium hover:underline",
                  style: { color: "var(--navy)" },
                  children: [
                    "View ",
                    /* @__PURE__ */ jsx(ExternalLink, { className: "w-3.5 h-3.5" })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg mb-4", style: { color: "var(--navy)" }, children: "Sales Notes" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                value: currentNotes,
                onChange: (e) => setNotes(e.target.value),
                rows: 5,
                className: "w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all text-sm resize-none",
                placeholder: "Add notes about this lead — call outcomes, objections, follow-up dates, etc."
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "flex justify-end mt-3", children: /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: handleSaveNotes,
                disabled: savingNotes || updateNotes.isPending,
                className: "btn-navy px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 disabled:opacity-60",
                children: [
                  /* @__PURE__ */ jsx(Save, { className: "w-4 h-4" }),
                  savingNotes ? "Saving..." : "Save Notes"
                ]
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg mb-5", style: { color: "var(--navy)" }, children: "Update Status" }),
            /* @__PURE__ */ jsx("div", { className: "space-y-2", children: STATUSES.map((s) => /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => updateStatus.mutate({ id: leadId, status: s }),
                disabled: updateStatus.isPending,
                className: `w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all border-2 ${status === s ? "border-yellow-400 bg-yellow-50" : "border-gray-200 hover:border-gray-300 bg-white"}`,
                children: [
                  /* @__PURE__ */ jsx("span", { className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${STATUS_COLORS[s]}`, children: s }),
                  status === s && /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 ml-auto", style: { color: "var(--gold-dark)" } })
                ]
              },
              s
            )) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-base mb-4", style: { color: "var(--navy)" }, children: "Quick Actions" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxs("a", { href: `mailto:${lead.email}`, className: "flex items-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors", style: { color: "var(--navy)" }, children: [
                /* @__PURE__ */ jsx(Mail, { className: "w-4 h-4", style: { color: "var(--gold-dark)" } }),
                " Send Email"
              ] }),
              /* @__PURE__ */ jsxs("a", { href: `tel:${lead.phone}`, className: "flex items-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors", style: { color: "var(--navy)" }, children: [
                /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4", style: { color: "var(--gold-dark)" } }),
                " Call ",
                lead.firstName
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
const HERO_IMG$7 = "/manus-storage/solar-home-main-v2_0ad97127.jpg";
const articles$1 = [
  {
    slug: "how-solar-panels-work",
    title: "How Solar Panels Work: A Simple Guide for Homeowners",
    excerpt: "Ever wonder what actually happens when sunlight hits your roof? Here's a clear, jargon-free explanation of how solar panels convert sunlight into electricity — and how that electricity powers your home.",
    date: "March 15, 2024",
    readTime: "6 min read",
    category: "Solar Basics",
    categoryColor: "bg-blue-100 text-blue-700"
  },
  {
    slug: "nem-3-explained",
    title: "NEM 3.0 Explained: What California Homeowners Need to Know",
    excerpt: "California's new net metering rules changed the solar math. Here's what NEM 3.0 means for your savings, why battery storage is now essential, and how to maximize your return under the new rules.",
    date: "February 28, 2024",
    readTime: "8 min read",
    category: "California Solar",
    categoryColor: "bg-yellow-100 text-yellow-700"
  },
  {
    slug: "tesla-powerwall-vs-other-batteries",
    title: "Tesla Powerwall vs. Other Home Batteries: Which Is Best?",
    excerpt: "The Tesla Powerwall 3 is the most popular home battery — but is it the best choice for your home? We compare it to the Franklin iBX2, Enphase IQ Battery, and LG RESU to help you decide.",
    date: "February 10, 2024",
    readTime: "7 min read",
    category: "Battery Storage",
    categoryColor: "bg-purple-100 text-purple-700"
  },
  {
    slug: "solar-cost-california",
    title: "How Much Do Solar Panels Cost in California? (2024 Guide)",
    excerpt: "Solar prices have dropped dramatically. Here's what a typical California homeowner pays for a solar system in 2024, what affects the cost, and how to evaluate quotes from different installers.",
    date: "January 22, 2024",
    readTime: "9 min read",
    category: "Pricing",
    categoryColor: "bg-[#2BABE2/15] text-[#0B1D51]"
  },
  {
    slug: "solar-tax-credit-guide",
    title: "The 30% Federal Solar Tax Credit: Complete 2024 Guide",
    excerpt: "The federal solar investment tax credit (ITC) lets you deduct 30% of your solar system cost from your federal taxes. Here's exactly how it works, who qualifies, and how to claim it.",
    date: "January 8, 2024",
    readTime: "7 min read",
    category: "Incentives",
    categoryColor: "bg-orange-100 text-orange-700"
  },
  {
    slug: "best-solar-panels-california",
    title: "Best Solar Panels for California Homes in 2024",
    excerpt: "Not all solar panels are created equal. We break down the top panel brands — REC, Panasonic, Q Cells, Canadian Solar, and Silfab — and explain which performs best in California's climate.",
    date: "December 18, 2023",
    readTime: "8 min read",
    category: "Equipment",
    categoryColor: "bg-teal-100 text-teal-700"
  },
  {
    slug: "solar-lease-vs-buy",
    title: "Solar Lease vs. Buy: Which Option Is Right for You?",
    excerpt: "Should you lease your solar system or buy it outright? The answer depends on your goals, credit, and how long you plan to stay in your home. Here's a clear comparison to help you decide.",
    date: "December 5, 2023",
    readTime: "6 min read",
    category: "Financing",
    categoryColor: "bg-indigo-100 text-indigo-700"
  },
  {
    slug: "how-to-read-sce-bill",
    title: "How to Read Your SCE Electric Bill (And Why It Matters for Solar)",
    excerpt: "Your Southern California Edison bill contains everything you need to know about whether solar makes sense for your home. Here's how to decode it — and what to look for before getting a solar quote.",
    date: "November 20, 2023",
    readTime: "5 min read",
    category: "California Solar",
    categoryColor: "bg-yellow-100 text-yellow-700"
  },
  {
    slug: "ev-charger-installation-guide",
    title: "Home EV Charger Installation: Everything You Need to Know",
    excerpt: "Thinking about installing a Level 2 EV charger at home? Here's what the installation involves, how much it costs, and why pairing it with solar is the smartest move you can make.",
    date: "November 5, 2023",
    readTime: "6 min read",
    category: "EV Charging",
    categoryColor: "bg-cyan-100 text-cyan-700"
  },
  {
    slug: "solar-panel-maintenance",
    title: "Solar Panel Maintenance: What You Actually Need to Do",
    excerpt: "Solar panels are low-maintenance — but not no-maintenance. Here's what you should do annually, what to watch for, and when to call a professional to keep your system producing at peak performance.",
    date: "October 22, 2023",
    readTime: "5 min read",
    category: "Maintenance",
    categoryColor: "bg-lime-100 text-lime-700"
  },
  {
    slug: "going-solar-inland-empire",
    title: "Going Solar in the Inland Empire: A Local Guide",
    excerpt: "The Inland Empire is one of the best places in the country for solar. High sun hours, rising SCE rates, and strong incentives make the math compelling. Here's what Inland Empire homeowners need to know.",
    date: "October 8, 2023",
    readTime: "7 min read",
    category: "Local Guides",
    categoryColor: "bg-red-100 text-red-700"
  },
  {
    slug: "virtual-power-plant-explained",
    title: "Virtual Power Plant (VPP): What It Is and How You Get Paid",
    excerpt: "SCE's Virtual Power Plant program pays Tesla Powerwall owners to share stored energy during peak demand. Here's how it works, how much you can earn, and how to enroll.",
    date: "September 25, 2023",
    readTime: "6 min read",
    category: "Battery Storage",
    categoryColor: "bg-purple-100 text-purple-700"
  },
  {
    slug: "solar-repair-common-problems",
    title: "Solar Panel Problems: 7 Common Issues and How to Fix Them",
    excerpt: "Is your solar system underperforming? These are the seven most common problems we see — from inverter failures to critter damage — and what you can do about each one.",
    date: "September 10, 2023",
    readTime: "7 min read",
    category: "Maintenance",
    categoryColor: "bg-lime-100 text-lime-700"
  },
  {
    slug: "why-choose-local-solar-company",
    title: "Why You Should Choose a Local Solar Company Over a National Chain",
    excerpt: "National solar companies have big marketing budgets — but local installers often deliver better results. Here's why choosing a local, family-owned solar company protects your investment.",
    date: "August 28, 2023",
    readTime: "5 min read",
    category: "Solar Basics",
    categoryColor: "bg-blue-100 text-blue-700"
  }
];
function Blog() {
  const featured = articles$1[0];
  const rest = articles$1.slice(1);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white", style: { fontFamily: "'Inter', system-ui, sans-serif" }, children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("section", { className: "relative py-24 md:py-32", style: { backgroundImage: `url(${HERO_IMG$7})`, backgroundSize: "cover", backgroundPosition: "center" }, children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#0B1D51]/45" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-7xl mx-auto px-6 text-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 bg-[#2BABE2/10]0/20 border border-[#2BABE2]/30 rounded-full px-4 py-2 mb-6", children: [
          /* @__PURE__ */ jsx(BookOpen, { size: 16, className: "text-[#2BABE2]" }),
          /* @__PURE__ */ jsx("span", { className: "text-[#2BABE2] font-semibold text-sm", children: "Solar Education Center" })
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6", style: { fontFamily: "'Montserrat', sans-serif" }, children: [
          "Pell Solar ",
          /* @__PURE__ */ jsx("span", { className: "text-[#2BABE2]", children: "Blog" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-white/80 max-w-3xl mx-auto", children: "Expert guides, tips, and news to help California and Idaho homeowners make smart solar decisions." })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-extrabold text-gray-900 mb-8", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Featured Article" }),
      /* @__PURE__ */ jsx(Link, { href: `/blog/${featured.slug}`, className: "no-underline block", children: /* @__PURE__ */ jsx("div", { className: "bg-[#0B1D51] rounded-3xl overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer", children: /* @__PURE__ */ jsxs("div", { className: "p-10 md:p-14", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsx("span", { className: `text-xs font-bold px-3 py-1 rounded-full ${featured.categoryColor}`, children: featured.category }),
          /* @__PURE__ */ jsxs("span", { className: "text-white/50 text-sm flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Calendar, { size: 14 }),
            " ",
            featured.date
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "text-white/50 text-sm flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Clock, { size: 14 }),
            " ",
            featured.readTime
          ] })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight", style: { fontFamily: "'Montserrat', sans-serif" }, children: featured.title }),
        /* @__PURE__ */ jsx("p", { className: "text-white/70 text-lg leading-relaxed mb-6 max-w-3xl", children: featured.excerpt }),
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 text-[#2BABE2] font-bold text-base hover:gap-3 transition-all", children: [
          "Read Article ",
          /* @__PURE__ */ jsx(ArrowRight, { size: 18 })
        ] })
      ] }) }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-8 pb-24 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-extrabold text-gray-900 mb-8", style: { fontFamily: "'Montserrat', sans-serif" }, children: "All Articles" }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: rest.map((article) => /* @__PURE__ */ jsx(Link, { href: `/blog/${article.slug}`, className: "no-underline block group", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border border-gray-200 p-7 hover:shadow-xl hover:border-green-300 transition-all h-full flex flex-col", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 mb-4", children: /* @__PURE__ */ jsx("span", { className: `text-xs font-bold px-3 py-1 rounded-full ${article.categoryColor}`, children: article.category }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-extrabold text-gray-900 mb-3 leading-snug group-hover:text-[#0B1D51] transition-colors", style: { fontFamily: "'Montserrat', sans-serif" }, children: article.title }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm leading-relaxed mb-4 flex-1", children: article.excerpt }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs text-gray-400 mt-auto pt-4 border-t border-gray-100", children: [
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Calendar, { size: 12 }),
            " ",
            article.date
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Clock, { size: 12 }),
            " ",
            article.readTime
          ] })
        ] })
      ] }) }, article.slug)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-[#0B1D51]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-white mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Ready to Go Solar?" }),
      /* @__PURE__ */ jsx("p", { className: "text-white/70 text-lg mb-8 max-w-2xl mx-auto", children: "Get a free, no-pressure solar quote from Pell Solar, a family-owned solar company." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [
        /* @__PURE__ */ jsx(Link, { href: "/get-quote", className: "btn-gold text-lg px-10 py-4", children: "Get Your Free Quote" }),
        /* @__PURE__ */ jsx("a", { href: "tel:8666468499", className: "text-white font-bold text-lg no-underline hover:text-[#FED44D] transition-colors", children: "(866) 646-8499" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const HERO_IMG$6 = "/manus-storage/solar-home-main-v2_0ad97127.jpg";
const articles = {
  "how-solar-panels-work": {
    title: "How Solar Panels Work: A Simple Guide for Homeowners",
    subtitle: "A clear, jargon-free explanation of how solar panels convert sunlight into electricity — and how that electricity powers your home.",
    date: "March 15, 2024",
    readTime: "6 min read",
    category: "Solar Basics",
    categoryColor: "bg-blue-100 text-blue-700",
    content: /* @__PURE__ */ jsxs("div", { className: "prose prose-lg max-w-none", children: [
      /* @__PURE__ */ jsx("p", { children: "Solar panels seem like magic — sunlight goes in, electricity comes out. But the science behind them is actually pretty straightforward. Understanding how your system works helps you get the most out of it and spot problems early." }),
      /* @__PURE__ */ jsx("h2", { children: "The Photovoltaic Effect" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Solar panels work through something called the ",
        /* @__PURE__ */ jsx("strong", { children: "photovoltaic effect" }),
        " — discovered in 1839 by French physicist Edmond Becquerel. When photons (light particles) from the sun hit a silicon cell, they knock electrons loose. Those free electrons create an electric current."
      ] }),
      /* @__PURE__ */ jsx("p", { children: "Each solar panel is made up of dozens of individual silicon cells. When sunlight hits them, they generate direct current (DC) electricity. Your home runs on alternating current (AC), so the next step is converting it." }),
      /* @__PURE__ */ jsx("h2", { children: "The Inverter: DC to AC Conversion" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Your solar system includes an ",
        /* @__PURE__ */ jsx("strong", { children: "inverter" }),
        " — the brain of the operation. It converts the DC electricity from your panels into the AC electricity your appliances use."
      ] }),
      /* @__PURE__ */ jsx("p", { children: "There are two main types:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "String inverters" }),
          " — one central inverter for the whole system. Less expensive, but if one panel is shaded, the whole string underperforms."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Microinverters" }),
          " — one small inverter per panel. More expensive, but each panel operates independently. Pell Solar primarily installs Enphase microinverters for this reason."
        ] })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "What Happens to the Electricity" }),
      /* @__PURE__ */ jsx("p", { children: "Once your panels generate electricity, it flows through your home's electrical panel. Your appliances use it first — lights, HVAC, refrigerator, EV charger. If you generate more than you use, the excess flows to the grid (or charges your battery)." }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Under California's NEM 3.0 rules, excess electricity sent to the grid earns you credits — but at a lower rate than before. This is why pairing solar with a ",
        /* @__PURE__ */ jsx("strong", { children: "Tesla Powerwall battery" }),
        " is now essential. Instead of sending cheap daytime energy to the grid, you store it and use it at night when rates are highest."
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "The Role of Net Metering" }),
      /* @__PURE__ */ jsx("p", { children: "Your utility meter tracks electricity flowing in both directions. When your panels produce more than you use, the meter runs backward (or records a credit). When you draw from the grid at night, the meter runs forward." }),
      /* @__PURE__ */ jsxs("p", { children: [
        "At the end of each billing period, you pay only the ",
        /* @__PURE__ */ jsx("em", { children: "net" }),
        ' difference — hence "net metering." With a properly sized system and battery, many Pell Solar customers reduce their SCE bill to near zero.'
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "How Much Electricity Do Panels Produce?" }),
      /* @__PURE__ */ jsx("p", { children: "A typical residential solar panel produces 400–450 watts under ideal conditions. A 16-panel system (6.8 kW) produces roughly 25–30 kWh per day in Southern California — enough to power an average home." }),
      /* @__PURE__ */ jsx("p", { children: "Production varies by:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: "Time of year (more sun in summer)" }),
        /* @__PURE__ */ jsx("li", { children: "Panel orientation and tilt" }),
        /* @__PURE__ */ jsx("li", { children: "Shading from trees or other structures" }),
        /* @__PURE__ */ jsx("li", { children: "Panel temperature (hot panels are slightly less efficient)" })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "Monitoring Your System" }),
      /* @__PURE__ */ jsx("p", { children: "Every Pell Solar installation includes a monitoring system — either Enphase Enlighten or Tesla's app. You can see exactly how much energy each panel is producing in real time, track your savings, and get alerts if something isn't working correctly." }),
      /* @__PURE__ */ jsx("h2", { children: "The Bottom Line" }),
      /* @__PURE__ */ jsx("p", { children: "Solar panels convert sunlight to DC electricity → an inverter converts it to AC → your home uses it → excess goes to a battery or the grid. It's a clean, silent, low-maintenance system that can power your home for 25+ years." }),
      /* @__PURE__ */ jsxs("p", { children: [
        "If you're curious how much a system would produce for your specific home, ",
        /* @__PURE__ */ jsx(Link, { href: "/get-quote", className: "text-[#2BABE2] font-semibold", children: "get a free quote from Pell Solar" }),
        ". We'll design a system sized exactly for your energy usage."
      ] })
    ] })
  },
  "nem-3-explained": {
    title: "NEM 3.0 Explained: What California Homeowners Need to Know",
    subtitle: "California's new net metering rules changed the solar math. Here's what NEM 3.0 means for your savings and why battery storage is now essential.",
    date: "February 28, 2024",
    readTime: "8 min read",
    category: "California Solar",
    categoryColor: "bg-yellow-100 text-yellow-700",
    content: /* @__PURE__ */ jsxs("div", { className: "prose prose-lg max-w-none", children: [
      /* @__PURE__ */ jsx("p", { children: "On April 15, 2023, California's Public Utilities Commission implemented NEM 3.0 — the third version of the state's net energy metering rules. For homeowners going solar, this is the most important policy change in a decade." }),
      /* @__PURE__ */ jsx("h2", { children: "What Changed Under NEM 3.0" }),
      /* @__PURE__ */ jsx("p", { children: "Under the old NEM 2.0 rules, excess solar energy you sent to the grid was credited at roughly the retail rate — about $0.30–0.40/kWh. Under NEM 3.0, that export rate dropped dramatically — to about $0.05–0.08/kWh during most hours." }),
      /* @__PURE__ */ jsx("p", { children: 'In plain terms: the grid is no longer a good "battery." Sending electricity to SCE during the day and buying it back at night is now a losing trade.' }),
      /* @__PURE__ */ jsx("h2", { children: "Why Battery Storage Is Now Essential" }),
      /* @__PURE__ */ jsx("p", { children: "Under NEM 2.0, you could install solar without a battery and still save significantly. Under NEM 3.0, the math changes:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: "Solar produces most electricity between 10 AM and 3 PM" }),
        /* @__PURE__ */ jsx("li", { children: "SCE's highest rates (Time-of-Use peak) are from 4–9 PM" }),
        /* @__PURE__ */ jsx("li", { children: "Without a battery, you sell cheap daytime energy and buy expensive evening energy" }),
        /* @__PURE__ */ jsx("li", { children: "With a battery, you store daytime energy and use it during the 4–9 PM peak window" })
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "A ",
        /* @__PURE__ */ jsx("strong", { children: "Tesla Powerwall 3" }),
        " stores 13.5 kWh — enough to power most homes through the entire 4–9 PM peak period and into the night."
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "NEM 3.0 Payback Period" }),
      /* @__PURE__ */ jsx("p", { children: "Under NEM 2.0, solar-only systems typically paid back in 5–7 years. Under NEM 3.0, solar-only systems may take 9–12 years. But solar + battery systems under NEM 3.0 can pay back in 6–9 years — because the battery captures the full value of your solar production." }),
      /* @__PURE__ */ jsx("h2", { children: "Who Is Affected" }),
      /* @__PURE__ */ jsx("p", { children: "NEM 3.0 applies to new solar applications submitted after April 15, 2023. If you already have solar under NEM 2.0, you're grandfathered in for 20 years from your original interconnection date." }),
      /* @__PURE__ */ jsx("p", { children: "If you're considering solar now, you'll be on NEM 3.0 — which means a battery is strongly recommended." }),
      /* @__PURE__ */ jsx("h2", { children: "The Virtual Power Plant Opportunity" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "NEM 3.0 introduced a new opportunity: the ",
        /* @__PURE__ */ jsx("strong", { children: "Virtual Power Plant (VPP)" }),
        " program. SCE pays Tesla Powerwall owners to dispatch stored energy back to the grid during peak demand events. Participants earn $2–4 per kWh dispatched — far more than the standard export rate."
      ] }),
      /* @__PURE__ */ jsx("p", { children: "This turns your battery into an income-generating asset during the summer months when grid demand is highest." }),
      /* @__PURE__ */ jsx("h2", { children: "What This Means for Your Decision" }),
      /* @__PURE__ */ jsx("p", { children: "Solar still makes excellent financial sense under NEM 3.0 — you just need to pair it with a battery. The combination of solar + Powerwall under NEM 3.0 can still eliminate your SCE bill and provide backup power during outages." }),
      /* @__PURE__ */ jsx("p", { children: "Pell Solar designs every system under NEM 3.0 rules, optimizing panel placement and battery sizing to maximize your savings under the new rate structure." }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Link, { href: "/get-quote", className: "text-[#2BABE2] font-semibold", children: "Get a free NEM 3.0 analysis for your home →" }) })
    ] })
  },
  "tesla-powerwall-vs-other-batteries": {
    title: "Tesla Powerwall vs. Other Home Batteries: Which Is Best?",
    subtitle: "We compare the Tesla Powerwall 3 to the Franklin iBX2, Enphase IQ Battery, and LG RESU to help you choose the right battery for your home.",
    date: "February 10, 2024",
    readTime: "7 min read",
    category: "Battery Storage",
    categoryColor: "bg-purple-100 text-purple-700",
    content: /* @__PURE__ */ jsxs("div", { className: "prose prose-lg max-w-none", children: [
      /* @__PURE__ */ jsx("p", { children: "Home battery storage has become essential for California solar owners under NEM 3.0. But with multiple options on the market, how do you choose? Here's a straightforward comparison of the top home batteries available in 2024." }),
      /* @__PURE__ */ jsx("h2", { children: "Tesla Powerwall 3" }),
      /* @__PURE__ */ jsx("p", { children: "The Powerwall 3 is Tesla's latest home battery, released in 2024. It's the most significant upgrade in the Powerwall lineup — and it's the battery Pell Solar recommends for most installations." }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "Key specs:" }) }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: "13.5 kWh usable capacity" }),
        /* @__PURE__ */ jsx("li", { children: "11.5 kW continuous power output (up from 7.6 kW on PW2)" }),
        /* @__PURE__ */ jsx("li", { children: "Integrated solar inverter — no separate inverter needed" }),
        /* @__PURE__ */ jsx("li", { children: "25-year warranty" }),
        /* @__PURE__ */ jsx("li", { children: "VPP-eligible (earn money dispatching to the grid)" })
      ] }),
      /* @__PURE__ */ jsx("p", { children: "The integrated inverter is a game-changer. It eliminates a separate piece of equipment, reduces installation cost, and improves system efficiency. The 11.5 kW output means it can power your entire home — including HVAC and EV charging — during an outage." }),
      /* @__PURE__ */ jsx("h2", { children: "Franklin iBX2" }),
      /* @__PURE__ */ jsx("p", { children: "The Franklin iBX2 is a newer entrant with some compelling specs, particularly for homes that need more capacity." }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: "13.6 kWh usable capacity (similar to Powerwall)" }),
        /* @__PURE__ */ jsx("li", { children: "10 kW continuous power output" }),
        /* @__PURE__ */ jsx("li", { children: "Stackable — add multiple units easily" }),
        /* @__PURE__ */ jsx("li", { children: "10-year warranty (shorter than Powerwall)" }),
        /* @__PURE__ */ jsx("li", { children: "Competitive pricing" })
      ] }),
      /* @__PURE__ */ jsx("p", { children: "The Franklin is a solid choice for homes that want to stack multiple batteries at a lower per-kWh cost. The shorter warranty is a consideration for long-term planning." }),
      /* @__PURE__ */ jsx("h2", { children: "Enphase IQ Battery 5P" }),
      /* @__PURE__ */ jsx("p", { children: "Enphase's battery integrates seamlessly with Enphase microinverter systems." }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: "5 kWh per unit (stackable)" }),
        /* @__PURE__ */ jsx("li", { children: "3.84 kW continuous power output per unit" }),
        /* @__PURE__ */ jsx("li", { children: "Works natively with Enphase microinverters" }),
        /* @__PURE__ */ jsx("li", { children: "10-year warranty" }),
        /* @__PURE__ */ jsx("li", { children: "Modular — add capacity as needed" })
      ] }),
      /* @__PURE__ */ jsx("p", { children: "The Enphase battery is best for homes already using Enphase microinverters who want seamless integration. The lower per-unit capacity means you'll need multiple units for whole-home backup." }),
      /* @__PURE__ */ jsx("h2", { children: "LG RESU Prime" }),
      /* @__PURE__ */ jsx("p", { children: "LG's residential battery is a mature product with a strong track record." }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: "9.6 kWh or 16 kWh options" }),
        /* @__PURE__ */ jsx("li", { children: "5 kW continuous power output" }),
        /* @__PURE__ */ jsx("li", { children: "Compact form factor" }),
        /* @__PURE__ */ jsx("li", { children: "10-year warranty" }),
        /* @__PURE__ */ jsx("li", { children: "Compatible with most inverters" })
      ] }),
      /* @__PURE__ */ jsx("p", { children: "The LG RESU is a reliable choice with a smaller footprint, but the lower power output limits its ability to run high-draw appliances during an outage." }),
      /* @__PURE__ */ jsx("h2", { children: "Our Recommendation" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "For most California homeowners under NEM 3.0, the ",
        /* @__PURE__ */ jsx("strong", { children: "Tesla Powerwall 3" }),
        " is the best choice. The integrated inverter, 25-year warranty, VPP eligibility, and 11.5 kW output make it the most capable and future-proof option. The higher upfront cost is offset by the integrated inverter savings and long-term warranty coverage."
      ] }),
      /* @__PURE__ */ jsx("p", { children: "For homes that want to maximize storage capacity at lower cost, the Franklin iBX2 is worth considering — especially when stacking multiple units." }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Link, { href: "/tesla-powerwall", className: "text-[#2BABE2] font-semibold", children: "Learn more about the Tesla Powerwall 3 →" }) })
    ] })
  },
  "solar-cost-california": {
    title: "How Much Do Solar Panels Cost in California? (2024 Guide)",
    subtitle: "Solar prices have dropped dramatically. Here's what a typical California homeowner pays in 2024, what affects the cost, and how to evaluate quotes.",
    date: "January 22, 2024",
    readTime: "9 min read",
    category: "Pricing",
    categoryColor: "bg-[#2BABE2/15] text-[#0B1D51]",
    content: /* @__PURE__ */ jsxs("div", { className: "prose prose-lg max-w-none", children: [
      /* @__PURE__ */ jsx("p", { children: "The cost of solar has fallen more than 90% over the past two decades. In 2024, a typical California homeowner can go solar for $0 down — with monthly payments lower than their current electric bill." }),
      /* @__PURE__ */ jsx("h2", { children: "Average Solar System Cost in California" }),
      /* @__PURE__ */ jsx("p", { children: "Before incentives, the average residential solar system in California costs:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Small system (6–8 kW):" }),
          " $18,000–$24,000"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Medium system (10–14 kW):" }),
          " $28,000–$38,000"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Large system (16–20 kW):" }),
          " $42,000–$54,000"
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { children: "After the 30% federal tax credit, those numbers drop to:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Small system:" }),
          " $12,600–$16,800"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Medium system:" }),
          " $19,600–$26,600"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Large system:" }),
          " $29,400–$37,800"
        ] })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "Adding Battery Storage" }),
      /* @__PURE__ */ jsx("p", { children: "A Tesla Powerwall 3 adds approximately $10,000–$12,000 to the system cost before the tax credit. After the 30% credit, that's $7,000–$8,400. Under NEM 3.0, the battery typically pays for itself within 3–5 years through avoided peak-rate electricity purchases." }),
      /* @__PURE__ */ jsx("h2", { children: "What Affects the Cost" }),
      /* @__PURE__ */ jsx("p", { children: "Several factors influence your final quote:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "System size" }),
          " — determined by your energy usage (kWh/month from your bill)"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Roof type" }),
          " — tile roofs cost more to install on than composition shingle"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Panel brand" }),
          " — premium panels (REC, Panasonic) cost more than standard panels"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Inverter type" }),
          " — microinverters cost more than string inverters"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Electrical panel upgrade" }),
          " — older panels may need upgrading"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Permit fees" }),
          " — vary by city/county"
        ] })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "Financing Options" }),
      /* @__PURE__ */ jsx("p", { children: "Most California homeowners finance their solar system rather than paying cash:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Solar loan:" }),
          " $0 down, you own the system, claim the 30% tax credit yourself. Typical payment: $150–$250/month for a 20-year loan."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Solar lease:" }),
          " $0 down, the leasing company owns the system and claims the tax credit. Fixed payment for 25 years. Pell Solar's Solar Shield package starts at $234/month."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Cash purchase:" }),
          " Highest upfront cost, best long-term return. Typical payback: 6–9 years."
        ] })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "How to Evaluate Solar Quotes" }),
      /* @__PURE__ */ jsx("p", { children: "When comparing quotes, don't just look at the total price. Look at:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Cost per watt" }),
          " — divide total price by system size in watts. $2.50–$3.50/watt is typical in California."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Panel brand and warranty" }),
          " — a 25-year warranty is standard for quality panels."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Inverter type" }),
          " — microinverters (Enphase) or power optimizers (SolarEdge) outperform string inverters in most residential applications."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Installer credentials" }),
          " — verify CSLB license, insurance, and reviews."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Production estimate" }),
          " — ask for a year-1 production estimate in kWh and compare it to your actual usage."
        ] })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "The Bottom Line" }),
      /* @__PURE__ */ jsx("p", { children: "Solar in California is one of the best home investments available — especially with SCE rates among the highest in the country. A properly designed system can eliminate your electric bill, protect you from future rate increases, and add value to your home." }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Link, { href: "/get-quote", className: "text-[#2BABE2] font-semibold", children: "Get a free, no-pressure quote from Pell Solar →" }) })
    ] })
  },
  "solar-tax-credit-guide": {
    title: "The 30% Federal Solar Tax Credit: Complete 2024 Guide",
    subtitle: "The federal solar investment tax credit (ITC) lets you deduct 30% of your solar system cost from your federal taxes. Here's exactly how it works.",
    date: "January 8, 2024",
    readTime: "7 min read",
    category: "Incentives",
    categoryColor: "bg-orange-100 text-orange-700",
    content: /* @__PURE__ */ jsxs("div", { className: "prose prose-lg max-w-none", children: [
      /* @__PURE__ */ jsx("p", { children: "The federal solar investment tax credit (ITC) is the most valuable solar incentive available to American homeowners. Under the Inflation Reduction Act of 2022, the credit was extended and increased to 30% through 2032." }),
      /* @__PURE__ */ jsx("h2", { children: "What Is the Solar Tax Credit?" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "The ITC allows you to deduct ",
        /* @__PURE__ */ jsx("strong", { children: "30% of your total solar system cost" }),
        " from your federal income taxes. This includes panels, inverters, batteries, installation labor, permitting, and inspection fees."
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "It's a ",
        /* @__PURE__ */ jsx("em", { children: "tax credit" }),
        " — not a deduction. A deduction reduces your taxable income; a credit directly reduces the taxes you owe. If your system costs $25,000, you get a $7,500 credit against your federal tax bill."
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "What's Included in the Credit" }),
      /* @__PURE__ */ jsx("p", { children: "The 30% credit applies to:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: "Solar panels" }),
        /* @__PURE__ */ jsx("li", { children: "Inverters (string, microinverters, power optimizers)" }),
        /* @__PURE__ */ jsx("li", { children: "Battery storage (Tesla Powerwall, Franklin, Enphase IQ)" }),
        /* @__PURE__ */ jsx("li", { children: "Racking and mounting hardware" }),
        /* @__PURE__ */ jsx("li", { children: "Wiring and electrical work" }),
        /* @__PURE__ */ jsx("li", { children: "Installation labor" }),
        /* @__PURE__ */ jsx("li", { children: "Permitting and inspection fees" }),
        /* @__PURE__ */ jsx("li", { children: "Sales tax on equipment" })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "Who Qualifies" }),
      /* @__PURE__ */ jsx("p", { children: "To claim the credit, you must:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: "Own (not lease) the solar system" }),
        /* @__PURE__ */ jsx("li", { children: "Install it at your primary or secondary U.S. residence" }),
        /* @__PURE__ */ jsx("li", { children: "Owe federal income taxes (the credit is non-refundable)" })
      ] }),
      /* @__PURE__ */ jsx("p", { children: "If you lease your solar system, the leasing company claims the credit — which is why lease payments are lower than loan payments for the same system." }),
      /* @__PURE__ */ jsx("h2", { children: "How to Claim It" }),
      /* @__PURE__ */ jsx("p", { children: "Claiming the credit is straightforward:" }),
      /* @__PURE__ */ jsxs("ol", { children: [
        /* @__PURE__ */ jsx("li", { children: "Complete IRS Form 5695 (Residential Energy Credits) with your tax return" }),
        /* @__PURE__ */ jsx("li", { children: "Enter your total solar system cost on line 1" }),
        /* @__PURE__ */ jsx("li", { children: "Calculate 30% — that's your credit amount" }),
        /* @__PURE__ */ jsx("li", { children: "The credit reduces your federal tax liability dollar-for-dollar" })
      ] }),
      /* @__PURE__ */ jsx("p", { children: "If your credit exceeds your tax liability in year 1, the unused portion carries forward to the following year." }),
      /* @__PURE__ */ jsx("h2", { children: "Credit Schedule" }),
      /* @__PURE__ */ jsx("p", { children: "The 30% credit is available through 2032. After that:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: "2033: 26%" }),
        /* @__PURE__ */ jsx("li", { children: "2034: 22%" }),
        /* @__PURE__ */ jsx("li", { children: "2035 and beyond: 0% (unless Congress extends it)" })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "California State Incentives" }),
      /* @__PURE__ */ jsx("p", { children: "In addition to the federal credit, California offers:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Property tax exclusion" }),
          " — solar installations are excluded from property tax reassessment"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Sales tax exemption" }),
          " — solar equipment is exempt from California sales tax"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "SGIP rebate" }),
          " — the Self-Generation Incentive Program offers rebates for battery storage in certain utility territories"
        ] })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "The Bottom Line" }),
      /* @__PURE__ */ jsx("p", { children: "The 30% federal tax credit is a substantial incentive that significantly reduces the cost of going solar. Combined with California's property tax exclusion and NEM 3.0 savings, solar is one of the best financial decisions a California homeowner can make." }),
      /* @__PURE__ */ jsx("p", { children: "Consult a tax professional for advice specific to your situation. Pell Solar can provide the documentation you need to claim the credit." }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Link, { href: "/get-quote", className: "text-[#2BABE2] font-semibold", children: "Get a free quote and see your estimated tax credit →" }) })
    ] })
  },
  "best-solar-panels-california": {
    title: "Best Solar Panels for California Homes in 2024",
    subtitle: "We break down the top panel brands — REC, Panasonic, Q Cells, Canadian Solar, and Silfab — and explain which performs best in California's climate.",
    date: "December 18, 2023",
    readTime: "8 min read",
    category: "Equipment",
    categoryColor: "bg-teal-100 text-teal-700",
    content: /* @__PURE__ */ jsxs("div", { className: "prose prose-lg max-w-none", children: [
      /* @__PURE__ */ jsx("p", { children: "Not all solar panels perform equally in California's climate. High temperatures, intense UV exposure, and coastal salt air all affect long-term performance. Here's how the top panel brands compare for California homeowners." }),
      /* @__PURE__ */ jsx("h2", { children: "What Makes a Good Solar Panel?" }),
      /* @__PURE__ */ jsx("p", { children: "When evaluating panels, look at:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Efficiency" }),
          " — percentage of sunlight converted to electricity (higher = more power per square foot)"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Temperature coefficient" }),
          " — how much output drops per degree Celsius above 25°C (lower is better for hot climates)"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Degradation rate" }),
          " — how fast output declines over time (lower is better)"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Warranty" }),
          " — product warranty (defects) and performance warranty (minimum output)"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Manufacturer stability" }),
          " — will the company be around to honor the warranty in 25 years?"
        ] })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "REC Alpha Pure-R" }),
      /* @__PURE__ */ jsx("p", { children: "REC is our top recommendation for most California installations. The Alpha Pure-R uses heterojunction (HJT) technology — the same technology used in high-end commercial panels." }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: "Efficiency: 22.3%" }),
        /* @__PURE__ */ jsx("li", { children: "Temperature coefficient: -0.24%/°C (excellent for hot climates)" }),
        /* @__PURE__ */ jsx("li", { children: "25-year product + performance warranty" }),
        /* @__PURE__ */ jsx("li", { children: "Degradation: 0.25%/year (industry-leading)" })
      ] }),
      /* @__PURE__ */ jsx("p", { children: "The low temperature coefficient is particularly valuable in Southern California, where rooftop temperatures regularly exceed 140°F in summer." }),
      /* @__PURE__ */ jsx("h2", { children: "Panasonic EverVolt" }),
      /* @__PURE__ */ jsx("p", { children: "Panasonic's EverVolt uses HJT technology developed from their decades of solar research. Excellent performance in high-temperature environments." }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: "Efficiency: 22.2%" }),
        /* @__PURE__ */ jsx("li", { children: "Temperature coefficient: -0.26%/°C" }),
        /* @__PURE__ */ jsx("li", { children: "25-year product + performance warranty" }),
        /* @__PURE__ */ jsx("li", { children: "Degradation: 0.26%/year" })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "Q Cells Q.PEAK DUO BLK ML-G10+" }),
      /* @__PURE__ */ jsx("p", { children: "Q Cells offers excellent value — near-premium performance at a more accessible price point. Popular for budget-conscious installations that still want quality." }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: "Efficiency: 21.4%" }),
        /* @__PURE__ */ jsx("li", { children: "Temperature coefficient: -0.34%/°C" }),
        /* @__PURE__ */ jsx("li", { children: "25-year product + performance warranty" }),
        /* @__PURE__ */ jsx("li", { children: "Anti-LID and anti-PID technology" })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "Canadian Solar HiHero" }),
      /* @__PURE__ */ jsx("p", { children: "Canadian Solar's HiHero series uses HJT technology and offers strong performance at competitive pricing." }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: "Efficiency: 22.8% (highest in lineup)" }),
        /* @__PURE__ */ jsx("li", { children: "Temperature coefficient: -0.26%/°C" }),
        /* @__PURE__ */ jsx("li", { children: "25-year product + performance warranty" }),
        /* @__PURE__ */ jsx("li", { children: "Strong track record in high-temperature climates" })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "Silfab Elite" }),
      /* @__PURE__ */ jsx("p", { children: "Silfab manufactures in North America (Washington State), which matters for Buy American provisions and supply chain reliability." }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: "Efficiency: 21.4%" }),
        /* @__PURE__ */ jsx("li", { children: "Temperature coefficient: -0.34%/°C" }),
        /* @__PURE__ */ jsx("li", { children: "30-year product warranty (industry-leading)" }),
        /* @__PURE__ */ jsx("li", { children: "Made in USA" })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "Our Recommendation for California" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "For Southern California's hot climate, prioritize panels with a ",
        /* @__PURE__ */ jsx("strong", { children: "low temperature coefficient" }),
        " (below -0.30%/°C). REC and Panasonic's HJT technology excels here."
      ] }),
      /* @__PURE__ */ jsx("p", { children: "For the best value, Q Cells offers near-premium performance at a lower price point — a solid choice for budget-conscious homeowners who still want quality." }),
      /* @__PURE__ */ jsx("p", { children: "Pell Solar installs all of the above brands and will recommend the best option for your specific roof, budget, and energy goals." }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Link, { href: "/solar-panel-systems", className: "text-[#2BABE2] font-semibold", children: "Learn more about our solar panel options →" }) })
    ] })
  },
  "solar-lease-vs-buy": {
    title: "Solar Lease vs. Buy: Which Option Is Right for You?",
    subtitle: "Should you lease your solar system or buy it outright? The answer depends on your goals, credit, and how long you plan to stay in your home.",
    date: "December 5, 2023",
    readTime: "6 min read",
    category: "Financing",
    categoryColor: "bg-indigo-100 text-indigo-700",
    content: /* @__PURE__ */ jsxs("div", { className: "prose prose-lg max-w-none", children: [
      /* @__PURE__ */ jsx("p", { children: "When you go solar, you have two main options: lease the system or buy it (either with cash or a loan). Each has real advantages and drawbacks. Here's a clear comparison to help you decide." }),
      /* @__PURE__ */ jsx("h2", { children: "Solar Lease: How It Works" }),
      /* @__PURE__ */ jsx("p", { children: "With a solar lease, a financing company owns the system and installs it on your roof. You pay a fixed monthly fee for 25 years. The leasing company claims the 30% federal tax credit, which is why they can offer $0 down." }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "Pell Solar's lease packages:" }) }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: "Solar Shield: $234/month (16 panels + Tesla Powerwall 3)" }),
        /* @__PURE__ */ jsx("li", { children: "Solar Shield+: $307/month (32 panels + Tesla Powerwall 3)" })
      ] }),
      /* @__PURE__ */ jsx("p", { children: "Both include full maintenance, monitoring, and a 90% production guarantee for the entire 25-year term." }),
      /* @__PURE__ */ jsx("h2", { children: "Solar Loan: How It Works" }),
      /* @__PURE__ */ jsx("p", { children: "With a solar loan, you own the system from day one. You borrow money to pay for it, make monthly payments for 12–20 years, and claim the 30% federal tax credit yourself." }),
      /* @__PURE__ */ jsx("p", { children: "Typical loan payments for a comparable system: $180–$260/month for a 20-year loan at 6–8% APR. After the loan is paid off, you own the system free and clear — and your electricity is essentially free." }),
      /* @__PURE__ */ jsx("h2", { children: "Cash Purchase: How It Works" }),
      /* @__PURE__ */ jsx("p", { children: "Pay the full system cost upfront. You own the system, claim the tax credit, and have no monthly payments. Best long-term return — typical payback period is 6–9 years, after which your electricity is free for the remaining 15+ years of the system's life." }),
      /* @__PURE__ */ jsx("h2", { children: "Side-by-Side Comparison" }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full border-collapse text-sm", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-gray-100", children: [
          /* @__PURE__ */ jsx("th", { className: "border border-gray-200 px-4 py-2 text-left", children: "Factor" }),
          /* @__PURE__ */ jsx("th", { className: "border border-gray-200 px-4 py-2 text-center", children: "Lease" }),
          /* @__PURE__ */ jsx("th", { className: "border border-gray-200 px-4 py-2 text-center", children: "Loan" }),
          /* @__PURE__ */ jsx("th", { className: "border border-gray-200 px-4 py-2 text-center", children: "Cash" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: [
          ["Upfront cost", "$0", "$0", "Full cost"],
          ["Monthly payment", "Fixed 25 yrs", "12–20 yr loan", "None"],
          ["Tax credit", "Leasing company", "You (30%)", "You (30%)"],
          ["System ownership", "Leasing company", "You", "You"],
          ["Maintenance", "Included", "Your responsibility", "Your responsibility"],
          ["Production guarantee", "90%", "No", "No"],
          ["Long-term savings", "Moderate", "High", "Highest"],
          ["Best for", "No upfront cost", "Want to own", "Maximum savings"]
        ].map(([factor, lease, loan, cash], i) => /* @__PURE__ */ jsxs("tr", { className: i % 2 === 0 ? "bg-white" : "bg-gray-50", children: [
          /* @__PURE__ */ jsx("td", { className: "border border-gray-200 px-4 py-2 font-medium", children: factor }),
          /* @__PURE__ */ jsx("td", { className: "border border-gray-200 px-4 py-2 text-center", children: lease }),
          /* @__PURE__ */ jsx("td", { className: "border border-gray-200 px-4 py-2 text-center", children: loan }),
          /* @__PURE__ */ jsx("td", { className: "border border-gray-200 px-4 py-2 text-center", children: cash })
        ] }, i)) })
      ] }) }),
      /* @__PURE__ */ jsx("h2", { children: "When a Lease Makes Sense" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: "You want $0 down with no financial risk" }),
        /* @__PURE__ */ jsx("li", { children: "You don't have enough federal tax liability to benefit from the 30% credit" }),
        /* @__PURE__ */ jsx("li", { children: "You want maintenance included — no surprise repair bills" }),
        /* @__PURE__ */ jsx("li", { children: "You want a production guarantee" })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "When Buying Makes Sense" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: "You have federal tax liability to use the 30% credit" }),
        /* @__PURE__ */ jsx("li", { children: "You plan to stay in your home long-term" }),
        /* @__PURE__ */ jsx("li", { children: "You want to maximize long-term savings" }),
        /* @__PURE__ */ jsx("li", { children: "You want to own an asset that adds value to your home" })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "The Bottom Line" }),
      /* @__PURE__ */ jsx("p", { children: "Both options can make financial sense — it depends on your situation. A Pell Solar consultant can run the numbers for both options and help you decide which is right for your home and goals." }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Link, { href: "/get-quote", className: "text-[#2BABE2] font-semibold", children: "Get a free comparison for your home →" }) })
    ] })
  },
  "how-to-read-sce-bill": {
    title: "How to Read Your SCE Electric Bill (And Why It Matters for Solar)",
    subtitle: "Your Southern California Edison bill contains everything you need to know about whether solar makes sense for your home. Here's how to decode it.",
    date: "November 20, 2023",
    readTime: "5 min read",
    category: "California Solar",
    categoryColor: "bg-yellow-100 text-yellow-700",
    content: /* @__PURE__ */ jsxs("div", { className: "prose prose-lg max-w-none", children: [
      /* @__PURE__ */ jsx("p", { children: "Before getting a solar quote, the most important thing you can do is understand your current electric bill. It tells you exactly how much energy you use, when you use it, and what you're paying for it — all critical inputs for designing the right solar system." }),
      /* @__PURE__ */ jsx("h2", { children: "Key Numbers on Your SCE Bill" }),
      /* @__PURE__ */ jsx("h3", { children: "1. Total kWh Used" }),
      /* @__PURE__ */ jsx("p", { children: `This is the most important number for solar sizing. It's usually displayed as "Total Energy Charges" or in a usage graph. A typical Southern California home uses 600–1,200 kWh/month. Your solar system should be sized to produce roughly this amount annually.` }),
      /* @__PURE__ */ jsx("h3", { children: "2. Your Rate Plan" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "SCE offers several rate plans. The most common for residential customers is ",
        /* @__PURE__ */ jsx("strong", { children: "TOU-D-PRIME" }),
        " (Time-of-Use). Under this plan, rates vary by time of day:"
      ] }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Off-peak (9 PM – 4 PM):" }),
          " ~$0.28/kWh"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Mid-peak (4 PM – 9 PM, weekdays):" }),
          " ~$0.45/kWh"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "On-peak (4 PM – 9 PM, summer weekdays):" }),
          " ~$0.55/kWh"
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { children: "This is why battery storage is so valuable — you store cheap daytime solar energy and use it during the expensive 4–9 PM window." }),
      /* @__PURE__ */ jsx("h3", { children: "3. Baseline Allowance" }),
      /* @__PURE__ */ jsx("p", { children: 'SCE gives you a "baseline allowance" of electricity at a lower rate. Usage above the baseline is charged at higher "above baseline" rates. High-usage homes pay significantly more per kWh for their upper tiers.' }),
      /* @__PURE__ */ jsx("h3", { children: "4. Minimum Delivery Charge" }),
      /* @__PURE__ */ jsx("p", { children: "Even with solar, you'll still pay SCE's minimum monthly delivery charge — currently about $10–15/month. This is the cost of staying connected to the grid." }),
      /* @__PURE__ */ jsx("h2", { children: "What to Look for Before Getting a Solar Quote" }),
      /* @__PURE__ */ jsx("p", { children: "When you call Pell Solar for a quote, have your last 12 months of bills ready (or your annual kWh usage). We'll use this to:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: "Size your system to cover your actual usage" }),
        /* @__PURE__ */ jsx("li", { children: "Calculate your estimated savings under NEM 3.0" }),
        /* @__PURE__ */ jsx("li", { children: "Determine the right battery size for your usage pattern" }),
        /* @__PURE__ */ jsx("li", { children: "Show you a month-by-month production vs. usage comparison" })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "The SCE Annual True-Up" }),
      /* @__PURE__ */ jsx("p", { children: "Under NEM 3.0, SCE calculates your net energy usage annually. If you generated more than you used over the year, you receive a credit (at the low export rate). If you used more than you generated, you pay the difference. A well-designed system with battery storage minimizes what you owe at true-up." }),
      /* @__PURE__ */ jsx("h2", { children: "Quick Tip: The $300+ Bill Rule" }),
      /* @__PURE__ */ jsx("p", { children: "If your average SCE bill is $300 or more per month, solar almost certainly makes financial sense — especially with a battery. At $300/month, you're spending $3,600/year on electricity. A properly sized solar + battery system can reduce that to near zero." }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Link, { href: "/get-quote", className: "text-[#2BABE2] font-semibold", children: "Get a free analysis based on your actual bill →" }) })
    ] })
  },
  "ev-charger-installation-guide": {
    title: "Home EV Charger Installation: Everything You Need to Know",
    subtitle: "Thinking about installing a Level 2 EV charger at home? Here's what the installation involves, how much it costs, and why pairing it with solar is the smartest move.",
    date: "November 5, 2023",
    readTime: "6 min read",
    category: "EV Charging",
    categoryColor: "bg-cyan-100 text-cyan-700",
    content: /* @__PURE__ */ jsxs("div", { className: "prose prose-lg max-w-none", children: [
      /* @__PURE__ */ jsx("p", { children: "If you own an electric vehicle, a Level 2 home charger is one of the best upgrades you can make. Charging at home is cheaper, more convenient, and — when paired with solar — can be nearly free." }),
      /* @__PURE__ */ jsx("h2", { children: "Level 1 vs. Level 2 Charging" }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Level 1 charging" }),
        " uses a standard 120V outlet. It adds about 3–5 miles of range per hour — fine for plug-in hybrids, but painfully slow for full EVs. Charging a Tesla Model 3 from empty takes 3+ days on Level 1."
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Level 2 charging" }),
        " uses a 240V circuit (same as your dryer). It adds 20–30 miles of range per hour. A Tesla Model 3 charges from 20% to 100% in about 8 hours — overnight, while you sleep."
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "What's Involved in Installation" }),
      /* @__PURE__ */ jsx("p", { children: "A Level 2 charger installation typically involves:" }),
      /* @__PURE__ */ jsxs("ol", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Electrical panel assessment" }),
          " — your panel needs available capacity for a 50-amp circuit (most modern panels do)"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Running a 240V circuit" }),
          " — from your panel to the garage or driveway"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Mounting the charger" }),
          " — wall-mounted EVSE (Electric Vehicle Supply Equipment)"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Permit and inspection" }),
          " — required in most California cities"
        ] })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "How Much Does It Cost?" }),
      /* @__PURE__ */ jsx("p", { children: "A typical Level 2 charger installation in Southern California costs $800–$1,500, including:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: "EVSE unit: $300–$700 (ChargePoint, Emporia, JuiceBox, Tesla Wall Connector)" }),
        /* @__PURE__ */ jsx("li", { children: "Electrical work: $400–$800" }),
        /* @__PURE__ */ jsx("li", { children: "Permit: $50–$150" })
      ] }),
      /* @__PURE__ */ jsx("p", { children: "If your electrical panel needs upgrading (older homes with 100-amp panels), add $2,000–$4,000 for the panel upgrade." }),
      /* @__PURE__ */ jsx("h2", { children: "Why Pair EV Charging with Solar" }),
      /* @__PURE__ */ jsx("p", { children: "Charging an EV adds 200–400 kWh/month to your electricity usage — a significant increase. Without solar, that's an extra $60–$160/month on your SCE bill." }),
      /* @__PURE__ */ jsx("p", { children: "With solar, you can charge your EV on sunshine. A properly sized solar system can cover both your home's electricity needs and your EV charging — for free, once the system is paid off." }),
      /* @__PURE__ */ jsx("p", { children: "Under NEM 3.0, the ideal setup is: charge your EV during the day when solar is producing, or charge from your Tesla Powerwall battery in the evening. Either way, you avoid SCE's peak rates." }),
      /* @__PURE__ */ jsx("h2", { children: "Best EV Chargers for Home Use" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Tesla Wall Connector" }),
          " — best for Tesla owners, integrates with Powerwall"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "ChargePoint Home Flex" }),
          " — adjustable amperage, works with all EVs"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Emporia EV Charger" }),
          " — smart load management, prevents overloading your panel"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "JuiceBox 40" }),
          " — reliable, good app, works with all EVs"
        ] })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "Getting Started" }),
      /* @__PURE__ */ jsx("p", { children: "Pell Solar installs Level 2 EV chargers as a standalone service or as part of a solar installation. We handle the permit, electrical work, and inspection — you just tell us where you want it." }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Link, { href: "/ev-charging", className: "text-[#2BABE2] font-semibold", children: "Learn more about EV charger installation →" }) })
    ] })
  },
  "solar-panel-maintenance": {
    title: "Solar Panel Maintenance: What You Actually Need to Do",
    subtitle: "Solar panels are low-maintenance — but not no-maintenance. Here's what to do annually and when to call a professional.",
    date: "October 22, 2023",
    readTime: "5 min read",
    category: "Maintenance",
    categoryColor: "bg-lime-100 text-lime-700",
    content: /* @__PURE__ */ jsxs("div", { className: "prose prose-lg max-w-none", children: [
      /* @__PURE__ */ jsx("p", { children: `One of solar's biggest selling points is low maintenance. No moving parts, no fuel, no filters to change. But "low maintenance" doesn't mean "no maintenance." Here's what you should actually do to keep your system producing at peak performance.` }),
      /* @__PURE__ */ jsx("h2", { children: "Annual Inspection" }),
      /* @__PURE__ */ jsx("p", { children: "Have a licensed solar contractor inspect your system once a year. They'll check:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: "Panel condition (cracks, delamination, soiling)" }),
        /* @__PURE__ */ jsx("li", { children: "Inverter operation and error codes" }),
        /* @__PURE__ */ jsx("li", { children: "Wiring and connections (rodent damage, corrosion)" }),
        /* @__PURE__ */ jsx("li", { children: "Racking and mounting hardware (loose bolts, rust)" }),
        /* @__PURE__ */ jsx("li", { children: "Roof penetrations (flashing, sealant)" }),
        /* @__PURE__ */ jsx("li", { children: "Monitoring system accuracy" })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "Panel Cleaning" }),
      /* @__PURE__ */ jsx("p", { children: "In Southern California, panels typically need cleaning once or twice a year. Dust, bird droppings, and pollen accumulate and reduce production by 5–25%." }),
      /* @__PURE__ */ jsx("p", { children: "You can clean panels yourself with a soft brush and water (no soap — it leaves residue). Do it in the early morning or evening when panels are cool. Never use a pressure washer — it can damage the panels and void the warranty." }),
      /* @__PURE__ */ jsx("p", { children: "Professional cleaning costs $150–$300 and is worth it if you're not comfortable on the roof." }),
      /* @__PURE__ */ jsx("h2", { children: "Monitor Your Production" }),
      /* @__PURE__ */ jsx("p", { children: "The best maintenance tool is your monitoring app (Enphase Enlighten or Tesla app). Check it monthly and look for:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: "Panels producing significantly less than others (could indicate shading, soiling, or failure)" }),
        /* @__PURE__ */ jsx("li", { children: "Overall production declining faster than expected" }),
        /* @__PURE__ */ jsx("li", { children: "Error codes or offline devices" })
      ] }),
      /* @__PURE__ */ jsx("p", { children: "If you notice a sudden drop in production, call your installer. Many issues (inverter faults, communication errors) can be diagnosed remotely." }),
      /* @__PURE__ */ jsx("h2", { children: "Critter Guard" }),
      /* @__PURE__ */ jsx("p", { children: "In Southern California, squirrels and birds love to nest under solar panels. They chew through wiring and cause expensive damage. If you don't have critter guard installed, consider adding it — especially if you have trees near your roof." }),
      /* @__PURE__ */ jsx("p", { children: "Signs of critter activity: scratching sounds on the roof, droppings on panels, sudden production drops." }),
      /* @__PURE__ */ jsx("h2", { children: "Tree Trimming" }),
      /* @__PURE__ */ jsx("p", { children: "Trees grow. A tree that wasn't shading your panels when they were installed may be shading them now. Check for new shading annually and trim as needed. Even partial shading of one panel can significantly reduce whole-string production with string inverters." }),
      /* @__PURE__ */ jsx("h2", { children: "What NOT to Do" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: "Don't walk on panels — they're not designed for foot traffic" }),
        /* @__PURE__ */ jsx("li", { children: "Don't use abrasive cleaners or pressure washers" }),
        /* @__PURE__ */ jsx("li", { children: "Don't ignore error codes — small issues become big ones" }),
        /* @__PURE__ */ jsx("li", { children: "Don't attempt electrical repairs yourself — always use a licensed contractor" })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "When to Call a Professional" }),
      /* @__PURE__ */ jsx("p", { children: "Call Pell Solar if you notice:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: "Production more than 15% below expected" }),
        /* @__PURE__ */ jsx("li", { children: "Persistent error codes on your monitoring app" }),
        /* @__PURE__ */ jsx("li", { children: "Physical damage to panels, racking, or wiring" }),
        /* @__PURE__ */ jsx("li", { children: "Roof leaks near panel mounting points" }),
        /* @__PURE__ */ jsx("li", { children: "Critter activity under panels" })
      ] }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Link, { href: "/solar-repair", className: "text-[#2BABE2] font-semibold", children: "Learn about our solar repair and maintenance services →" }) })
    ] })
  },
  "going-solar-inland-empire": {
    title: "Going Solar in the Inland Empire: A Local Guide",
    subtitle: "The Inland Empire is one of the best places in the country for solar. Here's what Inland Empire homeowners need to know before going solar.",
    date: "October 8, 2023",
    readTime: "7 min read",
    category: "Local Guides",
    categoryColor: "bg-red-100 text-red-700",
    content: /* @__PURE__ */ jsxs("div", { className: "prose prose-lg max-w-none", children: [
      /* @__PURE__ */ jsx("p", { children: "The Inland Empire — Riverside and San Bernardino counties — is one of the best solar markets in the United States. High electricity rates, abundant sunshine, and strong incentives make solar an excellent investment for IE homeowners." }),
      /* @__PURE__ */ jsx("h2", { children: "Why the Inland Empire Is Perfect for Solar" }),
      /* @__PURE__ */ jsx("p", { children: "Several factors make the IE particularly well-suited for solar:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Sun hours:" }),
          " The IE averages 5.5–6.5 peak sun hours per day — among the highest in the continental US"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "High electricity rates:" }),
          " SCE rates are among the highest in the country, making solar savings significant"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Hot summers:" }),
          " High AC usage means high summer bills — exactly when solar produces the most"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Strong home values:" }),
          " Solar adds $15,000–$25,000 to IE home values on average"
        ] })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "SCE Service Territory" }),
      /* @__PURE__ */ jsx("p", { children: "Most of the Inland Empire is served by Southern California Edison (SCE). Under NEM 3.0, SCE customers benefit most from pairing solar with a Tesla Powerwall battery — storing daytime solar energy to use during SCE's peak pricing window (4–9 PM)." }),
      /* @__PURE__ */ jsx("h2", { children: "Cities We Serve in the Inland Empire" }),
      /* @__PURE__ */ jsx("p", { children: "Pell Solar serves homeowners throughout the Inland Empire. Our service area includes:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: "Riverside, Corona, Moreno Valley" }),
        /* @__PURE__ */ jsx("li", { children: "San Bernardino, Fontana, Rancho Cucamonga" }),
        /* @__PURE__ */ jsx("li", { children: "Ontario, Upland, Claremont, Pomona" }),
        /* @__PURE__ */ jsx("li", { children: "Temecula, Murrieta, Menifee, Lake Elsinore" }),
        /* @__PURE__ */ jsx("li", { children: "Redlands, Yucaipa, Beaumont, Banning" }),
        /* @__PURE__ */ jsx("li", { children: "Chino, Chino Hills, Eastvale" })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "Typical IE Solar System" }),
      /* @__PURE__ */ jsx("p", { children: "The average Inland Empire home uses 800–1,200 kWh/month — higher than the California average due to air conditioning. A typical IE solar installation:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: "System size: 8–14 kW" }),
        /* @__PURE__ */ jsx("li", { children: "Panels: 20–35 panels" }),
        /* @__PURE__ */ jsx("li", { children: "Battery: Tesla Powerwall 3 (strongly recommended under NEM 3.0)" }),
        /* @__PURE__ */ jsx("li", { children: "Monthly savings: $200–$400 on SCE bill" })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "Permitting in IE Cities" }),
      /* @__PURE__ */ jsx("p", { children: "Pell Solar handles all permitting in every IE city we serve. Typical permit timelines:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: "Riverside: 2–3 weeks" }),
        /* @__PURE__ */ jsx("li", { children: "San Bernardino: 3–4 weeks" }),
        /* @__PURE__ */ jsx("li", { children: "Rancho Cucamonga: 2–3 weeks" }),
        /* @__PURE__ */ jsx("li", { children: "Corona: 2–3 weeks" }),
        /* @__PURE__ */ jsx("li", { children: "Temecula: 2–3 weeks" })
      ] }),
      /* @__PURE__ */ jsx("p", { children: "From contract signing to system activation typically takes 6–10 weeks in the Inland Empire." }),
      /* @__PURE__ */ jsx("h2", { children: "Pell Solar's IE Office" }),
      /* @__PURE__ */ jsx("p", { children: "Our California office is located in Upland — right in the heart of the Inland Empire. We're a local company, not a national chain. When you call us, you reach our local team, not a call center." }),
      /* @__PURE__ */ jsx("p", { children: "1326 Monte Vista Ave #7, Upland, CA 91786 | (714) 880-4416" }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Link, { href: "/get-quote", className: "text-[#2BABE2] font-semibold", children: "Get a free quote for your Inland Empire home →" }) })
    ] })
  },
  "virtual-power-plant-explained": {
    title: "Virtual Power Plant (VPP): What It Is and How You Get Paid",
    subtitle: "SCE's Virtual Power Plant program pays Tesla Powerwall owners to share stored energy during peak demand. Here's how it works and how to enroll.",
    date: "September 25, 2023",
    readTime: "6 min read",
    category: "Battery Storage",
    categoryColor: "bg-purple-100 text-purple-700",
    content: /* @__PURE__ */ jsxs("div", { className: "prose prose-lg max-w-none", children: [
      /* @__PURE__ */ jsx("p", { children: "If you have a Tesla Powerwall, you may be sitting on an income-generating asset you're not using. Southern California Edison's Virtual Power Plant (VPP) program pays Powerwall owners to dispatch stored energy back to the grid during peak demand events — at rates far above the standard NEM export rate." }),
      /* @__PURE__ */ jsx("h2", { children: "What Is a Virtual Power Plant?" }),
      /* @__PURE__ */ jsx("p", { children: "A Virtual Power Plant is a network of home batteries that can be coordinated to act like a single large power plant. Instead of building expensive peaker plants that only run a few hours per year, utilities can call on thousands of home batteries to supply power during demand spikes." }),
      /* @__PURE__ */ jsx("p", { children: "For homeowners, it's a way to earn money from your battery without any effort — Tesla's software handles everything automatically." }),
      /* @__PURE__ */ jsx("h2", { children: "How the SCE VPP Program Works" }),
      /* @__PURE__ */ jsx("p", { children: `SCE's VPP program (called the "Bring Your Own Battery" or BYOB program) works as follows:` }),
      /* @__PURE__ */ jsxs("ol", { children: [
        /* @__PURE__ */ jsx("li", { children: "You enroll your Tesla Powerwall in the program through the Tesla app" }),
        /* @__PURE__ */ jsx("li", { children: "During peak demand events (typically hot summer afternoons), SCE sends a dispatch signal" }),
        /* @__PURE__ */ jsx("li", { children: "Tesla's software automatically discharges your Powerwall to the grid" }),
        /* @__PURE__ */ jsx("li", { children: "You receive a payment for every kWh dispatched" }),
        /* @__PURE__ */ jsx("li", { children: "After the event, your Powerwall recharges from solar or the grid" })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "How Much Can You Earn?" }),
      /* @__PURE__ */ jsx("p", { children: "Payment rates vary by program and season, but typical VPP earnings are:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Standard dispatch:" }),
          " $2.00–$2.50/kWh"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Emergency dispatch:" }),
          " $3.00–$4.00/kWh"
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { children: "A Tesla Powerwall 3 holds 13.5 kWh. A full dispatch earns $27–$54 per event. During a hot California summer, there may be 10–20 dispatch events — earning $270–$1,080 per season." }),
      /* @__PURE__ */ jsx("h2", { children: "Does It Affect Your Backup Power?" }),
      /* @__PURE__ */ jsx("p", { children: "This is the most common concern. The answer: Tesla's software manages this automatically. You can set a minimum reserve level (e.g., keep 20% for backup), and the VPP dispatch will never go below that level." }),
      /* @__PURE__ */ jsx("p", { children: "You can also opt out of individual dispatch events if you prefer to keep your battery fully charged for an upcoming storm or outage." }),
      /* @__PURE__ */ jsx("h2", { children: "How to Enroll" }),
      /* @__PURE__ */ jsx("p", { children: "Enrollment is through the Tesla app:" }),
      /* @__PURE__ */ jsxs("ol", { children: [
        /* @__PURE__ */ jsx("li", { children: "Open the Tesla app → Powerwall → Settings → Storm Watch & VPP" }),
        /* @__PURE__ */ jsx("li", { children: "Select your utility (SCE) and enroll in the available programs" }),
        /* @__PURE__ */ jsx("li", { children: "Set your minimum reserve level" }),
        /* @__PURE__ */ jsx("li", { children: "Done — Tesla handles everything automatically" })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "VPP Under NEM 3.0" }),
      /* @__PURE__ */ jsx("p", { children: "Under NEM 3.0, the standard grid export rate is very low (~$0.05–0.08/kWh). VPP dispatch rates ($2–4/kWh) are 25–50x higher. This makes VPP participation one of the best ways to maximize the financial return on your battery investment under NEM 3.0." }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Link, { href: "/battery-backup", className: "text-[#2BABE2] font-semibold", children: "Learn more about Tesla Powerwall and battery storage →" }) })
    ] })
  },
  "solar-repair-common-problems": {
    title: "Solar Panel Problems: 7 Common Issues and How to Fix Them",
    subtitle: "Is your solar system underperforming? These are the seven most common problems we see — and what you can do about each one.",
    date: "September 10, 2023",
    readTime: "7 min read",
    category: "Maintenance",
    categoryColor: "bg-lime-100 text-lime-700",
    content: /* @__PURE__ */ jsxs("div", { className: "prose prose-lg max-w-none", children: [
      /* @__PURE__ */ jsx("p", { children: "Solar systems are designed to run for 25+ years with minimal issues. But problems do occur — and catching them early saves money. Here are the seven most common solar problems we see at Pell Solar, and what to do about each one." }),
      /* @__PURE__ */ jsx("h2", { children: "1. Inverter Failure" }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Symptoms:" }),
        " No production, error codes on monitoring app, inverter display showing fault"
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Cause:" }),
        " Inverters are the most failure-prone component in a solar system. String inverters typically last 10–15 years. Microinverters (Enphase) last longer but can still fail."
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Fix:" }),
        " Inverter replacement. Cost varies by type — string inverters: $1,000–$2,500; microinverters: $150–$300 per unit. If your inverter is under warranty, replacement is free."
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "2. Low Production" }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Symptoms:" }),
        " System producing less than expected, higher-than-expected electric bills"
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Cause:" }),
        " Many possible causes — panel soiling, new shading, panel degradation, inverter issues, wiring problems"
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Fix:" }),
        " Start with panel cleaning. If production is still low, have a technician run diagnostics to identify the root cause."
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "3. Critter Damage" }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Symptoms:" }),
        " Sudden production drop, visible chewed wiring, scratching sounds on roof"
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Cause:" }),
        " Squirrels, birds, and rodents nest under panels and chew through wiring"
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Fix:" }),
        " Repair damaged wiring, install critter guard to prevent recurrence. Cost: $500–$1,500 depending on damage extent."
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "4. Roof Leaks" }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Symptoms:" }),
        " Water stains on ceiling near panel mounting points, visible rust around flashing"
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Cause:" }),
        " Improper installation — inadequate flashing, wrong sealant, or penetrations in the wrong location"
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Fix:" }),
        " Remove panels, repair roof, reinstall with proper flashing. If the original installer is still in business and the leak is due to their installation, it should be covered under workmanship warranty."
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "5. Monitoring Communication Issues" }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Symptoms:" }),
        " Monitoring app shows devices offline, no production data"
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Cause:" }),
        " Wi-Fi router change, internet outage, gateway firmware issue"
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Fix:" }),
        " Often resolved by rebooting the gateway (Enphase Envoy or Tesla Gateway). If that doesn't work, check Wi-Fi credentials and signal strength at the gateway location."
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "6. Panel Microcracks" }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Symptoms:" }),
        " Gradual production decline, visible dark spots on panels (visible with thermal camera)"
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Cause:" }),
        " Thermal stress, hail, foot traffic, or manufacturing defects"
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Fix:" }),
        " Panel replacement. If within the 25-year product warranty, the manufacturer covers it. Document with photos and contact your installer."
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "7. Hot Spots" }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Symptoms:" }),
        " One panel producing significantly less than others, visible discoloration"
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Cause:" }),
        " Partial shading, cell defects, or soiling causing current mismatch within a panel"
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Fix:" }),
        " Clean the affected panel first. If the hot spot persists, the panel may need replacement. Hot spots can cause fires if left unaddressed — don't ignore them."
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "When to Call a Professional" }),
      /* @__PURE__ */ jsx("p", { children: "If your system is producing more than 15% below expected, or if you see any physical damage, call a licensed solar contractor. Many issues can be diagnosed remotely through monitoring data before an on-site visit is needed." }),
      /* @__PURE__ */ jsx("p", { children: "Pell Solar services all brands — not just systems we installed. We offer free remote diagnostics for systems with active monitoring." }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Link, { href: "/solar-repair", className: "text-[#2BABE2] font-semibold", children: "Schedule a solar repair diagnostic →" }) })
    ] })
  },
  "why-choose-local-solar-company": {
    title: "Why You Should Choose a Local Solar Company Over a National Chain",
    subtitle: "National solar companies have big marketing budgets — but local installers often deliver better results. Here's why choosing local protects your investment.",
    date: "August 28, 2023",
    readTime: "5 min read",
    category: "Solar Basics",
    categoryColor: "bg-blue-100 text-blue-700",
    content: /* @__PURE__ */ jsxs("div", { className: "prose prose-lg max-w-none", children: [
      /* @__PURE__ */ jsx("p", { children: "You've probably seen ads from national solar companies — Sunrun, SunPower, Vivint Solar, and others. They have massive marketing budgets, celebrity endorsements, and slick websites. But when it comes to your home, bigger isn't always better." }),
      /* @__PURE__ */ jsx("h2", { children: "The Problem with National Solar Companies" }),
      /* @__PURE__ */ jsx("p", { children: "National solar companies operate on a franchise model. They sign you up, then subcontract the actual installation to local crews — often the lowest bidder. Quality control varies significantly." }),
      /* @__PURE__ */ jsx("p", { children: "More importantly: when something goes wrong 5 years from now, who do you call? National companies have high turnover, frequent rebranding, and some have gone bankrupt (SunPower filed for bankruptcy in 2024). If your installer is gone, your warranty may be worthless." }),
      /* @__PURE__ */ jsx("h2", { children: "Why Local Companies Are Better" }),
      /* @__PURE__ */ jsx("h3", { children: "Accountability" }),
      /* @__PURE__ */ jsx("p", { children: "A local company has its reputation on the line in your community. They can't afford bad reviews — their next customer might be your neighbor. National companies can absorb bad reviews across thousands of installations." }),
      /* @__PURE__ */ jsx("h3", { children: "Direct Relationship" }),
      /* @__PURE__ */ jsx("p", { children: "When you call a local company, you reach the people who installed your system — not a call center in another state. They know your roof, your system, and your history." }),
      /* @__PURE__ */ jsx("h3", { children: "Faster Service" }),
      /* @__PURE__ */ jsx("p", { children: "Local companies can dispatch a technician quickly. National companies often have service backlogs of weeks or months because they're managing thousands of customers across large geographic areas." }),
      /* @__PURE__ */ jsx("h3", { children: "Better Installations" }),
      /* @__PURE__ */ jsx("p", { children: "Local installers build their business on referrals. They take pride in clean, professional installations because every job is a showcase in their community. National companies often prioritize speed over quality." }),
      /* @__PURE__ */ jsx("h3", { children: "Long-Term Support" }),
      /* @__PURE__ */ jsx("p", { children: "A 25-year warranty is only valuable if the company will be around to honor it. Local companies that have been in business for 10+ years are far more likely to be around in 25 years than a national chain that may pivot, rebrand, or go bankrupt." }),
      /* @__PURE__ */ jsx("h2", { children: "What to Look for in a Local Solar Company" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Years in business:" }),
          " 5+ years minimum; 10+ is better"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "CSLB license:" }),
          " Verify at cslb.ca.gov (California requires C-46 Solar Contractor license)"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Insurance:" }),
          " General liability and workers' comp"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Reviews:" }),
          " Check Yelp, Google, and BBB — look for consistent quality over time"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Physical office:" }),
          " A real office means a real company"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "References:" }),
          " Ask for references from installations 5+ years ago"
        ] })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "About Pell Solar" }),
      /* @__PURE__ */ jsx("p", { children: "Pell Solar is a family-owned company with a physical office in Upland, CA. We serve Southern California and Idaho with solar and battery solutions, and our team is available to discuss your project by phone." }),
      /* @__PURE__ */ jsx("p", { children: "CSLB License #949122 | (866) 646-8499" }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Link, { href: "/about", className: "text-[#2BABE2] font-semibold", children: "Learn more about Pell Solar →" }) })
    ] })
  }
};
function BlogArticle() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug ?? "";
  const article = articles[slug];
  if (!article) {
    return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white", style: { fontFamily: "'Inter', system-ui, sans-serif" }, children: [
      /* @__PURE__ */ jsx(Navbar, {}),
      /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-6 py-32 text-center", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-extrabold text-gray-900 mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Article Not Found" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-8", children: "This article doesn't exist or has been moved." }),
        /* @__PURE__ */ jsx(Link, { href: "/blog", className: "btn-green", children: "Back to Blog" })
      ] }),
      /* @__PURE__ */ jsx(Footer, {})
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white", style: { fontFamily: "'Inter', system-ui, sans-serif" }, children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("section", { className: "relative py-24 md:py-32", style: { backgroundImage: `url(${HERO_IMG$6})`, backgroundSize: "cover", backgroundPosition: "center" }, children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#0B1D51]/45" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-4xl mx-auto px-6 text-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsx("span", { className: `text-xs font-bold px-3 py-1 rounded-full ${article.categoryColor}`, children: article.category }),
          /* @__PURE__ */ jsxs("span", { className: "text-white/50 text-sm flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Calendar, { size: 14 }),
            " ",
            article.date
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "text-white/50 text-sm flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Clock, { size: 14 }),
            " ",
            article.readTime
          ] })
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight", style: { fontFamily: "'Montserrat', sans-serif" }, children: article.title }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-white/75 max-w-3xl mx-auto", children: article.subtitle })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxs(Link, { href: "/blog", className: "inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm font-medium mb-10 no-underline transition-colors", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { size: 16 }),
        " Back to Blog"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "\n            [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4\n            [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3\n            [&_p]:text-gray-700 [&_p]:leading-relaxed [&_p]:mb-5\n            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_ul>li]:text-gray-700 [&_ul>li]:mb-2 [&_ul>li]:leading-relaxed\n            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5 [&_ol>li]:text-gray-700 [&_ol>li]:mb-2 [&_ol>li]:leading-relaxed\n            [&_strong]:font-bold [&_strong]:text-gray-900\n            [&_em]:italic\n            [&_a]:text-[#2BABE2] [&_a]:font-semibold [&_a]:no-underline [&_a:hover]:underline\n            [&_table]:w-full [&_table]:border-collapse [&_table]:mb-6 [&_table]:text-sm\n            [&_th]:border [&_th]:border-gray-200 [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:bg-gray-100\n            [&_td]:border [&_td]:border-gray-200 [&_td]:px-4 [&_td]:py-2\n          ", children: article.content }),
      /* @__PURE__ */ jsxs("div", { className: "mt-16 bg-[#0B1D51] rounded-2xl p-8 text-center", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-extrabold text-white mb-3", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Ready to Go Solar?" }),
        /* @__PURE__ */ jsx("p", { className: "text-white/70 mb-6", children: "Get a free, no-pressure quote from Pell Solar, a family-owned solar company." }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [
          /* @__PURE__ */ jsx(Link, { href: "/get-quote", className: "btn-gold text-base px-8 py-3", children: "Get Your Free Quote" }),
          /* @__PURE__ */ jsxs("a", { href: "tel:8666468499", className: "text-white font-bold no-underline hover:text-[#FED44D] transition-colors flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Phone, { size: 16, className: "text-[#FED44D]" }),
            " (866) 646-8499"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 text-center", children: /* @__PURE__ */ jsxs(Link, { href: "/blog", className: "inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium no-underline transition-colors", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { size: 16 }),
        " Back to all articles"
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const HERO_IMG$5 = "/manus-storage/solar-home-main-v2_0ad97127.jpg";
const QCELLS_IMG = "/manus-storage/qcells-panel-real_2bd09da8.png";
const JINKO_IMG = "/manus-storage/jinko-panel-real_d42d5d02.png";
const HYUNDAI_IMG = "/manus-storage/hyundai-panel-real_46a998c9.png";
const POWERWALL_IMG = "/manus-storage/powerwall3-solar-meter_c7511143.png?v=20260819";
const POWERWALL_FALLBACK_IMG$1 = "/manus-storage/tesla-powerwall-house_f27a908c.jpeg?v=20260819";
const scenarios = [
  {
    id: "solar",
    icon: "☀️",
    label: "Solar Panels",
    time: "7am – 4pm · Off-Peak",
    title: "Solar Panels — Generating Free Electricity",
    period: "OFF-PEAK · 7:00 AM – 4:00 PM",
    desc: "Your solar panels are producing clean energy from sunrise. During off-peak hours, your panels power your home directly and send excess energy to charge your Tesla Powerwall battery. Any remaining surplus goes to the grid — but under NEM 3.0, we prioritize self-consumption and battery storage over exports.",
    color: "#f59e0b"
  },
  {
    id: "charging",
    icon: "⚡",
    label: "Tesla Charging",
    time: "Off-Peak · Charge Smart",
    title: "Tesla EV Charging — Off-Peak Smart Charging",
    period: "OFF-PEAK · CHARGE SMART",
    desc: "Your Tesla Wall Connector charges your EV using free solar energy during off-peak hours. By charging during the day when your panels are producing, you avoid paying SCE's peak electricity rates. A full charge from solar costs you $0 — compared to $15–$25 from the grid.",
    color: "#3b82f6"
  },
  {
    id: "powerwall",
    icon: "🔋",
    label: "Powerwall 3",
    time: "4pm – 9pm · Peak Protection",
    title: "Powerwall 3 — Running Your Home Off Battery",
    period: "PEAK · 4:00 PM – 9:00 PM · UP TO $0.58/kWh",
    desc: "It's 4pm–9pm — the most expensive part of the day. Your Powerwall is running your entire home on stored solar energy so you're not buying a single kWh from SCE. We don't export power back to the grid — every bit goes to your home.",
    color: "#2BABE2"
  },
  {
    id: "backup",
    icon: "🏠",
    label: "Whole Home Backup",
    time: "Grid Down · Battery Powered",
    title: "Whole Home Backup — Grid Down Protection",
    period: "GRID OUTAGE · BATTERY POWERED",
    desc: "When the grid goes down, your Powerwall automatically kicks in — keeping your lights on, your fridge running, and your family comfortable. Your solar panels continue charging the battery during the day, giving you potentially unlimited backup power during extended outages.",
    color: "#ef4444"
  }
];
function HowItWorksAnimation() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const intervalRef = useRef(null);
  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setActive((prev) => (prev + 1) % scenarios.length);
      }, 6e3);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing]);
  const s = scenarios[active];
  return /* @__PURE__ */ jsxs("div", { className: "bg-[#0B1D51] rounded-2xl overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 border-b border-white/10 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-xs font-bold uppercase tracking-wider", style: { color: s.color }, children: s.period }),
        /* @__PURE__ */ jsxs("h3", { className: "text-white text-lg font-bold mt-1", style: { fontFamily: "'Montserrat', sans-serif" }, children: [
          s.icon,
          " ",
          s.title
        ] })
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: () => setPlaying(!playing), className: "text-white/60 hover:text-white text-sm px-3 py-1 rounded border border-white/20 transition-colors", children: playing ? "⏸ Pause" : "▶ Play" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "px-6 py-5 border-b border-white/10", children: /* @__PURE__ */ jsx("p", { className: "text-white/80 text-sm leading-relaxed", children: s.desc }) }),
    /* @__PURE__ */ jsx("div", { className: "px-6 py-8", children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center gap-4 md:gap-8 flex-wrap", children: [
      { emoji: "☀️", label: "Solar", highlight: active === 0, bg: "bg-yellow-400/20" },
      { emoji: "⚡", label: "Panels", highlight: active <= 1, bg: "bg-blue-500/20" },
      { emoji: "🔋", label: "Powerwall", highlight: active === 2 || active === 3, bg: "bg-[#2BABE2/10]0/20" },
      { emoji: "🏠", label: "Home", highlight: active >= 2, bg: "bg-white/10" }
    ].map((node, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: `flex flex-col items-center transition-all duration-500 ${node.highlight ? "scale-110" : "opacity-60"}`, children: [
        /* @__PURE__ */ jsx("div", { className: `w-16 h-16 rounded-xl ${node.bg} flex items-center justify-center text-3xl`, children: node.emoji }),
        /* @__PURE__ */ jsx("span", { className: "text-white/60 text-xs mt-2", children: node.label })
      ] }),
      i < 3 && /* @__PURE__ */ jsx(ArrowRight, { size: 24, className: `text-white/30 ${node.highlight ? "animate-pulse" : ""}`, style: { color: node.highlight ? s.color : void 0 } })
    ] }, node.label)) }) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 border-t border-white/10", children: scenarios.map((sc, i) => /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => {
          setActive(i);
          setPlaying(false);
        },
        className: `px-4 py-4 text-center transition-all border-t-2 ${active === i ? "bg-white/10" : "border-transparent hover:bg-white/5"}`,
        style: { borderTopColor: active === i ? sc.color : "transparent" },
        children: [
          /* @__PURE__ */ jsx("div", { className: "text-2xl mb-1", children: sc.icon }),
          /* @__PURE__ */ jsx("div", { className: "text-white text-xs font-bold", children: sc.label }),
          /* @__PURE__ */ jsx("div", { className: "text-white/40 text-[10px] mt-0.5", children: sc.time })
        ]
      },
      sc.id
    )) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 bg-[#0a1640] border-t border-white/10", children: [{ val: "$0.58/kWh", label: "SCE peak rate" }, { val: "$0.00", label: "your cost" }, { val: "13.5 kWh", label: "per battery" }, { val: "1 or 2", label: "batteries needed" }].map((stat) => /* @__PURE__ */ jsxs("div", { className: "px-4 py-4 text-center border-r border-white/5 last:border-r-0", children: [
      /* @__PURE__ */ jsx("div", { className: "text-white font-black text-lg", children: stat.val }),
      /* @__PURE__ */ jsx("div", { className: "text-white/50 text-xs", children: stat.label })
    ] }, stat.label)) }),
    /* @__PURE__ */ jsx("div", { className: "px-6 py-3 text-center border-t border-white/10", children: /* @__PURE__ */ jsxs("span", { className: "text-white/40 text-xs", children: [
      "Built by ",
      /* @__PURE__ */ jsx("span", { className: "text-white/60 font-semibold", children: "Pell Solar" }),
      " — Southern California's Trusted Tesla Installer"
    ] }) })
  ] });
}
function SolarSystems() {
  const [activeTab, setActiveTab] = useState("panels");
  const scrollToSection = (id) => {
    setActiveTab(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white text-gray-900", style: { fontFamily: "'Inter', system-ui, sans-serif" }, children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs(
      "section",
      {
        className: "relative min-h-[70vh] flex items-center justify-center text-center",
        style: { backgroundImage: `url(${HERO_IMG$5})`, backgroundSize: "cover", backgroundPosition: "center" },
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-[#0B1D51]/45 via-[#0B1D51]/30 to-[#0B1D51]/45" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-4xl mx-auto px-6 py-24", children: [
            /* @__PURE__ */ jsx("div", { className: "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-5 py-2 rounded-full mb-6", style: { background: "rgba(254,212,77,0.15)", border: "1px solid #FED44D", color: "#FED44D" }, children: "Tesla Certified Installer · Family-Owned" }),
            /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6", style: { fontFamily: "'Montserrat', sans-serif" }, children: [
              "Solar Systems Designed to ",
              /* @__PURE__ */ jsx("span", { style: { color: "#FED44D" }, children: "Eliminate Your Electric Bill" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed", children: "Every system custom-engineered for your home. Built 25% bigger than your usage for NEM 3.0. Paired with Tesla Powerwall batteries so you never pay peak rates again." }),
            /* @__PURE__ */ jsx(Link, { href: "/get-quote", className: "inline-block bg-white text-[#0B1D51] font-bold text-lg px-10 py-4 rounded-full hover:bg-gray-100 transition-colors no-underline shadow-xl", children: "GET YOUR FREE SOLAR QUOTE" }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-3 mt-12", children: [{ id: "panels", label: "Solar Panels" }, { id: "racking", label: "Racking & Mounting" }, { id: "inverters", label: "Inverters" }, { id: "howitworks", label: "How It Works" }].map((tab) => /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => scrollToSection(tab.id),
                className: `px-5 py-2.5 rounded-full text-sm font-bold transition-all border ${activeTab === tab.id ? "bg-white text-[#0B1D51] border-white" : "bg-white/10 text-white border-white/30 hover:bg-white/20"}`,
                children: tab.label
              },
              tab.id
            )) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 text-center", style: { fontFamily: "'Montserrat', sans-serif" }, children: [
        "Why We Build Your System ",
        /* @__PURE__ */ jsx("span", { className: "text-[#2BABE2]", children: "25% Bigger" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-gray-700 text-lg leading-relaxed space-y-4", children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "Under NEM 3.0, you no longer get the 1-to-1 credit you used to receive with NEM 2.0. Exporting solar back to the grid earns you pennies on the dollar. That's why we design every system at ",
          /* @__PURE__ */ jsx("strong", { children: "125% of your annual consumption" }),
          " — so your panels produce enough to fully power your home and charge your battery, without relying on grid credits that no longer make financial sense."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Paired with a Tesla Powerwall, your system stores excess solar during the day and runs your home off battery every evening from ",
          /* @__PURE__ */ jsx("strong", { children: "4pm to 9pm" }),
          " — when SCE charges up to ",
          /* @__PURE__ */ jsx("strong", { children: "$0.58/kWh" }),
          ". This is how we eliminate your bill."
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "panels", className: "py-20 bg-gray-50 scroll-mt-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-14", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-gray-900 mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Premium Solar Panels — Built to Last" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg max-w-3xl mx-auto", children: "We use top-tier domestic and tariff-free panels so your investment is protected. Every panel comes with a 25-year manufacturer warranty." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-8", children: [
        { img: QCELLS_IMG, badge: "Made in USA — No Tariffs", title: "Q CELLS by Hanwha", desc: "High-efficiency panels with excellent shade performance. Manufactured in Georgia, USA — zero tariff risk. 25-year product and performance warranty. Our go-to for most residential installs." },
        { img: JINKO_IMG, badge: "Global Leader", title: "Jinko Solar", desc: "One of the world's largest panel manufacturers. Known for reliability, consistent output, and strong warranty support. Proven across millions of installations worldwide." },
        { img: HYUNDAI_IMG, badge: "Premium Quality", title: "Hyundai Energy", desc: "Backed by one of the world's largest corporations. Premium build quality with excellent low-light performance. 25-year warranty with the Hyundai name behind it." }
      ].map((panel) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow", children: [
        /* @__PURE__ */ jsx("div", { className: "h-56 overflow-hidden", children: /* @__PURE__ */ jsx("img", { src: panel.img, alt: panel.title, className: "w-full h-full object-cover" }) }),
        /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsx("span", { className: "inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 bg-[#2BABE2/15] text-[#0B1D51]", children: panel.badge }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-900 mb-3", style: { fontFamily: "'Montserrat', sans-serif" }, children: panel.title }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm leading-relaxed", children: panel.desc })
        ] })
      ] }, panel.title)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "racking", className: "py-20 bg-white scroll-mt-20", children: /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto px-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row items-center gap-12", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-1 max-w-md", children: /* @__PURE__ */ jsx("img", { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663592920644/UzNUyTd222pkxN2KfqQwdX/ironridge-racking-kJdWNXBaNfHJQf4nBP3vi5.webp", alt: "IronRidge racking system on residential roof", className: "w-full rounded-2xl shadow-lg" }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-gray-900 mb-6", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Professional Racking & Roof Mounting" }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-700 text-lg leading-relaxed mb-6", children: [
          "Your panels are only as good as what holds them to your roof. We use ",
          /* @__PURE__ */ jsx("strong", { children: "IronRidge" }),
          " — the industry standard — engineered for strength, speed, and code compliance. Made in the USA."
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-xl p-6 space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-bold text-gray-900 mb-1", children: "Tile Roofs:" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-sm leading-relaxed", children: "Specialized tile hooks mount securely beneath the tiles without damaging them. Your roof stays intact and watertight." })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-bold text-gray-900 mb-1", children: "Comp/Shingle Roofs:" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-sm leading-relaxed", children: "IronRidge FlashFoot2 mounts with integrated flashing — waterproof, code-compliant, and clean-looking from the street." })
          ] })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-gray-50", children: /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto px-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row items-center gap-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-gray-900 mb-6", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Real-Time Energy Monitoring" }),
        /* @__PURE__ */ jsxs("div", { className: "text-gray-700 text-lg leading-relaxed space-y-4", children: [
          /* @__PURE__ */ jsx("p", { children: "Every system includes app-based monitoring. See exactly how much power your panels produce, how much your home uses, and how much your battery stores — all from your phone." }),
          /* @__PURE__ */ jsxs("p", { children: [
            "With the ",
            /* @__PURE__ */ jsx("strong", { children: "Tesla app" }),
            ", you get real-time visibility into solar production, Powerwall charge level, home consumption, and grid status. With ",
            /* @__PURE__ */ jsx("strong", { children: "Enphase" }),
            ", you get per-panel monitoring so you can see every panel individually."
          ] }),
          /* @__PURE__ */ jsx("p", { className: "font-semibold text-gray-900 border-l-4 border-[#2BABE2] pl-4", children: "Knowledge is power — literally. Watching your system produce free electricity never gets old." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 max-w-md", children: /* @__PURE__ */ jsx("img", { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663592920644/UzNUyTd222pkxN2KfqQwdX/solar-monitoring-phone-i3L2znA73NFQKeLEeB5uBT.webp", alt: "Solar energy monitoring app on iPhone showing production, battery, and usage data", className: "w-full rounded-2xl shadow-xl" }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { id: "inverters", className: "py-20 bg-white scroll-mt-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-14", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-gray-900 mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Smart Inverters — The Brain of Your System" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg max-w-3xl mx-auto", children: "The inverter converts DC power from your panels into AC power your home can use. We use the best in the industry." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-8", children: [
        { icon: /* @__PURE__ */ jsx(Zap, { size: 32, className: "text-yellow-500" }), title: "Tesla Powerwall 3", desc: "Built-in solar inverter — no separate box needed. Fewer components, cleaner install, higher efficiency. Monitored through the Tesla app." },
        { icon: /* @__PURE__ */ jsx(Monitor, { size: 32, className: "text-blue-500" }), title: "Enphase Microinverters", desc: "Panel-level optimization — each panel works independently. If one is shaded, the rest produce at full power. Per-panel monitoring included." },
        { icon: /* @__PURE__ */ jsx(Shield, { size: 32, className: "text-[#2BABE2]" }), title: "App-Based Control", desc: "Both Tesla and Enphase provide smartphone apps for real-time monitoring, alerts, and system management from anywhere." }
      ].map((inv) => /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-2xl p-8 text-center border border-gray-200 hover:shadow-lg transition-shadow", children: [
        /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center mx-auto mb-5", children: inv.icon }),
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-900 mb-3", style: { fontFamily: "'Montserrat', sans-serif" }, children: inv.title }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm leading-relaxed", children: inv.desc })
      ] }, inv.title)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-gray-50", children: /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto px-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row items-center gap-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-extrabold text-gray-900 mb-6", style: { fontFamily: "'Montserrat', sans-serif" }, children: [
          "Tesla Powerwall 3 — ",
          /* @__PURE__ */ jsx("span", { className: "text-[#2BABE2]", children: "Your Energy Shield" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-gray-700 text-lg leading-relaxed space-y-4", children: [
          /* @__PURE__ */ jsxs("p", { children: [
            "Under NEM 3.0, batteries are essential. You need to use your own solar power during peak hours (4–9pm) instead of buying from SCE at up to ",
            /* @__PURE__ */ jsx("strong", { children: "$0.58/kWh" }),
            "."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Each Powerwall 3 stores ",
            /* @__PURE__ */ jsx("strong", { children: "13.5 kWh" }),
            " with a built-in inverter. One battery handles lights, plugs, and essentials through peak. Running AC and heavy appliances? You'll want two."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Our goal:" }),
            " Zero grid power from 4pm to 9pm, every single day. That's how we eliminate your bill."
          ] })
        ] }),
        /* @__PURE__ */ jsx(Link, { href: "/tesla-powerwall", className: "btn-green mt-8 inline-block", children: "LEARN MORE ABOUT POWERWALL →" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 max-w-md", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: POWERWALL_IMG,
          alt: "Tesla Powerwall 3",
          className: "w-full rounded-2xl shadow-lg",
          onError: (event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = POWERWALL_FALLBACK_IMG$1;
          }
        }
      ) })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16", style: { background: "linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)" }, children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-white mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Ready to See What Solar Can Do for Your Home?" }),
      /* @__PURE__ */ jsx("p", { className: "text-white/80 text-lg mb-8 max-w-2xl mx-auto", children: "Every system is custom-designed based on your roof, your usage, and your goals. No pressure, no gimmicks — just honest recommendations." }),
      /* @__PURE__ */ jsx(Link, { href: "/get-quote", className: "inline-block bg-white text-[#0B1D51] font-bold text-lg px-10 py-4 rounded-full hover:bg-gray-100 transition-colors no-underline shadow-xl", children: "GET A FREE QUOTE" })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "howitworks", className: "py-20 bg-[#0B1D51] scroll-mt-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-14", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-extrabold text-white mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: [
          "How Solar + Battery ",
          /* @__PURE__ */ jsx("span", { style: { color: "#FED44D" }, children: "Gets It Done" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-white/70 text-lg max-w-3xl mx-auto", children: "Under NEM 3.0, the winning strategy is keeping your solar energy instead of giving it to Edison. A battery makes that possible." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8 mb-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-2xl p-8 border border-white/10", children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs font-bold uppercase tracking-wider text-red-400 mb-3", children: "The Old Way" }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Send Energy to Edison, Get a Credit" }),
          /* @__PURE__ */ jsx("p", { className: "text-white/70 leading-relaxed", children: "Under the old programs, your panels made energy during the day and you sent the extra to the grid. Edison gave you a full credit. That worked great. Under NEM 3.0, that credit is lower — so this approach alone doesn't go as far." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-2xl p-8 border border-[#FED44D]/30", children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs font-bold uppercase tracking-wider mb-3", style: { color: "#FED44D" }, children: "The Smart Way" }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Store Your Energy, Use It When It Counts" }),
          /* @__PURE__ */ jsxs("p", { className: "text-white/70 leading-relaxed", children: [
            "With a battery, you keep your solar energy and use it between ",
            /* @__PURE__ */ jsx("strong", { className: "text-white", children: "4 PM and 9 PM" }),
            " — when Edison charges the most. You're not relying on credits from the grid. You're powering your home with your own stored energy for free. ",
            /* @__PURE__ */ jsx("strong", { className: "text-white", children: "That's how you take control of your bill." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-14", children: [
        /* @__PURE__ */ jsx(HowItWorksAnimation, {}),
        /* @__PURE__ */ jsx("div", { className: "text-center mt-6", children: /* @__PURE__ */ jsxs(
          Link,
          {
            href: "/solar-demo",
            className: "inline-flex items-center gap-2 text-[#FED44D] hover:text-white text-sm font-semibold no-underline transition-colors border border-[#FED44D]/40 hover:border-white/40 px-5 py-2.5 rounded-full",
            children: [
              /* @__PURE__ */ jsx("span", { children: "☀️" }),
              " See the Full Interactive House Demo"
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6 mb-14", children: [
        { num: "1", icon: "☀️", title: "Panels Make Power", desc: "Your solar panels generate energy during the day while the sun is shining." },
        { num: "2", icon: "🔋", title: "Battery Stores It", desc: "Instead of sending extra power to Edison, your battery stores it for later." },
        { num: "3", icon: "⚡", title: "Discharge 4–9 PM", desc: "During peak hours your home runs on stored battery power, not the grid." },
        { num: "4", icon: "🏠", title: "Full Backup Power", desc: "If the grid goes down, your Powerwall keeps your entire home running." }
      ].map((step) => /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-black",
            style: { background: "#FED44D", color: "#0B1D51" },
            children: step.num
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "text-3xl mb-3", children: step.icon }),
        /* @__PURE__ */ jsx("h4", { className: "text-white font-bold text-sm mb-2", style: { fontFamily: "'Montserrat', sans-serif" }, children: step.title }),
        /* @__PURE__ */ jsx("p", { className: "text-white/60 text-xs leading-relaxed", children: step.desc })
      ] }, step.num)) }),
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-extrabold text-white mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Ready to Take Control of Your Electric Bill?" }),
        /* @__PURE__ */ jsx("p", { className: "text-white/70 mb-8", children: "We design every system to maximize your savings under NEM 3.0. Let us show you what's possible for your home." }),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: "/get-quote",
            className: "inline-block font-bold text-lg px-10 py-4 rounded-full no-underline transition-all",
            style: { background: "#FED44D", color: "#0B1D51" },
            children: "GET A FREE CONSULTATION"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-gray-900 mb-12 text-center", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Why Homeowners Choose Pell Solar" }),
      /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6", children: [
        { icon: /* @__PURE__ */ jsx(Star, { size: 28, className: "text-[#FED44D]" }), title: "Family-Owned", desc: "A local solar company serving Southern California and Idaho." },
        { icon: /* @__PURE__ */ jsx(Shield, { size: 28, className: "text-red-500" }), title: "Tesla Certified Installer", desc: "Certified and trained directly by Tesla to install solar panels, Powerwall batteries, and Wall Connectors." },
        { icon: /* @__PURE__ */ jsx(Users, { size: 28, className: "text-[#2BABE2]" }), title: "90% Referral Rate", desc: "Most of our customers come from word of mouth. That tells you everything about how we treat people." },
        { icon: /* @__PURE__ */ jsx(Wrench, { size: 28, className: "text-blue-500" }), title: "Our Own Crews", desc: "We don't outsource. Our licensed electricians and installers do every job. We pull permits and handle HOA." }
      ].map((card) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 border border-gray-200 text-center hover:shadow-lg transition-shadow", children: [
        /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4", children: card.icon }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900 mb-2", style: { fontFamily: "'Montserrat', sans-serif" }, children: card.title }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm leading-relaxed", children: card.desc })
      ] }, card.title)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx("p", { className: "text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-8", children: "Trusted Equipment Partners" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 md:grid-cols-6 gap-6", children: [
        { name: "TESLA", sub: "Certified Installer", color: "text-red-600" },
        { name: "Q CELLS", sub: "Made in USA", color: "text-gray-800" },
        { name: "Enphase", sub: "Microinverters", color: "text-orange-600" },
        { name: "IronRidge", sub: "Racking Systems", color: "text-blue-600" },
        { name: "Jinko", sub: "Solar Panels", color: "text-[#2BABE2]" },
        { name: "Hyundai", sub: "Solar Panels", color: "text-blue-800" }
      ].map((p) => /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("div", { className: `text-lg font-black ${p.color}`, children: p.name }),
        /* @__PURE__ */ jsx("div", { className: "text-gray-500 text-xs", children: p.sub })
      ] }, p.name)) }),
      /* @__PURE__ */ jsx("p", { className: "text-center text-gray-500 text-sm mt-6", children: "We prioritize domestic and tariff-free products to protect your investment." })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const HERO_IMG$4 = "/manus-storage/battery-backup_9b911c85.jpg";
const POWERWALL_PRODUCT_IMG = "/manus-storage/powerwall3-solar-meter_c7511143.png?v=20260819";
const POWERWALL_FALLBACK_IMG = "/manus-storage/tesla-powerwall-house_f27a908c.jpeg?v=20260819";
const REAL_INSTALLATION_PHOTOS = [
  {
    src: "/manus-storage/powerwall-exterior-finished_5ef809f3.webp",
    alt: "Finished Tesla Powerwall installation on the exterior wall of a residence",
    label: "Finished exterior installation"
  },
  {
    src: "/manus-storage/powerwall-exterior-side_13ec911c.webp",
    alt: "Tesla Powerwall and electrical equipment installed along the side of a residence",
    label: "Exterior equipment installation"
  },
  {
    src: "/manus-storage/powerwall-garage-finished_f3ce548a.webp",
    alt: "Finished Tesla Powerwall installation in a residential garage",
    label: "Finished garage installation"
  },
  {
    src: "/manus-storage/powerwall-garage-detail_61b5ec4b.webp",
    alt: "Tesla Powerwall residential garage installation detail",
    label: "Garage installation detail"
  },
  {
    src: "/manus-storage/powerwall-garage-dual_f641f620.webp",
    alt: "Two Tesla Powerwall units installed in a residential garage",
    label: "Dual battery garage installation"
  }
];
function TeslaPowerwall() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white", style: { fontFamily: "'Inter', system-ui, sans-serif" }, children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("section", { className: "relative py-28 md:py-36", style: { backgroundImage: `url(${HERO_IMG$4})`, backgroundSize: "cover", backgroundPosition: "center" }, children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#0B1D51]/45" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-7xl mx-auto px-6 text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[#FED44D] font-bold text-sm tracking-widest uppercase mb-4", children: "TESLA CERTIFIED INSTALLER" }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Tesla Powerwall 3" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl font-semibold mb-3", style: { color: "#FED44D" }, children: "Whole-Home Backup Power — Bill Savings — Tesla Certified Installation by Pell Solar" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-white/80 max-w-3xl mx-auto mb-10", children: "A compact home battery with an integrated solar inverter that delivers seamless backup protection, energy savings, and peace of mind — installed by a company you can trust." }),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: "/get-quote",
            className: "inline-block font-bold text-lg px-10 py-4 rounded-full no-underline transition-all",
            style: { background: "#FED44D", color: "#0B1D51" },
            children: "GET A FREE CONSULTATION"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto px-6", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-12 items-start", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-gray-900 mb-6", style: { fontFamily: "'Montserrat', sans-serif" }, children: "What is Tesla Powerwall 3?" }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-700 leading-relaxed mb-4", children: [
          "The Tesla Powerwall 3 is a next-generation home battery system with a",
          " ",
          /* @__PURE__ */ jsx("a", { href: "https://www.tesla.com/powerwall", target: "_blank", rel: "noopener noreferrer", className: "text-[#2BABE2] font-semibold hover:underline", children: "fully integrated solar inverter" }),
          ".",
          " ",
          "It stores solar energy produced during the day and powers your home when you need it most — during peak rate hours, grid outages, or at night."
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-700 leading-relaxed mb-4", children: [
          "Unlike previous models,",
          " ",
          /* @__PURE__ */ jsx("a", { href: "https://www.tesla.com/powerwall", target: "_blank", rel: "noopener noreferrer", className: "text-[#2BABE2] font-semibold hover:underline", children: "a single Powerwall 3 unit can back up your entire home" }),
          " ",
          "thanks to the new Tesla Smart Meter, which intelligently manages your home's electrical panel for whole-home backup protection."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed mb-4", children: "Powerwall 3 is designed for simple installation, maximum efficiency, and long-term durability — even in extreme weather conditions." }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-700 leading-relaxed mb-4", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[#2BABE2] font-semibold", children: "Already have solar?" }),
          " Powerwall 3 can be tied into any existing solar system for battery backup and peak-hour savings. Planning a new system? Its integrated inverter works seamlessly with new solar installations — giving you one streamlined, efficient setup."
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-700 leading-relaxed", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[#2BABE2] font-semibold", children: "Monitor everything from your phone." }),
          " The Tesla app gives you real-time visibility into your solar production, battery storage, home energy usage, and grid status — all from the palm of your hand."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: POWERWALL_PRODUCT_IMG,
            alt: "Tesla Powerwall 3 with Smart Meter",
            className: "w-full rounded-2xl shadow-lg",
            onError: (event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = POWERWALL_FALLBACK_IMG;
            }
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "rounded-2xl overflow-hidden shadow-lg", children: /* @__PURE__ */ jsx(
          "iframe",
          {
            width: "100%",
            height: "315",
            src: "https://www.youtube.com/embed/0mKoEBCRpJk",
            title: "Tesla Powerwall 3 | Whole-Home Backup Battery (Pell Solar)",
            frameBorder: "0",
            allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
            allowFullScreen: true,
            className: "block"
          }
        ) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-slate-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center max-w-3xl mx-auto mb-12", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[#2BABE2] font-bold text-sm tracking-widest uppercase mb-4", children: "Authentic Pell Solar work" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-gray-900 mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Real Tesla Powerwall Installations" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 leading-relaxed", children: "A look at completed residential battery installations by the Pell Solar team, from clean exterior equipment layouts to finished garage systems." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: REAL_INSTALLATION_PHOTOS.map((photo, index) => /* @__PURE__ */ jsxs(
        "figure",
        {
          className: `group overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-200 ${index === 0 ? "sm:col-span-2 lg:col-span-2" : ""}`,
          children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: photo.src,
                alt: photo.alt,
                className: `w-full object-cover transition-transform duration-500 group-hover:scale-[1.02] ${index === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`,
                loading: "lazy"
              }
            ),
            /* @__PURE__ */ jsx("figcaption", { className: "px-4 py-3 text-sm font-semibold text-gray-700", children: photo.label })
          ]
        },
        photo.src
      )) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx("div", { className: "text-center mb-14", children: /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-extrabold text-gray-900 mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: [
        "Why ",
        /* @__PURE__ */ jsx("span", { className: "text-[#2BABE2]", children: "Tesla Powerwall 3" }),
        "?"
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto", children: [
        { icon: Home$1, title: "Whole-Home Backup", desc: "A single Powerwall 3 can back up your entire home — lights, fridge, AC, Wi-Fi, garage door, and EV charger. Automatic switchover in milliseconds." },
        { icon: Zap, title: "Built-In Solar Inverter", desc: "The Powerwall 3 includes an integrated solar inverter, eliminating the need for a separate string inverter. Simpler installation, fewer components, lower cost." },
        { icon: Battery, title: "13.5 kWh Storage", desc: "Each Powerwall 3 stores 13.5 kWh of usable energy. Stack up to 4 units for 54 kWh of total storage — enough to power most homes for 24+ hours." },
        { icon: Sun, title: "Peak Hour Savings", desc: "Store solar energy during the day and discharge during expensive peak hours (4–9 PM). Essential for maximizing savings under NEM 3.0 and time-of-use rates." },
        { icon: Shield, title: "Storm Watch", desc: "When the National Weather Service issues a severe weather alert, Powerwall automatically charges to 100% from the grid to prepare for potential outages." },
        { icon: Clock, title: "25-Year Warranty", desc: "Tesla backs the Powerwall 3 with a 25-year warranty — one of the longest in the industry. That's decades of reliable backup protection." }
      ].map((card) => /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow", children: [
        /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-[#2BABE2/15] flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx(card.icon, { size: 24, className: "text-[#2BABE2]" }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900 mb-2", style: { fontFamily: "'Montserrat', sans-serif" }, children: card.title }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm leading-relaxed", children: card.desc })
      ] }, card.title)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx("div", { className: "text-center mb-14", children: /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-gray-900 mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Technical Specifications" }) }),
      /* @__PURE__ */ jsx("div", { className: "bg-white rounded-2xl border border-gray-200 overflow-hidden", children: /* @__PURE__ */ jsx("table", { className: "w-full", children: /* @__PURE__ */ jsx("tbody", { children: [
        ["Energy Capacity", "13.5 kWh usable per unit"],
        ["Continuous Power", "11.5 kW (on-grid and off-grid)"],
        ["Peak Power (Off-Grid)", "Up to 185 amps"],
        ["Integrated Inverter", "Yes — no separate inverter needed"],
        ["Stackable", "Up to 4 units (54 kWh total)"],
        ["Dimensions", '43.25" × 24" × 7.6"'],
        ["Weight", "287 lbs"],
        ["Operating Temperature", "-4°F to 122°F"],
        ["Mounting", "Floor or wall mount, indoor or outdoor"],
        ["Connectivity", "Wi-Fi, Ethernet, cellular backup"],
        ["Monitoring", "Tesla app — real-time energy flow"],
        ["Warranty", "25 years"]
      ].map(([label, value], i) => /* @__PURE__ */ jsxs("tr", { className: i % 2 === 0 ? "bg-gray-50" : "bg-white", children: [
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 font-semibold text-gray-900 text-sm w-1/3", children: label }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-gray-600 text-sm", children: value })
      ] }, label)) }) }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-14", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-gray-900 mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "NEM 3.0 Shield — Battery-Only Lease" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg max-w-2xl mx-auto", children: "Already have solar? Add a Tesla Powerwall 3 with $0 down. Avoid peak-hour charges from 4–9 PM and get 25-year battery warranty coverage." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8 max-w-3xl mx-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border border-gray-200 p-8 text-center hover:shadow-lg transition-shadow", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-900 mb-2", style: { fontFamily: "'Montserrat', sans-serif" }, children: "NEM 3.0 Shield" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm mb-4", children: "1 Powerwall · avoid peak charges · 13.5 kWh" }),
          /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsx("span", { className: "text-4xl font-black text-[#2BABE2]", children: "$142" }),
            /* @__PURE__ */ jsx("span", { className: "text-gray-500 text-lg", children: "/mo" })
          ] }),
          /* @__PURE__ */ jsx("ul", { className: "text-left space-y-2 mb-8", children: ["1 Tesla Powerwall 3 (13.5 kWh)", "1 Tesla Smart Meter", "Peak-hour grid protection (4–9pm)", "25-Year Battery Warranty", "Professional Installation", "Permitting and Inspections", "24/7 Monitoring via Tesla App"].map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-sm text-gray-700", children: [
            /* @__PURE__ */ jsx(CheckCircle, { size: 16, className: "text-[#2BABE2] mt-0.5 flex-shrink-0" }),
            " ",
            item
          ] }, i)) }),
          /* @__PURE__ */ jsx(Link, { href: "/get-quote", className: "w-full block text-center font-bold py-3 rounded-full no-underline transition-all", style: { background: "#2BABE2", color: "white" }, children: "Get Started" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border-2 border-[#2BABE2] p-8 text-center hover:shadow-lg transition-shadow relative", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2BABE2] text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full", children: "Best Value" }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-900 mb-2", style: { fontFamily: "'Montserrat', sans-serif" }, children: "NEM 3.0 Shield+" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm mb-4", children: "2 Powerwalls · extended coverage · 27 kWh" }),
          /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsx("span", { className: "text-4xl font-black text-[#2BABE2]", children: "$208" }),
            /* @__PURE__ */ jsx("span", { className: "text-gray-500 text-lg", children: "/mo" })
          ] }),
          /* @__PURE__ */ jsx("ul", { className: "text-left space-y-2 mb-8", children: ["2 Tesla Powerwall 3 (27 kWh total)", "1 Tesla Smart Meter", "Peak-hour grid protection (4–9pm)", "25-Year Battery Warranty", "Professional Installation", "Permitting and Inspections", "24/7 Monitoring via Tesla App"].map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-sm text-gray-700", children: [
            /* @__PURE__ */ jsx(CheckCircle, { size: 16, className: "text-[#2BABE2] mt-0.5 flex-shrink-0" }),
            " ",
            item
          ] }, i)) }),
          /* @__PURE__ */ jsx(Link, { href: "/get-quote", className: "w-full block text-center font-bold py-3 rounded-full no-underline transition-all", style: { background: "#2BABE2", color: "white" }, children: "Get Started" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-[#0B1D51]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx("div", { className: "text-center mb-14", children: /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-white mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "How Powerwall Works With Solar" }) }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-8 max-w-4xl mx-auto", children: [
        { time: "Daytime", icon: Sun, desc: "Solar panels generate electricity. Powerwall charges first, then your home uses the rest. Any surplus goes to the grid.", color: "text-yellow-400" },
        { time: "Peak Hours (4–9 PM)", icon: Battery, desc: "Powerwall discharges stored energy to power your home during the most expensive rate period. You avoid paying Edison's peak prices.", color: "text-[#2BABE2]" },
        { time: "Outage", icon: AlertCircle, desc: "Grid goes down? Powerwall instantly takes over. Your lights stay on, your fridge keeps running, and your Wi-Fi stays connected.", color: "text-red-400" }
      ].map((card) => /* @__PURE__ */ jsxs("div", { className: "bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/10", children: [
        /* @__PURE__ */ jsx(card.icon, { size: 36, className: `${card.color} mx-auto mb-4` }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-2", children: card.time }),
        /* @__PURE__ */ jsx("p", { className: "text-white/70 text-sm leading-relaxed", children: card.desc })
      ] }, card.time)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx("div", { className: "text-center mb-14", children: /* @__PURE__ */ jsx("h2", { className: "text-3xl font-extrabold text-gray-900 mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Frequently Asked Questions" }) }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [
        { q: "Can I add a Powerwall to my existing solar system?", a: "Yes. We install Powerwalls on both new and existing solar systems. If your system uses string inverters, the Powerwall 3's built-in inverter can replace it." },
        { q: "How long can a Powerwall power my home?", a: "A single Powerwall 3 (13.5 kWh) can power most homes for 8–12 hours depending on usage. Two Powerwalls can last 24+ hours. With solar recharging during the day, you can potentially stay off-grid indefinitely." },
        { q: "Does the Powerwall work during a power outage?", a: "Yes — that's one of its primary functions. When the grid goes down, Powerwall automatically disconnects from the grid and powers your home within milliseconds." },
        { q: "What's the warranty?", a: "Tesla offers a 25-year warranty on the Powerwall 3, covering both the battery and the integrated inverter." },
        { q: "Can I monitor my Powerwall remotely?", a: "Yes. The Tesla app shows real-time energy flow — solar production, battery charge level, home consumption, and grid import/export. You can also control backup reserve levels and Storm Watch settings." }
      ].map((faq, i) => /* @__PURE__ */ jsxs("details", { className: "group bg-gray-50 rounded-xl border border-gray-200", children: [
        /* @__PURE__ */ jsxs("summary", { className: "cursor-pointer px-6 py-4 font-semibold text-gray-900 flex items-center justify-between", children: [
          faq.q,
          /* @__PURE__ */ jsx("span", { className: "text-gray-400 group-open:rotate-180 transition-transform", children: "▼" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "px-6 pb-4 text-gray-600 text-sm leading-relaxed", children: faq.a })
      ] }, i)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-[#0B1D51]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-white mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Ready to Add a Tesla Powerwall?" }),
      /* @__PURE__ */ jsx("p", { className: "text-white/70 text-lg mb-8 max-w-2xl mx-auto", children: "Free consultation. We'll assess your home, design the right battery setup, and show you exactly how much you'll save." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [
        /* @__PURE__ */ jsx(Link, { href: "/get-quote", className: "btn-gold text-lg px-10 py-4", children: "Get Your Free Quote" }),
        /* @__PURE__ */ jsxs("a", { href: "tel:8666468499", className: "text-white font-bold text-lg flex items-center gap-2 no-underline hover:text-[#FED44D] transition-colors", children: [
          /* @__PURE__ */ jsx(Phone, { size: 18, className: "text-[#FED44D]" }),
          " (866) 646-8499"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const HERO_BG$2 = "/manus-storage/battery-backup-hero_65613e04.webp";
const TESLA_INSTALL_IMG = "/manus-storage/dual-powerwall3_c88ab182.png";
const YOUTUBE_VIDEO_ID = "yzb6ols_ffE";
function BatteryBackup() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white", style: { fontFamily: "'Inter', system-ui, sans-serif" }, children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("section", { className: "relative py-28 md:py-36 flex items-center justify-center", style: { backgroundImage: `url(${HERO_BG$2})`, backgroundSize: "cover", backgroundPosition: "center" }, children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#0B1D51]/50" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 text-center px-4 max-w-4xl mx-auto", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Home Battery Backup Systems" }),
        /* @__PURE__ */ jsx("p", { className: "text-[#FED44D] text-lg md:text-xl font-semibold mb-6", children: "Whole-Home Backup Power — Bill Savings — Tesla Certified Installation by Pell Solar" }),
        /* @__PURE__ */ jsx("p", { className: "text-white/90 text-base md:text-lg max-w-2xl mx-auto mb-8", children: "A compact home battery with an integrated solar inverter that delivers seamless backup protection, energy savings, and peace of mind — installed by a company you can trust." }),
        /* @__PURE__ */ jsx(Link, { href: "/get-quote", children: /* @__PURE__ */ jsx("span", { className: "inline-block bg-[#FED44D] text-[#0B1D51] font-extrabold py-4 px-10 rounded-full text-base uppercase tracking-wide cursor-pointer hover:bg-[#f5c800] transition-colors", children: "Get a Free Consultation" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-16 md:py-20", children: /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto px-6", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-12 items-start", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsx("img", { src: TESLA_INSTALL_IMG, alt: "Tesla Powerwall installation", className: "rounded-xl shadow-lg w-full" }),
        /* @__PURE__ */ jsx("div", { className: "aspect-video rounded-xl overflow-hidden shadow-lg", children: /* @__PURE__ */ jsx(
          "iframe",
          {
            src: `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`,
            title: "Tesla Powerwall 3 | Whole-Home Backup Battery (Pell Solar)",
            allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
            allowFullScreen: true,
            className: "w-full h-full"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-[#0B1D51] mb-6", style: { fontFamily: "'Montserrat', sans-serif" }, children: "What is Tesla Powerwall 3?" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-lg leading-relaxed mb-4", children: "The Tesla Powerwall 3 is a next-generation home battery system with a fully integrated solar inverter. It stores solar energy produced during the day and powers your home when you need it most — during peak rate hours, grid outages, or at night." }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-lg leading-relaxed mb-4", children: "Unlike previous models, a single Powerwall 3 unit can back up your entire home thanks to the new Tesla Smart Meter, which intelligently manages your home's electrical panel for whole-home backup protection." }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-lg leading-relaxed mb-4", children: "Powerwall 3 is designed for simple installation, maximum efficiency, and long-term durability — even in extreme weather conditions." }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-lg leading-relaxed mb-4", children: "Already have solar? Powerwall 3 can be tied into any existing solar system for battery backup and peak-hour savings. Planning a new system? Its integrated inverter works seamlessly with new solar installations — giving you one streamlined, efficient setup." }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-lg leading-relaxed", children: "Monitor everything from your phone. The Tesla app gives you real-time visibility into your solar production, battery storage, home energy usage, and grid status — all from the palm of your hand." })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 md:py-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-[#0B1D51] text-center mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "How Powerwall 3 Saves You Money" }),
      /* @__PURE__ */ jsxs("p", { className: "text-center text-gray-600 text-lg max-w-3xl mx-auto mb-12", children: [
        "If you are on Southern California Edison's NEM 3.0 rate plan, the most expensive electricity rates hit between",
        " ",
        /* @__PURE__ */ jsx("span", { className: "text-[#2BABE2] font-semibold", children: "4:00 PM and 9:00 PM" }),
        ". Here is how Powerwall changes that:"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow", children: [
          /* @__PURE__ */ jsx("div", { className: "w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-[#e8f4fd] rounded-full", children: /* @__PURE__ */ jsx("span", { className: "text-4xl", children: "🔋" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-[#0B1D51] mb-3", children: "Charge During the Day" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 leading-relaxed", children: "Your solar panels generate energy during daylight hours. Powerwall 3 stores that excess energy instead of sending it back to the grid at low credit rates." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow", children: [
          /* @__PURE__ */ jsx("div", { className: "w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-[#e8f4fd] rounded-full", children: /* @__PURE__ */ jsx("span", { className: "text-4xl", children: "⚡" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-[#0B1D51] mb-3", children: "Discharge 4PM — 9PM" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 leading-relaxed", children: "We program your Powerwall 3 to discharge between 4:00 PM and 9:00 PM — the peak rate window under NEM 3.0. Your home runs off stored battery power instead of expensive grid electricity." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow", children: [
          /* @__PURE__ */ jsx("div", { className: "w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-[#e8f4fd] rounded-full", children: /* @__PURE__ */ jsx("span", { className: "text-4xl", children: "🏠" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-[#0B1D51] mb-3", children: "Whole-Home Backup" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 leading-relaxed", children: "With the Tesla Smart Meter, your existing electrical panel becomes a whole-home backup system. When the grid goes down, Powerwall kicks in instantly — no delay, no interruption." })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 md:py-20 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-[#0B1D51] text-center mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Battery Financing Options" }),
      /* @__PURE__ */ jsx("p", { className: "text-center text-gray-600 text-lg mb-12", children: "Add Tesla Powerwall 3 battery storage to your home — with affordable monthly financing over a 12-year lease." }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border-2 border-[#2BABE2] shadow-lg p-8", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-extrabold text-[#0B1D51] text-center mb-1", style: { fontFamily: "'Montserrat', sans-serif" }, children: "1 Tesla Powerwall 3" }),
          /* @__PURE__ */ jsx("p", { className: "text-center text-gray-500 mb-6", children: "Battery Only (No Solar)" }),
          /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
            /* @__PURE__ */ jsx("span", { className: "text-6xl font-extrabold text-[#2BABE2]", children: "$142" }),
            /* @__PURE__ */ jsx("span", { className: "text-gray-500 text-lg", children: " per month*" })
          ] }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-3 mb-8", children: [
            "1 Tesla Powerwall 3 Battery",
            "Tesla Smart Meter Included",
            "12-Year Lease Term",
            "12-Year Warranty (2 Years Beyond Tesla Standard)",
            "Whole-Home Backup Protection",
            "4PM–9PM Peak Discharge Programming",
            "Professional Installation by Pell Solar"
          ].map((item) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-gray-700", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-[#2BABE2] shrink-0 mt-0.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
            item
          ] }, item)) }),
          /* @__PURE__ */ jsx(Link, { href: "/get-quote", children: /* @__PURE__ */ jsx("span", { className: "block text-center bg-[#2BABE2] hover:bg-[#1e96cc] text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors cursor-pointer", children: "Get Started" }) }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mt-4 text-center", children: "*Based on battery located within 20 ft of main electrical panel. Final pricing based on site visit. Additional batteries can be added." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-8", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-extrabold text-[#0B1D51] text-center mb-1", style: { fontFamily: "'Montserrat', sans-serif" }, children: "2 Tesla Powerwall 3" }),
          /* @__PURE__ */ jsx("p", { className: "text-center text-gray-500 mb-6", children: "Battery Only (No Solar)" }),
          /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
            /* @__PURE__ */ jsx("span", { className: "text-6xl font-extrabold text-[#2BABE2]", children: "$208" }),
            /* @__PURE__ */ jsx("span", { className: "text-gray-500 text-lg", children: " per month*" })
          ] }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-3 mb-8", children: [
            "2 Tesla Powerwall 3 Batteries",
            "Tesla Smart Meter Included",
            "12-Year Lease Term",
            "12-Year Warranty (2 Years Beyond Tesla Standard)",
            "Extended Whole-Home Backup",
            "4PM–9PM Peak Discharge Programming",
            "Professional Installation by Pell Solar"
          ].map((item) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-gray-700", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-[#2BABE2] shrink-0 mt-0.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
            item
          ] }, item)) }),
          /* @__PURE__ */ jsx(Link, { href: "/get-quote", children: /* @__PURE__ */ jsx("span", { className: "block text-center bg-[#2BABE2] hover:bg-[#1e96cc] text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors cursor-pointer", children: "Get Started" }) }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mt-4 text-center", children: "*Based on batteries located within 20 ft of main electrical panel. Final pricing based on site visit. Additional batteries can be added." })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 md:py-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-[#0B1D51] text-center mb-12", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Why Choose Tesla Powerwall 3?" }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6", children: [
        { icon: "⚙️", title: "Integrated Solar Inverter", desc: "Fully integrated design means fewer components, less wiring, higher efficiency, and a cleaner installation." },
        { icon: "🏠", title: "One Unit Powers One Home", desc: "A single Powerwall 3 has the storage capacity and efficiency to provide backup power for your entire home." },
        { icon: "🌡️", title: "Built for Extreme Weather", desc: "Engineered to perform at high elevations, in extreme temperatures, high humidity, and even up to 28 inches of standing water." },
        { icon: "📊", title: "Tesla Smart Meter", desc: "Converts your existing electrical panel into a whole-home backup system with intelligent energy monitoring and management." },
        { icon: "⚡", title: "Seamless Transition", desc: "When the grid goes down, Powerwall begins powering your home instantly — while other batteries experience a 2–5 second delay." },
        { icon: "➕", title: "Easy System Expansion", desc: "Start with one unit and easily stack up to 10 Powerwalls as your household energy needs grow over time." },
        { icon: "📱", title: "Tesla App Monitoring", desc: "Monitor your solar production, battery charge level, home energy usage, and grid status in real time — all from the Tesla app." },
        { icon: "☀️", title: "Works With Any Solar System", desc: "Powerwall 3 can be added to any existing solar installation or paired with new solar panels using its built-in integrated inverter." }
      ].map((feature) => /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow", children: [
        /* @__PURE__ */ jsx("div", { className: "text-4xl mb-4", children: feature.icon }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-[#0B1D51] mb-2", children: feature.title }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm leading-relaxed", children: feature.desc })
      ] }, feature.title)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 md:py-20 bg-[#0B1D51]", children: /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto px-6", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-12 items-start", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-white mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Get Paid to Power the Grid with Tesla Powerwall" }),
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-[#2BABE2] mb-8", children: "How It Works" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-6 mb-8", children: [
          { n: 1, title: "Install a Powerwall", desc: "Pell Solar can install it with your solar system or as a standalone battery." },
          { n: 2, title: "Enroll in the Program", desc: "After installation, sign up directly in your Tesla app." },
          { n: 3, title: "Share Energy Automatically", desc: "From May through October, your Powerwall will discharge excess power during times of high demand." },
          { n: 4, title: "Get Rewarded", desc: "Earn up to $350 per year for every Powerwall enrolled." }
        ].map((step) => /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-[#2BABE2] text-white font-bold flex items-center justify-center shrink-0 text-lg", children: step.n }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "text-white font-semibold text-lg", children: step.title }),
            /* @__PURE__ */ jsx("p", { className: "text-white/80", children: step.desc })
          ] })
        ] }, step.n)) }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white/10 rounded-xl p-6 mb-8", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-white font-semibold mb-3", children: "Eligibility" }),
          /* @__PURE__ */ jsxs("ul", { className: "text-white/80 space-y-2", children: [
            /* @__PURE__ */ jsx("li", { children: "• Must be a California resident in PG&E, SCE, or SDG&E service territory." }),
            /* @__PURE__ */ jsx("li", { children: "• Cannot be enrolled in a conflicting demand response program." })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[#2BABE2] mt-4 font-medium italic", children: "Tip: Enroll before the start of a month to maximize your summer earnings." })
        ] }),
        /* @__PURE__ */ jsx(Link, { href: "/get-quote", children: /* @__PURE__ */ jsx("span", { className: "inline-block bg-[#2BABE2] hover:bg-[#1e96cc] text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors cursor-pointer", children: "Get A Quote" }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "hidden md:flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "bg-white/10 rounded-2xl p-10 text-center border border-white/10", children: [
        /* @__PURE__ */ jsx("div", { className: "text-7xl mb-4", children: "💰" }),
        /* @__PURE__ */ jsx("p", { className: "text-white text-3xl font-extrabold mb-2", children: "Up to $350/year" }),
        /* @__PURE__ */ jsx("p", { className: "text-white/60 text-lg", children: "per Powerwall enrolled" })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 md:py-20 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-6 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-[#0B1D51] mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Ready to Power Your Home with Powerwall?" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 mb-8", children: "As a Tesla Certified Installer, Pell Solar supports your project from design and permitting through installation and activation." }),
      /* @__PURE__ */ jsx(Link, { href: "/get-quote", children: /* @__PURE__ */ jsx("span", { className: "inline-block bg-[#FED44D] text-[#0B1D51] font-extrabold py-4 px-10 rounded-full text-base uppercase tracking-wide cursor-pointer hover:bg-[#f5c800] transition-colors", children: "Get Your Free Consultation" }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 md:py-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-[#0B1D51] text-center mb-12", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Our Service Locations" }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-[#0B1D51] mb-3", children: "Upland, California" }),
          /* @__PURE__ */ jsx("a", { href: "tel:8666468499", className: "text-[#2BABE2] text-xl font-semibold hover:underline", children: "(866) 646-8499" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-[#0B1D51] mb-3", children: "Eagle, Idaho" }),
          /* @__PURE__ */ jsx("a", { href: "tel:2085031416", className: "text-[#2BABE2] text-xl font-semibold hover:underline", children: "(208) 503-1416" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const HERO_BG$1 = "/manus-storage/ev-charger-garage-hero_66105331.jpg";
const SOLAR_PAIR_BG = "/manus-storage/ev-charge-sleep_f7448f5b.jpg";
const BENEFIT_PHOTOS = [
  { img: "/manus-storage/ev-faster-charging_b8528895.jpg", title: "Up to 7x Faster Charging", desc: "A Level 2 charger delivers 25–40 miles of range per hour — a full charge overnight instead of over the weekend." },
  { img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663592920644/UzNUyTd222pkxN2KfqQwdX/ev-charge-sleep-eh6DiDw5o3E4cJEV6Wp7cH.webp", title: "Charge While You Sleep", desc: "Plug in when you get home, wake up fully charged. No trips to public charging stations, no waiting around." },
  { img: "/manus-storage/ev-solar-pairing_ae3c4f3e.jpg", title: "Pair with Solar and Save", desc: "Charge your EV with energy from your solar panels and cut your fuel costs to nearly zero." }
];
const HOW_IT_WORKS = [
  { num: 1, icon: "📞", bg: "#0B1D51", title: "Contact Us", desc: "Fill out the form below or give us a call. Tell us what charger you have or want and we will take it from there." },
  { num: 2, icon: "📋", bg: "#1a3a6b", title: "Site Evaluation", desc: "We assess your electrical panel, garage layout, and wiring to determine the best installation plan and provide a quote." },
  { num: 3, icon: "🔧", bg: "#2BABE2", title: "Professional Install", desc: "Our licensed electricians handle everything — wiring, mounting, panel upgrades if needed — done right, done to code." },
  { num: 4, icon: "⚡", bg: "#FED44D", title: "Start Charging", desc: "Plug in and go. We test everything before we leave and walk you through how your new charger works." }
];
function EVCharging() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white", style: { fontFamily: "'Inter', system-ui, sans-serif" }, children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("section", { className: "relative py-28 md:py-36", style: { backgroundImage: `url(${HERO_BG$1})`, backgroundSize: "cover", backgroundPosition: "center" }, children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#0B1D51]/45" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-4xl mx-auto px-6 text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[#2BABE2] font-semibold text-sm uppercase tracking-wider mb-3", children: "PELL SOLAR — EV CHARGER INSTALLATION" }),
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6", style: { fontFamily: "'Montserrat', sans-serif" }, children: [
          "We Install ",
          /* @__PURE__ */ jsx("span", { style: { color: "#FED44D" }, children: "Any EV Charger" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-white/80 max-w-3xl mx-auto mb-8", children: "Tesla, ChargePoint, Emporia, Wallbox — you name it, we install it. Pell Solar handles everything from site evaluation to professional installation so you can charge at home with confidence." }),
        /* @__PURE__ */ jsx(Link, { href: "/get-quote", children: /* @__PURE__ */ jsx("span", { className: "inline-block bg-[#2BABE2] hover:bg-[#1e96cc] text-white font-bold py-4 px-10 rounded-lg text-lg transition-colors cursor-pointer", children: "GET A FREE SITE EVALUATION" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-16 md:py-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-[#0B1D51] text-center mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Why Install a Home EV Charger?" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg text-center max-w-3xl mx-auto mb-12", children: "Skip the public charging stations. Charge overnight in your own garage and wake up to a full battery every morning." }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-8", children: BENEFIT_PHOTOS.map((card) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow", children: [
        /* @__PURE__ */ jsx("img", { src: card.img, alt: card.title, className: "w-full h-52 object-cover" }),
        /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-[#0B1D51] mb-3", style: { fontFamily: "'Montserrat', sans-serif" }, children: card.title }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 leading-relaxed", children: card.desc })
        ] })
      ] }, card.title)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 md:py-20 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-[#0B1D51] text-center mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Brands We Install" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg text-center max-w-3xl mx-auto mb-12", children: "We are brand-neutral. Whatever charger you want, we will install it professionally and to code." }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-4", children: [
        "Tesla Wall Connector",
        "ChargePoint Home Flex",
        "Emporia",
        "Wallbox Pulsar Plus",
        "Grizzl-E",
        "EVIQO",
        "Enphase (ClipperCreek)",
        "Electrify Home",
        "Lectron",
        "Blink",
        "JuiceBox (Enel X)",
        "Siemens",
        "Leviton",
        "Eaton",
        "+ Any Other Brand"
      ].map((brand) => /* @__PURE__ */ jsx("span", { className: "bg-white border border-gray-200 rounded-lg px-5 py-3 text-[#0B1D51] font-semibold text-sm shadow-sm", children: brand }, brand)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 md:py-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-[#0B1D51] text-center mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Level 1 vs Level 2 Charging" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg text-center max-w-3xl mx-auto mb-12", children: "Most EV owners upgrade to Level 2 for the speed and convenience. Here is the difference." }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8 max-w-4xl mx-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-gray-200 p-8", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-[#0B1D51] mb-2", style: { fontFamily: "'Montserrat', sans-serif" }, children: "LEVEL 1" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 font-medium mb-1", children: "Standard Outlet" }),
          /* @__PURE__ */ jsx("p", { className: "text-2xl font-extrabold text-gray-900 mb-6", children: "3–5 mi/hr" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-gray-700", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[#2BABE2] mt-0.5", children: "✓" }),
              " Uses a standard 120V household outlet"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[#2BABE2] mt-0.5", children: "✓" }),
              " No installation required"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[#2BABE2] mt-0.5", children: "✓" }),
              " Best for plug-in hybrids or low daily mileage"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[#2BABE2] mt-0.5", children: "✓" }),
              " Full charge can take 2–3 days"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-[#0B1D51] rounded-xl p-8 text-white", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", style: { fontFamily: "'Montserrat', sans-serif" }, children: "LEVEL 2" }),
            /* @__PURE__ */ jsx("span", { className: "bg-[#2BABE2] text-white text-xs font-bold px-2 py-1 rounded", children: "RECOMMENDED" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-white/70 font-medium mb-1", children: "Dedicated 240V Circuit" }),
          /* @__PURE__ */ jsx("p", { className: "text-2xl font-extrabold mb-6", children: "25–40 mi/hr" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-white/90", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[#2BABE2] mt-0.5", children: "✓" }),
              " Uses a 240V circuit (like a dryer outlet)"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[#2BABE2] mt-0.5", children: "✓" }),
              " Professional installation required"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[#2BABE2] mt-0.5", children: "✓" }),
              " Full charge overnight (6–10 hours)"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[#2BABE2] mt-0.5", children: "✓" }),
              " Smart features: scheduling, energy monitoring"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[#2BABE2] mt-0.5", children: "✓" }),
              " Works with all EV brands"
            ] })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 md:py-20 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-[#0B1D51] text-center mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "How It Works" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg text-center max-w-3xl mx-auto mb-12", children: "From first call to first charge — we handle everything." }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-4 gap-8", children: HOW_IT_WORKS.map((step) => /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative mb-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-full h-40 rounded-xl flex items-center justify-center", style: { background: step.bg }, children: /* @__PURE__ */ jsx("span", { style: { fontSize: "4rem" }, children: step.icon }) }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-3 left-3 w-9 h-9 rounded-full bg-[#2BABE2] text-white font-bold flex items-center justify-center text-base", children: step.num })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-[#0B1D51] mb-2", style: { fontFamily: "'Montserrat', sans-serif" }, children: step.title }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm leading-relaxed", children: step.desc })
      ] }, step.num)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "relative py-20 md:py-28", style: { backgroundImage: `linear-gradient(rgba(26,26,46,0.3), rgba(26,26,46,0.4)), url(${SOLAR_PAIR_BG})`, backgroundSize: "cover", backgroundPosition: "center" }, children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-white mb-6", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Already Have Solar? Charge for Free." }),
      /* @__PURE__ */ jsx("p", { className: "text-white/90 text-lg leading-relaxed mb-4", children: "When you pair a home EV charger with your solar panel system, the sun powers your car. No gas station, no electricity bill — just clean energy from your roof to your wheels." }),
      /* @__PURE__ */ jsx("p", { className: "text-white/80 text-lg leading-relaxed mb-8", children: "If you do not have solar yet, ask us about bundling solar + EV charger installation for the best value." }),
      /* @__PURE__ */ jsx(Link, { href: "/get-quote", children: /* @__PURE__ */ jsx("span", { className: "inline-block font-bold py-3 px-8 rounded-lg text-lg transition-colors cursor-pointer", style: { background: "#FED44D", color: "#0B1D51" }, children: "Get a Free Quote" }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 md:py-20 bg-[#0B1D51]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-6 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-white mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Let's Talk About Your EV Charger" }),
      /* @__PURE__ */ jsx("p", { className: "text-white/80 text-lg mb-8", children: "Whether you already have a charger picked out or need help choosing one, we will reach out to schedule your free site evaluation. No pressure, no jargon." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
        /* @__PURE__ */ jsx(Link, { href: "/get-quote", children: /* @__PURE__ */ jsx("span", { className: "inline-block bg-[#2BABE2] hover:bg-[#1e96cc] text-white font-bold py-4 px-10 rounded-lg text-lg transition-colors cursor-pointer", children: "Get Your Free Quote" }) }),
        /* @__PURE__ */ jsx("a", { href: "tel:8666468499", className: "inline-block border-2 border-white text-white hover:bg-white hover:text-[#0B1D51] font-bold py-4 px-10 rounded-lg text-lg transition-colors text-center no-underline", children: "(866) 646-8499" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const HERO_BG = "/manus-storage/solar-home-main-v2_0ad97127.jpg";
function SavingsBarChart() {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
    /* @__PURE__ */ jsxs("p", { className: "text-[#0B1D51] font-extrabold text-xl md:text-2xl text-center mb-6 uppercase tracking-wide leading-tight", style: { fontFamily: "'Montserrat', sans-serif" }, children: [
      "Lower Your Monthly Bill",
      /* @__PURE__ */ jsx("br", {}),
      "With a Solar Lease"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative flex items-end gap-0 w-full max-w-sm mx-auto", style: { height: 280 }, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between absolute left-0 top-0 bottom-0 text-xs text-gray-400 font-semibold pr-2", style: { width: 44 }, children: [
        /* @__PURE__ */ jsx("span", { children: "$500" }),
        /* @__PURE__ */ jsx("span", { children: "$400" }),
        /* @__PURE__ */ jsx("span", { children: "$300" }),
        /* @__PURE__ */ jsx("span", { children: "$200" }),
        /* @__PURE__ */ jsx("span", { children: "$100" }),
        /* @__PURE__ */ jsx("span", { children: "$0" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-end gap-4 ml-12 flex-1 h-full", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center flex-1", children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "w-full rounded-t-lg flex flex-col items-center justify-start pt-3 relative",
              style: { height: "100%", background: "linear-gradient(180deg, #2563eb 0%, #1d4ed8 100%)" },
              children: [
                /* @__PURE__ */ jsx("span", { className: "text-white font-extrabold text-2xl", style: { fontFamily: "'Montserrat', sans-serif" }, children: "$500" }),
                /* @__PURE__ */ jsx("span", { className: "text-white font-bold text-base", children: "/mo" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "mt-2 text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[#0B1D51] font-bold text-xs uppercase tracking-wide", children: "Before" }),
            /* @__PURE__ */ jsx("p", { className: "text-[#0B1D51] font-bold text-xs uppercase tracking-wide", children: "Solar" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center self-center z-10 -mx-2", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-[#22c55e] rounded-full p-2 mb-1", children: /* @__PURE__ */ jsx("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ jsx("path", { d: "M5 13l4 4L19 7", stroke: "white", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "bg-[#FED44D] rounded-xl px-3 py-2 text-center shadow-lg", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[#0B1D51] font-extrabold text-sm leading-tight", children: "SAVE" }),
            /* @__PURE__ */ jsx("p", { className: "text-[#0B1D51] font-extrabold text-xl leading-tight", children: "$230" }),
            /* @__PURE__ */ jsx("p", { className: "text-[#0B1D51] font-bold text-xs leading-tight", children: "EVERY" }),
            /* @__PURE__ */ jsx("p", { className: "text-[#0B1D51] font-bold text-xs leading-tight", children: "MONTH!" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-1 bg-[#0B1D51] text-white text-[9px] font-bold px-2 py-1 rounded text-center leading-tight max-w-[80px]", children: [
            "FIXED MONTHLY",
            /* @__PURE__ */ jsx("br", {}),
            "SOLAR LEASE",
            /* @__PURE__ */ jsx("br", {}),
            "PAYMENT"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center flex-1", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-1" }),
          " ",
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "w-full rounded-t-lg flex flex-col items-center justify-start pt-3",
              style: { height: "54%", background: "linear-gradient(180deg, #22c55e 0%, #16a34a 100%)" },
              children: [
                /* @__PURE__ */ jsx("span", { className: "text-white font-extrabold text-2xl", style: { fontFamily: "'Montserrat', sans-serif" }, children: "$270" }),
                /* @__PURE__ */ jsx("span", { className: "text-white font-bold text-base", children: "/mo" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "mt-2 text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[#0B1D51] font-bold text-xs uppercase tracking-wide", children: "New" }),
            /* @__PURE__ */ jsx("p", { className: "text-[#0B1D51] font-bold text-xs uppercase tracking-wide", children: "Solar" })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function Financing() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", bill: "", address: "", city: "", state: "", zip: "" });
  const [submitted, setSubmitted] = useState(false);
  const submitToCrm = trpc.crm.submitLead.useMutation();
  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const utmData = {
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_content: params.get("utm_content") || "",
      utm_term: params.get("utm_term") || "",
      gclid: params.get("gclid") || ""
    };
    submitToCrm.mutate({
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.email,
      phone: form.phone,
      address: form.address,
      city: form.city,
      state: form.state,
      zip: form.zip,
      type: "new_lead",
      source: "website-financing",
      notes: form.bill ? `Monthly bill: ${form.bill}` : "",
      utm_data: utmData,
      _hp: ""
      // honeypot — always empty for real users
    }, {
      onSuccess: () => setSubmitted(true),
      onError: () => {
        setSubmitted(true);
        toast.error("Note: There was an issue sending your info. Please call us at (866) 646-8499.");
      }
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white", style: { fontFamily: "'Inter', system-ui, sans-serif" }, children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs(
      "section",
      {
        className: "relative py-28 md:py-40",
        style: { backgroundImage: `url(${HERO_BG})`, backgroundSize: "cover", backgroundPosition: "center" },
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#0B1D51]/55" }),
          /* @__PURE__ */ jsx("div", { className: "relative z-10 max-w-4xl mx-auto px-6 text-center", children: /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: [
            "A ",
            /* @__PURE__ */ jsx("span", { className: "text-[#FED44D]", children: "better" }),
            " way to pay for solar."
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsx("section", { className: "py-16 md:py-20 bg-white", children: /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto px-6", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-gray-50 rounded-2xl p-8 shadow-sm", children: /* @__PURE__ */ jsx(SavingsBarChart, {}) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-[#0B1D51] mb-6", style: { fontFamily: "'Montserrat', sans-serif" }, children: "How solar can help you save" }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-700 leading-relaxed mb-6", children: [
          "A PellSolAr solar lease replaces your electric bill with a ",
          /* @__PURE__ */ jsx("strong", { children: "lower, predictable monthly payment" }),
          ". With ",
          /* @__PURE__ */ jsx("strong", { children: "zero down" }),
          " and ",
          /* @__PURE__ */ jsx("strong", { children: "25-year coverage on the entire system—including the battery" }),
          ", maintenance and repairs are included so there are no surprise costs."
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: [
          "Lower monthly cost vs. utility bill",
          "Zero down",
          "Fixed, predictable payment",
          "25-year system warranty",
          "25-year battery coverage (huge differentiator)",
          "No maintenance or repair risk"
        ].map((item) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[#22c55e] font-bold text-lg mt-0.5", children: "✔" }),
          /* @__PURE__ */ jsx("span", { className: "text-gray-800 font-medium", children: item })
        ] }, item)) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 md:py-20 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-extrabold text-gray-900 mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: [
          "Own Your System — ",
          /* @__PURE__ */ jsx("span", { className: "text-[#2BABE2]", children: "Two Ways to Buy" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg max-w-2xl mx-auto", children: "Both options put you in full ownership of your solar system from day one." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border border-gray-200 p-8 shadow-sm", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-extrabold text-gray-900 mb-1", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Financing" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm mb-6", children: "Flexible loan terms and rates" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed mb-6", children: "For homeowners who want to own their solar system, we offer financing with competitive fixed rates and flexible terms. You own the equipment from day one, and every payment builds equity in your home." }),
          /* @__PURE__ */ jsx("div", { className: "space-y-0 mb-6", children: [
            { label: "Upfront Cost", value: "$0 Down" },
            { label: "APR", value: "As low as 4.99%" },
            { label: "Terms Available", value: "12, 15, or 20 years" },
            { label: "Min. Credit Score", value: "650" },
            { label: "Ownership", value: "You own it" },
            { label: "Prepayment Penalty", value: "None" }
          ].map((row) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-3 border-b border-gray-100 last:border-0", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-500 text-sm", children: row.label }),
            /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-900 text-sm", children: row.value })
          ] }, row.label)) }),
          /* @__PURE__ */ jsxs("div", { className: "bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "text-yellow-500 text-lg flex-shrink-0", children: "⚠️" }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-700 text-sm leading-relaxed", children: [
              /* @__PURE__ */ jsx("strong", { children: "Important:" }),
              " The 30% federal tax credit is no longer available for financed purchases as of December 30, 2025. Your total cost will be the full system price plus interest."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border border-gray-200 p-8 shadow-sm", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-extrabold text-gray-900 mb-1", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Cash Purchase" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm mb-6", children: "Outright ownership, no monthly payments" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed mb-6", children: "Paying cash means no monthly payments and no interest. You own everything outright and benefit from reduced electric bills for the life of the system. This is the simplest option if upfront cost isn't a concern." }),
          /* @__PURE__ */ jsx("div", { className: "space-y-0 mb-6", children: [
            { label: "Upfront Cost", value: "Full system price" },
            { label: "Monthly Payment", value: "None" },
            { label: "Ownership", value: "You own it" },
            { label: "Warranty", value: "Manufacturer standard" },
            { label: "Battery Warranty", value: "10 years (manufacturer)" },
            { label: "Maintenance", value: "Homeowner responsibility" }
          ].map((row) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-3 border-b border-gray-100 last:border-0", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-500 text-sm", children: row.label }),
            /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-900 text-sm", children: row.value })
          ] }, row.label)) }),
          /* @__PURE__ */ jsxs("div", { className: "bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "text-yellow-500 text-lg flex-shrink-0", children: "⚠️" }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-700 text-sm leading-relaxed", children: [
              /* @__PURE__ */ jsx("strong", { children: "Important:" }),
              " The 30% federal tax credit is no longer available for cash purchases as of December 30, 2025. The price you pay is the full system cost without any federal incentive."
            ] })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "relative py-16 md:py-20 bg-[#0B1D51] overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 pointer-events-none", "aria-hidden": "true", children: /* @__PURE__ */ jsxs("svg", { className: "absolute inset-0 w-full h-full", viewBox: "0 0 1200 600", preserveAspectRatio: "xMidYMid slice", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
        /* @__PURE__ */ jsxs("defs", { children: [
          /* @__PURE__ */ jsxs("radialGradient", { id: "sunGlow", cx: "80%", cy: "20%", r: "40%", children: [
            /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#FED44D", stopOpacity: "0.18" }),
            /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#FED44D", stopOpacity: "0" })
          ] }),
          /* @__PURE__ */ jsxs("radialGradient", { id: "blueGlow", cx: "10%", cy: "80%", r: "50%", children: [
            /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#2BABE2", stopOpacity: "0.12" }),
            /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#2BABE2", stopOpacity: "0" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("rect", { width: "1200", height: "600", fill: "url(#sunGlow)" }),
        /* @__PURE__ */ jsx("rect", { width: "1200", height: "600", fill: "url(#blueGlow)" }),
        /* @__PURE__ */ jsxs("g", { opacity: "0.06", stroke: "#FED44D", strokeWidth: "1", children: [
          /* @__PURE__ */ jsx("line", { x1: "700", y1: "0", x2: "700", y2: "600" }),
          /* @__PURE__ */ jsx("line", { x1: "800", y1: "0", x2: "800", y2: "600" }),
          /* @__PURE__ */ jsx("line", { x1: "900", y1: "0", x2: "900", y2: "600" }),
          /* @__PURE__ */ jsx("line", { x1: "1000", y1: "0", x2: "1000", y2: "600" }),
          /* @__PURE__ */ jsx("line", { x1: "1100", y1: "0", x2: "1100", y2: "600" }),
          /* @__PURE__ */ jsx("line", { x1: "700", y1: "0", x2: "1200", y2: "200" }),
          /* @__PURE__ */ jsx("line", { x1: "700", y1: "150", x2: "1200", y2: "350" }),
          /* @__PURE__ */ jsx("line", { x1: "700", y1: "300", x2: "1200", y2: "500" }),
          /* @__PURE__ */ jsx("line", { x1: "700", y1: "450", x2: "1200", y2: "600" })
        ] }),
        /* @__PURE__ */ jsx("circle", { cx: "960", cy: "80", r: "60", fill: "#FED44D", opacity: "0.08" }),
        /* @__PURE__ */ jsx("circle", { cx: "960", cy: "80", r: "40", fill: "#FED44D", opacity: "0.10" }),
        /* @__PURE__ */ jsx("circle", { cx: "850", cy: "300", r: "3", fill: "#FED44D", opacity: "0.3" }),
        /* @__PURE__ */ jsx("circle", { cx: "920", cy: "260", r: "2", fill: "#2BABE2", opacity: "0.4" }),
        /* @__PURE__ */ jsx("circle", { cx: "990", cy: "340", r: "2.5", fill: "#FED44D", opacity: "0.25" }),
        /* @__PURE__ */ jsx("circle", { cx: "1060", cy: "200", r: "2", fill: "#2BABE2", opacity: "0.3" }),
        /* @__PURE__ */ jsx("circle", { cx: "1130", cy: "380", r: "3", fill: "#FED44D", opacity: "0.2" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "relative z-10 max-w-6xl mx-auto px-6", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-12 items-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-white mb-6", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Solar Programs" }),
          /* @__PURE__ */ jsxs("p", { className: "text-white/90 leading-relaxed mb-4", children: [
            "Our team will help you find the solar plan that fits just right. Pell Solar offers three great options: ",
            /* @__PURE__ */ jsx("strong", { className: "text-white", children: "cash purchase" }),
            ", ",
            /* @__PURE__ */ jsx("strong", { className: "text-white", children: "solar financing" }),
            ", and a ",
            /* @__PURE__ */ jsx("strong", { className: "text-white", children: "zero-down solar lease" }),
            "."
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-white/80 leading-relaxed mb-6", children: [
            "No matter which route you choose, your hardware comes with a ",
            /* @__PURE__ */ jsx("strong", { className: "text-white", children: "minimum 25-year manufacturer warranty" }),
            ", and ",
            /* @__PURE__ */ jsx("strong", { className: "text-white", children: "monitoring and maintenance are included" }),
            "."
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-3", children: [
            "PURCHASE OR LEASE OPTIONS",
            "ZERO DOWN LEASE OPTIONS",
            "CASH & FINANCING AVAILABLE",
            "PREDICTABLE MONTHLY PAYMENTS",
            "PROTECTION FROM UTILITY RATE INCREASES",
            "25-YEAR EQUIPMENT WARRANTY",
            "MONITORING & MAINTENANCE INCLUDED"
          ].map((item) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "w-4 h-4 rounded-full bg-[#FED44D] flex-shrink-0" }),
            /* @__PURE__ */ jsx("span", { className: "text-white font-semibold text-sm", children: item })
          ] }, item)) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white/10 border border-white/20 rounded-2xl p-5 flex items-start gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-[#FED44D] flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "#0B1D51", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
              /* @__PURE__ */ jsx("path", { d: "M12 6v6l4 2" })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-white font-extrabold text-lg mb-1", children: "Cash Purchase" }),
              /* @__PURE__ */ jsx("div", { className: "text-white/80 text-sm", children: "Pay upfront, own outright. Maximum long-term savings with no monthly payments." }),
              /* @__PURE__ */ jsxs("div", { className: "mt-2 flex gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsx("span", { className: "bg-[#FED44D]/20 text-[#FED44D] text-xs font-bold px-2 py-1 rounded-full", children: "YOU OWN IT" }),
                /* @__PURE__ */ jsx("span", { className: "bg-[#FED44D]/20 text-[#FED44D] text-xs font-bold px-2 py-1 rounded-full", children: "$0/MO PAYMENT" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/10 border border-white/20 rounded-2xl p-5 flex items-start gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-[#2BABE2] flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "white", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ jsx("rect", { x: "2", y: "5", width: "20", height: "14", rx: "2" }),
              /* @__PURE__ */ jsx("path", { d: "M2 10h20" })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-white font-extrabold text-lg mb-1", children: "Solar Financing" }),
              /* @__PURE__ */ jsx("div", { className: "text-white/80 text-sm", children: "$0 down, fixed low rate. Own your system and build equity from day one." }),
              /* @__PURE__ */ jsxs("div", { className: "mt-2 flex gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsx("span", { className: "bg-[#2BABE2]/30 text-[#2BABE2] text-xs font-bold px-2 py-1 rounded-full", children: "AS LOW AS 4.99% APR" }),
                /* @__PURE__ */ jsx("span", { className: "bg-[#2BABE2]/30 text-[#2BABE2] text-xs font-bold px-2 py-1 rounded-full", children: "$0 DOWN" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/10 border border-[#FED44D]/40 rounded-2xl p-5 flex items-start gap-4 relative overflow-hidden", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-3 right-3 bg-[#FED44D] text-[#0B1D51] text-xs font-black px-2 py-0.5 rounded-full", children: "MOST POPULAR" }),
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "white", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ jsx("path", { d: "M12 2L2 7l10 5 10-5-10-5z" }),
              /* @__PURE__ */ jsx("path", { d: "M2 17l10 5 10-5" }),
              /* @__PURE__ */ jsx("path", { d: "M2 12l10 5 10-5" })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-white font-extrabold text-lg mb-1", children: "Zero-Down Solar Lease" }),
              /* @__PURE__ */ jsx("div", { className: "text-white/80 text-sm", children: "No money down. Fixed monthly payment lower than your current utility bill." }),
              /* @__PURE__ */ jsxs("div", { className: "mt-2 flex gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsx("span", { className: "bg-green-500/30 text-green-300 text-xs font-bold px-2 py-1 rounded-full", children: "NO MONEY DOWN" }),
                /* @__PURE__ */ jsx("span", { className: "bg-green-500/30 text-green-300 text-xs font-bold px-2 py-1 rounded-full", children: "TAX CREDIT BUILT IN" })
              ] })
            ] })
          ] })
        ] }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-16 md:py-20 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-[#0B1D51] mb-10 text-center", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Our Service Locations" }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8 max-w-2xl mx-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center bg-white border border-gray-200 rounded-xl p-8 shadow-sm", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-[#0B1D51] mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Upland, California" }),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "tel:8666468499",
              className: "inline-block bg-[#0B1D51] hover:bg-[#162a6e] text-white font-bold py-3 px-8 rounded-lg transition-colors no-underline",
              children: "(866) 646-8499"
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "tel:7144553401",
              className: "inline-block bg-[#0B1D51]/70 hover:bg-[#162a6e] text-[#FED44D] font-bold py-2 px-6 rounded-lg transition-colors no-underline text-sm mt-2",
              children: "(714) 455-3401 CA Local"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center bg-white border border-gray-200 rounded-xl p-8 shadow-sm", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-[#0B1D51] mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Eagle, Idaho" }),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "tel:2085031416",
              className: "inline-block bg-[#0B1D51] hover:bg-[#162a6e] text-white font-bold py-3 px-8 rounded-lg transition-colors no-underline",
              children: "(208) 503-1416"
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs(
      "section",
      {
        className: "relative py-16 md:py-24",
        style: { backgroundImage: `url(${HERO_BG})`, backgroundSize: "cover", backgroundPosition: "center" },
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#0B1D51]/60 backdrop-blur-sm" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-3xl mx-auto px-6", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[#2BABE2] font-semibold text-sm uppercase tracking-wider text-center mb-2", children: "Ready to make a change to renewable energy?" }),
            /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-white mb-10 text-center", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Contact us today." }),
            submitted ? /* @__PURE__ */ jsxs("div", { className: "text-center py-12 bg-white rounded-2xl shadow-xl px-8", children: [
              /* @__PURE__ */ jsx("div", { className: "text-5xl mb-4", children: "☀️" }),
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-[#0B1D51] mb-2", children: "Thank you!" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "We'll be in touch shortly to discuss your solar options." })
            ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "bg-white rounded-2xl shadow-xl p-8 space-y-5", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-5", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-[#0B1D51] mb-1", children: "First Name *" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      required: true,
                      value: form.firstName,
                      onChange: (e) => setForm({ ...form, firstName: e.target.value }),
                      className: "w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2BABE2]",
                      placeholder: "First"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-[#0B1D51] mb-1", children: "Last Name *" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      required: true,
                      value: form.lastName,
                      onChange: (e) => setForm({ ...form, lastName: e.target.value }),
                      className: "w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2BABE2]",
                      placeholder: "Last"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-[#0B1D51] mb-1", children: "Email *" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "email",
                    required: true,
                    value: form.email,
                    onChange: (e) => setForm({ ...form, email: e.target.value }),
                    className: "w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2BABE2]",
                    placeholder: "your@email.com"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-[#0B1D51] mb-1", children: "Phone *" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "tel",
                    required: true,
                    value: form.phone,
                    onChange: (e) => setForm({ ...form, phone: e.target.value }),
                    className: "w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2BABE2]",
                    placeholder: "(555) 000-0000"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("label", { className: "block text-sm font-semibold text-[#0B1D51] mb-1", children: [
                  "Average Monthly Electrical Bill ",
                  /* @__PURE__ */ jsx("span", { className: "text-gray-400 font-normal", children: "(optional)" })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mb-2", children: "Having your bill helps us give you a more accurate quote — but you can still proceed without it." }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: form.bill,
                    onChange: (e) => setForm({ ...form, bill: e.target.value }),
                    className: "w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2BABE2]",
                    placeholder: "e.g. $300/mo — leave blank if you don't have it"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-[#0B1D51] mb-1", children: "Address *" }),
                /* @__PURE__ */ jsx(
                  AddressAutocomplete,
                  {
                    value: form.address,
                    onChange: (address, components) => setForm({ ...form, address, city: components?.city || "", state: components?.state || "", zip: components?.zip || "" }),
                    placeholder: "Start typing your address...",
                    className: "w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2BABE2]"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  disabled: submitToCrm.isPending,
                  className: "w-full bg-[#2BABE2] hover:bg-[#1e96cc] text-white font-bold py-4 rounded-lg text-lg transition-colors disabled:opacity-60",
                  children: submitToCrm.isPending ? "Sending..." : "Submit"
                }
              )
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const HERO_IMG$3 = "/manus-storage/solar-home-main-v2_0ad97127.jpg";
const ISSUE_OPTIONS = [
  { id: "no_power", label: "System not producing power at all", category: "solar" },
  { id: "low_production", label: "Production lower than usual", category: "solar" },
  { id: "inverter_error", label: "Inverter showing error code or red light", category: "solar" },
  { id: "battery_not_charging", label: "Battery not charging", category: "battery" },
  { id: "battery_not_discharging", label: "Battery not discharging / not backing up home", category: "battery" },
  { id: "battery_draining_fast", label: "Battery draining too fast", category: "battery" },
  { id: "backup_failed", label: "Backup power didn't work during outage", category: "battery" },
  { id: "monitoring_issue", label: "Monitoring app not updating or showing errors", category: "monitoring" },
  { id: "high_bill", label: "High electric bill despite having solar", category: "solar" },
  { id: "physical_damage", label: "Physical damage (panels, wiring, racking)", category: "damage" },
  { id: "roof_leak", label: "Roof leak near panels", category: "damage" },
  { id: "critter_damage", label: "Critter or animal damage", category: "damage" },
  { id: "other", label: "Other issue", category: "other" }
];
function SolarRepair() {
  const formRef = useRef(null);
  const [step, setStep] = useState("system");
  const [issueAccordionOpen, setIssueAccordionOpen] = useState(false);
  const [diagnosis, setDiagnosis] = useState(null);
  const [resolvedWithAI, setResolvedWithAI] = useState(false);
  const [systemType, setSystemType] = useState("");
  const [inverterBrand, setInverterBrand] = useState("");
  const [batteryBrand, setBatteryBrand] = useState("");
  const [systemAge, setSystemAge] = useState("");
  const [selectedIssues, setSelectedIssues] = useState([]);
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState({ firstName: "", lastName: "", phone: "", email: "", address: "", _hp: "" });
  const [smsConsent, setSmsConsent] = useState(false);
  const diagnose = trpc.service.diagnose.useMutation({
    onSuccess: (data) => {
      setDiagnosis(typeof data.diagnosis === "string" ? data.diagnosis : String(data.diagnosis ?? ""));
      setStep("diagnosis");
    },
    onError: () => toast.error("Could not generate diagnostic. Please describe your issue and submit the form.")
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (window.location.hash === "#service-form" && formRef.current) {
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, []);
  const toggleIssue = (id) => {
    setSelectedIssues((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };
  const handleGetDiagnosis = () => {
    if (selectedIssues.length === 0) {
      toast.error("Please select at least one issue.");
      return;
    }
    if (!duration) {
      toast.error("Please tell us how long this has been happening.");
      return;
    }
    diagnose.mutate({ systemType, inverterBrand, batteryBrand, systemAge, selectedIssues: selectedIssues.map((id) => ISSUE_OPTIONS.find((o) => o.id === id)?.label ?? id), duration, description });
  };
  const handleSubmitContact = async (e) => {
    e.preventDefault();
    if (!contact.firstName.trim() || !contact.lastName.trim()) {
      toast.error("Please enter your first and last name.");
      return;
    }
    if (!contact.phone.trim() && !contact.email.trim()) {
      toast.error("Please enter a phone number or email address.");
      return;
    }
    setIsSubmitting(true);
    try {
      let customerExists = false;
      let customerId;
      const phone = contact.phone.trim();
      if (phone) {
        try {
          const lookupRes = await fetch(
            `https://pellsolar-crm-prod.onrender.com/api/ai-phone/lookup-caller?phone=${encodeURIComponent(phone)}`
          );
          if (lookupRes.ok) {
            const lookupData = await lookupRes.json();
            if (lookupData.existing_customer === true) {
              customerExists = true;
              customerId = String(lookupData.customer_id);
            }
          }
        } catch {
        }
      }
      const issueText = selectedIssues.map((id) => ISSUE_OPTIONS.find((o) => o.id === id)?.label ?? id).join("; ");
      const fullDescription = description ? `${issueText}. Duration: ${duration}. Details: ${description}` : `${issueText}. Duration: ${duration}.`;
      if (contact._hp && contact._hp.trim().length > 0) {
        setStep("done");
        return;
      }
      const payload = {
        name: `${contact.firstName.trim()} ${contact.lastName.trim()}`,
        email: contact.email.trim() || void 0,
        phone: phone || "N/A",
        address: contact.address.trim() || void 0,
        systemType: systemType || void 0,
        inverterBrand: inverterBrand || void 0,
        batteryBrand: batteryBrand || void 0,
        systemAge: systemAge || void 0,
        selectedIssues: selectedIssues.map((id) => ISSUE_OPTIONS.find((o) => o.id === id)?.label ?? id),
        duration: duration || void 0,
        description: fullDescription,
        aiDiagnosis: diagnosis || void 0,
        customerExists,
        source: "website-service-form",
        submittedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      const res = await fetch(
        "https://pellsolar-crm-prod.onrender.com/api/webhooks/service-intake",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );
      if (!res.ok) {
        throw new Error(`CRM webhook returned ${res.status}`);
      }
      setStep("done");
    } catch (err) {
      console.error("[ServiceForm] Submission error:", err);
      toast.error("Something went wrong. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const inputCls = "w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2BABE2] bg-white";
  const selectCls = `${inputCls} cursor-pointer`;
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white", style: { fontFamily: "'Inter', system-ui, sans-serif" }, children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("section", { className: "relative py-28 md:py-36", style: { backgroundImage: `url(${HERO_IMG$3})`, backgroundSize: "cover", backgroundPosition: "center" }, children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#0B1D51]/45" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-7xl mx-auto px-6 text-center", children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6", style: { fontFamily: "'Montserrat', sans-serif" }, children: [
          "Solar Repair & ",
          /* @__PURE__ */ jsx("span", { className: "text-[#FED44D]", children: "Maintenance" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-white/80 max-w-3xl mx-auto mb-4", children: "Expert solar panel repair, inverter replacement, and system diagnostics. We service all brands — not just systems we installed." }),
        /* @__PURE__ */ jsx("p", { className: "text-[#2BABE2] font-bold text-lg mb-8", children: "Licensed C-46 Solar Contractor • License #949122" }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [
          /* @__PURE__ */ jsx("a", { href: "#service-form", className: "btn-green text-lg px-8 py-4", children: "Schedule a Service Call" }),
          /* @__PURE__ */ jsxs("a", { href: "tel:8666468499", className: "text-white font-bold text-lg flex items-center gap-2 no-underline hover:text-[#FED44D] transition-colors", children: [
            /* @__PURE__ */ jsx(Phone, { size: 18 }),
            " (866) 646-8499"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-14", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-extrabold text-gray-900 mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: [
          "Is Your Solar System ",
          /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Underperforming?" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg max-w-3xl mx-auto", children: "If your electric bill is climbing or your monitoring shows lower production, something may be wrong. Here are the most common issues we fix:" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto", children: [
        { icon: AlertTriangle, title: "Inverter Failure", desc: "String inverters and microinverters can fail over time. We diagnose and replace all major brands — SolarEdge, Enphase, SMA, Fronius, and more.", color: "text-red-500", bg: "bg-red-50" },
        { icon: Zap, title: "Low Production", desc: "Panels producing less than expected? Could be shading, soiling, degradation, or wiring issues. We run full diagnostics to find the root cause.", color: "text-yellow-500", bg: "bg-yellow-50" },
        { icon: Bug, title: "Critter Damage", desc: "Squirrels, birds, and rodents chew through wiring and nest under panels. We repair the damage and install critter guards to prevent it from happening again.", color: "text-orange-500", bg: "bg-orange-50" },
        { icon: Settings, title: "Monitoring Issues", desc: "System not reporting? We troubleshoot communication issues with Enphase, SolarEdge, Tesla, and other monitoring platforms.", color: "text-blue-500", bg: "bg-blue-50" },
        { icon: Shield, title: "Roof Leaks", desc: "Bad installations cause roof leaks. We remove panels, repair the roof, reinstall properly, and waterproof every penetration point.", color: "text-purple-500", bg: "bg-purple-50" },
        { icon: Wrench, title: "Storm Damage", desc: "High winds, hail, and falling debris can crack panels or loosen racking. We assess storm damage and work with your insurance company.", color: "text-teal-500", bg: "bg-teal-50" }
      ].map((card) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow", children: [
        /* @__PURE__ */ jsx("div", { className: `w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center mb-4`, children: /* @__PURE__ */ jsx(card.icon, { size: 24, className: card.color }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900 mb-2", style: { fontFamily: "'Montserrat', sans-serif" }, children: card.title }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm leading-relaxed", children: card.desc })
      ] }, card.title)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-10", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-extrabold text-gray-900 mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: [
          "We Service ",
          /* @__PURE__ */ jsx("span", { className: "text-[#2BABE2]", children: "All Brands" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 max-w-2xl mx-auto", children: "It doesn't matter who installed your system. We repair and maintain solar systems from every manufacturer." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-w-4xl mx-auto", children: ["SolarEdge", "Enphase", "Tesla", "SMA", "Fronius", "LG", "Panasonic", "REC", "Q Cells", "Canadian Solar", "Silfab", "SunPower"].map((brand) => /* @__PURE__ */ jsx("div", { className: "bg-white rounded-xl border border-gray-200 px-3 py-3 text-center hover:border-[#2BABE2] transition-colors", children: /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-gray-800", children: brand }) }, brand)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-[#0B1D51]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx("div", { className: "text-center mb-14", children: /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-white mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Our Repair Process" }) }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-4 gap-6 max-w-5xl mx-auto", children: [
        { step: "1", title: "Call Us", desc: "Tell us what's happening — low production, error codes, physical damage, or anything else." },
        { step: "2", title: "Diagnostics", desc: "We run a full system diagnostic — checking inverters, panels, wiring, monitoring, and roof penetrations." },
        { step: "3", title: "Quote & Repair", desc: "We provide a clear, upfront quote. Once approved, we order parts and schedule the repair — usually within 1–2 weeks." },
        { step: "4", title: "Verification", desc: "After the repair, we verify the system is producing at full capacity and all monitoring is reporting correctly." }
      ].map((s) => /* @__PURE__ */ jsxs("div", { className: "bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10", children: [
        /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-[#FED44D] text-[#0B1D51] font-black text-xl flex items-center justify-center mx-auto mb-4", children: s.step }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-2", children: s.title }),
        /* @__PURE__ */ jsx("p", { className: "text-white/70 text-sm leading-relaxed", children: s.desc })
      ] }, s.step)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsx("div", { className: "max-w-5xl mx-auto px-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row items-center gap-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-extrabold text-gray-900 mb-6", style: { fontFamily: "'Montserrat', sans-serif" }, children: [
          "Critter Guard ",
          /* @__PURE__ */ jsx("span", { className: "text-[#2BABE2]", children: "Installation" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-lg leading-relaxed mb-4", children: "Birds, squirrels, and rodents love to nest under solar panels. They chew through wiring, build nests that block airflow, and cause thousands of dollars in damage." }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-lg leading-relaxed mb-6", children: "Our critter guard is a heavy-duty mesh barrier that clips around the perimeter of your panels — keeping animals out while maintaining proper ventilation." }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-2 mb-8", children: ["Heavy-duty galvanized mesh", "Clips directly to panels — no drilling", "Maintains proper airflow", "10+ year lifespan", "Available for all panel types"].map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-gray-700", children: [
          /* @__PURE__ */ jsx(CheckCircle, { size: 16, className: "text-[#2BABE2] mt-1 flex-shrink-0" }),
          " ",
          item
        ] }, i)) }),
        /* @__PURE__ */ jsx(Link, { href: "/get-quote", className: "btn-green", children: "Get a Critter Guard Quote" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 bg-gray-50 rounded-2xl p-8 border border-gray-200", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-900 mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Common Signs of Critter Damage" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: ["Scratching or scurrying sounds on the roof", "Droppings on or around panels", "Visible nesting material under panels", "Sudden drop in solar production", "Error codes on your inverter or monitoring app", "Chewed or exposed wiring visible from the ground"].map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-gray-700", children: [
          /* @__PURE__ */ jsx(AlertTriangle, { size: 16, className: "text-orange-500 mt-1 flex-shrink-0" }),
          " ",
          item
        ] }, i)) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx("div", { className: "text-center mb-10", children: /* @__PURE__ */ jsx("h2", { className: "text-2xl font-extrabold text-gray-900 mb-2", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Service Areas" }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8 max-w-3xl mx-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl p-6 border border-gray-200", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-900 mb-2", children: "California" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm mb-2", children: "Inland Empire, LA County, Orange County, San Diego" }),
          /* @__PURE__ */ jsx("a", { href: "tel:8666468499", className: "text-[#2BABE2] font-bold text-sm no-underline", children: "(866) 646-8499" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl p-6 border border-gray-200", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-900 mb-2", children: "Idaho" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm mb-2", children: "Boise, Meridian, Nampa, Eagle, Caldwell" }),
          /* @__PURE__ */ jsx("a", { href: "tel:2085031416", className: "text-[#2BABE2] font-bold text-sm no-underline", children: "(208) 503-1416" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "service-form", ref: formRef, className: "py-20 bg-[#0B1D51]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-10", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-extrabold text-white mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: [
          "Schedule a ",
          /* @__PURE__ */ jsx("span", { className: "text-[#FED44D]", children: "Service Call" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-white/70 text-lg", children: "Tell us about your system and we'll help diagnose the issue — or connect you with our team." }),
        /* @__PURE__ */ jsxs("a", { href: "tel:8666468499", className: "text-[#2BABE2] font-bold text-xl mt-2 inline-block no-underline hover:text-[#FED44D] transition-colors", children: [
          /* @__PURE__ */ jsx(Phone, { size: 18, className: "inline mr-2" }),
          "(866) 646-8499"
        ] })
      ] }),
      step === "done" && /* @__PURE__ */ jsxs("div", { className: "bg-white/10 border border-white/20 rounded-2xl p-10 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx(CheckCircle, { size: 32, className: "text-white" }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-2", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Service Request Received!" }),
        /* @__PURE__ */ jsx("p", { className: "text-white/70", children: "Our team will contact you within 1 business day to schedule your diagnostic visit." })
      ] }),
      step !== "done" && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl overflow-hidden shadow-xl", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setStep(step === "system" ? "issues" : "system"),
              className: "w-full flex items-center justify-between px-8 py-5 bg-[#0B1D51] text-white font-bold text-lg",
              style: { fontFamily: "'Montserrat', sans-serif" },
              children: [
                /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-8 h-8 rounded-full bg-[#FED44D] text-[#0B1D51] font-black text-sm flex items-center justify-center", children: "1" }),
                  "About Your System"
                ] }),
                step === "system" ? /* @__PURE__ */ jsx(ChevronUp, { size: 20 }) : /* @__PURE__ */ jsx(ChevronDown, { size: 20 })
              ]
            }
          ),
          step === "system" && /* @__PURE__ */ jsxs("div", { className: "p-8 space-y-5", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: [
                "What type of system do you have? ",
                /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: ["Solar Only", "Solar + Battery", "Battery Only", "Not Sure"].map((opt) => /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setSystemType(opt),
                  className: `px-3 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${systemType === opt ? "border-[#2BABE2] bg-[#2BABE2]/10 text-[#2BABE2]" : "border-gray-200 text-gray-600 hover:border-[#2BABE2]"}`,
                  children: opt
                },
                opt
              )) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Inverter / System Brand" }),
                /* @__PURE__ */ jsxs("select", { value: inverterBrand, onChange: (e) => setInverterBrand(e.target.value), className: selectCls, children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Select or unknown" }),
                  /* @__PURE__ */ jsx("option", { children: "SolarEdge" }),
                  /* @__PURE__ */ jsx("option", { children: "Enphase" }),
                  /* @__PURE__ */ jsx("option", { children: "Tesla / SolarCity" }),
                  /* @__PURE__ */ jsx("option", { children: "SMA" }),
                  /* @__PURE__ */ jsx("option", { children: "Fronius" }),
                  /* @__PURE__ */ jsx("option", { children: "LG" }),
                  /* @__PURE__ */ jsx("option", { children: "Panasonic" }),
                  /* @__PURE__ */ jsx("option", { children: "SunPower" }),
                  /* @__PURE__ */ jsx("option", { children: "Other" }),
                  /* @__PURE__ */ jsx("option", { children: "Don't Know" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Battery Brand" }),
                /* @__PURE__ */ jsxs("select", { value: batteryBrand, onChange: (e) => setBatteryBrand(e.target.value), className: selectCls, children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "No battery / unknown" }),
                  /* @__PURE__ */ jsx("option", { children: "Tesla Powerwall" }),
                  /* @__PURE__ */ jsx("option", { children: "Enphase IQ Battery" }),
                  /* @__PURE__ */ jsx("option", { children: "SolarEdge Energy Bank" }),
                  /* @__PURE__ */ jsx("option", { children: "LG RESU" }),
                  /* @__PURE__ */ jsx("option", { children: "Franklin WH" }),
                  /* @__PURE__ */ jsx("option", { children: "Generac PWRcell" }),
                  /* @__PURE__ */ jsx("option", { children: "Other" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "How old is your system?" }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-5 gap-2", children: ["< 1 year", "1–3 years", "3–5 years", "5–10 years", "10+ years"].map((opt) => /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setSystemAge(opt),
                  className: `px-3 py-2 rounded-xl border-2 text-sm font-semibold transition-all ${systemAge === opt ? "border-[#2BABE2] bg-[#2BABE2]/10 text-[#2BABE2]" : "border-gray-200 text-gray-600 hover:border-[#2BABE2]"}`,
                  children: opt
                },
                opt
              )) })
            ] }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  if (!systemType) {
                    toast.error("Please select your system type.");
                    return;
                  }
                  setStep("issues");
                  setIssueAccordionOpen(true);
                },
                className: "w-full btn-green py-4 text-lg flex items-center justify-center gap-2",
                children: [
                  "Next: Describe the Issue ",
                  /* @__PURE__ */ jsx(ArrowRight, { size: 18 })
                ]
              }
            )
          ] })
        ] }),
        (step === "issues" || step === "diagnosis" || step === "contact") && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl overflow-hidden shadow-xl", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setIssueAccordionOpen((o) => !o),
              className: "w-full flex items-center justify-between px-8 py-5 bg-[#0B1D51] text-white font-bold text-lg",
              style: { fontFamily: "'Montserrat', sans-serif" },
              children: [
                /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-8 h-8 rounded-full bg-[#FED44D] text-[#0B1D51] font-black text-sm flex items-center justify-center", children: "2" }),
                  "What's the Problem?",
                  selectedIssues.length > 0 && /* @__PURE__ */ jsxs("span", { className: "bg-[#2BABE2] text-white text-xs font-bold px-2 py-0.5 rounded-full", children: [
                    selectedIssues.length,
                    " selected"
                  ] })
                ] }),
                issueAccordionOpen ? /* @__PURE__ */ jsx(ChevronUp, { size: 20 }) : /* @__PURE__ */ jsx(ChevronDown, { size: 20 })
              ]
            }
          ),
          issueAccordionOpen && /* @__PURE__ */ jsxs("div", { className: "p-8 space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("p", { className: "text-sm font-semibold text-gray-700 mb-3", children: [
                "Select all that apply: ",
                /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "space-y-2", children: ISSUE_OPTIONS.map((opt) => /* @__PURE__ */ jsxs("label", { className: `flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${selectedIssues.includes(opt.id) ? "border-[#2BABE2] bg-[#2BABE2]/5" : "border-gray-200 hover:border-gray-300"}`, children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: selectedIssues.includes(opt.id),
                    onChange: () => toggleIssue(opt.id),
                    className: "w-4 h-4 accent-[#2BABE2]"
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-gray-800", children: opt.label }),
                opt.category === "battery" && /* @__PURE__ */ jsx("span", { className: "ml-auto text-xs bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded-full", children: "Battery" }),
                opt.category === "damage" && /* @__PURE__ */ jsx("span", { className: "ml-auto text-xs bg-orange-100 text-orange-700 font-semibold px-2 py-0.5 rounded-full", children: "Damage" })
              ] }, opt.id)) })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: [
                "How long has this been happening? ",
                /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2", children: ["Just started", "A few days", "A week or more", "A month or more"].map((opt) => /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setDuration(opt),
                  className: `px-3 py-2 rounded-xl border-2 text-sm font-semibold transition-all ${duration === opt ? "border-[#2BABE2] bg-[#2BABE2]/10 text-[#2BABE2]" : "border-gray-200 text-gray-600 hover:border-[#2BABE2]"}`,
                  children: opt
                },
                opt
              )) })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Describe the issue in your own words (optional)" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  rows: 3,
                  placeholder: "e.g. My inverter is showing a red light and production dropped by 50% last week...",
                  value: description,
                  onChange: (e) => setDescription(e.target.value),
                  className: "w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2BABE2] resize-none"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: handleGetDiagnosis,
                  disabled: diagnose.isPending,
                  className: "w-full btn-green py-4 text-base flex items-center justify-center gap-2 disabled:opacity-60",
                  children: diagnose.isPending ? /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(Loader2, { size: 18, className: "animate-spin" }),
                    " Analyzing your system…"
                  ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(Bot, { size: 18 }),
                    " Get My AI Diagnostic"
                  ] })
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "text-center text-gray-500 text-xs", children: "Our AI will analyze your system and issues — then you can schedule a service call if needed." })
            ] })
          ] })
        ] }),
        step === "diagnosis" && diagnosis && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-xl overflow-hidden", children: [
          /* @__PURE__ */ jsxs("div", { className: "px-8 py-5 bg-gradient-to-r from-[#2BABE2] to-[#0B1D51] flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(Bot, { size: 24, className: "text-white" }),
            /* @__PURE__ */ jsx("h3", { className: "text-white font-bold text-lg", style: { fontFamily: "'Montserrat', sans-serif" }, children: "AI Diagnostic Results" }),
            /* @__PURE__ */ jsx("span", { className: "ml-auto text-xs bg-white/20 text-white px-2 py-1 rounded-full", children: "Based on your system info" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-8", children: [
            /* @__PURE__ */ jsx("div", { className: "prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap mb-8", children: diagnosis }),
            /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-200 pt-6", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-gray-700 mb-4", children: "Did this help resolve your issue?" }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setResolvedWithAI(true),
                    className: "flex-1 py-3 rounded-xl border-2 border-green-500 text-green-700 font-bold hover:bg-green-50 transition-all flex items-center justify-center gap-2",
                    children: [
                      /* @__PURE__ */ jsx(CheckCircle, { size: 18 }),
                      " Yes, that helped — thanks!"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setStep("contact"),
                    className: "flex-1 btn-green py-3 flex items-center justify-center gap-2",
                    children: [
                      "I still need help — contact my team ",
                      /* @__PURE__ */ jsx(ArrowRight, { size: 18 })
                    ]
                  }
                )
              ] }),
              resolvedWithAI && /* @__PURE__ */ jsx("div", { className: "mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-center", children: /* @__PURE__ */ jsxs("p", { className: "text-green-700 font-semibold", children: [
                "Great! If the issue comes back, don't hesitate to call us at ",
                /* @__PURE__ */ jsx("a", { href: "tel:8666468499", className: "underline", children: "(866) 646-8499" }),
                " or ",
                /* @__PURE__ */ jsx("a", { href: "tel:7144553401", className: "underline", children: "(714) 455-3401" }),
                " (CA)."
              ] }) })
            ] })
          ] })
        ] }),
        step === "contact" && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-xl overflow-hidden", children: [
          /* @__PURE__ */ jsxs("div", { className: "px-8 py-5 bg-[#0B1D51] flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "w-8 h-8 rounded-full bg-[#FED44D] text-[#0B1D51] font-black text-sm flex items-center justify-center", children: "3" }),
            /* @__PURE__ */ jsx("h3", { className: "text-white font-bold text-lg", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Your Contact Information" })
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmitContact, className: "p-8 space-y-5", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "_hp",
                value: contact._hp,
                onChange: (e) => setContact((c) => ({ ...c, _hp: e.target.value })),
                tabIndex: -1,
                "aria-hidden": "true",
                autoComplete: "off",
                style: { position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0, pointerEvents: "none" }
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("label", { className: "block text-sm font-semibold text-gray-700 mb-1", children: [
                  "First Name ",
                  /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
                ] }),
                /* @__PURE__ */ jsx("input", { type: "text", placeholder: "John", value: contact.firstName, onChange: (e) => setContact((c) => ({ ...c, firstName: e.target.value })), className: inputCls, required: true })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("label", { className: "block text-sm font-semibold text-gray-700 mb-1", children: [
                  "Last Name ",
                  /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
                ] }),
                /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Smith", value: contact.lastName, onChange: (e) => setContact((c) => ({ ...c, lastName: e.target.value })), className: inputCls, required: true })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-1", children: "Phone Number" }),
                /* @__PURE__ */ jsx("input", { type: "tel", placeholder: "(714) 555-0100", value: contact.phone, onChange: (e) => setContact((c) => ({ ...c, phone: e.target.value })), className: inputCls })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-1", children: "Email Address" }),
                /* @__PURE__ */ jsx("input", { type: "email", placeholder: "john@example.com", value: contact.email, onChange: (e) => setContact((c) => ({ ...c, email: e.target.value })), className: inputCls })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-1", children: "Property Address" }),
              /* @__PURE__ */ jsx(
                AddressAutocomplete,
                {
                  value: contact.address,
                  onChange: (full) => setContact((c) => ({ ...c, address: full })),
                  placeholder: "Start typing your address…",
                  className: inputCls
                }
              )
            ] }),
            selectedIssues.length > 0 && /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-xl p-4 border border-gray-200", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide", children: "Your Service Request Summary" }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-700", children: [
                /* @__PURE__ */ jsx("strong", { children: "System:" }),
                " ",
                systemType || "Not specified",
                " — ",
                inverterBrand || "Brand unknown",
                batteryBrand ? ` + ${batteryBrand}` : ""
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-700 mt-1", children: [
                /* @__PURE__ */ jsx("strong", { children: "Issues:" }),
                " ",
                selectedIssues.map((id) => ISSUE_OPTIONS.find((o) => o.id === id)?.label).join(", ")
              ] }),
              duration && /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-700 mt-1", children: [
                /* @__PURE__ */ jsx("strong", { children: "Duration:" }),
                " ",
                duration
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  id: "service-sms-consent",
                  checked: smsConsent,
                  onChange: (e) => setSmsConsent(e.target.checked),
                  className: "mt-0.5 w-4 h-4 flex-shrink-0 accent-[#2BABE2] cursor-pointer"
                }
              ),
              /* @__PURE__ */ jsxs("label", { htmlFor: "service-sms-consent", className: "text-xs text-gray-600 leading-relaxed cursor-pointer", children: [
                "I agree to receive SMS text messages from Pell Solar about my service request (appointment confirmations, technician updates, status notifications). Reply ",
                /* @__PURE__ */ jsx("strong", { children: "STOP" }),
                " to opt out at any time. Msg & data rates may apply.",
                " ",
                /* @__PURE__ */ jsx("a", { href: "/terms-and-conditions", target: "_blank", rel: "noopener noreferrer", className: "text-[#2BABE2] font-semibold", children: "Terms" }),
                " & ",
                /* @__PURE__ */ jsx("a", { href: "/privacy-policy", target: "_blank", rel: "noopener noreferrer", className: "text-[#2BABE2] font-semibold", children: "Privacy Policy" }),
                ".",
                /* @__PURE__ */ jsx("span", { className: "block mt-1 text-gray-400 text-[11px]", children: "Consent is not required to request service." })
              ] })
            ] }),
            /* @__PURE__ */ jsx("button", { type: "submit", disabled: isSubmitting, className: "w-full btn-green text-lg py-4 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2", children: isSubmitting ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Loader2, { size: 18, className: "animate-spin" }),
              " Submitting…"
            ] }) : "SUBMIT SERVICE REQUEST" }),
            /* @__PURE__ */ jsx("p", { className: "text-center text-gray-500 text-sm", children: "We'll respond within 1 business day • No obligation" })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const REFERRAL_APP_URL = "https://pellsolar-crm-prod.onrender.com/app";
const APP_STORE_URL = "https://apps.apple.com/us/app/pell-solar-referral/id6760663938";
const REFERRAL_QR_IMG = "/manus-storage/pell-solar-referral-qr_b0d91c44.png";
const GREEN = "#22c55e";
const GREEN_DARK = "#16a34a";
const GREEN_GLOW = "rgba(34,197,94,0.18)";
const NAVY = "#060f2e";
function ReferralProgram() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", style: { background: NAVY }, children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs(
      "section",
      {
        className: "relative pt-36 pb-20 px-6 text-white text-center overflow-hidden",
        style: { background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${GREEN_GLOW} 0%, transparent 70%), ${NAVY}` },
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 pointer-events-none select-none overflow-hidden", "aria-hidden": true, children: ["$", "$", "$", "$", "$"].map((s, i) => /* @__PURE__ */ jsx(
            "span",
            {
              className: "absolute font-black",
              style: {
                color: GREEN,
                opacity: 0.05,
                top: `${[10, 30, 55, 20, 70][i]}%`,
                left: `${[5, 88, 15, 75, 92][i]}%`,
                transform: `rotate(${[-15, 12, -8, 20, -5][i]}deg)`,
                fontSize: `${[80, 120, 60, 100, 70][i]}px`
              },
              children: s
            },
            i
          )) }),
          /* @__PURE__ */ jsxs("div", { className: "relative max-w-3xl mx-auto", children: [
            /* @__PURE__ */ jsxs(
              "span",
              {
                className: "inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-8 border",
                style: { color: GREEN, borderColor: `${GREEN}55`, background: `${GREEN}12` },
                children: [
                  /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full animate-pulse", style: { background: GREEN } }),
                  "Referral Program — Earn Real Cash"
                ]
              }
            ),
            /* @__PURE__ */ jsxs("h1", { className: "text-5xl md:text-6xl font-black leading-[1.05] mb-4 tracking-tight text-white", children: [
              "Know Someone",
              /* @__PURE__ */ jsx("br", {}),
              "Who Needs Solar?"
            ] }),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "text-7xl md:text-8xl font-black mb-6 leading-none",
                style: { color: GREEN, textShadow: `0 0 40px ${GREEN}66, 0 0 80px ${GREEN}33` },
                children: "Earn $2,000"
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "text-white text-lg max-w-xl mx-auto mb-10", children: "Sign up free, share your personal link, and get paid when your friends go solar. No selling. No hassle." }),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: REFERRAL_APP_URL,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "inline-flex items-center gap-3 font-black text-lg tracking-wider px-12 py-5 rounded-xl shadow-2xl transition-all hover:scale-105",
                style: {
                  background: `linear-gradient(135deg, ${GREEN} 0%, ${GREEN_DARK} 100%)`,
                  color: "#fff",
                  boxShadow: `0 8px 32px ${GREEN}55`
                },
                children: "💰 CREATE MY FREE ACCOUNT"
              }
            ),
            /* @__PURE__ */ jsxs("p", { className: "text-white text-sm mt-4", children: [
              "Already have an account?",
              " ",
              /* @__PURE__ */ jsx("a", { href: REFERRAL_APP_URL, target: "_blank", rel: "noopener noreferrer", className: "underline font-bold", style: { color: GREEN }, children: "Log in here" })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { style: { background: "#0a1630", borderTop: `1px solid ${GREEN}22`, borderBottom: `1px solid ${GREEN}22` }, children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center", children: [
      { val: "90%", label: "of our business is referrals" },
      { val: "$0", label: "to join — always free" },
      { val: "$2,000", label: "max cash reward" },
      { val: "22+", label: "years in business" }
    ].map(({ val, label }) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "text-3xl font-black", style: { color: GREEN }, children: val }),
      /* @__PURE__ */ jsx("div", { className: "text-white text-xs mt-1 leading-snug font-medium", children: label })
    ] }, val)) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 px-6", style: { background: NAVY }, children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-4xl font-black text-white text-center mb-3", children: "How Much You Earn" }),
      /* @__PURE__ */ jsx("p", { className: "text-white text-center mb-12 text-base font-medium", children: "Paid after installation is complete. No limit on referrals." }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "rounded-2xl p-8 flex flex-col gap-4 relative overflow-hidden",
            style: {
              background: `linear-gradient(135deg, #0d2a14 0%, #0a1f10 100%)`,
              border: `2px solid ${GREEN}55`,
              boxShadow: `0 4px 40px ${GREEN}22`
            },
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 -translate-y-8 translate-x-8", style: { background: GREEN } }),
              /* @__PURE__ */ jsx("div", { className: "text-4xl mb-1", children: "☀️🔋" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "text-white font-black text-xl", children: "Solar + Battery System" }),
                /* @__PURE__ */ jsx("div", { className: "text-white text-sm mt-1 font-medium", children: "Friend installs solar panels + Powerwall" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "text-5xl font-black mt-2", style: { color: GREEN, textShadow: `0 0 20px ${GREEN}55` }, children: "$500–$2,000" }),
              /* @__PURE__ */ jsx("div", { className: "text-white text-xs font-semibold", children: "Scales with system size" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "rounded-2xl p-8 flex flex-col gap-4 relative overflow-hidden",
            style: {
              background: `linear-gradient(135deg, #0a1a2e 0%, #071422 100%)`,
              border: `2px solid #2BABE255`,
              boxShadow: `0 4px 40px #2BABE222`
            },
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 -translate-y-8 translate-x-8", style: { background: "#2BABE2" } }),
              /* @__PURE__ */ jsx("div", { className: "text-4xl mb-1", children: "🔋" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "text-white font-black text-xl", children: "Battery-Only Install" }),
                /* @__PURE__ */ jsx("div", { className: "text-white text-sm mt-1 font-medium", children: "Friend adds Powerwall to existing solar" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "text-5xl font-black mt-2", style: { color: "#2BABE2", textShadow: "0 0 20px #2BABE255" }, children: "$250–$500" }),
              /* @__PURE__ */ jsx("div", { className: "text-white text-xs font-semibold", children: "Paid after installation is complete" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-white text-xs text-center mt-6 font-medium", children: "No limit on how many friends you can refer. Each qualifying installation earns a separate reward." })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 px-6", style: { background: "#080f24" }, children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-4xl font-black text-white text-center mb-3", children: "How It Works" }),
      /* @__PURE__ */ jsx("p", { className: "text-white text-center mb-14 text-base font-medium", children: "Three steps. No selling. Just share and get paid." }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [
        { step: "01", title: "Sign Up Free", desc: "Create your account in under 2 minutes. No credit card, no commitment, no catch.", icon: "🙋" },
        { step: "02", title: "Share Your Link", desc: "Get your personal referral link and share it by text, email, or social media.", icon: "🔗" },
        { step: "03", title: "Get Paid", desc: "We send your cash reward once your friend's solar system is fully installed.", icon: "💵" }
      ].map(({ step, title, desc, icon }) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "w-20 h-20 rounded-2xl flex items-center justify-center text-3xl mb-5 shadow-lg",
            style: { background: `${GREEN}18`, border: `1.5px solid ${GREEN}44` },
            children: icon
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "text-xs font-black tracking-widest mb-2", style: { color: GREEN }, children: [
          "STEP ",
          step
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "text-white font-black text-xl mb-3", children: title }),
        /* @__PURE__ */ jsx("p", { className: "text-white text-sm leading-relaxed font-medium", children: desc })
      ] }, step)) })
    ] }) }),
    /* @__PURE__ */ jsx(
      "section",
      {
        className: "py-20 px-6",
        style: { background: `radial-gradient(ellipse 70% 80% at 50% 50%, ${GREEN_GLOW} 0%, transparent 70%), ${NAVY}` },
        children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-4xl font-black text-white text-center mb-3", children: "Ready to Start Earning?" }),
          /* @__PURE__ */ jsx("p", { className: "text-white text-center mb-12 text-base font-medium", children: "Create your free account now, or scan the QR code with your phone camera to open the app instantly." }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center justify-center gap-12", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-3", children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "rounded-2xl p-4 shadow-2xl",
                  style: { background: "#fff", border: `3px solid ${GREEN}`, boxShadow: `0 0 40px ${GREEN}44` },
                  children: /* @__PURE__ */ jsx("img", { src: REFERRAL_QR_IMG, alt: "Scan to join referral program", className: "w-44 h-44 object-contain" })
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "text-white text-xs text-center font-semibold", children: "📱 Point your phone camera here" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "hidden md:flex flex-col items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-px h-20 bg-white/20" }),
              /* @__PURE__ */ jsx("span", { className: "text-white text-sm font-bold", children: "OR" }),
              /* @__PURE__ */ jsx("div", { className: "w-px h-20 bg-white/20" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "md:hidden flex items-center gap-3 w-full", children: [
              /* @__PURE__ */ jsx("div", { className: "flex-1 h-px bg-white/20" }),
              /* @__PURE__ */ jsx("span", { className: "text-white text-sm font-bold", children: "OR" }),
              /* @__PURE__ */ jsx("div", { className: "flex-1 h-px bg-white/20" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-4", children: [
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: REFERRAL_APP_URL,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "inline-flex items-center justify-center gap-3 font-black text-lg tracking-wider px-10 py-5 rounded-xl transition-all hover:scale-105",
                  style: {
                    background: `linear-gradient(135deg, ${GREEN} 0%, ${GREEN_DARK} 100%)`,
                    color: "#fff",
                    minWidth: 280,
                    boxShadow: `0 8px 32px ${GREEN}55`
                  },
                  children: "💰 CREATE MY FREE ACCOUNT"
                }
              ),
              /* @__PURE__ */ jsxs("p", { className: "text-white text-sm font-medium", children: [
                "Already have an account?",
                " ",
                /* @__PURE__ */ jsx("a", { href: REFERRAL_APP_URL, target: "_blank", rel: "noopener noreferrer", className: "underline font-bold", style: { color: GREEN }, children: "Log in here" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-2 flex flex-col items-center gap-3 w-full", children: [
                /* @__PURE__ */ jsx("p", { className: "text-white text-xs font-semibold tracking-wider uppercase", style: { color: `${GREEN}cc` }, children: "Download the App" }),
                /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: APP_STORE_URL,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "inline-flex items-center gap-3 px-6 py-3 rounded-xl transition-all hover:scale-105",
                    style: {
                      background: "#000",
                      border: "1.5px solid rgba(255,255,255,0.25)",
                      minWidth: 200,
                      boxShadow: "0 4px 16px rgba(0,0,0,0.5)"
                    },
                    children: [
                      /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", className: "w-7 h-7 flex-shrink-0", fill: "white", children: /* @__PURE__ */ jsx("path", { d: "M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" }) }),
                      /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-white text-xs leading-none", children: "Download on the" }),
                        /* @__PURE__ */ jsx("span", { className: "text-white font-bold text-base leading-tight", children: "App Store" })
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "inline-flex items-center gap-3 px-6 py-3 rounded-xl cursor-not-allowed",
                    style: {
                      background: "rgba(255,255,255,0.06)",
                      border: "1.5px solid rgba(255,255,255,0.12)",
                      minWidth: 200,
                      opacity: 0.6
                    },
                    children: [
                      /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", className: "w-7 h-7 flex-shrink-0", fill: "white", children: /* @__PURE__ */ jsx("path", { d: "M3.18 23.76c.3.17.64.24.99.2l12.6-7.27-2.72-2.72-10.87 9.79zm-1.9-20.7A1.97 1.97 0 0 0 1 4.5v15c0 .55.2 1.04.54 1.41l.08.07 8.4-8.4v-.2L1.28 3.06zm17.4 8.5-2.82-1.63-3.06 3.06 3.06 3.06 2.84-1.64c.81-.47.81-1.23-.02-1.85zM4.17.24C3.82.2 3.48.27 3.18.44L14.1 11.37l-2.72-2.72L4.17.24z" }) }),
                      /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-white text-xs leading-none", children: "Coming Soon to" }),
                        /* @__PURE__ */ jsx("span", { className: "text-white font-bold text-base leading-tight", children: "Google Play" })
                      ] })
                    ]
                  }
                )
              ] })
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx("section", { className: "py-14 px-6", style: { background: "#0a1630", borderTop: `1px solid ${GREEN}22` }, children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "text-4xl mb-5", children: "💬" }),
      /* @__PURE__ */ jsx("blockquote", { className: "text-white text-xl italic leading-relaxed mb-5 font-medium", children: `"I referred my neighbor and got a check in the mail two months later. Easiest $500 I've ever made."` }),
      /* @__PURE__ */ jsx("p", { className: "font-black text-sm tracking-wider", style: { color: GREEN }, children: "— Michael P., Fontana CA" })
    ] }) }),
    /* @__PURE__ */ jsx(
      "section",
      {
        className: "py-14 px-6 text-center",
        style: { background: `linear-gradient(135deg, ${GREEN_DARK} 0%, #14532d 100%)` },
        children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-4xl font-black text-white mb-3", children: "Don't Leave Money on the Table" }),
          /* @__PURE__ */ jsx("p", { className: "text-white text-lg mb-8 font-medium", children: "Every person you know with a high electric bill is a potential $2,000 in your pocket." }),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: REFERRAL_APP_URL,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "inline-flex items-center gap-3 font-black text-lg tracking-wider px-12 py-5 rounded-xl transition-all hover:scale-105",
              style: { background: "#fff", color: GREEN_DARK, boxShadow: "0 8px 32px rgba(0,0,0,0.3)" },
              children: "💰 START EARNING NOW →"
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const HERO_IMG$2 = "/manus-storage/solar-home-main-v2_0ad97127.jpg";
function ServiceWarranty() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white", style: { fontFamily: "'Inter', system-ui, sans-serif" }, children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("section", { className: "relative py-28 md:py-36", style: { backgroundImage: `url(${HERO_IMG$2})`, backgroundSize: "cover", backgroundPosition: "center" }, children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#0B1D51]/45" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-7xl mx-auto px-6 text-center", children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6", style: { fontFamily: "'Montserrat', sans-serif" }, children: [
          "Service & ",
          /* @__PURE__ */ jsx("span", { className: "text-[#2BABE2]", children: "Warranty" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-white/80 max-w-3xl mx-auto mb-8", children: "Every Pell Solar installation comes with comprehensive warranty coverage. We stand behind our work for 25 years — because we plan to be here for 25 more." }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [
          /* @__PURE__ */ jsx(Link, { href: "/get-quote", className: "btn-green text-lg px-8 py-4", children: "Get Your Free Quote" }),
          /* @__PURE__ */ jsxs("a", { href: "tel:8666468499", className: "text-white font-bold text-lg flex items-center gap-2 no-underline hover:text-[#FED44D] transition-colors", children: [
            /* @__PURE__ */ jsx(Phone, { size: 18 }),
            " (866) 646-8499"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx("div", { className: "text-center mb-14", children: /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-extrabold text-gray-900 mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: [
        "What's ",
        /* @__PURE__ */ jsx("span", { className: "text-[#2BABE2]", children: "Covered" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto", children: [
        { icon: Shield, title: "25-Year Panel Warranty", desc: "All panels we install come with a 25-year product warranty and a 25-year performance guarantee (minimum 80% output at year 25)." },
        { icon: Clock, title: "25-Year Inverter Warranty", desc: "Enphase microinverters include a 25-year warranty. SolarEdge and Tesla inverters carry 12–25 year coverage depending on model." },
        { icon: Wrench, title: "10-Year Workmanship", desc: "Our installation workmanship is warranted for 10 years. If anything related to our installation fails, we fix it at no cost." },
        { icon: Star, title: "25-Year Battery Warranty", desc: "Tesla Powerwall 3 comes with a 25-year warranty covering both the battery cells and the integrated inverter." },
        { icon: FileText, title: "Roof Penetration Warranty", desc: "Every roof penetration is flashed and sealed to manufacturer specifications. If a leak occurs due to our installation, we repair it — free." },
        { icon: CheckCircle, title: "Production Guarantee", desc: "Lease customers receive a 90% energy production guarantee. If your system underproduces, you're compensated for the difference." }
      ].map((card) => /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow", children: [
        /* @__PURE__ */ jsx(card.icon, { size: 28, className: "text-[#2BABE2] mb-4" }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900 mb-2", style: { fontFamily: "'Montserrat', sans-serif" }, children: card.title }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm leading-relaxed", children: card.desc })
      ] }, card.title)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx("div", { className: "text-center mb-14", children: /* @__PURE__ */ jsx("h2", { className: "text-3xl font-extrabold text-gray-900 mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Warranty at a Glance" }) }),
      /* @__PURE__ */ jsx("div", { className: "bg-white rounded-2xl border border-gray-200 overflow-hidden", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-[#0B1D51] text-white", children: [
          /* @__PURE__ */ jsx("th", { className: "text-left p-4 font-bold", children: "Component" }),
          /* @__PURE__ */ jsx("th", { className: "p-4 font-bold text-center", children: "Warranty" }),
          /* @__PURE__ */ jsx("th", { className: "p-4 font-bold text-center", children: "Coverage" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: [
          ["Solar Panels", "25 years", "Product defects + performance (80% at yr 25)"],
          ["Enphase Microinverters", "25 years", "Full replacement"],
          ["Tesla Powerwall 3", "25 years", "Battery + integrated inverter"],
          ["IronRidge Racking", "25 years", "Structural integrity"],
          ["Installation Workmanship", "10 years", "Labor + materials"],
          ["Roof Penetrations", "10 years", "Leak-free guarantee"],
          ["Production (Lease)", "25 years", "90% output guarantee"]
        ].map(([component, warranty, coverage], i) => /* @__PURE__ */ jsxs("tr", { className: i % 2 === 0 ? "bg-gray-50" : "bg-white", children: [
          /* @__PURE__ */ jsx("td", { className: "p-4 font-semibold text-gray-900", children: component }),
          /* @__PURE__ */ jsx("td", { className: "p-4 text-center text-[#2BABE2] font-bold", children: warranty }),
          /* @__PURE__ */ jsx("td", { className: "p-4 text-center text-gray-600", children: coverage })
        ] }, i)) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-[#0B1D51]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-14", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-white mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Need Service?" }),
        /* @__PURE__ */ jsx("p", { className: "text-white/70 text-lg max-w-2xl mx-auto", children: "If something isn't working right, here's how to get it fixed." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-8 max-w-4xl mx-auto", children: [
        { step: "1", title: "Contact Us", desc: "Call (866) 646-8499 or fill out our service request form. Describe the issue — error codes, low production, physical damage, etc." },
        { step: "2", title: "Diagnosis", desc: "We review your monitoring data remotely first. If an on-site visit is needed, we schedule it within 1–2 business days." },
        { step: "3", title: "Resolution", desc: "Warranty repairs are completed at no cost. Out-of-warranty repairs receive a clear, upfront quote before any work begins." }
      ].map((s) => /* @__PURE__ */ jsxs("div", { className: "bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/10", children: [
        /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-[#FED44D] text-[#0B1D51] font-black text-xl flex items-center justify-center mx-auto mb-4", children: s.step }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-2", children: s.title }),
        /* @__PURE__ */ jsx("p", { className: "text-white/70 text-sm leading-relaxed", children: s.desc })
      ] }, s.step)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-6 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-extrabold text-gray-900 mb-6", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Why Our Warranty Matters" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto mb-8", children: "A warranty is only as good as the company behind it. Pell Solar is a family-owned company with a physical office and California contractor license #949122. When you need service, our team is available to help." }),
      /* @__PURE__ */ jsxs(Link, { href: "/get-quote", className: "btn-green text-lg px-10 py-4 inline-flex items-center gap-2", children: [
        "Get Your Free Quote ",
        /* @__PURE__ */ jsx(ArrowRight, { size: 18 })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-[#0B1D51]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-white mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Questions About Your Warranty?" }),
      /* @__PURE__ */ jsx("p", { className: "text-white/70 text-lg mb-8 max-w-2xl mx-auto", children: "Call us anytime. We're happy to review your warranty coverage and answer any questions." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [
        /* @__PURE__ */ jsx(Link, { href: "/get-quote", className: "btn-gold text-lg px-10 py-4", children: "Schedule a Service Call" }),
        /* @__PURE__ */ jsxs("a", { href: "tel:8666468499", className: "text-white font-bold text-lg flex items-center gap-2 no-underline hover:text-[#FED44D] transition-colors", children: [
          /* @__PURE__ */ jsx(Phone, { size: 18, className: "text-[#FED44D]" }),
          " (866) 646-8499"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
function SolarLease() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white", style: { fontFamily: "'Inter', system-ui, sans-serif" }, children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs(
      "section",
      {
        className: "relative py-20 md:py-28 flex items-center justify-center bg-cover bg-center",
        style: { backgroundImage: "url('/manus-storage/solar-home-main-v2_0ad97127.jpg')" },
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#0B1D51]/60" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10 text-center px-4 max-w-3xl mx-auto", children: [
            /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-extrabold text-white mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: [
              "Your Home Deserves Solar Done",
              /* @__PURE__ */ jsx("br", {}),
              "by People Who ",
              /* @__PURE__ */ jsx("span", { className: "text-[#FED44D]", children: "Actually Care" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-white/90 text-lg mb-6", children: "We are not a national chain. We are a family business focused on helping homeowners evaluate solar and battery options for their properties." }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-4 mb-8 text-white/80 text-sm", children: [
              /* @__PURE__ */ jsx("span", { children: "● Tesla Certified Installer" }),
              /* @__PURE__ */ jsx("span", { children: "● 90% Referral Rate" }),
              /* @__PURE__ */ jsx("span", { children: "● $0 Down Available" })
            ] }),
            /* @__PURE__ */ jsx(Link, { href: "/get-quote", children: /* @__PURE__ */ jsx("span", { className: "inline-block bg-[#FED44D] text-[#0B1D51] font-extrabold py-4 px-10 rounded-full text-base uppercase tracking-wide cursor-pointer hover:bg-[#f5c800] transition-colors", children: "Get Your Free Quote" }) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-6 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-extrabold text-[#0B1D51] mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "The Federal Tax Credit Didn't Disappear — It Just Moved" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-lg leading-relaxed mb-4", children: "The 30% residential solar tax credit (25D) expired at the end of 2025. But through our lease program with LightReach by Palmetto, the tax credit still applies. Because the finance company owns the equipment and has safe-harbored all materials under the 48E commercial ITC, the savings are passed directly to you through a lower monthly rate." }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-lg leading-relaxed mb-4", children: "This means you still benefit from federal incentives — without filing anything on your taxes. It is built into the price of your lease." }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm italic", children: "Pell Solar does not provide tax advice. Consult your tax professional for your specific situation." })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 md:py-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx("div", { className: "text-center mb-4", children: /* @__PURE__ */ jsx("span", { className: "inline-block bg-[#2BABE2]/10 text-[#2BABE2] font-semibold px-4 py-1 rounded-full text-sm mb-4", children: "Choose Your Plan" }) }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-[#0B1D51] text-center mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Pell Solar Shield Packages" }),
      /* @__PURE__ */ jsx("p", { className: "text-center text-gray-600 text-lg max-w-3xl mx-auto mb-12", children: "Four options designed to fit your home and your goals. Solar Shield packages include panels, Tesla Powerwall 3, Smart Meter, and a 25-year warranty. NEM 3.0 Shield packages deliver peak-hour protection without solar panels." }),
      /* @__PURE__ */ jsx("div", { className: "mb-0", children: /* @__PURE__ */ jsx("div", { className: "inline-block bg-[#0B1D51] text-white text-xs font-bold px-3 py-1 rounded-t-lg", children: "Solar + Battery" }) }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#FED44D] rounded-b-xl rounded-tr-xl px-6 py-4 mb-6 flex items-center gap-4 shadow-md", children: [
        /* @__PURE__ */ jsx("div", { className: "shrink-0 w-10 h-10 rounded-full bg-[#0B1D51] flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "white", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("path", { d: "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" }) }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-extrabold text-[#0B1D51] text-base", style: { fontFamily: "'Montserrat', sans-serif" }, children: "30% Federal Tax Credit Still Applies" }),
          /* @__PURE__ */ jsx("div", { className: "text-[#0B1D51]/80 text-sm", children: "Because LightReach owns the equipment, the 30% ITC is built into your monthly rate — you benefit automatically, no tax filing needed." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8 mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border-2 border-[#2BABE2] shadow-lg p-8", children: [
          /* @__PURE__ */ jsx("div", { className: "inline-block bg-[#2BABE2]/10 text-[#2BABE2] text-xs font-bold px-3 py-1 rounded-full mb-4", children: "Solar Shield" }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-extrabold text-[#0B1D51] mb-1", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Solar Shield" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 mb-6", children: "For homes with SCE bills around $320/mo" }),
          /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
            /* @__PURE__ */ jsx("span", { className: "text-5xl font-extrabold text-[#2BABE2]", children: "$234" }),
            /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: " per month" })
          ] }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-3 mb-8", children: [
            "16 Solar Panels",
            "1 Tesla Powerwall 3 (13.5 kWh)",
            "1 Tesla Smart Meter",
            "Peak-hour grid protection (4–9pm)",
            "25-Year Full System Warranty",
            "25-Year Battery Warranty",
            "Professional Installation",
            "Permitting and Inspections",
            "24/7 Monitoring via Tesla App"
          ].map((item) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-gray-700", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[#2BABE2] font-bold shrink-0", children: "✓" }),
            item
          ] }, item)) }),
          /* @__PURE__ */ jsx(Link, { href: "/get-quote", children: /* @__PURE__ */ jsx("span", { className: "block text-center bg-[#2BABE2] hover:bg-[#1e96cc] text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors cursor-pointer", children: "Get Started" }) }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mt-3 text-center", children: "*Final system size and pricing based on site evaluation." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-8 relative", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FED44D] text-[#0B1D51] text-xs font-extrabold px-4 py-1 rounded-full", children: "Most Popular" }),
          /* @__PURE__ */ jsx("div", { className: "inline-block bg-[#0B1D51]/10 text-[#0B1D51] text-xs font-bold px-3 py-1 rounded-full mb-4", children: "Solar Shield+" }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-extrabold text-[#0B1D51] mb-1", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Solar Shield+" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 mb-6", children: "For homes with SCE bills around $580/mo" }),
          /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
            /* @__PURE__ */ jsx("span", { className: "text-5xl font-extrabold text-[#2BABE2]", children: "$307" }),
            /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: " per month" })
          ] }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-3 mb-8", children: [
            "32 Solar Panels",
            "1 Tesla Powerwall 3 (13.5 kWh)",
            "1 Tesla Smart Meter",
            "Peak-hour grid protection (4–9pm)",
            "25-Year Full System Warranty",
            "25-Year Battery Warranty",
            "Professional Installation",
            "Permitting and Inspections",
            "24/7 Monitoring via Tesla App"
          ].map((item) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-gray-700", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[#2BABE2] font-bold shrink-0", children: "✓" }),
            item
          ] }, item)) }),
          /* @__PURE__ */ jsx(Link, { href: "/get-quote", children: /* @__PURE__ */ jsx("span", { className: "block text-center bg-[#0B1D51] hover:bg-[#162d7a] text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors cursor-pointer", children: "Get Started" }) }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mt-3 text-center", children: "*Final system size and pricing based on site evaluation." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx("div", { className: "inline-block bg-gray-700 text-white text-xs font-bold px-3 py-1 rounded-t-lg", children: "NEM 3.0 Shield — Backup Power Only" }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-8", children: [
          /* @__PURE__ */ jsx("div", { className: "inline-block bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1 rounded-full mb-4", children: "NEM 3.0 Shield" }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-extrabold text-[#0B1D51] mb-1", style: { fontFamily: "'Montserrat', sans-serif" }, children: "NEM 3.0 Shield" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 mb-6", children: "1 Powerwall · avoid peak charges · 13.5 kWh" }),
          /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
            /* @__PURE__ */ jsx("span", { className: "text-5xl font-extrabold text-[#2BABE2]", children: "$142" }),
            /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: " per month" })
          ] }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-3 mb-8", children: [
            "1 Tesla Powerwall 3 (13.5 kWh)",
            "1 Tesla Smart Meter",
            "Peak-hour grid protection (4–9pm)",
            "25-Year Battery Warranty",
            "Professional Installation",
            "Permitting and Inspections",
            "24/7 Monitoring via Tesla App"
          ].map((item) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-gray-700", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[#2BABE2] font-bold shrink-0", children: "✓" }),
            item
          ] }, item)) }),
          /* @__PURE__ */ jsx(Link, { href: "/get-quote", children: /* @__PURE__ */ jsx("span", { className: "block text-center bg-[#2BABE2] hover:bg-[#1e96cc] text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors cursor-pointer", children: "Get Started" }) }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mt-3 text-center", children: "*Final system size and pricing based on site evaluation." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-8", children: [
          /* @__PURE__ */ jsx("div", { className: "inline-block bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1 rounded-full mb-4", children: "NEM 3.0 Shield+" }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-extrabold text-[#0B1D51] mb-1", style: { fontFamily: "'Montserrat', sans-serif" }, children: "NEM 3.0 Shield+" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 mb-6", children: "2 Powerwalls · extended coverage · 27 kWh" }),
          /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
            /* @__PURE__ */ jsx("span", { className: "text-5xl font-extrabold text-[#2BABE2]", children: "$208" }),
            /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: " per month" })
          ] }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-3 mb-8", children: [
            "2 Tesla Powerwall 3 (27 kWh total)",
            "1 Tesla Smart Meter",
            "Peak-hour grid protection (4–9pm)",
            "25-Year Battery Warranty",
            "Professional Installation",
            "Permitting and Inspections",
            "24/7 Monitoring via Tesla App"
          ].map((item) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-gray-700", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[#2BABE2] font-bold shrink-0", children: "✓" }),
            item
          ] }, item)) }),
          /* @__PURE__ */ jsx(Link, { href: "/get-quote", children: /* @__PURE__ */ jsx("span", { className: "block text-center bg-[#2BABE2] hover:bg-[#1e96cc] text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors cursor-pointer", children: "Get Started" }) }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mt-3 text-center", children: "*Final system size and pricing based on site evaluation." })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-[#2BABE2]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-6 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-4", children: "Get Started" }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-extrabold text-white mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Get Your Free Custom Solar Quote" }),
      /* @__PURE__ */ jsx("p", { className: "text-white/90 text-lg mb-6", children: "Answer a few quick questions and our team will build a custom solar lease package for your home." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
        /* @__PURE__ */ jsx(Link, { href: "/get-quote", children: /* @__PURE__ */ jsx("span", { className: "inline-block bg-[#FED44D] text-[#0B1D51] font-extrabold py-4 px-10 rounded-full text-base uppercase tracking-wide cursor-pointer hover:bg-[#f5c800] transition-colors", children: "No Cost • No Obligation" }) }),
        /* @__PURE__ */ jsx("a", { href: "tel:8666468499", className: "inline-block bg-white/20 text-white font-bold py-4 px-8 rounded-full text-base hover:bg-white/30 transition-colors", children: "Or Call Us 24/7 — (866) 646-8499" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 md:py-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx("div", { className: "text-center mb-4", children: /* @__PURE__ */ jsx("span", { className: "inline-block bg-[#2BABE2]/10 text-[#2BABE2] font-semibold px-4 py-1 rounded-full text-sm", children: "What You Get" }) }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-[#0B1D51] text-center mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Everything You Need — Installed and Covered" }),
      /* @__PURE__ */ jsx("p", { className: "text-center text-gray-600 text-lg mb-12", children: "Every Pell Solar lease package includes premium equipment, professional installation, and a full 25-year warranty. Nothing is left out." }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: [
        { icon: "☀️", title: "Solar Panels", desc: "High-efficiency panels sized to your home's energy usage and roof layout for maximum production." },
        { icon: "🔋", title: "Tesla Powerwall 3 Battery", desc: "13.5 kWh battery with integrated solar inverter for backup power and peak-hour bill savings." },
        { icon: "📊", title: "Tesla Smart Meter", desc: "Intelligent energy management that enables whole-home backup from a single Powerwall unit." },
        { icon: "📋", title: "Permitting and Inspections", desc: "We handle all permits, paperwork, utility coordination, and city inspections from start to finish." },
        { icon: "📱", title: "24/7 System Monitoring", desc: "Real-time monitoring through the Tesla app — solar production, battery levels, and home usage at your fingertips." },
        { icon: "🔧", title: "Maintenance for 25 Years", desc: "If anything breaks or underperforms, it is repaired or replaced at no cost to you for the life of the lease." }
      ].map((item) => /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow", children: [
        /* @__PURE__ */ jsx("div", { className: "text-3xl mb-3", children: item.icon }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-[#0B1D51] mb-2", children: item.title }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm leading-relaxed", children: item.desc })
      ] }, item.title)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 md:py-20 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx("div", { className: "text-center mb-4", children: /* @__PURE__ */ jsx("span", { className: "inline-block bg-green-100 text-green-700 font-semibold px-4 py-1 rounded-full text-sm", children: "Zero Surprises" }) }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-[#0B1D51] text-center mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "25 Years of Complete Protection" }),
      /* @__PURE__ */ jsx("p", { className: "text-center text-gray-600 text-lg mb-12", children: "Your lease covers everything for the full 25-year term. If anything goes wrong, we fix it — at no cost to you. No deductibles. No fine print surprises." }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-8", children: [
        { years: "25", label: "Year", title: "System Warranty", desc: "Every component — panels, wiring, racking, inverter — is covered for the full life of the lease." },
        { years: "25", label: "Year", title: "Battery Warranty", desc: "Your Tesla Powerwall 3 is warranted for 25 years — that is 15 years beyond Tesla's standard warranty." },
        { years: "25", label: "Year", title: "Maintenance Included", desc: "Monitoring, repairs, and replacements are included at no extra cost for the entire lease term." }
      ].map((item) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border border-gray-200 p-8 text-center shadow-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "text-5xl font-extrabold text-[#2BABE2] leading-none", children: item.years }),
        /* @__PURE__ */ jsx("div", { className: "text-gray-500 text-sm mb-4", children: item.label }),
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-[#0B1D51] mb-3", children: item.title }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm leading-relaxed", children: item.desc })
      ] }, item.title)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 md:py-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx("div", { className: "text-center mb-4", children: /* @__PURE__ */ jsx("span", { className: "inline-block bg-[#2BABE2]/10 text-[#2BABE2] font-semibold px-4 py-1 rounded-full text-sm", children: "How It Works" }) }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-[#0B1D51] text-center mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Four Simple Steps to Solar" }),
      /* @__PURE__ */ jsx("p", { className: "text-center text-gray-600 text-lg mb-12", children: "From your first call to flipping the switch, we handle everything. Most systems are installed within a few weeks." }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-8", children: [
        { n: 1, title: "Free Consultation", desc: "We review your utility bill, assess your roof, and recommend the right system size for your home." },
        { n: 2, title: "Custom System Design", desc: "Our team designs a system using Lidar-based measurements tailored to your roof and energy needs." },
        { n: 3, title: "Professional Installation", desc: "Pell Solar handles permitting, inspections, and installation for your project." },
        { n: 4, title: "Start Saving", desc: "Your system goes live and you begin saving immediately. Monitor everything from the Tesla app." }
      ].map((step) => /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-full bg-[#2BABE2] text-white font-extrabold text-2xl flex items-center justify-center mx-auto mb-4", children: step.n }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-[#0B1D51] mb-2", children: step.title }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm leading-relaxed", children: step.desc })
      ] }, step.n)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-[#0B1D51]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx("div", { className: "text-center mb-4", children: /* @__PURE__ */ jsx("span", { className: "inline-block bg-white/10 text-white font-semibold px-4 py-1 rounded-full text-sm", children: "Why Families Choose Pell Solar" }) }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-extrabold text-white text-center mb-8", style: { fontFamily: "'Montserrat', sans-serif" }, children: "A Local Team, One Rooftop at a Time" }),
      /* @__PURE__ */ jsx("p", { className: "text-white/80 text-lg text-center mb-6", children: "Pell Solar is a family-owned company serving Southern California and Idaho with solar and battery solutions designed for each home." }),
      /* @__PURE__ */ jsx("p", { className: "text-[#2BABE2] text-center font-semibold mb-6", children: "Tesla Certified Installer — We are one of the select companies authorized by Tesla to install Powerwall systems." }),
      /* @__PURE__ */ jsx("p", { className: "text-white/70 text-center mb-8", children: "No pressure, no gimmicks. We give you an honest assessment, a fair price, and a system that is built to last 25 years." }),
      /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx(Link, { href: "/get-quote", children: /* @__PURE__ */ jsx("span", { className: "inline-block bg-[#FED44D] text-[#0B1D51] font-extrabold py-4 px-10 rounded-full text-base uppercase tracking-wide cursor-pointer hover:bg-[#f5c800] transition-colors", children: "Get Your Free Quote" }) }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-6 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "inline-block bg-red-100 text-red-700 font-semibold px-4 py-1 rounded-full text-sm mb-4", children: "Limited Availability" }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-extrabold text-[#0B1D51] mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Ready to Stop Overpaying for Electricity?" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg mb-8", children: "Explore solar and battery options with Pell Solar. As a Tesla Certified Installer, we support your project from design through ongoing support." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-4 mb-8 text-[#0B1D51] font-semibold", children: [
        /* @__PURE__ */ jsx("span", { children: "✓ $0 Down" }),
        /* @__PURE__ */ jsx("span", { children: "✓ 25-Year Warranty" }),
        /* @__PURE__ */ jsx("span", { children: "✓ Tesla Certified" }),
        /* @__PURE__ */ jsx("span", { children: "✓ Family-Owned Solar Company" })
      ] }),
      /* @__PURE__ */ jsx(Link, { href: "/get-quote", children: /* @__PURE__ */ jsx("span", { className: "inline-block bg-[#FED44D] text-[#0B1D51] font-extrabold py-4 px-10 rounded-full text-base uppercase tracking-wide cursor-pointer hover:bg-[#f5c800] transition-colors", children: "Get Your Free Quote" }) })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const HERO_IMG$1 = "/manus-storage/california-home_f656624c.jpg";
const jumpLinks = [
  { id: "what-changed", label: "What Changed?" },
  { id: "solar-battery", label: "How Solar + Battery Works" },
  { id: "existing-solar", label: "Already Have Solar?" },
  { id: "true-up", label: "True-Up Over $4,000?" }
];
function NEM30() {
  const [activeSection, setActiveSection] = useState("what-changed");
  const scrollTo = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white", style: { fontFamily: "'Inter', system-ui, sans-serif" }, children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs(
      "section",
      {
        className: "relative min-h-[520px] flex items-center justify-center text-center",
        style: { backgroundImage: `url(${HERO_IMG$1})`, backgroundSize: "cover", backgroundPosition: "center" },
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#0B1D51]/45" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-4xl mx-auto px-6 py-24", children: [
            /* @__PURE__ */ jsxs(
              "h1",
              {
                className: "text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6",
                style: { fontFamily: "'Montserrat', sans-serif" },
                children: [
                  "NEM 3.0: ",
                  /* @__PURE__ */ jsx("span", { style: { color: "#FED44D" }, children: "Solar Still Works." }),
                  /* @__PURE__ */ jsx("br", {}),
                  "Here's How."
                ]
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl text-white/85 mb-10 max-w-3xl mx-auto leading-relaxed", children: "California updated its solar billing program in 2023. There's been a lot of confusion about what it means for homeowners. The truth is simple: with the right system, homeowners can still offset nearly all of their electricity costs. Let us show you how." }),
            /* @__PURE__ */ jsx(
              Link,
              {
                href: "/get-quote",
                className: "inline-block font-bold text-lg px-10 py-4 rounded-full no-underline transition-all shadow-xl",
                style: { background: "#FED44D", color: "#0B1D51" },
                children: "GET A FREE CONSULTATION"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-3 mt-10", children: jumpLinks.map((j) => /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => scrollTo(j.id),
                className: "px-5 py-2.5 rounded-full text-sm font-semibold border transition-all",
                style: {
                  background: activeSection === j.id ? "rgba(254,212,77,0.2)" : "rgba(255,255,255,0.1)",
                  borderColor: activeSection === j.id ? "#FED44D" : "rgba(255,255,255,0.3)",
                  color: activeSection === j.id ? "#FED44D" : "white"
                },
                children: j.label
              },
              j.id
            )) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx("section", { id: "what-changed", className: "py-20 bg-white scroll-mt-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx(
        "h2",
        {
          className: "text-3xl md:text-4xl font-extrabold text-gray-900 mb-6",
          style: { fontFamily: "'Montserrat', sans-serif" },
          children: "First, Let's Clear Up the Confusion"
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-lg leading-relaxed mb-4", children: "Net Energy Metering (NEM) is the billing program from Southern California Edison that determines how you're credited when your solar panels produce more electricity than your home uses." }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-lg leading-relaxed mb-4", children: "During the day, your panels make power. Whatever your home doesn't use goes back to Edison's grid, and you get a credit on your bill. That credit is what helps shrink your monthly payment." }),
      /* @__PURE__ */ jsx("blockquote", { className: "border-l-4 border-[#2BABE2] pl-6 py-2 my-8 bg-blue-50 rounded-r-xl", children: /* @__PURE__ */ jsxs("p", { className: "text-gray-800 text-lg font-medium italic", children: [
        "The question everyone asks: ",
        /* @__PURE__ */ jsx("em", { children: '"Is solar still worth it under NEM 3.0?"' }),
        /* @__PURE__ */ jsx("br", {}),
        "The answer is ",
        /* @__PURE__ */ jsx("strong", { children: "yes" }),
        " — when your system is designed the right way."
      ] }) }),
      /* @__PURE__ */ jsx(
        "h3",
        {
          className: "text-2xl font-extrabold text-gray-900 mt-12 mb-8",
          style: { fontFamily: "'Montserrat', sans-serif" },
          children: "How We Got Here"
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-8", children: "California's solar billing has gone through three versions. Here's a quick breakdown." }),
      /* @__PURE__ */ jsxs("div", { className: "relative pl-2", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute left-[27px] top-8 bottom-8 w-1 rounded-full", style: { background: "linear-gradient(to bottom, #22c55e, #2BABE2, #FED44D)" } }),
        [
          {
            badge: "Original Program",
            title: "NEM 1.0",
            text: "The first net metering program. Homeowners got a full one-to-one credit for every kilowatt-hour of solar energy sent back to the grid. Solar panels alone could offset nearly all of your electric bill. Homeowners on NEM 1.0 are still grandfathered in today.",
            color: "#22c55e",
            textColor: "#fff",
            year: "2001",
            label: "Grandfathered"
          },
          {
            badge: "Updated Program",
            title: "NEM 2.0",
            text: "Very similar to NEM 1.0. Credits were still close to one-to-one, with small fees added. Solar panels alone still worked great to offset your bill. This was the program available until April 2023. Homeowners on NEM 2.0 are grandfathered in for 20 years.",
            color: "#2BABE2",
            textColor: "#fff",
            year: "2016",
            label: "Grandfathered"
          },
          {
            badge: "April 2023 — Present",
            title: "NEM 3.0 (Current Program)",
            text: "The credit for sending solar energy back to the grid was reduced. But here's the important part: by pairing solar with a battery, homeowners store their energy and use it during Edison's most expensive hours (4–9 PM) instead of sending it to the grid. The result? You can still offset nearly all of your electricity costs.",
            color: "#FED44D",
            textColor: "#0B1D51",
            year: "2023",
            label: "Current"
          }
        ].map((item) => /* @__PURE__ */ jsxs("div", { className: "relative flex gap-6 mb-10 last:mb-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex-shrink-0 flex flex-col items-center gap-1", style: { width: 56 }, children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "w-14 h-14 rounded-full flex flex-col items-center justify-center font-extrabold shadow-lg border-4 border-white",
                style: { background: item.color, color: item.textColor, fontFamily: "'Montserrat', sans-serif" },
                children: /* @__PURE__ */ jsx("span", { className: "text-[11px] leading-none font-black", children: item.year })
              }
            ),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: "text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full",
                style: { background: item.color + "25", color: item.color },
                children: item.label
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 bg-gray-50 rounded-2xl p-8 border-2 shadow-sm", style: { borderColor: item.color + "40" }, children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3",
                style: { background: item.color + "20", color: item.color, border: `1px solid ${item.color}60` },
                children: item.badge
              }
            ),
            /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-gray-900 mb-3", style: { fontFamily: "'Montserrat', sans-serif" }, children: item.title }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 leading-relaxed", children: item.text })
          ] })
        ] }, item.title))
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "solar-battery", className: "py-20 bg-[#0B1D51] scroll-mt-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-14", children: [
        /* @__PURE__ */ jsxs(
          "h2",
          {
            className: "text-3xl md:text-4xl font-extrabold text-white mb-4",
            style: { fontFamily: "'Montserrat', sans-serif" },
            children: [
              "How Solar + Battery ",
              /* @__PURE__ */ jsx("span", { style: { color: "#FED44D" }, children: "Gets It Done" })
            ]
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "text-white/70 text-lg max-w-3xl mx-auto", children: "Under NEM 3.0, the winning strategy is keeping your solar energy instead of giving it to Edison. A battery makes that possible." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8 mb-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-2xl p-8 border border-white/10", children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs font-bold uppercase tracking-wider text-red-400 mb-3", children: "The Old Way" }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Send Energy to Edison, Get a Credit" }),
          /* @__PURE__ */ jsx("p", { className: "text-white/70 leading-relaxed", children: "Under the old programs, your panels made energy during the day and you sent the extra to the grid. Edison gave you a full credit. That worked great. Under NEM 3.0, that credit is lower — so this approach alone doesn't go as far." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-2xl p-8 border border-[#FED44D]/30", children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs font-bold uppercase tracking-wider mb-3", style: { color: "#FED44D" }, children: "The Smart Way" }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Store Your Energy, Use It When It Counts" }),
          /* @__PURE__ */ jsxs("p", { className: "text-white/70 leading-relaxed", children: [
            "With a battery, you keep your solar energy and use it between ",
            /* @__PURE__ */ jsx("strong", { className: "text-white", children: "4 PM and 9 PM" }),
            " — when Edison charges the most. You're not relying on credits from the grid. You're powering your home with your own stored energy for free. ",
            /* @__PURE__ */ jsx("strong", { className: "text-white", children: "That's how you take control of your bill." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6 mb-14", children: [
        { num: "1", icon: "☀️", title: "Panels Make Power", desc: "Your solar panels generate energy during the day while the sun is shining." },
        { num: "2", icon: "🔋", title: "Battery Stores It", desc: "Instead of sending extra power to Edison, your battery stores it for later." },
        { num: "3", icon: "⚡", title: "Discharge 4–9 PM", desc: "During peak hours your home runs on stored battery power, not the grid." },
        { num: "4", icon: "🏠", title: "Full Backup Power", desc: "If the grid goes down, your Powerwall keeps your entire home running." }
      ].map((step) => /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-black",
            style: { background: "#FED44D", color: "#0B1D51" },
            children: step.num
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "text-3xl mb-3", children: step.icon }),
        /* @__PURE__ */ jsx("h4", { className: "text-white font-bold text-sm mb-2", style: { fontFamily: "'Montserrat', sans-serif" }, children: step.title }),
        /* @__PURE__ */ jsx("p", { className: "text-white/60 text-xs leading-relaxed", children: step.desc })
      ] }, step.num)) }),
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-extrabold text-white mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Ready to Take Control of Your Electric Bill?" }),
        /* @__PURE__ */ jsx("p", { className: "text-white/70 mb-8", children: "We design every system to maximize your savings under NEM 3.0. Let us show you what's possible for your home." }),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: "/get-quote",
            className: "inline-block font-bold text-lg px-10 py-4 rounded-full no-underline transition-all",
            style: { background: "#FED44D", color: "#0B1D51" },
            children: "GET A FREE CONSULTATION"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "existing-solar", className: "py-20 bg-white scroll-mt-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx(
        "h2",
        {
          className: "text-3xl md:text-4xl font-extrabold text-gray-900 mb-6",
          style: { fontFamily: "'Montserrat', sans-serif" },
          children: "Already Have Solar on Your Home?"
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-lg leading-relaxed mb-4", children: "If you have an existing solar system — whether you installed it or it came with the house — you're likely on NEM 1.0 or NEM 2.0. That means you're grandfathered into the better credit rates for 20 years. That's great news." }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-lg leading-relaxed mb-4", children: "But maybe your true-up bill has gone up over the years, and you're wondering why. Here's what happened: Edison changed when peak hours are." }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-lg leading-relaxed mb-4", children: "When many existing solar systems were first installed, Edison's peak hours were during the daytime — when your panels were generating the most power. Your system was producing electricity during the most expensive hours, and with one-to-one credits, everything balanced out perfectly." }),
      /* @__PURE__ */ jsxs("p", { className: "text-gray-700 text-lg leading-relaxed mb-8", children: [
        "Then Edison shifted peak hours to ",
        /* @__PURE__ */ jsx("strong", { children: "4 PM to 9 PM" }),
        " — evening hours when the sun is going down or already gone. Your panels aren't producing during that window, but that's when Edison charges the most. So now you're buying expensive electricity in the evening that your solar system can't offset. That's where the true-up bill comes from."
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-gray-700 text-lg leading-relaxed mb-8", children: [
        "A battery fixes this. It stores your solar energy during the day and discharges it during those peak evening hours — the exact hours that are causing your true-up bill. And ",
        /* @__PURE__ */ jsx("strong", { children: "adding a battery does not change your NEM status." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-10", children: /* @__PURE__ */ jsxs("p", { className: "text-gray-700 text-sm leading-relaxed", children: [
        /* @__PURE__ */ jsx("strong", { children: "A quick note:" }),
        " Even with the best solar and battery system, Edison will still charge a small monthly amount for service fees, taxes, and non-bypassable charges (NBCs). Every Edison customer pays these — they can't be avoided with solar. But we're talking about a minimal amount compared to what you're paying now."
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-8 mb-10", children: [
        {
          count: "1 Tesla Powerwall 3",
          amount: "$1,800",
          desc: "true-up bill? One battery can offset it.",
          body: "If Edison is sending you a true-up bill of around $1,800 per year, adding one Powerwall can offset that true-up. It charges from your solar during the day and discharges during peak hours (4–9 PM) — covering the exact gap that's causing your true-up."
        },
        {
          count: "2 Tesla Powerwall 3",
          amount: "$3,500",
          desc: "true-up bill? Two batteries can offset it.",
          body: "If your true-up bill from Edison is around $3,500 per year, two Powerwalls give you enough storage capacity to cover that higher usage. Both batteries charge from your existing solar and discharge during peak hours — offsetting your true-up."
        }
      ].map((card) => /* @__PURE__ */ jsxs("div", { className: "bg-[#0B1D51] rounded-2xl p-8 text-white", children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm font-bold text-white/60 uppercase tracking-wider mb-2", children: card.count }),
        /* @__PURE__ */ jsx("div", { className: "text-4xl font-black mb-1", style: { color: "#FED44D" }, children: card.amount }),
        /* @__PURE__ */ jsx("div", { className: "text-white font-semibold mb-4", children: card.desc }),
        /* @__PURE__ */ jsx("p", { className: "text-white/70 text-sm leading-relaxed", children: card.body })
      ] }, card.count)) }),
      /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-2xl p-8 border border-gray-200 mb-10", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-900 mb-6", style: { fontFamily: "'Montserrat', sans-serif" }, children: "What You Can and Can't Add" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsx(CheckCircle, { size: 22, className: "text-green-500 mt-0.5 flex-shrink-0" }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-700", children: [
              /* @__PURE__ */ jsx("strong", { children: "Adding a battery keeps your NEM status." }),
              " You can add a Tesla Powerwall to your existing system and stay on NEM 1.0 or NEM 2.0. Your grandfathered rate is not affected. This is the smartest upgrade available to you right now."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsx(XCircle, { size: 22, className: "text-red-500 mt-0.5 flex-shrink-0" }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-700", children: [
              /* @__PURE__ */ jsx("strong", { children: "Adding solar panels beyond 1 kW or 10% of your system moves you to NEM 3.0." }),
              " If you're thinking about expanding your panels, talk to us first so we can walk through your options and make sure you don't lose your favorable rate."
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx(
        Link,
        {
          href: "/get-quote",
          className: "inline-block font-bold text-lg px-10 py-4 rounded-full no-underline transition-all",
          style: { background: "#2BABE2", color: "white" },
          children: "GET A FREE BATTERY ESTIMATE"
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "true-up", className: "py-20 bg-gray-50 scroll-mt-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx(
        "h2",
        {
          className: "text-3xl md:text-4xl font-extrabold text-gray-900 mb-6",
          style: { fontFamily: "'Montserrat', sans-serif" },
          children: "What If My True-Up Bill Is Over $4,000?"
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-lg leading-relaxed mb-6", children: "When a true-up bill climbs above $4,000 per year, it usually means your home is using more electricity than your current solar system was designed to produce. The batteries help with the peak-hour problem, but if your existing panels simply aren't generating enough energy to keep up with your total usage, batteries alone can't close that gap — there's not enough solar energy during the day to fully charge them and cover everything your home needs." }),
      /* @__PURE__ */ jsxs("p", { className: "text-gray-700 text-lg leading-relaxed mb-10", children: [
        /* @__PURE__ */ jsx("strong", { children: "The good news:" }),
        " we can still drastically reduce your electric bill. It means we need to add solar panels along with batteries. Yes, adding panels will move your system to NEM 3.0 — but when the system is designed correctly with both solar and battery storage, NEM 3.0 still works and you can offset nearly all of your electricity costs."
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-extrabold text-gray-900 mb-8", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Here's How We Design It Right" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-6 mb-12", children: [
        { num: "1", title: "We identify your existing system.", desc: "We find out exactly what solar panels and inverter you have, which tells us how much energy your current system produces in a year." },
        { num: "2", title: "We pull your SCE Green Button data.", desc: "This is the detailed usage data from your Edison account. Combined with your utility bill, it shows us exactly how much energy your home uses and when you're using the most." },
        { num: "3", title: "We calculate the gap.", desc: "By comparing what your current solar produces vs. what your home actually uses, we know exactly how much additional solar and battery storage you need." },
        { num: "4", title: "We build a system that covers 100% of your usage.", desc: "The new solar panels produce exactly what you need, the batteries charge during the day and discharge during peak hours (4–9 PM), and your electricity costs drop to just the minimum service fees and taxes that Edison charges every customer — even on NEM 3.0." }
      ].map((step) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-6 bg-white rounded-2xl p-6 border border-gray-200", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-black text-lg",
            style: { background: "#FED44D", color: "#0B1D51" },
            children: step.num
          }
        ),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("strong", { className: "text-gray-900", children: step.title }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-1 leading-relaxed", children: step.desc })
        ] })
      ] }, step.num)) }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg leading-relaxed mb-10", children: "Every situation is different, and that's why a proper consultation matters. We'll look at your current system, your Edison bill, and your usage data to give you a clear picture of exactly what it takes to offset your electricity costs — whether that's batteries only or a full solar + battery upgrade." }),
      /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx(
        Link,
        {
          href: "/get-quote",
          className: "inline-block font-bold text-lg px-10 py-4 rounded-full no-underline transition-all",
          style: { background: "#FED44D", color: "#0B1D51" },
          children: "GET MY FREE SYSTEM ESTIMATE"
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-[#0B1D51]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6 text-center", children: [
      /* @__PURE__ */ jsxs(
        "h2",
        {
          className: "text-3xl md:text-4xl font-extrabold text-white mb-6",
          style: { fontFamily: "'Montserrat', sans-serif" },
          children: [
            "Every System Includes ",
            /* @__PURE__ */ jsx("span", { style: { color: "#FED44D" }, children: "Whole-Home Backup" })
          ]
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "text-white/80 text-lg leading-relaxed mb-10 max-w-3xl mx-auto", children: "A battery doesn't just save you money — it protects your family. When the grid goes down, your Tesla Powerwall kicks in instantly and keeps your entire home powered with no interruption." }),
      /* @__PURE__ */ jsx("p", { className: "text-white/70 text-lg leading-relaxed mb-12 max-w-3xl mx-auto", children: "With power shutoffs, extreme heat events, and wildfire season becoming the new normal in Southern California, backup power gives you one less thing to worry about." }),
      /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12", children: [
        { icon: "⚡", text: "Instant switchover — no delay when the grid goes down" },
        { icon: "🏠", text: "Powers your entire home — lights, fridge, AC, everything" },
        { icon: "📱", text: "Monitor everything from the Tesla app on your phone" },
        { icon: "✅", text: "Tesla Certified Installation by Pell Solar" }
      ].map((item) => /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-6 border border-white/10", children: [
        /* @__PURE__ */ jsx("div", { className: "text-3xl mb-4", children: item.icon }),
        /* @__PURE__ */ jsx("p", { className: "text-white/80 text-sm leading-relaxed", children: item.text })
      ] }, item.text)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto px-6 text-center", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-extrabold text-gray-900 mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: [
        "Let's Talk About ",
        /* @__PURE__ */ jsx("em", { children: "Your" }),
        " Home"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg mb-10", children: "Whether you're going solar for the first time or adding a battery to an existing system, we'll walk you through your options. No pressure, no jargon." }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#0B1D51] rounded-2xl p-8 shadow-2xl", children: [
        /* @__PURE__ */ jsx("div", { className: "text-xs font-bold uppercase tracking-widest text-white/50 mb-2", children: "No Cost · No Obligation" }),
        /* @__PURE__ */ jsxs("h3", { className: "text-2xl font-extrabold text-white mb-6", style: { fontFamily: "'Montserrat', sans-serif" }, children: [
          "How Much Can ",
          /* @__PURE__ */ jsx("span", { style: { color: "#FED44D" }, children: "You" }),
          " Save?"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 mb-6", children: [
          /* @__PURE__ */ jsxs(
            Link,
            {
              href: "/get-quote?ownership=own",
              className: "flex flex-col items-center justify-center gap-2 p-5 rounded-xl font-bold text-sm no-underline transition-all",
              style: { background: "#FED44D", color: "#0B1D51" },
              children: [
                /* @__PURE__ */ jsx("span", { className: "text-2xl", children: "🏠" }),
                "I OWN MY HOME"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            Link,
            {
              href: "/get-quote?ownership=rent",
              className: "flex flex-col items-center justify-center gap-2 p-5 rounded-xl font-bold text-sm no-underline transition-all",
              style: { background: "#2BABE2", color: "white" },
              children: [
                /* @__PURE__ */ jsx("span", { className: "text-2xl", children: "🏢" }),
                "I'M RENTING"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-white/50 text-sm", children: "Or Call Us 24/7 — Free Consultation" }),
        /* @__PURE__ */ jsx("a", { href: "tel:8666468499", className: "text-[#2BABE2] font-bold text-lg no-underline hover:text-white transition-colors", children: "(866) 646-8499" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const DARK_IMG = "/manus-storage/house-lights-off_9abbe8c2.png";
const LIT_IMG = "/manus-storage/house-lights-on_522fe704.png";
function SolarDemo() {
  const initialized = useRef(false);
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const style = document.createElement("style");
    style.id = "solar-demo-styles";
    style.textContent = `
      :root {
        --solar: #F4A623;
        --battery: #44D7B6;
        --ev: #6C8EEF;
        --home: #FF7849;
        --peak-red: #EF4444;
        --offpeak-green: #22C55E;
        --bg: #060A12;
        --card: #0E1528;
        --card-b: rgba(255,255,255,0.05);
        --text: #E2E8F0;
        --dim: #94A3B8;
        --white: #F8FAFC;
      }
      #ps-solar-demo-page {
        background: var(--bg);
        color: var(--text);
        font-family: 'Inter', sans-serif;
        min-height: 100vh;
        padding: 0;
      }
      .hiw-hero {
        background: linear-gradient(135deg, #0a0f1e 0%, #0d1a2e 50%, #0a1520 100%);
        padding: 48px 24px 36px;
        text-align: center;
        border-bottom: 1px solid rgba(255,255,255,0.06);
      }
      .hiw-hero-inner { max-width: 760px; margin: 0 auto; }
      .hiw-badge {
        display: inline-flex; align-items: center; gap: 8px;
        background: rgba(244,166,35,0.1); border: 1px solid rgba(244,166,35,0.25);
        border-radius: 20px; padding: 5px 14px; font-size: 0.72rem; font-weight: 600;
        letter-spacing: 0.08em; color: var(--solar); margin-bottom: 18px;
      }
      .hiw-badge-dot {
        width: 7px; height: 7px; border-radius: 50%;
        background: var(--solar); box-shadow: 0 0 8px var(--solar);
        animation: pulse-dot 2s ease-in-out infinite;
      }
      @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(0.85)} }
      .hiw-hero h1 { font-size: clamp(1.8rem, 4vw, 2.6rem); font-weight: 800; line-height: 1.15; margin-bottom: 14px; color: #fff; }
      .hiw-hero h1 span { color: var(--solar); }
      .hiw-hero-p { color: var(--dim); font-size: 1rem; line-height: 1.65; max-width: 600px; margin: 0 auto 20px; }
      .hiw-hero-tags { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
      .hiw-tag {
        display: flex; align-items: center; gap: 5px; padding: 6px 14px;
        background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
        border-radius: 20px; font-size: 0.78rem; color: var(--text);
      }
      .sol-demo-section { padding: 32px 24px 48px; }
      .sol-demo-section .wrap { max-width: 900px; margin: 0 auto; }
      .scene {
        position: relative; width: 100%; border-radius: 16px; overflow: hidden;
        border: 1px solid var(--card-b); background: #050505; margin-bottom: 14px;
      }
      .scene img { width: 100%; display: block; }
      .scene img.dark { position: relative; z-index: 1; transition: filter 1.5s ease; }
      .scene img.lit { position: absolute; top: 0; left: 0; z-index: 2; opacity: 0; transition: opacity 1.5s ease; }
      .scene img.lit.on { opacity: 1; }
      .sky-ov {
        position: absolute; top: 0; left: 0; width: 100%; height: 50%;
        pointer-events: none; z-index: 3; transition: all 1.5s; opacity: 0;
      }
      .sky-ov.sky-day { opacity: 1; background: linear-gradient(180deg, rgba(150,210,255,0.7) 0%, rgba(220,240,255,0.4) 40%, rgba(255,248,220,0.15) 70%, transparent 100%); }
      .sky-ov.sky-eve { opacity: 1; background: linear-gradient(180deg, rgba(255,140,50,0.15) 0%, rgba(200,100,60,0.08) 40%, transparent 100%); }
      .sky-ov.sky-night { opacity: 1; background: linear-gradient(180deg, rgba(10,10,30,0.4) 0%, rgba(10,10,30,0.15) 50%, transparent 100%); }
      .sky-ov.sky-blackout { opacity: 1; background: linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 50%, transparent 100%); }
      .sun {
        position: absolute; top: 0%; right: 11%; width: 100px; height: 100px;
        z-index: 4; pointer-events: none; opacity: 0; transition: opacity 1.2s;
      }
      .sun.vis { opacity: 1; }
      .sun-inner {
        width: 100%; height: 100%; border-radius: 50%;
        background: radial-gradient(circle, #FFFDE7 0%, #FFD54F 25%, #F4A623 55%, rgba(244,166,35,0) 100%);
        animation: sunb 4s ease-in-out infinite;
      }
      .sun::after {
        content: ''; position: absolute; inset: -80px; border-radius: 50%;
        background: radial-gradient(circle, rgba(255,250,200,0.45) 0%, rgba(255,230,120,0.2) 40%, transparent 65%);
      }
      @keyframes sunb { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }
      .moon {
        position: absolute; top: 4%; left: 14%; width: 36px; height: 36px;
        z-index: 4; pointer-events: none; opacity: 0; transition: opacity 1.2s;
      }
      .moon.vis { opacity: 1; }
      .moon-c {
        width: 100%; height: 100%; border-radius: 50%;
        background: radial-gradient(circle at 35% 35%, #EAEAEA 0%, #C8C8C8 50%, #999 100%);
        box-shadow: 0 0 25px rgba(200,215,240,0.3);
      }
      .moon-sh {
        position: absolute; top: -2px; right: -1px; width: 28px; height: 28px;
        border-radius: 50%; background: rgba(6,10,18,0.88);
      }
      .stars {
        position: absolute; top: 0; left: 0; width: 100%; height: 45%;
        z-index: 3; pointer-events: none; opacity: 0; transition: opacity 1.2s;
      }
      .stars.vis { opacity: 1; }
      .st {
        position: absolute; width: 1.5px; height: 1.5px; background: #fff;
        border-radius: 50%; animation: tw 3s ease-in-out infinite;
      }
      @keyframes tw { 0%,100%{opacity:0.1} 50%{opacity:0.6} }
      .tbadge {
        position: absolute; top: 12px; left: 12px; z-index: 15;
        padding: 6px 14px; border-radius: 8px; background: rgba(0,0,0,0.82);
        backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.1);
        font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; font-weight: 500;
        display: flex; align-items: center; gap: 8px; opacity: 0; transition: opacity 0.5s;
      }
      .tbadge.on { opacity: 1; }
      .tbd { width: 7px; height: 7px; border-radius: 50%; }
      .tbd-off { background: var(--offpeak-green); box-shadow: 0 0 6px var(--offpeak-green); }
      .tbd-pk { background: var(--peak-red); box-shadow: 0 0 6px var(--peak-red); }
      .tbd-all { background: var(--ev); box-shadow: 0 0 6px var(--ev); }
      .tbd-em { background: #EF4444; box-shadow: 0 0 6px #EF4444; animation: pulse-em 1s ease-in-out infinite; }
      @keyframes pulse-em { 0%,100%{opacity:1} 50%{opacity:0.4} }
      .evp {
        position: absolute; top: 58%; left: 78%; width: 2.5%; height: 3%;
        border-radius: 50%; background: radial-gradient(circle, rgba(108,142,239,0.8) 0%, transparent 80%);
        box-shadow: 0 0 14px var(--ev); pointer-events: none; opacity: 0;
        transition: opacity 0.7s; z-index: 5;
      }
      .evp.on { opacity: 1; }
      .msg-ov {
        position: absolute; bottom: 3%; left: 50%; transform: translateX(-50%); z-index: 12;
        padding: 14px 24px; border-radius: 12px; background: rgba(0,0,0,0.85);
        backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.12);
        max-width: 88%; width: auto; text-align: center;
        opacity: 0; transition: opacity 0.6s; pointer-events: none;
      }
      .msg-ov.on { opacity: 1; }
      .msg-ov .mt {
        font-size: 0.9rem; font-weight: 700; color: #fff; margin-bottom: 5px;
        display: flex; align-items: center; justify-content: center; gap: 8px;
      }
      .msg-ov .mt .md { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
      .msg-ov .mb { font-size: 0.78rem; color: #CBD5E1; line-height: 1.6; }
      .msg-ov .mb strong { color: #fff; font-weight: 600; }
      .prog-bar {
        position: absolute; bottom: 0; left: 0; width: 100%; height: 3px;
        z-index: 13; background: rgba(255,255,255,0.05);
      }
      .prog-fill { height: 100%; width: 0%; transition: width linear; border-radius: 0 2px 2px 0; }
      .fx { position: absolute; inset: 0; z-index: 8; pointer-events: none; }
      .ctrl-row {
        display: flex; align-items: center; justify-content: center;
        gap: 12px; margin-bottom: 10px; flex-wrap: wrap;
      }
      .play-btn {
        padding: 8px 20px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.12);
        background: var(--card); color: var(--white); font-family: 'Inter', sans-serif;
        font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.3s;
        display: flex; align-items: center; gap: 6px;
      }
      .play-btn:hover { border-color: rgba(255,255,255,0.25); transform: translateY(-1px); }
      .play-btn.playing { border-color: var(--solar); background: rgba(244,166,35,0.12); color: var(--solar); }
      .step-dots { display: flex; gap: 8px; align-items: center; }
      .sd {
        width: 10px; height: 10px; border-radius: 50%;
        background: rgba(255,255,255,0.12); transition: all 0.4s; cursor: pointer;
      }
      .sd-s { background: var(--solar); box-shadow: 0 0 8px var(--solar); }
      .sd-e { background: var(--ev); box-shadow: 0 0 8px var(--ev); }
      .sd-b { background: var(--battery); box-shadow: 0 0 8px var(--battery); }
      .sd-h { background: var(--home); box-shadow: 0 0 8px var(--home); }
      .ctrls {
        display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 14px;
      }
      @media(max-width:750px) { .ctrls { grid-template-columns: repeat(2, 1fr); } }
      @media(max-width:420px) { .ctrls { grid-template-columns: 1fr; } }
      .cbtn {
        display: flex; align-items: center; gap: 12px; padding: 14px 16px;
        background: var(--card); border: 1.5px solid var(--card-b); border-radius: 12px;
        cursor: pointer; transition: all 0.3s; font-family: 'Inter', sans-serif;
        color: var(--text); text-align: left;
      }
      .cbtn:hover { border-color: rgba(255,255,255,0.12); transform: translateY(-1px); }
      .ci {
        width: 42px; height: 42px; border-radius: 50%; display: flex;
        align-items: center; justify-content: center; font-size: 1.1rem;
        flex-shrink: 0; transition: all 0.3s;
      }
      .ci-s { background: rgba(244,166,35,0.1); }
      .ci-b { background: rgba(68,215,182,0.1); }
      .ci-e { background: rgba(108,142,239,0.1); }
      .ci-h { background: rgba(255,120,73,0.1); }
      .cbt { display: flex; flex-direction: column; gap: 1px; }
      .ct { font-size: 0.82rem; font-weight: 600; }
      .cs2 { font-size: 0.63rem; color: var(--dim); }
      .cbtn.a-solar { border-color: var(--solar); background: linear-gradient(135deg, rgba(244,166,35,0.1), transparent); box-shadow: 0 4px 20px rgba(244,166,35,0.12); }
      .cbtn.a-solar .ci { background: rgba(244,166,35,0.25); box-shadow: 0 0 12px rgba(244,166,35,0.25); }
      .cbtn.a-battery { border-color: var(--battery); background: linear-gradient(135deg, rgba(68,215,182,0.1), transparent); box-shadow: 0 4px 20px rgba(68,215,182,0.12); }
      .cbtn.a-battery .ci { background: rgba(68,215,182,0.25); box-shadow: 0 0 12px rgba(68,215,182,0.25); }
      .cbtn.a-ev { border-color: var(--ev); background: linear-gradient(135deg, rgba(108,142,239,0.1), transparent); box-shadow: 0 4px 20px rgba(108,142,239,0.12); }
      .cbtn.a-ev .ci { background: rgba(108,142,239,0.25); box-shadow: 0 0 12px rgba(108,142,239,0.25); }
      .cbtn.a-home { border-color: var(--home); background: linear-gradient(135deg, rgba(255,120,73,0.1), transparent); box-shadow: 0 4px 20px rgba(255,120,73,0.12); }
      .cbtn.a-home .ci { background: rgba(255,120,73,0.25); box-shadow: 0 0 12px rgba(255,120,73,0.25); }
      .info {
        background: var(--card); border: 1px solid var(--card-b); border-radius: 14px;
        padding: 24px 32px; min-height: 100px; overflow: hidden;
        word-wrap: break-word; overflow-wrap: break-word; max-width: 100%; box-sizing: border-box;
      }
      .info-empty {
        display: flex; align-items: center; justify-content: center;
        min-height: 80px; color: var(--dim); font-size: 0.9rem; gap: 8px;
      }
      .info-empty .arr { animation: bob 1.5s ease-in-out infinite; }
      @keyframes bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
      .ititle { font-size: 1.15rem; font-weight: 700; margin-bottom: 6px; display: flex; align-items: center; gap: 8px; }
      .ititle .id { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
      .id-s { background: var(--solar); box-shadow: 0 0 8px var(--solar); }
      .id-b { background: var(--battery); box-shadow: 0 0 8px var(--battery); }
      .id-e { background: var(--ev); box-shadow: 0 0 8px var(--ev); }
      .id-h { background: var(--home); box-shadow: 0 0 8px var(--home); }
      .itime {
        font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; font-weight: 500;
        padding: 5px 12px; border-radius: 6px; display: inline-block; margin-bottom: 12px;
      }
      .itime-off { background: rgba(34,197,94,0.12); color: var(--offpeak-green); border: 1px solid rgba(34,197,94,0.2); }
      .itime-pk { background: rgba(239,68,68,0.12); color: var(--peak-red); border: 1px solid rgba(239,68,68,0.2); }
      .itime-all { background: rgba(108,142,239,0.12); color: var(--ev); border: 1px solid rgba(108,142,239,0.2); }
      .itime-em { background: rgba(239,68,68,0.12); color: var(--peak-red); border: 1px solid rgba(239,68,68,0.3); }
      .info p { color: #CBD5E1; font-size: 0.95rem; line-height: 1.75; margin-bottom: 8px; }
      .info p strong { color: #fff; font-weight: 700; }
      .stats { display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap; }
      .pill {
        display: flex; align-items: center; gap: 5px; padding: 8px 14px;
        background: rgba(255,255,255,0.04); border-radius: 8px;
        font-family: 'JetBrains Mono', monospace; font-size: 0.78rem;
        border: 1px solid rgba(255,255,255,0.04);
      }
      .pill .v { font-weight: 600; color: #fff; }
      .pill .l { color: #CBD5E1; }
      .foot { text-align: center; margin-top: 20px; font-size: 0.7rem; color: var(--dim); }
      .foot a { color: var(--solar); text-decoration: none; }
      .hiw-cta {
        background: linear-gradient(135deg, #0d1a2e 0%, #0a1520 100%);
        padding: 60px 24px; text-align: center;
        border-top: 1px solid rgba(255,255,255,0.06);
      }
      .hiw-cta h2 { font-size: clamp(1.4rem, 3vw, 2rem); font-weight: 800; color: #fff; margin-bottom: 12px; }
      .hiw-cta-sub { color: var(--dim); font-size: 1rem; margin-bottom: 28px; max-width: 500px; margin-left: auto; margin-right: auto; }
      .hiw-cta-btn {
        display: inline-block; padding: 16px 36px; background: var(--solar);
        color: #1a1a2e; font-weight: 800; font-size: 1rem; border-radius: 30px;
        text-decoration: none; transition: all 0.3s; letter-spacing: 0.03em;
      }
      .hiw-cta-btn:hover { background: #ffe06a; transform: translateY(-2px); box-shadow: 0 8px 30px rgba(244,166,35,0.4); }
      .solar-demo-back {
        display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px;
        background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
        border-radius: 8px; color: var(--text); font-size: 0.82rem; font-weight: 500;
        text-decoration: none; transition: all 0.2s; margin: 20px 24px 0;
      }
      .solar-demo-back:hover { background: rgba(255,255,255,0.08); }
    `;
    document.head.appendChild(style);
    const starsEl = document.getElementById("starsEl");
    if (starsEl && starsEl.children.length === 0) {
      for (let i = 0; i < 40; i++) {
        const d = document.createElement("div");
        d.className = "st";
        d.style.left = Math.random() * 100 + "%";
        d.style.top = Math.random() * 100 + "%";
        d.style.animationDelay = Math.random() * 4 + "s";
        const sz = 1 + Math.random() * 1.5;
        d.style.width = sz + "px";
        d.style.height = sz + "px";
        starsEl.appendChild(d);
      }
    }
    const cvs = document.getElementById("fx");
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    let W = 0, H = 0;
    function rsz() {
      const r = cvs.parentElement.getBoundingClientRect();
      if (r.width === 0) return;
      cvs.width = r.width;
      cvs.height = r.height;
      W = cvs.width;
      H = cvs.height;
    }
    rsz();
    window.addEventListener("resize", rsz);
    const darkImg = document.getElementById("darkImg");
    if (darkImg) {
      if (darkImg.complete) {
        rsz();
      } else {
        darkImg.addEventListener("load", rsz);
      }
    }
    const rszTimer = setTimeout(() => rsz(), 300);
    const C = {
      s: [244, 166, 35],
      b: [68, 215, 182],
      h: [255, 120, 73],
      e: [108, 142, 239]
    };
    function rga(c, a) {
      return `rgba(${c[0]},${c[1]},${c[2]},${a})`;
    }
    const SUN = { x: 0.84, y: 0.04 };
    const PANELS = { x: 0.548, y: 0.299 };
    const EPANEL = { x: 0.359, y: 0.555 };
    const PW = { x: 0.433, y: 0.555 };
    const WC = { x: 0.515, y: 0.555 };
    const CAR = { x: 0.799, y: 0.596 };
    const HOME = { x: 0.249, y: 0.452 };
    function drawPath(points, color, dots) {
      if (points.length < 2) return;
      const segs = [];
      let totalLen = 0;
      for (let i = 1; i < points.length; i++) {
        const dx = (points[i].x - points[i - 1].x) * W;
        const dy = (points[i].y - points[i - 1].y) * H;
        const len = Math.sqrt(dx * dx + dy * dy);
        segs.push({ sx: points[i - 1].x, sy: points[i - 1].y, ex: points[i].x, ey: points[i].y, len });
        totalLen += len;
      }
      ctx.beginPath();
      ctx.moveTo(points[0].x * W, points[0].y * H);
      for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x * W, points[i].y * H);
      ctx.strokeStyle = rga(color, 0.1);
      ctx.lineWidth = 10;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(points[0].x * W, points[0].y * H);
      for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x * W, points[i].y * H);
      ctx.strokeStyle = rga(color, 0.4);
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(points[0].x * W, points[0].y * H);
      for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x * W, points[i].y * H);
      ctx.strokeStyle = rga(color, 0.7);
      ctx.lineWidth = 1.5;
      ctx.stroke();
      dots.forEach((d) => {
        d.t += d.sp;
        if (d.t > 1) d.t -= 1;
        const dist = d.t * totalLen;
        let accum = 0, x = 0, y = 0;
        for (let i = 0; i < segs.length; i++) {
          if (accum + segs[i].len >= dist) {
            const f = (dist - accum) / segs[i].len;
            x = (segs[i].sx + f * (segs[i].ex - segs[i].sx)) * W;
            y = (segs[i].sy + f * (segs[i].ey - segs[i].sy)) * H;
            break;
          }
          accum += segs[i].len;
        }
        const g = ctx.createRadialGradient(x, y, 0, x, y, 14);
        g.addColorStop(0, rga(color, 0.5));
        g.addColorStop(0.4, rga(color, 0.12));
        g.addColorStop(1, rga(color, 0));
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = rga(color, 0.85);
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.92)";
        ctx.beginPath();
        ctx.arc(x, y, 2.8, 0, Math.PI * 2);
        ctx.fill();
      });
    }
    let activePaths = [];
    function addPath(pts, col, n, sp) {
      const dots = [];
      for (let i = 0; i < n; i++) dots.push({ t: i / n, sp: sp || 4e-3 });
      activePaths.push({ pts, col, dots });
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      activePaths.forEach((p) => drawPath(p.pts, p.col, p.dots));
      requestAnimationFrame(draw);
    }
    draw();
    const MODES = ["solar", "ev", "battery", "home"];
    const STEP_DUR = 1e4;
    const STAGES = {
      solar: {
        btn: "a-solar",
        sun: 1,
        moon: 0,
        stars: 0,
        lit: 1,
        evp: 0,
        sky: "sky-day",
        darkFilter: "brightness(5.5) contrast(1.05) saturate(1.4)",
        badge: '<span class="tbd tbd-off"></span>OFF-PEAK · 7:00 AM – 4:00 PM',
        progColor: "var(--solar)",
        overlay: {
          title: "☀️ Solar Panels — Free Electricity All Day",
          body: "Your panels generate free power from sunrise to sunset. Excess energy is <strong>stored in your Powerwall</strong> so you're covered when rates spike at 4pm. We build your system <strong>25% bigger than your usage</strong> to make sure you're fully covered under NEM 3.0.",
          color: "var(--solar)"
        },
        paths: [
          { pts: [SUN, PANELS], col: C.s, n: 4, sp: 5e-3 },
          { pts: [PANELS, { x: PW.x, y: PANELS.y }, PW], col: C.s, n: 3, sp: 5e-3 },
          { pts: [PW, EPANEL], col: C.b, n: 2, sp: 6e-3 },
          { pts: [EPANEL, { x: EPANEL.x, y: HOME.y }, HOME], col: C.h, n: 3, sp: 4e-3 }
        ],
        dot: "id-s",
        timeCls: "itime-off",
        timeText: "OFF-PEAK · 7:00 AM – 4:00 PM",
        title: "Solar Panels — How Your System Works",
        body: "<p>Your solar panels start producing electricity as soon as the sun comes up. Production follows a <strong>bell curve</strong> — it starts low in the morning, ramps up to full power by midday, then tapers off as the sun sets. In January the sun is lower and production is less. By summer, the sun is directly overhead and your system hits its maximum output.</p><p>We design your system at <strong>125% of your annual consumption</strong>. Why? Under <strong>NEM 3.0</strong>, you no longer get the 1-to-1 credit you used to get with NEM 2.0. Building the system bigger ensures you produce enough to fully offset your bill.</p><p>During the day, solar powers your home first. <strong>Excess energy charges your Powerwall battery</strong> so it's ready for tonight's peak hours (4pm–9pm) when SCE rates hit up to <strong>$0.58/kWh</strong>. This is the key to eliminating your electric bill.</p>",
        stats: [{ v: "125%", l: "system oversized" }, { v: "$0.24/kWh", l: "off-peak rate" }, { v: "$0.58/kWh", l: "peak rate (4-9pm)" }, { v: "NEM 3.0", l: "billing program" }]
      },
      ev: {
        btn: "a-ev",
        sun: 1,
        moon: 0,
        stars: 0,
        lit: 1,
        evp: 1,
        sky: "sky-day",
        darkFilter: "brightness(5.5) contrast(1.05) saturate(1.4)",
        badge: '<span class="tbd tbd-off"></span>OFF-PEAK · Charge Smart',
        progColor: "var(--ev)",
        overlay: {
          title: "⚡ Tesla Charging — Drive on Sunshine",
          body: "<strong>NEVER charge your Tesla 4pm–9pm</strong> — it costs 3x more! Charge with solar during the day for <strong>FREE</strong>, or off-peak after 9pm at just ~$0.07/mile.",
          color: "var(--ev)"
        },
        paths: [
          { pts: [SUN, PANELS], col: C.s, n: 3, sp: 5e-3 },
          { pts: [PANELS, { x: PW.x, y: PANELS.y }, PW], col: C.s, n: 2, sp: 5e-3 },
          { pts: [PW, EPANEL], col: C.e, n: 2, sp: 5e-3 },
          { pts: [EPANEL, { x: EPANEL.x, y: WC.y }, WC, CAR], col: C.e, n: 4, sp: 4e-3 }
        ],
        dot: "id-e",
        timeCls: "itime-off",
        timeText: "OFF-PEAK · Before 4 PM or After 9 PM",
        title: "Tesla Charging — The Rules That Save You Money",
        body: "<p><strong>The #1 rule: never charge your car between 4pm–9pm.</strong> That's the most expensive window of the day — SCE charges up to $0.58/kWh during peak hours. Charging at the wrong time can cost you <strong>3x more per mile</strong>.</p><p><strong>Best time to charge:</strong> During the day when your solar panels are producing free electricity, or after 9pm when super off-peak rates kick in (~$0.16/kWh).</p><p><strong>Important — if the power goes out, do not charge your car.</strong> Your Tesla charges on a 50-amp circuit and will drain your Powerwall battery very quickly. During an outage, your battery needs to keep the essential things in your home running — not charge a car.</p>",
        stats: [{ v: "$0.00", l: "solar charging" }, { v: "$0.16/kWh", l: "super off-peak" }, { v: "$0.58/kWh", l: "peak (NEVER)" }, { v: "50 amps", l: "car draws" }]
      },
      battery: {
        btn: "a-battery",
        sun: 0,
        moon: 1,
        stars: 1,
        lit: 1,
        evp: 0,
        sky: "sky-eve",
        darkFilter: "brightness(1)",
        badge: '<span class="tbd tbd-pk"></span>PEAK · 4:00 PM – 9:00 PM · UP TO $0.58/kWh',
        progColor: "var(--battery)",
        overlay: {
          title: "🔋 Powerwall 3 — Running Your Home Off Battery",
          body: "It's <strong>4pm–9pm</strong> — the most expensive part of the day. Your Powerwall is <strong>running your entire home on stored solar energy</strong> so you're not buying a single kWh from SCE. We don't export power back to the grid — <strong>every bit goes to your home</strong>.",
          color: "var(--battery)"
        },
        paths: [
          { pts: [PW, EPANEL], col: C.b, n: 3, sp: 5e-3 },
          { pts: [EPANEL, { x: EPANEL.x, y: HOME.y }, HOME], col: C.h, n: 3, sp: 4e-3 }
        ],
        dot: "id-b",
        timeCls: "itime-pk",
        timeText: "PEAK · 4:00 PM – 9:00 PM",
        title: "Powerwall 3 — Peak Hour Protection",
        body: "<p>Every day from <strong>4pm to 9pm</strong>, SCE charges the highest rates — up to <strong>$0.58/kWh</strong>. Your Powerwall discharges the free solar energy it stored during the day, running your home entirely off battery. <strong>We do not use export mode</strong> — every kWh goes straight to your home, not back to the grid. Under NEM 3.0, exporting doesn't make financial sense.</p><p><strong>How many batteries do you need?</strong> It depends on what you're running. If you're keeping it to lights, plugs, and everyday essentials, <strong>one Powerwall (13.5 kWh)</strong> can get you through 4–9pm. If you're running air conditioning and major appliances during peak, you'll likely need <strong>two batteries</strong>.</p><p>The goal is simple: <strong>use zero grid power from 4pm to 9pm</strong>. If you see a charge on your bill at the end of the month, it usually means the battery didn't quite make it all the way through peak — and that's when we discuss adding a second Powerwall.</p>",
        stats: [{ v: "$0.58/kWh", l: "SCE peak rate" }, { v: "$0.00", l: "your cost" }, { v: "13.5 kWh", l: "per battery" }, { v: "1 or 2", l: "batteries needed" }]
      },
      home: {
        btn: "a-home",
        sun: 0,
        moon: 1,
        stars: 1,
        lit: 0,
        evp: 0,
        sky: "sky-blackout",
        darkFilter: "brightness(0.6)",
        badge: '<span class="tbd tbd-em"></span>GRID DOWN · BACKUP ACTIVE',
        progColor: "var(--home)",
        overlay: {
          title: "🏠 Power Outage — Your Home Stays On",
          body: "The grid goes down. Your <strong>Powerwall kicks on instantly</strong> — lights, fridge, WiFi, everything stays running. <strong>Monitor your battery level in the Tesla app</strong> and conserve energy if the outage may last a while. During the day, your solar panels recharge the battery.",
          color: "var(--home)"
        },
        paths: [
          { pts: [PW, EPANEL], col: C.b, n: 3, sp: 5e-3 },
          { pts: [EPANEL, { x: EPANEL.x, y: HOME.y }, HOME], col: C.h, n: 3, sp: 4e-3 }
        ],
        dot: "id-h",
        timeCls: "itime-em",
        timeText: "GRID DOWN · EMERGENCY BACKUP",
        title: "Whole Home Backup — When the Grid Fails",
        body: "<p>When the power goes out, your Powerwall <strong>automatically disconnects from the grid and takes over in milliseconds</strong>. Your home stays running — lights, refrigerator, WiFi, garage door, plugs, everything.</p><p><strong>The key during an outage: watch your battery level in the Tesla app.</strong> If the outage might last a while, be smart about what you're running. Turn off big appliances like AC and the dryer to stretch your battery longer. If it's daytime, your solar panels will continue recharging the battery.</p><p><strong>For customers who never want to worry about it:</strong> We install <strong>4 or more Powerwalls</strong> so you can run everything — AC, appliances, all of it — without thinking twice. For most families, <strong>1–2 batteries</strong> will keep the essentials running through a typical outage. It's all about what gives you peace of mind.</p>",
        stats: [{ v: "Instant", l: "switchover" }, { v: "1-2", l: "batteries for essentials" }, { v: "4+", l: "batteries for everything" }, { v: "Solar", l: "recharges by day" }]
      }
    };
    let autoTimer = null;
    let autoPlaying = false;
    let autoIdx = 0;
    function toggleAuto() {
      if (autoPlaying) stopAuto();
      else startAuto();
    }
    function startAuto() {
      autoPlaying = true;
      const btn = document.getElementById("playBtn");
      if (btn) {
        btn.textContent = "⏸ Pause";
        btn.classList.add("playing");
      }
      autoIdx = 0;
      runStep();
    }
    function stopAuto() {
      autoPlaying = false;
      if (autoTimer) clearTimeout(autoTimer);
      const btn = document.getElementById("playBtn");
      if (btn) {
        btn.textContent = "▶ Watch the Full Day";
        btn.classList.remove("playing");
      }
      const pf = document.getElementById("progFill");
      if (pf) {
        pf.style.transition = "none";
        pf.style.width = "0%";
      }
    }
    function runStep() {
      if (!autoPlaying) return;
      go(MODES[autoIdx]);
      const pf = document.getElementById("progFill");
      if (pf) {
        pf.style.transition = "none";
        pf.style.width = "0%";
        pf.style.background = STAGES[MODES[autoIdx]].progColor;
        setTimeout(() => {
          pf.style.transition = `width ${STEP_DUR - 200}ms linear`;
          pf.style.width = "100%";
        }, 50);
      }
      for (let i = 0; i < 4; i++) {
        const sd = document.getElementById("sd" + i);
        if (sd) {
          sd.className = "sd";
          if (i === autoIdx) sd.classList.add("on", "sd-" + ["s", "e", "b", "h"][i]);
        }
      }
      autoIdx = (autoIdx + 1) % 4;
      autoTimer = setTimeout(runStep, STEP_DUR);
    }
    function goManual(idx) {
      stopAuto();
      for (let i = 0; i < 4; i++) {
        const sd = document.getElementById("sd" + i);
        if (sd) {
          sd.className = "sd";
          if (i === idx) sd.classList.add("on", "sd-" + ["s", "e", "b", "h"][i]);
        }
      }
      go(MODES[idx]);
    }
    function go(m) {
      reset2();
      const d = STAGES[m];
      const btn = document.querySelector(`[data-m="${m}"]`);
      if (btn) btn.classList.add(d.btn);
      const darkImg2 = document.getElementById("darkImg");
      const litImg = document.getElementById("litImg");
      if (darkImg2) darkImg2.style.filter = d.darkFilter;
      if (d.lit && litImg) litImg.classList.add("on");
      const skyOv = document.getElementById("skyOv");
      if (skyOv) skyOv.className = "sky-ov " + d.sky;
      if (d.sun) document.getElementById("sun")?.classList.add("vis");
      if (d.moon) document.getElementById("moon")?.classList.add("vis");
      if (d.stars) document.getElementById("starsEl")?.classList.add("vis");
      const tb = document.getElementById("tb");
      if (tb) {
        tb.innerHTML = d.badge;
        tb.classList.add("on");
      }
      if (d.evp) document.getElementById("evp")?.classList.add("on");
      const ov = document.getElementById("msgOv");
      const msgT = document.getElementById("msgT");
      const msgB = document.getElementById("msgB");
      if (msgT) msgT.innerHTML = `<span class="md" style="background:${d.overlay.color};box-shadow:0 0 8px ${d.overlay.color}"></span>${d.overlay.title}`;
      if (msgB) msgB.innerHTML = d.overlay.body;
      if (ov) ov.classList.add("on");
      activePaths = [];
      d.paths.forEach((p) => addPath(p.pts, p.col, p.n, p.sp));
      const sh = d.stats.map((s) => `<div class="pill"><span class="v">${s.v}</span><span class="l">${s.l}</span></div>`).join("");
      const info = document.getElementById("info");
      if (info) info.innerHTML = `<div class="ititle"><span class="id ${d.dot}"></span>${d.title}</div><div class="itime ${d.timeCls}">${d.timeText}</div>${d.body}<div class="stats">${sh}</div>`;
      if (m === "home") {
        if (litImg) litImg.classList.remove("on");
        if (darkImg2) darkImg2.style.filter = "brightness(0.3)";
        if (skyOv) skyOv.className = "sky-ov sky-blackout";
        if (ov) ov.classList.remove("on");
        activePaths = [];
        setTimeout(() => {
          if (litImg) litImg.classList.add("on");
          if (darkImg2) darkImg2.style.filter = "brightness(0.6)";
          if (ov) ov.classList.add("on");
          STAGES.home.paths.forEach((p) => addPath(p.pts, p.col, p.n, p.sp));
        }, 3e3);
      }
    }
    function reset2() {
      activePaths = [];
      document.querySelectorAll(".cbtn").forEach((b) => {
        b.className = "cbtn";
      });
      const litImg = document.getElementById("litImg");
      const darkImg2 = document.getElementById("darkImg");
      if (litImg) litImg.classList.remove("on");
      if (darkImg2) darkImg2.style.filter = "brightness(1)";
      document.getElementById("tb")?.classList.remove("on");
      document.getElementById("sun")?.classList.remove("vis");
      document.getElementById("moon")?.classList.remove("vis");
      document.getElementById("starsEl")?.classList.remove("vis");
      document.getElementById("evp")?.classList.remove("on");
      const skyOv = document.getElementById("skyOv");
      if (skyOv) skyOv.className = "sky-ov";
      document.getElementById("msgOv")?.classList.remove("on");
    }
    window.toggleAuto = toggleAuto;
    window.goManual = goManual;
    const startTimer = setTimeout(() => startAuto(), 1500);
    return () => {
      clearTimeout(startTimer);
      clearTimeout(rszTimer);
      if (autoTimer) clearTimeout(autoTimer);
      window.removeEventListener("resize", rsz);
      delete window.toggleAuto;
      delete window.goManual;
      const injectedStyle = document.getElementById("solar-demo-styles");
      if (injectedStyle) injectedStyle.remove();
    };
  }, []);
  return /* @__PURE__ */ jsxs("div", { id: "ps-solar-demo-page", children: [
    /* @__PURE__ */ jsx(Link, { href: "/", className: "solar-demo-back", children: "← Back" }),
    /* @__PURE__ */ jsx("div", { className: "hiw-hero", children: /* @__PURE__ */ jsxs("div", { className: "hiw-hero-inner", children: [
      /* @__PURE__ */ jsxs("div", { className: "hiw-badge", children: [
        /* @__PURE__ */ jsx("span", { className: "hiw-badge-dot" }),
        " INTERACTIVE DEMO"
      ] }),
      /* @__PURE__ */ jsxs("h1", { children: [
        "How Your ",
        /* @__PURE__ */ jsx("span", { children: "Solar Home" }),
        " Works"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "hiw-hero-p", children: "Watch a full day unfold on a Pell Solar home — from sunrise energy production to peak-hour battery protection to whole-home backup. This is exactly how we design every system." }),
      /* @__PURE__ */ jsxs("div", { className: "hiw-hero-tags", children: [
        /* @__PURE__ */ jsxs("span", { className: "hiw-tag", children: [
          /* @__PURE__ */ jsx("span", { className: "hiw-tag-icon", children: "☀️" }),
          " Solar Panels"
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "hiw-tag", children: [
          /* @__PURE__ */ jsx("span", { className: "hiw-tag-icon", children: "🔋" }),
          " Powerwall 3"
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "hiw-tag", children: [
          /* @__PURE__ */ jsx("span", { className: "hiw-tag-icon", children: "⚡" }),
          " EV Charging"
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "hiw-tag", children: [
          /* @__PURE__ */ jsx("span", { className: "hiw-tag-icon", children: "🏠" }),
          " Backup Power"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "sol-demo-section", id: "ps-demo", children: /* @__PURE__ */ jsxs("div", { className: "wrap", children: [
      /* @__PURE__ */ jsxs("div", { className: "scene", id: "scene", children: [
        /* @__PURE__ */ jsx("img", { decoding: "async", className: "dark", id: "darkImg", src: DARK_IMG, alt: "Solar home" }),
        /* @__PURE__ */ jsx("img", { decoding: "async", className: "lit", id: "litImg", src: LIT_IMG, alt: "Solar home lit" }),
        /* @__PURE__ */ jsx("div", { className: "sky-ov", id: "skyOv" }),
        /* @__PURE__ */ jsx("div", { className: "stars", id: "starsEl" }),
        /* @__PURE__ */ jsx("div", { className: "sun", id: "sun", children: /* @__PURE__ */ jsx("div", { className: "sun-inner" }) }),
        /* @__PURE__ */ jsxs("div", { className: "moon", id: "moon", children: [
          /* @__PURE__ */ jsx("div", { className: "moon-c" }),
          /* @__PURE__ */ jsx("div", { className: "moon-sh" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "tbadge", id: "tb" }),
        /* @__PURE__ */ jsx("div", { className: "evp", id: "evp" }),
        /* @__PURE__ */ jsxs("div", { className: "msg-ov", id: "msgOv", children: [
          /* @__PURE__ */ jsx("div", { className: "mt", id: "msgT" }),
          /* @__PURE__ */ jsx("div", { className: "mb", id: "msgB" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "prog-bar", children: /* @__PURE__ */ jsx("div", { className: "prog-fill", id: "progFill" }) }),
        /* @__PURE__ */ jsx("canvas", { className: "fx", id: "fx" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "ctrl-row", children: [
        /* @__PURE__ */ jsx("button", { className: "play-btn", id: "playBtn", onClick: () => window.toggleAuto?.(), children: "▶ Watch the Full Day" }),
        /* @__PURE__ */ jsxs("div", { className: "step-dots", children: [
          /* @__PURE__ */ jsx("div", { className: "sd", id: "sd0", onClick: () => window.goManual?.(0), title: "Solar Panels" }),
          /* @__PURE__ */ jsx("div", { className: "sd", id: "sd1", onClick: () => window.goManual?.(1), title: "Tesla Charging" }),
          /* @__PURE__ */ jsx("div", { className: "sd", id: "sd2", onClick: () => window.goManual?.(2), title: "Powerwall" }),
          /* @__PURE__ */ jsx("div", { className: "sd", id: "sd3", onClick: () => window.goManual?.(3), title: "Whole Home Backup" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "ctrls", children: [
        /* @__PURE__ */ jsxs("button", { className: "cbtn", "data-m": "solar", onClick: () => window.goManual?.(0), children: [
          /* @__PURE__ */ jsx("div", { className: "ci ci-s", children: "☀️" }),
          /* @__PURE__ */ jsxs("div", { className: "cbt", children: [
            /* @__PURE__ */ jsx("span", { className: "ct", children: "Solar Panels" }),
            /* @__PURE__ */ jsx("span", { className: "cs2", children: "7am – 4pm · Off-Peak" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("button", { className: "cbtn", "data-m": "ev", onClick: () => window.goManual?.(1), children: [
          /* @__PURE__ */ jsx("div", { className: "ci ci-e", children: "⚡" }),
          /* @__PURE__ */ jsxs("div", { className: "cbt", children: [
            /* @__PURE__ */ jsx("span", { className: "ct", children: "Tesla Charging" }),
            /* @__PURE__ */ jsx("span", { className: "cs2", children: "Off-Peak · Charge Smart" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("button", { className: "cbtn", "data-m": "battery", onClick: () => window.goManual?.(2), children: [
          /* @__PURE__ */ jsx("div", { className: "ci ci-b", children: "🔋" }),
          /* @__PURE__ */ jsxs("div", { className: "cbt", children: [
            /* @__PURE__ */ jsx("span", { className: "ct", children: "Powerwall 3" }),
            /* @__PURE__ */ jsx("span", { className: "cs2", children: "4pm – 9pm · Peak Protection" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("button", { className: "cbtn", "data-m": "home", onClick: () => window.goManual?.(3), children: [
          /* @__PURE__ */ jsx("div", { className: "ci ci-h", children: "🏠" }),
          /* @__PURE__ */ jsxs("div", { className: "cbt", children: [
            /* @__PURE__ */ jsx("span", { className: "ct", children: "Whole Home Backup" }),
            /* @__PURE__ */ jsx("span", { className: "cs2", children: "Grid Down · Battery Powered" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "info", id: "info", children: /* @__PURE__ */ jsxs("div", { className: "info-empty", children: [
        /* @__PURE__ */ jsx("span", { className: "arr", children: "☝️" }),
        " Tap a button or press play to see your solar system in action"
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "foot", children: [
        "Built by ",
        /* @__PURE__ */ jsx("a", { href: "https://pellsolar.com", target: "_blank", rel: "noreferrer", children: "Pell Solar" }),
        " — Southern California & Idaho's Trusted Tesla Installer"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "hiw-cta", children: [
      /* @__PURE__ */ jsx("h2", { children: "Ready to See What Solar Can Do for Your Home?" }),
      /* @__PURE__ */ jsx("p", { className: "hiw-cta-sub", children: "Get a free consultation and see why homeowners across California and Idaho trust Pell Solar." }),
      /* @__PURE__ */ jsx("a", { href: "/get-quote", className: "hiw-cta-btn", children: "GET YOUR FREE CONSULTATION" })
    ] })
  ] });
}
const SCE_STEPS = [
  {
    num: 1,
    title: "Log in to sce.com",
    content: /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-gray-700", children: [
        "Go to",
        " ",
        /* @__PURE__ */ jsx("a", { href: "https://www.sce.com", target: "_blank", rel: "noopener noreferrer", className: "text-[#2BABE2] font-semibold underline", children: "www.sce.com" }),
        " ",
        "and click ",
        /* @__PURE__ */ jsx("strong", { children: '"Log In"' }),
        " in the top-right corner. Use the same username and password you use to pay your Edison bill online."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2 items-start", children: [
        /* @__PURE__ */ jsx(AlertTriangle, { size: 16, className: "text-amber-500 mt-0.5 flex-shrink-0" }),
        /* @__PURE__ */ jsxs("p", { className: "text-amber-800 text-sm", children: [
          /* @__PURE__ */ jsx("strong", { children: "Don't have an account?" }),
          ` Click "Register" on the login page. You'll need your SCE account number from your paper bill. It takes about 2 minutes to set up.`
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-2 items-start", children: [
        /* @__PURE__ */ jsx("span", { className: "text-blue-500 text-sm mt-0.5 flex-shrink-0", children: "💡" }),
        /* @__PURE__ */ jsxs("p", { className: "text-blue-800 text-sm", children: [
          /* @__PURE__ */ jsx("strong", { children: "Forgot your password?" }),
          ' Click "Forgot My Password" on the login page to reset it via email.'
        ] })
      ] })
    ] })
  },
  {
    num: 2,
    title: 'Go to "More" → "Data Sharing and Download"',
    content: /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-gray-700", children: [
        "Once logged in, look at the top navigation bar. You'll see tabs: ",
        /* @__PURE__ */ jsx("strong", { children: "MY ACCOUNT" }),
        ", ",
        /* @__PURE__ */ jsx("strong", { children: "USAGE" }),
        ", ",
        /* @__PURE__ */ jsx("strong", { children: "SETTINGS" }),
        ", and ",
        /* @__PURE__ */ jsx("strong", { children: "MORE (•••)" }),
        "."
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-gray-700", children: [
        "Click the ",
        /* @__PURE__ */ jsx("strong", { children: '"More" (•••)' }),
        " tab, then select ",
        /* @__PURE__ */ jsx("strong", { children: '"Data Sharing and Download"' }),
        " from the dropdown menu."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#003087] rounded-lg p-3 text-white text-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex gap-6 items-center flex-wrap", children: [
          /* @__PURE__ */ jsxs("span", { className: "flex flex-col items-center gap-1 opacity-60", children: [
            /* @__PURE__ */ jsx("span", { className: "text-lg", children: "🏠" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs", children: "MY ACCOUNT" })
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "flex flex-col items-center gap-1 opacity-60", children: [
            /* @__PURE__ */ jsx("span", { className: "text-lg", children: "📊" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs", children: "USAGE" })
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "flex flex-col items-center gap-1 opacity-60", children: [
            /* @__PURE__ */ jsx("span", { className: "text-lg", children: "⚙️" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs", children: "SETTINGS" })
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "flex flex-col items-center gap-1 bg-white/20 rounded px-3 py-1 ring-2 ring-[#FED44D]", children: [
            /* @__PURE__ */ jsx("span", { className: "text-lg", children: "•••" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-[#FED44D]", children: "MORE ← Click here" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 bg-white text-gray-800 rounded p-2 text-sm ml-auto w-fit", children: [
          /* @__PURE__ */ jsx("div", { className: "text-gray-500 text-xs mb-1", children: "Dropdown menu:" }),
          /* @__PURE__ */ jsx("div", { className: "text-gray-400 py-1 border-b border-gray-100 text-xs", children: "Start or Stop Service" }),
          /* @__PURE__ */ jsx("div", { className: "bg-[#FED44D]/20 text-[#003087] font-bold py-1 px-2 rounded text-xs", children: "✓ Data Sharing and Download ← Select this" })
        ] })
      ] })
    ] })
  },
  {
    num: 3,
    title: "Set your dates, choose CSV, and download",
    content: /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsx("p", { className: "text-gray-700", children: `On the "Data Sharing and Download" page, you'll see a date range selector and a format dropdown. Follow these settings exactly:` }),
      /* @__PURE__ */ jsx("div", { className: "bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3", children: [
        { label: "A", title: "Start Date", desc: "Set to 12 months ago from today. For example, if today is April 2026, set it to April 2025." },
        { label: "B", title: "End Date", desc: "Set to today's date." },
        { label: "C", title: "File Format", desc: 'Select "Comma Separated (.csv)" — NOT XML.' },
        { label: "D", title: "Complete reCAPTCHA", desc: `Check the "I'm not a robot" box, then click Download.` }
      ].map((item) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsx("span", { className: "bg-[#0B1D51] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5", children: item.label }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "font-semibold text-gray-800 text-sm", children: item.title }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm", children: item.desc })
        ] })
      ] }, item.label)) }),
      /* @__PURE__ */ jsxs("div", { className: "bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2 items-start", children: [
        /* @__PURE__ */ jsx(AlertTriangle, { size: 16, className: "text-red-500 mt-0.5 flex-shrink-0" }),
        /* @__PURE__ */ jsxs("p", { className: "text-red-800 text-sm", children: [
          /* @__PURE__ */ jsx("strong", { children: "Important:" }),
          " You MUST select ",
          /* @__PURE__ */ jsx("strong", { children: "CSV — not XML" }),
          ". If you pick XML, we can't read the file. The downloaded file will end in ",
          /* @__PURE__ */ jsx("code", { children: ".csv" }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-green-50 border border-green-200 rounded-lg p-3 flex gap-2 items-start", children: [
        /* @__PURE__ */ jsx(CheckCircle2, { size: 16, className: "text-green-600 mt-0.5 flex-shrink-0" }),
        /* @__PURE__ */ jsxs("p", { className: "text-green-800 text-sm", children: [
          /* @__PURE__ */ jsx("strong", { children: "What you're downloading:" }),
          ' This is called "Green Button Data" — it contains your exact kilowatt-hour (kWh) usage for every month of the past year. We use this to size your solar system precisely for your home.'
        ] })
      ] })
    ] })
  },
  {
    num: 4,
    title: "Get a copy of your latest bill",
    content: /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsx("p", { className: "text-gray-700", children: "In addition to the Green Button CSV, we also need a copy of your most recent Edison bill. This shows us your rate plan, meter type, and current charges." }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 border border-gray-200 rounded-lg p-4", children: [
          /* @__PURE__ */ jsx("p", { className: "font-bold text-[#0B1D51] text-sm mb-2", children: "Option A — Download PDF Online" }),
          /* @__PURE__ */ jsxs("ol", { className: "text-gray-600 text-sm space-y-1 list-decimal list-inside", children: [
            /* @__PURE__ */ jsxs("li", { children: [
              "While logged in, click ",
              /* @__PURE__ */ jsx("strong", { children: '"My Account"' })
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              "Select ",
              /* @__PURE__ */ jsx("strong", { children: '"Billing & Payments"' })
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              "Click ",
              /* @__PURE__ */ jsx("strong", { children: '"View Bill"' }),
              " on your most recent bill"
            ] }),
            /* @__PURE__ */ jsx("li", { children: "Download the PDF to your computer" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 border border-gray-200 rounded-lg p-4", children: [
          /* @__PURE__ */ jsx("p", { className: "font-bold text-[#0B1D51] text-sm mb-2", children: "Option B — Photo of Paper Bill" }),
          /* @__PURE__ */ jsxs("ol", { className: "text-gray-600 text-sm space-y-1 list-decimal list-inside", children: [
            /* @__PURE__ */ jsx("li", { children: "Find your most recent paper Edison bill" }),
            /* @__PURE__ */ jsx("li", { children: "Take a clear photo with your phone" }),
            /* @__PURE__ */ jsx("li", { children: "Make sure all numbers are readable" }),
            /* @__PURE__ */ jsx("li", { children: "Upload the photo below (JPG or PNG)" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-2 items-start", children: [
        /* @__PURE__ */ jsx("span", { className: "text-blue-500 text-sm mt-0.5 flex-shrink-0", children: "💡" }),
        /* @__PURE__ */ jsxs("p", { className: "text-blue-800 text-sm", children: [
          /* @__PURE__ */ jsx("strong", { children: "Can't find your bill?" }),
          " The Green Button CSV alone is enough to get started. Upload what you have and we'll work with it."
        ] })
      ] })
    ] })
  },
  {
    num: 5,
    title: "Upload both files below — done!",
    content: /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-gray-700", children: [
        "Scroll down to the upload form below. Fill in your contact info, drop in your files, and hit ",
        /* @__PURE__ */ jsx("strong", { children: "Submit" }),
        "."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-green-50 border border-green-200 rounded-lg p-4", children: [
        /* @__PURE__ */ jsx("p", { className: "font-bold text-green-800 text-sm mb-2", children: "What happens next:" }),
        /* @__PURE__ */ jsxs("ol", { className: "text-green-700 text-sm space-y-1 list-decimal list-inside", children: [
          /* @__PURE__ */ jsx("li", { children: "We review your Green Button data and bill within 24 hours" }),
          /* @__PURE__ */ jsx("li", { children: "We design a custom solar system sized for your exact usage" }),
          /* @__PURE__ */ jsx("li", { children: "We call or email you with your personalized savings estimate" }),
          /* @__PURE__ */ jsx("li", { children: "No pressure — just honest numbers from a family-owned company" })
        ] })
      ] })
    ] })
  }
];
async function uploadFileToServer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64Data = reader.result.split(",")[1];
        const res = await fetch("/api/upload-bill", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileName: file.name,
            contentType: file.type || "application/octet-stream",
            base64Data
          })
        });
        if (!res.ok) {
          const err = await res.json();
          reject(new Error(err.error || "Upload failed"));
          return;
        }
        const data = await res.json();
        resolve({ key: data.key, url: data.url, publicUrl: data.publicUrl });
      } catch (e) {
        reject(e);
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}
function UploadBill() {
  const [openStep, setOpenStep] = useState(0);
  const [csvFile, setCsvFile] = useState(null);
  const [billFile, setBillFile] = useState(null);
  const [csvDragOver, setCsvDragOver] = useState(false);
  const [billDragOver, setBillDragOver] = useState(false);
  const [uploadType, setUploadType] = useState("both");
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", address: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const csvInputRef = useRef(null);
  const billInputRef = useRef(null);
  const formRef = useRef(null);
  const [, navigate] = useLocation();
  const createLead = trpc.leads.create.useMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      let csvKey;
      let csvUrl;
      let billKey;
      let billUrl;
      if (csvFile) {
        const result = await uploadFileToServer(csvFile);
        csvKey = result.key;
        csvUrl = result.publicUrl || result.url;
      }
      if (billFile) {
        const result = await uploadFileToServer(billFile);
        billKey = result.key;
        billUrl = result.publicUrl || result.url;
      }
      const leadResult = await createLead.mutateAsync({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        address: form.address,
        source: "upload-bill",
        ownershipType: "homeowner",
        interestType: "solar_battery",
        billFileKey: csvKey ?? billKey,
        billFileUrl: csvUrl ?? billUrl,
        billFileName: csvFile?.name ?? billFile?.name,
        _hp: ""
        // honeypot — always empty for real users
      });
      setSubmitted(true);
      const thankYouParams = new URLSearchParams();
      if (leadResult?.dealId) thankYouParams.set("deal_id", String(leadResult.dealId));
      navigate(`/thank-you${thankYouParams.toString() ? "?" + thankYouParams.toString() : ""}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again or call us.");
    } finally {
      setSubmitting(false);
    }
  };
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white", style: { fontFamily: "'Inter', system-ui, sans-serif" }, children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs(
      "section",
      {
        className: "relative py-24 md:py-32 text-center overflow-hidden",
        style: { background: "linear-gradient(135deg, #0B1D51 0%, #0d2a6e 50%, #0B1D51 100%)" },
        children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute top-6 left-1/2 -translate-x-1/2 bg-white rounded-xl px-5 py-2 flex items-center gap-3 shadow-lg z-10", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-[#003087] text-white text-xs font-bold px-2 py-1 rounded", children: "SOUTHERN CALIFORNIA" }),
            /* @__PURE__ */ jsx("span", { className: "text-[#003087] font-extrabold text-lg tracking-tight", children: "EDISON" }),
            /* @__PURE__ */ jsx("span", { className: "text-gray-400 text-xs hidden sm:inline", children: "An Edison International Company" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-6 pt-12", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[#2BABE2] font-semibold text-sm uppercase tracking-wider mb-3", children: "Green Button Data Upload" }),
            /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-extrabold text-white mb-5", style: { fontFamily: "'Montserrat', sans-serif" }, children: [
              "Upload Your ",
              /* @__PURE__ */ jsx("span", { className: "text-[#FED44D]", children: "Edison Data" })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-white/80 text-lg md:text-xl leading-relaxed mb-8", children: [
              "To design a solar system perfectly sized for your home, we need two files from your Edison account. Follow the steps below — it takes about ",
              /* @__PURE__ */ jsx("strong", { className: "text-white", children: "5 minutes" }),
              "."
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4 mb-6", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: scrollToForm,
                  className: "bg-[#FED44D] text-[#0B1D51] font-extrabold px-8 py-4 rounded-full text-sm uppercase tracking-wide hover:bg-[#f5c800] transition-colors",
                  children: "SKIP TO UPLOAD FORM ↓"
                }
              ),
              /* @__PURE__ */ jsxs(
                "a",
                {
                  href: "tel:8666468499",
                  className: "text-white/80 font-semibold text-sm flex items-center gap-2 hover:text-white transition-colors",
                  children: [
                    /* @__PURE__ */ jsx(Phone, { size: 16, className: "text-[#FED44D]" }),
                    "Need help? (866) 646-8499 | (714) 455-3401 CA"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-center gap-6 text-white/70 text-sm", children: [
              /* @__PURE__ */ jsx("span", { className: "flex items-center gap-1", children: "⭐ Read Current Reviews" }),
              /* @__PURE__ */ jsx("span", { className: "flex items-center gap-1", children: "🔒 Tesla Certified" }),
              /* @__PURE__ */ jsx("span", { className: "flex items-center gap-1", children: "🏠 Serving Southern California & Idaho" }),
              /* @__PURE__ */ jsx("span", { className: "flex items-center gap-1", children: "⏱ 5-Minute Process" })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx("section", { className: "py-14 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-extrabold text-[#0B1D51] text-center mb-3", style: { fontFamily: "'Montserrat', sans-serif" }, children: "What We Need From You" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-center mb-8 max-w-2xl mx-auto", children: "We need at least one of these files to build your custom solar design. The Green Button CSV is ideal — but if you can only get your bill, that works too." }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-8 shadow-sm border-2 border-[#2BABE2] relative", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -top-3 left-6 bg-[#2BABE2] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide", children: "Preferred" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-[#003087] rounded-xl flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx("span", { className: "text-2xl", children: "📥" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "font-extrabold text-[#0B1D51] text-lg", children: "Green Button Data (CSV)" }),
              /* @__PURE__ */ jsx("p", { className: "text-[#2BABE2] text-sm font-semibold", children: "From your SCE online account" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm leading-relaxed", children: "12 months of electricity usage history from your SCE account. This gives us your exact kilowatt-hour (kWh) usage for every month — the most accurate way to size your solar system." }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 bg-blue-50 rounded-lg p-3", children: [
            /* @__PURE__ */ jsx("p", { className: "text-blue-800 text-xs font-semibold", children: "Why this matters:" }),
            /* @__PURE__ */ jsx("p", { className: "text-blue-700 text-xs mt-1", children: "Your kWh data tells us your peak summer usage, seasonal patterns, and total annual consumption — so we can design a system that covers your needs without over-building." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-8 shadow-sm border border-gray-200", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx("span", { className: "text-2xl", children: "🧾" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "font-extrabold text-[#0B1D51] text-lg", children: "Latest Edison Bill" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm font-semibold", children: "PDF download or clear photo" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm leading-relaxed", children: "A PDF download or clear photo of your most recent bill so we can see your rate plan, meter type, and current charges." }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 bg-gray-50 rounded-lg p-3", children: [
            /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-xs font-semibold", children: "What we look for:" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-xs mt-1", children: "Your rate plan (TOU-D-PRIME, TOU-D-4-9PM, etc.), your monthly charge total, and your service address to confirm your utility territory." })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 md:py-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-[#0B1D51] text-center mb-3", style: { fontFamily: "'Montserrat', sans-serif" }, children: "How to Get Your SCE Data" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-center mb-10", children: "Click each step to expand. Follow along — it takes about 5 minutes." }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: SCE_STEPS.map((step, idx) => {
        const isOpen = openStep === idx;
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: `border-2 rounded-xl overflow-hidden transition-all ${isOpen ? "border-[#2BABE2] shadow-md" : "border-gray-200 hover:border-gray-300"}`,
            children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  className: "w-full flex items-center gap-4 p-5 text-left bg-white hover:bg-gray-50 transition-colors",
                  onClick: () => setOpenStep(isOpen ? null : idx),
                  children: [
                    /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: `w-9 h-9 rounded-full flex items-center justify-center text-sm font-extrabold flex-shrink-0 transition-colors ${isOpen ? "bg-[#0B1D51] text-white" : "bg-gray-100 text-gray-600"}`,
                        children: step.num
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { className: "font-bold text-[#0B1D51] text-base flex-1", children: step.title }),
                    isOpen ? /* @__PURE__ */ jsx(ChevronUp, { size: 20, className: "text-[#2BABE2] flex-shrink-0" }) : /* @__PURE__ */ jsx(ChevronDown, { size: 20, className: "text-gray-400 flex-shrink-0" })
                  ]
                }
              ),
              isOpen && /* @__PURE__ */ jsx("div", { className: "px-5 pb-5 pt-2 bg-white border-t border-gray-100", children: step.content })
            ]
          },
          step.num
        );
      }) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-10 bg-[#0B1D51] rounded-2xl p-8 text-center", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-white font-extrabold text-xl mb-2", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Need Help? We Do This Every Day." }),
        /* @__PURE__ */ jsx("p", { className: "text-white/70 text-sm mb-5", children: "Can't find the Green Button page or the file won't download? Just give us a call — we'll walk you through it in a few minutes." }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "tel:8666468499",
              className: "bg-[#FED44D] text-[#0B1D51] font-extrabold px-6 py-3 rounded-full text-sm uppercase tracking-wide hover:bg-[#f5c800] transition-colors no-underline flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsx(Phone, { size: 16 }),
                " (866) 646-8499"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "tel:7144553401",
              className: "bg-[#0B1D51] text-[#FED44D] font-extrabold px-6 py-3 rounded-full text-sm uppercase tracking-wide hover:bg-[#162a6e] transition-colors no-underline flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsx(Phone, { size: 16 }),
                " (714) 455-3401 CA"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "mailto:info@pellsolar.com",
              className: "text-white/80 font-semibold text-sm flex items-center gap-2 hover:text-white transition-colors no-underline",
              children: [
                /* @__PURE__ */ jsx(Mail, { size: 16, className: "text-[#FED44D]" }),
                " info@pellsolar.com"
              ]
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { ref: formRef, className: "py-16 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-[#0B1D51] text-center mb-3", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Your Info & Files" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-center mb-10", children: "Fill in your details and upload your files below. We'll review everything and reach out within 24 hours." }),
      submitted ? /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-12 text-center shadow-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "text-6xl mb-5", children: "✅" }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-extrabold text-[#0B1D51] mb-3", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Files Received!" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-6 max-w-md mx-auto", children: "We've got your data. Our team will review your usage and reach out within 24 hours with your custom solar estimate." }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "tel:8666468499",
              className: "bg-[#FED44D] text-[#0B1D51] font-extrabold px-6 py-3 rounded-full text-sm uppercase tracking-wide hover:bg-[#f5c800] transition-colors no-underline flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsx(Phone, { size: 16 }),
                " Call Us Now"
              ]
            }
          ),
          /* @__PURE__ */ jsx("a", { href: "/", className: "text-[#2BABE2] font-semibold text-sm hover:underline no-underline", children: "← Back to Home" })
        ] })
      ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "bg-white rounded-2xl p-8 shadow-sm space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "First Name *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                required: true,
                value: form.firstName,
                onChange: (e) => setForm((f) => ({ ...f, firstName: e.target.value })),
                placeholder: "First name",
                className: "w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2BABE2] focus:border-transparent"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Last Name *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                required: true,
                value: form.lastName,
                onChange: (e) => setForm((f) => ({ ...f, lastName: e.target.value })),
                placeholder: "Last name",
                className: "w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2BABE2] focus:border-transparent"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Email *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                required: true,
                value: form.email,
                onChange: (e) => setForm((f) => ({ ...f, email: e.target.value })),
                placeholder: "you@email.com",
                className: "w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2BABE2] focus:border-transparent"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Phone *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "tel",
                required: true,
                value: form.phone,
                onChange: (e) => setForm((f) => ({ ...f, phone: e.target.value })),
                placeholder: "(555) 555-5555",
                className: "w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2BABE2] focus:border-transparent"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Address (where solar will be installed) *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              required: true,
              value: form.address,
              onChange: (e) => setForm((f) => ({ ...f, address: e.target.value })),
              placeholder: "123 Main St, Upland, CA 91786",
              className: "w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2BABE2] focus:border-transparent"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-3", children: "What are you uploading?" }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-4", children: ["csv", "bill", "both"].map((type) => /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "radio",
                name: "uploadType",
                value: type,
                checked: uploadType === type,
                onChange: () => setUploadType(type),
                className: "accent-[#2BABE2]"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-700", children: type === "csv" ? "Green Button CSV only" : type === "bill" ? "Utility Bill only" : "Both files" })
          ] }, type)) })
        ] }),
        (uploadType === "csv" || uploadType === "both") && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: [
            "Green Button CSV File ",
            /* @__PURE__ */ jsx("span", { className: "text-gray-400 font-normal", children: "(from SCE — .csv)" })
          ] }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              onClick: () => csvInputRef.current?.click(),
              onDragOver: (e) => {
                e.preventDefault();
                setCsvDragOver(true);
              },
              onDragLeave: () => setCsvDragOver(false),
              onDrop: (e) => {
                e.preventDefault();
                setCsvDragOver(false);
                const f = e.dataTransfer.files[0];
                if (f) setCsvFile(f);
              },
              className: `border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${csvDragOver ? "border-[#2BABE2] bg-[#2BABE2]/5" : csvFile ? "border-green-400 bg-green-50" : "border-gray-300 hover:border-[#2BABE2] hover:bg-[#2BABE2]/5"}`,
              children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    ref: csvInputRef,
                    type: "file",
                    accept: ".csv,text/csv,application/csv",
                    className: "hidden",
                    onChange: (e) => {
                      if (e.target.files?.[0]) setCsvFile(e.target.files[0]);
                    }
                  }
                ),
                csvFile ? /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("div", { className: "text-3xl mb-2", children: "📊" }),
                  /* @__PURE__ */ jsx("p", { className: "text-green-700 font-semibold", children: csvFile.name }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mt-1", children: "Click to change file" })
                ] }) : /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("div", { className: "text-4xl mb-3", children: "📊" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-600 font-semibold", children: "Drop your Green Button CSV here" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mt-1", children: "or click to browse — .csv files only" })
                ] })
              ]
            }
          )
        ] }),
        (uploadType === "bill" || uploadType === "both") && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: [
            "Utility Bill ",
            /* @__PURE__ */ jsx("span", { className: "text-gray-400 font-normal", children: "(PDF, JPG, or PNG)" })
          ] }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              onClick: () => billInputRef.current?.click(),
              onDragOver: (e) => {
                e.preventDefault();
                setBillDragOver(true);
              },
              onDragLeave: () => setBillDragOver(false),
              onDrop: (e) => {
                e.preventDefault();
                setBillDragOver(false);
                const f = e.dataTransfer.files[0];
                if (f) setBillFile(f);
              },
              className: `border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${billDragOver ? "border-[#2BABE2] bg-[#2BABE2]/5" : billFile ? "border-green-400 bg-green-50" : "border-gray-300 hover:border-[#2BABE2] hover:bg-[#2BABE2]/5"}`,
              children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    ref: billInputRef,
                    type: "file",
                    accept: ".pdf,.jpg,.jpeg,.png,.webp,.heic,.heif",
                    className: "hidden",
                    onChange: (e) => {
                      if (e.target.files?.[0]) setBillFile(e.target.files[0]);
                    }
                  }
                ),
                billFile ? /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("div", { className: "text-3xl mb-2", children: "🧾" }),
                  /* @__PURE__ */ jsx("p", { className: "text-green-700 font-semibold", children: billFile.name }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mt-1", children: "Click to change file" })
                ] }) : /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("div", { className: "text-4xl mb-3", children: "🧾" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-600 font-semibold", children: "Drop your utility bill here" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mt-1", children: "or click to browse — PDF, JPG, PNG, HEIC, WebP accepted" })
                ] })
              ]
            }
          )
        ] }),
        error && /* @__PURE__ */ jsxs("div", { className: "bg-red-50 border border-red-200 rounded-lg p-4 flex gap-2 items-start", children: [
          /* @__PURE__ */ jsx(AlertTriangle, { size: 16, className: "text-red-500 mt-0.5 flex-shrink-0" }),
          /* @__PURE__ */ jsx("p", { className: "text-red-700 text-sm", children: error })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: submitting,
            className: "w-full bg-[#FED44D] hover:bg-[#f5c800] disabled:opacity-60 text-[#0B1D51] font-extrabold py-4 px-8 rounded-lg text-lg transition-colors uppercase tracking-wide",
            children: submitting ? "Uploading..." : "SUBMIT MY FILES →"
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "text-center text-gray-400 text-xs", children: "We'll review your data and reach out within 24 hours. By submitting, you agree to be contacted by Pell Solar regarding your solar analysis." })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-14 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-6 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-extrabold text-[#0B1D51] mb-3", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Schedule Your Free Estimate" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-6", children: "Already uploaded your files? Pick a time that works for you and we'll walk you through your custom solar design on a quick call." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "tel:8666468499",
            className: "bg-[#0B1D51] text-white font-extrabold px-8 py-4 rounded-full text-sm uppercase tracking-wide hover:bg-[#0d2a6e] transition-colors no-underline flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsx(Phone, { size: 16 }),
              " (866) 646-8499"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "tel:7144553401",
            className: "bg-[#0B1D51] border border-[#FED44D] text-[#FED44D] font-extrabold px-8 py-4 rounded-full text-sm uppercase tracking-wide hover:bg-[#162a6e] transition-colors no-underline flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsx(Phone, { size: 16 }),
              " (714) 455-3401 CA"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "mailto:info@pellsolar.com",
            className: "text-[#2BABE2] font-semibold text-sm flex items-center gap-2 hover:underline no-underline",
            children: [
              /* @__PURE__ */ jsx(Mail, { size: 16 }),
              " info@pellsolar.com"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-xs mt-4", children: "Monday–Friday • 8am–5pm • No pressure, no obligation" })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
function ThankYou() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const isReturning = params.get("returning") === "1";
  const dealId = params.get("deal_id");
  const leadId = params.get("lead_id");
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!leadId) return;
    const conversionKey = `pellsolar-lead-conversion:${leadId}`;
    try {
      if (window.sessionStorage.getItem(conversionKey)) return;
      window.sessionStorage.setItem(conversionKey, "1");
    } catch {
    }
    if (typeof window.fbq === "function") {
      window.fbq("track", "Lead");
    }
    if (typeof window.gtag === "function") {
      window.gtag("event", "conversion", {
        send_to: "AW-17865947343/TI2CCLSThPQbEM_xksdC"
      });
    }
  }, [leadId]);
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-white flex flex-col", children: /* @__PURE__ */ jsx("div", { className: "flex-1 flex items-center justify-center py-20 px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsx("div", { className: "w-20 h-20 rounded-full bg-green-100 flex items-center justify-center", children: /* @__PURE__ */ jsx(CheckCircle, { className: "w-12 h-12 text-green-500" }) }) }),
    /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-extrabold text-[#0a1628] mb-4", children: isReturning ? "We Already Have You!" : "Thank You!" }),
    /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-600 mb-2", children: isReturning ? "It looks like we already have your information on file." : "We received your request and will be in touch shortly." }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-500 mb-10", children: isReturning ? "Our team will be reaching out to you soon. If you need immediate assistance, give us a call!" : "A Pell Solar energy advisor will contact you within 1 business day to discuss your options." }),
    dealId && /* @__PURE__ */ jsxs("div", { className: "bg-[#0B1D51] rounded-2xl p-8 mb-10 text-left", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-[#00b4d8] flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx(Calendar, { className: "w-5 h-5 text-white" }) }),
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-white", children: "Want to schedule your consultation now?" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-blue-200 mb-5 ml-13", children: "Skip the wait — pick a time that works for you and we'll have everything ready before your call." }),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: `https://app.pellsolar.com/book?deal_id=${dealId}`,
          className: "inline-flex items-center gap-2 bg-[#f5a623] text-[#0B1D51] px-7 py-3 rounded-full font-bold text-lg hover:bg-[#e09510] transition-colors",
          children: [
            /* @__PURE__ */ jsx(Calendar, { className: "w-5 h-5" }),
            "Schedule My Consultation"
          ]
        }
      )
    ] }),
    !dealId && /* @__PURE__ */ jsxs("div", { className: "bg-[#f0f7ff] rounded-2xl p-8 mb-10 text-left", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-[#0a1628] mb-4", children: "What happens next?" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-7 h-7 rounded-full bg-[#00b4d8] text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5", children: "1" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-700", children: "Our team reviews your information and prepares a custom proposal for your home." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-7 h-7 rounded-full bg-[#00b4d8] text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5", children: "2" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-700", children: "An energy advisor calls or texts you to schedule a free consultation." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-7 h-7 rounded-full bg-[#00b4d8] text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5", children: "3" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-700", children: "We walk you through your savings estimate, financing options, and timeline — no pressure." })
        ] })
      ] })
    ] }),
    dealId && /* @__PURE__ */ jsxs("div", { className: "bg-[#f0f7ff] rounded-2xl p-6 mb-10 text-left", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-base font-bold text-[#0a1628] mb-3", children: "What happens after you book?" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-full bg-[#00b4d8] text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5", children: "1" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-700", children: "You'll receive a confirmation email with your appointment date and time." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-full bg-[#00b4d8] text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5", children: "2" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-700", children: "Your energy advisor reviews your info and prepares a custom savings estimate." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-full bg-[#00b4d8] text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5", children: "3" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-700", children: "We walk you through your options — no pressure, no obligation." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center mb-10", children: [
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: "tel:+18666468499",
          className: "flex items-center gap-2 justify-center bg-[#0a1628] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#1a2a4a] transition-colors",
          children: [
            /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4" }),
            "(866) 646-8499"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: "tel:7144553401",
          className: "flex items-center gap-2 justify-center bg-[#0B1D51] text-[#FED44D] px-6 py-3 rounded-full font-semibold hover:bg-[#162a6e] transition-colors",
          children: [
            /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4" }),
            "(714) 455-3401 CA Local"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: "mailto:info@pellsolar.com",
          className: "flex items-center gap-2 justify-center border-2 border-[#0a1628] text-[#0a1628] px-6 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors",
          children: [
            /* @__PURE__ */ jsx(Mail, { className: "w-4 h-4" }),
            "info@pellsolar.com"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-[#00b4d8] font-semibold hover:underline cursor-pointer", children: [
      "Back to Home ",
      /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
    ] }) })
  ] }) }) });
}
function Unsubscribe() {
  const [location] = useLocation();
  const params = new URLSearchParams(window.location.search);
  const email = params.get("email") ?? "";
  const token = params.get("token") ?? "";
  const [status, setStatus] = useState("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const processMutation = trpc.unsubscribe.process.useMutation({
    onSuccess(data) {
      if (data.alreadyUnsubscribed) {
        setStatus("already");
      } else {
        setStatus("success");
      }
    },
    onError(err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  });
  useEffect(() => {
    if (!email || !token) {
      setStatus("error");
      setErrorMsg("This unsubscribe link is invalid or incomplete.");
      return;
    }
    processMutation.mutate({ email, token });
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsx("a", { href: "/", className: "inline-block", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: "/pell-solar-logo.png",
        alt: "Pell Solar",
        className: "h-10 mx-auto",
        onError: (e) => {
          e.target.style.display = "none";
        }
      }
    ) }) }),
    status === "loading" && /* @__PURE__ */ jsxs("div", { className: "py-8", children: [
      /* @__PURE__ */ jsx("div", { className: "inline-block w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm", children: "Processing your request…" })
    ] }),
    status === "success" && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 text-green-600", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M5 13l4 4L19 7" }) }) }),
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900 mb-2", children: "You've been unsubscribed" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-1", children: "You've been successfully unsubscribed from Pell Solar emails." }),
      email && /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400 mb-6", children: [
        /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-500", children: email }),
        " has been removed from our mailing list."
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 mb-6", children: [
        "If you unsubscribed by mistake or have questions, please contact us at",
        " ",
        /* @__PURE__ */ jsx("a", { href: "mailto:info@pellsolar.com", className: "text-orange-600 hover:underline", children: "info@pellsolar.com" }),
        "."
      ] }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm",
          children: "Return to Pell Solar"
        }
      )
    ] }),
    status === "already" && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 text-blue-600", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" }) }) }),
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900 mb-2", children: "Already unsubscribed" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-6", children: email ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: email }),
        " is already unsubscribed from Pell Solar emails."
      ] }) : "This email is already unsubscribed from Pell Solar emails." }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm",
          children: "Return to Pell Solar"
        }
      )
    ] }),
    status === "error" && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 text-red-600", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" }) }) }),
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900 mb-2", children: "Unable to unsubscribe" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-6", children: errorMsg }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 mb-6", children: [
        "Please contact us directly at",
        " ",
        /* @__PURE__ */ jsx("a", { href: "mailto:info@pellsolar.com", className: "text-orange-600 hover:underline", children: "info@pellsolar.com" }),
        " ",
        "and we'll remove you right away."
      ] }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm",
          children: "Return to Pell Solar"
        }
      )
    ] })
  ] }) });
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function Avatar({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AvatarPrimitive.Root,
    {
      "data-slot": "avatar",
      className: cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      ),
      ...props
    }
  );
}
function AvatarFallback({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AvatarPrimitive.Fallback,
    {
      "data-slot": "avatar-fallback",
      className: cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      ),
      ...props
    }
  );
}
function DropdownMenu({
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Root, { "data-slot": "dropdown-menu", ...props });
}
function DropdownMenuTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Trigger,
    {
      "data-slot": "dropdown-menu-trigger",
      ...props
    }
  );
}
function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Content,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset,
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
        className
      ),
      ...props
    }
  ) });
}
function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": inset,
      "data-variant": variant,
      className: cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-transparent shadow-xs hover:bg-accent dark:bg-transparent dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
const DialogCompositionContext = React.createContext({
  isComposing: () => false,
  setComposing: () => {
  },
  justEndedComposing: () => false,
  markCompositionEnd: () => {
  }
});
const useDialogComposition = () => React.useContext(DialogCompositionContext);
function usePersistFn(fn) {
  const fnRef = useRef(fn);
  fnRef.current = fn;
  const persistFn = useRef(null);
  if (!persistFn.current) {
    persistFn.current = function(...args) {
      return fnRef.current.apply(this, args);
    };
  }
  return persistFn.current;
}
function useComposition(options = {}) {
  const {
    onKeyDown: originalOnKeyDown,
    onCompositionStart: originalOnCompositionStart,
    onCompositionEnd: originalOnCompositionEnd
  } = options;
  const c = useRef(false);
  const timer = useRef(null);
  const timer2 = useRef(null);
  const onCompositionStart = usePersistFn((e) => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    if (timer2.current) {
      clearTimeout(timer2.current);
      timer2.current = null;
    }
    c.current = true;
    originalOnCompositionStart?.(e);
  });
  const onCompositionEnd = usePersistFn((e) => {
    timer.current = setTimeout(() => {
      timer2.current = setTimeout(() => {
        c.current = false;
      });
    });
    originalOnCompositionEnd?.(e);
  });
  const onKeyDown = usePersistFn((e) => {
    if (c.current && (e.key === "Escape" || e.key === "Enter" && !e.shiftKey)) {
      e.stopPropagation();
      return;
    }
    originalOnKeyDown?.(e);
  });
  const isComposing = usePersistFn(() => {
    return c.current;
  });
  return {
    onCompositionStart,
    onCompositionEnd,
    onKeyDown,
    isComposing
  };
}
function Input({
  className,
  type,
  onKeyDown,
  onCompositionStart,
  onCompositionEnd,
  ...props
}) {
  const dialogComposition = useDialogComposition();
  const {
    onCompositionStart: handleCompositionStart,
    onCompositionEnd: handleCompositionEnd,
    onKeyDown: handleKeyDown
  } = useComposition({
    onKeyDown: (e) => {
      const isComposing = e.nativeEvent.isComposing || dialogComposition.justEndedComposing();
      if (e.key === "Enter" && isComposing) {
        return;
      }
      onKeyDown?.(e);
    },
    onCompositionStart: (e) => {
      dialogComposition.setComposing(true);
      onCompositionStart?.(e);
    },
    onCompositionEnd: (e) => {
      dialogComposition.markCompositionEnd();
      setTimeout(() => {
        dialogComposition.setComposing(false);
      }, 100);
      onCompositionEnd?.(e);
    }
  });
  return /* @__PURE__ */ jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      onCompositionStart: handleCompositionStart,
      onCompositionEnd: handleCompositionEnd,
      onKeyDown: handleKeyDown,
      ...props
    }
  );
}
function Sheet({ ...props }) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Root, { "data-slot": "sheet", ...props });
}
function SheetPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Portal, { "data-slot": "sheet-portal", ...props });
}
function SheetOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Overlay,
    {
      "data-slot": "sheet-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function SheetContent({
  className,
  children,
  side = "right",
  ...props
}) {
  return /* @__PURE__ */ jsxs(SheetPortal, { children: [
    /* @__PURE__ */ jsx(SheetOverlay, {}),
    /* @__PURE__ */ jsxs(
      DialogPrimitive.Content,
      {
        "data-slot": "sheet-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        ),
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none", children: [
            /* @__PURE__ */ jsx(XIcon, { className: "size-4" }),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function SheetHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sheet-header",
      className: cn("flex flex-col gap-1.5 p-4", className),
      ...props
    }
  );
}
function SheetTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Title,
    {
      "data-slot": "sheet-title",
      className: cn("text-foreground font-semibold", className),
      ...props
    }
  );
}
function SheetDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Description,
    {
      "data-slot": "sheet-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("bg-accent animate-pulse rounded-md", className),
      ...props
    }
  );
}
function TooltipProvider({
  delayDuration = 0,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TooltipPrimitive.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration,
      ...props
    }
  );
}
function Tooltip({
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsx(TooltipPrimitive.Root, { "data-slot": "tooltip", ...props }) });
}
function TooltipTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipPrimitive.Trigger, { "data-slot": "tooltip-trigger", ...props });
}
function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
    TooltipPrimitive.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset,
      className: cn(
        "bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(TooltipPrimitive.Arrow, { className: "bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" })
      ]
    }
  ) });
}
const MOBILE_BREAKPOINT = 768;
function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(
    void 0
  );
  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return !!isMobile;
}
const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";
const SidebarContext = React.createContext(null);
function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}
function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open]
  );
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open2) => !open2) : setOpen((open2) => !open2);
  }, [isMobile, setOpen, setOpenMobile]);
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);
  const state = open ? "expanded" : "collapsed";
  const contextValue = React.useMemo(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  );
  return /* @__PURE__ */ jsx(SidebarContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx(TooltipProvider, { delayDuration: 0, children: /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-wrapper",
      style: {
        "--sidebar-width": SIDEBAR_WIDTH,
        "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
        ...style
      },
      className: cn(
        "group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
        className
      ),
      ...props,
      children
    }
  ) }) });
}
function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  disableTransition = false,
  className,
  children,
  ...props
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
  if (collapsible === "none") {
    return /* @__PURE__ */ jsx(
      "div",
      {
        "data-slot": "sidebar",
        className: cn(
          "bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col",
          className
        ),
        ...props,
        children
      }
    );
  }
  if (isMobile) {
    return /* @__PURE__ */ jsx(Sheet, { open: openMobile, onOpenChange: setOpenMobile, ...props, children: /* @__PURE__ */ jsxs(
      SheetContent,
      {
        "data-sidebar": "sidebar",
        "data-slot": "sidebar",
        "data-mobile": "true",
        className: "bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden",
        style: {
          "--sidebar-width": SIDEBAR_WIDTH_MOBILE
        },
        side,
        children: [
          /* @__PURE__ */ jsxs(SheetHeader, { className: "sr-only", children: [
            /* @__PURE__ */ jsx(SheetTitle, { children: "Sidebar" }),
            /* @__PURE__ */ jsx(SheetDescription, { children: "Displays the mobile sidebar." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex h-full w-full flex-col", children })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "group peer text-sidebar-foreground hidden md:block",
      "data-state": state,
      "data-collapsible": state === "collapsed" ? collapsible : "",
      "data-variant": variant,
      "data-side": side,
      "data-slot": "sidebar",
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            "data-slot": "sidebar-gap",
            className: cn(
              "relative w-(--sidebar-width) bg-transparent",
              disableTransition ? "transition-none" : "transition-[width] duration-200 ease-linear",
              "group-data-[collapsible=offcanvas]:w-0",
              "group-data-[side=right]:rotate-180",
              variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
            )
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            "data-slot": "sidebar-container",
            className: cn(
              "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) md:flex",
              disableTransition ? "transition-none" : "transition-[left,right,width] duration-200 ease-linear",
              side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
              className
            ),
            ...props,
            children: /* @__PURE__ */ jsx(
              "div",
              {
                "data-sidebar": "sidebar",
                "data-slot": "sidebar-inner",
                className: "bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm",
                children
              }
            )
          }
        )
      ]
    }
  );
}
function SidebarTrigger({
  className,
  onClick,
  ...props
}) {
  const { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ jsxs(
    Button,
    {
      "data-sidebar": "trigger",
      "data-slot": "sidebar-trigger",
      variant: "ghost",
      size: "icon",
      className: cn("size-7", className),
      onClick: (event) => {
        onClick?.(event);
        toggleSidebar();
      },
      ...props,
      children: [
        /* @__PURE__ */ jsx(PanelLeftIcon, {}),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
}
function SidebarInset({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "main",
    {
      "data-slot": "sidebar-inset",
      className: cn(
        "bg-background relative flex w-full flex-1 flex-col",
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className
      ),
      ...props
    }
  );
}
function SidebarHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-header",
      "data-sidebar": "header",
      className: cn("flex flex-col gap-2 p-2", className),
      ...props
    }
  );
}
function SidebarFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-footer",
      "data-sidebar": "footer",
      className: cn("flex flex-col gap-2 p-2", className),
      ...props
    }
  );
}
function SidebarContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-content",
      "data-sidebar": "content",
      className: cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      ),
      ...props
    }
  );
}
function SidebarMenu({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "ul",
    {
      "data-slot": "sidebar-menu",
      "data-sidebar": "menu",
      className: cn("flex w-full min-w-0 flex-col gap-1", className),
      ...props
    }
  );
}
function SidebarMenuItem({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "li",
    {
      "data-slot": "sidebar-menu-item",
      "data-sidebar": "menu-item",
      className: cn("group/menu-item relative", className),
      ...props
    }
  );
}
const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  const { isMobile, state } = useSidebar();
  const button = /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "sidebar-menu-button",
      "data-sidebar": "menu-button",
      "data-size": size,
      "data-active": isActive,
      className: cn(sidebarMenuButtonVariants({ variant, size }), className),
      ...props
    }
  );
  if (!tooltip) {
    return button;
  }
  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip
    };
  }
  return /* @__PURE__ */ jsxs(Tooltip, { children: [
    /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: button }),
    /* @__PURE__ */ jsx(
      TooltipContent,
      {
        side: "right",
        align: "center",
        hidden: state !== "collapsed" || isMobile,
        ...tooltip
      }
    )
  ] });
}
function DashboardLayoutSkeleton() {
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxs("div", { className: "w-[280px] border-r border-border bg-background p-4 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 px-2", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-8 w-8 rounded-md" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-24" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2 px-2", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full rounded-lg" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full rounded-lg" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full rounded-lg" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 left-4 right-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 px-1", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-9 w-9 rounded-full" }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-2", children: [
          /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-20" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-2 w-32" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 p-4 space-y-4", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "h-12 w-48 rounded-lg" }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-32 rounded-xl" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-32 rounded-xl" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-32 rounded-xl" })
      ] }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-64 rounded-xl" })
    ] })
  ] });
}
const menuItems = [
  { icon: LayoutDashboard, label: "Leads", path: "/admin" },
  { icon: Image, label: "Project Photos", path: "/admin/photos" },
  { icon: Mail, label: "Unsubscribes", path: "/admin/unsubscribes" },
  { icon: MessageCircle, label: "Live Chat", path: "/admin/chat" }
];
const SIDEBAR_WIDTH_KEY = "sidebar-width";
const DEFAULT_WIDTH = 280;
const MIN_WIDTH = 200;
const MAX_WIDTH = 480;
function DashboardLayout({
  children
}) {
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const saved = localStorage.getItem(SIDEBAR_WIDTH_KEY);
    return saved ? parseInt(saved, 10) : DEFAULT_WIDTH;
  });
  const { loading, user } = useAuth();
  useEffect(() => {
    localStorage.setItem(SIDEBAR_WIDTH_KEY, sidebarWidth.toString());
  }, [sidebarWidth]);
  if (loading) {
    return /* @__PURE__ */ jsx(DashboardLayoutSkeleton, {});
  }
  if (!user) {
    return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center min-h-screen", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-8 p-8 max-w-md w-full", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-6", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold tracking-tight text-center", children: "Sign in to continue" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground text-center max-w-sm", children: "Access to this dashboard requires authentication. Continue to launch the login flow." })
      ] }),
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: () => {
            window.location.href = getLoginUrl();
          },
          size: "lg",
          className: "w-full shadow-lg hover:shadow-xl transition-all",
          children: "Sign in"
        }
      )
    ] }) });
  }
  return /* @__PURE__ */ jsx(
    SidebarProvider,
    {
      style: {
        "--sidebar-width": `${sidebarWidth}px`
      },
      children: /* @__PURE__ */ jsx(DashboardLayoutContent, { setSidebarWidth, children })
    }
  );
}
function DashboardLayoutContent({
  children,
  setSidebarWidth
}) {
  const { user, logout } = useAuth();
  const [location, setLocation] = useLocation();
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef(null);
  const activeMenuItem = menuItems.find((item) => item.path === location);
  const isMobile = useIsMobile();
  useEffect(() => {
    if (isCollapsed) {
      setIsResizing(false);
    }
  }, [isCollapsed]);
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;
      const sidebarLeft = sidebarRef.current?.getBoundingClientRect().left ?? 0;
      const newWidth = e.clientX - sidebarLeft;
      if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
        setSidebarWidth(newWidth);
      }
    };
    const handleMouseUp = () => {
      setIsResizing(false);
    };
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing, setSidebarWidth]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "relative", ref: sidebarRef, children: [
      /* @__PURE__ */ jsxs(
        Sidebar,
        {
          collapsible: "icon",
          className: "border-r-0",
          disableTransition: isResizing,
          children: [
            /* @__PURE__ */ jsx(SidebarHeader, { className: "h-16 justify-center", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 px-2 transition-all w-full", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: toggleSidebar,
                  className: "h-8 w-8 flex items-center justify-center hover:bg-accent rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring shrink-0",
                  "aria-label": "Toggle navigation",
                  children: /* @__PURE__ */ jsx(PanelLeft, { className: "h-4 w-4 text-muted-foreground" })
                }
              ),
              !isCollapsed ? /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 min-w-0", children: /* @__PURE__ */ jsx("span", { className: "font-semibold tracking-tight truncate", children: "Navigation" }) }) : null
            ] }) }),
            /* @__PURE__ */ jsx(SidebarContent, { className: "gap-0", children: /* @__PURE__ */ jsx(SidebarMenu, { className: "px-2 py-1", children: menuItems.map((item) => {
              const isActive = location === item.path;
              return /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxs(
                SidebarMenuButton,
                {
                  isActive,
                  onClick: () => setLocation(item.path),
                  tooltip: item.label,
                  className: `h-10 transition-all font-normal`,
                  children: [
                    /* @__PURE__ */ jsx(
                      item.icon,
                      {
                        className: `h-4 w-4 ${isActive ? "text-primary" : ""}`
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { children: item.label })
                  ]
                }
              ) }, item.path);
            }) }) }),
            /* @__PURE__ */ jsx(SidebarFooter, { className: "p-3", children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [
              /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs("button", { className: "flex items-center gap-3 rounded-lg px-1 py-1 hover:bg-accent/50 transition-colors w-full text-left group-data-[collapsible=icon]:justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ring", children: [
                /* @__PURE__ */ jsx(Avatar, { className: "h-9 w-9 border shrink-0", children: /* @__PURE__ */ jsx(AvatarFallback, { className: "text-xs font-medium", children: user?.name?.charAt(0).toUpperCase() }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0 group-data-[collapsible=icon]:hidden", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-medium truncate leading-none", children: user?.name || "-" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground truncate mt-1.5", children: user?.email || "-" })
                ] })
              ] }) }),
              /* @__PURE__ */ jsx(DropdownMenuContent, { align: "end", className: "w-48", children: /* @__PURE__ */ jsxs(
                DropdownMenuItem,
                {
                  onClick: logout,
                  className: "cursor-pointer text-destructive focus:text-destructive",
                  children: [
                    /* @__PURE__ */ jsx(LogOut, { className: "mr-2 h-4 w-4" }),
                    /* @__PURE__ */ jsx("span", { children: "Sign out" })
                  ]
                }
              ) })
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-primary/20 transition-colors ${isCollapsed ? "hidden" : ""}`,
          onMouseDown: () => {
            if (isCollapsed) return;
            setIsResizing(true);
          },
          style: { zIndex: 50 }
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(SidebarInset, { children: [
      isMobile && /* @__PURE__ */ jsx("div", { className: "flex border-b h-14 items-center justify-between bg-background/95 px-2 backdrop-blur supports-[backdrop-filter]:backdrop-blur sticky top-0 z-40", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(SidebarTrigger, { className: "h-9 w-9 rounded-lg bg-background" }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-1", children: /* @__PURE__ */ jsx("span", { className: "tracking-tight text-foreground", children: activeMenuItem?.label ?? "Menu" }) }) })
      ] }) }),
      /* @__PURE__ */ jsx("main", { className: "flex-1 p-4", children })
    ] })
  ] });
}
function AdminUnsubscribes() {
  const { user, loading: authLoading } = useAuth();
  const [, navigate] = useLocation();
  const [search, setSearch] = useState("");
  const { data: unsubscribes, isLoading } = trpc.unsubscribe.list.useQuery(void 0, {
    enabled: !!user && user.role === "admin"
  });
  if (authLoading) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" }) });
  }
  if (!user || user.role !== "admin") {
    navigate("/");
    return null;
  }
  const filtered = (unsubscribes ?? []).filter((u) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return u.email.toLowerCase().includes(q) || (u.campaign ?? "").toLowerCase().includes(q) || (u.ipAddress ?? "").toLowerCase().includes(q);
  });
  const exportCsv = () => {
    if (!unsubscribes || unsubscribes.length === 0) return;
    const header = "Email,Campaign,IP Address,Date\n";
    const rows = unsubscribes.map(
      (u) => [
        `"${u.email}"`,
        `"${u.campaign ?? ""}"`,
        `"${u.ipAddress ?? ""}"`,
        `"${new Date(u.createdAt).toISOString()}"`
      ].join(",")
    ).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `unsubscribes-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };
  return /* @__PURE__ */ jsx(DashboardLayout, { children: /* @__PURE__ */ jsxs("div", { className: "p-6 max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Unsubscribes" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-0.5", children: "Compliance record of all email unsubscribe requests" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500", children: unsubscribes ? `${unsubscribes.length} total` : "" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: exportCsv,
            disabled: !unsubscribes || unsubscribes.length === 0,
            className: "bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors",
            children: "Export CSV"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        placeholder: "Search by email, campaign, or IP…",
        value: search,
        onChange: (e) => setSearch(e.target.value),
        className: "w-full sm:w-80 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden", children: isLoading ? /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center py-16", children: /* @__PURE__ */ jsx("div", { className: "w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" }) }) : filtered.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-16 text-gray-400", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-12 h-12 mx-auto mb-3 opacity-40", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }),
      /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: search ? "No results found" : "No unsubscribes yet" })
    ] }) : /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-50 border-b border-gray-100", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "text-left px-4 py-3 font-semibold text-gray-600", children: "Email" }),
        /* @__PURE__ */ jsx("th", { className: "text-left px-4 py-3 font-semibold text-gray-600", children: "Campaign" }),
        /* @__PURE__ */ jsx("th", { className: "text-left px-4 py-3 font-semibold text-gray-600", children: "IP Address" }),
        /* @__PURE__ */ jsx("th", { className: "text-left px-4 py-3 font-semibold text-gray-600", children: "Date" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-50", children: filtered.map((u) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50 transition-colors", children: [
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-medium text-gray-900", children: u.email }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-gray-500", children: u.campaign || /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "—" }) }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-gray-500 font-mono text-xs", children: u.ipAddress || /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "—" }) }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-gray-500", children: new Date(u.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        }) })
      ] }, u.id)) })
    ] }) }) })
  ] }) });
}
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
function AdminChat() {
  const params = useParams();
  const { user, loading, isAuthenticated } = useAuth();
  const [mobileView, setMobileView] = useState(
    params.sessionId ? "chat" : "list"
  );
  const [selectedSessionId, setSelectedSessionId] = useState(
    params.sessionId ? parseInt(params.sessionId) : null
  );
  const [replyText, setReplyText] = useState("");
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);
  const inputBarRef = useRef(null);
  const { data: statusData, refetch: refetchStatus } = trpc.chat.getStatus.useQuery(
    void 0,
    { enabled: isAuthenticated && user?.role === "admin" }
  );
  const setOnlineStatus = trpc.chat.setOnlineStatus.useMutation({
    onSuccess: (data) => {
      refetchStatus();
      if (data.isOnline) {
        toast.success("Chat is now ONLINE — visitors can start chatting");
      } else {
        toast("Chat is now OFFLINE");
      }
    }
  });
  const { data: sessions, refetch: refetchSessions } = trpc.chat.getSessions.useQuery(
    { status: "all" },
    {
      enabled: isAuthenticated && user?.role === "admin",
      refetchInterval: isAuthenticated && user?.role === "admin" ? 5e3 : false
    }
  );
  const { data: sessionData } = trpc.chat.getSessionMessages.useQuery(
    { sessionId: selectedSessionId },
    {
      enabled: !!selectedSessionId && isAuthenticated && user?.role === "admin",
      refetchInterval: !!selectedSessionId && isAuthenticated ? 2e3 : false
    }
  );
  const adminReply = trpc.chat.adminReply.useMutation({
    onSuccess: () => {
      setReplyText("");
      refetchSessions();
    }
  });
  const closeSession = trpc.chat.closeSession.useMutation({
    onSuccess: () => {
      refetchSessions();
      toast("Chat closed");
    }
  });
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
    if (distanceFromBottom < 120) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [sessionData?.messages]);
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const pinInput = () => {
      const bar = inputBarRef.current;
      if (!bar) return;
      const offset = window.innerHeight - vv.height - vv.offsetTop;
      bar.style.transform = `translateY(-${Math.max(0, offset)}px)`;
    };
    vv.addEventListener("resize", pinInput);
    vv.addEventListener("scroll", pinInput);
    return () => {
      vv.removeEventListener("resize", pinInput);
      vv.removeEventListener("scroll", pinInput);
    };
  }, []);
  const handleInputFocus = () => {
    setTimeout(() => {
      const container = messagesContainerRef.current;
      if (container) container.scrollTop = container.scrollHeight;
    }, 350);
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50", children: /* @__PURE__ */ jsx(RefreshCw, { className: "w-8 h-8 animate-spin", style: { color: "var(--gold)" } }) });
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "text-center max-w-sm px-6", children: [
      /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6", style: { background: "rgba(15,31,61,0.08)" }, children: /* @__PURE__ */ jsx(Sun, { className: "w-8 h-8", style: { color: "var(--navy)" } }) }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-3", style: { color: "var(--navy)" }, children: "Admin Login Required" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 mb-6", children: "Please sign in to access the Pell Solar live chat dashboard." }),
      /* @__PURE__ */ jsx("a", { href: getLoginUrl(window.location.pathname), children: /* @__PURE__ */ jsx("button", { className: "btn-navy px-8 py-3 rounded-xl w-full", children: "Sign In" }) })
    ] }) });
  }
  if (user?.role !== "admin") {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx(XCircle, { className: "w-12 h-12 text-red-400 mx-auto mb-4" }),
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-800", children: "Access Denied" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 mt-2", children: "You need admin privileges to view this page." }),
      /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsx("button", { className: "btn-navy mt-6 px-6 py-2.5 rounded-xl text-sm", children: "Back to Home" }) })
    ] }) });
  }
  const handleSelectSession = (id) => {
    setSelectedSessionId(id);
    setMobileView("chat");
  };
  const handleBack = () => {
    setMobileView("list");
    setSelectedSessionId(null);
  };
  const handleSendReply = () => {
    if (!replyText.trim() || !selectedSessionId) return;
    adminReply.mutate({ sessionId: selectedSessionId, message: replyText.trim() });
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendReply();
    }
  };
  const activeSessions = sessions?.filter((s) => s.status === "active") ?? [];
  const closedSessions = sessions?.filter((s) => s.status !== "active") ?? [];
  const formatTime = (date) => {
    return new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
  };
  const formatShortTime = (date) => {
    const d = new Date(date);
    const now = /* @__PURE__ */ new Date();
    const isToday = d.toDateString() === now.toDateString();
    if (isToday) {
      return d.toLocaleString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
    }
    return d.toLocaleString("en-US", { month: "short", day: "numeric" });
  };
  const isOnline = statusData?.isOnline ?? false;
  return /* @__PURE__ */ jsxs("div", { className: "flex bg-gray-50 overflow-hidden", style: { height: "100dvh" }, children: [
    /* @__PURE__ */ jsxs("div", { className: `
        flex flex-col bg-white border-r border-gray-200
        w-full md:w-80 md:flex shrink-0
        ${mobileView === "list" ? "flex" : "hidden md:flex"}
      `, children: [
      /* @__PURE__ */ jsxs("div", { className: "px-4 pt-4 pb-4 border-b border-gray-100 bg-white shrink-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(MessageCircle, { className: "w-5 h-5 text-[#1a56db]" }),
            /* @__PURE__ */ jsx("h1", { className: "text-lg font-bold text-gray-900", children: "Live Chat" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setOnlineStatus.mutate({ isOnline: !isOnline }),
              disabled: setOnlineStatus.isPending,
              className: `flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all active:scale-95 ${isOnline ? "bg-green-100 text-green-700 border border-green-300" : "bg-gray-100 text-gray-500 border border-gray-300"}`,
              children: [
                setOnlineStatus.isPending ? /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsx(Power, { className: "w-4 h-4" }),
                isOnline ? "ON" : "OFF"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: `flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium ${isOnline ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-500"}`, children: [
          /* @__PURE__ */ jsx("span", { className: `w-2 h-2 rounded-full shrink-0 ${isOnline ? "bg-green-500 animate-pulse" : "bg-gray-400"}` }),
          isOnline ? "Visitors can start a chat" : "Chat is offline — showing offline message"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto", children: [
        activeSessions.length > 0 && /* @__PURE__ */ jsxs("div", { className: "pt-3", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-1", children: [
            "Active (",
            activeSessions.length,
            ")"
          ] }),
          activeSessions.map((session) => /* @__PURE__ */ jsx(
            SessionRow,
            {
              session,
              selected: selectedSessionId === session.id,
              onClick: () => handleSelectSession(session.id),
              formatTime: formatShortTime
            },
            session.id
          ))
        ] }),
        closedSessions.length > 0 && /* @__PURE__ */ jsxs("div", { className: "pt-3", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-1", children: [
            "Closed (",
            closedSessions.length,
            ")"
          ] }),
          closedSessions.map((session) => /* @__PURE__ */ jsx(
            SessionRow,
            {
              session,
              selected: selectedSessionId === session.id,
              onClick: () => handleSelectSession(session.id),
              formatTime: formatShortTime
            },
            session.id
          ))
        ] }),
        (!sessions || sessions.length === 0) && /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-48 text-center px-6", children: [
          /* @__PURE__ */ jsx(MessageCircle, { className: "w-10 h-10 text-gray-200 mb-3" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-500", children: "No chats yet" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mt-1", children: "Turn chat ON to start receiving messages" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: `
        flex-1 flex flex-col min-w-0 overflow-hidden
        ${mobileView === "chat" ? "flex" : "hidden md:flex"}
      `, children: selectedSessionId && sessionData ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 shadow-sm shrink-0", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleBack,
            className: "md:hidden flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors -ml-1 shrink-0",
            children: /* @__PURE__ */ jsx(ArrowLeft, { className: "w-5 h-5 text-gray-700" })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(User, { className: "w-5 h-5 text-[#1a56db]" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("p", { className: "font-semibold text-gray-900 truncate", children: sessionData.session.visitorName || "Anonymous Visitor" }),
            /* @__PURE__ */ jsx(
              Badge,
              {
                variant: sessionData.session.status === "active" ? "default" : "secondary",
                className: `text-xs shrink-0 ${sessionData.session.status === "active" ? "bg-green-100 text-green-700 border-green-300" : ""}`,
                children: sessionData.session.status
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-gray-500 truncate", children: [
            sessionData.session.visitorPhone && /* @__PURE__ */ jsx("a", { href: `tel:${sessionData.session.visitorPhone}`, className: "text-[#1a56db] font-medium shrink-0", children: sessionData.session.visitorPhone }),
            sessionData.session.visitorEmail && /* @__PURE__ */ jsx("span", { className: "truncate", children: sessionData.session.visitorEmail }),
            /* @__PURE__ */ jsxs("span", { className: "shrink-0 flex items-center gap-0.5", children: [
              /* @__PURE__ */ jsx(Clock, { className: "w-3 h-3" }),
              formatTime(sessionData.session.createdAt)
            ] })
          ] })
        ] }),
        sessionData.session.status === "active" && /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => closeSession.mutate({ sessionId: selectedSessionId }),
            disabled: closeSession.isPending,
            className: "shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 active:bg-gray-300 transition-colors",
            children: [
              closeSession.isPending ? /* @__PURE__ */ jsx(Loader2, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsx(CheckCircle2, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Close" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        "div",
        {
          ref: messagesContainerRef,
          className: "flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2",
          children: [
            sessionData.messages.map((msg) => /* @__PURE__ */ jsx(
              "div",
              {
                className: `flex ${msg.sender === "admin" ? "justify-end" : "justify-start"}`,
                children: /* @__PURE__ */ jsxs("div", { className: `max-w-[78%] sm:max-w-[60%] rounded-2xl px-4 py-2.5 ${msg.sender === "admin" ? "bg-[#1a56db] text-white rounded-br-md" : "bg-white border border-gray-200 text-gray-800 rounded-bl-md shadow-sm"}`, children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed break-words", children: msg.message }),
                  /* @__PURE__ */ jsx("p", { className: `text-xs mt-1 ${msg.sender === "admin" ? "text-blue-200" : "text-gray-400"}`, children: formatShortTime(msg.createdAt) })
                ] })
              },
              msg.id
            )),
            /* @__PURE__ */ jsx("div", { ref: messagesEndRef })
          ]
        }
      ),
      sessionData.session.status === "active" ? /* @__PURE__ */ jsxs("div", { ref: inputBarRef, className: "bg-white border-t border-gray-200 px-3 py-3 flex items-center gap-2 shrink-0", style: { willChange: "transform" }, children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            ref: inputRef,
            type: "text",
            placeholder: "Type a message...",
            value: replyText,
            onChange: (e) => setReplyText(e.target.value),
            onKeyDown: handleKeyDown,
            onFocus: handleInputFocus,
            style: { fontSize: "16px" },
            className: "flex-1 bg-gray-100 rounded-full px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1a56db] border-0 min-w-0"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleSendReply,
            disabled: !replyText.trim() || adminReply.isPending,
            className: "w-11 h-11 rounded-full bg-[#1a56db] text-white flex items-center justify-center shrink-0 disabled:opacity-40 active:scale-95 transition-all",
            children: adminReply.isPending ? /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsx(Send, { className: "w-4 h-4" })
          }
        )
      ] }) : /* @__PURE__ */ jsx("div", { className: "bg-gray-50 border-t border-gray-200 px-4 py-3 text-center text-sm text-gray-500 shrink-0", children: "This chat is closed" })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "hidden md:flex flex-1 flex-col items-center justify-center text-center p-8", children: [
      /* @__PURE__ */ jsx(MessageCircle, { className: "w-16 h-16 text-gray-200 mb-4" }),
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-700 mb-2", children: "Live Chat Dashboard" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 max-w-sm", children: "Select a conversation from the left to view and reply, or toggle chat ON to start receiving messages." })
    ] }) })
  ] });
}
function SessionRow({
  session,
  selected,
  onClick,
  formatTime
}) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onClick,
      className: `w-full text-left px-4 py-3.5 flex items-center gap-3 border-b border-gray-50 transition-colors active:bg-blue-50 ${selected ? "bg-blue-50" : "hover:bg-gray-50"}`,
      children: [
        /* @__PURE__ */ jsx("div", { className: `w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${session.status === "active" ? "bg-blue-100" : "bg-gray-100"}`, children: /* @__PURE__ */ jsx(User, { className: `w-5 h-5 ${session.status === "active" ? "text-[#1a56db]" : "text-gray-400"}` }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-sm text-gray-900 truncate", children: session.visitorName || "Anonymous" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 shrink-0", children: formatTime(session.createdAt) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 mt-0.5", children: [
            session.status === "active" && /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 truncate", children: session.visitorPhone || session.visitorEmail || "No contact info" })
          ] })
        ] }),
        /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4 text-gray-300 shrink-0 md:hidden" })
      ]
    }
  );
}
function AdminChatHistory() {
  const { user, loading, isAuthenticated } = useAuth();
  const [expandedId, setExpandedId] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { data: sessions, isLoading } = trpc.chat.getSessions.useQuery(
    { status: statusFilter === "all" ? "all" : statusFilter },
    { enabled: isAuthenticated && user?.role === "admin" }
  );
  const { data: expandedData } = trpc.chat.getSessionMessages.useQuery(
    { sessionId: expandedId },
    { enabled: !!expandedId && isAuthenticated && user?.role === "admin" }
  );
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50", children: /* @__PURE__ */ jsx(RefreshCw, { className: "w-8 h-8 animate-spin", style: { color: "var(--gold)" } }) });
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "text-center max-w-sm px-6", children: [
      /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6", style: { background: "rgba(15,31,61,0.08)" }, children: /* @__PURE__ */ jsx(Sun, { className: "w-8 h-8", style: { color: "var(--navy)" } }) }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-3", style: { color: "var(--navy)" }, children: "Admin Login Required" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 mb-6", children: "Please sign in to access chat history." }),
      /* @__PURE__ */ jsx("a", { href: getLoginUrl(window.location.pathname), children: /* @__PURE__ */ jsx("button", { className: "btn-navy px-8 py-3 rounded-xl w-full", children: "Sign In" }) })
    ] }) });
  }
  if (user?.role !== "admin") {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx(XCircle, { className: "w-12 h-12 text-red-400 mx-auto mb-4" }),
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-800", children: "Access Denied" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 mt-2", children: "You need admin privileges to view this page." }),
      /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsx("button", { className: "btn-navy mt-6 px-6 py-2.5 rounded-xl text-sm", children: "Back to Home" }) })
    ] }) });
  }
  const formatTime = (date) => new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });
  const filtered = (sessions ?? []).filter((s) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (s.visitorName ?? "").toLowerCase().includes(q) || (s.visitorEmail ?? "").toLowerCase().includes(q) || (s.visitorPhone ?? "").toLowerCase().includes(q);
  });
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(MessageCircle, { className: "w-5 h-5 text-[#1a56db]" }),
          /* @__PURE__ */ jsx("h1", { className: "text-xl font-bold text-gray-900", children: "Chat History" }),
          sessions && /* @__PURE__ */ jsxs("span", { className: "text-sm text-gray-400 font-normal", children: [
            "(",
            sessions.length,
            " conversations)"
          ] })
        ] }),
        /* @__PURE__ */ jsx(Link, { href: "/admin/chat", children: /* @__PURE__ */ jsx("button", { className: "text-sm text-[#1a56db] font-medium hover:underline", children: "Live Chat →" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative flex-1 min-w-[180px]", children: [
          /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "Search by name, email, phone...",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              style: { fontSize: "16px" },
              className: "w-full pl-9 pr-3 py-2 text-sm bg-gray-100 rounded-xl border-0 outline-none focus:ring-2 focus:ring-[#1a56db]"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-1", children: ["all", "active", "closed"].map((f) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setStatusFilter(f),
            className: `px-3 py-2 rounded-xl text-xs font-semibold capitalize transition-colors ${statusFilter === f ? "bg-[#1a56db] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`,
            children: f
          },
          f
        )) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 py-4 space-y-3", children: [
      isLoading && /* @__PURE__ */ jsx("div", { className: "flex justify-center py-16", children: /* @__PURE__ */ jsx(RefreshCw, { className: "w-6 h-6 animate-spin text-gray-400" }) }),
      !isLoading && filtered.length === 0 && /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-20 text-center", children: [
        /* @__PURE__ */ jsx(MessageCircle, { className: "w-12 h-12 text-gray-200 mb-3" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 font-medium", children: "No conversations found" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mt-1", children: search ? "Try a different search term" : "Chat history will appear here once customers start chatting" })
      ] }),
      filtered.map((session) => {
        const isExpanded = expandedId === session.id;
        return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setExpandedId(isExpanded ? null : session.id),
              className: "w-full text-left px-4 py-4 flex items-center gap-3 hover:bg-gray-50 active:bg-gray-100 transition-colors",
              children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(User, { className: "w-5 h-5 text-[#1a56db]" }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                    /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-900 truncate", children: session.visitorName || "Anonymous Visitor" }),
                    /* @__PURE__ */ jsx(
                      Badge,
                      {
                        variant: session.status === "active" ? "default" : "secondary",
                        className: `text-xs shrink-0 ${session.status === "active" ? "bg-green-100 text-green-700 border-green-300" : "bg-gray-100 text-gray-500"}`,
                        children: session.status
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mt-0.5 flex-wrap", children: [
                    session.visitorPhone && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 text-xs text-gray-500", children: [
                      /* @__PURE__ */ jsx(Phone, { className: "w-3 h-3" }),
                      session.visitorPhone
                    ] }),
                    session.visitorEmail && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 text-xs text-gray-500 truncate", children: [
                      /* @__PURE__ */ jsx(Mail, { className: "w-3 h-3 shrink-0" }),
                      /* @__PURE__ */ jsx("span", { className: "truncate", children: session.visitorEmail })
                    ] }),
                    /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 text-xs text-gray-400 shrink-0", children: [
                      /* @__PURE__ */ jsx(Clock, { className: "w-3 h-3" }),
                      formatTime(session.createdAt)
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "shrink-0 text-gray-400", children: isExpanded ? /* @__PURE__ */ jsx(ChevronUp, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(ChevronDown, { className: "w-5 h-5" }) })
              ]
            }
          ),
          isExpanded && /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-100 bg-gray-50 px-4 py-4", children: [
            !expandedData ? /* @__PURE__ */ jsx("div", { className: "flex justify-center py-6", children: /* @__PURE__ */ jsx(RefreshCw, { className: "w-5 h-5 animate-spin text-gray-400" }) }) : expandedData.messages.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-center text-sm text-gray-400 py-4", children: "No messages in this conversation" }) : /* @__PURE__ */ jsx("div", { className: "space-y-2 max-h-80 overflow-y-auto", children: expandedData.messages.map((msg) => /* @__PURE__ */ jsx("div", { className: `flex ${msg.sender === "admin" ? "justify-end" : "justify-start"}`, children: /* @__PURE__ */ jsxs("div", { className: `max-w-[80%] rounded-2xl px-4 py-2.5 ${msg.sender === "admin" ? "bg-[#1a56db] text-white rounded-br-md" : "bg-white border border-gray-200 text-gray-800 rounded-bl-md shadow-sm"}`, children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed break-words", children: msg.message }),
              /* @__PURE__ */ jsxs("p", { className: `text-xs mt-1 ${msg.sender === "admin" ? "text-blue-200" : "text-gray-400"}`, children: [
                msg.sender === "admin" ? "You" : session.visitorName || "Visitor",
                " · ",
                new Date(msg.createdAt).toLocaleString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
              ] })
            ] }) }, msg.id)) }),
            session.status === "active" && /* @__PURE__ */ jsx("div", { className: "mt-3 pt-3 border-t border-gray-200", children: /* @__PURE__ */ jsx(Link, { href: `/admin/chat/${session.id}`, children: /* @__PURE__ */ jsx("button", { className: "w-full py-2.5 rounded-xl bg-[#1a56db] text-white text-sm font-semibold", children: "Open in Live Chat →" }) }) })
          ] })
        ] }, session.id);
      })
    ] })
  ] });
}
function LiveChatWidget() {
  const [chatState, setChatState] = useState("closed");
  const [sessionToken, setSessionToken] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [lastMessageId, setLastMessageId] = useState(0);
  const [visitorName, setVisitorName] = useState("");
  const [visitorEmail, setVisitorEmail] = useState("");
  const [visitorPhone, setVisitorPhone] = useState("");
  const [firstMessage, setFirstMessage] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef(null);
  const { data: statusData } = trpc.chat.getStatus.useQuery(void 0, {
    refetchInterval: 3e4
  });
  const startSessionMutation = trpc.chat.startSession.useMutation({
    onSuccess: (data) => {
      setSessionToken(data.sessionToken);
      setSessionId(data.sessionId);
      setChatState("chatting");
    }
  });
  const sendMessageMutation = trpc.chat.sendMessage.useMutation({
    onSuccess: () => {
      setInputText("");
    }
  });
  const { data: messagesData } = trpc.chat.getMessages.useQuery(
    { sessionToken, afterId: lastMessageId || void 0 },
    {
      enabled: !!sessionToken && chatState === "chatting",
      refetchInterval: 2e3
    }
  );
  useEffect(() => {
    if (messagesData?.messages && messagesData.messages.length > 0) {
      setMessages((prev) => {
        const existingIds = new Set(prev.map((m) => m.id));
        const newMsgs = messagesData.messages.filter((m) => !existingIds.has(m.id));
        if (newMsgs.length > 0) {
          const adminNewMsgs = newMsgs.filter((m) => m.sender === "admin");
          if (adminNewMsgs.length > 0) {
            setUnreadCount((c) => c + adminNewMsgs.length);
          }
          const allMsgs = [...prev, ...newMsgs];
          const maxId = Math.max(...allMsgs.map((m) => m.id));
          setLastMessageId(maxId);
          return allMsgs;
        }
        return prev;
      });
    }
    if (messagesData?.status === "closed") {
      setChatState("closed");
    }
  }, [messagesData]);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const handleOpen = () => {
    if (!statusData?.isOnline) {
      setChatState("offline");
    } else if (sessionToken) {
      setChatState("chatting");
      setUnreadCount(0);
    } else {
      setChatState("intro");
    }
  };
  const handleStartChat = () => {
    if (!firstMessage.trim()) return;
    startSessionMutation.mutate({
      visitorName: visitorName || void 0,
      visitorEmail: visitorEmail || void 0,
      visitorPhone: visitorPhone || void 0,
      firstMessage: firstMessage.trim()
    });
    setMessages([{
      id: -1,
      sender: "visitor",
      message: firstMessage.trim(),
      createdAt: /* @__PURE__ */ new Date()
    }]);
  };
  const handleSendMessage = () => {
    if (!inputText.trim() || !sessionToken) return;
    const msg = inputText.trim();
    setMessages((prev) => [...prev, {
      id: Date.now(),
      sender: "visitor",
      message: msg,
      createdAt: /* @__PURE__ */ new Date()
    }]);
    sendMessageMutation.mutate({ sessionToken, message: msg });
    setInputText("");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (chatState === "intro") handleStartChat();
      else handleSendMessage();
    }
  };
  if (typeof window !== "undefined" && window.location.pathname.startsWith("/admin")) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: "fixed bottom-24 right-4 z-50 flex flex-col items-end gap-3", children: [
    chatState !== "closed" && /* @__PURE__ */ jsxs(
      "div",
      {
        className: "w-[340px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden",
        style: { height: "460px" },
        children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-[#1a56db] px-4 py-3 flex items-center justify-between shrink-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-full bg-white/20 flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-white text-xs font-bold", children: "PS" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-white font-semibold text-sm", children: "Pell Solar Support" }),
                /* @__PURE__ */ jsxs("p", { className: "text-blue-200 text-xs flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx("span", { className: `w-1.5 h-1.5 rounded-full inline-block ${statusData?.isOnline ? "bg-green-400" : "bg-gray-400"}` }),
                  statusData?.isOnline ? "Online now — we reply fast" : "Currently offline"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setChatState("closed"),
                className: "text-white/70 hover:text-white transition-colors p-1",
                children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
              }
            )
          ] }),
          chatState === "offline" && /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col items-center justify-center p-6 text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3", children: /* @__PURE__ */ jsx(MessageCircle, { className: "w-6 h-6 text-gray-400" }) }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-700 font-medium mb-2", children: "We're currently offline" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm mb-4", children: statusData?.offlineMessage || "Leave us a message and we'll get back to you shortly!" }),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "tel:9092405294",
                className: "bg-[#1a56db] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors",
                children: "Call (909) 240-5294"
              }
            )
          ] }),
          chatState === "intro" && /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col p-4 gap-3 overflow-y-auto", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-blue-50 rounded-xl p-3 text-sm text-gray-700 leading-relaxed", children: "👋 Hi! We're here to help with any solar questions. Leave your info below and we'll reply right away." }),
            /* @__PURE__ */ jsx(
              Input,
              {
                placeholder: "Your name (optional)",
                value: visitorName,
                onChange: (e) => setVisitorName(e.target.value),
                className: "text-sm",
                style: { fontSize: "16px" }
              }
            ),
            /* @__PURE__ */ jsx(
              Input,
              {
                placeholder: "Email (optional)",
                type: "email",
                value: visitorEmail,
                onChange: (e) => setVisitorEmail(e.target.value),
                className: "text-sm",
                style: { fontSize: "16px" }
              }
            ),
            /* @__PURE__ */ jsx(
              Input,
              {
                placeholder: "Phone (optional)",
                type: "tel",
                value: visitorPhone,
                onChange: (e) => setVisitorPhone(e.target.value),
                className: "text-sm",
                style: { fontSize: "16px" }
              }
            ),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                placeholder: "What's on your mind? *",
                value: firstMessage,
                onChange: (e) => setFirstMessage(e.target.value),
                onKeyDown: handleKeyDown,
                style: { fontSize: "16px" },
                className: "flex-1 min-h-[80px] resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              }
            ),
            /* @__PURE__ */ jsxs(
              Button,
              {
                onClick: handleStartChat,
                disabled: !firstMessage.trim() || startSessionMutation.isPending,
                className: "bg-[#1a56db] hover:bg-blue-700 text-white w-full rounded-full",
                children: [
                  startSessionMutation.isPending ? /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 animate-spin mr-2" }) : /* @__PURE__ */ jsx(Send, { className: "w-4 h-4 mr-2" }),
                  "Send Message"
                ]
              }
            )
          ] }),
          chatState === "chatting" && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto p-4 flex flex-col gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-blue-50 rounded-xl p-3 text-sm text-gray-600 text-center", children: "You're connected! We'll reply shortly." }),
              messages.map((msg, i) => /* @__PURE__ */ jsx(
                "div",
                {
                  className: `flex ${msg.sender === "visitor" ? "justify-end" : "justify-start"}`,
                  children: /* @__PURE__ */ jsx("div", { className: `max-w-[75%] rounded-2xl px-3 py-2 text-sm ${msg.sender === "visitor" ? "bg-[#1a56db] text-white rounded-br-sm" : "bg-gray-100 text-gray-800 rounded-bl-sm"}`, children: msg.message })
                },
                msg.id || i
              )),
              /* @__PURE__ */ jsx("div", { ref: messagesEndRef })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-3 border-t border-gray-100 flex gap-2 shrink-0", children: [
              /* @__PURE__ */ jsx(
                Input,
                {
                  placeholder: "Type a message...",
                  value: inputText,
                  onChange: (e) => setInputText(e.target.value),
                  onKeyDown: handleKeyDown,
                  className: "flex-1",
                  style: { fontSize: "16px" }
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  onClick: handleSendMessage,
                  disabled: !inputText.trim() || sendMessageMutation.isPending,
                  size: "icon",
                  className: "bg-[#1a56db] hover:bg-blue-700 text-white shrink-0 rounded-full",
                  children: /* @__PURE__ */ jsx(Send, { className: "w-4 h-4" })
                }
              )
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: chatState === "closed" ? handleOpen : () => setChatState("closed"),
        className: "flex items-center gap-2.5 bg-[#1a56db] hover:bg-blue-700 text-white shadow-xl rounded-full pl-4 pr-5 py-3 transition-all hover:scale-105 active:scale-95 relative",
        "aria-label": "Open chat",
        children: chatState === "closed" ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(MessageCircle, { className: "w-5 h-5 shrink-0" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold whitespace-nowrap", children: "Ask a Solar Expert" }),
          unreadCount > 0 && /* @__PURE__ */ jsx("span", { className: "absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-bold", children: unreadCount })
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(X, { className: "w-5 h-5" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold", children: "Close" })
        ] })
      }
    )
  ] });
}
function Head() {
  const [location] = useLocation();
  useEffect(() => {
    document.title = getSeoMeta(location).title;
  }, [location]);
  return null;
}
const HERO_IMG = "/manus-storage/solar-home-main-v2_0ad97127.jpg";
const SOLAR_PANELS_IMG = "/manus-storage/california-home_f656624c.jpg";
function CityPageTemplate({
  city,
  state,
  county,
  utility = "Southern California Edison (SCE)",
  avgBill = "$200–$400",
  sunHours = "5.5–6.5",
  intro,
  extra
}) {
  const defaultIntro = `${city}, ${state} is an excellent place to consider solar. With abundant sunshine year-round, rising utility rates, and strong solar incentives, homeowners in ${city} are exploring solar and battery options. Pell Solar serves ${county ? county + " and " : ""}the surrounding region with tailored solar solutions.`;
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white", style: { fontFamily: "'Inter', system-ui, sans-serif" }, children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("section", { className: "relative min-h-[55vh] flex items-center", style: { backgroundImage: `linear-gradient(135deg, rgba(11,29,81,0.55), rgba(11,29,81,0.35)), url(${HERO_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }, children: /* @__PURE__ */ jsxs("div", { className: "relative z-10 container mx-auto px-6 pt-24 pb-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsx(MapPin, { size: 16, className: "text-[#2BABE2]" }),
        /* @__PURE__ */ jsx("span", { className: "text-[#2BABE2] text-sm font-semibold", children: county || state })
      ] }),
      /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-extrabold text-white mb-4 max-w-2xl", style: { fontFamily: "'Montserrat', sans-serif" }, children: [
        "Solar Panels in ",
        /* @__PURE__ */ jsxs("span", { className: "text-[#2BABE2]", children: [
          city,
          ", ",
          state
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-200 max-w-xl mb-8 leading-relaxed", children: intro || defaultIntro }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
        /* @__PURE__ */ jsxs(Link, { href: "/get-quote", className: "btn-green", children: [
          "Get Free Quote — ",
          city
        ] }),
        /* @__PURE__ */ jsxs("a", { href: "tel:8666468499", className: "btn-navy flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Phone, { size: 16, className: "text-yellow-400" }),
          " (866) 646-8499"
        ] }),
        /* @__PURE__ */ jsxs("a", { href: "tel:7144553401", className: "btn-navy flex items-center gap-2 opacity-80", children: [
          /* @__PURE__ */ jsx(Phone, { size: 16, className: "text-yellow-400" }),
          " (714) 455-3401 CA"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-[#0B1D51] py-6", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center", children: [
      { label: "Avg Daily Sun Hours", value: sunHours, icon: "☀️" },
      { label: "Avg Monthly Bill", value: avgBill, icon: "💡" },
      { label: "Utility Provider", value: utility.split("(")[0].trim(), icon: "⚡" },
      { label: "Pell Solar", value: "Solar & Battery", icon: "🏆" }
    ].map(({ label, value, icon }) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "text-2xl mb-1", children: icon }),
      /* @__PURE__ */ jsx("div", { className: "text-yellow-400 font-extrabold text-lg", children: value }),
      /* @__PURE__ */ jsx("div", { className: "text-gray-400 text-xs", children: label })
    ] }, label)) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-16 items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("p", { className: "text-[#2BABE2] font-bold text-xs tracking-widest uppercase mb-3", children: [
          "Why Solar in ",
          city
        ] }),
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-extrabold text-gray-900 mb-6", style: { fontFamily: "'Montserrat', sans-serif" }, children: [
          "Why ",
          city,
          " Homeowners Are Going Solar"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-base leading-relaxed mb-4", children: extra || `${city} homeowners face some of the highest electricity rates in the country. Southern California Edison's tiered rate structure means the more you use, the more you pay per kilowatt-hour — often reaching $0.50–$0.58/kWh during peak hours.` }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-600 text-base leading-relaxed mb-6", children: [
          "With ",
          sunHours,
          " average daily sun hours, ",
          city,
          " is an ideal location for solar. A properly sized system paired with a Tesla Powerwall can eliminate your electric bill entirely — even under California's NEM 3.0 rules."
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: [
          `Average ${sunHours} peak sun hours per day`,
          `${utility} service area — NEM 3.0 applies`,
          "Federal solar tax credit available",
          "California Property Tax Exclusion for solar",
          "Rising utility rates make solar ROI stronger every year"
        ].map((item) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(Check, { size: 16, className: "text-[#2BABE2] flex-shrink-0" }),
          /* @__PURE__ */ jsx("span", { className: "text-gray-600 text-sm", children: item })
        ] }, item)) })
      ] }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("img", { src: SOLAR_PANELS_IMG, alt: `Solar panels in ${city}`, className: "w-full rounded-2xl shadow-lg" }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
      /* @__PURE__ */ jsx("div", { className: "text-center mb-12", children: /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-extrabold text-gray-900 mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: [
        "Solar Packages for ",
        /* @__PURE__ */ jsx("span", { className: "text-[#2BABE2]", children: city }),
        " Homes"
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-8 max-w-4xl mx-auto", children: [
        { name: "Solar Shield", price: "$234", desc: "For homes with ~$320/mo SCE bills. 16 panels + 1 Tesla Powerwall 3.", popular: false },
        { name: "Solar Shield+", price: "$307", desc: "For homes with ~$580/mo SCE bills. 32 panels + 1 Tesla Powerwall 3.", popular: true }
      ].map((pkg) => /* @__PURE__ */ jsxs("div", { className: `bg-white rounded-2xl p-8 ${pkg.popular ? "border-2 border-[#2BABE2] relative" : "border border-gray-200"}`, children: [
        pkg.popular && /* @__PURE__ */ jsx("div", { className: "absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full", children: "Most Popular" }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-extrabold text-gray-900 mb-1", style: { fontFamily: "'Montserrat', sans-serif" }, children: pkg.name }),
        /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsx("span", { className: "text-4xl font-black text-[#2BABE2]", children: pkg.price }),
          /* @__PURE__ */ jsx("span", { className: "text-gray-500 text-lg", children: "/mo" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm mb-4", children: pkg.desc }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-xs mb-6", children: "$0 Down · 25-Year Lease · Tax Credit Included" }),
        /* @__PURE__ */ jsx(Link, { href: "/get-quote", className: pkg.popular ? "btn-green w-full block text-center" : "btn-navy w-full block text-center", children: "Get Started — $0 Down" })
      ] }, pkg.name)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-gray-900 mb-5 text-center", style: { fontFamily: "'Montserrat', sans-serif" }, children: "Read Current Customer Feedback" }),
      /* @__PURE__ */ jsx("p", { className: "text-center text-gray-600 mb-8", children: "Visit independent review platforms for current customer feedback about Pell Solar." }),
      /* @__PURE__ */ jsx(LiveReviewLinks, {})
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-[#0B1D51]", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 text-center", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-extrabold text-white mb-4", style: { fontFamily: "'Montserrat', sans-serif" }, children: [
        "Ready to Go Solar in ",
        city,
        "?"
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-gray-300 text-lg mb-8 max-w-2xl mx-auto", children: [
        "Free consultation. Custom system design. $0 down. We serve ",
        city,
        " and all surrounding areas."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
        /* @__PURE__ */ jsx(Link, { href: "/get-quote", className: "btn-gold text-lg px-10 py-4", children: "Get Free Quote" }),
        /* @__PURE__ */ jsxs("a", { href: "tel:8666468499", className: "flex items-center justify-center gap-2 bg-white/10 text-white rounded-xl px-6 py-4 font-bold text-lg hover:bg-white/20 transition-colors", children: [
          /* @__PURE__ */ jsx(Phone, { size: 18, className: "text-yellow-400" }),
          " (866) 646-8499"
        ] }),
        /* @__PURE__ */ jsxs("a", { href: "tel:7144553401", className: "flex items-center justify-center gap-2 bg-white/10 text-white rounded-xl px-6 py-4 font-bold hover:bg-white/20 transition-colors", children: [
          /* @__PURE__ */ jsx(Phone, { size: 18, className: "text-yellow-400" }),
          " (714) 455-3401 CA"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-sm mt-6", children: [
        "Serving ",
        city,
        ", ",
        county || state,
        " and surrounding areas. Contractor License #949122."
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
function AnaheimPage() {
  return /* @__PURE__ */ jsx(
    CityPageTemplate,
    {
      city: "Anaheim",
      state: "CA",
      county: "Orange County",
      utility: "Southern California Edison (SCE)",
      avgBill: "$200–$380",
      sunHours: "5.8–6.5",
      extra: "Anaheim homeowners are switching to solar faster than almost anywhere in Orange County. With SCE's tiered rates pushing bills over $300/mo in summer, a solar + Powerwall system pays for itself faster here than in most of California."
    }
  );
}
function BakersfieldPage() {
  return /* @__PURE__ */ jsx(
    CityPageTemplate,
    {
      city: "Bakersfield",
      state: "CA",
      county: "Kern County",
      utility: "Pacific Gas & Electric (PG&E)",
      avgBill: "$180–$350",
      sunHours: "6.0–7.0",
      extra: "Bakersfield is one of the sunniest cities in California — averaging over 6 peak sun hours per day. That means more solar production, faster payback, and bigger savings than most California cities."
    }
  );
}
function BaldwinParkPage() {
  return /* @__PURE__ */ jsx(
    CityPageTemplate,
    {
      city: "Baldwin Park",
      state: "CA",
      county: "Los Angeles County",
      utility: "Southern California Edison (SCE)",
      avgBill: "$200–$380",
      sunHours: "5.5–6.2",
      extra: "Baldwin Park homeowners face some of the highest electricity rates in the San Gabriel Valley. Solar + Powerwall is the most effective way to eliminate your SCE bill under NEM 3.0."
    }
  );
}
function BreaPage() {
  return /* @__PURE__ */ jsx(
    CityPageTemplate,
    {
      city: "Brea",
      state: "CA",
      county: "Orange County",
      utility: "Southern California Edison (SCE)",
      avgBill: "$200–$400",
      sunHours: "5.8–6.5",
      extra: "Brea's sunny climate and high SCE rates make it one of the best cities in Orange County for solar ROI. We've installed hundreds of systems in Brea and surrounding communities."
    }
  );
}
function BurbankPage() {
  return /* @__PURE__ */ jsx(
    CityPageTemplate,
    {
      city: "Burbank",
      state: "CA",
      county: "Los Angeles County",
      utility: "Southern California Edison (SCE)",
      avgBill: "$220–$420",
      sunHours: "5.5–6.2",
      extra: "Burbank homeowners pay some of the highest electricity rates in LA County. With SCE's peak rates reaching $0.58/kWh, a Tesla Powerwall paired with solar can eliminate your bill entirely."
    }
  );
}
function ChinoPage() {
  return /* @__PURE__ */ jsx(
    CityPageTemplate,
    {
      city: "Chino",
      state: "CA",
      county: "San Bernardino County",
      utility: "Southern California Edison (SCE)",
      avgBill: "$200–$380",
      sunHours: "5.8–6.5",
      extra: "Chino's Inland Empire location offers strong solar potential and access to local installation options."
    }
  );
}
function ChinoHillsPage() {
  return /* @__PURE__ */ jsx(
    CityPageTemplate,
    {
      city: "Chino Hills",
      state: "CA",
      county: "San Bernardino County",
      utility: "Southern California Edison (SCE)",
      avgBill: "$220–$420",
      sunHours: "5.8–6.5",
      extra: "Chino Hills homeowners enjoy excellent sun exposure and strong solar incentives. Our Solar Shield packages are designed specifically for Chino Hills homes and SCE billing structures."
    }
  );
}
function CoronaPage() {
  return /* @__PURE__ */ jsx(
    CityPageTemplate,
    {
      city: "Corona",
      state: "CA",
      county: "Riverside County",
      utility: "Southern California Edison (SCE)",
      avgBill: "$200–$400",
      sunHours: "6.0–6.8",
      extra: "Corona's Inland Empire location gives homeowners more sun hours than coastal cities — meaning more solar production and faster payback. We're one of the most active solar installers in the Corona area."
    }
  );
}
function ElMontePage() {
  return /* @__PURE__ */ jsx(
    CityPageTemplate,
    {
      city: "El Monte",
      state: "CA",
      county: "Los Angeles County",
      utility: "Southern California Edison (SCE)",
      avgBill: "$200–$380",
      sunHours: "5.5–6.2",
      extra: "El Monte homeowners are increasingly turning to solar to escape SCE's rising rates. Our NEM 3.0-ready systems with Tesla Powerwall are designed to maximize savings in the San Gabriel Valley."
    }
  );
}
function FontanaPage() {
  return /* @__PURE__ */ jsx(
    CityPageTemplate,
    {
      city: "Fontana",
      state: "CA",
      county: "San Bernardino County",
      utility: "Southern California Edison (SCE)",
      avgBill: "$200–$380",
      sunHours: "5.8–6.5",
      extra: "Fontana's Inland Empire location means excellent sun exposure and strong solar ROI. We've installed hundreds of systems in Fontana and the surrounding San Bernardino County area."
    }
  );
}
function FresnoPage() {
  return /* @__PURE__ */ jsx(
    CityPageTemplate,
    {
      city: "Fresno",
      state: "CA",
      county: "Fresno County",
      utility: "Pacific Gas & Electric (PG&E)",
      avgBill: "$200–$400",
      sunHours: "6.0–7.0",
      extra: "Fresno is one of the sunniest cities in California with over 6 peak sun hours per day. PG&E's high rates and Fresno's abundant sunshine make solar one of the best investments a homeowner can make."
    }
  );
}
function FullertonPage() {
  return /* @__PURE__ */ jsx(
    CityPageTemplate,
    {
      city: "Fullerton",
      state: "CA",
      county: "Orange County",
      utility: "Southern California Edison (SCE)",
      avgBill: "$200–$380",
      sunHours: "5.8–6.5",
      extra: "Fullerton homeowners in Orange County benefit from excellent sun exposure and California's strong solar incentives. We design every system for NEM 3.0 with a Tesla Powerwall to maximize your savings."
    }
  );
}
function GardenGrovePage() {
  return /* @__PURE__ */ jsx(
    CityPageTemplate,
    {
      city: "Garden Grove",
      state: "CA",
      county: "Orange County",
      utility: "Southern California Edison (SCE)",
      avgBill: "$200–$380",
      sunHours: "5.8–6.5",
      extra: "Garden Grove's central Orange County location gives homeowners consistent sun exposure year-round. Our Solar Shield packages start at $234/mo with $0 down."
    }
  );
}
function GlendoraPage() {
  return /* @__PURE__ */ jsx(
    CityPageTemplate,
    {
      city: "Glendora",
      state: "CA",
      county: "Los Angeles County",
      utility: "Southern California Edison (SCE)",
      avgBill: "$220–$420",
      sunHours: "5.8–6.5",
      extra: "Glendora sits at the base of the San Gabriel Mountains with excellent sun exposure and high SCE rates. Solar + Powerwall is the most effective way to eliminate your electric bill in Glendora."
    }
  );
}
function InlandEmpirePage() {
  return /* @__PURE__ */ jsx(
    CityPageTemplate,
    {
      city: "Inland Empire",
      state: "CA",
      county: "San Bernardino & Riverside Counties",
      utility: "Southern California Edison (SCE)",
      avgBill: "$220–$450",
      sunHours: "6.0–6.8",
      extra: "The Inland Empire is one of the fastest-growing solar markets in California. With more sun hours than coastal cities and rising SCE rates, homeowners throughout San Bernardino and Riverside Counties are going solar at record rates."
    }
  );
}
function IrvinePage() {
  return /* @__PURE__ */ jsx(
    CityPageTemplate,
    {
      city: "Irvine",
      state: "CA",
      county: "Orange County",
      utility: "Southern California Edison (SCE)",
      avgBill: "$250–$500",
      sunHours: "5.8–6.5",
      extra: "Irvine homeowners pay some of the highest electricity bills in Orange County. With large homes and high usage, a Solar Shield+ system with 32 panels and a Tesla Powerwall is the most popular choice in Irvine."
    }
  );
}
function LaHabraPage() {
  return /* @__PURE__ */ jsx(
    CityPageTemplate,
    {
      city: "La Habra",
      state: "CA",
      county: "Orange County",
      utility: "Southern California Edison (SCE)",
      avgBill: "$200–$380",
      sunHours: "5.8–6.5",
      extra: "La Habra's location on the Orange/LA County border gives homeowners excellent sun exposure and access to local solar options."
    }
  );
}
function LakewoodPage() {
  return /* @__PURE__ */ jsx(
    CityPageTemplate,
    {
      city: "Lakewood",
      state: "CA",
      county: "Los Angeles County",
      utility: "Southern California Edison (SCE)",
      avgBill: "$200–$380",
      sunHours: "5.5–6.2",
      extra: "Lakewood homeowners are increasingly turning to solar to combat SCE's rising rates. Our NEM 3.0-ready systems with Tesla Powerwall are designed to maximize savings in the LA area."
    }
  );
}
function LancasterPage() {
  return /* @__PURE__ */ jsx(
    CityPageTemplate,
    {
      city: "Lancaster",
      state: "CA",
      county: "Los Angeles County",
      utility: "Southern California Edison (SCE)",
      avgBill: "$200–$400",
      sunHours: "6.5–7.5",
      extra: "Lancaster is one of the best cities in California for solar — with over 6.5 peak sun hours per day in the Antelope Valley. More sun means more production and faster payback."
    }
  );
}
function LongBeachPage() {
  return /* @__PURE__ */ jsx(
    CityPageTemplate,
    {
      city: "Long Beach",
      state: "CA",
      county: "Los Angeles County",
      utility: "Southern California Edison (SCE)",
      avgBill: "$200–$400",
      sunHours: "5.5–6.2",
      extra: "Long Beach homeowners benefit from California's strong solar incentives and SCE's high rates. Our Solar Shield packages start at $234/mo with $0 down and include a Tesla Powerwall 3."
    }
  );
}
function LosAngelesPage() {
  return /* @__PURE__ */ jsx(
    CityPageTemplate,
    {
      city: "Los Angeles",
      state: "CA",
      county: "Los Angeles County",
      utility: "Southern California Edison (SCE)",
      avgBill: "$250–$500",
      sunHours: "5.5–6.2",
      extra: "Los Angeles is one of the largest solar markets in the world. With SCE's high rates, California's strong incentives, and LA's abundant sunshine, going solar in Los Angeles is one of the best financial decisions a homeowner can make."
    }
  );
}
function MurrietaPage() {
  return /* @__PURE__ */ jsx(
    CityPageTemplate,
    {
      city: "Murrieta",
      state: "CA",
      county: "Riverside County",
      utility: "Southern California Edison (SCE)",
      avgBill: "$200–$400",
      sunHours: "6.0–6.8",
      extra: "Murrieta's Southwest Riverside County location gives homeowners excellent sun exposure and strong potential for a tailored solar system."
    }
  );
}
function OntarioPage() {
  return /* @__PURE__ */ jsx(
    CityPageTemplate,
    {
      city: "Ontario",
      state: "CA",
      county: "San Bernardino County",
      utility: "Southern California Edison (SCE)",
      avgBill: "$200–$380",
      sunHours: "5.8–6.5",
      extra: "Ontario's Inland Empire location means more sun hours than coastal cities and excellent solar ROI. We've installed hundreds of systems in Ontario and the surrounding area."
    }
  );
}
function OrangePage() {
  return /* @__PURE__ */ jsx(
    CityPageTemplate,
    {
      city: "Orange",
      state: "CA",
      county: "Orange County",
      utility: "Southern California Edison (SCE)",
      avgBill: "$200–$380",
      sunHours: "5.8–6.5",
      extra: "The City of Orange has excellent sun exposure and high SCE rates — a perfect combination for solar ROI. Our NEM 3.0-ready systems with Tesla Powerwall are the most popular choice in Orange County."
    }
  );
}
function PalmdalePage() {
  return /* @__PURE__ */ jsx(
    CityPageTemplate,
    {
      city: "Palmdale",
      state: "CA",
      county: "Los Angeles County",
      utility: "Southern California Edison (SCE)",
      avgBill: "$200–$400",
      sunHours: "6.5–7.5",
      extra: "Palmdale is one of the sunniest cities in California — averaging over 6.5 peak sun hours per day in the Antelope Valley. More sun means more production, faster payback, and bigger savings."
    }
  );
}
function PomonaPage() {
  return /* @__PURE__ */ jsx(
    CityPageTemplate,
    {
      city: "Pomona",
      state: "CA",
      county: "Los Angeles County",
      utility: "Southern California Edison (SCE)",
      avgBill: "$200–$380",
      sunHours: "5.8–6.5",
      extra: "Pomona homeowners face high SCE rates and excellent sun exposure, making a custom solar evaluation worth considering."
    }
  );
}
function RanchoCucamongaPage() {
  return /* @__PURE__ */ jsx(
    CityPageTemplate,
    {
      city: "Rancho Cucamonga",
      state: "CA",
      county: "San Bernardino County",
      utility: "Southern California Edison (SCE)",
      avgBill: "$220–$420",
      sunHours: "5.8–6.5",
      extra: "Rancho Cucamonga's Inland Empire location gives homeowners more sun hours than coastal cities and excellent solar ROI. Our Solar Shield packages are designed for Rancho Cucamonga homes and SCE billing."
    }
  );
}
function RiversidePage() {
  return /* @__PURE__ */ jsx(
    CityPageTemplate,
    {
      city: "Riverside",
      state: "CA",
      county: "Riverside County",
      utility: "Southern California Edison (SCE)",
      avgBill: "$200–$400",
      sunHours: "6.0–6.8",
      extra: "Riverside's Inland Empire location means more sun hours than coastal cities — averaging over 6 peak sun hours per day. More sun means more production and faster payback on your solar investment."
    }
  );
}
function SanBernardinoPage() {
  return /* @__PURE__ */ jsx(
    CityPageTemplate,
    {
      city: "San Bernardino",
      state: "CA",
      county: "San Bernardino County",
      utility: "Southern California Edison (SCE)",
      avgBill: "$200–$380",
      sunHours: "5.8–6.5",
      extra: "San Bernardino homeowners benefit from the Inland Empire's excellent sun exposure and California solar incentives."
    }
  );
}
function SantaAnaPage() {
  return /* @__PURE__ */ jsx(
    CityPageTemplate,
    {
      city: "Santa Ana",
      state: "CA",
      county: "Orange County",
      utility: "Southern California Edison (SCE)",
      avgBill: "$200–$380",
      sunHours: "5.8–6.5",
      extra: "Santa Ana is one of the most densely populated cities in Orange County — and one of the fastest-growing solar markets. Our NEM 3.0-ready systems with Tesla Powerwall maximize savings for Santa Ana homeowners."
    }
  );
}
function TemeculaPage() {
  return /* @__PURE__ */ jsx(
    CityPageTemplate,
    {
      city: "Temecula",
      state: "CA",
      county: "Riverside County",
      utility: "Southern California Edison (SCE)",
      avgBill: "$200–$400",
      sunHours: "6.0–6.8",
      extra: "Temecula's Southwest Riverside County location gives homeowners excellent sun exposure and strong solar ROI. We're one of the most active solar installers in the Temecula Valley."
    }
  );
}
function ThousandOaksPage() {
  return /* @__PURE__ */ jsx(
    CityPageTemplate,
    {
      city: "Thousand Oaks",
      state: "CA",
      county: "Ventura County",
      utility: "Southern California Edison (SCE)",
      avgBill: "$250–$500",
      sunHours: "5.8–6.5",
      extra: "Thousand Oaks homeowners pay some of the highest electricity bills in Ventura County. With large homes and high usage, our Solar Shield+ system with 32 panels and a Tesla Powerwall is the most popular choice."
    }
  );
}
function TorrancePage() {
  return /* @__PURE__ */ jsx(
    CityPageTemplate,
    {
      city: "Torrance",
      state: "CA",
      county: "Los Angeles County",
      utility: "Southern California Edison (SCE)",
      avgBill: "$200–$400",
      sunHours: "5.5–6.2",
      extra: "Torrance's South Bay location gives homeowners consistent sun exposure year-round. Our NEM 3.0-ready systems with Tesla Powerwall are designed to maximize savings for Torrance homeowners."
    }
  );
}
function VenturaPage() {
  return /* @__PURE__ */ jsx(
    CityPageTemplate,
    {
      city: "Ventura",
      state: "CA",
      county: "Ventura County",
      utility: "Southern California Edison (SCE)",
      avgBill: "$200–$400",
      sunHours: "5.8–6.5",
      extra: "Ventura's coastal location gives homeowners consistent sun exposure and strong potential for solar and battery planning."
    }
  );
}
const activeTerritoryCities = {
  "upland-ca": {
    city: "Upland",
    intro: "Pell Solar serves homeowners throughout Upland, California with professional solar and battery evaluations. Our team helps you understand residential energy options clearly and straightforwardly.",
    extra: "We help Upland homeowners evaluate solar and battery systems for their properties and household energy goals."
  },
  "montclair-ca": {
    city: "Montclair",
    intro: "Pell Solar provides solar and battery evaluation services for homeowners throughout Montclair, California. Our team helps households assess their energy needs and explore residential system options.",
    extra: "Montclair homeowners can request a clear solar and battery evaluation tailored to their property and energy use."
  },
  "claremont-ca": {
    city: "Claremont",
    intro: "Pell Solar serves homeowners in Claremont, California with professional solar and battery evaluations. Our team helps you explore residential energy options tailored to your household needs.",
    extra: "Claremont homeowners can talk with Pell Solar about solar panels, battery storage, and a practical next step for their home."
  },
  "rialto-ca": {
    city: "Rialto",
    intro: "Pell Solar provides solar and battery evaluations for homeowners in Rialto, California. These consultations help households understand options for residential solar and energy storage.",
    extra: "Rialto residents can request a straightforward evaluation of solar and battery possibilities for their property."
  },
  "colton-ca": {
    city: "Colton",
    intro: "Pell Solar serves homeowners in Colton, California with solar and battery evaluations. We provide clear energy assessments for residential properties and household goals.",
    extra: "Colton homeowners can schedule a conversation about solar panels, batteries, and their home energy needs."
  },
  "jurupa-valley-ca": {
    city: "Jurupa Valley",
    intro: "Pell Solar serves homeowners throughout Jurupa Valley, California with solar and battery evaluations. Our team provides straightforward guidance to help households understand their energy options.",
    extra: "Jurupa Valley homeowners can request a residential solar and battery evaluation from Pell Solar."
  },
  "moreno-valley-ca": {
    city: "Moreno Valley",
    intro: "Pell Solar provides professional solar and battery evaluations for homeowners throughout Moreno Valley, California. Our team helps you assess household energy needs with clear information.",
    extra: "Moreno Valley residents can explore solar panels and home battery options through a no-pressure consultation."
  },
  "san-dimas-ca": {
    city: "San Dimas",
    intro: "Pell Solar serves homeowners in San Dimas, California with solar and battery evaluations. Contact our team to discuss a residential energy assessment for your property.",
    extra: "San Dimas homeowners can review solar and battery options designed around their household energy needs."
  },
  "la-verne-ca": {
    city: "La Verne",
    intro: "Pell Solar serves homeowners in La Verne, California with solar and battery evaluations. Schedule a consultation to understand residential solar options for your property.",
    extra: "La Verne homeowners can speak with Pell Solar about solar panels, storage, and a custom home-energy evaluation."
  },
  "covina-ca": {
    city: "Covina",
    intro: "Pell Solar provides professional solar and battery evaluations for homeowners in Covina, California. We help residential property owners assess energy needs and system options clearly.",
    extra: "Covina residents can request a practical review of solar and battery possibilities for their home."
  },
  "west-covina-ca": {
    city: "West Covina",
    intro: "Pell Solar serves homeowners in West Covina, California with professional solar and battery evaluations. Our team helps households explore residential energy options for their property.",
    extra: "West Covina homeowners can discuss solar panels and home battery storage with a local Pell Solar representative."
  },
  "eastvale-ca": {
    city: "Eastvale",
    intro: "Pell Solar serves homeowners throughout Eastvale, California with solar and battery evaluations. Our team helps you understand home energy options in a clear, straightforward way.",
    extra: "Eastvale homeowners can request a solar and battery consultation that starts with their household energy goals."
  },
  "norco-ca": {
    city: "Norco",
    intro: "Pell Solar serves homeowners in Norco, California with professional solar and battery evaluations. We help you review home energy options without complicated jargon.",
    extra: "Norco homeowners can request a clear solar and battery evaluation from Pell Solar."
  },
  "redlands-ca": {
    city: "Redlands",
    intro: "Pell Solar provides professional solar and battery evaluations for homeowners in Redlands, California. Our team is available to help you assess energy needs and explore system options.",
    extra: "Redlands residents can schedule a conversation about solar panels, home batteries, and their property’s energy needs."
  },
  "highland-ca": {
    city: "Highland",
    intro: "Pell Solar serves homeowners in Highland, California with professional solar and battery evaluations. We help local residents review residential energy options through straightforward assessments.",
    extra: "Highland homeowners can ask Pell Solar about solar panels and battery storage for their household."
  },
  "loma-linda-ca": {
    city: "Loma Linda",
    intro: "Pell Solar provides professional solar and battery evaluations for homeowners in Loma Linda, California. Our services help residential property owners understand their energy options clearly.",
    extra: "Loma Linda homeowners can schedule a solar and battery evaluation for their home with Pell Solar."
  },
  "bloomington-ca": {
    city: "Bloomington",
    intro: "Pell Solar serves homeowners in Bloomington, California with solar and battery evaluations. Residents can contact our team to schedule an assessment for their home.",
    extra: "Bloomington homeowners can explore solar panels and home battery options through a clear, residential-focused consultation."
  },
  "grand-terrace-ca": {
    city: "Grand Terrace",
    intro: "Pell Solar serves homeowners in Grand Terrace, California with professional solar and battery evaluations. We provide direct assessments to help you understand residential energy options.",
    extra: "Grand Terrace residents can request a discussion of solar and battery options suited to their property."
  },
  "hacienda-heights-ca": {
    city: "Hacienda Heights",
    intro: "Pell Solar serves homeowners in Hacienda Heights, California with professional solar and battery evaluations. We help local residents understand home energy options through clear consultations.",
    extra: "Hacienda Heights homeowners can request a residential solar and battery evaluation from Pell Solar."
  },
  "walnut-ca": {
    city: "Walnut",
    intro: "Pell Solar serves homeowners in Walnut, California with professional solar and battery evaluations. Our team helps you understand residential energy options through detailed property discussions.",
    extra: "Walnut residents can discuss solar panels and battery storage with Pell Solar for their home."
  },
  "diamond-bar-ca": {
    city: "Diamond Bar",
    intro: "Pell Solar serves homeowners in Diamond Bar, California with professional solar and battery evaluations. Our team provides clear guidance to help you assess residential energy options.",
    extra: "Diamond Bar homeowners can arrange a solar and battery evaluation tailored to their household energy needs."
  },
  "azusa-ca": {
    city: "Azusa",
    intro: "Pell Solar serves homeowners throughout Azusa, California with solar and battery evaluations. Our team helps you understand residential energy options clearly and straightforwardly.",
    extra: "Azusa homeowners can schedule a solar and battery consultation with Pell Solar for their property."
  }
};
function ActiveTerritoryCity() {
  const [, params] = useRoute("/solar/:citySlug");
  const cityPage = params?.citySlug ? activeTerritoryCities[params.citySlug] : void 0;
  if (!cityPage) return null;
  return /* @__PURE__ */ jsx(CityPageTemplate, { city: cityPage.city, state: "CA", intro: cityPage.intro, extra: cityPage.extra });
}
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);
  return null;
}
function App() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, {}),
    /* @__PURE__ */ jsx(ScrollToTop, {}),
    /* @__PURE__ */ jsx(Toaster, { position: "top-right", richColors: true }),
    /* @__PURE__ */ jsxs(Switch, { children: [
      /* @__PURE__ */ jsx(Route, { path: "/", component: Home }),
      /* @__PURE__ */ jsx(Route, { path: "/get-quote", component: QuotePage }),
      /* @__PURE__ */ jsx(Route, { path: "/referral-program", component: ReferralProgram }),
      /* @__PURE__ */ jsx(Route, { path: "/refer", component: ReferralProgram }),
      /* @__PURE__ */ jsx(Route, { path: "/about", component: AboutUs }),
      /* @__PURE__ */ jsx(Route, { path: "/reviews", component: Reviews }),
      /* @__PURE__ */ jsx(Route, { path: "/schedule", component: ScheduleCall }),
      /* @__PURE__ */ jsx(Route, { path: "/privacy-policy", component: PrivacyPolicyPage }),
      /* @__PURE__ */ jsx(Route, { path: "/terms", component: Terms }),
      /* @__PURE__ */ jsx(Route, { path: "/terms-and-conditions", component: Terms }),
      /* @__PURE__ */ jsx(Route, { path: "/sms-updates", component: SmsOptIn }),
      /* @__PURE__ */ jsx(Route, { path: "/solar-demo", component: SolarDemo }),
      /* @__PURE__ */ jsx(Route, { path: "/upload-bill", component: UploadBill }),
      /* @__PURE__ */ jsx(Route, { path: "/upload-your-bill", component: UploadBill }),
      /* @__PURE__ */ jsx(Route, { path: "/thank-you", component: ThankYou }),
      /* @__PURE__ */ jsx(Route, { path: "/unsubscribe", component: Unsubscribe }),
      /* @__PURE__ */ jsx(Route, { path: "/our-work", component: OurWork }),
      /* @__PURE__ */ jsx(Route, { path: "/blog", component: Blog }),
      /* @__PURE__ */ jsx(Route, { path: "/blog/:slug", component: BlogArticle }),
      /* @__PURE__ */ jsx(Route, { path: "/california", component: SolarPanelsinCaliforniaPage }),
      /* @__PURE__ */ jsx(Route, { path: "/solar-california", component: SolarPanelsinCaliforniaPage }),
      /* @__PURE__ */ jsx(Route, { path: "/idaho", component: SolarPanelsinIdahoPage }),
      /* @__PURE__ */ jsx(Route, { path: "/solar-idaho", component: SolarPanelsinIdahoPage }),
      /* @__PURE__ */ jsx(Route, { path: "/solar-panel-systems", component: SolarSystems }),
      /* @__PURE__ */ jsx(Route, { path: "/solar-panels", component: SolarSystems }),
      /* @__PURE__ */ jsx(Route, { path: "/tesla-powerwall", component: TeslaPowerwall }),
      /* @__PURE__ */ jsx(Route, { path: "/battery-backup", component: BatteryBackup }),
      /* @__PURE__ */ jsx(Route, { path: "/ev-charging", component: EVCharging }),
      /* @__PURE__ */ jsx(Route, { path: "/financing", component: Financing }),
      /* @__PURE__ */ jsx(Route, { path: "/solar-financing", component: Financing }),
      /* @__PURE__ */ jsx(Route, { path: "/solar-repair", component: SolarRepair }),
      /* @__PURE__ */ jsx(Route, { path: "/service-warranty", component: ServiceWarranty }),
      /* @__PURE__ */ jsx(Route, { path: "/solar-lease", component: SolarLease }),
      /* @__PURE__ */ jsx(Route, { path: "/nem-3", component: NEM30 }),
      /* @__PURE__ */ jsx(Route, { path: "/nem-3-0", component: NEM30 }),
      /* @__PURE__ */ jsx(Route, { path: "/solar/anaheim-ca", component: AnaheimPage }),
      /* @__PURE__ */ jsx(Route, { path: "/solar/bakersfield-ca", component: BakersfieldPage }),
      /* @__PURE__ */ jsx(Route, { path: "/solar/baldwin-park-ca", component: BaldwinParkPage }),
      /* @__PURE__ */ jsx(Route, { path: "/solar/brea-ca", component: BreaPage }),
      /* @__PURE__ */ jsx(Route, { path: "/solar/burbank-ca", component: BurbankPage }),
      /* @__PURE__ */ jsx(Route, { path: "/solar/chino-ca", component: ChinoPage }),
      /* @__PURE__ */ jsx(Route, { path: "/solar/chino-hills-ca", component: ChinoHillsPage }),
      /* @__PURE__ */ jsx(Route, { path: "/solar/corona-ca", component: CoronaPage }),
      /* @__PURE__ */ jsx(Route, { path: "/solar/el-monte-ca", component: ElMontePage }),
      /* @__PURE__ */ jsx(Route, { path: "/solar/fontana-ca", component: FontanaPage }),
      /* @__PURE__ */ jsx(Route, { path: "/solar/fresno-ca", component: FresnoPage }),
      /* @__PURE__ */ jsx(Route, { path: "/solar/fullerton-ca", component: FullertonPage }),
      /* @__PURE__ */ jsx(Route, { path: "/solar/garden-grove-ca", component: GardenGrovePage }),
      /* @__PURE__ */ jsx(Route, { path: "/solar/glendora-ca", component: GlendoraPage }),
      /* @__PURE__ */ jsx(Route, { path: "/solar/inland-empire-ca", component: InlandEmpirePage }),
      /* @__PURE__ */ jsx(Route, { path: "/solar/irvine-ca", component: IrvinePage }),
      /* @__PURE__ */ jsx(Route, { path: "/solar/la-habra-ca", component: LaHabraPage }),
      /* @__PURE__ */ jsx(Route, { path: "/solar/lakewood-ca", component: LakewoodPage }),
      /* @__PURE__ */ jsx(Route, { path: "/solar/lancaster-ca", component: LancasterPage }),
      /* @__PURE__ */ jsx(Route, { path: "/solar/long-beach-ca", component: LongBeachPage }),
      /* @__PURE__ */ jsx(Route, { path: "/solar/los-angeles-ca", component: LosAngelesPage }),
      /* @__PURE__ */ jsx(Route, { path: "/solar/murrieta-ca", component: MurrietaPage }),
      /* @__PURE__ */ jsx(Route, { path: "/solar/ontario-ca", component: OntarioPage }),
      /* @__PURE__ */ jsx(Route, { path: "/solar/orange-ca", component: OrangePage }),
      /* @__PURE__ */ jsx(Route, { path: "/solar/palmdale-ca", component: PalmdalePage }),
      /* @__PURE__ */ jsx(Route, { path: "/solar/pomona-ca", component: PomonaPage }),
      /* @__PURE__ */ jsx(Route, { path: "/solar/rancho-cucamonga-ca", component: RanchoCucamongaPage }),
      /* @__PURE__ */ jsx(Route, { path: "/solar/riverside-ca", component: RiversidePage }),
      /* @__PURE__ */ jsx(Route, { path: "/solar/san-bernardino-ca", component: SanBernardinoPage }),
      /* @__PURE__ */ jsx(Route, { path: "/solar/santa-ana-ca", component: SantaAnaPage }),
      /* @__PURE__ */ jsx(Route, { path: "/solar/temecula-ca", component: TemeculaPage }),
      /* @__PURE__ */ jsx(Route, { path: "/solar/thousand-oaks-ca", component: ThousandOaksPage }),
      /* @__PURE__ */ jsx(Route, { path: "/solar/torrance-ca", component: TorrancePage }),
      /* @__PURE__ */ jsx(Route, { path: "/solar/ventura-ca", component: VenturaPage }),
      /* @__PURE__ */ jsx(Route, { path: "/solar/:citySlug", component: ActiveTerritoryCity }),
      /* @__PURE__ */ jsx(Route, { path: "/admin", component: AdminDashboard }),
      /* @__PURE__ */ jsx(Route, { path: "/admin/photos", component: AdminPhotos }),
      /* @__PURE__ */ jsx(Route, { path: "/admin/leads/:id", component: LeadDetail }),
      /* @__PURE__ */ jsx(Route, { path: "/admin/unsubscribes", component: AdminUnsubscribes }),
      /* @__PURE__ */ jsx(Route, { path: "/admin/chat", component: AdminChat }),
      /* @__PURE__ */ jsx(Route, { path: "/admin/chat/:sessionId", component: AdminChat }),
      /* @__PURE__ */ jsx(Route, { path: "/admin/chat-history", component: AdminChatHistory }),
      /* @__PURE__ */ jsx(Route, { children: /* @__PURE__ */ jsx("div", { style: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif" }, children: /* @__PURE__ */ jsxs("div", { style: { textAlign: "center" }, children: [
        /* @__PURE__ */ jsx("div", { style: { fontSize: "72px", fontWeight: 800, color: "#0f1f3d" }, children: "404" }),
        /* @__PURE__ */ jsx("div", { style: { fontSize: "20px", color: "#666", marginBottom: "24px" }, children: "Page not found" }),
        /* @__PURE__ */ jsx("a", { href: "/", style: { background: "#FED44D", color: "#0f1f3d", padding: "12px 28px", borderRadius: "8px", fontWeight: 700, textDecoration: "none" }, children: "Go Home" })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsx(LiveChatWidget, {})
  ] });
}
async function render(url) {
  const queryIndex = url.indexOf("?");
  const ssrPath = queryIndex === -1 ? url : url.slice(0, queryIndex);
  const ssrSearch = queryIndex === -1 ? "" : url.slice(queryIndex + 1);
  const head = getSeoMeta(url);
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } }
  });
  if (head.noindex) {
    return { html: "", dehydratedState: dehydrate(queryClient), head };
  }
  const trpcClient = trpc.createClient({
    links: [httpBatchLink({ url: "/api/trpc", transformer: superjson })]
  });
  const html = renderToString(
    /* @__PURE__ */ jsx(trpc.Provider, { client: trpcClient, queryClient, children: /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(Router, { ssrPath, ssrSearch, children: /* @__PURE__ */ jsx(App, {}) }) }) })
  );
  return { html, dehydratedState: dehydrate(queryClient), head };
}
export {
  render
};
