import { useState, useCallback, useEffect, useRef } from "react";
import { Link, useLocation, useSearch } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Upload, X, FileText, Phone, Image } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AddressAutocomplete from "@/components/AddressAutocomplete";
import { ZipMapPreview } from "@/components/ZipMapPreview";
import { isInServiceArea, getServiceAreaLabel } from "@/lib/serviceArea";
import { captureAttribution, deriveLeadSource, hasAttribution } from "@shared/attribution";

const HERO_IMG = "/manus-storage/solar-home-main-v2_0ad97127.jpg";
const LOGO_URL = "/manus-storage/pell-logo-yellow_77e86543.png";

/* ── Types ────────────────────────────────────────────────────────────────── */
type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

interface FormData {
  ownership: string;
  propertyType: string;
  zipCode: string;
  existingSolar: string;
  interestSelection: string;
  interestOtherText: string;
  whyInterested: string;
  paymentPref: string;
  monthlyBill: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  billFile: File | null;
  billFileKey: string;
  billFileUrl: string;
  billFileName: string;
  smsConsent: boolean;
}

/* ── Colorful Option Button (matches homepage widget style) ───────────────── */
function OptionBtn({
  selected, onClick, icon, label, sub, color = "yellow",
}: {
  selected: boolean;
  onClick: () => void;
  icon: string;
  label: string;
  sub?: string;
  color?: "yellow" | "cyan" | "green" | "navy";
}) {
  const colorMap = {
    yellow: {
      bg: selected ? "#e8c000" : "#FED44D",
      border: selected ? "#c9a800" : "#F5A623",
      text: "#0B1D51",
      subText: "#555",
      shadow: "rgba(254,212,77,0.4)",
    },
    cyan: {
      bg: selected ? "#1a9fd4" : "#2BABE2",
      border: selected ? "#1588b5" : "#1a9fd4",
      text: "#ffffff",
      subText: "rgba(255,255,255,0.8)",
      shadow: "rgba(43,171,226,0.4)",
    },
    green: {
      bg: selected ? "#16A34A" : "#22C55E",
      border: selected ? "#15803d" : "#16A34A",
      text: "#ffffff",
      subText: "rgba(255,255,255,0.8)",
      shadow: "rgba(34,197,94,0.4)",
    },
    navy: {
      bg: selected ? "#1e3a6e" : "#0B1D51",
      border: selected ? "#FED44D" : "#1e3a6e",
      text: "#ffffff",
      subText: "#aaa",
      shadow: "rgba(254,212,77,0.3)",
    },
  };
  const c = colorMap[color];

  return (
    <button
      onClick={onClick}
      style={{
        background: c.bg,
        border: `2px solid ${c.border}`,
        boxShadow: selected ? `0 0 0 3px ${c.shadow}, 0 4px 16px ${c.shadow}` : `0 2px 8px rgba(0,0,0,0.12)`,
        transform: selected ? "translateY(-2px) scale(1.02)" : undefined,
        borderRadius: "12px",
        padding: "8px 10px",
        cursor: "pointer",
        color: c.text,
        fontWeight: 800,
        textTransform: "uppercase" as const,
        letterSpacing: "0.6px",
        textAlign: "center" as const,
        minHeight: "48px",
        width: "100%",
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s ease",
        lineHeight: 1.3,
        fontSize: "13px",
      }}
    >
      <span style={{ fontSize: "20px", marginBottom: "3px", display: "block" }}>{icon}</span>
      <span>{label}</span>
      {sub && (
        <span style={{ fontSize: "10px", color: c.subText, marginTop: "4px", textTransform: "none", fontWeight: 400 }}>
          {sub}
        </span>
      )}
    </button>
  );
}

/* ── Sidebar ──────────────────────────────────────────────────────────────── */
function Sidebar({ step, form }: { step: Step; form: FormData }) {
  const totalSteps = 9;
  const pct = Math.min(Math.round(((step - 1) / (totalSteps - 1)) * 100), 100);
  const dashArray = `${pct}, 100`;

  const summaryRows = [
    form.ownership && { label: "Property", value: form.ownership === "own" ? "I Own My Home" : "I'm Renting" },
    form.propertyType && { label: "Property type", value: form.propertyType === "family" ? "Family Home / Townhouse" : form.propertyType === "apartment" ? "Apartment / Condo" : "Commercial Property" },
    form.zipCode && { label: "Zip code", value: form.zipCode },
    form.existingSolar && { label: "Existing solar", value: form.existingSolar === "yes" ? "Yes" : "No" },
    form.interestSelection && { label: "Interested in", value: form.interestSelection === "solar" ? "Solar Only" : form.interestSelection === "battery" ? "Battery Only" : "Solar + Battery" },
    form.whyInterested && { label: "Why solar", value: form.whyInterested },
    form.paymentPref && { label: "Financing", value: form.paymentPref.charAt(0).toUpperCase() + form.paymentPref.slice(1) },
    form.monthlyBill && { label: "Current bill", value: "$" + form.monthlyBill + "/mo" },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div style={{
      background: "#ffffff",
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
      color: "#0B1D51",
      width: "300px",
      minWidth: "300px",
      position: "sticky",
      top: "20px",
    }}>
      {/* Sidebar header — bright blue gradient */}
      <div style={{
        background: "linear-gradient(135deg, #2BABE2 0%, #1a7fc4 50%, #0f5fa0 100%)",
        padding: "18px 20px",
      }}>
        <img src={LOGO_URL} alt="Pell Solar" style={{ height: "38px", objectFit: "contain" }} />
        <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)", marginTop: "6px" }}>
          Free Custom Solar Quote
        </div>
      </div>

      <div style={{ padding: "20px 20px" }}>
        {/* Progress circle */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "18px" }}>
          <div style={{ flexShrink: 0, position: "relative", width: "80px", height: "90px" }}>
            <svg style={{ width: "80px", height: "80px", transform: "rotate(-90deg)" }} viewBox="0 0 36 36">
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e5e7eb" strokeWidth="3" />
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#FED44D" strokeWidth="3" strokeDasharray={dashArray} strokeLinecap="round" />
            </svg>
            <div style={{ position: "absolute", top: "36px", left: "50%", transform: "translate(-50%, -50%)", fontSize: "18px", fontWeight: 800, color: "#0B1D51" }}>{pct}%</div>
            <div style={{ textAlign: "center", fontSize: "10px", fontWeight: 600, color: "#6b7280", marginTop: "2px" }}>Complete</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "12px", color: "#374151", lineHeight: 1.5 }}>Answer a few quick questions for a custom solar installation quote.</div>
            <div style={{ fontSize: "11px", color: "#6b7280", marginTop: "6px" }}>CSLB #949122</div>
          </div>
        </div>

        {/* Solar requirements summary */}
        {summaryRows.length > 0 && (
          <div style={{ marginBottom: "16px" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#0B1D51", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "1px" }}>Solar Requirements</div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <tbody>
                {summaryRows.map((r, i) => (
                  <tr key={i}>
                    <td style={{ padding: "7px 0", color: "#2BABE2", fontWeight: 600, borderBottom: "1px solid #e5e7eb", width: "45%" }}>{r.label}</td>
                    <td style={{ padding: "7px 0", color: "#1f2937", textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>{r.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "14px 0" }} />

        {/* Why PellSolar */}
        <div>
          <div style={{ fontSize: "12px", fontWeight: 700, color: "#0B1D51", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "1px" }}>Why PellSolar?</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
            {[
              { bold: "Family-Owned", rest: "Solar Company" },
              { bold: "License #949122", rest: "— CA, ID" },
              { bold: "Tesla Certified Installer", rest: "" },
              { bold: "Current Reviews", rest: "— Google & Yelp" },
              { bold: "$0 Down", rest: "Lease & Financing" },
            ].map(({ bold, rest }) => (
              <div key={bold} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#374151" }}>
                <span style={{ color: "#22C55E", fontSize: "14px" }}>✓</span>
                <span><strong style={{ color: "#0B1D51" }}>{bold}</strong> {rest}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "14px", paddingTop: "14px", borderTop: "1px solid #e5e7eb" }}>
            <div style={{ fontSize: "11px", color: "#6b7280" }}>California: <a href="tel:+17148804416" style={{ color: "#2BABE2", fontWeight: 600 }}>(714) 880-4416</a></div>
            <div style={{ fontSize: "11px", color: "#6b7280", marginTop: "3px" }}>Idaho: <a href="tel:+12085031416" style={{ color: "#2BABE2", fontWeight: 600 }}>(208) 503-1416</a></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Bill Upload ──────────────────────────────────────────────────────────── */
function BillUpload({ file, onFile, onClear }: { file: File | null; onFile: (f: File) => void; onClear: () => void }) {
  const [dragging, setDragging] = useState(false);
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const f = e.dataTransfer.files[0]; if (f) onFile(f);
  }, [onFile]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { const f = e.target.files?.[0]; if (f) onFile(f); };

  if (file) {
    const isImage = file.type.startsWith("image/");
    return (
      <div className="flex items-center gap-4 p-4 rounded-xl border-2 border-yellow-400 bg-yellow-50">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-yellow-100">
          {isImage ? <Image className="w-6 h-6 text-yellow-600" /> : <FileText className="w-6 h-6 text-yellow-600" />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 truncate">{file.name}</p>
          <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
        <button onClick={onClear} className="p-1.5 rounded-full bg-yellow-100 hover:bg-yellow-200">
          <X className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${dragging ? "border-yellow-400 bg-yellow-50" : "border-gray-300 bg-gray-50 hover:border-[#2BABE2] hover:bg-blue-50"}`}
    >
      <input type="file" accept=".pdf,.jpg,.jpeg,.png,.webp,.heic" onChange={handleChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
      <Upload className="w-10 h-10 mx-auto mb-3 text-gray-400" />
      <p className="font-semibold text-gray-700 text-sm">Drop your utility bill here</p>
      <p className="text-xs text-gray-400 mt-1">or click to browse · PDF, JPG, PNG accepted · Max 10MB</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
export default function QuotePage() {
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
  // If ownership is pre-filled from homepage widget, skip Step 1 (avoid duplicate question)
  const initialStep: Step = hasHomepagePrefill ? 8 : prefillOwnership === "own" ? 2 : 1;
  const [step, setStep] = useState<Step>(initialStep);
  const [uploading, setUploading] = useState(false);
  const [showRenterPopup, setShowRenterPopup] = useState(false);
  const [zipStatus, setZipStatus] = useState<"idle" | "valid" | "invalid">("idle");
  const formCardRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<FormData>({
    ownership: prefillOwnership, propertyType: prefillPropertyType,
    zipCode: prefillZipCode, existingSolar: prefillExistingSolar,
    interestSelection: "",
    interestOtherText: "",
    whyInterested: prefillWhyInterested, paymentPref: prefillPaymentPref,
    monthlyBill: "",
    firstName: "", lastName: "", email: "", phone: "", address: "", city: "", state: "",
    billFile: null, billFileKey: "", billFileUrl: "", billFileName: "",
    smsConsent: false,
  });

  const createLead = trpc.leads.create.useMutation({
    onSuccess: (data, variables) => {
      const searchParams = new URLSearchParams();
      if (data.isDuplicate) searchParams.set("returning", "1");
      if (data.dealId) searchParams.set("deal_id", String(data.dealId));
      if (data.id) searchParams.set("lead_id", String(data.id));
      const params = searchParams.toString() ? `?${searchParams.toString()}` : "";
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
    },
  });

  const update = (patch: Partial<FormData>) => setForm(f => ({ ...f, ...patch }));

  const selectAndAdvance = (patch: Partial<FormData>) => {
    update(patch);
    setTimeout(() => setStep(s => Math.min(s + 1, 9) as Step), 250);
  };

  // Scroll to form top whenever step changes
  useEffect(() => {
    if (!formCardRef.current) return;
    const top = formCardRef.current.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }, [step]);

  const handleOwnershipSelect = (val: string) => {
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
    return () => { document.body.style.overflow = ""; };
  }, [showRenterPopup]);

  const uploadBill = async (file: File): Promise<{ key: string; url: string; publicUrl?: string } | null> => {
    setUploading(true);
    try {
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve((reader.result as string).split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const res = await fetch("/api/upload-bill", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ fileName: file.name, contentType: file.type, base64Data }) });
      if (!res.ok) throw new Error("Upload failed");
      return await res.json();
    } catch { toast.error("Bill upload failed. You can still submit without it."); return null; }
    finally { setUploading(false); }
  };

  const handleSubmit = async () => {
    const attribution = captureAttribution(search);
    const source = deriveLeadSource("quote-page", attribution);
    let billKey = form.billFileKey, billUrl = form.billFileUrl, billName = form.billFileName;
    if (form.billFile && !billKey) {
      const result = await uploadBill(form.billFile);
      if (result) { billKey = result.key; billUrl = result.publicUrl || result.url; billName = form.billFile.name; }
    }
    createLead.mutate({
      firstName: form.firstName, lastName: form.lastName, email: form.email, phone: form.phone,
      address: form.address, city: form.city || undefined, state: form.state || undefined, zip: form.zipCode || undefined,
      ownershipType: form.ownership === "own" ? "homeowner" : "renter",
      propertyType: form.propertyType === "family" ? "family_home" : form.propertyType === "apartment" ? "apartment" : form.propertyType === "commercial" ? "commercial" : undefined,
      zipCode: form.zipCode || undefined,
      existingSolar: form.existingSolar === "yes" ? true : form.existingSolar === "no" ? false : undefined,
      solarMotivation: form.whyInterested === "Long-Term Energy Price Stability" ? "price_stability" : form.whyInterested === "Reduce Electricity Bills" ? "reduce_bills" : form.whyInterested === "Create a More Energy-Efficient All-Electric Home" ? "all_electric" : form.whyInterested ? "other" : undefined,
      paymentPreference: (form.paymentPref === "leasing" || form.paymentPref === "financing" || form.paymentPref === "cash") ? form.paymentPref as "leasing" | "financing" | "cash" : undefined,
      monthlyBillRange: form.monthlyBill || "unknown",
      interestType: (["solar", "battery", "solar_battery", "ev_charger", "other"].includes(form.interestSelection) ? form.interestSelection : "solar") as "solar" | "battery" | "solar_battery" | "ev_charger" | "other",
      interestOtherText: form.interestSelection === "other" ? form.interestOtherText : undefined,
      source,
      billFileKey: billKey || undefined, billFileUrl: billUrl || undefined, billFileName: billName || undefined,
      utmData: hasAttribution(attribution) ? attribution : undefined,
      _hp: "", // honeypot — always empty for real users
    });
  };

  const canSubmit = !!(form.firstName && form.lastName && form.email && form.phone);

  /* ── Primary action button (yellow) ──────────────────────────────────── */
  const ActionBtn = ({ onClick, disabled, children }: { onClick: () => void; disabled?: boolean; children: React.ReactNode }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: disabled ? "#d1d5db" : "#FED44D",
        color: disabled ? "#9ca3af" : "#0B1D51",
        fontSize: "15px",
        fontWeight: 800,
        textTransform: "uppercase" as const,
        letterSpacing: "1.5px",
        padding: "12px 32px",
        border: "none",
        borderRadius: "50px",
        cursor: disabled ? "not-allowed" : "pointer",
        width: "100%",
        marginTop: "12px",
        transition: "all 0.2s ease",
        boxShadow: disabled ? "none" : "0 4px 20px rgba(254,212,77,0.45)",
      }}
    >
      {children}
    </button>
  );

  /* ── Step header inside form card ─────────────────────────────────────── */
  const totalSteps = 9;
  const StepHeader = ({ stepNum }: { stepNum: number }) => (
    <div style={{
      background: "linear-gradient(135deg, #2BABE2 0%, #1a7fc4 50%, #0f5fa0 100%)",
      padding: "14px 22px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}>
      {stepNum > 1 ? (
        <button
          onClick={() => setStep(s => Math.max(1, s - 1) as Step)}
          style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "20px", padding: "5px 12px", color: "#fff", fontSize: "12px", fontWeight: 700, cursor: "pointer", letterSpacing: "0.5px" }}
        >
          ← Back
        </button>
      ) : (
        <div style={{ width: "60px" }} />
      )}
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.75)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>
          Step {stepNum} of {totalSteps}
        </div>
        {/* Progress bar */}
        <div style={{ width: "120px", height: "4px", background: "rgba(255,255,255,0.25)", borderRadius: "2px", marginTop: "5px" }}>
          <div style={{ width: `${(stepNum / totalSteps) * 100}%`, height: "100%", background: "#FED44D", borderRadius: "2px", transition: "width 0.3s ease" }} />
        </div>
      </div>
      <div style={{ width: "60px" }} />
    </div>
  );

  /* ── Step heading ─────────────────────────────────────────────────────── */
  const StepHeading = ({ children }: { children: React.ReactNode }) => (
    <div style={{
      fontSize: "15px",
      fontWeight: 800,
      textAlign: "center",
      marginBottom: "12px",
      color: "#0B1D51",
      fontFamily: "'Montserrat', sans-serif",
      lineHeight: 1.35,
    }}>
      {children}
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", background: "#f0f4f8" }}>
      <Navbar />

      {/* Page background — house photo with overlay */}
      <div style={{
        backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15)), url(${HERO_IMG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        paddingTop: "120px",
        paddingBottom: "60px",
      }}>
        {/* Renter Popup */}
        {showRenterPopup && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
            <div style={{ background: "#fff", borderRadius: "20px", maxWidth: "480px", width: "90%", padding: "40px", position: "relative", boxShadow: "0 20px 60px rgba(0,0,0,0.35)", textAlign: "center" }}>
              <button
                onClick={() => { setShowRenterPopup(false); update({ ownership: "" }); }}
                style={{ position: "absolute", top: "14px", right: "14px", background: "none", border: "2px solid #2BABE2", borderRadius: "50%", width: "34px", height: "34px", fontSize: "18px", cursor: "pointer", color: "#2BABE2", display: "flex", alignItems: "center", justifyContent: "center" }}
              >&times;</button>
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>🏢</div>
              <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#0B1D51", margin: "0 0 16px 0", fontFamily: "'Montserrat', sans-serif" }}>Thanks for your interest!</h2>
              <p style={{ color: "#666", fontSize: "14px", lineHeight: 1.6, margin: "0 0 12px 0" }}>At this time, we only sell and install solar systems for homeowners.</p>
              <div style={{ background: "#FED44D20", border: "1px solid #FED44D", borderRadius: "12px", padding: "14px", margin: "0 0 16px 0" }}>
                <p style={{ color: "#0B1D51", fontWeight: 700, fontSize: "14px", margin: 0 }}>💰 Know a homeowner? Refer them and earn cash!</p>
                <p style={{ color: "#666", fontSize: "13px", margin: "6px 0 0" }}>We pay referral bonuses for every installation that closes.</p>
              </div>
              <p style={{ color: "#666", fontSize: "14px", lineHeight: 1.6, margin: "0 0 20px 0" }}>If you know friends, family, or neighbors who own their home, send them our way.</p>
              <button
                onClick={() => { setShowRenterPopup(false); update({ ownership: "" }); }}
                style={{ padding: "12px 32px", background: "#2BABE2", color: "#fff", border: "none", borderRadius: "50px", fontWeight: 700, fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px", cursor: "pointer" }}
              >Close</button>
            </div>
          </div>
        )}

        {/* Main layout: form + sidebar */}
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px 10px 20px", display: "flex", justifyContent: "center", gap: "28px", alignItems: "flex-start", flexWrap: "wrap" }}>

          {/* Form container */}
          <div ref={formCardRef} style={{ width: "100%", maxWidth: "600px", scrollMarginTop: "72px" }}>

            {/* Form card */}
            <div style={{ background: "#ffffff", borderRadius: "20px", overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.2)" }}>

              {/* Top gradient header — always shown */}
              <div style={{
                background: "linear-gradient(135deg, #2BABE2 0%, #1a7fc4 45%, #0f5fa0 100%)",
                padding: "18px 24px 16px",
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}>
                <img src={LOGO_URL} alt="Pell Solar" style={{ height: "42px", objectFit: "contain", flexShrink: 0 }} />
                <div>
                  <h1 style={{ fontSize: "15px", fontWeight: 800, color: "#FED44D", lineHeight: 1.2, fontFamily: "'Montserrat', sans-serif", textTransform: "uppercase", letterSpacing: "0.5px", margin: 0 }}>
                    Get Your Free Solar Quote
                  </h1>
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.85)", marginTop: "3px" }}>
                    No cost · No obligation · Takes 2 minutes
                  </div>
                </div>
              </div>

              {/* Step progress header (steps 1–9) */}
              {step >= 1 && step <= 9 && <StepHeader stepNum={step} />}

              {/* Form body */}
              <div style={{ padding: "16px 20px 16px" }}>

                {/* Step 1: Ownership */}
                {step === 1 && (
                  <div>
                    <StepHeading>Get a custom solar quote for your property</StepHeading>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                      <OptionBtn
                        selected={form.ownership === "own"}
                        onClick={() => handleOwnershipSelect("own")}
                        icon="🏠"
                        label="I Own My Home"
                        color="yellow"
                      />
                      <OptionBtn
                        selected={form.ownership === "rent"}
                        onClick={() => handleOwnershipSelect("rent")}
                        icon="🏢"
                        label="I'm Renting"
                        color="cyan"
                      />
                    </div>
                    <div style={{ marginTop: "10px", textAlign: "center" }}>
                      <a href="/schedule" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#22C55E", color: "#fff", fontWeight: 800, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.6px", padding: "12px 24px", borderRadius: "50px", textDecoration: "none", boxShadow: "0 4px 14px rgba(34,197,94,0.35)" }}>
                        🔧 Service Call
                      </a>
                    </div>
                  </div>
                )}

                {/* Step 2: Property Type */}
                {step === 2 && (
                  <div>
                    <StepHeading>What type of property do you have?</StepHeading>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                      {[
                        { val: "family", icon: "🏡", label: "Family Home", color: "yellow" as const },
                        { val: "apartment", icon: "🏢", label: "Apartment / Condo", color: "cyan" as const },
                        { val: "commercial", icon: "🏗️", label: "Commercial", color: "navy" as const },
                      ].map(o => (
                        <OptionBtn
                          key={o.val}
                          selected={form.propertyType === o.val}
                          onClick={() => selectAndAdvance({ propertyType: o.val })}
                          icon={o.icon}
                          label={o.label}
                          color={o.color}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Zip Code */}
                {step === 3 && (
                  <div>
                    <StepHeading>What is your zip code?</StepHeading>
                    <div style={{ maxWidth: "280px", margin: "0 auto" }}>
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={5}
                        value={form.zipCode}
                        onChange={e => {
                          const val = e.target.value.replace(/\D/g, "").slice(0, 5);
                          update({ zipCode: val });
                          setZipStatus("idle");
                        }}
                        placeholder="e.g. 93722"
                        style={{
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
                          letterSpacing: "6px",
                        }}
                        onFocus={e => (e.target.style.borderColor = "#2BABE2")}
                        onBlur={e => (e.target.style.borderColor = zipStatus === "invalid" ? "#ef4444" : zipStatus === "valid" ? "#22c55e" : "#e0e0e0")}
                      />

                      {/* Map preview — shown when 5 digits entered */}
                      {form.zipCode.length === 5 && (
                        <ZipMapPreview
                          zip={form.zipCode}
                          style={{ marginTop: "10px", borderRadius: "12px", overflow: "hidden", border: "2px solid #e0e0e0", height: "140px" }}
                        />
                      )}

                      {/* Out-of-area message */}
                      {zipStatus === "invalid" && (
                        <div style={{
                          marginTop: "10px",
                          background: "#fef2f2",
                          border: "1px solid #fecaca",
                          borderRadius: "10px",
                          padding: "10px 12px",
                          textAlign: "center",
                        }}>
                          <p style={{ color: "#dc2626", fontWeight: 700, fontSize: "13px", margin: 0 }}>😔 We don't currently serve this area</p>
                          <p style={{ color: "#6b7280", fontSize: "12px", margin: "4px 0 0" }}>We serve Southern California and Idaho. Call us at <a href="tel:8666468499" style={{ color: "#2BABE2", fontWeight: 700 }}>(866) 646-8499</a> to check if we're expanding near you.</p>
                        </div>
                      )}

                      {/* Valid area confirmation */}
                      {zipStatus === "valid" && (
                        <div style={{
                          marginTop: "10px",
                          background: "#f0fdf4",
                          border: "1px solid #bbf7d0",
                          borderRadius: "10px",
                          padding: "8px 12px",
                          textAlign: "center",
                        }}>
                          <p style={{ color: "#16a34a", fontWeight: 700, fontSize: "13px", margin: 0 }}>✅ Great news — we serve {getServiceAreaLabel(form.zipCode)}!</p>
                        </div>
                      )}

                      <ActionBtn
                        onClick={() => {
                          if (form.zipCode.length < 5) return;
                          const valid = isInServiceArea(form.zipCode);
                          setZipStatus(valid ? "valid" : "invalid");
                          if (valid) setTimeout(() => setStep(4), 800);
                        }}
                        disabled={form.zipCode.length < 5}
                      >
                        Check Zip Code
                      </ActionBtn>
                    </div>
                  </div>
                )}

                {/* Step 4: Existing Solar */}
                {step === 4 && (
                  <div>
                    <StepHeading>Do you have existing solar panels?</StepHeading>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                      <OptionBtn
                        selected={form.existingSolar === "yes"}
                        onClick={() => selectAndAdvance({ existingSolar: "yes" })}
                        icon="☀️"
                        label="Yes"
                        color="yellow"
                      />
                      <OptionBtn
                        selected={form.existingSolar === "no"}
                        onClick={() => selectAndAdvance({ existingSolar: "no" })}
                        icon="✖"
                        label="No"
                        color="cyan"
                      />
                    </div>
                  </div>
                )}

                {/* Step 5: What are you interested in? */}
                {step === 5 && (
                  <div>
                    <StepHeading>What are you interested in?</StepHeading>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {[
                        { val: "solar", icon: "☀️", label: "Solar Only", sub: "Panels + Installation", color: "yellow" as const },
                        { val: "battery", icon: "🔋", label: "Battery Only", sub: "Tesla Powerwall & Backup", color: "cyan" as const },
                        { val: "solar_battery", icon: "⚡", label: "Solar + Battery", sub: "Complete Energy System", color: "green" as const },
                        { val: "ev_charger", icon: "🚗", label: "EV Charger", sub: "Home EV Charging Station", color: "navy" as const },
                        { val: "other", icon: "💬", label: "Other / Not Sure", sub: "Tell us what you need", color: "navy" as const },
                      ].map(o => (
                        <OptionBtn
                          key={o.val}
                          selected={form.interestSelection === o.val}
                          onClick={() => {
                            update({ interestSelection: o.val });
                            // other and ev_charger: show Continue button, don't auto-advance
                            // solar, battery, solar_battery: skip to step 6 (Why solar?)
                            if (o.val !== "other" && o.val !== "ev_charger") {
                              setTimeout(() => setStep(6), 180);
                            }
                          }}
                          icon={o.icon}
                          label={o.label}
                          sub={o.sub}
                          color={o.color}
                        />
                      ))}
                    </div>
                    {/* Free-text input for Other / Not Sure */}
                    {form.interestSelection === "other" && (
                      <div style={{ marginTop: "12px" }}>
                        <textarea
                          value={form.interestOtherText}
                          onChange={e => update({ interestOtherText: e.target.value })}
                          placeholder="Tell us what you're looking for (e.g. roofing, solar repair, just exploring...)"
                          rows={3}
                          style={{
                            width: "100%",
                            padding: "12px",
                            border: "2px solid #e0e0e0",
                            borderRadius: "12px",
                            fontSize: "14px",
                            fontFamily: "inherit",
                            resize: "none",
                            outline: "none",
                            boxSizing: "border-box",
                            background: "#f9fafb",
                          }}
                        />
                        <ActionBtn
                          onClick={() => setStep(7)}
                          disabled={false}
                        >
                          Continue →
                        </ActionBtn>
                      </div>
                    )}
                    {/* EV Charger: also skip step 6 (Why solar?) — go straight to payment */}
                    {form.interestSelection === "ev_charger" && (
                      <div style={{ marginTop: "12px" }}>
                        <ActionBtn
                          onClick={() => setStep(7)}
                          disabled={false}
                        >
                          Continue →
                        </ActionBtn>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 6: Why Interested */}
                {step === 6 && (
                  <div>
                    <StepHeading>
                      Why are you interested in installing solar at your{" "}
                      {form.propertyType === "family" ? "family home/townhouse" : form.propertyType === "apartment" ? "apartment/condo" : form.propertyType === "commercial" ? "commercial property" : "home"}?
                    </StepHeading>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {[
                        { val: "Long-Term Energy Price Stability", icon: "📈", color: "yellow" as const },
                        { val: "Reduce Electricity Bills", icon: "💡", color: "cyan" as const },
                        { val: "Create a More Energy-Efficient, All-Electric Home", icon: "🏠", color: "green" as const },
                        { val: "Other", icon: "💬", color: "navy" as const },
                      ].map(o => (
                        <OptionBtn
                          key={o.val}
                          selected={form.whyInterested === o.val}
                          onClick={() => selectAndAdvance({ whyInterested: o.val })}
                          icon={o.icon}
                          label={o.val}
                          color={o.color}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 7: Payment Preference */}
                {step === 7 && (
                  <div>
                    <StepHeading>Are you considering leasing, financing, or cash?</StepHeading>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {[
                        { val: "leasing", icon: "📋", label: "Leasing", color: "yellow" as const },
                        { val: "financing", icon: "🏦", label: "Financing", color: "cyan" as const },
                        { val: "cash", icon: "💰", label: "Cash", color: "green" as const },
                      ].map(o => (
                        <OptionBtn
                          key={o.val}
                          selected={form.paymentPref === o.val}
                          onClick={() => selectAndAdvance({ paymentPref: o.val })}
                          icon={o.icon}
                          label={o.label}
                          color={o.color}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 8: Monthly Bill */}
                {step === 8 && (
                  <div>
                    <StepHeading>What is your average monthly electricity bill?</StepHeading>
                    <div style={{ maxWidth: "240px", margin: "0 auto" }}>
                      <div style={{ position: "relative" }}>
                        <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "18px", fontWeight: 700, color: "#999" }}>$</span>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={form.monthlyBill}
                          onChange={e => update({ monthlyBill: e.target.value.replace(/\D/g, "") })}
                          placeholder="250"
                          style={{
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
                            transition: "border-color 0.2s",
                          }}
                          onFocus={e => (e.target.style.borderColor = "#2BABE2")}
                          onBlur={e => (e.target.style.borderColor = "#e0e0e0")}
                        />
                        <span style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", fontSize: "12px", fontWeight: 600, color: "#999" }}>/Month</span>
                      </div>
                      <ActionBtn onClick={() => { if (form.monthlyBill) setStep(9); }} disabled={!form.monthlyBill}>
                        One Last Step
                      </ActionBtn>
                    </div>
                  </div>
                )}

                {/* Step 9: Contact Info */}
                {step === 9 && (
                  <div>
                    <StepHeading>Fill out this form and our team will reach out about your solar savings</StepHeading>
                    <div style={{ maxWidth: "480px", margin: "0 auto" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#444", marginBottom: "5px", textTransform: "uppercase", letterSpacing: "0.5px" }}>First Name *</label>
                          <input type="text" value={form.firstName} onChange={e => update({ firstName: e.target.value })} placeholder="John"
                            style={{ width: "100%", padding: "11px 14px", border: "2px solid #e0e0e0", borderRadius: "10px", background: "#f9fafb", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
                            onFocus={e => (e.target.style.borderColor = "#2BABE2")} onBlur={e => (e.target.style.borderColor = "#e0e0e0")} />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#444", marginBottom: "5px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Last Name *</label>
                          <input type="text" value={form.lastName} onChange={e => update({ lastName: e.target.value })} placeholder="Smith"
                            style={{ width: "100%", padding: "11px 14px", border: "2px solid #e0e0e0", borderRadius: "10px", background: "#f9fafb", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
                            onFocus={e => (e.target.style.borderColor = "#2BABE2")} onBlur={e => (e.target.style.borderColor = "#e0e0e0")} />
                        </div>
                      </div>
                      <div style={{ marginBottom: "12px" }}>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#444", marginBottom: "5px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Email Address *</label>
                        <input type="email" value={form.email} onChange={e => update({ email: e.target.value })} placeholder="john@example.com"
                          style={{ width: "100%", padding: "11px 14px", border: "2px solid #e0e0e0", borderRadius: "10px", background: "#f9fafb", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
                          onFocus={e => (e.target.style.borderColor = "#2BABE2")} onBlur={e => (e.target.style.borderColor = "#e0e0e0")} />
                      </div>
                      <div style={{ marginBottom: "12px" }}>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#444", marginBottom: "5px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Phone Number *</label>
                        <input type="tel" value={form.phone} onChange={e => update({ phone: e.target.value })} placeholder="(714) 555-0100"
                          style={{ width: "100%", padding: "11px 14px", border: "2px solid #e0e0e0", borderRadius: "10px", background: "#f9fafb", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
                          onFocus={e => (e.target.style.borderColor = "#2BABE2")} onBlur={e => (e.target.style.borderColor = "#e0e0e0")} />
                      </div>
                      <div style={{ marginBottom: "12px" }}>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#444", marginBottom: "5px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Home Address</label>
                        <AddressAutocomplete
                          value={form.address}
                          onChange={(full, parts) => update({ address: full, city: parts.city, state: parts.state, zipCode: parts.zip || form.zipCode })}
                          placeholder="Start typing your address…"
                          id="quote-address"
                          style={{ width: "100%", padding: "11px 14px", border: "2px solid #e0e0e0", borderRadius: "10px", background: "#f9fafb", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
                        />
                      </div>
                      <div style={{ marginBottom: "8px" }}>
                        <p style={{ fontSize: "12px", fontWeight: 700, color: "#444", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                          Upload Your Utility Bill <span style={{ color: "#ffffff", fontWeight: 700, textTransform: "none", fontSize: "10px", background: "#2BABE2", padding: "2px 8px", borderRadius: "12px", marginLeft: "8px", letterSpacing: "0.5px" }}>OPTIONAL</span>
                        </p>
                        <BillUpload file={form.billFile} onFile={f => update({ billFile: f, billFileName: f.name })} onClear={() => update({ billFile: null, billFileKey: "", billFileUrl: "", billFileName: "" })} />
                      </div>
                      {/* SMS Opt-in Consent — required for Twilio A2P 10DLC compliance */}
                      <div style={{ margin: "12px 0 8px", padding: "12px 14px", background: "#f0f9ff", border: "1.5px solid #2BABE2", borderRadius: "10px", display: "flex", alignItems: "flex-start", gap: "10px" }}>
                        <input
                          type="checkbox"
                          id="sms-consent"
                          checked={form.smsConsent ?? false}
                          onChange={e => update({ smsConsent: e.target.checked })}
                          style={{ marginTop: "2px", width: "16px", height: "16px", flexShrink: 0, accentColor: "#2BABE2", cursor: "pointer" }}
                        />
                        <label htmlFor="sms-consent" style={{ fontSize: "12px", color: "#374151", lineHeight: 1.5, cursor: "pointer" }}>
                          I agree to receive SMS text messages from Pell Solar about my solar project (appointment reminders, installation updates, project status). Reply <strong>STOP</strong> to opt out at any time. Msg &amp; data rates may apply.{" "}
                          <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" style={{ color: "#2BABE2", fontWeight: 600 }}>Terms</a>{" &amp; "}
                          <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: "#2BABE2", fontWeight: 600 }}>Privacy Policy</a>.
                          <span style={{ display: "block", marginTop: "3px", color: "#6b7280", fontSize: "11px" }}>Consent is not required to receive a quote or purchase services.</span>
                        </label>
                      </div>
                      <ActionBtn onClick={handleSubmit} disabled={!canSubmit || createLead.isPending || uploading}>
                        {createLead.isPending || uploading ? "Submitting..." : "Submit My Quote"}
                      </ActionBtn>
                    </div>
                  </div>
                )}

                {/* Step 10: Thank You */}
                {step === 10 && (
                  <div style={{ padding: "40px 16px", textAlign: "center" }}>
                    <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "linear-gradient(135deg, #FED44D, #F5A623)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: "40px", boxShadow: "0 8px 24px rgba(254,212,77,0.4)" }}>☀️</div>
                    <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#0B1D51", marginBottom: "10px", fontFamily: "'Montserrat', sans-serif" }}>You're All Set!</h2>
                    <p style={{ color: "#555", fontSize: "16px", marginBottom: "6px" }}>Thank you, <strong>{form.firstName}</strong>! Your quote request has been received.</p>
                    <p style={{ color: "#888", marginBottom: "28px", fontSize: "14px" }}>A Pell Solar specialist will contact you within 1 business day.</p>
                    <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                      <a href="tel:+18666468499" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#FED44D", color: "#0B1D51", fontWeight: 800, padding: "13px 26px", borderRadius: "50px", textDecoration: "none", fontSize: "14px", boxShadow: "0 4px 16px rgba(254,212,77,0.4)" }}>
                        <Phone size={15} /> Call Us Now
                      </a>
                      <Link href="/" style={{ display: "inline-flex", alignItems: "center", background: "#0B1D51", color: "#fff", fontWeight: 700, padding: "13px 26px", borderRadius: "50px", textDecoration: "none", fontSize: "14px" }}>
                        Back to Home
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tax credit banner */}
            {step <= 9 && (
              <div style={{
                background: "linear-gradient(135deg, #0f5fa0 0%, #1a7fc4 100%)",
                borderRadius: "0 0 16px 16px",
                padding: "12px 20px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginTop: "-4px",
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "13px", fontWeight: 800, color: "#FED44D", textTransform: "uppercase", lineHeight: 1.3, letterSpacing: "0.3px" }}>
                    YOUR TAX CREDIT SAVINGS DIDN'T DISAPPEAR, THEY JUST MOVED!
                  </div>
                  <a href="https://www.youtube.com/@PellSolar" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.85)", fontSize: "11px", textDecoration: "underline", marginTop: "3px", display: "inline-block", fontWeight: 600 }}>
                    Watch This Video to Learn How →
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar — desktop only */}
            {step <= 9 && (
              <div className="hidden lg:block">
                <Sidebar step={step} form={form} />
              </div>
            )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
