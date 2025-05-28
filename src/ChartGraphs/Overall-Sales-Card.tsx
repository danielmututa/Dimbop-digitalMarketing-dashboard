"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp, MoreHorizontal } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const salesData = [
  { date: "Dec 1", sales: 45000, label: "Dec 1" },
  { date: "Dec 2", sales: 52000, label: "Dec 2" },
  { date: "Dec 3", sales: 48000, label: "Dec 3" },
  { date: "Dec 4", sales: 74805, label: "Dec 4" },
  { date: "Dec 5", sales: 58000, label: "Dec 5" },
  { date: "Dec 6", sales: 62000, label: "Dec 6" },
  { date: "Dec 7", sales: 55000, label: "Dec 7" },
]

const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
}

export function OverallSalesCard() {
  const [activeTab, setActiveTab] = useState("current")

  return (
    <Card className="lg:col-span-1">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-gray-600">Overall Sales</CardTitle>
          <MoreHorizontal className="h-4 w-4 text-gray-400" />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold">$ 40,256.92</span>
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            <TrendingUp className="mr-1 h-3 w-3" />
            +2.8%
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="current">Current Week</TabsTrigger>
            <TabsTrigger value="last">Last Week</TabsTrigger>
          </TabsList>
        </Tabs>

        <ChartContainer config={chartConfig} className="h-32 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-sales)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-sales)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#6b7280" }} />
              <YAxis hide />
              <ChartTooltip
                content={<ChartTooltipContent />}
                formatter={(value) => [`$${value.toLocaleString()}`, "Sales"]}
              />
              <Area
                dataKey="sales"
                type="monotone"
                fill="url(#fillSales)"
                fillOpacity={0.4}
                stroke="var(--color-sales)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
