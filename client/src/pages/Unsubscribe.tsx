import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";

export default function Unsubscribe() {
  const [location] = useLocation();
  const params = new URLSearchParams(window.location.search);
  const email = params.get("email") ?? "";
  const token = params.get("token") ?? "";

  const [status, setStatus] = useState<"loading" | "success" | "already" | "error">("loading");
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
    },
  });

  useEffect(() => {
    if (!email || !token) {
      setStatus("error");
      setErrorMsg("This unsubscribe link is invalid or incomplete.");
      return;
    }
    processMutation.mutate({ email, token });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        {/* Logo */}
        <div className="mb-6">
          <a href="/" className="inline-block">
            <img
              src="/pell-solar-logo.png"
              alt="Pell Solar"
              className="h-10 mx-auto"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </a>
        </div>

        {status === "loading" && (
          <div className="py-8">
            <div className="inline-block w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-600 text-sm">Processing your request…</p>
          </div>
        )}

        {status === "success" && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">You've been unsubscribed</h1>
            <p className="text-gray-600 mb-1">
              You've been successfully unsubscribed from Pell Solar emails.
            </p>
            {email && (
              <p className="text-sm text-gray-400 mb-6">
                <span className="font-medium text-gray-500">{email}</span> has been removed from our mailing list.
              </p>
            )}
            <p className="text-sm text-gray-500 mb-6">
              If you unsubscribed by mistake or have questions, please contact us at{" "}
              <a href="mailto:info@pellsolar.com" className="text-orange-600 hover:underline">
                info@pellsolar.com
              </a>
              .
            </p>
            <a
              href="/"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
            >
              Return to Pell Solar
            </a>
          </>
        )}

        {status === "already" && (
          <>
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Already unsubscribed</h1>
            <p className="text-gray-600 mb-6">
              {email ? (
                <>
                  <span className="font-medium">{email}</span> is already unsubscribed from Pell Solar emails.
                </>
              ) : (
                "This email is already unsubscribed from Pell Solar emails."
              )}
            </p>
            <a
              href="/"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
            >
              Return to Pell Solar
            </a>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Unable to unsubscribe</h1>
            <p className="text-gray-600 mb-6">{errorMsg}</p>
            <p className="text-sm text-gray-500 mb-6">
              Please contact us directly at{" "}
              <a href="mailto:info@pellsolar.com" className="text-orange-600 hover:underline">
                info@pellsolar.com
              </a>{" "}
              and we'll remove you right away.
            </p>
            <a
              href="/"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
            >
              Return to Pell Solar
            </a>
          </>
        )}
      </div>
    </div>
  );
}
