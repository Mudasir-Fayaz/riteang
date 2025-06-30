import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function AboutSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2">
          <img
            src="https://riteeducation.in/wp-content/uploads/2024/07/WhatsApp-Image-2024-07-26-at-4.05.12-PM-e1721991306487.jpeg" // Replaced blob URL
            alt="About Us"
            width={500}
            height={250}
            className="rounded-xl shadow-2xl transform transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">About RITE Education</h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            RITE Education is dedicated to providing high-quality, accessible education to students worldwide. Our
            mission is to empower individuals with the knowledge and skills they need to succeed in their careers and
            personal lives. We offer a diverse range of courses, taught by experienced educators, designed to meet the
            evolving demands of various industries.
          </p>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            With a focus on practical learning and real-world application, we strive to create an engaging and
            supportive learning environment. Our commitment to excellence ensures that every student receives the best
            possible educational experience.
          </p>
          <Link href="/about-us">
            <Button className="bg-custom-blue hover:bg-custom-blue/90 text-white px-8 py-3 text-lg rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
