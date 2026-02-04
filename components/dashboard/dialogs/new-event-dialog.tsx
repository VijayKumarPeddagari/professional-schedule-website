"use client"

import React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAppState } from "@/components/dashboard/app-state"
import { Calendar, Clock, MapPin, Users, Video } from "lucide-react"

interface NewEventDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const eventColors = [
  { value: "bg-blue-500", label: "Blue" },
  { value: "bg-emerald-500", label: "Green" },
  { value: "bg-amber-500", label: "Orange" },
  { value: "bg-rose-500", label: "Red" },
  { value: "bg-purple-500", label: "Purple" },
  { value: "bg-cyan-500", label: "Cyan" },
]

export function NewEventDialog({ open, onOpenChange }: NewEventDialogProps) {
  const { addAppointment } = useAppState()
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [duration, setDuration] = useState("30 min")
  const [type, setType] = useState<"meeting" | "call" | "task" | "break">("meeting")
  const [location, setLocation] = useState("")
  const [attendees, setAttendees] = useState("")
  const [description, setDescription] = useState("")
  const [color, setColor] = useState("bg-blue-500")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !date || !time) return

    addAppointment({
      title,
      date,
      time,
      duration,
      type,
      location: location || undefined,
      attendees: attendees ? attendees.split(",").map((a) => a.trim()) : undefined,
      description,
      color,
      isLive: false,
    })

    // Reset form
    setTitle("")
    setDate("")
    setTime("")
    setDuration("30 min")
    setType("meeting")
    setLocation("")
    setAttendees("")
    setDescription("")
    setColor("bg-blue-500")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Calendar className="w-5 h-5 text-accent" />
            Schedule New Event
          </DialogTitle>
          <DialogDescription>
            Add a new event to your calendar. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Event Title *</Label>
            <Input
              id="title"
              placeholder="Enter event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Date *
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time" className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Time *
              </Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15 min">15 minutes</SelectItem>
                  <SelectItem value="30 min">30 minutes</SelectItem>
                  <SelectItem value="45 min">45 minutes</SelectItem>
                  <SelectItem value="1 hour">1 hour</SelectItem>
                  <SelectItem value="1.5 hours">1.5 hours</SelectItem>
                  <SelectItem value="2 hours">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Event Type</Label>
              <Select value={type} onValueChange={(v) => setType(v as typeof type)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="meeting">
                    <span className="flex items-center gap-2">
                      <Users className="w-4 h-4" /> Meeting
                    </span>
                  </SelectItem>
                  <SelectItem value="call">
                    <span className="flex items-center gap-2">
                      <Video className="w-4 h-4" /> Call
                    </span>
                  </SelectItem>
                  <SelectItem value="task">
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Task
                    </span>
                  </SelectItem>
                  <SelectItem value="break">
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Break
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              Location
            </Label>
            <Input
              id="location"
              placeholder="Zoom Meeting / Conference Room A"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="attendees" className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              Attendees
            </Label>
            <Input
              id="attendees"
              placeholder="John D., Sarah K., Mike R."
              value={attendees}
              onChange={(e) => setAttendees(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Separate names with commas</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Add event details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Event Color</Label>
            <div className="flex gap-2">
              {eventColors.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setColor(c.value)}
                  className={`w-8 h-8 rounded-full ${c.value} transition-all ${
                    color === c.value ? "ring-2 ring-offset-2 ring-accent scale-110" : "hover:scale-105"
                  }`}
                  title={c.label}
                />
              ))}
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Create Event
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
