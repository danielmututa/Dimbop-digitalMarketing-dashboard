export interface Category {
    id: number;
    name: string;
  }
  
  export interface Review {
    id: number;
    user_id: number;
    product_id: number;
    rating: number;
    comment: string;
    created_at: string;
  }
  
  export interface CartItem {
    id: number;
    user_id: number | null;
    product_id: number;
    quantity: number;
    price: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    stock_quantity: number;
    category_id: number | null;
    image_url: string;
    created_at: string;
    updated_at: string;
    discount_percentage: number;
    views: number;
    categories: Category | null;
    reviews: Review[];
    cart: CartItem[];
    // order_items: OrderItem[];
  }
  