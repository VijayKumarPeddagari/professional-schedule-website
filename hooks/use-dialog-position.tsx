"use client"

import { useState, useEffect, useCallback } from "react"

interface UseDialogPositionOptions {
  sidebarWidth?: number
}

export function useDialogPosition(options: UseDialogPositionOptions = {}) {
  const { sidebarWidth = 256 } = options
  const [position, setPosition] = useState({ left: "50%", transform: "translateX(-50%)" })

  const updatePosition = useCallback(() => {
    if (typeof window === "undefined") return

    const mainContent = document.querySelector('[class*="flex-1 min-w-0"]')
    if (mainContent) {
      const rect = mainContent.getBoundingClientRect()
      const center = rect.left + rect.width / 2
      const offset = center - sidebarWidth / 2
      setPosition({
        left: `${offset}px`,
        transform: "translateX(-50%)",
      })
    }
  }, [sidebarWidth])

  useEffect(() => {
    updatePosition()
    window.addEventListener("resize", updatePosition)
    window.addEventListener("zoom", updatePosition)
    
    // Also update on scroll since sidebar is sticky
    const observer = new MutationObserver(updatePosition)
    document.body && observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener("resize", updatePosition)
      window.removeEventListener("zoom", updatePosition)
      observer.disconnect()
    }
  }, [updatePosition])

  return position
}
