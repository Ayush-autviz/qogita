'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation';
import Link from 'next/link'
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import MenuOne from '@/components/Header/Menu/MenuOne'
import BreadcrumbProduct from '@/components/Breadcrumb/BreadcrumbProduct'
import Default from '@/components/Product/Detail/Default';
import Footer from '@/components/Footer/Footer'
import { ProductType } from '@/type/ProductType'
import productData from '@/data/Product.json'
import { getProductByGtin } from '@/services/productService'
import ProductDetailShadcnSkeleton from '@/components/Skeleton/ProductDetailShadcnSkeleton'
import ProductDetailError from '@/components/Error/ProductDetailError'

const ProductDefault = () => {
    const searchParams = useSearchParams()
    const [loading, setLoading] = useState<boolean>(false)
    const [product, setProduct] = useState<any | null>(null)
    const [error, setError] = useState<string | null>(null)


    console.log(product,'product')

    const handleRetry = useCallback(() => {
        window.location.reload();
    }, []);

    // Get product ID or GTIN from URL
    let productId = searchParams.get('id')
    const gtin = searchParams.get('gtin')

    useEffect(() => {
        const fetchProduct = async () => {
            // If GTIN is provided, fetch product from API
            if (gtin) {
                setLoading(true)
                try {
                    const productData = await getProductByGtin(gtin)
                    setProduct(productData)
                    setError(null)
                } catch (err) {
                    console.error('Error fetching product:', err)
                    setError('Failed to fetch product details. Please try again.')
                } finally {
                    setLoading(false)
                }
            }
        }

        fetchProduct()
    }, [gtin])

    // If no ID is provided, use default product
    if (productId === null && !gtin) {
        productId = '1'
    }

    if (loading) {
        return (
            <>
                <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" />
                <div id="header" className='relative w-full mb-20'>
                    <MenuOne props="bg-white" />
                </div>
                <>
                    <div className="container py-4">
                        <div className="bg-blue-50 p-4 mb-6 rounded-lg border border-blue-200 text-blue-700 text-center">
                            Loading product details... Please wait.
                        </div>
                    </div>
                    <ProductDetailShadcnSkeleton />
                </>
                <Footer />
            </>
        )
    }

    if (error) {
        return (
            <>
                <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" />
                <div id="header" className='relative w-full mb-20'>
                    <MenuOne props="bg-white" />
                </div>
                <div className="container py-10">
                    <ProductDetailError
                        error={error}
                        onRetry={handleRetry}
                    />
                </div>
                <Footer />
            </>
        )
    }

    // If product is fetched from API, convert it to the format expected by Default component
    if (product) {
        // Create a product object that matches the ProductType interface
        const formattedProduct: ProductType = {
            id: product.gtin,
            name: product.name,
            slug: product.slug,
            category: product.category?.name || 'Unknown',
            type: product.category?.name || 'Unknown',
            gender: 'unisex',
            new: false,
            sale: false,
            rate: product.rating || 5,
            price: parseFloat(product.price) || 0,
            originPrice: parseFloat(product.price) * 1.2 || 0, // Assuming 20% markup for original price
            vendor: product.brand?.name || 'Unknown',
            sold: 0,
            quantity: product.inventory || 100,
            quantityPurchase: 1,
            action: 'add to cart',
            sizes: ['S', 'M', 'L', 'XL'], // Default sizes
            variation: [
                {
                    color: 'default',
                    colorCode: '#000000',
                    image: product.images && product.images.length > 0 ? product.images[0].url : '',
                    colorImage: product.images && product.images.length > 0 ? product.images[0].url : '',
                }
            ],
            thumbImage: product.images ? product.images.map((img: any) => img.url) : [],
            images: product.images ? product.images.map((img: any) => img.url) : [],
            description: `${product.name} - ${product.brand?.name || 'Unknown'} - ${product.category?.name || 'Unknown'}`,
            gtin: product.gtin,
            inventory: product.inventory,
            isInStock: product.isInStock,
            delay: product.delay,
            priceCurrency: product.priceCurrency,
            origin: product.origin,
            shippingFromCountries: product.shippingFromCountries,
            totalSell: 0,
            discount: 0,
            priceSale: 0,
            dimensions: product.dimensions,
        }

        // Create an array with the formatted product
        const formattedData = [formattedProduct]

        return (
            <>
                {/* <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" /> */}
                <div id="header" className='relative w-full mb-20'>
                    <MenuOne props="bg-white" />
                    {/* <BreadcrumbProduct data={formattedData} productPage='default' productId={formattedProduct.id} /> */}
                </div>
                <Default data={formattedData} productId={formattedProduct.id} />
                <Footer />
            </>
        )
    }

    // If no API product, use default product data
    return (
        <>
            {/* <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" /> */}
            <div id="header" className='relative w-full'>
                <MenuOne props="bg-white" />
                {/* <BreadcrumbProduct data={productData} productPage='default' productId={productId} /> */}
            </div>
            <Default data={productData} productId={productId} />
            <Footer />
        </>
    )
}

export default ProductDefault