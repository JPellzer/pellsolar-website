import { Link } from "wouter";
import { Phone, Check, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HERO_IMG = "/manus-storage/solar-home-main-v2_0ad97127.jpg";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative py-20 flex items-center" style={{ backgroundImage: `linear-gradient(135deg, rgba(11,29,81,0.5), rgba(11,29,81,0.3)), url(${HERO_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="relative z-10 container mx-auto px-6 pt-12">
          <p className="text-[#2BABE2] font-bold text-xs tracking-widest uppercase mb-3">LEGAL</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 max-w-2xl" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-200 max-w-xl mb-8 leading-relaxed">Your privacy matters to us. This policy explains how Pell Solar collects, uses, and protects your personal information.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/get-quote" className="btn-green">Get Your Free Quote</Link>
            <a href="tel:8666468499" className="btn-navy flex items-center gap-2">
              <Phone size={16} className="text-yellow-400" /> (866) 646-8499 | (714) 455-3401 CA
            </a>
          </div>
        </div>
      </section>


      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed">
            <p className="text-sm text-gray-500"><strong>Last Updated: April 25, 2026</strong></p>
            <p><strong>Pell Solar Inc.</strong> (&ldquo;Pell Solar,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting the privacy of our customers and website visitors. This Privacy Policy describes how we collect, use, disclose, and protect your personal information when you visit our website (pellsolar.com), use our services, or interact with us in any way.</p>
            <p>By using our website or services, you agree to the terms of this Privacy Policy.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Information We Collect</h2>
            <p>We may collect the following types of personal information:</p>
            <ul>
              <li><strong>Contact Information:</strong> Name, email address, phone number, mailing address.</li>
              <li><strong>Project Information:</strong> Property address, utility account details, roof specifications, energy usage data, and other details related to your solar installation.</li>
              <li><strong>Financial Information:</strong> Payment information necessary to process transactions (handled securely through third-party payment processors).</li>
              <li><strong>Website Usage Data:</strong> IP address, browser type, operating system, pages visited, and cookies.</li>
              <li><strong>Communications:</strong> Records of emails, text messages, phone calls, and other communications between you and Pell Solar.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How We Use Your Information</h2>
            <p>We use the information we collect for the following purposes:</p>
            <ul>
              <li>To provide, maintain, and improve our solar installation and service offerings.</li>
              <li>To communicate with you about your solar project, including appointment scheduling, installation updates, permit and utility status, and service notifications.</li>
              <li>To send you text messages if you have opted in to our SMS program (see SMS/Text Messaging Privacy section below).</li>
              <li>To process payments and manage your account.</li>
              <li>To respond to your inquiries and provide customer support.</li>
              <li>To comply with legal obligations and protect our rights.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">SMS/Text Messaging Privacy</h2>
            <p>This section applies to individuals who opt in to receive text messages from Pell Solar Inc.</p>
            <p><strong>What We Collect for SMS:</strong> When you opt in to our SMS program, we collect your mobile phone number, first and last name, and your consent to receive text messages.</p>
            <p><strong>How We Use SMS Data:</strong> We use your mobile phone number solely to send you text messages related to your solar project, including but not limited to: appointment confirmations and reminders, site survey scheduling, installation updates, inspection scheduling, permit and utility status updates (including PTO), service updates, and general project communications. We do not use your phone number for telemarketing or unsolicited promotional messages.</p>
            <p><strong>No Sharing of SMS Data:</strong> We do not sell, rent, share, or disclose your mobile phone number, SMS opt-in data, or any information collected in connection with our SMS program to any third parties for their marketing or promotional purposes. This includes but is not limited to lead generators, data brokers, and affiliate marketers. We may share your phone number only with our SMS service provider (Twilio) solely for the purpose of delivering text messages on our behalf.</p>
            <p><strong>Message Frequency:</strong> Message frequency varies depending on the status of your solar project. You can typically expect 2&ndash;10 messages per month during active project phases.</p>
            <p><strong>Message and Data Rates:</strong> Standard message and data rates may apply depending on your mobile carrier and plan. Pell Solar is not responsible for any charges imposed by your mobile carrier.</p>
            <p><strong>Opt-Out:</strong> You may opt out of receiving text messages at any time by replying <strong>STOP</strong> to any message you receive from us. After opting out, you will receive one final confirmation message and will no longer receive SMS communications from Pell Solar unless you re-enroll.</p>
            <p><strong>Help:</strong> For assistance with our SMS program, reply <strong>HELP</strong> to any message or contact us at <a href="tel:8666468499" className="text-[#2BABE2]">(866) 646-8499 | (714) 455-3401 CA</a> or <a href="mailto:info@pellsolar.com" className="text-[#2BABE2]">info@pellsolar.com</a>.</p>
            <p><strong>Consent:</strong> Consent to receive text messages is not a condition of purchasing any goods or services from Pell Solar Inc.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How We Share Your Information</h2>
            <p>We do not sell your personal information. We may share your information in the following limited circumstances:</p>
            <ul>
              <li><strong>Service Providers:</strong> We share information with third-party service providers who assist us in operating our business, such as payment processors, SMS delivery providers, email service providers, and CRM platforms. These providers are contractually obligated to protect your data and use it only for the purposes we specify.</li>
              <li><strong>Legal Requirements:</strong> We may disclose your information if required by law, regulation, legal process, or governmental request.</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
              <li><strong>With Your Consent:</strong> We may share information for purposes not described in this policy with your explicit consent.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Cookies and Tracking</h2>
            <p>Our website may use cookies and similar tracking technologies to improve your browsing experience and analyze website traffic. You can manage your cookie preferences through your browser settings.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Data Security</h2>
            <p>We implement reasonable technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Data Retention</h2>
            <p>We retain your personal information for as long as necessary to fulfill the purposes described in this policy, including to satisfy legal, accounting, or reporting obligations. If you opt out of our SMS program, we will promptly cease sending you text messages and remove your phone number from our active messaging list.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Your Rights</h2>
            <p>Depending on your location, you may have the following rights:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you.</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information.</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information, subject to legal obligations.</li>
              <li><strong>Opt-Out:</strong> Opt out of text messages by replying STOP. Opt out of marketing emails by clicking the unsubscribe link.</li>
            </ul>
            <p>To exercise any of these rights, contact us at <a href="mailto:info@pellsolar.com" className="text-[#2BABE2]">info@pellsolar.com</a> or <a href="tel:8666468499" className="text-[#2BABE2]">(866) 646-8499 | (714) 455-3401 CA</a>.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Children&apos;s Privacy</h2>
            <p>Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated &ldquo;Last Updated&rdquo; date. Your continued use of our website or services after any changes constitutes your acceptance of the updated policy.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us:</p>
            <p><strong>Pell Solar Inc.</strong><br />Phone: <a href="tel:8666468499" className="text-[#2BABE2]">(866) 646-8499 | (714) 455-3401 CA</a><br />Email: <a href="mailto:info@pellsolar.com" className="text-[#2BABE2]">info@pellsolar.com</a><br />Website: pellsolar.com</p>

            <p className="text-sm text-gray-400 mt-8">Last updated: April 25, 2026 | Pell Solar Inc. | 1326 Monte Vista Ave #7, Upland, CA 91786</p>
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="py-20 bg-[#0B1D51]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Ready to Get Started?</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">Free consultation. No pressure. No obligation. Family-owned solar company.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-quote" className="btn-gold text-lg px-10 py-4">Get Your Free Quote</Link>
            <a href="tel:8666468499" className="flex items-center justify-center gap-2 bg-white/10 text-white rounded-xl px-6 py-4 font-bold hover:bg-white/20 transition-colors">
              <Phone size={18} className="text-yellow-400" /> (866) 646-8499 | (714) 455-3401 CA
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
