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
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabase, type Course, type Teacher } from "@/lib/supabase"
import { Plus, Edit, Trash2, BookOpen, DollarSign, Users, Award } from "lucide-react" // Added icons

interface CourseManagementProps {
  onUpdate: () => void
}

export function CourseManagement({ onUpdate }: CourseManagementProps) {
  const [courses, setCourses] = useState<Course[]>([])
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    fee: 0,
    paid: false,
    certification_given: false,
    teacher: "",
  })

  useEffect(() => {
    loadCourses()
    loadTeachers()
  }, [])

  const loadCourses = async () => {
    const { data } = await supabase.from("courses").select("*").order("created_at", { ascending: false })
    setCourses(data || [])
  }

  const loadTeachers = async () => {
    const { data } = await supabase.from("teachers").select("*")
    setTeachers(data || [])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const courseData = {
      ...formData,
      teacher: formData.teacher ? Number.parseInt(formData.teacher) : null,
    }

    if (editingCourse) {
      await supabase.from("courses").update(courseData).eq("id", editingCourse.id)
    } else {
      await supabase.from("courses").insert([courseData])
    }

    setIsDialogOpen(false)
    setEditingCourse(null)
    resetForm()
    loadCourses()
    onUpdate()
  }

  const handleEdit = (course: Course) => {
    setEditingCourse(course)
    setFormData({
      title: course.title,
      description: course.description || "",
      duration: course.duration || "",
      fee: course.fee || 0,
      paid: course.paid,
      certification_given: course.certification_given,
      teacher: course.teacher?.toString() || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this course?")) {
      await supabase.from("courses").delete().eq("id", id)
      loadCourses()
      onUpdate()
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      duration: "",
      fee: 0,
      paid: false,
      certification_given: false,
      teacher: "",
    })
  }

  const getTeacherName = (teacherId: number) => {
    const teacher = teachers.find((t) => t.id === teacherId)
    return teacher ? teacher.username : "Unassigned"
  }

  return (
    <Card>
      <CardHeader className="p-3 md:p-6">
        <div className="flex justify-between items-center">
          <CardTitle>Course Management</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  resetForm()
                  setEditingCourse(null)
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Course
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] max-w-md mx-2 md:mx-auto max-h-[90vh] flex flex-col">
              <DialogHeader className="flex-shrink-0 pb-4">
                <DialogTitle>{editingCourse ? "Edit Course" : "Add New Course"}</DialogTitle>
              </DialogHeader>

              <div className="flex-1 overflow-y-auto py-4 pr-4">
                <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
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
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) => setFormData((prev) => ({ ...prev, duration: e.target.value }))}
                      placeholder="e.g., 3 months"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fee">Fee (₹)</Label>
                    <Input
                      id="fee"
                      type="number"
                      step="0.01"
                      value={formData.fee}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, fee: Number.parseFloat(e.target.value) || 0 }))
                      }
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="teacher">Assign Teacher</Label>
                    <Select
                      value={formData.teacher}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, teacher: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a teacher" />
                      </SelectTrigger>
                      <SelectContent>
                        {teachers.map((teacher) => (
                          <SelectItem key={teacher.id} value={teacher.id.toString()}>
                            {teacher.username}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="paid"
                      checked={formData.paid}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, paid: checked }))}
                    />
                    <Label htmlFor="paid">Paid Course</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="certification"
                      checked={formData.certification_given}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, certification_given: checked }))}
                    />
                    <Label htmlFor="certification">Certification Given</Label>
                  </div>
                </form>
              </div>

              <div className="flex-shrink-0 pt-4 border-t">
                <Button type="submit" className="w-full">
                  {editingCourse ? "Update Course" : "Add Course"}
                </Button>
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
                <TableHead>Duration</TableHead>
                <TableHead>Fee</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead>Paid</TableHead>
                <TableHead>Certificate</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell>{course.duration}</TableCell>
                  <TableCell>₹{course.fee?.toFixed(2)}</TableCell>
                  <TableCell>{getTeacherName(course.teacher)}</TableCell>
                  <TableCell>{course.paid ? "Yes" : "No"}</TableCell>
                  <TableCell>{course.certification_given ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(course)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(course.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {courses.length === 0 ? (
            <p className="text-center text-gray-500">No courses available</p>
          ) : (
            courses.map((course) => (
              <Card key={course.id} className="shadow-sm">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-blue-500" />
                    <h3 className="font-semibold text-lg">{course.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 flex items-center">
                    <Users className="h-4 w-4 mr-1 text-gray-400" />
                    Teacher: {getTeacherName(course.teacher)}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
                    Fee: {course.paid ? `₹${course.fee?.toFixed(2)}` : "Free"}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <Award className="h-4 w-4 mr-1 text-gray-400" />
                    Certification: {course.certification_given ? "Yes" : "No"}
                  </p>
                  <div className="flex justify-end space-x-2 pt-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(course)}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(course.id)}>
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
    </Card>
  )
}
