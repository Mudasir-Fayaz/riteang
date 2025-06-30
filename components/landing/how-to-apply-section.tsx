import { HowToApplyCard } from "./how-to-apply-card"
import { Lightbulb, UserPlus, BookOpen, Rocket } from "lucide-react"

export function HowToApplySection() {
  const steps = [
    {
      icon: Lightbulb,
      title: "Get Instant Access To Expert Solution",
      description:
        "The ultimate planning solution for busy individuals who want to reach their personal goals. Effortless, comfortable, eye-catching, unique detail.",
    },
    {
      icon: UserPlus,
      title: "Register/Login Student",
      description: "Explore growth at our institute, where the right mentorship fuels your professional journey.",
    },
    {
      icon: BookOpen,
      title: "Enroll Your Course",
      description:
        "Enroll in our courses and kickstart your journey to success. Join us today for a brighter tomorrow!",
    },
    {
      icon: Rocket,
      title: "Start From Now",
      description: "Start your journey to success now. Your path to a brighter future begins today!",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">How To Apply</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <HowToApplyCard key={index} icon={step.icon} title={step.title} description={step.description} />
          ))}
        </div>
      </div>
    </section>
  )
}
