import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/context/userContext';

export const AuthRoute = () => {
  const { user } = useAuthStore();
  // console.log('AuthRoute - Current user:', user);

  // If user is already authenticated, redirect to dashboard
  if (user) {
    console.log('User found - redirecting to /');
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the auth content (login/register)
  return <Outlet />;
};