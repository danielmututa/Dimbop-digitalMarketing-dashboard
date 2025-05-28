// "use client"

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Avatar, AvatarFallback } from "@/components/ui/avatar"
// import { Download, MoreHorizontal } from "lucide-react"

// const salesHistory = [
//   {
//     id: 1,
//     name: "Alpha Turner",
//     amount: 30.92,
//     avatar: "AT",
//     color: "bg-green-500",
//     country: "United States",
//     timestamp: "2 hours ago",
//   },
//   {
//     id: 2,
//     name: "Bella Poarch",
//     amount: 199.99,
//     avatar: "BP",
//     color: "bg-purple-500",
//     country: "United States",
//     timestamp: "4 hours ago",
//   },
//   {
//     id: 3,
//     name: "Cinderella",
//     amount: 30.0,
//     avatar: "C",
//     color: "bg-purple-500",
//     country: "United States",
//     timestamp: "6 hours ago",
//   },
//   {
//     id: 4,
//     name: "David Johnson",
//     amount: 49.99,
//     avatar: "DJ",
//     color: "bg-blue-500",
//     country: "United States",
//     timestamp: "8 hours ago",
//   },
//   {
//     id: 5,
//     name: "Peter Parker",
//     amount: 49.99,
//     avatar: "PP",
//     color: "bg-gray-500",
//     country: "United States",
//     timestamp: "1 day ago",
//   },
// ]

// export function SalesHistoryCard() {
//   const handleDownload = () => {
//     // This would connect to your backend later
//     console.log("Downloading sales history...")
//   }

//   return (
//     <Card>
//       <CardHeader className="pb-2">
//         <div className="flex items-center justify-between">
//           <CardTitle className="text-sm font-medium text-gray-600">Sales History</CardTitle>
//           <MoreHorizontal className="h-4 w-4 text-gray-400" />
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-3">
//           {salesHistory.map((item) => (
//             <div
//               key={item.id}
//               className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
//             >
//               <Avatar className="h-8 w-8">
//                 <AvatarFallback className={`${item.color} text-white text-xs`}>{item.avatar}</AvatarFallback>
//               </Avatar>
//               <div className="flex-1">
//                 <p className="text-sm font-medium">{item.name}</p>
//                 <p className="text-xs text-gray-500">{item.country}</p>
//               </div>
//               <div className="text-right">
//                 <p className="text-sm font-medium">${item.amount.toFixed(2)}</p>
//                 <p className="text-xs text-gray-500">{item.timestamp}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//         <Button
//           variant="ghost"
//           size="sm"
//           className="w-full mt-4 text-blue-600 hover:text-blue-700"
//           onClick={handleDownload}
//         >
//           <Download className="mr-2 h-4 w-4" />
//           DOWNLOAD
//         </Button>
//       </CardContent>
//     </Card>
//   )
// }







"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Download, MoreHorizontal } from "lucide-react"

const salesHistory = [
  {
    id: 1,
    name: "Alpha Turner",
    amount: 30.92,
    avatar: "AT",
    color: "bg-green-500",
    country: "United States",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    name: "Bella Poarch",
    amount: 199.99,
    avatar: "BP",
    color: "bg-purple-500",
    country: "United States",
    timestamp: "4 hours ago",
  },
  {
    id: 3,
    name: "Cinderella",
    amount: 30.0,
    avatar: "C",
    color: "bg-purple-500",
    country: "United States",
    timestamp: "6 hours ago",
  },
  {
    id: 4,
    name: "David Johnson",
    amount: 49.99,
    avatar: "DJ",
    color: "bg-blue-500",
    country: "United States",
    timestamp: "8 hours ago",
  },
  {
    id: 5,
    name: "Peter Parker",
    amount: 49.99,
    avatar: "PP",
    color: "bg-gray-500",
    country: "United States",
    timestamp: "1 day ago",
  },
]

interface SalesHistoryCardProps {
  salesHistory?: any[];
  selectedPeriod?: string;
  setSelectedPeriod?: (period: string) => void;
}

export function SalesHistoryCard({ salesHistory: propSalesHistory }: SalesHistoryCardProps) {
  const handleDownload = () => {
    // This would connect to your backend later
    console.log("Downloading sales history...")
  }

  const dataToUse = propSalesHistory || salesHistory;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-gray-600">Sales History</CardTitle>
          <MoreHorizontal className="h-4 w-4 text-gray-400" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {dataToUse.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className={`${item.color} text-white text-xs`}>{item.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">{item.country}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">${typeof item.amount === 'string' ? item.amount.replace('$', '') : item.amount.toFixed(2)}</p>
                <p className="text-xs text-gray-500">{item.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full mt-4 text-blue-600 hover:text-blue-700"
          onClick={handleDownload}
        >
          <Download className="mr-2 h-4 w-4" />
          DOWNLOAD
        </Button>
      </CardContent>
    </Card>
  )
}