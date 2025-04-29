import { AuthResponse, LoginSchema } from './../lib/schemas/auth/login';
import {RegisterSchema , AuthRegisterResponse} from "./../lib/schemas/auth/register";
import { unexpectedErrorMessage } from "@/lib/utils";
import axios from "axios";
import { apiClient } from "@/context/axios";







export const loginApi = async (data: LoginSchema) : Promise<AuthResponse>=> {
  try {
    const response = await apiClient.post("/api/auth/login", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.result);
    } else {
      throw new Error(`${unexpectedErrorMessage}`)
    }
  }
}


// export const RegisterApi = async (data: RegisterSchema) : Promise<AuthRegisterResponse>=> {
//   try {
//     const response = await apiClient.post("/api/auth/register", data);
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       throw new Error(error.response?.data.result);
//     } else {
//       throw new Error(`${unexpectedErrorMessage}`)
//     }
//   }
// }


// export const RegisterApi = async (data: RegisterSchema): Promise<AuthRegisterResponse> => {
//   try {
//     console.log("Sending registration data:", data); // Log the data being sent
//     const response = await apiClient.post("/api/auth/register", data);
//     console.log("Registration response:", response.data); // Log the server's response
//     return response.data;
//   } catch (error) {
//     console.error("Registration error:", error); // Log the error if it occurs
//     if (axios.isAxiosError(error)) {
//       const errorMessage = error.response?.data.message || "Registration failed";
//       console.error("Error message:", errorMessage); // Log the error message
//       throw new Error(errorMessage);
//     }
//     throw new Error("An unexpected error occurred");
//   }
// };


export const RegisterApi = async (data: RegisterSchema): Promise<AuthRegisterResponse> => {
  try {
    console.log('Sending registration data:', data);
    console.log('Full request URL:', `${apiClient.defaults.baseURL}/api/auth/register`);
    const response = await apiClient.post('/api/auth/register', data);
    console.log('Registration response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      console.error('Error message:', errorMessage);
      console.error('Status code:', error.response?.status);
      throw new Error(errorMessage);
    }
    throw new Error('An unexpected error occurred');
  }
};


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









// // delete
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