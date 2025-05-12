

// import { lazy, Suspense } from 'react'
// import { Routes, Route } from 'react-router-dom'
// import MainSidebar from './Mainsidebar/Sidebar'

// // Lazy loaded pages
// const HomePage = lazy(() => import('./pages/Home'))
// const CategoriesPage = lazy(() => import('./pages/Categories'))
// const FeedbackPage = lazy(() => import('./pages/Feedback'))
// const OrdersPage = lazy(() => import('./pages/Orders'))
// const ProductsPage = lazy(() => import('./pages/Products'))
// const UsersPage = lazy(() => import('./pages/Users'))
// const BlogPage = lazy(() => import('./pages/Blogs'))
// const LoginPage = lazy(() => import('./Auth/Login'))
// const RegisterPage = lazy(() => import('./Auth/Register'))

// function App() {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <Routes>
//         {/* Auth routes outside MainSidebar */}
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
        
//         {/* Protected routes with MainSidebar */}
//         <Route path="/" element={
//           <MainSidebar>
//             <HomePage />
//           </MainSidebar>
//         } />
//         <Route path="/categories" element={
//           <MainSidebar>
//             <CategoriesPage />
//           </MainSidebar>
//         } />
//         <Route path="/feedback" element={
//           <MainSidebar>
//             <FeedbackPage />
//           </MainSidebar>
//         } />
//         <Route path="/orders" element={
//           <MainSidebar>
//             <OrdersPage />
//           </MainSidebar>
//         } />
//         <Route path="/products" element={
//           <MainSidebar>
//             <ProductsPage />
//           </MainSidebar>
//         } />
//         <Route path="/users" element={
//           <MainSidebar>
//             <UsersPage />
//           </MainSidebar>
//         } />
//         <Route path="/blogs" element={
//           <MainSidebar>
//             <BlogPage />
//           </MainSidebar>
//         } />
//       </Routes>
//     </Suspense>
//   )
// }

// export default App



import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuthStore } from '@/context/userContext';
import { ProtectedRoute } from '@/Auth/Protectedroutes/ProtectedRoutes';
import { AuthRoute } from '@/Auth/AuthRoute/AuthRoute';

// Lazy loaded pages
const HomePage = lazy(() => import('./pages/Home'));
const CategoriesPage = lazy(() => import('./pages/Categories'));
const FeedbackPage = lazy(() => import('./pages/Feedback'));
const OrdersPage = lazy(() => import('./pages/Orders'));
const ProductsPage = lazy(() => import('./pages/Products'));
const UsersPage = lazy(() => import('./pages/Users'));
const BlogPage = lazy(() => import('./pages/Blogs'));
const LoginPage = lazy(() => import('./Auth/Login'));
const RegisterPage = lazy(() => import('./pages/ProductShowcase'));

function App() {
  const { initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Auth routes */}
        <Route element={<AuthRoute />}>
          <Route path="/login" element={<LoginPage />} />
          
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/prodt" element={<RegisterPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;