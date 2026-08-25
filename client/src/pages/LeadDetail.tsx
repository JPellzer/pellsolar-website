import { useState } from "react";
import { Link, useParams } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";
import {
  ArrowLeft, Mail, Phone, MapPin, FileText, Image as ImageIcon,
  Save, Sun, CheckCircle, XCircle, RefreshCw, ExternalLink
} from "lucide-react";

type LeadStatus = "New" | "Contacted" | "Quoted" | "Closed" | "Lost";

const STATUS_COLORS: Record<LeadStatus, string> = {
  New: "status-New",
  Contacted: "status-Contacted",
  Quoted: "status-Quoted",
  Closed: "status-Closed",
  Lost: "status-Lost",
};

const SOURCE_LABELS: Record<string, string> = {
  homepage: "Homepage",
  financing: "Financing Page",
  about: "About Page",
  "quote-page": "Quote Page",
  "upload-bill": "Upload Bill",
  "google-ads": "Google Ads",
  other: "Other",
};

const STATUSES: LeadStatus[] = ["New", "Contacted", "Quoted", "Closed", "Lost"];

export default function LeadDetail() {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  const leadId = parseInt(id ?? "0");

  const utils = trpc.useUtils();
  const leadQuery = trpc.leads.getById.useQuery({ id: leadId }, { enabled: !!leadId && isAuthenticated && user?.role === "admin" });

  const [notes, setNotes] = useState<string | null>(null);
  const [savingNotes, setSavingNotes] = useState(false);

  const updateStatus = trpc.leads.updateStatus.useMutation({
    onSuccess: () => {
      toast.success("Status updated");
      utils.leads.getById.invalidate({ id: leadId });
      utils.leads.list.invalidate();
    },
    onError: () => toast.error("Failed to update status"),
  });

  const updateNotes = trpc.leads.updateNotes.useMutation({
    onSuccess: () => {
      toast.success("Notes saved");
      setSavingNotes(false);
      utils.leads.getById.invalidate({ id: leadId });
    },
    onError: () => { toast.error("Failed to save notes"); setSavingNotes(false); },
  });

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800">Access Denied</h2>
          <Link href="/admin"><button className="btn-navy mt-6 px-6 py-2.5 rounded-xl text-sm">Go to Dashboard</button></Link>
        </div>
      </div>
    );
  }

  if (leadQuery.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <RefreshCw className="w-8 h-8 animate-spin" style={{ color: "var(--gold)" }} />
      </div>
    );
  }

  if (!leadQuery.data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Lead not found.</p>
          <Link href="/admin"><button className="btn-navy px-6 py-2.5 rounded-xl text-sm">Back to Dashboard</button></Link>
        </div>
      </div>
    );
  }

  const lead = leadQuery.data;
  const currentNotes = notes ?? lead.notes ?? "";
  const status = lead.status as LeadStatus;

  const handleSaveNotes = () => {
    setSavingNotes(true);
    updateNotes.mutate({ id: leadId, notes: currentNotes });
  };

  const isBillImage = lead.billFileName && /\.(jpg|jpeg|png|webp|heic|heif)$/i.test(lead.billFileName);
  // Always use permanent manus-storage path when we have the key; fall back to stored URL
  const billViewUrl = lead.billFileKey
    ? `/manus-storage/${lead.billFileKey}`
    : lead.billFileUrl ?? undefined;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40">
        <div className="container h-16 flex items-center gap-4">
          <Link href="/admin">
            <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </button>
          </Link>
          <span className="text-gray-300">/</span>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0f1f3d 0%, #1a3260 100%)" }}>
              <Sun className="w-3.5 h-3.5 text-yellow-400" />
            </div>
            <span className="font-semibold text-sm" style={{ color: "var(--navy)" }}>
              {lead.firstName} {lead.lastName}
            </span>
          </div>
        </div>
      </header>

      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Lead header */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold" style={{ color: "var(--navy)", fontFamily: "'Playfair Display', serif" }}>
                  {lead.firstName} {lead.lastName}
                </h1>
                <p className="text-gray-500 mt-1">Lead #{lead.id} · Submitted {new Date(lead.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${STATUS_COLORS[status]}`}>
                {status}
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Info */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg mb-5" style={{ color: "var(--navy)" }}>Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "rgba(245,166,35,0.12)" }}>
                      <Mail className="w-4 h-4" style={{ color: "var(--gold-dark)" }} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Email</p>
                      <a href={`mailto:${lead.email}`} className="font-medium text-sm hover:underline" style={{ color: "var(--navy)" }}>{lead.email}</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "rgba(245,166,35,0.12)" }}>
                      <Phone className="w-4 h-4" style={{ color: "var(--gold-dark)" }} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Phone</p>
                      <a href={`tel:${lead.phone}`} className="font-medium text-sm hover:underline" style={{ color: "var(--navy)" }}>{lead.phone}</a>
                    </div>
                  </div>
                  {lead.address && (
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "rgba(245,166,35,0.12)" }}>
                        <MapPin className="w-4 h-4" style={{ color: "var(--gold-dark)" }} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Address</p>
                        <p className="font-medium text-sm" style={{ color: "var(--navy)" }}>{lead.address}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Qualification */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg mb-5" style={{ color: "var(--navy)" }}>Lead Qualification</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: "Ownership", value: lead.ownershipType === "homeowner" ? "Homeowner" : "Renter" },
                    { label: "Property Type", value: lead.propertyType ? (lead.propertyType === "family_home" ? "Family Home / Townhouse" : lead.propertyType === "apartment" ? "Apartment / Condo" : "Commercial Property") : "Not specified" },
                    { label: "Zip Code", value: lead.zipCode ?? "Not specified" },
                    { label: "Existing Solar", value: lead.existingSolar === 1 ? "Yes" : lead.existingSolar === 0 ? "No" : "Not specified" },
                    { label: "Solar Motivation", value: lead.solarMotivation ? (lead.solarMotivation === "price_stability" ? "Long-Term Price Stability" : lead.solarMotivation === "reduce_bills" ? "Reduce Electricity Bills" : lead.solarMotivation === "all_electric" ? "All-Electric Home" : "Other") : "Not specified" },
                    { label: "Payment Preference", value: lead.paymentPreference ? (lead.paymentPreference.charAt(0).toUpperCase() + lead.paymentPreference.slice(1)) : "Not specified" },
                    { label: "Monthly Bill Range", value: lead.monthlyBillRange ?? "Not specified" },
                    { label: "Interest", value: lead.interestType.charAt(0).toUpperCase() + lead.interestType.slice(1) },
                    { label: "Lead Source", value: SOURCE_LABELS[lead.source] ?? lead.source },
                  ].map(({ label, value }) => (
                    <div key={label} className="p-4 rounded-xl bg-gray-50">
                      <p className="text-xs text-gray-400 mb-1">{label}</p>
                      <p className="font-semibold text-sm" style={{ color: "var(--navy)" }}>{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bill Upload */}
              {billViewUrl && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-lg mb-4" style={{ color: "var(--navy)" }}>Uploaded Utility Bill</h3>
                  <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-gray-50">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-white border border-gray-200">
                      {isBillImage ? <ImageIcon className="w-6 h-6 text-blue-500" /> : <FileText className="w-6 h-6 text-red-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate" style={{ color: "var(--navy)" }}>{lead.billFileName ?? "Utility Bill"}</p>
                      <p className="text-xs text-gray-400">{isBillImage ? "Image file" : "PDF document"}</p>
                    </div>
                    <a
                      href={billViewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm font-medium hover:underline"
                      style={{ color: "var(--navy)" }}
                    >
                      View <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}

              {/* Notes */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg mb-4" style={{ color: "var(--navy)" }}>Sales Notes</h3>
                <textarea
                  value={currentNotes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all text-sm resize-none"
                  placeholder="Add notes about this lead — call outcomes, objections, follow-up dates, etc."
                />
                <div className="flex justify-end mt-3">
                  <button
                    onClick={handleSaveNotes}
                    disabled={savingNotes || updateNotes.isPending}
                    className="btn-navy px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 disabled:opacity-60"
                  >
                    <Save className="w-4 h-4" />
                    {savingNotes ? "Saving..." : "Save Notes"}
                  </button>
                </div>
              </div>
            </div>

            {/* Right column — Status */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg mb-5" style={{ color: "var(--navy)" }}>Update Status</h3>
                <div className="space-y-2">
                  {STATUSES.map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus.mutate({ id: leadId, status: s })}
                      disabled={updateStatus.isPending}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all border-2 ${status === s ? "border-yellow-400 bg-yellow-50" : "border-gray-200 hover:border-gray-300 bg-white"}`}
                    >
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${STATUS_COLORS[s]}`}>{s}</span>
                      {status === s && <CheckCircle className="w-4 h-4 ml-auto" style={{ color: "var(--gold-dark)" }} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick actions */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-base mb-4" style={{ color: "var(--navy)" }}>Quick Actions</h3>
                <div className="space-y-2">
                  <a href={`mailto:${lead.email}`} className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors" style={{ color: "var(--navy)" }}>
                    <Mail className="w-4 h-4" style={{ color: "var(--gold-dark)" }} /> Send Email
                  </a>
                  <a href={`tel:${lead.phone}`} className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors" style={{ color: "var(--navy)" }}>
                    <Phone className="w-4 h-4" style={{ color: "var(--gold-dark)" }} /> Call {lead.firstName}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
