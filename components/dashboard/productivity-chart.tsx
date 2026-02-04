"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface DayData {
  day: string
  hours: number
  meetings: number
}

const weekData: DayData[] = [
  { day: "Mon", hours: 6, meetings: 4 },
  { day: "Tue", hours: 7.5, meetings: 5 },
  { day: "Wed", hours: 6.5, meetings: 8 },
  { day: "Thu", hours: 5, meetings: 3 },
  { day: "Fri", hours: 4, meetings: 2 },
  { day: "Sat", hours: 2, meetings: 1 },
  { day: "Sun", hours: 0, meetings: 0 },
]

const maxHours = 8

export function ProductivityChart() {
  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-accent" />
          <CardTitle className="text-lg font-semibold">Weekly Productivity</CardTitle>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent">
            This Week
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Summary */}
        <div className="flex items-center justify-between mb-6 p-4 rounded-xl bg-muted/50">
          <div>
            <p className="text-sm text-muted-foreground">Total Hours</p>
            <p className="text-2xl font-bold text-foreground">31h</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Meetings</p>
            <p className="text-2xl font-bold text-foreground">23</p>
          </div>
          <div className="flex items-center gap-1 text-emerald-500">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">+12%</span>
          </div>
        </div>

        {/* Chart */}
        <div className="space-y-3">
          {weekData.map((day, index) => (
            <div
              key={day.day}
              className={cn(
                "flex items-center gap-3 animate-in fade-in slide-in-from-left-4"
              )}
              style={{ animationDelay: `${index * 50}ms`, animationFillMode: "both" }}
            >
              <span className="w-8 text-sm text-muted-foreground font-medium">{day.day}</span>
              <div className="flex-1 h-8 bg-muted/50 rounded-lg overflow-hidden relative">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent to-accent/70 rounded-lg transition-all duration-1000 ease-out"
                  style={{ width: `${(day.hours / maxHours) * 100}%` }}
                />
                <div className="absolute inset-0 flex items-center px-3">
                  <span className={cn(
                    "text-xs font-medium",
                    day.hours > 4 ? "text-accent-foreground" : "text-foreground"
                  )}>
                    {day.hours}h • {day.meetings} meetings
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-3 h-3 rounded-sm bg-gradient-to-r from-accent to-accent/70" />
            Hours Worked
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-3 h-3 rounded-sm bg-muted" />
            Available Time
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
