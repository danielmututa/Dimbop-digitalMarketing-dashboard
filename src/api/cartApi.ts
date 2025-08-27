
// import axios from "axios";
// import { apiClient } from "@/context/axios";
// import { CartItem, UserCart } from "@/lib/schemas/cartitems/cartitems";

// // Add product to cart
// export const AddToCart = async (userId: number, productId: number, quantity: number): Promise<CartItem> => {
//   try {
//     console.log('API Call - AddToCart:', { userId, productId, quantity });
    
//     const requestBody = { 
//       productId: productId,
//       quantity: quantity 
//     };
    
//     console.log('Request body:', requestBody);
//     console.log('Request URL:', `/api/products/${userId}/cart`);
    
//     const response = await apiClient.post(`/api/products/${userId}/cart`, requestBody);
    
//     console.log('API Response - AddToCart:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('API Error - AddToCart:', error);
    
//     if (axios.isAxiosError(error)) {
//       console.error('Response status:', error.response?.status);
//       console.error('Response data:', error.response?.data);
//       console.error('Request config:', error.config);
      
//       const backendError = error.response?.data;
      
//       const errorMessage = backendError?.error || 
//                           backendError?.message || 
//                           (typeof backendError === "string" ? backendError : "Add to cart failed");
      
//       throw new Error(errorMessage);
//     }
//     throw new Error("An unexpected error occurred");
//   }
// };

// // Get user cart
// export const GetUserCart = async (userId: number): Promise<UserCart> => {
//   try {
//     console.log('API Call - GetUserCart:', { userId });
    
//     const response = await apiClient.get(`/api/products/${userId}/cart`);
    
//     console.log('API Response - GetUserCart:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('API Error - GetUserCart:', error);
    
//     if (axios.isAxiosError(error)) {
//       console.error('Response status:', error.response?.status);
//       console.error('Response data:', error.response?.data);
      
//       const backendError = error.response?.data;
//       throw new Error(
//         backendError?.message || (typeof backendError === "string" ? backendError : "Failed to fetch cart")
//       );
//     }
//     throw new Error("An unexpected error occurred");
//   }
// };

// // Update cart item quantity
// export const UpdateCartItem = async (userId: number, cartItemId: number, quantity: number): Promise<CartItem> => {
//   try {
//     console.log('API Call - UpdateCartItem:', { userId, cartItemId, quantity });
    
//     const response = await apiClient.put(`/api/products/${userId}/cart/${cartItemId}`, { quantity });
    
//     console.log('API Response - UpdateCartItem:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('API Error - UpdateCartItem:', error);
    
//     if (axios.isAxiosError(error)) {
//       console.error('Response status:', error.response?.status);
//       console.error('Response data:', error.response?.data);
      
//       const backendError = error.response?.data;
//       throw new Error(
//         backendError?.message || (typeof backendError === "string" ? backendError : "Failed to update cart item")
//       );
//     }
//     throw new Error("An unexpected error occurred");
//   }
// };

// // Delete cart item - Make sure this is properly exported
// export const DeleteCartItem = async (userId: number, cartItemId: number): Promise<CartItem> => {
//   try {
//     console.log('API Call - DeleteCartItem:', { userId, cartItemId });
    
//     const response = await apiClient.delete(`/api/products/${userId}/cart/${cartItemId}`);
    
//     console.log('API Response - DeleteCartItem:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('API Error - DeleteCartItem:', error);
    
//     if (axios.isAxiosError(error)) {
//       console.error('Response status:', error.response?.status);
//       console.error('Response data:', error.response?.data);
      
//       const backendError = error.response?.data;
//       throw new Error(
//         backendError?.message || (typeof backendError === "string" ? backendError : "Failed to delete cart item")
//       );
//     }
//     throw new Error("An unexpected error occurred");
//   }
// };

// // Alternative function names in case there's a naming conflict
// export const removeCartItem = DeleteCartItem;
// export const deleteFromCart = DeleteCartItem;

// // Export all functions as a default object as well
// export default {
//   AddToCart,
//   GetUserCart,
//   UpdateCartItem,
//   DeleteCartItem,
//   removeCartItem,
//   deleteFromCart
// };





// import axios from "axios";
// import { apiClient } from "@/context/axios";
// import { CartItem, UserCart } from "@/lib/schemas/cartitems/cartitems";

// // Add product to cart
// export const AddToCart = async (userId: number, productId: number, quantity: number): Promise<CartItem> => {
//   try {
//     console.log('API Call - AddToCart:', { userId, productId, quantity });
    
//     const requestBody = { 
//       productId: productId,
//       quantity: quantity 
//     };
    
//     console.log('Request body:', requestBody);
//     console.log('Request URL:', `/api/products/${userId}/cart`);
    
//     const response = await apiClient.post(`/api/products/${userId}/cart`, requestBody);
    
//     console.log('API Response - AddToCart:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('API Error - AddToCart:', error);
    
//     if (axios.isAxiosError(error)) {
//       console.error('Response status:', error.response?.status);
//       console.error('Response data:', error.response?.data);
//       console.error('Full error response:', JSON.stringify(error.response?.data, null, 2));
      
//       const backendError = error.response?.data;
      
//       // Handle different error response structures
//       let errorMessage = "Add to cart failed";
      
//       if (typeof backendError === 'string') {
//         errorMessage = backendError;
//       } else if (backendError?.error) {
//         errorMessage = backendError.error;
//       } else if (backendError?.message) {
//         errorMessage = backendError.message;
//       } else if (error.response?.status === 500) {
//         errorMessage = "Server error. Please try again later.";
//       } else if (error.response?.status === 400) {
//         errorMessage = "Invalid request. Please check your input.";
//       }
      
//       throw new Error(errorMessage);
//     }
    
//     throw new Error("Network error. Please check your connection.");
//   }
// };

// // Get user cart - same as before
// export const GetUserCart = async (userId: number): Promise<UserCart> => {
//   try {
//     console.log('API Call - GetUserCart:', { userId });
    
//     const response = await apiClient.get(`/api/products/${userId}/cart`);
    
//     console.log('API Response - GetUserCart:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('API Error - GetUserCart:', error);
    
//     if (axios.isAxiosError(error)) {
//       console.error('Response status:', error.response?.status);
//       console.error('Response data:', error.response?.data);
      
//       const backendError = error.response?.data;
//       let errorMessage = "Failed to fetch cart";
      
//       if (typeof backendError === 'string') {
//         errorMessage = backendError;
//       } else if (backendError?.error) {
//         errorMessage = backendError.error;
//       } else if (backendError?.message) {
//         errorMessage = backendError.message;
//       }
      
//       throw new Error(errorMessage);
//     }
    
//     throw new Error("Network error. Please check your connection.");
//   }
// };

// // Update cart item quantity - same as before
// export const UpdateCartItem = async (userId: number, cartItemId: number, quantity: number): Promise<CartItem> => {
//   try {
//     console.log('API Call - UpdateCartItem:', { userId, cartItemId, quantity });
    
//     const response = await apiClient.put(`/api/products/${userId}/cart/${cartItemId}`, { quantity });
    
//     console.log('API Response - UpdateCartItem:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('API Error - UpdateCartItem:', error);
    
//     if (axios.isAxiosError(error)) {
//       console.error('Response status:', error.response?.status);
//       console.error('Response data:', error.response?.data);
      
//       const backendError = error.response?.data;
//       let errorMessage = "Failed to update cart item";
      
//       if (typeof backendError === 'string') {
//         errorMessage = backendError;
//       } else if (backendError?.error) {
//         errorMessage = backendError.error;
//       } else if (backendError?.message) {
//         errorMessage = backendError.message;
//       }
      
//       throw new Error(errorMessage);
//     }
    
//     throw new Error("Network error. Please check your connection.");
//   }
// };

// // Delete cart item - same as before
// export const DeleteCartItem = async (userId: number, cartItemId: number): Promise<CartItem> => {
//   try {
//     console.log('API Call - DeleteCartItem:', { userId, cartItemId });
    
//     const response = await apiClient.delete(`/api/products/${userId}/cart/${cartItemId}`);
    
//     console.log('API Response - DeleteCartItem:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('API Error - DeleteCartItem:', error);
    
//     if (axios.isAxiosError(error)) {
//       console.error('Response status:', error.response?.status);
//       console.error('Response data:', error.response?.data);
      
//       const backendError = error.response?.data;
//       let errorMessage = "Failed to delete cart item";
      
//       if (typeof backendError === 'string') {
//         errorMessage = backendError;
//       } else if (backendError?.error) {
//         errorMessage = backendError.error;
//       } else if (backendError?.message) {
//         errorMessage = backendError.message;
//       }
      
//       throw new Error(errorMessage);
//     }
    
//     throw new Error("Network error. Please check your connection.");
//   }
// };

// export default {
//   AddToCart,
//   GetUserCart,
//   UpdateCartItem,
//   DeleteCartItem
// };



// // src/api/cartApi.ts
// import axios from "axios";
// import { apiClient } from "@/context/axios";
// import { CartItem, UserCart } from "@/lib/schemas/cartitems/cartitems";

// // ✅ Add product to cart (send ONLY productId + quantity in body)
// export const AddToCart = async (
//   userId: number,
//   productId: number,
//   quantity: number
// ): Promise<CartItem> => {
//   try {
//     console.log("API Call - AddToCart:", { userId, productId, quantity });

//     const requestBody = {
//       productId,
//       quantity,
//     };

//     console.log("Request body:", requestBody);
//     console.log("Request URL:", `/api/products/${userId}/cart`);

//     const response = await apiClient.post(
//       `/api/products/${userId}/cart`,
//       requestBody
//     );

//     console.log("API Response - AddToCart:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("API Error - AddToCart:", error);

//     if (axios.isAxiosError(error)) {
//       console.error("Response status:", error.response?.status);
//       console.error("Response data:", error.response?.data);
//       console.error(
//         "Full error response:",
//         JSON.stringify(error.response?.data, null, 2)
//       );

//       const backendError = error.response?.data;
//       let errorMessage = "Add to cart failed";

//       if (typeof backendError === "string") {
//         errorMessage = backendError;
//       } else if (backendError?.error) {
//         // e.g. { error: "Insufficient stock" }
//         errorMessage = backendError.error;
//       } else if (backendError?.message) {
//         errorMessage = backendError.message;
//       } else if (error.response?.status === 500) {
//         errorMessage = "Server error. Please try again later.";
//       } else if (error.response?.status === 400) {
//         errorMessage = "Invalid request. Please check your input.";
//       }

//       const customError = new Error(errorMessage);
//       (customError as any).response = error.response;
//       throw customError;
//     }

//     throw new Error("Network error. Please check your connection.");
//   }
// };

// // ✅ Get user cart
// export const GetUserCart = async (userId: number): Promise<UserCart> => {
//   try {
//     console.log("API Call - GetUserCart:", { userId });

//     const response = await apiClient.get(`/api/products/${userId}/cart`);

//     console.log("API Response - GetUserCart:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("API Error - GetUserCart:", error);

//     if (axios.isAxiosError(error)) {
//       console.error("Response status:", error.response?.status);
//       console.error("Response data:", error.response?.data);

//       const backendError = error.response?.data;
//       let errorMessage = "Failed to fetch cart";

//       if (typeof backendError === "string") {
//         errorMessage = backendError;
//       } else if (backendError?.error) {
//         errorMessage = backendError.error;
//       } else if (backendError?.message) {
//         errorMessage = backendError.message;
//       }

//       throw new Error(errorMessage);
//     }

//     throw new Error("Network error. Please check your connection.");
//   }
// };

// // ✅ Update cart item quantity
// export const UpdateCartItem = async (
//   userId: number,
//   cartItemId: number,
//   quantity: number
// ): Promise<CartItem> => {
//   try {
//     console.log("API Call - UpdateCartItem:", { userId, cartItemId, quantity });

//     const response = await apiClient.put(
//       `/api/products/${userId}/cart/${cartItemId}`,
//       { quantity }
//     );

//     console.log("API Response - UpdateCartItem:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("API Error - UpdateCartItem:", error);

//     if (axios.isAxiosError(error)) {
//       console.error("Response status:", error.response?.status);
//       console.error("Response data:", error.response?.data);

//       const backendError = error.response?.data;
//       let errorMessage = "Failed to update cart item";

//       if (typeof backendError === "string") {
//         errorMessage = backendError;
//       } else if (backendError?.error) {
//         errorMessage = backendError.error;
//       } else if (backendError?.message) {
//         errorMessage = backendError.message;
//       }

//       throw new Error(errorMessage);
//     }

//     throw new Error("Network error. Please check your connection.");
//   }
// };

// // ✅ Delete cart item
// export const DeleteCartItem = async (
//   userId: number,
//   cartItemId: number
// ): Promise<CartItem> => {
//   try {
//     console.log("API Call - DeleteCartItem:", { userId, cartItemId });

//     const response = await apiClient.delete(
//       `/api/products/${userId}/cart/${cartItemId}`
//     );

//     console.log("API Response - DeleteCartItem:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("API Error - DeleteCartItem:", error);

//     if (axios.isAxiosError(error)) {
//       console.error("Response status:", error.response?.status);
//       console.error("Response data:", error.response?.data);

//       const backendError = error.response?.data;
//       let errorMessage = "Failed to delete cart item";

//       if (typeof backendError === "string") {
//         errorMessage = backendError;
//       } else if (backendError?.error) {
//         errorMessage = backendError.error;
//       } else if (backendError?.message) {
//         errorMessage = backendError.message;
//       }

//       throw new Error(errorMessage);
//     }

//     throw new Error("Network error. Please check your connection.");
//   }
// };

// export default {
//   AddToCart,
//   GetUserCart,
//   UpdateCartItem,
//   DeleteCartItem,
// };





// src/api/cartApi.ts
import axios from "axios";
import { apiClient } from "@/context/axios";
import { CartItem, UserCart } from "@/lib/schemas/cartitems/cartitems";

// ✅ Add product to cart - include userId in URL
// src/api/cartApi.ts
export const AddToCart = async (
  userId: number, // Accept userId as parameter instead of getting from localStorage
  productId: number,
  quantity: number
): Promise<CartItem> => {
  try {
    console.log("API Call - AddToCart:", { userId, productId, quantity });

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const response = await apiClient.post(`/api/products/${userId}/cart`, { 
      productId, 
      quantity 
    });

    console.log("API Response - AddToCart:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error - AddToCart:", error);

    if (axios.isAxiosError(error)) {
      const backendError = error.response?.data;
      let errorMessage = "Add to cart failed";

      if (typeof backendError === "string") errorMessage = backendError;
      else if (backendError?.error) errorMessage = backendError.error;
      else if (backendError?.message) errorMessage = backendError.message;
      else if (error.response?.status === 500) errorMessage = "Server error. Please try again later.";
      else if (error.response?.status === 400) errorMessage = "Invalid request. Please check your input.";

      const customError = new Error(errorMessage);
      (customError as any).response = error.response;
      throw customError;
    }

    throw new Error("Network error. Please check your connection.");
  }
};




// ✅ Get user cart - include userId in URL
export const GetUserCart = async (userId: number): Promise<UserCart> => {
  try {
    console.log("API Call - GetUserCart for userId:", userId);

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const response = await apiClient.get(`/api/products/${userId}/cart`);

    console.log("API Response - GetUserCart:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error - GetUserCart:", error);

    if (axios.isAxiosError(error)) {
      const backendError = error.response?.data;
      let errorMessage = "Failed to fetch cart";

      if (typeof backendError === "string") errorMessage = backendError;
      else if (backendError?.error) errorMessage = backendError.error;
      else if (backendError?.message) errorMessage = backendError.message;

      throw new Error(errorMessage);
    }

    throw new Error("Network error. Please check your connection.");
  }
};
// ✅ Update cart item quantity
// ✅ Update cart item - include userId in URL

export const UpdateCartItem = async (
  userId: number,
  cartItemId: number,
  quantity: number
): Promise<CartItem> => {
  try {
    console.log("API Call - UpdateCartItem:", { userId, cartItemId, quantity });

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const response = await apiClient.put(`/api/products/${userId}/cart/${cartItemId}`, { quantity });

    console.log("API Response - UpdateCartItem:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error - UpdateCartItem:", error);

    if (axios.isAxiosError(error)) {
      const backendError = error.response?.data;
      let errorMessage = "Failed to update cart item";

      if (typeof backendError === "string") errorMessage = backendError;
      else if (backendError?.error) errorMessage = backendError.error;
      else if (backendError?.message) errorMessage = backendError.message;

      throw new Error(errorMessage);
    }

    throw new Error("Network error. Please check your connection.");
  }
};

// ✅ Delete cart item
// ✅ Delete cart item - include userId in URL
export const DeleteCartItem = async (
  userId: number,
  cartItemId: number
): Promise<CartItem> => {
  try {
    console.log("API Call - DeleteCartItem:", { userId, cartItemId });

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const response = await apiClient.delete(`/api/products/${userId}/cart/${cartItemId}`);

    console.log("API Response - DeleteCartItem:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error - DeleteCartItem:", error);

    if (axios.isAxiosError(error)) {
      const backendError = error.response?.data;
      let errorMessage = "Failed to delete cart item";

      if (typeof backendError === "string") errorMessage = backendError;
      else if (backendError?.error) errorMessage = backendError.error;
      else if (backendError?.message) errorMessage = backendError.message;

      throw new Error(errorMessage);
    }

    throw new Error("Network error. Please check your connection.");
  }
};

export default {
  AddToCart,
  GetUserCart,
  UpdateCartItem,
  DeleteCartItem,
};
