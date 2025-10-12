import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Star } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Wireless Headphones Pro",
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviews: 124,
    image: "/premium-wireless-headphones.png",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Smart Watch Series X",
    price: 449,
    rating: 4.9,
    reviews: 89,
    image: "/luxury-smart-watch.jpg",
    badge: "New",
  },
  {
    id: 3,
    name: "Minimalist Backpack",
    price: 129,
    originalPrice: 179,
    rating: 4.7,
    reviews: 203,
    image: "/modern-minimalist-backpack.jpg",
  },
  {
    id: 4,
    name: "Ceramic Coffee Mug Set",
    price: 89,
    rating: 4.6,
    reviews: 156,
    image: "/elegant-ceramic-coffee-mugs.jpg",
  },
    {
    id: 5,
    name: "Wireless Headphones Pro",
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviews: 124,
    image: "/premium-wireless-headphones.png",
    badge: "Best Seller",
  },
  {
    id: 6,
    name: "Smart Watch Series X",
    price: 449,
    rating: 4.9,
    reviews: 89,
    image: "/luxury-smart-watch.jpg",
    badge: "New",
  },
  {
    id: 7,
    name: "Minimalist Backpack",
    price: 129,
    originalPrice: 179,
    rating: 4.7,
    reviews: 203,
    image: "/modern-minimalist-backpack.jpg",
  },
  {
    id: 8,
    name: "Ceramic Coffee Mug Set",
    price: 89,
    rating: 4.6,
    reviews: 156,
    image: "/elegant-ceramic-coffee-mugs.jpg",
  },
]

export function FeaturedProducts() {
  return (
    <section className="py-16 md:py-24 bg-muted/20">
      <div className="container mx-auto px-4">

        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trending Products</h2>
          </div>
          <Button variant="outline">View All</Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group cursor-pointer overflow-hidden border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="relative aspect-square overflow-hidden">
                {product.badge && (
                  <div className="absolute top-3 left-3 z-10 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                    {product.badge}
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 z-10 bg-background/80 backdrop-blur-sm hover:bg-background"
                >
                  <Heart size={16} />
                </Button>
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-muted-foreground">({product.reviews})</span>
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors items-center">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl font-bold">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through items-center">${product.originalPrice}</span>
                  )}
                </div>
                <Button className="w-full">Add to Cart</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
