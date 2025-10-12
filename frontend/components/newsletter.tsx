import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-8 text-pretty">
            Get early access to new products, exclusive offers, and design insights delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input placeholder="Enter your email" className="flex-1 bg-muted/50 border-border" />
            <Button>Subscribe</Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">No spam, unsubscribe at any time.</p>
        </div>
      </div>
    </section>
  )
}
