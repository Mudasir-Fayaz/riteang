import { ValueCard } from "./value-card"
import { Lightbulb, Users, GraduationCap, Handshake } from "lucide-react"

export function WhyChooseUsSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ValueCard
            icon={Lightbulb}
            title="Innovative Curriculum"
            description="Our courses are designed with the latest industry trends and technologies to ensure relevant and up-to-date knowledge."
          />
          <ValueCard
            icon={Users}
            title="Expert Faculty"
            description="Learn from experienced professionals and educators who are passionate about teaching and dedicated to your success."
          />
          <ValueCard
            icon={GraduationCap}
            title="Career Focused"
            description="We provide practical skills and career guidance to help you achieve your professional goals and secure rewarding opportunities."
          />
          <ValueCard
            icon={Handshake}
            title="Supportive Community"
            description="Join a vibrant community of learners and mentors, fostering collaboration and mutual growth."
          />
        </div>
      </div>
    </section>
  )
}
