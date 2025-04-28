import React from "react"
import { MapPin } from "lucide-react"

interface SpotCardProps {
  spot: {
    id: number
    name: string
    area: string
    description: string
  }
}

export const SpotCard: React.FC<SpotCardProps> = React.memo(({ spot }) => {
  return (
    <div 
      className="rounded-lg border bg-card text-card-foreground shadow-sm"
      role="article"
      aria-labelledby={`spot-title-${spot.id}`}
    >
      <div className="p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-full p-3 bg-emerald-100 text-emerald-600">
            <MapPin className="h-6 w-6" />
          </div>
          <div>
            <h3 
              id={`spot-title-${spot.id}`}
              className="text-lg font-semibold"
            >
              {spot.name}
            </h3>
            <p className="text-sm text-muted-foreground">{spot.area}</p>
          </div>
        </div>
        <p className="mt-4 text-sm">{spot.description}</p>
      </div>
    </div>
  )
})

SpotCard.displayName = "SpotCard"
