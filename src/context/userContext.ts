// import { create } from 'zustand';
// import { User } from '../components/interfaces/auth';
// import { toast } from 'react-toastify';

// // Cookie helper functions
// // const setCookie = (name: string, value: string, days: number) => {
// //   const expires = new Date();
// //   expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
// //   document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;Secure;SameSite=Strict`;
// // };


// const setCookie = (name: string, value: string, days: number) => {
//   const expires = new Date();
//   expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
//   const isLocalhost = window.location.hostname === 'localhost';
//   const secure = isLocalhost ? '' : ';Secure';
//   document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict${secure}`;
// };

// const getCookie = (name: string): string | null => {
//   if (typeof window === 'undefined') return null;
  
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
//   return null;
// };

// const deleteCookie = (name: string) => {
//   document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
// };

// // Define a type for API error responses
// interface ApiError {
//   message: string;
//   [key: string]: unknown; // Allow for additional properties
// }

// // Type guard to check if an error has a message property
// function isApiError(error: unknown): error is ApiError {
//   return typeof error === 'object' && error !== null && 'message' in error;
// }

// interface AuthState {
//   user: User | null;
//   token: string | null;
//   isLoading: boolean;
//   error: string | null;
// }

// interface AuthActions {
//   initializeAuth: () => void;
//   login: (email: string, password: string) => Promise<void>;
//   register: (userData: {
//     username: string;
//     email: string;
//     password: string;
//   }) => Promise<void>;
//   logout: () => void;
//   clearError: () => void;
// }

// export const useAuthStore = create<AuthState & AuthActions>((set) => ({
//   user: null,
//   token: null,
//   isLoading: false,
//   error: null,

//   initializeAuth: () => {
//     const userCookie = getCookie('user');
//     const token = getCookie('token');
    
//     if (userCookie && token) {
//       try {
//         const user = JSON.parse(userCookie);
//         set({ user, token });
//       } catch (e) {
//         console.error('Failed to parse user cookie', e);
//       }
//     }
//   },

//   // login: async (email, password) => {
//   //   set({ isLoading: true, error: null });
//   //   try {
//   //     const response = await fetch('/api/auth/login', {
//   //       method: 'POST',
//   //       headers: { 'Content-Type': 'application/json' },
//   //       body: JSON.stringify({ email, password }),
//   //     });

//   //     if (!response.ok) {
//   //       const errorData: ApiError = await response.json();
//   //       throw new Error(errorData.message || 'Login failed');
//   //     }

//   //     const { user, token } = await response.json();
//   //     set({ user, token, isLoading: false });
//   //     setCookie('user', JSON.stringify(user), 15);
//   //     setCookie('token', token, 15);
//   //     toast.success('Login successful');
//   //   } catch (error: unknown) {
//   //     const errorMessage = isApiError(error) 
//   //       ? error.message 
//   //       : error instanceof Error 
//   //         ? error.message 
//   //         : 'An unknown error occurred';
//   //     set({ error: errorMessage, isLoading: false });
//   //     toast.error(errorMessage);
//   //   }
//   // },
// login: async (email, password) => {
//     set({ isLoading: true, error: null });
//     try {
//       const response = await fetch('/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         const errorData: ApiError = await response.json();
//         throw new Error(errorData.message || 'Login failed');
//       }

//       const { user, token } = await response.json();
//       set({ user, token, isLoading: false });
//       setCookie('user', JSON.stringify(user), 15);
//       setCookie('token', token, 15);
//       toast.success('Login successful');
//     }
//     catch (error: unknown) {
//       const errorMessage = isApiError(error) 
//         ? error.message 
//         : error instanceof Error 
//           ? error.message 
//           : 'An unknown error occurred';
//       set({ error: errorMessage, isLoading: false });
//       toast.error(errorMessage);
//     }
//   }
// ,

//   register: async (userData) => {
//     set({ isLoading: true, error: null });
//     try {
//       const response = await fetch('/api/auth/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(userData),
//       });

//       if (!response.ok) {
//         const errorData: ApiError = await response.json();
//         throw new Error(errorData.message || 'Registration failed');
//       }

//       const { user, token } = await response.json();
//       set({ user, token, isLoading: false });
//       setCookie('user', JSON.stringify(user), 15);
//       setCookie('token', token, 15);
//       toast.success('Registration successful');
//     } catch (error: unknown) {
//       const errorMessage = isApiError(error) 
//         ? error.message 
//         : error instanceof Error 
//           ? error.message 
//           : 'An unknown error occurred';
//       set({ error: errorMessage, isLoading: false });
//       toast.error(errorMessage);
//     }
//   },

//   logout: () => {
//     set({ user: null, token: null });
//     deleteCookie('user');
//     deleteCookie('token');
//     toast.success("Logged out successfully.");
//   },

//   clearError: () => set({ error: null }),
// }));










import { create } from 'zustand';
import { User } from '../components/interfaces/auth';
import { toast } from 'react-toastify';
import { RegisterAdmin } from '@/components/interfaces/auth';
 // Adjust the import path as necessary

// Cookie helper functions
const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  const isLocalhost = window.location.hostname === 'localhost';
  const secure = isLocalhost ? '' : ';Secure';
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict${secure}`;
};

const getCookie = (name: string): string | null => {
  if (typeof window === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

// Define a type for API error responses
interface ApiError {
  message: string;
  [key: string]: unknown;
}

function isApiError(error: unknown): error is ApiError {
  return typeof error === 'object' && error !== null && 'message' in error;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  initializeAuth: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    username: string;
    email: string;
    password: string;
    confirmpassword: string;
    role: string;
   
  }) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,

  initializeAuth: () => {
    const adminCookie = getCookie('admin'); // renamed
    const token = getCookie('token');

    if (adminCookie && token) {
      try {
        const user = JSON.parse(adminCookie);
        set({ user, token });
      } catch (e) {
        console.error('Failed to parse admin cookie', e);
      }
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData: ApiError = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const { user, token } = await response.json();
      set({ user, token, isLoading: false });
      setCookie('admin', JSON.stringify(user), 15); // renamed
      setCookie('token', token, 15);
      toast.success('Login successful');
    } catch (error: unknown) {
      const errorMessage = isApiError(error)
        ? error.message
        : error instanceof Error
        ? error.message
        : 'An unknown error occurred';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
    }
  },


  
  


  // register: async (userData) => {
  //   set({ isLoading: true, error: null });
  
  //   const apiData: RegisterAdmin = {
  //     username: userData.username,
  //     email: userData.email,
  //     password: userData.password,
  //     confirmPassword: userData.password,
  //     role: "admin" // Force role to be admin
  //   };
  
  //   try {
  //     const response = await fetch('/api/auth/register', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(apiData),
  //     });
  
  //     if (!response.ok) {
  //       const errorData: ApiError = await response.json();
  //       throw new Error(errorData.message || 'Registration failed');
  //     }
  
  //     const { user, token } = await response.json();
  //     set({ user, token, isLoading: false });
  //     setCookie('user', JSON.stringify(user), 15);
  //     setCookie('token', token, 15);
  //     toast.success('Registration successful');
  //   } catch (error: unknown) {
  //     const errorMessage = isApiError(error)
  //       ? error.message
  //       : error instanceof Error
  //         ? error.message
  //         : 'An unknown error occurred';
  //     set({ error: errorMessage, isLoading: false });
  //     toast.error(errorMessage);
  //   }
  // },
  
  register: async (userData) => {
    set({ isLoading: true, error: null });
  
    const apiData: RegisterAdmin = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      confirmPassword: userData.password,  // Force confirmation password to match
      role: "admin", // Force role to be admin
    };
  
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiData),
      });
  
      // Check if response is successful
      if (!response.ok) {
        const errorData: ApiError = await response.json();
        console.error("Registration error response:", errorData); // Log the full error response
        throw new Error(errorData.message || 'Registration failed');
      }
  
      // Parse successful response
      const { user, token } = await response.json();
      set({ user, token, isLoading: false });
      setCookie('user', JSON.stringify(user), 15);
      setCookie('token', token, 15);
      toast.success('Registration successful');
    } catch (error: unknown) {
      const errorMessage = isApiError(error)
        ? error.message
        : error instanceof Error
        ? error.message
        : 'An unknown error occurred';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
  
      console.error('Registration error:', error); // Log detailed error for debugging
    }
  },
  


  logout: () => {
    set({ user: null, token: null });
    deleteCookie('admin'); // renamed
    deleteCookie('token');
    toast.success("Logged out successfully.");
  },

  clearError: () => set({ error: null }),
}));


