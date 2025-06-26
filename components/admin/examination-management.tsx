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
import { supabase, type Examination } from "@/lib/supabase"
import { Plus, Edit, Trash2, FileText } from "lucide-react" // Added FileText icon

export function ExaminationManagement() {
  const [examinations, setExaminations] = useState<Examination[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingExam, setEditingExam] = useState<Examination | null>(null)
  const [formData, setFormData] = useState({
    exam_title: "",
    exam_description: "",
    exam_date: "",
  })

  useEffect(() => {
    loadExaminations()
  }, [])

  const loadExaminations = async () => {
    const { data } = await supabase.from("examinations").select("*").order("exam_date", { ascending: true })
    setExaminations(data || [])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (editingExam) {
      await supabase.from("examinations").update(formData).eq("id", editingExam.id)
    } else {
      await supabase.from("examinations").insert([formData])
    }

    setIsDialogOpen(false)
    setEditingExam(null)
    resetForm()
    loadExaminations()
  }

  const handleEdit = (exam: Examination) => {
    setEditingExam(exam)
    setFormData({
      exam_title: exam.exam_title,
      exam_description: exam.exam_description || "",
      exam_date: exam.exam_date,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this examination?")) {
      await supabase.from("examinations").delete().eq("id", id)
      loadExaminations()
    }
  }

  const resetForm = () => {
    setFormData({
      exam_title: "",
      exam_description: "",
      exam_date: "",
    })
  }

  return (
    <Card>
      <CardHeader className="p-3 md:p-6">
        <div className="flex justify-between items-center">
          <CardTitle>Examination Management</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  resetForm()
                  setEditingExam(null)
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Examination
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] max-w-md mx-2 md:mx-auto">
              <DialogHeader>
                <DialogTitle>{editingExam ? "Edit Examination" : "Create New Examination"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-2 md:space-y-4">
                <div>
                  <Label htmlFor="exam_title">Title</Label>
                  <Input
                    id="exam_title"
                    value={formData.exam_title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, exam_title: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="exam_description">Description</Label>
                  <Textarea
                    id="exam_description"
                    value={formData.exam_description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, exam_description: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="exam_date">Exam Date</Label>
                  <Input
                    id="exam_date"
                    type="date"
                    value={formData.exam_date}
                    onChange={(e) => setFormData((prev) => ({ ...prev, exam_date: e.target.value }))}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  {editingExam ? "Update Examination" : "Create Examination"}
                </Button>
              </form>
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
                <TableHead>Description</TableHead>
                <TableHead>Exam Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {examinations.map((exam) => (
                <TableRow key={exam.id}>
                  <TableCell className="font-medium">{exam.exam_title}</TableCell>
                  <TableCell className="max-w-xs truncate">{exam.exam_description}</TableCell>
                  <TableCell>{new Date(exam.exam_date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(exam)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(exam.id)}>
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
          {examinations.length === 0 ? (
            <p className="text-center text-gray-500">No examinations available</p>
          ) : (
            examinations.map((exam) => (
              <Card key={exam.id} className="shadow-sm">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-blue-500" />
                    <h3 className="font-semibold text-lg">{exam.exam_title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{exam.exam_description}</p>
                  <p className="text-sm font-medium text-gray-500">
                    Exam Date: {new Date(exam.exam_date).toLocaleDateString()}
                  </p>
                  <div className="flex justify-end space-x-2 pt-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(exam)}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(exam.id)}>
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
