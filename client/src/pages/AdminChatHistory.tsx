import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle, User, Clock, ChevronDown, ChevronUp,
  Sun, XCircle, RefreshCw, Search, Phone, Mail,
} from "lucide-react";
import { Link } from "wouter";

export default function AdminChatHistory() {
  const { user, loading, isAuthenticated } = useAuth();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "closed">("all");

  const { data: sessions, isLoading } = trpc.chat.getSessions.useQuery(
    { status: statusFilter === "all" ? "all" : statusFilter },
    { enabled: isAuthenticated && user?.role === "admin" }
  );

  const { data: expandedData } = trpc.chat.getSessionMessages.useQuery(
    { sessionId: expandedId! },
    { enabled: !!expandedId && isAuthenticated && user?.role === "admin" }
  );

  // ── Auth guards ──
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
        <div className="text-center max-w-sm px-6">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(15,31,61,0.08)" }}>
            <Sun className="w-8 h-8" style={{ color: "var(--navy)" }} />
          </div>
          <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--navy)" }}>Admin Login Required</h2>
          <p className="text-gray-500 mb-6">Please sign in to access chat history.</p>
          <a href={getLoginUrl(window.location.pathname)}>
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

  const formatTime = (date: Date | string) =>
    new Date(date).toLocaleString("en-US", {
      month: "short", day: "numeric", year: "numeric",
      hour: "numeric", minute: "2-digit", hour12: true,
    });

  const filtered = (sessions ?? []).filter(s => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      (s.visitorName ?? "").toLowerCase().includes(q) ||
      (s.visitorEmail ?? "").toLowerCase().includes(q) ||
      (s.visitorPhone ?? "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-[#1a56db]" />
              <h1 className="text-xl font-bold text-gray-900">Chat History</h1>
              {sessions && (
                <span className="text-sm text-gray-400 font-normal">({sessions.length} conversations)</span>
              )}
            </div>
            <Link href="/admin/chat">
              <button className="text-sm text-[#1a56db] font-medium hover:underline">
                Live Chat →
              </button>
            </Link>
          </div>

          {/* Filters */}
          <div className="flex gap-2 flex-wrap">
            <div className="relative flex-1 min-w-[180px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, phone..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ fontSize: "16px" }}
                className="w-full pl-9 pr-3 py-2 text-sm bg-gray-100 rounded-xl border-0 outline-none focus:ring-2 focus:ring-[#1a56db]"
              />
            </div>
            <div className="flex gap-1">
              {(["all", "active", "closed"] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setStatusFilter(f)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize transition-colors ${
                    statusFilter === f
                      ? "bg-[#1a56db] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Session list */}
      <div className="max-w-4xl mx-auto px-4 py-4 space-y-3">
        {isLoading && (
          <div className="flex justify-center py-16">
            <RefreshCw className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        )}

        {!isLoading && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <MessageCircle className="w-12 h-12 text-gray-200 mb-3" />
            <p className="text-gray-500 font-medium">No conversations found</p>
            <p className="text-gray-400 text-sm mt-1">
              {search ? "Try a different search term" : "Chat history will appear here once customers start chatting"}
            </p>
          </div>
        )}

        {filtered.map(session => {
          const isExpanded = expandedId === session.id;
          return (
            <div key={session.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              {/* Session row */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : session.id)}
                className="w-full text-left px-4 py-4 flex items-center gap-3 hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-[#1a56db]" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-gray-900 truncate">
                      {session.visitorName || "Anonymous Visitor"}
                    </span>
                    <Badge
                      variant={session.status === "active" ? "default" : "secondary"}
                      className={`text-xs shrink-0 ${
                        session.status === "active"
                          ? "bg-green-100 text-green-700 border-green-300"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {session.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                    {session.visitorPhone && (
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Phone className="w-3 h-3" />
                        {session.visitorPhone}
                      </span>
                    )}
                    {session.visitorEmail && (
                      <span className="flex items-center gap-1 text-xs text-gray-500 truncate">
                        <Mail className="w-3 h-3 shrink-0" />
                        <span className="truncate">{session.visitorEmail}</span>
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-xs text-gray-400 shrink-0">
                      <Clock className="w-3 h-3" />
                      {formatTime(session.createdAt)}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 text-gray-400">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {/* Expanded message thread */}
              {isExpanded && (
                <div className="border-t border-gray-100 bg-gray-50 px-4 py-4">
                  {!expandedData ? (
                    <div className="flex justify-center py-6">
                      <RefreshCw className="w-5 h-5 animate-spin text-gray-400" />
                    </div>
                  ) : expandedData.messages.length === 0 ? (
                    <p className="text-center text-sm text-gray-400 py-4">No messages in this conversation</p>
                  ) : (
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                      {expandedData.messages.map(msg => (
                        <div key={msg.id} className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"}`}>
                          <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                            msg.sender === "admin"
                              ? "bg-[#1a56db] text-white rounded-br-md"
                              : "bg-white border border-gray-200 text-gray-800 rounded-bl-md shadow-sm"
                          }`}>
                            <p className="text-sm leading-relaxed break-words">{msg.message}</p>
                            <p className={`text-xs mt-1 ${msg.sender === "admin" ? "text-blue-200" : "text-gray-400"}`}>
                              {msg.sender === "admin" ? "You" : (session.visitorName || "Visitor")} · {new Date(msg.createdAt).toLocaleString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Link to open in live chat if still active */}
                  {session.status === "active" && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <Link href={`/admin/chat/${session.id}`}>
                        <button className="w-full py-2.5 rounded-xl bg-[#1a56db] text-white text-sm font-semibold">
                          Open in Live Chat →
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
