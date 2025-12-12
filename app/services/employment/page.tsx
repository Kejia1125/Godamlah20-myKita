import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, GraduationCap, Building2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function EmploymentPage() {
  const user = { id: "demo-user", email: "demo@mykita.gov.my" }
  const profile = { full_name: "Ahmad Abdullah" }

  const employmentData = {
    employer: "Tech Solutions Sdn Bhd",
    position: "Software Engineer",
    employee_id: "EMP2024001",
    start_date: "2020-03-15",
    monthly_salary: 5500.0,
    kwsp_account: "12345678901",
    kwsp_balance: 45000.0,
    socso_number: "SOCSO123456",
  }

  const educationData = {
    highest_qualification: "Bachelor's Degree",
    institution: "Universiti Malaya",
    field_of_study: "Computer Science",
    graduation_year: 2019,
    certificate_number: "UM2019CS001",
  }

  const VerticalField = ({ label, value }: { label: string; value: string | number }) => (
    <div>
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <p className="text-l font-medium">{value}</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader userName={profile?.full_name || user.email || "User"} userId={user.id} />

      <main className="container mx-auto px-4 py-8 md:px-6 md:py-12 space-y-8">
        {/* Back Button */}
        <Button asChild variant="ghost" size="sm" className="h-12 gap-2 text-lg">
          <Link href="/dashboard">
            <ArrowLeft className="h-5 w-5" />
            Back to Dashboard
          </Link>
        </Button>

        {/* Page Header */}
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Briefcase className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Employment & Education</h1>
            <p className="text-xl text-muted-foreground leading-relaxed mt-2">
              View your employment details and pay KWSP/SOCSO
            </p>
          </div>
        </div>

        {/* Employment Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Employment Details</CardTitle>
            <CardDescription className="text-base">Current employment information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <VerticalField label="Employer" value={employmentData.employer} />
            <VerticalField label="Position" value={employmentData.position} />
            <VerticalField label="Employee ID" value={employmentData.employee_id} />
            <VerticalField label="Start Date" value={new Date(employmentData.start_date).toLocaleDateString("en-MY")} />
            <VerticalField label="Monthly Salary" value={`RM ${employmentData.monthly_salary.toFixed(2)}`} />
          </CardContent>
        </Card>

        {/* Education Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Education</CardTitle>
            <CardDescription className="text-base">Highest qualification</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <VerticalField label="Qualification" value={educationData.highest_qualification} />
            <VerticalField label="Institution" value={educationData.institution} />
            <VerticalField label="Field of Study" value={educationData.field_of_study} />
            <VerticalField label="Graduation Year" value={educationData.graduation_year} />
            <VerticalField label="Certificate Number" value={educationData.certificate_number} />
          </CardContent>
        </Card>

        {/* KWSP / SOCSO */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">KWSP (EPF)</CardTitle>
            <CardDescription className="text-base">Employees Provident Fund</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <VerticalField label="Account Number" value={employmentData.kwsp_account} />
            <VerticalField label="Current Balance" value={`RM ${employmentData.kwsp_balance.toFixed(2)}`} />
            <Button className="w-full h-12 text-lg" size="lg">
              Make Contribution
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">SOCSO</CardTitle>
            <CardDescription className="text-base">Social Security Organization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <VerticalField label="SOCSO Number" value={employmentData.socso_number} />
            <VerticalField label="Status" value="Active" />
            <Button className="w-full h-12 text-lg" size="lg">
              Make Payment
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
