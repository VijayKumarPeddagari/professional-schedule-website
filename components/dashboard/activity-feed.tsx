"use client"

import React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle2, XCircle, Calendar, UserPlus, MessageSquare, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Activity {
  id: string
  type: "completed" | "cancelled" | "scheduled" | "joined" | "message"
  title: string
  description: string
  time: string
  icon: React.ReactNode
  color: string
}

const activities: Activity[] = [
  {
    id: "1",
    type: "completed",
    title: "Meeting Completed",
    description: "Team Standup finished",
    time: "2 min ago",
    icon: <CheckCircle2 className="w-4 h-4" />,
    color: "text-emerald-500 bg-emerald-500/10",
  },
  {
    id: "2",
    type: "scheduled",
    title: "New Meeting Scheduled",
    description: "Product Review at 10:30 AM",
    time: "15 min ago",
    icon: <Calendar className="w-4 h-4" />,
    color: "text-blue-500 bg-blue-500/10",
  },
  {
    id: "3",
    type: "joined",
    title: "New Team Member",
    description: "Sarah K. joined Design Team",
    time: "1 hour ago",
    icon: <UserPlus className="w-4 h-4" />,
    color: "text-purple-500 bg-purple-500/10",
  },
  {
    id: "4",
    type: "cancelled",
    title: "Meeting Cancelled",
    description: "Budget Review rescheduled",
    time: "2 hours ago",
    icon: <XCircle className="w-4 h-4" />,
    color: "text-red-500 bg-red-500/10",
  },
  {
    id: "5",
    type: "message",
    title: "New Message",
    description: "Mike R. sent you a message",
    time: "3 hours ago",
    icon: <MessageSquare className="w-4 h-4" />,
    color: "text-amber-500 bg-amber-500/10",
  },
]

export function ActivityFeed() {
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
            <div className={cn("p-2 rounded-lg shrink-0", activity.color)}>
              {activity.icon}
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
