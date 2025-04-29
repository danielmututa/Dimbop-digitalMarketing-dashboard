import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/context/userContext";
import { loginApi } from "@/api/authApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Attempting login with:', { email, password }); // Debug log
      
      const response = await loginApi({ email, password });
      console.log('API Response:', response); // Debug log
      
      if (!response.data || !response.success) {
        throw new Error('Invalid response from server');
      }

      console.log('Calling store login with:', { 
        user: response.data, 
        token: response.success 
      }); // Debug log
      
      await login(response.data, response.success);
      console.log('Store login completed'); // Debug log
      
      toast.success('Login successful!');
      navigate('/dashboard');
      
    } catch (error) {
      console.error('Login error:', error); // Detailed error log
      
      let errorMessage = 'Login failed';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full md:w-[60%] xl:w-[40%]">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Welcome to Admin</CardTitle>
            <CardDescription>Please login to continue</CardDescription>
          </CardHeader>
          
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm">Email</label>
              <Input 
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm">Password</label>
              <Input 
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

export default Login;