import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LandingHeader } from "@/components/landing/landing-header"
import { FooterSection } from "@/components/landing/footer-section"
import {
  BookOpen,
  BadgeIcon as Certificate,
  Users,
  Clock,
  Award,
  Briefcase,
  CheckCircle,
  Star,
  ArrowRight,
  GraduationCap,
  Target,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
  { name: "Courses", href: "/courses" },
  { name: "Franchise", href: "/franchise" },
  { name: "Login Zone", href: "/login-zone" },
  { name: "Contact Us", href: "/contact-us" },
  { name: "Verify Certificate", href: "/#verify-certificate" },
]

const benefits = [
  {
    icon: BookOpen,
    title: "Quality Education",
    description: "Access to comprehensive courses designed by industry experts",
  },
  {
    icon: Certificate,
    title: "Certified Programs",
    description: "Earn recognized certificates upon successful completion",
  },
  {
    icon: Users,
    title: "Expert Instructors",
    description: "Learn from experienced professionals in their respective fields",
  },
  {
    icon: Clock,
    title: "Flexible Learning",
    description: "Study at your own pace with 24/7 access to course materials",
  },
  {
    icon: Award,
    title: "Industry Recognition",
    description: "Certificates valued by employers across various industries",
  },
  {
    icon: Briefcase,
    title: "Career Support",
    description: "Job placement assistance and career guidance services",
  },
]

const steps = [
  {
    step: "01",
    title: "Browse Courses",
    description: "Explore our wide range of courses and find the perfect fit for your career goals",
    icon: BookOpen,
  },
  {
    step: "02",
    title: "Create Account",
    description: "Sign up for a student account with your basic information and preferences",
    icon: Users,
  },
  {
    step: "03",
    title: "Enroll & Pay",
    description: "Choose your course, complete the enrollment process and make payment",
    icon: CheckCircle,
  },
  {
    step: "04",
    title: "Start Learning",
    description: "Access course materials, attend classes, and begin your learning journey",
    icon: GraduationCap,
  },
]

const features = [
  {
    icon: Target,
    title: "Personalized Learning Path",
    description: "Customized curriculum based on your skill level and career objectives",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Monitor your learning progress with detailed analytics and reports",
  },
  {
    icon: Star,
    title: "Interactive Content",
    description: "Engaging multimedia content including videos, quizzes, and practical exercises",
  },
]

export default function StudentZonePage() {
  return (
    <div className="min-h-screen bg-white">
      <LandingHeader navLinks={navLinks} />

      {/* Hero Section */}
      {/* <section className="relative bg-gradient-to-br from-custom-blue via-blue-600 to-custom-red text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">Student Zone</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Transform Your Future with
              <span className="block text-yellow-300">Quality Education</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
              Join thousands of students who have advanced their careers through our comprehensive courses and expert
              guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login-zone">
                <Button
                  size="lg"
                  className="bg-white text-custom-blue hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Login as Student
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login-zone">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-custom-blue px-8 py-4 text-lg font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 bg-transparent"
                >
                  Sign Up Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-1 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section> */}

      {/* How to Apply Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How to Apply for Courses</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Getting started with RITE Education is simple. Follow these easy steps to begin your learning journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <Card
                key={index}
                className="relative bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-custom-red"
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-custom-red to-red-600 rounded-full flex items-center justify-center">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-3 left-4 bg-custom-blue text-white px-3 py-1 rounded-full text-sm font-bold">
                    {step.step}
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose RITE Education?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the benefits that make us the preferred choice for quality education and career advancement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-custom-blue to-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Student Experience Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enjoy a comprehensive learning experience with features designed to maximize your success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border-0"
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-custom-red to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join our community of learners and take the first step towards achieving your career goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login-zone">
              <Button
                size="lg"
                className="bg-white text-custom-red hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/courses">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-custom-red px-8 py-4 text-lg font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 bg-transparent"
              >
                Browse Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  )
}
