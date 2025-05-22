'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { usePathname } from 'next/navigation';
import Product from '@/components/Product/Product';
import productData from '@/data/Product.json'
import useLoginPopup from '@/store/useLoginPopup';
import useMenuMobile from '@/store/useMenuMobile';
import { useModalCartContext } from '@/context/ModalCartContext';
import { useModalWishlistContext } from '@/context/ModalWishlistContext';
import { useModalSearchContext } from '@/context/ModalSearchContext';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';
import { logout } from '@/services/authService';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import LoginPopup from '@/components/LoginPopup';

interface Props {
    props: string;
}

const MenuOne: React.FC<Props> = ({ props }) => {
    const router = useRouter()
    const pathname = usePathname()
    let [selectedType, setSelectedType] = useState<string | null>()
    const { openLoginPopup, handleLoginPopup } = useLoginPopup()
    const { openMenuMobile, handleMenuMobile } = useMenuMobile()
    const [openSubNavMobile, setOpenSubNavMobile] = useState<number | null>(null)
    const { openModalCart } = useModalCartContext()
    const { cartState } = useCart()
    const { openModalWishlist } = useModalWishlistContext()
    const { openModalSearch } = useModalSearchContext()
    const { handleProfileClick, isAuthenticated, user } = useAuthRedirect()

    const handleOpenSubNavMobile = (index: number) => {
        setOpenSubNavMobile(openSubNavMobile === index ? null : index)
    }

    // Handle profile icon click
    const handleUserIconClick = () => {
        // If not redirected to my-account (not authenticated), show login popup
        if (!handleProfileClick()) {
            handleLoginPopup();
        }
    }

    // Handle logout
    const handleLogout = () => {
        logout();
        router.push('/login');
    }

    const [fixedHeader, setFixedHeader] = useState(false)
    const [lastScrollPosition, setLastScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setFixedHeader(scrollPosition > 0 && scrollPosition < lastScrollPosition);
            setLastScrollPosition(scrollPosition);
        };

        // Gắn sự kiện cuộn khi component được mount
        window.addEventListener('scroll', handleScroll);

        // Hủy sự kiện khi component bị unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollPosition]);

    const handleGenderClick = (gender: string) => {
        router.push(`/shop/breadcrumb1?gender=${gender}`);
    };

    const handleCategoryClick = (category: string) => {
        router.push(`/shop/breadcrumb1?category=${category}`);
    };

    const handleTypeClick = (type: string) => {
        setSelectedType(type)
        router.push(`/shop/breadcrumb1?type=${type}`);
    };

    return (
        <>
            <div className={`header-menu style-one ${fixedHeader ? 'fixed' : 'absolute'} top-0 left-0 right-0 w-full md:h-[74px] h-[56px] ${props}`}>
                <div className="container mx-auto h-full">
                    <div className="header-main flex justify-between h-full">
                        <div className="menu-mobile-icon lg:hidden flex items-center" onClick={handleMenuMobile}>
                            <i className="icon-category text-2xl"></i>
                        </div>
                        <div className="left flex items-center gap-16">
                            <Link href={'/'} className='flex items-center max-lg:absolute max-lg:left-1/2 max-lg:-translate-x-1/2'>
                                <div className="heading4">Qogita</div>
                            </Link>
                            <div className="menu-main h-full max-lg:hidden">
                                <ul className='flex items-center gap-8 h-full'>
                                    <li className='h-full relative'>
                                        <Link
                                            href="#!"
                                            className={`text-button-uppercase duration-300 h-full flex items-center justify-center gap-1 ${pathname === '/' ? 'active' : ''}`}
                                        >
                                            Brands
                                        </Link>
                                        <div className="sub-menu py-3 px-5 -left-10 w-max absolute grid grid-cols-4 gap-5 bg-white rounded-b-xl">
                                            <ul>
                                                <li>
                                                    <Link href="/shop/breadcrumb1?brand_name=Maybelline New York" className={`link text-black duration-300 ${pathname === '/' ? 'active' : ''}`}>
                                                        Maybelline New York
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/shop/breadcrumb1?brand_name=Garnier" className='link text-black duration-300'>
                                                        Garnier
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/shop/breadcrumb1?brand_name=Dolce & Gabbana" className='link text-black duration-300'>
                                                        Dolce & Gabbana
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/shop/breadcrumb1?brand_name=Nivea" className='link text-black duration-300'>
                                                        Nivea
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/shop/breadcrumb1?brand_name=Versace" className='link text-black duration-300'>
                                                    Versace
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/shop/breadcrumb1?brand_name=Lattafa" className='link text-black duration-300'>
                                                    Lattafa
                                                    </Link>
                                                </li>
                                            </ul>
                                            <ul>
                                                <li>
                                                    <Link href="/shop/breadcrumb1?brand_name=L'Oréal" className='link text-black duration-300'>
                                                    L'Oréal
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/shop/breadcrumb1?brand_name=Schwarzkopf" className='link text-black duration-300'>
                                                    Schwarzkopf
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/shop/breadcrumb1?brand_name=Oral-B" className='link text-black duration-300'>
                                                    Oral-B
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/shop/breadcrumb1?brand_name=The Body Shop" className='link text-black duration-300'>
                                                    The Body Shop
                                                    </Link>
                                                </li>
                                            </ul>
                                            {/* <ul>
                                                <li>
                                                    <Link href="/homepages/cosmetic1" className='link text-black duration-300'>
                                                        Home Cosmetic 1
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/homepages/cosmetic2" className='link text-black duration-300'>
                                                        Home Cosmetic 2
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/homepages/cosmetic3" className='link text-black duration-300'>
                                                        Home Cosmetic 3
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/homepages/pet" className='link text-black duration-300'>
                                                        Home Pet Store
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/homepages/jewelry" className='link text-black duration-300'>
                                                        Home Jewelry
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/homepages/furniture" className='link text-black duration-300'>
                                                        Home Furniture
                                                    </Link>
                                                </li>
                                            </ul>
                                            <ul>
                                                <li>
                                                    <Link href="/homepages/watch" className='link text-black duration-300'>
                                                        Home Watch
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/homepages/toys" className='link text-black duration-300'>
                                                        Home Toys Kid
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/homepages/yoga" className='link text-black duration-300'>
                                                        Home Yoga
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/homepages/organic" className='link text-black duration-300'>
                                                        Home Organic
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/homepages/marketplace" className='text-black duration-300'>
                                                        Home Marketplace
                                                    </Link>
                                                </li>
                                            </ul> */}
                                        </div>
                                    </li>
                                    <li className='h-full'>
                                        <Link href="#!" className='text-button-uppercase duration-300 h-full flex items-center justify-center'>
                                            Fragrance
                                        </Link>
                                        <div className="mega-menu absolute top-[74px] left-0 bg-white w-screen">
                                            <div className="container">
                                                <div className="flex justify-between py-8">
                                                    <div className="nav-link basis-2/3 grid grid-cols-4 gap-y-8">
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Perfume & cologne</div>
                                                            <ul>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Eau%20De%20Toilette'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Eau De Toilette
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Eau%20De%20Parfum'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Eau De Parfum
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Extrait%20De%20Parfum'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Extrait De Parfum
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Fragrance%20Sets'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Fragrance Sets
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Perfume%20%26%20Cologne'}
                                                                        className={`link text-black duration-300 cursor-pointer view-all-btn`}
                                                                    >
                                                                        View All
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Deodorant & Anti Perspirant</div>
                                                            <ul>
                                                                <li>
                                                                <Link href={'/shop/breadcrumb1?category_name=Deodorant%20%26%20Anti-Perspirant'}
                    
                                                                        className={`link text-black duration-300 view-all-btn`}
                                                                    >
                                                                        View All
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Aftershave</div>
                                                            <ul>
                                                                <li>
                                                                <Link href={'/shop/breadcrumb1?category_name=Aftershave'}
                                                                       
                                                                        className={`link text-black duration-300 view-all-btn`}
                                                                    >
                                                                        View All
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    {/* <div className="banner-ads-block pl-2.5 basis-1/3">
                                                        <div className="banner-ads-item bg-linear rounded-2xl relative overflow-hidden cursor-pointer" onClick={() => handleTypeClick('swimwear')}>
                                                            <div className="text-content py-14 pl-8 relative z-[1]">
                                                                <div className="text-button-uppercase text-white bg-red px-2 py-0.5 inline-block rounded-sm">Save $10</div>
                                                                <div className="heading6 mt-2">Dive into Savings <br />on Swimwear</div>
                                                                <div className="body1 mt-3 text-black">
                                                                    Starting at <span className='text-red'>$59.99</span>
                                                                </div>
                                                            </div>
                                                            <Image
                                                                src={'/images/slider/bg2-2.png'}
                                                                width={200}
                                                                height={100}
                                                                alt='bg-img'
                                                                className='basis-1/3 absolute right-0 top-0 duration-700'
                                                            />
                                                        </div>
                                                        <div className="banner-ads-item bg-linear rounded-2xl relative overflow-hidden cursor-pointer mt-8" onClick={() => handleTypeClick('accessories')}>
                                                            <div className="text-content py-14 pl-8 relative z-[1]">
                                                                <div className="text-button-uppercase text-white bg-red px-2 py-0.5 inline-block rounded-sm">Save $10</div>
                                                                <div className="heading6 mt-2">20% off <br />accessories</div>
                                                                <div className="body1 mt-3 text-black">
                                                                    Starting at <span className='text-red'>$59.99</span>
                                                                </div>
                                                            </div>
                                                            <Image
                                                                src={'/images/other/bg-feature.png'}
                                                                width={200}
                                                                height={100}
                                                                alt='bg-img'
                                                                className='basis-1/3 absolute right-0 top-0 duration-700'
                                                            />
                                                        </div>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className='h-full'>
                                        <Link
                                            href="#!"
                                            className={`text-button-uppercase duration-300 h-full flex items-center justify-center ${pathname.includes('/shop/') ? 'active' : ''}`}
                                        >
                                            Makeup
                                        </Link>
                                        <div className="mega-menu absolute top-[74px] left-0 bg-white w-screen">
                                            <div className="container">
                                                <div className="flex justify-between py-8">
                                                    <div className="nav-link flex flex-row  flex-wrap gap-12 gap-y-8">
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Eyes</div>
                                                            <ul>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Eyeshadow'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Eyeshadow
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Mascara'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Mascara
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Eyeliner'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Eyeliner
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=eye-sets-pallets'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Sets & Pallets
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Eye%20Pencil'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Eye Pencil
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Eyes'}
                                                                        className={`link text-black duration-300 cursor-pointer view-all-btn`}
                                                                    >
                                                                        All Categories
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Complexion</div>
                                                            <ul>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Foundation'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Foundation
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Blush'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Blush
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Concealer'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Concealer
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Powder'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Powder
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Highlighter'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Highlighter
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Complexion'}
                                                                        className={`link text-black duration-300 cursor-pointer view-all-btn`}
                                                                    >
                                                                        All Categories
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Lips</div>
                                                            <ul>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Lipstick'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Lipstick
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Lip%20Gloss'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Lip Gloss
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Lip%20Liner'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Lip Liner
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Lip%20Balm'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Lip Balm
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Lip%20Plumper'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Lip Plumper
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Lips'}
                                                                        className={`link text-black duration-300 cursor-pointer view-all-btn`}
                                                                    >
                                                                        All Categories
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Nails</div>
                                                            <ul>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Nail%20Polish'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Nail Polish
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Gel%20Polish'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Gel Polish
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Nail%20Care'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Nail Care
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Nail%20Polish%20Remover'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Nail Polish Remover
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Nail%20Sets'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Sets
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Nails'}
                                                                        className={`link text-black duration-300 cursor-pointer view-all-btn`}
                                                                    >
                                                                        All Categories
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Eyebrows</div>
                                                            <ul>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Eyebrow%20Gel'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Eyebrow Gel
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Eyebrow%20Pencil'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Eyebrow Pencil
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Eyebrow%20Powder'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Eyebrow Powder
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Eyebrow%20Dye'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Eyebrow Dye
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Eyebrow%20Sets%20%26%20Pallets'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Sets & Pallets
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Eyebrows'}
                                                                        className={`link text-black duration-300 cursor-pointer view-all-btn`}
                                                                    >
                                                                        All Categories
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Accessories</div>
                                                            <ul>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Eyelash%20Combs'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Eyelash Combs
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Eyelash%20Curlers'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Eyelash Curlers
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Makeup%20Mirrors'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Makeup Mirrors
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Body%20Makeup'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Body Makeup
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Makeup%20Sponges'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Makeup Sponges
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Accessories'}
                                                                        className={`link text-black duration-300 cursor-pointer view-all-btn`}
                                                                    >
                                                                        All Categories
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Makeup Brushes</div>
                                                            <ul>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Lip%20Brushes'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Lip Brushes
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Foundation%20Brushes'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Foundation Brushes
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Powder%20Brushes'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Powder Brushes
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Eyeshadow%20Brushes'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Eyeshadow Brushes
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Brush%20Sets'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Brush Sets
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Makeup%20Brushes'}
                                                                        className={`link text-black duration-300 cursor-pointer view-all-btn`}
                                                                    >
                                                                        All Categories
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className='h-full'>
                                        <Link
                                            href="#!"
                                            className={`text-button-uppercase duration-300 h-full flex items-center justify-center ${pathname.includes('/product/') ? 'active' : ''}`}
                                        >
                                            Hair
                                        </Link>
                                        <div className="mega-menu absolute top-[74px] left-0 bg-white w-screen">
                                            <div className="container">
                                                <div className="nav-link w-full flex justify-between py-8">
                                                    <div className="nav-link flex flex-row gap-12 flex-wrap gap-y-8">
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Hair Care</div>
                                                            <ul>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Shampoo'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Shampoo
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Conditioner'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Conditioner
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Hair%20Oil%20%26%20Hair%20Serum'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Hair Oil & Hair Serum
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Hair%20Masks'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Hair Masks
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Dry%20Shampoo'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Dry Shampoo
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Hair%20Care'}
                                                                        className={`link text-black duration-300 cursor-pointer view-all-btn`}
                                                                    >
                                                                        All Categories
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Hair Styling</div>
                                                            <ul>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Heat%20Protection'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Heat Protection
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Mousse'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Mousse
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Gel'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Gel
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Hairspray'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Hairspray
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Wax'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Wax
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Hair%20Styling'}
                                                                        className={`link text-black duration-300 cursor-pointer view-all-btn`}
                                                                    >
                                                                        All Categories
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Styling Tools</div>
                                                            <ul>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Hair%20Straighteners'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Hair Straighteners
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Curling%20Irons'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Curling Irons
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Hot%20Air%20Brushes'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Hot Air Brushes
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Hair%20Dryers'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Hair Dryers
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Hair%20Clippers'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Hair Clippers
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Styling%20Tools'}
                                                                        className={`link text-black duration-300 cursor-pointer view-all-btn`}
                                                                    >
                                                                        All Categories
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Brushes & Combs</div>
                                                            <ul>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Round%20Brushes'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Round Brushes
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Flat%20%26%20Paddle%20Brushes'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Flat & Paddle Brushes
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Wooden%20Brushes'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Wooden Brushes
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Combs'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Combs
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Detanglers'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Detanglers
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Brushes%20%26%20Combs'}
                                                                        className={`link text-black duration-300 cursor-pointer view-all-btn`}
                                                                    >
                                                                        All Categories
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Hair Coloring</div>
                                                            <ul>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Bleaching'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Bleaching
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Color%20Rinse'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Color Rinse
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Hair%20Dye'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Hair Dye
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Herbal%20Hair%20Dye'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Herbal Hair Dye
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Hairline%20Paint'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Hairline Paint
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Hair%20Coloring'}
                                                                        className={`link text-black duration-300 cursor-pointer view-all-btn`}
                                                                    >
                                                                        All Categories
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Hair Accessories</div>
                                                            <ul>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Hair%20Clips%20%26%20Hair%20Clamps'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Hair Clips & Hair Clamps
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Headbands'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Headbands
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Hair%20Jewellery'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Hair Jewellery
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Hair%20Elastics'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Hair Elastics
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Hair%20Extensions'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Hair Extensions
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Hair%20Accessories'}
                                                                        className={`link text-black duration-300 cursor-pointer view-all-btn`}
                                                                    >
                                                                        All Categories
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className='h-full'>
                                        <Link href="#!" className={`text-button-uppercase duration-300 h-full flex items-center justify-center ${pathname.includes('/blog') ? 'active' : ''}`}>
                                            Face
                                        </Link>
                                        <div className="mega-menu absolute top-[74px] left-0 bg-white w-screen">
                                            <div className="container">
                                                <div className="flex justify-between py-8">
                                                    <div className="nav-link flex flex-row flex-wrap gap-10 gap-y-8">
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Facial Care</div>
                                                            <ul>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Face%20Cream'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Face Cream
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Day%20Cream'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Day Cream
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Night%20Cream'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Night Cream
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Facial%20Oil'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Facial Oil
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Facial%20Care'}
                                                                        className={`link text-black duration-300 cursor-pointer view-all-btn`}
                                                                    >
                                                                        All Categories
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Face Serum</div>
                                                            <ul>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Hydrating%20Serum'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Hydrating Serum
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Vitamin%20Serum'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Vitamin Serum
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=anti-aging-serum'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Anti Aging Serum
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Hyaluronic%20Acid%20Serum'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Hyaluronic Acid Serum
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Collagen%20Serum'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Collagen Serum
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Face%20Serum'}
                                                                        className={`link text-black duration-300 cursor-pointer view-all-btn`}
                                                                    >
                                                                        All Categories
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Lip Care</div>
                                                            <ul>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Lip%20Oil'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Lip Oil
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Lip%20Mask'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Lip Mask
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Lip%20Scrub'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Lip Scrub
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Lip%20Serum'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Lip Serum
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Lip%20Care'}
                                                                        className={`link text-black duration-300 cursor-pointer view-all-btn`}
                                                                    >
                                                                        All Categories
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Beard Care</div>
                                                            <ul>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Shaving'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Shaving
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Sets'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Sets
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Accessories'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Accessories
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Beard%20Care'}
                                                                        className={`link text-black duration-300 cursor-pointer view-all-btn`}
                                                                    >
                                                                        All Categories
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Facial Cleansing</div>
                                                            <ul>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Cleansing%20Foam'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Cleansing Foam
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Cleansing%20Gel'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Cleansing Gel
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Cleansing%20Oil'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Cleansing Oil
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Cleansing%20Milk'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Cleansing Milk
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Cleansing%20Cream'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Cleansing Cream
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Facial%20Cleansing'}
                                                                        className={`link text-black duration-300 cursor-pointer view-all-btn`}
                                                                    >
                                                                        All Categories
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Eye Care</div>
                                                            <ul>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Eye%20Cream'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Eye Cream
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Eye%20Masks%20%26%20Eye%20Pads'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Eye Masks & Eye Pads
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Eye%20Serum'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Eye Serum
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Eyelash%20Serum%20%26%20Eyebrow%20Serum'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Eyelash Serum & Eyebrow Serum
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Eye%20Gel'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Eye Gel
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Eye%20Care'}
                                                                        className={`link text-black duration-300 cursor-pointer view-all-btn`}
                                                                    >
                                                                        All Categories
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Face Mask</div>
                                                            <ul>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Hydrating%20Mask'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Hydrating Mask
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Purifying%20Mask'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Purifying Mask
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=anti-aging-mask'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Anti Aging Mask
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Face%20Mask'}
                                                                        className={`link text-black duration-300 cursor-pointer view-all-btn`}
                                                                    >
                                                                        All Categories
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>x
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className='h-full'>
                                        <Link href="#!" className={`text-button-uppercase duration-300 h-full flex items-center justify-center ${pathname.includes('/pages') ? 'active' : ''}`}>
                                            Body
                                        </Link>
                                        <div className="mega-menu absolute top-[74px] left-0 bg-white w-screen">
                                            <div className="container">
                                                <div className="flex justify-between py-8">
                                                    <div className="nav-link flex flex-row gap-8 flex-wrap gap-y-8">
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Body Care</div>
                                                            <ul>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Body%20Lotion'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Body Lotion
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Body%20Butter'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Body Butter
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Body%20Oil'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Body Oil
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Anti-Cellulite'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Anti-Cellulite
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Body%20Care%20Sets'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Body Care Sets
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Body%20Care'}
                                                                        className={`link text-black duration-300 cursor-pointer view-all-btn`}
                                                                    >
                                                                        All Categories
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Hand Care</div>
                                                            <ul>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Hand%20Cleaning'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Hand Cleaning
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Hand%20Soap'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Hand Soap
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Hand%20Peeling'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Hand Peeling
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Hand%20Mask'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Hand Mask
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Hand%20Cream'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Hand Cream
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Hand%20Care'}
                                                                        className={`link text-black duration-300 cursor-pointer view-all-btn`}
                                                                    >
                                                                        All Categories
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Sun Care Protection</div>
                                                            <ul>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=body-sun-protection'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Sun Protection
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Aftersun'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Aftersun
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=body-self-tanner'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Self Tanner
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Sun%20Protection%20Sets'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Sun Protection Sets
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=sun-care-protection'}
                                                                        className={`link text-black duration-300 cursor-pointer view-all-btn`}
                                                                    >
                                                                        All Categories
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Nail Care</div>
                                                            <ul>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Nail%20Clippers%20%26%20Tools'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Nail Clippers & Tools
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Nail%20Oil'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Nail Oil
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Cuticle%20Removers'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Cuticle Removers
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Manicure%20Sets'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Manicure Sets
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Nail%20Care%20Sets'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Nail Care Sets
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Nail%20Care'}
                                                                        className={`link text-black duration-300 cursor-pointer view-all-btn`}
                                                                    >
                                                                        All Categories
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Body Cleansing</div>
                                                            <ul>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Shower%20Gel'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Shower Gel
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Shower%20Foam'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Shower Foam
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Shower%20Oil'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Shower Oil
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Soap'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Soap
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Body%20Scrub%20%26%20Peeling'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Body Scrub & Peeling
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Bath%20Salts%20%26%20Bath%20Bombs'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Bath Salts & Bath Bombs
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Body%20Cleansing'}
                                                                        className={`link text-black duration-300 cursor-pointer view-all-btn`}
                                                                    >
                                                                        All Categories
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Foot Care</div>
                                                            <ul>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Foot%20Bath'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Foot Bath
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Foot%20Scrub'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Foot Scrub
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Foot%20Mask'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Foot Mask
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Foot%20Cream'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Foot Cream
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Foot%20Spray'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Foot Spray
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Foot%20Care'}
                                                                        className={`link text-black duration-300 cursor-pointer view-all-btn`}
                                                                    >
                                                                        All Categories
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Intimacy</div>
                                                            <ul>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=intimate-lubricants'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Lubricants
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Condoms'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Condoms
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Sex%20Toys'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Sex Toys
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Intimacy'}
                                                                        className={`link text-black duration-300 cursor-pointer view-all-btn`}
                                                                    >
                                                                        All Categories
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                            
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className='h-full'>
                                        <Link href="#!" className={`text-button-uppercase duration-300 h-full flex items-center justify-center`}>
                                            Health
                                        </Link>
                                        <div className="mega-menu absolute top-[74px] left-0 bg-white w-screen">
                                            <div className="container">
                                                <div className="flex justify-between py-8">
                                                    <div className="nav-link flex flex-row flex-wrap gap-12 gap-y-8">
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">First Aid</div>
                                                            <ul>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=bandage-material'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Bandages
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Plasters'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Plasters
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Hand%20Hygiene'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Hand Hygiene
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Antiseptics%20%26%20Cleaning%20Supplies'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Antiseptics & Cleaning Supplies
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Equipment'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Equipment
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=First%20Aid'}
                                                                        className={`link text-black duration-300 cursor-pointer view-all-btn`}
                                                                    >
                                                                        All Categories
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Oral Care</div>
                                                            <ul>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Toothpaste'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Toothpaste
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Toothbrushes%20%26%20Tongue%20Cleaners'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Toothbrushes & Tongue Cleaners
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Electric%20Toothbrushes'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Electric Toothbrushes
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Mouthwash'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Mouthwash
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Teeth%20Whiteners'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Teeth Whiteners
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Oral%20Care'}
                                                                        className={`link text-black duration-300 cursor-pointer view-all-btn`}
                                                                    >
                                                                        All Categories
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Diet, Lifestyle & Wellness</div>
                                                            <ul>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Nutrition'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Nutrition
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Fitness'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Fitness
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Weight%20Loss'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Weight Loss
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Massage'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Massage
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Aromatherapy%20%26%20Essential%20Oils'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Aromatherapy & Essential Oils
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Diet%2C%20Lifestyle%20%26%20Wellness'}
                                                                        className={`link text-black duration-300 cursor-pointer view-all-btn`}
                                                                    >
                                                                        All Categories
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Supplements & Vitamins</div>
                                                            <ul>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Vitamin'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Vitamin
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Minerals'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Minerals
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Anti-Aging'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Anti-Aging
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Supplements%20%26%20Vitamins'}
                                                                        className={`link text-black duration-300 cursor-pointer view-all-btn`}
                                                                    >
                                                                        All Categories
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Skin, Hair & Nails</div>
                                                            <ul>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Inflammations'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Inflammations
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Hands%20%26%20Feet'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Hands & Feet
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Calluses%20%26%20Cracks'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Calluses & Cracks
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Skin%2C%20Hair%20%26%20Nails'}
                                                                        className={`link text-black duration-300 cursor-pointer view-all-btn`}
                                                                    >
                                                                        All Categories
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Eyes Nose & Ears</div>
                                                            <ul>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Ear%20Care'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Ear Care
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Eye%20Drops'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Eye Drops
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=eyes-nose-ears'}
                                                                        className={`link text-black duration-300 cursor-pointer view-all-btn`}
                                                                    >
                                                                        All Categories
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Dermatological Skin Care</div>
                                                            <ul>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Acne'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Acne
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Rosacea'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Rosacea
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Neurodermatitis'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Neurodermatitis
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Dermatological%20Skin%20Care'}
                                                                        className={`link text-black duration-300 cursor-pointer view-all-btn`}
                                                                    >
                                                                        All Categories
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className='h-full'>
                                        <Link href="#!" className={`text-button-uppercase duration-300 h-full flex items-center justify-center ${pathname.includes('/pages') ? 'active' : ''}`}>
                                            Home & Lifestyle
                                        </Link>
                                        <div className="mega-menu absolute top-[74px] left-0 bg-white w-screen">
                                            <div className="container">
                                                <div className="flex justify-between py-8">
                                                    <div className="nav-link flex flex-row flex-wrap gap-10 gap-y-8">
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Jewellery</div>
                                                            <ul>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Earrings'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Earrings
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Bracelets'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Bracelets
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Watches%20%26%20Wristbands'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Watches & Wristbands
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Jewellery'}
                                                                        className={`link text-black duration-300 cursor-pointer view-all-btn`}
                                                                    >
                                                                        All Categories
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Candles & Holders</div>
                                                            <ul>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Candles'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Candles
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Candles%20%26%20Holders'}
                                                                        className={`link text-black duration-300 cursor-pointer view-all-btn`}
                                                                    >
                                                                        All Categories
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Home Fragrance</div>
                                                            <ul>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Incense'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Incense
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Diffusers'}
                                                                        className={`link text-black duration-300 cursor-pointer`}
                                                                    >
                                                                        Diffusers
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link href={'/shop/breadcrumb1?category_name=Home%20Fragrance'}
                                                                        className={`link text-black duration-300 cursor-pointer view-all-btn`}
                                                                    >
                                                                        All Categories
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="right flex gap-12">
                            <div className="max-md:hidden search-icon flex items-center cursor-pointer relative">
                                <Icon.MagnifyingGlass size={24} color='black' onClick={openModalSearch} />
                                <div className="line absolute bg-line w-px h-6 -right-6"></div>
                            </div>
                            <div className="list-action flex items-center gap-4">
                                <div className="user-icon flex items-center justify-center cursor-pointer">
                                    <Icon.User size={24} color='black' onClick={handleUserIconClick} />
                                    <div
                                        className={`login-popup absolute top-[74px] w-[320px] p-7 rounded-xl bg-white box-shadow-sm
                                            ${openLoginPopup ? 'open' : ''}`}
                                    >
                                        <Link href={'/login'} className="button-main w-full text-center">Login</Link>
                                        <div className="text-black text-center mt-3 pb-4">Don’t have an account?
                                            <Link href={'/register'} className='text-black pl-1 hover:underline'>Register</Link>
                                        </div>
                                        <Link href={'/'} className="button-main bg-white text-black border border-black w-full text-center">Dashboard</Link>
                                        <div className="bottom mt-4 pt-4 border-t border-line"></div>
                                        <Link href={'#!'} className='body1 hover:underline'>Support</Link>
                                    </div>
                                </div>
                                <div className="max-md:hidden wishlist-icon flex items-center cursor-pointer" onClick={openModalWishlist}>
                                    <Icon.Heart size={24} color='black' />
                                </div>
                                <div className="cart-icon flex items-center relative cursor-pointer" onClick={openModalCart}>
                                    <Icon.Handbag size={24} color='black' />
                                    <span className="quantity cart-quantity absolute -right-1.5 -top-1.5 text-xs text-white bg-black w-4 h-4 flex items-center justify-center rounded-full">{cartState.cartArray.length}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="menu-mobile" className={`${openMenuMobile ? 'open' : ''}`}>
                <div className="menu-container bg-white h-full">
                    <div className="container h-full">
                        <div className="menu-main h-full overflow-hidden">
                            <div className="heading py-2 relative flex items-center justify-center">
                                <div
                                    className="close-menu-mobile-btn absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-surface flex items-center justify-center"
                                    onClick={handleMenuMobile}
                                >
                                    <Icon.X size={14} />
                                </div>
                                <Link href={'/'} className='logo text-3xl font-semibold text-center'>Qogita</Link>
                            </div>
                            <div className="form-search relative mt-2">
                                <Icon.MagnifyingGlass size={20} className='absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer' />
                                <input type="text" placeholder='What are you looking for?' className=' h-12 rounded-lg border border-line text-sm w-full pl-10 pr-4' />
                            </div>
                            <div className="list-nav mt-6">
                                <ul>
                                    <li
                                        className={`${openSubNavMobile === 1 ? 'open' : ''}`}
                                        onClick={() => handleOpenSubNavMobile(1)}
                                    >
                                        <a href={'#!'} className={`text-xl font-semibold flex items-center justify-between`}>Brands
                                            <span className='text-right'>
                                                <Icon.CaretRight size={20} />
                                            </span>
                                        </a>
                                        <div className="sub-nav-mobile">
                                            <div
                                                className="back-btn flex items-center gap-3"
                                                onClick={() => handleOpenSubNavMobile(1)}
                                            >
                                                <Icon.CaretLeft />
                                                Back
                                            </div>
                                            <div className="list-nav-item w-full grid grid-cols-2 pt-2 pb-6">
                                                <ul>
                                                    <li>
                                                        <Link href="/" className={`nav-item-mobile link text-black duration-300 ${pathname === '/' ? 'active' : ''}`}>
                                                            Home Fashion 1
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/fashion2" className={`nav-item-mobile link text-black duration-300 ${pathname === '/homepages/fashion2' ? 'active' : ''}`}>
                                                            Home Fashion 2
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/fashion3" className={`nav-item-mobile link text-black duration-300 ${pathname === '/homepages/fashion3' ? 'active' : ''}`}>
                                                            Home Fashion 3
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/fashion4" className={`nav-item-mobile link text-black duration-300 ${pathname === '/homepages/fashion4' ? 'active' : ''}`}>
                                                            Home Fashion 4
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/fashion5" className={`nav-item-mobile link text-black duration-300 ${pathname === '/homepages/fashion5' ? 'active' : ''}`}>
                                                            Home Fashion 5
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/fashion6" className={`nav-item-mobile link text-black duration-300 ${pathname === '/homepages/fashion6' ? 'active' : ''}`}>
                                                            Home Fashion 6
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/fashion7" className={`nav-item-mobile link text-black duration-300 ${pathname === '/homepages/fashion7' ? 'active' : ''}`}>
                                                            Home Fashion 7
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/fashion8" className={`nav-item-mobile link text-black duration-300 ${pathname === '/homepages/fashion8' ? 'active' : ''}`}>
                                                            Home Fashion 8
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/fashion9" className={`nav-item-mobile link text-black duration-300 ${pathname === '/homepages/fashion9' ? 'active' : ''}`}>
                                                            Home Fashion 9
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/fashion10" className={`nav-item-mobile link text-black duration-300 ${pathname === '/homepages/fashion10' ? 'active' : ''}`}>
                                                            Home Fashion 10
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/fashion11" className={`nav-item-mobile link text-black duration-300 ${pathname === '/homepages/fashion11' ? 'active' : ''}`}>
                                                            Home Fashion 11
                                                        </Link>
                                                    </li>
                                                </ul>
                                                <ul>
                                                    <li>
                                                        <Link href="/homepages/underwear" className={`nav-item-mobile link text-black duration-300 ${pathname === '/homepages/underwear' ? 'active' : ''}`}>
                                                            Home Underwear
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/cosmetic1" className={`nav-item-mobile link text-black duration-300 ${pathname === '/homepages/cosmetic1' ? 'active' : ''}`}>
                                                            Home Cosmetic 1
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/cosmetic2" className={`nav-item-mobile link text-black duration-300 ${pathname === '/homepages/cosmetic2' ? 'active' : ''}`}>
                                                            Home Cosmetic 2
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/cosmetic3" className={`nav-item-mobile link text-black duration-300 ${pathname === '/homepages/cosmetic3' ? 'active' : ''}`}>
                                                            Home Cosmetic 3
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/pet" className={`nav-item-mobile link text-black duration-300 ${pathname === '/homepages/pet' ? 'active' : ''}`}>
                                                            Home Pet Store
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/jewelry" className={`nav-item-mobile link text-black duration-300 ${pathname === '/homepages/jewelry' ? 'active' : ''}`}>
                                                            Home Jewelry
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/furniture" className={`nav-item-mobile link text-black duration-300 ${pathname === '/homepages/furniture' ? 'active' : ''}`}>
                                                            Home Furniture
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/watch" className={`nav-item-mobile link text-black duration-300 ${pathname === '/homepages/watch' ? 'active' : ''}`}>
                                                            Home Watch
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/toys" className={`nav-item-mobile link text-black duration-300 ${pathname === '/homepages/toys' ? 'active' : ''}`}>
                                                            Home Toys Kid
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/yoga" className={`nav-item-mobile link text-black duration-300 ${pathname === '/homepages/yoga' ? 'active' : ''}`}>
                                                            Home Yoga
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/organic" className={`nav-item-mobile link text-black duration-300 ${pathname === '/homepages/organic' ? 'active' : ''}`}>
                                                            Home Organic
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/marketplace" className={`nav-item-mobile text-black duration-300 ${pathname === '/homepages/marketplace' ? 'active' : ''}`}>
                                                            Home Marketplace
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                    <li
                                        className={`${openSubNavMobile === 2 ? 'open' : ''}`}
                                        onClick={() => handleOpenSubNavMobile(2)}
                                    >
                                        <a href={'#!'} className='text-xl font-semibold flex items-center justify-between mt-5'>Fragrance
                                            <span className='text-right'>
                                                <Icon.CaretRight size={20} />
                                            </span>
                                        </a>
                                        <div className="sub-nav-mobile">
                                            <div
                                                className="back-btn flex items-center gap-3"
                                                onClick={() => handleOpenSubNavMobile(2)}
                                            >
                                                <Icon.CaretLeft />
                                                Back
                                            </div>
                                            <div className="list-nav-item w-full pt-3 pb-12">
                                                <div className="nav-link grid grid-cols-2 gap-5 gap-y-6">
                                                    <div className="nav-item">
                                                        <div className="text-button-uppercase pb-1">For Men</div>
                                                        <ul>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleGenderClick('men')}
                                                                    className={`link text-black duration-300 cursor-pointer`}
                                                                >
                                                                    Starting From 50% Off
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleTypeClick('outerwear')}
                                                                    className={`link text-black duration-300 cursor-pointer`}
                                                                >
                                                                    Outerwear | Coats
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleTypeClick('sweater')}
                                                                    className={`link text-black duration-300 cursor-pointer`}
                                                                >
                                                                    Sweaters | Cardigans
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleTypeClick('shirt')}
                                                                    className={`link text-black duration-300 cursor-pointer`}
                                                                >
                                                                    Shirt | Sweatshirts
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleGenderClick('men')}
                                                                    className={`link text-black duration-300 view-all-btn`}
                                                                >
                                                                    View All
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="nav-item">
                                                        <div className="text-button-uppercase pb-1">Skincare</div>
                                                        <ul>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleTypeClick('face')}
                                                                    className={`link text-black duration-300 cursor-pointer`}
                                                                >
                                                                    Faces Skin
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleTypeClick('eye')}
                                                                    className={`link text-black duration-300 cursor-pointer`}
                                                                >
                                                                    Eyes Makeup
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleTypeClick('lip')}
                                                                    className={`link text-black duration-300 cursor-pointer`}
                                                                >
                                                                    Lip Polish
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleTypeClick('hair')}
                                                                    className={`link text-black duration-300 cursor-pointer`}
                                                                >
                                                                    Hair Care
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleCategoryClick('cosmetic')}
                                                                    className={`link text-black duration-300 view-all-btn`}
                                                                >
                                                                    View All
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="nav-item">
                                                        <div className="text-button-uppercase pb-1">Health</div>
                                                        <ul>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleTypeClick('candle')}
                                                                    className={`link text-black duration-300 cursor-pointer`}
                                                                >
                                                                    Cented Candle
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleTypeClick('drinks')}
                                                                    className={`link text-black duration-300 cursor-pointer`}
                                                                >
                                                                    Health Drinks
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleTypeClick('clothes')}
                                                                    className={`link text-black duration-300 cursor-pointer`}
                                                                >
                                                                    Yoga Clothes
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleTypeClick('mats')}
                                                                    className={`link text-black duration-300 cursor-pointer`}
                                                                >
                                                                    Yoga Equipment
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleCategoryClick('yoga')}
                                                                    className={`link text-black duration-300 view-all-btn`}
                                                                >
                                                                    View All
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="nav-item">
                                                        <div className="text-button-uppercase pb-1">For Women</div>
                                                        <ul>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleGenderClick('women')}
                                                                    className={`link text-black duration-300 cursor-pointer`}
                                                                >
                                                                    Starting From 60% Off
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleTypeClick('dress')}
                                                                    className={`link text-black duration-300 cursor-pointer`}
                                                                >
                                                                    Dresses | Jumpsuits
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleTypeClick('t-shirt')}
                                                                    className={`link text-black duration-300 cursor-pointer`}
                                                                >
                                                                    T-shirts | Sweatshirts
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleTypeClick('accessories')}
                                                                    className={`link text-black duration-300 cursor-pointer`}
                                                                >
                                                                    Accessories | Jewelry
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleGenderClick('women')}
                                                                    className={`link text-black duration-300 view-all-btn`}
                                                                >
                                                                    View All
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="nav-item">
                                                        <div className="text-button-uppercase pb-1">For Kid</div>
                                                        <ul>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleTypeClick('bed')}
                                                                    className={`link text-black duration-300 cursor-pointer`}
                                                                >
                                                                    Kids Bed
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleTypeClick('toy')}
                                                                    className={`link text-black duration-300 cursor-pointer`}
                                                                >
                                                                    Boy{String.raw`'s`} Toy
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleTypeClick('blanket')}
                                                                    className={`link text-black duration-300 cursor-pointer`}
                                                                >
                                                                    Baby Blanket
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleTypeClick('clothing')}
                                                                    className={`link text-black duration-300 cursor-pointer`}
                                                                >
                                                                    Newborn Clothing
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleCategoryClick('toys-kid')}
                                                                    className={`link text-black duration-300 view-all-btn`}
                                                                >
                                                                    View All
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="nav-item">
                                                        <div className="text-button-uppercase pb-1">For Home</div>
                                                        <ul>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleCategoryClick('furniture')}
                                                                    className={`link text-black duration-300 cursor-pointer`}
                                                                >
                                                                    Furniture | Decor
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleTypeClick('table')}
                                                                    className={`link text-black duration-300 cursor-pointer`}
                                                                >
                                                                    Table | Living Room
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleTypeClick('chair')}
                                                                    className={`link text-black duration-300 cursor-pointer`}
                                                                >
                                                                    Chair | Work Room
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleTypeClick('lighting')}
                                                                    className={`link text-black duration-300 cursor-pointer`}
                                                                >
                                                                    Lighting | Bed Room
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleCategoryClick('furniture')}
                                                                    className={`link text-black duration-300 view-all-btn`}
                                                                >
                                                                    View All
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="banner-ads-block grid sm:grid-cols-2 items-center gap-6 pt-6">
                                                    <div className="banner-ads-item bg-linear rounded-2xl relative overflow-hidden" onClick={() => handleTypeClick('swimwear')}>
                                                        <div className="text-content py-14 pl-8 relative z-[1]">
                                                            <div className="text-button-uppercase text-white bg-red px-2 py-0.5 inline-block rounded-sm">Save $10</div>
                                                            <div className="heading6 mt-2">Dive into Savings <br />on Swimwear</div>
                                                            <div className="body1 mt-3 text-black">
                                                                Starting at <span className='text-red'>$59.99</span>
                                                            </div>
                                                        </div>
                                                        <Image
                                                            src={'/images/slider/bg2-2.png'}
                                                            width={200}
                                                            height={100}
                                                            alt='bg-img'
                                                            className='basis-1/3 absolute right-0 top-0'
                                                        />
                                                    </div>
                                                    <div className="banner-ads-item bg-linear rounded-2xl relative overflow-hidden" onClick={() => handleTypeClick('accessories')}>
                                                        <div className="text-content py-14 pl-8 relative z-[1]">
                                                            <div className="text-button-uppercase text-white bg-red px-2 py-0.5 inline-block rounded-sm">Save $10</div>
                                                            <div className="heading6 mt-2">20% off <br />accessories</div>
                                                            <div className="body1 mt-3 text-black">
                                                                Starting at <span className='text-red'>$59.99</span>
                                                            </div>
                                                        </div>
                                                        <Image
                                                            src={'/images/other/bg-feature.png'}
                                                            width={200}
                                                            height={100}
                                                            alt='bg-img'
                                                            className='basis-1/3 absolute right-0 top-0'
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li
                                        className={`${openSubNavMobile === 3 ? 'open' : ''}`}
                                        onClick={() => handleOpenSubNavMobile(3)}
                                    >
                                        <a href={'#!'} className='text-xl font-semibold flex items-center justify-between mt-5'>Makeup
                                            <span className='text-right'>
                                                <Icon.CaretRight size={20} />
                                            </span>
                                        </a>
                                        <div className="sub-nav-mobile">
                                            <div
                                                className="back-btn flex items-center gap-3"
                                                onClick={() => handleOpenSubNavMobile(3)}
                                            >
                                                <Icon.CaretLeft />
                                                Back
                                            </div>
                                            <div className="list-nav-item w-full pt-3 pb-12">
                                                <div className="">
                                                    <div className="nav-link grid grid-cols-2 gap-5 gap-y-6 justify-between">
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-1">Shop Features</div>
                                                            <ul>
                                                                <li>
                                                                    <Link
                                                                        href={'/shop/breadcrumb-img'}
                                                                        className={`link text-black duration-300 ${pathname === '/shop/breadcrumb-img' ? 'active' : ''}`}
                                                                    >
                                                                        Shop Breadcrumb IMG
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/shop/breadcrumb1'}
                                                                        className={`link text-black duration-300 ${pathname === '/shop/breadcrumb1' ? 'active' : ''}`}
                                                                    >
                                                                        Shop Breadcrumb 1
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/shop/breadcrumb2'}
                                                                        className={`link text-black duration-300 ${pathname === '/shop/breadcrumb2' ? 'active' : ''}`}
                                                                    >
                                                                        Shop Breadcrumb 2
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/shop/collection'}
                                                                        className={`link text-black duration-300 ${pathname === '/shop/collection' ? 'active' : ''}`}
                                                                    >
                                                                        Shop Collection
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-1">Shop Features</div>
                                                            <ul>
                                                                <li>
                                                                    <Link
                                                                        href={'/shop/filter-canvas'}
                                                                        className={`link text-black duration-300 ${pathname === '/shop/filter-canvas' ? 'active' : ''}`}
                                                                    >
                                                                        Shop Filter Canvas
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/shop/filter-options'}
                                                                        className={`link text-black duration-300 ${pathname === '/shop/filter-options' ? 'active' : ''}`}
                                                                    >
                                                                        Shop Filter Options
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/shop/filter-dropdown'}
                                                                        className={`link text-black duration-300 ${pathname === '/shop/filter-dropdown' ? 'active' : ''}`}
                                                                    >
                                                                        Shop Filter Dropdown
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/shop/sidebar-list'}
                                                                        className={`link text-black duration-300 ${pathname === '/shop/sidebar-list' ? 'active' : ''}`}
                                                                    >
                                                                        Shop Sidebar List
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-1">Shop Layout</div>
                                                            <ul>
                                                                <li>
                                                                    <Link
                                                                        href={'/shop/default'}
                                                                        className={`link text-black duration-300 cursor-pointer ${pathname === '/shop/default' ? 'active' : ''}`}
                                                                    >
                                                                        Shop Default
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/shop/default-grid'}
                                                                        className={`link text-black duration-300 cursor-pointer ${pathname === '/shop/default-grid' ? 'active' : ''}`}
                                                                    >
                                                                        Shop Default Grid
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/shop/default-list'}
                                                                        className={`link text-black duration-300 cursor-pointer ${pathname === '/shop/default-list' ? 'active' : ''}`}
                                                                    >
                                                                        Shop Default List
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/shop/fullwidth'}
                                                                        className={`link text-black duration-300 cursor-pointer ${pathname === '/shop/fullwidth' ? 'active' : ''}`}
                                                                    >
                                                                        Shop Full Width
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/shop/square'}
                                                                        className={`link text-black duration-300 ${pathname === '/shop/square' ? 'active' : ''}`}
                                                                    >
                                                                        Shop Square
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/checkout'}
                                                                        className={`link text-black duration-300 ${pathname === '/checkout' ? 'active' : ''}`}
                                                                    >
                                                                        Checkout
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/checkout2'}
                                                                        className={`link text-black duration-300 ${pathname === '/checkout2' ? 'active' : ''}`}
                                                                    >
                                                                        Checkout Style 2
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-1">Products Pages</div>
                                                            <ul>
                                                                <li>
                                                                    <Link
                                                                        href={'/wishlist'}
                                                                        className={`link text-black duration-300 ${pathname === '/wishlist' ? 'active' : ''}`}
                                                                    >
                                                                        Wish List
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/search-result'}
                                                                        className={`link text-black duration-300 ${pathname === '/search-result' ? 'active' : ''}`}
                                                                    >
                                                                        Search Result
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/cart'}
                                                                        className={`link text-black duration-300 ${pathname === '/cart' ? 'active' : ''}`}
                                                                    >
                                                                        Shopping Cart
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/login'}
                                                                        className={`link text-black duration-300 ${pathname === '/login' ? 'active' : ''}`}
                                                                    >
                                                                        Login/Register
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/forgot-password'}
                                                                        className={`link text-black duration-300 ${pathname === '/forgot-password' ? 'active' : ''}`}
                                                                    >
                                                                        Forgot Password
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/order-tracking'}
                                                                        className={`link text-black duration-300 ${pathname === '/order-tracking' ? 'active' : ''}`}
                                                                    >
                                                                        Order Tracking
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/my-account'}
                                                                        className={`link text-black duration-300 ${pathname === '/my-account' ? 'active' : ''}`}
                                                                    >
                                                                        My Account
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li
                                        className={`${openSubNavMobile === 4 ? 'open' : ''}`}
                                        onClick={() => handleOpenSubNavMobile(4)}
                                    >
                                        <a href={'#!'} className='text-xl font-semibold flex items-center justify-between mt-5'>Product
                                            <span className='text-right'>
                                                <Icon.CaretRight size={20} />
                                            </span>
                                        </a>
                                        <div className="sub-nav-mobile">
                                            <div
                                                className="back-btn flex items-center gap-3"
                                                onClick={() => handleOpenSubNavMobile(4)}
                                            >
                                                <Icon.CaretLeft />
                                                Back
                                            </div>
                                            <div className="list-nav-item w-full pt-3 pb-12">
                                                <div className="">
                                                    <div className="nav-link grid grid-cols-2 gap-5 gap-y-6 justify-between">
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-1">Products Features</div>
                                                            <ul>
                                                                <li>
                                                                    <Link
                                                                        href={'/product/default'}
                                                                        className={`link text-black duration-300 ${pathname === '/product/default' ? 'active' : ''}`}
                                                                    >
                                                                        Products Defaults
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/product/sale'}
                                                                        className={`link text-black duration-300 ${pathname === '/product/sale' ? 'active' : ''}`}
                                                                    >
                                                                        Products Sale
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/product/countdown-timer'}
                                                                        className={`link text-black duration-300 ${pathname === '/product/countdown-timer' ? 'active' : ''}`}
                                                                    >
                                                                        Products Countdown Timer
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/product/grouped'}
                                                                        className={`link text-black duration-300 ${pathname === '/product/grouped' ? 'active' : ''}`}
                                                                    >
                                                                        Products Grouped
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/product/bought-together'}
                                                                        className={`link text-black duration-300 ${pathname === '/product/bought-together' ? 'active' : ''}`}
                                                                    >
                                                                        Frequently Bought Together
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/product/out-of-stock'}
                                                                        className={`link text-black duration-300 ${pathname === '/product/out-of-stock' ? 'active' : ''}`}
                                                                    >
                                                                        Products Out Of Stock
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/product/variable'}
                                                                        className={`link text-black duration-300 ${pathname === '/product/variable' ? 'active' : ''}`}
                                                                    >
                                                                        Products Variable
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-1">Products Features</div>
                                                            <ul>
                                                                <li>
                                                                    <Link
                                                                        href={'/product/external'}
                                                                        className={`link text-black duration-300 ${pathname === '/product/external' ? 'active' : ''}`}
                                                                    >
                                                                        Products External
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/product/on-sale'}
                                                                        className={`link text-black duration-300 ${pathname === '/product/on-sale' ? 'active' : ''}`}
                                                                    >
                                                                        Products On Sale
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/product/discount'}
                                                                        className={`link text-black duration-300 ${pathname === '/product/discount' ? 'active' : ''}`}
                                                                    >
                                                                        Products With Discount
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/product/sidebar'}
                                                                        className={`link text-black duration-300 ${pathname === '/product/sidebar' ? 'active' : ''}`}
                                                                    >
                                                                        Products With Sidebar
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/product/fixed-price'}
                                                                        className={`link text-black duration-300 ${pathname === '/product/fixed-price' ? 'active' : ''}`}
                                                                    >
                                                                        Products Fixed Price
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item col-span-2">
                                                            <div className="text-button-uppercase pb-1">Products Layout</div>
                                                            <ul>
                                                                <li>
                                                                    <Link
                                                                        href={'/product/thumbnail-left'}
                                                                        className={`link text-black duration-300 ${pathname === '/product/thumbnail-left' ? 'active' : ''}`}
                                                                    >
                                                                        Products Thumbnails Left
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/product/thumbnail-bottom'}
                                                                        className={`link text-black duration-300 ${pathname === '/product/thumbnail-bottom' ? 'active' : ''}`}
                                                                    >
                                                                        Products Thumbnails Bottom
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/product/one-scrolling'}
                                                                        className={`link text-black duration-300 ${pathname === '/product/one-scrolling' ? 'active' : ''}`}
                                                                    >
                                                                        Products Grid 1 Scrolling
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/product/two-scrolling'}
                                                                        className={`link text-black duration-300 ${pathname === '/product/two-scrolling' ? 'active' : ''}`}
                                                                    >
                                                                        Products Grid 2 Scrolling
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/product/combined-one'}
                                                                        className={`link text-black duration-300 ${pathname === '/product/combined-one' ? 'active' : ''}`}
                                                                    >
                                                                        Products Combined 1
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/product/combined-two'}
                                                                        className={`link text-black duration-300 ${pathname === '/product/combined-two' ? 'active' : ''}`}
                                                                    >
                                                                        Products Combined 2
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="recent-product pt-4">
                                                        <div className="text-button-uppercase pb-1">Recent Products</div>
                                                        <div className="list-product hide-product-sold  grid grid-cols-2 gap-5 mt-3">
                                                            {productData.slice(0, 2).map((prd, index) => (
                                                                <Product key={index} data={prd} type='grid' style='style-1' />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li
                                        className={`${openSubNavMobile === 5 ? 'open' : ''}`}
                                        onClick={() => handleOpenSubNavMobile(5)}
                                    >
                                        <a href={'#!'} className='text-xl font-semibold flex items-center justify-between mt-5'>Face
                                            <span className='text-right'>
                                                <Icon.CaretRight size={20} />
                                            </span>
                                        </a>
                                        <div className="sub-nav-mobile">
                                            <div
                                                className="back-btn flex items-center gap-3"
                                                onClick={() => handleOpenSubNavMobile(5)}
                                            >
                                                <Icon.CaretLeft />
                                                Back
                                            </div>
                                            <div className="list-nav-item w-full pt-2 pb-6">
                                                <ul className='w-full'>
                                                    <li>
                                                        <Link href="/blog/default" className={`link text-black duration-300 ${pathname === '/blog/default' ? 'active' : ''}`}>
                                                            Blog Default
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/blog/list" className={`link text-black duration-300 ${pathname === '/blog/list' ? 'active' : ''}`}>
                                                            Blog List
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/blog/grid" className={`link text-black duration-300 ${pathname === '/blog/grid' ? 'active' : ''}`}>
                                                            Blog Grid
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/blog/detail1" className={`link text-black duration-300 ${pathname === '/blog/detail1' ? 'active' : ''}`}>
                                                            Blog Detail 1
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/blog/detail2" className={`link text-black duration-300 ${pathname === '/blog/detail2' ? 'active' : ''}`}>
                                                            Blog Detail 2
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                    <li
                                        className={`${openSubNavMobile === 6 ? 'open' : ''}`}
                                        onClick={() => handleOpenSubNavMobile(6)}
                                    >
                                        <a href={'#!'} className='text-xl font-semibold flex items-center justify-between mt-5'>Body
                                            <span className='text-right'>
                                                <Icon.CaretRight size={20} />
                                            </span>
                                        </a>
                                        <div className="sub-nav-mobile">
                                            <div
                                                className="back-btn flex items-center gap-3"
                                                onClick={() => handleOpenSubNavMobile(6)}
                                            >
                                                <Icon.CaretLeft />
                                                Back
                                            </div>
                                            <div className="list-nav-item w-full pt-2 pb-6">
                                                <ul className='w-full'>
                                                    <li>
                                                        <Link href="/pages/about" className={`link text-black duration-300 ${pathname === '/pages/about' ? 'active' : ''}`}>
                                                            About Us
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/pages/contact" className={`link text-black duration-300 ${pathname === '/pages/contact' ? 'active' : ''}`}>
                                                            Contact Us
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/pages/store-list" className={`link text-black duration-300 ${pathname === '/pages/store-list' ? 'active' : ''}`}>
                                                            Store List
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/pages/page-not-found" className={`link text-black duration-300 ${pathname === '/pages/page-not-found' ? 'active' : ''}`}>
                                                            404
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/pages/faqs" className={`link text-black duration-300 ${pathname === '/pages/faqs' ? 'active' : ''}`}>
                                                            FAQs
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/pages/coming-soon" className={`link text-black duration-300 ${pathname === '/pages/coming-soon' ? 'active' : ''}`}>
                                                            Coming Soon
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/pages/customer-feedbacks" className={`link text-black duration-300 ${pathname === '/pages/customer-feedbacks' ? 'active' : ''}`}>
                                                            Customer Feedbacks
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/blog/detail2" className={`link text-black duration-300 ${pathname === '/blog/detail2' ? 'active' : ''}`}>
                                                            Blog Detail 2
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                    <li
                                        className={`${openSubNavMobile === 6 ? 'open' : ''}`}
                                        onClick={() => handleOpenSubNavMobile(6)}
                                    >
                                        <a href={'#!'} className='text-xl font-semibold flex items-center justify-between mt-5'>Body
                                            <span className='text-right'>
                                                <Icon.CaretRight size={20} />
                                            </span>
                                        </a>
                                        <div className="sub-nav-mobile">
                                            <div
                                                className="back-btn flex items-center gap-3"
                                                onClick={() => handleOpenSubNavMobile(6)}
                                            >
                                                <Icon.CaretLeft />
                                                Back
                                            </div>
                                            <div className="list-nav-item w-full pt-2 pb-6">
                                                <ul className='w-full'>
                                                    <li>
                                                        <Link href="/pages/about" className={`link text-black duration-300 ${pathname === '/pages/about' ? 'active' : ''}`}>
                                                            About Us
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/pages/contact" className={`link text-black duration-300 ${pathname === '/pages/contact' ? 'active' : ''}`}>
                                                            Contact Us
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/pages/store-list" className={`link text-black duration-300 ${pathname === '/pages/store-list' ? 'active' : ''}`}>
                                                            Store List
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/pages/page-not-found" className={`link text-black duration-300 ${pathname === '/pages/page-not-found' ? 'active' : ''}`}>
                                                            404
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/pages/faqs" className={`link text-black duration-300 ${pathname === '/pages/faqs' ? 'active' : ''}`}>
                                                            FAQs
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/pages/coming-soon" className={`link text-black duration-300 ${pathname === '/pages/coming-soon' ? 'active' : ''}`}>
                                                            Coming Soon
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/pages/customer-feedbacks" className={`link text-black duration-300 ${pathname === '/pages/customer-feedbacks' ? 'active' : ''}`}>
                                                            Customer Feedbacks
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                    <li
                                        className={`${openSubNavMobile === 7 ? 'open' : ''}`}
                                        onClick={() => handleOpenSubNavMobile(7)}
                                    >
                                        <a href={'#!'} className='text-xl font-semibold flex items-center justify-between mt-5'>Health
                                            <span className='text-right'>
                                                <Icon.CaretRight size={20} />
                                            </span>
                                        </a>
                                        <div className="sub-nav-mobile">
                                            <div
                                                className="back-btn flex items-center gap-3"
                                                onClick={() => handleOpenSubNavMobile(7)}
                                            >
                                                <Icon.CaretLeft />
                                                Back
                                            </div>
                                            <div className="list-nav-item w-full pt-2 pb-6">
                                                <ul className='w-full'>
                                                    <li>
                                                        <div
                                                            onClick={() => handleTypeClick('candle')}
                                                            className={`link text-black duration-300 cursor-pointer`}
                                                        >
                                                            Cented Candle
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div
                                                            onClick={() => handleTypeClick('drinks')}
                                                            className={`link text-black duration-300 cursor-pointer`}
                                                        >
                                                            Health Drinks
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div
                                                            onClick={() => handleTypeClick('clothes')}
                                                            className={`link text-black duration-300 cursor-pointer`}
                                                        >
                                                            Yoga Clothes
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div
                                                            onClick={() => handleTypeClick('mats')}
                                                            className={`link text-black duration-300 cursor-pointer`}
                                                        >
                                                            Yoga Equipment
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                    <li
                                        className={`${openSubNavMobile === 8 ? 'open' : ''}`}
                                        onClick={() => handleOpenSubNavMobile(8)}
                                    >
                                        <a href={'#!'} className='text-xl font-semibold flex items-center justify-between mt-5'>Home&Lifestyle
                                            <span className='text-right'>
                                                <Icon.CaretRight size={20} />
                                            </span>
                                        </a>
                                        <div className="sub-nav-mobile">
                                            <div
                                                className="back-btn flex items-center gap-3"
                                                onClick={() => handleOpenSubNavMobile(8)}
                                            >
                                                <Icon.CaretLeft />
                                                Back
                                            </div>
                                            <div className="list-nav-item w-full pt-2 pb-6">
                                                <ul className='w-full'>
                                                    <li>
                                                        <div
                                                            onClick={() => handleCategoryClick('furniture')}
                                                            className={`link text-black duration-300 cursor-pointer`}
                                                        >
                                                            Furniture | Decor
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div
                                                            onClick={() => handleTypeClick('table')}
                                                            className={`link text-black duration-300 cursor-pointer`}
                                                        >
                                                            Table | Living Room
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div
                                                            onClick={() => handleTypeClick('chair')}
                                                            className={`link text-black duration-300 cursor-pointer`}
                                                        >
                                                            Chair | Work Room
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div
                                                            onClick={() => handleTypeClick('lighting')}
                                                            className={`link text-black duration-300 cursor-pointer`}
                                                        >
                                                            Lighting | Bed Room
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="menu_bar fixed bg-white bottom-0 left-0 w-full h-[70px] sm:hidden z-[101]">
                <div className="menu_bar-inner grid grid-cols-4 items-center h-full">
                    <Link href={'/'} className='menu_bar-link flex flex-col items-center gap-1'>
                        <Icon.House weight='bold' className='text-2xl' />
                        <span className="menu_bar-title caption2 font-semibold">Home</span>
                    </Link>
                    <Link href={'/shop/filter-canvas'} className='menu_bar-link flex flex-col items-center gap-1'>
                        <Icon.List weight='bold' className='text-2xl' />
                        <span className="menu_bar-title caption2 font-semibold">Category</span>
                    </Link>
                    <Link href={'/search-result'} className='menu_bar-link flex flex-col items-center gap-1'>
                        <Icon.MagnifyingGlass weight='bold' className='text-2xl' />
                        <span className="menu_bar-title caption2 font-semibold">Search</span>
                    </Link>
                    <Link href={'/cart'} className='menu_bar-link flex flex-col items-center gap-1'>
                        <div className="icon relative">
                            <Icon.Handbag weight='bold' className='text-2xl' />
                            <span className="quantity cart-quantity absolute -right-1.5 -top-1.5 text-xs text-white bg-black w-4 h-4 flex items-center justify-center rounded-full">{cartState.cartArray.length}</span>
                        </div>
                        <span className="menu_bar-title caption2 font-semibold">Cart</span>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default MenuOne
