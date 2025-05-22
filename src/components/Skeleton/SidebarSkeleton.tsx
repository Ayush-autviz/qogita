'use client'

import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const SidebarSkeleton = () => {
  return (
    <div className="sidebar-skeleton border border-gray-100 p-4 rounded-lg">
      <Skeleton className="h-6 w-1/3 mb-6" />
      <div className="space-y-4 mb-8">
        {Array(8).fill(0).map((_, index) => (
          <div key={index} className="flex justify-between border-b border-gray-100 pb-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-[40px]" />
          </div>
        ))}
      </div>
      
      <Skeleton className="h-6 w-1/3 mb-6 mt-8" />
      <Skeleton className="h-10 w-full mb-4" />
      <div className="flex justify-between mb-6">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  )
}

export default SidebarSkeleton
