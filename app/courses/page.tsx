"use client"

import { LandingHeader } from "@/components/landing/landing-header"
import { FooterSection } from "@/components/landing/footer-section"
import { CourseCardLanding } from "@/components/landing/course-card-landing"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CoursesPage() {
  const staticCourseCategories = [
    {
      id: 1,
      title: "Top Courses",
      description: "Explore our most popular and highly-rated courses.",
      imageSrc: "https://cdn-icons-png.flaticon.com/512/1754/1754435.png",
      duration: "Varies",
      fee: null,
      certification_given: true,
    },
    {
      id: 2,
      title: "3 Month Courses",
      description: "Short-term courses designed for quick skill acquisition.",
      imageSrc: "https://cdn-icons-png.flaticon.com/512/1754/1754435.png",
      duration: "3 Months",
      fee: 5000,
      certification_given: true,
    },
    {
      id: 3,
      title: "6 Month Courses",
      description: "Mid-term programs for in-depth learning and practical skills.",
      imageSrc: "https://cdn-icons-png.flaticon.com/512/1754/1754435.png",
      duration: "6 Months",
      fee: 10000,
      certification_given: true,
    },
    {
      id: 4,
      title: "1 Year Courses",
      description: "Comprehensive year-long programs for career transformation.",
      imageSrc: "https://cdn-icons-png.flaticon.com/512/1754/1754435.png",
      duration: "1 Year",
      fee: 20000,
      certification_given: true,
    },
    {
      id: 5,
      title: "2 Years Course",
      description: "Extensive two-year programs for advanced specialization.",
      imageSrc: "https://cdn-icons-png.flaticon.com/512/1754/1754435.png",
      duration: "2 Years",
      fee: 35000,
      certification_given: true,
    },
    {
      id: 6,
      title: "Other Short-Term Computer Software Courses",
      description: "Quick courses in various software applications and programming.",
      imageSrc: "https://cdn-icons-png.flaticon.com/512/1754/1754435.png",
      duration: "Varies",
      fee: 3000,
      certification_given: false,
    },
    {
      id: 7,
      title: "Other Miscellaneous Computer Software Courses",
      description: "Diverse software courses covering niche and emerging technologies.",
      imageSrc: "https://cdn-icons-png.flaticon.com/512/1754/1754435.png",
      duration: "Varies",
      fee: 4500,
      certification_given: true,
    },
    {
      id: 8,
      title: "Computer Hardware Courses",
      description: "Learn about computer components, assembly, and troubleshooting.",
      imageSrc: "https://cdn-icons-png.flaticon.com/512/1754/1754435.png",
      duration: "Varies",
      fee: 7000,
      certification_given: true,
    },
    {
      id: 9,
      title: "SHORT-TERM COMPUTER HARDWARE COURSES LIST",
      description: "Quick modules on specific hardware topics like networking or repair.",
      imageSrc: "https://cdn-icons-png.flaticon.com/512/1754/1754435.png",
      duration: "Short-term",
      fee: 2500,
      certification_given: false,
    },
    {
      id: 10,
      title: "Skill Advancement Courses",
      description: "Courses to upgrade existing skills or learn new advanced techniques.",
      imageSrc: "https://cdn-icons-png.flaticon.com/512/1754/1754435.png",
      duration: "Varies",
      fee: 6000,
      certification_given: true,
    },
    {
      id: 11,
      title: "Top Job Oriented Courses",
      description: "Courses specifically designed to enhance employability and career prospects.",
      imageSrc: "https://cdn-icons-png.flaticon.com/512/1754/1754435.png",
      duration: "Varies",
      fee: 12000,
      certification_given: true,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <main className="flex-1 py-12 md:py-20 bg-gray-50">
        <section className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-8">Our Courses</h2>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            Discover a wide range of courses designed to help you achieve your academic and career goals.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {staticCourseCategories.map((course) => (
              <CourseCardLanding key={course.id} {...course} />
            ))}
          </div>
          <div className="mt-12">
            <Link href="/login-zone">
              <Button className="bg-custom-red hover:bg-custom-red/90 text-white px-8 py-3 text-lg">
                Enroll Now for Any Course
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  )
}
