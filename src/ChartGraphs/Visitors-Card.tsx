// "use client"

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
// import { MoreHorizontal, Trophy } from "lucide-react"
// import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts"

// const visitorsData = [
//   { day: "1", visitors: 2000 },
//   { day: "2", visitors: 3500 },
//   { day: "3", visitors: 2500 },
//   { day: "4", visitors: 4500 },
//   { day: "5", visitors: 3000 },
//   { day: "6", visitors: 5000 },
//   { day: "7", visitors: 4000 },
//   { day: "8", visitors: 6000 },
//   { day: "9", visitors: 3500 },
//   { day: "10", visitors: 8000 },
// ]

// const chartConfig = {
//   visitors: {
//     label: "Visitors",
//     color: "hsl(var(--chart-1))",
//   },
// }

// export function VisitorsCard() {
//   return (
//     <Card>
//       <CardHeader className="pb-2">
//         <div className="flex items-center justify-between">
//           <CardTitle className="text-sm font-medium text-gray-600">Visitors</CardTitle>
//           <MoreHorizontal className="h-4 w-4 text-gray-400" />
//         </div>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         <div className="text-right">
//           <Badge variant="secondary" className="bg-slate-800 text-white">
//             94.1K
//           </Badge>
//         </div>

//         <ChartContainer config={chartConfig} className="h-20 w-full">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={visitorsData}>
//               <XAxis dataKey="day" axisLine={false} tickLine={false} tick={false} />
//               <YAxis hide />
//               <ChartTooltip
//                 content={<ChartTooltipContent />}
//                 formatter={(value) => [`${value.toLocaleString()}`, "Visitors"]}
//               />
//               <Bar dataKey="visitors" fill="var(--color-visitors)" radius={[2, 2, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </ChartContainer>

//         <div className="rounded-lg bg-green-50 p-3 text-center">
//           <Trophy className="mx-auto h-5 w-5 text-green-600 mb-1" />
//           <p className="text-xs text-green-700 font-medium">Congratulations</p>
//           <p className="text-xs text-green-600">You've just hit a new record</p>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }










"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { MoreHorizontal, Trophy, Users, Eye } from "lucide-react"
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts"

const visitorsData = [
  { day: "1", visitors: 2000 },
  { day: "2", visitors: 3500 },
  { day: "3", visitors: 2500 },
  { day: "4", visitors: 4500 },
  { day: "5", visitors: 3000 },
  { day: "6", visitors: 5000 },
  { day: "7", visitors: 4000 },
  { day: "8", visitors: 6000 },
  { day: "9", visitors: 3500 },
  { day: "10", visitors: 8000 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
    color: "hsl(var(--chart-1))",
  },
}

export function  VisitorsCard() {
  const totalVisitors = visitorsData.reduce((sum, item) => sum + item.visitors, 0)
  const peakDay = Math.max(...visitorsData.map((d) => d.visitors))

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-violet-50">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-purple-500 rounded-lg">
              <Users className="h-4 w-4 text-white" />
            </div>
            <CardTitle className="text-sm font-medium text-gray-700">Visitors</CardTitle>
          </div>
          <MoreHorizontal className="h-4 w-4 text-gray-400" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-2xl font-bold text-gray-900">{(totalVisitors / 1000).toFixed(1)}K</p>
            <p className="text-xs text-gray-500">Total Visitors</p>
          </div>
          <Badge variant="secondary" className="bg-slate-800 text-white px-3 py-1">
            <Eye className="h-3 w-3 mr-1" />
            94.1K
          </Badge>
        </div>

        <ChartContainer config={chartConfig} className="h-20 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={visitorsData}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={false} />
              <YAxis hide />
              <ChartTooltip
                content={<ChartTooltipContent />}
                formatter={(value) => [`${value.toLocaleString()}`, "Visitors"]}
              />
              <Bar
                dataKey="visitors"
                fill="var(--color-visitors)"
                radius={[3, 3, 0, 0]}
                className="hover:opacity-80 transition-opacity"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <div className="rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 p-4 text-center border border-green-200">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Trophy className="h-5 w-5 text-green-600" />
            <p className="text-sm font-semibold text-green-700">Congratulations!</p>
          </div>
          <p className="text-xs text-green-600">You've just hit a new record</p>
          <p className="text-xs text-green-500 mt-1">Peak: {peakDay.toLocaleString()} visitors</p>
        </div>
      </CardContent>
    </Card>
  )
}
