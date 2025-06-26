"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { supabase, type Student, type Course } from "@/lib/supabase"
import type { AuthUser } from "@/lib/auth"
import { Users, BookOpen, GraduationCap, DollarSign, CalendarDays } from "lucide-react" // Added icons

interface TeacherDashboardProps {
  user: AuthUser
}

// interface CourseEnrollment {
//   course_title: string
//   join_date: string
//   paid: boolean
//   approved: boolean
//   completed: boolean
// }

export function TeacherDashboard({ user }: TeacherDashboardProps) {
  const [students, setStudents] = useState<Student[]>([])
  const [teacherCourses, setTeacherCourses] = useState<Course[]>([])

  

  const loadTeacherData = useCallback(async () => {
      try {
        // Load courses assigned to this teacher
        const { data: coursesData } = await supabase.from("courses").select("*").eq("teacher", user.id)

      setTeacherCourses(coursesData || [])

      // Load all students
      const { data: studentsData } = await supabase.from("students").select("*")

      // Filter students enrolled in teacher's courses
      const enrolledStudents =
        studentsData?.filter((student) =>
          student.courses.some((course: { course_title: string }) =>
            coursesData?.some((teacherCourse) => teacherCourse.title === course.course_title),
          ),
        ) || []

      setStudents(enrolledStudents)
    } catch (error) {
      console.error("Error loading teacher data:", error)
    }
  },[user.id])
useEffect(() => {
    loadTeacherData()
  }, [user.id,loadTeacherData])
 

  return (
    <div className="p-2 md:p-4 lg:p-6 space-y-3 md:space-y-6">
      <h2 className="text-3xl font-bold">Teacher Dashboard</h2>

      <div className="grid grid-cols-2 gap-2 md:gap-6">
        <Card>
          <CardHeader className="p-3 md:p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 md:p-6 pt-0">
            <div className="text-2xl font-bold">{teacherCourses.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-3 md:p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 md:p-6 pt-0">
            <div className="text-2xl font-bold">{students.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="p-3 md:p-6">
          <CardTitle>My Courses</CardTitle>
        </CardHeader>
        <CardContent className="p-3 md:p-6 pt-0">
          {/* Desktop Table View */}
          <div className="overflow-x-auto -mx-3 md:mx-0 hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course Title</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Enrolled Students</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teacherCourses.map((course) => {
                  const enrolledCount = students.filter((student) =>
                    student.courses.some((c) => c.course_title === course.title),
                  ).length

                  return (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.title}</TableCell>
                      <TableCell>{course.duration}</TableCell>
                      <TableCell>₹{course.fee?.toFixed(2)}</TableCell>
                      <TableCell>{enrolledCount}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {teacherCourses.length === 0 ? (
              <p className="text-center text-gray-500">No courses assigned to you yet</p>
            ) : (
              teacherCourses.map((course) => {
                const enrolledCount = students.filter((student) =>
                  student.courses.some((c) => c.course_title === course.title),
                ).length
                return (
                  <Card key={course.id} className="shadow-sm">
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-5 w-5 text-blue-500" />
                        <h3 className="font-semibold text-lg">{course.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 flex items-center">
                        <CalendarDays className="h-4 w-4 mr-1 text-gray-400" />
                        Duration: {course.duration}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center">
                        <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
                        Fee: ₹{course.fee?.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center">
                        <Users className="h-4 w-4 mr-1 text-gray-400" />
                        Enrolled Students: {enrolledCount}
                      </p>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="p-3 md:p-6">
          <CardTitle>Students in My Courses</CardTitle>
        </CardHeader>
        <CardContent className="p-3 md:p-6 pt-0">
          {/* Desktop Table View */}
          <div className="overflow-x-auto -mx-3 md:mx-0 hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Payment Status</TableHead>
                  <TableHead>Approval Status</TableHead>
                  <TableHead>Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) =>
                  student.courses
                    .filter((course) => teacherCourses.some((tc) => tc.title === course.course_title))
                    .map((course, index) => (
                      <TableRow key={`${student.id}-${index}`}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{course.course_title}</TableCell>
                        <TableCell>{new Date(course.join_date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge variant={course.paid ? "default" : "secondary"}>
                            {course.paid ? "Paid" : "Unpaid"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={course.approved ? "default" : "secondary"}>
                            {course.approved ? "Approved" : "Pending"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={course.completed ? "default" : "secondary"}>
                            {course.completed ? "Completed" : "In Progress"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    )),
                )}
                {students.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-gray-500">
                      No students enrolled in your courses yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {students.length === 0 ? (
              <p className="text-center text-gray-500">No students enrolled in your courses yet</p>
            ) : (
              students
                .filter((student) =>
                  student.courses.some((course) => teacherCourses.some((tc) => tc.title === course.course_title)),
                )
                .map((student) =>
                  student.courses
                    .filter((course) => teacherCourses.some((tc) => tc.title === course.course_title))
                    .map((course, index) => (
                      <Card key={`${student.id}-${index}`} className="shadow-sm">
                        <CardContent className="p-4 space-y-2">
                          <div className="flex items-center space-x-2">
                            <GraduationCap className="h-5 w-5 text-blue-500" />
                            <h3 className="font-semibold text-lg">{student.name}</h3>
                          </div>
                          <p className="text-sm text-gray-600">Course: {course.course_title}</p>
                          <p className="text-sm text-gray-600">
                            Join Date: {new Date(course.join_date).toLocaleDateString()}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant={course.paid ? "default" : "secondary"}>
                              {course.paid ? "Paid" : "Unpaid"}
                            </Badge>
                            <Badge variant={course.approved ? "default" : "secondary"}>
                              {course.approved ? "Approved" : "Pending"}
                            </Badge>
                            <Badge variant={course.completed ? "default" : "secondary"}>
                              {course.completed ? "Completed" : "In Progress"}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    )),
                )
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
