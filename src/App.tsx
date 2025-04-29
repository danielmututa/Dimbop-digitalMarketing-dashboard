// App.tsx
import './App.css'
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import MainSidebar from './Mainsidebar/Sidebar'


// Lazy loaded pages
const HomePage = lazy(() => import('./pages/Home'))
const CategoriesPage = lazy(() => import('./pages/Categories'))
const FeedbackPage = lazy(() => import('./pages/Feedback'))
const OrdersPage = lazy(() => import('./pages/Orders'))
const ProductsPage = lazy(() => import('./pages/Products'))
const UsersPage = lazy(() => import('./pages/Users'))
const BlogPage = lazy(() => import('./pages/Blogs'))
const LoginPage = lazy(() => import('./Auth/Login'))
const RegisterPage = lazy(() => import('./Auth/Register'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>







      <MainSidebar>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </MainSidebar>
    </Suspense>
  )
}

export default App





// import './App.css'
// import { lazy, Suspense, useState, useEffect } from 'react'
// import { Routes, Route, BrowserRouter as Router, Navigate  } from 'react-router-dom'
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

// // Placeholder for authentication logic
// function useAuth() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false)

//   // For demonstration, set authentication state based on localStorage
//   useEffect(() => {
//     const authStatus = localStorage.getItem('isAuthenticated') === 'true'
//     setIsAuthenticated(authStatus)
//   }, [])

//   return { isAuthenticated }
// }

// const ProtectedRoutes = () => {
//   return (
//     <MainSidebar>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/categories" element={<CategoriesPage />} />
//         <Route path="/feedback" element={<FeedbackPage />} />
//         <Route path="/orders" element={<OrdersPage />} />
//         <Route path="/products" element={<ProductsPage />} />
//         <Route path="/users" element={<UsersPage />} />
//         <Route path="/blogs" element={<BlogPage />} />
//       </Routes>
//     </MainSidebar>
//   )
// }

// function App() {
//   const { isAuthenticated } = useAuth()

//   return (
//     <Router>
//       <Suspense fallback={<div>Loading...</div>}>
//         <Routes>
//           {/* Public routes (login and register) */}
//           <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} />
//           <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <RegisterPage />} />

//           {/* Protected routes */}
//           <Route 
//             path="/*" 
//             element={isAuthenticated ? <ProtectedRoutes /> : <Navigate to="/login" />} 
//           />

//           {/* Catch-all route */}
//           <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
//         </Routes>
//       </Suspense>
//     </Router>
//   )
// }

// export default App