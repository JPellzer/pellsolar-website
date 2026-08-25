import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import {
  Users, TrendingUp, CheckCircle, XCircle, Phone,
  Mail, MapPin, Download, Sun, Filter, ChevronRight,
  BarChart3, Clock, Star, RefreshCw, ImageIcon, LogOut, MessageCircle
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type LeadStatus = "New" | "Contacted" | "Quoted" | "Closed" | "Lost";
type LeadSource = "homepage" | "financing" | "about" | "quote-page" | "upload-bill" | "google-ads" | "other";

const STATUS_COLORS: Record<LeadStatus, string> = {
  New: "status-New",
  Contacted: "status-Contacted",
  Quoted: "status-Quoted",
  Closed: "status-Closed",
  Lost: "status-Lost",
};

const STATUS_ICONS: Record<LeadStatus, React.ElementType> = {
  New: Star,
  Contacted: Phone,
  Quoted: TrendingUp,
  Closed: CheckCircle,
  Lost: XCircle,
};

const SOURCE_LABELS: Record<LeadSource, string> = {
  homepage: "Homepage",
  financing: "Financing Page",
  about: "About Page",
  "quote-page": "Quote Page",
  "upload-bill": "Upload Bill",
  "google-ads": "Google Ads",
  other: "Other",
};

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ label, value, icon: Icon, color }: { label: string; value: number; icon: React.ElementType; color: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-500">{label}</span>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}20` }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
      </div>
      <div className="text-3xl font-bold" style={{ color: "var(--navy)", fontFamily: "'Playfair Display', serif" }}>{value}</div>
    </div>
  );
}

// ─── CSV Export ───────────────────────────────────────────────────────────────

function exportToCSV(leads: any[]) {
  const headers = ["ID", "First Name", "Last Name", "Email", "Phone", "Address", "Ownership", "Monthly Bill", "Interest", "Status", "Source", "Notes", "Date"];
  const rows = leads.map((l) => [
    l.id, l.firstName, l.lastName, l.email, l.phone,
    l.address ?? "", l.ownershipType, l.monthlyBillRange ?? "",
    l.interestType, l.status, l.source, (l.notes ?? "").replace(/\n/g, " "),
    new Date(l.createdAt).toLocaleDateString(),
  ]);
  const csv = [headers, ...rows].map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `pell-solar-leads-${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const { user, loading, isAuthenticated } = useAuth();
  const logout = trpc.auth.logout.useMutation({ onSuccess: () => { window.location.href = "/"; } });
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "All">("All");

  const statsQuery = trpc.leads.stats.useQuery(undefined, { enabled: isAuthenticated && user?.role === "admin" });
  const leadsQuery = trpc.leads.list.useQuery(
    statusFilter === "All" ? {} : { status: statusFilter },
    { enabled: isAuthenticated && user?.role === "admin" }
  );
  const exportQuery = trpc.leads.export.useQuery(undefined, { enabled: false });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <RefreshCw className="w-8 h-8 animate-spin" style={{ color: "var(--gold)" }} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(15,31,61,0.08)" }}>
            <Sun className="w-8 h-8" style={{ color: "var(--navy)" }} />
          </div>
          <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--navy)" }}>Admin Login Required</h2>
          <p className="text-gray-500 mb-6">Please sign in to access the Pell Solar CRM dashboard.</p>
          <a href={getLoginUrl("/admin")}>
            <button className="btn-navy px-8 py-3 rounded-xl w-full">Sign In</button>
          </a>
        </div>
      </div>
    );
  }

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800">Access Denied</h2>
          <p className="text-gray-500 mt-2">You need admin privileges to view this page.</p>
          <Link href="/"><button className="btn-navy mt-6 px-6 py-2.5 rounded-xl text-sm">Back to Home</button></Link>
        </div>
      </div>
    );
  }

  const stats = statsQuery.data;
  const leads = leadsQuery.data ?? [];

  const handleExport = async () => {
    const result = await exportQuery.refetch();
    if (result.data) exportToCSV(result.data);
  };

  const STATUS_TABS: (LeadStatus | "All")[] = ["All", "New", "Contacted", "Quoted", "Closed", "Lost"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40">
        <div className="container h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0f1f3d 0%, #1a3260 100%)" }}>
                  <Sun className="w-4 h-4 text-yellow-400" />
                </div>
                <span className="font-bold text-base" style={{ color: "var(--navy)", fontFamily: "'Playfair Display', serif" }}>
                  PELL <span style={{ color: "var(--gold)" }}>SOLAR</span>
                </span>
              </div>
            </Link>
            <span className="text-gray-300 text-lg">/</span>
            <span className="text-sm font-semibold text-gray-600">CRM Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin/chat">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-colors" style={{ color: "var(--navy)" }}>
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Live Chat</span>
              </button>
            </Link>
            <Link href="/admin/chat-history">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:bg-purple-50 hover:border-purple-300 transition-colors" style={{ color: "var(--navy)" }}>
                <Clock className="w-4 h-4" />
                <span className="hidden sm:inline">Chat History</span>
              </button>
            </Link>
            <Link href="/admin/photos">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors" style={{ color: "var(--navy)" }}>
                <ImageIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Photos</span>
              </button>
            </Link>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors"
              style={{ color: "var(--navy)" }}
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
            <button
              onClick={() => logout.mutate()}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
              style={{ color: "var(--navy)" }}
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold" style={{ color: "var(--navy)" }}>
                {user?.name?.[0] ?? "A"}
              </div>
              <span className="hidden sm:inline">{user?.name ?? "Admin"}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-8">
        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold" style={{ color: "var(--navy)" }}>Lead Pipeline</h1>
          <p className="text-gray-500 mt-1">All submitted quote requests and their current status.</p>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
            <StatCard label="Total Leads" value={stats.total} icon={Users} color="var(--navy)" />
            <StatCard label="New" value={stats.byStatus["New"] ?? 0} icon={Star} color="#3b82f6" />
            <StatCard label="Contacted" value={stats.byStatus["Contacted"] ?? 0} icon={Phone} color="#f59e0b" />
            <StatCard label="Quoted" value={stats.byStatus["Quoted"] ?? 0} icon={TrendingUp} color="#8b5cf6" />
            <StatCard label="Closed" value={stats.byStatus["Closed"] ?? 0} icon={CheckCircle} color="#10b981" />
            <StatCard label="Lost" value={stats.byStatus["Lost"] ?? 0} icon={XCircle} color="#ef4444" />
          </div>
        )}

        {/* Source breakdown */}
        {stats && Object.keys(stats.bySource).length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5" style={{ color: "var(--gold-dark)" }} />
              <h3 className="font-semibold" style={{ color: "var(--navy)" }}>Leads by Source</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {Object.entries(stats.bySource).map(([source, count]) => (
                <div key={source} className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-sm">
                  <span className="font-medium" style={{ color: "var(--navy)" }}>{SOURCE_LABELS[source as LeadSource] ?? source}</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white" style={{ background: "var(--navy)" }}>{count as number}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap mb-6">
          {STATUS_TABS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${statusFilter === s ? "text-white shadow-sm" : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"}`}
              style={statusFilter === s ? { background: "var(--navy)" } : {}}
            >
              {s}
              {s !== "All" && stats?.byStatus[s] !== undefined && (
                <span className="ml-1.5 text-xs opacity-70">({stats.byStatus[s]})</span>
              )}
            </button>
          ))}
        </div>

        {/* Lead table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {leadsQuery.isLoading ? (
            <div className="flex items-center justify-center py-20">
              <RefreshCw className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          ) : leads.length === 0 ? (
            <div className="text-center py-20">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">No leads found</p>
              <p className="text-gray-400 text-sm mt-1">
                {statusFilter === "All" ? "Submit a quote request to see leads here." : `No leads with status "${statusFilter}".`}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    {["Name", "Contact", "Bill Range", "Interest", "Source", "Status", "Date", ""].map((h) => (
                      <th key={h} className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {leads.map((lead) => {
                    const StatusIcon = STATUS_ICONS[lead.status as LeadStatus] ?? Star;
                    return (
                      <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-4">
                          <div className="font-semibold text-sm" style={{ color: "var(--navy)" }}>
                            {lead.firstName} {lead.lastName}
                          </div>
                          {lead.address && (
                            <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                              <MapPin className="w-3 h-3" />
                              <span className="truncate max-w-[140px]">{lead.address}</span>
                            </div>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-1">
                            <Mail className="w-3 h-3" />
                            <a href={`mailto:${lead.email}`} className="hover:underline truncate max-w-[140px]">{lead.email}</a>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-gray-600">
                            <Phone className="w-3 h-3" />
                            <a href={`tel:${lead.phone}`} className="hover:underline">{lead.phone}</a>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-sm text-gray-700">{lead.monthlyBillRange ?? "—"}</span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-sm text-gray-700 capitalize">{lead.interestType}</span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-xs text-gray-500">{SOURCE_LABELS[lead.source as LeadSource] ?? lead.source}</span>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[lead.status as LeadStatus]}`}>
                            <StatusIcon className="w-3 h-3" />
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <Clock className="w-3 h-3" />
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <Link href={`/admin/leads/${lead.id}`}>
                            <button className="flex items-center gap-1 text-xs font-medium hover:underline" style={{ color: "var(--navy)" }}>
                              View <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
