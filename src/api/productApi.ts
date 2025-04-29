import { unexpectedErrorMessage } from "@/lib/utils";
import axios from "axios";
import { apiClient } from "@/context/axios";




export const CreateProduct = async () => {
    try {
      const response = await apiClient.post("/api/products/newproduct");
      return response.data; 
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.error || `${unexpectedErrorMessage}`);
      } else {
        throw new Error(`${unexpectedErrorMessage}`);
      }
    }
  };
  