"use client"

import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { AppStateProvider } from "@/components/dashboard/app-state"

export default function AnalyticsPage() {
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
                  <h2 className="text-xl font-bold text-foreground">Analytics</h2>
                  <p className="text-sm text-muted-foreground">Track your productivity</p>
                </div>
              </div>

              <div className="flex-1 max-w-md mx-4 hidden md:block">
                <div className={`relative transition-all duration-300 ${searchFocused ? 'scale-105' : ''}`}>
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search analytics..."
                    className="pl-10 bg-muted/50 border-border/50 focus:bg-background focus:border-accent transition-all duration-300"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <ThemeToggle />
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-4 lg:p-6 overflow-auto">
            <div className="max-w-6xl mx-auto">
              <div className="bg-card border border-border/50 rounded-xl p-6 lg:p-8">
                <h3 className="text-lg font-semibold mb-4">Productivity Analytics</h3>
                <p className="text-muted-foreground">Your productivity charts and statistics will be displayed here.</p>
                
                {/* Placeholder analytics cards */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { label: 'Meetings This Week', value: '12' },
                    { label: 'Tasks Completed', value: '28' },
                    { label: 'Productivity Score', value: '85%' },
                  ].map((stat, i) => (
                    <div 
                      key={i}
                      className="p-6 border border-border/50 rounded-lg bg-muted/20"
                    >
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-3xl font-bold mt-2">{stat.value}</p>
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
