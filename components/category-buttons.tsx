"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { User, Wallet, Car, Heart, Home, Briefcase, Users } from "lucide-react"

const CATEGORIES = [
  { id: "personal", name: "Personal", description: "View personal details and emergency contact", icon: User, href: "/services/personal" },
  { id: "finance", name: "Finance", description: "View subsidy, balance and top up", icon: Wallet, href: "/services/finance" },
  { id: "driving", name: "Driving License", description: "View your driving license", icon: Car, href: "/services/driving" },
  { id: "medical", name: "Medical Card", description: "View nearest hospital, medical card & insurance", icon: Heart, href: "/services/medical" },
  { id: "employment", name: "Employment & Education", description: "Pay KWSP and SOCSO", icon: Briefcase, href: "/services/employment" },
  { id: "property", name: "Property", description: "Pay TNB, SADA, Indah Water", icon: Home, href: "/services/property" },
  { id: "family", name: "Family", description: "Family proxy mode", icon: Users, href: "/services/family" },
]

export function CategoryButtons() {
  return (
    <div className="grid grid-cols-2 gap-2">
    {CATEGORIES.map((category) => {
      const Icon = category.icon
      return (
        <Link key={category.id} href={category.href}>
          <Card className="flex flex-col items-center justify-start p-2 h-[140px]">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div className="text-center mt-1">
              <h4 className="text-xs font-bold">{category.name}</h4>
              <p className="text-[10px] text-muted-foreground leading-tight">{category.description}</p>
            </div>
          </Card>
        </Link>
      )
    })}
  </div>
  )
}
