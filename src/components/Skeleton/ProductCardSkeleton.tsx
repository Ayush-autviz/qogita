'use client'

import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

interface ProductCardSkeletonProps {
  count?: number
  gridCols?: string
}

const ProductCardSkeleton: React.FC<ProductCardSkeletonProps> = ({ 
  count = 6, 
  gridCols = 'lg:grid-cols-3 grid-cols-2' 
}) => {
  return (
    <div className={`grid ${gridCols} sm:gap-[30px] gap-[20px]  w-full`}>
      {Array(count).fill(0).map((_, index) => (
        <div key={index} className="product-skeleton border border-gray-100 p-4 rounded-lg">
          {/* Image skeleton */}
          <Skeleton className="w-full h-[300px]" />
          
          {/* Product info skeleton */}
          <div className="mt-4 space-y-3">
            {/* Title */}
            <Skeleton className="h-5 w-3/4" />
            
            {/* Price and rating */}
            <div className="flex justify-between">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/4" />
            </div>
            
            {/* Category */}
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductCardSkeleton
