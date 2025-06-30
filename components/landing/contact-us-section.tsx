"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, CheckCircle } from "lucide-react" // Import CheckCircle icon
import { submitContactForm } from "@/actions/contact"
import { useToast } from "@/hooks/use-toast"

export function ContactUsSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false) // New state for submission status
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setFormSubmitted(false) // Reset submission status on new attempt

    const form = e.target as HTMLFormElement
    const data = new FormData(form)
    const result = await submitContactForm(data)

    if (result.success) {
      toast({
        title: "Message Sent!",
        description: result.message,
      })
      setFormData({ name: "", email: "", phone: "", message: "" }) // Clear form
      setFormSubmitted(true) // Set form as submitted
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      })
      setFormSubmitted(false) // Ensure it's false on error
    }
    setLoading(false)
  }

  return (
    <section id="contact-us" className="py-12 md:py-16 bg-white">
      {" "}
      {/* Reduced vertical padding */}
      <div className="container mx-auto px-4 max-w-6xl">
        {" "}
        {/* Added max-w-6xl for better desktop width */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10 md:mb-12">Contact Us</h2>{" "}
        {/* Adjusted margin-bottom */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {" "}
          {/* Reduced gap for desktop */}
          {/* Contact Info */}
          <div className="space-y-6 md:space-y-8">
            {" "}
            {/* Reduced space-y */}
            <Card className="shadow-lg">
              <CardHeader className="pb-3">
                {" "}
                {/* Reduced padding */}
                <CardTitle className="text-xl md:text-2xl flex items-center space-x-3 text-custom-red">
                  {" "}
                  {/* Adjusted text size */}
                  <MapPin className="h-6 w-6 md:h-7 md:w-7" /> {/* Adjusted icon size */}
                  <span>Our Location</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-base md:text-lg text-gray-700">
                {" "}
                {/* Adjusted text size */}
                <p className="font-semibold">RITE Education</p>
                <p>K.P.Road Near General Bus Stand Anantnag</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl md:text-2xl flex items-center space-x-3 text-custom-blue">
                  <Phone className="h-6 w-6 md:h-7 md:w-7" />
                  <span>Call Us</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-base md:text-lg text-gray-700">
                <p>+91 9906885152</p>
                <p>+91 70066 92395</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl md:text-2xl flex items-center space-x-3 text-custom-red">
                  <Mail className="h-6 w-6 md:h-7 md:w-7" />
                  <span>Email Us</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-base md:text-lg text-gray-700">
                <p>contact@riteeducation.in</p>
              </CardContent>
            </Card>
          </div>
          {/* Contact Form */}
          <Card className="shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-center text-custom-red">Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              {formSubmitted ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  {" "}
                  {/* Reduced vertical padding */}
                  <CheckCircle className="h-16 w-16 md:h-20 md:w-20 text-green-500 mb-4" /> {/* Adjusted icon size */}
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Form Submitted!</h3>{" "}
                  {/* Adjusted text size */}
                  <p className="text-base md:text-lg text-gray-600">
                    Thank you for your message. We will get back to you shortly.
                  </p>{" "}
                  {/* Adjusted text size */}
                  <Button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-6 md:mt-8 bg-custom-blue hover:bg-custom-blue/90 text-white"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone (Optional)</Label>
                    <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-custom-blue hover:bg-custom-blue/90 text-white"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Submit Message"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
        {/* Moved Google Maps Embed to a new row */}
        <Card className="shadow-lg overflow-hidden mt-8 md:mt-12">
          {" "}
          {/* Added margin-top */}
          <CardHeader className="pb-3">
            <CardTitle className="text-xl md:text-2xl flex items-center space-x-3 text-custom-blue">
              <MapPin className="h-6 w-6 md:h-7 md:w-7" />
              <span>Find Us on Map</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="aspect-video w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3300.0000000000005!2d75.14999999999999!3d33.73333333333333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e1900000000001%3A0x0!2sAnantnag%20Bus%20Stand!5e0!3m2!1sen!2sin!4v1678901234567!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="RITE Education Location"
              ></iframe>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
