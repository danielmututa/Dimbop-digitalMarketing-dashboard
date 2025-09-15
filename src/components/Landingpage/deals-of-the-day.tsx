

// import React from "react"
// import useEmblaCarousel from "embla-carousel-react"
// import Image from "next/image"
// import { Card } from "@/components/ui/card"
// import { Progress } from "@/components/ui/progress"
// import { Star, ChevronLeft, ChevronRight } from "lucide-react"
// import { Button } from "@/components/ui/button"

// export function DealsOfTheDay() {
//   const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" })

//   const scrollPrev = React.useCallback(() => {
//     if (emblaApi) emblaApi.scrollPrev()
//   }, [emblaApi])

//   const scrollNext = React.useCallback(() => {
//     if (emblaApi) emblaApi.scrollNext()
//   }, [emblaApi])

//   // Dummy data for more carousel items
//   const deals = [
//     {
//       id: 1,
//       name: "Sony Playstation 4 Controller White",
//       oldPrice: "$537.00",
//       newPrice: "$369.00",
//       available: 15,
//       sold: 20,
//       progress: 50,
//       discount: "-30%",
//       image: "/placeholder.svg?height=150&width=150",
//     },
//     {
//       id: 2,
//       name: "Apple Watch Rose Gold Aluminum",
//       oldPrice: "$537.00",
//       newPrice: "$369.00",
//       available: 12,
//       sold: 9,
//       progress: 70,
//       discount: "-30%",
//       image: "/placeholder.svg?height=150&width=150",
//     },
//     {
//       id: 3,
//       name: "Bose QuietComfort 35 II",
//       oldPrice: "$349.00",
//       newPrice: "$299.00",
//       available: 25,
//       sold: 10,
//       progress: 40,
//       discount: "-15%",
//       image: "/placeholder.svg?height=150&width=150",
//     },
//     {
//       id: 4,
//       name: "Samsung 4K Smart TV 55-inch",
//       oldPrice: "$899.00",
//       newPrice: "$749.00",
//       available: 8,
//       sold: 5,
//       progress: 60,
//       discount: "-17%",
//       image: "/placeholder.svg?height=150&width=150",
//     },
//   ]

//   return (
//     <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950 relative">
//       <div className="container px-4 md:px-6">
//         <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
//           <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Deals Of The Day</h2>
//         </div>
//         <div className="embla overflow-hidden max-w-4xl mx-auto">
//           <div className="embla__viewport" ref={emblaRef}>
//             <div className="embla__container flex -ml-4">
//               {deals.map((deal) => (
//                 <div key={deal.id} className="embla__slide flex-[0_0_100%] sm:flex-[0_0_50%] pl-4">
//                   <Card className="flex flex-col sm:flex-row items-center p-4 gap-4 relative h-full">
//                     <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
//                       {deal.discount}
//                     </div>
//                     <Image
//                       src={deal.image || "/placeholder.svg"}
//                       width="150"
//                       height="150"
//                       alt={deal.name}
//                       className="rounded-lg object-cover"
//                     />
//                     <div className="flex-1 space-y-2 text-center sm:text-left">
//                       <h3 className="font-semibold text-lg">{deal.name}</h3>
//                       <div className="flex items-center justify-center sm:justify-start gap-1 text-yellow-500">
//                         <Star className="h-4 w-4 fill-current" />
//                         <Star className="h-4 w-4 fill-current" />
//                         <Star className="h-4 w-4 fill-current" />
//                         <Star className="h-4 w-4 fill-current" />
//                         <Star className="h-4 w-4 text-gray-300" />
//                       </div>
//                       <div className="flex items-baseline justify-center sm:justify-start gap-2">
//                         <span className="text-muted-foreground line-through">{deal.oldPrice}</span>
//                         <span className="text-2xl font-bold text-primary">{deal.newPrice}</span>
//                       </div>
//                       <div className="text-sm text-muted-foreground">
//                         Available: {deal.available} <span className="ml-4">Sold: {deal.sold}</span>
//                       </div>
//                       <Progress value={deal.progress} className="w-full h-2" />
//                       <div className="flex justify-center sm:justify-start gap-4 text-sm font-medium mt-4">
//                         <div className="flex flex-col items-center">
//                           <span className="text-lg font-bold">365</span>
//                           <span className="text-xs text-muted-foreground">DAYS</span>
//                         </div>
//                         <div className="flex flex-col items-center">
//                           <span className="text-lg font-bold">23</span>
//                           <span className="text-xs text-muted-foreground">HRS</span>
//                         </div>
//                         <div className="flex flex-col items-center">
//                           <span className="text-lg font-bold">07</span>
//                           <span className="text-xs text-muted-foreground">MINS</span>
//                         </div>
//                         <div className="flex flex-col items-center">
//                           <span className="text-lg font-bold">49</span>
//                           <span className="text-xs text-muted-foreground">SECS</span>
//                         </div>
//                       </div>
//                     </div>
//                   </Card>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={scrollPrev}
//             className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex"
//           >
//             <ChevronLeft className="h-6 w-6" />
//           </Button>
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={scrollNext}
//             className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex"
//           >
//             <ChevronRight className="h-6 w-6" />
//           </Button>
//         </div>
//       </div>
//     </section>
//   )
// }





import React from "react"
import useEmblaCarousel from "embla-carousel-react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DealsOfTheDay() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" })

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const deals = [
    {
      id: 1,
      name: "Sony Playstation 4 Controller White",
      oldPrice: "$537.00",
      newPrice: "$369.00",
      available: 15,
      sold: 20,
      progress: 50,
      discount: "-30%",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 2,
      name: "Apple Watch Rose Gold Aluminum",
      oldPrice: "$537.00",
      newPrice: "$369.00",
      available: 12,
      sold: 9,
      progress: 70,
      discount: "-30%",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 3,
      name: "Bose QuietComfort 35 II",
      oldPrice: "$349.00",
      newPrice: "$299.00",
      available: 25,
      sold: 10,
      progress: 40,
      discount: "-15%",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 4,
      name: "Samsung 4K Smart TV 55-inch",
      oldPrice: "$899.00",
      newPrice: "$749.00",
      available: 8,
      sold: 5,
      progress: 60,
      discount: "-17%",
      image: "/placeholder.svg?height=150&width=150",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950 relative">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Deals Of The Day</h2>
        </div>
        <div className="embla overflow-hidden max-w-4xl mx-auto">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container flex -ml-4">
              {deals.map((deal) => (
                <div key={deal.id} className="embla__slide flex-[0_0_100%] sm:flex-[0_0_50%] pl-4">
                  <Card className="flex flex-col sm:flex-row items-center p-4 gap-4 relative h-full">
                    <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {deal.discount}
                    </div>
                    <img
                      src={deal.image || "/placeholder.svg"}
                      width={150}
                      height={150}
                      alt={deal.name}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1 space-y-2 text-center sm:text-left">
                      <h3 className="font-semibold text-lg">{deal.name}</h3>
                      <div className="flex items-center justify-center sm:justify-start gap-1 text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 text-gray-300" />
                      </div>
                      <div className="flex items-baseline justify-center sm:justify-start gap-2">
                        <span className="text-muted-foreground line-through">{deal.oldPrice}</span>
                        <span className="text-2xl font-bold text-primary">{deal.newPrice}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Available: {deal.available} <span className="ml-4">Sold: {deal.sold}</span>
                      </div>
                      <Progress value={deal.progress} className="w-full h-2" />
                      <div className="flex justify-center sm:justify-start gap-4 text-sm font-medium mt-4">
                        <div className="flex flex-col items-center">
                          <span className="text-lg font-bold">365</span>
                          <span className="text-xs text-muted-foreground">DAYS</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-lg font-bold">23</span>
                          <span className="text-xs text-muted-foreground">HRS</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-lg font-bold">07</span>
                          <span className="text-xs text-muted-foreground">MINS</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-lg font-bold">49</span>
                          <span className="text-xs text-muted-foreground">SECS</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  )
}
