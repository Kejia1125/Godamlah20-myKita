"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Fingerprint, AlertCircle } from "lucide-react"

export default function LoginPage() {
  const [error, setError] = useState("")
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const router = useRouter()

  const handleBiometricLogin = async () => {
    setError("")
    setIsAuthenticating(true)

    try {
      // Check if WebAuthn is supported
      if (!window.PublicKeyCredential) {
        setError("Biometric authentication is not supported on this device.")
        setIsAuthenticating(false)
        return
      }

      // Check if biometric authentication is available
      const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()

      if (!available) {
        setError(
          "No biometric authenticator found on this device. Please use a device with fingerprint or face recognition.",
        )
        setIsAuthenticating(false)
        return
      }

      // For demo: simulate biometric authentication
      // In production, this would call your backend to get authentication challenge
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate successful authentication
      console.log("[v0] Biometric authentication successful")

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (err: any) {
      console.error("[v0] Biometric auth error:", err)
      if (err.name === "NotAllowedError") {
        setError("Biometric authentication was cancelled or failed.")
      } else {
        setError("Authentication failed. Please try again.")
      }
      setIsAuthenticating(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Fingerprint className="h-10 w-10 text-primary" aria-hidden="true" />
          </div>
          <CardTitle className="text-3xl font-bold">MyKita Login</CardTitle>
          <CardDescription className="text-base">Use your fingerprint or face recognition to sign in</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive" role="alert">
              <AlertCircle className="h-5 w-5" aria-hidden="true" />
              <AlertDescription className="text-base">{error}</AlertDescription>
            </Alert>
          )}

          <Button
            onClick={handleBiometricLogin}
            disabled={isAuthenticating}
            className="h-14 w-full text-lg font-semibold"
            size="lg"
            aria-label="Login with biometric authentication"
          >
            <Fingerprint className="mr-2 h-6 w-6" aria-hidden="true" />
            {isAuthenticating ? "Authenticating..." : "Login with Biometrics"}
          </Button>

          <div className="space-y-2 rounded-lg bg-muted p-4 text-sm">
            <p className="font-medium">Supported authentication methods:</p>
            <ul className="list-inside list-disc space-y-1 text-muted-foreground">
              <li>Fingerprint scanner</li>
              <li>Face recognition</li>
              <li>Windows Hello</li>
              <li>Touch ID / Face ID (Apple devices)</li>
            </ul>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            New user?{" "}
            <a href="/auth/sign-up" className="font-medium text-primary hover:underline">
              Create an account
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
