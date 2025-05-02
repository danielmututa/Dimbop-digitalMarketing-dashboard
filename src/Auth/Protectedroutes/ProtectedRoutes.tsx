// components/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/context/userContext';
import MainSidebar from '../../Mainsidebar/Sidebar';

export const ProtectedRoute = () => {
  const { user } = useAuthStore();

  // If no user is authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the protected content with sidebar
  return (
    <MainSidebar>
      <Outlet />
    </MainSidebar>
  );
};