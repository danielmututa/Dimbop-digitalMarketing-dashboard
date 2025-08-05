// Google OAuth configuration
export const GOOGLE_CONFIG = {
  // You'll get this from Google Cloud Console
  CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID || "your-google-client-id.googleusercontent.com",
  REDIRECT_URI: process.env.REACT_APP_GOOGLE_REDIRECT_URI || "http://localhost:3000/auth/google/callback",
  SCOPE: "openid email profile",
}

// Google OAuth URLs
export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CONFIG.CLIENT_ID}&redirect_uri=${GOOGLE_CONFIG.REDIRECT_URI}&response_type=code&scope=${GOOGLE_CONFIG.SCOPE}&access_type=offline&prompt=consent`

// Function to initiate Google OAuth
export const initiateGoogleAuth = () => {
  console.log("🔗 Redirecting to Google OAuth...")
  console.log("Google Auth URL:", GOOGLE_AUTH_URL)

  // This will redirect user to Google's login page
  window.location.href = GOOGLE_AUTH_URL
}

// Function to handle Google OAuth callback (when user returns from Google)
export const handleGoogleCallback = async (code: string) => {
  try {
    console.log("🔄 Processing Google OAuth callback...")

    // Exchange the code for tokens
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: GOOGLE_CONFIG.CLIENT_ID,
        client_secret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET || "your-client-secret",
        code,
        grant_type: "authorization_code",
        redirect_uri: GOOGLE_CONFIG.REDIRECT_URI,
      }),
    })

    const tokens = await tokenResponse.json()

    if (!tokenResponse.ok) {
      throw new Error(tokens.error_description || "Failed to get tokens")
    }

    // Get user info from Google
    const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    })

    const userInfo = await userResponse.json()

    if (!userResponse.ok) {
      throw new Error("Failed to get user info")
    }

    return {
      user: userInfo,
      tokens,
    }
  } catch (error) {
    console.error("Google OAuth error:", error)
    throw error
  }
}
