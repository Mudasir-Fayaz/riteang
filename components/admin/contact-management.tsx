"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { format } from "date-fns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { RefreshCw, Mail, Phone, Calendar, User } from "lucide-react"

interface Contact {
  id: number
  fullname: string
  email: string
  phone: string | null
  message: string
  created_at: string
}

interface ContactManagementProps {
  onUpdate: () => void
}

export function ContactManagement({ onUpdate }: ContactManagementProps) {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    setLoading(true)
    setError(null)
    try {
      console.log("Fetching contacts from database...")

      const { data, error } = await supabase.from("contacts").select("*").order("created_at", { ascending: false })
      if (error) {
        console.error("Supabase error:", error)
        throw error
      }

      console.log("Fetched contacts data:", data)
      setContacts(data || [])
      onUpdate() // Notify parent to update stats
    } catch (err: any) {
      console.error("Error fetching contacts:", err.message)
      setError(`Failed to load contacts: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Contact Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Contact Messages
            <Button onClick={fetchContacts} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-500 p-4 bg-red-50 rounded-md">
            <p className="font-medium">Error loading contacts:</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Contact Messages ({contacts.length})
          <Button onClick={fetchContacts} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {contacts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No contact messages found.</p>
            <p className="text-sm text-muted-foreground mt-2">
              Contact messages will appear here when users submit the contact form.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell className="font-medium">{contact.fullname}</TableCell>
                      <TableCell>{contact.email}</TableCell>
                      <TableCell>{contact.phone || "N/A"}</TableCell>
                      <TableCell className="max-w-xs">
                        <div className="truncate" title={contact.message}>
                          {contact.message}
                        </div>
                      </TableCell>
                      <TableCell>{format(new Date(contact.created_at), "MMM dd, yyyy 'at' HH:mm")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile/Tablet Card View */}
            <div className="lg:hidden space-y-4">
              {contacts.map((contact) => (
                <Card key={contact.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Header with name and date */}
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-blue-600" />
                          <span className="font-semibold text-gray-900">{contact.fullname}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Calendar className="h-3 w-3" />
                          <span>{format(new Date(contact.created_at), "MMM dd, yyyy")}</span>
                        </div>
                      </div>

                      {/* Contact info */}
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-gray-700">{contact.email}</span>
                        </div>
                        {contact.phone && (
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-orange-600" />
                            <span className="text-sm text-gray-700">{contact.phone}</span>
                          </div>
                        )}
                      </div>

                      {/* Message */}
                      <div className="pt-2 border-t border-gray-100">
                        <p className="text-sm text-gray-600 leading-relaxed">{contact.message}</p>
                      </div>

                      {/* Time */}
                      <div className="text-xs text-gray-400 text-right">
                        {format(new Date(contact.created_at), "HH:mm")}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
