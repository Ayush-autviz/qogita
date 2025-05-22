'use client'

import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const SearchShadcnSkeleton = () => {
  return (
    <div className="search-skeleton">
      <div className="grid xl:grid-cols-4 sm:grid-cols-2 gap-7 mt-4">
        {Array(4).fill(0).map((_, index) => (
          <div key={index} className="product-skeleton border border-gray-100 p-3 rounded-lg">
            {/* Image skeleton */}
            <Skeleton className="w-full h-[200px] rounded-lg" />
            
            {/* Product info skeleton */}
            <div className="mt-3 space-y-2">
              {/* Title */}
              <Skeleton className="h-4 w-3/4" />
              
              {/* Price */}
              <Skeleton className="h-3 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchShadcnSkeleton
