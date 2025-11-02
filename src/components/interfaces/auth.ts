// src/components/interfaces/auth.ts

export interface User {
  id: number;
  username?: string;
  name?: string;
  merchant_name?: string; // ✅ Keep this (backend uses snake_case)
  email: string;
  phone: string | null;
  role: 'super_admin' | 'digital_marketer_admin' | 'client_admin' | 'client'; // ✅ Correct roles
  auth_provider?: 'email' | 'google' | 'apple' | 'facebook'; // ✅ Keep snake_case
  google_id?: string | null; // ✅ Keep snake_case
  facebook_id?: string | null;
  apple_id?: string | null;
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















// // src/components/interfaces/auth.ts

// export interface User {
//   id: number;
//   username?: string;
//   name?: string;
//   merchantName?: string;
//   email: string;
//   phone: string | null;
//   role: 'super_admin' | 'digital_marketer_admin' | 'client_admin' | 'client' | 'user' | 'admin';
//   authProvider?: 'email' | 'google' | 'apple' | 'facebook';
//   googleId?: string;
//   facebookId?: string;
//   appleId?: string;
// }

// export interface RegisterAdmin {
//   username: string;
//   email: string;
//   phone: string;
//   role: 'user' | 'admin';
//   password: string;
//   confirmPassword: string;
// }

// export interface AuthData {
//   user: User;
//   token: string;
// }

// export interface AuthResponse {
//   success: boolean;
//   data: AuthData;
// }

// export interface AuthRegisterResponse {
//   success: boolean;
//   data: {
//     user: User;
//     token: string;
//   };
// }























// export interface User
//  {
//     id: number;
//     username: string;
//     email: string;
//      phone: string;
//     role: 'user' | 'admin'; 
//   }

//   export interface RegisterAdmin{
//     username: string;
//     email: string;
//     phone: string;
//     role: 'user' | 'admin'; 
//     password: string;
//     confirmPassword: string;
//   } 
  
//   export interface AuthData {
//     user: User;
//     token: string;
//   }
  
//   export interface AuthResponse {
//     success: boolean;
//     data: AuthData;
//   }


  
//   export interface AuthRegisterResponse {
//     success: boolean;
//     data: {
//       user: User;
//       token: string;
//     };
//   }

  