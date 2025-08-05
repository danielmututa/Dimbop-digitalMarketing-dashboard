import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Truck, Wallet, Headphones, Shield, RefreshCw } from "lucide-react"

export function HeroSection() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  NEW SMARTPHONE COMPARE MODELS AIR
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Awaken Your In-Between Moments with our latest smartphone models. Discover cutting-edge features and
                  unbeatable performance.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="#shop">SHOP NOW</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#features">Explore Features</Link>
                </Button>
              </div>
            </div>
            <Image
              src="/placeholder.svg?height=550&width=600"
              width="600"
              height="550"
              alt="New Smartphone Models"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
            />
          </div>
        </div>
      </section>

      {/* Feature Icons below Hero */}
      <section className="w-full py-8 bg-white dark:bg-gray-950 border-b">
        <div className="container px-4 md:px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <Truck className="h-8 w-8 text-primary" />
            <span className="text-sm font-medium">Free Shipping</span>
            <span className="text-xs text-muted-foreground">From $99.00</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <RefreshCw className="h-8 w-8 text-primary" />
            <span className="text-sm font-medium">Money Guarantee</span>
            <span className="text-xs text-muted-foreground">30 days back</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Wallet className="h-8 w-8 text-primary" />
            <span className="text-sm font-medium">Payment Method</span>
            <span className="text-xs text-muted-foreground">Secure System</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Headphones className="h-8 w-8 text-primary" />
            <span className="text-sm font-medium">Online Support</span>
            <span className="text-xs text-muted-foreground">24 hours on day</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-sm font-medium">100% Safe</span>
            <span className="text-xs text-muted-foreground">Secure shopping</span>
          </div>
        </div>
      </section>
    </>
  )
}
