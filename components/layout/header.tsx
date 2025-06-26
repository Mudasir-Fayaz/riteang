"use client"

import { Button } from "@/components/ui/button"
import type { AuthUser } from "@/lib/auth"
import { LogOut, User } from "lucide-react"
import { StudentProfile } from "@/components/student/student-profile"

interface HeaderProps {
  user: AuthUser | null
  onLogout: () => void
}

export function Header({ user, onLogout }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-2 md:px-4 py-2 md:py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg md:text-2xl font-bold text-blue-600">RITE Education</h1>
          {user && (
            <div className="hidden lg:flex items-center space-x-1 md:space-x-2 text-xs md:text-sm text-gray-600">
              <User className="h-4 w-4" />
              <span>{user.username}</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs capitalize">{user.role}</span>
            </div>
          )}
        </div>

        {user && (
          <div className="flex items-center space-x-2">
            {user.role === "student" && <StudentProfile user={user} />}
            <Button variant="outline" onClick={onLogout} className="flex items-center space-x-2">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
