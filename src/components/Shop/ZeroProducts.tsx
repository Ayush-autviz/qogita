'use client'

import React from 'react'
import Link from 'next/link'
import * as Icon from "@phosphor-icons/react/dist/ssr"
import { Button } from '@/components/ui/button'

interface ZeroProductsProps {
  title?: string
  message?: string
  searchTerm?: string
  filters?: {
    category?: string
    brand?: string
    priceRange?: { min: number; max: number }
  }
  onClearFilters?: () => void
  className?: string
}

const ZeroProducts: React.FC<ZeroProductsProps> = ({
  title = 'No Products Found',
  message = 'We couldn\'t find any products matching your criteria.',
  searchTerm,
  filters,
  onClearFilters,
  className = ''
}) => {
  // Determine if filters are applied
  const hasFilters = !!(
    filters?.category || 
    filters?.brand || 
    (filters?.priceRange && (filters.priceRange.min > 0 || filters.priceRange.max < Infinity))
  )

  return (
    <div className={`zero-products flex flex-col items-center justify-center py-16 px-4 ${className}`}>
      <div className="icon-container mb-6">
        <Icon.ShoppingBagOpen size={80} weight="light" className="text-gray-400" />
      </div>
      
      <h2 className="heading3 text-center mb-3">{title}</h2>
      
      <p className="body1 text-black text-center max-w-md mb-6">
        {message}
      </p>

      {searchTerm && (
        <div className="search-term-info bg-gray-50 p-4 rounded-lg mb-6 w-full max-w-md">
          <p className="text-center text-gray-700">
            Your search for "<span className="font-semibold">{searchTerm}</span>" did not match any products.
          </p>
        </div>
      )}
      
      {hasFilters && (
        <div className="filters-info bg-gray-50 p-4 rounded-lg mb-6 w-full max-w-md">
          <h3 className="font-medium text-gray-900 mb-2">Applied Filters:</h3>
          <ul className="space-y-1 text-sm text-gray-700">
            {filters?.category && (
              <li className="flex items-center gap-2">
                <Icon.Tag size={16} />
                Category: <span className="font-medium">{filters.category}</span>
              </li>
            )}
            {filters?.brand && (
              <li className="flex items-center gap-2">
                <Icon.Storefront size={16} />
                Brand: <span className="font-medium">{filters.brand}</span>
              </li>
            )}
            {filters?.priceRange && (
              <li className="flex items-center gap-2">
                <Icon.CurrencyDollar size={16} />
                Price Range: <span className="font-medium">
                  ${filters.priceRange.min} - ${filters.priceRange.max === Infinity ? 'Any' : filters.priceRange.max}
                </span>
              </li>
            )}
          </ul>
        </div>
      )}
      
      <div className="actions flex flex-wrap gap-4 justify-center">
        {hasFilters && onClearFilters && (
          <Button 
            onClick={onClearFilters}
            className="button-main bg-black text-white hover:bg-black/90 px-6 py-3 rounded-full flex items-center gap-2"
          >
            <Icon.FunnelSimple size={20} />
            Clear All Filters
          </Button>
        )}
        
        <Link href="/shop/breadcrumb1">
          <Button 
            className="button-main bg-white border border-black text-black hover:bg-gray-100 px-6 py-3 rounded-full flex items-center gap-2"
          >
            <Icon.ShoppingBag size={20} />
            Browse All Products
          </Button>
        </Link>
      </div>
      
      <div className="suggestions mt-10 w-full max-w-md ">
        <h3 className="font-medium text-gray-900 mb-3 text-center">Suggestions:</h3>
        <div className='flex justify-center items-center'>
        <ul className="space-y-2 text-gray-700 ">
          <li className="flex items-start gap-2 ">
            <Icon.Check size={16} className="text-green-500 mt-1" />
            <span>Check the spelling of your search term</span>
          </li>
          <li className="flex items-start gap-2">
            <Icon.Check size={16} className="text-green-500 mt-1" />
            <span>Try using more general keywords</span>
          </li>
          <li className="flex items-start gap-2">
            <Icon.Check size={16} className="text-green-500 mt-1" />
            <span>Adjust your filters to broaden your search</span>
          </li>
          <li className="flex items-start gap-2">
            <Icon.Check size={16} className="text-green-500 mt-1" />
            <span>Explore our product categories for similar items</span>
          </li>
        </ul>
        </div>
      </div>
    </div>
  )
}

export default ZeroProducts
