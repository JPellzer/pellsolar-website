import { Link } from "wouter";
import { GoogleIcon, YelpIcon, YouTubeIcon } from "./SocialIcons";
import { CITY_LINKS } from "@shared/cityLinks";

const LOGO = "/manus-storage/pell-logo-yellow_77e86543.png";

export default function Footer() {
  return (
    <footer style={{ background: "#060f2e" }} className="text-white">
      {/* ── Main Footer Grid ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1: Logo + Contact */}
          <div>
            <Link href="/" className="inline-block mb-3">
              <img src={LOGO} alt="Pell Solar" className="h-20 w-auto" />
            </Link>
            <p className="text-white/70 text-sm italic mb-5">Let the Sun Shine In</p>

            <address className="not-italic">
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5 text-sm">
              <li className="text-white font-semibold tracking-wide">Pell Solar Inc.</li>
              <li className="flex items-start gap-2 text-white/80">
                <span className="text-[#2BABE2] mt-0.5">📍</span>
                <span>1326 Monte Vista Ave #7, Upland, CA 91786</span>
              </li>
              <li>
                <a href="tel:8666468499" className="flex items-center gap-2 text-white/80 no-underline hover:text-[#FED44D] transition-colors">
                  <span className="text-[#2BABE2]">📞</span>
                  <span>(866) 646-8499 — Toll-Free</span>
                </a>
              </li>
              <li>
                <a href="tel:7144553401" className="flex items-center gap-2 text-white/80 no-underline hover:text-[#FED44D] transition-colors">
                  <span className="text-[#2BABE2]">📞</span>
                  <span>(714) 455-3401 — California</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@pellsolar.com" className="flex items-center gap-2 text-white/80 no-underline hover:text-[#FED44D] transition-colors">
                  <span className="text-[#2BABE2]">✉</span>
                  <span>info@pellsolar.com</span>
                </a>
              </li>
              <li className="flex items-center gap-2 text-white/70">
                <span>🕐</span>
                <span>Mon - Sat: 8:00 AM - 5:00 PM</span>
              </li>
              <li className="text-white/70 text-xs">California Contractor License: CSLB #949122</li>
            </ul>
            </address>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Quick Links</h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/financing", label: "Financing" },
                { href: "/nem-3", label: "NEM 3.0" },
                { href: "/solar-panel-systems", label: "Solar Systems" },
                { href: "/tesla-powerwall", label: "Tesla Powerwall" },
                { href: "/solar-lease", label: "Leasing" },
                { href: "/reviews", label: "Reviews" },
                { href: "/get-quote", label: "Get a Free Quote" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-white/80 no-underline text-sm hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/referral-program"
                  className="text-[#FED44D] no-underline text-sm font-semibold hover:text-white transition-colors"
                >
                  ⚡ Referral Program
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Reviews — with real brand icons */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Reviews</h4>
            <div className="flex flex-col gap-4">
              <a href="https://www.yelp.com/biz/pell-solar-ontario" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 no-underline group">
                <YelpIcon size={36} />
                <div>
                  <div className="text-white font-bold text-sm group-hover:text-[#FED44D] transition-colors">Yelp</div>
                  <div className="text-white/70 text-xs">View current reviews on Yelp</div>
                </div>
              </a>
              <a href="https://www.google.com/search?q=pell+solar+reviews" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 no-underline group">
                <GoogleIcon size={36} />
                <div>
                  <div className="text-white font-bold text-sm group-hover:text-[#FED44D] transition-colors">Google</div>
                  <div className="text-white/70 text-xs">View current reviews on Google</div>
                </div>
              </a>
              <a href="https://www.youtube.com/@PellSolar" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 no-underline group">
                <YouTubeIcon size={36} />
                <div>
                  <div className="text-white font-bold text-sm group-hover:text-[#FED44D] transition-colors">YouTube</div>
                  <div className="text-white/70 text-xs">Watch our videos</div>
                </div>
              </a>
            </div>
          </div>

          {/* Column 4: Service Areas */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Service Areas</h4>
            <div className="mb-4">
              <p className="text-[#FED44D] font-bold text-sm mb-1">Southern California</p>
              <p className="text-white/80 text-sm leading-relaxed m-0">
                Inland Empire, LA County, Orange County, San Bernardino, Riverside
              </p>
            </div>
            <div className="mb-4">
              <p className="text-[#FED44D] font-bold text-sm mb-1">Idaho</p>
              <p className="text-white/80 text-sm leading-relaxed m-0">
                Boise, Meridian, Nampa, Eagle, Kuna, Treasure Valley
              </p>
            </div>
          </div>

        </div>

        <section className="mt-10 pt-8 border-t border-white/10" aria-labelledby="footer-cities-heading">
          <h4 id="footer-cities-heading" className="text-white font-bold text-sm uppercase tracking-wider mb-4">
            Cities We Serve
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-5 gap-y-1.5">
            {CITY_LINKS.map(({ href, name }) => (
              <Link
                key={href}
                href={href}
                className="text-white/65 no-underline text-xs hover:text-white transition-colors leading-5"
              >
                {name}
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <p className="text-white/70 text-xs m-0 text-center md:text-left">
              © 2026 Pell Solar Inc. All rights reserved. | Serving Southern California &amp; Idaho
            </p>
            <div className="flex items-center gap-3 text-xs">
              <Link href="/privacy-policy" className="text-white/60 no-underline hover:text-white/90 transition-colors">Privacy Policy</Link>
              <span className="text-white/20">|</span>
              <Link href="/terms" className="text-white/60 no-underline hover:text-white/90 transition-colors">Terms &amp; Conditions</Link>
              <span className="text-white/20">|</span>
              <Link href="/sms-updates" className="text-white/60 no-underline hover:text-white/90 transition-colors">SMS Updates</Link>
            </div>
          </div>
          <Link
            href="/get-quote"
            className="bg-[#FED44D] text-[#0B1D51] font-extrabold text-xs px-6 py-3 rounded-full no-underline hover:bg-[#f5c800] transition-colors uppercase tracking-wide"
          >
            GET YOUR FREE QUOTE
          </Link>
        </div>
      </div>
    </footer>
  );
}
