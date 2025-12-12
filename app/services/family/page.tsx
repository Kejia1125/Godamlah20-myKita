"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { SkipToMain } from "@/components/skip-to-main"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users, User } from "lucide-react"
import Link from "next/link"

export default function FamilyPage() {
  const user = { id: "demo-user", email: "demo@mykita.gov.my" }
  const profile = { full_name: "Ahmad Abdullah" }

  const [selectedMember, setSelectedMember] = useState<string | null>(null)

  const familyMembers = [
    { id: "1", name: "Siti Abdullah", relationship: "Spouse", ic_number: "910202-01-5678", age: 34, status: "Active" },
    { id: "2", name: "Amir Ahmad", relationship: "Son", ic_number: "150303-01-9012", age: 10, status: "Active" },
    { id: "3", name: "Aisyah Ahmad", relationship: "Daughter", ic_number: "180404-01-3456", age: 7, status: "Active" },
    { id: "4", name: "Abdullah Hassan", relationship: "Father", ic_number: "600505-01-7890", age: 65, status: "Dependent" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <SkipToMain />

      {/* Header */}
      <DashboardHeader userName={profile?.full_name || user.email || "User"} userId={user.id} />

      {/* Main Content */}
      <main id="main-content" className="container mx-auto px-4 py-8 md:px-6 md:py-12 space-y-8">

        {/* Back Button */}
        <div>
          <Button asChild variant="ghost" size="sm" className="h-14 gap-2 text-lg">
            <Link href="/dashboard">
              <ArrowLeft className="h-6 w-6" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        {/* Page Title */}
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Users className="h-10 w-10 text-primary" />
          </div>
          <div>
            <h1 className="text-5xl font-bold tracking-tight">Family</h1>
            <p className="text-l text-muted-foreground mt-2">Manage family members and proxy mode</p>
          </div>
        </div>

        {/* Proxy Mode Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Family Proxy Mode</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Access government services on behalf of your family members
            </p>
          </CardHeader>
          <CardContent>
            {selectedMember ? (
              <div className="relative bg-primary/10 p-6 rounded-lg pt-14"> {/* Added pt-14 */}
                {/* Exit Button at top-right corner */}
                <div className="absolute top-4 right-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedMember(null)}
                  >
                    Exit Proxy Mode
                  </Button>
                </div>

                {/* Member Info */}
                <div>
                  <p className="text-md text-muted-foreground mb-1">
                    Currently managing services for:
                  </p>
                  <p className="text-3xl font-bold">
                    {familyMembers.find((m) => m.id === selectedMember)?.name}
                  </p>
                </div>

                <p className="text-md text-muted-foreground mt-6">
                  You can now access all services as this family member. Navigate to any category from the dashboard.
                </p>
              </div>
            ) : (
              <p className="text-lg text-muted-foreground">
                Select a family member below to access their services on their behalf.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Family Members List */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Family Members</h2>
          <div className="space-y-6">
            {familyMembers.map((member) => (
              <Card
                key={member.id}
                className={`hover:shadow-lg transition-shadow ${selectedMember === member.id ? "border-primary border-2" : ""}`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                        <User className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{member.name}</CardTitle>
                        <p className="text-lg text-muted-foreground">{member.relationship}</p>
                      </div>
                    </div>
                    <Badge
                      variant={member.status === "Active" ? "default" : "secondary"}
                      className="text-base px-3 py-1"
                    >
                      {member.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-base text-muted-foreground mb-1">IC Number</p>
                      <p className="text-lg font-semibold">{member.ic_number}</p>
                    </div>
                    <div>
                      <p className="text-base text-muted-foreground mb-1">Age</p>
                      <p className="text-lg font-semibold">{member.age} years old</p>
                    </div>
                  </div>
                  <Button
                    className="w-full h-12 text-lg"
                    size="lg"
                    onClick={() => setSelectedMember(member.id)}
                    disabled={selectedMember === member.id}
                  >
                    {selectedMember === member.id ? "Currently Active" : "Access Services"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

      </main>
    </div>
  )
}
