"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { supabase } from "@/lib/supabase"
import { Users, BookOpen, DollarSign, Award, Store, Briefcase, Shield } from "lucide-react" // Import Shield icon for Admin
import { CourseManagement } from "./course-management"
import { TeacherManagement } from "./teacher-management"
import { StudentManagement } from "./student-management"
import { CertificateManagement } from "./certificate-management"
import { NotificationManagement } from "./notification-management"
import { ExaminationManagement } from "./examination-management"
import { FranchiseManagement } from "./franchise-management"
import { JobManagement } from "./job-management"
import { AdminManagement } from "./admin-management" // Import AdminManagement
import type { AuthUser } from "@/lib/auth" // Import AuthUser

interface AdminDashboardProps {
  user?: AuthUser // Receive the current user prop
}

export function AdminDashboard({ user }: AdminDashboardProps) {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalRevenue: 0,
    totalCertificates: 0,
    totalFranchises: 0,
    totalJobs: 0,
    totalAdmins: 0, // New stat for admins
  })

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const [studentsRes, coursesRes, certificatesRes, franchisesRes, jobsRes, adminsRes] = await Promise.all([
        supabase.from("students").select("*"),
        supabase.from("courses").select("*"),
        supabase.from("certificates").select("*"),
        supabase.from("franchise").select("*"),
        supabase.from("jobs").select("*"),
        supabase
          .from("admin")
          .select("*"), // Fetch admins
      ])

      const totalRevenue =
        coursesRes.data?.reduce((sum, course) => {
          if (course.paid) {
            return sum + (course.fee || 0)
          }
          return sum
        }, 0) || 0

      setStats({
        totalStudents: studentsRes.data?.length || 0,
        totalCourses: coursesRes.data?.length || 0,
        totalRevenue,
        totalCertificates: certificatesRes.data?.length || 0,
        totalFranchises: franchisesRes.data?.length || 0,
        totalJobs: jobsRes.data?.length || 0,
        totalAdmins: adminsRes.data?.length || 0, // Set total admins
      })
    } catch (error) {
      console.error("Error loading stats:", error)
    }
  }

  return (
    <div className="p-2 md:p-4 lg:p-6 space-y-3 md:space-y-6">
      <h2 className="text-3xl font-bold">Admin Dashboard</h2>

      <div className="grid grid-cols-2 lg:grid-cols-7 gap-2 md:gap-4 lg:gap-6">
        {" "}
        {/* Updated grid-cols-7 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCourses}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificates Issued</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCertificates}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Franchises</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalFranchises}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalJobs}</div>
          </CardContent>
        </Card>
        <Card>
          {" "}
          {/* New card for Admins */}
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Admins</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAdmins}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-9 h-auto">
          {" "}
          {/* Updated grid-cols-9 */}
          <TabsTrigger value="courses" className="text-xs md:text-sm">
            Courses
          </TabsTrigger>
          <TabsTrigger value="teachers" className="text-xs md:text-sm">
            Teachers
          </TabsTrigger>
          <TabsTrigger value="students" className="text-xs md:text-sm">
            Students
          </TabsTrigger>
          <TabsTrigger value="certificates" className="text-xs md:text-sm">
            Certificates
          </TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs md:text-sm">
            Notifications
          </TabsTrigger>
          <TabsTrigger value="examinations" className="text-xs md:text-sm">
            Examinations
          </TabsTrigger>
          <TabsTrigger value="franchises" className="text-xs md:text-sm">
            Franchises
          </TabsTrigger>
          <TabsTrigger value="jobs" className="text-xs md:text-sm">
            Jobs
          </TabsTrigger>
          <TabsTrigger value="admins" className="text-xs md:text-sm">
            Admins
          </TabsTrigger>{" "}
          {/* New tab for admins */}
        </TabsList>

        <TabsContent value="courses">
          <CourseManagement onUpdate={loadStats} />
        </TabsContent>
        <TabsContent value="teachers">
          <TeacherManagement />
        </TabsContent>
        <TabsContent value="students">
          <StudentManagement onUpdate={loadStats} />
        </TabsContent>
        <TabsContent value="certificates">
          <CertificateManagement onUpdate={loadStats} />
        </TabsContent>
        <TabsContent value="notifications">
          <NotificationManagement />
        </TabsContent>
        <TabsContent value="examinations">
          <ExaminationManagement />
        </TabsContent>
        <TabsContent value="franchises">
          <FranchiseManagement />
        </TabsContent>
        <TabsContent value="jobs">
          <JobManagement onUpdate={loadStats} />
        </TabsContent>
        <TabsContent value="admins">
          {" "}
          {/* New tab content for admins */}
          <AdminManagement currentUser={user!} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
