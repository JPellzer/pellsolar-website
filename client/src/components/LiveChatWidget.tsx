import { useState, useEffect, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

type Message = {
  id: number;
  sender: "visitor" | "admin";
  message: string;
  createdAt: Date | string;
};

type ChatState = "closed" | "intro" | "chatting" | "offline";

export function LiveChatWidget() {
  const [chatState, setChatState] = useState<ChatState>("closed");
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [lastMessageId, setLastMessageId] = useState(0);
  const [visitorName, setVisitorName] = useState("");
  const [visitorEmail, setVisitorEmail] = useState("");
  const [visitorPhone, setVisitorPhone] = useState("");
  const [firstMessage, setFirstMessage] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: statusData } = trpc.chat.getStatus.useQuery(undefined, {
    refetchInterval: 30000,
  });

  const startSessionMutation = trpc.chat.startSession.useMutation({
    onSuccess: (data) => {
      setSessionToken(data.sessionToken);
      setSessionId(data.sessionId);
      setChatState("chatting");
    },
  });

  const sendMessageMutation = trpc.chat.sendMessage.useMutation({
    onSuccess: () => {
      setInputText("");
    },
  });

  // Poll for new messages when chatting
  const { data: messagesData } = trpc.chat.getMessages.useQuery(
    { sessionToken: sessionToken!, afterId: lastMessageId || undefined },
    {
      enabled: !!sessionToken && chatState === "chatting",
      refetchInterval: 2000,
    }
  );

  useEffect(() => {
    if (messagesData?.messages && messagesData.messages.length > 0) {
      setMessages(prev => {
        const existingIds = new Set(prev.map(m => m.id));
        const newMsgs = messagesData.messages.filter(m => !existingIds.has(m.id));
        if (newMsgs.length > 0) {
          const adminNewMsgs = newMsgs.filter(m => m.sender === "admin");
          if (adminNewMsgs.length > 0) {
            setUnreadCount(c => c + adminNewMsgs.length);
          }
          const allMsgs = [...prev, ...newMsgs];
          const maxId = Math.max(...allMsgs.map(m => m.id));
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
      visitorName: visitorName || undefined,
      visitorEmail: visitorEmail || undefined,
      visitorPhone: visitorPhone || undefined,
      firstMessage: firstMessage.trim(),
    });
    setMessages([{
      id: -1,
      sender: "visitor",
      message: firstMessage.trim(),
      createdAt: new Date(),
    }]);
  };

  const handleSendMessage = () => {
    if (!inputText.trim() || !sessionToken) return;
    const msg = inputText.trim();
    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: "visitor",
      message: msg,
      createdAt: new Date(),
    }]);
    sendMessageMutation.mutate({ sessionToken, message: msg });
    setInputText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (chatState === "intro") handleStartChat();
      else handleSendMessage();
    }
  };

  // Don't render widget on admin pages
  if (typeof window !== "undefined" && window.location.pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="fixed bottom-24 right-4 z-50 flex flex-col items-end gap-3">
      {/* Chat window */}
      {chatState !== "closed" && (
        <div
          className="w-[340px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          style={{ height: "460px" }}
        >
          {/* Header */}
          <div className="bg-[#1a56db] px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-white text-xs font-bold">PS</span>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Pell Solar Support</p>
                <p className="text-blue-200 text-xs flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full inline-block ${statusData?.isOnline ? "bg-green-400" : "bg-gray-400"}`} />
                  {statusData?.isOnline ? "Online now — we reply fast" : "Currently offline"}
                </p>
              </div>
            </div>
            <button onClick={() => setChatState("closed")}
              className="text-white/70 hover:text-white transition-colors p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Offline state */}
          {chatState === "offline" && (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <MessageCircle className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-700 font-medium mb-2">We're currently offline</p>
              <p className="text-gray-500 text-sm mb-4">
                {statusData?.offlineMessage || "Leave us a message and we'll get back to you shortly!"}
              </p>
              <a href="tel:9092405294"
                className="bg-[#1a56db] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors">
                Call (909) 240-5294
              </a>
            </div>
          )}

          {/* Intro / start chat form */}
          {chatState === "intro" && (
            <div className="flex-1 flex flex-col p-4 gap-3 overflow-y-auto">
              <div className="bg-blue-50 rounded-xl p-3 text-sm text-gray-700 leading-relaxed">
                👋 Hi! We're here to help with any solar questions. Leave your info below and we'll reply right away.
              </div>
              <Input
                placeholder="Your name (optional)"
                value={visitorName}
                onChange={e => setVisitorName(e.target.value)}
                className="text-sm"
                style={{ fontSize: "16px" }}
              />
              <Input
                placeholder="Email (optional)"
                type="email"
                value={visitorEmail}
                onChange={e => setVisitorEmail(e.target.value)}
                className="text-sm"
                style={{ fontSize: "16px" }}
              />
              <Input
                placeholder="Phone (optional)"
                type="tel"
                value={visitorPhone}
                onChange={e => setVisitorPhone(e.target.value)}
                className="text-sm"
                style={{ fontSize: "16px" }}
              />
              <textarea
                placeholder="What's on your mind? *"
                value={firstMessage}
                onChange={e => setFirstMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{ fontSize: "16px" }}
                className="flex-1 min-h-[80px] resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <Button
                onClick={handleStartChat}
                disabled={!firstMessage.trim() || startSessionMutation.isPending}
                className="bg-[#1a56db] hover:bg-blue-700 text-white w-full rounded-full">
                {startSessionMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Send className="w-4 h-4 mr-2" />
                )}
                Send Message
              </Button>
            </div>
          )}

          {/* Active chat */}
          {chatState === "chatting" && (
            <>
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
                <div className="bg-blue-50 rounded-xl p-3 text-sm text-gray-600 text-center">
                  You're connected! We'll reply shortly.
                </div>
                {messages.map((msg, i) => (
                  <div key={msg.id || i}
                    className={`flex ${msg.sender === "visitor" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${
                      msg.sender === "visitor"
                        ? "bg-[#1a56db] text-white rounded-br-sm"
                        : "bg-gray-100 text-gray-800 rounded-bl-sm"
                    }`}>
                      {msg.message}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <div className="p-3 border-t border-gray-100 flex gap-2 shrink-0">
                <Input
                  placeholder="Type a message..."
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1"
                  style={{ fontSize: "16px" }}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || sendMessageMutation.isPending}
                  size="icon"
                  className="bg-[#1a56db] hover:bg-blue-700 text-white shrink-0 rounded-full">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </>
          )}
        </div>
      )}

      {/* ── Floating CTA button ── */}
      <button
        onClick={chatState === "closed" ? handleOpen : () => setChatState("closed")}
        className="flex items-center gap-2.5 bg-[#1a56db] hover:bg-blue-700 text-white shadow-xl rounded-full pl-4 pr-5 py-3 transition-all hover:scale-105 active:scale-95 relative"
        aria-label="Open chat"
      >
        {chatState === "closed" ? (
          <>
            <MessageCircle className="w-5 h-5 shrink-0" />
            <span className="text-sm font-semibold whitespace-nowrap">Ask a Solar Expert</span>
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-bold">
                {unreadCount}
              </span>
            )}
          </>
        ) : (
          <>
            <X className="w-5 h-5" />
            <span className="text-sm font-semibold">Close</span>
          </>
        )}
      </button>
    </div>
  );
}
