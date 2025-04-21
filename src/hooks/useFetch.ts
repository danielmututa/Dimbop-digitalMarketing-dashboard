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



import { apiClient } from "@/context/axios";
import { unexpectedErrorMessage } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";

function useFetch<T>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchData = async () => {
        try {
            // Simplified: no authentication required
            const response = await apiClient.get<T>(url);
            setData(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || unexpectedErrorMessage);
            } else {
                setError(unexpectedErrorMessage);
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [url]);

    return { data, loading, error, refetch: fetchData };
}

export default useFetch;