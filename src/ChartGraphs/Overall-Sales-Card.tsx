

// import { useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
// import { TrendingUp, MoreHorizontal } from "lucide-react"
// import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

// const salesData = [
//   { date: "Dec 1", sales: 45000, label: "Dec 1" },
//   { date: "Dec 2", sales: 52000, label: "Dec 2" },
//   { date: "Dec 3", sales: 48000, label: "Dec 3" },
//   { date: "Dec 4", sales: 74805, label: "Dec 4" },
//   { date: "Dec 5", sales: 58000, label: "Dec 5" },
//   { date: "Dec 6", sales: 62000, label: "Dec 6" },
//   { date: "Dec 7", sales: 55000, label: "Dec 7" },
// ]

// const chartConfig = {
//   sales: {
//     label: "Sales",
//     color: "hsl(var(--chart-1))",
//   },
// }

// export function OverallSalesCard() {
//   const [activeTab, setActiveTab] = useState("current")

//   return (
//     <Card className="lg:col-span-1">
//       <CardHeader className="pb-2">
//         <div className="flex items-center justify-between">
//           <CardTitle className="text-sm font-medium text-gray-600">Overall Sales</CardTitle>
//           <MoreHorizontal className="h-4 w-4 text-gray-400" />
//         </div>
//         <div className="flex items-center space-x-2">
//           <span className="text-2xl font-bold">$ 40,256.92</span>
//           <Badge variant="secondary" className="bg-green-100 text-green-700">
//             <TrendingUp className="mr-1 h-3 w-3" />
//             +2.8%
//           </Badge>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
//           <TabsList className="grid w-full grid-cols-2">
//             <TabsTrigger value="current">Current Week</TabsTrigger>
//             <TabsTrigger value="last">Last Week</TabsTrigger>
//           </TabsList>
//         </Tabs>

//         <ChartContainer config={chartConfig} className="h-32 w-full">
//           <ResponsiveContainer width="100%" height="100%">
//             <AreaChart data={salesData}>
//               <defs>
//                 <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="var(--color-sales)" stopOpacity={0.3} />
//                   <stop offset="95%" stopColor="var(--color-sales)" stopOpacity={0.1} />
//                 </linearGradient>
//               </defs>
//               <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#6b7280" }} />
//               <YAxis hide />
//               <ChartTooltip
//                 content={<ChartTooltipContent />}
//                 formatter={(value) => [`$${value.toLocaleString()}`, "Sales"]}
//               />
//               <Area
//                 dataKey="sales"
//                 type="monotone"
//                 fill="url(#fillSales)"
//                 fillOpacity={0.4}
//                 stroke="var(--color-sales)"
//                 strokeWidth={2}
//               />
//             </AreaChart>
//           </ResponsiveContainer>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   )
// }






// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
// import { ChevronDown, TrendingUp } from "lucide-react"
// import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"

// const defaultSalesData = [
//   { month: "Dec 1", value: 45000 },
//   { month: "Dec 2", value: 52000 },
//   { month: "Dec 3", value: 48000 },
//   { month: "Dec 4", value: 74805 },
//   { month: "Dec 5", value: 58000 },
//   { month: "Dec 6", value: 62000 },
//   { month: "Dec 7", value: 55000 },
// ]

// const chartConfig = {
//   value: {
//     label: "Sales",
//     color: "hsl(var(--chart-1))",
//   },
// }

// interface OverallSalesCardProps {
//   salesData?: { month: string; value: number; }[];
//   selectedPeriod?: string;
//   setSelectedPeriod?: (period: string) => void;
// }

// export function OverallSalesCard({ 
//   salesData: propSalesData, 
//   selectedPeriod = "Last 7 days", 
//   setSelectedPeriod 
// }: OverallSalesCardProps) {
//   const dataToUse = propSalesData || defaultSalesData;
  
//   // Calculate total sales and percentage change
//   const totalSales = dataToUse.reduce((sum, item) => sum + item.value, 0);
//   const averageSales = totalSales / dataToUse.length;
//   const lastValue = dataToUse[dataToUse.length - 1]?.value || 0;
//   const previousValue = dataToUse[dataToUse.length - 2]?.value || 0;
//   const percentageChange = previousValue > 0 ? ((lastValue - previousValue) / previousValue) * 100 : 0;

//   const handlePeriodChange = () => {
//     if (setSelectedPeriod) {
//       const periods = ["Last 7 days", "Last 30 days", "Last 90 days"];
//       const currentIndex = periods.indexOf(selectedPeriod);
//       const nextIndex = (currentIndex + 1) % periods.length;
//       setSelectedPeriod(periods[nextIndex]);
//     }
//   };

//   return (
//     <Card>
//       <CardHeader className="pb-2">
//         <div className="flex items-center justify-between">
//           <CardTitle className="text-sm font-medium text-gray-600">Overall Sales</CardTitle>
//           <Button 
//             variant="ghost" 
//             size="sm"
//             onClick={handlePeriodChange}
//           >
//             {selectedPeriod} <ChevronDown className="ml-1 h-3 w-3" />
//           </Button>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           {/* Sales Summary */}
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-2xl font-bold">${totalSales.toLocaleString()}</p>
//               <div className="flex items-center space-x-2 text-sm">
//                 <span className={`flex items-center ${percentageChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
//                   <TrendingUp className="h-4 w-4 mr-1" />
//                   {Math.abs(percentageChange).toFixed(1)}%
//                 </span>
//                 <span className="text-gray-500">vs previous period</span>
//               </div>
//             </div>
//           </div>

//           {/* Chart */}
//           <ChartContainer config={chartConfig} className="h-48 w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <AreaChart
//                 data={dataToUse}
//                 margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
//               >
//                 <defs>
//                   <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
//                     <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
//                 <XAxis 
//                   dataKey="month" 
//                   axisLine={false}
//                   tickLine={false}
//                   tick={{ fontSize: 12, fill: "#6b7280" }}
//                 />
//                 <YAxis 
//                   axisLine={false}
//                   tickLine={false}
//                   tick={{ fontSize: 12, fill: "#6b7280" }}
//                   tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
//                 />
//                 <ChartTooltip
//                   content={<ChartTooltipContent />}
//                   formatter={(value: any) => [`$${value.toLocaleString()}`, "Sales"]}
//                   labelFormatter={(label) => `Date: ${label}`}
//                 />
//                 <Area
//                   type="monotone"
//                   dataKey="value"
//                   stroke="#3b82f6"
//                   strokeWidth={2}
//                   fill="url(#colorValue)"
//                 />
//               </AreaChart>
//             </ResponsiveContainer>
//           </ChartContainer>

//           {/* Additional Stats */}
//           <div className="grid grid-cols-2 gap-4 pt-2 border-t">
//             <div>
//               <p className="text-xs text-gray-500">Average Daily</p>
//               <p className="text-sm font-medium">${averageSales.toLocaleString()}</p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">Peak Day</p>
//               <p className="text-sm font-medium">${Math.max(...dataToUse.map(d => d.value)).toLocaleString()}</p>
//             </div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }














import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChevronDown, TrendingUp, TrendingDown, DollarSign } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"

const defaultSalesData = [
  { month: "Dec 1", value: 45000 },
  { month: "Dec 2", value: 52000 },
  { month: "Dec 3", value: 48000 },
  { month: "Dec 4", value: 74805 },
  { month: "Dec 5", value: 58000 },
  { month: "Dec 6", value: 62000 },
  { month: "Dec 7", value: 55000 },
]

const chartConfig = {
  value: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
}

interface EnhancedOverallSalesCardProps {
  salesData?: { month: string; value: number }[]
  selectedPeriod?: string
  setSelectedPeriod?: (period: string) => void
}

export function OverallSalesCard({
  salesData: propSalesData,
  selectedPeriod = "Last 7 days",
  setSelectedPeriod,
}: EnhancedOverallSalesCardProps) {
  const dataToUse = propSalesData || defaultSalesData

  const totalSales = dataToUse.reduce((sum, item) => sum + item.value, 0)
  const lastValue = dataToUse[dataToUse.length - 1]?.value || 0
  const previousValue = dataToUse[dataToUse.length - 2]?.value || 0
  const percentageChange = previousValue > 0 ? ((lastValue - previousValue) / previousValue) * 100 : 0
  const isPositive = percentageChange >= 0

  const handlePeriodChange = () => {
    if (setSelectedPeriod) {
      const periods = ["Last 7 days", "Last 30 days", "Last 90 days"]
      const currentIndex = periods.indexOf(selectedPeriod)
      const nextIndex = (currentIndex + 1) % periods.length
      setSelectedPeriod(periods[nextIndex])
    }
  }

  return (
    <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full -translate-y-16 translate-x-16" />
      <CardHeader className="pb-2 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-500 rounded-lg">
              <DollarSign className="h-4 w-4 text-white" />
            </div>
            <CardTitle className="text-sm font-medium text-gray-700">Overall Sales</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={handlePeriodChange} className="text-xs hover:bg-white/50">
            {selectedPeriod} <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-baseline space-x-2">
              <p className="text-3xl font-bold text-gray-900">${(totalSales / 1000000).toFixed(2)}M</p>
              <div
                className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                  isPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
              >
                {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                <span>{Math.abs(percentageChange).toFixed(1)}%</span>
              </div>
            </div>
            <p className="text-sm text-gray-600">vs previous period</p>
          </div>

          <ChartContainer config={chartConfig} className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataToUse} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  formatter={(value: any) => [`$${value.toLocaleString()}`, "Sales"]}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">Average</p>
              <p className="text-sm font-semibold text-gray-900">
                ${(totalSales / dataToUse.length / 1000).toFixed(0)}k
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">Peak</p>
              <p className="text-sm font-semibold text-gray-900">
                ${(Math.max(...dataToUse.map((d) => d.value)) / 1000).toFixed(0)}k
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">Growth</p>
              <p className={`text-sm font-semibold ${isPositive ? "text-green-600" : "text-red-600"}`}>
                {isPositive ? "+" : ""}
                {percentageChange.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
