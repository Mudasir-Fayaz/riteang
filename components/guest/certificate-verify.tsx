"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase, type Certificate } from "@/lib/supabase"
import { CheckCircle, XCircle } from "lucide-react"

interface CertificateVerifyProps {
  onBack: () => void
}

export function CertificateVerify({ onBack }: CertificateVerifyProps) {
  const [certificateId, setCertificateId] = useState("")
  const [certificate, setCertificate] = useState<Certificate | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setCertificate(null)

    try {
      const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .eq("certificate_id", certificateId)
        .single()

      if (error || !data) {
        setError("Certificate not found")
      } else {
        setCertificate(data)
      }
    } catch (err) {
      console.log(err)
      setError("Error verifying certificate")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-2 md:mx-auto">
        <CardHeader className="p-3 md:p-6">
          <CardTitle className="text-center">Certificate Verification</CardTitle>
        </CardHeader>
        <CardContent className="p-3 md:p-6 pt-0 space-y-2 md:space-y-4">
          <form onSubmit={handleVerify} className="space-y-2 md:space-y-4">
            <div>
              <Label htmlFor="certificateId">Certificate ID</Label>
              <Input
                id="certificateId"
                type="text"
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
                placeholder="Enter certificate ID"
                required
              />
            </div>
            <div className="flex space-x-1 md:space-x-2 gap-1">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? "Verifying..." : "Verify"}
              </Button>
              <Button type="button" variant="outline" onClick={onBack}>
                Back
              </Button>
            </div>
          </form>

          {error && (
            <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded">
              <XCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          )}

          {certificate && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-2 md:p-4">
              <div className="flex items-center space-x-2 text-green-600 mb-3">
                <CheckCircle className="h-5 w-5" />
                <span className="font-semibold">Certificate Verified</span>
              </div>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Student:</strong> {certificate.student_name}
                </p>
                <p>
                  <strong>Course:</strong> {certificate.course_title}
                </p>
                <p>
                  <strong>Duration:</strong> {certificate.course_duration}
                </p>
                <p>
                  <strong>Completion Date:</strong> {new Date(certificate.course_completion_date).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
