// // src/Auth/Protectedroutes/RoleProtectedRoute.tsx
// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuthStore } from '@/context/userContext';
// import MainSidebar from '../Mainsidebar/Sidebar';

// interface RoleProtectedRouteProps {
//   requiredRole: 'user' | 'admin';
//   redirectTo: string;
// }

// export const RoleProtectedRoute = ({ requiredRole, redirectTo }: RoleProtectedRouteProps) => {
//   const { user } = useAuthStore();

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   if (user.role !== requiredRole) {
//     return <Navigate to={redirectTo} replace />;
//   }

//   // For admin routes, wrap with MainSidebar (dashboard layout)
//   if (requiredRole === 'admin') {
//     return (
//       <MainSidebar>
//         <Outlet />
//       </MainSidebar>
//     );
//   }

//   // For user routes, just render the outlet (e-commerce layout is handled in individual components)
//   return <Outlet />;
// };






// src/Auth/RoleBaseselection.tsx (or wherever your RoleProtectedRoute is)
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/context/userContext';
import MainSidebar from '../Mainsidebar/Sidebar'; // Adjust path as needed

interface RoleProtectedRouteProps {
  requiredRole: 'user' | 'admin';
  redirectTo: string;
}

export const RoleProtectedRoute = ({ requiredRole, redirectTo }: RoleProtectedRouteProps) => {
  const { user } = useAuthStore();

  // If no user, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user doesn't have the required role, redirect
  if (user.role !== requiredRole) {
    return <Navigate to={redirectTo} replace />;
  }

  // For admin routes, wrap with MainSidebar
  if (requiredRole === 'admin') {
    return (
      <MainSidebar>
        <Outlet />
      </MainSidebar>
    );
  }

  // For user routes, just render the outlet
  return <Outlet />;
};