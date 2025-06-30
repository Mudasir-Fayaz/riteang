"use client"

import { CertificateVerify } from "@/components/guest/certificate-verify"

export function CertificateVerifySection() {
  return (
    <section id="certificate-verify" className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-custom-red mb-8">Verify Your Certificate</h2>
        <div className="flex justify-center">
          <CertificateVerify />
        </div>
      </div>
    </section>
  )
}
