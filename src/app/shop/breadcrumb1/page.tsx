'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation';
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import MenuOne from '@/components/Header/Menu/MenuOne'
import ShopBreadCrumb1 from '@/components/Shop/ShopBreadCrumb1'
import productData from '@/data/Product.json'
import Footer from '@/components/Footer/Footer'
import { useProductSearch } from '@/hooks/useProducts';
import { ProductSearchParams } from '@/services/productService';
import ProductCardSkeleton from '@/components/Skeleton/ProductCardSkeleton';
import SidebarSkeleton from '@/components/Skeleton/SidebarSkeleton';
import { Skeleton } from '@/components/ui/skeleton';
import * as Icon from "@phosphor-icons/react/dist/ssr";
import Link from 'next/link';
import ProductLoadError from '@/components/Error/ProductLoadError';
import ZeroProducts from '@/components/Shop/ZeroProducts';

export default function BreadCrumb1() {
    console.log('BreadCrumb1');
    const searchParams = useSearchParams()
    let [type, setType] = useState<string | null | undefined>()
    let datatype = searchParams.get('type')
    let gender = searchParams.get('gender')
    let category = searchParams.get('category')
    let categoryName = searchParams.get('category_name')
    let categorySlug = searchParams.getAll('category_slug')
    let brandNames = searchParams.getAll('brand_name')
    let minPrice = searchParams.get('min_price')
    let maxPrice = searchParams.get('max_price')

    const handleRetry = useCallback(() => {
        window.location.reload();
    }, []);

    // Create search parameters for Qogita API
    const qogitaSearchParams: ProductSearchParams = {}

    if (categoryName) {
        qogitaSearchParams.category_name = categoryName
    }

    if (categorySlug && categorySlug.length > 0) {
        qogitaSearchParams.category_slug = categorySlug
    }

    if (brandNames && brandNames.length > 0) {
        // If there's only one brand, use a string
        // If there are multiple brands, use an array
        qogitaSearchParams.brand_name = brandNames.length === 1 ? brandNames[0] : brandNames
    }

    // Add price range parameters if they exist
    if (minPrice) {
        qogitaSearchParams.min_price = parseInt(minPrice)
    }

    if (maxPrice) {
        qogitaSearchParams.max_price = parseInt(maxPrice)
    }

    // Add page parameter if it exists
    const pageParam = searchParams.get('page')
    if (pageParam) {
        qogitaSearchParams.page = parseInt(pageParam)
    }

    // Always set a consistent page size
    qogitaSearchParams.page_size = 12

    console.log('qogitaSearchParams', qogitaSearchParams);

    // Only fetch products if we have at least one search parameter
    const hasSearchParams = Object.keys(qogitaSearchParams).length > 0
    console.log('hasSearchParams', hasSearchParams);

    // Fetch products from Qogita API
    const {
        data: qogitaProducts,
        isLoading,
        error
    } = useProductSearch(hasSearchParams ? qogitaSearchParams : { category_name: 'default' })

    console.log('qogitaProducts', qogitaProducts);

    useEffect(() => {
        setType(datatype);
    }, [datatype]);

    // For debugging
    useEffect(() => {
        if (qogitaProducts) {
            console.log('Qogita products:', qogitaProducts);
        }
    }, [qogitaProducts]);

    return (
        <>
            <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" />
            <div id="header" className='relative w-full'>
                <MenuOne props="bg-transparent" />
            </div>

            {/* Show loading state with Shadcn UI skeletons */}
            {isLoading && (
                <>
                    {/* Breadcrumb block skeleton */}
                    <div className="breadcrumb-block style-img">
                        <div className="breadcrumb-main bg-linear overflow-hidden">
                            <div className="container lg:pt-[134px] pt-24 pb-10 relative">
                                <div className="main-content w-full h-full flex flex-col items-center justify-center relative z-[1]">
                                    <div className="text-content">
                                        <div className="heading2 text-center">
                                        {categoryName}
                                        </div>
                                        <div className="link flex items-center justify-center gap-1 caption1 mt-3">
                                        <Link href={'/'}>Homepage</Link>
                                            <Icon.CaretRight size={14} className='text-secondary2' />
                                            <div className='text-secondary2 capitalize'>
                                            {categoryName}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Shop product section skeleton */}
                    <div className="shop-product breadcrumb1 lg:py-20 md:py-14 py-10">
                        <div className="container">
                            <div className="flex max-md:flex-wrap max-md:flex-col-reverse gap-y-8">
                                {/* Sidebar skeleton */}
                                <div className="sidebar lg:w-1/4 md:w-1/3 w-full md:pr-12">
                                    <SidebarSkeleton />
                                </div>

                                {/* Main content skeleton */}
                                <div className="main-content lg:w-3/4 md:w-2/3 w-full">
                                    {/* Filter and sort skeleton */}

                                    {/* Product grid skeleton */}
                                    <ProductCardSkeleton count={9} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Show error state */}
            {error && (
                <>
                    {/* Breadcrumb block for error state */}
                    <div className="breadcrumb-block style-img">
                        <div className="breadcrumb-main bg-linear overflow-hidden">
                            <div className="container lg:pt-[134px] pt-24 pb-10 relative">
                                <div className="main-content w-full h-full flex flex-col items-center justify-center relative z-[1]">
                                    <div className="text-content">
                                        <div className="heading2 text-center">
                                            {categoryName || 'Shop'}
                                        </div>
                                        <div className="link flex items-center justify-center gap-1 caption1 mt-3">
                                            <Link href={'/'}>Homepage</Link>
                                            <Icon.CaretRight size={14} className='text-secondary2' />
                                            <div className='text-secondary2 capitalize'>
                                                {categoryName || 'Products'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Error component */}
                    <div className="container py-16">
                        <ProductLoadError
                            onRetry={handleRetry}
                        />
                    </div>
                </>
            )}

{qogitaProducts?.results.length===0 && (
                <>
                    {/* Breadcrumb block for error state */}
                    {/* <div className="breadcrumb-block style-img">
                        <div className="breadcrumb-main bg-linear overflow-hidden">
                            <div className="container lg:pt-[134px] pt-24 pb-10 relative">
                                <div className="main-content w-full h-full flex flex-col items-center justify-center relative z-[1]">
                                    <div className="text-content">
                                        <div className="heading2 text-center">
                                            {categoryName || 'Shop'}
                                        </div>
                                        <div className="link flex items-center justify-center gap-1 caption1 mt-3">
                                            <Link href={'/'}>Homepage</Link>
                                            <Icon.CaretRight size={14} className='text-secondary2' />
                                            <div className='text-secondary2 capitalize'>
                                                {categoryName || 'Products'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* Error component */}
                    <div className="container py-16">
                          <ZeroProducts/>
                    </div>
                </>
            )}

            {/* Show products */}
            {!isLoading && !error && qogitaProducts?.results.length > 0 && (
    <ShopBreadCrumb1
        data={productData}
        productPerPage={9}
        dataType={type}
        gender={gender}
        category={category}
        qogitaProducts={qogitaProducts}
        categoryName={categoryName}
        brandName={brandNames}
        categorySlug={categorySlug}
        searchParams={searchParams}
    />
)}

            <Footer />
        </>
    )
}
