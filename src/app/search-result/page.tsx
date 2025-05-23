'use client'
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import MenuOne from '@/components/Header/Menu/MenuOne'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Footer from '@/components/Footer/Footer'
import { ProductType } from '@/type/ProductType'
import Product from '@/components/Product/Product'
import HandlePagination from '@/components/Other/HandlePagination'
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { searchProducts, Product as ApiProduct } from '@/services/productService'
import SearchShadcnSkeleton from '@/components/Skeleton/SearchShadcnSkeleton';
import ZeroProducts from '@/components/Shop/ZeroProducts';

const SearchResult = () => {
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState<ApiProduct[]>([]);
    const [totalResults, setTotalResults] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const productsPerPage = 8;

    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('query') || '';

    // Handle search form submission
    const handleSearch = (value: string) => {
        if (!value.trim()) return;
        router.push(`/search-result?query=${encodeURIComponent(value)}`);
        setSearchKeyword('');
    };

    // Fetch search results when query changes or page changes
    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!query) return;

            setIsLoading(true);
            try {
                const response = await searchProducts({
                    query: query,
                    page: currentPage,
                    page_size: productsPerPage
                });

                setSearchResults(response.results || []);
                setTotalResults(response.count || 0);
                setPageCount(Math.ceil((response.count || 0) / productsPerPage));
            } catch (error) {
                console.error('Error searching products:', error);
                setSearchResults([]);
                setTotalResults(0);
                setPageCount(0);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSearchResults();
    }, [query, currentPage, productsPerPage]);

    // Handle pagination
    const handlePageChange = (selected: number) => {
        setCurrentPage(selected + 1);
    };

    // Convert API products to the format expected by the Product component
    const currentProducts: ProductType[] = searchResults.length > 0
        ? searchResults.map(product => ({
            id: product.qid || '',
            category: product.categoryName || '',
            name: product.name,
            price: product.price ? parseFloat(product.price.toString()) : 0,
            rate: 5,
            new: false,
            sale: false,
            thumbnail: product.imageUrl || '',
            thumbImage: [product.imageUrl || ''],
            totalSell: 0,
            discount: 0,
            priceSale: 0,
            type: 'fashion',
            vendor: product.brandName || '',
            slug: product.slug || '',
            gtin: product.gtin || '',
            quantity: 100,
            sold: 0,
            variation: [],
            originPrice: product.price ? parseFloat(product.price.toString()) : 0,
            action: 'add to cart',
            gender: '',
            quantityPurchase: 0,
            sizes: [],
            images: [],
            description: ''
        }))
        : [];

    return (
        <>
            <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" />
            <div id="header" className='relative w-full'>
                <MenuOne props="bg-transparent" />
                <Breadcrumb heading='Search Result' subHeading='Search Result' />
            </div>
            <div className="shop-product breadcrumb1 lg:py-20 md:py-14 py-10">
                <div className="container">
                    <div className="heading flex flex-col items-center">
                        <div className="heading4 text-center">
                            Found {totalResults} results for {String.raw`"`}{query}{String.raw`"`}
                        </div>
                        <div className="input-block lg:w-1/2 sm:w-3/5 w-full md:h-[52px] h-[44px] sm:mt-8 mt-5">
                            <div className='w-full h-full relative'>
                                <input
                                    type="text"
                                    placeholder='Search...'
                                    className='caption1 w-full h-full pl-4 md:pr-[150px] pr-32 rounded-xl border border-line'
                                    value={searchKeyword}
                                    onChange={(e) => setSearchKeyword(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchKeyword)}
                                />
                                <button
                                    className='button-main absolute top-1 bottom-1 right-1 flex items-center justify-center'
                                    onClick={() => handleSearch(searchKeyword)}
                                >
                                    search
                                </button>
                            </div>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="mt-5">
                            <SearchShadcnSkeleton />
                        </div>
                    ) : searchResults.length > 0 ? (
                        <>
                            <div className="list-product hide-product-sold grid lg:grid-cols-3 grid-cols-2 sm:gap-[30px] gap-[20px] mt-7">
                                {currentProducts.map((item) => (
                                    <div key={item.id} className="product-item">
                                        <div
                                            className="product-card cursor-pointer"
                                            onClick={() => {
                                                if (item.gtin) {
                                                    router.push(`/product/default?gtin=${item.gtin}`);
                                                }
                                            }}
                                        >
                                            <div className="product-thumb bg-white relative overflow-hidden rounded-2xl">
                                                {item.thumbnail ? (
                                                    <img
                                                        src={item.thumbnail}
                                                        alt={item.name}
                                                        className="w-full h-[300px] object-cover rounded-lg"
                                                    />
                                                ) : (
                                                    <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center rounded-lg">
                                                        <span className="text-gray-500">No image available</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="product-infor p-4">
                                                <h3 className="product-name text-button-uppercase">{item.name}</h3>
                                                <div className="product-meta flex items-center justify-between mt-2">
                                                    <div className="product-price">
                                                        {item.price ? (
                                                            <span className="text-title">${item.price}</span>
                                                        ) : (
                                                            <span className="text-title">Price not available</span>
                                                        )}
                                                    </div>
                                                    <div className="product-brand caption1">
                                                        {item.vendor}
                                                    </div>
                                                </div>
                                                <div className="product-category caption1 text-black mt-1">
                                                    {item.category}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {pageCount > 1 && (
                                <div className="list-pagination flex items-center justify-center md:mt-10 mt-7">
                                    <div className="flex gap-2 items-center">
                                        {currentPage > 1 && (
                                            <button
                                                className="pagination-button px-4 py-2 bg-black text-white hover:bg-gray-800 rounded-lg"
                                                onClick={() => handlePageChange(currentPage - 2)}
                                            >
                                                Previous
                                            </button>
                                        )}
                                        <div className="px-4 py-2">
                                            Page {currentPage}
                                        </div>
                                        {currentPage < pageCount && (
                                            <button
                                                className="pagination-button px-4 py-2 bg-black text-white hover:bg-gray-800 rounded-lg"
                                                onClick={() => handlePageChange(currentPage)}
                                            >
                                                Next
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="mt-7">
                            <ZeroProducts
                                title="No Products Found"
                                message="We couldn't find any products matching your search criteria."
                                searchTerm={query}
                                onClearFilters={() => {
                                    router.push('/shop/breadcrumb1');
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default SearchResult