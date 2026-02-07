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
import { useAppState } from "@/components/dashboard/app-state"
import { Clock, Calendar, Bell } from "lucide-react"
import { useDialogPosition } from "@/hooks/use-dialog-position"

interface SetReminderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SetReminderDialog({ open, onOpenChange }: SetReminderDialogProps) {
  const { addReminder } = useAppState()
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const position = useDialogPosition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !date || !time) return

    addReminder({
      title,
      date,
      time,
    })

    // Reset form
    setTitle("")
    setDate("")
    setTime("")
    onOpenChange(false)
  }

return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-[400px] bg-card border-border max-h-[85vh] overflow-y-auto"
        style={{
          position: "fixed",
          left: position.left,
          top: "10%",
          transform: position.transform,
        } as React.CSSProperties}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Bell className="w-5 h-5 text-accent" />
            Set Reminder
          </DialogTitle>
          <DialogDescription>
            Create a reminder to never miss important tasks.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Reminder Title *</Label>
            <Input
              id="title"
              placeholder="What do you want to be reminded about?"
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

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Set Reminder
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
