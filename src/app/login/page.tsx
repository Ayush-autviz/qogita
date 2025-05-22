'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import MenuOne from '@/components/Header/Menu/MenuOne'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Footer from '@/components/Footer/Footer'
import * as Icon from "@phosphor-icons/react/dist/ssr"
import { login } from '@/services/authService'
import { isUnverifiedEmailError } from '@/utils/errorHandler';
import { useMutation } from '@tanstack/react-query';
import AuthRedirectRoute from '@/components/AuthRedirectRoute';

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');

    // Use React Query directly in the component
    const loginMutation = useMutation({
        mutationFn: login,
        onError: (error) => {
            console.log(error);
            // Check if the error is due to unverified email
            if (isUnverifiedEmailError(error)) {
                router.push(`/resend-verification`);
                return;
            }

            setError(error.message || 'Login failed');
        },
        onSuccess: () => {
            // Redirect to home page on success
            router.push('/');
        }
    });
    const loading = loginMutation.isPending;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Reset error state
        setError('');

        if (!email || !password) {
            setError('Please enter both email and password');
            return;
        }

        // Call the login mutation
        loginMutation.mutate({
            email,
            password,
            rememberMe // Pass the remember me flag to store in the right storage
        });
    };

    return (
        <AuthRedirectRoute>
            <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" />
            <div id="header" className='relative w-full'>
                <MenuOne props="bg-transparent" />
                <Breadcrumb heading='Login' subHeading='Login' />
            </div>
            <div className="login-block md:py-20 py-10">
                <div className="container">
                    <div className="content-main flex gap-y-8 max-md:flex-col">
                        <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
                            <div className="heading4">Login</div>

                            {error && (
                                <div className="error-message mt-4 p-3 bg-red/10 text-red rounded-lg">
                                    {error}
                                </div>
                            )}

                            <form className="md:mt-7 mt-4" onSubmit={handleSubmit}>
                                <div className="email">
                                    <input
                                        className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                                        id="email"
                                        type="email"
                                        placeholder="Email address *"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="pass mt-5">
                                    <input
                                        className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                                        id="password"
                                        type="password"
                                        placeholder="Password *"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex items-center justify-between mt-5">
                                    <div className='flex items-center'>
                                        <div className="block-input">
                                            <input
                                                type="checkbox"
                                                name='remember'
                                                id='remember'
                                                checked={rememberMe}
                                                onChange={(e) => setRememberMe(e.target.checked)}
                                            />
                                            <Icon.CheckSquare size={20} weight='fill' className='icon-checkbox' />
                                        </div>
                                        <label htmlFor='remember' className="pl-2 cursor-pointer">Remember me</label>
                                    </div>
                                    <Link href={'/forgot-password'} className='font-semibold hover:underline'>Forgot Your Password?</Link>
                                </div>
                                <div className="block-button md:mt-7 mt-4">
                                    <button
                                        type="submit"
                                        className="button-main w-full text-center bg-black text-white"
                                    >
                                        {loading ? 'Processing...' : 'Login'}
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="right md:w-1/2 w-full lg:pl-[60px] md:pl-[40px] flex items-center">
                            <div className="text-content">
                                <div className="heading4">New Customer</div>
                                <div className="mt-2 text-secondary">Be part of our growing family of new customers! Join us today and unlock a world of exclusive benefits, offers, and personalized experiences.</div>
                                <div className="block-button md:mt-7 mt-4">
                                    <Link href={'/register'} className="button-main">Register</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </AuthRedirectRoute>
    )
}

export default Login
