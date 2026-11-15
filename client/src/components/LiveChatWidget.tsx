import { useEffect, useRef, useState } from "react";
import { trpc } from "@/lib/trpc";
import { captureAttribution } from "@shared/attribution";
import { MessageCircle, X, Send, Loader2, Phone } from "lucide-react";

type Profile = {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  interest?: string;
  timeframe?: string;
  callbackTime?: string;
  payment?: string;
  existingSolar?: string;
  homeowner?: string;
};
const key = "pell-solar-assistant-session";
export function LiveChatWidget() {
  const [open, setOpen] = useState(false),
    [token, setToken] = useState<string | null>(null),
    [text, setText] = useState(""),
    [error, setError] = useState(""),
    [callback, setCallback] = useState(false),
    [profile, setProfile] = useState<Profile>({}),
    [consent, setConsent] = useState(false);
  const end = useRef<HTMLDivElement>(null),
    messageId = useRef(crypto.randomUUID());
  useEffect(() => {
    try {
      setToken(localStorage.getItem(key));
    } catch {}
  }, []);
  const status = trpc.chat.getStatus.useQuery(undefined, {
    refetchInterval: 30000,
  });
  const history = trpc.chat.getMessages.useQuery(
    { sessionToken: token || "" },
    { enabled: !!token && open, refetchInterval: 2000, retry: false }
  );
  const a = history.data?.assistant;
  const start = trpc.chat.startSession.useMutation({
    onSuccess: r => {
      setToken(r.sessionToken);
      try {
        localStorage.setItem(key, r.sessionToken);
      } catch {}
      setText("");
      setError("");
      messageId.current = crypto.randomUUID();
    },
    onError: e => setError(e.message),
  });
  const send = trpc.chat.sendMessage.useMutation({
    onSuccess: () => {
      setText("");
      setError("");
      messageId.current = crypto.randomUUID();
      void history.refetch();
    },
    onError: e => setError(e.message),
  });
  const handoff = trpc.chat.requestCallback.useMutation({
    onSuccess: () => {
      setCallback(false);
      setError("");
      void history.refetch();
    },
    onError: e => setError(e.message),
  });
  useEffect(() => {
    end.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [history.data?.messages.length, open]);
  const busy = start.isPending || send.isPending || a?.pending;
  const paused = status.data?.isOnline === false;
  const submit = () => {
    if (!text.trim() || busy || paused) return;
    if (token)
      send.mutate({
        sessionToken: token,
        message: text.trim(),
        clientId: messageId.current,
      });
    else {
      const utm = Object.fromEntries(Object.entries(captureAttribution(location.search)).filter(([,v])=>typeof v==='string').map(([k,v])=>[k,String(v).slice(0,500)]));
      start.mutate({
        firstMessage: text.trim(),
        clientId: messageId.current,
        utm,
      });
    }
  };
  const newChat = () => {
    setToken(null);
    setText("");
    setCallback(false);
    setError("");
    try {
      localStorage.removeItem(key);
    } catch {}
  };
  if (
    typeof window !== "undefined" &&
    window.location.pathname.startsWith("/admin")
  )
    return null;
  return (
    <div className="fixed bottom-24 right-4 z-[1000] flex flex-col items-end gap-3">
      {open && (
        <section
          role="dialog"
          aria-label="Pell Solar Assistant"
          className="w-[380px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
          style={{ height: "min(640px,calc(100dvh - 176px))" }}
        >
          <header className="bg-[#0B1D51] text-white p-4 flex items-start justify-between">
            <div>
              <h2 className="font-bold">Pell Solar Assistant</h2>
              <p className="text-xs text-blue-100 mt-1">
                {paused
                  ? "Chat is paused"
                  : a?.staff_takeover
                    ? "Pell Solar team"
                    : "Solar, batteries & service questions"}
              </p>
            </div>
            <button aria-label="Close chat" onClick={() => setOpen(false)}>
              <X size={20} />
            </button>
          </header>
          <div
            className="flex-1 overflow-y-auto p-4 space-y-3"
            aria-live="polite"
          >
            <p className="rounded-xl bg-blue-50 p-3 text-sm text-slate-700">
              Hi! What can I help you with—solar, battery backup, or an existing
              system?
            </p>
            {history.data?.messages.map(m => (
              <div
                key={m.id}
                className={`rounded-xl p-3 text-sm whitespace-pre-wrap ${m.sender === "visitor" ? "bg-[#1a56db] text-white ml-6" : "bg-slate-100 text-slate-800 mr-4"}`}
              >
                <span className="block text-xs font-semibold mb-1">
                  {m.sender === "visitor"
                    ? "You"
                    : m.isAi
                      ? "Pell Solar Assistant"
                      : "Pell Solar team"}
                </span>
                {m.message}
              </div>
            ))}
            {busy && (
              <p className="flex items-center gap-2 text-sm text-slate-600">
                <Loader2 size={14} className="animate-spin" />
                Working on your answer…
              </p>
            )}
            {(error || history.error) && (
              <p role="alert" className="text-sm text-red-700">
                {error ||
                  "This conversation could not be loaded. Please retry or start a new chat."}
              </p>
            )}
            {paused && (
              <p className="text-sm">
                Chat is paused.{" "}
                <a className="underline text-blue-700" href="/get-quote">
                  Request a quote
                </a>{" "}
                or call the team below.
              </p>
            )}
            {a?.handoff_requested && (
              <p className="bg-green-50 border border-green-200 rounded-xl p-3 text-sm text-green-900">
                {a.crm_deal_id
                  ? "Your callback request is with the Pell Solar team."
                  : "Your callback request is saved and is being routed to the Pell Solar team."}{" "}
                We’ll use the contact details you provided. You can keep
                chatting here.
              </p>
            )}
            {token && !a?.handoff_requested && !callback && (
              <button
                type="button"
                disabled={busy}
                onClick={() => {
                  setProfile(a?.profile || {});
                  setCallback(true);
                }}
                className="text-sm font-semibold text-blue-700 border border-blue-200 rounded-lg px-3 py-2"
              >
                {a?.offer_callback
                  ? "Review details & request a callback"
                  : "Talk to a person"}
              </button>
            )}
            {callback && (
              <form
                className="rounded-xl border border-blue-200 p-3 space-y-2 text-sm"
                onSubmit={e => {
                  e.preventDefault();
                  if (token && consent)
                    handoff.mutate({
                      sessionToken: token,
                      profile,
                      consent: true,
                    });
                }}
              >
                <h3 className="font-bold text-slate-900">
                  Have the team contact you
                </h3>
                <p className="text-xs text-slate-600">
                  Check your details. We’ll include this conversation so you
                  don’t have to repeat yourself.
                </p>
                {(
                  [
                    ["name", "Name", "text", true],
                    ["phone", "Phone", "tel", true],
                    ["zip", "ZIP code", "text", true],
                    ["email", "Email (optional)", "email", false],
                    ["address", "Project address (optional)", "text", false],
                    [
                      "callbackTime",
                      "Best time to call (optional)",
                      "text",
                      false,
                    ],
                  ] as const
                ).map(([k, label, type, required]) => (
                  <label key={k} className="block">
                    {label}
                    {required ? " *" : ""}
                    <input
                      className="block w-full border rounded-md p-2 mt-1 text-base"
                      type={type}
                      required={required}
                      value={profile[k] || ""}
                      maxLength={250}
                      onChange={e =>
                        setProfile({ ...profile, [k]: e.target.value })
                      }
                    />
                  </label>
                ))}
                <label className="flex gap-2 items-start text-xs">
                  <input
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={e => setConsent(e.target.checked)}
                  />
                  Please have Pell Solar contact me about this request and save
                  my conversation with the team.
                </label>
                <button
                  disabled={!consent || handoff.isPending}
                  className="bg-[#0B1D51] text-white rounded-lg px-3 py-2 disabled:opacity-50"
                >
                  {handoff.isPending ? "Saving request…" : "Request a callback"}
                </button>
                <button
                  type="button"
                  className="ml-3 text-slate-600"
                  onClick={() => setCallback(false)}
                >
                  Keep chatting
                </button>
              </form>
            )}
            <div ref={end} />
          </div>
          <form
            onSubmit={e => {
              e.preventDefault();
              submit();
            }}
            className="border-t p-3 flex gap-2"
          >
            <input
              aria-label="Your question"
              placeholder="Ask your question…"
              value={text}
              maxLength={2000}
              onChange={e => setText(e.target.value)}
              disabled={paused || history.data?.status === "closed"}
              className="min-w-0 flex-1 rounded-lg border p-2 text-base"
            />
            <button
              aria-label="Send question"
              disabled={!text.trim() || busy || paused}
              className="rounded-lg bg-[#1a56db] text-white p-2 disabled:opacity-40"
            >
              <Send size={20} />
            </button>
          </form>
          <footer className="px-4 pb-3 text-xs text-slate-500 flex flex-wrap gap-x-3 gap-y-1">
            <a href="tel:9092405294" className="text-blue-700 flex gap-1">
              <Phone size={12} />
              Josh: (909) 240-5294
            </a>
            <button onClick={newChat}>New chat</button>
            <a href="/privacy-policy">Privacy</a>
          </footer>
        </section>
      )}
      <button
        aria-label={open ? "Close chat" : "Open chat"}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-[#1a56db] text-white shadow-xl rounded-full px-4 py-3"
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
        <span className="text-sm font-semibold">
          {open ? "Close" : "Ask a Solar Question"}
        </span>
      </button>
    </div>
  );
}
