"use client" 

import Link from "next/link" // 1. Import Next.js Link component
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import router from "next/router"
// Removed: import { useRouter } from "next/navigation"

const collections = [
    {
        id: 1,
        name: "Kitchen Ware",
        description: "Cook up a storm with our durable and stylish kitchen essentials.",
        href: "/kitchen-ware", 
    },
    {
        id: 2,
        name: "Winter Collection",
        description: "Cozy up with warm layers and heavy fabrics for the cold season.",
        href: "/collections/winter",
    },
    {
        id: 3,
        name: "Spring Collection",
        description: "Bright and breezy styles for sunny days and fresh starts.",
        href: "/collections/spring",
    },
    {
        id: 4,
        name: "Autumn Collection",
        description: "Earthy tones and layered looks for fall.",
        href: "/collections/autumn",
    },
    {
        id: 5, 
        name: "Casual Collection",
        description: "Everyday wear for comfort and style.",
        href: "/collections/casual",
    },
    {
        id: 6,
        name: "Formal Collection",
        description: "Sophisticated attire for special occasions.",
        href: "/collections/formal",
    },
    {
        id: 7,
        name: "Athleisure Collection",
        description: "Performance and comfort blended for active lifestyles.",
        href: "/collections/athleisure",
    },
    {
        id: 8,
        name: "Vintage Collection",
        description: "Timeless classics with a retro vibe.",
        href: "/collections/vintage",
    },
]


export function Hero() {
    // Removed: const router = useRouter()

    return (
        <><div className="py-16 md:py-6 px-6 sm:px-6 lg:px-8">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {collections.map((collection) => (
            // 3. Wrap the Button in Link and pass the href
            <Link
              key={collection.id}
              href={collection.href}
              className="w-full" // Ensure Link takes up full width for proper layout
            >
              <Button
                // The Button handles the appearance
                variant="outline"
                className="h-auto w-full p-4 flex flex-col items-start text-left hover:bg-gray-50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {collection.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {collection.description}
                </p>
                <ArrowRight className="w-4 h-4 mt-2 self-end text-gray-400 group-hover:text-gray-900" />
              </Button>
            </Link>
          ))}
        </div>
      </div><section className="relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="container mx-auto px-4 py-24 md:py-32">
            <div className="grid lg:grid-cols-2 gap-12 items-center">


              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-4xl  tracking-tight text-balance">
                    The Home of
                    <span className="block text-muted-foreground">genuin products.</span>
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-md text-pretty">
                    Discover premium products crafted for the modern lifestyle. Experience shopping in its simplest form
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" onClick={() => router.push('/all-collections')}>
                    Explore Collection
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-muted/20 to-muted/5 rounded-2xl border border-border overflow-hidden">
                  <img src="/minimalist-product-showcase.png" alt="Featured Product" />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-card border border-border rounded-xl p-4 shadow-lg">
                  <div className="text-sm text-muted-foreground">Starting from</div>
                  <div className="text-2xl font-bold">$299</div>
                </div>
              </div>
            </div>
          </div>
        </section></>
  )
}
