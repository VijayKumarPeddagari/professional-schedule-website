"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useAppState } from "@/components/dashboard/app-state"
import { Bell, Check, Info, AlertTriangle, XCircle, CheckCircle, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDialogPosition } from "@/hooks/use-dialog-position"

interface NotificationsPanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const iconMap = {
  success: <CheckCircle className="w-4 h-4" />,
  error: <XCircle className="w-4 h-4" />,
  warning: <AlertTriangle className="w-4 h-4" />,
  info: <Info className="w-4 h-4" />,
}

const colorMap = {
  success: "text-emerald-500 bg-emerald-500/10",
  error: "text-red-500 bg-red-500/10",
  warning: "text-amber-500 bg-amber-500/10",
  info: "text-blue-500 bg-blue-500/10",
}

export function NotificationsPanel({ open, onOpenChange }: NotificationsPanelProps) {
  const { notifications, dismissNotification } = useAppState()
  const position = useDialogPosition()

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

return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-[450px] bg-card border-border max-h-[85vh] overflow-hidden flex flex-col"
        style={{
          position: "fixed",
          left: position.left,
          top: "10%",
          transform: position.transform,
        } as React.CSSProperties}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Bell className="w-5 h-5 text-accent" />
            Notifications
          </DialogTitle>
          <DialogDescription>
            Stay updated with your recent activity
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
              <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                <Bell className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-foreground mb-1">All caught up!</h3>
              <p className="text-sm text-muted-foreground">
                You have no new notifications at the moment.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border -mx-6">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="px-6 py-4 hover:bg-muted/30 transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "p-2 rounded-lg shrink-0",
                        colorMap[notification.type]
                      )}
                    >
                      {iconMap[notification.type]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-foreground">
                        {notification.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground/60 mt-1">
                        {formatTime(notification.timestamp)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                      onClick={() => dismissNotification(notification.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="sr-only">Dismiss</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {notifications.length > 0 && (
          <div className="pt-4 border-t border-border">
            <Button variant="outline" className="w-full gap-2 bg-transparent" size="sm">
              <Check className="w-4 h-4" />
              Mark All as Read
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
