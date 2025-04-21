import { create } from 'zustand';
import { User } from '../components/interfaces/auth';
import { toast } from 'react-toastify';

// Cookie helper functions
const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;Secure;SameSite=Strict`;
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

interface UserStore {
  user: User | null;
  token: string | null;

  // Actions
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  logout: () => void;
  initializeAuth: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  token: null,

  initializeAuth: () => {
    // Try to get user from cookie
    const userCookie = getCookie('user');
    const token = getCookie('token');
    
    if (userCookie && token) {
      try {
        const user = JSON.parse(userCookie);
        set({ user, token });
      } catch (e) {
        console.error('Failed to parse user cookie', e);
      }
    }
  },

  setUser: (user) => {
    set({ user });
    setCookie('user', JSON.stringify(user), 15); // Changed to 15 days
  },

  setToken: (token) => {
    set({ token });
    setCookie('token', token, 15); // Changed to 15 days
  },

  logout: () => {
    set({ user: null, token: null });
    deleteCookie('user');
    deleteCookie('token');
    toast.success("Logged out successfully.");
  },
}));