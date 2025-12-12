import { DashboardHeader } from "@/components/dashboard-header"
import { SkipToMain } from "@/components/skip-to-main"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Heart, MapPin, Phone } from "lucide-react"
import Link from "next/link"
import React from "react"

export default function MedicalPage() {
  const user = { id: "demo-user", email: "demo@mykita.gov.my" }
  const profile = { full_name: "Ahmad Abdullah" }

  const medicalCards = [
    {
      id: 1,
      card_type: "MySejahtera Health Card",
      card_number: "MYS1234567890",
      provider: "Ministry of Health Malaysia",
      status: "active",
      issue_date: "2023-01-15",
      expiry_date: null,
    },
    {
      id: 2,
      card_type: "Health Insurance",
      card_number: "INS9876543210",
      provider: "Great Eastern",
      status: "active",
      issue_date: "2024-06-01",
      expiry_date: "2025-05-31",
    },
  ]

  const nearestHospitals = [
    {
      id: 1,
      name: "Hospital Kuala Lumpur",
      distance: "2.5 km",
      phone: "03-26155555",
      emergency: true,
    },
    {
      id: 2,
      name: "Klinik Kesihatan Cheras",
      distance: "3.8 km",
      phone: "03-91714055",
      emergency: false,
    },
  ]

  const VerticalField = ({ label, value }: { label: string; value: string | React.ReactNode }) => (
    <div>
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <p className="text-lg font-medium">{value}</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <SkipToMain />
      <DashboardHeader userName={profile?.full_name || user.email || "User"} userId={user.id} />

      <main id="main-content" className="container mx-auto px-4 py-8 md:px-6 md:py-12 space-y-8">
        {/* Back Button */}
        <Button asChild variant="ghost" size="sm" className="h-14 gap-2 text-lg">
          <Link href="/dashboard">
            <ArrowLeft className="h-6 w-6" />
            Back to Dashboard
          </Link>
        </Button>

        {/* Page Header */}
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Heart className="h-10 w-10 text-primary" />
          </div>
          <div>
            <h1 className="text-5xl font-bold tracking-tight">Medical Cards</h1>
            <p className="text-l text-muted-foreground mt-2">View your medical cards and nearby hospitals</p>
          </div>
        </div>

        {/* Nearest Hospitals */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <MapPin className="h-6 w-6" /> Nearest Hospitals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {nearestHospitals.map((hospital) => (
              <div key={hospital.id} className="space-y-2 border-b pb-4 last:border-0">
                <div className="flex items-center justify-between">
                  <p className="text-xl font-semibold">{hospital.name}</p>
                  {hospital.emergency && <Badge variant="destructive">24/7 Emergency</Badge>}
                </div>
                <VerticalField
                  label="Distance"
                  value={
                    <span className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" /> {hospital.distance} away
                    </span>
                  }
                />
                <VerticalField
                  label="Phone"
                  value={
                    <span className="flex items-center gap-2">
                      <Phone className="h-4 w-4" /> {hospital.phone}
                    </span>
                  }
                />
                <Button size="lg" className="w-full h-12 text-lg">
                  Get Directions
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Medical Cards */}
        <div className="space-y-6">
          {medicalCards.map((card) => (
            <Card key={card.id}>
              <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-2xl">{card.card_type}</CardTitle>
                <Badge variant="default" className="text-base px-3 py-1">
                  {card.status}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <VerticalField label="Card Number" value={card.card_number} />
                <VerticalField label="Provider" value={card.provider} />
                <VerticalField
                  label="Issue Date"
                  value={new Date(card.issue_date).toLocaleDateString("en-MY")}
                />
                {card.expiry_date && (
                  <VerticalField
                    label="Expiry Date"
                    value={new Date(card.expiry_date).toLocaleDateString("en-MY")}
                  />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
