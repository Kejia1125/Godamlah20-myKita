"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { SkipToMain } from "@/components/skip-to-main"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Wallet, ArrowUpRight, ArrowDownRight, Gift } from "lucide-react"
import Link from "next/link"
import { useBalance } from "@/contexts/balance-context"

export default function FinancePage() {
  const { balance, setBalance } = useBalance()
  const handleTopUp = (amount: number) => setBalance(balance + amount)

  const user = { id: "demo-user", email: "demo@mykita.gov.my" }
  const profile = { full_name: "Ahmad Abdullah" }

  const transactions = [
    { id: 1, transaction_type: "topup", amount: 500.0, status: "completed", created_at: "2025-01-15T10:30:00Z" },
    { id: 2, transaction_type: "payment", amount: 156.5, status: "completed", created_at: "2025-01-10T14:20:00Z" },
    { id: 3, transaction_type: "payment", amount: 45.0, status: "completed", created_at: "2025-01-08T09:15:00Z" },
  ]

  const subsidies = [
    { id: 1, name: "Bantuan Rakyat 1 Malaysia", amount: 500.0, status: "Approved", next_payment: "2025-03-01" },
    { id: 2, name: "Petrol Subsidy", amount: 200.0, status: "Approved", next_payment: "2025-02-01" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <SkipToMain />
      <DashboardHeader userName={profile?.full_name || user.email || "User"} userId={user.id} />
      <main id="main-content" className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        {/* Back Button */}
        <div className="mb-6">
          <Button asChild variant="ghost" size="sm" className="h-12 gap-2 text-base">
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Wallet className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Finance</h1>
            <p className="text-base md:text-l text-muted-foreground mt-1">
              Manage your e-wallet balance and subsidies
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* E-Wallet Balance */}
          <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-primary-foreground text-lg md:text-xl">E-Wallet Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-3xl md:text-4xl font-bold">RM {balance.toFixed(2)}</p>
              <Button
                size="sm"
                variant="secondary"
                className="h-10 md:h-12 text-base md:text-lg px-6"
                onClick={() => handleTopUp(100)}
              >
                Top Up Balance
              </Button>
            </CardContent>
          </Card>

          {/* Government Subsidies */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl flex items-center gap-2">
                <Gift className="h-5 w-5" />
                Government Subsidies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {subsidies.map((subsidy) => (
                  <div
                    key={subsidy.id}
                    className="flex items-center justify-between border-b pb-3 last:border-0"
                  >
                    <div>
                      <p className="text-lg font-semibold">{subsidy.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Next Payment: {new Date(subsidy.next_payment).toLocaleDateString("en-MY")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">RM {subsidy.amount.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">{subsidy.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between border-b pb-3 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          tx.transaction_type === "topup" ? "bg-green-100" : "bg-red-100"
                        }`}
                      >
                        {tx.transaction_type === "topup" ? (
                          <ArrowDownRight className="h-4 w-4 text-green-600" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-base font-semibold capitalize">{tx.transaction_type}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(tx.created_at).toLocaleDateString("en-MY", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-lg font-bold ${
                          tx.transaction_type === "topup" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {tx.transaction_type === "topup" ? "+" : "-"}
                        {tx.amount.toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground capitalize">{tx.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
