import { DashboardHeader } from "@/components/dashboard-header"
import { SkipToMain } from "@/components/skip-to-main"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, User } from "lucide-react"
import Link from "next/link"

export default function PersonalDetailsPage() {
  const user = { id: "demo-user", email: "demo@mykita.gov.my" }
  const profile = { full_name: "Ahmad Abdullah" }

  const personalDetails = {
    ic_number: "900101-01-1234",
    full_name: "Ahmad Abdullah",
    date_of_birth: "1990-01-01",
    gender: "Male",
    nationality: "Malaysian",
    race: "Malay",
    religion: "Islam",
    marital_status: "Married",
    blood_type: "A+",
    address: "No. 123, Jalan Merdeka, Taman Setia",
    city: "Kuala Lumpur",
    state: "Wilayah Persekutuan",
    postcode: "50000",
  }

  const emergencyContact = {
    name: "Siti Abdullah",
    relationship: "Spouse",
    phone: "+60123456789",
    alternate_phone: "+60198765432",
  }

  // Helper to render a field vertically
  const VerticalField = ({ label, value }: { label: string; value: string }) => (
    <div>
      <p className="text-md text-muted-foreground mb-1">{label}</p>
      <p className="text-md font-semibold">{value}</p>
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
            <User className="h-10 w-10 text-primary" />
          </div>
          <div>
            <h2 className="text-5xl font-bold tracking-tight">Personal Details</h2>
            <p className="text-l text-muted-foreground mt-2">View your identity card information</p>
          </div>
        </div>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <VerticalField label="IC Number" value={personalDetails.ic_number} />
            <VerticalField label="Full Name" value={personalDetails.full_name} />
            <VerticalField label="Date of Birth" value={new Date(personalDetails.date_of_birth).toLocaleDateString("en-MY")} />
            <VerticalField label="Gender" value={personalDetails.gender} />
            <VerticalField label="Nationality" value={personalDetails.nationality} />
          </CardContent>
        </Card>

        {/* Additional Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Additional Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <VerticalField label="Race" value={personalDetails.race} />
            <VerticalField label="Religion" value={personalDetails.religion} />
            <VerticalField label="Marital Status" value={personalDetails.marital_status} />
            <VerticalField label="Blood Type" value={personalDetails.blood_type} />
          </CardContent>
        </Card>

        {/* Address */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <VerticalField label="Full Address" value={personalDetails.address} />
            <VerticalField label="City" value={personalDetails.city} />
            <VerticalField label="State" value={personalDetails.state} />
            <VerticalField label="Postcode" value={personalDetails.postcode} />
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Emergency Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <VerticalField label="Name" value={emergencyContact.name} />
            <VerticalField label="Relationship" value={emergencyContact.relationship} />
            <VerticalField label="Phone Number" value={emergencyContact.phone} />
            <VerticalField label="Alternate Phone" value={emergencyContact.alternate_phone} />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
