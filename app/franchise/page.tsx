"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, TrendingUp, Handshake, Lightbulb, ShieldCheck } from "lucide-react"
import { LandingHeader } from "@/components/landing/landing-header"
import { FooterSection } from "@/components/landing/footer-section"

export default function FranchisePage() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "High Growth Potential",
      description: "Tap into the booming computer education market with a proven business model.",
    },
    {
      icon: Handshake,
      title: "Comprehensive Support",
      description: "Receive extensive training, marketing assistance, and operational guidance.",
    },
    {
      icon: Lightbulb,
      title: "Innovative Curriculum",
      description: "Offer cutting-edge courses developed by industry experts to attract more students.",
    },
    {
      icon: ShieldCheck,
      title: "Brand Recognition",
      description: "Leverage the established reputation of RITE Education for instant credibility.",
    },
  ]

  const support = [
    "Marketing & Branding Support",
    "Curriculum & Content Updates",
    "Teacher Training Programs",
    "Operational & Administrative Guidance",
    "Technical Support",
    "Student Placement Assistance",
  ]

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Courses", href: "/courses" },
    { name: "Franchise", href: "/franchise" },
    { name: "Student Zone", href: "/login-zone" },
    { name: "Contact Us", href: "/contact-us" },
    { name: "Verify Certificate", href: "/#verify-certificate" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <LandingHeader navLinks={navLinks} />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-custom-blue mb-12">Partner with RITE Education</h1>

        {/* Benefits Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Franchise Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="flex flex-col items-center text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardHeader>
                  <benefit.icon className="h-12 w-12 text-custom-red mb-4" />
                  <CardTitle className="text-xl font-semibold">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-600">{benefit.description}</CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Support Section */}
        <section className="mb-16 bg-custom-red text-white py-12 rounded-lg shadow-lg">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">What We Offer Our Franchisees</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {support.map((item, index) => (
                <div key={index} className="flex items-center justify-center text-lg">
                  <CheckCircle className="h-6 w-6 mr-3 text-white" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card className="p-8 md:p-12 shadow-2xl bg-gradient-to-br from-custom-blue to-blue-700 text-white">
            <CardTitle className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Own Education Center?
            </CardTitle>
            <CardContent className="p-0">
              <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
                Join the RITE Education family and become a part of a mission to empower the next generation with
                essential computer skills.
              </p>
              <Link href="/login-zone?action=franchise-register">
                <Button className="bg-white text-custom-blue hover:bg-gray-100 px-10 py-4 text-xl rounded-full shadow-lg transition-all duration-300">
                  Register as Franchise
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </main>
      <FooterSection />
    </div>
  )
}
