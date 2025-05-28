"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { MoreHorizontal } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const purchaseData = [
  { name: "Social Media", value: 48, color: "#3b82f6" },
  { name: "Direct Search", value: 33, color: "#6b7280" },
  { name: "Others", value: 19, color: "#f97316" },
]

const chartConfig = {
  value: {
    label: "Percentage",
  },
  socialMedia: {
    label: "Social Media",
    color: "#3b82f6",
  },
  directSearch: {
    label: "Direct Search",
    color: "#6b7280",
  },
  others: {
    label: "Others",
    color: "#f97316",
  },
}

export function SourceOfPurchasesCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-gray-600">Source of Purchases</CardTitle>
          <MoreHorizontal className="h-4 w-4 text-gray-400" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center">
          <ChartContainer config={chartConfig} className="h-32 w-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={purchaseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={50}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {purchaseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} formatter={(value) => [`${value}%`, "Share"]} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        <div className="space-y-2">
          <Badge variant="outline" className="text-orange-600 border-orange-200">
            POOR SALES
          </Badge>
          <div className="space-y-1 text-sm">
            {purchaseData.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                  {item.name}
                </span>
                <span>{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
