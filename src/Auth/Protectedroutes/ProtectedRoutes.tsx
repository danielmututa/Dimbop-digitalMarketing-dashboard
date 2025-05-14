import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/context/userContext';
import MainSidebar from '../../Mainsidebar/Sidebar';
import { useEffect } from 'react';

export const ProtectedRoute = () => {
  const { user } = useAuthStore();
  console.log('ProtectedRoute - Current user:', user);

  useEffect(() => {
    console.log('ProtectedRoute mounted with user:', user);
  }, [user]);

  if (!user) {
    console.log('No user found - redirecting to login');
    return <Navigate to="/login" replace />;
  }

  return (
    <MainSidebar>
      <Outlet />
    </MainSidebar>
  );
};