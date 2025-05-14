




import { apiClient } from "@/context/axios";
import { unexpectedErrorMessage } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";

// Match the exact same ApiError interface from auth store
interface ApiError {
  message: string;
  [key: string]: unknown;
}

// Type guard to match auth store's implementation
function isApiError(error: unknown): error is ApiError {
  return typeof error === 'object' && error !== null && 'message' in error;
}

interface FetchResult<T> {
  data: T | null;
  isLoading: boolean;  // Changed from 'loading' to match auth store
  error: string | null;  // Made nullable to match auth store
  refetch: () => Promise<void>;
}

function useFetch<T>(url: string): FetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);  // Changed variable name
  const [error, setError] = useState<string | null>(null);  // Made nullable

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);  // Set to null to match auth store pattern
    
    try {
      const response = await apiClient.get<T>(url);
      setData(response.data);
    } catch (error: unknown) {
      let errorMessage: string;
      
      if (axios.isAxiosError(error)) {
        // Match the exact error handling pattern from auth store
        errorMessage = isApiError(error.response?.data)
          ? error.response.data.message
          : unexpectedErrorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        errorMessage = unexpectedErrorMessage;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { 
    data, 
    isLoading,  // Changed property name to match
    error, 
    refetch: fetchData 
  };
}

export default useFetch;