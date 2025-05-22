'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Skeleton } from '@/components/ui/skeleton'
import { useBrands } from '@/hooks/useProducts'

const PremiumBrands = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all')

  // Categories for filtering brands
  const categories = ['all', 'fashion', 'cosmetics', 'accessories', 'footwear']

  // Query parameters for the brands API
  const queryParams = {
    premium: true,
    size: 8,
     // Filter for premium brands only
    // If a category is selected (other than 'all'), add it to the query
   
  }

  // Use the useBrands hook to fetch brands from the API
  const {
    data: brandsData,
    isLoading: loading,
    error: queryError
  } = useBrands(queryParams)

  // Extract brands from the response or use an empty array if data is not available
  const brands = brandsData?.results || []

  // Format error message if there's an error
  const error = queryError ? 'Failed to load premium brands' : null

  return (
    <div className="premium-brands-block md:pt-20 pt-10">
      <div className="container">
        <div className="heading flex flex-col items-center text-center">
          <div className="heading3">Premium Brands</div>
          <div className="body1 mt-3 text-black max-w-[600px]">
            Discover our curated collection of premium brands, offering exceptional quality and style
          </div>
          {/* <div className="menu-tab flex items-center gap-2 p-1 bg-surface rounded-2xl mt-6">
            {categories.map((category) => (
              <div
                key={category}
                className={`tab-item relative text-secondary text-button-uppercase py-2 px-5 cursor-pointer duration-500 hover:text-black ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {activeCategory === category && (
                  <motion.div layoutId='active-pill' className='absolute inset-0 rounded-2xl bg-white'></motion.div>
                )}
                <span className='relative text-button-uppercase z-[1] capitalize'>
                  {category}
                </span>
              </div>
            ))}
          </div> */}
        </div>

        {loading ? (
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-[30px] md:mt-10 mt-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="brand-card p-6 rounded-2xl border border-gray-100 flex flex-col items-center h-full">
                <Skeleton className="w-[120px] h-[60px] rounded-lg mb-4" />
                <Skeleton className="w-3/4 h-6 rounded-md mb-2" />
                <Skeleton className="w-full h-4 rounded-md mb-2" />
                <Skeleton className="w-2/3 h-4 rounded-md mb-4" />
                <Skeleton className="w-1/3 h-6 rounded-full" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500 mt-8">
            <p>{error}</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-[30px] md:mt-10 mt-6">
            {brands.map((brand) => (
              <Link href={`/shop/breadcrumb1?brand_name=${brand.name}`} key={brand.qid}>
                <div className="brand-card p-6 rounded-2xl border border-gray-100 hover:border-black hover:shadow-lg transition-all duration-300 flex flex-col items-center h-full group">
                  {/* Brand logo placeholder with gradient background */}
                  {/* <div className="brand-logo w-[120px] h-[60px] bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:from-gray-100 group-hover:to-gray-200 transition-all duration-300 relative overflow-hidden">
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-600">{brand.name.charAt(0)}</span>

              
                    <div className="absolute -right-4 -bottom-4 w-12 h-12 rounded-full bg-black/5 group-hover:bg-black/10 transition-all duration-300"></div>
                    <div className="absolute -left-4 -top-4 w-8 h-8 rounded-full bg-black/5 group-hover:bg-black/10 transition-all duration-300"></div>
                  </div> */}

                  <h3 className="text-lg text-black font-semibold text-center mb-2 group-hover:text-black transition-colors duration-300">{brand.name}</h3>
                  <p className="text-sm  text-center line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">{brand.description || 'Premium brand'}</p>

                  <div className="mt-4 px-3 py-1 text-xs bg-gray-100 rounded-full text-gray-700 group-hover:bg-black group-hover:text-white transition-all duration-300">
                    {brand.variantCount || 0} Products
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* <div className="flex justify-center mt-8">
          <Link
            href={activeCategory !== 'all'
              ? `/shop/breadcrumb1?category_name=${activeCategory}`
              : "/shop/breadcrumb1"
            }
            className="button-main bg-black text-white hover:bg-black/90 px-6 py-3 rounded-full"
          >
            View All {activeCategory !== 'all' ? `${activeCategory} ` : ''}Brands
          </Link>
        </div> */}
      </div>
    </div>
  )
}

export default PremiumBrands
