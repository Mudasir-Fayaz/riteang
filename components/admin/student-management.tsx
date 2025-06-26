"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { supabase, type Student, type CourseEnrollment } from "@/lib/supabase"
import { Eye, CheckCircle, XCircle, Search, User, BookOpen, Phone, GraduationCap } from "lucide-react" // Added Award icon
import { ApplicantProfileDialog } from "./applicant-profile-dialog" // Reusing for student profile view

interface StudentManagementProps {
  onUpdate: () => void
}

export function StudentManagement({ onUpdate }: StudentManagementProps) {
  const [students, setStudents] = useState<Student[]>([])
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null) // Changed to student_id
  const [isViewStudentDialogOpen, setIsViewStudentDialogOpen] = useState(false) // Renamed for clarity
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    loadStudents()
  }, [])

  const loadStudents = async () => {
    const { data } = await supabase.from("students").select("*").order("created_at", { ascending: false })
    setStudents(data || [])
  }

  const handleViewStudent = (studentId: string) => {
    setSelectedStudentId(studentId)
    setIsViewStudentDialogOpen(true)
  }

  const handleApproveEnrollment = async (studentId: number, courseTitle: string) => {
    const student = students.find((s) => s.id === studentId)
    if (!student) return

    const updatedCourses = student.courses.map((course) =>
      course.course_title === courseTitle ? { ...course, approved: true } : course,
    )

    await supabase.from("students").update({ courses: updatedCourses }).eq("id", studentId)

    loadStudents()
    onUpdate()
  }

  const handleRejectEnrollment = async (studentId: number, courseTitle: string) => {
    const student = students.find((s) => s.id === studentId)
    if (!student) return

    const updatedCourses = student.courses.filter((course) => course.course_title !== courseTitle)

    await supabase.from("students").update({ courses: updatedCourses }).eq("id", studentId)

    loadStudents()
    onUpdate()
  }

  const getPendingEnrollments = () => {
    const pending: Array<{ student: Student; course: CourseEnrollment }> = []
    students.forEach((student) => {
      student.courses.forEach((course) => {
        if (!course.approved) {
          pending.push({ student, course })
        }
      })
    })
    return pending
  }

  // Filter students based on search term
  const filteredStudents = useMemo(() => {
    if (!searchTerm) {
      return students
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase()
    return students.filter(
      (student) =>
        student.student_id.toLowerCase().includes(lowerCaseSearchTerm) ||
        student.name.toLowerCase().includes(lowerCaseSearchTerm),
    )
  }, [students, searchTerm])

  return (
    <div className="space-y-3 md:space-y-6">
      <Card>
        <CardHeader className="p-3 md:p-6">
          <CardTitle>Pending Enrollments</CardTitle>
        </CardHeader>
        <CardContent className="p-3 md:p-6 pt-0">
          {/* Desktop Table View */}
          <div className="overflow-x-auto -mx-3 md:mx-0 hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Payment Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getPendingEnrollments().map(({ student, course }, index) => (
                  <TableRow key={index}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{course.course_title}</TableCell>
                    <TableCell>{new Date(course.join_date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={course.paid ? "default" : "secondary"}>{course.paid ? "Paid" : "Unpaid"}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1 flex-wrap gap-1">
                        <Button size="sm" onClick={() => handleApproveEnrollment(student.id, course.course_title)}>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRejectEnrollment(student.id, course.course_title)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {getPendingEnrollments().length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-gray-500">
                      No pending enrollments
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {getPendingEnrollments().length === 0 ? (
              <p className="text-center text-gray-500">No pending enrollments</p>
            ) : (
              getPendingEnrollments().map(({ student, course }, index) => (
                <Card key={index} className="shadow-sm">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-blue-500" />
                      <h3 className="font-semibold text-lg">{student.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600">Course: {course.course_title}</p>
                    <p className="text-sm text-gray-600">
                      Join Date: {new Date(course.join_date).toLocaleDateString()}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant={course.paid ? "default" : "secondary"}>{course.paid ? "Paid" : "Unpaid"}</Badge>
                    </div>
                    <div className="flex justify-end space-x-2 pt-2">
                      <Button size="sm" onClick={() => handleApproveEnrollment(student.id, course.course_title)}>
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRejectEnrollment(student.id, course.course_title)}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="p-3 md:p-6">
          <div className="flex justify-between items-center">
            <CardTitle>All Students</CardTitle>
            <div className="relative w-full max-w-sm">
              <Input
                type="text"
                placeholder="Search by ID or Name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-3 md:p-6 pt-0">
          {/* Desktop Table View */}
          <div className="overflow-x-auto -mx-3 md:mx-0 hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Qualification</TableHead>
                  <TableHead>Enrolled Courses</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.student_id}</TableCell>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.username}</TableCell>
                      <TableCell>{student.phone}</TableCell>
                      <TableCell>{student.qualification}</TableCell>
                      <TableCell>{student.courses.length}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => handleViewStudent(student.student_id)}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-gray-500">
                      No students found matching your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {filteredStudents.length === 0 ? (
              <p className="text-center text-gray-500">No students found matching your search.</p>
            ) : (
              filteredStudents.map((student) => (
                <Card key={student.id} className="shadow-sm">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-blue-500" />
                      <h3 className="font-semibold text-lg">{student.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600 flex items-center">
                      <span className="font-medium mr-1">ID:</span> {student.student_id}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center">
                      <Phone className="h-4 w-4 mr-1 text-gray-400" />
                      {student.phone}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center">
                      <GraduationCap className="h-4 w-4 mr-1 text-gray-400" />
                      {student.qualification}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center">
                      <BookOpen className="h-4 w-4 mr-1 text-gray-400" />
                      Enrolled Courses: {student.courses.length}
                    </p>
                    <div className="flex justify-end pt-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewStudent(student.student_id)}>
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isViewStudentDialogOpen} onOpenChange={setIsViewStudentDialogOpen}>
        <DialogContent className="w-[95vw] max-w-4xl mx-2 md:mx-auto max-h-[90vh] overflow-y-auto p-0">
          {selectedStudentId && (
            <ApplicantProfileDialog studentId={selectedStudentId} onClose={() => setIsViewStudentDialogOpen(false)} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
