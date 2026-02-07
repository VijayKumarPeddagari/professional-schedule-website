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
import { FileText, Calendar, Flag } from "lucide-react"
import { useDialogPosition } from "@/hooks/use-dialog-position"

interface NewTaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewTaskDialog({ open, onOpenChange }: NewTaskDialogProps) {
  const { addTask } = useAppState()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [priority, setPriority] = useState<"high" | "medium" | "low">("medium")
  const position = useDialogPosition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title) return

    addTask({
      title,
      description: description || undefined,
      dueDate: dueDate || undefined,
      priority,
      completed: false,
    })

    // Reset form
    setTitle("")
    setDescription("")
    setDueDate("")
    setPriority("medium")
    onOpenChange(false)
  }

return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-[425px] bg-card border-border max-h-[85vh] overflow-y-auto"
        style={{
          position: "fixed",
          left: position.left,
          top: "10%",
          transform: position.transform,
        } as React.CSSProperties}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <FileText className="w-5 h-5 text-accent" />
            Create New Task
          </DialogTitle>
          <DialogDescription>
            Add a new task to your to-do list.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Task Title *</Label>
            <Input
              id="title"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Add task details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dueDate" className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Due Date
              </Label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority" className="flex items-center gap-1">
                <Flag className="w-3.5 h-3.5" />
                Priority
              </Label>
              <Select value={priority} onValueChange={(v) => setPriority(v as typeof priority)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500" /> High
                    </span>
                  </SelectItem>
                  <SelectItem value="medium">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500" /> Medium
                    </span>
                  </SelectItem>
                  <SelectItem value="low">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" /> Low
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Create Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
