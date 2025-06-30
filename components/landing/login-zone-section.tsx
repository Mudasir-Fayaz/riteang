import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function LoginZoneSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50" id="login-zone">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-custom-red mb-12">Login Zone</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-custom-blue">Admin Portal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Manage users, courses, and system settings.</p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-custom-blue">Teachers Portal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Access teaching resources and manage classes.</p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-custom-blue">Students Portal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Enroll in courses, track progress, and view certificates.</p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-custom-blue">Franchise Portal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Manage your franchise operations and resources.</p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-12">
          <Link href="/login-zone">
            <Button className="bg-custom-red text-white hover:bg-custom-blue px-8 py-3 text-lg rounded-full shadow-lg transition-all duration-300 flex items-center mx-auto">
              Access Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
