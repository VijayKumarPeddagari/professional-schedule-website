"use client"

import { Bell, Menu, Search, Plus } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PulsingDot } from "@/components/animated-icons"
import { useState } from "react"

interface HeaderProps {
  onMenuClick?: () => void
}

export function DashboardHeader({ onMenuClick }: HeaderProps) {
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="flex items-center justify-between px-4 lg:px-6 h-16">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="w-5 h-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          
          <div className="hidden sm:block">
            <h2 className="text-xl font-bold text-foreground">Good Morning, John</h2>
            <p className="text-sm text-muted-foreground">
              You have <span className="text-accent font-semibold">4 meetings</span> scheduled today
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <div className={`relative transition-all duration-300 ${searchFocused ? 'scale-105' : ''}`}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search appointments, contacts..."
              className="pl-10 bg-muted/50 border-border/50 focus:bg-background focus:border-accent transition-all duration-300"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          <Button
            className="hidden sm:flex gap-2 bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/20 transition-all duration-300 hover:shadow-accent/40 hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>New Event</span>
          </Button>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1">
              <PulsingDot color="bg-red-500" />
            </span>
            <span className="sr-only">Notifications</span>
          </Button>

          <ThemeToggle />

          <div className="hidden sm:flex items-center gap-3 ml-2 pl-4 border-l border-border">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center text-accent-foreground font-bold text-sm">
                JD
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
