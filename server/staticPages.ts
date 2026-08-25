/**
 * staticPages.ts
 *
 * Server-side rendered HTML pages for Terms & Conditions and Privacy Policy.
 * These routes return full HTML WITHOUT requiring JavaScript, so carrier
 * reviewers, bots, and scrapers can read the SMS opt-in disclosures.
 *
 * IMPORTANT: Register these routes BEFORE the Vite/static middleware in
 * server/_core/index.ts so they take priority over the React SPA catch-all.
 */

import { Router } from "express";
import { getLocalBusinessJsonLd } from "../shared/localBusiness";
import { getPhoneTrackingInlineScript } from "../shared/phoneTracking";

const router = Router();

// ── /open-in-browser — iOS in-app browser escape page ──
router.get('/open-in-browser', (req, res) => {
  const dest = (req.query.url as string) || 'https://pellsolar.com/admin/chat';
  // Validate it's a pellsolar.com URL to prevent open redirect
  let safeUrl = 'https://pellsolar.com/admin/chat';
  try {
    const parsed = new URL(dest);
    if (parsed.hostname === 'pellsolar.com' || parsed.hostname === 'www.pellsolar.com') {
      safeUrl = dest;
    }
  } catch {}
  const chromeUrl = safeUrl.replace(/^https:\/\//, 'googlechromes://');
  res.setHeader('Content-Type', 'text/html');
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Open in Chrome — Pell Solar</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;background:#f0f4f8;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:24px;}
    .card{background:#fff;border-radius:20px;padding:36px 28px;text-align:center;max-width:340px;width:100%;box-shadow:0 4px 24px rgba(0,0,0,0.10);}
    h2{font-size:22px;font-weight:700;color:#0f1f3d;margin-bottom:10px;}
    p{font-size:14px;color:#555;line-height:1.6;margin-bottom:28px;}
    .btn-chrome{display:block;background:#1a56db;color:#fff;font-size:17px;font-weight:700;padding:17px 24px;border-radius:14px;text-decoration:none;margin-bottom:12px;}
    .btn-safari{display:block;background:#fff;color:#1a56db;font-size:15px;font-weight:500;padding:13px 24px;border-radius:14px;text-decoration:none;border:1.5px solid #1a56db;}
  </style>
</head>
<body>
  <div class="card">
    <h2>Open in Chrome</h2>
    <p>Tap below to open the Pell Solar admin chat in your browser so you can reply to customers.</p>
    <a class="btn-chrome" href="${chromeUrl}">Open in Chrome</a>
    <a class="btn-safari" href="${safeUrl}">Open in Safari instead</a>
  </div>
</body>
</html>`);
});

const HTML_HEAD = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>%TITLE% | Pell Solar</title>
  <meta name="description" content="%DESCRIPTION%" />
  <link rel="canonical" href="https://pellsolar.com%CANONICAL_PATH%" />
  <script nonce="%CSP_NONCE%" type="application/ld+json">${getLocalBusinessJsonLd()}</script>
  ${getPhoneTrackingInlineScript("%CSP_NONCE%")}
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1f2937; background: #fff; line-height: 1.7; }
    .header { background: #0B1D51; padding: 20px 24px; display: flex; align-items: center; gap: 16px; }
    .header a { color: #FED44D; font-weight: 700; font-size: 20px; text-decoration: none; }
    .header .tagline { color: rgba(255,255,255,0.7); font-size: 13px; }
    .hero { background: #0B1D51; padding: 60px 24px; text-align: center; }
    .hero h1 { color: #fff; font-size: 2.5rem; font-weight: 800; margin-bottom: 8px; }
    .hero p { color: rgba(255,255,255,0.7); font-size: 1.1rem; }
    .content { max-width: 860px; margin: 0 auto; padding: 48px 24px 80px; }
    h2 { font-size: 1.4rem; font-weight: 800; color: #0B1D51; margin: 40px 0 12px; border-bottom: 2px solid #FED44D; padding-bottom: 6px; }
    h3 { font-size: 1.1rem; font-weight: 700; color: #1f2937; margin: 24px 0 8px; }
    p { margin-bottom: 14px; color: #374151; }
    ul, ol { padding-left: 24px; margin-bottom: 14px; }
    li { margin-bottom: 6px; color: #374151; }
    strong { color: #111827; }
    a { color: #2BABE2; font-weight: 600; }
    .sms-box { background: #f0f9ff; border: 2px solid #2BABE2; border-radius: 12px; padding: 24px; margin: 32px 0; }
    .sms-box h2 { border-color: #2BABE2; margin-top: 0; }
    .footer { background: #0B1D51; color: rgba(255,255,255,0.7); text-align: center; padding: 32px 24px; font-size: 13px; }
    .footer a { color: #FED44D; }
    .nav-links { display: flex; gap: 24px; justify-content: center; margin-top: 16px; flex-wrap: wrap; }
    .nav-links a { color: #2BABE2; font-weight: 600; }
    .badge { display: inline-block; background: #2BABE2; color: #fff; font-size: 11px; font-weight: 700; padding: 2px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px; margin-left: 8px; vertical-align: middle; }
  </style>
</head>
<body>`;

const HTML_FOOT = `
  <div class="footer">
    <p><strong style="color:#fff">Pell Solar Inc.</strong> &bull; 1326 Monte Vista Ave #7, Upland, CA 91786 &bull; CSLB #949122</p>
    <p>Phone: <a href="tel:8666468499">(866) 646-8499</a> | <a href="tel:7144553401">(714) 455-3401</a> (CA Local) &bull; Email: <a href="mailto:info@pellsolar.com">info@pellsolar.com</a></p>
    <div class="nav-links">
      <a href="/">Home</a>
      <a href="/get-quote">Get a Quote</a>
      <a href="/terms-and-conditions">Terms &amp; Conditions</a>
      <a href="/privacy-policy">Privacy Policy</a>
    </div>
    <p style="margin-top:16px">&copy; 2026 Pell Solar Inc. All rights reserved. CSLB #949122</p>
  </div>
</body>
</html>`;

/* ─────────────────────────────────────────────────────────────────────────────
   TERMS AND CONDITIONS
───────────────────────────────────────────────────────────────────────────── */
function staticHead(title: string, description: string, canonicalPath: string, nonce = "") {
  return HTML_HEAD
    .replace("%TITLE%", title)
    .replace("%DESCRIPTION%", description)
    .replace("%CANONICAL_PATH%", canonicalPath)
    .replaceAll("%CSP_NONCE%", nonce);
}

router.get("/terms-and-conditions", (_req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.send(
    staticHead("Terms & Conditions", "Read the Pell Solar website terms and conditions.", "/terms-and-conditions", res.locals.cspNonce ?? "") +
    `
  <div class="header">
    <a href="/">Pell Solar</a>
    <span class="tagline">Let the Sun Shine In</span>
  </div>
  <div class="hero">
    <h1>Terms &amp; Conditions</h1>
    <p>Last updated: April 25, 2026</p>
  </div>
  <div class="content">

    <p>These Terms and Conditions ("Terms") govern your use of the Pell Solar website located at pellsolar.com (the "Site") and any services provided by Pell Solar, Inc. ("Pell Solar," "we," "us," or "our"). By accessing or using the Site, you agree to be bound by these Terms. If you do not agree, please do not use the Site.</p>

    <h2>1. Use of the Site</h2>
    <p>You may use the Site for lawful purposes only. You agree not to:</p>
    <ul>
      <li>Use the Site in any way that violates applicable federal, state, or local laws or regulations</li>
      <li>Transmit any unsolicited or unauthorized advertising or promotional material</li>
      <li>Attempt to gain unauthorized access to any portion of the Site or its related systems</li>
      <li>Interfere with or disrupt the integrity or performance of the Site</li>
      <li>Collect or harvest any personally identifiable information from the Site</li>
    </ul>

    <h2>2. Quote Requests and Lead Submissions</h2>
    <p>When you submit a quote request or contact form on the Site, you authorize Pell Solar to contact you by phone, email, or text message regarding solar products and services. You may opt out of communications at any time by contacting us at <a href="mailto:info@pellsolar.com">info@pellsolar.com</a> or by replying STOP to any text message.</p>
    <p>Quote requests are not binding contracts. All pricing, system design, and financing terms are subject to a formal proposal and signed agreement.</p>

    <h2>3. Pricing and Estimates</h2>
    <p>All pricing displayed on the Site is for illustrative purposes only and represents typical or starting prices. Actual pricing depends on system size, roof type, equipment selection, local permit fees, and other factors. Pell Solar will provide a formal written quote after assessing your specific situation.</p>
    <p>Monthly payment estimates assume qualification for financing programs and are subject to credit approval. Savings estimates are projections based on historical utility rates and typical system performance — actual savings may vary.</p>

    <h2>4. Intellectual Property</h2>
    <p>All content on the Site — including text, graphics, logos, images, and software — is the property of Pell Solar or its content suppliers and is protected by United States and international copyright laws. You may not reproduce, distribute, modify, or create derivative works from any Site content without our express written permission.</p>
    <p>The Pell Solar name, logo, and "Let the Sun Shine In" tagline are trademarks of Pell Solar, Inc. All rights reserved.</p>

    <h2>5. Third-Party Links</h2>
    <p>The Site may contain links to third-party websites, including manufacturer sites, financing partners, and review platforms. These links are provided for your convenience only. Pell Solar has no control over the content of those sites and accepts no responsibility for them or for any loss or damage that may arise from your use of them.</p>

    <h2>6. Disclaimer of Warranties</h2>
    <p>THE SITE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. PELL SOLAR DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
    <p>We do not warrant that the Site will be uninterrupted, error-free, or free of viruses or other harmful components. We do not warrant the accuracy, completeness, or usefulness of any information on the Site.</p>

    <h2>7. Limitation of Liability</h2>
    <p>TO THE FULLEST EXTENT PERMITTED BY LAW, PELL SOLAR SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SITE OR RELIANCE ON ANY INFORMATION PROVIDED THEREIN, EVEN IF PELL SOLAR HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>
    <p>Our total liability to you for any claim arising from your use of the Site shall not exceed $100.</p>

    <h2>8. Installation Services</h2>
    <p>Solar installation services are governed by a separate written contract between you and Pell Solar. These Terms do not constitute a service agreement. All installation warranties, guarantees, and service terms are set forth in the installation contract.</p>
    <p>Pell Solar is licensed by the California Contractors State License Board (CSLB License #949122) and holds all required licenses in the states where we operate.</p>

    <h2>9. Privacy</h2>
    <p>Your use of the Site is also governed by our <a href="/privacy-policy">Privacy Policy</a>, which is incorporated into these Terms by reference. By using the Site, you consent to the collection and use of your information as described in the Privacy Policy.</p>

    <h2>10. Changes to These Terms</h2>
    <p>We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the Site. Your continued use of the Site after any changes constitutes your acceptance of the new Terms. We encourage you to review these Terms periodically.</p>

    <h2>11. Governing Law</h2>
    <p>These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any dispute arising from these Terms shall be resolved in the state or federal courts located in San Bernardino County, California.</p>

    <div class="sms-box">
      <h2>12. SMS / Text Messaging Terms <span class="badge">SMS Program</span></h2>

      <p>By checking the SMS consent box on our web forms, or by providing verbal consent during a consultation or service appointment, you agree to receive text messages from <strong>Pell Solar Inc.</strong> at the mobile number you provide. These Terms govern our SMS program.</p>

      <h3>Program Description</h3>
      <p>Pell Solar Inc. offers an SMS notification program that provides customers with text message updates about their solar project. Messages may include:</p>
      <ul>
        <li>Appointment confirmations and reminders</li>
        <li>Site survey scheduling</li>
        <li>Installation progress updates</li>
        <li>Inspection scheduling</li>
        <li>Permit and utility status updates (including PTO approval)</li>
        <li>Service request updates</li>
        <li>General project communications</li>
      </ul>

      <h3>How to Opt In</h3>
      <p>You may enroll in our SMS program by:</p>
      <ol>
        <li>Checking the SMS consent checkbox on our online quote form at <a href="https://pellsolar.com/get-quote">pellsolar.com/get-quote</a></li>
        <li>Checking the SMS consent checkbox on our service request form at <a href="https://pellsolar.com/solar-repair">pellsolar.com/solar-repair</a></li>
        <li>Providing verbal consent during a sales consultation or service appointment</li>
        <li>Signing a Pell Solar installation agreement that includes SMS consent language</li>
      </ol>
      <p><strong>Consent is not required as a condition of purchasing any goods or services from Pell Solar Inc.</strong></p>

      <h3>Message Frequency</h3>
      <p>Message frequency varies depending on the status of your solar project. During active project phases, you may receive approximately 2–10 messages per month. During inactive periods, message frequency may be lower or zero.</p>

      <h3>Message and Data Rates</h3>
      <p>Standard message and data rates may apply. Pell Solar Inc. is not responsible for any fees charged by your mobile carrier. Contact your carrier for details about your text messaging plan.</p>

      <h3>How to Opt Out</h3>
      <p>You may opt out of receiving text messages at any time by replying <strong>STOP</strong> to any text message received from Pell Solar Inc. After sending STOP, you will receive one final confirmation message confirming your opt-out. You will not receive further SMS messages unless you re-enroll.</p>

      <h3>Help</h3>
      <p>For help or questions about the SMS program, reply <strong>HELP</strong> to any text message received from Pell Solar. You will receive a response: "Pell Solar: For assistance, call (866) 646-8499 or email info@pellsolar.com. Reply STOP to opt out. Msg &amp; data rates may apply. Msg frequency varies."</p>

      <h3>Supported Carriers</h3>
      <p>Supported carriers include but are not limited to AT&amp;T, Verizon, T-Mobile, Sprint, U.S. Cellular, and other major US wireless carriers. Carriers are not liable for delayed or undelivered messages.</p>

      <h3>Privacy</h3>
      <p>Pell Solar Inc. does not sell, rent, or share your mobile phone number or SMS opt-in data with third parties for marketing or promotional purposes. For complete details, see our <a href="/privacy-policy">Privacy Policy</a>.</p>
    </div>

    <h2>13. Contact Us</h2>
    <p>If you have questions about these Terms, please contact us:</p>
    <ul>
      <li><strong>Pell Solar, Inc.</strong></li>
      <li>1326 Monte Vista Ave #7, Upland, CA 91786</li>
      <li>Phone: <a href="tel:8666468499">(866) 646-8499</a> | <a href="tel:7144553401">(714) 455-3401</a> (CA Local)</li>
      <li>Email: <a href="mailto:info@pellsolar.com">info@pellsolar.com</a></li>
    </ul>

    <div class="nav-links" style="margin-top:40px; justify-content:flex-start;">
      <a href="/privacy-policy">View Privacy Policy &rarr;</a>
      <a href="/">Back to Home</a>
    </div>
  </div>
` +
    HTML_FOOT
  );
});

/* ─────────────────────────────────────────────────────────────────────────────
   PRIVACY POLICY
───────────────────────────────────────────────────────────────────────────── */
router.get("/privacy-policy", (_req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.send(
    staticHead("Privacy Policy", "Read Pell Solar’s privacy policy and information practices.", "/privacy-policy", res.locals.cspNonce ?? "") +
    `
  <div class="header">
    <a href="/">Pell Solar</a>
    <span class="tagline">Let the Sun Shine In</span>
  </div>
  <div class="hero">
    <h1>Privacy Policy</h1>
    <p>Last updated: April 25, 2026</p>
  </div>
  <div class="content">

    <p><strong>Pell Solar Inc.</strong> ("Pell Solar," "we," "us," or "our") is committed to protecting the privacy of our customers and website visitors. This Privacy Policy describes how we collect, use, disclose, and protect your personal information when you visit our website (pellsolar.com), use our services, or interact with us in any way.</p>
    <p>By using our website or services, you agree to the terms of this Privacy Policy.</p>

    <h2>Information We Collect</h2>
    <p>We may collect the following types of personal information:</p>
    <ul>
      <li><strong>Contact Information:</strong> Name, email address, phone number, mailing address.</li>
      <li><strong>Project Information:</strong> Property address, utility account details, roof specifications, energy usage data, and other details related to your solar installation.</li>
      <li><strong>Financial Information:</strong> Payment information necessary to process transactions (handled securely through third-party payment processors).</li>
      <li><strong>Website Usage Data:</strong> IP address, browser type, operating system, pages visited, and cookies.</li>
      <li><strong>Communications:</strong> Records of emails, text messages, phone calls, and other communications between you and Pell Solar.</li>
    </ul>

    <h2>How We Use Your Information</h2>
    <p>We use the information we collect for the following purposes:</p>
    <ul>
      <li>To provide, maintain, and improve our solar installation and service offerings.</li>
      <li>To communicate with you about your solar project, including appointment scheduling, installation updates, permit and utility status, and service notifications.</li>
      <li>To send you text messages if you have opted in to our SMS program (see SMS/Text Messaging Privacy section below).</li>
      <li>To process payments and manage your account.</li>
      <li>To respond to your inquiries and provide customer support.</li>
      <li>To comply with legal obligations and protect our rights.</li>
    </ul>

    <div class="sms-box">
      <h2>SMS / Text Messaging Privacy <span class="badge">SMS Program</span></h2>

      <p>This section applies to individuals who opt in to receive text messages from Pell Solar Inc.</p>

      <h3>What We Collect for SMS</h3>
      <p>When you opt in to our SMS program, we collect your mobile phone number, first and last name, and your consent to receive text messages. Opt-in occurs when you check the SMS consent checkbox on our web forms at <a href="https://pellsolar.com/get-quote">pellsolar.com/get-quote</a> or <a href="https://pellsolar.com/solar-repair">pellsolar.com/solar-repair</a>, or when you provide verbal consent during a consultation.</p>

      <h3>How We Use SMS Data</h3>
      <p>We use your mobile phone number solely to send you text messages related to your solar project, including but not limited to: appointment confirmations and reminders, site survey scheduling, installation updates, inspection scheduling, permit and utility status updates (including PTO), service updates, and general project communications. We do not use your phone number for telemarketing or unsolicited promotional messages.</p>

      <h3>No Sharing of SMS Data</h3>
      <p>We do not sell, rent, share, or disclose your mobile phone number, SMS opt-in data, or any information collected in connection with our SMS program to any third parties for their marketing or promotional purposes. This includes but is not limited to lead generators, data brokers, and affiliate marketers. We may share your phone number only with our SMS service provider (Twilio) solely for the purpose of delivering text messages on our behalf.</p>

      <h3>Message Frequency</h3>
      <p>Message frequency varies depending on the status of your solar project. You can typically expect 2–10 messages per month during active project phases.</p>

      <h3>Message and Data Rates</h3>
      <p>Standard message and data rates may apply depending on your mobile carrier and plan. Pell Solar is not responsible for any charges imposed by your mobile carrier.</p>

      <h3>How to Opt Out</h3>
      <p>You may opt out of receiving text messages at any time by replying <strong>STOP</strong> to any message you receive from us. After opting out, you will receive one final confirmation message and will no longer receive SMS communications from Pell Solar unless you re-enroll.</p>

      <h3>Help</h3>
      <p>For assistance with our SMS program, reply <strong>HELP</strong> to any message or contact us at <a href="tel:8666468499">(866) 646-8499</a> or <a href="mailto:info@pellsolar.com">info@pellsolar.com</a>.</p>

      <h3>Consent</h3>
      <p><strong>Consent to receive text messages is not a condition of purchasing any goods or services from Pell Solar Inc.</strong></p>
    </div>

    <h2>How We Share Your Information</h2>
    <p>We do not sell your personal information. We may share your information in the following limited circumstances:</p>
    <ul>
      <li><strong>Service Providers:</strong> We share information with third-party service providers who assist us in operating our business, such as payment processors, SMS delivery providers (Twilio), email service providers, and CRM platforms. These providers are contractually obligated to protect your data and use it only for the purposes we specify.</li>
      <li><strong>Legal Requirements:</strong> We may disclose your information if required by law, regulation, legal process, or governmental request.</li>
      <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
      <li><strong>With Your Consent:</strong> We may share information for purposes not described in this policy with your explicit consent.</li>
    </ul>

    <h2>Cookies and Tracking</h2>
    <p>Our website may use cookies and similar tracking technologies to improve your browsing experience and analyze website traffic. You can manage your cookie preferences through your browser settings.</p>

    <h2>Data Security</h2>
    <p>We implement reasonable technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.</p>

    <h2>Data Retention</h2>
    <p>We retain your personal information for as long as necessary to fulfill the purposes described in this policy, including to satisfy legal, accounting, or reporting obligations. If you opt out of our SMS program, we will promptly cease sending you text messages and remove your phone number from our active messaging list.</p>

    <h2>Your Rights</h2>
    <p>Depending on your location, you may have the following rights:</p>
    <ul>
      <li><strong>Access:</strong> Request a copy of the personal information we hold about you.</li>
      <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information.</li>
      <li><strong>Deletion:</strong> Request deletion of your personal information, subject to legal obligations.</li>
      <li><strong>Opt-Out:</strong> Opt out of text messages by replying STOP. Opt out of marketing emails by clicking the unsubscribe link.</li>
    </ul>
    <p>To exercise any of these rights, contact us at <a href="mailto:info@pellsolar.com">info@pellsolar.com</a> or <a href="tel:8666468499">(866) 646-8499</a>.</p>

    <h2>Children's Privacy</h2>
    <p>Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children.</p>

    <h2>Changes to This Privacy Policy</h2>
    <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last Updated" date. Your continued use of our website or services after any changes constitutes your acceptance of the updated policy.</p>

    <h2>Contact Us</h2>
    <p>If you have questions about this Privacy Policy, please contact us:</p>
    <p><strong>Pell Solar Inc.</strong><br />
    1326 Monte Vista Ave #7, Upland, CA 91786<br />
    Phone: <a href="tel:8666468499">(866) 646-8499</a> | <a href="tel:7144553401">(714) 455-3401</a> (CA Local)<br />
    Email: <a href="mailto:info@pellsolar.com">info@pellsolar.com</a><br />
    Website: <a href="https://pellsolar.com">pellsolar.com</a></p>

    <div class="nav-links" style="margin-top:40px; justify-content:flex-start;">
      <a href="/terms-and-conditions">View Terms &amp; Conditions &rarr;</a>
      <a href="/">Back to Home</a>
    </div>
  </div>
` +
    HTML_FOOT
  );
});

export default router;
