"use client"

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
import { Switch } from "@/components/ui/switch"
import { useAppState } from "@/components/dashboard/app-state"
import { Video, Mic, Camera, Phone, Copy, Check } from "lucide-react"

interface StartCallDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function StartCallDialog({ open, onOpenChange }: StartCallDialogProps) {
  const { addNotification } = useAppState()
  const [meetingName, setMeetingName] = useState("Quick Meeting")
  const [camera, setCamera] = useState(true)
  const [microphone, setMicrophone] = useState(true)
  const [copied, setCopied] = useState(false)

  const meetingLink = "https://meet.schedulepro.com/jd-" + Math.random().toString(36).substring(7)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(meetingLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleStartCall = () => {
    addNotification({
      type: "info",
      title: "Call Started",
      message: `${meetingName} has started. Camera: ${camera ? "On" : "Off"}, Mic: ${microphone ? "On" : "Off"}`,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Video className="w-5 h-5 text-accent" />
            Start Video Call
          </DialogTitle>
          <DialogDescription>
            Configure your call settings before starting.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="meetingName">Meeting Name</Label>
            <Input
              id="meetingName"
              placeholder="Enter meeting name"
              value={meetingName}
              onChange={(e) => setMeetingName(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">Call Settings</h4>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Camera className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-sm">Camera</p>
                  <p className="text-xs text-muted-foreground">Turn on your camera</p>
                </div>
              </div>
              <Switch checked={camera} onCheckedChange={setCamera} />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Mic className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-sm">Microphone</p>
                  <p className="text-xs text-muted-foreground">Turn on your microphone</p>
                </div>
              </div>
              <Switch checked={microphone} onCheckedChange={setMicrophone} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Meeting Link</Label>
            <div className="flex gap-2">
              <Input
                value={meetingLink}
                readOnly
                className="bg-muted/50 text-sm"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleCopyLink}
                className="shrink-0 bg-transparent"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleStartCall}
              className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2"
            >
              <Phone className="w-4 h-4" />
              Start Call
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
