import { LandingHeader } from "@/components/landing/landing-header"
import { FooterSection } from "@/components/landing/footer-section"

export default function TermsConditionsPage() {
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
        <h1 className="text-4xl md:text-5xl font-bold text-custom-red mb-8 text-center">Terms and Conditions</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-custom-blue mb-3">1. Acceptance of Terms</h2>
          <p className="text-gray-700 leading-relaxed">
            By accessing or using the RITE Education website and services, you agree to be bound by these Terms and
            Conditions, all applicable laws and regulations, and agree that you are responsible for compliance with any
            applicable local laws. If you do not agree with any of these terms, you are prohibited from using or
            accessing this site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-custom-blue mb-3">2. Intellectual Property Rights</h2>
          <p className="text-gray-700 leading-relaxed">
            All content on this website, including text, graphics, logos, images, course materials, and software, is the
            property of RITE Education or its content suppliers and protected by intellectual property laws. You may not
            reproduce, distribute, modify, or create derivative works from any content without our express written
            permission.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-custom-blue mb-3">3. User Conduct</h2>
          <p className="text-gray-700 leading-relaxed">
            You agree to use our website and services only for lawful purposes and in a manner that does not infringe
            the rights of, restrict, or inhibit anyone else's use and enjoyment of the website. Prohibited conduct
            includes harassing or causing distress or inconvenience to any person, transmitting obscene or offensive
            content, or disrupting the normal flow of dialogue within our website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-custom-blue mb-3">4. Course Enrollment and Payment</h2>
          <p className="text-gray-700 leading-relaxed">
            Enrollment in courses is subject to availability and successful payment. All course fees are non-refundable
            unless otherwise stated in our refund policy. We reserve the right to change course content, schedules, or
            fees at any time.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-custom-blue mb-3">5. Disclaimers</h2>
          <p className="text-gray-700 leading-relaxed">
            The materials on RITE Education's website are provided on an 'as is' basis. RITE Education makes no
            warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without
            limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or
            non-infringement of intellectual property or other violation of rights.
          </p>
          <p className="text-gray-700 leading-relaxed mt-2">
            Further, RITE Education does not warrant or make any representations concerning the accuracy, likely
            results, or reliability of the use of the materials on its website or otherwise relating to such materials
            or on any sites linked to this site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-custom-blue mb-3">6. Limitation of Liability</h2>
          <p className="text-gray-700 leading-relaxed">
            In no event shall RITE Education or its suppliers be liable for any damages (including, without limitation,
            damages for loss of data or profit, or due to business interruption) arising out of the use or inability to
            use the materials on RITE Education's website, even if RITE Education or a RITE Education authorized
            representative has been notified orally or in writing of the possibility of such damage.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-custom-blue mb-3">7. Links to Third-Party Websites</h2>
          <p className="text-gray-700 leading-relaxed">
            RITE Education has not reviewed all of the sites linked to its website and is not responsible for the
            contents of any such linked site. The inclusion of any link does not imply endorsement by RITE Education of
            the site. Use of any such linked website is at the user's own risk.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-custom-blue mb-3">8. Modifications to Terms</h2>
          <p className="text-gray-700 leading-relaxed">
            RITE Education may revise these terms of service for its website at any time without notice. By using this
            website you are agreeing to be bound by the then current version of these terms of service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-custom-blue mb-3">9. Governing Law</h2>
          <p className="text-gray-700 leading-relaxed">
            These terms and conditions are governed by and construed in accordance with the laws of Anantnag, India, and
            you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
          </p>
        </section>
      </main>
      <FooterSection />
    </div>
  )
}
