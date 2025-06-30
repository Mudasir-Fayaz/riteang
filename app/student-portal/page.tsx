"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { StudentDashboard } from "@/components/student/dashboard"
import { StudentSidebar } from "@/components/student/student-sidebar"
import { getStoredUser } from "@/lib/auth"
import type { AuthUser } from "@/lib/auth"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"

export default function StudentPortalPage() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [activeView, setActiveView] = useState("overview")
  const router = useRouter()

  useEffect(() => {
    const authUser = getStoredUser()
    if (!authUser || authUser.role !== "student") {
      router.push("/login-zone")
      return
    }
    setUser(authUser)
  }, [router])

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <StudentSidebar activeView={activeView} setActiveView={setActiveView} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
          <SidebarTrigger className="-ml-1" />
          <h1 className="text-2xl font-bold">Student Portal</h1>
        </header>
        <div className="flex flex-1 flex-col bg-gray-50">
          <StudentDashboard user={user} activeView={activeView} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
