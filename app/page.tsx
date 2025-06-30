import { HeroSection } from "@/components/landing/hero-section"
import { AboutSection } from "@/components/landing/about-section"
import { LoginZoneSection } from "@/components/landing/login-zone-section"
import { CertificateVerifySection } from "@/components/landing/certificate-verify-section"
import { HowToApplySection } from "@/components/landing/how-to-apply-section"
import { TopCoursesSection } from "@/components/landing/top-courses-section"
import { StatsSection } from "@/components/landing/stats-section"
import { WhyChooseUsSection } from "@/components/landing/why-choose-us-section"
import { StudentJobsSection } from "@/components/landing/student-jobs-section"
import { ChairmanMessageSection } from "@/components/landing/chairman-message-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { ContactUsSection } from "@/components/landing/contact-us-section"
import { LandingHeader } from "@/components/landing/landing-header"
import { FooterSection } from "@/components/landing/footer-section"
import { OurValuesSection } from "@/components/landing/our-values-section"

export default function LandingPage() {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Courses", href: "/courses" },
    { name: "Student Zone", href: "/student-zone" },
    { name: "Student Jobs", href: "/student-jobs" },
    { name: "Franchise", href: "/franchise" },
    { name: "Login Zone", href: "/login-zone" },
    { name: "Contact Us", href: "/contact-us" },
    { name: "Verify Certificate", href: "/#verify-certificate" },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader navLinks={navLinks} />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <LoginZoneSection />
        <CertificateVerifySection />
        <HowToApplySection />
        <TopCoursesSection />
        <StatsSection />
        <WhyChooseUsSection />
        <StudentJobsSection />
        <ChairmanMessageSection />
        <TestimonialsSection />
        <OurValuesSection />
        <ContactUsSection />
      </main>
      <FooterSection />
    </div>
  )
}
