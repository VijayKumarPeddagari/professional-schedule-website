"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Video, MapPin, Clock, ChevronRight, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { PulsingDot } from "@/components/animated-icons"

interface Appointment {
  id: string
  title: string
  time: string
  duration: string
  type: "meeting" | "call" | "task" | "break"
  location?: string
  attendees?: string[]
  isLive?: boolean
  color: string
}

const appointments: Appointment[] = [
  {
    id: "1",
    title: "Team Standup",
    time: "09:00 AM",
    duration: "30 min",
    type: "meeting",
    location: "Zoom Meeting",
    attendees: ["Sarah K.", "Mike R.", "Lisa M."],
    isLive: true,
    color: "bg-blue-500",
  },
  {
    id: "2",
    title: "Product Review",
    time: "10:30 AM",
    duration: "1 hour",
    type: "meeting",
    location: "Conference Room A",
    attendees: ["David L.", "Emma W."],
    color: "bg-emerald-500",
  },
  {
    id: "3",
    title: "Client Call - Acme Corp",
    time: "12:00 PM",
    duration: "45 min",
    type: "call",
    attendees: ["John S."],
    color: "bg-amber-500",
  },
  {
    id: "4",
    title: "Lunch Break",
    time: "01:00 PM",
    duration: "1 hour",
    type: "break",
    color: "bg-slate-500",
  },
  {
    id: "5",
    title: "Design Sprint Planning",
    time: "02:30 PM",
    duration: "2 hours",
    type: "meeting",
    location: "Design Lab",
    attendees: ["Alex T.", "Nina P.", "Chris B.", "Jordan K."],
    color: "bg-rose-500",
  },
  {
    id: "6",
    title: "Weekly Report Review",
    time: "05:00 PM",
    duration: "30 min",
    type: "task",
    color: "bg-purple-500",
  },
]

export function ScheduleTimeline() {
  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle className="text-lg font-semibold">Today&apos;s Schedule</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">Wednesday, February 5, 2026</p>
        </div>
        <Button variant="ghost" size="sm" className="text-accent hover:text-accent/80">
          View All <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {appointments.map((appointment, index) => (
          <div
            key={appointment.id}
            className={cn(
              "group relative flex gap-4 p-4 rounded-xl border border-border/50 bg-background/50 hover:bg-muted/50 hover:border-accent/30 transition-all duration-300 cursor-pointer",
              "animate-in fade-in slide-in-from-left-4",
              appointment.isLive && "border-accent/50 bg-accent/5"
            )}
            style={{ animationDelay: `${index * 50}ms`, animationFillMode: "both" }}
          >
            {/* Time indicator line */}
            <div className="flex flex-col items-center">
              <div className={cn("w-3 h-3 rounded-full", appointment.color)} />
              {index < appointments.length - 1 && (
                <div className="w-0.5 flex-1 bg-border mt-2" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-foreground truncate">{appointment.title}</h4>
                    {appointment.isLive && (
                      <Badge variant="secondary" className="bg-accent/20 text-accent text-xs px-2 py-0 h-5 flex items-center gap-1">
                        <PulsingDot color="bg-accent" className="scale-75" />
                        Live
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1.5 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {appointment.time}
                    </span>
                    <span className="text-muted-foreground/50">•</span>
                    <span>{appointment.duration}</span>
                    {appointment.location && (
                      <>
                        <span className="text-muted-foreground/50">•</span>
                        <span className="flex items-center gap-1">
                          {appointment.location.includes("Zoom") ? (
                            <Video className="w-3.5 h-3.5" />
                          ) : (
                            <MapPin className="w-3.5 h-3.5" />
                          )}
                          {appointment.location}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Attendees */}
                {appointment.attendees && appointment.attendees.length > 0 && (
                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      {appointment.attendees.slice(0, 3).map((attendee, i) => (
                        <div
                          key={attendee}
                          className="w-7 h-7 rounded-full bg-gradient-to-br from-accent/80 to-accent/40 border-2 border-background flex items-center justify-center text-[10px] font-semibold text-accent-foreground"
                          title={attendee}
                        >
                          {attendee.split(" ").map(n => n[0]).join("")}
                        </div>
                      ))}
                      {appointment.attendees.length > 3 && (
                        <div className="w-7 h-7 rounded-full bg-muted border-2 border-background flex items-center justify-center text-[10px] font-semibold text-muted-foreground">
                          +{appointment.attendees.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300 pointer-events-none" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
