'use client';

import { useQuery } from '@tanstack/react-query';
import {
  getBrands,
  getCategories,
  searchProducts,
  getProductById,
  ProductSearchParams
} from '@/services/productService';

export const useBrands = (queryParams?: Record<string, any>) => {
  return useQuery({
    queryKey: ['brands', queryParams],
    queryFn: () => getBrands(queryParams)
  });
};

export const useCategories = (queryParams?: Record<string, any>) => {
  return useQuery({
    queryKey: ['categories', queryParams],
    queryFn: () => getCategories(queryParams)
  });
};

export const useProductSearch = (queryParams: ProductSearchParams) => {
  return useQuery({
    queryKey: ['productSearch', queryParams],
    queryFn: () => searchProducts(queryParams),
   // enabled: !!(queryParams.category_name || queryParams.brand_name) // Only run if at least one filter is provided
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    enabled: !!id // Only run the query if id is provided
  });
};
