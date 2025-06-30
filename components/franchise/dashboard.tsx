"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { supabase, type Franchise } from "@/lib/supabase"
import type { AuthUser } from "@/lib/auth"
import { User, Mail, Phone, MapPin, GraduationCap, Clock } from "lucide-react"

interface FranchiseDashboardProps {
  user: AuthUser
}

export function FranchiseDashboard({ user }: FranchiseDashboardProps) {
  const [franchise, setFranchise] = useState<Franchise | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadFranchiseData()
  }, [user.id])

  const loadFranchiseData = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.from("franchise").select("*").eq("id", user.id).single()

      if (error) {
        console.error("Error loading franchise data:", error)
        setFranchise(null)
      } else {
        setFranchise(data)
      }
    } catch (error) {
      console.error("Error loading franchise data:", error)
      setFranchise(null)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-600">
        <p>Loading franchise data...</p>
      </div>
    )
  }

  if (!franchise) {
    return (
      <div className="p-4 text-center text-red-600">
        <p>Error: Franchise data could not be loaded.</p>
      </div>
    )
  }

  return (
    <div className="p-2 md:p-4 lg:p-6 space-y-3 md:space-y-6">
      <h2 className="text-3xl font-bold">Franchise Dashboard</h2>

      <Card>
        <CardHeader className="p-3 md:p-6 flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">Franchise Status</CardTitle>
          <Badge
            variant={
              franchise.status === "approved" ? "default" : franchise.status === "pending" ? "secondary" : "destructive"
            }
            className="text-base px-3 py-1"
          >
            {franchise.status.charAt(0).toUpperCase() + franchise.status.slice(1)}
          </Badge>
        </CardHeader>
        <CardContent className="p-3 md:p-6 pt-0">
          {franchise.status === "pending" && (
            <p className="text-orange-600">
              Your franchise application is currently pending review. Please check back later for updates.
            </p>
          )}
          {franchise.status === "approved" && (
            <p className="text-green-600">
              Congratulations! Your franchise application has been approved. You can now proceed with your operations.
            </p>
          )}
          {franchise.status === "rejected" && (
            <p className="text-red-600">
              Unfortunately, your franchise application has been rejected. Please contact support for more details.
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="p-3 md:p-6">
          <CardTitle className="text-lg flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Franchise Details</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 md:p-6 pt-0 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <User className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Franchise Name</p>
                <p className="font-semibold">{franchise.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="font-semibold">{franchise.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Phone</p>
                <p className="font-semibold">{franchise.phone}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Qualification</p>
                <p className="font-semibold">{franchise.qualification}</p>
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <MapPin className="h-4 w-4 text-red-500 mt-1" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500">Address</p>
              <p className="font-semibold">{franchise.address}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Registered On</p>
              <p className="font-semibold">{new Date(franchise.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
