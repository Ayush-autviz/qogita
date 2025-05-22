'use client'

import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const ProductDetailShadcnSkeleton = () => {
  return (
    <div className="product-detail-skeleton">
      <div className="container flex justify-between gap-y-6 flex-wrap py-10">
        {/* Product images skeleton */}
        <div className="md:w-1/2 md:pr-[45px] w-full">
          <Skeleton className="w-full aspect-[3/4] rounded-2xl" />
          <div className="flex gap-2 mt-4">
            {Array(4).fill(0).map((_, index) => (
              <Skeleton key={index} className="w-1/4 aspect-[3/4] rounded-xl" />
            ))}
          </div>
        </div>
        
        {/* Product info skeleton */}
        <div className="md:w-1/2 w-full lg:pl-[15px] md:pl-2">
          <div className="flex justify-between mb-4">
            <div>
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-8 w-64" />
            </div>
            <Skeleton className="w-12 h-12 rounded-xl" />
          </div>
          
          <div className="flex items-center gap-2 mb-6">
            <div className="flex">
              {Array(5).fill(0).map((_, index) => (
                <Skeleton key={index} className="w-4 h-4 rounded-full mr-1" />
              ))}
            </div>
            <Skeleton className="h-4 w-24" />
          </div>
          
          <div className="flex items-center gap-3 flex-wrap pb-6 border-b border-line">
            <Skeleton className="h-6 w-20" />
            <div className="w-px h-4 bg-gray-200"></div>
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-4 w-full mt-3" />
          </div>
          
          {/* Color selection skeleton */}
          <div className="mt-6 mb-5">
            <Skeleton className="h-5 w-32 mb-3" />
            <div className="flex gap-2">
              {Array(4).fill(0).map((_, index) => (
                <Skeleton key={index} className="w-12 h-12 rounded-xl" />
              ))}
            </div>
          </div>
          
          {/* Size selection skeleton */}
          <div className="mb-5">
            <div className="flex justify-between mb-3">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-24" />
            </div>
            <div className="flex gap-2">
              {Array(5).fill(0).map((_, index) => (
                <Skeleton key={index} className="w-12 h-12 rounded-full" />
              ))}
            </div>
          </div>
          
          {/* Quantity and buttons skeleton */}
          <div className="mt-5 mb-5">
            <Skeleton className="h-5 w-24 mb-3" />
            <div className="flex items-center gap-5 mb-5">
              <Skeleton className="h-12 w-[180px] rounded-lg" />
              <Skeleton className="h-12 w-full rounded-full" />
            </div>
            <Skeleton className="h-12 w-full rounded-full" />
          </div>
          
          {/* Additional info skeleton */}
          <div className="flex items-center gap-8 pb-6 border-b border-line">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailShadcnSkeleton
