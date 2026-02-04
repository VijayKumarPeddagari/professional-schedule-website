"use client"

import { cn } from "@/lib/utils"

interface AnimatedIconProps {
  className?: string
}

export function AnimatedCalendarIcon({ className }: AnimatedIconProps) {
  return (
    <svg
      className={cn("w-6 h-6", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="3"
        y="4"
        width="18"
        height="18"
        rx="2"
        className="stroke-current animate-[pulse_2s_ease-in-out_infinite]"
        strokeWidth="2"
      />
      <path d="M16 2v4M8 2v4M3 10h18" className="stroke-current" strokeWidth="2" strokeLinecap="round" />
      <circle cx="8" cy="14" r="1" className="fill-current animate-[bounce_1s_ease-in-out_infinite]" />
      <circle cx="12" cy="14" r="1" className="fill-current animate-[bounce_1s_ease-in-out_infinite_0.1s]" />
      <circle cx="16" cy="14" r="1" className="fill-current animate-[bounce_1s_ease-in-out_infinite_0.2s]" />
      <circle cx="8" cy="18" r="1" className="fill-current animate-[bounce_1s_ease-in-out_infinite_0.3s]" />
      <circle cx="12" cy="18" r="1" className="fill-current animate-[bounce_1s_ease-in-out_infinite_0.4s]" />
    </svg>
  )
}

export function AnimatedClockIcon({ className }: AnimatedIconProps) {
  return (
    <svg
      className={cn("w-6 h-6", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" className="stroke-current" strokeWidth="2" />
      <path
        d="M12 6v6l4 2"
        className="stroke-current origin-[12px_12px] animate-[spin_8s_linear_infinite]"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function AnimatedCheckIcon({ className }: AnimatedIconProps) {
  return (
    <svg
      className={cn("w-6 h-6", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" className="stroke-current" strokeWidth="2" />
      <path
        d="M8 12l3 3 5-6"
        className="stroke-current animate-[draw_0.5s_ease-out_forwards]"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ strokeDasharray: 20, strokeDashoffset: 20 }}
      />
      <style>{`
        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </svg>
  )
}

export function AnimatedBellIcon({ className }: AnimatedIconProps) {
  return (
    <svg
      className={cn("w-6 h-6 animate-[wiggle_1s_ease-in-out_infinite]", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
        className="stroke-current"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.73 21a2 2 0 0 1-3.46 0"
        className="stroke-current"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <style>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(10deg); }
          75% { transform: rotate(-10deg); }
        }
      `}</style>
    </svg>
  )
}

export function AnimatedUserIcon({ className }: AnimatedIconProps) {
  return (
    <svg
      className={cn("w-6 h-6", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="8"
        r="4"
        className="stroke-current animate-[pulse_2s_ease-in-out_infinite]"
        strokeWidth="2"
      />
      <path
        d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
        className="stroke-current"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function AnimatedStatsIcon({ className }: AnimatedIconProps) {
  return (
    <svg
      className={cn("w-6 h-6", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="4" y="12" width="4" height="8" rx="1" className="fill-current animate-[grow_1.5s_ease-in-out_infinite]" style={{ transformOrigin: 'bottom' }} />
      <rect x="10" y="8" width="4" height="12" rx="1" className="fill-current animate-[grow_1.5s_ease-in-out_infinite_0.2s]" style={{ transformOrigin: 'bottom' }} />
      <rect x="16" y="4" width="4" height="16" rx="1" className="fill-current animate-[grow_1.5s_ease-in-out_infinite_0.4s]" style={{ transformOrigin: 'bottom' }} />
      <style>{`
        @keyframes grow {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.7); }
        }
      `}</style>
    </svg>
  )
}

export function PulsingDot({ className, color = "bg-accent" }: AnimatedIconProps & { color?: string }) {
  return (
    <span className="relative flex h-3 w-3">
      <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", color)} />
      <span className={cn("relative inline-flex rounded-full h-3 w-3", color, className)} />
    </span>
  )
}

export function LoadingSpinner({ className }: AnimatedIconProps) {
  return (
    <svg
      className={cn("w-5 h-5 animate-spin", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}
