"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabase, type Job } from "@/lib/supabase"
import { Plus, Edit, Trash2, Briefcase, Users, Eye } from "lucide-react"
import { ApplicantProfileDialog } from "./applicant-profile-dialog" // Import new component

interface JobManagementProps {
  onUpdate: () => void
}

export function JobManagement({ onUpdate }: JobManagementProps) {
  const [jobs, setJobs] = useState<Job[]>([])
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false)
  const [isViewJobDialogOpen, setIsViewJobDialogOpen] = useState(false)
  const [isApplicantProfileDialogOpen, setIsApplicantProfileDialogOpen] = useState(false)
  const [editingJob, setEditingJob] = useState<Job | null>(null)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [selectedApplicantStudentId, setSelectedApplicantStudentId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    qualification_required: "",
    certificates_required: "", // Comma-separated string
    status: "active",
  })

  useEffect(() => {
    loadJobs()
  }, [])

  const loadJobs = async () => {
    const { data } = await supabase.from("jobs").select("*").order("created_at", { ascending: false })
    setJobs(data || [])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const jobData = {
      ...formData,
      certificates_required: formData.certificates_required
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    }

    if (editingJob) {
      await supabase.from("jobs").update(jobData).eq("id", editingJob.id)
    } else {
      await supabase.from("jobs").insert([jobData])
    }

    setIsFormDialogOpen(false)
    setEditingJob(null)
    resetForm()
    loadJobs()
    onUpdate()
  }

  const handleEdit = (job: Job) => {
    setEditingJob(job)
    setFormData({
      title: job.title,
      description: job.description || "",
      qualification_required: job.qualification_required || "",
      certificates_required: job.certificates_required?.join(", ") || "",
      status: job.status,
    })
    setIsFormDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this job posting?")) {
      await supabase.from("jobs").delete().eq("id", id)
      loadJobs()
      onUpdate()
    }
  }

  const handleViewJob = (job: Job) => {
    setSelectedJob(job)
    setIsViewJobDialogOpen(true)
  }

  const handleViewApplicantProfile = (studentId: string) => {
    setSelectedApplicantStudentId(studentId)
    setIsApplicantProfileDialogOpen(true)
  }

  const handleChangeJobStatus = async (id: number, newStatus: "active" | "completed" | "closed") => {
    if (confirm(`Are you sure you want to change the status to "${newStatus}"?`)) {
      await supabase.from("jobs").update({ status: newStatus }).eq("id", id)
      loadJobs()
      onUpdate()
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      qualification_required: "",
      certificates_required: "",
      status: "active",
    })
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "completed":
        return "secondary" // Use a supported variant
      case "closed":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <Card>
      <CardHeader className="p-3 md:p-6">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <CardTitle>Job Management</CardTitle>
          <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  resetForm()
                  setEditingJob(null)
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Job
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] max-w-md mx-2 md:mx-auto max-h-[90vh] flex flex-col">
              <DialogHeader className="flex-shrink-0 pb-4">
                <DialogTitle>{editingJob ? "Edit Job" : "Create New Job"}</DialogTitle>
              </DialogHeader>
              <div className="flex-1 overflow-y-auto py-4 pr-4">
                <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                  <div>
                    <Label htmlFor="title">Job Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="qualification_required">Required Qualification</Label>
                    <Input
                      id="qualification_required"
                      value={formData.qualification_required}
                      onChange={(e) => setFormData((prev) => ({ ...prev, qualification_required: e.target.value }))}
                      placeholder="e.g., Bachelor's Degree in CS"
                    />
                  </div>
                  <div>
                    <Label htmlFor="certificates_required">Required Certificates (comma-separated)</Label>
                    <Input
                      id="certificates_required"
                      value={formData.certificates_required}
                      onChange={(e) => setFormData((prev) => ({ ...prev, certificates_required: e.target.value }))}
                      placeholder="e.g., Web Development, Data Science"
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Moved button inside the form */}
                  <div className="flex-shrink-0 pt-4 border-t">
                    <Button type="submit" className="w-full">
                      {editingJob ? "Update Job" : "Create Job"}
                    </Button>
                  </div>
                </form>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="p-3 md:p-6 pt-0">
        {/* Desktop Table View */}
        <div className="overflow-x-auto -mx-3 md:mx-0 hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Qualification</TableHead>
                <TableHead>Certificates</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applicants</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.title}</TableCell>
                    <TableCell>{job.qualification_required || "N/A"}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {job.certificates_required && job.certificates_required.length > 0
                        ? job.certificates_required.join(", ")
                        : "None"}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(job.status)}>
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{job.applicants?.length || 0}</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button variant="outline" size="sm" onClick={() => handleViewJob(job)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleEdit(job)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(job.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500">
                    No job postings available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {jobs.length === 0 ? (
            <p className="text-center text-gray-500">No job postings available.</p>
          ) : (
            jobs.map((job) => (
              <Card key={job.id} className="shadow-sm">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Briefcase className="h-5 w-5 text-blue-500" />
                    <h3 className="font-semibold text-lg">{job.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Qualification:</span> {job.qualification_required || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Certificates:</span>{" "}
                    {job.certificates_required && job.certificates_required.length > 0
                      ? job.certificates_required.join(", ")
                      : "None"}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant={getStatusVariant(job.status)}>
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </Badge>
                    <span className="text-sm text-gray-600 flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {job.applicants?.length || 0} Applicants
                    </span>
                  </div>
                  <div className="flex justify-end space-x-2 pt-2">
                    <Button variant="outline" size="sm" onClick={() => handleViewJob(job)}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEdit(job)}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(job.id)}>
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

      {/* Dialog for viewing job details and applicants */}
      <Dialog open={isViewJobDialogOpen} onOpenChange={setIsViewJobDialogOpen}>
        <DialogContent className="w-[95vw] max-w-2xl mx-2 md:mx-auto max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Job Details: {selectedJob?.title}</DialogTitle>
          </DialogHeader>
          {selectedJob && (
            <div className="space-y-4">
              <div>
                <strong>Description:</strong> {selectedJob.description}
              </div>
              <div>
                <strong>Required Qualification:</strong> {selectedJob.qualification_required || "N/A"}
              </div>
              <div>
                <strong>Required Certificates:</strong>{" "}
                {selectedJob.certificates_required && selectedJob.certificates_required.length > 0
                  ? selectedJob.certificates_required.join(", ")
                  : "None"}
              </div>
              <div>
                <strong>Status:</strong>{" "}
                <Badge variant={getStatusVariant(selectedJob.status)}>
                  {selectedJob.status.charAt(0).toUpperCase() + selectedJob.status.slice(1)}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  onClick={() => handleChangeJobStatus(selectedJob.id, "active")}
                  disabled={selectedJob.status === "active"}
                >
                  Set Active
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleChangeJobStatus(selectedJob.id, "completed")}
                  disabled={selectedJob.status === "completed"}
                >
                  Set Completed
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleChangeJobStatus(selectedJob.id, "closed")}
                  disabled={selectedJob.status === "closed"}
                >
                  Set Closed
                </Button>
              </div>

              <h3 className="text-lg font-semibold mt-6">Applicants ({selectedJob.applicants?.length || 0})</h3>
              {selectedJob.applicants && selectedJob.applicants.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student ID</TableHead>
                        <TableHead>Application Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedJob.applicants.map((applicant, index) => (
                        <TableRow key={index}>
                          <TableCell>{applicant.student_id}</TableCell>
                          <TableCell>{new Date(applicant.application_date).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewApplicantProfile(applicant.student_id)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View Profile
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <p className="text-gray-500">No students have applied for this job yet.</p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog for viewing applicant's full profile */}
      <Dialog open={isApplicantProfileDialogOpen} onOpenChange={setIsApplicantProfileDialogOpen}>
        <DialogContent className="w-[95vw] max-w-4xl mx-2 md:mx-auto max-h-[90vh] overflow-y-auto p-0">
          {selectedApplicantStudentId && (
            <ApplicantProfileDialog
              studentId={selectedApplicantStudentId}
              onClose={() => setIsApplicantProfileDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
}
