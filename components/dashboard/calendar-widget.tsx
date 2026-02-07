"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

interface CalendarDay {
  day: number
  isCurrentMonth: boolean
  isToday: boolean
  hasEvents: boolean
  eventCount?: number
}

function generateCalendarDays(year: number, month: number): CalendarDay[] {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()
  const today = new Date()

  const days: CalendarDay[] = []

  // Previous month days
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
      isToday: false,
      hasEvents: false,
    })
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday =
      i === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()

    // Simulate some events
    const hasEvents = [5, 8, 12, 15, 18, 22, 25].includes(i)
    const eventCount = hasEvents ? Math.floor(Math.random() * 3) + 1 : 0

    days.push({
      day: i,
      isCurrentMonth: true,
      isToday,
      hasEvents,
      eventCount,
    })
  }

  // Next month days
  const remainingDays = 42 - days.length
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      day: i,
      isCurrentMonth: false,
      isToday: false,
      hasEvents: false,
    })
  }

  return days
}

export function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 5)) // Feb 5, 2026
  const [selectedDay, setSelectedDay] = useState<number | null>(5)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const days = generateCalendarDays(year, month)

  const goToPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
    setSelectedDay(null)
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
    setSelectedDay(null)
  }

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base sm:text-lg font-semibold">Calendar</CardTitle>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={goToPrevMonth}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-xs sm:text-sm font-medium min-w-[100px] sm:min-w-[120px] text-center">
            {MONTHS[month]} {year}
          </span>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={goToNextMonth}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-0.5 sm:gap-1 mb-1 sm:mb-2">
          {DAYS.map((day) => (
            <div
              key={day}
              className="text-center text-[10px] sm:text-xs font-medium text-muted-foreground py-1 sm:py-2"
            >
              <span className="hidden sm:inline">{day}</span>
              <span className="sm:hidden">{day.slice(0, 2)}</span>
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
          {days.map((day, index) => (
            <button
              type="button"
              key={`${day.day}-${index}`}
              onClick={() => day.isCurrentMonth && setSelectedDay(day.day)}
              className={cn(
                "relative aspect-square flex flex-col items-center justify-center rounded-lg text-xs sm:text-sm transition-all duration-200",
                day.isCurrentMonth
                  ? "text-foreground hover:bg-muted"
                  : "text-muted-foreground/40",
                day.isToday && "bg-accent text-accent-foreground font-bold",
                selectedDay === day.day && day.isCurrentMonth && !day.isToday && "bg-muted ring-2 ring-accent",
                day.hasEvents && day.isCurrentMonth && "font-medium"
              )}
            >
              <span>{day.day}</span>
              {day.hasEvents && day.isCurrentMonth && (
                <div className="absolute bottom-0.5 sm:bottom-1 flex gap-0.5">
                  {Array.from({ length: Math.min(day.eventCount || 0, 3) }).map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "w-1 h-1 rounded-full",
                        day.isToday ? "bg-accent-foreground" : "bg-accent"
                      )}
                    />
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mt-3 sm:pt-4 border-t border-border">
          <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-muted-foreground">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent" />
            <span className="hidden sm:inline">Today</span>
            <span className="sm:hidden">Now</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-muted-foreground">
            <span className="flex gap-0.5">
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-accent" />
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-accent" />
            </span>
            <span className="hidden sm:inline">Has Events</span>
            <span className="sm:hidden">Events</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
