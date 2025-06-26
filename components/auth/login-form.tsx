"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { UserRole } from "@/lib/auth"
import { PasswordInput } from "@/components/ui/password-input"
import { XCircle } from "lucide-react" // Import XCircle for error icon

interface LoginFormProps {
  role: UserRole
  onLogin: (username: string, password: string, role: UserRole) => Promise<boolean> // Modified to return boolean
  onBack: () => void
}

export function LoginForm({ role, onLogin, onBack }: LoginFormProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null) // New state for error message

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null) // Clear previous errors

    const success = await onLogin(username, password, role)
    if (!success) {
      setError("Invalid username or password. Please try again.")
    }
    setLoading(false)
  }

  const getRoleTitle = () => {
    switch (role) {
      case "admin":
        return "Admin Login"
      case "teacher":
        return "Teacher Login"
      case "student":
        return "Student Login"
      case "franchise":
        return "Franchise Login"
      default:
        return "Login"
    }
  }

  return (
    <Card className="w-full max-w-md mx-2 md:mx-auto">
      <CardHeader className="p-3 md:p-6">
        <CardTitle className="text-center">{getRoleTitle()}</CardTitle>
      </CardHeader>
      <CardContent className="p-3 md:p-6 pt-0">
        <form onSubmit={handleSubmit} className="space-y-2 md:space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                setError(null)
              }}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError(null)
              }}
              required
            />
          </div>
          {error && (
            <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded">
              <XCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          )}
          <div className="flex space-x-1 md:space-x-2 gap-1">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Logging in..." : "Login"}
            </Button>
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
