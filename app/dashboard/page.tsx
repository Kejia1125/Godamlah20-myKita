"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import IdCard from "@/components/id-card"
import { CategoryButtons } from "@/components/category-buttons"
import { SkipToMain } from "@/components/skip-to-main"
import { VoiceAssistant } from "@/components/voice-assistant"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Phone } from "lucide-react"

export default function DashboardPage() {
  const [icLostOpen, setIcLostOpen] = useState(false)
  const [policeOpen, setPoliceOpen] = useState(false)
  const [reportSubmitted, setReportSubmitted] = useState(false)

  const user = {
    id: "demo-user",
    email: "demo@mykita.gov.my",
  }

  const profile = {
    full_name: "Ahmad Abdullah",
    ic_number: "900101-01-1234",
  }

  const handleICLostReport = () => {
    setReportSubmitted(true)
    setTimeout(() => {
      setIcLostOpen(false)
      setReportSubmitted(false)
      alert("IC Lost Report submitted successfully. Reference: IC-2024-0001")
    }, 1500)
  }

  const handlePoliceReport = () => {
    setReportSubmitted(true)
    setTimeout(() => {
      setPoliceOpen(false)
      setReportSubmitted(false)
      alert("Police Report submitted successfully. Reference: POL-2024-0001")
    }, 1500)
  }

  return (
    // Mobile-size wrapper
    <div className="w-[375px] h-screen mx-auto bg-background border shadow-lg overflow-auto rounded-xl">
      <SkipToMain />
      <DashboardHeader userName={profile?.full_name || user.email || "User"} userId={user.id} />

      <div className="mx-auto max-w-xs px-4 pt-4">
        <IdCard />
      </div>

      <main id="main-content" className="px-4 py-6">
        <div className="mb-6 space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-balance">MyKita Services</h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Select a category to access your government services
          </p>
        </div>

        <CategoryButtons />

        <div className="mb-4 grid gap-3 sm:grid-cols-1">
          {/* IC Lost Dialog */}
          <Dialog open={icLostOpen} onOpenChange={setIcLostOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm" className="mt-4 h-14 text-base gap-2">
                <AlertTriangle className="h-5 w-5" />
                Report IC Lost
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[350px]">
              <DialogHeader>
                <DialogTitle className="text-xl">Report IC Lost</DialogTitle>
                <DialogDescription className="text-sm">
                  Are you sure you want to report your identity card as lost? This will:
                </DialogDescription>
              </DialogHeader>
              <ul className="list-disc list-inside space-y-1 text-sm py-2">
                <li>Block your current IC from being used</li>
                <li>Notify relevant government agencies</li>
                <li>Generate a police report reference number</li>
                <li>Allow you to apply for a replacement IC</li>
              </ul>
              <DialogFooter className="gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIcLostOpen(false)}
                  className="h-10 text-sm"
                  disabled={reportSubmitted}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleICLostReport}
                  className="h-10 text-sm"
                  disabled={reportSubmitted}
                >
                  {reportSubmitted ? "Submitting..." : "Confirm Report"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Police Report Dialog */}
          <Dialog open={policeOpen} onOpenChange={setPoliceOpen}>
            <DialogTrigger asChild>
              <Button variant="default" size="sm" className="mt-4 h-14 text-base gap-2">
                <Phone className="h-5 w-5" />
                Report Police
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[350px]">
              <DialogHeader>
                <DialogTitle className="text-xl">Make Police Report</DialogTitle>
                <DialogDescription className="text-sm">
                  Submit an online police report for non-emergency incidents.
                </DialogDescription>
              </DialogHeader>
              <div className="py-2 space-y-2 text-sm">
                <p>This will create an online police report for incidents such as:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Lost items or documents</li>
                  <li>Minor theft</li>
                  <li>Property damage</li>
                  <li>Other non-emergency matters</li>
                </ul>
                <div className="bg-muted p-2 rounded-lg">
                  <p className="font-semibold text-sm">For emergencies, call 999</p>
                </div>
              </div>
              <DialogFooter className="gap-2">
                <Button
                  variant="outline"
                  onClick={() => setPoliceOpen(false)}
                  className="h-10 text-sm"
                  disabled={reportSubmitted}
                >
                  Cancel
                </Button>
                <Button onClick={handlePoliceReport} className="h-10 text-sm" disabled={reportSubmitted}>
                  {reportSubmitted ? "Submitting..." : "Submit Report"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </main>

      {/* Voice Assistant */}
      <div className="relative mt-4">
        <VoiceAssistant />
      </div>
    </div>
  )
}
