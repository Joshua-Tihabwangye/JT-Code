import { Card } from "@/components/ui/card"

const categories = [
  {
    name: "Televisions",
    count: "20 products",
    image: "/modern-electronics.png",
  },
  {
    name: "Kitchen Ware",
    count: "200 products",
    image: "/minimalist-fashion-clothing.jpg",
  },
  {
    name: "Phones",
    count: "100 products",
    image: "/modern-home-decor-furniture.jpg",
  },
  {
    name: "Sound systems",
    count: "30 products",
    image: "/premium-sports-equipment.jpg",
  },
]

export function Categories() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">

        <div className="text-center mb-12 flex justify-between items-center">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our wide range of our product collections
            </p>
          </div>
          <button variant="outline">View All</button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card
              key={category.name}
              className="group cursor-pointer overflow-hidden border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
