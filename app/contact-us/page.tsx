import { LandingHeader } from "@/components/landing/landing-header"
import { FooterSection } from "@/components/landing/footer-section"
import { ContactUsSection } from "@/components/landing/contact-us-section"

export default function ContactUsPage() {
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
      <main className="flex-1">
        <ContactUsSection />
      </main>
      <FooterSection />
    </div>
  )
}
