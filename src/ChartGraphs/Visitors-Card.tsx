"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { MoreHorizontal, Trophy } from "lucide-react"
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

export function VisitorsCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-gray-600">Visitors</CardTitle>
          <MoreHorizontal className="h-4 w-4 text-gray-400" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-right">
          <Badge variant="secondary" className="bg-slate-800 text-white">
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
              <Bar dataKey="visitors" fill="var(--color-visitors)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <div className="rounded-lg bg-green-50 p-3 text-center">
          <Trophy className="mx-auto h-5 w-5 text-green-600 mb-1" />
          <p className="text-xs text-green-700 font-medium">Congratulations</p>
          <p className="text-xs text-green-600">You've just hit a new record</p>
        </div>
      </CardContent>
    </Card>
  )
}
