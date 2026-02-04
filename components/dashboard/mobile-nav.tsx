"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, Calendar, LayoutDashboard, Clock, Users, Bell, BarChart3, Settings, LogOut } from "lucide-react"
import { AnimatedCalendarIcon } from "@/components/animated-icons"
import { cn } from "@/lib/utils"
import { useState } from "react"

const navItems = [
  { label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, href: "#dashboard" },
  { label: "Calendar", icon: <Calendar className="w-5 h-5" />, href: "#calendar" },
  { label: "Schedule", icon: <Clock className="w-5 h-5" />, href: "#schedule" },
  { label: "Contacts", icon: <Users className="w-5 h-5" />, href: "#contacts" },
  { label: "Notifications", icon: <Bell className="w-5 h-5" />, href: "#notifications", badge: 3 },
  { label: "Analytics", icon: <BarChart3 className="w-5 h-5" />, href: "#analytics" },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState("Dashboard")

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="w-5 h-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 bg-sidebar text-sidebar-foreground border-sidebar-border p-0">
        <SheetHeader className="px-6 py-5 border-b border-sidebar-border">
          <SheetTitle className="flex items-center gap-3 text-sidebar-foreground">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
              <AnimatedCalendarIcon className="w-6 h-6 text-accent-foreground" />
            </div>
            <div className="text-left">
              <p className="font-bold text-lg">SchedulePro</p>
              <p className="text-xs text-sidebar-foreground/60 font-normal">Professional Edition</p>
            </div>
          </SheetTitle>
          <SheetDescription className="sr-only">
            Mobile navigation menu for SchedulePro dashboard
          </SheetDescription>
        </SheetHeader>
        
        <nav className="flex-1 px-3 py-4 space-y-1">
          <p className="px-3 py-2 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider">
            Main Menu
          </p>
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                setActiveItem(item.label)
                setOpen(false)
              }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300",
                activeItem === item.label
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
              {item.badge && (
                <span className="ml-auto bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

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

        <div className="px-4 py-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-sidebar-accent/50">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center text-accent-foreground font-bold">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">John Doe</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">john@company.com</p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
