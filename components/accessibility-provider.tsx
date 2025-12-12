"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface AccessibilitySettings {
  highContrast: boolean
  fontSize: string
  voiceEnabled: boolean
  screenReader: boolean
}

interface AccessibilityContextType {
  settings: AccessibilitySettings
  updateSettings: (settings: Partial<AccessibilitySettings>) => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (!context) {
    throw new Error("useAccessibility must be used within AccessibilityProvider")
  }
  return context
}

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    highContrast: false,
    fontSize: "medium",
    voiceEnabled: true,
    screenReader: true,
  })

  useEffect(() => {
    // Load accessibility settings from localStorage
    const savedSettings = localStorage.getItem("accessibility-settings")
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings))
      } catch (error) {
        console.error("Failed to load accessibility settings:", error)
      }
    }
  }, [])

  useEffect(() => {
    // Apply font size
    const root = document.documentElement
    root.classList.remove("text-small", "text-medium", "text-large", "text-extra-large")
    root.classList.add(`text-${settings.fontSize}`)

    // Apply high contrast mode
    if (settings.highContrast) {
      root.classList.add("high-contrast")
    } else {
      root.classList.remove("high-contrast")
    }

    // Save settings to localStorage
    localStorage.setItem("accessibility-settings", JSON.stringify(settings))
  }, [settings])

  const updateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }))
  }

  return <AccessibilityContext.Provider value={{ settings, updateSettings }}>{children}</AccessibilityContext.Provider>
}
