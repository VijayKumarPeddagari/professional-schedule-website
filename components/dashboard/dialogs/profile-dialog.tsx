"use client"

import React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Mail,
  Phone,
  Building2,
  Calendar,
  Clock,
  Briefcase,
  Award,
  Edit,
  Settings,
  LogOut,
} from "lucide-react"
import { useDialogPosition } from "@/hooks/use-dialog-position"

interface ProfileDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const userProfile = {
  name: "John Doe",
  role: "Senior Project Manager",
  age: 34,
  email: "john.doe@company.com",
  phone: "+1 (555) 123-4567",
  company: "Tech Innovations Inc.",
  department: "Product Development",
  joinDate: "March 15, 2021",
  totalProjects: 12,
  completedProjects: 9,
  avatar: null,
}

export function ProfileDialog({ open, onOpenChange }: ProfileDialogProps) {
  const position = useDialogPosition()
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-[450px] bg-card border-border max-h-[85vh] overflow-y-auto"
        style={{
          position: "fixed",
          left: position.left,
          top: "10%",
          transform: position.transform,
        } as React.CSSProperties}
      >
        <DialogHeader>
          <div className="flex flex-col items-center pb-4">
            <Avatar className="w-24 h-24 mb-4">
              <AvatarImage src="/placeholder-user.jpg" alt={userProfile.name} />
              <AvatarFallback className="bg-gradient-to-br from-accent to-accent/50 text-accent-foreground text-2xl font-bold">
                {userProfile.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              {userProfile.name}
            </DialogTitle>
            <DialogDescription className="text-center">
              <Badge variant="secondary" className="mt-2 bg-accent/20 text-accent">
                {userProfile.role}
              </Badge>
            </DialogDescription>
          </div>
        </DialogHeader>

        <Separator />

        <div className="space-y-4 py-4">
          {/* Personal Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
              <User className="w-4 h-4" />
              Personal Information
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Age:</span>
                <span className="font-medium">{userProfile.age} years</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Experience:</span>
                <span className="font-medium">8 years</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Contact Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Contact Details
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium">{userProfile.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Phone:</span>
                <span className="font-medium">{userProfile.phone}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Work Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Work Information
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Company:</span>
                <span className="font-medium">{userProfile.company}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Department:</span>
                <span className="font-medium">{userProfile.department}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Joined:</span>
                <span className="font-medium">{userProfile.joinDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Projects:</span>
                <span className="font-medium">{userProfile.completedProjects}/{userProfile.totalProjects}</span>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex gap-2 pt-2">
          <Button variant="outline" className="flex-1 gap-2">
            <Edit className="w-4 h-4" />
            Edit Profile
          </Button>
          <Button variant="outline" className="flex-1 gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </Button>
        </div>

        <Button variant="ghost" className="w-full gap-2 text-muted-foreground hover:text-destructive">
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </DialogContent>
    </Dialog>
  )
}

