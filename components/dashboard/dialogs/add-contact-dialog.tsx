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
import { UserPlus, Mail, Phone, Building } from "lucide-react"
import { useDialogPosition } from "@/hooks/use-dialog-position"

interface AddContactDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddContactDialog({ open, onOpenChange }: AddContactDialogProps) {
  const { addContact } = useAppState()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [company, setCompany] = useState("")
  const position = useDialogPosition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email) return

    addContact({
      name,
      email,
      phone: phone || undefined,
      company: company || undefined,
    })

    // Reset form
    setName("")
    setEmail("")
    setPhone("")
    setCompany("")
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
            <UserPlus className="w-5 h-5 text-accent" />
            Add New Contact
          </DialogTitle>
          <DialogDescription>
            Add a new contact to your address book.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" />
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company" className="flex items-center gap-1">
              <Building className="w-3.5 h-3.5" />
              Company
            </Label>
            <Input
              id="company"
              placeholder="Acme Corp"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Add Contact
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
