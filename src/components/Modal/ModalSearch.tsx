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
            const response = await searchProductsByTerm(term, { page_size: 8 });
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

        router.push(`/products/search?term=${encodeURIComponent(value)}`)
        closeModalSearch()
        setSearchKeyword('')
    }

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
                            onClick={() => {
                                handleSearch(searchKeyword)
                            }}
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
                    <div className="keyword mt-8">
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
                    </div>
                    {searchKeyword.trim().length >= 2 ? (
                        <div className="search-results mt-8">
                            <div className="heading6 flex items-center justify-between">
                                <span>Search Results {searchResults.length > 0 && `(${searchResults.length})`}</span>
                                {searchResults.length > 0 && (
                                    <Link
                                        href={`/products/search?term=${encodeURIComponent(searchKeyword)}`}
                                        className="text-button-uppercase text-secondary hover:text-black"
                                        onClick={closeModalSearch}
                                    >
                                        View All
                                    </Link>
                                )}
                            </div>
                            {isSearching ? (
                                <SearchShadcnSkeleton />
                            ) : searchResults.length > 0 ? (
                                <div className="list-product pb-5 hide-product-sold grid xl:grid-cols-4 sm:grid-cols-2 gap-7 mt-4">
                                    {searchResults.map((product) => (
                                        <Product
                                            key={product.qid || product.name}
                                            data={{
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
                                            }}
                                            type='grid'
                                            style='style-1'
                                        />
                                    ))}
                                </div>
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
                                    <Product key={product.id} data={product} type='grid' style='style-1' />
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
