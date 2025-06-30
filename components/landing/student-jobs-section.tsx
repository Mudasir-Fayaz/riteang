import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { GraduationCap, Award, Briefcase, Users, TrendingUp, ArrowRight, Star } from "lucide-react"

export function StudentJobsSection() {
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
  
  const highlights = [
    {
      icon: TrendingUp,
      title: "95% Placement Rate",
      description: "Our students get placed in top companies",
    },
    {
      icon: Users,
      title: "100+ Partner Companies",
      description: "Direct connections with industry leaders",
    },
    {
      icon: Award,
      title: "Industry Certifications",
      description: "Recognized credentials that employers value",
    },
  ]

  const process = [
    { step: "Enroll", icon: Users, color: "bg-blue-500" },
    { step: "Learn", icon: GraduationCap, color: "bg-green-500" },
    { step: "Certify", icon: Award, color: "bg-purple-500" },
    { step: "Get Hired", icon: Briefcase, color: "bg-orange-500" },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-custom-blue text-white mb-4 px-4 py-2 text-sm font-medium">
            🚀 Career Opportunities
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">From Student to Professional</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete your course, earn certification, and get placed in top companies through our exclusive job
            placement program.
          </p>
        </div>

      
 <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            {/* <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose RITE Jobs?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get exclusive benefits and support throughout your career journey
              </p>
            </div> */}

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
        {/* Stats Row */}
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="text-3xl font-bold text-custom-blue mb-2">500+</div>
            <div className="text-gray-600">Students Placed</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="text-3xl font-bold text-green-500 mb-2">₹6L</div>
            <div className="text-gray-600">Average Package</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="text-3xl font-bold text-purple-500 mb-2">50+</div>
            <div className="text-gray-600">Job Categories</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="text-3xl font-bold text-orange-500 mb-2">24/7</div>
            <div className="text-gray-600">Career Support</div>
          </div>
        </div> */}

        {/* CTA */}
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Transform Your Career?</h3>
            <p className="text-gray-600 mb-6">
              Join our job placement program and take the first step towards your dream career.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/student-jobs">
                <Button
                  size="lg"
                  className="bg-custom-red hover:bg-red-700 px-8 py-3 text-lg font-semibold rounded-full shadow-lg"
                >
                  Explore Job Opportunities
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/student-zone">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-custom-blue text-custom-blue hover:bg-custom-blue hover:text-white px-8 py-3 text-lg font-semibold rounded-full bg-transparent"
                >
                  Start Learning Today
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
