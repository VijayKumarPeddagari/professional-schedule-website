"use client"

import React, { useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Video, UserPlus, FileText, Mail, Clock, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { NewEventDialog } from "@/components/dashboard/dialogs/new-event-dialog"
import { StartCallDialog } from "@/components/dashboard/dialogs/start-call-dialog"
import { AddContactDialog } from "@/components/dashboard/dialogs/add-contact-dialog"
import { NewTaskDialog } from "@/components/dashboard/dialogs/new-task-dialog"
import { SendInviteDialog } from "@/components/dashboard/dialogs/send-invite-dialog"
import { SetReminderDialog } from "@/components/dashboard/dialogs/set-reminder-dialog"

interface QuickAction {
  icon: React.ReactNode
  label: string
  color: string
  bgColor: string
  dialogKey: string
}

const quickActionsData: QuickAction[] = [
  {
    icon: <Plus className="w-5 h-5" />,
    label: "New Meeting",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10 hover:bg-blue-500/20",
    dialogKey: "newMeeting",
  },
  {
    icon: <Video className="w-5 h-5" />,
    label: "Start Call",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10 hover:bg-emerald-500/20",
    dialogKey: "startCall",
  },
  {
    icon: <UserPlus className="w-5 h-5" />,
    label: "Add Contact",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10 hover:bg-amber-500/20",
    dialogKey: "addContact",
  },
  {
    icon: <FileText className="w-5 h-5" />,
    label: "New Task",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10 hover:bg-purple-500/20",
    dialogKey: "newTask",
  },
  {
    icon: <Mail className="w-5 h-5" />,
    label: "Send Invite",
    color: "text-rose-500",
    bgColor: "bg-rose-500/10 hover:bg-rose-500/20",
    dialogKey: "sendInvite",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    label: "Set Reminder",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10 hover:bg-cyan-500/20",
    dialogKey: "setReminder",
  },
]

export function QuickActions() {
  const [dialogs, setDialogs] = useState({
    newMeeting: false,
    startCall: false,
    addContact: false,
    newTask: false,
    sendInvite: false,
    setReminder: false,
  })

  const openDialog = (key: string) => {
    setDialogs((prev) => ({ ...prev, [key]: true }))
  }

  const closeDialog = (key: string) => {
    setDialogs((prev) => ({ ...prev, [key]: false }))
  }

  return (
    <>
      <Card className="border-border/50 bg-card">
        <CardHeader className="flex flex-row items-center gap-2 pb-4">
          <Zap className="w-5 h-5 text-accent" />
          <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {quickActionsData.map((action, index) => (
              <Button
                key={action.label}
                variant="ghost"
                onClick={() => openDialog(action.dialogKey)}
                className={cn(
                  "h-auto flex-col gap-2 py-4 rounded-xl transition-all duration-300",
                  action.bgColor,
                  "animate-in fade-in zoom-in-95"
                )}
                style={{ animationDelay: `${index * 50}ms`, animationFillMode: "both" }}
              >
                <span className={action.color}>{action.icon}</span>
                <span className="text-xs font-medium text-foreground">{action.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <NewEventDialog open={dialogs.newMeeting} onOpenChange={(open) => closeDialog("newMeeting")} />
      <StartCallDialog open={dialogs.startCall} onOpenChange={(open) => closeDialog("startCall")} />
      <AddContactDialog open={dialogs.addContact} onOpenChange={(open) => closeDialog("addContact")} />
      <NewTaskDialog open={dialogs.newTask} onOpenChange={(open) => closeDialog("newTask")} />
      <SendInviteDialog open={dialogs.sendInvite} onOpenChange={(open) => closeDialog("sendInvite")} />
      <SetReminderDialog open={dialogs.setReminder} onOpenChange={(open) => closeDialog("setReminder")} />
    </>
  )
}
