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
    const { isAuthenticated, user } = useAuthStore()

    // Handle profile icon click based on authentication status
    const handleProfileClick = () => {
        if (isAuthenticated) {
            router.push('/my-account');
        } else {
            handleLoginPopup();
        }
    };

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    // Rest of the component code...
    // (This is a placeholder for the rest of the component code)
    
    // Only including the relevant part for the user icon and login popup
    return (
        <>
            <div className={`header-menu style-one ${fixedHeader ? 'fixed' : 'absolute'} top-0 left-0 right-0 w-full md:h-[74px] h-[56px] ${props}`}>
                <div className="container mx-auto h-full">
                    <div className="header-main flex justify-between h-full">
                        {/* Other header content */}
                        <div className="right flex gap-12">
                            <div className="max-md:hidden search-icon flex items-center cursor-pointer relative">
                                <Icon.MagnifyingGlass size={24} color='black' onClick={openModalSearch} />
                                <div className="line absolute bg-line w-px h-6 -right-6"></div>
                            </div>
                            <div className="list-action flex items-center gap-4">
                                <div className="user-icon flex items-center justify-center cursor-pointer">
                                    <Icon.User size={24} color='black' onClick={handleProfileClick} />
                                    <div
                                        className={`login-popup absolute top-[74px] w-[320px] p-7 rounded-xl bg-white box-shadow-sm
                                            ${openLoginPopup ? 'open' : ''}`}
                                    >
                                        {isAuthenticated ? (
                                            <>
                                                <div className="user-info flex flex-col items-center mb-4">
                                                    <div className="avatar bg-surface rounded-full w-16 h-16 flex items-center justify-center mb-2">
                                                        <Icon.User size={32} />
                                                    </div>
                                                    <div className="name heading6">{user?.name || 'User'}</div>
                                                    <div className="email caption1 text-secondary">{user?.email}</div>
                                                </div>
                                                <Link href={'/my-account'} className="button-main w-full text-center">My Account</Link>
                                                <button 
                                                    className="button-main bg-white text-black border border-black w-full text-center mt-3"
                                                    onClick={handleLogout}
                                                >
                                                    Logout
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <Link href={'/login'} className="button-main w-full text-center">Login</Link>
                                                <div className="text-secondary text-center mt-3 pb-4">Don't have an account?
                                                    <Link href={'/register'} className='text-black pl-1 hover:underline'>Register</Link>
                                                </div>
                                            </>
                                        )}
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
            {/* Rest of the component */}
        </>
    )
}

export default MenuOne
