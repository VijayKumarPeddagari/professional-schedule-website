"use client"

import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { ScheduleTimeline } from "@/components/dashboard/schedule-timeline"
import { CalendarWidget } from "@/components/dashboard/calendar-widget"
import { UpcomingEvents } from "@/components/dashboard/upcoming-events"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { ProductivityChart } from "@/components/dashboard/productivity-chart"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import { Bell, Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { PulsingDot } from "@/components/animated-icons"
import { useState } from "react"

export default function DashboardPage() {
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
          <div className="flex items-center justify-between px-4 lg:px-6 h-16">
            {/* Left Side */}
            <div className="flex items-center gap-4">
              <MobileNav />
              
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

        {/* Main Content Area */}
        <main className="flex-1 p-4 lg:p-6 space-y-6 overflow-auto">
          {/* Stats Cards */}
          <StatsCards />

          {/* Main Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Column - Schedule */}
            <div className="xl:col-span-2 space-y-6">
              <ScheduleTimeline />
              <ProductivityChart />
            </div>

            {/* Right Column - Calendar & Quick Actions */}
            <div className="space-y-6">
              <CalendarWidget />
              <QuickActions />
              <UpcomingEvents />
              <ActivityFeed />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border py-4 px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
            <p>© 2026 SchedulePro. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#privacy" className="hover:text-accent transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-accent transition-colors">Terms of Service</a>
              <a href="#help" className="hover:text-accent transition-colors">Help Center</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
