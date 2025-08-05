
// import type React from "react"
// import { Button } from "@/components/ui/button"
// import { toast } from "sonner"
// import { initiateGoogleAuth } from "@/lib/google-auth"

// interface GoogleSignInProps {
//   onGoogleSignIn?: (userInfo: any) => void
//   disabled?: boolean
//   className?: string
//   useRealAuth?: boolean // Toggle between mock and real auth
// }

// const GoogleSignIn: React.FC<GoogleSignInProps> = ({
//   onGoogleSignIn,
//   disabled = false,
//   className = "",
//   useRealAuth = false, // Set to true when you have Google credentials
// }) => {
//   const handleMockGoogleSignIn = async () => {
//     try {
//       console.log("🔍 Mock Google Sign-In clicked!")
//       toast.loading("Connecting to Google...")

//       // Mock delay
//       await new Promise((resolve) => setTimeout(resolve, 2000))

//       // Mock user data
//       const mockUserInfo = {
//         id: "mock_google_123",
//         email: "user@gmail.com",
//         name: "John Doe",
//         picture: "https://via.placeholder.com/100",
//         given_name: "John",
//         family_name: "Doe",
//       }

//       toast.dismiss()
//       toast.success("✅ Mock Google Sign-In successful!")

//       if (onGoogleSignIn) {
//         onGoogleSignIn(mockUserInfo)
//       }

//       console.log("Mock Google user:", mockUserInfo)
//     } catch (error) {
//       console.error("Mock Google Sign-In error:", error)
//       toast.dismiss()
//       toast.error("❌ Mock Google Sign-In failed!")
//     }
//   }

//   const handleRealGoogleSignIn = () => {
//     try {
//       console.log("🔍 Real Google Sign-In clicked!")
//       toast.loading("Redirecting to Google...")

//       // This will redirect to Google's OAuth page
//       initiateGoogleAuth()
//     } catch (error) {
//       console.error("Real Google Sign-In error:", error)
//       toast.dismiss()
//       toast.error("❌ Failed to redirect to Google!")
//     }
//   }

//   const handleClick = useRealAuth ? handleRealGoogleSignIn : handleMockGoogleSignIn

//   return (
//     <div className="space-y-2">
//       <Button
//         type="button"
//         variant="outline"
//         className={`w-full flex items-center justify-center gap-3 py-6 text-sm font-medium border-2 hover:bg-gray-50 ${className}`}
//         onClick={handleClick}
//         disabled={disabled}
//       >
//         {/* Google Icon SVG */}
//         <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//           <path
//             fill="#4285F4"
//             d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//           />
//           <path
//             fill="#34A853"
//             d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//           />
//           <path
//             fill="#FBBC05"
//             d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//           />
//           <path
//             fill="#EA4335"
//             d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//           />
//         </svg>
//         {disabled ? "Signing in..." : "Continue with Google"}
//       </Button>

//       {/* Status indicator */}
//       <p className="text-xs text-center text-gray-500">
//         {useRealAuth ? "🔗 Real Google OAuth" : "🧪 Mock Mode (for testing)"}
//       </p>
//     </div>
//   )
// }

// export default GoogleSignIn
