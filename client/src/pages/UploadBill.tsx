import { useState, useRef } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { ChevronDown, ChevronUp, Phone, Mail, CheckCircle2, AlertTriangle } from "lucide-react";

// ─── SCE Step data ────────────────────────────────────────────────────────────
const SCE_STEPS: { num: number; title: string; content: React.ReactNode }[] = [
  {
    num: 1,
    title: "Log in to sce.com",
    content: (
      <div className="space-y-3">
        <p className="text-gray-700">
          Go to{" "}
          <a href="https://www.sce.com" target="_blank" rel="noopener noreferrer" className="text-[#2BABE2] font-semibold underline">
            www.sce.com
          </a>{" "}
          and click <strong>"Log In"</strong> in the top-right corner. Use the same username and password you use to pay your Edison bill online.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2 items-start">
          <AlertTriangle size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
          <p className="text-amber-800 text-sm">
            <strong>Don't have an account?</strong> Click "Register" on the login page. You'll need your SCE account number from your paper bill. It takes about 2 minutes to set up.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-2 items-start">
          <span className="text-blue-500 text-sm mt-0.5 flex-shrink-0">💡</span>
          <p className="text-blue-800 text-sm">
            <strong>Forgot your password?</strong> Click "Forgot My Password" on the login page to reset it via email.
          </p>
        </div>
      </div>
    ),
  },
  {
    num: 2,
    title: 'Go to "More" → "Data Sharing and Download"',
    content: (
      <div className="space-y-3">
        <p className="text-gray-700">
          Once logged in, look at the top navigation bar. You'll see tabs: <strong>MY ACCOUNT</strong>, <strong>USAGE</strong>, <strong>SETTINGS</strong>, and <strong>MORE (•••)</strong>.
        </p>
        <p className="text-gray-700">
          Click the <strong>"More" (•••)</strong> tab, then select <strong>"Data Sharing and Download"</strong> from the dropdown menu.
        </p>
        <div className="bg-[#003087] rounded-lg p-3 text-white text-sm">
          <div className="flex gap-6 items-center flex-wrap">
            <span className="flex flex-col items-center gap-1 opacity-60">
              <span className="text-lg">🏠</span>
              <span className="text-xs">MY ACCOUNT</span>
            </span>
            <span className="flex flex-col items-center gap-1 opacity-60">
              <span className="text-lg">📊</span>
              <span className="text-xs">USAGE</span>
            </span>
            <span className="flex flex-col items-center gap-1 opacity-60">
              <span className="text-lg">⚙️</span>
              <span className="text-xs">SETTINGS</span>
            </span>
            <span className="flex flex-col items-center gap-1 bg-white/20 rounded px-3 py-1 ring-2 ring-[#FED44D]">
              <span className="text-lg">•••</span>
              <span className="text-xs font-bold text-[#FED44D]">MORE ← Click here</span>
            </span>
          </div>
          <div className="mt-3 bg-white text-gray-800 rounded p-2 text-sm ml-auto w-fit">
            <div className="text-gray-500 text-xs mb-1">Dropdown menu:</div>
            <div className="text-gray-400 py-1 border-b border-gray-100 text-xs">Start or Stop Service</div>
            <div className="bg-[#FED44D]/20 text-[#003087] font-bold py-1 px-2 rounded text-xs">
              ✓ Data Sharing and Download ← Select this
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    num: 3,
    title: "Set your dates, choose CSV, and download",
    content: (
      <div className="space-y-3">
        <p className="text-gray-700">
          On the "Data Sharing and Download" page, you'll see a date range selector and a format dropdown. Follow these settings exactly:
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
          {[
            { label: "A", title: "Start Date", desc: "Set to 12 months ago from today. For example, if today is April 2026, set it to April 2025." },
            { label: "B", title: "End Date", desc: "Set to today's date." },
            { label: "C", title: "File Format", desc: 'Select "Comma Separated (.csv)" — NOT XML.' },
            { label: "D", title: "Complete reCAPTCHA", desc: 'Check the "I\'m not a robot" box, then click Download.' },
          ].map(item => (
            <div key={item.label} className="flex items-start gap-3">
              <span className="bg-[#0B1D51] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{item.label}</span>
              <div>
                <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2 items-start">
          <AlertTriangle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
          <p className="text-red-800 text-sm">
            <strong>Important:</strong> You MUST select <strong>CSV — not XML</strong>. If you pick XML, we can't read the file. The downloaded file will end in <code>.csv</code>.
          </p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex gap-2 items-start">
          <CheckCircle2 size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
          <p className="text-green-800 text-sm">
            <strong>What you're downloading:</strong> This is called "Green Button Data" — it contains your exact kilowatt-hour (kWh) usage for every month of the past year. We use this to size your solar system precisely for your home.
          </p>
        </div>
      </div>
    ),
  },
  {
    num: 4,
    title: "Get a copy of your latest bill",
    content: (
      <div className="space-y-3">
        <p className="text-gray-700">
          In addition to the Green Button CSV, we also need a copy of your most recent Edison bill. This shows us your rate plan, meter type, and current charges.
        </p>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="font-bold text-[#0B1D51] text-sm mb-2">Option A — Download PDF Online</p>
            <ol className="text-gray-600 text-sm space-y-1 list-decimal list-inside">
              <li>While logged in, click <strong>"My Account"</strong></li>
              <li>Select <strong>"Billing &amp; Payments"</strong></li>
              <li>Click <strong>"View Bill"</strong> on your most recent bill</li>
              <li>Download the PDF to your computer</li>
            </ol>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="font-bold text-[#0B1D51] text-sm mb-2">Option B — Photo of Paper Bill</p>
            <ol className="text-gray-600 text-sm space-y-1 list-decimal list-inside">
              <li>Find your most recent paper Edison bill</li>
              <li>Take a clear photo with your phone</li>
              <li>Make sure all numbers are readable</li>
              <li>Upload the photo below (JPG or PNG)</li>
            </ol>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-2 items-start">
          <span className="text-blue-500 text-sm mt-0.5 flex-shrink-0">💡</span>
          <p className="text-blue-800 text-sm">
            <strong>Can't find your bill?</strong> The Green Button CSV alone is enough to get started. Upload what you have and we'll work with it.
          </p>
        </div>
      </div>
    ),
  },
  {
    num: 5,
    title: "Upload both files below — done!",
    content: (
      <div className="space-y-3">
        <p className="text-gray-700">
          Scroll down to the upload form below. Fill in your contact info, drop in your files, and hit <strong>Submit</strong>.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="font-bold text-green-800 text-sm mb-2">What happens next:</p>
          <ol className="text-green-700 text-sm space-y-1 list-decimal list-inside">
            <li>We review your Green Button data and bill within 24 hours</li>
            <li>We design a custom solar system sized for your exact usage</li>
            <li>We call or email you with your personalized savings estimate</li>
            <li>No pressure — just honest numbers from a family-owned company</li>
          </ol>
        </div>
      </div>
    ),
  },
];

// ─── File upload helper ───────────────────────────────────────────────────────
async function uploadFileToServer(file: File): Promise<{ key: string; url: string; publicUrl?: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64Data = (reader.result as string).split(",")[1];
        const res = await fetch("/api/upload-bill", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileName: file.name,
            contentType: file.type || "application/octet-stream",
            base64Data,
          }),
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

// ─── Component ────────────────────────────────────────────────────────────────
export default function UploadBill() {
  const [openStep, setOpenStep] = useState<number | null>(0);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [billFile, setBillFile] = useState<File | null>(null);
  const [csvDragOver, setCsvDragOver] = useState(false);
  const [billDragOver, setBillDragOver] = useState(false);
  const [uploadType, setUploadType] = useState<"csv" | "bill" | "both">("both");
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", address: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const csvInputRef = useRef<HTMLInputElement>(null);
  const billInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [, navigate] = useLocation();
  const createLead = trpc.leads.create.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      let csvKey: string | undefined;
      let csvUrl: string | undefined;
      let billKey: string | undefined;
      let billUrl: string | undefined;

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
        _hp: "", // honeypot — always empty for real users
      });

      setSubmitted(true);
      const thankYouParams = new URLSearchParams();
      if (leadResult?.dealId) thankYouParams.set("deal_id", String(leadResult.dealId));
      navigate(`/thank-you${thankYouParams.toString() ? "?" + thankYouParams.toString() : ""}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again or call us.");
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative py-24 md:py-32 text-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0B1D51 0%, #0d2a6e 50%, #0B1D51 100%)" }}
      >
        <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white rounded-xl px-5 py-2 flex items-center gap-3 shadow-lg z-10">
          <div className="bg-[#003087] text-white text-xs font-bold px-2 py-1 rounded">SOUTHERN CALIFORNIA</div>
          <span className="text-[#003087] font-extrabold text-lg tracking-tight">EDISON</span>
          <span className="text-gray-400 text-xs hidden sm:inline">An Edison International Company</span>
        </div>
        <div className="max-w-3xl mx-auto px-6 pt-12">
          <p className="text-[#2BABE2] font-semibold text-sm uppercase tracking-wider mb-3">Green Button Data Upload</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Upload Your <span className="text-[#FED44D]">Edison Data</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8">
            To design a solar system perfectly sized for your home, we need two files from your Edison account. Follow the steps below — it takes about <strong className="text-white">5 minutes</strong>.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <button
              onClick={scrollToForm}
              className="bg-[#FED44D] text-[#0B1D51] font-extrabold px-8 py-4 rounded-full text-sm uppercase tracking-wide hover:bg-[#f5c800] transition-colors"
            >
              SKIP TO UPLOAD FORM ↓
            </button>
            <a
              href="tel:8666468499"
              className="text-white/80 font-semibold text-sm flex items-center gap-2 hover:text-white transition-colors"
            >
              <Phone size={16} className="text-[#FED44D]" />
              Need help? (866) 646-8499 | (714) 455-3401 CA
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-white/70 text-sm">
            <span className="flex items-center gap-1">⭐ Read Current Reviews</span>
            <span className="flex items-center gap-1">🔒 Tesla Certified</span>
            <span className="flex items-center gap-1">🏠 Serving Southern California &amp; Idaho</span>
            <span className="flex items-center gap-1">⏱ 5-Minute Process</span>
          </div>
        </div>
      </section>

      {/* ── WHAT WE NEED ─────────────────────────────────────────────────── */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0B1D51] text-center mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            What We Need From You
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            We need at least one of these files to build your custom solar design. The Green Button CSV is ideal — but if you can only get your bill, that works too.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-[#2BABE2] relative">
              <div className="absolute -top-3 left-6 bg-[#2BABE2] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Preferred
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-[#003087] rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📥</span>
                </div>
                <div>
                  <h3 className="font-extrabold text-[#0B1D51] text-lg">Green Button Data (CSV)</h3>
                  <p className="text-[#2BABE2] text-sm font-semibold">From your SCE online account</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                12 months of electricity usage history from your SCE account. This gives us your exact kilowatt-hour (kWh) usage for every month — the most accurate way to size your solar system.
              </p>
              <div className="mt-4 bg-blue-50 rounded-lg p-3">
                <p className="text-blue-800 text-xs font-semibold">Why this matters:</p>
                <p className="text-blue-700 text-xs mt-1">Your kWh data tells us your peak summer usage, seasonal patterns, and total annual consumption — so we can design a system that covers your needs without over-building.</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🧾</span>
                </div>
                <div>
                  <h3 className="font-extrabold text-[#0B1D51] text-lg">Latest Edison Bill</h3>
                  <p className="text-gray-500 text-sm font-semibold">PDF download or clear photo</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                A PDF download or clear photo of your most recent bill so we can see your rate plan, meter type, and current charges.
              </p>
              <div className="mt-4 bg-gray-50 rounded-lg p-3">
                <p className="text-gray-700 text-xs font-semibold">What we look for:</p>
                <p className="text-gray-600 text-xs mt-1">Your rate plan (TOU-D-PRIME, TOU-D-4-9PM, etc.), your monthly charge total, and your service address to confirm your utility territory.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW TO GET YOUR SCE DATA ─────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1D51] text-center mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            How to Get Your SCE Data
          </h2>
          <p className="text-gray-500 text-center mb-10">
            Click each step to expand. Follow along — it takes about 5 minutes.
          </p>
          <div className="space-y-3">
            {SCE_STEPS.map((step, idx) => {
              const isOpen = openStep === idx;
              return (
                <div
                  key={step.num}
                  className={`border-2 rounded-xl overflow-hidden transition-all ${
                    isOpen ? "border-[#2BABE2] shadow-md" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <button
                    className="w-full flex items-center gap-4 p-5 text-left bg-white hover:bg-gray-50 transition-colors"
                    onClick={() => setOpenStep(isOpen ? null : idx)}
                  >
                    <span
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-extrabold flex-shrink-0 transition-colors ${
                        isOpen ? "bg-[#0B1D51] text-white" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {step.num}
                    </span>
                    <span className="font-bold text-[#0B1D51] text-base flex-1">{step.title}</span>
                    {isOpen ? (
                      <ChevronUp size={20} className="text-[#2BABE2] flex-shrink-0" />
                    ) : (
                      <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-2 bg-white border-t border-gray-100">
                      {step.content}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Can't figure it out CTA */}
          <div className="mt-10 bg-[#0B1D51] rounded-2xl p-8 text-center">
            <h3 className="text-white font-extrabold text-xl mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Need Help? We Do This Every Day.
            </h3>
            <p className="text-white/70 text-sm mb-5">
              Can't find the Green Button page or the file won't download? Just give us a call — we'll walk you through it in a few minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:8666468499"
                className="bg-[#FED44D] text-[#0B1D51] font-extrabold px-6 py-3 rounded-full text-sm uppercase tracking-wide hover:bg-[#f5c800] transition-colors no-underline flex items-center gap-2"
              >
                <Phone size={16} /> (866) 646-8499
              </a>
              <a
                href="tel:7144553401"
                className="bg-[#0B1D51] text-[#FED44D] font-extrabold px-6 py-3 rounded-full text-sm uppercase tracking-wide hover:bg-[#162a6e] transition-colors no-underline flex items-center gap-2"
              >
                <Phone size={16} /> (714) 455-3401 CA
              </a>
              <a
                href="mailto:info@pellsolar.com"
                className="text-white/80 font-semibold text-sm flex items-center gap-2 hover:text-white transition-colors no-underline"
              >
                <Mail size={16} className="text-[#FED44D]" /> info@pellsolar.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── UPLOAD FORM ──────────────────────────────────────────────────── */}
      <section ref={formRef} className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1D51] text-center mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Your Info &amp; Files
          </h2>
          <p className="text-gray-500 text-center mb-10">Fill in your details and upload your files below. We'll review everything and reach out within 24 hours.</p>

          {submitted ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
              <div className="text-6xl mb-5">✅</div>
              <h3 className="text-2xl font-extrabold text-[#0B1D51] mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Files Received!
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                We've got your data. Our team will review your usage and reach out within 24 hours with your custom solar estimate.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:8666468499"
                  className="bg-[#FED44D] text-[#0B1D51] font-extrabold px-6 py-3 rounded-full text-sm uppercase tracking-wide hover:bg-[#f5c800] transition-colors no-underline flex items-center gap-2"
                >
                  <Phone size={16} /> Call Us Now
                </a>
                <a href="/" className="text-[#2BABE2] font-semibold text-sm hover:underline no-underline">
                  ← Back to Home
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    required
                    value={form.firstName}
                    onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                    placeholder="First name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2BABE2] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={form.lastName}
                    onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                    placeholder="Last name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2BABE2] focus:border-transparent"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="you@email.com"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2BABE2] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    placeholder="(555) 555-5555"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2BABE2] focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Address (where solar will be installed) *</label>
                <input
                  type="text"
                  required
                  value={form.address}
                  onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                  placeholder="123 Main St, Upland, CA 91786"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2BABE2] focus:border-transparent"
                />
              </div>

              {/* Upload type selector */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">What are you uploading?</label>
                <div className="flex flex-wrap gap-4">
                  {(["csv", "bill", "both"] as const).map(type => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="uploadType"
                        value={type}
                        checked={uploadType === type}
                        onChange={() => setUploadType(type)}
                        className="accent-[#2BABE2]"
                      />
                      <span className="text-sm text-gray-700">
                        {type === "csv" ? "Green Button CSV only" : type === "bill" ? "Utility Bill only" : "Both files"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* CSV Drop Zone */}
              {(uploadType === "csv" || uploadType === "both") && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Green Button CSV File <span className="text-gray-400 font-normal">(from SCE — .csv)</span>
                  </label>
                  <div
                    onClick={() => csvInputRef.current?.click()}
                    onDragOver={e => { e.preventDefault(); setCsvDragOver(true); }}
                    onDragLeave={() => setCsvDragOver(false)}
                    onDrop={e => {
                      e.preventDefault();
                      setCsvDragOver(false);
                      const f = e.dataTransfer.files[0];
                      if (f) setCsvFile(f);
                    }}
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                      csvDragOver ? "border-[#2BABE2] bg-[#2BABE2]/5" : csvFile ? "border-green-400 bg-green-50" : "border-gray-300 hover:border-[#2BABE2] hover:bg-[#2BABE2]/5"
                    }`}
                  >
                    <input
                      ref={csvInputRef}
                      type="file"
                      accept=".csv,text/csv,application/csv"
                      className="hidden"
                      onChange={e => { if (e.target.files?.[0]) setCsvFile(e.target.files[0]); }}
                    />
                    {csvFile ? (
                      <div>
                        <div className="text-3xl mb-2">📊</div>
                        <p className="text-green-700 font-semibold">{csvFile.name}</p>
                        <p className="text-gray-400 text-sm mt-1">Click to change file</p>
                      </div>
                    ) : (
                      <div>
                        <div className="text-4xl mb-3">📊</div>
                        <p className="text-gray-600 font-semibold">Drop your Green Button CSV here</p>
                        <p className="text-gray-400 text-sm mt-1">or click to browse — .csv files only</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Bill Drop Zone */}
              {(uploadType === "bill" || uploadType === "both") && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Utility Bill <span className="text-gray-400 font-normal">(PDF, JPG, or PNG)</span>
                  </label>
                  <div
                    onClick={() => billInputRef.current?.click()}
                    onDragOver={e => { e.preventDefault(); setBillDragOver(true); }}
                    onDragLeave={() => setBillDragOver(false)}
                    onDrop={e => {
                      e.preventDefault();
                      setBillDragOver(false);
                      const f = e.dataTransfer.files[0];
                      if (f) setBillFile(f);
                    }}
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                      billDragOver ? "border-[#2BABE2] bg-[#2BABE2]/5" : billFile ? "border-green-400 bg-green-50" : "border-gray-300 hover:border-[#2BABE2] hover:bg-[#2BABE2]/5"
                    }`}
                  >
                    <input
                      ref={billInputRef}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,.webp,.heic,.heif"
                      className="hidden"
                      onChange={e => { if (e.target.files?.[0]) setBillFile(e.target.files[0]); }}
                    />
                    {billFile ? (
                      <div>
                        <div className="text-3xl mb-2">🧾</div>
                        <p className="text-green-700 font-semibold">{billFile.name}</p>
                        <p className="text-gray-400 text-sm mt-1">Click to change file</p>
                      </div>
                    ) : (
                      <div>
                        <div className="text-4xl mb-3">🧾</div>
                        <p className="text-gray-600 font-semibold">Drop your utility bill here</p>
                        <p className="text-gray-400 text-sm mt-1">or click to browse — PDF, JPG, PNG, HEIC, WebP accepted</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-2 items-start">
                  <AlertTriangle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#FED44D] hover:bg-[#f5c800] disabled:opacity-60 text-[#0B1D51] font-extrabold py-4 px-8 rounded-lg text-lg transition-colors uppercase tracking-wide"
              >
                {submitting ? "Uploading..." : "SUBMIT MY FILES →"}
              </button>
              <p className="text-center text-gray-400 text-xs">
                We'll review your data and reach out within 24 hours. By submitting, you agree to be contacted by Pell Solar regarding your solar analysis.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ── SCHEDULE CTA ─────────────────────────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0B1D51] mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Schedule Your Free Estimate
          </h2>
          <p className="text-gray-600 mb-6">
            Already uploaded your files? Pick a time that works for you and we'll walk you through your custom solar design on a quick call.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:8666468499"
              className="bg-[#0B1D51] text-white font-extrabold px-8 py-4 rounded-full text-sm uppercase tracking-wide hover:bg-[#0d2a6e] transition-colors no-underline flex items-center gap-2"
            >
              <Phone size={16} /> (866) 646-8499
            </a>
            <a
              href="tel:7144553401"
              className="bg-[#0B1D51] border border-[#FED44D] text-[#FED44D] font-extrabold px-8 py-4 rounded-full text-sm uppercase tracking-wide hover:bg-[#162a6e] transition-colors no-underline flex items-center gap-2"
            >
              <Phone size={16} /> (714) 455-3401 CA
            </a>
            <a
              href="mailto:info@pellsolar.com"
              className="text-[#2BABE2] font-semibold text-sm flex items-center gap-2 hover:underline no-underline"
            >
              <Mail size={16} /> info@pellsolar.com
            </a>
          </div>
          <p className="text-gray-400 text-xs mt-4">Monday–Friday • 8am–5pm • No pressure, no obligation</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
