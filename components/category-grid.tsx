"use client"

import { Card, CardContent } from "@/components/ui/card"
import { User, PoundSterling, Car, Users, Briefcase, Home } from "lucide-react"
import Link from "next/link"

interface Category {
  id: string
  name: string
  description: string
  icon: string
  sort_order: number
}

interface CategoryGridProps {
  categories: Category[]
}

const iconMap = {
  user: User,
  "pound-sterling": PoundSterling,
  car: Car,
  users: Users,
  briefcase: Briefcase,
  home: Home,
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => {
        const IconComponent = iconMap[category.icon as keyof typeof iconMap] || User

        return (
          <Link
            key={category.id}
            href={`/category/${category.id}`}
            className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
          >
            <Card className="h-full transition-all hover:shadow-lg hover:border-primary group-hover:scale-[1.02]">
              <CardContent className="flex flex-col items-center justify-center gap-6 p-8 text-center md:p-10">
                <div
                  className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20"
                  aria-hidden="true"
                >
                  <IconComponent className="h-12 w-12 text-primary" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-balance">{category.name}</h2>
                  <p className="text-base text-muted-foreground leading-relaxed">{category.description}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
