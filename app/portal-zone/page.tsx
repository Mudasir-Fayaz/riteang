"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { AdminDashboard } from "@/components/admin/dashboard"
import { TeacherDashboard } from "@/components/teacher/dashboard"
import { StudentDashboard } from "@/components/student/dashboard"
import { FranchiseDashboard } from "@/components/franchise/dashboard"
import { getStoredUser, clearStoredUser, type AuthUser } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { StudentSidebar } from "@/components/student/student-sidebar"

export default function PortalZonePage() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const { toast } = useToast()
  const router = useRouter()
  const [activeStudentView, setActiveStudentView] = useState("overview")

  useEffect(() => {
    const storedUser = getStoredUser()
    if (storedUser) {
      setUser(storedUser)
    } else {
      router.push("/login-zone", { scroll: true }) // Updated path
    }
  }, [router])

  const handleLogout = () => {
    clearStoredUser()
    setUser(null)
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
    router.push("/login-zone", { scroll: true }) // Updated path
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={handleLogout} />
      {user.role === "admin" && <AdminDashboard user={user} />}
      {user.role === "teacher" && <TeacherDashboard user={user} />}
      {user.role === "student" && (
        <SidebarProvider>
          <StudentSidebar activeView={activeStudentView} setActiveView={setActiveStudentView} />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
              <SidebarTrigger className="-ml-1" />
              <h1 className="text-lg font-semibold">Student Dashboard</h1>
            </header>
            <StudentDashboard user={user} activeView={activeStudentView} />
          </SidebarInset>
        </SidebarProvider>
      )}
      {user.role === "franchise" && <FranchiseDashboard user={user} />}
    </div>
  )
}
