

// import Link from "next/link"

// import React from "react"
// import useEmblaCarousel from "embla-carousel-react"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { ChevronLeft, ChevronRight } from "lucide-react"

// export function PromotionalBanners() {
//   const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" })

//   const scrollPrev = React.useCallback(() => {
//     if (emblaApi) emblaApi.scrollPrev()
//   }, [emblaApi])

//   const scrollNext = React.useCallback(() => {
//     if (emblaApi) emblaApi.scrollNext()
//   }, [emblaApi])

//   const banners = [
//     {
//       id: 1,
//       title: "Professional Camera Zoom",
//       description: "Upgrade Image High Quality",
//       bgColor: "bg-purple-600",
//       image: "/placeholder.svg?height=250&width=400",
//       link: "#",
//     },
//     {
//       id: 2,
//       title: "HELLO, BLACK FRIDAY...",
//       description: "YOUR PURCHASE TODAY ONLY!",
//       bgColor: "bg-black",
//       discounts: ["15%", "20%", "25%"],
//       link: "#",
//     },
//     {
//       id: 3,
//       title: "Gear 360°",
//       description: "Innovation security in your family",
//       bgColor: "bg-gray-200",
//       image: "/placeholder.svg?height=250&width=400",
//       link: "#",
//     },
//     {
//       id: 4,
//       title: 'New Macbook Air 15.6"',
//       description: "",
//       bgColor: "bg-white",
//       image: "/placeholder.svg?height=250&width=800",
//       logo: "/placeholder.svg?height=50&width=100",
//       link: "#",
//       colSpan: "md:col-span-2",
//     },
//     {
//       id: 5,
//       title: "Headphone XL Stereo",
//       description: "Upgrade Sound High Quality",
//       bgColor: "bg-blue-500",
//       image: "/placeholder.svg?height=250&width=400",
//       link: "#",
//     },
//   ]

//   return (
//     <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900 relative">
//       <div className="container px-4 md:px-6">
//         <div className="embla overflow-hidden">
//           <div className="embla__viewport" ref={emblaRef}>
//             <div className="embla__container flex -ml-4">
//               {banners.map((banner) => (
//                 <div
//                   key={banner.id}
//                   className={`embla__slide flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.33%] ${banner.colSpan === "md:col-span-2" ? "md:flex-[0_0_66.66%]" : ""} pl-4`}
//                 >
//                   <div
//                     className={`relative h-[250px] rounded-lg overflow-hidden group ${banner.bgColor} flex flex-col items-center justify-center text-white text-center p-6`}
//                   >
//                     {banner.image && (
//                       <Image
//                         src={banner.image || "/placeholder.svg"}
//                         width={banner.colSpan === "md:col-span-2" ? 800 : 400}
//                         height={250}
//                         alt={banner.title}
//                         className="absolute inset-0 w-full h-full object-cover opacity-70 transition-opacity group-hover:opacity-100"
//                       />
//                     )}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 text-white">
//                       {banner.logo && (
//                         <Image
//                           src={banner.logo || "/placeholder.svg"}
//                           width="100"
//                           height="50"
//                           alt="Logo"
//                           className="mb-2 mx-auto"
//                         />
//                       )}
//                       <h3 className="text-2xl font-bold">{banner.title}</h3>
//                       {banner.description && <p className="text-sm">{banner.description}</p>}
//                       {banner.discounts && (
//                         <div className="flex gap-4 mb-4 mt-4">
//                           {banner.discounts.map((discount, index) => (
//                             <div key={index} className="flex flex-col items-center">
//                               <span className="text-4xl font-bold text-yellow-400">{discount}</span>
//                               <span className="text-sm">OFF</span>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                       <Button
//                         variant="outline"
//                         className="mt-2 w-fit text-white border-white hover:bg-white hover:text-black bg-transparent mx-auto"
//                         asChild
//                       >
//                         <Link href={banner.link}>{banner.discounts ? "REVEAL YOUR OFFER NOW" : "SHOP NOW"}</Link>
//                       </Button>
//                     </div>
//                   </div>
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




import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export function PromotionalBanners() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const banners = [
    {
      id: 1,
      title: "Professional Camera Zoom",
      description: "Upgrade Image High Quality",
      bgColor: "bg-purple-600",
      image: "/placeholder.svg?height=250&width=400",
      link: "#",
    },
    {
      id: 2,
      title: "HELLO, BLACK FRIDAY...",
      description: "YOUR PURCHASE TODAY ONLY!",
      bgColor: "bg-black",
      discounts: ["15%", "20%", "25%"],
      link: "#",
    },
    {
      id: 3,
      title: "Gear 360°",
      description: "Innovation security in your family",
      bgColor: "bg-gray-200",
      image: "/placeholder.svg?height=250&width=400",
      link: "#",
    },
    {
      id: 4,
      title: 'New Macbook Air 15.6"',
      description: "",
      bgColor: "bg-white",
      image: "/placeholder.svg?height=250&width=800",
      logo: "/placeholder.svg?height=50&width=100",
      link: "#",
      colSpan: "md:col-span-2",
    },
    {
      id: 5,
      title: "Headphone XL Stereo",
      description: "Upgrade Sound High Quality",
      bgColor: "bg-blue-500",
      image: "/placeholder.svg?height=250&width=400",
      link: "#",
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900 relative">
      <div className="container px-4 md:px-6">
        <div className="embla overflow-hidden">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container flex -ml-4">
              {banners.map((banner) => (
                <div
                  key={banner.id}
                  className={`embla__slide flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.33%] ${
                    banner.colSpan === "md:col-span-2" ? "md:flex-[0_0_66.66%]" : ""
                  } pl-4`}
                >
                  <div
                    className={`relative h-[250px] rounded-lg overflow-hidden group ${banner.bgColor} flex flex-col items-center justify-center text-white text-center p-6`}
                  >
                    {banner.image && (
                      <img
                        src={banner.image || "/placeholder.svg"}
                        width={banner.colSpan === "md:col-span-2" ? 800 : 400}
                        height={250}
                        alt={banner.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-70 transition-opacity group-hover:opacity-100"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 text-white">
                      {banner.logo && (
                        <img
                          src={banner.logo || "/placeholder.svg"}
                          width={100}
                          height={50}
                          alt="Logo"
                          className="mb-2 mx-auto"
                        />
                      )}
                      <h3 className="text-2xl font-bold">{banner.title}</h3>
                      {banner.description && <p className="text-sm">{banner.description}</p>}
                      {banner.discounts && (
                        <div className="flex gap-4 mb-4 mt-4">
                          {banner.discounts.map((discount, index) => (
                            <div key={index} className="flex flex-col items-center">
                              <span className="text-4xl font-bold text-yellow-400">{discount}</span>
                              <span className="text-sm">OFF</span>
                            </div>
                          ))}
                        </div>
                      )}
                      <Button
                        variant="outline"
                        className="mt-2 w-fit text-white border-white hover:bg-white hover:text-black bg-transparent mx-auto"
                        asChild
                      >
                        <Link to={banner.link}>{banner.discounts ? "REVEAL YOUR OFFER NOW" : "SHOP NOW"}</Link>
                      </Button>
                    </div>
                  </div>
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
  );
}
