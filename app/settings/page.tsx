"use client"

import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { Bell, Search, Settings as SettingsIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { AppStateProvider } from "@/components/dashboard/app-state"

export default function SettingsPage() {
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
                  <h2 className="text-xl font-bold text-foreground">Settings</h2>
                  <p className="text-sm text-muted-foreground">Manage your preferences</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <ThemeToggle />
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-4 lg:p-6 overflow-auto">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Account Settings */}
              <div className="bg-card border border-border/50 rounded-xl p-6 lg:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <SettingsIcon className="w-5 h-5 text-accent" />
                  <h3 className="text-lg font-semibold">Account Settings</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Display Name</label>
                      <Input defaultValue="John Doe" className="bg-muted/50" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email</label>
                      <Input defaultValue="john@company.com" className="bg-muted/50" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="bg-card border border-border/50 rounded-xl p-6 lg:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Bell className="w-5 h-5 text-accent" />
                  <h3 className="text-lg font-semibold">Notification Preferences</h3>
                </div>
                
                <div className="space-y-4">
                  {['Email notifications', 'Push notifications', 'Meeting reminders', 'Task alerts'].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                      <span className="font-medium">{item}</span>
                      <input type="checkbox" defaultChecked className="w-5 h-5 accent-accent" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Theme Settings */}
              <div className="bg-card border border-border/50 rounded-xl p-6 lg:p-8">
                <h3 className="text-lg font-semibold mb-6">Appearance</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="outline" className="flex-1 min-w-[120px]">Light Mode</Button>
                  <Button variant="outline" className="flex-1 min-w-[120px]">Dark Mode</Button>
                  <Button variant="default" className="flex-1 min-w-[120px] bg-accent">System</Button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </AppStateProvider>
  )
}
