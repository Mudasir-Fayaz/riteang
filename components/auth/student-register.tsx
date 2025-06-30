"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PasswordInput } from "@/components/ui/password-input"
import { supabase } from "@/lib/supabase"

interface StudentRegisterProps {
  onRegister: (data: {
    name: string
    phone: string
    username: string
    password: string
    address: string
    qualification: string
  }) => Promise<void>
  onBack: () => void
}

export function StudentRegister({ onRegister, onBack }: StudentRegisterProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    username: "",
    password: "",
    address: "",
    qualification: "",
  })
  const [loading, setLoading] = useState(false)
  const [usernameError, setUsernameError] = useState("")
  const [checkingUsername, setCheckingUsername] = useState(false)

  // Add username validation function
  const checkUsernameAvailability = async (username: string) => {
    if (!username || username.length < 3) {
      setUsernameError("")
      return
    }

    setCheckingUsername(true)
    try {
      const { data } = await supabase.from("students").select("username").eq("username", username).single()

      if (data) {
        setUsernameError("Username already exists")
      } else {
        setUsernameError("")
      }
    } catch (error) {
      // No user found, username is available
      setUsernameError("")
    } finally {
      setCheckingUsername(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await onRegister(formData)
    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <Card className="w-full max-w-md mx-2 md:mx-auto">
      <CardHeader className="p-3 md:p-6">
        <CardTitle className="text-center">Student Registration</CardTitle>
      </CardHeader>
      <CardContent className="p-3 md:p-6 pt-0">
        <form onSubmit={handleSubmit} className="space-y-2 md:space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={(e) => {
                handleChange(e)
                // Debounce username check
                clearTimeout(window.usernameTimeout)
                window.usernameTimeout = setTimeout(() => {
                  checkUsernameAvailability(e.target.value)
                }, 500)
              }}
              required
              className={usernameError ? "border-red-500" : ""}
            />
            {checkingUsername && <p className="text-xs text-gray-500 mt-1">Checking availability...</p>}
            {usernameError && <p className="text-xs text-red-500 mt-1">{usernameError}</p>}
            {formData.username && !usernameError && !checkingUsername && (
              <p className="text-xs text-green-500 mt-1">Username available</p>
            )}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <PasswordInput id="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" name="address" value={formData.address} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="qualification">Qualification</Label>
            <Input
              id="qualification"
              name="qualification"
              type="text"
              value={formData.qualification}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" disabled={loading || !!usernameError} className="w-full">
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
