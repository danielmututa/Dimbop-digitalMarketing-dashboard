import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function FinalCtaSection() {
  return (
    <section id="signup" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Ready to Streamline Your Business?</h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Join thousands of satisfied customers who are already boosting their productivity with StreamLine.
          </p>
        </div>
        <div className="mx-auto w-full max-w-sm space-y-2">
          <form className="flex gap-2">
            <Input type="email" placeholder="Enter your email" className="max-w-lg flex-1" />
            <Button type="submit">Sign Up Now</Button>
          </form>
          <p className="text-xs text-muted-foreground">
            By signing up, you agree to our{" "}
            <Link href="#" className="underline underline-offset-2">
              Terms &amp; Conditions
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
