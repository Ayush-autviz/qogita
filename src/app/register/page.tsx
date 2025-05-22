'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import MenuOne from '@/components/Header/Menu/MenuOne'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Footer from '@/components/Footer/Footer'
import * as Icon from "@phosphor-icons/react/dist/ssr"
import { register } from '@/services/authService';
import { useMutation } from '@tanstack/react-query';
import AuthRedirectRoute from '@/components/AuthRedirectRoute';

const Register = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [error, setError] = useState('');

    // Use React Query directly in the component
    const registerMutation = useMutation({
        mutationFn: register,
        onError: (error) => {
            setError(error.message || 'Registration failed');
        },
        onSuccess: (data) => {
            // Check if the response indicates the user exists but is not verified
            if (data.message && data.message.includes('not verified')) {
                // Still redirect to verification sent page as a new verification email was sent
                router.push(`/verification-sent?email=${encodeURIComponent(email)}&resent=true`);
            } else {
                // Normal registration success - redirect to verification sent page
                router.push(`/verification-sent?email=${encodeURIComponent(email)}`);
            }
        }
    });
    const loading = registerMutation.isPending;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Reset error state
        setError('');

        // Validate form
        if (!name || !email || !password || !confirmPassword) {
            setError('All fields are required');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        if (!agreeTerms) {
            setError('You must agree to the Terms of Use');
            return;
        }

        // Call the register mutation
        registerMutation.mutate({ name, email, password });
    };

    return (
        <AuthRedirectRoute>
            <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" />
            <div id="header" className='relative w-full'>
                <MenuOne props="bg-transparent" />
                <Breadcrumb heading='Create An Account' subHeading='Create An Account' />
            </div>
            <div className="register-block md:py-20 py-10">
                <div className="container">
                    <div className="content-main flex gap-y-8 max-md:flex-col">
                        <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
                            <div className="heading4">Register</div>

                            {error && (
                                <div className="error-message mt-4 p-3 bg-red/10 text-red rounded-lg">
                                    {error}
                                </div>
                            )}

                            <div className="md:mt-7 mt-4" >
                                <form onSubmit={handleSubmit}>
                                    <div className="name">
                                        <input
                                            className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                                            id="name"
                                            type="text"
                                            placeholder="Full name *"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="email mt-5">
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
                                    <div className="confirm-pass mt-5">
                                        <input
                                            className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                                            id="confirmPassword"
                                            type="password"
                                            placeholder="Confirm Password *"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className='flex items-center mt-5'>
                                        <div className="block-input">
                                            <input
                                                type="checkbox"
                                                name='terms'
                                                id='terms'
                                                checked={agreeTerms}
                                                onChange={(e) => setAgreeTerms(e.target.checked)}
                                            />
                                            <Icon.CheckSquare size={20} weight='fill' className='icon-checkbox' />
                                        </div>
                                        <label htmlFor='terms' className="pl-2 cursor-pointer text-secondary2">I agree to the
                                            <Link href={'#!'} className='text-black hover:underline pl-1'>Terms of Use</Link>
                                        </label>
                                    </div>
                                    <div className="block-button md:mt-7 mt-4">
                                        <button
                                            type="submit"
                                            className="button-main w-full text-center bg-black text-white"
                                        >
                                            {loading ? 'Processing...' : 'Register'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="right md:w-1/2 w-full lg:pl-[60px] md:pl-[40px] flex items-center">
                            <div className="text-content">
                                <div className="heading4">Already have an account?</div>
                                <div className="mt-2 text-secondary">Welcome back. Sign in to access your personalized experience, saved preferences, and more. We're thrilled to have you with us again!</div>
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

export default Register
