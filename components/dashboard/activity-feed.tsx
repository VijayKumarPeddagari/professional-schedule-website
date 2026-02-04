"use client"

import React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle2, XCircle, Calendar, UserPlus, MessageSquare, ChevronRight, Info, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAppState } from "@/components/dashboard/app-state"

const defaultActivities = [
  {
    id: "1",
    type: "completed" as const,
    title: "Meeting Completed",
    description: "Team Standup finished",
    time: "2 min ago",
  },
  {
    id: "2",
    type: "scheduled" as const,
    title: "New Meeting Scheduled",
    description: "Product Review at 10:30 AM",
    time: "15 min ago",
  },
  {
    id: "3",
    type: "joined" as const,
    title: "New Team Member",
    description: "Sarah K. joined Design Team",
    time: "1 hour ago",
  },
  {
    id: "4",
    type: "cancelled" as const,
    title: "Meeting Cancelled",
    description: "Budget Review rescheduled",
    time: "2 hours ago",
  },
  {
    id: "5",
    type: "message" as const,
    title: "New Message",
    description: "Mike R. sent you a message",
    time: "3 hours ago",
  },
]

const iconMap = {
  completed: <CheckCircle2 className="w-4 h-4" />,
  cancelled: <XCircle className="w-4 h-4" />,
  scheduled: <Calendar className="w-4 h-4" />,
  joined: <UserPlus className="w-4 h-4" />,
  message: <MessageSquare className="w-4 h-4" />,
  success: <CheckCircle2 className="w-4 h-4" />,
  error: <XCircle className="w-4 h-4" />,
  info: <Info className="w-4 h-4" />,
  warning: <AlertTriangle className="w-4 h-4" />,
}

const colorMap = {
  completed: "text-emerald-500 bg-emerald-500/10",
  cancelled: "text-red-500 bg-red-500/10",
  scheduled: "text-blue-500 bg-blue-500/10",
  joined: "text-purple-500 bg-purple-500/10",
  message: "text-amber-500 bg-amber-500/10",
  success: "text-emerald-500 bg-emerald-500/10",
  error: "text-red-500 bg-red-500/10",
  info: "text-blue-500 bg-blue-500/10",
  warning: "text-amber-500 bg-amber-500/10",
}

export function ActivityFeed() {
  const { notifications } = useAppState()

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return date.toLocaleDateString()
  }

  // Convert notifications to activities format
  const notificationActivities = notifications.slice(0, 3).map((n) => ({
    id: n.id,
    type: n.type,
    title: n.title,
    description: n.message,
    time: formatTime(n.timestamp),
  }))

  // Combine with default activities
  const activities = [...notificationActivities, ...defaultActivities.slice(0, 5 - notificationActivities.length)]
  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-accent" />
          <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
        </div>
        <Button variant="ghost" size="sm" className="text-accent hover:text-accent/80">
          View All <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className={cn(
              "flex items-start gap-3 group animate-in fade-in slide-in-from-bottom-2"
            )}
            style={{ animationDelay: `${index * 50}ms`, animationFillMode: "both" }}
          >
            <div className={cn("p-2 rounded-lg shrink-0", colorMap[activity.type as keyof typeof colorMap] || colorMap.info)}>
              {iconMap[activity.type as keyof typeof iconMap] || iconMap.info}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{activity.title}</p>
              <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
            </div>
            <span className="text-xs text-muted-foreground shrink-0">{activity.time}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
