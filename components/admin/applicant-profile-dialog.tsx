"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { supabase, type Student, type Certificate } from "@/lib/supabase"
import { User, Phone, MapPin, GraduationCap, BadgeIcon as IdCard, BookOpen, Award } from "lucide-react"

interface ApplicantProfileDialogProps {
  studentId: string
  onClose: () => void
}

export function ApplicantProfileDialog({ studentId, onClose }: ApplicantProfileDialogProps) {
  const [student, setStudent] = useState<Student | null>(null)
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStudentProfile()
  }, [studentId])

  const loadStudentProfile = async () => {
    setLoading(true)
    try {
      // Load student data by student_id
      const { data: studentData, error: studentError } = await supabase
        .from("students")
        .select("*")
        .eq("student_id", studentId)
        .single()

      if (studentError || !studentData) {
        console.error("Error loading student data:", studentError)
        setStudent(null)
        setCertificates([])
        return
      }

      setStudent(studentData)

      // Load student's certificates by student name
      const { data: certificatesData, error: certificatesError } = await supabase
        .from("certificates")
        .select("*")
        .eq("student_name", studentData.name)
        .order("created_at", { ascending: false })

      if (certificatesError) {
        console.error("Error loading certificates:", certificatesError)
        setCertificates([])
        return
      }

      setCertificates(certificatesData || [])
    } catch (error) {
      console.error("Error loading student profile:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 pb-4">
        <h2 className="text-xl font-semibold flex items-center space-x-2">
          <User className="h-6 w-6" />
          <span>Student Profile: {student?.name || "Loading..."}</span>
        </h2>
        <p className="text-sm text-gray-500">Student ID: {studentId}</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="text-center">Loading profile...</div>
        </div>
      ) : student ? (
        <div className="flex-1 overflow-y-auto pr-2">
          <div className="space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Personal Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <IdCard className="h-4 w-4 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Student ID</p>
                      <p className="font-semibold">{student.student_id}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <User className="h-4 w-4 text-green-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Full Name</p>
                      <p className="font-semibold">{student.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-purple-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Phone</p>
                      <p className="font-semibold">{student.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <GraduationCap className="h-4 w-4 text-orange-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Qualification</p>
                      <p className="font-semibold">{student.qualification}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-4 w-4 text-red-500 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500">Address</p>
                    <p className="font-semibold">{student.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enrolled Courses */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Enrolled Courses ({student.courses.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {student.courses.length > 0 ? (
                  <div className="overflow-x-auto hidden md:block">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Course Title</TableHead>
                          <TableHead>Join Date</TableHead>
                          <TableHead>Payment</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Progress</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {student.courses.map((course, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{course.course_title}</TableCell>
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
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No courses enrolled yet</p>
                  </div>
                )}
                {/* Mobile Card View for Enrolled Courses */}
                <div className="md:hidden space-y-4">
                  {student.courses.length === 0 ? (
                    <p className="text-center text-gray-500">No courses enrolled yet</p>
                  ) : (
                    student.courses.map((course, index) => (
                      <Card key={index} className="shadow-sm">
                        <CardContent className="p-4 space-y-2">
                          <h3 className="font-semibold text-lg">{course.course_title}</h3>
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
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Certificates */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Certificates Issued ({certificates.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {certificates.length > 0 ? (
                  <div className="overflow-x-auto hidden md:block">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Certificate ID</TableHead>
                          <TableHead>Course</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Completion Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {certificates.map((certificate) => (
                          <TableRow key={certificate.id}>
                            <TableCell className="font-medium">{certificate.certificate_id}</TableCell>
                            <TableCell>{certificate.course_title}</TableCell>
                            <TableCell>{certificate.course_duration}</TableCell>
                            <TableCell>{new Date(certificate.course_completion_date).toLocaleDateString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Award className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No certificates issued yet</p>
                  </div>
                )}
                {/* Mobile Card View for Certificates */}
                <div className="md:hidden space-y-4">
                  {certificates.length === 0 ? (
                    <p className="text-center text-gray-500">No certificates issued yet</p>
                  ) : (
                    certificates.map((certificate) => (
                      <Card key={certificate.id} className="shadow-sm">
                        <CardContent className="p-4 space-y-2">
                          <h3 className="font-semibold text-lg">{certificate.course_title}</h3>
                          <p className="text-sm text-gray-600">ID: {certificate.certificate_id}</p>
                          <p className="text-sm text-gray-600">Duration: {certificate.course_duration}</p>
                          <p className="text-sm text-gray-600">
                            Completion Date: {new Date(certificate.course_completion_date).toLocaleDateString()}
                          </p>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Account Information */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Account Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Username</p>
                    <p className="font-semibold">{student.username}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Member Since</p>
                    <p className="font-semibold">{new Date(student.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center py-8">
          <div className="text-center text-gray-500">
            <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Unable to load profile</p>
          </div>
        </div>
      )}
    </div>
  )
}
