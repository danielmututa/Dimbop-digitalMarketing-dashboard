// import axios from "axios";
// import { toast } from "react-toastify";

// const baseURL = import.meta.env.VITE_API_BASE_URL;

// export const apiClient = axios.create({
//   baseURL,
//   withCredentials: true, // Important for cookies
// });

// // 🔐 Request interceptor - add token to requests
// apiClient.interceptors.request.use((config) => {
//   // Get token directly from localStorage or cookies
//   const token = localStorage.getItem('token') || getCookie('token');
  
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
  
//   // Ensure credentials are sent with every request
//   config.withCredentials = true;
//   return config;
// }, (error) => Promise.reject(error));

// // 🛑 Response interceptor - handle errors
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const originalRequest = error.config;

//     // Handle token expiration (HTTP 498 is custom token expired status)
//     if (error.response?.status === 498 && !originalRequest._retry) {
//       originalRequest._retry = true;
      
//       toast.dismiss();
//       toast.error("Session expired. Please login again.");
      
//       // Clear auth state
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       deleteCookie('token');
//       deleteCookie('user');
      
//       // Redirect to login
//       if (typeof window !== 'undefined') {
//         window.location.href = '/login';
//       }
      
//       return Promise.reject(error);
//     }

//     // Handle other errors
//     if (error.response?.status === 401) {
//       toast.error("Unauthorized access. Please login.");
//     }

//     return Promise.reject(error);
//   }
// );

// // Cookie helper functions
// function getCookie(name: string): string | null {
//   if (typeof document === 'undefined') return null;
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
//   return null;
// }

// function deleteCookie(name: string) {
//   document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
// }










// // import axios from "axios";

// // const baseURL = import.meta.env.VITE_API_BASE_URL;

// // export const apiClient = axios.create({
// //   baseURL,
// //   // We keep this if your server expects it
// //   withCredentials: true,
// // });

// // // Simplified interceptors - no token handling
// // apiClient.interceptors.response.use(
// //   (response) => response,
// //   (error) => {
// //     // Basic error handling
// //     console.error("API request failed:", error);
// //     return Promise.reject(error);
// //   }
// // );







// import axios from 'axios';
// import { toast } from 'react-toastify';

// // Get base URL from environment variable
// const baseURL = import.meta.env.VITE_API_BASE_URL ||  "http://localhost:3000";

// // Axios instance creation with baseURL and credentials enabled
// export const apiClient = axios.create({
//   baseURL,
//   withCredentials: true, // Important for cookies to be sent with requests
// });

// // 🔐 Request interceptor - Add token to requests
// apiClient.interceptors.request.use(
//   (config) => {
//     // Get token from localStorage or cookies
//     const token = localStorage.getItem('token') || getCookie('token');
    
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`; // Add token to Authorization header
//     }

//     // Ensure credentials are sent with every request
//     config.withCredentials = true;

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // 🛑 Response interceptor - Handle errors and token expiry
// apiClient.interceptors.response.use(
//   (response) => response, // Directly return response if no error
//   (error) => {
//     const originalRequest = error.config;

//     // Handle token expiration (HTTP 498 is custom token expired status)
//     if (error.response?.status === 498 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       // Display error toast
//       toast.dismiss();
//       toast.error('Session expired. Please login again.');

//       // Clear authentication data from localStorage and cookies
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       deleteCookie('token');
//       deleteCookie('user');

//       // Redirect to login page
//       if (typeof window !== 'undefined') {
//         window.location.href = '/login';
//       }

//       return Promise.reject(error);
//     }

//     // Handle other unauthorized errors (HTTP 401)
//     if (error.response?.status === 401) {
//       toast.error('Unauthorized access. Please login.');
//     }

//     // Handle all other errors
//     return Promise.reject(error);
//   }
// );

// // Helper functions for managing cookies
// function getCookie(name: string): string | null {
//   if (typeof document === 'undefined') return null;
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
//   return null;
// }

// function deleteCookie(name: string) {
//   document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
// }

// // Export the apiClient for use in other parts of the application
// export default apiClient;








import axios from 'axios';
import { toast } from 'react-toastify';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const apiClient = axios.create({
  baseURL,
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    if (!config.url?.includes('/api/auth/register')) {
      const token = localStorage.getItem('token') || getCookie('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    config.withCredentials = true;
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 498 && !originalRequest._retry) {
      originalRequest._retry = true;
      toast.dismiss();
      toast.error('Session expired. Please login again.');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      deleteCookie('token');
      deleteCookie('user');
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
    if (error.response?.status === 401) {
      toast.error('Unauthorized access. Please login.');
    }
    return Promise.reject(error);
  }
);

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export default apiClient;