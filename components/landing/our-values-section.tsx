import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Target, Globe2 } from "lucide-react"

export function OurValuesSection() {
  const values = [
    {
      title: "Our Mission",
      icon: Target,
      description:
        "To empower learners of all backgrounds with industry-relevant computer education, practical skills, and the confidence to excel in a technology-driven world.",
    },
    {
      title: "Our Vision",
      icon: Globe2,
      description:
        "To be the leading institute in South Kashmir that fosters innovation, lifelong learning, and global perspectives through cutting-edge curricula and expert mentorship.",
    },
  ]

  return (
    <section
      id="our-values"
      className={cn(
        "w-full bg-blue-50 py-16 lg:py-24",
        // keep text easily readable on blue tint
        "text-gray-800",
      )}
    >
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-red-600">Our Values</h2>

        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {values.map(({ title, icon: Icon, description }) => (
            <Card key={title} className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8 flex flex-col items-center text-center gap-4">
                <Icon size={48} className="text-red-600" />
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-sm leading-relaxed">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
