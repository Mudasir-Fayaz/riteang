"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { LoginForm } from "@/components/auth/login-form"
import { StudentRegister } from "@/components/auth/student-register"
import { FranchiseRegister } from "@/components/auth/franchise-register"
import { CertificateVerify } from "@/components/guest/certificate-verify"
import { loginUser, registerStudent, registerFranchise, storeUser, clearStoredUser, type UserRole } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LandingHeader } from "@/components/landing/landing-header"
import { FooterSection } from "@/components/landing/footer-section"
import { Shield, GraduationCap, Users, Building, Award } from "lucide-react"

type GuestAppState = "home" | "login" | "register" | "franchise-register" | "certificate-verify"

export default function LoginZonePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  // Function to derive initial state from URL params
  const getInitialState = () => {
    const portalParam = searchParams.get("portal")
    switch (portalParam) {
      case "admin-login":
        return { appState: "login" as GuestAppState, role: "admin" as UserRole }
      case "teacher-login":
        return { appState: "login" as GuestAppState, role: "teacher" as UserRole }
      case "student-login":
        return { appState: "login" as GuestAppState, role: "student" as UserRole }
      case "franchise-login":
        return { appState: "login" as GuestAppState, role: "franchise" as UserRole }
      case "student-register":
        return { appState: "register" as GuestAppState, role: null }
      case "franchise-register":
        return { appState: "franchise-register" as GuestAppState, role: null }
      case "certificate-verify":
        return { appState: "certificate-verify" as GuestAppState, role: null }
      default:
        return { appState: "home" as GuestAppState, role: null }
    }
  }

  // Initialize state based on URL params
  const [guestAppState, setGuestAppState] = useState<GuestAppState>(getInitialState().appState)
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(getInitialState().role)

  // Scroll to top when state changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [guestAppState])

  // Update state if URL params change (e.g., user navigates directly or uses browser back/forward)
  useEffect(() => {
    const { appState, role } = getInitialState()
    setGuestAppState(appState)
    setSelectedRole(role)
  }, [searchParams]) // Re-run effect when searchParams change

  const handleLoginSelect = (role: UserRole) => {
    let portalParam: string
    switch (role) {
      case "admin":
        portalParam = "admin-login"
        break
      case "teacher":
        portalParam = "teacher-login"
        break
      case "student":
        portalParam = "student-login"
        break
      case "franchise":
        portalParam = "franchise-login"
        break
      default:
        portalParam = "" // Should not happen
    }
    router.push(`/login-zone?portal=${portalParam}`)
    // Scroll to top immediately
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100)
  }

  const handleLogin = async (username: string, password: string, role: UserRole): Promise<boolean> => {
    const authUser = await loginUser(username, password, role)
    if (authUser) {
      storeUser(authUser) // Store user in localStorage
      toast({
        title: "Login Successful",
        description: `Welcome back, ${authUser.username}!`,
      })
      router.push("/portal-zone") // Redirect to dashboard
      return true
    } else {
      return false
    }
  }

  const handleStudentRegister = async (data: {
    name: string
    phone: string
    username: string
    password: string
    address: string
    qualification: string
  }) => {
    const result = await registerStudent(data)
    if (result.success) {
      toast({
        title: "Registration Successful",
        description: result.message,
      })
      // After successful registration, redirect to login for student
      router.push(`/login-zone?portal=student-login`)
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100)
    } else {
      toast({
        title: "Registration Failed",
        description: result.message,
        variant: "destructive",
      })
    }
  }

  const handleFranchiseRegister = async (data: {
    name: string
    phone: string
    email: string
    qualification: string
    address: string
    username: string
    password: string
  }) => {
    const result = await registerFranchise(data)
    if (result.success) {
      toast({
        title: "Registration Successful",
        description: result.message,
      })
      // After successful registration, redirect to login for franchise
      router.push(`/login-zone?portal=franchise-login`)
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100)
    } else {
      toast({
        title: "Registration Failed",
        description: result.message,
        variant: "destructive",
      })
    }
  }

  const handleBack = () => {
    router.push("/login-zone") // Navigate back to base guest zone URL
    clearStoredUser() // Clear stored user if navigating back from a login/register state
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100)
  }

  const handleRegisterClick = (type: "student" | "franchise") => {
    const portalParam = type === "student" ? "student-register" : "franchise-register"
    router.push(`/login-zone?portal=${portalParam}`)
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100)
  }

  const handleVerifyCertificate = () => {
    router.push("/login-zone?portal=certificate-verify")
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100)
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Courses", href: "/courses" },
    { name: "Student Zone", href: "/student-zone" },
    { name: "Student Jobs", href: "/student-jobs" },
    { name: "Franchise", href: "/franchise" },
    { name: "Login Zone", href: "/login-zone" },
    { name: "Contact Us", href: "/contact-us" },
  ]

  const portalCards = [
    {
      title: "Admin Portal",
      description: "Manage the entire education platform, users, courses, and system settings.",
      icon: Shield,
      role: "admin" as UserRole,
      color: "bg-red-50 border-red-200 hover:bg-red-100",
      iconColor: "text-red-600",
      hasRegister: false,
    },
    {
      title: "Teacher Portal",
      description: "Access teaching tools, manage courses, track student progress, and create content.",
      icon: GraduationCap,
      role: "teacher" as UserRole,
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
      iconColor: "text-blue-600",
      hasRegister: false,
    },
    {
      title: "Student Portal",
      description: "Access your courses, track progress, view certificates, and apply for jobs.",
      icon: Users,
      role: "student" as UserRole,
      color: "bg-green-50 border-green-200 hover:bg-green-100",
      iconColor: "text-green-600",
      hasRegister: true,
      registerAction: () => handleRegisterClick("student"),
    },
    {
      title: "Franchise Portal",
      description: "Manage your franchise operations, students, and business analytics.",
      icon: Building,
      role: "franchise" as UserRole,
      color: "bg-purple-50 border-purple-200 hover:bg-purple-100",
      iconColor: "text-purple-600",
      hasRegister: true,
      registerAction: () => handleRegisterClick("franchise"),
    },
  ]

  const renderContent = () => {
    switch (guestAppState) {
      case "home":
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Access Your Portal</h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Choose your portal to access personalized features, manage your account, and explore our educational
                  platform.
                </p>
              </div>

              {/* Portal Cards */}
              <div className="mb-16">
                <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Login Portals</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {portalCards.map((portal) => {
                    const IconComponent = portal.icon
                    return (
                      <Card
                        key={portal.role}
                        className={`${portal.color} transition-all duration-300 hover:shadow-lg hover:scale-105 border-2`}
                      >
                        <CardHeader className="text-center pb-4">
                          <div
                            className={`w-16 h-16 mx-auto mb-4 rounded-full bg-white flex items-center justify-center shadow-md`}
                          >
                            <IconComponent className={`w-8 h-8 ${portal.iconColor}`} />
                          </div>
                          <CardTitle className="text-xl font-semibold text-gray-900">{portal.title}</CardTitle>
                          <CardDescription className="text-sm text-gray-600 leading-relaxed">
                            {portal.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0 space-y-3">
                          <Button onClick={() => handleLoginSelect(portal.role)} className="w-full" size="lg">
                            Login
                          </Button>
                          {portal.hasRegister && (
                            <Button
                              onClick={portal.registerAction}
                              variant="outline"
                              className="w-full bg-transparent"
                              size="lg"
                            >
                              Register
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>

              {/* Certificate Verification Card */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Other Services</h2>
                <div className="flex justify-center">
                  <Card className="bg-indigo-50 border-indigo-200 hover:bg-indigo-100 transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 max-w-md">
                    <CardHeader className="text-center pb-4">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white flex items-center justify-center shadow-md">
                        <Award className="w-8 h-8 text-indigo-600" />
                      </div>
                      <CardTitle className="text-xl font-semibold text-gray-900">Certificate Verification</CardTitle>
                      <CardDescription className="text-sm text-gray-600 leading-relaxed">
                        Verify the authenticity of RITE Education certificates using our secure system.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Button
                        onClick={handleVerifyCertificate}
                        variant="outline"
                        className="w-full bg-transparent"
                        size="lg"
                      >
                        Verify Certificate
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        )

      case "login":
        return selectedRole ? (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <LoginForm role={selectedRole} onLogin={handleLogin} onBack={handleBack} />
          </div>
        ) : null

      case "register":
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <StudentRegister onRegister={handleStudentRegister} onBack={handleBack} />
          </div>
        )

      case "franchise-register":
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <FranchiseRegister onRegister={handleFranchiseRegister} onBack={handleBack} />
          </div>
        )

      case "certificate-verify":
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <CertificateVerify />
            <div className="absolute bottom-4">
              <Button type="button" variant="outline" onClick={handleBack}>
                Back
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader navLinks={navLinks} />
      <main className="flex-1">{renderContent()}</main>
      <FooterSection />
    </div>
  )
}
