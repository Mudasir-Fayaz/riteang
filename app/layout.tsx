
import { Inter } from "next/font/google"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "RITE Education",
  description: "An education platform built with Next.js and Supabase.",
    generator: 'v0.dev'
}

interface RootLayoutProps {
  children: ReactNode
}



export default function RootLayout({ children }: RootLayoutProps) {
  // Always start each page at the very top.
 
 
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        {/* NOTE: All client-only hooks live inside ClientLayout */}
        <Wrapper>

      {children}
        </Wrapper>
      </body>
    </html>
  )
}


import './globals.css'
import Wrapper from "./wrapper"
