
export interface User
 {
    id: number;
    username: string;
    email: string;
    role: 'user' | 'admin'; 
  }

  export interface RegisterAdmin{
    username: string;
    email: string;
    role: 'user' | 'admin'; 
    password: string;
    confirmPassword: string;
  } 
  
  export interface AuthData {
    user: User;
    token: string;
  }
  
  export interface AuthResponse {
    success: boolean;
    data: AuthData;
  }


  
  export interface AuthRegisterResponse {
    success: boolean;
    data: {
      user: User;
      token: string;
    };
  }

  