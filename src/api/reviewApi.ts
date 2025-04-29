import { unexpectedErrorMessage } from "@/lib/utils";
import axios from "axios";
import { apiClient } from "@/context/axios";


// Get all reviews API (GET)
export const getAllReviewsApi = async () => {
  try {
    const response = await apiClient.get("/api/reviews");
    return response.data; // This should return an array of reviews
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.error || `${unexpectedErrorMessage}`);
    } else {
      throw new Error(`${unexpectedErrorMessage}`);
    }
  }
}