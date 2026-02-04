"use client"

import React from "react"

import { cn } from "@/lib/utils"
import {
  AnimatedCalendarIcon,
  AnimatedClockIcon,
  AnimatedStatsIcon,
  AnimatedUserIcon,
  AnimatedBellIcon,
} from "@/components/animated-icons"
import { Calendar, LayoutDashboard, Settings, Users, Clock, Bell, BarChart3, LogOut } from "lucide-react"
import { useState } from "react"

interface NavItem {
  label: string
  icon: React.ReactNode
  animatedIcon: React.ReactNode
  href: string
  badge?: number
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
    animatedIcon: <AnimatedStatsIcon className="w-5 h-5" />,
    href: "#dashboard",
  },
  {
    label: "Calendar",
    icon: <Calendar className="w-5 h-5" />,
    animatedIcon: <AnimatedCalendarIcon className="w-5 h-5" />,
    href: "#calendar",
  },
  {
    label: "Schedule",
    icon: <Clock className="w-5 h-5" />,
    animatedIcon: <AnimatedClockIcon className="w-5 h-5" />,
    href: "#schedule",
  },
  {
    label: "Contacts",
    icon: <Users className="w-5 h-5" />,
    animatedIcon: <AnimatedUserIcon className="w-5 h-5" />,
    href: "#contacts",
  },
  {
    label: "Notifications",
    icon: <Bell className="w-5 h-5" />,
    animatedIcon: <AnimatedBellIcon className="w-5 h-5" />,
    href: "#notifications",
    badge: 3,
  },
  {
    label: "Analytics",
    icon: <BarChart3 className="w-5 h-5" />,
    animatedIcon: <AnimatedStatsIcon className="w-5 h-5" />,
    href: "#analytics",
  },
]

export function DashboardSidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard")
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
        <div className="relative">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
            <AnimatedCalendarIcon className="w-6 h-6 text-accent-foreground" />
          </div>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-sidebar animate-pulse" />
        </div>
        <div>
          <h1 className="font-bold text-lg">SchedulePro</h1>
          <p className="text-xs text-sidebar-foreground/60">Professional Edition</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <p className="px-3 py-2 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider">
          Main Menu
        </p>
        {navItems.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => setActiveItem(item.label)}
            onMouseEnter={() => setHoveredItem(item.label)}
            onMouseLeave={() => setHoveredItem(null)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 group relative",
              activeItem === item.label
                ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-sidebar-primary/20"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <span className="transition-transform duration-300 group-hover:scale-110">
              {hoveredItem === item.label || activeItem === item.label
                ? item.animatedIcon
                : item.icon}
            </span>
            <span className="font-medium">{item.label}</span>
            {item.badge && (
              <span className="ml-auto bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded-full animate-pulse">
                {item.badge}
              </span>
            )}
            {activeItem === item.label && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-sidebar-primary-foreground rounded-r-full" />
            )}
          </button>
        ))}
      </nav>

      {/* Settings & Logout */}
      <div className="px-3 py-4 border-t border-sidebar-border space-y-1">
        <button
          type="button"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-300"
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </button>
        <button
          type="button"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-all duration-300"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Log Out</span>
        </button>
      </div>

      {/* User Profile */}
      <div className="px-4 py-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-sidebar-accent/50">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center text-accent-foreground font-bold">
              JD
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-sidebar" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">John Doe</p>
            <p className="text-xs text-sidebar-foreground/60 truncate">john@company.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
