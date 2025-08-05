import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Quote } from "lucide-react"

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Customers Say</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear from businesses that have transformed their operations with StreamLine.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <Card className="flex flex-col justify-between h-full">
            <CardContent className="pt-6">
              <Quote className="h-8 w-8 text-muted-foreground mb-4" />
              <p className="text-lg leading-relaxed">
                &quot;StreamLine has revolutionized how our team collaborates. Projects are completed faster, and
                communication is clearer than ever.&quot;
              </p>
            </CardContent>
            <CardFooter className="flex items-center gap-4 pt-4">
              <Image
                src="/placeholder.svg?height=48&width=48"
                width="48"
                height="48"
                alt="Avatar"
                className="rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">John Doe</p>
                <p className="text-sm text-muted-foreground">CEO, Tech Solutions</p>
              </div>
            </CardFooter>
          </Card>
          <Card className="flex flex-col justify-between h-full">
            <CardContent className="pt-6">
              <Quote className="h-8 w-8 text-muted-foreground mb-4" />
              <p className="text-lg leading-relaxed">
                &quot;The analytics dashboard is a game-changer. We can now make data-driven decisions with
                confidence.&quot;
              </p>
            </CardContent>
            <CardFooter className="flex items-center gap-4 pt-4">
              <Image
                src="/placeholder.svg?height=48&width=48"
                width="48"
                height="48"
                alt="Avatar"
                className="rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">Jane Smith</p>
                <p className="text-sm text-muted-foreground">Marketing Director, Creative Agency</p>
              </div>
            </CardFooter>
          </Card>
          <Card className="flex flex-col justify-between h-full">
            <CardContent className="pt-6">
              <Quote className="h-8 w-8 text-muted-foreground mb-4" />
              <p className="text-lg leading-relaxed">
                &quot;Setup was incredibly easy, and the support team is fantastic. Highly recommend StreamLine!&quot;
              </p>
            </CardContent>
            <CardFooter className="flex items-center gap-4 pt-4">
              <Image
                src="/placeholder.svg?height=48&width=48"
                width="48"
                height="48"
                alt="Avatar"
                className="rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">Michael Brown</p>
                <p className="text-sm text-muted-foreground">Operations Manager, Global Corp</p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}
