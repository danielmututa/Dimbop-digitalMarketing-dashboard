
import { useState } from "react";
import { useCart } from "./CartContext";
import { Minus, Plus, ArrowLeft, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

// interface CartItem {
//   id: string | number;
//   quantity: number;
//   price: number | string;
//   type: string;
//   name: string;
//   img: string;
//   [key: string]: any;
// }

interface ShippingOption {
  name: string;
  price: number;
}

const Cartitems = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const [promoCode, setPromoCode] = useState<string>("");
  const [shippingOption, setShippingOption] = useState<keyof typeof shippingOptions>("standard");
  const [isShippingOpen, setIsShippingOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const shippingOptions: Record<string, ShippingOption> = {
    standard: { name: "Standard Delivery", price: 5.0 },
    express: { name: "Express Delivery", price: 15.0 },
    overnight: { name: "Overnight Delivery", price: 25.0 },
  };

  const subtotal = getCartTotal();
  const shippingCost = shippingOptions[shippingOption].price;
  const totalCost = subtotal + shippingCost;

  const handleQuantityChange = (productId: string | number, change: number) => {
    const item = cartItems.find((item) => item.id === productId);
    if (item) {
      updateQuantity(productId, item.quantity + change);
    }
  };

  const formatPrice = (price: number | string): string => {
    const numPrice = typeof price === "string" 
      ? Number.parseFloat(price.replace(/[^0-9.]/g, "")) 
      : price;
    return numPrice.toFixed(2);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some products to get started!</p>
            <button
              onClick={() => navigate("/shop")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2 bg-white rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Shopping Cart</h1>
              <span className="text-lg text-gray-600">{cartItems.length} Items</span>
            </div>

            {/* Cart Items Header */}
            <div className="relative overflow-x-auto">
              <div className="min-w-[600px]">
                <div className="grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  <div className="col-span-6">Product Details</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Total</div>
                </div>

                {/* Cart Items */}
                <div className="space-y-6 mt-6">
                  {cartItems.map((item) => {
                    const itemPrice =
                      typeof item.price === "string" 
                        ? Number.parseFloat(item.price.replace(/[^0-9.]/g, "")) 
                        : item.price;
                    const itemTotal = itemPrice * item.quantity;

                    return (
                      <div key={item.id} className="grid grid-cols-12 gap-4 items-center py-4 border-b border-gray-100">
                        {/* Product Details */}
                        <div className="col-span-6 flex items-center space-x-4">
                          <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={(() => {
                                try {
                                  return require("../Images/" + item.img) || "/placeholder.svg";
                                } catch (e) {
                                  return "/placeholder.svg?height=80&width=80";
                                }
                              })()}
                              alt={item.type}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-800 truncate">{item.type}</h3>
                            <p className="text-sm text-gray-500 mt-1">{item.name}</p>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-sm text-red-500 hover:text-red-700 mt-2 font-medium"
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        {/* Quantity */}
                        <div className="col-span-2 flex items-center justify-center">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => handleQuantityChange(item.id, -1)}
                              className="p-2 hover:bg-gray-100 transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={16} className={item.quantity <= 1 ? "text-gray-300" : "text-gray-600"} />
                            </button>
                            <span className="px-4 py-2 border-x border-gray-300 min-w-[50px] text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.id, 1)}
                              className="p-2 hover:bg-gray-100 transition-colors"
                            >
                              <Plus size={16} className="text-gray-600" />
                            </button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="col-span-2 text-center">
                          <span className="font-semibold text-gray-800">£{formatPrice(itemPrice)}</span>
                        </div>

                        {/* Total */}
                        <div className="col-span-2 text-center">
                          <span className="font-semibold text-gray-800">£{itemTotal.toFixed(2)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => navigate("/shop")}
                className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                <ArrowLeft size={20} className="mr-2" />
                Continue Shopping
              </button>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="bg-white rounded-lg p-6 h-fit">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

            {/* Items Summary */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>ITEMS {cartItems.length}</span>
                <span>£{subtotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Shipping Options */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">SHIPPING</h3>
              <div className="relative">
                <button
                  onClick={() => setIsShippingOpen(!isShippingOpen)}
                  className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
                >
                  <span className="text-gray-700">
                    {shippingOptions[shippingOption].name} - £{shippingOptions[shippingOption].price.toFixed(2)}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-gray-500 transition-transform ${isShippingOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isShippingOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    {Object.entries(shippingOptions).map(([key, option]) => (
                      <button
                        key={key}
                        onClick={() => {
                          setShippingOption(key as keyof typeof shippingOptions);
                          setIsShippingOpen(false);
                        }}
                        className="w-full text-left p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex justify-between">
                          <span className="text-gray-700">{option.name}</span>
                          <span className="text-gray-600">£{option.price.toFixed(2)}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Promo Code */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">PROMO CODE</h3>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Enter your code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors">
                  APPLY
                </button>
              </div>
            </div>

            {/* Total Cost */}
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between text-lg font-bold text-gray-800">
                <span>TOTAL COST</span>
                <span>£{totalCost.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button 
              onClick={() => navigate("/bill")}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
            >
              CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cartitems;