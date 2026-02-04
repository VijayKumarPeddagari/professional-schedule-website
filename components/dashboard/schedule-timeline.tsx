"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Video, MapPin, Clock, ChevronRight, Trash2, MoreVertical } from "lucide-react"
import { cn } from "@/lib/utils"
import { PulsingDot } from "@/components/animated-icons"
import { useAppState } from "@/components/dashboard/app-state"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function ScheduleTimeline() {
  const { appointments, deleteAppointment } = useAppState()
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const todayAppointments = appointments.filter((apt) => apt.date === "2026-02-05")

  const handleDelete = () => {
    if (deleteId) {
      deleteAppointment(deleteId)
      setDeleteId(null)
    }
  }

  return (
    <>
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
          {todayAppointments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No appointments scheduled for today</p>
            </div>
          ) : (
            todayAppointments.map((appointment, index) => (
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
                  {index < todayAppointments.length - 1 && (
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

                    {/* Actions Menu */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreVertical className="w-4 h-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => setDeleteId(appointment.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Attendees */}
                    {appointment.attendees && appointment.attendees.length > 0 && (
                      <div className="flex items-center">
                        <div className="flex -space-x-2">
                          {appointment.attendees.slice(0, 3).map((attendee) => (
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
            ))
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Appointment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this appointment? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
