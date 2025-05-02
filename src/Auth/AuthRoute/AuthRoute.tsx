// components/AuthRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/context/userContext';

export const AuthRoute = () => {
  const { user } = useAuthStore();

  // If user is already authenticated, redirect to dashboard
  if (user) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the auth content (login/register)
  return <Outlet />;
};