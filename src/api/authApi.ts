import { AuthResponse, LoginSchema } from './../lib/schemas/auth/login';
import {RegisterInput, AuthRegisterResponse  } from "./../lib/schemas/auth/register";
import axios from "axios";
import { apiClient } from "@/context/axios";


export const loginApi = async (data: LoginSchema) : Promise<AuthResponse>=> {
  try {
    const response = await apiClient.post('/api/auth/login', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendError = error.response?.data;

      const errorMessage =
        backendError?.message ||
        (typeof backendError === 'string' ? backendError : null) ||
        'Login failed';

      throw new Error(errorMessage);
    }

    throw new Error('An unexpected error occurred');
  }
};



// export const RegisterApi = async (data: RegisterInput): Promise<AuthRegisterResponse> => {
//   try {
//     const response = await apiClient.post('/api/auth/register', data);
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       const backendError = error.response?.data;

//       const errorMessage =
//         backendError?.message ||
//         (typeof backendError === 'string' ? backendError : null) ||
//         'Registration failed';

//       throw new Error(errorMessage);
//     }

//     throw new Error('An unexpected error occurred');
//   }
// };


export const RegisterApi = async (data: RegisterInput): Promise<AuthRegisterResponse> => {
  try {
    const response = await apiClient.post('/api/auth/register', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Extract the backend error message
      const backendErrorMessage = error.response?.data?.message || 
                                 error.response?.data?.error ||
                                 error.response?.data ||
                                 'Registration failed';
      
      // Throw with the proper backend message
      throw new Error(backendErrorMessage);
    }
    throw new Error('An unexpected error occurred');
  }
};


export const ChangePasswordApi = async (data: {currentPassword: string; newPassword: string; confirmNewPassword: string;
}) => {
  try {
    const response = await apiClient.post('/api/auth/change-password', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendError = error.response?.data;

      const errorMessage =
        backendError?.message ||
        (typeof backendError === 'string' ? backendError : null) ||
        'Password change failed';

      throw new Error(errorMessage);
    }
    throw new Error('An unexpected error occurred');
  }
};


export const ResetPasswordApi = async (data: {token: string; newPassword: string; confirmNewPassword: string;
}) => {
  try {
    const response = await apiClient.post('/api/auth/reset-password', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendError = error.response?.data;

      const errorMessage =
        backendError?.message ||
        (typeof backendError === 'string' ? backendError : null) ||
        'Password reset failed';

      throw new Error(errorMessage);
    }
    throw new Error('An unexpected error occurred');
  }
};


export const ForgetPasswordApi = async (data: {email: string}) => {
  try {
    const response = await apiClient.post('/api/auth/forgot-password', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendError = error.response?.data;

      const errorMessage =
        backendError?.message ||
        (typeof backendError === 'string' ? backendError : null) ||
        'Password reset failed';

      throw new Error(errorMessage);
    }
    throw new Error('An unexpected error occurred');
  }
};


export const DeleteApi = async (userId: string) => {
  try {
    const response = await apiClient.delete(`/api/auth/users/${userId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendError = error.response?.data;

      const errorMessage =
        backendError?.message ||
        (typeof backendError === 'string' ? backendError : null) ||
        'Deletion failed';

      throw new Error(errorMessage);
    }

    throw new Error('An unexpected error occurred');
  }
}


// Get user API (GET)
// export const getAllUsersApi = async () => {
//   try {
//     const response = await apiClient.get("/api/auth/users");
//     return response.data; // This should return an array of users
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       throw new Error(error.response?.data.error || `${unexpectedErrorMessage}`);
//     } else {
//       throw new Error(`${unexpectedErrorMessage}`);
//     }
//   }
// };




// export const deleteUserApi = async (userId: string) => {
//   try {
//     const response = await apiClient.delete(`/users/${userId}`);
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       throw new Error(error.response?.data.error || `${unexpectedErrorMessage}`);
//     } else {
//       throw new Error(`${unexpectedErrorMessage}`);
//     }
//   }
// };