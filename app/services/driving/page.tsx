"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Car } from "lucide-react"

import { DashboardHeader } from "@/components/dashboard-header"
import { SkipToMain } from "@/components/skip-to-main"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useBalance } from "@/contexts/balance-context"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function DrivingLicensePage() {
  const [open, setOpen] = useState(false)
  const [renewYears, setRenewYears] = useState("1")
  const [licenseNumber, setLicenseNumber] = useState("")
  const [licenseClass, setLicenseClass] = useState("D")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const totalCost = Number(renewYears) * 30

  const user = {
    id: "demo-user",
    email: "demo@mykita.gov.my",
  }

  const profile = {
    full_name: "Ahmad Abdullah",
  }

  const license = {
    license_number: "D1234567890",
    license_class: "D, DA",
    issue_date: "2020-03-15",
    expiry_date: "2026-03-14",
    issuing_authority: "Jabatan Pengangkutan Jalan (JPJ)",
    status: "active",
  }

  const { balance, addTransaction } = useBalance() 

  const handleSubmitRenewal = () => {
    if (balance !== undefined && totalCost > balance) {
      alert("Insufficient balance to renew license.")
      return
    }

    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setSuccess(true)

      if (addTransaction) {
      addTransaction({
        id: Date.now(), // unique id
        type: "payment",
        amount: totalCost,
        description: `Driving License Renewal (${renewYears} ${renewYears === "1" ? "Year" : "Years"})`,
        date: new Date().toISOString(),
      })
    }

      // Auto close after success
      setTimeout(() => {
        setOpen(false)
        setSuccess(false)
        setLicenseNumber("")
        setLicenseClass("D")
        setRenewYears("1")
      }, 1200)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      <SkipToMain />
      <DashboardHeader
        userName={profile?.full_name || user.email || "User"}
        userId={user.id}
      />

      <main
        id="main-content"
        className="container mx-auto px-4 py-8 md:px-6 md:py-12"
      >
        {/* Top Bar */}
        <div className="mb-6 flex items-center justify-between">
          <Button asChild variant="ghost" size="sm" className="h-12 gap-2">
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5" />
              Back to Dashboard
            </Link>
          </Button>

          <Button onClick={() => setOpen(true)}>Renew License</Button>
        </div>

        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Car className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Driving License
            </h1>
            <p className="text-l text-muted-foreground">
              View your driving license details
            </p>
          </div>
        </div>

        <Card className="max-w-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>License Information</CardTitle>
              <Badge className="text-base">{license.status}</Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">
                  License Number
                </p>
                <p className="text-lg font-semibold">
                  {license.license_number}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">License Class</p>
                <p className="text-lg font-semibold">
                  {license.license_class}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Issue Date</p>
                <p className="text-lg font-semibold">
                  {new Date(license.issue_date).toLocaleDateString("en-MY")}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Expiry Date</p>
                <p className="text-lg font-semibold">
                  {new Date(license.expiry_date).toLocaleDateString("en-MY")}
                </p>
              </div>

              <div className="sm:col-span-2">
                <p className="text-sm text-muted-foreground">
                  Issuing Authority
                </p>
                <p className="text-lg font-semibold">
                  {license.issuing_authority}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Renew Driving License</DialogTitle>
          </DialogHeader>

          {!success ? (
            <div className="space-y-4">
              {/* License Number */}
              <div className="space-y-1">
                <Label>License Number</Label>
                <Input
                  placeholder="Enter license number"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  className="mt-1"
                />
              </div>

              {/* License Class */}
              <div className="space-y-1">
                <Label>License Class</Label>
                <Select
                  value={licenseClass}
                  onValueChange={(val: string) => setLicenseClass(val)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent className="mt-1">
                    <SelectItem value="D">D</SelectItem>
                    <SelectItem value="DA">DA</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Renew Years */}
              <div className="space-y-1">
                <Label>Renew Years</Label>
                <Select
                  value={renewYears}
                  onValueChange={(val: string) => setRenewYears(val)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select years" />
                  </SelectTrigger>
                  <SelectContent className="mt-1">
                    {[...Array(10)].map((_, i) => (
                      <SelectItem key={i + 1} value={`${i + 1}`}>
                        {i + 1} {i + 1 === 1 ? "Year" : "Years"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Total Cost */}
              <div>
                <Label>Total Cost</Label>
                <p className="text-lg font-semibold">RM{totalCost}</p>
              </div>

              {/* Submit */}
              <Button
                className="w-full mt-4"
                onClick={handleSubmitRenewal}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Renewal"}
              </Button>
            </div>
          ) : (
            <div className="py-10 text-center">
              <p className="text-lg font-semibold text-green-600">
                ✅ Renewal submitted successfully!
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
      </main>
    </div>
  )
}