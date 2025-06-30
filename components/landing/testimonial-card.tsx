import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface TestimonialCardProps {
  name: string
  title: string
  review: string
  imageSrc?: string
}

export function TestimonialCard({
  name,
  title,
  review,
  imageSrc = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Star_icon_stylized.svg/2153px-Star_icon_stylized.svg.png",
}: TestimonialCardProps) {
  return (
    <Card className="flex flex-col items-center text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
      <img
        src={imageSrc || "/placeholder.svg"}
        alt={name}
        width={80}
        height={80}
        className="rounded-full object-cover mb-4 border-2 border-custom-blue"
      />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
      <p className="text-custom-red text-sm font-medium mb-4">{title}</p>
      <CardContent className="p-0">
        <p className="text-gray-600 italic leading-relaxed">&ldquo;{review}&rdquo;</p>
      </CardContent>
    </Card>
  )
}
