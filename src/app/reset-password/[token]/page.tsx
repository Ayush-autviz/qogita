'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import MenuOne from '@/components/Header/Menu/MenuOne'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Footer from '@/components/Footer/Footer'
import * as Icon from "@phosphor-icons/react/dist/ssr"
import { resetPassword } from '@/services/authService';
import { useMutation } from '@tanstack/react-query';
import AuthRedirectRoute from '@/components/AuthRedirectRoute';

const ResetPassword = () => {
    const router = useRouter();
    const params = useParams();
    const token = params.token as string;

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Use React Query directly in the component
    const resetPasswordMutation = useMutation({
        mutationFn: (data: { password: string }) => resetPassword(token, data),
        onError: (error) => {
            setError(error.message || 'Failed to reset password');
        },
        onSuccess: () => {
            setSuccess('Password has been reset successfully');

            // Redirect to login page after 2 seconds
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        }
    });
    const loading = resetPasswordMutation.isPending;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Reset states
        setError('');
        setSuccess('');

        // Validate passwords
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        // Call the reset password mutation
        resetPasswordMutation.mutate({ password });
    };

    return (
        <AuthRedirectRoute>
            <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" />
            <div id="header" className='relative w-full'>
                <MenuOne props="bg-transparent" />
                <Breadcrumb heading='Reset Password' subHeading='Reset Password' />
            </div>
            <div className="reset-password-block md:py-20 py-10">
                <div className="container">
                    <div className="content-main flex gap-y-8 max-md:flex-col">
                        <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
                            <div className="heading4">Reset your password</div>
                            <div className="body1 mt-2">Please enter your new password below</div>

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
                                <div className="password-field">
                                    <input
                                        className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                                        id="password"
                                        type="password"
                                        placeholder="New password *"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="confirm-password mt-5">
                                    <input
                                        className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                                        id="confirm-password"
                                        type="password"
                                        placeholder="Confirm new password *"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="block-button md:mt-7 mt-4">
                                    <div
                                        className="button-main w-full text-center"
                                    >
                                        {loading ? 'Processing...' : 'Reset Password'}
                                    </div>
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

export default ResetPassword
