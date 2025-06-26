"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import {
  supabase,
  type Course,
  type Student,
  type Notification,
  type Certificate,
  type Examination,
  type Job,
} from "@/lib/supabase"
import type { AuthUser } from "@/lib/auth"
import { BookOpen, Bell, Award, FileText, Eye, DollarSign, CalendarDays, Briefcase, CheckCircle } from "lucide-react"
import { CertificateCard } from "@/components/certificate/certificate-card"
import { JobDetailsDialog } from "./job-details-dialog" // Import new component

interface StudentDashboardProps {
  user: AuthUser
}

export function StudentDashboard({ user }: StudentDashboardProps) {
  const [student, setStudent] = useState<Student | null>(null)
  const [courses, setCourses] = useState<Course[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [examinations, setExaminations] = useState<Examination[]>([])
  const [jobs, setJobs] = useState<Job[]>([]) // New state for jobs
  const [isViewCertificateDialogOpen, setIsViewCertificateDialogOpen] = useState(false)
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)
  const [isViewJobDialogOpen, setIsViewJobDialogOpen] = useState(false) // New state for job details dialog
  const [selectedJob, setSelectedJob] = useState<Job | null>(null) // New state for selected job

  

  const loadStudentData = useCallback(async () => {
  try {
    // Load student data
    const { data: studentData } = await supabase
      .from("students")
      .select("*")
      .eq("id", user.id)
      .single()

    setStudent(studentData)

    // Load all courses
    const { data: coursesData } = await supabase
      .from("courses")
      .select("*")

    setCourses(coursesData || [])

    // Load notifications
    const { data: notificationsData } = await supabase
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false })

    setNotifications(notificationsData || [])

    // Load student's certificates
    const { data: certificatesData } = await supabase
      .from("certificates")
      .select("*")
      .eq("student_name", studentData?.name)

    setCertificates(certificatesData || [])

    // Load examinations
    const { data: examinationsData } = await supabase
      .from("examinations")
      .select("*")
      .order("exam_date", { ascending: true })

    setExaminations(examinationsData || [])

    // Load active jobs
    const { data: jobsData } = await supabase
      .from("jobs")
      .select("*")
      .eq("status", "active")

    setJobs(jobsData || [])
  } catch (error) {
    console.error("Error loading student data:", error)
  }
}, [user.id])
useEffect(() => {
    loadStudentData()
  }, [user.id,loadStudentData])
  const handleEnrollCourse = async (courseTitle: string) => {
    if (!student) return

    const newEnrollment = {
      course_title: courseTitle,
      join_date: new Date().toISOString(),
      paid: false,
      approved: false,
      completed: false,
    }

    const updatedCourses = [...student.courses, newEnrollment]

    await supabase.from("students").update({ courses: updatedCourses }).eq("id", student.id)

    loadStudentData()
  }

  const isEnrolled = (courseTitle: string) => {
    return student?.courses.some((c) => c.course_title === courseTitle) || false
  }

  const handleViewCertificate = (certificate: Certificate) => {
    setSelectedCertificate(certificate)
    setIsViewCertificateDialogOpen(true)
  }

  const handleViewJob = (job: Job) => {
    setSelectedJob(job)
    setIsViewJobDialogOpen(true)
  }

  const handleApplyForJob = async (jobId: number) => {
    if (!student) return

    const jobToUpdate = jobs.find((job) => job.id === jobId)
    if (!jobToUpdate) return

    const isAlreadyApplied = jobToUpdate.applicants?.some((applicant) => applicant.student_id === student.student_id)
    if (isAlreadyApplied) {
      alert("You have already applied for this job.")
      return
    }

    const updatedApplicants = [
      ...(jobToUpdate.applicants || []),
      { student_id: student.student_id, application_date: new Date().toISOString() },
    ]

    const { error } = await supabase.from("jobs").update({ applicants: updatedApplicants }).eq("id", jobId)

    if (error) {
      console.error("Error applying for job:", error)
      alert("Failed to apply for the job. Please try again.")
    } else {
      alert("Successfully applied for the job!")
      loadStudentData() // Reload jobs to reflect application status
    }
  }

  const hasApplied = (jobId: number) => {
    return (
      jobs
        .find((job) => job.id === jobId)
        ?.applicants?.some((applicant) => applicant.student_id === student?.student_id) || false
    )
  }

  return (
    <div className="p-2 md:p-4 lg:p-6 space-y-3 md:space-y-6">
      <h2 className="text-3xl font-bold">Student Dashboard</h2>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 md:gap-4 lg:gap-6">
        {" "}
        {/* Updated grid-cols-5 */}
        <Card>
          <CardHeader className="p-3 md:p-6">
            <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 md:p-6 pt-0">
            <div className="text-2xl font-bold">{student?.courses.length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-3 md:p-6">
            <CardTitle className="text-sm font-medium">Notifications</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 md:p-6 pt-0">
            <div className="text-2xl font-bold">{notifications.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-3 md:p-6">
            <CardTitle className="text-sm font-medium">Certificates</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 md:p-6 pt-0">
            <div className="text-2xl font-bold">{certificates.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-3 md:p-6">
            <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 md:p-6 pt-0">
            <div className="text-2xl font-bold">{examinations.length}</div>
          </CardContent>
        </Card>
        <Card>
          {" "}
          {/* New card for Available Jobs */}
          <CardHeader className="p-3 md:p-6">
            <CardTitle className="text-sm font-medium">Available Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 md:p-6 pt-0">
            <div className="text-2xl font-bold">{jobs.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-auto">
          {" "}
          {/* Updated grid-cols-6 */}
          <TabsTrigger value="courses" className="text-xs md:text-sm">
            Available
          </TabsTrigger>
          <TabsTrigger value="enrolled" className="text-xs md:text-sm">
            My Courses
          </TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs md:text-sm">
            Notifications
          </TabsTrigger>
          <TabsTrigger value="certificates" className="text-xs md:text-sm">
            Certificates
          </TabsTrigger>
          <TabsTrigger value="examinations" className="text-xs md:text-sm">
            Exams
          </TabsTrigger>
          <TabsTrigger value="jobs" className="text-xs md:text-sm">
            Jobs
          </TabsTrigger>{" "}
          {/* New tab for jobs */}
        </TabsList>

        <TabsContent value="courses">
          <Card>
            <CardHeader className="p-3 md:p-6">
              <CardTitle>Available Courses</CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-6 pt-0">
              {/* Desktop Table View */}
              <div className="overflow-x-auto -mx-3 md:mx-0 hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Fee</TableHead>
                      <TableHead>Certificate</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.title}</TableCell>
                        <TableCell className="max-w-xs truncate">{course.description}</TableCell>
                        <TableCell>{course.duration}</TableCell>
                        <TableCell>{course.paid ? `₹${course.fee?.toFixed(2)}` : "Free"}</TableCell>
                        <TableCell>{course.certification_given ? "Yes" : "No"}</TableCell>
                        <TableCell>
                          {isEnrolled(course.title) ? (
                            <Badge variant="secondary">Enrolled</Badge>
                          ) : (
                            <Button size="sm" onClick={() => handleEnrollCourse(course.title)}>
                              Enroll
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {courses.length === 0 ? (
                  <p className="text-center text-gray-500">No available courses</p>
                ) : (
                  courses.map((course) => (
                    <Card key={course.id} className="shadow-sm">
                      <CardContent className="p-4 space-y-2">
                        <div className="flex items-center space-x-2">
                          <BookOpen className="h-5 w-5 text-blue-500" />
                          <h3 className="font-semibold text-lg">{course.title}</h3>
                        </div>
                        <p className="text-sm text-gray-600">{course.description}</p>
                        <p className="text-sm text-gray-600 flex items-center">
                          <CalendarDays className="h-4 w-4 mr-1 text-gray-400" />
                          Duration: {course.duration}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center">
                          <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
                          Fee: {course.paid ? `₹${course.fee?.toFixed(2)}` : "Free"}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center">
                          <Award className="h-4 w-4 mr-1 text-gray-400" />
                          Certificate: {course.certification_given ? "Yes" : "No"}
                        </p>
                        <div className="flex justify-end pt-2">
                          {isEnrolled(course.title) ? (
                            <Badge variant="secondary">Enrolled</Badge>
                          ) : (
                            <Button size="sm" onClick={() => handleEnrollCourse(course.title)}>
                              Enroll
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="enrolled">
          <Card>
            <CardHeader className="p-3 md:p-6">
              <CardTitle>My Enrolled Courses</CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-6 pt-0">
              {/* Desktop Table View */}
              <div className="overflow-x-auto -mx-3 md:mx-0 hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course Title</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Payment Status</TableHead>
                      <TableHead>Approval Status</TableHead>
                      <TableHead>Progress</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {student?.courses.map((course, index) => (
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
                    {(!student?.courses || student.courses.length === 0) && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-gray-500">
                          No courses enrolled yet
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {!student?.courses || student.courses.length === 0 ? (
                  <p className="text-center text-gray-500">No courses enrolled yet</p>
                ) : (
                  student.courses.map((course, index) => (
                    <Card key={index} className="shadow-sm">
                      <CardContent className="p-4 space-y-2">
                        <div className="flex items-center space-x-2">
                          <BookOpen className="h-5 w-5 text-blue-500" />
                          <h3 className="font-semibold text-lg">{course.course_title}</h3>
                        </div>
                        <p className="text-sm text-gray-600 flex items-center">
                          <CalendarDays className="h-4 w-4 mr-1 text-gray-400" />
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
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader className="p-3 md:p-6">
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-6 pt-0">
              <div className="space-y-2 md:space-y-4">
                {notifications.length === 0 ? (
                  <p className="text-center text-gray-500">No notifications available</p>
                ) : (
                  notifications.map((notification) => (
                    <Card key={notification.id} className="border rounded-lg p-2 md:p-4 shadow-sm">
                      <CardContent className="p-0 space-y-1">
                        <h3 className="font-semibold text-lg">{notification.notification_title}</h3>
                        <p className="text-gray-600 text-sm">{notification.notification_description}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(notification.created_at).toLocaleDateString()}
                        </p>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certificates">
          <Card>
            <CardHeader className="p-3 md:p-6">
              <CardTitle>My Certificates</CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-6 pt-0">
              {/* Desktop Table View */}
              <div className="overflow-x-auto -mx-3 md:mx-0 hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Certificate ID</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Completion Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {certificates.map((certificate) => (
                      <TableRow key={certificate.id}>
                        <TableCell className="font-medium">{certificate.certificate_id}</TableCell>
                        <TableCell>{certificate.course_title}</TableCell>
                        <TableCell>{certificate.course_duration}</TableCell>
                        <TableCell>{new Date(certificate.course_completion_date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" onClick={() => handleViewCertificate(certificate)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {certificates.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-gray-500">
                          No certificates issued yet
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {certificates.length === 0 ? (
                  <p className="text-center text-gray-500">No certificates issued yet</p>
                ) : (
                  certificates.map((certificate) => (
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
                          <BookOpen className="h-4 w-4 mr-1 text-gray-400" />
                          Duration: {certificate.course_duration}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center">
                          <CalendarDays className="h-4 w-4 mr-1 text-gray-400" />
                          Completion Date: {new Date(certificate.course_completion_date).toLocaleDateString()}
                        </p>
                        <div className="flex justify-end pt-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewCertificate(certificate)}>
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examinations">
          <Card>
            <CardHeader className="p-3 md:p-6">
              <CardTitle>Upcoming Examinations</CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-6 pt-0">
              <div className="space-y-2 md:space-y-4">
                {examinations.length === 0 ? (
                  <p className="text-center text-gray-500">No upcoming examinations</p>
                ) : (
                  examinations.map((exam) => (
                    <Card key={exam.id} className="border rounded-lg p-2 md:p-4 shadow-sm">
                      <CardContent className="p-0 space-y-1">
                        <h3 className="font-semibold text-lg">{exam.exam_title}</h3>
                        <p className="text-gray-600 text-sm">{exam.exam_description}</p>
                        <p className="text-sm font-medium text-blue-600 mt-2 flex items-center">
                          <CalendarDays className="h-4 w-4 mr-1" />
                          Exam Date: {new Date(exam.exam_date).toLocaleDateString()}
                        </p>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs">
          <Card>
            <CardHeader className="p-3 md:p-6">
              <CardTitle>Available Job Postings</CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-6 pt-0">
              {/* Desktop Table View */}
              <div className="overflow-x-auto -mx-3 md:mx-0 hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Qualification</TableHead>
                      <TableHead>Certificates</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobs.length > 0 ? (
                      jobs.map((job) => (
                        <TableRow key={job.id}>
                          <TableCell className="font-medium">{job.title}</TableCell>
                          <TableCell className="max-w-xs truncate">{job.description}</TableCell>
                          <TableCell>{job.qualification_required || "N/A"}</TableCell>
                          <TableCell className="max-w-xs truncate">
                            {job.certificates_required && job.certificates_required.length > 0
                              ? job.certificates_required.join(", ")
                              : "None"}
                          </TableCell>
                          <TableCell>
                            <Badge variant={job.status === "active" ? "default" : "secondary"}>
                              {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button variant="outline" size="sm" onClick={() => handleViewJob(job)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" onClick={() => handleApplyForJob(job.id)} disabled={hasApplied(job.id)}>
                                {hasApplied(job.id) ? (
                                  <>
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Applied
                                  </>
                                ) : (
                                  "Apply"
                                )}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-gray-500">
                          No active job postings available.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {jobs.length === 0 ? (
                  <p className="text-center text-gray-500">No active job postings available.</p>
                ) : (
                  jobs.map((job) => (
                    <Card key={job.id} className="shadow-sm">
                      <CardContent className="p-4 space-y-2">
                        <div className="flex items-center space-x-2">
                          <Briefcase className="h-5 w-5 text-blue-500" />
                          <h3 className="font-semibold text-lg">{job.title}</h3>
                        </div>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Description:</span> {job.description}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Qualification:</span> {job.qualification_required || "N/A"}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Certificates:</span>{" "}
                          {job.certificates_required && job.certificates_required.length > 0
                            ? job.certificates_required.join(", ")
                            : "None"}
                        </p>
                        <div className="flex justify-end space-x-2 pt-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewJob(job)}>
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm" onClick={() => handleApplyForJob(job.id)} disabled={hasApplied(job.id)}>
                            {hasApplied(job.id) ? (
                              <>
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Applied
                              </>
                            ) : (
                              "Apply"
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog for viewing certificate */}
      <Dialog open={isViewCertificateDialogOpen} onOpenChange={setIsViewCertificateDialogOpen}>
        <DialogContent className="w-[95vw] max-w-4xl mx-2 md:mx-auto max-h-[90vh] overflow-y-auto p-0">
          {selectedCertificate && <CertificateCard certificate={selectedCertificate} />}
        </DialogContent>
      </Dialog>

      {/* Dialog for viewing job details */}
      <Dialog open={isViewJobDialogOpen} onOpenChange={setIsViewJobDialogOpen}>
        <DialogContent className="w-[95vw] max-w-2xl mx-2 md:mx-auto max-h-[90vh] overflow-y-auto p-0">
          {selectedJob && (
            <JobDetailsDialog
              job={selectedJob}
              onApply={handleApplyForJob}
              hasApplied={hasApplied(selectedJob.id)}
              onClose={() => setIsViewJobDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
