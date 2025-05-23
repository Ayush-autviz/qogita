'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import * as Icon from "@phosphor-icons/react/dist/ssr";
import productData from '@/data/Product.json'
import Product from '../Product/Product';
import { useModalSearchContext } from '@/context/ModalSearchContext'
import { searchProductsByTerm, Product as ProductType } from '@/services/productService'
import SearchShadcnSkeleton from '../Skeleton/SearchShadcnSkeleton'
import { Button } from '@/components/ui/button'

const ModalSearch = () => {
    const { isModalOpen, closeModalSearch } = useModalSearchContext();
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchResults, setSearchResults] = useState<ProductType[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [recentlyViewed, setRecentlyViewed] = useState<any[]>(productData.slice(0, 4));
    const router = useRouter();

    // Perform search as user types (with debounce)
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchKeyword.trim().length >= 2) {
                performSearch(searchKeyword);
            } else {
                setSearchResults([]);
                setIsSearching(false);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchKeyword]);

    const performSearch = async (term: string) => {
        if (!term.trim()) return;

        setIsSearching(true);
        try {
            const response = await searchProductsByTerm(term, { page_size: 4 });
            setSearchResults(response.results || []);
        } catch (error) {
            console.error('Error searching products:', error);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    const handleSearch = (value: string) => {
        if (!value.trim()) return;
        router.push(`/search-result?query=${encodeURIComponent(value)}`);
        closeModalSearch();
        setSearchKeyword('');
    };

    const handleSeeMore = () => {
        if (!searchKeyword.trim()) return;
        router.push(`/search-result?query=${encodeURIComponent(searchKeyword)}`);
        closeModalSearch();
    };

    return (
        <>
            <div className={`modal-search-block`} onClick={closeModalSearch}>
                <div
                    className={`modal-search-main md:p-10 p-6 rounded-[32px] ${isModalOpen ? 'open' : ''}`}
                    onClick={(e) => { e.stopPropagation() }}
                >
                    <div className="form-search relative">
                        <Icon.MagnifyingGlass
                            className='absolute heading5 right-6 top-1/2 -translate-y-1/2 cursor-pointer'
                            onClick={() => handleSearch(searchKeyword)}
                        />
                        <input
                            type="text"
                            placeholder='Searching...'
                            className='text-button-lg h-14 rounded-2xl border border-line w-full pl-6 pr-12'
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchKeyword)}
                        />
                    </div>
                    {/* <div className="keyword mt-8">
                        <div className="heading5">Feature keywords Today</div>
                        <div className="list-keyword flex items-center flex-wrap gap-3 mt-4">
                            <div
                                className="item px-4 py-1.5 border border-line rounded-full cursor-pointer duration-300 hover:bg-black hover:text-white"
                                onClick={() => handleSearch('dress')}
                            >
                                Dress
                            </div>
                            <div
                                className="item px-4 py-1.5 border border-line rounded-full cursor-pointer duration-300 hover:bg-black hover:text-white"
                                onClick={() => handleSearch('t-shirt')}
                            >
                                T-shirt
                            </div>
                            <div
                                className="item px-4 py-1.5 border border-line rounded-full cursor-pointer duration-300 hover:bg-black hover:text-white"
                                onClick={() => handleSearch('underwear')}
                            >
                                Underwear
                            </div>
                            <div
                                className="item px-4 py-1.5 border border-line rounded-full cursor-pointer duration-300 hover:bg-black hover:text-white"
                                onClick={() => handleSearch('top')}
                            >
                                Top
                            </div>
                        </div>
                    </div> */}
                    {searchKeyword.trim().length >= 2 ? (
                        <div className="search-results mt-8">
                            {/* <div className="heading6 flex items-center justify-between">
                                <span>Search Results {searchResults.length > 0 && `(${searchResults.length})`}</span>
                            </div> */}

                            {isSearching ? (
                                <SearchShadcnSkeleton />
                            ) : searchResults.length > 0 ? (
                                <>
                                    <div className="list-product pb-5 hide-product-sold grid xl:grid-cols-4 sm:grid-cols-2 gap-7 mt-4">
                                        {searchResults.slice(0, 4).map((product) => (
                                            <div key={product.qid || product.name} className="product-item">
                                                <div
                                                    className="product-card cursor-pointer"
                                                    onClick={() => {
                                                        if (product.gtin) {
                                                            router.push(`/product/default?gtin=${product.gtin}`);
                                                        }
                                                    }}
                                                >
                                                    <div className="product-thumb">
                                                        {product.imageUrl ? (
                                                            <img
                                                                src={product.imageUrl}
                                                                alt={product.name}
                                                                className="w-full h-[200px] object-cover rounded-lg"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center rounded-lg">
                                                                <span className="text-gray-500">No image available</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="product-content p-4">
                                                        <h3 className="product-name text-button-uppercase">{product.name}</h3>
                                                        <div className="product-meta flex items-center justify-between mt-2">
                                                            <div className="product-price">
                                                                {product.price ? (
                                                                    <span className="text-title">${product.price}</span>
                                                                ) : (
                                                                    <span className="text-title">Price not available</span>
                                                                )}
                                                            </div>
                                                            <div className="product-brand caption1">
                                                                {product.brandName}
                                                            </div>
                                                        </div>
                                                        <div className="product-category caption1 text-black mt-1">
                                                            {product.categoryName}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-center">
                                        <Button
                                            onClick={handleSeeMore}
                                            className="button-main bg-black text-white hover:bg-black/90 px-6 py-3 rounded-full flex items-center gap-2"
                                        >
                                            <Icon.MagnifyingGlass size={20} />
                                            See More Results
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <div className="no-results flex flex-col items-center justify-center h-40 text-center">
                                    <Icon.MagnifyingGlass size={32} className="text-secondary mb-2" />
                                    <p className="text-secondary">No products found for "{searchKeyword}"</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="list-recent mt-8">
                            <div className="heading6">Recently viewed products</div>
                            <div className="list-product pb-5 hide-product-sold grid xl:grid-cols-4 sm:grid-cols-2 gap-7 mt-4">
                                {recentlyViewed.map((product) => (
                                    <div key={product.id} className="product-item">
                                        <div
                                            className="product-card cursor-pointer"
                                            onClick={() => {
                                                router.push(`/product/default?slug=${product.slug}`);
                                            }}
                                        >
                                            <div className="product-thumb">
                                                {product.thumbImage && product.thumbImage.length > 0 ? (
                                                    <img
                                                        src={product.thumbImage[0]}
                                                        alt={product.name}
                                                        className="w-full h-[200px] object-cover rounded-lg"
                                                    />
                                                ) : (
                                                    <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center rounded-lg">
                                                        <span className="text-gray-500">No image available</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="product-content p-4">
                                                <h3 className="product-name text-button-uppercase">{product.name}</h3>
                                                <div className="product-meta flex items-center justify-between mt-2">
                                                    <div className="product-price">
                                                        <span className="text-title">${product.price}</span>
                                                    </div>
                                                    <div className="product-brand caption1">
                                                        {product.vendor || product.brand}
                                                    </div>
                                                </div>
                                                <div className="product-category caption1 text-black mt-1">
                                                    {product.category}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default ModalSearch
