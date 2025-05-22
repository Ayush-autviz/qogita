'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import MenuOne from '@/components/Header/Menu/MenuOne'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Footer from '@/components/Footer/Footer'
import * as Icon from "@phosphor-icons/react/dist/ssr"
import { verifyEmail } from '@/services/authService';
import { useMutation } from '@tanstack/react-query';

const VerifyEmail = () => {
    const router = useRouter();
    const params = useParams();
    const token = params.token as string;

    // Use React Query directly in the component
    const verifyEmailMutation = useMutation({
        mutationFn: () => verifyEmail(token),
        onError: (error) => {
            console.error('Verification error:', error);
        },
        onSuccess: (data) => {
            console.log('Verification successful:', data);
            
            // Redirect to home page after 3 seconds
            setTimeout(() => {
                router.push('/');
            }, 3000);
        }
    });

    useEffect(() => {
        // Call the verify email mutation when the component mounts
        if (token) {
            verifyEmailMutation.mutate();
        }
    }, [token]);

    // Determine the current state based on mutation state
    const isLoading = verifyEmailMutation.isPending;
    const isSuccess = verifyEmailMutation.isSuccess;
    const isError = verifyEmailMutation.isError;
    const errorMessage = verifyEmailMutation.error?.message || 'Verification failed';

    return (
        <>
            <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" />
            <div id="header" className='relative w-full'>
                <MenuOne props="bg-transparent" />
                <Breadcrumb heading='Email Verification' subHeading='Email Verification' />
            </div>
            <div className="verify-email-block md:py-20 py-10">
                <div className="container">
                    <div className="content-main flex flex-col items-center text-center max-w-2xl mx-auto">
                        {isLoading ? (
                            <>
                                <div className="icon-box mb-6">
                                    <div className="animate-spin">
                                        <Icon.CircleNotch size={80} weight="light" />
                                    </div>
                                </div>
                                <div className="heading3 mb-4">Verifying Your Email</div>
                                <div className="body1 mb-8">
                                    Please wait while we verify your email address...
                                </div>
                            </>
                        ) : isSuccess ? (
                            <>
                                <div className="icon-box mb-6">
                                    <Icon.CheckCircle size={80} weight="light" className="text-green" />
                                </div>
                                <div className="heading3 mb-4">Email Verified Successfully!</div>
                                <div className="body1 mb-8">
                                    Your email has been verified successfully. You are now logged in and will be redirected to the home page in a few seconds.
                                </div>
                                <div className="button-group flex flex-wrap gap-4 justify-center">
                                    <Link href="/" className="button-main">
                                        Go to Home Page
                                    </Link>
                                </div>
                            </>
                        ) : isError ? (
                            <>
                                <div className="icon-box mb-6">
                                    <Icon.XCircle size={80} weight="light" className="text-red" />
                                </div>
                                <div className="heading3 mb-4">Verification Failed</div>
                                <div className="body1 mb-4">
                                    {errorMessage}
                                </div>
                                <div className="info-box p-6 bg-surface rounded-lg mb-8 w-full">
                                    <div className="heading5 mb-2">What can you do?</div>
                                    <ul className="text-left list-disc pl-6 mb-4">
                                        <li>Try clicking the link from your email again</li>
                                        <li>Request a new verification email</li>
                                        <li>Contact customer support if the problem persists</li>
                                    </ul>
                                </div>
                                <div className="button-group flex flex-wrap gap-4 justify-center">
                                    <Link href="/resend-verification" className="button-main">
                                        Resend Verification Email
                                    </Link>
                                    <Link href="/login" className="button-outline">
                                        Go to Login
                                    </Link>
                                </div>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default VerifyEmail
