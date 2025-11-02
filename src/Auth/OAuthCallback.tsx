// src/Auth/OAuthCallback.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/context/userContext';
import { toast } from 'sonner';

const OAuthCallback = () => {
  const navigate = useNavigate();
 

  useEffect(() => {
    // Get token from URL query params
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      try {
        // Save token to localStorage and cookies
        localStorage.setItem('token', token);
        
        // Decode token to get user info (basic JWT decode)
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        
        const userData = JSON.parse(jsonPayload);
        
        // Save user to cookies
        const setCookie = (name: string, value: string, days: number) => {
          const expires = new Date();
          expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
          const isLocalhost = window.location.hostname === 'localhost';
          const secure = isLocalhost ? '' : ';Secure';
          document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict${secure}`;
        };
        
        setCookie('user', JSON.stringify(userData), 15);
        setCookie('token', token, 15);
        
        // Update Zustand store
        useAuthStore.setState({ user: userData, token });
        
        toast.success('✅ Successfully signed in with Google!');
        
        // Redirect based on role
        setTimeout(() => {
          if (userData.role === 'client_admin') {
            navigate('/'); // Admin dashboard
          } else {
            navigate('/home'); // User home page
          }
        }, 500);
      } catch (error) {
        console.error('Error processing OAuth callback:', error);
        toast.error('❌ Failed to process sign-in');
        navigate('/login');
      }
    } else {
      toast.error('❌ No authentication token received');
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing sign-in...</p>
      </div>
    </div>
  );
};

export default OAuthCallback;