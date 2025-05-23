'use client';

import axiosClient from './axiosClient';

// Types
export interface Brand {
  name: string;
  slug: string;
  description: string;
  variantCount: number;
  qid: string;
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  hscode: string;
  qid: string;
  path: any[];
}

export interface Product {
  qid?: string;
  name: string;
  gtin?: string;
  categoryName?: string;
  brandName?: string;
  slug?: string;
  fid?: string;
  imageUrl?: string;
  price?: number | null;
  priceCurrency?: string | null;
  position?: number;
  unit?: string | null;
  // Add other product properties as needed
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// API functions
export const getBrands = async (queryParams?: Record<string, any>): Promise<PaginatedResponse<Brand>> => {
  const queryString = queryParams ? new URLSearchParams(queryParams).toString() : '';
  const url = `/api/products/brands${queryString ? `?${queryString}` : ''}`;

  const response = await axiosClient.get(url);
  return response.data.data;
};

export const getCategories = async (queryParams?: Record<string, any>): Promise<PaginatedResponse<Category>> => {
  // Handle special case for slug parameter which should be an array
  if (queryParams && queryParams.slug && Array.isArray(queryParams.slug)) {
    const params = new URLSearchParams();

    // Add all other parameters
    Object.entries(queryParams).forEach(([key, value]) => {
      if (key !== 'slug') {
        params.append(key, String(value));
      }
    });

    // Add each slug as a separate parameter
    queryParams.slug.forEach((slug: string) => {
      params.append('slug', slug);
    });

    const queryString = params.toString();
    const url = `/api/products/categories${queryString ? `?${queryString}` : ''}`;

    const response = await axiosClient.get(url);
    return response.data.data;
  } else {
    // Standard query string conversion for non-array parameters
    const queryString = queryParams ? new URLSearchParams(queryParams).toString() : '';
    const url = `/api/products/categories${queryString ? `?${queryString}` : ''}`;

    const response = await axiosClient.get(url);
    return response.data.data;
  }
};

export interface ProductSearchParams {
  query?: string;
  category_name?: string;
  brand_name?: string | string[];
  category_slug?: string | string[];
  min_price?: number;
  max_price?: number;
  page?: number;
  page_size?: number;
  [key: string]: any;
}

export interface ProductSearchResponse extends PaginatedResponse<Product> {
  facets?: {
    brand: Record<string, number>;
    category: {
      name: string;
      slug: string;
      subCategories: Array<{
        name: string;
        slug: string;
        count: number;
        subCategories: any[] | null;
      }> | null;
      count: number;
    };
    price: {
      min: number | null;
      max: number | null;
    };
  };
  searchHash?: string;
}

export const searchProducts = async (queryParams: ProductSearchParams): Promise<ProductSearchResponse> => {
  // Create a copy of the query parameters
  const params = { ...queryParams };

  // Handle special cases for parameters that can have multiple values
  let urlSearchParams = new URLSearchParams();

  // Add all parameters except those that can have multiple values
  Object.entries(params).forEach(([key, value]) => {
    if (key !== 'category_slug' && key !== 'brand_name') {
      if (value !== null && value !== undefined) {
        urlSearchParams.append(key, String(value));
      }
    }
  });

  // Handle category_slug specially to support multiple values
  if (params.category_slug) {
    if (Array.isArray(params.category_slug)) {
      // If it's already an array, add each value
      params.category_slug.forEach(slug => {
        urlSearchParams.append('category_slug', slug);
      });
    } else {
      // Single slug
      urlSearchParams.append('category_slug', params.category_slug);
    }
  }

  // Handle brand_name specially to support multiple values
  if (params.brand_name) {
    if (Array.isArray(params.brand_name)) {
      // If it's already an array, add each value
      params.brand_name.forEach(brand => {
        urlSearchParams.append('brand_name', brand);
      });
    } else {
      // Single brand
      urlSearchParams.append('brand_name', params.brand_name);
    }
  }

  const queryString = urlSearchParams.toString();
  const url = `/api/products/search${queryString ? `?${queryString}` : ''}`;

  const response = await axiosClient.get(url);
  return response.data.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await axiosClient.get(`/api/products/${id}`);
  return response.data.data;
};

export const getProductByGtin = async (gtin: string): Promise<Product> => {
  const response = await axiosClient.get(`/api/products/gtin/${gtin}`);
  return response.data.data;
};

export const searchProductsByTerm = async (term: string, queryParams?: Record<string, any>): Promise<ProductSearchResponse> => {
  // Create URL search params for additional query parameters
  const params = new URLSearchParams();

  // Add the search term as a query parameter
  params.append('query', term);

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        params.append(key, String(value));
      }
    });
  }

  const queryString = params.toString();
  const url = `/api/products/search?${queryString}`;

  const response = await axiosClient.get(url);
  return response.data.data;
};
