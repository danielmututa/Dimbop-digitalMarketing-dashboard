import { create } from 'zustand';
import { User } from '../components/interfaces/auth';
import { toast } from 'react-toastify';

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
  login: (email: string, password: string, role?: string, isAdmin?: boolean, username?: string, phone?: string) => Promise<void>;
  register: (userData: {
    username?: string;
    name?: string;
    email: string;
    phone: string;
    password: string;
    confirmpassword: string;
    role: string;
    authProvider?: string;
    googleId?: string;
    appleId?: string;
    facebookId?: string;
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
    const userCookie = getCookie('user');
    const token = localStorage.getItem('token') || getCookie('token');

    if (userCookie && token) {
      try {
        const user = JSON.parse(userCookie);
        console.log('initializeAuth - Restored user:', user);
        set({ user, token });
      } catch (e) {
        console.error('Failed to parse user cookie', e);
      }
    } else {
      console.log('initializeAuth - No user or token cookies found');
    }
  },

  // ============================================
  // LOGIN - Admin needs username, email, phone, password
  // ============================================
  login: async (email: string, password: string, role?: string, isAdmin?: boolean, username?: string, phone?: string) => {
    set({ isLoading: true, error: null });
    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://dimbopbakedfiles.onrender.com';
      
      const loginPayload: any = {
        email,
        password,
        authProvider: 'email'
      };
      
      if (isAdmin) {
        if (username) loginPayload.username = username;
        if (phone) loginPayload.phone = phone;
      }
      
      if (role) {
        loginPayload.role = role;
      }
      
      console.log('Login payload:', loginPayload);
      
      const response = await fetch(`${baseURL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginPayload),
      });

      if (!response.ok) {
        const errorData: ApiError = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      console.log('Login - Response:', data);
      
      const user = data.data?.user || data.user;
      const token = data.data?.token || data.token;
      
      if (!user || !token) {
        throw new Error('Invalid response format from server');
      }
      
      localStorage.setItem('token', token);
      setCookie('user', JSON.stringify(user), 15);
      setCookie('token', token, 15);
      
      set({ user, token, isLoading: false });
      toast.success('Login successful');
    } catch (error: unknown) {
      const errorMessage = isApiError(error)
        ? error.message
        : error instanceof Error
        ? error.message
        : 'An unknown error occurred';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      throw error;
    }
  },

  // ============================================
  // REGISTER - Only for client and client_admin
  // ============================================
  register: async (userData) => {
    set({ isLoading: true, error: null });

    const isClientAdmin = userData.role === 'client_admin';
    const endpoint = isClientAdmin 
      ? '/api/auth/register/client-admin' 
      : '/api/auth/register/client';

    let apiData: any = {
      email: userData.email,
      phone: userData.phone,
      role: userData.role,
    };

    if (isClientAdmin) {
      apiData = {
        ...apiData,
        merchantName: userData.username || userData.name,
        physicalAddress: userData.phone,
        geoLocation: {
          latitude: -17.8252,
          longitude: 31.0335
        },
        authProvider: userData.authProvider || 'google',
        googleId: userData.googleId
      };
    } else {
      apiData = {
        ...apiData,
        name: userData.name || userData.username,
        authProvider: userData.authProvider || 'email',
        password: userData.password,
        confirmPassword: userData.confirmpassword
      };
      
      if (userData.googleId) apiData.googleId = userData.googleId;
      if (userData.appleId) apiData.appleId = userData.appleId;
      if (userData.facebookId) apiData.facebookId = userData.facebookId;
    }

    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://dimbopbakedfiles.onrender.com';
      const response = await fetch(`${baseURL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiData),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.message || data.error || 'Registration failed';
        throw new Error(errorMessage);
      }

      const user = data.user || data.data?.user;
      const token = data.token || data.data?.token;

      if (!user || !token) {
        throw new Error('Invalid response format from server');
      }

      localStorage.setItem('token', token);
      setCookie('user', JSON.stringify(user), 15);
      setCookie('token', token, 15);

      set({ user, token, isLoading: false });
      toast.success('Registration successful');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Registration failed';
      
      console.error('Registration error:', error);
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      throw error;
    }
  },

  logout: () => {
    set({ user: null, token: null });
    deleteCookie('user');
    deleteCookie('token');
    localStorage.removeItem('token');
    toast.success('Logged out successfully.');
  },

  clearError: () => set({ error: null }),
}));






// import { create } from 'zustand';
// import { User } from '../components/interfaces/auth';
// import { toast } from 'react-toastify';


// // Cookie helper functions
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

// interface ApiError {
//   message: string;
//   [key: string]: unknown;
// }

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
//   login: (email: string, password: string, role?: string) => Promise<void>;
//   register: (userData: {
//     username?: string; // Optional now
//     name?: string; // Added for client registration
//     email: string;
//     phone: string;
//     password: string;
//     confirmpassword: string;
//     role: string;
//     authProvider?: string; // Added for OAuth support
//     googleId?: string;
//     appleId?: string;
//     facebookId?: string;
//   }) => Promise<void>;
//   logout: () => void;
//   clearError: () => void;
// }

// export const useAuthStore = create<AuthState & AuthActions>((set) => ({
//   user: null,
//   token: null,
//   isLoading: false,
//   error: null,

// initializeAuth: () => {
//   const userCookie = getCookie('user');
//   const token = localStorage.getItem('token') || getCookie('token');

//   if (userCookie && token) {
//     try {
//       const user = JSON.parse(userCookie);
//       console.log('initializeAuth - Restored user:', user);
//       set({ user, token });
//     } catch (e) {
//       console.error('Failed to parse user cookie', e);
//     }
//   } else {
//     console.log('initializeAuth - No user or token cookies found');
//   }
// },


// // ============================================
// // UPDATED LOGIN - Supports both admin and client login
// // ============================================
// login: async (email, password, role) => {
//   set({ isLoading: true, error: null });
//   try {
//     const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://dimbopbakedfiles.onrender.com';
    
//     // Build login payload based on role
//     const loginPayload: any = {
//       email,
//       password,
//       authProvider: 'email'
//     };
    
//     // Add role if provided
//     if (role) {
//       loginPayload.role = role;
//     }
    
//     const response = await fetch(`${baseURL}/api/auth/login`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(loginPayload),
//     });

//     if (!response.ok) {
//       const errorData: ApiError = await response.json();
//       throw new Error(errorData.message || 'Login failed');
//     }

//     const data = await response.json();
//     console.log('Login - Response:', data);
    
//     const user = data.data?.user || data.user;
//     const token = data.data?.token || data.token;
    
//     if (!user || !token) {
//       throw new Error('Invalid response format from server');
//     }
    
//     // Save in both localStorage AND cookies
//     localStorage.setItem('token', token);
//     setCookie('user', JSON.stringify(user), 15);
//     setCookie('token', token, 15);
    
//     set({ user, token, isLoading: false });
//     toast.success('Login successful');
//   } catch (error: unknown) {
//     const errorMessage = isApiError(error)
//       ? error.message
//       : error instanceof Error
//       ? error.message
//       : 'An unknown error occurred';
//     set({ error: errorMessage, isLoading: false });
//     toast.error(errorMessage);
//     throw error;
//   }
// },


// // ============================================
// // UPDATED REGISTER - Only for clients (customers)
// // NO registration for super_admin or digital_marketer_admin
// // ============================================
// register: async (userData) => {
//   set({ isLoading: true, error: null });

//   // Determine if this is client or client_admin registration
//   const isClientAdmin = userData.role === 'client_admin';
//   const endpoint = isClientAdmin 
//     ? '/api/auth/register/client-admin' 
//     : '/api/auth/register/client';

//   // Build API payload based on role
//   let apiData: any = {
//     email: userData.email,
//     phone: userData.phone,
//     role: userData.role,
//   };

//   if (isClientAdmin) {
//     // Client Admin (Merchant) - requires merchantName, address, etc.
//     apiData = {
//       ...apiData,
//       merchantName: userData.username || userData.name, // Use username as merchantName
//       physicalAddress: userData.phone, // Temporary - you should collect this properly
//       geoLocation: {
//         latitude: -17.8252, // Default Harare coordinates
//         longitude: 31.0335
//       },
//       authProvider: userData.authProvider || 'google', // Client admins must use Google
//       googleId: userData.googleId
//     };
//   } else {
//     // Regular Client (Customer)
//     apiData = {
//       ...apiData,
//       name: userData.name || userData.username,
//       authProvider: userData.authProvider || 'email',
//       password: userData.password,
//       confirmPassword: userData.confirmpassword
//     };
    
//     // Add OAuth IDs if provided
//     if (userData.googleId) apiData.googleId = userData.googleId;
//     if (userData.appleId) apiData.appleId = userData.appleId;
//     if (userData.facebookId) apiData.facebookId = userData.facebookId;
//   }

//   try {
//     const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://dimbopbakedfiles.onrender.com';
//     const response = await fetch(`${baseURL}${endpoint}`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(apiData),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       const errorMessage = data.message || 
//                          data.error || 
//                          'Registration failed';
//       throw new Error(errorMessage);
//     }

//     // Handle successful response
//     const user = data.user || data.data?.user;
//     const token = data.token || data.data?.token;

//     if (!user || !token) {
//       throw new Error('Invalid response format from server');
//     }

//     localStorage.setItem('token', token);
//     setCookie('user', JSON.stringify(user), 15);
//     setCookie('token', token, 15);

//     set({ user, token, isLoading: false });
//     toast.success('Registration successful');
//   } catch (error: unknown) {
//     const errorMessage = error instanceof Error 
//       ? error.message 
//       : 'Registration failed';
    
//     console.error('Registration error:', error);
//     set({ error: errorMessage, isLoading: false });
//     toast.error(errorMessage);
//     throw error;
//   }
// },


//   logout: () => {
//     set({ user: null, token: null });
//     deleteCookie('user');
//     deleteCookie('token');
//     toast.success('Logged out successfully.');
//   },

//   clearError: () => set({ error: null }),
// }));
















// import { create } from 'zustand';
// import { User } from '../components/interfaces/auth';
// import { toast } from 'react-toastify';


// // Cookie helper functions
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

// interface ApiError {
//   message: string;
//   [key: string]: unknown;
// }

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
//     phone: string;
//     password: string;
//     confirmpassword: string;
//     role: string;
//   }) => Promise<void>;
//   logout: () => void;
//   clearError: () => void;
// }

// export const useAuthStore = create<AuthState & AuthActions>((set) => ({
//   user: null,
//   token: null,
//   isLoading: false,
//   error: null,

 
//   //   const userCookie = getCookie('user');
//   //   const token = getCookie('token');

//   //   if (userCookie && token) {
//   //     try {
//   //       const user = JSON.parse(userCookie);
//   //       console.log('initializeAuth - Restored user:', user);
//   //       set({ user, token });
//   //     } catch (e) {
//   //       console.error('Failed to parse user cookie', e);
//   //     }
//   //   } else {
//   //     console.log('initializeAuth - No user or token cookies found');
//   //   }
//   // },


// initializeAuth: () => {
//   const userCookie = getCookie('user');
//   const token = localStorage.getItem('token') || getCookie('token');

//   if (userCookie && token) {
//     try {
//       const user = JSON.parse(userCookie);
//       console.log('initializeAuth - Restored user:', user);
//       set({ user, token });
//     } catch (e) {
//       console.error('Failed to parse user cookie', e);
//     }
//   } else {
//     console.log('initializeAuth - No user or token cookies found');
//   }
// },


//   login: async (email, password) => {
//   set({ isLoading: true, error: null });
//   try {
//     // const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://dimpo-pbackend.onrender.com';
//     const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://dimbopbakedfiles.onrender.com';
//     const response = await fetch(`${baseURL}/api/auth/login`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     });

//     if (!response.ok) {
//       const errorData: ApiError = await response.json();
//       throw new Error(errorData.message || 'Login failed');
//     }

//     const data = await response.json();
//     console.log('Login - Response:', data);
    
//     const user = data.data?.user || data.user;
//     const token = data.data?.token || data.token;
    
//     if (!user || !token) {
//       throw new Error('Invalid response format from server');
//     }
    
//     // Save in both localStorage AND cookies
//     localStorage.setItem('token', token);
//     setCookie('user', JSON.stringify(user), 15);
//     setCookie('token', token, 15);
    
//     set({ user, token, isLoading: false });
//     toast.success('Login successful');
//   } catch (error: unknown) {
//     const errorMessage = isApiError(error)
//       ? error.message
//       : error instanceof Error
//       ? error.message
//       : 'An unknown error occurred';
//     set({ error: errorMessage, isLoading: false });
//     toast.error(errorMessage);
//   }
// },


// register: async (userData) => {
//   set({ isLoading: true, error: null });

//   const apiData = {
//     username: userData.username,
//     email: userData.email,
//     phone: userData.phone, // Add this line
//     password: userData.password,
//     confirmPassword: userData.confirmpassword,
//      role: userData.role, // Use the role from the parameter, not hardcoded
//   };

//   try {
//     // const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://dimpo-pbackend.onrender.com';
//     const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://dimbopbakedfiles.onrender.com';
//     const response = await fetch(`${baseURL}/api/auth/register`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(apiData),
//     });

//     const data = await response.json(); // Always parse JSON first

//     if (!response.ok) {
//       // Extract error message from backend response
//       const errorMessage = data.message || 
//                          data.error || 
//                          'Registration failed';
//       throw new Error(errorMessage);
//     }

//     // Handle successful response
//     const user = data.user || data.data?.user;
//     const token = data.token || data.data?.token;

//     if (!user || !token) {
//       throw new Error('Invalid response format from server');
//     }

//     localStorage.setItem('token', token);
//     setCookie('user', JSON.stringify(user), 15);
//     setCookie('token', token, 15);

//     set({ user, token, isLoading: false });
//     toast.success('Registration successful');
//   } catch (error: unknown) {
//     // Simplified error handling
//     const errorMessage = error instanceof Error 
//       ? error.message 
//       : 'Registration failed';
    
//     console.error('Registration error:', error);
//     set({ error: errorMessage, isLoading: false });
//     toast.error(errorMessage);
//     throw error;
//   }
// },


//   logout: () => {
//     set({ user: null, token: null });
//     deleteCookie('user');
//     deleteCookie('token');
//     toast.success('Logged out successfully.');
//   },

//   clearError: () => set({ error: null }),
// }));