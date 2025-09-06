
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useAuthStore } from "@/context/userContext"
import { useEffect } from "react"
import { toast, Toaster } from "sonner"

// Define the form data type
interface RegisterFormData {
  username: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

const Register = () => {
  const navigate = useNavigate()
  const { register: authRegister, user } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<RegisterFormData>()

  useEffect(() => {
    console.log("Register - Current user:", user)
  }, [user])

  const handleLoginRedirect = () => {
    navigate("/login")
  }

  const onSubmit = async (data: RegisterFormData) => {
    console.log("Form submitted!")

    
    let loadingToastId: string | number | undefined

    try {
      // Show loading toast and store its ID
      loadingToastId = toast.loading("Creating your account...")

      await authRegister({
        username: data.username,
        email: data.email,
        phone: data.phone,
        password: data.password,
        confirmpassword: data.confirmPassword,
        role: "admin",
      })

      // DISMISS the loading toast first
      toast.dismiss(loadingToastId)

      // Then show success toast
      toast.success("✅ Account created successfully!")
      navigate("/")
    } catch (error: unknown) {
      console.log("Registration error:", error)

      // DISMISS the loading toast first (only if it exists)
      if (loadingToastId !== undefined) {
        toast.dismiss(loadingToastId)
      }

      // Then show error toast
      toast.error("❌ Registration Failed!")

      // Show the actual error message with proper type checking
      const errorMessage = error instanceof Error ? error.message : "Something went wrong"
      toast.error(errorMessage)
    }
  }

  return (
    <>
      {/* ADD TOASTER HERE - This makes toasts show up! */}
      <Toaster position="top-right" richColors closeButton />

      <div className="w-full flex justify-center items-center min-h-screen p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-[60%] xl:w-[40%] max-w-md">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Welcome to Admin</CardTitle>
              <CardDescription>Create your account</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-start flex-col gap-1">
                <label className="text-sm font-medium">Username</label>
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
                {errors.username && <span className="text-red-500 text-xs">{errors.username.message}</span>}
              </div>

              <div className="flex items-start flex-col gap-1">
                <label className="text-sm font-medium">Email</label>
                <Input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  className="italic"
                  placeholder="example parkerpeter@gmail.com"
                />
                {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
              </div>


                 <div className="flex items-start flex-col gap-1">
  <label className="text-sm font-medium">Phone Number (Zimbabwe)</label>
  <Input
    {...register("phone", {
      required: "Zimbabwean phone number is required",
      pattern: {
        value: /^(\+263|263|0)(7[7-8|1|3]|7[0-9])\d{7}$/,
        message: "Please enter a valid Zimbabwean phone number (e.g., +263771234567, 0771234567)",
      },
    })}
    className="italic"
    placeholder="+263771234567 or 0771234567"
  />
  {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
</div>



              <div className="flex items-start flex-col gap-1">
                <label className="text-sm font-medium">Password</label>
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
                {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
              </div>

              <div className="flex items-start flex-col gap-1">
                <label className="text-sm font-medium">Confirm Password</label>
                <Input
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) => value === watch("password") || "Passwords do not match",
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
                <p className="text-sm text-muted-foreground">Have an account?</p>
                <Button onClick={handleLoginRedirect} variant="ghost" type="button" size="sm">
                  Login
                </Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </div>
    </>
  )
}

export default Register
