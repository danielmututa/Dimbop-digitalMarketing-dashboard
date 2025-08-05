

// import { createContext, useContext, useState } from "react"

// const CartContext = createContext()

// export const useCart = () => {
//   const context = useContext(CartContext)
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider")
//   }
//   return context
// }

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([])

//   const addToCart = (product, quantity = 1) => {
//     setCartItems((prevItems) => {
//       const existingItem = prevItems.find((item) => item.id === product.id)
//       if (existingItem) {
//         return prevItems.map((item) =>
//           item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
//         )
//       }
//       return [...prevItems, { ...product, quantity }]
//     })
//   }

//   const removeFromCart = (productId) => {
//     setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId))
//   }

//   const updateQuantity = (productId, newQuantity) => {
//     if (newQuantity <= 0) {
//       removeFromCart(productId)
//       return
//     }
//     setCartItems((prevItems) =>
//       prevItems.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item)),
//     )
//   }

//   const getCartTotal = () => {
//     return cartItems.reduce((total, item) => {
//       const price = typeof item.price === "string" ? Number.parseFloat(item.price.replace(/[^0-9.]/g, "")) : item.price
//       return total + price * item.quantity
//     }, 0)
//   }

//   const getCartItemsCount = () => {
//     return cartItems.reduce((total, item) => total + item.quantity, 0)
//   }

//   const clearCart = () => {
//     setCartItems([])
//   }

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         getCartTotal,
//         getCartItemsCount,
//         clearCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   )
// }







import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface CartItem {
  id: string | number;
  quantity: number;
  price: number | string;
  [key: string]: any; // For any additional product properties
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: CartItem, quantity?: number) => void;
  removeFromCart: (productId: string | number) => void;
  updateQuantity: (productId: string | number, newQuantity: number) => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Initialize state with localStorage data if available
    const savedCart = localStorage.getItem("cart");
    try {
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart data from localStorage", error);
      return [];
    }
  });

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: CartItem, quantity: number = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: string | number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string | number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = typeof item.price === "string" 
        ? Number.parseFloat(item.price.replace(/[^0-9.]/g, "")) 
        : item.price;
      return total + price * item.quantity;
    }, 0);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        getCartItemsCount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};