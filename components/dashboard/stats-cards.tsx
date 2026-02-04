"use client"

import React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  AnimatedCalendarIcon,
  AnimatedClockIcon,
  AnimatedCheckIcon,
  AnimatedUserIcon,
} from "@/components/animated-icons"
import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAppState } from "@/components/dashboard/app-state"

export function StatsCards() {
  const { appointments, tasks, contacts } = useAppState()

  const todayMeetings = appointments.filter((apt) => apt.date === "2026-02-05").length
  const completedTasks = tasks.filter((t) => t.completed).length
  const totalTasks = tasks.length
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  const stats = [
    {
      title: "Today's Meetings",
      value: todayMeetings.toString(),
      change: "+2 from yesterday",
      trend: "up" as const,
      icon: <AnimatedCalendarIcon className="w-6 h-6" />,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Hours Scheduled",
      value: "6.5h",
      change: "+1.5h from avg",
      trend: "up" as const,
      icon: <AnimatedClockIcon className="w-6 h-6" />,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      title: "Completed Tasks",
      value: `${completedTasks}/${totalTasks}`,
      change: `${completionRate}% completion`,
      trend: completionRate >= 50 ? "up" as const : "down" as const,
      icon: <AnimatedCheckIcon className="w-6 h-6" />,
      color: "from-amber-500 to-amber-600",
    },
    {
      title: "Contacts",
      value: contacts.length.toString(),
      change: "3 online now",
      trend: "up" as const,
      icon: <AnimatedUserIcon className="w-6 h-6" />,
      color: "from-rose-500 to-rose-600",
    },
  ]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card
          key={stat.title}
          className={cn(
            "group relative overflow-hidden border-border/50 bg-card hover:border-accent/50 transition-all duration-500 hover:shadow-lg hover:shadow-accent/5",
            "animate-in fade-in slide-in-from-bottom-4"
          )}
          style={{ animationDelay: `${index * 100}ms`, animationFillMode: "both" }}
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground font-medium">{stat.title}</p>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <div className="flex items-center gap-1">
                  {stat.trend === "up" ? (
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={cn(
                    "text-xs font-medium",
                    stat.trend === "up" ? "text-emerald-500" : "text-red-500"
                  )}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={cn(
                "p-3 rounded-xl bg-gradient-to-br text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
                stat.color
              )}>
                {stat.icon}
              </div>
            </div>

            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
