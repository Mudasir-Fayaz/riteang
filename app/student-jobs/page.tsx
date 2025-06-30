import { LandingHeader } from "@/components/landing/landing-header"
import { FooterSection } from "@/components/landing/footer-section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { GraduationCap, Award, Briefcase, Users, TrendingUp, ArrowRight, DollarSign, Star } from "lucide-react"

export default function StudentJobsPage() {
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

  const steps = [
    {
      number: "01",
      title: "Enroll as Student",
      description: "Register with RITE Education and choose your preferred course from our comprehensive curriculum.",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      number: "02",
      title: "Complete Course",
      description: "Attend classes, complete assignments, and gain practical skills through hands-on projects.",
      icon: GraduationCap,
      color: "bg-green-500",
    },
    {
      number: "03",
      title: "Get Certified",
      description: "Pass your final examination and receive industry-recognized certification from RITE Education.",
      icon: Award,
      color: "bg-purple-500",
    },
    {
      number: "04",
      title: "Apply for Jobs",
      description: "Access exclusive job opportunities through our placement program and start your career.",
      icon: Briefcase,
      color: "bg-orange-500",
    },
  ]

  const benefits = [
    {
      title: "100% Placement Assistance",
      description: "Dedicated placement team to help you find the right job opportunity",
      icon: TrendingUp,
    },
    {
      title: "Industry Partnerships",
      description: "Direct connections with leading companies in the tech industry",
      icon: Users,
    },
    {
      title: "Skill Development",
      description: "Continuous learning and skill enhancement programs",
      icon: GraduationCap,
    },
    {
      title: "Career Guidance",
      description: "One-on-one mentoring and career counseling sessions",
      icon: Star,
    },
  ]

  const jobCategories = [
    {
      title: "Software Development",
      positions: "150+ Openings",
      salary: "₹3-8 LPA",
      companies: "50+ Companies",
      skills: ["Java", "Python", "React", "Node.js"],
    },
    {
      title: "Web Development",
      positions: "120+ Openings",
      salary: "₹2.5-6 LPA",
      companies: "40+ Companies",
      skills: ["HTML", "CSS", "JavaScript", "PHP"],
    },
    {
      title: "Data Analytics",
      positions: "80+ Openings",
      salary: "₹4-10 LPA",
      companies: "30+ Companies",
      skills: ["SQL", "Python", "Tableau", "Excel"],
    },
    {
      title: "Digital Marketing",
      positions: "100+ Openings",
      salary: "₹2-5 LPA",
      companies: "60+ Companies",
      skills: ["SEO", "SEM", "Social Media", "Analytics"],
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader navLinks={navLinks} />

      <main className="flex-1">
        {/* Hero Section */}
        {/* <section className="relative bg-gradient-to-br from-custom-blue via-purple-600 to-custom-red text-white py-20 md:py-32 overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-4xl mx-auto">
              <Badge className="bg-white/20 text-white border-white/30 mb-6 px-4 py-2 text-sm font-medium">
                🚀 Career Opportunities Await
              </Badge>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                Your Journey to a<span className="block text-yellow-300">Successful Career</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
                Complete your course, earn certification, and get placed in top companies through RITE Education's
                exclusive job placement program.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/student-zone">
                  <Button
                    size="lg"
                    className="bg-white text-custom-blue hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-lg"
                  >
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/courses">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-custom-blue px-8 py-4 text-lg font-semibold rounded-full bg-transparent"
                  >
                    View Courses
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-black/20"></div>
        </section> */}

        {/* How It Works Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Follow our proven 4-step process to transform your career and land your dream job
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <Card
                  key={index}
                  className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
                >
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-300 mb-2">{step.number}</div>
                    <CardTitle className="text-xl font-bold text-gray-900">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 text-center leading-relaxed">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                      <ArrowRight className="h-8 w-8 text-gray-300" />
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Job Categories Section */}
        {/* <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Available Job Categories</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore diverse career opportunities across multiple industries and technologies
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {jobCategories.map((category, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden"
                >
                  <CardHeader className="bg-gradient-to-r from-custom-blue to-custom-red text-white">
                    <CardTitle className="text-lg font-bold">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Briefcase className="h-4 w-4 mr-2 text-custom-blue" />
                        {category.positions}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="h-4 w-4 mr-2 text-green-500" />
                        {category.salary}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-2 text-purple-500" />
                        {category.companies}
                      </div>
                      <div className="pt-2">
                        <p className="text-xs text-gray-500 mb-2">Key Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {category.skills.map((skill, skillIndex) => (
                            <Badge key={skillIndex} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section> */}

        {/* Benefits Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose RITE Jobs?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get exclusive benefits and support throughout your career journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <Card
                  key={index}
                  className="text-center group hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
                >
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-r from-custom-blue to-custom-red rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <benefit.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 leading-relaxed">{benefit.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stats Section */}
        {/* <section className="py-20 bg-gradient-to-r from-custom-blue to-custom-red text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Our Success Story</h2>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                Numbers that speak for our commitment to student success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">95%</div>
                <div className="text-lg opacity-90">Placement Rate</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">500+</div>
                <div className="text-lg opacity-90">Students Placed</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">100+</div>
                <div className="text-lg opacity-90">Partner Companies</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">₹6L</div>
                <div className="text-lg opacity-90">Average Package</div>
              </div>
            </div>
          </div>
        </section> */}

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Start Your Career Journey?</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Join thousands of successful students who have transformed their careers through RITE Education's job
                placement program.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/student-zone">
                  <Button
                    size="lg"
                    className="bg-custom-red hover:bg-red-700 px-8 py-4 text-lg font-semibold rounded-full shadow-lg"
                  >
                    Enroll Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contact-us">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-custom-blue text-custom-blue hover:bg-custom-blue hover:text-white px-8 py-4 text-lg font-semibold rounded-full bg-transparent"
                  >
                    Get More Info
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  )
}
