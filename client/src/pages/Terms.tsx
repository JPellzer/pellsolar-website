import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Navbar />

      {/* ═══════════ HEADER ═══════════ */}
      <section className="bg-[#0B1D51] py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Terms &amp; Conditions
          </h1>
          <p className="text-white/70 text-lg">Last updated: April 25, 2026</p>
        </div>
      </section>

      {/* ═══════════ CONTENT ═══════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="
            [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4
            [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-6 [&_h3]:mb-2
            [&_p]:text-gray-700 [&_p]:leading-relaxed [&_p]:mb-4
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul>li]:text-gray-700 [&_ul>li]:mb-1
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol>li]:text-gray-700 [&_ol>li]:mb-1
            [&_strong]:font-bold [&_strong]:text-gray-900
            [&_a]:text-[#2BABE2] [&_a]:font-semibold
          ">

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
            <p>Your use of the Site is also governed by our <Link href="/privacy-policy">Privacy Policy</Link>, which is incorporated into these Terms by reference. By using the Site, you consent to the collection and use of your information as described in the Privacy Policy.</p>

            <h2>10. Changes to These Terms</h2>
            <p>We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the Site. Your continued use of the Site after any changes constitutes your acceptance of the new Terms. We encourage you to review these Terms periodically.</p>

            <h2>11. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any dispute arising from these Terms shall be resolved in the state or federal courts located in San Bernardino County, California.</p>

            <h2>12. SMS/Text Messaging Terms</h2>
            <p>By opting in to receive text messages from Pell Solar Inc., you agree to the following terms:</p>
            <p><strong>Program Description:</strong> Pell Solar Inc. offers an SMS notification program that provides customers with text message updates about their solar project. Messages may include appointment confirmations and reminders, site survey scheduling, installation updates, inspection scheduling, permit and utility status updates (including PTO approval), service updates, and general project communications.</p>
            <p><strong>Enrollment and Consent:</strong> You may enroll in our SMS program by: (1) completing the SMS opt-in form on our website at pellsolar.com/sms-updates, (2) providing verbal consent during a sales consultation or service appointment, or (3) signing a Pell Solar installation agreement that includes SMS consent language. By enrolling, you expressly consent to receive automated and recurring text messages from Pell Solar Inc. at the mobile phone number you provide. Consent is not required as a condition of purchasing any goods or services.</p>
            <p><strong>Message Frequency:</strong> Message frequency varies depending on the status of your solar project. During active project phases, you may receive approximately 2&ndash;10 messages per month. During inactive periods, message frequency may be lower or zero.</p>
            <p><strong>Message and Data Rates:</strong> Standard message and data rates may apply. Pell Solar Inc. is not responsible for any fees charged by your mobile carrier. Contact your carrier for details about your text messaging plan.</p>
            <p><strong>Opt-Out:</strong> You may opt out of receiving text messages at any time by replying <strong>STOP</strong> to any text message received from Pell Solar Inc. After sending STOP, you will receive one final confirmation message confirming your opt-out. You will not receive further SMS messages unless you re-enroll.</p>
            <p><strong>Help:</strong> For help or questions about the SMS program, reply <strong>HELP</strong> to any text message received from Pell Solar. You will receive a response: &ldquo;Pell Solar: For assistance, call (866) 646-8499 or (714) 455-3401 (CA) or email info@pellsolar.com. Reply STOP to opt out. Msg &amp; data rates may apply. Msg frequency varies.&rdquo;</p>
            <p><strong>Supported Carriers:</strong> Supported carriers include but are not limited to AT&amp;T, Verizon, T-Mobile, Sprint, U.S. Cellular, and other major US wireless carriers. Carriers are not liable for delayed or undelivered messages.</p>
            <p><strong>Privacy:</strong> Pell Solar Inc. does not sell, rent, or share your mobile phone number or SMS opt-in data with third parties for marketing or promotional purposes. For complete details, see our <Link href="/privacy-policy">Privacy Policy</Link>.</p>

            <h2>13. Contact Us</h2>
            <p>If you have questions about these Terms, please contact us:</p>
            <ul>
              <li><strong>Pell Solar, Inc.</strong></li>
              <li>1326 Monte Vista Ave #7, Upland, CA 91786</li>
              <li>Phone: <a href="tel:8666468499">(866) 646-8499</a> | <a href="tel:7144553401">(714) 455-3401</a> (CA Local)</li>
              <li>Email: <a href="mailto:info@pellsolar.com">info@pellsolar.com</a></li>
            </ul>

          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link href="/privacy-policy" className="text-[#2BABE2] font-semibold no-underline hover:underline">View Privacy Policy →</Link>
            <Link href="/" className="text-gray-500 font-medium no-underline hover:text-gray-800">← Back to Home</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
