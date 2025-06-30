"use client"

import { CourseCardLanding } from "@/components/landing/course-card-landing"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function TopCoursesSection() {
  const staticCourses = [
    {
      id: 1,
      title: "3 Month Courses",
      description: "Short-term courses designed for quick skill acquisition.",
      duration: "3 Months",
      imageSrc: "https://cdn-icons-png.flaticon.com/512/1754/1754435.png",
    },
    {
      id: 2,
      title: "6 Month Courses",
      description: "Mid-term programs for in-depth learning and practical skills.",
      duration: "6 Months",
      imageSrc: "https://cdn-icons-png.flaticon.com/512/1754/1754435.png",
    },
    {
      id: 3,
      title: "1 Year Courses",
      description: "Comprehensive year-long programs for career transformation.",
      duration: "1 Year",
      imageSrc: "https://cdn-icons-png.flaticon.com/512/1754/1754435.png",
    },
  ]

  return (
    <section className="py-12 md:py-20 bg-gray-100">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Top Courses</h2>
        <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
          Explore our most popular and highly-rated courses designed to boost your skills and career.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {staticCourses.map((course) => (
            <CourseCardLanding key={course.id} {...course} />
          ))}
        </div>
        <div className="mt-12">
          <Link href="/courses">
            <Button className="bg-custom-red hover:bg-custom-red/90 text-white px-8 py-3 text-lg">
              View All Courses
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
