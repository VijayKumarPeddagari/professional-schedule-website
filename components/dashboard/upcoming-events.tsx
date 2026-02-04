"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Video, ChevronRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface UpcomingEvent {
  id: string
  title: string
  date: string
  time: string
  type: "virtual" | "in-person"
  priority: "high" | "medium" | "low"
}

const upcomingEvents: UpcomingEvent[] = [
  {
    id: "1",
    title: "Quarterly Business Review",
    date: "Tomorrow",
    time: "10:00 AM",
    type: "virtual",
    priority: "high",
  },
  {
    id: "2",
    title: "Team Building Workshop",
    date: "Feb 7",
    time: "2:00 PM",
    type: "in-person",
    priority: "medium",
  },
  {
    id: "3",
    title: "Product Launch Meeting",
    date: "Feb 10",
    time: "9:30 AM",
    type: "virtual",
    priority: "high",
  },
  {
    id: "4",
    title: "1:1 with Manager",
    date: "Feb 12",
    time: "3:00 PM",
    type: "virtual",
    priority: "medium",
  },
]

const priorityColors = {
  high: "bg-red-500/10 text-red-500 border-red-500/20",
  medium: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  low: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
}

export function UpcomingEvents() {
  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg font-semibold">Upcoming Events</CardTitle>
          <Sparkles className="w-4 h-4 text-accent animate-pulse" />
        </div>
        <Button variant="ghost" size="sm" className="text-accent hover:text-accent/80">
          See All <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {upcomingEvents.map((event, index) => (
          <div
            key={event.id}
            className={cn(
              "group p-4 rounded-xl border border-border/50 bg-background/50 hover:bg-muted/50 hover:border-accent/30 transition-all duration-300 cursor-pointer",
              "animate-in fade-in slide-in-from-right-4"
            )}
            style={{ animationDelay: `${index * 75}ms`, animationFillMode: "both" }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-foreground truncate group-hover:text-accent transition-colors">
                    {event.title}
                  </h4>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {event.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {event.time}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge
                  variant="outline"
                  className={cn("text-xs capitalize", priorityColors[event.priority])}
                >
                  {event.priority}
                </Badge>
                {event.type === "virtual" && (
                  <Video className="w-4 h-4 text-accent" />
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
