"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { BookOpen, Bell, Award, FileText, Briefcase, Home } from "lucide-react"

interface StudentSidebarProps {
  activeView: string
  setActiveView: (view: string) => void
}

const studentNavItems = [
  {
    id: "overview",
    title: "Overview",
    icon: Home,
  },
  {
    id: "available-courses",
    title: "Available Courses",
    icon: BookOpen,
  },
  {
    id: "my-courses",
    title: "My Courses",
    icon: BookOpen,
  },
  {
    id: "notifications",
    title: "Notifications",
    icon: Bell,
  },
  {
    id: "certificates",
    title: "Certificates",
    icon: Award,
  },
  {
    id: "examinations",
    title: "Examinations",
    icon: FileText,
  },
  {
    id: "jobs",
    title: "Jobs",
    icon: Briefcase,
  },
]

export function StudentSidebar({ activeView, setActiveView }: StudentSidebarProps) {
  return (
    <Sidebar className="bg-white">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Student Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {studentNavItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton isActive={activeView === item.id} onClick={() => setActiveView(item.id)}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
