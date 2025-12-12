import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AccessibilityProvider } from "@/components/accessibility-provider"
import { Toaster } from "@/components/ui/toaster"
import { AIChatbox } from "@/components/ai-chatbox"
import { BalanceProvider } from "@/contexts/balance-context"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "myKITA - Your identity card",
  description:
    "An accessible, voice-enabled document management system designed for everyone, especially those with visual impairments. Manage personal documents, finances, vehicles, family records, employment, and property information securely.",
  keywords: [
    "accessible document management",
    "voice control",
    "screen reader friendly",
    "document storage",
    "WCAG compliant",
    "visually impaired",
    "disability accessible",
  ],
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <div className="w-[375px] h-[812px] mx-auto my-4 border shadow-lg rounded-xl overflow-auto relative">
        <BalanceProvider>
          <AccessibilityProvider>
            {children}
            <Toaster />
          </AccessibilityProvider>
        </BalanceProvider>
        <Analytics />
        </div>
      </body>
    </html>
  )
}
