import { Heart, SearchX, ShoppingCart } from 'lucide-react'

const Database = [
    { 
        id: 1,
        img: "IphonBxed.jpg", 
        name: "Iphone", 
        type: "iPhone 13 Pro Max",
        price: 500, // Changed to number without $ sign for easier calculations
        description: "The iPhone 13 Pro Max features a stunning Super Retina XDR display with ProMotion, A15 Bionic chip, and pro camera system with Night mode.",
        rating: 4.5, // Rating out of 5
        reviews: 128, // Number of reviews
        quantity: 0, // Available quantity
        like: Heart,
        search: SearchX,
        shop: ShoppingCart,
        categories: "5G Phones",
        availability: "Out of Stock",
        message: "This product is currently out of stock. Please check back later or contact support for more information."
    },
    {
        id: 2,
        img: "IphoneB.jpg",
        name: "Iphone",
        type: "iPhone 13 Pro Max",
        price: 200,
        description: "Compact version of iPhone 13 Pro Max with all premium features in a smaller form factor.",
        rating: 4.2,
        reviews: 86,
        quantity: 15,
        like: Heart,
        search: SearchX,
        shop: ShoppingCart,
        categories: "Compact Phones",
        availability: "In Stock"
    },
    {
        id: 3,
        img: "IphoneM.jpg",
        name: "Iphone",
        type: "iPhone 13 Pro Max",
        price: 380,
        description: "iPhone 13 Pro Max with enhanced front camera system for perfect selfies and video calls.",
        rating: 4.7,
        reviews: 215,
        quantity: 8,
        like: Heart,
        search: SearchX,
        shop: ShoppingCart,
        categories: "Selfie Phones",
        availability: "In Stock"
    },
    {
        id: 4,
        img: "IphoneSiv.jpg",
        name: "Iphone",
        type: "iPhone 13 Pro Max",
        price: 420,
        description: "Special edition iPhone 13 Pro Max with advanced camera features for photography enthusiasts.",
        rating: 4.8,
        reviews: 176,
        quantity: 12,
        like: Heart,
        search: SearchX,
        shop: ShoppingCart,
        categories: "Selfie Phones",
        availability: "In Stock"
    },
    {
        id: 5,
        img: "OppoCel.jpg",
        name: "Oppo",
        type: "Find X5 Pro",
        // Changed from "iPhone 13 Pro Max" since this is Oppo
        price: 480,
        description: "Oppo Find X5 Pro with Hasselblad camera for mobile, Snapdragon 8 Gen 1, and 80W SuperVOOC charging.",
        rating: 4.4,
        reviews: 92,
        quantity: 20,
        like: Heart,
        search: SearchX,
        shop: ShoppingCart,
        categories: "Feature Phones",
        availability: "In Stock"
    },
    {
        id: 6,
        img: "SamsumgPd.jpg",
        name: "Samsung", // Changed from "Iphone" since image suggests Samsung
        type: "Galaxy S22 Ultra", // Changed from iPhone
        price: 400,
        description: "Samsung Galaxy S22 Ultra with built-in S Pen, 108MP camera, and powerful Snapdragon processor.",
        rating: 4.6,
        reviews: 204,
        quantity: 0,
        like: Heart,
        search: SearchX,
        shop: ShoppingCart,
        categories: "Selfie Phones",
        availability: "Out of Stock"
    },
    { 
        id: 7,
        img: "IphonBxed.jpg",
        name: "Iphone",
        type: "iPhone 13 Pro Max",
        price: 340,
        description: "Refurbished iPhone 13 Pro Max with warranty and like-new condition at a discounted price.",
        rating: 4.0,
        reviews: 53,
        quantity: 5,
        like: Heart,
        search: SearchX,
        shop: ShoppingCart,
        categories: "Selfie Phones",
        availability: "In Stock"
    },
    {
        id: 8,
        img: "IphonBxed.jpg",
        name: "Nokia",
        type: "X30 5G", // Changed from iPhone
        price: 460,
        description: "Nokia X30 5G with pure Android experience, 3-day battery life, and sustainable design.",
        rating: 3.9,
        reviews: 47,
        quantity: 18,
        like: Heart,
        search: SearchX,
        shop: ShoppingCart,
        categories: "Feature Phones",
        availability: "In Stock"
    },
    {
        id: 9,
        img: "IphonBxed.jpg",
        name: "Samsung",
        type: "Galaxy Z Flip4", // Changed from iPhone
        price: 180,
        description: "Samsung Galaxy Z Flip4 with compact foldable design, flexible camera system, and powerful performance.",
        rating: 4.3,
        reviews: 118,
        quantity: 7,
        like: Heart,
        search: SearchX,
        shop: ShoppingCart,
        categories: "Feature Phones",
        availability: "In Stock"
    }
]

export default Database