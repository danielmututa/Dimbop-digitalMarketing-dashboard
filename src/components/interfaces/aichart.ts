// AI Query Interface
export interface AIQuery {
  query: string;
  image_url?: string;
  audio_url?: string;
}

// AI Response Interface
export interface AIResponse {
  message: string;
  report_type?: string;
  start_date?: string;
  end_date?: string;
  analysis_type?: 'text' | 'image' | 'audio' | 'multimodal';
}

// Report Request Interface
export interface ReportRequest {
  report_type:
    | 'products' 
    | 'product-sales' 
    | 'inventory'
    | 'users' 
    | 'user-activity' 
    | 'customers'
    | 'blogs' 
    | 'content' 
    | 'articles'
    | 'sales' 
    | 'revenue' 
    | 'financial'
    | 'general' 
    | 'overview';
  start_date?: string;
  end_date?: string;
}
