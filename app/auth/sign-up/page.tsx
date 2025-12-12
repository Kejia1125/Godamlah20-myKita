"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Fingerprint, AlertCircle, CreditCard } from "lucide-react"

export default function SignUpPage() {
  const [step, setStep] = useState(1)
  const [icNumber, setIcNumber] = useState("")
  const [fullName, setFullName] = useState("")
  const [error, setError] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()

  const handleICSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!/^\d{12}$/.test(icNumber)) {
      setError("IC number must be 12 digits")
      return
    }

    if (!fullName.trim()) {
      setError("Please enter your full name")
      return
    }

    setStep(2)
  }

  const handleNFCScan = async () => {
    setError("")
    setIsProcessing(true)

    try {
      if ("NDEFReader" in window) {
        const ndef = new window.NDEFReader()
        await ndef.scan()
        await new Promise((resolve) => setTimeout(resolve, 2000))
      } else {
        await new Promise((resolve) => setTimeout(resolve, 2000))
      }

      setStep(3)
    } catch (err: any) {
      setError("NFC scan failed. Please try again or ensure NFC is enabled.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleBiometricSetup = async () => {
    setError("")
    setIsProcessing(true)

    try {
      if (!window.PublicKeyCredential) {
        setError("Biometric authentication is not supported on this device.")
        setIsProcessing(false)
        return
      }

      await new Promise((resolve) => setTimeout(resolve, 1500))

      router.push("/dashboard")
    } catch (err: any) {
      setError("Failed to set up biometric authentication. Please try again.")
      setIsProcessing(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50 p-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl border border-slate-200">
        <CardHeader className="text-center space-y-1 pb-2">
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription className="text-base">Step {step} of 3</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive" className="text-sm">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Step 1 - Personal Info */}
          {step === 1 && (
            <form onSubmit={handleICSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="fullName" className="text-sm font-medium">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="h-11 text-sm"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="icNumber" className="text-sm font-medium">
                  IC Number
                </Label>
                <Input
                  id="icNumber"
                  type="text"
                  value={icNumber}
                  onChange={(e) => setIcNumber(e.target.value.replace(/\D/g, "").slice(0, 12))}
                  placeholder="123456789012"
                  className="h-11 text-sm"
                  maxLength={12}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Enter your 12-digit Malaysian IC number
                </p>
              </div>

              <Button type="submit" className="h-11 w-full text-base font-semibold">
                Next
              </Button>

              <p className="pt-1 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <a href="/auth/login" className="font-medium text-primary hover:underline">
                  Login
                </a>
              </p>
            </form>
          )}

          {/* Step 2 - NFC Scan */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                <CreditCard className="mx-auto h-14 w-14 text-muted-foreground" />
                <h3 className="mt-3 text-lg font-medium">Scan Your IC Card</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Hold your IC near your device’s NFC reader
                </p>
              </div>

              <Button
                onClick={handleNFCScan}
                disabled={isProcessing}
                className="h-11 w-full text-base font-semibold"
              >
                {isProcessing ? "Scanning..." : "Start NFC Scan"}
              </Button>

              <Button
                onClick={() => setStep(1)}
                variant="outline"
                className="h-11 w-full text-base"
              >
                Back
              </Button>
            </div>
          )}

          {/* Step 3 - Biometric */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                <Fingerprint className="mx-auto h-14 w-14 text-primary" />
                <h3 className="mt-3 text-lg font-medium">Set Up Biometric Login</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Unlock with fingerprint or face recognition
                </p>
              </div>

              <Button
                onClick={handleBiometricSetup}
                disabled={isProcessing}
                className="h-11 w-full text-base font-semibold"
              >
                <Fingerprint className="mr-2 h-5 w-5" />
                {isProcessing ? "Setting Up..." : "Enable Biometric Login"}
              </Button>

              <Button
                onClick={() => setStep(2)}
                variant="outline"
                className="h-11 w-full text-base"
              >
                Back
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
