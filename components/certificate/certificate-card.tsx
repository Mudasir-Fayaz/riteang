"use client"

import Image from "next/image"
import type { Certificate } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { useRef } from "react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

interface CertificateCardProps {
  certificate: Certificate
}

export function CertificateCard({ certificate }: CertificateCardProps) {
  const instituteName = "RITE Education"
  const instituteLogo = "/placeholder.svg?height=64&width=64" // Placeholder logo
  const certificateRef = useRef<HTMLDivElement>(null) // Ref to the certificate card for capturing

  const handleDownloadImage = async () => {
    if (certificateRef.current) {
      const canvas = await html2canvas(certificateRef.current, { scale: 2 }) // Scale for higher quality
      const image = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.href = image
      link.download = `${certificate.certificate_id}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleDownloadPdf = async () => {
    if (certificateRef.current) {
      const canvas = await html2canvas(certificateRef.current, { scale: 2 }) // Scale for higher quality
      const imgData = canvas.toDataURL("image/png")

      // Calculate dimensions to fit the PDF page, maintaining aspect ratio
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const pdf = new jsPDF({
        orientation: imgWidth > imgHeight ? "landscape" : "portrait", // Set orientation based on content
        unit: "px",
        format: [imgWidth, imgHeight], // Use canvas dimensions for exact fit
      })

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
      pdf.save(`${certificate.certificate_id}.pdf`)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {" "}
      {/* Added flex-col and h-full to manage layout */}
      <div
        className="relative p-6 md:p-10 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden max-w-3xl mx-auto my-4 flex-shrink-0" // flex-shrink-0 to prevent it from shrinking
        ref={certificateRef}
      >
        {/* Background decorative elements (optional, for visual flair) */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50 z-0"></div>
        <div className="absolute inset-0 border-8 border-double border-blue-200 z-0"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Header */}
          <div className="mb-6 md:mb-8 w-full">
            <div className="flex items-center justify-center mb-4">
              <Image
                src={instituteLogo || "/placeholder.svg"}
                alt={`${instituteName} Logo`}
                width={64}
                height={64}
                className="mr-3"
              />
              <h2 className="text-2xl md:text-3xl font-bold text-blue-700">{instituteName}</h2>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">Certificate of Completion</h1>
            <p className="text-md md:text-lg text-gray-600 italic">
              This certifies the successful completion of the course
            </p>
          </div>

          {/* Main Body */}
          <div className="mb-8 md:mb-12 w-full">
            <p className="text-5xl md:text-7xl font-serif italic text-blue-600 mb-6">Certificate</p>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              This is to certify that <span className="font-bold text-blue-800">{certificate.student_name}</span> has
              successfully completed the <span className="font-bold text-blue-800">{certificate.course_title}</span>{" "}
              course conducted by <span className="font-bold text-blue-800">{instituteName}</span> for a duration of{" "}
              <span className="font-bold text-blue-800">{certificate.course_duration}</span>.
            </p>
            <p className="text-sm md:text-base text-gray-500 mt-4">
              Issued on: {new Date(certificate.created_at).toLocaleDateString()}
            </p>
            <p className="text-sm md:text-base text-gray-500">
              Completion Date: {new Date(certificate.course_completion_date).toLocaleDateString()}
            </p>
            <p className="text-sm md:text-base text-gray-500 mt-2">
              Certificate ID: <span className="font-mono text-gray-700">{certificate.certificate_id}</span>
            </p>
          </div>

          {/* Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center w-full mt-auto pt-6 md:pt-8 border-t border-gray-200">
            <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
              <div className="w-48 h-px bg-gray-400 mb-2"></div>
              <p className="text-sm text-gray-600">Institute Head&apos;s Signature</p>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <div className="w-48 h-px bg-gray-400 mb-2"></div>
              <p className="text-sm text-gray-600">Student&apos;s Signature</p>
            </div>
          </div>
        </div>
      </div>
      {/* Download buttons - moved outside the certificateRef div */}
      <div className="flex justify-center gap-4 mt-4 mb-4 flex-shrink-0">
        {" "}
        {/* Added flex-shrink-0 */}
        <Button onClick={handleDownloadImage}>Download Image</Button>
        <Button onClick={handleDownloadPdf}>Download PDF</Button>
      </div>
    </div>
  )
}
