"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Home } from "@/components/guest/home"
import { LoginForm } from "@/components/auth/login-form"
import { StudentRegister } from "@/components/auth/student-register"
import { FranchiseRegister } from "@/components/auth/franchise-register"
import { CertificateVerify } from "@/components/guest/certificate-verify"
import { AdminDashboard } from "@/components/admin/dashboard"
import { TeacherDashboard } from "@/components/teacher/dashboard"
import { StudentDashboard } from "@/components/student/dashboard"
import { FranchiseDashboard } from "@/components/franchise/dashboard"
import { loginUser, registerStudent, registerFranchise, type AuthUser, type UserRole } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"

type AppState = "home" | "login" | "register" | "franchise-register" | "certificate-verify" | "dashboard"

export default function App() {
  const [appState, setAppState] = useState<AppState>("home")
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const [user, setUser] = useState<AuthUser | null>(null)
  const { toast } = useToast()

  const handleLoginSelect = (role: UserRole) => {
    setSelectedRole(role)
    setAppState("login")
  }

  const handleLogin = async (username: string, password: string, role: UserRole): Promise<boolean> => {
    const authUser = await loginUser(username, password, role)
    if (authUser) {
      setUser(authUser)
      setAppState("dashboard")
      toast({
        title: "Login Successful",
        description: `Welcome back, ${authUser.username}!`,
      })
      return true
    } else {
      // The LoginForm will now handle displaying the "Invalid username or password" message.
      // For franchise, it will also cover "account not approved" implicitly.
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
      setSelectedRole("student")
      setAppState("login")
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
      setSelectedRole("franchise")
      setAppState("login")
    } else {
      toast({
        title: "Registration Failed",
        description: result.message,
        variant: "destructive",
      })
    }
  }

  const handleLogout = () => {
    setUser(null)
    setSelectedRole(null)
    setAppState("home")
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
  }

  const handleBack = () => {
    setAppState("home")
    setSelectedRole(null)
  }

  const renderContent = () => {
    switch (appState) {
      case "home":
        return (
          <Home
            onLoginSelect={handleLoginSelect}
            onRegisterSelect={() => setAppState("register")}
            onCertificateVerify={() => setAppState("certificate-verify")}
            onFranchiseRegisterSelect={() => setAppState("franchise-register")}
          />
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
        return <CertificateVerify onBack={handleBack} />

      case "dashboard":
        if (!user) return null

        return (
          <div className="min-h-screen bg-gray-50">
            <Header user={user} onLogout={handleLogout} />
            {user.role === "admin" && <AdminDashboard />}
            {user.role === "teacher" && <TeacherDashboard user={user} />}
            {user.role === "student" && <StudentDashboard user={user} />}
            {user.role === "franchise" && <FranchiseDashboard user={user} />}
          </div>
        )

      default:
        return null
    }
  }

  return <>{renderContent()}</>
}
