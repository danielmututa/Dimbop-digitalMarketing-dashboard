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
        </Routes>
      </MainSidebar>
    </Suspense>
  )
}

export default App
