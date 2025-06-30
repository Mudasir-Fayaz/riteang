import { LandingHeader } from "@/components/landing/landing-header"
import { FooterSection } from "@/components/landing/footer-section"

export default function PrivacyPolicyPage() {
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
        <h1 className="text-4xl md:text-5xl font-bold text-custom-red mb-8 text-center">Privacy Policy</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-custom-blue mb-3">1. Introduction</h2>
          <p className="text-gray-700 leading-relaxed">
            Welcome to RITE Education. We are committed to protecting your privacy and ensuring the security of your
            personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your
            information when you visit our website, use our services, or interact with us.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-custom-blue mb-3">2. Information We Collect</h2>
          <p className="text-gray-700 leading-relaxed">
            We may collect personal information that you voluntarily provide to us when you register for courses, fill
            out forms, subscribe to newsletters, or contact us. This information may include:
          </p>
          <ul className="list-disc list-inside text-gray-700 ml-4 mt-2">
            <li>Name, email address, phone number, and postal address.</li>
            <li>Educational background and interests.</li>
            <li>Payment information (processed securely by third-party payment processors).</li>
            <li>Any other information you choose to provide.</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            We also collect non-personal information automatically when you visit our website, such as your IP address,
            browser type, operating system, referring URLs, and browsing patterns.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-custom-blue mb-3">3. How We Use Your Information</h2>
          <p className="text-gray-700 leading-relaxed">
            We use the information we collect for various purposes, including:
          </p>
          <ul className="list-disc list-inside text-gray-700 ml-4 mt-2">
            <li>To provide and manage our services, including course registration and access.</li>
            <li>To communicate with you about your account, courses, and updates.</li>
            <li>To process transactions and send related information.</li>
            <li>To improve our website, services, and user experience.</li>
            <li>To send promotional materials and newsletters (with your consent).</li>
            <li>To comply with legal obligations and protect our rights.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-custom-blue mb-3">4. Disclosure of Your Information</h2>
          <p className="text-gray-700 leading-relaxed">
            We may share your information with third parties in the following situations:
          </p>
          <ul className="list-disc list-inside text-gray-700 ml-4 mt-2">
            <li>With service providers who assist us in operating our website and providing services.</li>
            <li>With business partners for marketing or promotional purposes (with your consent).</li>
            <li>When required by law or to respond to legal processes.</li>
            <li>To protect our rights, property, or safety, and that of our users or the public.</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            We do not sell, rent, or lease your personal information to third parties.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-custom-blue mb-3">5. Data Security</h2>
          <p className="text-gray-700 leading-relaxed">
            We implement reasonable security measures to protect your personal information from unauthorized access,
            use, or disclosure. However, no method of transmission over the Internet or electronic storage is 100%
            secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-custom-blue mb-3">6. Your Choices and Rights</h2>
          <p className="text-gray-700 leading-relaxed">
            You have the right to access, update, or delete your personal information. You can also opt-out of receiving
            promotional communications from us at any time. Please contact us to exercise these rights.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-custom-blue mb-3">7. Cookies and Tracking Technologies</h2>
          <p className="text-gray-700 leading-relaxed">
            We use cookies and similar tracking technologies to enhance your browsing experience, analyze website
            traffic, and personalize content. You can manage your cookie preferences through your browser settings.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-custom-blue mb-3">8. Third-Party Websites</h2>
          <p className="text-gray-700 leading-relaxed">
            Our website may contain links to third-party websites. We are not responsible for the privacy practices or
            content of these external sites. We encourage you to review the privacy policies of any third-party websites
            you visit.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-custom-blue mb-3">9. Changes to This Privacy Policy</h2>
          <p className="text-gray-700 leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page. Your continued use of our services after any changes indicates your acceptance
            of the updated policy.
          </p>
        </section>
      </main>
      <FooterSection />
    </div>
  )
}
