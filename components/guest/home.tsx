"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { UserRole } from "@/lib/auth"
import { GraduationCap, Users, Shield, Store } from "lucide-react" // Import Store icon

interface HomeProps {
  onLoginSelect: (role: UserRole) => void
  onRegisterSelect: () => void
  onCertificateVerify: () => void
  onFranchiseRegisterSelect: () => void // New prop for franchise register
}

export function Home({ onLoginSelect, onRegisterSelect, onCertificateVerify, onFranchiseRegisterSelect }: HomeProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-2 md:px-4 py-4 md:py-8">
        <div className="text-center mb-6 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-blue-600 mb-2 md:mb-4">RITE Education</h1>
          <p className="text-lg md:text-xl text-gray-600 mb-4 md:mb-8 px-2">
            Empowering minds through quality education management
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6 mb-6 md:mb-12">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onLoginSelect("admin")}>
            <CardHeader className="text-center p-2 md:p-6">
              <Shield className="h-8 w-8 md:h-12 md:w-12 mx-auto text-red-500 mb-1 md:mb-2" />
              <CardTitle>Admin Login</CardTitle>
            </CardHeader>
            <CardContent className="p-2 md:p-6 pt-0">
              <p className="text-xs md:text-sm text-gray-600 text-center">Manage courses, teachers, and students</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onLoginSelect("teacher")}>
            <CardHeader className="text-center p-2 md:p-6">
              <Users className="h-8 w-8 md:h-12 md:w-12 mx-auto text-green-500 mb-1 md:mb-2" />
              <CardTitle>Teacher Login</CardTitle>
            </CardHeader>
            <CardContent className="p-2 md:p-6 pt-0">
              <p className="text-xs md:text-sm text-gray-600 text-center">View and manage your students</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center p-2 md:p-6">
              <GraduationCap className="h-8 w-8 md:h-12 md:w-12 mx-auto text-blue-500 mb-1 md:mb-2" />
              <CardTitle>Student Access</CardTitle>
            </CardHeader>
            <CardContent className="p-2 md:p-6 pt-0 flex flex-col gap-2">
              <Button onClick={() => onLoginSelect("student")} className="w-full">
                Login
              </Button>
              <Button onClick={onRegisterSelect} variant="outline" className="w-full">
                Register
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center p-2 md:p-6">
              <Store className="h-8 w-8 md:h-12 md:w-12 mx-auto text-purple-500 mb-1 md:mb-2" />
              <CardTitle>Franchise Access</CardTitle>
            </CardHeader>
            <CardContent className="p-2 md:p-6 pt-0 flex flex-col gap-2">
              <Button onClick={() => onLoginSelect("franchise")} className="w-full">
                Login
              </Button>
              <Button onClick={onFranchiseRegisterSelect} variant="outline" className="w-full">
                Register
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button onClick={onCertificateVerify} variant="outline" size="lg">
            Verify Certificate
          </Button>
        </div>
      </div>
    </div>
  )
}
