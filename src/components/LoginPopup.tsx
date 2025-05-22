'use client';

import React from 'react';
import Link from 'next/link';
import * as Icon from "@phosphor-icons/react/dist/ssr";
import useAuthStore from '@/store/useAuthStore';
import { logout } from '@/services/authService';
import { useRouter } from 'next/navigation';

interface LoginPopupProps {
  isOpen: boolean;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ isOpen }) => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  
  const handleLogout = () => {
    logout();
    router.push('/login');
  };
  
  return (
    <div
      className={`login-popup absolute top-[74px] w-[320px] p-7 rounded-xl bg-white box-shadow-sm
          ${isOpen ? 'open' : ''}`}
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
  );
};

export default LoginPopup;
