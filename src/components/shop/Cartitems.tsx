import React, { useState } from "react";
import { useCart } from "./CartContext";
import { Minus, Plus, ArrowLeft, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ShippingOption {
  name: string;
  price: number;
}

const CartItems: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal, loading, error } = useCart();
  const [updatingItems, setUpdatingItems] = useState<Set<number>>(new Set());
  const [editingQuantity, setEditingQuantity] = useState<Set<number>>(new Set());
  const [tempQuantities, setTempQuantities] = useState<Record<number, string>>({});
  const [promoCode, setPromoCode] = useState<string>("");
  const [shippingOption, setShippingOption] = useState<keyof typeof shippingOptions>("standard");
  const [isShippingOpen, setIsShippingOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://dimpo-pbackend.onrender.com';
  const getImageUrl = (url: string) => url.startsWith('http') ? url : `${BASE_URL}${url}`;

  const shippingOptions: Record<string, ShippingOption> = {
    standard: { name: "Standard Delivery", price: 5.0 },
    express: { name: "Express Delivery", price: 15.0 },
    overnight: { name: "Overnight Delivery", price: 25.0 },
  };

  const subtotal = getCartTotal();
  const shippingCost = shippingOptions[shippingOption].price;
  const totalCost = subtotal + shippingCost;

  const handleQuantityUpdate = async (cartItemId: number, newQuantity: number, maxStock: number) => {
    if (maxStock > 0 && newQuantity > maxStock) {
      alert(`Only ${maxStock} items available in stock`);
      return;
    }

    if (newQuantity < 1) {
      alert("Quantity must be at least 1");
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

  const handleQuantityChange = (cartItemId: number, change: number, maxStock: number) => {
    const item = cart.find((item) => item.id === cartItemId);
    if (item) {
      const newQuantity = Math.max(item.quantity + change, 1);
      handleQuantityUpdate(cartItemId, newQuantity, maxStock);
    }
  };

  // Click on quantity number to start editing
  const handleQuantityClick = (cartItemId: number) => {
    const item = cart.find(item => item.id === cartItemId);
    if (item) {
      setTempQuantities(prev => ({ ...prev, [cartItemId]: item.quantity.toString() }));
      setEditingQuantity(prev => new Set(prev).add(cartItemId));
    }
  };

  // Auto-update instantly as user types
  const handleQuantityInputChange = async (cartItemId: number, value: string, maxStock: number) => {
    // Only allow numbers
    if (value === '' || /^\d+$/.test(value)) {
      setTempQuantities(prev => ({ ...prev, [cartItemId]: value }));
      
      // Auto-update instantly if it's a valid number
      if (value !== '' && /^\d+$/.test(value)) {
        const newQuantity = parseInt(value);
        if (newQuantity > 0) {
          await handleQuantityUpdate(cartItemId, newQuantity, maxStock);
        }
      }
    }
  };

  // Finish editing on blur or enter
  const handleQuantityInputFinish = (cartItemId: number) => {
    setEditingQuantity(prev => {
      const newSet = new Set(prev);
      newSet.delete(cartItemId);
      return newSet;
    });
    
    // Clear temp quantity
    setTempQuantities(prev => {
      const newTemp = { ...prev };
      delete newTemp[cartItemId];
      return newTemp;
    });
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

  if (cart.length === 0) {
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
              <span className="text-lg text-gray-600">{cart.length} Items</span>
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
                  {cart.map((item) => {
                    const isUpdating = updatingItems.has(item.id);
                    const isEditing = editingQuantity.has(item.id);
                    const product = item.products;
                    const itemPrice = parseFloat(item.price);
                    const itemTotal = itemPrice * item.quantity;
                    const maxStock = product?.stock_quantity || 0;

                    return (
                      <div key={item.id} className="grid grid-cols-12 gap-4 items-center py-4 border-b border-gray-100">
                        {/* Product Details */}
                        <div className="col-span-6 flex items-center space-x-4">
                          <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            {product?.image_url && (
                              <img
                                src={getImageUrl(product.image_url)}
                                alt={product.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                }}
                              />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-800 truncate">
                              {product?.name || `Product ${item.product_id}`}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              {product?.categories?.name && (
                                <span className="text-sm">{product.categories.name}</span>
                              )}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              Added: {new Date(item.created_at).toLocaleDateString()}
                            </p>
                            {maxStock > 0 && (
                              <p className="text-sm text-gray-500">
                                Stock: {maxStock} available
                              </p>
                            )}
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-sm text-red-500 hover:text-red-700 mt-2 font-medium"
                              disabled={isUpdating}
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        {/* Quantity */}
                        <div className="col-span-2 flex items-center justify-center">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => handleQuantityChange(item.id, -1, maxStock)}
                              className="p-2 hover:bg-gray-100 transition-colors"
                              disabled={isUpdating || item.quantity <= 1}
                            >
                              <Minus size={16} className={item.quantity <= 1 || isUpdating ? "text-gray-300" : "text-gray-600"} />
                            </button>
                            
                            {/* Clickable Quantity Number */}
                            <div className="border-x border-gray-300 min-w-[50px] flex items-center justify-center">
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={tempQuantities[item.id] || ''}
                                  onChange={(e) => handleQuantityInputChange(item.id, e.target.value, maxStock)}
                                  onBlur={() => handleQuantityInputFinish(item.id)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === 'Escape') {
                                      handleQuantityInputFinish(item.id);
                                    }
                                  }}
                                  className="w-full px-2 py-2 text-center font-medium bg-blue-50 border-none outline-none focus:bg-blue-100"
                                  autoFocus
                                />
                              ) : (
                                <button
                                  onClick={() => handleQuantityClick(item.id)}
                                  className="px-4 py-2 font-medium hover:bg-gray-50 transition-colors w-full text-center"
                                  disabled={isUpdating}
                                >
                                  {isUpdating ? (
                                    <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
                                  ) : (
                                    item.quantity
                                  )}
                                </button>
                              )}
                            </div>
                            
                            <button
                              onClick={() => handleQuantityChange(item.id, 1, maxStock)}
                              className="p-2 hover:bg-gray-100 transition-colors"
                              disabled={isUpdating || (maxStock > 0 && item.quantity >= maxStock)}
                            >
                              <Plus size={16} className={isUpdating || (maxStock > 0 && item.quantity >= maxStock) ? "text-gray-300" : "text-gray-600"} />
                            </button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="col-span-2 text-center">
                          <span className="font-semibold text-gray-800">${itemPrice.toFixed(2)}</span>
                        </div>

                        {/* Total */}
                        <div className="col-span-2 text-center">
                          <span className="font-semibold text-gray-800">${itemTotal.toFixed(2)}</span>
                        </div>

                        {/* Stock Warnings */}
                        {maxStock > 0 && maxStock < item.quantity && (
                          <div className="col-span-12 mt-3 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                            ⚠️ Only {maxStock} items available. Please adjust quantity.
                          </div>
                        )}
                        
                        {maxStock === 0 && (
                          <div className="col-span-12 mt-3 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                            ❌ This item is currently out of stock.
                          </div>
                        )}
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
                <span>ITEMS {cart.length}</span>
                <span>${subtotal.toFixed(2)}</span>
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
                    {shippingOptions[shippingOption].name} - ${shippingOptions[shippingOption].price.toFixed(2)}
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
                          <span className="text-gray-600">${option.price.toFixed(2)}</span>
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
                <span>${totalCost.toFixed(2)}</span>
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

export default CartItems;