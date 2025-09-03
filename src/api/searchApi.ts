// import axios from 'axios';
// import { apiClient } from '@/context/axios';
// import { z } from 'zod';
// import {
//   GlobalSearchResponseSchema,
//   SearchSuggestionsResponseSchema,
//   GlobalSearchResponse,
//   SearchSuggestionsResponse
// } from '@/lib/schemas/search';

// // ---------------------------
// // Global Search API
// // ---------------------------
// export const globalSearchApi = async (
//   params: { q: string; page?: number; limit?: number; type?: 'product' | 'blog' }
// ): Promise<GlobalSearchResponse> => {
//   try {
//     const { q, page = 1, limit = 20, type } = params;
//     const queryParams = new URLSearchParams({ q, page: page.toString(), limit: limit.toString() });
//     if (type) queryParams.append('type', type);

//     const response = await apiClient.get(`/api/search?${queryParams.toString()}`);

//     return GlobalSearchResponseSchema.parse(response.data);
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       const backendError = error.response?.data;
//       const errorMessage =
//         backendError?.message ||
//         (typeof backendError === 'string' ? backendError : null) ||
//         'Search request failed';
//       throw new Error(errorMessage);
//     }

//     if (error instanceof z.ZodError) {
//       console.error('Invalid response shape:', error.errors);
//       throw new Error('Invalid data from server');
//     }

//     throw new Error('An unexpected error occurred');
//   }
// };




import axios from 'axios';
import { apiClient } from '@/context/axios';
import {
  GlobalSearchResponse,
  SearchSuggestionsResponse,
  HealthCheckResponse,
} from '@/lib/schemas/search/searchschema';


// ---------------------------
// Global Search API
// ---------------------------
export const globalSearchApi = async (
  params: { q: string; page?: number; limit?: number; type?: 'product' | 'blog' }
): Promise<GlobalSearchResponse> => {
  try {
    const response = await apiClient.get('/api/search', { params });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendError = error.response?.data;
      const errorMessage =
        backendError?.message ||
        (typeof backendError === 'string' ? backendError : null) ||
        'Search failed';
      throw new Error(errorMessage);
    }
    throw new Error('An unexpected error occurred');
  }
};

// ---------------------------
// Search Suggestions API
// ---------------------------
export const searchSuggestionsApi = async (
  params: { q: string; limit?: number }
): Promise<SearchSuggestionsResponse> => {
  try {
    const response = await apiClient.get('/api/search/suggestions', { params });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendError = error.response?.data;
      const errorMessage =
        backendError?.message ||
        (typeof backendError === 'string' ? backendError : null) ||
        'Fetching suggestions failed';
      throw new Error(errorMessage);
    }
    throw new Error('An unexpected error occurred');
  }
};

// ---------------------------
// Health Check API
// ---------------------------
export const searchHealthCheckApi = async (): Promise<HealthCheckResponse> => {
  try {
    const response = await apiClient.get('/api/search/health');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendError = error.response?.data;
      const errorMessage =
        backendError?.message ||
        (typeof backendError === 'string' ? backendError : null) ||
        'Health check failed';
      throw new Error(errorMessage);
    }
    throw new Error('An unexpected error occurred');
  }
};
