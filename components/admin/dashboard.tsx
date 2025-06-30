"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, GraduationCap, Award, Building, Briefcase, MessageSquare, UserCheck, Bell } from "lucide-react"
import { CourseManagement } from "./course-management"
import { TeacherManagement } from "./teacher-management"
import { StudentManagement } from "./student-management"
import { CertificateManagement } from "./certificate-management"
import { NotificationManagement } from "./notification-management"
import { ExaminationManagement } from "./examination-management"
import { FranchiseManagement } from "./franchise-management"
import { JobManagement } from "./job-management"
import { AdminManagement } from "./admin-management"
import { ContactManagement } from "./contact-management"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

interface Stats {
  students: number
  teachers: number
  courses: number
  certificates: number
  franchises: number
  jobs: number
  contacts: number
  admins: number
}

const sidebarItems = [
  { id: "overview", label: "Overview", icon: Users },
  { id: "students", label: "Students", icon: Users },
  { id: "teachers", label: "Teachers", icon: UserCheck },
  { id: "courses", label: "Courses", icon: GraduationCap },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "examinations", label: "Examinations", icon: GraduationCap },
  { id: "franchises", label: "Franchises", icon: Building },
  { id: "jobs", label: "Jobs", icon: Briefcase },
  { id: "contacts", label: "Contact Messages", icon: MessageSquare },
  { id: "admins", label: "Admin Management", icon: UserCheck },
]

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [stats, setStats] = useState<Stats>({
    students: 0,
    teachers: 0,
    courses: 0,
    certificates: 0,
    franchises: 0,
    jobs: 0,
    contacts: 0,
    admins: 0,
  })
  const [loading, setLoading] = useState(true)

  const fetchStats = async () => {
    setLoading(true)
    try {
      console.log("Fetching admin dashboard stats...")

      const [
        studentsResult,
        teachersResult,
        coursesResult,
        certificatesResult,
        franchisesResult,
        jobsResult,
        contactsResult,
        adminsResult,
      ] = await Promise.all([
        supabase.from("students").select("id", { count: "exact", head: true }),
        supabase.from("teachers").select("id", { count: "exact", head: true }),
        supabase.from("courses").select("id", { count: "exact", head: true }),
        supabase.from("certificates").select("id", { count: "exact", head: true }),
        supabase.from("franchises").select("id", { count: "exact", head: true }),
        supabase.from("jobs").select("id", { count: "exact", head: true }),
        supabase.from("contacts").select("id", { count: "exact", head: true }),
        supabase.from("admins").select("id", { count: "exact", head: true }),
      ])

      console.log("Stats results:", {
        students: studentsResult.count,
        teachers: teachersResult.count,
        courses: coursesResult.count,
        certificates: certificatesResult.count,
        franchises: franchisesResult.count,
        jobs: jobsResult.count,
        contacts: contactsResult.count,
        admins: adminsResult.count,
      })

      setStats({
        students: studentsResult.count || 0,
        teachers: teachersResult.count || 0,
        courses: coursesResult.count || 0,
        certificates: certificatesResult.count || 0,
        franchises: franchisesResult.count || 0,
        jobs: jobsResult.count || 0,
        contacts: contactsResult.count || 0,
        admins: adminsResult.count || 0,
      })
    } catch (error) {
      console.error("Error fetching stats:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  const StatCard = ({ title, value, icon: Icon }: { title: string; value: number; icon: any }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{loading ? "..." : value}</div>
      </CardContent>
    </Card>
  )

  return (
    <SidebarProvider>
      <Sidebar className="bg-white border-r">
        <SidebarHeader className="border-b p-4">
          <h2 className="text-lg font-semibold">Admin Dashboard</h2>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Management</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton onClick={() => setActiveTab(item.id)} isActive={activeTab === item.id}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h1 className="text-xl font-semibold">
            {sidebarItems.find((item) => item.id === activeTab)?.label || "Admin Dashboard"}
          </h1>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total Students" value={stats.students} icon={Users} />
                <StatCard title="Total Teachers" value={stats.teachers} icon={UserCheck} />
                <StatCard title="Total Courses" value={stats.courses} icon={GraduationCap} />
                <StatCard title="Certificates Issued" value={stats.certificates} icon={Award} />
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Franchises" value={stats.franchises} icon={Building} />
                <StatCard title="Job Postings" value={stats.jobs} icon={Briefcase} />
                <StatCard title="Contact Messages" value={stats.contacts} icon={MessageSquare} />
                <StatCard title="Admins" value={stats.admins} icon={UserCheck} />
              </div>
            </div>
          )}
          {activeTab === "students" && <StudentManagement onUpdate={fetchStats} />}
          {activeTab === "teachers" && <TeacherManagement onUpdate={fetchStats} />}
          {activeTab === "courses" && <CourseManagement onUpdate={fetchStats} />}
          {activeTab === "certificates" && <CertificateManagement onUpdate={fetchStats} />}
          {activeTab === "notifications" && <NotificationManagement onUpdate={fetchStats} />}
          {activeTab === "examinations" && <ExaminationManagement onUpdate={fetchStats} />}
          {activeTab === "franchises" && <FranchiseManagement onUpdate={fetchStats} />}
          {activeTab === "jobs" && <JobManagement onUpdate={fetchStats} />}
          {activeTab === "contacts" && <ContactManagement onUpdate={fetchStats} />}
          {activeTab === "admins" && <AdminManagement onUpdate={fetchStats} />}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
