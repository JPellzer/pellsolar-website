import { useState } from "react";
import { Link } from "wouter";

export default function SmsOptIn() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = "First name is required.";
    if (!form.lastName.trim()) e.lastName = "Last name is required.";
    if (!form.phone.trim()) e.phone = "Mobile phone number is required.";
    else if (!/^\+?[\d\s\-().]{7,}$/.test(form.phone))
      e.phone = "Please enter a valid phone number.";
    if (!form.email.trim()) e.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email address.";
    if (!form.consent)
      e.consent = "You must check the consent box to sign up for SMS updates.";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
    // Scroll to top to show confirmation
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div style={{ background: "#f8f9fb", minHeight: "100vh", paddingTop: 80, paddingBottom: 60 }}>
      {/* Page Header */}
      <div style={{ background: "linear-gradient(135deg, #0B1D51 0%, #1a3a8f 100%)", padding: "48px 24px 40px", textAlign: "center", marginBottom: 0 }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 16 }}>
            <img src="/pell-solar-logo.png" alt="Pell Solar" style={{ height: 48 }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          </div>
          <h1 style={{ color: "#FED44D", fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 800, margin: "0 0 12px", letterSpacing: "-0.5px" }}>
            Stay Informed About Your Solar Project
          </h1>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1rem", margin: 0, lineHeight: 1.6 }}>
            Sign up to receive text message updates from Pell Solar Inc. about your solar project.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 16px" }}>
        {submitted ? (
          /* Confirmation Message */
          <div style={{ background: "#fff", borderRadius: 16, padding: "48px 32px", textAlign: "center", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", marginTop: 32 }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
            <h2 style={{ color: "#0B1D51", fontSize: "1.5rem", fontWeight: 700, marginBottom: 16 }}>
              You're Enrolled!
            </h2>
            <p style={{ color: "#444", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: 24 }}>
              Thank you! You have been enrolled in Pell Solar SMS updates. You will receive a confirmation text shortly. Reply <strong>STOP</strong> at any time to opt out.
            </p>
            <Link href="/">
              <a style={{ display: "inline-block", background: "#FED44D", color: "#0B1D51", fontWeight: 700, padding: "14px 32px", borderRadius: 8, textDecoration: "none", fontSize: "0.95rem" }}>
                ← Back to Home
              </a>
            </Link>
          </div>
        ) : (
          /* Opt-In Form */
          <div style={{ background: "#fff", borderRadius: 16, padding: "36px 32px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", marginTop: 32 }}>
            <p style={{ color: "#555", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: 28, borderLeft: "4px solid #2BABE2", paddingLeft: 16, background: "#f0f8ff", borderRadius: "0 8px 8px 0", padding: "12px 16px" }}>
              Messages may include appointment confirmations, site survey scheduling, installation updates, inspection scheduling, permit and utility status updates, PTO notifications, service updates, and general project communications.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              {/* Name Row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ display: "block", color: "#0B1D51", fontWeight: 600, fontSize: "0.9rem", marginBottom: 6 }}>
                    First Name <span style={{ color: "#e53e3e" }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    placeholder="John"
                    style={{ width: "100%", padding: "12px 14px", border: errors.firstName ? "2px solid #e53e3e" : "2px solid #e2e8f0", borderRadius: 8, fontSize: "1rem", outline: "none", boxSizing: "border-box" }}
                  />
                  {errors.firstName && <p style={{ color: "#e53e3e", fontSize: "0.8rem", marginTop: 4 }}>{errors.firstName}</p>}
                </div>
                <div>
                  <label style={{ display: "block", color: "#0B1D51", fontWeight: 600, fontSize: "0.9rem", marginBottom: 6 }}>
                    Last Name <span style={{ color: "#e53e3e" }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    placeholder="Smith"
                    style={{ width: "100%", padding: "12px 14px", border: errors.lastName ? "2px solid #e53e3e" : "2px solid #e2e8f0", borderRadius: 8, fontSize: "1rem", outline: "none", boxSizing: "border-box" }}
                  />
                  {errors.lastName && <p style={{ color: "#e53e3e", fontSize: "0.8rem", marginTop: 4 }}>{errors.lastName}</p>}
                </div>
              </div>

              {/* Phone */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", color: "#0B1D51", fontWeight: 600, fontSize: "0.9rem", marginBottom: 6 }}>
                  Mobile Phone Number <span style={{ color: "#e53e3e" }}>*</span>
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="(555) 555-5555"
                  style={{ width: "100%", padding: "12px 14px", border: errors.phone ? "2px solid #e53e3e" : "2px solid #e2e8f0", borderRadius: 8, fontSize: "1rem", outline: "none", boxSizing: "border-box" }}
                />
                {errors.phone && <p style={{ color: "#e53e3e", fontSize: "0.8rem", marginTop: 4 }}>{errors.phone}</p>}
              </div>

              {/* Email */}
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", color: "#0B1D51", fontWeight: 600, fontSize: "0.9rem", marginBottom: 6 }}>
                  Email Address <span style={{ color: "#e53e3e" }}>*</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="john@example.com"
                  style={{ width: "100%", padding: "12px 14px", border: errors.email ? "2px solid #e53e3e" : "2px solid #e2e8f0", borderRadius: 8, fontSize: "1rem", outline: "none", boxSizing: "border-box" }}
                />
                {errors.email && <p style={{ color: "#e53e3e", fontSize: "0.8rem", marginTop: 4 }}>{errors.email}</p>}
              </div>

              {/* Consent Checkbox */}
              <div style={{ background: "#f8f9fb", border: errors.consent ? "2px solid #e53e3e" : "2px solid #e2e8f0", borderRadius: 10, padding: "16px 18px", marginBottom: 24 }}>
                <label style={{ display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                    style={{ width: 20, height: 20, marginTop: 2, flexShrink: 0, accentColor: "#0B1D51", cursor: "pointer" }}
                  />
                  <span style={{ color: "#333", fontSize: "0.85rem", lineHeight: 1.6 }}>
                    By checking this box, I agree to receive automated and recurring text messages from Pell Solar Inc. at the mobile phone number provided above. Messages relate to my solar project including appointment confirmations, scheduling, installation updates, permit status, and service communications. Message frequency varies based on project status, typically 2–10 messages per month. Message and data rates may apply. Consent is not a condition of purchase or service. You can opt out at any time by replying <strong>STOP</strong> to any message. Reply <strong>HELP</strong> for assistance. View our{" "}
                    <Link href="/privacy-policy"><a style={{ color: "#2BABE2", textDecoration: "underline" }}>Privacy Policy</a></Link>
                    {" "}and{" "}
                    <Link href="/terms-and-conditions"><a style={{ color: "#2BABE2", textDecoration: "underline" }}>Terms and Conditions</a></Link>.
                  </span>
                </label>
                {errors.consent && <p style={{ color: "#e53e3e", fontSize: "0.8rem", marginTop: 8, marginLeft: 32 }}>{errors.consent}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                style={{ width: "100%", background: "#FED44D", color: "#0B1D51", fontWeight: 800, fontSize: "1rem", padding: "16px", borderRadius: 10, border: "none", cursor: "pointer", letterSpacing: "0.5px", textTransform: "uppercase" }}
              >
                Sign Up for SMS Updates
              </button>
            </form>

            {/* Fine Print */}
            <div style={{ marginTop: 24, padding: "16px", background: "#f8f9fb", borderRadius: 8, borderLeft: "3px solid #ccc" }}>
              <p style={{ color: "#666", fontSize: "0.78rem", lineHeight: 1.6, margin: 0 }}>
                Pell Solar Inc. respects your privacy. We will never sell, rent, or share your mobile phone number or any information collected through this SMS opt-in program with third parties for marketing or promotional purposes. Supported carriers include all major US carriers. T-Mobile is not liable for delayed or undelivered messages. For questions about this SMS program, contact us at{" "}
                <a href="tel:+18666468499" style={{ color: "#2BABE2" }}>(866) 646-8499</a> or{" "}
                <a href="mailto:info@pellsolar.com" style={{ color: "#2BABE2" }}>info@pellsolar.com</a>.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
