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
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuthStore } from "@/context/userContext";
import { useEffect } from "react";

interface LoginInput {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { login, user } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>();

  // Debug user state changes
  useEffect(() => {
    console.log('Login - Current user:', user);
  }, [user]);

  const handleSubmitForm = async (data: LoginInput) => {
    try {
      console.log('Attempting login with:', data);
      await login(data.email, data.password);
      toast.success("Login successful!");
      // Delay to ensure state propagation
      setTimeout(() => {
        navigate("/");
      }, 300);
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error?.message || "Login failed");
    }
  };

  const handleRegisterRedirect = () => {
    console.log("Redirecting to register...");
    navigate("/register");
  };

  return (
    <div className="w-full flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(handleSubmitForm)} className="w-full md:w-[60%] xl:w-[40%]">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Welcome to Admin</CardTitle>
            <CardDescription>Please login to continue</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm">Email</label>
              <Input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                placeholder="example@email.com"
                type="email"
              />
              {errors.email && (
                <span className="text-red-500 text-xs">{errors.email.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm">Password</label>
              <Input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                placeholder="Enter your password"
                type="password"
              />
              {errors.password && (
                <span className="text-red-500 text-xs">{errors.password.message}</span>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
            <div className="w-full flex justify-between items-center">
              <p>Don't have an account?</p>
              <Button
                onClick={handleRegisterRedirect}
                variant="ghost"
                type="button"
              >
                Register
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default Login;