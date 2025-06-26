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
import { supabase, type Notification } from "@/lib/supabase"
import { Plus, Trash2, Bell } from "lucide-react" // Added Bell icon

export function NotificationManagement() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    notification_title: "",
    notification_description: "",
  })

  useEffect(() => {
    loadNotifications()
  }, [])

  const loadNotifications = async () => {
    const { data } = await supabase.from("notifications").select("*").order("created_at", { ascending: false })
    setNotifications(data || [])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await supabase.from("notifications").insert([formData])

    setIsDialogOpen(false)
    resetForm()
    loadNotifications()
  }

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this notification?")) {
      await supabase.from("notifications").delete().eq("id", id)
      loadNotifications()
    }
  }

  const resetForm = () => {
    setFormData({
      notification_title: "",
      notification_description: "",
    })
  }

  return (
    <Card>
      <CardHeader className="p-3 md:p-6">
        <div className="flex justify-between items-center">
          <CardTitle>Notification Management</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Create Notification
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] max-w-md mx-2 md:mx-auto">
              <DialogHeader>
                <DialogTitle>Create New Notification</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-2 md:space-y-4">
                <div>
                  <Label htmlFor="notification_title">Title</Label>
                  <Input
                    id="notification_title"
                    value={formData.notification_title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, notification_title: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="notification_description">Description</Label>
                  <Textarea
                    id="notification_description"
                    value={formData.notification_description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, notification_description: e.target.value }))}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Create Notification
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
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notifications.map((notification) => (
                <TableRow key={notification.id}>
                  <TableCell className="font-medium">{notification.notification_title}</TableCell>
                  <TableCell className="max-w-xs truncate">{notification.notification_description}</TableCell>
                  <TableCell>{new Date(notification.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(notification.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {notifications.length === 0 ? (
            <p className="text-center text-gray-500">No notifications available</p>
          ) : (
            notifications.map((notification) => (
              <Card key={notification.id} className="shadow-sm">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-5 w-5 text-blue-500" />
                    <h3 className="font-semibold text-lg">{notification.notification_title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{notification.notification_description}</p>
                  <p className="text-xs text-gray-400">
                    Created: {new Date(notification.created_at).toLocaleDateString()}
                  </p>
                  <div className="flex justify-end pt-2">
                    <Button variant="outline" size="sm" onClick={() => handleDelete(notification.id)}>
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
