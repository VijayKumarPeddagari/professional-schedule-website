"use client"

import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { Bell, Check, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { AppStateProvider } from "@/components/dashboard/app-state"

export default function NotificationsPage() {
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
                  <h2 className="text-xl font-bold text-foreground">Notifications</h2>
                  <p className="text-sm text-muted-foreground">Stay updated with your activity</p>
                </div>
              </div>

              <div className="flex-1 max-w-md mx-4 hidden md:block">
                <div className={`relative transition-all duration-300 ${searchFocused ? 'scale-105' : ''}`}>
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search notifications..."
                    className="pl-10 bg-muted/50 border-border/50 focus:bg-background focus:border-accent transition-all duration-300"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" className="hidden sm:flex gap-2">
                  <Check className="w-4 h-4" />
                  <span>Mark All Read</span>
                </Button>
                <ThemeToggle />
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-4 lg:p-6 overflow-auto">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card border border-border/50 rounded-xl p-6 lg:p-8">
                <h3 className="text-lg font-semibold mb-4">Recent Notifications</h3>
                <p className="text-muted-foreground">Your notifications will be displayed here.</p>
                
                {/* Placeholder notifications */}
                <div className="mt-6 space-y-3">
                  {[
                    { title: 'New meeting scheduled', time: '5 minutes ago', type: 'info' },
                    { title: 'Task completed', time: '1 hour ago', type: 'success' },
                    { title: 'Reminder: Client call at 3 PM', time: '2 hours ago', type: 'warning' },
                  ].map((notif, i) => (
                    <div 
                      key={i}
                      className="flex items-start gap-3 p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
                    >
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        notif.type === 'success' ? 'bg-emerald-500' :
                        notif.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                      }`} />
                      <div className="flex-1">
                        <p className="font-medium">{notif.title}</p>
                        <p className="text-sm text-muted-foreground">{notif.time}</p>
                      </div>
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
