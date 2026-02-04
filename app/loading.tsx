import { LoadingSpinner } from "@/components/animated-icons"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner className="w-10 h-10 text-accent" />
        <p className="text-muted-foreground animate-pulse">Loading SchedulePro...</p>
      </div>
    </div>
  )
}
