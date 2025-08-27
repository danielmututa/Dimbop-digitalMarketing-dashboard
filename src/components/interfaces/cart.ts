// // src/lib/schemas/cart/Cart.ts

// export interface CartItem {
//   id: number;
//   user_id: number | null;
//   product_id: number;
//   quantity: number;
//   price: string; 
//   created_at: string;
//   updated_at: string;
// }

// export interface CartContextType {
//   userId: number;
//   cart: CartItem[];
// }







// // src/lib/schemas/cart/Cart.ts or src/components/interfaces/cart.ts

// export interface CartItem {
//   id: number;
//   user_id: number | null;
//   product_id: number;
//   quantity: number;
//   price: string;
//   created_at: string;
//   updated_at: string;
// }

// export interface UserCart {
//   cart: CartItem[];
// }

// export interface CartContextType {
//   userId: number;
//   cart: CartItem[];

//   // Updated function signature
//   addToCart: (productId: number, quantity?: number, price?: string) => Promise<void>;
//   removeFromCart: (cartItemId: number) => Promise<void>;
//   updateQuantity: (cartItemId: number, newQuantity: number) => Promise<void>;
//   getCartTotal: () => number;
//   getCartItemsCount: () => number;
//   clearCart: () => void;

//   loading: boolean;
//   error: string | null;
// }


// // src/lib/schemas/cart/Cart.ts or src/components/interfaces/cart.ts

// export interface CartItem {
//   id: number;
//   user_id: number | null;
//   product_id: number;
//   quantity: number;
//   price: string;
//   created_at: string;
//   updated_at: string;
// }

// export interface UserCart {
//   items: CartItem[];
//   subtotal: number;
//   totalItems: number;
//   totalDiscount: number;
//   grandTotal: number;
// }

// export interface CartContextType {
//   userId: number;
//   cart: CartItem[];
//   // ✅ Fix the interface - make price optional since we pass it from product
//   addToCart: (productId: number, quantity?: number, price?: string) => Promise<void>;
//   removeFromCart: (cartItemId: number) => Promise<void>;
//   updateQuantity: (cartItemId: number, newQuantity: number) => Promise<void>;
//   getCartTotal: () => number;
//   getCartItemsCount: () => number;
//   clearCart: () => void;
//   loading: boolean;
//   error: string | null;
// }







// export interface CartItem {
//   id: number;
//   user_id: number | null;
//   product_id: number;
//   quantity: number;
//   price: string;
//   created_at: string;
//   updated_at: string;
// }

// export interface UserCart {
//   items: CartItem[];
//   subtotal: number;
//   totalItems: number;
//   totalDiscount: number;
//   grandTotal: number;
// }

// export interface CartContextType {
//   userId: number;
//   cart: CartItem[];
//   // Fixed: Return promise with result object instead of void
//   addToCart: (productId: number, quantity?: number, price?: string) => Promise<{
//     success: boolean;
//     error?: string;
//   }>;
//   removeFromCart: (cartItemId: number) => Promise<{
//     success: boolean;
//     error?: string;
//   }>;
//   updateQuantity: (cartItemId: number, newQuantity: number) => Promise<{
//     success: boolean;
//     error?: string;
//   }>;
//   getCartTotal: () => number;
//   getCartItemsCount: () => number;
//   clearCart: () => void;
//   loading: boolean;
//   error: string | null;
//   clearError: () => void;
// }















// src/components/interfaces/cart.ts
export interface CartItem {
  id: number;
  user_id: number | null;
  product_id: number;
  quantity: number;
  price: string;
  created_at: string;
  updated_at: string;
  // Add the nested product data that comes from backend
  products?: {
    id: number;
    name: string;
    description: string;
    price: string;
    stock_quantity: number;
    category_id: number;
    image_url: string;
    created_at: string;
    updated_at: string;
    discount_percentage: number;
    views: number;
    categories: {
      id: number;
      name: string;
    };
  };
}

export interface UserCart {
  items: CartItem[];
  subtotal: number;
  totalItems: number;
  totalDiscount: number;
  grandTotal: number;
}

export interface CartContextType {
  userId: number;
  cart: CartItem[];
  addToCart: (productId: number, quantity?: number, price?: string) => Promise<{
    success: boolean;
    error?: string;
  }>;
  removeFromCart: (cartItemId: number) => Promise<{
    success: boolean;
    error?: string;
  }>;
  updateQuantity: (cartItemId: number, newQuantity: number) => Promise<{
    success: boolean;
    error?: string;
  }>;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
  clearCart: () => void;
  loading: boolean;
  error: string | null;
  clearError: () => void;
}