import { unexpectedErrorMessage } from "@/lib/utils";
import axios from "axios";
import { apiClient } from "@/context/axios";






// Get user API (GET)
export const getAllUsersApi = async () => {
  try {
    const response = await apiClient.get("/api/auth/users");
    return response.data; // This should return an array of users
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.error || `${unexpectedErrorMessage}`);
    } else {
      throw new Error(`${unexpectedErrorMessage}`);
    }
  }
};








// delete
export const deleteUserApi = async (userId: string) => {
  try {
    const response = await apiClient.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.error || `${unexpectedErrorMessage}`);
    } else {
      throw new Error(`${unexpectedErrorMessage}`);
    }
  }
};