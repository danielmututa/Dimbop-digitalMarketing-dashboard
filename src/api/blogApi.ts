// import axios from "axios";
// import { apiClient } from "@/context/axios";
// import {  BlogResponseSM } from "@/lib/schemas/blogs/blog";


// export const CreateBlog = async (data: BlogResponseSM) => {
//   try {
//     const response = await apiClient.post('/api/blogs/newblog', data);
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       const backendError = error.response?.data;

//       const errorMessage =
//         backendError?.message ||
//         (typeof backendError === 'string' ? backendError : null) ||
//         'Login failed';

//       throw new Error(errorMessage);
//     }

//     throw new Error('An unexpected error occurred');
//   }
// };


// export const CreateBlogImage = async (data: BlogResponseSM) => { 
//   try {
//     const response = await apiClient.post('/api/blogs/newblogimage', data);
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       const backendError = error.response?.data;

//       const errorMessage =
//         backendError?.message ||
//         (typeof backendError === 'string' ? backendError : null) ||
//         'Login failed';
//         throw new Error(errorMessage);
//     }
//     throw new Error('An unexpected error occurred');
//     }
//   };
  



// export const GetBlogs = async () : Promise<BlogResponseSM>=> {
//   try {
//     const response = await apiClient.get('/api/blogs');
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       const backendError = error.response?.data;

//       const errorMessage =
//         backendError?.message ||
//         (typeof backendError === 'string' ? backendError : null) ||
//         'Login failed';

//       throw new Error(errorMessage);
//     }

//     throw new Error('An unexpected error occurred');
//   }
// }



// export const GetBlogById = async (id: string) : Promise<BlogResponseSM>=> {
//   try {
//     const response = await apiClient.get(`/api/blogs/${id}`);
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       const backendError = error.response?.data;

//       const errorMessage =
//         backendError?.message ||
//         (typeof backendError === 'string' ? backendError : null) ||
//         'Login failed';

//       throw new Error(errorMessage);
//     }

//     throw new Error('An unexpected error occu)rred');
//   }
// }


// export const UpdateBlog = async (id: string, data: BlogResponseSM) => {
//   try {
//     const response = await apiClient.put(`/api/blogs/${id}`, data);
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       const backendError = error.response?.data;

//       const errorMessage =
//         backendError?.message ||
//         (typeof backendError === 'string' ? backendError : null) ||
//         'Login failed';

//       throw new Error(errorMessage);
//     }

//     throw new Error('An unexpected error occurred');
//   }
// };






import axios from "axios";
import { apiClient } from "@/context/axios";
import { BlogResponseSM } from "@/lib/schemas/blogs/blog";

export const CreateBlog = async (data: BlogResponseSM) => {
  try {
    const response = await apiClient.post("/api/blogs/newblog", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendError = error.response?.data;
      const errorMessage =
        backendError?.message ||
        (typeof backendError === "string" ? backendError : null) ||
        "Login failed";
      throw new Error(errorMessage);
    }
    throw new Error("An unexpected error occurred");
  }
};

export const CreateBlogImage = async (data: BlogResponseSM) => {
  try {
    const response = await apiClient.post("/api/blogs/newblogimage", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendError = error.response?.data;
      const errorMessage =
        backendError?.message ||
        (typeof backendError === "string" ? backendError : null) ||
        "Login failed";
      throw new Error(errorMessage);
    }
    throw new Error("An unexpected error occurred");
  }
};

export const GetBlogs = async (): Promise<BlogResponseSM> => {
  try {
    const response = await apiClient.get("/api/blogs");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendError = error.response?.data;
      const errorMessage =
        backendError?.message ||
        (typeof backendError === "string" ? backendError : null) ||
        "Login failed";
      throw new Error(errorMessage);
    }
    throw new Error("An unexpected error occurred");
  }
};

export const GetBlogById = async (id: string): Promise<BlogResponseSM> => {
  try {
    const response = await apiClient.get(`/api/blogs/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendError = error.response?.data;
      const errorMessage =
        backendError?.message ||
        (typeof backendError === "string" ? backendError : null) ||
        "Login failed";
      throw new Error(errorMessage);
    }
    throw new Error("An unexpected error occurred");
  }
};

export const UpdateBlog = async (id: string, data: BlogResponseSM) => {
  try {
    const response = await apiClient.put(`/api/blogs/${id}`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendError = error.response?.data;
      const errorMessage =
        backendError?.message ||
        (typeof backendError === "string" ? backendError : null) ||
        "Login failed";
      throw new Error(errorMessage);
    }
    throw new Error("An unexpected error occurred");
  }
};