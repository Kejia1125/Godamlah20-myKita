import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, Zap, Droplet, WifiIcon, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PropertyPage() {
  const user = {
    id: "demo-user",
    email: "demo@mykita.gov.my",
  }

  const profile = {
    full_name: "Ahmad Abdullah",
  }

  const utilityBills = [
    {
      id: 1,
      type: "Electricity",
      provider: "TNB",
      account_number: "1234567890",
      amount: 156.5,
      due_date: "2025-02-15",
      icon: Zap,
    },
    {
      id: 2,
      type: "Water Supply",
      provider: "SADA (Sabah)",
      account_number: "9876543210",
      amount: 45.0,
      due_date: "2025-02-10",
      icon: Droplet,
    },
    {
      id: 3,
      type: "Sewerage",
      provider: "Indah Water",
      account_number: "IWK8765432",
      amount: 12.0,
      due_date: "2025-02-12",
      icon: Droplet,
    },
    {
      id: 4,
      type: "Internet",
      provider: "TIME",
      account_number: "5555123456",
      amount: 149.0,
      due_date: "2025-02-20",
      icon: WifiIcon,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
  <DashboardHeader userName={profile?.full_name || user.email || "User"} userId={user.id} />

  <main className="container mx-auto px-4 py-6 md:px-6 md:py-10">
    <div className="mb-6">
      <Button asChild variant="ghost" size="sm" className="mb-3 h-12 gap-2 text-base">
        <Link href="/dashboard">
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          Back to Dashboard
        </Link>
      </Button>

      <div className="flex items-center gap-3 mb-3">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Home className="h-8 w-8 text-primary" aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Property</h1>
          <p className="text-l text-muted-foreground leading-relaxed mt-1">Pay your utility bills</p>
        </div>
      </div>
    </div>

    <div className="flex flex-col gap-4">
      {utilityBills.map((bill) => {
        const Icon = bill.icon
        return (
          <Card key={bill.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <CardTitle className="text-xl">{bill.type}</CardTitle>
                  <CardDescription className="text-base">{bill.provider}</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Account Number</p>
                <p className="text-lg font-mono">{bill.account_number}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Amount Due</p>
                <p className="text-2xl font-bold text-primary">RM {bill.amount.toFixed(2)}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Due Date</p>
                <p className="text-lg">{new Date(bill.due_date).toLocaleDateString("en-MY")}</p>
              </div>

              <Button className="w-full h-12 text-lg" size="lg">
                Pay Now
              </Button>
            </CardContent>
          </Card>
        )
      })}
    </div>
  </main>
</div>

  )
}
