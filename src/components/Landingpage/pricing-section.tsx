import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X } from "lucide-react"

export function PricingSection() {
  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple, Transparent Pricing</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose the plan that best fits your needs. No hidden fees, no surprises.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <Card className="flex flex-col justify-between h-full">
            <CardHeader>
              <CardTitle>Basic</CardTitle>
              <CardDescription>Perfect for individuals and small teams.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-4xl font-bold">
                $19<span className="text-lg text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Up to 5 Users
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Basic Project Management
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Email Support
                </li>
                <li className="flex items-center gap-2">
                  <X className="h-4 w-4 text-destructive" />
                  Advanced Analytics
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Start Basic</Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col justify-between h-full border-2 border-primary shadow-lg">
            <CardHeader>
              <CardTitle>Pro</CardTitle>
              <CardDescription>Ideal for growing businesses needing more power.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-4xl font-bold">
                $49<span className="text-lg text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Up to 20 Users
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Advanced Project Management
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Priority Email Support
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Basic Analytics
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Go Pro</Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col justify-between h-full">
            <CardHeader>
              <CardTitle>Enterprise</CardTitle>
              <CardDescription>Custom solutions for large organizations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-4xl font-bold">Custom</div>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Unlimited Users
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Dedicated Account Manager
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  24/7 Phone Support
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Full Analytics Suite
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-transparent" variant="outline">
                Contact Sales
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}
