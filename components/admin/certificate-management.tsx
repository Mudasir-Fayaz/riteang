"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabase, type Certificate, type Student, type Course } from "@/lib/supabase"
import { Plus, Trash2, Search, Eye, Award, User, BookOpen, CalendarDays } from "lucide-react" // Added icons
import { CertificateCard } from "@/components/certificate/certificate-card"

interface CertificateManagementProps {
  onUpdate: () => void
}

export function CertificateManagement({ onUpdate }: CertificateManagementProps) {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [isIssueDialogOpen, setIsIssueDialogOpen] = useState(false)
  const [isViewCertificateDialogOpen, setIsViewCertificateDialogOpen] = useState(false)
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)
  const [formData, setFormData] = useState({
    certificate_id: "",
    student_name: "",
    course_title: "",
    course_duration: "",
    course_completion_date: "",
  })
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    loadCertificates()
    loadStudents()
    loadCourses()
  }, [])

  const loadCertificates = async () => {
    const { data } = await supabase.from("certificates").select("*").order("created_at", { ascending: false })
    setCertificates(data || [])
  }

  const loadStudents = async () => {
    const { data } = await supabase.from("students").select("*")
    setStudents(data || [])
  }

  const loadCourses = async () => {
    const { data } = await supabase.from("courses").select("*")
    setCourses(data || [])
  }

  const generateCertificateId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = ""
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return `RITE-${result}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const certificateData = {
      ...formData,
      certificate_id: formData.certificate_id || generateCertificateId(),
    }

    await supabase.from("certificates").insert([certificateData])

    setIsIssueDialogOpen(false)
    resetForm()
    loadCertificates()
    onUpdate()
  }

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this certificate?")) {
      await supabase.from("certificates").delete().eq("id", id)
      loadCertificates()
      onUpdate()
    }
  }

  const handleViewCertificate = (certificate: Certificate) => {
    setSelectedCertificate(certificate)
    setIsViewCertificateDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      certificate_id: "",
      student_name: "",
      course_title: "",
      course_duration: "",
      course_completion_date: "",
    })
  }

  const handleStudentSelect = (studentName: string) => {
    setFormData((prev) => ({ ...prev, student_name: studentName }))
  }

  const handleCourseSelect = (courseTitle: string) => {
    const course = courses.find((c) => c.title === courseTitle)
    setFormData((prev) => ({
      ...prev,
      course_title: courseTitle,
      course_duration: course?.duration || "",
    }))
  }

  // Filter certificates based on search term
  const filteredCertificates = useMemo(() => {
    if (!searchTerm) {
      return certificates
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase()
    return certificates.filter(
      (certificate) =>
        certificate.certificate_id.toLowerCase().includes(lowerCaseSearchTerm) ||
        certificate.student_name.toLowerCase().includes(lowerCaseSearchTerm),
    )
  }, [certificates, searchTerm])

  return (
    <Card>
      <CardHeader className="p-3 md:p-6">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <CardTitle>Certificate Management</CardTitle>
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search by ID or Student Name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-full"
              />
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <Dialog open={isIssueDialogOpen} onOpenChange={setIsIssueDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="h-4 w-4 mr-2" />
                  Issue Certificate
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[95vw] max-w-md mx-2 md:mx-auto">
                <DialogHeader>
                  <DialogTitle>Issue New Certificate</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-2 md:space-y-4">
                  <div>
                    <Label htmlFor="certificate_id">Certificate ID (auto-generated if empty)</Label>
                    <Input
                      id="certificate_id"
                      value={formData.certificate_id}
                      onChange={(e) => setFormData((prev) => ({ ...prev, certificate_id: e.target.value }))}
                      placeholder="Leave empty for auto-generation"
                    />
                  </div>
                  <div>
                    <Label htmlFor="student_name">Student</Label>
                    <Select value={formData.student_name} onValueChange={handleStudentSelect}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a student" />
                      </SelectTrigger>
                      <SelectContent>
                        {students.map((student) => (
                          <SelectItem key={student.id} value={student.name}>
                            {student.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="course_title">Course</Label>
                    <Select value={formData.course_title} onValueChange={handleCourseSelect}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course.id} value={course.title}>
                            {course.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="course_duration">Course Duration</Label>
                    <Input
                      id="course_duration"
                      value={formData.course_duration}
                      onChange={(e) => setFormData((prev) => ({ ...prev, course_duration: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="course_completion_date">Completion Date</Label>
                    <Input
                      id="course_completion_date"
                      type="date"
                      value={formData.course_completion_date}
                      onChange={(e) => setFormData((prev) => ({ ...prev, course_completion_date: e.target.value }))}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Issue Certificate
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3 md:p-6 pt-0">
        {/* Desktop Table View */}
        <div className="overflow-x-auto -mx-3 md:mx-0 hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Certificate ID</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Completion Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCertificates.length > 0 ? (
                filteredCertificates.map((certificate) => (
                  <TableRow key={certificate.id}>
                    <TableCell className="font-medium">{certificate.certificate_id}</TableCell>
                    <TableCell>{certificate.student_name}</TableCell>
                    <TableCell>{certificate.course_title}</TableCell>
                    <TableCell>{certificate.course_duration}</TableCell>
                    <TableCell>{new Date(certificate.course_completion_date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button variant="outline" size="sm" onClick={() => handleViewCertificate(certificate)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(certificate.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500">
                    No certificates found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {filteredCertificates.length === 0 ? (
            <p className="text-center text-gray-500">No certificates found matching your search.</p>
          ) : (
            filteredCertificates.map((certificate) => (
              <Card key={certificate.id} className="shadow-sm">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                    <h3 className="font-semibold text-lg">{certificate.course_title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 flex items-center">
                    <span className="font-medium mr-1">ID:</span> {certificate.certificate_id}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <User className="h-4 w-4 mr-1 text-gray-400" />
                    Student: {certificate.student_name}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <BookOpen className="h-4 w-4 mr-1 text-gray-400" />
                    Duration: {certificate.course_duration}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <CalendarDays className="h-4 w-4 mr-1 text-gray-400" />
                    Completion Date: {new Date(certificate.course_completion_date).toLocaleDateString()}
                  </p>
                  <div className="flex justify-end space-x-2 pt-2">
                    <Button variant="outline" size="sm" onClick={() => handleViewCertificate(certificate)}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(certificate.id)}>
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>

      <Dialog open={isViewCertificateDialogOpen} onOpenChange={setIsViewCertificateDialogOpen}>
        <DialogContent className="w-[95vw] max-w-4xl mx-2 md:mx-auto max-h-[90vh] overflow-y-auto p-0">
          {selectedCertificate && <CertificateCard certificate={selectedCertificate} />}
        </DialogContent>
      </Dialog>
    </Card>
  )
}
