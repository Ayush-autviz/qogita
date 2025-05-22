'use client';

import axiosClient from './axiosClient';

export interface Brand {
  name: string;
  slug: string;
  description: string;
  variantCount: number;
  qid: string;
}

export interface BrandsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Brand[];
}

export interface BrandSearchParams {
  page?: number;
  page_size?: number;
  search?: string;
  category_name?: string;
  category_slug?: string | string[];
}

/**
 * Fetch all brands with optional filtering
 * @param params Optional search parameters
 * @returns Promise with brands response
 */
export const getBrands = async (params?: BrandSearchParams): Promise<BrandsResponse> => {
  try {
    // Build query parameters
    const queryParams = new URLSearchParams();
    
    if (params) {
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.page_size) queryParams.append('page_size', params.page_size.toString());
      if (params.search) queryParams.append('search', params.search);
      if (params.category_name) queryParams.append('category_name', params.category_name);
      
      // Handle category_slug which can be a string or array of strings
      if (params.category_slug) {
        if (Array.isArray(params.category_slug)) {
          params.category_slug.forEach(slug => {
            queryParams.append('category_slug', slug);
          });
        } else {
          queryParams.append('category_slug', params.category_slug);
        }
      }
    }

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/api/brands?${queryString}` : '/api/brands';
    
    const response = await axiosClient.get<BrandsResponse>(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching brands:', error);
    throw error;
  }
};

/**
 * Fetch a single brand by slug
 * @param slug The brand slug
 * @returns Promise with brand data
 */
export const getBrandBySlug = async (slug: string): Promise<Brand> => {
  try {
    const response = await axiosClient.get<Brand>(`/api/brands/${slug}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching brand with slug ${slug}:`, error);
    throw error;
  }
};
