import { useState, useEffect, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { Badge } from "@/components/ui/badge";
import {
  Send, MessageCircle, User, Clock, CheckCircle2,
  Loader2, ArrowLeft, ChevronRight, Power, Sun, XCircle, RefreshCw,
} from "lucide-react";
import { useParams, Link } from "wouter";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

type Session = {
  id: number;
  visitorName: string | null;
  visitorEmail: string | null;
  visitorPhone: string | null;
  status: string;
  createdAt: Date | string;
};

export default function AdminChat() {
  const params = useParams<{ sessionId?: string }>();
  const { user, loading, isAuthenticated } = useAuth();

  // ── ALL hooks must come before any conditional return ──
  const [mobileView, setMobileView] = useState<"list" | "chat">(
    params.sessionId ? "chat" : "list"
  );
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(
    params.sessionId ? parseInt(params.sessionId) : null
  );
  const [replyText, setReplyText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputBarRef = useRef<HTMLDivElement>(null);

  // Chat status toggle
  const { data: statusData, refetch: refetchStatus } = trpc.chat.getStatus.useQuery(
    undefined,
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
    },
  });

  // Sessions list
  const { data: sessions, refetch: refetchSessions } = trpc.chat.getSessions.useQuery(
    { status: "all" },
    {
      enabled: isAuthenticated && user?.role === "admin",
      refetchInterval: isAuthenticated && user?.role === "admin" ? 5000 : false,
    }
  );

  // Selected session messages
  const { data: sessionData } = trpc.chat.getSessionMessages.useQuery(
    { sessionId: selectedSessionId! },
    {
      enabled: !!selectedSessionId && isAuthenticated && user?.role === "admin",
      refetchInterval: !!selectedSessionId && isAuthenticated ? 2000 : false,
    }
  );

  const adminReply = trpc.chat.adminReply.useMutation({
    onSuccess: () => {
      setReplyText("");
      refetchSessions();
    },
  });

  const closeSession = trpc.chat.closeSession.useMutation({
    onSuccess: () => {
      refetchSessions();
      toast("Chat closed");
    },
  });

  // Auto-scroll to bottom ONLY when user is already near the bottom
  // (within 120px). If they've scrolled up to read older messages,
  // don't yank them back down.
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
    if (distanceFromBottom < 120) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [sessionData?.messages]);

  // Fix 5: visualViewport listener pins the input bar above the keyboard on iOS.
  // This is the most reliable approach — works even when interactive-widget
  // is not supported by the browser.
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const pinInput = () => {
      const bar = inputBarRef.current;
      if (!bar) return;
      const offset = window.innerHeight - vv.height - vv.offsetTop;
      bar.style.transform = `translateY(-${Math.max(0, offset)}px)`;
    };
    vv.addEventListener('resize', pinInput);
    vv.addEventListener('scroll', pinInput);
    return () => {
      vv.removeEventListener('resize', pinInput);
      vv.removeEventListener('scroll', pinInput);
    };
  }, []);

  // Scroll messages to bottom when keyboard opens (input focused)
  const handleInputFocus = () => {
    setTimeout(() => {
      const container = messagesContainerRef.current;
      if (container) container.scrollTop = container.scrollHeight;
    }, 350);
  };

  // ── Auth guards — AFTER all hooks ──
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
          <p className="text-gray-500 mb-6">Please sign in to access the Pell Solar live chat dashboard.</p>
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

  const handleSelectSession = (id: number) => {
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendReply();
    }
  };

  const activeSessions = sessions?.filter(s => s.status === "active") ?? [];
  const closedSessions = sessions?.filter(s => s.status !== "active") ?? [];

  const formatTime = (date: Date | string) => {
    return new Date(date).toLocaleString("en-US", {
      month: "short", day: "numeric",
      hour: "numeric", minute: "2-digit", hour12: true,
    });
  };

  const formatShortTime = (date: Date | string) => {
    const d = new Date(date);
    const now = new Date();
    const isToday = d.toDateString() === now.toDateString();
    if (isToday) {
      return d.toLocaleString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
    }
    return d.toLocaleString("en-US", { month: "short", day: "numeric" });
  };

  const isOnline = statusData?.isOnline ?? false;

  return (
    <div className="flex bg-gray-50 overflow-hidden" style={{ height: "100dvh" }}>

      {/* ─── SESSION LIST ─── */}
      <div className={`
        flex flex-col bg-white border-r border-gray-200
        w-full md:w-80 md:flex shrink-0
        ${mobileView === "list" ? "flex" : "hidden md:flex"}
      `}>
        {/* Header */}
        <div className="px-4 pt-4 pb-4 border-b border-gray-100 bg-white shrink-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-[#1a56db]" />
              <h1 className="text-lg font-bold text-gray-900">Live Chat</h1>
            </div>
            <button
              onClick={() => setOnlineStatus.mutate({ isOnline: !isOnline })}
              disabled={setOnlineStatus.isPending}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all active:scale-95 ${
                isOnline
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-gray-100 text-gray-500 border border-gray-300"
              }`}
            >
              {setOnlineStatus.isPending
                ? <Loader2 className="w-4 h-4 animate-spin" />
                : <Power className="w-4 h-4" />
              }
              {isOnline ? "ON" : "OFF"}
            </button>
          </div>

          <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium ${
            isOnline ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-500"
          }`}>
            <span className={`w-2 h-2 rounded-full shrink-0 ${isOnline ? "bg-green-500 animate-pulse" : "bg-gray-400"}`} />
            {isOnline ? "Visitors can start a chat" : "Chat is offline — showing offline message"}
          </div>
        </div>

        {/* Session list */}
        <div className="flex-1 overflow-y-auto">
          {activeSessions.length > 0 && (
            <div className="pt-3">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-1">
                Active ({activeSessions.length})
              </p>
              {activeSessions.map(session => (
                <SessionRow
                  key={session.id}
                  session={session}
                  selected={selectedSessionId === session.id}
                  onClick={() => handleSelectSession(session.id)}
                  formatTime={formatShortTime}
                />
              ))}
            </div>
          )}

          {closedSessions.length > 0 && (
            <div className="pt-3">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-1">
                Closed ({closedSessions.length})
              </p>
              {closedSessions.map(session => (
                <SessionRow
                  key={session.id}
                  session={session}
                  selected={selectedSessionId === session.id}
                  onClick={() => handleSelectSession(session.id)}
                  formatTime={formatShortTime}
                />
              ))}
            </div>
          )}

          {(!sessions || sessions.length === 0) && (
            <div className="flex flex-col items-center justify-center h-48 text-center px-6">
              <MessageCircle className="w-10 h-10 text-gray-200 mb-3" />
              <p className="text-sm font-medium text-gray-500">No chats yet</p>
              <p className="text-xs text-gray-400 mt-1">Turn chat ON to start receiving messages</p>
            </div>
          )}
        </div>
      </div>

      {/* ─── CHAT PANEL ─── */}
      <div className={`
        flex-1 flex flex-col min-w-0 overflow-hidden
        ${mobileView === "chat" ? "flex" : "hidden md:flex"}
      `}>
        {selectedSessionId && sessionData ? (
          <>
            {/* Chat header */}
            <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 shadow-sm shrink-0">
              <button
                onClick={handleBack}
                className="md:hidden flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors -ml-1 shrink-0"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>

              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-[#1a56db]" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-900 truncate">
                    {sessionData.session.visitorName || "Anonymous Visitor"}
                  </p>
                  <Badge
                    variant={sessionData.session.status === "active" ? "default" : "secondary"}
                    className={`text-xs shrink-0 ${sessionData.session.status === "active" ? "bg-green-100 text-green-700 border-green-300" : ""}`}
                  >
                    {sessionData.session.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 truncate">
                  {sessionData.session.visitorPhone && (
                    <a href={`tel:${sessionData.session.visitorPhone}`} className="text-[#1a56db] font-medium shrink-0">
                      {sessionData.session.visitorPhone}
                    </a>
                  )}
                  {sessionData.session.visitorEmail && (
                    <span className="truncate">{sessionData.session.visitorEmail}</span>
                  )}
                  <span className="shrink-0 flex items-center gap-0.5">
                    <Clock className="w-3 h-3" />
                    {formatTime(sessionData.session.createdAt)}
                  </span>
                </div>
              </div>

              {sessionData.session.status === "active" && (
                <button
                  onClick={() => closeSession.mutate({ sessionId: selectedSessionId })}
                  disabled={closeSession.isPending}
                  className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 active:bg-gray-300 transition-colors"
                >
                  {closeSession.isPending
                    ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    : <CheckCircle2 className="w-3.5 h-3.5" />
                  }
                  <span className="hidden sm:inline">Close</span>
                </button>
              )}
            </div>

            {/* Messages */}
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2"
            >
              {sessionData.messages.map((msg) => (
                <div key={msg.id}
                  className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[78%] sm:max-w-[60%] rounded-2xl px-4 py-2.5 ${
                    msg.sender === "admin"
                      ? "bg-[#1a56db] text-white rounded-br-md"
                      : "bg-white border border-gray-200 text-gray-800 rounded-bl-md shadow-sm"
                  }`}>
                    <p className="text-sm leading-relaxed break-words">{msg.message}</p>
                    <p className={`text-xs mt-1 ${msg.sender === "admin" ? "text-blue-200" : "text-gray-400"}`}>
                      {formatShortTime(msg.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Reply input — fix 3: flex-shrink-0 normal flex child, NOT position:fixed */}
            {sessionData.session.status === "active" ? (
              <div ref={inputBarRef} className="bg-white border-t border-gray-200 px-3 py-3 flex items-center gap-2 shrink-0" style={{ willChange: 'transform' }}>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a message..."
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={handleInputFocus}
                  style={{ fontSize: "16px" }}
                  className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1a56db] border-0 min-w-0"
                />
                <button
                  onClick={handleSendReply}
                  disabled={!replyText.trim() || adminReply.isPending}
                  className="w-11 h-11 rounded-full bg-[#1a56db] text-white flex items-center justify-center shrink-0 disabled:opacity-40 active:scale-95 transition-all"
                >
                  {adminReply.isPending
                    ? <Loader2 className="w-4 h-4 animate-spin" />
                    : <Send className="w-4 h-4" />
                  }
                </button>
              </div>
            ) : (
              <div className="bg-gray-50 border-t border-gray-200 px-4 py-3 text-center text-sm text-gray-500 shrink-0">
                This chat is closed
              </div>
            )}
          </>
        ) : (
          <div className="hidden md:flex flex-1 flex-col items-center justify-center text-center p-8">
            <MessageCircle className="w-16 h-16 text-gray-200 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Live Chat Dashboard</h2>
            <p className="text-gray-500 max-w-sm">
              Select a conversation from the left to view and reply, or toggle chat ON to start receiving messages.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function SessionRow({
  session,
  selected,
  onClick,
  formatTime,
}: {
  session: Session;
  selected: boolean;
  onClick: () => void;
  formatTime: (d: Date | string) => string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3.5 flex items-center gap-3 border-b border-gray-50 transition-colors active:bg-blue-50 ${
        selected ? "bg-blue-50" : "hover:bg-gray-50"
      }`}
    >
      <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
        session.status === "active" ? "bg-blue-100" : "bg-gray-100"
      }`}>
        <User className={`w-5 h-5 ${session.status === "active" ? "text-[#1a56db]" : "text-gray-400"}`} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-sm text-gray-900 truncate">
            {session.visitorName || "Anonymous"}
          </span>
          <span className="text-xs text-gray-400 shrink-0">{formatTime(session.createdAt)}</span>
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          {session.status === "active" && (
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
          )}
          <p className="text-xs text-gray-500 truncate">
            {session.visitorPhone || session.visitorEmail || "No contact info"}
          </p>
        </div>
      </div>

      <ChevronRight className="w-4 h-4 text-gray-300 shrink-0 md:hidden" />
    </button>
  );
}
