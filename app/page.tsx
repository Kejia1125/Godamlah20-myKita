import { Button } from "@/components/ui/button"
import { Shield, CreditCard, FileText } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b bg-white/60 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <h3 className="text-xl font-semibold">MyKita</h3>

          <nav className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="h-9 text-sm">
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button asChild size="sm" className="h-9 text-sm font-medium">
              <Link href="/auth/sign-up">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="mx-auto max-w-3xl px-4 py-14 text-center md:py-20">
          <h2 className="mb-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            All Your Government Services, Connected
          </h2>

          <p className="mx-auto mb-8 max-w-2xl text-base text-muted-foreground md:text-lg">
            Access identity details, finances, licenses, medical info, property utilities, 
            and employment records — all in one secure platform.
          </p>

          <Button
            asChild
            size="lg"
            className="h-12 px-6 text-base font-semibold md:h-14 md:px-8 md:text-lg"
          >
            <Link href="/auth/sign-up">Access Your Services</Link>
          </Button>
        </section>

        {/* Feature Section */}
        <section className="border-t bg-muted/30 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <h3 className="mb-12 text-center text-2xl font-semibold md:text-3xl">
              Integrated Government Features
            </h3>

            <div className="grid gap-10 md:grid-cols-3">
              {/* Card 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h4 className="mt-4 text-lg font-semibold">Secure Access</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Your IC becomes your secure digital identity across all services.
                </p>
              </div>

              {/* Card 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <CreditCard className="h-8 w-8 text-primary" />
                </div>
                <h4 className="mt-4 text-lg font-semibold">Easy Payments</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Pay utilities, top up your wallet, and manage all payments in one app.
                </p>
              </div>

              {/* Card 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h4 className="mt-4 text-lg font-semibold">All Documents</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Your licenses, medical card, records, and documents — all organized.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground">
          &copy; 2025 MyGov Services — A simpler digital future for Malaysians.
        </div>
      </footer>
    </div>
  )
}
