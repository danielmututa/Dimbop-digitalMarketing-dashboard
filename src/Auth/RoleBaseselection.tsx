// src/Auth/RoleBaseselection.tsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/context/userContext';
import MainSidebar from '../Mainsidebar/Sidebar';

interface RoleProtectedRouteProps {
  requiredRole: 'user' | 'admin';
  redirectTo: string;
}

export const RoleProtectedRoute = ({ requiredRole, redirectTo }: RoleProtectedRouteProps) => {
  const { user } = useAuthStore();
  const location = useLocation();

  // If no user, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Map backend roles to frontend role system
  const isAdmin = 
                  user.role === 'super_admin' || 
                  user.role === 'digital_marketer_admin' || 
                  user.role === 'client_admin';
  
  // ✅ FIXED: Removed 'user' role check (it doesn't exist in your backend)
  const isUser = user.role === 'client';

  // Check if user has required role
  if (requiredRole === 'admin' && !isAdmin) {
    return <Navigate to={redirectTo} replace />;
  }

  if (requiredRole === 'user' && !isUser) {
    return <Navigate to={redirectTo} replace />;
  }

  // Special protection for /users route - only super_admin and digital_marketer_admin
  if (location.pathname === '/users') {
    if (user.role !== 'super_admin' && user.role !== 'digital_marketer_admin') {
      return <Navigate to="/" replace />; // Redirect to admin dashboard
    }
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












// src/Auth/RoleBaseselection.tsx
// import { Navigate, Outlet, useLocation } from 'react-router-dom';
// import { useAuthStore } from '@/context/userContext';
// import MainSidebar from '../Mainsidebar/Sidebar';

// interface RoleProtectedRouteProps {
//   requiredRole: 'user' | 'admin';
//   redirectTo: string;
// }

// export const RoleProtectedRoute = ({ requiredRole, redirectTo }: RoleProtectedRouteProps) => {
//   const { user } = useAuthStore();
//   const location = useLocation();

//   // If no user, redirect to login
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   // Map backend roles to frontend role system
//   const isAdmin = 
//                   user.role === 'super_admin' || 
//                   user.role === 'digital_marketer_admin' || 
//                   user.role === 'client_admin';
  
//   const isUser = user.role === 'user' || user.role === 'client';

//   // Check if user has required role
//   if (requiredRole === 'admin' && !isAdmin) {
//     return <Navigate to={redirectTo} replace />;
//   }

//   if (requiredRole === 'user' && !isUser) {
//     return <Navigate to={redirectTo} replace />;
//   }

//   // Special protection for /users route - only super_admin and digital_marketer_admin
//   if (location.pathname === '/users') {
//     if (user.role !== 'super_admin' && user.role !== 'digital_marketer_admin') {
//       return <Navigate to="/" replace />; // Redirect to admin dashboard
//     }
//   }

//   // For admin routes, wrap with MainSidebar
//   if (requiredRole === 'admin') {
//     return (
//       <MainSidebar>
//         <Outlet />
//       </MainSidebar>
//     );
//   }

//   // For user routes, just render the outlet
//   return <Outlet />;
// };












// // src/Auth/RoleBaseselection.tsx (or wherever your RoleProtectedRoute is)
// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuthStore } from '@/context/userContext';
// import MainSidebar from '../Mainsidebar/Sidebar'; // Adjust path as needed

// interface RoleProtectedRouteProps {
//   requiredRole: 'user' | 'admin';
//   redirectTo: string;
// }

// export const RoleProtectedRoute = ({ requiredRole, redirectTo }: RoleProtectedRouteProps) => {
//   const { user } = useAuthStore();

//   // If no user, redirect to login
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   // If user doesn't have the required role, redirect
//   if (user.role !== requiredRole) {
//     return <Navigate to={redirectTo} replace />;
//   }

//   // For admin routes, wrap with MainSidebar
//   if (requiredRole === 'admin') {
//     return (
//       <MainSidebar>
//         <Outlet />
//       </MainSidebar>
//     );
//   }

//   // For user routes, just render the outlet
//   return <Outlet />;
// };