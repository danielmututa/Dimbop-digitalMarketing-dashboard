// import { Check, X } from 'lucide-react'
// import React from 'react'
// import Fastdelivary from '../home/Fastdelivary'

// // ✅ Import images directly instead of using require()
// import IphonBxed from '../Images/IphonBxed.jpg'
// import IphoneSiv from '../Images/IphoneSiv.jpg'

// interface WhilelistItem {
//   img: string;
//   type: string;
//   name: string;
//   price: string;
//   stockstatus: string;
//   icon: React.ComponentType<{ size?: number }>;
// }

// const Whilelist: React.FC = () => {
//   const whilist: WhilelistItem[] = [
//     {
//       img: IphonBxed,
//       type: "Iphone",
//       name: "iPhone 13 Pro Max",
//       price: "$200",
//       stockstatus: "out of stock",
//       icon: X
//     },
//     {
//       img: IphoneSiv,
//       type: "Iphone",
//       name: "iPhone 15 Pro Max",
//       price: "$450",
//       stockstatus: "Available", // ✅ fixed typo
//       icon: Check
//     }
//   ]

//   return (
//     <div className="pb-[50px] md:pb-[60px] xl:pb-20">
//       <div className='pt-[80px] md:pt-[80px] lg:pt-[90px] xl:pt-[100px] px-5 md:px-10 lg:px-[80px] xl:px-[100px] pb-[50px] md:pb-[60px] xl:pb-[80px]'> 
//         <h2 className='font-montserratBold text-[20px] md:text-[23px] xl:text-[26px]'>Whilelist</h2>
//         <div className="w-full mt-4 md:mt-6 lg:mt-8 xl:mt-10 items-center flex justify-between">
//           <div className="w-[33%] xl:w-[44%] font-montserrat text-sm md:text-[16px] text-[18px]">
//             <p>PRODUCT</p>
//           </div>
//           <div className="w-[60%] md:w-[44%] xl:w-[44%] font-montserrat flex gap-5 md:gap-10 lg:gap-14 xl:gap-20">
//             <p className="font-montserrat text-sm md:text-[16px] text-[18px]">PRICE</p>
//             <p className="font-montserrat text-sm md:text-[16px] text-[18px]">STOCK STATUS</p>
//           </div>
//         </div>
//         <div className="w-full border border-buttons mb-4 mt-2"></div>
//         <div className="flex justify-between flex-col gap-5">
//           {whilist.map((whilelist, index) => (
//             <div key={index} className="flex items-center justify-between w-full">
//               <div className="flex flex-col md:flex-row w-[33%] md:w-[44%] items-start md:items-center gap-1 md:gap-5 lg:gap-8">
//                 <img 
//                   src={whilelist.img} 
//                   className='h-[100px] w-[100px] object-cover' 
//                   alt={`${whilelist.name} product`} 
//                 />
//                 <div className="flex gap-1 md:gap-3 flex-col">
//                   <p className='font-montserratBold text-sm md:text-[16px] xl:text-[18px]'>{whilelist.type}</p>
//                   <p className='font-montserrat text-[12px] md:text-[16px] xl:text-[18px]'>{whilelist.name}</p>
//                 </div>
//               </div>

//               <div className="w-[60%] md:w-[44%] font-montserrat flex gap-2 md:gap-16 xl:gap-20">
//                 <div className="flex gap-7 md:gap-10 lg:gap-16 xl:gap-20 w-[350px] md:w-[250px]">
//                   <p className='font-montserrat text-sm md:text-[16px] xl:text-[18px]'>{whilelist.price}</p>
//                   <p className='font-montserrat text-sm md:text-[16px] xl:text-[18px]'>{whilelist.stockstatus}</p>
//                 </div>
//                 <whilelist.icon size={28} />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <Fastdelivary/>
//     </div>
//   )
// }

// export default Whilelist







// import { useState, useEffect } from 'react';
// import { Check, X } from 'lucide-react';
// import Fastdelivary from '../home/Fastdelivary';
// import { useCart } from '../shop/CartContext';
// import { toast } from 'sonner';

// interface WishlistItem {
//   id: number;
//   name: string;
//   price: string;
//   stock_quantity: number;
//   image_url: string;
//   type: string; // Using category name as type
// }

// const Wishlist = () => {
//   const { addToCart } = useCart();
//   const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

//   useEffect(() => {
//     const savedWishlist = localStorage.getItem('wishlist');
//     if (savedWishlist) {
//       setWishlist(JSON.parse(savedWishlist));
//     }
//   }, []);

//   const removeFromWishlist = (productId: number) => {
//     const updatedWishlist = wishlist.filter(item => item.id !== productId);
//     localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
//     setWishlist(updatedWishlist);
//     toast.success('Removed from wishlist');
//   };

//   const handleAddToCart = (product: WishlistItem) => {
//     if (product.stock_quantity <= 0) {
//       toast.error('This product is currently out of stock.');
//       return;
//     }
    
//     addToCart({
//       id: product.id.toString(),
//       name: product.name,
//       type: product.type,
//       price: parseFloat(product.price),
//       image_url: product.image_url,
//       stock_quantity: product.stock_quantity,
//       availability: product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'
//     }, 1);
    
//     toast.success('Added to cart');
//   };

//   return (
//     <div className="pb-[50px] md:pb-[60px] xl:pb-20">
//       <div className='pt-[80px] md:pt-[80px] lg:pt-[90px] xl:pt-[100px] px-5 md:px-10 lg:px-[80px] xl:px-[100px] pb-[50px] md:pb-[60px] xl:pb-[80px]'> 
//         <h2 className='font-montserratBold text-[20px] md:text-[23px] xl:text-[26px]'>Wishlist</h2>
//         <div className="w-full mt-4 md:mt-6 lg:mt-8 xl:mt-10 items-center flex justify-between">
//           <div className="w-[33%] xl:w-[44%] font-montserrat text-sm md:text-[16px] text-[18px]">
//             <p>PRODUCT</p>
//           </div>
//           <div className="w-[60%] md:w-[44%] xl:w-[44%] font-montserrat flex gap-5 md:gap-10 lg:gap-14 xl:gap-20">
//             <p className="font-montserrat text-sm md:text-[16px] text-[18px]">PRICE</p>
//             <p className="font-montserrat text-sm md:text-[16px] text-[18px]">STOCK STATUS</p>
//           </div>
//         </div>
//         <div className="w-full border border-buttons mb-4 mt-2"></div>
//         <div className="flex justify-between flex-col gap-5">
//           {wishlist.length === 0 ? (
//             <p className="text-center py-10">Your wishlist is empty</p>
//           ) : (
//             wishlist.map((item) => (
//               <div key={item.id} className="flex items-center justify-between w-full">
//                 <div className="flex flex-col md:flex-row w-[33%] md:w-[44%] items-start md:items-center gap-1 md:gap-5 lg:gap-8">
//                   <img 
//                     src={item.image_url.startsWith('http') ? item.image_url : `/placeholder-image.jpg`} 
//                     className='h-[100px] w-[100px] object-cover' 
//                     alt={item.name}
//                     onError={(e) => {
//                       e.currentTarget.src = '/placeholder-image.jpg';
//                     }}
//                   />
//                   <div className="flex gap-1 md:gap-3 flex-col">
//                     <p className='font-montserratBold text-sm md:text-[16px] xl:text-[18px]'>{item.type}</p>
//                     <p className='font-montserrat text-[12px] md:text-[16px] xl:text-[18px]'>{item.name}</p>
//                   </div>
//                 </div>

//                 <div className="w-[60%] md:w-[44%] font-montserrat flex gap-2 md:gap-16 xl:gap-20">
//                   <div className="flex gap-7 md:gap-10 lg:gap-16 xl:gap-20 w-[350px] md:w-[250px]">
//                     <p className='font-montserrat text-sm md:text-[16px] xl:text-[18px]'>
//                       ${parseFloat(item.price).toFixed(2)}
//                     </p>
//                     <p className={`font-montserrat text-sm md:text-[16px] xl:text-[18px] ${
//                       item.stock_quantity > 0 ? 'text-green-500' : 'text-red-500'
//                     }`}>
//                       {item.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
//                     </p>
//                   </div>
//                   <div className="flex gap-4">
//                     <button 
//                       onClick={() => handleAddToCart(item)}
//                       disabled={item.stock_quantity <= 0}
//                       className={`${item.stock_quantity <= 0 ? 'opacity-50 cursor-not-allowed' : 'hover:text-green-500'}`}
//                     >
//                       <ShoppingCart size={28} />
//                     </button>
//                     <button 
//                       onClick={() => removeFromWishlist(item.id)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       <X size={28} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//       <Fastdelivary/>
//     </div>
//   );
// };

// export default Wishlist;

















// import { useState, useEffect } from 'react';
// import { Check, X, ShoppingCart } from 'lucide-react';
// import Fastdelivary from '../home/Fastdelivary';
// import { useCart } from '../shop/CartContext';
// import { toast } from 'sonner';
// import { useNavigate } from 'react-router-dom';

// interface WishlistItem {
//   id: number;
//   name: string;
//   price: string;
//   stock_quantity: number;
//   image_url: string;
//   categories: { id: number; name: string } | null;
// }

// const Wishlist = () => {
//   const { addToCart } = useCart();
//   const navigate = useNavigate();
//   const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://dimpo-pbackend.onrender.com';

//   // Normalize image URL
//   const getImageUrl = (imageUrl: string) => {
//     if (!imageUrl) return '/placeholder-image.jpg';
//     if (imageUrl.startsWith('http')) return imageUrl;
//     return `${BASE_URL}${imageUrl}`;
//   };

//   useEffect(() => {
//     const savedWishlist = localStorage.getItem('wishlist');
//     if (savedWishlist) {
//       const wishlistIds: number[] = JSON.parse(savedWishlist);
      
//       // Fetch product details for each wishlist item
//       const fetchWishlistProducts = async () => {
//         try {
//           const response = await apiClient.get('/api/products');
//           const allProducts = response.data;
//           const wishlistProducts = allProducts.filter((product: Product) => 
//             wishlistIds.includes(product.id)
//           );
//           setWishlist(wishlistProducts);
//         } catch (error) {
//           toast.error('Failed to load wishlist products');
//         } finally {
//           setLoading(false);
//         }
//       };
      
//       fetchWishlistProducts();
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   const removeFromWishlist = (productId: number) => {
//     const updatedWishlistIds = wishlist
//       .filter(item => item.id !== productId)
//       .map(item => item.id);
    
//     localStorage.setItem('wishlist', JSON.stringify(updatedWishlistIds));
//     setWishlist(prev => prev.filter(item => item.id !== productId));
//     toast.success('Removed from wishlist');
//   };

//   const handleAddToCart = (product: WishlistItem) => {
//     if (product.stock_quantity <= 0) {
//       toast.error('This product is currently out of stock.');
//       return;
//     }
    
//     addToCart({
//       id: product.id.toString(),
//       name: product.name,
//       type: product.categories?.name || 'No Category',
//       price: parseFloat(product.price),
//       image_url: product.image_url,
//       stock_quantity: product.stock_quantity,
//       availability: product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'
//     }, 1);
    
//     toast.success('Added to cart');
//   };

//   if (loading) return <div className="text-center py-10">Loading wishlist...</div>;

//   return (
//     <div className="pb-[50px] md:pb-[60px] xl:pb-20">
//       <div className='pt-[80px] md:pt-[80px] lg:pt-[90px] xl:pt-[100px] px-5 md:px-10 lg:px-[80px] xl:px-[100px] pb-[50px] md:pb-[60px] xl:pb-[80px]'> 
//         <h2 className='font-montserratBold text-[20px] md:text-[23px] xl:text-[26px]'>Wishlist</h2>
//         <div className="w-full mt-4 md:mt-6 lg:mt-8 xl:mt-10 items-center flex justify-between">
//           <div className="w-[33%] xl:w-[44%] font-montserrat text-sm md:text-[16px] text-[18px]">
//             <p>PRODUCT</p>
//           </div>
//           <div className="w-[60%] md:w-[44%] xl:w-[44%] font-montserrat flex gap-5 md:gap-10 lg:gap-14 xl:gap-20">
//             <p className="font-montserrat text-sm md:text-[16px] text-[18px]">PRICE</p>
//             <p className="font-montserrat text-sm md:text-[16px] text-[18px]">STOCK STATUS</p>
//           </div>
//         </div>
//         <div className="w-full border border-buttons mb-4 mt-2"></div>
//         <div className="flex justify-between flex-col gap-5">
//           {wishlist.length === 0 ? (
//             <div className="text-center py-10">
//               <p>Your wishlist is empty</p>
//               <button 
//                 onClick={() => navigate('/products')}
//                 className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//               >
//                 Browse Products
//               </button>
//             </div>
//           ) : (
//             wishlist.map((item) => (
//               <div key={item.id} className="flex items-center justify-between w-full">
//                 <div className="flex flex-col md:flex-row w-[33%] md:w-[44%] items-start md:items-center gap-1 md:gap-5 lg:gap-8">
//                   <img 
//                     src={getImageUrl(item.image_url)}
//                     className='h-[100px] w-[100px] object-cover' 
//                     alt={item.name}
//                     onError={(e) => {
//                       e.currentTarget.src = '/placeholder-image.jpg';
//                     }}
//                   />
//                   <div className="flex gap-1 md:gap-3 flex-col">
//                     <p className='font-montserratBold text-sm md:text-[16px] xl:text-[18px]'>
//                       {item.categories?.name || 'No Category'}
//                     </p>
//                     <p className='font-montserrat text-[12px] md:text-[16px] xl:text-[18px]'>{item.name}</p>
//                   </div>
//                 </div>

//                 <div className="w-[60%] md:w-[44%] font-montserrat flex gap-2 md:gap-16 xl:gap-20">
//                   <div className="flex gap-7 md:gap-10 lg:gap-16 xl:gap-20 w-[350px] md:w-[250px]">
//                     <p className='font-montserrat text-sm md:text-[16px] xl:text-[18px]'>
//                       ${parseFloat(item.price).toFixed(2)}
//                     </p>
//                     <p className={`font-montserrat text-sm md:text-[16px] xl:text-[18px] ${
//                       item.stock_quantity > 0 ? 'text-green-500' : 'text-red-500'
//                     }`}>
//                       {item.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
//                     </p>
//                   </div>
//                   <div className="flex gap-4">
//                     <button 
//                       onClick={() => handleAddToCart(item)}
//                       disabled={item.stock_quantity <= 0}
//                       className={`${item.stock_quantity <= 0 ? 'opacity-50 cursor-not-allowed' : 'hover:text-green-500'}`}
//                     >
//                       <ShoppingCart size={28} />
//                     </button>
//                     <button 
//                       onClick={() => removeFromWishlist(item.id)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       <X size={28} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//       <Fastdelivary/>
//     </div>
//   );
// };

// export default Wishlist;






import { useState, useEffect } from 'react';
import { Check, X, ShoppingCart } from 'lucide-react';
import Fastdelivary from '../home/Fastdelivary';
import { useCart } from '../shop/CartContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface WishlistItem {
  id: number;
  name: string;
  price: string;
  stock_quantity: number;
  image_url: string;
  categories: { id: number; name: string } | null;
}

const Wishlist = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://dimpo-pbackend.onrender.com';

  const getImageUrl = (imageUrl: string) => {
    if (!imageUrl) return '/placeholder-image.jpg';
    if (imageUrl.startsWith('http')) return imageUrl;
    return `${BASE_URL}${imageUrl}`;
  };

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
    setLoading(false);
  }, []);

  const removeFromWishlist = (productId: number) => {
    const updatedWishlist = wishlist.filter(item => item.id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    toast.success('Removed from wishlist');
  };

  const handleAddToCart = (product: WishlistItem) => {
    if (product.stock_quantity <= 0) {
      toast.error('This product is currently out of stock.');
      return;
    }

    addToCart({
      id: product.id.toString(),
      name: product.name,
      type: product.categories?.name || 'No Category',
      price: parseFloat(product.price),
      image_url: product.image_url,
      stock_quantity: product.stock_quantity,
      availability: product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'
    }, 1);

    toast.success('Added to cart');
  };

  if (loading) return <div className="text-center py-10">Loading wishlist...</div>;

  return (
    <div className="pb-[50px] md:pb-[60px] xl:pb-20">
      <div className="pt-[80px] md:pt-[80px] lg:pt-[90px] xl:pt-[100px] px-5 md:px-10 lg:px-[80px] xl:px-[100px] pb-[50px] md:pb-[60px] xl:pb-[80px]">
        <h2 className="font-montserratBold text-[20px] md:text-[23px] xl:text-[26px]">Wishlist</h2>
        <div className="w-full mt-4 md:mt-6 lg:mt-8 xl:mt-10 items-center flex justify-between">
          <div className="w-[33%] xl:w-[44%] font-montserrat text-sm md:text-[16px] text-[18px]">
            <p>PRODUCT</p>
          </div>
          <div className="w-[60%] md:w-[44%] xl:w-[44%] font-montserrat flex gap-5 md:gap-10 lg:gap-14 xl:gap-20">
            <p className="font-montserrat text-sm md:text-[16px] text-[18px]">PRICE</p>
            <p className="font-montserrat text-sm md:text-[16px] text-[18px]">STOCK STATUS</p>
          </div>
        </div>
        <div className="w-full border border-buttons mb-4 mt-2"></div>
        <div className="flex justify-between flex-col gap-5">
          {wishlist.length === 0 ? (
            <div className="text-center py-10">
              <p>Your wishlist is empty</p>
              <button
                onClick={() => navigate('/products')}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Browse Products
              </button>
            </div>
          ) : (
            wishlist.map((item) => (
              <div key={item.id} className="flex items-center justify-between w-full">
                <div className="flex flex-col md:flex-row w-[33%] md:w-[44%] items-start md:items-center gap-1 md:gap-5 lg:gap-8">
                  <img
                    src={getImageUrl(item.image_url)}
                    className="h-[100px] w-[100px] object-cover"
                    alt={item.name}
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-image.jpg';
                    }}
                  />
                  <div className="flex gap-1 md:gap-3 flex-col">
                    <p className="font-montserratBold text-sm md:text-[16px] xl:text-[18px]">
                      {item.categories?.name || 'No Category'}
                    </p>
                    <p className="font-montserrat text-[12px] md:text-[16px] xl:text-[18px]">{item.name}</p>
                  </div>
                </div>

                <div className="w-[60%] md:w-[44%] font-montserrat flex gap-2 md:gap-16 xl:gap-20">
                  <div className="flex gap-7 md:gap-10 lg:gap-16 xl:gap-20 w-[350px] md:w-[250px]">
                    <p className="font-montserrat text-sm md:text-[16px] xl:text-[18px]">
                      ${parseFloat(item.price).toFixed(2)}
                    </p>
                    <p className={`font-montserrat text-sm md:text-[16px] xl:text-[18px] ${
                      item.stock_quantity > 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {item.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={item.stock_quantity <= 0}
                      className={`${item.stock_quantity <= 0 ? 'opacity-50 cursor-not-allowed' : 'hover:text-green-500'}`}
                    >
                      <ShoppingCart size={28} />
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={28} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Fastdelivary />
    </div>
  );
};

export default Wishlist;
