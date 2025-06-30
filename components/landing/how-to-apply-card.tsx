import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface HowToApplyCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export function HowToApplyCard({ icon: Icon, title, description }: HowToApplyCardProps) {
  return (
    <Card className="flex flex-col items-center text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-col items-center">
        <Icon className="h-12 w-12 text-custom-red mb-4 mx-auto" />
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-gray-600">{description}</CardContent>
    </Card>
  )
}
