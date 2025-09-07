import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuthStore } from '@/context/userContext';
// import { ProtectedRoute } from '@/Auth/Protectedroutes/ProtectedRoutes';
import {RoleProtectedRoute} from '@/Auth/RoleBaseselection';
import RoleBasedRedirect from './Auth/Protectedroutes/RolebasedRedirect';
import { AuthRoute } from '@/Auth/AuthRoute/AuthRoute';
import { CartProvider } from './components/shop/CartContext';
import Navbar from "./components/Navbar";
import MediaNavbar from "./components/SMNavbar";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import Aboutus from "./components/pages/Aboutus";
import Aboutteam from "./components/pages/Aboutteam";
import Services from "./components/pages/Services";
import Contactpage from "./components/pages/Contactpage";
import FQA from "./components/pages/FQA";
import Whilelist from "./components/pages/Whilelist";
import Shop from "./components/shop/Shop";
import Categories from "./components/shop/Categories";
import Account from "./components/shop/Account";
import Blog from "./components/blogs/Blog";
import Blogarticle from "./components/blogs/Blogarticle";
import CartItems from "./components/shop/Cartitems"; // Ensure this is the correct path
import PaymentForm from "./components/payments/PaymentForm";

// import Aichart from "./components/AiandDatabase/Aichart";
import AIChartbot from "./components/AiandDatabase/Chartbot"



// Lazy pages
const HomePage = lazy(() => import('./pages/Home'));
const FeedbackPage = lazy(() => import('./pages/Feedback'));
const OrdersPage = lazy(() => import('./pages/Orders'));
const ProductsPage = lazy(() => import('./pages/Products'));
const UsersPage = lazy(() => import('./pages/Users'));
const BlogPage = lazy(() => import('./pages/Blogs'));
const LoginPage = lazy(() => import('./Auth/Login'));
const RegisterPage = lazy(() => import('./Auth/Register'));
const SelectrolePage = lazy(() => import('./Auth/Roleselection'));
const ProductShowcases = lazy(() => import('./pages/ProductShowcase'));
const BlogShowcases = lazy(() => import('./pages/BlogShowcase'));



function App() {



  
//   const { initializeAuth } = useAuthStore();
  
//   useEffect(() => {
//     initializeAuth();
//   }, [initializeAuth]);
  
//   return (
//     <>
//       {/* E-COMMERCE ROUTES - For users only */}
//       <CartProvider>
//         <Suspense fallback={<div>Loading...</div>}>
//           <Routes>
//             {/* User-protected routes */}
//             <Route element={<RoleProtectedRoute requiredRole="user" redirectTo="/" />}>
//               <Route
//                 path="/home"
//                 element={
//                   <>
//                     <Navbar />
//                     <MediaNavbar />
//                     <Home />
//                     <Footer />
//                   </>
//                 }
//               />
//               <Route
//                 path="/search"
//                 element={
//                   <>
//                     <Navbar />
//                     <MediaNavbar />
//                     <AIChartbot />
//                     <Footer />
//                   </>
//                 }
//               />
//               <Route
//                 path="/blog"
//                 element={
//                   <>
//                     <Navbar />
//                     <MediaNavbar />
//                     <Blog />
//                     <Footer />
//                   </>
//                 }
//               />
//               <Route
//                 path="/blog/:id"
//                 element={
//                   <>
//                     <Navbar />
//                     <MediaNavbar />
//                     <Blog />
//                     <Footer />
//                   </>
//                 }
//               />
//               <Route
//                 path="/blogarticle"
//                 element={
//                   <>
//                     <Navbar />
//                     <MediaNavbar />
//                     <Blogarticle />
//                     <Footer />
//                   </>
//                 }
//               />
//               <Route
//                 path="/about"
//                 element={
//                   <>
//                     <Navbar />
//                     <MediaNavbar />
//                     <Aboutus />
//                     <Footer />
//                   </>
//                 }
//               />
//               <Route
//                 path="/team"
//                 element={
//                   <>
//                     <Navbar />
//                     <MediaNavbar />
//                     <Aboutteam />
//                     <Footer />
//                   </>
//                 }
//               />
//               <Route
//                 path="/services"
//                 element={
//                   <>
//                     <Navbar />
//                     <MediaNavbar />
//                     <Services />
//                     <Footer />
//                   </>
//                 }
//               />
//               <Route
//                 path="/contact"
//                 element={
//                   <>
//                     <Navbar />
//                     <MediaNavbar />
//                     <Contactpage />
//                     <Footer />
//                   </>
//                 }
//               />
//               <Route
//                 path="/faq"
//                 element={
//                   <>
//                     <Navbar />
//                     <MediaNavbar />
//                     <FQA />
//                     <Footer />
//                   </>
//                 }
//               />
//               <Route
//                 path="/whilelist"
//                 element={
//                   <>
//                     <Navbar />
//                     <MediaNavbar />
//                     <Whilelist />
//                     <Footer />
//                   </>
//                 }
//               />
//               <Route
//                 path="/shop"
//                 element={
//                   <>
//                     <Navbar />
//                     <MediaNavbar />
//                     <Shop />
//                     <Footer />
//                   </>
//                 }
//               />
//               <Route
//                 path="/categories"
//                 element={
//                   <>
//                     <Navbar />
//                     <MediaNavbar />
//                     <Categories />
//                     <Footer />
//                   </>
//                 }
//               />
//               <Route
//                 path="/account"
//                 element={
//                   <>
//                     <Navbar />
//                     <MediaNavbar />
//                     <Account />
//                     <Footer />
//                   </>
//                 }
//               />
//               <Route
//                 path="/cart"
//                 element={
//                   <>
//                     <Navbar />
//                     <MediaNavbar />
//                     <CartItems />
//                     <Footer />
//                   </>
//                 }
//               />
//               <Route
//                 path="/bill"
//                 element={
//                   <>
//                     <Navbar />
//                     <MediaNavbar />
//                     <PaymentForm />
//                     <Footer />
//                   </>
//                 }
//               />
//             </Route>
//           </Routes>
//         </Suspense>
//       </CartProvider>

//       {/* ADMIN DASHBOARD ROUTES - For admins only */}
//       <Suspense fallback={<div>Loading Dashboard...</div>}>
//         <Routes>
//           {/* Auth routes (accessible to everyone) */}
//           <Route element={<AuthRoute />}>
//             <Route path="/login" element={<LoginPage />} />
//             {/* <Route path="/register" element={<RegisterPage />} /> */}
//             <Route path="/register" element={<SelectrolePage />} />
//             {/* <Route path ='/selectrole' element ={<SelectrolePage/>}/> */}
//     <Route path="/register/user" element={<RegisterPage />} />
//     <Route path="/register/admin" element={<RegisterPage role="admin" />} />
//           </Route>

//           {/* Admin-protected routes */}
//           <Route element={<RoleProtectedRoute requiredRole="admin" redirectTo="/home" />}>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/feedback" element={<FeedbackPage />} />
//             <Route path="/orders" element={<OrdersPage />} />
//             <Route path="/products" element={<ProductsPage />} />
//             <Route path="/users" element={<UsersPage />} />
//             <Route path="/blogs" element={<BlogPage />} />
//             <Route path="/prodt" element={<ProductShowcases />} />
//             <Route path="/blogshowcase" element={<BlogShowcases />} />
//           </Route>

//           {/* Fallback route - redirect based on role */}
//           <Route path="*" element={<RoleBasedRedirect />} />
//         </Routes>
//       </Suspense>
//     </>
//   );
// }


// export default App;




 const { initializeAuth } = useAuthStore();
  
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);
  
  return (
    <>
      {/* E-COMMERCE ROUTES - For users only */}
      <CartProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Auth routes (accessible to everyone) */}
            <Route element={<AuthRoute />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<SelectrolePage />} />
              <Route path="/register/user" element={<RegisterPage />} />
              <Route path="/register/admin" element={<RegisterPage role="admin" />} />
            </Route>

            {/* User-protected routes */}
            <Route element={<RoleProtectedRoute requiredRole="user" redirectTo="/login" />}>
              <Route
                path="/home"
                element={
                  <>
                    <Navbar />
                    <MediaNavbar />
                    <Home />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/search"
                element={
                  <>
                    <Navbar />
                    <MediaNavbar />
                    <AIChartbot />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/blog"
                element={
                  <>
                    <Navbar />
                    <MediaNavbar />
                    <Blog />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/blog/:id"
                element={
                  <>
                    <Navbar />
                    <MediaNavbar />
                    <Blog />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/blogarticle"
                element={
                  <>
                    <Navbar />
                    <MediaNavbar />
                    <Blogarticle />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/about"
                element={
                  <>
                    <Navbar />
                    <MediaNavbar />
                    <Aboutus />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/team"
                element={
                  <>
                    <Navbar />
                    <MediaNavbar />
                    <Aboutteam />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/services"
                element={
                  <>
                    <Navbar />
                    <MediaNavbar />
                    <Services />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/contact"
                element={
                  <>
                    <Navbar />
                    <MediaNavbar />
                    <Contactpage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/faq"
                element={
                  <>
                    <Navbar />
                    <MediaNavbar />
                    <FQA />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/whilelist"
                element={
                  <>
                    <Navbar />
                    <MediaNavbar />
                    <Whilelist />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/shop"
                element={
                  <>
                    <Navbar />
                    <MediaNavbar />
                    <Shop />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/categories"
                element={
                  <>
                    <Navbar />
                    <MediaNavbar />
                    <Categories />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/account"
                element={
                  <>
                    <Navbar />
                    <MediaNavbar />
                    <Account />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/cart"
                element={
                  <>
                    <Navbar />
                    <MediaNavbar />
                    <CartItems />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/bill"
                element={
                  <>
                    <Navbar />
                    <MediaNavbar />
                    <PaymentForm />
                    <Footer />
                  </>
                }
              />
            </Route>

            {/* Admin-protected routes */}
            <Route element={<RoleProtectedRoute requiredRole="admin" redirectTo="/home" />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/feedback" element={<FeedbackPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/blogs" element={<BlogPage />} />
              <Route path="/prodt" element={<ProductShowcases />} />
              <Route path="/blogshowcase" element={<BlogShowcases />} />
            </Route>

            {/* Fallback route - redirect based on role */}
            <Route path="*" element={<RoleBasedRedirect />} />
          </Routes>
        </Suspense>
      </CartProvider>
    </>
  );
}

export default App;










  //   const { initializeAuth } = useAuthStore();
  
  //   useEffect(() => {
  //     initializeAuth();
  //   }, [initializeAuth]);
  
  //   return (
  //     <>
  //       {/* E-COMMERCE + PUBLIC ROUTES (wrapped in CartProvider) */}
        
  
  
  
  
  
  
  // <CartProvider>
  //       <Suspense fallback={<div>Loading...</div>}>
  //         <Routes>
  //           <Route
  //             path="/home"
  //             element={
  //               <>
  //                 <Navbar />
  //                 <MediaNavbar />
  //                 <Home />
  //                 <Footer />
  //               </>
  //             }
  //           />
  
  
  //           <Route
  //             path="/search"
  //             element={
  //               <>
  //                 <Navbar />
  //                 <MediaNavbar />
  //                 < AIChartbot />
  //                 <Footer />
  //               </>
  //             }
  //           />
  
  
  
  
  //           <Route
  //             path="/blog"
  //             element={
  //               <>
  //                 <Navbar />
  //                 <MediaNavbar />
  //                 <Blog />
  //                 <Footer />
  //               </>
  //             }
  //           />
  //           <Route
  //             path="/blog/:id"
  //             element={
  //               <>
  //                 <Navbar />
  //                 <MediaNavbar />
  //                 <Blog />
  //                 <Footer />
  //               </>
  //             }
  //           />
  //           <Route
  //             path="/blogarticle"
  //             element={
  //               <>
  //                 <Navbar />
  //                 <MediaNavbar />
  //                 <Blogarticle />
  //                 <Footer />
  //               </>
  //             }
  //           />
  //           <Route
  //             path="/about"
  //             element={
  //               <>
  //                 <Navbar />
  //                 <MediaNavbar />
  //                 <Aboutus />
  //                 <Footer />
  //               </>
  //             }
  //           />
  //           <Route
  //             path="/team"
  //             element={
  //               <>
  //                 <Navbar />
  //                 <MediaNavbar />
  //                 <Aboutteam />
  //                 <Footer />
  //               </>
  //             }
  //           />
  //           <Route
  //             path="/services"
  //             element={
  //               <>
  //                 <Navbar />
  //                 <MediaNavbar />
  //                 <Services />
  //                 <Footer />
  //               </>
  //             }
  //           />
  //           <Route
  //             path="/contact"
  //             element={
  //               <>
  //                 <Navbar />
  //                 <MediaNavbar />
  //                 <Contactpage />
  //                 <Footer />
  //               </>
  //             }
  //           />
  //           <Route
  //             path="/faq"
  //             element={
  //               <>
  //                 <Navbar />
  //                 <MediaNavbar />
  //                 <FQA />
  //                 <Footer />
  //               </>
  //             }
  //           />
  //           <Route
  //             path="/whilelist"
  //             element={
  //               <>
  //                 <Navbar />
  //                 <MediaNavbar />
  //                 <Whilelist />
  //                 <Footer />
  //               </>
  //             }
  //           />
  //           <Route
  //             path="/shop"
  //             element={
  //               <>
  //                 <Navbar />
  //                 <MediaNavbar />
  //                 <Shop />
  //                 <Footer />
  //               </>
  //             }
  //           />
  //           <Route
  //             path="/categories"
  //             element={
  //               <>
  //                 <Navbar />
  //                 <MediaNavbar />
  //                 <Categories />
  //                 <Footer />
  //               </>
  //             }
  //           />
  //           <Route
  //             path="/account"
  //             element={
  //               <>
  //                 <Navbar />
  //                 <MediaNavbar />
  //                 <Account />
  //                 <Footer />
  //               </>
  //             }
  //           />
  //           <Route
  //             path="/cart"
  //             element={
  //               <>
  //                 <Navbar />
  //                 <MediaNavbar />
  //                 <CartItems />
  //                 <Footer />
  //               </>
  //             }
  //           />
  //           <Route
  //             path="/bill"
  //             element={
  //               <>
  //                 <Navbar />
  //                 <MediaNavbar />
  //                 <PaymentForm />
  //                 <Footer />
  //               </>
  //             }
  //           />
  //         </Routes>
  //       </Suspense>
  //     </CartProvider>
  
  //       {/* AUTH & DASHBOARD ROUTES (no CartProvider) */}
  //       <Suspense fallback={<div>Loading Dashboard...</div>}>
  //         <Routes>
  //           {/* Auth routes */}
  //           <Route element={<AuthRoute />}>
  //             <Route path="/login" element={<LoginPage />} />
  //             <Route path="/register" element={<RegisterPage />} />
  //           </Route>
  
  //           {/* Dashboard routes (protected) */}
  //           <Route element={<ProtectedRoute />}>
  //             <Route path="/" element={<HomePage />} />
  //             <Route path="/feedback" element={<FeedbackPage />} />
  //             <Route path="/orders" element={<OrdersPage />} />
  //             <Route path="/products" element={<ProductsPage />} />
  //             <Route path="/users" element={<UsersPage />} />
  //             <Route path="/blogs" element={<BlogPage />} />
  //             <Route path="/prodt" element={<ProductShowcases />} />
  //             <Route path="/blogshowcase" element={<BlogShowcases />} />
  //           </Route>
  //         </Routes>
  //       </Suspense>
  //     </>
  //   );
  // }
  
  // export default App;