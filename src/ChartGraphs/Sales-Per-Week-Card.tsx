

// import { useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { ChevronDown } from "lucide-react"

// // Generate heatmap data for 5 weeks x 7 days
// const generateHeatmapData = () => {
//   const data = []
//   for (let week = 0; week < 5; week++) {
//     for (let day = 0; day < 7; day++) {
//       const value = Math.floor(Math.random() * 1000)
//       data.push({
//         week,
//         day,
//         value,
//         intensity: value / 1000,
//       })
//     }
//   }
//   return data
// }

// const heatmapData = generateHeatmapData()

// const getIntensityColor = (intensity: number) => {
//   if (intensity > 0.8) return "bg-blue-600 hover:bg-blue-700"
//   if (intensity > 0.6) return "bg-blue-500 hover:bg-blue-600"
//   if (intensity > 0.4) return "bg-blue-400 hover:bg-blue-500"
//   if (intensity > 0.2) return "bg-blue-300 hover:bg-blue-400"
//   return "bg-blue-100 hover:bg-blue-200"
// }

// export function SalesPerWeekCard() {
//   const [selectedPeriod] = useState("Last 7 days")
//   const [hoveredCell, setHoveredCell] = useState<{ week: number; day: number; value: number } | null>(null)

//   return (
//     <Card>
//       <CardHeader className="pb-2">
//         <div className="flex items-center justify-between">
//           <CardTitle className="text-sm font-medium text-gray-600">Sales per week</CardTitle>
//           <Button variant="ghost" size="sm">
//             {selectedPeriod} <ChevronDown className="ml-1 h-3 w-3" />
//           </Button>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="relative">
//           <div className="grid grid-cols-7 gap-1">
//             {heatmapData.map((cell, index) => (
//               <div
//                 key={index}
//                 className={`aspect-square rounded-sm cursor-pointer transition-colors ${getIntensityColor(cell.intensity)}`}
//                 onMouseEnter={() => setHoveredCell(cell)}
//                 onMouseLeave={() => setHoveredCell(null)}
//                 title={`Week ${cell.week + 1}, Day ${cell.day + 1}: ${cell.value} sales`}
//               />
//             ))}
//           </div>

//           {hoveredCell && (
//             <div className="absolute top-0 left-0 bg-black text-white text-xs p-2 rounded shadow-lg pointer-events-none z-10">
//               Week {hoveredCell.week + 1}, Day {hoveredCell.day + 1}: {hoveredCell.value} sales
//             </div>
//           )}
//         </div>

//         <div className="mt-4 flex justify-between text-xs text-gray-500">
//           <span>0 - 300</span>
//           <span>300 - 600</span>
//           <span>600 - 900</span>
//           <span>900 - 1000</span>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }










import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

// Generate heatmap data for 5 weeks x 7 days
const generateHeatmapData = () => {
  const data = []
  for (let week = 0; week < 5; week++) {
    for (let day = 0; day < 7; day++) {
      const value = Math.floor(Math.random() * 1000)
      data.push({
        week,
        day,
        value,
        intensity: value / 1000,
      })
    }
  }
  return data
}

const heatmapData = generateHeatmapData()

const getIntensityColor = (intensity: number) => {
  if (intensity > 0.8) return "bg-blue-600 hover:bg-blue-700"
  if (intensity > 0.6) return "bg-blue-500 hover:bg-blue-600"
  if (intensity > 0.4) return "bg-blue-400 hover:bg-blue-500"
  if (intensity > 0.2) return "bg-blue-300 hover:bg-blue-400"
  return "bg-blue-100 hover:bg-blue-200"
}

interface SalesPerWeekCardProps {
  salesData?: any[];
  selectedPeriod?: string;
  setSelectedPeriod?: (period: string) => void;
}

export function SalesPerWeekCard({  selectedPeriod = "Last 7 days", }: SalesPerWeekCardProps) {
  const [hoveredCell, setHoveredCell] = useState<{ week: number; day: number; value: number } | null>(null)

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-gray-600">Sales per week</CardTitle>
          <Button variant="ghost" size="sm">
            {selectedPeriod} <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="grid grid-cols-7 gap-1">
            {heatmapData.map((cell, index) => (
              <div
                key={index}
                className={`aspect-square rounded-sm cursor-pointer transition-colors ${getIntensityColor(cell.intensity)}`}
                onMouseEnter={() => setHoveredCell(cell)}
                onMouseLeave={() => setHoveredCell(null)}
                title={`Week ${cell.week + 1}, Day ${cell.day + 1}: ${cell.value} sales`}
              />
            ))}
          </div>

          {hoveredCell && (
            <div className="absolute top-0 left-0 bg-black text-white text-xs p-2 rounded shadow-lg pointer-events-none z-10">
              Week {hoveredCell.week + 1}, Day {hoveredCell.day + 1}: {hoveredCell.value} sales
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-between text-xs text-gray-500">
          <span>0 - 300</span>
          <span>300 - 600</span>
          <span>600 - 900</span>
          <span>900 - 1000</span>
        </div>
      </CardContent>
    </Card>
  )
}