import { useEffect } from "react";
import { Link, useSearch } from "wouter";
import { CheckCircle, Phone, Mail, ArrowRight, Calendar } from "lucide-react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export default function ThankYou() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const isReturning = params.get("returning") === "1";
  const dealId = params.get("deal_id");
  const leadId = params.get("lead_id");
  const isSuspect = params.get("suspect") === "1";

  useEffect(() => {
    window.scrollTo(0, 0);

    // A thank-you URL can be refreshed, restored from browser history, or opened
    // directly. Only a confirmed lead submission receives a lead_id; store the
    // completed conversion in session storage so each lead counts once.
    if (!leadId) return;

    const conversionKey = `pellsolar-lead-conversion:${leadId}`;
    try {
      if (window.sessionStorage.getItem(conversionKey)) return;
      window.sessionStorage.setItem(conversionKey, "1");
    } catch {
      // Continue tracking if storage is unavailable; the server-confirmed lead_id
      // still keeps the event tied to a real quote completion.
    }

    // Fire Facebook Lead conversion event
    if (typeof window.fbq === "function") {
      window.fbq("track", "Lead");
    }
    // Fire Google Ads conversion event
    if (typeof window.gtag === "function") {
      window.gtag("event", "conversion", {
        send_to: "AW-17865947343/TI2CCLSThPQbEM_xksdC",
      });
    }
  }, [leadId]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
          </div>
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0a1628] mb-4">
            {isSuspect ? "Thanks!" : isReturning ? "We Already Have You!" : "Thank You!"}
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            {isSuspect
              ? "We'll be in touch shortly."
              : isReturning
              ? "It looks like we already have your information on file."
              : "We received your request and will be in touch shortly."}
          </p>
          {!isSuspect && <p className="text-gray-500 mb-10">
            {isReturning
              ? "Our team will be reaching out to you soon. If you need immediate assistance, give us a call!"
              : "A Pell Solar energy advisor will contact you within 1 business day to discuss your options."}
          </p>}

          {/* Schedule Consultation CTA — suppressed for CRM-marked suspect leads */}
          {dealId && !isSuspect && (
            <div className="bg-[#0B1D51] rounded-2xl p-8 mb-10 text-left">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#00b4d8] flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">Want to schedule your consultation now?</h2>
              </div>
              <p className="text-blue-200 mb-5 ml-13">
                Skip the wait — pick a time that works for you and we'll have everything ready before your call.
              </p>
              <a
                href={`https://app.pellsolar.com/book?deal_id=${dealId}`}
                className="inline-flex items-center gap-2 bg-[#f5a623] text-[#0B1D51] px-7 py-3 rounded-full font-bold text-lg hover:bg-[#e09510] transition-colors"
              >
                <Calendar className="w-5 h-5" />
                Schedule My Consultation
              </a>
            </div>
          )}

          {/* What Happens Next — only for non-suspect leads without a booking CTA */}
          {!dealId && !isSuspect && (
            <div className="bg-[#f0f7ff] rounded-2xl p-8 mb-10 text-left">
              <h2 className="text-lg font-bold text-[#0a1628] mb-4">What happens next?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#00b4d8] text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</div>
                  <p className="text-gray-700">Our team reviews your information and prepares a custom proposal for your home.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#00b4d8] text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</div>
                  <p className="text-gray-700">An energy advisor calls or texts you to schedule a free consultation.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#00b4d8] text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</div>
                  <p className="text-gray-700">We walk you through your savings estimate, financing options, and timeline — no pressure.</p>
                </div>
              </div>
            </div>
          )}

          {/* What Happens Next — for non-suspect leads with booking CTA */}
          {dealId && !isSuspect && (
            <div className="bg-[#f0f7ff] rounded-2xl p-6 mb-10 text-left">
              <h2 className="text-base font-bold text-[#0a1628] mb-3">What happens after you book?</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#00b4d8] text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                  <p className="text-sm text-gray-700">You'll receive a confirmation email with your appointment date and time.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#00b4d8] text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                  <p className="text-sm text-gray-700">Your energy advisor reviews your info and prepares a custom savings estimate.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#00b4d8] text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                  <p className="text-sm text-gray-700">We walk you through your options — no pressure, no obligation.</p>
                </div>
              </div>
            </div>
          )}

          {/* Contact Info */}
          {!isSuspect && <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <a
              href="tel:+18666468499"
              className="flex items-center gap-2 justify-center bg-[#0a1628] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#1a2a4a] transition-colors"
            >
              <Phone className="w-4 h-4" />
              (866) 646-8499
            </a>
            <a
              href="tel:7144553401"
              className="flex items-center gap-2 justify-center bg-[#0B1D51] text-[#FED44D] px-6 py-3 rounded-full font-semibold hover:bg-[#162a6e] transition-colors"
            >
              <Phone className="w-4 h-4" />
              (714) 455-3401 CA Local
            </a>
            <a
              href="mailto:info@pellsolar.com"
              className="flex items-center gap-2 justify-center border-2 border-[#0a1628] text-[#0a1628] px-6 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors"
            >
              <Mail className="w-4 h-4" />
              info@pellsolar.com
            </a>
          </div>}
          {/* Back to Home */}
          {!isSuspect && <Link href="/">
            <span className="inline-flex items-center gap-2 text-[#00b4d8] font-semibold hover:underline cursor-pointer">
              Back to Home <ArrowRight className="w-4 h-4" />
            </span>
          </Link>}
        </div>
      </div>
    </div>
  );
}
