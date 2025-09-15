
// import type React from "react"
// import { useState } from "react"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Star } from "lucide-react"
// import { toast } from "sonner"

// interface Product {
//   id: number
//   name: string
//   rating: number
//   oldPrice?: string
//   newPrice: string
//   image: string
//   badges: string[]
//   description: string
//   category: string
// }

// interface ProductQuickViewProps {
//   product: Product
//   children: React.ReactNode // To allow the trigger button to be passed as a child
// }

// export function ProductQuickView({ product, children }: ProductQuickViewProps) {
//   const [quantity, setQuantity] = useState(1)

//   const handleQuantityChange = (amount: number) => {
//     setQuantity((prev) => Math.max(1, prev + amount))
//   }

//   const handleAddToCart = () => {
//     toast.success(`${quantity} x ${product.name} added to cart!`)
//   }

//   const handleBuyNow = () => {
//     toast.info(`Proceeding to checkout with ${quantity} x ${product.name}.`)
//   }

//   return (
//     <Dialog>
//       <DialogTrigger asChild>{children}</DialogTrigger>
//       <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden rounded-lg">
//         <div className="grid md:grid-cols-2 gap-0">
//           {/* Product Details Section */}
//           <div className="p-6 md:p-8 flex flex-col justify-between">
//             <DialogHeader className="mb-4">
//               <DialogTitle className="text-lg font-semibold flex items-center justify-between">
//                 More about the product
//                 <span className="text-sm text-muted-foreground flex items-center gap-1">
//                   {product.category} <span className="text-xl font-bold">&gt;</span>
//                 </span>
//               </DialogTitle>
//             </DialogHeader>
//             <div className="flex-grow space-y-4">
//               <h2 className="text-3xl font-bold">{product.name}</h2>
//               <div className="flex items-center gap-1 text-yellow-500">
//                 {Array.from({ length: 5 }).map((_, i) => (
//                   <Star key={i} className={`h-5 w-5 ${i < product.rating ? "fill-current" : "text-gray-300"}`} />
//                 ))}
//                 <span className="text-sm text-muted-foreground ml-2">({product.rating}/5)</span>
//               </div>
//               <div className="text-muted-foreground text-sm leading-relaxed">{product.description}</div>
//               <div className="flex items-center gap-4 mt-4">
//                 <span className="font-semibold">Quantity:</span>
//                 <div className="flex items-center border rounded-md">
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     onClick={() => handleQuantityChange(-1)}
//                     className="h-8 w-8 rounded-r-none"
//                   >
//                     -
//                   </Button>
//                   <span className="px-4 py-1 text-lg font-medium">{quantity}</span>
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     onClick={() => handleQuantityChange(1)}
//                     className="h-8 w-8 rounded-l-none"
//                   >
//                     +
//                   </Button>
//                 </div>
//                 <span className="text-2xl font-bold text-blue-600 ml-auto">{product.newPrice}</span>
//               </div>
//             </div>
//             <div className="flex gap-3 mt-6">
//               <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" onClick={handleAddToCart}>
//                 Add to Cart
//               </Button>
//               <Button className="flex-1 bg-gray-800 hover:bg-gray-900 text-white" onClick={handleBuyNow}>
//                 Buy Now
//               </Button>
//             </div>
//           </div>

//           {/* Product Image Section */}
//           <div className="hidden md:flex items-center justify-center bg-gray-100 dark:bg-gray-800 p-4">
//             <Image
//               src={product.image || "/placeholder.svg"}
//               width={400}
//               height={400}
//               alt={product.name}
//               className="object-contain max-h-[400px] w-full"
//             />
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }



import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Star } from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: number;
  name: string;
  rating: number;
  oldPrice?: string;
  newPrice: string;
  image: string;
  badges: string[];
  description: string;
  category: string;
}

interface ProductQuickViewProps {
  product: Product;
  children: React.ReactNode; // To allow the trigger button to be passed as a child
}

export function ProductQuickView({ product, children }: ProductQuickViewProps) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const handleAddToCart = () => {
    toast.success(`${quantity} x ${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    toast.info(`Proceeding to checkout with ${quantity} x ${product.name}.`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden rounded-lg">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Product Details Section */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-lg font-semibold flex items-center justify-between">
                More about the product
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  {product.category} <span className="text-xl font-bold">&gt;</span>
                </span>
              </DialogTitle>
            </DialogHeader>
            <div className="flex-grow space-y-4">
              <h2 className="text-3xl font-bold">{product.name}</h2>
              <div className="flex items-center gap-1 text-yellow-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < product.rating ? "fill-current" : "text-gray-300"}`} />
                ))}
                <span className="text-sm text-muted-foreground ml-2">({product.rating}/5)</span>
              </div>
              <div className="text-muted-foreground text-sm leading-relaxed">{product.description}</div>
              <div className="flex items-center gap-4 mt-4">
                <span className="font-semibold">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(-1)}
                    className="h-8 w-8 rounded-r-none"
                  >
                    -
                  </Button>
                  <span className="px-4 py-1 text-lg font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(1)}
                    className="h-8 w-8 rounded-l-none"
                  >
                    +
                  </Button>
                </div>
                <span className="text-2xl font-bold text-blue-600 ml-auto">{product.newPrice}</span>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Button className="flex-1 bg-gray-800 hover:bg-gray-900 text-white" onClick={handleBuyNow}>
                Buy Now
              </Button>
            </div>
          </div>

          {/* Product Image Section */}
          <div className="hidden md:flex items-center justify-center bg-gray-100 dark:bg-gray-800 p-4">
            <img
              src={product.image || "/placeholder.svg"}
              width={400}
              height={400}
              alt={product.name}
              className="object-contain max-h-[400px] w-full"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
