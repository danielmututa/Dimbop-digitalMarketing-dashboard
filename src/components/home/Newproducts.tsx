// import { useState } from "react"
// import { ChevronRight, Star, X, Plus, Minus, Check, ShoppingCart } from "lucide-react"
// import Database from "../Database"
// import { useCart } from "../shop/CartContext"
// import { useNavigate } from "react-router-dom"

// interface Product {
//   id: string;
//   img: string;
//   name: string;
//   type: string;
//   price: number;
//   availability: string;
//   message?: string;
//   like: React.ComponentType<{ size: number }>;
//   search: React.ComponentType<{ size: number }>;
//   shop?: React.ComponentType<{ size: number }>;
//   rating?: number;
//   description?: string;
// }

// interface Toast {
//   id: number;
//   message: string;
//   type: string;
//   timestamp: string;
// }

// const Newproducts = () => {
//   const { addToCart } = useCart()
//   const navigate = useNavigate()

//   const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
//   const [quantity, setQuantity] = useState<number>(1)
//   const [toasts, setToasts] = useState<Toast[]>([])
//   const [toastIdCounter, setToastIdCounter] = useState<number>(0)
//   const [wishlist, setWishlist] = useState<Product[]>([])

//   const openDialog = (product: Product) => {
//     setSelectedProduct(product)
//     setIsDialogOpen(true)
//     setQuantity(1)
//   }

//   const closeDialog = () => {
//     setIsDialogOpen(false)
//     setSelectedProduct(null)
//   }

//   const incrementQuantity = () => {
//     setQuantity((prev) => prev + 1)
//   }

//   const decrementQuantity = () => {
//     setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
//   }

//   const formatTimestamp = (): string => {
//     const now = new Date()
//     const day = now.getDate().toString().padStart(2, "0")
//     const month = (now.getMonth() + 1).toString().padStart(2, "0")
//     const year = now.getFullYear()
//     const hours = now.getHours().toString().padStart(2, "0")
//     const minutes = now.getMinutes().toString().padStart(2, "0")
//     const seconds = now.getSeconds().toString().padStart(2, "0")
//     return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
//   }

//   const showToast = (message: string, type: string = "success") => {
//     const id = toastIdCounter
//     setToastIdCounter((prev) => prev + 1)
//     const timestamp = formatTimestamp()
//     const newToast = { id, message, type, timestamp }
//     setToasts((prev) => [...prev, newToast])
//     setTimeout(() => {
//       setToasts((prev) => prev.filter((toast) => toast.id !== id))
//     }, 5000)
//   }

//   const removeToast = (id: number) => {
//     setToasts((prev) => prev.filter((toast) => toast.id !== id))
//   }

//   const handleAddToWishlist = (product: Product, e: React.MouseEvent) => {
//     e.preventDefault()
//     e.stopPropagation()
//     if (wishlist.find((item) => item.id === product.id)) {
//       showToast(`${product.type} is already in your wishlist`, "success")
//     } else {
//       setWishlist((prev) => [...prev, product])
//       showToast(`${product.type} successfully added to your wishlist`, "success")
//     }
//   }

//   const handleAddToCart = (product: Product, e: React.MouseEvent) => {
//     e.preventDefault()
//     e.stopPropagation()
//     if (product.availability === "Out of Stock") {
//       showToast(product.message || "This product is currently out of stock.", "error")
//     } else {
//       addToCart(product, 1)
//       showToast(`${product.type} successfully added to cart`, "success")
//     }
//   }

//   const handleAddToCartFromDialog = () => {
//     if (!selectedProduct) return
    
//     if (selectedProduct.availability === "Out of Stock") {
//       showToast(selectedProduct.message || "This product is currently out of stock.", "error")
//     } else {
//       addToCart(selectedProduct, quantity)
//       showToast(`${selectedProduct.type} successfully added to cart`, "success")
//       closeDialog()
//     }
//   }

//   const goToCart = () => {
//     navigate("/cart")
//   }

//   const goToShop = () => {
//     navigate("/shop")
//   }

//   const renderStars = (rating: number = 4.5) => {
//     const stars = []
//     const fullStars = Math.floor(rating)
//     const hasHalfStar = rating % 1 !== 0

//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />)
//     }

//     if (hasHalfStar) {
//       stars.push(
//         <div key="half" className="relative">
//           <Star size={16} className="text-gray-300" />
//           <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
//             <Star size={16} className="fill-yellow-400 text-yellow-400" />
//           </div>
//         </div>
//       )
//     }

//     const remainingStars = 5 - Math.ceil(rating)
//     for (let i = 0; i < remainingStars; i++) {
//       stars.push(<Star key={`empty-${i}`} size={16} className="text-gray-300" />)
//     }

//     return stars
//   }

//   return (
//     <div className="px-[20px] py-[50px] flex flex-col items-center justify-center sm:px-[20px] sm:py-[50px] md:px-[40px] lg:px-[100px] lg:py-[80px]">
//       <h2 className="pb-2 text-[20px] md:text-[23px] lg:text-[26px] font-montserratBold lg:pb-3">New Products</h2>
//       <p className="pb-5 text-sm md:text-[16px] lg:text-[18px] text-gray-500 text-center lg:pb-8">
//         Discover our newest smartphone collection featuring sleek designs, powerful cameras, and top models like iPhone,
//         Samsung Galaxy, and Nokia. Enjoy cutting-edge performance and innovative features that fit your lifestyle. Stay
//         connected and ahead of the curve — shop now!
//       </p>

//       <div className="flex justify-between flex-wrap">
//         {Database.map((card: Product) => {
//           return (
//             <div
//               key={card.id}
//               className="mb-[20px] w-full md:w-[48%] lg:w-[30%] xl:w-[23%] relative gap-[4px] h-[400px] lg:mb-8 group"
//             >
//               <div className="relative w-full h-[300px] overflow-hidden">
//                 <img
//                   loading="lazy"
//                   src={(() => {
//                     try {
//                       return require("../Images/" + card.img) || "/placeholder.svg"
//                     } catch (e) {
//                       console.error("Image load error for", card.img, ":", e)
//                       return "/placeholder.svg"
//                     }
//                   })()}
//                   alt={card.type}
//                   className="hover:scale-105 transition-transform duration-500 w-full object-cover h-full"
//                 />

//                 <div className="absolute top-0 right-4 h-full flex items-center gap-4 flex-col justify-center transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 opacity-0 translate-y-5">
//                   <button
//                     onClick={(e) => handleAddToWishlist(card, e)}
//                     className="p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform hover:text-buttons"
//                   >
//                     <card.like size={16} />
//                   </button>
//                   <button
//                     onClick={() => openDialog(card)}
//                     className="p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform hover:text-buttons"
//                   >
//                     <card.search size={16} />
//                   </button>
//                   <button
//                     onClick={(e) => handleAddToCart(card, e)}
//                     className={`p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform hover:text-buttons ${
//                       card.availability === "Out of Stock" ? "opacity-50 cursor-not-allowed" : ""
//                     }`}
//                     disabled={card.availability === "Out of Stock"}
//                   >
//                     {card.shop ? <card.shop size={16} /> : <ShoppingCart size={16} />}
//                   </button>
//                 </div>
//               </div>

//               <p className="text-sm lg:text-[15px] font-montserrat pt-[10px] text-gray-600">{card.name}</p>
//               <p className="text-[16px] font-montserratBold pt-[14px] leading-[1.1] lg:text-[18px] group-hover:text-buttons transition-colors duration-500">
//                 {card.type}
//               </p>
//               <p className="text-sm font-montserrat pt-[10px] text-gray-600 text-[16px]">${card.price}</p>
//             </div>
//           )
//         })}
//       </div>

//       <div className="flex justify-center items-center">
//         <button onClick={goToShop} className="p-2 w-[110px] relative lg:w-[180px] lg:p-3 border-2 border-buttons overflow-hidden group">
//           <div className="absolute top-0 left-0 w-0 h-full bg-buttons -skew-x-[45deg] transform transition-all duration-500 ease-out group-hover:w-[calc(100%)] group-hover:-left-[30px]"></div>
//           <div className="absolute top-0 right-0 w-0 h-full bg-buttons -skew-x-[45deg] transform transition-all duration-500 ease-out group-hover:w-[calc(100%)] group-hover:-right-[30px]"></div>
//           <span className="text-[12px] lg:text-[16px] relative z-10 font-montserratBold text-buttons transition-all duration-500 ease-out group-hover:text-white group-hover:scale-110">
//             View More
//           </span>
//         </button>
//       </div>

//       {isDialogOpen && selectedProduct && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//           onClick={closeDialog}
//         >
//           <div
//             className="bg-white rounded-lg w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl max-h-[90vh] overflow-y-auto xl:overflow-hidden mx-4"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex flex-col lg:flex-row">
//               <div className="flex-1 p-6 lg:p-8">
//                 <div className="flex items-center justify-between mb-6">
//                   <div className="flex items-center gap-2">
//                     <h3 className="text-lg lg:text-xl font-montserratBold text-gray-800">More about the product</h3>
//                     <ChevronRight size={20} className="text-gray-600" />
//                   </div>
//                   <button onClick={closeDialog} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
//                     <X size={20} />
//                   </button>
//                 </div>

//                 <div className="space-y-4">
//                   <p className="text-sm lg:text-base font-montserrat text-gray-600">{selectedProduct.name}</p>
//                   <h4 className="text-xl lg:text-2xl font-montserratBold text-gray-800">{selectedProduct.type}</h4>
//                   <div className="flex items-center gap-2">
//                     <div className="flex items-center gap-1">{renderStars(selectedProduct.rating)}</div>
//                     <span className="text-sm text-gray-600">({selectedProduct.rating || 4.5}/5)</span>
//                   </div>
//                   <div className="space-y-2">
//                     <h5 className="font-montserratBold text-gray-800">Description</h5>
//                     <p className="text-sm lg:text-base text-gray-600 leading-relaxed">{selectedProduct.description}</p>
//                   </div>
//                   <div className="flex items-center justify-between pt-4">
//                     <div className="flex items-center gap-4">
//                       <span className="font-montserratBold text-gray-800">Quantity:</span>
//                       <div className="flex items-center border rounded-lg border-gray-200">
//                         <button onClick={decrementQuantity} className="p-3 hover:bg-gray-100 transition-colors">
//                           <Minus size={16} />
//                         </button>
//                         <span className="px-4 py-2 border-x border-gray-200 min-w-[50px] text-center text-sm">
//                           {quantity}
//                         </span>
//                         <button onClick={incrementQuantity} className="p-3 hover:bg-gray-100 transition-colors">
//                           <Plus size={16} />
//                         </button>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <span className="text-xl lg:text-2xl font-montserratBold text-blue-500">
//                         ${selectedProduct.price}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="flex flex-col sm:flex-row gap-3 pt-6">
//                     <button
//                       onClick={handleAddToCartFromDialog}
//                       className={`flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg font-montserratBold hover:bg-blue-600 transition-colors ${
//                         selectedProduct.availability === "Out of Stock" ? "opacity-50 cursor-not-allowed" : ""
//                       }`}
//                       disabled={selectedProduct.availability === "Out of Stock"}
//                     >
//                       Add to Cart
//                     </button>
//                     <button className="flex-1 bg-gray-800 text-white py-3 px-6 rounded-lg font-montserratBold hover:bg-gray-700 transition-colors">
//                       Buy Now
//                     </button>
//                   </div>
//                 </div>
//               </div>
//               <div className="lg:w-1/2 p-6 lg:p-8">
//                 <div className="w-full h-[300px] lg:h-[500px] rounded-lg overflow-hidden">
//                   <img
//                     src={(() => {
//                       try {
//                         return require("../Images/" + selectedProduct.img) || "/placeholder.svg"
//                       } catch (e) {
//                         console.error("Image load error for", selectedProduct.img, ":", e)
//                         return "/placeholder.svg"
//                       }
//                     })()}
//                     alt={selectedProduct.type}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="fixed top-4 right-4 z-[1000] space-y-4 pointer-events-none">
//         {toasts.map((toast) => (
//           <div
//             key={toast.id}
//             className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-[300px] max-w-[400px] pointer-events-auto transform transition-all duration-300 ease-out opacity-100 translate-x-0 toast"
//           >
//             <div className="flex items-start gap-3">
//               <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
//                 <Check size={16} className="text-green-600" />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-montserratBold text-gray-900 mb-1">{toast.message}</p>
//                 <p className="text-xs text-gray-500 font-montserrat">{toast.timestamp}</p>
//                 {toast.message.includes("added to cart") && (
//                   <button
//                     onClick={goToCart}
//                     className="text-xs text-blue-600 hover:text-blue-800 font-montserratBold mt-1"
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
//           .font-montserrat {
//             font-family: 'Montserrat', sans-serif;
//             font-weight: 400;
//           }
//           .font-montserratBold {
//             font-family: 'Montserrat', sans-serif;
//             font-weight: 700;
//           }
//         `}
//       </style>
//     </div>
//   )
// }

// export default Newproducts








// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Star, Plus, Minus, Check, ShoppingCart, ChevronRight, X } from 'lucide-react';
// import { apiClient } from '@/context/axios';
// import { useCart } from '../shop/CartContext';
// import { toast } from 'sonner';

// interface Product {
//   id: number;
//   name: string;
//   price: string;
//   stock_quantity: number;
//   image_url: string;
//   categories: { id: number; name: string } | null;
//   discount_percentage: number;
//   description?: string;
// }

// interface Toast {
//   id: number;
//   message: string;
//   type: string;
//   timestamp: string;
// }

// const Newproducts = () => {
//   const { addToCart } = useCart();
//   const navigate = useNavigate();

//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<Error | null>(null);
//   const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [quantity, setQuantity] = useState<number>(1);
//   const [wishlist, setWishlist] = useState<Product[]>([]);

//   // Base URL for backend
//   const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://dimpo-pbackend.onrender.com';

//   // Normalize image URL
//   const getImageUrl = (imageUrl: string) => {
//     if (!imageUrl) {
//       console.warn('No image_url provided, using placeholder');
//       return '/placeholder-image.jpg';
//     }
//     if (imageUrl.startsWith('http')) return imageUrl;
//     return `${BASE_URL}${imageUrl}`;
//   };

//   // Fetch products from backend
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await apiClient.get('/api/products');
//         setProducts(response.data);
//       } catch (err: unknown) {
//         const error = err instanceof Error ? err : new Error('Unknown error');
//         setError(error);
//         toast.error(`Failed to load products: ${error.message}`);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

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

//   const handleAddToWishlist = (product: Product, e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (wishlist.find((item) => item.id === product.id)) {
//       toast.success(`${product.name} is already in your wishlist`);
//     } else {
//       setWishlist((prev) => [...prev, product]);
//       toast.success(`${product.name} successfully added to your wishlist`);
//     }
//   };

//   const handleAddToCart = (product: Product, e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (product.stock_quantity <= 0) {
//       toast.error('This product is currently out of stock.');
//     } else {
//       addToCart({
//         ...product,
//         id: product.id.toString(), // Convert to string to match your cart expectations
//         type: product.name,
//         price: parseFloat(product.price),
//         availability: product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'
//       }, 1);
//       toast.success(`${product.name} successfully added to cart`);
//     }
//   };

//   const handleAddToCartFromDialog = () => {
//     if (!selectedProduct) return;
    
//     if (selectedProduct.stock_quantity <= 0) {
//       toast.error('This product is currently out of stock.');
//     } else {
//       addToCart({
//         ...selectedProduct,
//         id: selectedProduct.id.toString(),
//         type: selectedProduct.name,
//         price: parseFloat(selectedProduct.price),
//         availability: selectedProduct.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'
//       }, quantity);
//       toast.success(`${selectedProduct.name} successfully added to cart`);
//       closeDialog();
//     }
//   };

//   const goToCart = () => {
//     navigate('/cart');
//   };

//   const goToShop = () => {
//     navigate('/products');
//   };

//   const renderStars = (rating: number = 4.5) => {
//     const stars = [];
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
//         </div>
//       );
//     }

//     const remainingStars = 5 - Math.ceil(rating);
//     for (let i = 0; i < remainingStars; i++) {
//       stars.push(<Star key={`empty-${i}`} size={16} className="text-gray-300" />);
//     }

//     return stars;
//   };

//   if (loading) return <div className="text-center py-10">Loading products...</div>;
//   if (error) return <div className="text-red-500 text-center py-10">Error loading products: {error.message}</div>;

//   return (
//     <div className="px-[20px] py-[50px] flex flex-col items-center justify-center sm:px-[20px] sm:py-[50px] md:px-[40px] lg:px-[100px] lg:py-[80px]">
//       <h2 className="pb-2 text-[20px] md:text-[23px] lg:text-[26px] font-montserratBold lg:pb-3">New Products</h2>
//       <p className="pb-5 text-sm md:text-[16px] lg:text-[18px] text-gray-500 text-center lg:pb-8">
//         Discover our newest smartphone collection featuring sleek designs, powerful cameras, and top models.
//         Enjoy cutting-edge performance and innovative features that fit your lifestyle.
//       </p>

//       <div className="flex justify-between flex-wrap">
//         {products.map((product) => {
//           const availability = product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock';
          
//           return (
//             <div
//               key={product.id}
//               className="mb-[20px] w-full md:w-[48%] lg:w-[30%] xl:w-[23%] relative gap-[4px] h-[400px] lg:mb-8 group"
//             >
//               <div className="relative w-full h-[300px] overflow-hidden">
//                 <img
//                   src={getImageUrl(product.image_url)}
//                   alt={product.name}
//                   className="hover:scale-105 transition-transform duration-500 w-full object-cover h-full"
//                   onError={(e) => {
//                     e.currentTarget.src = '/placeholder-image.jpg';
//                   }}
//                 />

//                 <div className="absolute top-0 right-4 h-full flex items-center gap-4 flex-col justify-center transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 opacity-0 translate-y-5">
//                   <button
//                     onClick={(e) => handleAddToWishlist(product, e)}
//                     className="p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform hover:text-buttons"
//                   >
//                     <Star size={16} />
//                   </button>
//                   <button
//                     onClick={() => openDialog(product)}
//                     className="p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform hover:text-buttons"
//                   >
//                     <Plus size={16} />
//                   </button>
//                   <button
//                     onClick={(e) => handleAddToCart(product, e)}
//                     className={`p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform hover:text-buttons ${
//                       availability === "Out of Stock" ? "opacity-50 cursor-not-allowed" : ""
//                     }`}
//                     disabled={availability === "Out of Stock"}
//                   >
//                     <ShoppingCart size={16} />
//                   </button>
//                 </div>
//               </div>

//               <p className="text-sm lg:text-[15px] font-montserrat pt-[10px] text-gray-600">
//                 {product.categories?.name || 'No Category'}
//               </p>
//               <p className="text-[16px] font-montserratBold pt-[14px] leading-[1.1] lg:text-[18px] group-hover:text-buttons transition-colors duration-500">
//                 {product.name}
//               </p>
//               <p className="text-sm font-montserrat pt-[10px] text-gray-600 text-[16px]">
//                 ${parseFloat(product.price).toFixed(2)}
//                 {product.discount_percentage > 0 && (
//                   <span className="text-red-500 ml-2">-{product.discount_percentage}%</span>
//                 )}
//               </p>
//               <p className={`text-xs ${availability === 'In Stock' ? 'text-green-500' : 'text-red-500'}`}>
//                 {availability}
//               </p>
//             </div>
//           );
//         })}
//       </div>

//       <div className="flex justify-center items-center">
//         <button 
//           onClick={goToShop} 
//           className="p-2 w-[110px] relative lg:w-[180px] lg:p-3 border-2 border-buttons overflow-hidden group"
//         >
//           <div className="absolute top-0 left-0 w-0 h-full bg-buttons -skew-x-[45deg] transform transition-all duration-500 ease-out group-hover:w-[calc(100%)] group-hover:-left-[30px]"></div>
//           <div className="absolute top-0 right-0 w-0 h-full bg-buttons -skew-x-[45deg] transform transition-all duration-500 ease-out group-hover:w-[calc(100%)] group-hover:-right-[30px]"></div>
//           <span className="text-[12px] lg:text-[16px] relative z-10 font-montserratBold text-buttons transition-all duration-500 ease-out group-hover:text-white group-hover:scale-110">
//             View More
//           </span>
//         </button>
//       </div>

//       {isDialogOpen && selectedProduct && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//           onClick={closeDialog}
//         >
//           <div
//             className="bg-white rounded-lg w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl max-h-[90vh] overflow-y-auto xl:overflow-hidden mx-4"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex flex-col lg:flex-row">
//               <div className="flex-1 p-6 lg:p-8">
//                 <div className="flex items-center justify-between mb-6">
//                   <div className="flex items-center gap-2">
//                     <h3 className="text-lg lg:text-xl font-montserratBold text-gray-800">More about the product</h3>
//                     <ChevronRight size={20} className="text-gray-600" />
//                   </div>
//                   <button onClick={closeDialog} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
//                     <X size={20} />
//                   </button>
//                 </div>

//                 <div className="space-y-4">
//                   <p className="text-sm lg:text-base font-montserrat text-gray-600">
//                     {selectedProduct.categories?.name || 'No Category'}
//                   </p>
//                   <h4 className="text-xl lg:text-2xl font-montserratBold text-gray-800">{selectedProduct.name}</h4>
//                   <div className="flex items-center gap-2">
//                     <div className="flex items-center gap-1">{renderStars()}</div>
//                     <span className="text-sm text-gray-600">(4.5/5)</span>
//                   </div>
//                   <div className="space-y-2">
//                     <h5 className="font-montserratBold text-gray-800">Description</h5>
//                     <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
//                       {selectedProduct.description || 'No description available.'}
//                     </p>
//                   </div>
//                   <div className="flex items-center justify-between pt-4">
//                     <div className="flex items-center gap-4">
//                       <span className="font-montserratBold text-gray-800">Quantity:</span>
//                       <div className="flex items-center border rounded-lg border-gray-200">
//                         <button onClick={decrementQuantity} className="p-3 hover:bg-gray-100 transition-colors">
//                           <Minus size={16} />
//                         </button>
//                         <span className="px-4 py-2 border-x border-gray-200 min-w-[50px] text-center text-sm">
//                           {quantity}
//                         </span>
//                         <button onClick={incrementQuantity} className="p-3 hover:bg-gray-100 transition-colors">
//                           <Plus size={16} />
//                         </button>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <span className="text-xl lg:text-2xl font-montserratBold text-blue-500">
//                         ${parseFloat(selectedProduct.price).toFixed(2)}
//                         {selectedProduct.discount_percentage > 0 && (
//                           <span className="text-red-500 ml-2">-{selectedProduct.discount_percentage}%</span>
//                         )}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="flex flex-col sm:flex-row gap-3 pt-6">
//                     <button
//                       onClick={handleAddToCartFromDialog}
//                       className={`flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg font-montserratBold hover:bg-blue-600 transition-colors ${
//                         selectedProduct.stock_quantity <= 0 ? "opacity-50 cursor-not-allowed" : ""
//                       }`}
//                       disabled={selectedProduct.stock_quantity <= 0}
//                     >
//                       Add to Cart
//                     </button>
//                     <button className="flex-1 bg-gray-800 text-white py-3 px-6 rounded-lg font-montserratBold hover:bg-gray-700 transition-colors">
//                       Buy Now
//                     </button>
//                   </div>
//                 </div>
//               </div>
//               <div className="lg:w-1/2 p-6 lg:p-8">
//                 <div className="w-full h-[300px] lg:h-[500px] rounded-lg overflow-hidden">
//                   <img
//                     src={getImageUrl(selectedProduct.image_url)}
//                     alt={selectedProduct.name}
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       e.currentTarget.src = '/placeholder-image.jpg';
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Newproducts;






// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Star, Plus, Minus, Check, ShoppingCart, ChevronRight, X } from 'lucide-react';
// import { apiClient } from '@/context/axios';
// import { useCart } from '../shop/CartContext';
// import { toast } from 'sonner';

// interface Product {
//   id: number;
//   name: string;
//   price: string;
//   stock_quantity: number;
//   image_url: string;
//   categories: { id: number; name: string } | null;
//   discount_percentage: number;
//   description?: string;
// }

// const Newproducts = () => {
//   const { addToCart } = useCart();
//   const navigate = useNavigate();

//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<Error | null>(null);
//   const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [quantity, setQuantity] = useState<number>(1);
//   const [wishlist, setWishlist] = useState<Product[]>([]);

//   // Base URL for backend
//   const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://dimpo-pbackend.onrender.com';

//   // Normalize image URL
//   const getImageUrl = (imageUrl: string) => {
//     if (!imageUrl) return '/placeholder-image.jpg';
//     if (imageUrl.startsWith('http')) return imageUrl;
//     return `${BASE_URL}${imageUrl}`;
//   };

//   // Fetch products from backend
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await apiClient.get('/api/products');
//         setProducts(response.data);
//       } catch (err: unknown) {
//         const error = err instanceof Error ? err : new Error('Unknown error');
//         setError(error);
//         toast.error(`Failed to load products: ${error.message}`);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

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

//   const handleAddToWishlist = (product: Product, e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (wishlist.find((item) => item.id === product.id)) {
//       toast.success(`${product.name} is already in your wishlist`);
//     } else {
//       setWishlist((prev) => [...prev, product]);
//       toast.success(`${product.name} successfully added to your wishlist`);
//     }
//   };

//   const handleAddToCart = (product: Product, e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (product.stock_quantity <= 0) {
//       toast.error('This product is currently out of stock.');
//     } else {
//       addToCart({
//         ...product,
//         id: product.id.toString(),
//         type: product.name,
//         price: parseFloat(product.price),
//         availability: product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'
//       }, 1);
//       toast.success(`${product.name} successfully added to cart`);
//     }
//   };

//   const handleAddToCartFromDialog = () => {
//     if (!selectedProduct) return;
    
//     if (selectedProduct.stock_quantity <= 0) {
//       toast.error('This product is currently out of stock.');
//     } else {
//       addToCart({
//         ...selectedProduct,
//         id: selectedProduct.id.toString(),
//         type: selectedProduct.name,
//         price: parseFloat(selectedProduct.price),
//         availability: selectedProduct.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'
//       }, quantity);
//       toast.success(`${selectedProduct.name} successfully added to cart`);
//       closeDialog();
//     }
//   };

//   const goToCart = () => {
//     navigate('/cart');
//   };

//   const goToShop = () => {
//     navigate('/products');
//   };

//   const renderStars = (rating: number = 4.5) => {
//     const stars = [];
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
//         </div>
//       );
//     }

//     const remainingStars = 5 - Math.ceil(rating);
//     for (let i = 0; i < remainingStars; i++) {
//       stars.push(<Star key={`empty-${i}`} size={16} className="text-gray-300" />);
//     }

//     return stars;
//   };

//   if (loading) return <div className="text-center py-10">Loading products...</div>;
//   if (error) return <div className="text-red-500 text-center py-10">Error loading products: {error.message}</div>;

//   return (
//     <div className="px-[20px] py-[50px] flex flex-col items-center justify-center sm:px-[20px] sm:py-[50px] md:px-[40px] lg:px-[100px] lg:py-[80px]">
//       <h2 className="pb-2 text-[20px] md:text-[23px] lg:text-[26px] font-montserratBold lg:pb-3">New Products</h2>
//       <p className="pb-5 text-sm md:text-[16px] lg:text-[18px] text-gray-500 text-center lg:pb-8">
//         Discover our newest smartphone collection featuring sleek designs, powerful cameras, and top models like iPhone,
//         Samsung Galaxy, and Nokia. Enjoy cutting-edge performance and innovative features that fit your lifestyle. Stay
//         connected and ahead of the curve — shop now!
//       </p>

//       <div className="flex flex-wrap justify-between gap-4 w-full">
//         {products.map((product) => {
//           const availability = product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock';
          
//           return (
//             <div
//               key={product.id}
//               className="mb-[20px] w-full sm:w-[48%] lg:w-[30%] xl:w-[23%] relative h-[400px] group"
//             >
//               <div className="relative w-full h-[300px] overflow-hidden rounded-lg">
//                 <img
//                   src={getImageUrl(product.image_url)}
//                   alt={product.name}
//                   className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
//                   onError={(e) => {
//                     e.currentTarget.src = '/placeholder-image.jpg';
//                   }}
//                 />

//                 <div className="absolute top-0 right-4 h-full flex items-center gap-4 flex-col justify-center transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 opacity-0 translate-y-5">
//                   <button
//                     onClick={(e) => handleAddToWishlist(product, e)}
//                     className="p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform hover:text-buttons"
//                   >
//                     <Star size={16} />
//                   </button>
//                   <button
//                     onClick={() => openDialog(product)}
//                     className="p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform hover:text-buttons"
//                   >
//                     <Plus size={16} />
//                   </button>
//                   <button
//                     onClick={(e) => handleAddToCart(product, e)}
//                     className={`p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform hover:text-buttons ${
//                       availability === "Out of Stock" ? "opacity-50 cursor-not-allowed" : ""
//                     }`}
//                     disabled={availability === "Out of Stock"}
//                   >
//                     <ShoppingCart size={16} />
//                   </button>
//                 </div>
//               </div>

//               <div className="pt-3">
//                 <p className="text-sm lg:text-[15px] font-montserrat text-gray-600">{product.categories?.name || 'No Category'}</p>
//                 <p className="text-[16px] font-montserratBold pt-2 leading-[1.1] lg:text-[18px] group-hover:text-buttons transition-colors duration-500">
//                   {product.name}
//                 </p>
//                 <div className="flex items-center justify-between pt-2">
//                   <p className="text-sm font-montserrat text-gray-600 text-[16px]">
//                     ${parseFloat(product.price).toFixed(2)}
//                     {product.discount_percentage > 0 && (
//                       <span className="text-red-500 ml-2">-{product.discount_percentage}%</span>
//                     )}
//                   </p>
//                   <p className={`text-xs ${availability === 'In Stock' ? 'text-green-500' : 'text-red-500'}`}>
//                     {availability}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <div className="flex justify-center items-center mt-8">
//         <button 
//           onClick={goToShop} 
//           className="p-2 w-[110px] relative lg:w-[180px] lg:p-3 border-2 border-buttons overflow-hidden group"
//         >
//           <div className="absolute top-0 left-0 w-0 h-full bg-buttons -skew-x-[45deg] transform transition-all duration-500 ease-out group-hover:w-[calc(100%)] group-hover:-left-[30px]"></div>
//           <div className="absolute top-0 right-0 w-0 h-full bg-buttons -skew-x-[45deg] transform transition-all duration-500 ease-out group-hover:w-[calc(100%)] group-hover:-right-[30px]"></div>
//           <span className="text-[12px] lg:text-[16px] relative z-10 font-montserratBold text-buttons transition-all duration-500 ease-out group-hover:text-white group-hover:scale-110">
//             View More
//           </span>
//         </button>
//       </div>

//       {isDialogOpen && selectedProduct && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//           onClick={closeDialog}
//         >
//           <div
//             className="bg-white rounded-lg w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl max-h-[90vh] overflow-y-auto xl:overflow-hidden mx-4"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex flex-col lg:flex-row">
//               <div className="flex-1 p-6 lg:p-8">
//                 <div className="flex items-center justify-between mb-6">
//                   <div className="flex items-center gap-2">
//                     <h3 className="text-lg lg:text-xl font-montserratBold text-gray-800">More about the product</h3>
//                     <ChevronRight size={20} className="text-gray-600" />
//                   </div>
//                   <button onClick={closeDialog} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
//                     <X size={20} />
//                   </button>
//                 </div>

//                 <div className="space-y-4">
//                   <p className="text-sm lg:text-base font-montserrat text-gray-600">
//                     {selectedProduct.categories?.name || 'No Category'}
//                   </p>
//                   <h4 className="text-xl lg:text-2xl font-montserratBold text-gray-800">{selectedProduct.name}</h4>
//                   <div className="flex items-center gap-2">
//                     <div className="flex items-center gap-1">{renderStars()}</div>
//                     <span className="text-sm text-gray-600">(4.5/5)</span>
//                   </div>
//                   <div className="space-y-2">
//                     <h5 className="font-montserratBold text-gray-800">Description</h5>
//                     <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
//                       {selectedProduct.description || 'No description available.'}
//                     </p>
//                   </div>
//                   <div className="flex items-center justify-between pt-4">
//                     <div className="flex items-center gap-4">
//                       <span className="font-montserratBold text-gray-800">Quantity:</span>
//                       <div className="flex items-center border rounded-lg border-gray-200">
//                         <button onClick={decrementQuantity} className="p-3 hover:bg-gray-100 transition-colors">
//                           <Minus size={16} />
//                         </button>
//                         <span className="px-4 py-2 border-x border-gray-200 min-w-[50px] text-center text-sm">
//                           {quantity}
//                         </span>
//                         <button onClick={incrementQuantity} className="p-3 hover:bg-gray-100 transition-colors">
//                           <Plus size={16} />
//                         </button>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <span className="text-xl lg:text-2xl font-montserratBold text-blue-500">
//                         ${parseFloat(selectedProduct.price).toFixed(2)}
//                         {selectedProduct.discount_percentage > 0 && (
//                           <span className="text-red-500 ml-2">-{selectedProduct.discount_percentage}%</span>
//                         )}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="flex flex-col sm:flex-row gap-3 pt-6">
//                     <button
//                       onClick={handleAddToCartFromDialog}
//                       className={`flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg font-montserratBold hover:bg-blue-600 transition-colors ${
//                         selectedProduct.stock_quantity <= 0 ? "opacity-50 cursor-not-allowed" : ""
//                       }`}
//                       disabled={selectedProduct.stock_quantity <= 0}
//                     >
//                       Add to Cart
//                     </button>
//                     <button className="flex-1 bg-gray-800 text-white py-3 px-6 rounded-lg font-montserratBold hover:bg-gray-700 transition-colors">
//                       Buy Now
//                     </button>
//                   </div>
//                 </div>
//               </div>
//               <div className="lg:w-1/2 p-6 lg:p-8">
//                 <div className="w-full h-[300px] lg:h-[500px] rounded-lg overflow-hidden">
//                   <img
//                     src={getImageUrl(selectedProduct.image_url)}
//                     alt={selectedProduct.name}
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       e.currentTarget.src = '/placeholder-image.jpg';
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Newproducts;












// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Star, Plus, Minus, Check, ShoppingCart, ChevronRight, X, Search, Heart } from 'lucide-react';
// import { apiClient } from '@/context/axios';
// import { useCart } from '../shop/CartContext';
// import { toast } from 'sonner';

// interface Product {
//   id: number;
//   name: string;
//   price: string;
//   stock_quantity: number;
//   image_url: string;
//   categories: { id: number; name: string } | null;
//   discount_percentage: number;
//   description?: string;
// }

// const Newproducts = () => {
//   const { addToCart } = useCart();
//   const navigate = useNavigate();

//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<Error | null>(null);
//   const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [quantity, setQuantity] = useState<number>(1);
//   const [wishlist, setWishlist] = useState<number[]>([]); // Store only product IDs

//   // Base URL for backend
//   const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://dimpo-pbackend.onrender.com';

//   // Normalize image URL
//   const getImageUrl = (imageUrl: string) => {
//     if (!imageUrl) return '/placeholder-image.jpg';
//     if (imageUrl.startsWith('http')) return imageUrl;
//     return `${BASE_URL}${imageUrl}`;
//   };

//   // Fetch products from backend
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await apiClient.get('/api/products');
//         setProducts(response.data);
//       } catch (err: unknown) {
//         const error = err instanceof Error ? err : new Error('Unknown error');
//         setError(error);
//         toast.error(`Failed to load products: ${error.message}`);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

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

//   const handleAddToWishlist = (productId: number, e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (wishlist.includes(productId)) {
//       toast.success('Product is already in your wishlist');
//     } else {
//       setWishlist([...wishlist, productId]);
//       toast.success('Product added to wishlist');
//     }
//   };

//   const handleAddToCart = (product: Product, e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (product.stock_quantity <= 0) {
//       toast.error('This product is currently out of stock.');
//     } else {
//       addToCart({
//         ...product,
//         id: product.id.toString(),
//         type: product.name,
//         price: parseFloat(product.price),
//         availability: product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'
//       }, 1);
//       toast.success(`${product.name} added to cart`);
//     }
//   };

//   const handleAddToCartFromDialog = () => {
//     if (!selectedProduct) return;
    
//     if (selectedProduct.stock_quantity <= 0) {
//       toast.error('This product is currently out of stock.');
//     } else {
//       addToCart({
//         ...selectedProduct,
//         id: selectedProduct.id.toString(),
//         type: selectedProduct.name,
//         price: parseFloat(selectedProduct.price),
//         availability: selectedProduct.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'
//       }, quantity);
//       toast.success(`${selectedProduct.name} added to cart (${quantity})`);
//       closeDialog();
//     }
//   };

//   const goToCart = () => {
//     navigate('/cart');
//   };

//   const goToShop = () => {
//     navigate('/products');
//   };

//   const renderStars = (rating: number = 4.5) => {
//     const stars = [];
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
//         </div>
//       );
//     }

//     const remainingStars = 5 - Math.ceil(rating);
//     for (let i = 0; i < remainingStars; i++) {
//       stars.push(<Star key={`empty-${i}`} size={16} className="text-gray-300" />);
//     }

//     return stars;
//   };

//   if (loading) return <div className="text-center py-10">Loading products...</div>;
//   if (error) return <div className="text-red-500 text-center py-10">Error loading products: {error.message}</div>;

//   return (
//     <div className="px-[20px] py-[50px] flex flex-col items-center justify-center sm:px-[20px] sm:py-[50px] md:px-[40px] lg:px-[100px] lg:py-[80px]">
//       <h2 className="pb-2 text-[20px] md:text-[23px] lg:text-[26px] font-montserratBold lg:pb-3">New Products</h2>
//       <p className="pb-5 text-sm md:text-[16px] lg:text-[18px] text-gray-500 text-center lg:pb-8">
//         Discover our newest smartphone collection featuring sleek designs, powerful cameras, and top models like iPhone,
//         Samsung Galaxy, and Nokia. Enjoy cutting-edge performance and innovative features that fit your lifestyle. Stay
//         connected and ahead of the curve — shop now!
//       </p>

//       <div className="flex flex-wrap justify-between gap-4 w-full">
//         {products.map((product) => {
//           const isInWishlist = wishlist.includes(product.id);
//           const availability = product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock';
          
//           return (
//             <div
//               key={product.id}
//               className="mb-[20px] w-full sm:w-[48%] lg:w-[30%] xl:w-[23%] relative h-[400px] group"
//             >
//               <div className="relative w-full h-[300px] overflow-hidden rounded-lg">
//                 <img
//                   src={getImageUrl(product.image_url)}
//                   alt={product.name}
//                   className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
//                   onError={(e) => {
//                     e.currentTarget.src = '/placeholder-image.jpg';
//                   }}
//                 />

//                 {/* Stock Quantity Badge */}
//                 {product.stock_quantity > 0 && (
//                   <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
//                     {product.stock_quantity} in stock
//                   </div>
//                 )}

//                 <div className="absolute top-0 right-4 h-full flex items-center gap-4 flex-col justify-center transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 opacity-0 translate-y-5">
//                   <button
//                     onClick={(e) => handleAddToWishlist(product.id, e)}
//                     className={`p-2 rounded-full shadow-md hover:scale-110 transition-transform ${
//                       isInWishlist 
//                         ? 'bg-red-500 text-white' 
//                         : 'bg-white hover:text-red-500'
//                     }`}
//                   >
//                     <Heart size={16} fill={isInWishlist ? 'currentColor' : 'none'} />
//                   </button>
//                   <button
//                     onClick={() => openDialog(product)}
//                     className="p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform hover:text-blue-500"
//                   >
//                     <Search size={16} />
//                   </button>
//                   <button
//                     onClick={(e) => handleAddToCart(product, e)}
//                     className={`p-2 rounded-full shadow-md hover:scale-110 transition-transform ${
//                       availability === "Out of Stock" 
//                         ? "bg-gray-300 cursor-not-allowed" 
//                         : "bg-white hover:text-green-500"
//                     }`}
//                     disabled={availability === "Out of Stock"}
//                   >
//                     <ShoppingCart size={16} />
//                   </button>
//                 </div>
//               </div>

//               <div className="pt-3">
//                 <p className="text-sm lg:text-[15px] font-montserrat text-gray-600">
//                   {product.categories?.name || 'No Category'}
//                 </p>
//                 <p className="text-[16px] font-montserratBold pt-2 leading-[1.1] lg:text-[18px] group-hover:text-buttons transition-colors duration-500">
//                   {product.name}
//                 </p>
//                 <div className="flex items-center justify-between pt-2">
//                   <p className="text-sm font-montserrat text-gray-600 text-[16px]">
//                     ${parseFloat(product.price).toFixed(2)}
//                     {product.discount_percentage > 0 && (
//                       <span className="text-red-500 ml-2">-{product.discount_percentage}%</span>
//                     )}
//                   </p>
//                   <p className={`text-xs ${
//                     availability === 'In Stock' 
//                       ? 'text-green-500' 
//                       : 'text-red-500'
//                   }`}>
//                     {availability}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <div className="flex justify-center items-center mt-8">
//         <button 
//           onClick={goToShop} 
//           className="p-2 w-[110px] relative lg:w-[180px] lg:p-3 border-2 border-buttons overflow-hidden group"
//         >
//           <div className="absolute top-0 left-0 w-0 h-full bg-buttons -skew-x-[45deg] transform transition-all duration-500 ease-out group-hover:w-[calc(100%)] group-hover:-left-[30px]"></div>
//           <div className="absolute top-0 right-0 w-0 h-full bg-buttons -skew-x-[45deg] transform transition-all duration-500 ease-out group-hover:w-[calc(100%)] group-hover:-right-[30px]"></div>
//           <span className="text-[12px] lg:text-[16px] relative z-10 font-montserratBold text-buttons transition-all duration-500 ease-out group-hover:text-white group-hover:scale-110">
//             View More
//           </span>
//         </button>
//       </div>

//       {isDialogOpen && selectedProduct && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//           onClick={closeDialog}
//         >
//           <div
//             className="bg-white rounded-lg w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl max-h-[90vh] overflow-y-auto xl:overflow-hidden mx-4"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex flex-col lg:flex-row">
//               <div className="flex-1 p-6 lg:p-8">
//                 <div className="flex items-center justify-between mb-6">
//                   <div className="flex items-center gap-2">
//                     <h3 className="text-lg lg:text-xl font-montserratBold text-gray-800">More about the product</h3>
//                     <ChevronRight size={20} className="text-gray-600" />
//                   </div>
//                   <button onClick={closeDialog} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
//                     <X size={20} />
//                   </button>
//                 </div>

//                 <div className="space-y-4">
//                   <div className="flex justify-between items-center">
//                     <p className="text-sm lg:text-base font-montserrat text-gray-600">
//                       {selectedProduct.categories?.name || 'No Category'}
//                     </p>
//                     <p className={`text-xs ${
//                       selectedProduct.stock_quantity > 0 
//                         ? 'text-green-500' 
//                         : 'text-red-500'
//                     }`}>
//                       {selectedProduct.stock_quantity > 0 
//                         ? `${selectedProduct.stock_quantity} available` 
//                         : 'Out of stock'}
//                     </p>
//                   </div>
                  
//                   <h4 className="text-xl lg:text-2xl font-montserratBold text-gray-800">
//                     {selectedProduct.name}
//                   </h4>
                  
//                   <div className="flex items-center gap-2">
//                     <div className="flex items-center gap-1">{renderStars()}</div>
//                     <span className="text-sm text-gray-600">(4.5/5)</span>
//                   </div>
                  
//                   <div className="space-y-2">
//                     <h5 className="font-montserratBold text-gray-800">Description</h5>
//                     <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
//                       {selectedProduct.description || 'No description available.'}
//                     </p>
//                   </div>
                  
//                   <div className="flex items-center justify-between pt-4">
//                     <div className="flex items-center gap-4">
//                       <span className="font-montserratBold text-gray-800">Quantity:</span>
//                       <div className="flex items-center border rounded-lg border-gray-200">
//                         <button 
//                           onClick={decrementQuantity} 
//                           className="p-3 hover:bg-gray-100 transition-colors"
//                           disabled={quantity <= 1}
//                         >
//                           <Minus size={16} />
//                         </button>
//                         <span className="px-4 py-2 border-x border-gray-200 min-w-[50px] text-center text-sm">
//                           {quantity}
//                         </span>
//                         <button 
//                           onClick={incrementQuantity} 
//                           className="p-3 hover:bg-gray-100 transition-colors"
//                           disabled={quantity >= selectedProduct.stock_quantity}
//                         >
//                           <Plus size={16} />
//                         </button>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <span className="text-xl lg:text-2xl font-montserratBold text-blue-500">
//                         ${parseFloat(selectedProduct.price).toFixed(2)}
//                         {selectedProduct.discount_percentage > 0 && (
//                           <span className="text-red-500 ml-2">-{selectedProduct.discount_percentage}%</span>
//                         )}
//                       </span>
//                     </div>
//                   </div>
                  
//                   <div className="flex flex-col sm:flex-row gap-3 pt-6">
//                     <button
//                       onClick={handleAddToCartFromDialog}
//                       className={`flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg font-montserratBold hover:bg-blue-600 transition-colors ${
//                         selectedProduct.stock_quantity <= 0 ? "opacity-50 cursor-not-allowed" : ""
//                       }`}
//                       disabled={selectedProduct.stock_quantity <= 0}
//                     >
//                       Add to Cart
//                     </button>
//                     <button 
//                       className="flex-1 bg-gray-800 text-white py-3 px-6 rounded-lg font-montserratBold hover:bg-gray-700 transition-colors"
//                       onClick={goToCart}
//                     >
//                       Buy Now
//                     </button>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="lg:w-1/2 p-6 lg:p-8">
//                 <div className="w-full h-[300px] lg:h-[500px] rounded-lg overflow-hidden">
//                   <img
//                     src={getImageUrl(selectedProduct.image_url)}
//                     alt={selectedProduct.name}
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       e.currentTarget.src = '/placeholder-image.jpg';
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Newproducts;


















// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Star, Plus, Minus, ShoppingCart, ChevronRight, X, Heart } from 'lucide-react';
// import { apiClient } from '@/context/axios';
// import { useCart } from '../shop/CartContext';
// import { toast } from 'sonner';

// interface Product {
//   id: number;
//   name: string;
//   price: string;
//   stock_quantity: number;
//   image_url: string;
//   categories: { id: number; name: string } | null;
//   discount_percentage: number;
//   description?: string;
// }

// const Newproducts = () => {
//   const { addToCart } = useCart();
//   const navigate = useNavigate();
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [quantity, setQuantity] = useState(1);
//   const [wishlist, setWishlist] = useState<Product[]>([]);
//   const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://dimpo-pbackend.onrender.com';

//   // Normalize image URL
//   const getImageUrl = (imageUrl: string) => {
//     if (!imageUrl) return '/placeholder-image.jpg';
//     if (imageUrl.startsWith('http')) return imageUrl;
//     return `${BASE_URL}${imageUrl}`;
//   };

//   // Fetch products from backend
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await apiClient.get('/api/products');
//         setProducts(response.data);
//       } catch (err: unknown) {
//         const error = err instanceof Error ? err : new Error('Unknown error');
//         setError(error);
//         toast.error(`Failed to load products: ${error.message}`);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // Wishlist functions (using localStorage since no backend route)
//   useEffect(() => {
//     const savedWishlist = localStorage.getItem('wishlist');
//     if (savedWishlist) {
//       setWishlist(JSON.parse(savedWishlist));
//     }
//   }, []);

//   const saveWishlist = (items: Product[]) => {
//     localStorage.setItem('wishlist', JSON.stringify(items));
//     setWishlist(items);
//   };

//   const toggleWishlist = (product: Product) => {
//     const isInWishlist = wishlist.some(item => item.id === product.id);
//     if (isInWishlist) {
//       const updatedWishlist = wishlist.filter(item => item.id !== product.id);
//       saveWishlist(updatedWishlist);
//       toast.success('Removed from wishlist');
//     } else {
//       const wishlistItem = {
//         id: product.id,
//         name: product.name,
//         price: product.price,
//         stock_quantity: product.stock_quantity,
//         image_url: product.image_url,
//         categories: product.categories,
//         type: product.categories?.name || 'No Category' // Using category as type
//       };
//       saveWishlist([...wishlist, wishlistItem]);
//       toast.success('Added to wishlist');
//     }
//   };

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
//     setQuantity(prev => prev + 1);
//   };

//   const decrementQuantity = () => {
//     setQuantity(prev => (prev > 1 ? prev - 1 : 1));
//   };

//   const handleAddToCart = (product: Product, e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (product.stock_quantity <= 0) {
//       toast.error('This product is currently out of stock.');
//     } else {
//       addToCart({
//         ...product,
//         id: product.id.toString(),
//         type: product.categories?.name || 'No Category',
//         price: parseFloat(product.price),
//         availability: product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'
//       }, 1);
//       toast.success(`${product.name} added to cart`);
//     }
//   };

//   const handleAddToCartFromDialog = () => {
//     if (!selectedProduct) return;
    
//     if (selectedProduct.stock_quantity <= 0) {
//       toast.error('This product is currently out of stock.');
//     } else {
//       addToCart({
//         ...selectedProduct,
//         id: selectedProduct.id.toString(),
//         type: selectedProduct.categories?.name || 'No Category',
//         price: parseFloat(selectedProduct.price),
//         availability: selectedProduct.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'
//       }, quantity);
//       toast.success(`${selectedProduct.name} added to cart (${quantity})`);
//       closeDialog();
//     }
//   };

//   const goToCart = () => {
//     navigate('/cart');
//   };

//   const goToShop = () => {
//     navigate('/products');
//   };

//   const renderStars = (rating: number = 4.5) => {
//     const stars = [];
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
//         </div>
//       );
//     }

//     const remainingStars = 5 - Math.ceil(rating);
//     for (let i = 0; i < remainingStars; i++) {
//       stars.push(<Star key={`empty-${i}`} size={16} className="text-gray-300" />);
//     }

//     return stars;
//   };

//   if (loading) return <div className="text-center py-10">Loading products...</div>;
//   if (error) return <div className="text-red-500 text-center py-10">Error loading products: {error.message}</div>;

//   return (
//     <div className="px-[20px] py-[50px] flex flex-col items-center justify-center sm:px-[20px] sm:py-[50px] md:px-[40px] lg:px-[100px] lg:py-[80px]">
//       <h2 className="pb-2 text-[20px] md:text-[23px] lg:text-[26px] font-montserratBold lg:pb-3">New Products</h2>
//       <p className="pb-5 text-sm md:text-[16px] lg:text-[18px] text-gray-500 text-center lg:pb-8">
//         Discover our newest smartphone collection featuring sleek designs, powerful cameras, and top models like iPhone,
//         Samsung Galaxy, and Nokia. Enjoy cutting-edge performance and innovative features that fit your lifestyle. Stay
//         connected and ahead of the curve — shop now!
//       </p>

//       <div className="flex flex-wrap justify-between gap-4 w-full">
//         {products.map((product) => {
//           const isInWishlist = wishlist.some(item => item.id === product.id);
//           const availability = product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock';
          
//           return (
//             <div
//               key={product.id}
//               className="mb-[20px] w-full sm:w-[48%] lg:w-[30%] xl:w-[23%] relative h-[400px] group"
//             >
//               <div className="relative w-full h-[300px] overflow-hidden rounded-lg">
//                 <img
//                   src={getImageUrl(product.image_url)}
//                   alt={product.name}
//                   className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
//                   onError={(e) => {
//                     e.currentTarget.src = '/placeholder-image.jpg';
//                   }}
//                 />

//                 {/* Stock Quantity Badge */}
//                 {product.stock_quantity > 0 && (
//                   <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
//                     {product.stock_quantity} in stock
//                   </div>
//                 )}

//                 <div className="absolute top-0 right-4 h-full flex items-center gap-4 flex-col justify-center transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 opacity-0 translate-y-5">
//                   <button
//                     onClick={(e) => {
//                       e.preventDefault();
//                       e.stopPropagation();
//                       toggleWishlist(product);
//                     }}
//                     className={`p-2 rounded-full shadow-md hover:scale-110 transition-transform ${
//                       isInWishlist 
//                         ? 'bg-red-500 text-white' 
//                         : 'bg-white hover:text-red-500'
//                     }`}
//                   >
//                     <Heart size={16} fill={isInWishlist ? 'currentColor' : 'none'} />
//                   </button>
//                   <button
//                     onClick={() => openDialog(product)}
//                     className="p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform hover:text-blue-500"
//                   >
//                     <Plus size={16} />
//                   </button>
//                   <button
//                     onClick={(e) => handleAddToCart(product, e)}
//                     className={`p-2 rounded-full shadow-md hover:scale-110 transition-transform ${
//                       availability === "Out of Stock" 
//                         ? "bg-gray-300 cursor-not-allowed" 
//                         : "bg-white hover:text-green-500"
//                     }`}
//                     disabled={availability === "Out of Stock"}
//                   >
//                     <ShoppingCart size={16} />
//                   </button>
//                 </div>
//               </div>

//               <div className="pt-3">
//                 <p className="text-sm lg:text-[15px] font-montserrat text-gray-600">
//                   {product.categories?.name || 'No Category'}
//                 </p>
//                 <p className="text-[16px] font-montserratBold pt-2 leading-[1.1] lg:text-[18px] group-hover:text-buttons transition-colors duration-500">
//                   {product.name}
//                 </p>
//                 <div className="flex items-center justify-between pt-2">
//                   <p className="text-sm font-montserrat text-gray-600 text-[16px]">
//                     ${parseFloat(product.price).toFixed(2)}
//                     {product.discount_percentage > 0 && (
//                       <span className="text-red-500 ml-2">-{product.discount_percentage}%</span>
//                     )}
//                   </p>
//                   <p className={`text-xs ${
//                     availability === 'In Stock' 
//                       ? 'text-green-500' 
//                       : 'text-red-500'
//                   }`}>
//                     {availability}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <div className="flex justify-center items-center mt-8">
//         <button 
//           onClick={goToShop} 
//           className="p-2 w-[110px] relative lg:w-[180px] lg:p-3 border-2 border-buttons overflow-hidden group"
//         >
//           <div className="absolute top-0 left-0 w-0 h-full bg-buttons -skew-x-[45deg] transform transition-all duration-500 ease-out group-hover:w-[calc(100%)] group-hover:-left-[30px]"></div>
//           <div className="absolute top-0 right-0 w-0 h-full bg-buttons -skew-x-[45deg] transform transition-all duration-500 ease-out group-hover:w-[calc(100%)] group-hover:-right-[30px]"></div>
//           <span className="text-[12px] lg:text-[16px] relative z-10 font-montserratBold text-buttons transition-all duration-500 ease-out group-hover:text-white group-hover:scale-110">
//             View More
//           </span>
//         </button>
//       </div>

//       {isDialogOpen && selectedProduct && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//           onClick={closeDialog}
//         >
//           <div
//             className="bg-white rounded-lg w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl max-h-[90vh] overflow-y-auto xl:overflow-hidden mx-4"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex flex-col lg:flex-row">
//               <div className="flex-1 p-6 lg:p-8">
//                 <div className="flex items-center justify-between mb-6">
//                   <div className="flex items-center gap-2">
//                     <h3 className="text-lg lg:text-xl font-montserratBold text-gray-800">More about the product</h3>
//                     <ChevronRight size={20} className="text-gray-600" />
//                   </div>
//                   <button onClick={closeDialog} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
//                     <X size={20} />
//                   </button>
//                 </div>

//                 <div className="space-y-4">
//                   <div className="flex justify-between items-center">
//                     <p className="text-sm lg:text-base font-montserrat text-gray-600">
//                       {selectedProduct.categories?.name || 'No Category'}
//                     </p>
//                     <p className={`text-xs ${
//                       selectedProduct.stock_quantity > 0 
//                         ? 'text-green-500' 
//                         : 'text-red-500'
//                     }`}>
//                       {selectedProduct.stock_quantity > 0 
//                         ? `${selectedProduct.stock_quantity} available` 
//                         : 'Out of stock'}
//                     </p>
//                   </div>
                  
//                   <h4 className="text-xl lg:text-2xl font-montserratBold text-gray-800">
//                     {selectedProduct.name}
//                   </h4>
                  
//                   <div className="flex items-center gap-2">
//                     <div className="flex items-center gap-1">{renderStars()}</div>
//                     <span className="text-sm text-gray-600">(4.5/5)</span>
//                   </div>
                  
//                   <div className="space-y-2">
//                     <h5 className="font-montserratBold text-gray-800">Description</h5>
//                     <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
//                       {selectedProduct.description || 'No description available.'}
//                     </p>
//                   </div>
                  
//                   <div className="flex items-center justify-between pt-4">
//                     <div className="flex items-center gap-4">
//                       <span className="font-montserratBold text-gray-800">Quantity:</span>
//                       <div className="flex items-center border rounded-lg border-gray-200">
//                         <button 
//                           onClick={decrementQuantity} 
//                           className="p-3 hover:bg-gray-100 transition-colors"
//                           disabled={quantity <= 1}
//                         >
//                           <Minus size={16} />
//                         </button>
//                         <span className="px-4 py-2 border-x border-gray-200 min-w-[50px] text-center text-sm">
//                           {quantity}
//                         </span>
//                         <button 
//                           onClick={incrementQuantity} 
//                           className="p-3 hover:bg-gray-100 transition-colors"
//                           disabled={quantity >= selectedProduct.stock_quantity}
//                         >
//                           <Plus size={16} />
//                         </button>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <span className="text-xl lg:text-2xl font-montserratBold text-blue-500">
//                         ${parseFloat(selectedProduct.price).toFixed(2)}
//                         {selectedProduct.discount_percentage > 0 && (
//                           <span className="text-red-500 ml-2">-{selectedProduct.discount_percentage}%</span>
//                         )}
//                       </span>
//                     </div>
//                   </div>
                  
//                   <div className="flex flex-col sm:flex-row gap-3 pt-6">
//                     <button
//                       onClick={handleAddToCartFromDialog}
//                       className={`flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg font-montserratBold hover:bg-blue-600 transition-colors ${
//                         selectedProduct.stock_quantity <= 0 ? "opacity-50 cursor-not-allowed" : ""
//                       }`}
//                       disabled={selectedProduct.stock_quantity <= 0}
//                     >
//                       Add to Cart
//                     </button>
//                     <button 
//                       className="flex-1 bg-gray-800 text-white py-3 px-6 rounded-lg font-montserratBold hover:bg-gray-700 transition-colors"
//                       onClick={goToCart}
//                     >
//                       Buy Now
//                     </button>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="lg:w-1/2 p-6 lg:p-8">
//                 <div className="w-full h-[300px] lg:h-[500px] rounded-lg overflow-hidden">
//                   <img
//                     src={getImageUrl(selectedProduct.image_url)}
//                     alt={selectedProduct.name}
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       e.currentTarget.src = '/placeholder-image.jpg';
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Newproducts;

























// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Star, Plus, Minus, ShoppingCart, ChevronRight, X, Heart } from 'lucide-react';
// import { apiClient } from '@/context/axios';
// import { useCart } from '../shop/CartContext';
// import { toast } from 'sonner';

// interface Product {
//   id: number;
//   name: string;
//   price: string;
//   stock_quantity: number;
//   image_url: string;
//   categories: { id: number; name: string } | null;
//   discount_percentage: number;
//   description?: string;
// }

// const Newproducts = () => {
//   const { addToCart } = useCart();
//   const navigate = useNavigate();
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [quantity, setQuantity] = useState(1);
//   const [wishlist, setWishlist] = useState<number[]>([]); // Store just product IDs
//   const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://dimpo-pbackend.onrender.com';

//   // Normalize image URL
//   const getImageUrl = (imageUrl: string) => {
//     if (!imageUrl) return '/placeholder-image.jpg';
//     if (imageUrl.startsWith('http')) return imageUrl;
//     return `${BASE_URL}${imageUrl}`;
//   };

//   // Fetch products from backend
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await apiClient.get('/api/products');
//         setProducts(response.data);
        
//         // Load wishlist from localStorage
//         const savedWishlist = localStorage.getItem('wishlist');
//         if (savedWishlist) {
//           setWishlist(JSON.parse(savedWishlist));
//         }
//       } catch (err: unknown) {
//         const error = err instanceof Error ? err : new Error('Unknown error');
//         setError(error);
//         toast.error(`Failed to load products: ${error.message}`);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // Toggle product in wishlist
//   const toggleWishlist = (productId: number) => {
//     const newWishlist = wishlist.includes(productId)
//       ? wishlist.filter(id => id !== productId)
//       : [...wishlist, productId];
    
//     setWishlist(newWishlist);
//     localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    
//     toast.success(
//       wishlist.includes(productId) 
//         ? 'Removed from wishlist' 
//         : 'Added to wishlist'
//     );
//   };

//   // Rest of your existing functions (openDialog, closeDialog, etc.)
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
//     setQuantity(prev => prev + 1);
//   };

//   const decrementQuantity = () => {
//     setQuantity(prev => (prev > 1 ? prev - 1 : 1));
//   };

//   const handleAddToCart = (product: Product, e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (product.stock_quantity <= 0) {
//       toast.error('This product is currently out of stock.');
//     } else {
//       addToCart({
//         ...product,
//         id: product.id.toString(),
//         type: product.name,
//         price: parseFloat(product.price),
//         availability: product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'
//       }, 1);
//       toast.success(`${product.name} added to cart`);
//     }
//   };

//   const handleAddToCartFromDialog = () => {
//     if (!selectedProduct) return;
    
//     if (selectedProduct.stock_quantity <= 0) {
//       toast.error('This product is currently out of stock.');
//     } else {
//       addToCart({
//         ...selectedProduct,
//         id: selectedProduct.id.toString(),
//         type: selectedProduct.name,
//         price: parseFloat(selectedProduct.price),
//         availability: selectedProduct.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'
//       }, quantity);
//       toast.success(`${selectedProduct.name} added to cart (${quantity})`);
//       closeDialog();
//     }
//   };

//   const goToCart = () => {
//     navigate('/cart');
//   };

//   const goToShop = () => {
//     navigate('/products');
//   };

//   const renderStars = (rating: number = 4.5) => {
//     const stars = [];
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
//         </div>
//       );
//     }

//     const remainingStars = 5 - Math.ceil(rating);
//     for (let i = 0; i < remainingStars; i++) {
//       stars.push(<Star key={`empty-${i}`} size={16} className="text-gray-300" />);
//     }

//     return stars;
//   };

//   if (loading) return <div className="text-center py-10">Loading products...</div>;
//   if (error) return <div className="text-red-500 text-center py-10">Error loading products: {error.message}</div>;

//   return (
//     <div className="px-[20px] py-[50px] flex flex-col items-center justify-center sm:px-[20px] sm:py-[50px] md:px-[40px] lg:px-[100px] lg:py-[80px]">
//       <h2 className="pb-2 text-[20px] md:text-[23px] lg:text-[26px] font-montserratBold lg:pb-3">New Products</h2>
//       <p className="pb-5 text-sm md:text-[16px] lg:text-[18px] text-gray-500 text-center lg:pb-8">
//         Discover our newest smartphone collection featuring sleek designs, powerful cameras, and top models like iPhone,
//         Samsung Galaxy, and Nokia. Enjoy cutting-edge performance and innovative features that fit your lifestyle. Stay
//         connected and ahead of the curve — shop now!
//       </p>

//       <div className="flex flex-wrap justify-between gap-4 w-full">
//         {products.map((product) => {
//           const isInWishlist = wishlist.includes(product.id);
//           const availability = product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock';
          
//           return (
//             <div
//               key={product.id}
//               className="mb-[20px] w-full sm:w-[48%] lg:w-[30%] xl:w-[23%] relative h-[400px] group"
//             >
//               <div className="relative w-full h-[300px] overflow-hidden rounded-lg">
//                 <img
//                   src={getImageUrl(product.image_url)}
//                   alt={product.name}
//                   className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
//                   onError={(e) => {
//                     e.currentTarget.src = '/placeholder-image.jpg';
//                   }}
//                 />

//                 {/* Stock Quantity Badge */}
//                 {product.stock_quantity > 0 && (
//                   <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
//                     {product.stock_quantity} in stock
//                   </div>
//                 )}

//                 <div className="absolute top-0 right-4 h-full flex items-center gap-4 flex-col justify-center transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 opacity-0 translate-y-5">
//                   <button
//                     onClick={(e) => {
//                       e.preventDefault();
//                       e.stopPropagation();
//                       toggleWishlist(product.id);
//                     }}
//                     className={`p-2 rounded-full shadow-md hover:scale-110 transition-transform ${
//                       isInWishlist 
//                         ? 'bg-red-500 text-white' 
//                         : 'bg-white hover:text-red-500'
//                     }`}
//                   >
//                     <Heart size={16} fill={isInWishlist ? 'currentColor' : 'none'} />
//                   </button>
//                   <button
//                     onClick={() => openDialog(product)}
//                     className="p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform hover:text-blue-500"
//                   >
//                     <Plus size={16} />
//                   </button>
//                   <button
//                     onClick={(e) => handleAddToCart(product, e)}
//                     className={`p-2 rounded-full shadow-md hover:scale-110 transition-transform ${
//                       availability === "Out of Stock" 
//                         ? "bg-gray-300 cursor-not-allowed" 
//                         : "bg-white hover:text-green-500"
//                     }`}
//                     disabled={availability === "Out of Stock"}
//                   >
//                     <ShoppingCart size={16} />
//                   </button>
//                 </div>
//               </div>

//               <div className="pt-3">
//                 <p className="text-sm lg:text-[15px] font-montserrat text-gray-600">
//                   {product.categories?.name || 'No Category'}
//                 </p>
//                 <p className="text-[16px] font-montserratBold pt-2 leading-[1.1] lg:text-[18px] group-hover:text-buttons transition-colors duration-500">
//                   {product.name}
//                 </p>
//                 <div className="flex items-center justify-between pt-2">
//                   <p className="text-sm font-montserrat text-gray-600 text-[16px]">
//                     ${parseFloat(product.price).toFixed(2)}
//                     {product.discount_percentage > 0 && (
//                       <span className="text-red-500 ml-2">-{product.discount_percentage}%</span>
//                     )}
//                   </p>
//                   <p className={`text-xs ${
//                     availability === 'In Stock' 
//                       ? 'text-green-500' 
//                       : 'text-red-500'
//                   }`}>
//                     {availability}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <div className="flex justify-center items-center mt-8">
//         <button 
//           onClick={goToShop} 
//           className="p-2 w-[110px] relative lg:w-[180px] lg:p-3 border-2 border-buttons overflow-hidden group"
//         >
//           <div className="absolute top-0 left-0 w-0 h-full bg-buttons -skew-x-[45deg] transform transition-all duration-500 ease-out group-hover:w-[calc(100%)] group-hover:-left-[30px]"></div>
//           <div className="absolute top-0 right-0 w-0 h-full bg-buttons -skew-x-[45deg] transform transition-all duration-500 ease-out group-hover:w-[calc(100%)] group-hover:-right-[30px]"></div>
//           <span className="text-[12px] lg:text-[16px] relative z-10 font-montserratBold text-buttons transition-all duration-500 ease-out group-hover:text-white group-hover:scale-110">
//             View More
//           </span>
//         </button>
//       </div>

//       {/* Product dialog remains the same as your original */}
//       {isDialogOpen && selectedProduct && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//           onClick={closeDialog}
//         >
//           <div
//             className="bg-white rounded-lg w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl max-h-[90vh] overflow-y-auto xl:overflow-hidden mx-4"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex flex-col lg:flex-row">
//               <div className="flex-1 p-6 lg:p-8">
//                 {/* Dialog content remains the same */}
//               </div>
//               <div className="lg:w-1/2 p-6 lg:p-8">
//                 <div className="w-full h-[300px] lg:h-[500px] rounded-lg overflow-hidden">
//                   <img
//                     src={getImageUrl(selectedProduct.image_url)}
//                     alt={selectedProduct.name}
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       e.currentTarget.src = '/placeholder-image.jpg';
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Newproducts;






// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Star, Plus, ShoppingCart, Heart } from 'lucide-react';
// import { apiClient } from '@/context/axios';
// import { useCart } from '../shop/CartContext';
// import { toast } from 'sonner';

// interface Product {
//   id: number;
//   name: string;
//   price: string;
//   stock_quantity: number;
//   image_url: string;
//   categories: { id: number; name: string } | null;
//   discount_percentage: number;
//   description?: string;
// }

// const Newproducts = () => {
//   const { addToCart } = useCart();
//   const navigate = useNavigate();
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [quantity, setQuantity] = useState(1);

//   // Wishlist now stores full Product objects
//   const [wishlist, setWishlist] = useState<Product[]>([]);

//   const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://dimpo-pbackend.onrender.com';

//   const getImageUrl = (imageUrl: string) => {
//     if (!imageUrl) return '/placeholder-image.jpg';
//     if (imageUrl.startsWith('http')) return imageUrl;
//     return `${BASE_URL}${imageUrl}`;
//   };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await apiClient.get('/api/products');
//         setProducts(response.data);

//         // Load wishlist from localStorage (full products)
//         const savedWishlist = localStorage.getItem('wishlist');
//         if (savedWishlist) {
//           setWishlist(JSON.parse(savedWishlist));
//         }
//       } catch (err: unknown) {
//         const error = err instanceof Error ? err : new Error('Unknown error');
//         setError(error);
//         toast.error(`Failed to load products: ${error.message}`);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const toggleWishlist = (product: Product) => {
//     const isInWishlist = wishlist.some(item => item.id === product.id);

//     let newWishlist;
//     if (isInWishlist) {
//       newWishlist = wishlist.filter(item => item.id !== product.id);
//       toast.success('Removed from wishlist');
//     } else {
//       newWishlist = [...wishlist, product];
//       toast.success('Added to wishlist');
//     }

//     setWishlist(newWishlist);
//     localStorage.setItem('wishlist', JSON.stringify(newWishlist));
//   };

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
//     setQuantity(prev => prev + 1);
//   };

//   const decrementQuantity = () => {
//     setQuantity(prev => (prev > 1 ? prev - 1 : 1));
//   };

//   const handleAddToCart = (product: Product, e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (product.stock_quantity <= 0) {
//       toast.error('This product is currently out of stock.');
//     } else {
//       addToCart({
//         ...product,
//         id: product.id.toString(),
//         type: product.name,
//         price: parseFloat(product.price),
//         availability: product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'
//       }, 1);
//       toast.success(`${product.name} added to cart`);
//     }
//   };

//   const handleAddToCartFromDialog = () => {
//     if (!selectedProduct) return;

//     if (selectedProduct.stock_quantity <= 0) {
//       toast.error('This product is currently out of stock.');
//     } else {
//       addToCart({
//         ...selectedProduct,
//         id: selectedProduct.id.toString(),
//         type: selectedProduct.name,
//         price: parseFloat(selectedProduct.price),
//         availability: selectedProduct.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'
//       }, quantity);
//       toast.success(`${selectedProduct.name} added to cart (${quantity})`);
//       closeDialog();
//     }
//   };

//   const goToShop = () => {
//     navigate('/products');
//   };

//   if (loading) return <div className="text-center py-10">Loading products...</div>;
//   if (error) return <div className="text-red-500 text-center py-10">Error loading products: {error.message}</div>;

//   return (
//     <div className="px-[20px] py-[50px] flex flex-col items-center justify-center sm:px-[20px] sm:py-[50px] md:px-[40px] lg:px-[100px] lg:py-[80px]">
//       <h2 className="pb-2 text-[20px] md:text-[23px] lg:text-[26px] font-montserratBold lg:pb-3">New Products</h2>
//       <p className="pb-5 text-sm md:text-[16px] lg:text-[18px] text-gray-500 text-center lg:pb-8">
//         Discover our newest smartphone collection featuring sleek designs, powerful cameras, and top models like iPhone,
//         Samsung Galaxy, and Nokia. Enjoy cutting-edge performance and innovative features that fit your lifestyle. Stay
//         connected and ahead of the curve — shop now!
//       </p>

//       <div className="flex flex-wrap justify-between gap-4 w-full">
//         {products.map((product) => {
//           const isInWishlist = wishlist.some(item => item.id === product.id);
//           const availability = product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock';

//           return (
//             <div
//               key={product.id}
//               className="mb-[20px] w-full sm:w-[48%] lg:w-[30%] xl:w-[23%] relative h-[400px] group"
//             >
//               <div className="relative w-full h-[300px] overflow-hidden rounded-lg">
//                 <img
//                   src={getImageUrl(product.image_url)}
//                   alt={product.name}
//                   className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
//                   onError={(e) => {
//                     e.currentTarget.src = '/placeholder-image.jpg';
//                   }}
//                 />

//                 {product.stock_quantity > 0 && (
//                   <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
//                     {product.stock_quantity} in stock
//                   </div>
//                 )}

//                 <div className="absolute top-0 right-4 h-full flex items-center gap-4 flex-col justify-center transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 opacity-0 translate-y-5">
//                   <button
//                     onClick={(e) => {
//                       e.preventDefault();
//                       e.stopPropagation();
//                       toggleWishlist(product);
//                     }}
//                     className={`p-2 rounded-full shadow-md hover:scale-110 transition-transform ${
//                       isInWishlist 
//                         ? 'bg-red-500 text-white' 
//                         : 'bg-white hover:text-red-500'
//                     }`}
//                   >
//                     <Heart size={16} fill={isInWishlist ? 'currentColor' : 'none'} />
//                   </button>
//                   <button
//                     onClick={() => openDialog(product)}
//                     className="p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform hover:text-blue-500"
//                   >
//                     <Plus size={16} />
//                   </button>
//                   <button
//                     onClick={(e) => handleAddToCart(product, e)}
//                     className={`p-2 rounded-full shadow-md hover:scale-110 transition-transform ${
//                       availability === "Out of Stock" 
//                         ? "bg-gray-300 cursor-not-allowed" 
//                         : "bg-white hover:text-green-500"
//                     }`}
//                     disabled={availability === "Out of Stock"}
//                   >
//                     <ShoppingCart size={16} />
//                   </button>
//                 </div>
//               </div>

//               <div className="pt-3">
//                 <p className="text-sm lg:text-[15px] font-montserrat text-gray-600">
//                   {product.categories?.name || 'No Category'}
//                 </p>
//                 <p className="text-[16px] font-montserratBold pt-2 leading-[1.1] lg:text-[18px] group-hover:text-buttons transition-colors duration-500">
//                   {product.name}
//                 </p>
//                 <div className="flex items-center justify-between pt-2">
//                   <p className="text-sm font-montserrat text-gray-600 text-[16px]">
//                     ${parseFloat(product.price).toFixed(2)}
//                     {product.discount_percentage > 0 && (
//                       <span className="text-red-500 ml-2">-{product.discount_percentage}%</span>
//                     )}
//                   </p>
//                   <p className={`text-xs ${
//                     availability === 'In Stock' 
//                       ? 'text-green-500' 
//                       : 'text-red-500'
//                   }`}>
//                     {availability}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <div className="flex justify-center items-center mt-8">
//         <button 
//           onClick={goToShop} 
//           className="p-2 w-[110px] relative lg:w-[180px] lg:p-3 border-2 border-buttons overflow-hidden group"
//         >
//           <div className="absolute top-0 left-0 w-0 h-full bg-buttons -skew-x-[45deg] transform transition-all duration-500 ease-out group-hover:w-[calc(100%)] group-hover:-left-[30px]"></div>
//           <div className="absolute top-0 right-0 w-0 h-full bg-buttons -skew-x-[45deg] transform transition-all duration-500 ease-out group-hover:w-[calc(100%)] group-hover:-right-[30px]"></div>
//           <span className="text-[12px] lg:text-[16px] relative z-10 font-montserratBold text-buttons transition-all duration-500 ease-out group-hover:text-white group-hover:scale-110">
//             View More
//           </span>
//         </button>
//       </div>

//       {/* Product dialog code unchanged */}
//       {isDialogOpen && selectedProduct && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//           onClick={closeDialog}
//         >
//           <div
//             className="bg-white rounded-lg w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl max-h-[90vh] overflow-y-auto xl:overflow-hidden mx-4"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex flex-col lg:flex-row">
//               <div className="flex-1 p-6 lg:p-8">
//                 {/* Add any dialog content here if needed */}
//               </div>
//               <div className="lg:w-1/2 p-6 lg:p-8">
//                 <div className="w-full h-[300px] lg:h-[500px] rounded-lg overflow-hidden">
//                   <img
//                     src={getImageUrl(selectedProduct.image_url)}
//                     alt={selectedProduct.name}
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       e.currentTarget.src = '/placeholder-image.jpg';
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Newproducts;








import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Plus, ShoppingCart, Heart, ChevronRight, X, Minus, Check } from 'lucide-react';
import { apiClient } from '@/context/axios';
import { useCart } from '../shop/CartContext';

interface Product {
  id: number;
  name: string;
  price: string;
  stock_quantity: number;
  image_url: string;
  categories: { id: number; name: string } | null;
  discount_percentage: number;
  description?: string;
  rating?: number;
}

interface Toast {
  id: number;
  message: string;
  type: string;
  timestamp: string;
}

const Newproducts = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [toastIdCounter, setToastIdCounter] = useState(0);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://dimpo-pbackend.onrender.com';

  const getImageUrl = (imageUrl: string) => {
    if (!imageUrl) return '/placeholder-image.jpg';
    if (imageUrl.startsWith('http')) return imageUrl;
    return `${BASE_URL}${imageUrl}`;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get('/api/products');
        // Add default rating if not provided
        const productsWithRating = response.data.map((product: Product) => ({
          ...product,
          rating: product.rating || 4.5
        }));
        setProducts(productsWithRating);

        // Load wishlist from localStorage
        const savedWishlist = localStorage.getItem('wishlist');
        if (savedWishlist) {
          setWishlist(JSON.parse(savedWishlist));
        }
      } catch (err: unknown) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        showToast(`Failed to load products: ${error.message}`, 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Toast functions
  const formatTimestamp = (): string => {
    const now = new Date();
    return `${now.getDate().toString().padStart(2, "0")}/${(now.getMonth() + 1).toString().padStart(2, "0")}/${now.getFullYear()} ${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
  };

  const showToast = (message: string, type: string = "success") => {
    const id = toastIdCounter;
    setToastIdCounter(prev => prev + 1);
    const timestamp = formatTimestamp();
    const newToast = { id, message, type, timestamp };
    setToasts(prev => [...prev, newToast]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 5000);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Wishlist functions
  const toggleWishlist = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const isInWishlist = wishlist.some(item => item.id === product.id);
    let newWishlist;

    if (isInWishlist) {
      newWishlist = wishlist.filter(item => item.id !== product.id);
      showToast('Removed from wishlist');
    } else {
      newWishlist = [...wishlist, product];
      showToast('Added to wishlist');
    }

    setWishlist(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
  };

  // Product dialog functions
  const openDialog = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
    setQuantity(1);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedProduct(null);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  // Cart functions
  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock_quantity <= 0) {
      showToast('This product is currently out of stock.', 'error');
    } else {
      addToCart({
        ...product,
        id: product.id.toString(),
        type: product.name,
        price: parseFloat(product.price),
        availability: product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'
      }, 1);
      showToast(`${product.name} added to cart`);
    }
  };

  const handleAddToCartFromDialog = () => {
    if (!selectedProduct) return;
    
    if (selectedProduct.stock_quantity <= 0) {
      showToast('This product is currently out of stock.', 'error');
    } else {
      addToCart({
        ...selectedProduct,
        id: selectedProduct.id.toString(),
        type: selectedProduct.name,
        price: parseFloat(selectedProduct.price),
        availability: selectedProduct.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'
      }, quantity);
      showToast(`${selectedProduct.name} added to cart (${quantity})`);
      closeDialog();
    }
  };

  const goToCart = () => navigate('/cart');
  const goToShop = () => navigate('/products');

  // Star rating renderer
  const renderStars = (rating: number = 4.5) => {
    const stars = [];
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
        </div>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={16} className="text-gray-300" />);
    }

    return stars;
  };

  if (loading) return <div className="text-center py-10">Loading products...</div>;
  if (error) return <div className="text-red-500 text-center py-10">Error loading products: {error.message}</div>;

  return (
    <div className="px-[20px] py-[50px] flex flex-col items-center justify-center sm:px-[20px] sm:py-[50px] md:px-[40px] lg:px-[100px] lg:py-[80px]">
      <h2 className="pb-2 text-[20px] md:text-[23px] lg:text-[26px] font-montserratBold lg:pb-3">New Products</h2>
      <p className="pb-5 text-sm md:text-[16px] lg:text-[18px] text-gray-500 text-center lg:pb-8">
        Discover our newest smartphone collection featuring sleek designs, powerful cameras, and top models like iPhone,
        Samsung Galaxy, and Nokia. Enjoy cutting-edge performance and innovative features that fit your lifestyle. Stay
        connected and ahead of the curve — shop now!
      </p>

      <div className="flex flex-wrap justify-between gap-4 w-full">
        {products.map((product) => {
          const isInWishlist = wishlist.some(item => item.id === product.id);
          const availability = product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock';

          return (
            <div
              key={product.id}
              className="mb-[20px] w-full sm:w-[48%] lg:w-[30%] xl:w-[23%] relative h-[400px] group"
            >
              <div className="relative w-full h-[300px] overflow-hidden rounded-lg">
                <img
                  src={getImageUrl(product.image_url)}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-image.jpg';
                  }}
                />

                {product.stock_quantity > 0 && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                    {product.stock_quantity} in stock
                  </div>
                )}

                <div className="absolute top-0 right-4 h-full flex items-center gap-4 flex-col justify-center transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 opacity-0 translate-y-5">
                  <button
                    onClick={(e) => toggleWishlist(product, e)}
                    className={`p-2 rounded-full shadow-md hover:scale-110 transition-transform ${
                      isInWishlist 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white hover:text-red-500'
                    }`}
                  >
                    <Heart size={16} fill={isInWishlist ? 'currentColor' : 'none'} />
                  </button>
                  <button
                    onClick={() => openDialog(product)}
                    className="p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform hover:text-blue-500"
                  >
                    <Plus size={16} />
                  </button>
                  <button
                    onClick={(e) => handleAddToCart(product, e)}
                    className={`p-2 rounded-full shadow-md hover:scale-110 transition-transform ${
                      availability === "Out of Stock" 
                        ? "bg-gray-300 cursor-not-allowed" 
                        : "bg-white hover:text-green-500"
                    }`}
                    disabled={availability === "Out of Stock"}
                  >
                    <ShoppingCart size={16} />
                  </button>
                </div>
              </div>

              <div className="pt-3">
                <p className="text-sm lg:text-[15px] font-montserrat text-gray-600">
                  {product.categories?.name || 'No Category'}
                </p>
                <p className="text-[16px] font-montserratBold pt-2 leading-[1.1] lg:text-[18px] group-hover:text-buttons transition-colors duration-500">
                  {product.name}
                </p>
                <div className="flex items-center justify-between pt-2">
                  <p className="text-sm font-montserrat text-gray-600 text-[16px]">
                    ${parseFloat(product.price).toFixed(2)}
                    {product.discount_percentage > 0 && (
                      <span className="text-red-500 ml-2">-{product.discount_percentage}%</span>
                    )}
                  </p>
                  <div className="flex items-center gap-1">
                    {renderStars(product.rating)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center items-center mt-8">
        <button 
          onClick={goToShop} 
          className="p-2 w-[110px] relative lg:w-[180px] lg:p-3 border-2 border-buttons overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-0 h-full bg-buttons -skew-x-[45deg] transform transition-all duration-500 ease-out group-hover:w-[calc(100%)] group-hover:-left-[30px]"></div>
          <div className="absolute top-0 right-0 w-0 h-full bg-buttons -skew-x-[45deg] transform transition-all duration-500 ease-out group-hover:w-[calc(100%)] group-hover:-right-[30px]"></div>
          <span className="text-[12px] lg:text-[16px] relative z-10 font-montserratBold text-buttons transition-all duration-500 ease-out group-hover:text-white group-hover:scale-110">
            View More
          </span>
        </button>
      </div>

      {/* Product Details Dialog */}
      {isDialogOpen && selectedProduct && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={closeDialog}
        >
          <div
            className="bg-white rounded-lg w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl max-h-[90vh] overflow-y-auto xl:overflow-hidden mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col lg:flex-row">
              <div className="flex-1 p-6 lg:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg lg:text-xl font-montserratBold text-gray-800">More about the product</h3>
                    <ChevronRight size={20} className="text-gray-600" />
                  </div>
                  <button onClick={closeDialog} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <p className="text-sm lg:text-base font-montserrat text-gray-600">
                    {selectedProduct.categories?.name || 'No Category'}
                  </p>
                  <h4 className="text-xl lg:text-2xl font-montserratBold text-gray-800">{selectedProduct.name}</h4>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">{renderStars(selectedProduct.rating)}</div>
                    <span className="text-sm text-gray-600">({selectedProduct.rating || 4.5}/5)</span>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-montserratBold text-gray-800">Description</h5>
                    <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                      {selectedProduct.description || 'No description available.'}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center gap-4">
                      <span className="font-montserratBold text-gray-800">Quantity:</span>
                      <div className="flex items-center border rounded-lg border-gray-200">
                        <button onClick={decrementQuantity} className="p-3 hover:bg-gray-100 transition-colors">
                          <Minus size={16} />
                        </button>
                        <span className="px-4 py-2 border-x border-gray-200 min-w-[50px] text-center text-sm">
                          {quantity}
                        </span>
                        <button onClick={incrementQuantity} className="p-3 hover:bg-gray-100 transition-colors">
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xl lg:text-2xl font-montserratBold text-blue-500">
                        ${parseFloat(selectedProduct.price).toFixed(2)}
                        {selectedProduct.discount_percentage > 0 && (
                          <span className="text-red-500 ml-2 text-sm">-{selectedProduct.discount_percentage}%</span>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 pt-6">
                    <button
                      onClick={handleAddToCartFromDialog}
                      className={`flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg font-montserratBold hover:bg-blue-600 transition-colors ${
                        selectedProduct.stock_quantity <= 0 ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={selectedProduct.stock_quantity <= 0}
                    >
                      Add to Cart
                    </button>
                    <button className="flex-1 bg-gray-800 text-white py-3 px-6 rounded-lg font-montserratBold hover:bg-gray-700 transition-colors">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 p-6 lg:p-8">
                <div className="w-full h-[300px] lg:h-[500px] rounded-lg overflow-hidden">
                  <img
                    src={getImageUrl(selectedProduct.image_url)}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-image.jpg';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-[1000] space-y-4 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-[300px] max-w-[400px] pointer-events-auto transform transition-all duration-300 ease-out opacity-100 translate-x-0 toast"
          >
            <div className="flex items-start gap-3">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                toast.type === 'error' ? 'bg-red-100' : 'bg-green-100'
              }`}>
                <Check size={16} className={toast.type === 'error' ? 'text-red-600' : 'text-green-600'} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-montserratBold text-gray-900 mb-1">{toast.message}</p>
                <p className="text-xs text-gray-500 font-montserrat">{toast.timestamp}</p>
                {toast.message.includes("added to cart") && (
                  <button
                    onClick={goToCart}
                    className="text-xs text-blue-600 hover:text-blue-800 font-montserratBold mt-1"
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
          .font-montserrat {
            font-family: 'Montserrat', sans-serif;
            font-weight: 400;
          }
          .font-montserratBold {
            font-family: 'Montserrat', sans-serif;
            font-weight: 700;
          }
        `}
      </style>
    </div>
  );
};

export default Newproducts;