import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RegisterInput } from "@/lib/schemas/auth/register";
import { useAuthStore } from "@/context/userContext";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Register = () => {
  const navigate = useNavigate();
  const { register: authRegister, user } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<RegisterInput>();

  // Debug user state changes
  useEffect(() => {
    console.log('Register - Current user:', user);
  }, [user]);

  const handleLoginRedirect = () => {
    console.log("Redirecting to login...");
    navigate("/login");
  };

  const onSubmit = async (data: RegisterInput) => {
    try {
      console.log("Attempting registration...");
      await authRegister({
        username: data.username,
        email: data.email,
        password: data.password,
        confirmpassword: data.confirmPassword,
        role: "admin",
      });

      toast.success("Registration successful!");
      // Small delay to ensure state propagation
      setTimeout(() => {
        navigate("/");
      }, 100);
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error?.message || "Registration failed");
    }
  };

  return (
    <div className="w-full flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-[60%] xl:w-[40%]">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Welcome to Admin</CardTitle>
            <CardDescription>Create your account</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-start flex-col">
              <label className="text-sm">Username</label>
              <Input
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                })}
                className="italic"
                placeholder="example Peter Parker"
              />
              {errors.username && (
                <span className="text-red-500 text-xs">{errors.username.message}</span>
              )}
            </div>

            <div className="flex items-start flex-col">
              <label className="text-sm">Email</label>
              <Input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="italic"
                placeholder="example parkerpeter@gmail.com"
              />
              {errors.email && (
                <span className="text-red-500 text-xs">{errors.email.message}</span>
              )}
            </div>

            <div className="flex items-start flex-col">
              <label className="text-sm">Password</label>
              <Input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                type="password"
                className="italic"
                placeholder="example AJ!#04qp"
              />
              {errors.password && (
                <span className="text-red-500 text-xs">{errors.password.message}</span>
              )}
            </div>

            <div className="flex items-start flex-col">
              <label className="text-sm">Confirm Password</label>
              <Input
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                type="password"
                className="italic"
                placeholder="AJ!#04qp"
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-xs">{errors.confirmPassword.message}</span>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Registering..." : "Register"}
            </Button>

            <div className="w-full flex justify-between items-center">
              <p>Have an account?</p>
              <Button
                onClick={handleLoginRedirect}
                variant="ghost"
                type="button"
              >
                Login
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default Register;