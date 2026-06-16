export interface User {
    id: string;
    email: string;
    created_at: string;
  }
  
  export interface Asset {
    id: string;
    asset_name: string;
    asset_type: string;
    environment: string;
    owner: string;
    status: string;
    description?: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface AssetFormData {
    asset_name: string;
    asset_type: string;
    environment: string;
    owner: string;
    status: string;
    description?: string;
  }
  
  export interface ApiResponse<T> {
    data: T;
    error?: string;
  }