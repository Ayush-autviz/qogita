'use client'

import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { useRouter } from 'next/navigation';
import { useCategories } from '@/hooks/useProducts';

const Collection = () => {
    const router = useRouter();

    // Define specific category slugs you want to display
    // You can customize this list based on your needs
    // const categorySlugList = [
    //     'electronics',
    //     'clothing',
    //     'home-and-garden',
    //     'beauty',
    //     'sports',
    //     'toys'
    // ];

    // Fetch categories with the slug parameter
    const { data: categoriesData, isLoading, error } = useCategories({
        page: 1,
        page_size: 10,
     //   slug: categorySlugList
    });

    const handleCategoryClick = (categoryName: string) => {
        // Always use category_name for navigation
        router.push(`/shop/breadcrumb1?category_name=${encodeURIComponent(categoryName)}`);
    };

    // Placeholder image for categories
    const placeholderImage = '/images/collection/swimwear.png';

    // Generate a random color for the placeholder background
    const getRandomColor = () => {
        const colors = [
            'bg-gray-200', 'bg-gray-300', 'bg-gray-400',
            'bg-blue-100', 'bg-green-100', 'bg-yellow-100',
            'bg-red-100', 'bg-purple-100', 'bg-pink-100'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <>
            <div className="collection-block md:pt-20 pt-10">
                <div className="container">
                    <div className="heading3 text-center">Explore Collections</div>
                    {error && (
                        <div className="text-center text-red-500 mt-4">
                            Failed to load categories. Please try again later.
                        </div>
                    )}
                </div>
                <div className="list-collection section-swiper-navigation md:mt-10 mt-6 sm:px-5 px-4">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-[300px]">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
                        </div>
                    ) : (
                        <Swiper
                            spaceBetween={12}
                            slidesPerView={2}
                            navigation
                            loop={true}
                            modules={[Navigation, Autoplay]}
                            breakpoints={{
                                576: {
                                    slidesPerView: 2,
                                    spaceBetween: 12,
                                },
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 20,
                                },
                                1200: {
                                    slidesPerView: 4,
                                    spaceBetween: 20,
                                },
                            }}
                            className='h-full'
                        >
                            {categoriesData?.results?.map((category, index) => (
                                <SwiperSlide key={category.qid}>
                                    <div
                                        className="collection-item block relative rounded-2xl overflow-hidden cursor-pointer"
                                        onClick={() => handleCategoryClick(category.name)}
                                    >
                                        <div className={`bg-img ${getRandomColor()} h-[300px] bg-green-500 flex items-center justify-center`}>
                                            <Image
                                                src={placeholderImage}
                                                width={1000}
                                                height={600}
                                                alt={category.name}
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="collection-name heading6 text-center sm:bottom-8 bottom-4 lg:w-[200px] md:w-[170px] w-[100px] md:py-3 py-1.5 bg-white rounded-xl duration-500">
                                            {category.name}
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}

                            {/* Fallback slides if no categories are available */}
                            {(!categoriesData?.results || categoriesData.results.length === 0) && (
                                Array(6).fill(0).map((_, index) => (
                                    <SwiperSlide key={`fallback-${index}`}>
                                        <div className="collection-item block relative rounded-2xl overflow-hidden">
                                            <div className={`bg-img ${getRandomColor()} h-[300px]`}>
                                                <div className="flex items-center justify-center h-full">
                                                    <span className="text-gray-500">No image available</span>
                                                </div>
                                            </div>
                                            <div className="collection-name heading5 text-center sm:bottom-8 bottom-4 lg:w-[200px] md:w-[160px] w-[100px] md:py-3 py-1.5 bg-white rounded-xl duration-500">
                                                Category {index + 1}
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))
                            )}
                        </Swiper>
                    )}
                </div>
            </div>
        </>
    )
}

export default Collection