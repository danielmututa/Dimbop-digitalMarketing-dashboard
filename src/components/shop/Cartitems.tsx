
// import { useState } from "react";
// import { useCart } from "./CartContext";
// import { Minus, Plus, ArrowLeft, ChevronDown } from "lucide-react";
// import { useNavigate } from "react-router-dom";


// interface ShippingOption {
//   name: string;
//   price: number;
// }

// const Cartitems = () => {
//   const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
//   const [promoCode, setPromoCode] = useState<string>("");
//   const [shippingOption, setShippingOption] = useState<keyof typeof shippingOptions>("standard");
//   const [isShippingOpen, setIsShippingOpen] = useState<boolean>(false);
//   const navigate = useNavigate();

//   const shippingOptions: Record<string, ShippingOption> = {
//     standard: { name: "Standard Delivery", price: 5.0 },
//     express: { name: "Express Delivery", price: 15.0 },
//     overnight: { name: "Overnight Delivery", price: 25.0 },
//   };

//   const subtotal = getCartTotal();
//   const shippingCost = shippingOptions[shippingOption].price;
//   const totalCost = subtotal + shippingCost;

//   const handleQuantityChange = (productId: string | number, change: number) => {
//     const item = cartItems.find((item) => item.id === productId);
//     if (item) {
//       updateQuantity(productId, item.quantity + change);
//     }
//   };

//   const formatPrice = (price: number | string): string => {
//     const numPrice = typeof price === "string" 
//       ? Number.parseFloat(price.replace(/[^0-9.]/g, "")) 
//       : price;
//     return numPrice.toFixed(2);
//   };

//   if (cartItems.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 pt-20 px-4">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center py-16">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
//             <p className="text-gray-600 mb-8">Add some products to get started!</p>
//             <button
//               onClick={() => navigate("/shop")}
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
//             >
//               Continue Shopping
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 pt-20 px-4">
//       <div className="max-w-6xl mx-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Cart Items Section */}
//           <div className="lg:col-span-2 bg-white rounded-lg p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h1 className="text-2xl font-bold text-gray-800">Shopping Cart</h1>
//               <span className="text-lg text-gray-600">{cartItems.length} Items</span>
//             </div>

//             {/* Cart Items Header */}
//             <div className="relative overflow-x-auto">
//               <div className="min-w-[600px]">
//                 <div className="grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 text-sm font-semibold text-gray-600 uppercase tracking-wide">
//                   <div className="col-span-6">Product Details</div>
//                   <div className="col-span-2 text-center">Quantity</div>
//                   <div className="col-span-2 text-center">Price</div>
//                   <div className="col-span-2 text-center">Total</div>
//                 </div>

//                 {/* Cart Items */}
//                 <div className="space-y-6 mt-6">
//                   {cartItems.map((item) => {
//                     const itemPrice =
//                       typeof item.price === "string" 
//                         ? Number.parseFloat(item.price.replace(/[^0-9.]/g, "")) 
//                         : item.price;
//                     const itemTotal = itemPrice * item.quantity;

//                     return (
//                       <div key={item.id} className="grid grid-cols-12 gap-4 items-center py-4 border-b border-gray-100">
//                         {/* Product Details */}
//                         <div className="col-span-6 flex items-center space-x-4">
//                           <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
//                             <img
//                               src={(() => {
//                                 try {
//                                   return require("../Images/" + item.img) || "/placeholder.svg";
//                                 } catch (e) {
//                                   return "/placeholder.svg?height=80&width=80";
//                                 }
//                               })()}
//                               alt={item.type}
//                               className="w-full h-full object-cover"
//                             />
//                           </div>
//                           <div className="flex-1 min-w-0">
//                             <h3 className="font-semibold text-gray-800 truncate">{item.type}</h3>
//                             <p className="text-sm text-gray-500 mt-1">{item.name}</p>
//                             <button
//                               onClick={() => removeFromCart(item.id)}
//                               className="text-sm text-red-500 hover:text-red-700 mt-2 font-medium"
//                             >
//                               Remove
//                             </button>
//                           </div>
//                         </div>

//                         {/* Quantity */}
//                         <div className="col-span-2 flex items-center justify-center">
//                           <div className="flex items-center border border-gray-300 rounded-lg">
//                             <button
//                               onClick={() => handleQuantityChange(item.id, -1)}
//                               className="p-2 hover:bg-gray-100 transition-colors"
//                               disabled={item.quantity <= 1}
//                             >
//                               <Minus size={16} className={item.quantity <= 1 ? "text-gray-300" : "text-gray-600"} />
//                             </button>
//                             <span className="px-4 py-2 border-x border-gray-300 min-w-[50px] text-center font-medium">
//                               {item.quantity}
//                             </span>
//                             <button
//                               onClick={() => handleQuantityChange(item.id, 1)}
//                               className="p-2 hover:bg-gray-100 transition-colors"
//                             >
//                               <Plus size={16} className="text-gray-600" />
//                             </button>
//                           </div>
//                         </div>

//                         {/* Price */}
//                         <div className="col-span-2 text-center">
//                           <span className="font-semibold text-gray-800">£{formatPrice(itemPrice)}</span>
//                         </div>

//                         {/* Total */}
//                         <div className="col-span-2 text-center">
//                           <span className="font-semibold text-gray-800">£{itemTotal.toFixed(2)}</span>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>

//             {/* Continue Shopping */}
//             <div className="mt-8 pt-6 border-t border-gray-200">
//               <button
//                 onClick={() => navigate("/shop")}
//                 className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
//               >
//                 <ArrowLeft size={20} className="mr-2" />
//                 Continue Shopping
//               </button>
//             </div>
//           </div>

//           {/* Order Summary Section */}
//           <div className="bg-white rounded-lg p-6 h-fit">
//             <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

//             {/* Items Summary */}
//             <div className="space-y-3 mb-6">
//               <div className="flex justify-between text-gray-600">
//                 <span>ITEMS {cartItems.length}</span>
//                 <span>£{subtotal.toFixed(2)}</span>
//               </div>
//             </div>

//             {/* Shipping Options */}
//             <div className="mb-6">
//               <h3 className="font-semibold text-gray-800 mb-3">SHIPPING</h3>
//               <div className="relative">
//                 <button
//                   onClick={() => setIsShippingOpen(!isShippingOpen)}
//                   className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
//                 >
//                   <span className="text-gray-700">
//                     {shippingOptions[shippingOption].name} - £{shippingOptions[shippingOption].price.toFixed(2)}
//                   </span>
//                   <ChevronDown
//                     size={20}
//                     className={`text-gray-500 transition-transform ${isShippingOpen ? "rotate-180" : ""}`}
//                   />
//                 </button>

//                 {isShippingOpen && (
//                   <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
//                     {Object.entries(shippingOptions).map(([key, option]) => (
//                       <button
//                         key={key}
//                         onClick={() => {
//                           setShippingOption(key as keyof typeof shippingOptions);
//                           setIsShippingOpen(false);
//                         }}
//                         className="w-full text-left p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
//                       >
//                         <div className="flex justify-between">
//                           <span className="text-gray-700">{option.name}</span>
//                           <span className="text-gray-600">£{option.price.toFixed(2)}</span>
//                         </div>
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Promo Code */}
//             <div className="mb-6">
//               <h3 className="font-semibold text-gray-800 mb-3">PROMO CODE</h3>
//               <div className="flex space-x-2">
//                 <input
//                   type="text"
//                   placeholder="Enter your code"
//                   value={promoCode}
//                   onChange={(e) => setPromoCode(e.target.value)}
//                   className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//                 <button className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors">
//                   APPLY
//                 </button>
//               </div>
//             </div>

//             {/* Total Cost */}
//             <div className="border-t border-gray-200 pt-4 mb-6">
//               <div className="flex justify-between text-lg font-bold text-gray-800">
//                 <span>TOTAL COST</span>
//                 <span>£{totalCost.toFixed(2)}</span>
//               </div>
//             </div>

//             {/* Checkout Button */}
//             <button 
//               onClick={() => navigate("/bill")}
//               className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
//             >
//               CHECKOUT
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cartitems;




// // CartItems.tsx
// import { useState } from "react";
// import { useCart } from "./CartContext";
// import { Minus, Plus, ArrowLeft, ChevronDown } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// interface ShippingOption {
//   name: string;
//   price: number;
// }

// const CartItems = () => {
//   const { cartItems, updateQuantity, removeFromCart, getCartTotal, loading } = useCart();
//   const [promoCode, setPromoCode] = useState<string>("");
//   const [shippingOption, setShippingOption] = useState<keyof typeof shippingOptions>("standard");
//   const [isShippingOpen, setIsShippingOpen] = useState<boolean>(false);
//   const navigate = useNavigate();

//   const shippingOptions: Record<string, ShippingOption> = {
//     standard: { name: "Standard Delivery", price: 5.0 },
//     express: { name: "Express Delivery", price: 15.0 },
//     overnight: { name: "Overnight Delivery", price: 25.0 },
//   };

//   const subtotal = getCartTotal();
//   const shippingCost = shippingOptions[shippingOption].price;
//   const totalCost = subtotal + shippingCost;

//   const handleQuantityChange = (productId: string | number, change: number) => {
//     const item = cartItems.find((item) => item.id === productId);
//     if (item) {
//       updateQuantity(productId, item.quantity + change);
//     }
//   };

//   const formatPrice = (price: number | string): string => {
//     const numPrice = typeof price === "string" 
//       ? Number.parseFloat(price.replace(/[^0-9.]/g, "")) 
//       : price;
//     return numPrice.toFixed(2);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 pt-20 px-4">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center py-16">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">Loading cart...</h2>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (cartItems.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 pt-20 px-4">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center py-16">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
//             <p className="text-gray-600 mb-8">Add some products to get started!</p>
//             <button
//               onClick={() => navigate("/shop")}
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
//             >
//               Continue Shopping
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 pt-20 px-4">
//       <div className="max-w-6xl mx-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Cart Items Section */}
//           <div className="lg:col-span-2 bg-white rounded-lg p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h1 className="text-2xl font-bold text-gray-800">Shopping Cart</h1>
//               <span className="text-lg text-gray-600">{cartItems.length} Items</span>
//             </div>

//             {/* Cart Items Header */}
//             <div className="relative overflow-x-auto">
//               <div className="min-w-[600px]">
//                 <div className="grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 text-sm font-semibold text-gray-600 uppercase tracking-wide">
//                   <div className="col-span-6">Product Details</div>
//                   <div className="col-span-2 text-center">Quantity</div>
//                   <div className="col-span-2 text-center">Price</div>
//                   <div className="col-span-2 text-center">Total</div>
//                 </div>

//                 {/* Cart Items */}
//                 <div className="space-y-6 mt-6">
//                   {cartItems.map((item) => {
//                     const itemPrice =
//                       typeof item.price === "string" 
//                         ? Number.parseFloat(item.price.replace(/[^0-9.]/g, "")) 
//                         : item.price;
//                     const itemTotal = itemPrice * item.quantity;

//                     return (
//                       <div key={item.id} className="grid grid-cols-12 gap-4 items-center py-4 border-b border-gray-100">
//                         {/* Product Details */}
//                         <div className="col-span-6 flex items-center space-x-4">
//                           <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
//                             <img
//                               src={(() => {
//                                 try {
//                                   return item.img ? require("../Images/" + item.img) : "/placeholder.svg";
//                                 } catch (e) {
//                                   return "/placeholder.svg?height=80&width=80";
//                                 }
//                               })()}
//                               alt={item.type || "Product"}
//                               className="w-full h-full object-cover"
//                             />
//                           </div>
//                           <div className="flex-1 min-w-0">
//                             <h3 className="font-semibold text-gray-800 truncate">{item.type || "Product"}</h3>
//                             <p className="text-sm text-gray-500 mt-1">{item.name || "No name"}</p>
//                             <button
//                               onClick={() => removeFromCart(item.id)}
//                               className="text-sm text-red-500 hover:text-red-700 mt-2 font-medium"
//                             >
//                               Remove
//                             </button>
//                           </div>
//                         </div>

//                         {/* Quantity */}
//                         <div className="col-span-2 flex items-center justify-center">
//                           <div className="flex items-center border border-gray-300 rounded-lg">
//                             <button
//                               onClick={() => handleQuantityChange(item.id, -1)}
//                               className="p-2 hover:bg-gray-100 transition-colors"
//                               disabled={item.quantity <= 1}
//                             >
//                               <Minus size={16} className={item.quantity <= 1 ? "text-gray-300" : "text-gray-600"} />
//                             </button>
//                             <span className="px-4 py-2 border-x border-gray-300 min-w-[50px] text-center font-medium">
//                               {item.quantity}
//                             </span>
//                             <button
//                               onClick={() => handleQuantityChange(item.id, 1)}
//                               className="p-2 hover:bg-gray-100 transition-colors"
//                             >
//                               <Plus size={16} className="text-gray-600" />
//                             </button>
//                           </div>
//                         </div>

//                         {/* Price */}
//                         <div className="col-span-2 text-center">
//                           <span className="font-semibold text-gray-800">£{formatPrice(itemPrice)}</span>
//                         </div>

//                         {/* Total */}
//                         <div className="col-span-2 text-center">
//                           <span className="font-semibold text-gray-800">£{itemTotal.toFixed(2)}</span>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>

//             {/* Continue Shopping */}
//             <div className="mt-8 pt-6 border-t border-gray-200">
//               <button
//                 onClick={() => navigate("/shop")}
//                 className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
//               >
//                 <ArrowLeft size={20} className="mr-2" />
//                 Continue Shopping
//               </button>
//             </div>
//           </div>

//           {/* Order Summary Section */}
//           <div className="bg-white rounded-lg p-6 h-fit">
//             <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

//             {/* Items Summary */}
//             <div className="space-y-3 mb-6">
//               <div className="flex justify-between text-gray-600">
//                 <span>ITEMS {cartItems.length}</span>
//                 <span>£{subtotal.toFixed(2)}</span>
//               </div>
//             </div>

//             {/* Shipping Options */}
//             <div className="mb-6">
//               <h3 className="font-semibold text-gray-800 mb-3">SHIPPING</h3>
//               <div className="relative">
//                 <button
//                   onClick={() => setIsShippingOpen(!isShippingOpen)}
//                   className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
//                 >
//                   <span className="text-gray-700">
//                     {shippingOptions[shippingOption].name} - £{shippingOptions[shippingOption].price.toFixed(2)}
//                   </span>
//                   <ChevronDown
//                     size={20}
//                     className={`text-gray-500 transition-transform ${isShippingOpen ? "rotate-180" : ""}`}
//                   />
//                 </button>

//                 {isShippingOpen && (
//                   <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
//                     {Object.entries(shippingOptions).map(([key, option]) => (
//                       <button
//                         key={key}
//                         onClick={() => {
//                           setShippingOption(key as keyof typeof shippingOptions);
//                           setIsShippingOpen(false);
//                         }}
//                         className="w-full text-left p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
//                       >
//                         <div className="flex justify-between">
//                           <span className="text-gray-700">{option.name}</span>
//                           <span className="text-gray-600">£{option.price.toFixed(2)}</span>
//                         </div>
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Promo Code */}
//             <div className="mb-6">
//               <h3 className="font-semibold text-gray-800 mb-3">PROMO CODE</h3>
//               <div className="flex space-x-2">
//                 <input
//                   type="text"
//                   placeholder="Enter your code"
//                   value={promoCode}
//                   onChange={(e) => setPromoCode(e.target.value)}
//                   className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//                 <button className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors">
//                   APPLY
//                 </button>
//               </div>
//             </div>

//             {/* Total Cost */}
//             <div className="border-t border-gray-200 pt-4 mb-6">
//               <div className="flex justify-between text-lg font-bold text-gray-800">
//                 <span>TOTAL COST</span>
//                 <span>£{totalCost.toFixed(2)}</span>
//               </div>
//             </div>

//             {/* Checkout Button */}
//             <button 
//               onClick={() => navigate("/bill")}
//               className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
//             >
//               CHECKOUT
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartItems;







// import React from "react";
// import { useCart } from "./CartContext";

// const CartItems: React.FC = () => {
//   const { cart, updateQuantity, removeFromCart, getCartTotal, loading, error } = useCart();

//   if (loading) return <p>Loading cart...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;
//   if (cart.length === 0) return <p>Your cart is empty.</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
//       <div className="space-y-4">
//         {cart.map((item) => (
//           <div
//             key={item.id}
//             className="flex items-center justify-between border-b pb-4"
//           >
//             <div>
//               <h3 className="font-medium">Product #{item.product_id}</h3>
//               <p>Price: ${item.price}</p>
//               <p>Quantity: {item.quantity}</p>
//             </div>
//             <div className="flex items-center space-x-2">
//               <button
//                 onClick={() => updateQuantity(item.id, Math.max(item.quantity - 1, 1))}
//                 className="px-2 py-1 bg-gray-200 rounded"
//               >
//                 -
//               </button>
//               <span>{item.quantity}</span>
//               <button
//                 onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                 className="px-2 py-1 bg-gray-200 rounded"
//               >
//                 +
//               </button>
//               <button
//                 onClick={() => removeFromCart(item.id)}
//                 className="px-3 py-1 bg-red-500 text-white rounded"
//               >
//                 Remove
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="mt-6 text-xl font-bold">
//         Total: ${getCartTotal()}
//       </div>
//     </div>
//   );
// };

// export default CartItems;







// import React from "react";
// import { useCart } from "./CartContext";

// const CartItems: React.FC = () => {
//   const { cart, updateQuantity, removeFromCart, getCartTotal, loading, error } = useCart();

//   if (loading) return <p>Loading cart...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;
//   if (cart.length === 0) return <p>Your cart is empty.</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
//       <div className="space-y-4">
//         {cart.map(item => (
//           <div key={item.id} className="flex items-center justify-between border-b pb-4">
//             <div>
//               <h3 className="font-medium">{`Product ${item.product_id}`}</h3>
//               <p>Price: ${item.price}</p>
//               <p>Quantity: {item.quantity}</p>
//             </div>
//             <div className="flex items-center space-x-2">
//               <button 
//                 onClick={() => updateQuantity(item.id, Math.max(item.quantity - 1, 1))} 
//                 className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
//               >
//                 -
//               </button>
//               <span className="min-w-[2rem] text-center">{item.quantity}</span>
//               <button 
//                 onClick={() => updateQuantity(item.id, item.quantity + 1)} 
//                 className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
//               >
//                 +
//               </button>
//               <button 
//                 onClick={() => removeFromCart(item.id)} 
//                 className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
//               >
//                 Remove
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="mt-6 text-xl font-bold">
//         Total: ${getCartTotal().toFixed(2)}
//       </div>
//     </div>
//   );
// };

// export default CartItems;







// import React from "react";
// import { useCart } from "./CartContext";

// const CartItems: React.FC = () => {
//   const { cart, updateQuantity, removeFromCart, getCartTotal, loading, error } = useCart();

//   if (loading) return <p>Loading cart...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;
//   if (cart.length === 0) return <p>Your cart is empty.</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
//       <div className="space-y-4">
//         {cart.map(item => (
//           <div key={item.id} className="flex items-center justify-between border-b pb-4">
//             <div>
//               <h3 className="font-medium">{`Product ${item.product_id}`}</h3>
//               <p>Price: ${item.price}</p>
//               <p>Quantity: {item.quantity}</p>
//             </div>
//             <div className="flex items-center space-x-2">
//               <button 
//                 onClick={() => updateQuantity(item.id, Math.max(item.quantity - 1, 1))} 
//                 className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
//               >
//                 -
//               </button>
//               <span className="min-w-[2rem] text-center">{item.quantity}</span>
//               <button 
//                 onClick={() => updateQuantity(item.id, item.quantity + 1)} 
//                 className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
//               >
//                 +
//               </button>
//               <button 
//                 onClick={() => removeFromCart(item.id)} 
//                 className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
//               >
//                 Remove
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="mt-6 text-xl font-bold">
//         Total: ${getCartTotal().toFixed(2)}
//       </div>
//     </div>
//   );
// };

// export default CartItems;





// import React from "react";
// import { useCart } from "./CartContext";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Minus, Plus, Trash2 } from "lucide-react";

// const CartItems: React.FC = () => {
//   const { cart, updateQuantity, removeFromCart, getCartTotal, loading, error } = useCart();

//   if (loading) return <div className="text-center py-10">Loading cart...</div>;
//   if (error) return <div className="text-destructive text-center py-10">{error}</div>;
//   if (cart.length === 0) return <div className="text-center py-10">Your cart is empty.</div>;

//   return (
//     <div className="container mx-auto p-6 max-w-4xl">
//       <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      
//       <div className="space-y-4">
//         {cart.map(item => (
//           <Card key={item.id} className="overflow-hidden">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div className="flex-1">
//                   <h3 className="font-semibold text-lg">{`Product ${item.product_id}`}</h3>
//                   <p className="text-muted-foreground">Price: ${parseFloat(item.price).toFixed(2)}</p>
//                   <p className="text-sm text-muted-foreground">Added: {new Date(item.created_at).toLocaleDateString()}</p>
//                 </div>
                
//                 <div className="flex items-center space-x-4">
//                   <div className="flex items-center space-x-2">
//                     <Button 
//                       variant="outline" 
//                       size="icon"
//                       onClick={() => updateQuantity(item.id, Math.max(item.quantity - 1, 1))}
//                       className="h-8 w-8"
//                     >
//                       <Minus className="h-4 w-4" />
//                     </Button>
                    
//                     <span className="min-w-[3rem] text-center font-medium">
//                       {item.quantity}
//                     </span>
                    
//                     <Button 
//                       variant="outline" 
//                       size="icon"
//                       onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                       className="h-8 w-8"
//                     >
//                       <Plus className="h-4 w-4" />
//                     </Button>
//                   </div>
                  
//                   <div className="text-right">
//                     <p className="font-semibold">
//                       ${(parseFloat(item.price) * item.quantity).toFixed(2)}
//                     </p>
//                   </div>
                  
//                   <Button 
//                     variant="destructive" 
//                     size="icon"
//                     onClick={() => removeFromCart(item.id)}
//                     className="h-8 w-8"
//                   >
//                     <Trash2 className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
      
//       <Card className="mt-6">
//         <CardHeader>
//           <CardTitle>Order Summary</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex justify-between items-center text-xl font-bold">
//             <span>Total:</span>
//             <span>${getCartTotal().toFixed(2)}</span>
//           </div>
//           <Button className="w-full mt-4" size="lg">
//             Proceed to Checkout
//           </Button>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default CartItems;







// import React, { useState, useEffect } from "react";
// import { useCart } from "./CartContext";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Minus, Plus, Trash2 } from "lucide-react";
// import { apiClient } from "@/context/axios";

// interface Product {
//   id: number;
//   name: string;
//   price: string;
//   image_url: string;
//   stock_quantity: number;
//   categories?: {
//     name: string;
//   } | null;
// }

// interface CartItemWithProduct {
//   id: number;
//   user_id: number | null;
//   product_id: number;
//   quantity: number;
//   price: string;
//   created_at: string;
//   updated_at: string;
//   product?: Product;
// }

// const CartItems: React.FC = () => {
//   const { cart, updateQuantity, removeFromCart, getCartTotal, loading, error } = useCart();
//   const [cartWithProducts, setCartWithProducts] = useState<CartItemWithProduct[]>([]);
//   const [productsLoading, setProductsLoading] = useState(false);
//   const [updatingItems, setUpdatingItems] = useState<Set<number>>(new Set());

//   const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://dimpo-pbackend.onrender.com';
//   const getImageUrl = (url: string) => url.startsWith('http') ? url : `${BASE_URL}${url}`;

//   // Fetch product details for cart items
//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       if (cart.length === 0) {
//         setCartWithProducts([]);
//         return;
//       }

//       setProductsLoading(true);
//       try {
//         const cartWithProductDetails = await Promise.all(
//           cart.map(async (cartItem) => {
//             try {
//               const productResponse = await apiClient.get(`/api/products/${cartItem.product_id}`);
//               return {
//                 ...cartItem,
//                 product: productResponse.data
//               };
//             } catch (error) {
//               console.error(`Failed to fetch product ${cartItem.product_id}:`, error);
//               return {
//                 ...cartItem,
//                 product: {
//                   id: cartItem.product_id,
//                   name: `Product ${cartItem.product_id}`,
//                   price: cartItem.price,
//                   image_url: '',
//                   stock_quantity: 0
//                 }
//               };
//             }
//           })
//         );
//         setCartWithProducts(cartWithProductDetails);
//       } catch (error) {
//         console.error('Error fetching product details:', error);
//       } finally {
//         setProductsLoading(false);
//       }
//     };

//     fetchProductDetails();
//   }, [cart]);

//   const handleQuantityUpdate = async (cartItemId: number, newQuantity: number, maxStock: number) => {
//     if (newQuantity > maxStock) {
//       alert(`Only ${maxStock} items available in stock`);
//       return;
//     }

//     setUpdatingItems(prev => new Set(prev).add(cartItemId));
    
//     try {
//       const result = await updateQuantity(cartItemId, newQuantity);
//       if (!result.success && result.error) {
//         alert(result.error);
//       }
//     } catch (error) {
//       console.error('Failed to update quantity:', error);
//     } finally {
//       setUpdatingItems(prev => {
//         const newSet = new Set(prev);
//         newSet.delete(cartItemId);
//         return newSet;
//       });
//     }
//   };

//   const handleRemoveItem = async (cartItemId: number) => {
//     if (confirm('Are you sure you want to remove this item from your cart?')) {
//       setUpdatingItems(prev => new Set(prev).add(cartItemId));
      
//       try {
//         const result = await removeFromCart(cartItemId);
//         if (!result.success && result.error) {
//           alert(result.error);
//         }
//       } catch (error) {
//         console.error('Failed to remove item:', error);
//       } finally {
//         setUpdatingItems(prev => {
//           const newSet = new Set(prev);
//           newSet.delete(cartItemId);
//           return newSet;
//         });
//       }
//     }
//   };

//   if (loading || productsLoading) return <div className="text-center py-10">Loading cart...</div>;
//   if (error) return <div className="text-destructive text-center py-10">{error}</div>;
//   if (cartWithProducts.length === 0) return <div className="text-center py-10">Your cart is empty.</div>;

//   return (
//     <div className="container mx-auto p-6 max-w-4xl">
//       <h1 className="text-3xl font-bold mb-6">Shopping Cart ({cartWithProducts.length} items)</h1>
      
//       <div className="space-y-4">
//         {cartWithProducts.map(item => {
//           const isUpdating = updatingItems.has(item.id);
//           const product = item.product;
//           const itemTotal = parseFloat(item.price) * item.quantity;
          
//           return (
//             <Card key={item.id} className="overflow-hidden">
//               <CardContent className="p-6">
//                 <div className="flex items-center space-x-4">
//                   {/* Product Image */}
//                   {product?.image_url && (
//                     <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
//                       <img 
//                         src={getImageUrl(product.image_url)} 
//                         alt={product.name}
//                         className="w-full h-full object-cover"
//                         onError={(e) => {
//                           const target = e.target as HTMLImageElement;
//                           target.style.display = 'none';
//                         }}
//                       />
//                     </div>
//                   )}
                  
//                   {/* Product Details */}
//                   <div className="flex-1">
//                     <h3 className="font-semibold text-lg">{product?.name || `Product ${item.product_id}`}</h3>
//                     <p className="text-muted-foreground">
//                       {product?.categories?.name && (
//                         <span className="text-sm">{product.categories.name} • </span>
//                       )}
//                       Unit Price: ${parseFloat(item.price).toFixed(2)}
//                     </p>
//                     <p className="text-sm text-muted-foreground">
//                       Added: {new Date(item.created_at).toLocaleDateString()}
//                     </p>
//                     {product?.stock_quantity !== undefined && (
//                       <p className="text-sm text-muted-foreground">
//                         Stock: {product.stock_quantity} available
//                       </p>
//                     )}
//                   </div>
                  
//                   {/* Quantity Controls */}
//                   <div className="flex items-center space-x-4">
//                     <div className="flex items-center space-x-2">
//                       <Button 
//                         variant="outline" 
//                         size="icon"
//                         onClick={() => handleQuantityUpdate(
//                           item.id, 
//                           Math.max(item.quantity - 1, 1), 
//                           product?.stock_quantity || 0
//                         )}
//                         disabled={isUpdating || item.quantity <= 1}
//                         className="h-8 w-8"
//                       >
//                         <Minus className="h-4 w-4" />
//                       </Button>
                      
//                       <span className="min-w-[3rem] text-center font-medium">
//                         {isUpdating ? (
//                           <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
//                         ) : (
//                           item.quantity
//                         )}
//                       </span>
                      
//                       <Button 
//                         variant="outline" 
//                         size="icon"
//                         onClick={() => handleQuantityUpdate(
//                           item.id, 
//                           item.quantity + 1, 
//                           product?.stock_quantity || 0
//                         )}
//                         disabled={isUpdating || (product?.stock_quantity !== undefined && item.quantity >= product.stock_quantity)}
//                         className="h-8 w-8"
//                       >
//                         <Plus className="h-4 w-4" />
//                       </Button>
//                     </div>
                    
//                     {/* Item Total */}
//                     <div className="text-right min-w-[80px]">
//                       <p className="font-semibold">
//                         ${itemTotal.toFixed(2)}
//                       </p>
//                       <p className="text-xs text-muted-foreground">
//                         ${parseFloat(item.price).toFixed(2)} each
//                       </p>
//                     </div>
                    
//                     {/* Remove Button */}
//                     <Button 
//                       variant="destructive" 
//                       size="icon"
//                       onClick={() => handleRemoveItem(item.id)}
//                       disabled={isUpdating}
//                       className="h-8 w-8"
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>
                
//                 {/* Stock Warning */}
//                 {product?.stock_quantity !== undefined && product.stock_quantity < item.quantity && (
//                   <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
//                     ⚠️ Only {product.stock_quantity} items available. Please adjust quantity.
//                   </div>
//                 )}
                
//                 {product?.stock_quantity === 0 && (
//                   <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
//                     ❌ This item is currently out of stock.
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>
      
//       {/* Order Summary */}
//       <Card className="mt-6">
//         <CardHeader>
//           <CardTitle>Order Summary</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-2">
//             <div className="flex justify-between">
//               <span>Items ({cartWithProducts.length}):</span>
//               <span>${getCartTotal().toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between">
//               <span>Shipping:</span>
//               <span>Free</span>
//             </div>
//             <hr className="my-2" />
//             <div className="flex justify-between items-center text-xl font-bold">
//               <span>Total:</span>
//               <span>${getCartTotal().toFixed(2)}</span>
//             </div>
//           </div>
//           <Button className="w-full mt-4" size="lg">
//             Proceed to Checkout
//           </Button>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default CartItems;









import React, { useState } from "react";
import { useCart } from "./CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Minus, Plus, Trash2 } from "lucide-react";

const CartItems: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal, loading, error } = useCart();
  const [updatingItems, setUpdatingItems] = useState<Set<number>>(new Set());

  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://dimpo-pbackend.onrender.com';
  const getImageUrl = (url: string) => url.startsWith('http') ? url : `${BASE_URL}${url}`;

  const handleQuantityUpdate = async (cartItemId: number, newQuantity: number, maxStock: number) => {
    if (newQuantity > maxStock) {
      alert(`Only ${maxStock} items available in stock`);
      return;
    }

    setUpdatingItems(prev => new Set(prev).add(cartItemId));
    
    try {
      const result = await updateQuantity(cartItemId, newQuantity);
      if (!result.success && result.error) {
        alert(result.error);
      }
    } catch (error) {
      console.error('Failed to update quantity:', error);
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(cartItemId);
        return newSet;
      });
    }
  };

  const handleRemoveItem = async (cartItemId: number) => {
    if (confirm('Are you sure you want to remove this item from your cart?')) {
      setUpdatingItems(prev => new Set(prev).add(cartItemId));
      
      try {
        const result = await removeFromCart(cartItemId);
        if (!result.success && result.error) {
          alert(result.error);
        }
      } catch (error) {
        console.error('Failed to remove item:', error);
      } finally {
        setUpdatingItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(cartItemId);
          return newSet;
        });
      }
    }
  };

  if (loading) return <div className="text-center py-10">Loading cart...</div>;
  if (error) return <div className="text-destructive text-center py-10">{error}</div>;
  if (cart.length === 0) return <div className="text-center py-10">Your cart is empty.</div>;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart ({cart.length} items)</h1>
      
      <div className="space-y-4">
        {cart.map(item => {
          const isUpdating = updatingItems.has(item.id);
          const product = item.products; // Use the nested product data
          const itemTotal = parseFloat(item.price) * item.quantity;
          
          return (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  {/* Product Image */}
                  {product?.image_url && (
                    <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                      <img 
                        src={getImageUrl(product.image_url)} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  
                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{product?.name || `Product ${item.product_id}`}</h3>
                    <p className="text-muted-foreground">
                      {product?.categories?.name && (
                        <span className="text-sm">{product.categories.name} • </span>
                      )}
                      Unit Price: ${parseFloat(item.price).toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Added: {new Date(item.created_at).toLocaleDateString()}
                    </p>
                    {product?.stock_quantity !== undefined && (
                      <p className="text-sm text-muted-foreground">
                        Stock: {product.stock_quantity} available
                      </p>
                    )}
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleQuantityUpdate(
                          item.id, 
                          Math.max(item.quantity - 1, 1), 
                          product?.stock_quantity || 0
                        )}
                        disabled={isUpdating || item.quantity <= 1}
                        className="h-8 w-8"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      
                      <span className="min-w-[3rem] text-center font-medium">
                        {isUpdating ? (
                          <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
                        ) : (
                          item.quantity
                        )}
                      </span>
                      
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleQuantityUpdate(
                          item.id, 
                          item.quantity + 1, 
                          product?.stock_quantity || 0
                        )}
                        disabled={isUpdating || (product?.stock_quantity !== undefined && item.quantity >= product.stock_quantity)}
                        className="h-8 w-8"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Item Total */}
                    <div className="text-right min-w-[80px]">
                      <p className="font-semibold">
                        ${itemTotal.toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ${parseFloat(item.price).toFixed(2)} each
                      </p>
                    </div>
                    
                    {/* Remove Button */}
                    <Button 
                      variant="destructive" 
                      size="icon"
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={isUpdating}
                      className="h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Stock Warning */}
                {product?.stock_quantity !== undefined && product.stock_quantity < item.quantity && (
                  <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                    ⚠️ Only {product.stock_quantity} items available. Please adjust quantity.
                  </div>
                )}
                
                {product?.stock_quantity === 0 && (
                  <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                    ❌ This item is currently out of stock.
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {/* Order Summary */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Items ({cart.length}):</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total:</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
          </div>
          <Button className="w-full mt-4" size="lg">
            Proceed to Checkout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CartItems;