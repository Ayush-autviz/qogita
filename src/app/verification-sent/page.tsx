'use client'
import React from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import MenuOne from '@/components/Header/Menu/MenuOne'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Footer from '@/components/Footer/Footer'
import * as Icon from "@phosphor-icons/react/dist/ssr";

const VerificationSent = () => {
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || '';
    const resent = searchParams.get('resent') === 'true';

    return (
        <>
            <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" />
            <div id="header" className='relative w-full'>
                <MenuOne props="bg-transparent" />
                <Breadcrumb heading='Verification Email Sent' subHeading='Verification Email Sent' />
            </div>
            <div className="verification-sent-block md:py-20 py-10">
                <div className="container">
                    <div className="content-main flex flex-col items-center text-center max-w-2xl mx-auto">
                        <div className="icon-box mb-6">
                            <Icon.EnvelopeSimpleOpen size={80} weight="light" className="text-green" />
                        </div>
                        <div className="heading3 mb-4">Verification Email Sent</div>
                        <div className="body1 mb-8">
                            {resent ? (
                                <>
                                    We've sent a new verification email to <span className="font-semibold">{email}</span>.
                                    Your previous verification link has been deactivated. Please check your inbox and click the new verification link to complete your registration.
                                </>
                            ) : (
                                <>
                                    We've sent a verification email to <span className="font-semibold">{email}</span>.
                                    Please check your inbox and click the verification link to complete your registration.
                                </>
                            )}
                        </div>
                        <div className="info-box p-6 bg-surface rounded-lg mb-8 w-full">
                            <div className="heading5 mb-2">Didn't receive the email?</div>
                            <ul className="text-left list-disc pl-6 mb-4">
                                <li>Check your spam or junk folder</li>
                                <li>Make sure you entered the correct email address</li>
                                <li>Wait a few minutes for the email to arrive</li>
                            </ul>
                            <div className="text-center">
                                <Link href="/resend-verification" className="text-button-uppercase text-primary hover:underline">
                                    Resend Verification Email
                                </Link>
                            </div>
                        </div>
                        <div className="button-group flex flex-wrap gap-4 justify-center">
                            <Link href="/login" className="button-main">
                                Go to Login
                            </Link>
                            <Link href="/" className="button-outline">
                                Return to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default VerificationSent
