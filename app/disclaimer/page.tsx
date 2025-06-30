import { LandingHeader } from "@/components/landing/landing-header"
import { FooterSection } from "@/components/landing/footer-section"

export default function DisclaimerPage() {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Courses", href: "/courses" },
    { name: "Franchise", href: "/franchise" },
    { name: "Student Zone", href: "/login-zone" },
    { name: "Verify Certificate", href: "/#verify-certificate" },
    { name: "Contact Us", href: "/contact-us" },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader navLinks={navLinks} />
      <main className="flex-1 container mx-auto px-4 py-12 md:py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-custom-red mb-8 text-center">Disclaimer</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-custom-blue mb-3">Accuracy of Information</h2>
          <p className="text-gray-700 leading-relaxed">
            The information provided on the RITE Education website is for general informational purposes only. While we
            strive to keep the information up-to-date and correct, we make no representations or warranties of any kind,
            express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect
            to the website or the information, products, services, or related graphics contained on the website for any
            purpose. Any reliance you place on such information is therefore strictly at your own risk.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-custom-blue mb-3">External Links</h2>
          <p className="text-gray-700 leading-relaxed">
            Through this website, you may be able to link to other websites which are not under the control of RITE
            Education. We have no control over the nature, content, and availability of those sites. The inclusion of
            any links does not necessarily imply a recommendation or endorse the views expressed within them.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-custom-blue mb-3">Professional Advice</h2>
          <p className="text-gray-700 leading-relaxed">
            The content on this website is not intended to be a substitute for professional advice. Always seek the
            advice of a qualified professional for any questions you may have regarding your educational or career
            goals.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-custom-blue mb-3">Changes to Content</h2>
          <p className="text-gray-700 leading-relaxed">
            We reserve the right to make additions, deletions, or modifications to the content on the website at any
            time without prior notice.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-custom-blue mb-3">Limitation of Liability</h2>
          <p className="text-gray-700 leading-relaxed">
            In no event will we be liable for any loss or damage including without limitation, indirect or consequential
            loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in
            connection with, the use of this website.
          </p>
        </section>
      </main>
      <FooterSection />
    </div>
  )
}
