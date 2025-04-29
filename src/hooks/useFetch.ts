// import { apiClient } from "@/context/axios";
// import { unexpectedErrorMessage } from "@/lib/utils";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useUserStore } from "../context/userContext";

// function useFetch<T>(url: string) {
//     const [data, setData] = useState<T | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");
//     const { token, logout } = useUserStore();

//     const fetchData = async () => {
//         try {
//             const response = await apiClient.get<T>(url, {
//                 headers: {
//                     Authorization: token ? `Bearer ${token}` : undefined,
//                 },
//                 withCredentials: true // Essential for cookies
//             });
//             setData(response.data);
//         } catch (error) {
//             if (axios.isAxiosError(error)) {
//                 if (error.response?.status === 401) {
//                     // Handle expired token
//                     logout();
//                     setError("Session expired. Please login again.");
//                 } else {
//                     setError(error.response?.data.message || unexpectedErrorMessage);
//                 }
//             } else {
//                 setError(unexpectedErrorMessage);
//             }
//         } finally {
//             setLoading(false);
//         }
//     }

//     useEffect(() => {
//         fetchData();
//     }, [url, token]);

//     return { data, loading, error, refetch: fetchData };
// }

// export default useFetch;



// import { apiClient } from "@/context/axios";
// import { unexpectedErrorMessage } from "@/lib/utils";
// import axios from "axios";
// import { useEffect, useState } from "react";

// function useFetch<T>(url: string) {
//     const [data, setData] = useState<T | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     const fetchData = async () => {
//         try {
//             // Simplified: no authentication required
//             const response = await apiClient.get<T>(url);
//             setData(response.data);
//         } catch (error) {
//             if (axios.isAxiosError(error)) {
//                 setError(error.response?.data?.message || unexpectedErrorMessage);
//             } else {
//                 setError(unexpectedErrorMessage);
//             }
//         } finally {
//             setLoading(false);
//         }
//     }

//     useEffect(() => {
//         fetchData();
//     }, [url]);

//     return { data, loading, error, refetch: fetchData };
// }

// export default useFetch;





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