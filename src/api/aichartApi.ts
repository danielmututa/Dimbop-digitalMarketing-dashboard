// src/api/ai.ts

import axios from "axios";
import { apiClient } from "@/context/axios";
import { AIQueryType, AIResponseType, ReportRequestType } from "@/lib/schemas/chatai/Chataireport"; 

// ----------------------
// AI Query API
// ----------------------
export const aiQueryApi = async (data: AIQueryType): Promise<AIResponseType> => {
  try {
    const response = await apiClient.post("/api/assitence/ai/query", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendError = error.response?.data;
      const errorMessage =
        backendError?.message ||
        (typeof backendError === "string" ? backendError : null) ||
        "AI query failed";
      throw new Error(errorMessage);
    }
    throw new Error("An unexpected error occurred");
  }
};

// ----------------------
// AI Report API
// ----------------------
export const aiReportApi = async (data: ReportRequestType): Promise<AIResponseType> => {
  try {
    const response = await apiClient.post("/api/assitence/ai/report", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendError = error.response?.data;
      const errorMessage =
        backendError?.message ||
        (typeof backendError === "string" ? backendError : null) ||
        "Report generation failed";
      throw new Error(errorMessage);
    }
    throw new Error("An unexpected error occurred");
  }
};

// ----------------------
// AI Bulk Analysis API
// ----------------------
export const aiAnalysisApi = async (): Promise<AIResponseType> => {
  try {
    const response = await apiClient.get("/api/assitence/ai/analysis");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendError = error.response?.data;
      const errorMessage =
        backendError?.message ||
        (typeof backendError === "string" ? backendError : null) ||
        "Bulk analysis failed";
      throw new Error(errorMessage);
    }
    throw new Error("An unexpected error occurred");
  }
};

// ----------------------
// AI Health Check API
// ----------------------
export const aiHealthApi = async (): Promise<{
  status: string;
  services: { gemini: boolean; database: boolean; multimodal: boolean };
}> => {
  try {
    const response = await apiClient.get("/api/assitence/ai/health");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendError = error.response?.data;
      const errorMessage =
        backendError?.message ||
        (typeof backendError === "string" ? backendError : null) ||
        "Health check failed";
      throw new Error(errorMessage);
    }
    throw new Error("An unexpected error occurred");
  }
};
