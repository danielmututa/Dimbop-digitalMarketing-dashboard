// import React, { useState } from 'react';
// import Database from '../Database';
// import {  useNavigate } from 'react-router-dom';
// import { ChevronRight, X, Plus, Minus, Star, Check, ShoppingCart } from 'lucide-react';
// import { useCart } from './CartContext';

// interface Product {
//   id: number;
//   catagories: string;
//   name: string;
//   type: string;
//   price: string | number;
//   availability: "On Stock" | "Out Stock";
//   img: string;
//   like: React.ComponentType<any>;
//   search: React.ComponentType<any>;
//   shop?: React.ComponentType<any>;
//   rating?: number;
// }

// interface PriceRange {
//   min: number;
//   max: number;
// }

// interface Toast {
//   id: number;
//   message: string;
//   type: "success" | "error";
//   timestamp: string;
// }

// const Shop: React.FC = () => {
//   // States for all filters
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
//   const [priceRange, setPriceRange] = useState<PriceRange>({ min: 0, max: 1000 });
//   const [stockFilter, setStockFilter] = useState<'all' | 'inStock' | 'outStock'>('all');
  
//   // Dialog and cart states
//   const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [quantity, setQuantity] = useState<number>(1);
//   const [toasts, setToasts] = useState<Toast[]>([]);
//   const [toastIdCounter, setToastIdCounter] = useState<number>(0);
//   const [wishlist, setWishlist] = useState<Product[]>([]);
  
//   const { addToCart } = useCart();
//   const navigate = useNavigate();

//   // Filter products based on all criteria
//   const filteredProducts = Database.filter((item: Product) => {
//     const matchesCategory = !selectedCategory || item.catagories === selectedCategory;
//     const matchesBrand = !selectedBrand || item.name === selectedBrand;
    
//     // Handle price filtering
//     const price = typeof item.price === 'string' 
//       ? parseInt(item.price.replace(/[^0-9]/g, '')) 
//       : item.price;
//     const matchesPrice = price >= priceRange.min && price <= priceRange.max;
    
//     const matchesStock = 
//       stockFilter === 'all' ? true :
//       stockFilter === 'inStock' ? item.availability === "On Stock" :
//       item.availability === "Out Stock";

//     return matchesCategory && matchesBrand && matchesPrice && matchesStock;
//   });

//   // Dialog functions
//   const openDialog = (product: Product) => {
//     setSelectedProduct(product);
//     setIsDialogOpen(true);
//     setQuantity(1);
//   };

//   const closeDialog = () => {
//     setIsDialogOpen(false);
//     setSelectedProduct(null);
//   };

//   const incrementQuantity = () => {
//     setQuantity((prev) => prev + 1);
//   };

//   const decrementQuantity = () => {
//     setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
//   };

//   // Toast functions
//   const formatTimestamp = (): string => {
//     const now = new Date();
//     const day = now.getDate().toString().padStart(2, "0");
//     const month = (now.getMonth() + 1).toString().padStart(2, "0");
//     const year = now.getFullYear();
//     const hours = now.getHours().toString().padStart(2, "0");
//     const minutes = now.getMinutes().toString().padStart(2, "0");
//     const seconds = now.getSeconds().toString().padStart(2, "0");
//     return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
//   };

//   const showToast = (message: string, type: "success" | "error" = "success"): void => {
//     const id = toastIdCounter;
//     setToastIdCounter((prev) => prev + 1);
//     const timestamp = formatTimestamp();
//     const newToast = { id, message, type, timestamp };
//     setToasts((prev) => [...prev, newToast]);
//     setTimeout(() => {
//       setToasts((prev) => prev.filter((toast) => toast.id !== id));
//     }, 5000);
//   };

//   const removeToast = (id: number): void => {
//     setToasts((prev) => prev.filter((toast) => toast.id !== id));
//   };

//   // Cart functions
//   const handleAddToWishlist = (product: Product, e: React.MouseEvent): void => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (wishlist.find((item) => item.id === product.id)) {
//       showToast(`${product.type} is already in your wishlist`, "success");
//     } else {
//       setWishlist((prev) => [...prev, product]);
//       showToast(`${product.type} successfully added to your wishlist`, "success");
//     }
//   };

//   const handleAddToCart = (product: Product, e: React.MouseEvent): void => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (product.availability === "Out Stock") {
//       showToast("This product is currently out of stock.", "error");
//     } else {
//       addToCart(product, 1);
//       showToast(`${product.type} successfully added to cart`, "success");
//     }
//   };

//   const handleAddToCartFromDialog = (): void => {
//     if (!selectedProduct) return;
    
//     if (selectedProduct.availability === "Out Stock") {
//       showToast("This product is currently out of stock.", "error");
//     } else {
//       addToCart(selectedProduct, quantity);
//       showToast(`${selectedProduct.type} successfully added to cart`, "success");
//       closeDialog();
//     }
//   };

//   const goToCart = (): void => {
//     navigate("/cart");
//   };

//   // Star rating renderer
//   const renderStars = (rating: number): JSX.Element[] => {
//     const stars: JSX.Element[] = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 !== 0;

//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />);
//     }

//     if (hasHalfStar) {
//       stars.push(
//         <div key="half" className="relative">
//           <Star size={16} className="text-gray-300" />
//           <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
//             <Star size={16} className="fill-yellow-400 text-yellow-400" />
//           </div>
//         </div>,
//       );
//     }

//     const remainingStars = 5 - Math.ceil(rating);
//     for (let i = 0; i < remainingStars; i++) {
//       stars.push(<Star key={`empty-${i}`} size={16} className="text-gray-300" />);
//     }

//     return stars;
//   };

//   return (
//     <div className='flex flex-col lg:flex-row justify-between pt-[100px] px-4 lg:px-[100px] gap-8'>
//       {/* Sidebar with all filters */}
//       <div className="lg:w-1/4 space-y-8 bg-white p-6 lg:pl-0 lg:pb-0 lg:pt-0 pr-6 rounded-lg shadow-sm">
//         {/* Categories Filter */}
//         <div>
//           <h3 className='text-lg font-bold mb-4 text-gray-800 border-b pb-2'>Categories</h3>
//           <ul className="space-y-2">
//             <li
//               className={`cursor-pointer transition-colors duration-200 ${
//                 selectedCategory === null 
//                   ? "text-navbar font-semibold" 
//                   : "text-gray-600 hover:text-navbar"
//               }`}
//               onClick={() => setSelectedCategory(null)}
//             >
//               All Categories
//             </li>
//             {[...new Set(Database.map(item => item.catagories))].map((category, index) => (
//               <li
//                 key={index}
//                 className={`cursor-pointer transition-colors duration-200 flex items-center gap-2 ${
//                   selectedCategory === category 
//                     ? "text-navbar font-semibold" 
//                     : "text-gray-600 hover:text-navbar"
//                 }`}
//                 onClick={() => setSelectedCategory(category)}
//               >
//                 <span className={`w-4 h-4 border rounded-full flex items-center justify-center ${
//                   selectedCategory === category 
//                     ? "border-navbar" 
//                     : "border-gray-300"
//                 }`}>
//                   {selectedCategory === category && (
//                     <span className="w-2 h-2 bg-navbar rounded-full"/>
//                   )}
//                 </span>
//                 <span>{category}</span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Price Range Filter */}
//         <div>
//           <h3 className='text-lg font-bold mb-4 text-gray-800 border-b pb-2'>Price Range</h3>
//           <div className="space-y-4">
//             <div className="flex flex-col space-y-2">
//               <label className="text-sm text-gray-600">Minimum Price: ${priceRange.min}</label>
//               <input
//                 type="range"
//                 min="0"
//                 max="1000"
//                 value={priceRange.min}
//                 onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) }))}
//                 className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-navbar"
//               />
//             </div>
//             <div className="flex flex-col space-y-2">
//               <label className="text-sm text-gray-600">Maximum Price: ${priceRange.max}</label>
//               <input
//                 type="range"
//                 min="0"
//                 max="1000"
//                 value={priceRange.max}
//                 onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
//                 className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-navbar"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Brand Filter */}
//         <div>
//           <h3 className='text-lg font-bold mb-4 text-gray-800 border-b pb-2'>Brands</h3>
//           <ul className="space-y-2">
//             <li
//               className={`cursor-pointer transition-colors duration-200 ${
//                 selectedBrand === null 
//                   ? "text-navbar font-semibold" 
//                   : "text-gray-600 hover:text-navbar"
//               }`}
//               onClick={() => setSelectedBrand(null)}
//             >
//               All Brands
//             </li>
//             {[...new Set(Database.map(item => item.name))].map((brand, index) => (
//               <li
//                 key={index}
//                 className={`cursor-pointer transition-colors duration-200 flex items-center gap-2 ${
//                   selectedBrand === brand 
//                     ? "text-navbar font-semibold" 
//                     : "text-gray-600 hover:text-navbar"
//                 }`}
//                 onClick={() => setSelectedBrand(brand)}
//               >
//                 <span className={`w-4 h-4 border rounded-full flex items-center justify-center ${
//                   selectedBrand === brand 
//                     ? "border-navbar" 
//                     : "border-gray-300"
//                 }`}>
//                   {selectedBrand === brand && (
//                     <span className="w-2 h-2 bg-navbar rounded-full"/>
//                   )}
//                 </span>
//                 {brand}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Stock Filter */}
//         <div>
//           <h3 className='text-lg font-bold mb-4 text-gray-800 border-b pb-2'>Availability</h3>
//           <ul className="space-y-2">
//             <li
//               className={`cursor-pointer transition-colors duration-200 ${
//                 stockFilter === 'all' 
//                   ? "text-navbar font-semibold" 
//                   : "text-gray-600 hover:text-navbar"
//               }`}
//               onClick={() => setStockFilter('all')}
//             >
//               All Items
//             </li>
//             <li
//               className={`cursor-pointer transition-colors duration-200 flex items-center gap-2 ${
//                 stockFilter === 'inStock' 
//                   ? "text-navbar font-semibold" 
//                   : "text-gray-600 hover:text-navbar"
//               }`}
//               onClick={() => setStockFilter('inStock')}
//             >
//               <span className={`w-4 h-4 border rounded-full flex items-center justify-center ${
//                 stockFilter === 'inStock'
//                   ? "border-navbar" 
//                   : "border-gray-300"
//               }`}>
//                 {stockFilter === 'inStock' && (
//                   <span className="w-2 h-2 bg-navbar rounded-full"/>
//                 )}
//               </span>
//               On Stock
//             </li>
//             <li
//               className={`cursor-pointer transition-colors duration-200 flex items-center gap-2 ${
//                 stockFilter === 'outStock' 
//                   ? "text-navbar font-semibold" 
//                   : "text-gray-600 hover:text-navbar"
//               }`}
//               onClick={() => setStockFilter('outStock')}
//             >
//               <span className={`w-4 h-4 border rounded-full flex items-center justify-center ${
//                 stockFilter === 'outStock'
//                   ? "border-navbar" 
//                   : "border-gray-300"
//               }`}>
//                 {stockFilter === 'outStock' && (
//                   <span className="w-2 h-2 bg-navbar rounded-full"/>
//                 )}
//               </span>
//               Out of Stock
//             </li>
//           </ul>
//         </div>
//       </div>

//       {/* Product Section */}
//       <div className="lg:w-3/4">
//         <div className="flex justify-between items-center mb-6">
//           <h3 className="text-xl lg:text-2xl font-bold text-gray-800">
//             Products ({filteredProducts.length})
//           </h3>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredProducts.map((card, index) => (
//             <div key={index} className="group relative bg-white overflow-hidden">
//               <div className="relative aspect-square overflow-hidden">
//                 <img 
//                   loading='lazy' 
//                   src={require("../Images/" + card.img)} 
//                   alt="" 
//                   className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
//                 />
//                 {/* Icons Container */}
//                 <div className="absolute top-0 right-4 h-full flex items-center gap-4 flex-col justify-center opacity-0 translate-y-5 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
//                   <button 
//                     onClick={(e) => handleAddToWishlist(card, e)}
//                     className="p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform hover:text-buttons"
//                   >
//                     <card.like size={18} />
//                   </button>
//                   <button 
//                     onClick={() => openDialog(card)}
//                     className="p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform hover:text-buttons"
//                   >
//                     <card.search size={18} />
//                   </button>
//                   <button
//                     onClick={(e) => handleAddToCart(card, e)}
//                     className={`p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform hover:text-buttons ${
//                       card.availability === "Out Stock" ? "opacity-50 cursor-not-allowed" : ""
//                     }`}
//                     disabled={card.availability === "Out Stock"}
//                   >
//                     {card.shop ? <card.shop size={18} /> : <ShoppingCart size={18} />}
//                   </button>
//                 </div>
//               </div>
//               <div className="p-4">
//                 <p className='text-sm text-gray-500'>{card.name}</p>
//                 <p className='text-lg font-semibold mt-1 group-hover:text-buttons transition-colors duration-300'>{card.type}</p>
//                 <p className='text-lg font-bold text-gray-900 mt-2'>
//                   {typeof card.price === 'string' ? card.price : `$${card.price}`}
//                 </p>
//                 <p className={`text-sm mt-2 ${
//                   card.availability === "On Stock" 
//                     ? "text-navbar" 
//                     : "text-red-500"
//                 }`}>
//                   {card.availability}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Dialog */}
//       {isDialogOpen && selectedProduct && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//           onClick={closeDialog}
//         >
//           <div 
//             className="bg-white rounded-lg w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl max-h-[90vh] overflow-y-auto mx-4"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex flex-col lg:flex-row">
//               {/* Left Side - Product Details */}
//               <div className="flex-1 p-6 lg:p-8">
//                 {/* Header */}
//                 <div className="flex items-center justify-between mb-6">
//                   <div className="flex items-center gap-2">
//                     <h3 className="text-lg lg:text-xl font-bold text-gray-800">More about the product</h3>
//                     <ChevronRight size={20} className="text-gray-600" />
//                   </div>
//                   <button onClick={closeDialog} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
//                     <X size={20} className="text-gray-600" />
//                   </button>
//                 </div>

//                 {/* Product Info */}
//                 <div className="space-y-4">
//                   <p className="text-sm lg:text-base text-gray-500">{selectedProduct.name}</p>
//                   <h4 className="text-xl lg:text-2xl font-bold text-gray-800">{selectedProduct.type}</h4>

//                   {/* Rating */}
//                   <div className="flex items-center gap-2">
//                     <div className="flex items-center gap-1">{renderStars(4.5)}</div>
//                     <span className="text-sm text-gray-600">(4.5/5)</span>
//                   </div>

//                   {/* Description */}
//                   <div className="space-y-2">
//                     <h5 className="font-bold text-gray-800">Description</h5>
//                     <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
//                       Experience cutting-edge technology with this premium smartphone. Featuring advanced camera
//                       capabilities, lightning-fast performance, and sleek design that fits perfectly in your hand.
//                     </p>
//                   </div>

//                   {/* Quantity and Price */}
//                   <div className="flex items-center justify-between pt-4">
//                     <div className="flex items-center gap-3">
//                       <span className="font-bold text-gray-800">Quantity:</span>
//                       <div className="flex items-center border border-gray-300 rounded-lg">
//                         <button onClick={decrementQuantity} className="p-2 hover:bg-gray-100 transition-colors">
//                           <Minus size={16} />
//                         </button>
//                         <span className="px-4 py-2 border-x border-gray-300 min-w-[50px] text-center">{quantity}</span>
//                         <button onClick={incrementQuantity} className="p-2 hover:bg-gray-100 transition-colors">
//                           <Plus size={16} />
//                         </button>
//                       </div>
//                     </div>

//                     <div className="text-right">
//                       <span className="text-xl lg:text-2xl font-bold text-buttons">
//                         {typeof selectedProduct.price === 'string' 
//                           ? selectedProduct.price 
//                           : `$${selectedProduct.price}`}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Action Buttons */}
//                   <div className="flex flex-col sm:flex-row gap-3 pt-6">
//                     <button
//                       onClick={handleAddToCartFromDialog}
//                       className={`flex-1 bg-buttons text-white py-3 px-6 rounded-lg font-bold hover:bg-opacity-90 transition-colors ${
//                         selectedProduct.availability === "Out Stock" ? "opacity-50 cursor-not-allowed" : ""
//                       }`}
//                       disabled={selectedProduct.availability === "Out Stock"}
//                     >
//                       Add to Cart
//                     </button>
//                     <button className="flex-1 bg-gray-800 text-white py-3 px-6 rounded-lg font-bold hover:bg-gray-700 transition-colors">
//                       Buy Now
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Right Side - Product Image */}
//               <div className="lg:w-1/2 p-6 lg:p-8">
//                 <div className="w-full h-[300px] lg:h-[500px] rounded-lg overflow-hidden">
//                   <img
//                     src={require("../Images/" + selectedProduct.img)}
//                     alt={selectedProduct.type}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Toast notifications with "Go to Cart" button */}
//       <div className="fixed top-4 right-4 z-[1000] space-y-4 pointer-events-none">
//         {toasts.map((toast) => (
//           <div
//             key={toast.id}
//             className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-[300px] max-w-[400px] pointer-events-auto transform transition-all duration-300 ease-out opacity-100 translate-x-0 toast"
//           >
//             <div className="flex items-start gap-3">
//               <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
//                 toast.type === "success" ? "bg-green-100" : "bg-red-100"
//               }`}>
//                 <Check size={16} className={toast.type === "success" ? "text-green-600" : "text-red-600"} />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-bold text-gray-900 mb-1">{toast.message}</p>
//                 <p className="text-xs text-gray-500">{toast.timestamp}</p>
//                 {toast.message.includes("added to cart") && (
//                   <button
//                     onClick={goToCart}
//                     className="text-xs text-blue-600 hover:text-blue-800 font-bold mt-1"
//                   >
//                     Go to Cart →
//                   </button>
//                 )}
//               </div>
//               <button
//                 onClick={() => removeToast(toast.id)}
//                 className="flex-shrink-0 p-1 hover:bg-gray-100 rounded transition-colors"
//               >
//                 <X size={14} className="text-gray-400" />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <style>
//         {`
//           @keyframes slideInFromRight {
//             from {
//               opacity: 0;
//               transform: translateX(100%);
//             }
//             to {
//               opacity: 1;
//               transform: translateX(0);
//             }
//           }
//           .toast {
//             animation: slideInFromRight 0.3s ease-out;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default Shop;







import React, { useState } from 'react';
import Database from '../Database';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, X, Plus, Minus, Star, Check, ShoppingCart } from 'lucide-react';
import { useCart } from './CartContext';

interface Product {
  id: number;
  catagories: string;
  name: string;
  type: string;
  price: string | number;
  availability: "On Stock" | "Out Stock";
  img: string;
  like: React.ComponentType<any>;
  search: React.ComponentType<any>;
  shop?: React.ComponentType<any>;
  rating?: number;
}

interface PriceRange {
  min: number;
  max: number;
}

interface Toast {
  id: number;
  message: string;
  type: "success" | "error";
  timestamp: string;
}

const Shop: React.FC = () => {
  // States for all filters
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<PriceRange>({ min: 0, max: 1000 });
  const [stockFilter, setStockFilter] = useState<'all' | 'inStock' | 'outStock'>('all');

  // Dialog and cart states
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [toastIdCounter, setToastIdCounter] = useState<number>(0);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Filter products based on all criteria
  const filteredProducts = Database.filter((item: Product) => {
    const matchesCategory = !selectedCategory || item.catagories === selectedCategory;
    const matchesBrand = !selectedBrand || item.name === selectedBrand;

    // Handle price filtering
    const price = typeof item.price === 'string'
      ? parseInt(item.price.replace(/[^0-9]/g, ''))
      : item.price;
    const matchesPrice = price >= priceRange.min && price <= priceRange.max;

    const matchesStock =
      stockFilter === 'all' ? true :
        stockFilter === 'inStock' ? item.availability === "On Stock" :
          item.availability === "Out Stock";

    return matchesCategory && matchesBrand && matchesPrice && matchesStock;
  });

  // Dialog functions
  const openDialog = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
    setQuantity(1);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedProduct(null);
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  // Toast functions
  const formatTimestamp = (): string => {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const showToast = (message: string, type: "success" | "error" = "success"): void => {
    const id = toastIdCounter;
    setToastIdCounter((prev) => prev + 1);
    const timestamp = formatTimestamp();
    const newToast = { id, message, type, timestamp };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
  };

  const removeToast = (id: number): void => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  // Cart functions
  const handleAddToWishlist = (product: Product, e: React.MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    if (wishlist.find((item) => item.id === product.id)) {
      showToast(`${product.type} is already in your wishlist`, "success");
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`${product.type} successfully added to your wishlist`, "success");
    }
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    if (product.availability === "Out Stock") {
      showToast("This product is currently out of stock.", "error");
    } else {
      addToCart(product, 1);
      showToast(`${product.type} successfully added to cart`, "success");
    }
  };

  const handleAddToCartFromDialog = (): void => {
    if (!selectedProduct) return;

    if (selectedProduct.availability === "Out Stock") {
      showToast("This product is currently out of stock.", "error");
    } else {
      addToCart(selectedProduct, quantity);
      showToast(`${selectedProduct.type} successfully added to cart`, "success");
      closeDialog();
    }
  };

  const goToCart = (): void => {
    navigate("/cart");
  };

  // Star rating renderer
  const renderStars = (rating: number): JSX.Element[] => {
    const stars: JSX.Element[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star size={16} className="text-gray-300" />
          <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
          </div>
        </div>,
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={16} className="text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className='flex flex-col lg:flex-row justify-between pt-[100px] px-4 lg:px-[100px] gap-8'>
      {/* Sidebar with all filters */}
      <div className="lg:w-1/4 space-y-8 bg-white p-6 lg:pl-0 lg:pb-0 lg:pt-0 pr-6 rounded-lg shadow-sm">
        {/* Categories Filter */}
        <div>
          <h3 className='text-lg font-bold mb-4 text-gray-800 border-b pb-2'>Categories</h3>
          <ul className="space-y-2">
            <li
              className={`cursor-pointer transition-colors duration-200 ${
                selectedCategory === null
                  ? "text-navbar font-semibold"
                  : "text-gray-600 hover:text-navbar"
              }`}
              onClick={() => setSelectedCategory(null)}
            >
              All Categories
            </li>
            {[...new Set(Database.map(item => item.catagories))].map((category, index) => (
              <li
                key={index}
                className={`cursor-pointer transition-colors duration-200 flex items-center gap-2 ${
                  selectedCategory === category
                    ? "text-navbar font-semibold"
                    : "text-gray-600 hover:text-navbar"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                <span className={`w-4 h-4 border rounded-full flex items-center justify-center ${
                  selectedCategory === category
                    ? "border-navbar"
                    : "border-gray-300"
                }`}>
                  {selectedCategory === category && (
                    <span className="w-2 h-2 bg-navbar rounded-full" />
                  )}
                </span>
                <span>{category}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Price Range Filter */}
        <div>
          <h3 className='text-lg font-bold mb-4 text-gray-800 border-b pb-2'>Price Range</h3>
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-gray-600">Minimum Price: ${priceRange.min}</label>
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) }))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-navbar"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-gray-600">Maximum Price: ${priceRange.max}</label>
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-navbar"
              />
            </div>
          </div>
        </div>

        {/* Brand Filter */}
        <div>
          <h3 className='text-lg font-bold mb-4 text-gray-800 border-b pb-2'>Brands</h3>
          <ul className="space-y-2">
            <li
              className={`cursor-pointer transition-colors duration-200 ${
                selectedBrand === null
                  ? "text-navbar font-semibold"
                  : "text-gray-600 hover:text-navbar"
              }`}
              onClick={() => setSelectedBrand(null)}
            >
              All Brands
            </li>
            {[...new Set(Database.map(item => item.name))].map((brand, index) => (
              <li
                key={index}
                className={`cursor-pointer transition-colors duration-200 flex items-center gap-2 ${
                  selectedBrand === brand
                    ? "text-navbar font-semibold"
                    : "text-gray-600 hover:text-navbar"
                }`}
                onClick={() => setSelectedBrand(brand)}
              >
                <span className={`w-4 h-4 border rounded-full flex items-center justify-center ${
                  selectedBrand === brand
                    ? "border-navbar"
                    : "border-gray-300"
                }`}>
                  {selectedBrand === brand && (
                    <span className="w-2 h-2 bg-navbar rounded-full" />
                  )}
                </span>
                {brand}
              </li>
            ))}
          </ul>
        </div>

        {/* Stock Filter */}
        <div>
          <h3 className='text-lg font-bold mb-4 text-gray-800 border-b pb-2'>Availability</h3>
          <ul className="space-y-2">
            <li
              className={`cursor-pointer transition-colors duration-200 ${
                stockFilter === 'all'
                  ? "text-navbar font-semibold"
                  : "text-gray-600 hover:text-navbar"
              }`}
              onClick={() => setStockFilter('all')}
            >
              All Items
            </li>
            <li
              className={`cursor-pointer transition-colors duration-200 flex items-center gap-2 ${
                stockFilter === 'inStock'
                  ? "text-navbar font-semibold"
                  : "text-gray-600 hover:text-navbar"
              }`}
              onClick={() => setStockFilter('inStock')}
            >
              <span className={`w-4 h-4 border rounded-full flex items-center justify-center ${
                stockFilter === 'inStock'
                  ? "border-navbar"
                  : "border-gray-300"
              }`}>
                {stockFilter === 'inStock' && (
                  <span className="w-2 h-2 bg-navbar rounded-full" />
                )}
              </span>
              On Stock
            </li>
            <li
              className={`cursor-pointer transition-colors duration-200 flex items-center gap-2 ${
                stockFilter === 'outStock'
                  ? "text-navbar font-semibold"
                  : "text-gray-600 hover:text-navbar"
              }`}
              onClick={() => setStockFilter('outStock')}
            >
              <span className={`w-4 h-4 border rounded-full flex items-center justify-center ${
                stockFilter === 'outStock'
                  ? "border-navbar"
                  : "border-gray-300"
              }`}>
                {stockFilter === 'outStock' && (
                  <span className="w-2 h-2 bg-navbar rounded-full" />
                )}
              </span>
              Out of Stock
            </li>
          </ul>
        </div>
      </div>

      {/* Product Section */}
      <div className="lg:w-3/4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl lg:text-2xl font-bold text-gray-800">
            Products ({filteredProducts.length})
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((card, index) => (
            <div key={index} className="group relative bg-white overflow-hidden">
              <div className="relative aspect-square overflow-hidden">
                {/* Updated image source */}
                <img
                  loading='lazy'
                  src={`/Images/${card.img}`}
                  alt={card.type}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
                {/* Icons Container */}
                <div className="absolute top-0 right-4 h-full flex items-center gap-4 flex-col justify-center opacity-0 translate-y-5 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  <button
                    onClick={(e) => handleAddToWishlist(card, e)}
                    className="p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform hover:text-buttons"
                  >
                    <card.like size={18} />
                  </button>
                  <button
                    onClick={() => openDialog(card)}
                    className="p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform hover:text-buttons"
                  >
                    <card.search size={18} />
                  </button>
                  <button
                    onClick={(e) => handleAddToCart(card, e)}
                    className={`p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform hover:text-buttons ${
                      card.availability === "Out Stock" ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={card.availability === "Out Stock"}
                  >
                    {card.shop ? <card.shop size={18} /> : <ShoppingCart size={18} />}
                  </button>
                </div>
              </div>
              <div className="p-4">
                <p className='text-sm text-gray-500'>{card.name}</p>
                <p className='text-lg font-semibold mt-1 group-hover:text-buttons transition-colors duration-300'>{card.type}</p>
                <p className='text-lg font-bold text-gray-900 mt-2'>
                  {typeof card.price === 'string' ? card.price : `$${card.price}`}
                </p>
                <p className={`text-sm mt-2 ${
                  card.availability === "On Stock"
                    ? "text-navbar"
                    : "text-red-500"
                }`}>
                  {card.availability}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dialog */}
      {isDialogOpen && selectedProduct && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={closeDialog}
        >
          <div
            className="bg-white rounded-lg w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl max-h-[90vh] overflow-y-auto mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col lg:flex-row">
              {/* Left Side - Product Details */}
              <div className="flex-1 p-6 lg:p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg lg:text-xl font-bold text-gray-800">More about the product</h3>
                    <ChevronRight size={20} className="text-gray-600" />
                  </div>
                  <button onClick={closeDialog} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X size={20} className="text-gray-600" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="space-y-4">
                  <p className="text-sm lg:text-base text-gray-500">{selectedProduct.name}</p>
                  <h4 className="text-xl lg:text-2xl font-bold text-gray-800">{selectedProduct.type}</h4>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">{renderStars(4.5)}</div>
                    <span className="text-sm text-gray-600">(4.5/5)</span>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <h5 className="font-bold text-gray-800">Description</h5>
                    <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                      Experience cutting-edge technology with this premium smartphone. Featuring advanced camera
                      capabilities, lightning-fast performance, and sleek design that fits perfectly in your hand.
                    </p>
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-gray-800">Quantity:</span>
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button onClick={decrementQuantity} className="p-2 hover:bg-gray-100 transition-colors">
                          <Minus size={16} />
                        </button>
                        <span className="px-4 py-2 border-x border-gray-300 min-w-[50px] text-center">{quantity}</span>
                        <button onClick={incrementQuantity} className="p-2 hover:bg-gray-100 transition-colors">
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xl lg:text-2xl font-bold text-buttons">
                        {typeof selectedProduct.price === 'string'
                          ? selectedProduct.price
                          : `$${selectedProduct.price}`}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-6">
                    <button
                      onClick={handleAddToCartFromDialog}
                      className={`flex-1 bg-buttons text-white py-3 px-6 rounded-lg font-bold hover:bg-opacity-90 transition-colors ${
                        selectedProduct.availability === "Out Stock" ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={selectedProduct.availability === "Out Stock"}
                    >
                      Add to Cart
                    </button>
                    <button className="flex-1 bg-gray-800 text-white py-3 px-6 rounded-lg font-bold hover:bg-gray-700 transition-colors">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Side - Product Image */}
              <div className="lg:w-1/2 p-6 lg:p-8">
                <div className="w-full h-[300px] lg:h-[500px] rounded-lg overflow-hidden">
                  {/* Updated image source */}
                  <img
                    src={`/Images/${selectedProduct.img}`}
                    alt={selectedProduct.type}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast notifications with "Go to Cart" button */}
      <div className="fixed top-4 right-4 z-[1000] space-y-4 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-[300px] max-w-[400px] pointer-events-auto transform transition-all duration-300 ease-out opacity-100 translate-x-0 toast"
          >
            <div className="flex items-start gap-3">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                toast.type === "success" ? "bg-green-100" : "bg-red-100"
              }`}>
                <Check size={16} className={toast.type === "success" ? "text-green-600" : "text-red-600"} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 mb-1">{toast.message}</p>
                <p className="text-xs text-gray-500">{toast.timestamp}</p>
                {toast.message.includes("added to cart") && (
                  <button
                    onClick={goToCart}
                    className="text-xs text-blue-600 hover:text-blue-800 font-bold mt-1"
                  >
                    Go to Cart →
                  </button>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="flex-shrink-0 p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X size={14} className="text-gray-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <style>
        {`
          @keyframes slideInFromRight {
            from {
              opacity: 0;
              transform: translateX(100%);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          .toast {
            animation: slideInFromRight 0.3s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default Shop;