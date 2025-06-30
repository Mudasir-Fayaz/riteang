"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"

interface NavLink {
  name: string
  href: string
}

interface LandingHeaderProps {
  navLinks?: NavLink[]
}

const defaultLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
  { name: "Courses", href: "/courses" },
  { name: "Student Zone", href: "/student-zone" },
  { name: "Student Jobs", href: "/student-jobs" },
  { name: "Franchise", href: "/franchise" },
  { name: "Login Zone", href: "/login-zone" },
  { name: "Contact Us", href: "/contact-us" },
  { name: "Verify Certificate", href: "/#verify-certificate" },
]

export function LandingHeader({ navLinks = defaultLinks }: LandingHeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <img
                  src="https://riteeducation.in/wp-content/uploads/2024/07/WhatsApp-Image-2024-07-26-at-4.05.12-PM-e1721991306487.jpeg"
                  alt="RITE Education Logo"
                  width={40}
                  height={40}
                  className="rounded-full transition-transform group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-bold text-custom-red leading-tight">RITE Education</span>
                <span className="text-xs text-gray-600 hidden sm:block">Excellence in Learning</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-custom-red hover:bg-red-50 rounded-md transition-all duration-200 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-custom-red transition-all duration-200 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Mobile/Tablet Menu Button */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 hover:bg-red-50"
                  aria-label="Open navigation menu"
                >
                  <Menu className="h-6 w-6 text-gray-700" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px] p-0">
                <SheetHeader className="p-6 border-b bg-gradient-to-r from-custom-red to-red-700">
                  <div className="flex items-center space-x-3">
                    <img
                      src="https://riteeducation.in/wp-content/uploads/2024/07/WhatsApp-Image-2024-07-26-at-4.05.12-PM-e1721991306487.jpeg"
                      alt="RITE Education Logo"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <SheetTitle className="text-white font-bold text-lg">RITE Education</SheetTitle>
                  </div>
                </SheetHeader>

                {/* Mobile Navigation Links */}
                <div className="flex flex-col py-6">
                  {navLinks.map((link, index) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="flex items-center px-6 py-4 text-gray-700 hover:text-custom-red hover:bg-red-50 font-medium transition-all duration-200 border-b border-gray-100 last:border-b-0"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="flex-1">{link.name}</span>
                      <div className="w-2 h-2 rounded-full bg-custom-red opacity-0 transition-opacity duration-200 hover:opacity-100"></div>
                    </Link>
                  ))}
                </div>

                {/* Mobile Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-6 border-t bg-gray-50">
                  <p className="text-xs text-gray-500 text-center">© 2024 RITE Education. All rights reserved.</p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
