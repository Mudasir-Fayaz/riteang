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

interface FranchiseRegisterProps {
  onRegister: (data: {
    name: string
    phone: string
    email: string
    qualification: string
    address: string
    username: string
    password: string
  }) => Promise<void>
  onBack: () => void
}

export function FranchiseRegister({ onRegister, onBack }: FranchiseRegisterProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    qualification: "",
    address: "",
    username: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [usernameError, setUsernameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [checkingUsername, setCheckingUsername] = useState(false)
  const [checkingEmail, setCheckingEmail] = useState(false)

  const checkUsernameAvailability = async (username: string) => {
    if (!username || username.length < 3) {
      setUsernameError("")
      return
    }

    setCheckingUsername(true)
    try {
      const { data } = await supabase.from("franchise").select("username").eq("username", username).single()
      if (data) {
        setUsernameError("Username already exists")
      } else {
        setUsernameError("")
      }
    } catch (error) {
      setUsernameError("")
    } finally {
      setCheckingUsername(false)
    }
  }

  const checkEmailAvailability = async (email: string) => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError("")
      return
    }

    setCheckingEmail(true)
    try {
      const { data } = await supabase.from("franchise").select("email").eq("email", email).single()
      if (data) {
        setEmailError("Email already registered")
      } else {
        setEmailError("")
      }
    } catch (error) {
      setEmailError("")
    } finally {
      setCheckingEmail(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (usernameError || emailError) return // Prevent submission if there are errors

    setLoading(true)
    await onRegister(formData)
    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (name === "username") {
      clearTimeout(window.franchiseUsernameTimeout)
      window.franchiseUsernameTimeout = setTimeout(() => {
        checkUsernameAvailability(value)
      }, 500)
    } else if (name === "email") {
      clearTimeout(window.franchiseEmailTimeout)
      window.franchiseEmailTimeout = setTimeout(() => {
        checkEmailAvailability(value)
      }, 500)
    }
  }

  return (
    <Card className="w-full max-w-md mx-2 md:mx-auto">
      <CardHeader className="p-3 md:p-6">
        <CardTitle className="text-center">Franchise Registration</CardTitle>
      </CardHeader>
      <CardContent className="p-3 md:p-6 pt-0">
        <form onSubmit={handleSubmit} className="space-y-2 md:space-y-4">
          <div>
            <Label htmlFor="name">Franchise Name</Label>
            <Input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
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
              className={emailError ? "border-red-500" : ""}
            />
            {checkingEmail && <p className="text-xs text-gray-500 mt-1">Checking availability...</p>}
            {emailError && <p className="text-xs text-red-500 mt-1">{emailError}</p>}
            {formData.email && !emailError && !checkingEmail && (
              <p className="text-xs text-green-500 mt-1">Email available</p>
            )}
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
          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" name="address" value={formData.address} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
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
          <Button type="submit" disabled={loading || !!usernameError || !!emailError} className="w-full">
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

// Declare global timeouts to prevent issues with multiple instances
declare global {
  interface Window {
    franchiseUsernameTimeout: NodeJS.Timeout | undefined
    franchiseEmailTimeout: NodeJS.Timeout | undefined
  }
}
