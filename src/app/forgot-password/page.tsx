'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import MenuOne from '@/components/Header/Menu/MenuOne'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Footer from '@/components/Footer/Footer'
import * as Icon from "@phosphor-icons/react/dist/ssr"
import { forgotPassword } from '@/services/authService';
import { useMutation } from '@tanstack/react-query';
import AuthRedirectRoute from '@/components/AuthRedirectRoute';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Use React Query directly in the component
    const forgotPasswordMutation = useMutation({
        mutationFn: forgotPassword,
        onError: (error) => {
            setError(error.message || 'Failed to send reset email');
        },
        onSuccess: () => {
            setSuccess('Password reset email sent. Please check your inbox.');
            setEmail('');
        }
    });
    const loading = forgotPasswordMutation.isPending;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Reset states
        setError('');
        setSuccess('');

        if (!email) {
            setError('Please enter your email address');
            return;
        }

        // Call the forgot password mutation
        forgotPasswordMutation.mutate({ email });
    };

    return (
        <AuthRedirectRoute>
            <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" />
            <div id="header" className='relative w-full'>
                <MenuOne props="bg-transparent" />
                <Breadcrumb heading='Forgot your password' subHeading='Forgot your password' />
            </div>
            <div className="forgot-pass md:py-20 py-10">
                <div className="container">
                    <div className="content-main flex gap-y-8 max-md:flex-col">
                        <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
                            <div className="heading4">Reset your password</div>
                            <div className="body1 mt-2">We will send you an email to reset your password</div>

                            {error && (
                                <div className="error-message mt-4 p-3 bg-red/10 text-red rounded-lg">
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="success-message mt-4 p-3 bg-green/10 text-green rounded-lg">
                                    {success}
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
                                <div className="block-button md:mt-7 mt-4">
                                    <button
                                        type="submit"
                                        className="button-main w-full text-center bg-black text-white"
                                    >
                                        {loading ? 'Processing...' : 'Submit'}
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="right md:w-1/2 w-full lg:pl-[60px] md:pl-[40px] flex items-center">
                            <div className="text-content">
                                <div className="heading4">Remember your password?</div>
                                <div className="mt-2 text-secondary">If you already remember your password, you can log in to your account using your credentials.</div>
                                <div className="block-button md:mt-7 mt-4">
                                    <Link href={'/login'} className="button-main">Login</Link>
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

export default ForgotPassword
