export interface User
 {
    username: string;
    email: string;
    role: 'user' | 'admin'; 
  }
  
  export interface AuthData {
    user: User;
    token: string;
  }
  
  export interface AuthResponse {
    success: boolean;
    data: AuthData;
  }
  


