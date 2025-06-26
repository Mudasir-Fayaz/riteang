"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { supabase, type Admin } from "@/lib/supabase"
import { Plus, Edit, Trash2, KeyRound, User } from "lucide-react"
import { PasswordInput } from "@/components/ui/password-input"
import type { AuthUser } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"

interface AdminManagementProps {
  currentUser: AuthUser // Pass the currently logged-in admin user
}

export function AdminManagement({ currentUser }: AdminManagementProps) {
  const [admins, setAdmins] = useState<Admin[]>([])
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false)
  const [isPasswordChangeDialogOpen, setIsPasswordChangeDialogOpen] = useState(false)
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [currentAdminPasswordChange, setCurrentAdminPasswordChange] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  })
  const [passwordChangeError, setPasswordChangeError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadAdmins()
  }, [])

  const loadAdmins = async () => {
    const { data } = await supabase.from("admin").select("*").order("created_at", { ascending: false })
    setAdmins(data || [])
  }

  const handleAddEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (editingAdmin) {
      // Update existing admin
      await supabase.from("admin").update(formData).eq("id", editingAdmin.id)
      toast({
        title: "Admin Updated",
        description: `Admin "${formData.username}" has been updated.`,
      })
    } else {
      // Add new admin
      const { data: existingAdmin } = await supabase
        .from("admin")
        .select("username")
        .eq("username", formData.username)
        .single()
      if (existingAdmin) {
        toast({
          title: "Error",
          description: "Username already exists. Please choose a different username.",
          variant: "destructive",
        })
        return
      }
      await supabase.from("admin").insert([formData])
      toast({
        title: "Admin Added",
        description: `New admin "${formData.username}" has been added.`,
      })
    }

    setIsFormDialogOpen(false)
    setEditingAdmin(null)
    resetForm()
    loadAdmins()
  }

  const handleEdit = (admin: Admin) => {
    setEditingAdmin(admin)
    setFormData({
      username: admin.username,
      password: admin.password, // Note: In a real app, you wouldn't pre-fill passwords.
    })
    setIsFormDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (id === currentUser.id) {
      toast({
        title: "Error",
        description: "You cannot delete your own admin account.",
        variant: "destructive",
      })
      return
    }
    if (confirm("Are you sure you want to delete this admin?")) {
      await supabase.from("admin").delete().eq("id", id)
      loadAdmins()
      toast({
        title: "Admin Deleted",
        description: "Admin account has been deleted.",
      })
    }
  }

  const handleSelfPasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordChangeError(null)

    if (currentAdminPasswordChange.newPassword !== currentAdminPasswordChange.confirmNewPassword) {
      setPasswordChangeError("New passwords do not match.")
      return
    }

    if (currentAdminPasswordChange.newPassword.length < 6) {
      setPasswordChangeError("New password must be at least 6 characters long.")
      return
    }

    try {
      // Verify old password (client-side for this example, ideally server-side)
      const { data: adminData, error: fetchError } = await supabase
        .from("admin")
        .select("password")
        .eq("id", currentUser.id)
        .single()

      if (fetchError || !adminData || adminData.password !== currentAdminPasswordChange.oldPassword) {
        setPasswordChangeError("Incorrect old password.")
        return
      }

      // Update password
      const { error: updateError } = await supabase
        .from("admin")
        .update({ password: currentAdminPasswordChange.newPassword })
        .eq("id", currentUser.id)

      if (updateError) {
        console.error("Error updating password:", updateError)
        setPasswordChangeError("Failed to update password. Please try again.")
        return
      }

      toast({
        title: "Password Changed",
        description: "Your password has been successfully updated.",
      })
      setIsPasswordChangeDialogOpen(false)
      resetPasswordChangeForm()
    } catch (error) {
      console.error("Password change error:", error)
      setPasswordChangeError("An unexpected error occurred.")
    }
  }

  const resetForm = () => {
    setFormData({
      username: "",
      password: "",
    })
  }

  const resetPasswordChangeForm = () => {
    setCurrentAdminPasswordChange({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    })
    setPasswordChangeError(null)
  }

  return (
    <Card>
      <CardHeader className="p-3 md:p-6">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <CardTitle>Admin Management</CardTitle>
          <div className="flex gap-2">
            <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    resetForm()
                    setEditingAdmin(null)
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Admin
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[95vw] max-w-md mx-2 md:mx-auto">
                <DialogHeader>
                  <DialogTitle>{editingAdmin ? "Edit Admin" : "Add New Admin"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddEditSubmit} className="space-y-2 md:space-y-4">
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={formData.username}
                      onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
                      required
                      disabled={!!editingAdmin} // Disable username edit for existing admins
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <PasswordInput
                      id="password"
                      value={formData.password}
                      onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    {editingAdmin ? "Update Admin" : "Add Admin"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog open={isPasswordChangeDialogOpen} onOpenChange={setIsPasswordChangeDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" onClick={resetPasswordChangeForm}>
                  <KeyRound className="h-4 w-4 mr-2" />
                  Change My Password
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[95vw] max-w-md mx-2 md:mx-auto">
                <DialogHeader>
                  <DialogTitle>Change Your Password</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSelfPasswordChange} className="space-y-2 md:space-y-4">
                  <div>
                    <Label htmlFor="old-password">Old Password</Label>
                    <PasswordInput
                      id="old-password"
                      value={currentAdminPasswordChange.oldPassword}
                      onChange={(e) =>
                        setCurrentAdminPasswordChange((prev) => ({ ...prev, oldPassword: e.target.value }))
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-password">New Password</Label>
                    <PasswordInput
                      id="new-password"
                      value={currentAdminPasswordChange.newPassword}
                      onChange={(e) =>
                        setCurrentAdminPasswordChange((prev) => ({ ...prev, newPassword: e.target.value }))
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirm-new-password">Confirm New Password</Label>
                    <PasswordInput
                      id="confirm-new-password"
                      value={currentAdminPasswordChange.confirmNewPassword}
                      onChange={(e) =>
                        setCurrentAdminPasswordChange((prev) => ({ ...prev, confirmNewPassword: e.target.value }))
                      }
                      required
                    />
                  </div>
                  {passwordChangeError && <p className="text-red-500 text-sm">{passwordChangeError}</p>}
                  <Button type="submit" className="w-full">
                    Change Password
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
                <TableHead>Username</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admins.length > 0 ? (
                admins.map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell className="font-medium">{admin.username}</TableCell>
                    <TableCell>{new Date(admin.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(admin)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(admin.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-gray-500">
                    No admin accounts available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {admins.length === 0 ? (
            <p className="text-center text-gray-500">No admin accounts available.</p>
          ) : (
            admins.map((admin) => (
              <Card key={admin.id} className="shadow-sm">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-blue-500" />
                    <h3 className="font-semibold text-lg">{admin.username}</h3>
                  </div>
                  <p className="text-sm text-gray-500">Created: {new Date(admin.created_at).toLocaleDateString()}</p>
                  <div className="flex justify-end space-x-2 pt-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(admin)}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(admin.id)}>
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
