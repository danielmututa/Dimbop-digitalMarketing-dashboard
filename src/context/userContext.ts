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

  // initializeAuth: () => {
  //   const userCookie = getCookie('user');
  //   const token = getCookie('token');

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

  // login: async (email, password) => {
  //   set({ isLoading: true, error: null });
  //   try {
  //     const response = await fetch('/api/auth/login', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     if (!response.ok) {
  //       const errorData: ApiError = await response.json();
  //       throw new Error(errorData.message || 'Login failed');
  //     }

  //     const { user, token } = await response.json();
  //     console.log('Login - Response:', { user, token });
  //     set({ user, token, isLoading: false });
  //     setCookie('user', JSON.stringify(user), 15);
  //     setCookie('token', token, 15);
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

  //   const apiData: RegisterAdmin = {
  //     username: userData.username,
  //     email: userData.email,
  //     password: userData.password,
  //     confirmPassword: userData.confirmpassword,
  //     role: 'admin',
  //   };

  //   try {
  //     const response = await fetch('/api/auth/register', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(apiData),
  //     });

  //     if (!response.ok) {
  //       const errorData: ApiError = await response.json();
  //       console.error('Register - Error response:', errorData);
  //       throw new Error(errorData.message || 'Registration failed');
  //     }

  //     const data = await response.json();
  //     console.log('Register - Response:', data);

  //     // Handle different response formats
  //     let user = data.user || data.data?.user || data;
  //     let token = data.token || data.jwt || data.data?.token;

  //     // If user or token is still missing, try to construct a minimal user object
  //     if (!user || !token) {
  //       console.warn('Register - Missing user or token, attempting fallback:', data);
  //       user = user || {
  //         username: userData.username,
  //         email: userData.email,
  //         role: 'admin',
  //       };
  //       token = token || 'temporary-token'; // Replace with actual token if available
  //       console.log('Register - Fallback user and token:', { user, token });
  //     }

  //     set({ user, token, isLoading: false });
  //     setCookie('user', JSON.stringify(user), 15);
  //     setCookie('token', token, 15);
  //     toast.success('Registration successful');
  //   } catch (error: unknown) {
  //     const errorMessage = isApiError(error)
  //       ? error.message
  //       : error instanceof Error
  //       ? error.message
  //       : 'An unknown error occurred';
  //     console.error('Register - Error:', error);
  //     set({ error: errorMessage, isLoading: false });
  //     toast.error(errorMessage);
  //     throw error;
  //   }
  // },

  login: async (email, password) => {
  set({ isLoading: true, error: null });
  try {
    const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://dimpo-pbackend.onrender.com';
    const response = await fetch(`${baseURL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
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
    
    // Save in both localStorage AND cookies
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
  }
},
//   register: async (userData) => {
//   set({ isLoading: true, error: null });

//   const apiData: RegisterAdmin = {
//     username: userData.username,
//     email: userData.email,
//     password: userData.password,
//     confirmPassword: userData.confirmpassword,
//     role: 'admin',
//   };

//   try {
//     // Use the full URL with baseURL
//     const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://dimpo-pbackend.onrender.com';
//     const response = await fetch(`${baseURL}/api/auth/register`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(apiData),
//     });

//     if (!response.ok) {
//       const errorData: ApiError = await response.json();
//       console.error('Register - Error response:', errorData);
//       throw new Error(errorData.message || 'Registration failed');
//     }

//     const data = await response.json();
//     console.log('Register - Response:', data);

//     // Extract user and token from the actual API response structure
//     const user = data.data?.user;
//     const token = data.data?.token;

//     if (!user || !token) {
//       console.error('Register - Missing user or token in response:', data);
//       throw new Error('Invalid response format from server');
//     }

//     // Save token in both localStorage AND cookies for consistency
//     localStorage.setItem('token', token);
//     setCookie('user', JSON.stringify(user), 15);
//     setCookie('token', token, 15);

//     set({ user, token, isLoading: false });
//     toast.success('Registration successful');
//   } catch (error: unknown) {
//     const errorMessage = isApiError(error)
//       ? error.message
//       : error instanceof Error
//       ? error.message
//       : 'An unknown error occurred';
//     console.error('Register - Error:', error);
//     set({ error: errorMessage, isLoading: false });
//     toast.error(errorMessage);
//     throw error;
//   }
// },
register: async (userData) => {
  set({ isLoading: true, error: null });

  const apiData = {
    username: userData.username,
    email: userData.email,
    password: userData.password,
    confirmPassword: userData.confirmpassword,
    role: 'admin',
  };

  try {
    const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://dimpo-pbackend.onrender.com';
    const response = await fetch(`${baseURL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(apiData),
    });

    const data = await response.json(); // Always parse JSON first

    if (!response.ok) {
      // Extract error message from backend response
      const errorMessage = data.message || 
                         data.error || 
                         'Registration failed';
      throw new Error(errorMessage);
    }

    // Handle successful response
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
    // Simplified error handling
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
    toast.success('Logged out successfully.');
  },

  clearError: () => set({ error: null }),
}));