"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { supabase, type Franchise } from "@/lib/supabase"
import { CheckCircle, XCircle, Eye, Store, User, Mail, Phone } from "lucide-react" // Added icons

export function FranchiseManagement() {
  const [franchises, setFranchises] = useState<Franchise[]>([])
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedFranchise, setSelectedFranchise] = useState<Franchise | null>(null)

  useEffect(() => {
    loadFranchises()
  }, [])

  const loadFranchises = async () => {
    const { data } = await supabase.from("franchise").select("*").order("created_at", { ascending: false })
    setFranchises(data || [])
  }

  const handleUpdateStatus = async (id: number, newStatus: "approved" | "rejected") => {
    if (confirm(`Are you sure you want to ${newStatus} this franchise?`)) {
      await supabase.from("franchise").update({ status: newStatus }).eq("id", id)
      loadFranchises()
    }
  }

  const handleViewFranchise = (franchise: Franchise) => {
    setSelectedFranchise(franchise)
    setIsViewDialogOpen(true)
  }

  return (
    <Card>
      <CardHeader className="p-3 md:p-6">
        <CardTitle>Franchise Management</CardTitle>
      </CardHeader>
      <CardContent className="p-3 md:p-6 pt-0">
        {/* Desktop Table View */}
        <div className="overflow-x-auto -mx-3 md:mx-0 hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {franchises.map((franchise) => (
                <TableRow key={franchise.id}>
                  <TableCell className="font-medium">{franchise.name}</TableCell>
                  <TableCell>{franchise.username}</TableCell>
                  <TableCell>{franchise.email}</TableCell>
                  <TableCell>{franchise.phone}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        franchise.status === "approved"
                          ? "default"
                          : franchise.status === "pending"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {franchise.status.charAt(0).toUpperCase() + franchise.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1 flex-wrap gap-1">
                      <Button variant="outline" size="sm" onClick={() => handleViewFranchise(franchise)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      {franchise.status === "pending" && (
                        <>
                          <Button size="sm" onClick={() => handleUpdateStatus(franchise.id, "approved")}>
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateStatus(franchise.id, "rejected")}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                      {franchise.status === "approved" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateStatus(franchise.id, "rejected")}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      )}
                      {franchise.status === "rejected" && (
                        <Button size="sm" onClick={() => handleUpdateStatus(franchise.id, "approved")}>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {franchises.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500">
                    No franchises registered yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {franchises.length === 0 ? (
            <p className="text-center text-gray-500">No franchises registered yet.</p>
          ) : (
            franchises.map((franchise) => (
              <Card key={franchise.id} className="shadow-sm">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Store className="h-5 w-5 text-blue-500" />
                    <h3 className="font-semibold text-lg">{franchise.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600 flex items-center">
                    <User className="h-4 w-4 mr-1 text-gray-400" />
                    Username: {franchise.username}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <Mail className="h-4 w-4 mr-1 text-gray-400" />
                    Email: {franchise.email}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <Phone className="h-4 w-4 mr-1 text-gray-400" />
                    Phone: {franchise.phone}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge
                      variant={
                        franchise.status === "approved"
                          ? "default"
                          : franchise.status === "pending"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {franchise.status.charAt(0).toUpperCase() + franchise.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex justify-end space-x-2 pt-2">
                    <Button variant="outline" size="sm" onClick={() => handleViewFranchise(franchise)}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    {franchise.status === "pending" && (
                      <>
                        <Button size="sm" onClick={() => handleUpdateStatus(franchise.id, "approved")}>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateStatus(franchise.id, "rejected")}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                    {franchise.status === "approved" && (
                      <Button variant="outline" size="sm" onClick={() => handleUpdateStatus(franchise.id, "rejected")}>
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    )}
                    {franchise.status === "rejected" && (
                      <Button size="sm" onClick={() => handleUpdateStatus(franchise.id, "approved")}>
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="w-[95vw] max-w-2xl mx-2 md:mx-auto max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Franchise Details</DialogTitle>
          </DialogHeader>
          {selectedFranchise && (
            <div className="space-y-2 md:space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <strong>Name:</strong> {selectedFranchise.name}
                </div>
                <div>
                  <strong>Username:</strong> {selectedFranchise.username}
                </div>
                <div>
                  <strong>Email:</strong> {selectedFranchise.email}
                </div>
                <div>
                  <strong>Phone:</strong> {selectedFranchise.phone}
                </div>
                <div>
                  <strong>Qualification:</strong> {selectedFranchise.qualification}
                </div>
                <div>
                  <strong>Status:</strong>{" "}
                  <Badge
                    variant={
                      selectedFranchise.status === "approved"
                        ? "default"
                        : selectedFranchise.status === "pending"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {selectedFranchise.status.charAt(0).toUpperCase() + selectedFranchise.status.slice(1)}
                  </Badge>
                </div>
              </div>
              <div>
                <strong>Address:</strong> {selectedFranchise.address}
              </div>
              <div>
                <strong>Registered On:</strong> {new Date(selectedFranchise.created_at).toLocaleDateString()}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
}
