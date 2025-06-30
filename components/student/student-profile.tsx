"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { supabase, type Student, type Certificate } from "@/lib/supabase"
import type { AuthUser } from "@/lib/auth"
import { User, Phone, MapPin, GraduationCap, BadgeIcon as IdCard, BookOpen, Award } from "lucide-react"

interface StudentProfileProps {
  user: AuthUser
}

export function StudentProfile({ user }: StudentProfileProps) {
  const [student, setStudent] = useState<Student | null>(null)
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const loadStudentProfile = async () => {
    if (!isDialogOpen) return

    setLoading(true)
    try {
      // Load student data
      const { data: studentData } = await supabase.from("students").select("*").eq("id", user.id).single()

      setStudent(studentData)

      // Load student's certificates
      const { data: certificatesData } = await supabase
        .from("certificates")
        .select("*")
        .eq("student_name", studentData?.name)
        .order("created_at", { ascending: false })

      setCertificates(certificatesData || [])
    } catch (error) {
      console.error("Error loading student profile:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadStudentProfile()
  }, [isDialogOpen, user.id])

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center space-x-2">
          <User className="h-4 w-4" />
          <span className="hidden sm:inline">Profile</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-4xl mx-2 md:mx-auto max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0 pb-4">
          <DialogTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Student Profile</span>
          </DialogTitle>
        </DialogHeader>

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
                    <div className="overflow-x-auto">
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
                    <div className="space-y-4">
                      {certificates.map((certificate) => (
                        <div
                          key={certificate.id}
                          className="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-indigo-50"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <Award className="h-5 w-5 text-yellow-500" />
                                <h3 className="font-semibold text-lg">{certificate.course_title}</h3>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                <p>
                                  <span className="font-medium">Certificate ID:</span> {certificate.certificate_id}
                                </p>
                                <p>
                                  <span className="font-medium">Duration:</span> {certificate.course_duration}
                                </p>
                                <p>
                                  <span className="font-medium">Completion Date:</span>{" "}
                                  {new Date(certificate.course_completion_date).toLocaleDateString()}
                                </p>
                                <p>
                                  <span className="font-medium">Issued Date:</span>{" "}
                                  {new Date(certificate.created_at).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Award className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No certificates issued yet</p>
                    </div>
                  )}
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
      </DialogContent>
    </Dialog>
  )
}
