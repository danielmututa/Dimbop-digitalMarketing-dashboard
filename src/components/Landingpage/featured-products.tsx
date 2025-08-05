"use client"

import { CardFooter } from "@/components/ui/card"
import { toast } from "sonner"

import React from "react"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Heart, ShoppingCart, Eye, ChevronLeft, ChevronRight } from "lucide-react"
import { ProductQuickView } from "./product-quick-view" // Import the new component

export function FeaturedProducts() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" })

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const products = [
    {
      id: 1,
      name: "Electrolux 6.5 Kg Washing Machine",
      rating: 4,
      oldPrice: "$799.00",
      newPrice: "$799.00",
      image: "/placeholder.svg?height=150&width=150",
      badges: ["NEW"],
      description:
        "A high-efficiency washing machine with a 6.5 kg capacity, perfect for medium-sized families. Features multiple wash programs and energy-saving technology.",
      category: "Home Appliances",
    },
    {
      id: 2,
      name: "Apple iPhone 7 Plus - 128GB",
      rating: 5,
      oldPrice: "$108.00",
      newPrice: "$108.00",
      image: "/placeholder.svg?height=150&width=150",
      badges: ["-10%"],
      description:
        "Refurbished iPhone 7 Plus with 128GB storage, in like-new condition at a discounted price. Comes with warranty.",
      category: "Smartphones",
    },
    {
      id: 3,
      name: "Apple Watch Series 2 Grey",
      rating: 4,
      oldPrice: "$299.00",
      newPrice: "$270.00",
      image: "/placeholder.svg?height=150&width=150",
      badges: ["NEW", "-10%"],
      description:
        "Stylish Apple Watch Series 2 in Space Gray, featuring GPS, water resistance, and a powerful dual-core processor.",
      category: "Wearables",
    },
    {
      id: 4,
      name: "Philips - Rice Cookers HD3128",
      rating: 5,
      oldPrice: "$93.00",
      newPrice: "$93.00",
      image: "/placeholder.svg?height=150&width=150",
      badges: [],
      description:
        "Efficient Philips rice cooker with a large capacity, perfect for preparing delicious rice for the whole family. Easy to use and clean.",
      category: "Kitchen Appliances",
    },
    {
      id: 5,
      name: "Electrolux 6.5 Kg Washing Machine",
      rating: 4,
      oldPrice: "$799.00",
      newPrice: "$799.00",
      image: "/placeholder.svg?height=150&width=150",
      badges: [],
      description:
        "A high-efficiency washing machine with a 6.5 kg capacity, perfect for medium-sized families. Features multiple wash programs and energy-saving technology.",
      category: "Home Appliances",
    },
    {
      id: 6,
      name: "Apple iPhone 7 Plus - 128GB",
      rating: 5,
      oldPrice: "$108.00",
      newPrice: "$108.00",
      image: "/placeholder.svg?height=150&width=150",
      badges: ["-10%"],
      description:
        "Refurbished iPhone 7 Plus with 128GB storage, in like-new condition at a discounted price. Comes with warranty.",
      category: "Smartphones",
    },
    {
      id: 7,
      name: "Apple Watch Series 2 Grey",
      rating: 4,
      oldPrice: "$299.00",
      newPrice: "$270.00",
      image: "/placeholder.svg?height=150&width=150",
      badges: ["NEW", "-10%"],
      description:
        "Stylish Apple Watch Series 2 in Space Gray, featuring GPS, water resistance, and a powerful dual-core processor.",
      category: "Wearables",
    },
    {
      id: 8,
      name: "Philips - Rice Cookers HD3128",
      rating: 5,
      oldPrice: "$93.00",
      newPrice: "$93.00",
      image: "/placeholder.svg?height=150&width=150",
      badges: [],
      description:
        "Efficient Philips rice cooker with a large capacity, perfect for preparing delicious rice for the whole family. Easy to use and clean.",
      category: "Kitchen Appliances",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950 relative">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Featured Products</h2>
        </div>
        <div className="embla overflow-hidden">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container flex -ml-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="embla__slide flex-[0_0_50%] sm:flex-[0_0_33.33%] md:flex-[0_0_25%] lg:flex-[0_0_20%] xl:flex-[0_0_16.66%] pl-4"
                >
                  <Card className="w-full flex-shrink-0 relative h-full flex flex-col">
                    {product.badges.includes("NEW") && (
                      <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                        NEW
                      </div>
                    )}
                    {product.badges.includes("-10%") && (
                      <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                        -10%
                      </div>
                    )}
                    <CardContent className="p-4 flex flex-col items-center text-center flex-grow">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        width="150"
                        height="150"
                        alt={product.name}
                        className="object-cover mb-4"
                      />
                      <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
                      <div className="flex items-center gap-1 text-yellow-500 text-xs mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < product.rating ? "fill-current" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <div className="flex items-baseline gap-1">
                        {product.oldPrice && (
                          <span className="text-muted-foreground line-through text-xs">{product.oldPrice}</span>
                        )}
                        <span className="text-lg font-bold text-primary">{product.newPrice}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex flex-col gap-2 w-full">
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={() => toast.success(`${product.name} added to cart!`)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" /> ADD TO CART
                      </Button>
                      <div className="flex gap-2 w-full">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 bg-transparent"
                          onClick={() => toast.success(`${product.name} added to wishlist!`)}
                        >
                          <Heart className="h-4 w-4" />
                          <span className="sr-only">Add to Wishlist</span>
                        </Button>
                        {/* Product Quick View Trigger */}
                        <ProductQuickView product={product}>
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View Product</span>
                          </Button>
                        </ProductQuickView>
                      </div>
                    </CardFooter>
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
