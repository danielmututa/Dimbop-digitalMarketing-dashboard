// // src/Auth/Protectedroutes/RoleBasedRedirect.tsx
// import { Navigate } from 'react-router-dom';
// import { useAuthStore } from '@/context/userContext';

// const RoleBasedRedirect = () => {
//   const { user } = useAuthStore();

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   // Redirect based on user role
//   if (user.role === 'admin') {
//     return <Navigate to="/" replace />;
//   } else {
//     return <Navigate to="/home" replace />;
//   }
// };

// export default RoleBasedRedirect;




// src/Auth/Protectedroutes/RoleBasedRedirect.tsx
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/context/userContext';

const RoleBasedRedirect = () => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect based on user role
  if (user.role === 'admin') {
    return <Navigate to="/" replace />;
  } else {
    return <Navigate to="/home" replace />;
  }
};

export default RoleBasedRedirect;