

// import { useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
// import { ChevronDown } from "lucide-react"
// import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts"

// const countryData = [
//   { country: "India", value: 1000, color: "#3b82f6" },
//   { country: "United States", value: 900, color: "#3b82f6" },
//   { country: "China", value: 400, color: "#60a5fa" },
//   { country: "Indonesia", value: 1400, color: "#f97316" },
//   { country: "Russia", value: 700, color: "#3b82f6" },
//   { country: "Bangladesh", value: 600, color: "#60a5fa" },
//   { country: "Canada", value: 600, color: "#60a5fa" },
//   { country: "Australia", value: 400, color: "#60a5fa" },
// ]

// const chartConfig = {
//   value: {
//     label: "Sales",
//     color: "hsl(var(--chart-1))",
//   },
// }

// export function CountriesCard() {
//   const [selectedPeriod] = useState("Last 7 days")

//   return (
//     <Card>
//       <CardHeader className="pb-2">
//         <div className="flex items-center justify-between">
//           <CardTitle className="text-sm font-medium text-gray-600">
//             72 Countries <span className="text-xs text-gray-400">(70362 Sales)</span>
//           </CardTitle>
//           <Button variant="ghost" size="sm">
//             {selectedPeriod} <ChevronDown className="ml-1 h-3 w-3" />
//           </Button>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfig} className="h-64 w-full">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={countryData} layout="horizontal" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
//               <XAxis type="number" hide />
//               <YAxis
//                 dataKey="country"
//                 type="category"
//                 axisLine={false}
//                 tickLine={false}
//                 tick={{ fontSize: 12, fill: "#6b7280" }}
//                 width={70}
//               />
//               <ChartTooltip
//                 content={<ChartTooltipContent />}
//                 formatter={(value, name, props) => [`${value.toLocaleString()}`, `Sales in ${props.payload.country}`]}
//               />
//               <Bar dataKey="value" fill="var(--color-value)" radius={[0, 4, 4, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   )
// }





import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChevronDown } from "lucide-react"
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts"

const countryData = [
  { country: "India", value: 1000, color: "#3b82f6" },
  { country: "United States", value: 900, color: "#3b82f6" },
  { country: "China", value: 400, color: "#60a5fa" },
  { country: "Indonesia", value: 1400, color: "#f97316" },
  { country: "Russia", value: 700, color: "#3b82f6" },
  { country: "Bangladesh", value: 600, color: "#60a5fa" },
  { country: "Canada", value: 600, color: "#60a5fa" },
  { country: "Australia", value: 400, color: "#60a5fa" },
]

const chartConfig = {
  value: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
}

interface CountriesCardProps {
  countryData?: any[];
  selectedPeriod?: string;
  setSelectedPeriod?: (period: string) => void;
}

export function CountriesCard({ countryData: propCountryData, selectedPeriod = "Last 7 days" }: CountriesCardProps) {
  const dataToUse = propCountryData || countryData;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-gray-600">
            72 Countries <span className="text-xs text-gray-400">(70362 Sales)</span>
          </CardTitle>
          <Button variant="ghost" size="sm">
            {selectedPeriod} <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dataToUse} layout="horizontal" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
              <XAxis type="number" hide />
              <YAxis
                dataKey="country"
                type="category"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6b7280" }}
                width={70}
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
                formatter={(value, _name, props) => [`${value.toLocaleString()}`, `Sales in ${props.payload.country}`]}
              />
              <Bar dataKey="value" fill="var(--color-value)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}