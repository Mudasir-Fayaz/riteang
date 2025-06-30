"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Clock, DollarSign, Award } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface CourseCardLandingProps {
  id?: number // Made optional as it's not always used for static data
  title: string
  description: string
  imageSrc?: string
  duration?: string
  fee?: number | null
  certification_given?: boolean
}

export function CourseCardLanding({
  id,
  title,
  description,
  imageSrc,
  duration,
  fee,
  certification_given,
}: CourseCardLandingProps) {
  return (
    <Card className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-col items-center text-center p-4 pb-2">
        {imageSrc ? (
          <img
            src={imageSrc || "https://cdn-icons-png.flaticon.com/512/1754/1754435.png"}
            alt={title}
            width={80}
            height={80}
            className="rounded-full object-cover mb-3"
          />
        ) : (
          <BookOpen className="h-12 w-12 text-custom-blue mb-3" />
        )}
        <CardTitle className="text-2xl font-semibold text-gray-800">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-4 pt-0 text-center">
        <p className="text-gray-600 text-base mb-4 line-clamp-4">{description}</p>
        <div className="flex flex-col items-center space-y-2 text-gray-700 mb-6">
          {duration && (
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-2 text-gray-500" />
              <span>Duration: {duration}</span>
            </div>
          )}
          {/* {fee !== undefined && (
            <div className="flex items-center text-sm">
              <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
              <span>Fee: {fee ? `₹${fee.toFixed(2)}` : "Free"}</span>
            </div>
          )} */}
          {certification_given !== undefined && (
            <div className="flex items-center text-sm">
              <Award className="h-4 w-4 mr-2 text-gray-500" />
              <span>Certification: {certification_given ? "Yes" : "No"}</span>
            </div>
          )}
        </div>
        <Link href="/login-zone">
          <Button className="bg-custom-red hover:bg-custom-red/90 text-white w-full py-3 text-lg">Enroll Now</Button>
        </Link>
      </CardContent>
    </Card>
  )
}
