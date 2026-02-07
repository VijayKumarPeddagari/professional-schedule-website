"use client"

import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { Bell, Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { AppStateProvider } from "@/components/dashboard/app-state"

export default function SchedulePage() {
  const [searchFocused, setSearchFocused] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <AppStateProvider>
      <div className="min-h-screen bg-background flex">
        <DashboardSidebar />
        
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
            <div className="flex items-center justify-between px-4 lg:px-6 h-16">
              <div className="flex items-center gap-4">
                <MobileNav />
                <div className="hidden sm:block">
                  <h2 className="text-xl font-bold text-foreground">Schedule</h2>
                  <p className="text-sm text-muted-foreground">Manage your daily schedule</p>
                </div>
              </div>

              <div className="flex-1 max-w-md mx-4 hidden md:block">
                <div className={`relative transition-all duration-300 ${searchFocused ? 'scale-105' : ''}`}>
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search schedule..."
                    className="pl-10 bg-muted/50 border-border/50 focus:bg-background focus:border-accent transition-all duration-300"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button className="hidden sm:flex gap-2 bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/20 transition-all duration-300 hover:shadow-accent/40 hover:scale-105">
                  <Plus className="w-4 h-4" />
                  <span>Add Event</span>
                </Button>
                <ThemeToggle />
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-4 lg:p-6 overflow-auto">
            <div className="max-w-6xl mx-auto">
              <div className="bg-card border border-border/50 rounded-xl p-6 lg:p-8">
                <h3 className="text-lg font-semibold mb-4">Today's Schedule</h3>
                <p className="text-muted-foreground">Your schedule timeline will be displayed here.</p>
                
                {/* Placeholder schedule items */}
                <div className="mt-6 space-y-3">
                  {['9:00 AM - Team Standup', '11:00 AM - Client Meeting', '2:00 PM - Project Review', '4:00 PM - Weekly Planning'].map((item, i) => (
                    <div 
                      key={i}
                      className="flex items-center gap-4 p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
                    >
                      <div className="w-2 h-2 rounded-full bg-accent" />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </AppStateProvider>
  )
}
