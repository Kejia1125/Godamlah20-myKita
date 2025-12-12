"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Settings, LogOut, Menu, Bell } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AlertTriangle, Info, MapPin } from "lucide-react"
import { useBalance } from "@/contexts/balance-context"

interface DashboardHeaderProps {
  userName: string
  userId: string
}

const alerts = [
    {
      id: 1,
      type: "warning",
      title: "Flood Warning",
      message:
        "Heavy rainfall expected in Selangor and Kuala Lumpur areas. Residents in low-lying areas are advised to be on alert.",
      location: "Selangor, Kuala Lumpur",
      time: "2 hours ago",
      priority: "high",
    },
    {
      id: 2,
      type: "info",
      title: "Traffic Advisory",
      message:
        "Road closure at Jalan Tun Razak due to water accumulation. Alternative routes are available via Jalan Kuching.",
      location: "Kuala Lumpur",
      time: "4 hours ago",
      priority: "medium",
    },
    {
      id: 3,
      type: "info",
      title: "Health Advisory",
      message: "Dengue cases reported in several areas. Please ensure no stagnant water around your premises.",
      location: "Nationwide",
      time: "1 day ago",
      priority: "low",
    },
  ]

const unreadCount = alerts.filter((a) => a.priority === "high").length

export function DashboardHeader({ userName, userId }: DashboardHeaderProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const router = useRouter()
  const { balance } = useBalance()

  const handleSignOut = async () => {
    setIsLoading(true)
    setTimeout(() => {
      router.push("/")
    }, 500)
  }

  return (
    <header className="border-b bg-card">
      <div className="flex h-20 w-full items-center justify-between px-2 md:px-4">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center">
             <Image src="/MyKITA.png" alt="MyKITA" width={70} height={70} className="object-contain" />
          </Link>
        </div>

        {/* Right: User Info + Dropdown */}
        <div className="flex items-center gap-4">
          <span className="hidden text-sm font-medium md:inline-block">Hello, {userName}</span>

          <Button
            variant="outline"
            size="lg"
            className="relative h-12 w-12 bg-transparent p-0"
            onClick={() => setNotificationOpen(true)}
            aria-label="View notifications"
          >
            <Bell className="h-5 w-5" aria-hidden="true" />
            {unreadCount > 0 && (
              <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                {unreadCount}
              </span>
            )}
            <span className="sr-only">Notifications ({unreadCount} unread)</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="lg"
                className="h-12 gap-2 bg-transparent"
                aria-label="Open user menu"
                aria-haspopup="true"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-2 md:hidden">
                <p className="text-base font-medium">{userName}</p>
              </div>

              <DropdownMenuSeparator className="md:hidden" />
              <DropdownMenuItem asChild>
                <Link
                  href="/settings"
                  className="flex h-12 cursor-pointer items-center gap-3 text-base"
                >
                  <Settings className="h-5 w-5" aria-hidden="true" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleSignOut}
                disabled={isLoading}
                className="flex h-12 cursor-pointer items-center gap-3 text-base text-red-600 focus:text-red-600"
              >
                <LogOut className="h-5 w-5" aria-hidden="true" />
                {isLoading ? "Signing out..." : "Sign Out"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div> 
  
      
      </div>

      <Dialog open={notificationOpen} onOpenChange={setNotificationOpen}>
        <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Disaster Alerts & Notifications</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {alerts.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                <Bell className="mx-auto h-12 w-12 opacity-20" />
                <p className="mt-4 text-lg">No alerts at this time</p>
              </div>
            ) : (
              alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`rounded-lg border-2 p-4 ${
                    alert.priority === "high"
                      ? "border-red-500 bg-red-50 dark:bg-red-950/20"
                      : alert.priority === "medium"
                        ? "border-orange-500 bg-orange-50 dark:bg-orange-950/20"
                        : "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {alert.type === "warning" ? (
                      <AlertTriangle
                        className={`h-6 w-6 flex-shrink-0 ${
                          alert.priority === "high" ? "text-red-600" : "text-orange-600"
                        }`}
                      />
                    ) : (
                      <Info className="h-6 w-6 flex-shrink-0 text-blue-600" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-lg font-bold">{alert.title}</h3>
                        {alert.priority === "high" && (
                          <span className="rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">URGENT</span>
                        )}
                      </div>
                      <p className="mt-2 text-base leading-relaxed">{alert.message}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{alert.location}</span>
                        </div>
                        <span>{alert.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex justify-end gap-3 border-t pt-4">
            <Button size="lg" onClick={() => setNotificationOpen(false)} className="h-14 text-base">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="bg-primary/10 border-t border-b px-4 py-3 md:px-6 flex items-center justify-between">
        <span className="text-base font-medium text-muted-foreground">Account Balance</span>
        <span className="text-lg font-semibold text-primary">RM {balance?.toFixed(2) ?? "0.00"}</span>
      </div>
    </header>   
  )
}
