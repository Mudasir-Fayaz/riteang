"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, GraduationCap, CalendarDays, CheckCircle } from "lucide-react"
import type { Job } from "@/lib/supabase"

interface JobDetailsDialogProps {
  job: Job
  onApply: (jobId: number) => void
  hasApplied: boolean
  onClose: () => void
}

export function JobDetailsDialog({ job, onApply, hasApplied, onClose }: JobDetailsDialogProps) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "completed":
        return "secondary"
      case "closed":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex-shrink-0 pb-4 border-b">
        <h2 className="text-xl font-semibold flex items-center space-x-2">
          <Briefcase className="h-6 w-6" />
          <span>{job.title}</span>
        </h2>
        <Badge variant={getStatusVariant(job.status)} className="mt-2">
          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
        </Badge>
      </div>

      <div className="flex-1 overflow-y-auto py-4 pr-2 space-y-4">
        <Card>
          <CardContent className="p-4 space-y-2">
            <h3 className="font-semibold text-lg">Description</h3>
            <p className="text-gray-700">{job.description}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-2">
            <h3 className="font-semibold text-lg flex items-center space-x-2">
              <GraduationCap className="h-5 w-5 text-blue-500" />
              <span>Requirements</span>
            </h3>
            <p className="text-gray-700">
              <span className="font-medium">Qualification:</span> {job.qualification_required || "Any"}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Required Certificates:</span>{" "}
              {job.certificates_required && job.certificates_required.length > 0
                ? job.certificates_required.join(", ")
                : "None"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-2">
            <h3 className="font-semibold text-lg flex items-center space-x-2">
              <CalendarDays className="h-5 w-5 text-green-500" />
              <span>Posted On</span>
            </h3>
            <p className="text-gray-700">{new Date(job.created_at).toLocaleDateString()}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex-shrink-0 pt-4 border-t flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button onClick={() => onApply(job.id)} disabled={hasApplied}>
          {hasApplied ? (
            <>
              <CheckCircle className="h-4 w-4 mr-1" />
              Applied
            </>
          ) : (
            "Apply for this Job"
          )}
        </Button>
      </div>
    </div>
  )
}
