"use client"

import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export interface Appointment {
  id: string
  title: string
  time: string
  date: string
  duration: string
  type: "meeting" | "call" | "task" | "break"
  location?: string
  attendees?: string[]
  isLive?: boolean
  color: string
  description?: string
}

export interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  avatar?: string
}

export interface Task {
  id: string
  title: string
  description?: string
  dueDate?: string
  priority: "high" | "medium" | "low"
  completed: boolean
}

export interface Reminder {
  id: string
  title: string
  time: string
  date: string
}

export interface Notification {
  id: string
  type: "success" | "error" | "info" | "warning"
  title: string
  message: string
  timestamp: Date
}

interface AppState {
  appointments: Appointment[]
  contacts: Contact[]
  tasks: Task[]
  reminders: Reminder[]
  notifications: Notification[]
  selectedDate: Date
  activeView: string
}

interface AppActions {
  addAppointment: (appointment: Omit<Appointment, "id">) => void
  deleteAppointment: (id: string) => void
  addContact: (contact: Omit<Contact, "id">) => void
  deleteContact: (id: string) => void
  addTask: (task: Omit<Task, "id">) => void
  toggleTask: (id: string) => void
  deleteTask: (id: string) => void
  addReminder: (reminder: Omit<Reminder, "id">) => void
  deleteReminder: (id: string) => void
  addNotification: (notification: Omit<Notification, "id" | "timestamp">) => void
  dismissNotification: (id: string) => void
  setSelectedDate: (date: Date) => void
  setActiveView: (view: string) => void
}

interface AppContextValue extends AppState, AppActions {}

const AppContext = createContext<AppContextValue | undefined>(undefined)

const initialAppointments: Appointment[] = [
  {
    id: "1",
    title: "Team Standup",
    time: "09:00 AM",
    date: "2026-02-05",
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
    date: "2026-02-05",
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
    date: "2026-02-05",
    duration: "45 min",
    type: "call",
    attendees: ["John S."],
    color: "bg-amber-500",
  },
  {
    id: "4",
    title: "Lunch Break",
    time: "01:00 PM",
    date: "2026-02-05",
    duration: "1 hour",
    type: "break",
    color: "bg-slate-500",
  },
  {
    id: "5",
    title: "Design Sprint Planning",
    time: "02:30 PM",
    date: "2026-02-05",
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
    date: "2026-02-05",
    duration: "30 min",
    type: "task",
    color: "bg-purple-500",
  },
]

const initialContacts: Contact[] = [
  { id: "1", name: "Sarah K.", email: "sarah@company.com", company: "Tech Corp" },
  { id: "2", name: "Mike R.", email: "mike@company.com", company: "Tech Corp" },
  { id: "3", name: "Lisa M.", email: "lisa@company.com", company: "Design Inc" },
]

const initialTasks: Task[] = [
  { id: "1", title: "Review Q4 Reports", priority: "high", completed: false },
  { id: "2", title: "Update project roadmap", priority: "medium", completed: false },
  { id: "3", title: "Send client proposal", priority: "high", completed: true },
]

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments)
  const [contacts, setContacts] = useState<Contact[]>(initialContacts)
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [selectedDate, setSelectedDate] = useState(() => new Date(2026, 1, 5))
  const [activeView, setActiveView] = useState("Dashboard")

  const addAppointment = useCallback((appointment: Omit<Appointment, "id">) => {
    const newAppointment = {
      ...appointment,
      id: `apt-${Date.now()}`,
    }
    setAppointments((prev) => [...prev, newAppointment])
    addNotification({
      type: "success",
      title: "Meeting Scheduled",
      message: `"${appointment.title}" has been added to your calendar.`,
    })
  }, [])

  const deleteAppointment = useCallback((id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id))
  }, [])

  const addContact = useCallback((contact: Omit<Contact, "id">) => {
    const newContact = {
      ...contact,
      id: `contact-${Date.now()}`,
    }
    setContacts((prev) => [...prev, newContact])
    addNotification({
      type: "success",
      title: "Contact Added",
      message: `${contact.name} has been added to your contacts.`,
    })
  }, [])

  const deleteContact = useCallback((id: string) => {
    setContacts((prev) => prev.filter((c) => c.id !== id))
  }, [])

  const addTask = useCallback((task: Omit<Task, "id">) => {
    const newTask = {
      ...task,
      id: `task-${Date.now()}`,
    }
    setTasks((prev) => [...prev, newTask])
    addNotification({
      type: "success",
      title: "Task Created",
      message: `"${task.title}" has been added to your tasks.`,
    })
  }, [])

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }, [])

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const addReminder = useCallback((reminder: Omit<Reminder, "id">) => {
    const newReminder = {
      ...reminder,
      id: `reminder-${Date.now()}`,
    }
    setReminders((prev) => [...prev, newReminder])
    addNotification({
      type: "success",
      title: "Reminder Set",
      message: `Reminder for "${reminder.title}" has been set.`,
    })
  }, [])

  const deleteReminder = useCallback((id: string) => {
    setReminders((prev) => prev.filter((r) => r.id !== id))
  }, [])

  const addNotification = useCallback(
    (notification: Omit<Notification, "id" | "timestamp">) => {
      const newNotification: Notification = {
        ...notification,
        id: `notif-${Date.now()}`,
        timestamp: new Date(),
      }
      setNotifications((prev) => [newNotification, ...prev].slice(0, 10))
    },
    []
  )

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const value: AppContextValue = {
    appointments,
    contacts,
    tasks,
    reminders,
    notifications,
    selectedDate,
    activeView,
    addAppointment,
    deleteAppointment,
    addContact,
    deleteContact,
    addTask,
    toggleTask,
    deleteTask,
    addReminder,
    deleteReminder,
    addNotification,
    dismissNotification,
    setSelectedDate,
    setActiveView,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppState() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppState must be used within AppStateProvider")
  }
  return context
}
