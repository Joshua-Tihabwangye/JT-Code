"use client"

// You can keep the KitchenWare function if you like, 
// but the component that is the PAGE must be the default export.

import {Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Header } from "@/components/header"
import Link from "next/link"


const kitchenWare = [
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
  {
    id: 9,
    name: "Wireless Headphones Pro",
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviews: 124,
    image: "/premium-wireless-headphones.png",
    badge: "Best Seller",
  },
  {
    id: 10,
    name: "Smart Watch Series X",
    price: 449,
    rating: 4.9,
    reviews: 89,
    image: "/luxury-smart-watch.jpg",
    badge: "New",
  },
  {
    id: 11,
    name: "Minimalist Backpack",
    price: 129,
    originalPrice: 179,
    rating: 4.7,
    reviews: 203,
    image: "/modern-minimalist-backpack.jpg",
  },
  {
    id: 12,
    name: "Ceramic Coffee Mug Set",
    price: 89,
    rating: 4.6,
    reviews: 156,
    image: "/elegant-ceramic-coffee-mugs.jpg",
  },
    {
    id: 13,
    name: "Wireless Headphones Pro",
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviews: 124,
    image: "/premium-wireless-headphones.png",
    badge: "Best Seller",
  },
  {
    id: 14,
    name: "Smart Watch Series X",
    price: 449,
    rating: 4.9,
    reviews: 89,
    image: "/luxury-smart-watch.jpg",
    badge: "New",
  },
  {
    id: 15,
    name: "Minimalist Backpack",
    price: 129,
    originalPrice: 179,
    rating: 4.7,
    reviews: 203,
    image: "/modern-minimalist-backpack.jpg",
  },
  {
    id: 16,
    name: "Ceramic Coffee Mug Set",
    price: 89,
    rating: 4.6,
    reviews: 156,
    image: "/elegant-ceramic-coffee-mugs.jpg",
  },
]

// Define your component (can be exported or not)
function KitchenWareContent() {
    return (
        <div className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Kitchen Ware</h2>
                <p className="text-muted-foreground">
                    Discover our premium kitchen ware collection to elevate your cooking experience.
                </p>
            </div>

            {/* Grid container */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {kitchenWare.map((item) => (
                    // ... your product Card JSX
                    <Card key={item.id} className="group cursor-pointer overflow-hidden border-border hover:border-primary/50 transition-all duration-300">
                        {/* ... rest of the card */}
                    </Card>
                ))}
            </div>
        </div>
    )
}


// 🔑 THE FIX: Export the component as the DEFAULT function for the page route.
export default function KitchenWarePage() {
    return (
    <>
     <Header />
    <KitchenWareContent />;
    </>
    )
}