'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { ProductType } from '@/type/ProductType'
import Product from '../Product/Product';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'
import '@/styles/price-slider.css'
import HandlePagination from '../Other/HandlePagination';
import ZeroProducts from './ZeroProducts';

import { ProductSearchResponse } from '@/services/productService';

interface Props {
    data: Array<ProductType>
    productPerPage: number
    dataType: string | null | undefined
    gender: string | null
    category: string | null
    qogitaProducts?: ProductSearchResponse
    categoryName?: string | null
    brandName?: string | string[] | null
    categorySlug?: string[]
    searchParams?: URLSearchParams | ReadonlyURLSearchParams
}

const ShopBreadCrumb1: React.FC<Props> = ({
    data,
    productPerPage,
    dataType,
    gender,
    category,
    qogitaProducts,
    categoryName,
    brandName,
    categorySlug
}) => {
    // showOnlySale state removed
    const [sortOption, setSortOption] = useState('');
    const [type, setType] = useState<string | null | undefined>(dataType)
    const [size, setSize] = useState<string | null>()
    const [color, setColor] = useState<string | null>()
    const [brand, setBrand] = useState<string | null>()
    const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 1000 });
    const [currentPage, setCurrentPage] = useState(0);
    const productsPerPage = productPerPage;
    const offset = currentPage * productsPerPage;

    console.log(brandName,'brand name');

    // handleShowOnlySale function removed

    const handleSortChange = (option: string) => {
        setSortOption(option);
        setCurrentPage(0);
    };

    const handleType = (type: string | null) => {
        setType((prevType) => (prevType === type ? null : type))
        setCurrentPage(0);
    }

    // These handlers are used in commented-out code sections
    // Keeping them for future reference if those sections are uncommented

    // Price range is now handled directly in the slider component

    // Brand selection is now handled directly in the checkbox onChange event

    // Initialize price range from URL parameters
    useEffect(() => {
        try {
            const url = new URL(window.location.href);
            const params = new URLSearchParams(url.search);
            const minPriceParam = params.get('min_price');
            const maxPriceParam = params.get('max_price');

            if (minPriceParam && maxPriceParam) {
                const minPrice = parseInt(minPriceParam);
                const maxPrice = parseInt(maxPriceParam);

                if (!isNaN(minPrice) && !isNaN(maxPrice)) {
                    console.log('Setting price range from URL:', { min: minPrice, max: maxPrice });
                    setPriceRange({ min: minPrice, max: maxPrice });
                }
            }
        } catch (error) {
            console.error('Error initializing price range:', error);
        }
    }, []);

    // Filter product
    let filteredData = data.filter(product => {
        // "Show only products on sale" filter removed

        let isDatagenderMatched = true;
        if (gender) {
            isDatagenderMatched = product.gender === gender
        }

        let isDataCategoryMatched = true;
        if (category) {
            isDataCategoryMatched = product.category === category
        }

        let isDataTypeMatched = true;
        if (dataType) {
            isDataTypeMatched = product.type === dataType
        }

        let isTypeMatched = true;
        if (type) {
            dataType = type
            isTypeMatched = product.type === type;
        }

        let isSizeMatched = true;
        if (size) {
            isSizeMatched = product.sizes.includes(size)
        }

        let isPriceRangeMatched = true;
        if (priceRange.min !== 0 || priceRange.max !== 1000) {
            isPriceRangeMatched = product.price >= priceRange.min && product.price <= priceRange.max;
        }

        let isColorMatched = true;
        if (color) {
            isColorMatched = product.variation.some(item => item.color === color)
        }

        let isBrandMatched = true;
        if (brand) {
            isBrandMatched = product.brand === brand;
        }

        return isDatagenderMatched && isDataCategoryMatched && isDataTypeMatched && isTypeMatched && isSizeMatched && isColorMatched && isBrandMatched && isPriceRangeMatched
    })


    // Create a copy array filtered to sort
    let sortedData = [...filteredData];

    if (sortOption === 'soldQuantityHighToLow') {
        filteredData = sortedData.sort((a, b) => b.sold - a.sold)
    }

    if (sortOption === 'discountHighToLow') {
        filteredData = sortedData
            .sort((a, b) => (
                (Math.floor(100 - ((b.price / b.originPrice) * 100))) - (Math.floor(100 - ((a.price / a.originPrice) * 100)))
            ))
    }

    if (sortOption === 'priceHighToLow') {
        filteredData = sortedData.sort((a, b) => b.price - a.price)
    }

    if (sortOption === 'priceLowToHigh') {
        filteredData = sortedData.sort((a, b) => a.price - b.price)
    }

    const totalProducts = filteredData.length
    const selectedType = type
    const selectedSize = size
    const selectedColor = color
    const selectedBrand = brand


    if (filteredData.length === 0) {
        filteredData = [{
            id: 'no-data',
            category: 'no-data',
            type: 'no-data',
            name: 'no-data',
            gender: 'no-data',
            new: false,
            sale: false,
            rate: 0,
            price: 0,
            originPrice: 0,
            brand: 'no-data',
            sold: 0,
            quantity: 0,
            quantityPurchase: 0,
            sizes: [],
            variation: [],
            thumbImage: [],
            images: [],
            description: 'no-data',
            action: 'no-data',
            slug: 'no-data'
        }];
    }


    // Find page number base on filteredData
    const pageCount = Math.ceil(filteredData.length / productsPerPage);

    // If page number 0, set current page = 0
    if (pageCount === 0) {
        setCurrentPage(0);
    }

    // Get product data for current page
    let currentProducts: ProductType[];

    if (filteredData.length > 0) {
        currentProducts = filteredData.slice(offset, offset + productsPerPage);
    } else {
        currentProducts = []
    }

    const handlePageChange = (selected: number) => {
        setCurrentPage(selected);
    };

    const handleClearAll = () => {
        dataType = null
        setSortOption('');
        setType(null);
        setSize(null);
        setColor(null);
        setBrand(null);
        setPriceRange({ min: 0, max: 1000 });
        setCurrentPage(0);
        handleType(null)
    };

    return (
        <>
            <div className="breadcrumb-block style-img">
                <div className="breadcrumb-main bg-linear overflow-hidden">
                    <div className="container lg:pt-[134px] pt-24 pb-10 relative">
                        <div className="main-content w-full h-full flex flex-col items-center justify-center relative z-[1]">
                            <div className="text-content">
                                <div className="heading2 text-center">
                                    {categoryName || brandName || (dataType === null ? 'Shop' : dataType)}
                                </div>
                                <div className="link flex items-center justify-center gap-1 caption1 mt-3">
                                    <Link href={'/'}>Homepage</Link>
                                    <Icon.CaretRight size={14} className='text-secondary2' />
                                    <div className='text-secondary2 capitalize'>
                                        {categoryName || brandName || (dataType === null ? 'Shop' : dataType)}
                                    </div>
                                </div>
                            </div>
                            {/* <div className="list-tab flex flex-wrap items-center justify-center gap-y-5 gap-8 lg:mt-[70px] mt-12 overflow-hidden">
                                {['t-shirt', 'dress', 'top', 'swimwear', 'shirt'].map((item, index) => (
                                    <div
                                        key={index}
                                        className={`tab-item text-button-uppercase cursor-pointer has-line-before line-2px ${dataType === item ? 'active' : ''}`}
                                        onClick={() => handleType(item)}
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="shop-product breadcrumb1 lg:py-20 md:py-14 py-10">
                <div className="container">
                    <div className="flex max-md:flex-wrap max-md:flex-col-reverse gap-y-8">
                        <div className="sidebar lg:w-1/4 md:w-1/3 w-full md:pr-12">
                            <div className="filter-type pb-8 border-b border-line">
                                <div className="heading6">Categories</div>
                                <div className="list-type mt-4">
                                    {/* Show Qogita categories if available */}
                                    {qogitaProducts && qogitaProducts.facets && qogitaProducts.facets.category &&
                                     qogitaProducts.facets.category.subCategories ? (
                                        // Flatten the category hierarchy to show all subcategories
                                        qogitaProducts.facets.category.subCategories
                                            .flatMap(cat => [
                                                // Include the main category
                                                {
                                                    name: cat.name,
                                                    count: cat.count,
                                                    slug: cat.slug
                                                },
                                                // Include subcategories if they exist
                                                ...(cat.subCategories || []).map(subCat => ({
                                                    name: subCat.name,
                                                    count: subCat.count,
                                                    slug: subCat.slug,
                                                    isSubCategory: true
                                                }))
                                            ])
                                            .slice(0, 15) // Limit to 15 categories
                                            .map((cat, index) => (
                                                <div
                                                    key={index}
                                                    className={`item flex items-center justify-between cursor-pointer ${categoryName === cat.name ? 'active' : ''}`}
                                                    onClick={() => {
                                                        // Always navigate using category_name
                                                        window.location.href = `?category_name=${encodeURIComponent(cat.name)}`;
                                                    }}
                                                >
                                                    <div className={`text-black has-line-before hover:text-black capitalize ${('isSubCategory' in cat && cat.isSubCategory) ? 'pl-4' : ''}`}>
                                                        {cat.name}
                                                    </div>
                                                    <div className='text-secondary2'>
                                                        ({cat.count})
                                                    </div>
                                                </div>
                                            ))
                                    ) : (
                                        // Fallback to default product types
                                        ['t-shirt', 'dress', 'top', 'swimwear', 'shirt', 'underwear', 'sets', 'accessories'].map((item, index) => (
                                            <div
                                                key={index}
                                                className={`item flex items-center justify-between cursor-pointer ${dataType === item ? 'active' : ''}`}
                                                onClick={() => handleType(item)}
                                            >
                                                <div className='text-secondary has-line-before hover:text-black capitalize'>{item}</div>
                                                <div className='text-secondary2'>
                                                    ({data.filter(dataItem => dataItem.type === item && dataItem.category === 'fashion').length})
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                            {/* <div className="filter-size pb-8 border-b border-line mt-8">
                                <div className="heading6">Size</div>
                                <div className="list-size flex items-center flex-wrap gap-3 gap-y-4 mt-4">
                                    {
                                        ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'].map((item, index) => (
                                            <div
                                                key={index}
                                                className={`size-item text-button w-[44px] h-[44px] flex items-center justify-center rounded-full border border-line ${size === item ? 'active' : ''}`}
                                                onClick={() => handleSize(item)}
                                            >
                                                {item}
                                            </div>
                                        ))
                                    }
                                    <div
                                        className={`size-item text-button px-4 py-2 flex items-center justify-center rounded-full border border-line ${size === 'freesize' ? 'active' : ''}`}
                                        onClick={() => handleSize('freesize')}
                                    >
                                        Freesize
                                    </div>
                                </div>
                            </div> */}
                            <div className="filter-price pb-8 border-b border-line mt-8">
                                <div className="heading6 flex items-center justify-between">
                                    <span>Price Range</span>
                                    {(() => {
                                        const url = new URL(window.location.href);
                                        const params = new URLSearchParams(url.search);
                                        const minPriceParam = params.get('min_price');
                                        const maxPriceParam = params.get('max_price');

                                        if (minPriceParam || maxPriceParam) {
                                            return (
                                                <span className="text-xs px-2 py-1 bg-black text-white rounded-full">
                                                    Active
                                                </span>
                                            );
                                        }
                                        return null;
                                    })()}
                                </div>
                                {/* This is just a placeholder - initialization is now handled in useEffect */}

                                <div className="mt-5 px-1">
                                    <Slider
                                        range
                                        value={[priceRange.min, priceRange.max]}
                                        min={0}
                                        max={1000}
                                        step={10}
                                        onChange={(values) => {
                                            if (Array.isArray(values)) {
                                                // Only update local state, don't refresh page
                                                setPriceRange({ min: values[0], max: values[1] });
                                            }
                                        }}
                                        className="custom-price-slider"
                                    />
                                </div>
                                <div className="price-block flex items-center justify-between flex-wrap mt-4">
                                    <div className="min flex items-center gap-1">
                                        <div>Min price:</div>
                                        <div className='price-min font-semibold'>$
                                            <span>{priceRange.min}</span>
                                        </div>
                                    </div>
                                    <div className="min flex items-center gap-1">
                                        <div>Max price:</div>
                                        <div className='price-max font-semibold'>$
                                            <span>{priceRange.max}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between mt-4">
                                    <button
                                        className="px-3 py-2 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                                        onClick={() => {
                                            // Get current URL parameters
                                            const url = new URL(window.location.href);
                                            const params = new URLSearchParams(url.search);

                                            // Remove price parameters
                                            params.delete('min_price');
                                            params.delete('max_price');

                                            // Reset local state
                                            setPriceRange({ min: 0, max: 1000 });

                                            // Navigate to the new URL
                                            window.location.href = `?${params.toString()}`;
                                        }}
                                    >
                                        Reset
                                    </button>
                                    <button
                                        className={`px-4 py-2 text-sm rounded-md transition-colors ${
                                            (() => {
                                                // Check if current price range is different from URL parameters
                                                const url = new URL(window.location.href);
                                                const params = new URLSearchParams(url.search);
                                                const minPriceParam = params.get('min_price');
                                                const maxPriceParam = params.get('max_price');

                                                const urlMinPrice = minPriceParam ? parseInt(minPriceParam) : 0;
                                                const urlMaxPrice = maxPriceParam ? parseInt(maxPriceParam) : 1000;

                                                const hasChanged = priceRange.min !== urlMinPrice || priceRange.max !== urlMaxPrice;

                                                return hasChanged
                                                    ? 'bg-black text-white hover:bg-gray-800'
                                                    : 'bg-gray-400 text-white cursor-not-allowed';
                                            })()
                                        }`}
                                        onClick={() => {
                                            // Check if current price range is different from URL parameters
                                            const url = new URL(window.location.href);
                                            const params = new URLSearchParams(url.search);
                                            const minPriceParam = params.get('min_price');
                                            const maxPriceParam = params.get('max_price');

                                            const urlMinPrice = minPriceParam ? parseInt(minPriceParam) : 0;
                                            const urlMaxPrice = maxPriceParam ? parseInt(maxPriceParam) : 1000;

                                            const hasChanged = priceRange.min !== urlMinPrice || priceRange.max !== urlMaxPrice;

                                            // Only update if values have changed
                                            if (hasChanged) {
                                                // Update price parameters with local state values
                                                params.set('min_price', priceRange.min.toString());
                                                params.set('max_price', priceRange.max.toString());

                                                // Navigate to the new URL
                                                window.location.href = `?${params.toString()}`;
                                            }
                                        }}
                                    >
                                        Apply Filter
                                    </button>
                                </div>
                            </div>
                            {/* <div className="filter-color pb-8 border-b border-line mt-8">
                                <div className="heading6">colors</div>
                                <div className="list-color flex items-center flex-wrap gap-3 gap-y-4 mt-4">
                                    <div
                                        className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line ${color === 'pink' ? 'active' : ''}`}
                                        onClick={() => handleColor('pink')}
                                    >
                                        <div className="color bg-[#F4C5BF] w-5 h-5 rounded-full"></div>
                                        <div className="caption1 capitalize">pink</div>
                                    </div>
                                    <div
                                        className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line ${color === 'red' ? 'active' : ''}`}
                                        onClick={() => handleColor('red')}
                                    >
                                        <div className="color bg-red w-5 h-5 rounded-full"></div>
                                        <div className="caption1 capitalize">red</div>
                                    </div>
                                    <div
                                        className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line ${color === 'green' ? 'active' : ''}`}
                                        onClick={() => handleColor('green')}
                                    >
                                        <div className="color bg-green w-5 h-5 rounded-full"></div>
                                        <div className="caption1 capitalize">green</div>
                                    </div>
                                    <div
                                        className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line ${color === 'yellow' ? 'active' : ''}`}
                                        onClick={() => handleColor('yellow')}
                                    >
                                        <div className="color bg-yellow w-5 h-5 rounded-full"></div>
                                        <div className="caption1 capitalize">yellow</div>
                                    </div>
                                    <div
                                        className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line ${color === 'purple' ? 'active' : ''}`}
                                        onClick={() => handleColor('purple')}
                                    >
                                        <div className="color bg-purple w-5 h-5 rounded-full"></div>
                                        <div className="caption1 capitalize">purple</div>
                                    </div>
                                    <div
                                        className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line ${color === 'black' ? 'active' : ''}`}
                                        onClick={() => handleColor('black')}
                                    >
                                        <div className="color bg-black w-5 h-5 rounded-full"></div>
                                        <div className="caption1 capitalize">black</div>
                                    </div>
                                    <div
                                        className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line ${color === 'white' ? 'active' : ''}`}
                                        onClick={() => handleColor('white')}
                                    >
                                        <div className="color bg-[#F6EFDD] w-5 h-5 rounded-full"></div>
                                        <div className="caption1 capitalize">white</div>
                                    </div>
                                </div>
                            </div> */}
                            <div className="filter-brand mt-8">
                                <div className="heading6">Brands</div>
                                <div className="list-brand mt-4">
                                    {/* Show Qogita brands if available */}
                                    {qogitaProducts && qogitaProducts.facets && qogitaProducts.facets.brand ? (
                                        Object.entries(qogitaProducts.facets.brand)
                                            .slice(0, 10) // Show only first 10 brands
                                            .map(([brandName, count], index) => (
                                                <div key={index} className="brand-item flex items-center justify-between">
                                                    <div className="left flex items-center cursor-pointer">
                                                        <div className="block-input">
                                                            <input
                                                                type="checkbox"
                                                                name={brandName}
                                                                id={`brand-${index}`}
                                                                checked={
                                                                    // Check if this brand is selected in the URL parameters
                                                                    (() => {
                                                                        const url = new URL(window.location.href);
                                                                        const params = new URLSearchParams(url.search);
                                                                        const selectedBrands = params.getAll('brand_name');
                                                                        return selectedBrands.includes(brandName);
                                                                    })()
                                                                }
                                                                onChange={() => {
                                                                    // Get current URL parameters
                                                                    const url = new URL(window.location.href);
                                                                    const params = new URLSearchParams(url.search);

                                                                    // Get all currently selected brands
                                                                    const selectedBrands = params.getAll('brand_name');

                                                                    // Check if this brand is already selected
                                                                    const isBrandSelected = selectedBrands.includes(brandName);

                                                                    // Remove all brand_name parameters
                                                                    params.delete('brand_name');

                                                                    if (isBrandSelected) {
                                                                        // If already selected, remove it from the list
                                                                        selectedBrands.forEach(b => {
                                                                            if (b !== brandName) {
                                                                                params.append('brand_name', b);
                                                                            }
                                                                        });
                                                                    } else {
                                                                        // If not selected, add it to the list
                                                                        selectedBrands.forEach(b => {
                                                                            params.append('brand_name', b);
                                                                        });
                                                                        params.append('brand_name', brandName);
                                                                    }

                                                                    // Preserve category_name if present
                                                                    if (categoryName) {
                                                                        params.set('category_name', categoryName);
                                                                    }

                                                                    // Navigate to the new URL
                                                                    window.location.href = `?${params.toString()}`;
                                                                }}
                                                            />
                                                            <Icon.CheckSquare size={20} weight='fill' className='icon-checkbox' />
                                                        </div>
                                                        <label htmlFor={`brand-${index}`} className="brand-name capitalize pl-2 cursor-pointer">{brandName}</label>
                                                    </div>
                                                    <div className='text-secondary2'>
                                                        ({count})
                                                    </div>
                                                </div>
                                            ))
                                    ) : (
                                        // Fallback to default brands
                                        ['adidas', 'hermes', 'zara', 'nike', 'gucci'].map((item, index) => (
                                            <div key={index} className="brand-item flex items-center justify-between">
                                                <div className="left flex items-center cursor-pointer">
                                                    <div className="block-input">
                                                        <input
                                                            type="checkbox"
                                                            name={item}
                                                            id={item}
                                                            checked={
                                                                // Check if this brand is selected in the URL parameters
                                                                (() => {
                                                                    const url = new URL(window.location.href);
                                                                    const params = new URLSearchParams(url.search);
                                                                    const selectedBrands = params.getAll('brand_name');
                                                                    return selectedBrands.includes(item);
                                                                })()
                                                            }
                                                            onChange={() => {
                                                                // Get current URL parameters
                                                                const url = new URL(window.location.href);
                                                                const params = new URLSearchParams(url.search);

                                                                // Get all currently selected brands
                                                                const selectedBrands = params.getAll('brand_name');

                                                                // Check if this brand is already selected
                                                                const isBrandSelected = selectedBrands.includes(item);

                                                                // Remove all brand_name parameters
                                                                params.delete('brand_name');

                                                                if (isBrandSelected) {
                                                                    // If already selected, remove it from the list
                                                                    selectedBrands.forEach(b => {
                                                                        if (b !== item) {
                                                                            params.append('brand_name', b);
                                                                        }
                                                                    });
                                                                } else {
                                                                    // If not selected, add it to the list
                                                                    selectedBrands.forEach(b => {
                                                                        params.append('brand_name', b);
                                                                    });
                                                                    params.append('brand_name', item);
                                                                }

                                                                // Navigate to the new URL
                                                                window.location.href = `?${params.toString()}`;
                                                            }}
                                                        />
                                                        <Icon.CheckSquare size={20} weight='fill' className='icon-checkbox' />
                                                    </div>
                                                    <label htmlFor={item} className="brand-name capitalize pl-2 cursor-pointer">{item}</label>
                                                </div>
                                                <div className='text-secondary2'>
                                                    ({data.filter(dataItem => dataItem.brand === item && dataItem.category === 'fashion').length})
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="list-product-block lg:w-3/4 md:w-2/3 w-full md:pl-3">


                            <div className="list-filtered flex items-center gap-3 ">
                                <div className="total-product font-semibold">
                                    {qogitaProducts ? qogitaProducts.count : totalProducts}
                                    <span className='text-black pl-1 font-normal'>Products Found</span>
                                </div>
                                {
                                    (selectedType || selectedSize || selectedColor || selectedBrand) && (
                                        <>
                                            <div className="list flex items-center gap-3">
                                                <div className='w-px h-4 bg-line'></div>
                                                {selectedType && (
                                                    <div className="item flex items-center px-2 py-1 gap-1 bg-linear rounded-full capitalize" onClick={() => { setType(null) }}>
                                                        <Icon.X className='cursor-pointer' />
                                                        <span>{selectedType}</span>
                                                    </div>
                                                )}
                                                {selectedSize && (
                                                    <div className="item flex items-center px-2 py-1 gap-1 bg-linear rounded-full capitalize" onClick={() => { setSize(null) }}>
                                                        <Icon.X className='cursor-pointer' />
                                                        <span>{selectedSize}</span>
                                                    </div>
                                                )}
                                                {selectedColor && (
                                                    <div className="item flex items-center px-2 py-1 gap-1 bg-linear rounded-full capitalize" onClick={() => { setColor(null) }}>
                                                        <Icon.X className='cursor-pointer' />
                                                        <span>{selectedColor}</span>
                                                    </div>
                                                )}
                                                {selectedBrand && (
                                                    <div className="item flex items-center px-2 py-1 gap-1 bg-linear rounded-full capitalize" onClick={() => { setBrand(null) }}>
                                                        <Icon.X className='cursor-pointer' />
                                                        <span>{selectedBrand}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div
                                                className="clear-btn flex items-center px-2 py-1 gap-1 rounded-full border border-red cursor-pointer"
                                                onClick={handleClearAll}
                                            >
                                                <Icon.X color='rgb(219, 68, 68)' className='cursor-pointer' />
                                                <span className='text-button-uppercase text-red'>Clear All</span>
                                            </div>
                                        </>
                                    )
                                }
                            </div>

                            {/* Display Qogita products if available */}
                            {qogitaProducts && qogitaProducts.results ? (
                                qogitaProducts.results.length > 0 ? (
                                    <div className="list-product grid lg:grid-cols-3 grid-cols-2 sm:gap-[30px] gap-[20px] mt-7">
                                        {qogitaProducts.results.map((item, index) => (
                                            <div key={item.qid || index} className="product-item">
                                                <div
                                                    className="product-card cursor-pointer"
                                                    onClick={() => {
                                                        // Navigate to product detail page using GTIN if available
                                                        if (item.gtin) {
                                                            window.location.href = `/product/default?gtin=${item.gtin}`;
                                                        }
                                                    }}
                                                >
                                                    <div className="product-thumb">
                                                        {item.imageUrl ? (
                                                            <img
                                                                src={item.imageUrl}
                                                                alt={item.name}
                                                                className="w-full h-[300px] object-cover rounded-lg"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center rounded-lg">
                                                                <span className="text-gray-500">No image available</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="product-info mt-3">
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
                                                                {item.brandName}
                                                            </div>
                                                        </div>
                                                        <div className="product-category caption1 text-black mt-1">
                                                            {item.categoryName}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    // Zero products state for Qogita products
                                    <ZeroProducts
                                       // searchTerm={searchParams?.get('search') || undefined}
                                        filters={{
                                            category: categoryName || undefined,
                                            brand: brandName || undefined,
                                            // priceRange: {
                                            //     min: parseInt(searchParams?.get('min_price') || '0'),
                                            //     max: parseInt(searchParams?.get('max_price') || '1000')
                                            // }
                                        }}
                                        onClearFilters={useCallback(() => {
                                            // Clear all filters and redirect to shop page
                                            window.location.href = '/shop/breadcrumb1';
                                        }, [])}
                                    />
                                )
                            ) : (
                                currentProducts.length > 0 ? (
                                    <div className="list-product hide-product-sold grid lg:grid-cols-3 grid-cols-2 sm:gap-[30px] gap-[20px] mt-7">
                                        {currentProducts.map((item) => (
                                            <Product key={item.id} data={item} type='grid' style='one' />
                                        ))}
                                    </div>
                                ) : (
                                    // Zero products state for regular products
                                    <ZeroProducts
                                        filters={{
                                            category: dataType || undefined,
                                            brand: selectedBrand || undefined,
                                            priceRange: priceRange
                                        }}
                                        onClearFilters={useCallback(() => handleClearAll(), [])}
                                    />
                                )
                            )}

                            {/* Pagination for regular products */}
                            {!qogitaProducts && pageCount > 1 && (
                                <div className="list-pagination flex items-center md:mt-10 mt-7">
                                    <HandlePagination pageCount={pageCount} onPageChange={handlePageChange} />
                                </div>
                            )}

                            {/* Pagination for Qogita products */}
                            {qogitaProducts && (qogitaProducts.next || qogitaProducts.previous) && (
                                <div className="list-pagination flex items-center justify-center md:mt-10 mt-7">
                                    <div className="flex gap-2 items-center">
                                        {qogitaProducts.previous && (
                                            <button
                                                className="pagination-button px-4 py-2 bg-black text-white hover:bg-gray-800 rounded-lg"
                                                onClick={() => {
                                                    // Extract page number from previous URL
                                                    if (qogitaProducts.previous) {
                                                        try {
                                                            const url = new URL(qogitaProducts.previous);
                                                            const page = url.searchParams.get('page');

                                                            if (page) {
                                                                // Get current URL parameters to preserve them
                                                                const currentUrl = new URL(window.location.href);
                                                                const currentParams = new URLSearchParams(currentUrl.search);

                                                                // Update the page parameter
                                                                currentParams.set('page', page);

                                                                // Navigate to the new URL with all parameters preserved
                                                                window.location.href = `?${currentParams.toString()}`;
                                                            }
                                                        } catch (error) {
                                                            console.error('Error navigating to previous page:', error);

                                                            // Fallback method if URL parsing fails
                                                            const currentPage = parseInt(new URLSearchParams(window.location.search).get('page') || '2');
                                                            const prevPage = Math.max(currentPage - 1, 1); // Ensure we don't go below page 1

                                                            // Get current URL parameters
                                                            const currentUrl = new URL(window.location.href);
                                                            const currentParams = new URLSearchParams(currentUrl.search);

                                                            // Update the page parameter
                                                            currentParams.set('page', prevPage.toString());

                                                            // Navigate to the new URL
                                                            window.location.href = `?${currentParams.toString()}`;
                                                        }
                                                    }
                                                }}
                                            >
                                                Previous
                                            </button>
                                        )}
                                        {/* Current page indicator */}
                                        <div className="px-4 py-2">
                                            Page {new URLSearchParams(window.location.search).get('page') || '1'}
                                        </div>

                                        {qogitaProducts.next && (
                                            <button
                                                className="pagination-button px-4 py-2 bg-black text-white hover:bg-gray-800 rounded-lg"
                                                onClick={() => {
                                                    // Extract page number from next URL
                                                    if (qogitaProducts.next) {
                                                        try {
                                                            const url = new URL(qogitaProducts.next);
                                                            const page = url.searchParams.get('page');

                                                            if (page) {
                                                                // Get current URL parameters to preserve them
                                                                const currentUrl = new URL(window.location.href);
                                                                const currentParams = new URLSearchParams(currentUrl.search);

                                                                // Update the page parameter
                                                                currentParams.set('page', page);

                                                                // Navigate to the new URL with all parameters preserved
                                                                window.location.href = `?${currentParams.toString()}`;
                                                            }
                                                        } catch (error) {
                                                            console.error('Error navigating to next page:', error);

                                                            // Fallback method if URL parsing fails
                                                            const nextPage = parseInt(new URLSearchParams(window.location.search).get('page') || '1') + 1;

                                                            // Get current URL parameters
                                                            const currentUrl = new URL(window.location.href);
                                                            const currentParams = new URLSearchParams(currentUrl.search);

                                                            // Update the page parameter
                                                            currentParams.set('page', nextPage.toString());

                                                            // Navigate to the new URL
                                                            window.location.href = `?${currentParams.toString()}`;
                                                        }
                                                    }
                                                }}
                                            >
                                                Next
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default ShopBreadCrumb1