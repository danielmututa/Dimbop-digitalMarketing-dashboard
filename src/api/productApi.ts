
import axios from "axios";
import { apiClient } from "@/context/axios";
import {  ProductSM,ProductsSM } from "@/lib/schemas/products/Products";




export const CreateProduct = async (data: ProductSM) : Promise<ProductsSM>=> {
  try {
    const response = await apiClient.post('/api/products/newproduct', data);
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


export const GetProducts = async () : Promise<ProductsSM>=> {
  try {
    const response = await apiClient.get('/api/products');
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
