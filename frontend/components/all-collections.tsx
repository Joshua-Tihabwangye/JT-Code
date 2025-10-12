"use client"

import { Button } from "./ui/button" // Assuming this is a shadcn/ui or similar Button component



const collections = [
    {
        id: 1,
        name: "Summer Collection",
        description: "Bright and breezy styles for sunny days.",
        
    },
    {
        id: 2,
        name: "Winter Collection",
        description: "Cozy and warm essentials for the cold season.",
        
    },
    {
        id: 3,
        name: "Spring Collection",
        description: "Fresh and floral designs to welcome spring.",
       
    },
    {
        id: 4,
        name: "Autumn Collection",
        description: "Earthy tones and layered looks for fall.",
        
    },
    {
        id: 5, 
        name: "Casual Collection",
        description: "Everyday wear for comfort and style.",
        
    },
    {
        id: 6,
        name: "Formal Collection",
        description: "Sophisticated attire for special occasions.",
        
    },
    {
        id: 7,
        name: "Athleisure Collection",
        description: "Sporty and stylish pieces for an active lifestyle.",
        
    },
    {
        id: 8,
        name: "Vintage Collection",
        description: "Timeless classics with a retro vibe.",
       
    },
]

export function AllCollections() {
    return (
        <div className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
            {/* Grid container: 4 columns on medium/large screens, 2 columns on small screens */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto">
                {collections.map((collection) => (
                    // Button/Card for each collection
                    <Button 
                        key={collection.id} 
                        // Set the button's style/variant and make it full width
                        variant="outline" 
                        className="h-auto p-4 flex flex-col items-start text-left hover:bg-gray-50 transition-colors duration-200"
                        // Add a placeholder onClick handler
                        onClick={() => console.log(`Navigating to ${collection.name}`)}
                    >
                        <h3 className="text-lg font-semibold text-gray-900">
                            {collection.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            {collection.description}
                        </p>
                    </Button>
                ))}
            </div>
        </div>
    )
}