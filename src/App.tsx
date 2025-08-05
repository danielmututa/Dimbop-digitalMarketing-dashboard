
// import { lazy, Suspense, useEffect } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import { useAuthStore } from '@/context/userContext';
// import { ProtectedRoute } from '@/Auth/Protectedroutes/ProtectedRoutes';
// import { AuthRoute } from '@/Auth/AuthRoute/AuthRoute';
// // // dddddddddddddddddddddddd
// // import { ToastContainer } from "react-toastify"
// // import { CartProvider } from "./components/shop/CartContext"
// import Navbar from "./components/Navbar"
// import { CartProvider } from "./components/shop/CartContext";

// import MediaNavbar from "./components/SMNavbar"
// import Footer from "./components/footer/Footer"
// import Home from "./components/home/Home"
// import Aboutus from "./components/pages/Aboutus"
// import Aboutteam from "./components/pages/Aboutteam"
// import Services from "./components/pages/Services"
// import Contactpage from "./components/pages/Contactpage"
// import FQA from "./components/pages/FQA"
// import Whilelist from "./components/pages/Whilelist"
// import Shop from "./components/shop/Shop"
// import Categories from "./components/shop/Categories"
// import Account from "./components/shop/Account"
// import Blog from "./components/blogs/Blog"
// import Blogarticle from "./components/blogs/Blogarticle"
// import Cartitems from "./components/shop/Cartitems"
// import PaymentForm from "./components/payments/PaymentForm"
// // ddddddddddddddddddddddddddddddd

// // Lazy loaded pages
// const HomePage = lazy(() => import('./pages/Home'));
// // const CategoriesPage = lazy(() => import('./pages/Categories'));
// const FeedbackPage = lazy(() => import('./pages/Feedback'));
// const OrdersPage = lazy(() => import('./pages/Orders'));
// const ProductsPage = lazy(() => import('./pages/Products'));
// const UsersPage = lazy(() => import('./pages/Users'));
// const BlogPage = lazy(() => import('./pages/Blogs'));
// const LoginPage = lazy(() => import('./Auth/Login'));
// const RegisterPage = lazy(() => import('./Auth/Register'));
// const ProductShowcases = lazy(() => import('./pages/ProductShowcase'));
// const BlogShowcases = lazy(() => import('./pages/BlogShowcase'));
// // const Userlandingpage = lazy(() => import('./components/landing-page'));

// function App() {
//   const { initializeAuth } = useAuthStore();

//   useEffect(() => {
//     initializeAuth();
//   }, [initializeAuth]);

// //   return (


// return (
//    <CartProvider>
//   <Suspense fallback={<div>Loading...</div>}>
//     {/* These should be outside of <Routes> */}
//     <Navbar />
//     <MediaNavbar />

//     <Routes>
//       {/* Your routes go here */}
//       <Route path="/about" element={<Home />} />
//       <Route path="/" element={<Aboutus />} />
//       <Route path="/team" element={<Aboutteam />} />
//       <Route path="/services" element={<Services />} />
//       <Route path="/contact" element={<Contactpage />} />
//       <Route path="/faq" element={<FQA />} />
//       <Route path="/blog" element={<Blog />} />
//       <Route path="/blogarticle" element={<Blogarticle />} />
//       <Route path="/whilelist" element={<Whilelist />} />
//       <Route path="/shop" element={<Shop />} />
//       <Route path="/categories" element={<Categories />} />
//       <Route path="/account" element={<Account />} />
//       <Route path="/cart" element={<Cartitems />} />
//       <Route path="/bill" element={<PaymentForm />} />

//       {/* Auth routes */}
//       <Route element={<AuthRoute />}>
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//       </Route>

//       {/* Protected routes */}
//       <Route element={<ProtectedRoute />}>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/feedback" element={<FeedbackPage />} />
//         <Route path="/orders" element={<OrdersPage />} />
//         <Route path="/products" element={<ProductsPage />} />
//         <Route path="/users" element={<UsersPage />} />
//         <Route path="/blogs" element={<BlogPage />} />
//         <Route path="/prodt" element={<ProductShowcases />} />
//         <Route path="/blogshowcase" element={<BlogShowcases />} />
//       </Route>
//     </Routes>

//     {/* Footer also must be outside <Routes> */}
//     <Footer />
//   </Suspense>
//   </CartProvider>
// );


















































// //     <Suspense fallback={<div>Loading...</div>}>

   


// //       <Routes>




  
// //  <Navbar />
// //   <MediaNavbar />
     
// //       <Route path="/about" element={<Home />}/>
// //       <Route path="/" element={ <Aboutus />}/>
// //       <Route path="/team" element={ <Aboutteam />}/>
// //       <Route path="/services" element={   <Services />}/>
// //       <Route path="/contact" element={   <Contactpage />}/>
// //       <Route path="/faq" element={<FQA />}/>
// //       <Route path="/blog" element={   <Blog />}/>
// //       <Route path="/blogarticle" element={<Blogarticle />}/>
// //       <Route path="/whilelist" element={ <Whilelist />}/>
// //       <Route path="/shop" element={   <Shop />}/>
// //       <Route path="/categories" element={ <Categories />}/>
// //       <Route path="/account" element={  <Account />}/>
// //       <Route path="/cart" element={  <Cartitems />}/>
// //       <Route path="/bill" element={ <PaymentForm />}/>
      
// //        <Footer />
     




// //         {/* Auth routes */}
// //         <Route element={<AuthRoute />}>
// //           <Route path="/login" element={<LoginPage />} />
// //           <Route path ="register" element={<RegisterPage />} />
// //         {/* <Route path="/" element={<Userlandingpage />} /> */}
// //         </Route>



// //         {/* Protected routes */}
// //         <Route element={<ProtectedRoute />}>
// //           <Route path="/" element={<HomePage />} />
// //           {/* <Route path="/categories" element={<CategoriesPage />} /> */}
// //           <Route path="/feedback" element={<FeedbackPage />} />
// //           <Route path="/orders" element={<OrdersPage />} />
// //           <Route path="/products" element={<ProductsPage />} />
// //           <Route path="/users" element={<UsersPage />} />
// //           <Route path="/blogs" element={<BlogPage />} />
// //           <Route path="/prodt" element={<ProductShowcases />} />
// //           <Route path="/blogshowcase" element={<BlogShowcases/>} />
// //           <Route path="/blogshowcase" element={<BlogShowcases/>} />
// //         </Route>
// //       </Routes>
// //     </Suspense>
// //   );
// }

// export default App;








// // import { lazy, Suspense, useEffect } from "react"
// // import { Routes, Route } from "react-router-dom"
// // import { useAuthStore } from "@/context/userContext"
// // import { ProtectedRoute } from "@/Auth/Protectedroutes/ProtectedRoutes"
// // import { AuthRoute } from "@/Auth/AuthRoute/AuthRoute"
// // // import MarketingLayout from "@/components/layouts/marketing-layout"
// // import UserLayout from "@/components/layouts/user-layout"

// // // Lazy loaded pages
// // const HomePage = lazy(() => import("./pages/Home"))
// // const CategoriesPage = lazy(() => import("./pages/Categories"))
// // const FeedbackPage = lazy(() => import("./pages/Feedback"))
// // const OrdersPage = lazy(() => import("./pages/Orders"))
// // const ProductsPage = lazy(() => import("./pages/Products"))
// // const UsersPage = lazy(() => import("./pages/Users"))
// // const BlogPage = lazy(() => import("./pages/Blogs"))
// // const LoginPage = lazy(() => import("./Auth/Login"))
// // const RegisterPage = lazy(() => import("./Auth/Register"))
// // const ProductShowcases = lazy(() => import("./pages/ProductShowcase"))
// // const BlogShowcases = lazy(() => import("./pages/BlogShowcase"))
// // const AboutUsPage = lazy(() => import("./pages/Aboutus"))
// // const AboutTeamPage = lazy(() => import("./pages/Aboutteam"))
// // const ServicesPage = lazy(() => import("./pages/Services"))
// // const ContactPage = lazy(() => import("./pages/Contactpage"))
// // const FAQPage = lazy(() => import("./pages/FQA"))
// // const WishlistPage = lazy(() => import("./pages/Whilelist"))
// // const ShopPage = lazy(() => import("./pages/Shop"))
// // const CartPage = lazy(() => import("./pages/shop/Cartitems"))
// // const PaymentPage = lazy(() => import("./pages/shop/PaymentForm"))
// // const BlogArticlePage = lazy(() => import("./pages/Blogarticle"))
// // const AccountPage = lazy(() => import("./pages/Account"))

// // function App() {
// //   const { initializeAuth } = useAuthStore()

// //   useEffect(() => {
// //     initializeAuth()
// //   }, [initializeAuth])

// //   return (
// //     <Suspense fallback={<div>Loading...</div>}>
// //       <Routes>
// //         {/* Auth routes */}
// //         <Route element={<AuthRoute />}>
// //           <Route path="/login" element={<LoginPage />} />
// //           <Route path="/register" element={<RegisterPage />} />
// //         </Route>

// //         {/* Protected routes */}
// //         <Route element={<ProtectedRoute />}>
// //           {/* User Frontend Routes - wrapped by UserLayout */}
// //           <Route element={<UserLayout />}>
// //             <Route path="/" element={<HomePage />} />
// //             <Route path="/shop" element={<ShopPage />} />
// //             <Route path="/categories" element={<CategoriesPage />} />
// //             <Route path="/about" element={<AboutUsPage />} />
// //             <Route path="/team" element={<AboutTeamPage />} />
// //             <Route path="/services" element={<ServicesPage />} />
// //             <Route path="/contact" element={<ContactPage />} />
// //             <Route path="/faq" element={<FAQPage />} />
// //             <Route path="/whilelist" element={<WishlistPage />} />
// //             <Route path="/cart" element={<CartPage />} />
// //             <Route path="/bill" element={<PaymentPage />} />
// //             <Route path="/blog" element={<BlogPage />} />
// //             <Route path="/blogarticle" element={<BlogArticlePage />} />
// //             <Route path="/account" element={<AccountPage />} />
// //           </Route>

// //           {/* Marketing Dashboard Routes - wrapped by MarketingLayout */}
// //           {/* These routes are prefixed with /marketing to differentiate them from user routes */}
// //           <Route element={<MarketingLayout />}>
// //             <Route path="/marketing/dashboard" element={<HomePage />} /> {/* Example dashboard home */}
// //             <Route path="/marketing/products" element={<ProductsPage />} />
// //             <Route path="/marketing/feedback" element={<FeedbackPage />} />
// //             <Route path="/marketing/orders" element={<OrdersPage />} />
// //             <Route path="/marketing/users" element={<UsersPage />} />
// //             <Route path="/marketing/blogs" element={<BlogPage />} />
// //             <Route path="/marketing/prodt" element={<ProductShowcases />} />
// //             <Route path="/marketing/blogshowcase" element={<BlogShowcases />} />
// //           </Route>
// //         </Route>
// //       </Routes>
// //     </Suspense>
// //   )
// // }

// // export default App








import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuthStore } from '@/context/userContext';
import { ProtectedRoute } from '@/Auth/Protectedroutes/ProtectedRoutes';
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
import Cartitems from "./components/shop/Cartitems";
import PaymentForm from "./components/payments/PaymentForm";

// Lazy pages
const HomePage = lazy(() => import('./pages/Home'));
const FeedbackPage = lazy(() => import('./pages/Feedback'));
const OrdersPage = lazy(() => import('./pages/Orders'));
const ProductsPage = lazy(() => import('./pages/Products'));
const UsersPage = lazy(() => import('./pages/Users'));
const BlogPage = lazy(() => import('./pages/Blogs'));
const LoginPage = lazy(() => import('./Auth/Login'));
const RegisterPage = lazy(() => import('./Auth/Register'));
const ProductShowcases = lazy(() => import('./pages/ProductShowcase'));
const BlogShowcases = lazy(() => import('./pages/BlogShowcase'));

function App() {
  const { initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <>
      {/* E-COMMERCE + PUBLIC ROUTES (wrapped in CartProvider) */}
      <CartProvider>
        <Suspense fallback={<div>Loading...</div>}>
          {/* <Navbar />
          <MediaNavbar /> */}

          <Routes>
         
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

          {/* Protected Routes - Only accessible when logged in */}
          
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
                  <Cartitems />
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
         
        {/* </Routes> */}

           


       





          </Routes>

        
        </Suspense>
      </CartProvider>

      {/* AUTH & DASHBOARD ROUTES (no CartProvider) */}
      <Suspense fallback={<div>Loading Dashboard...</div>}>
        <Routes>
          {/* Auth routes */}
          <Route element={<AuthRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Dashboard routes (protected) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/blogs" element={<BlogPage />} />
            <Route path="/prodt" element={<ProductShowcases />} />
            <Route path="/blogshowcase" element={<BlogShowcases />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
