"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@heroui/react";
// Import your Better-Auth client instance here when ready
// import { authClient } from "@/lib/auth-client"; 

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        image: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Real-time password criteria tracking
    const passwordRules = {
        length: formData.password.length >= 6,
        uppercase: /[A-Z]/.test(formData.password),
        lowercase: /[a-z]/.test(formData.password)
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Clear specific field errors when user starts typing again
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        setServerError('');
    };

    // Client-side form validation logic
    const validateForm = () => {
        let tempErrors = {};
        
        if (!formData.name.trim()) {
            tempErrors.name = "Full Name is required";
        }
        
        if (!formData.email.trim()) {
            tempErrors.email = "Email address is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = "Please enter a valid email address";
        }

        if (!formData.password) {
            tempErrors.password = "Password is required";
        } else if (!passwordRules.length || !passwordRules.uppercase || !passwordRules.lowercase) {
            tempErrors.password = "Password does not meet the structural rules";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        setServerError('');

        try {
            // Better-Auth Core sign-up execution 
            // Note: Users register as standard users by default configuration
            /*
            const { data, error } = await authClient.signUp.email({
                email: formData.email,
                password: formData.password,
                name: formData.name,
                image: formData.image || undefined, 
                callbackURL: "/" 
            });

            if (error) {
                // If account exists in MongoDB through Better-Auth handling
                if (error.status === 422 || error.code === "USER_ALREADY_EXISTS") {
                    setServerError("This email is already registered. Try logging in.");
                } else {
                    setServerError(error.message || "An error occurred during registration.");
                }
                return;
            }
            */

            // Simulation placeholder (Uncomment the Better-Auth block above for production integration)
            console.log("Registration payload processed successfully:", formData);
            
        } catch (err) {
            setServerError("Internal Server Error. Connection failed.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-[#0a0f1d] text-gray-300 flex items-center justify-center p-4 md:p-8 font-sans selection:bg-green-500 selection:text-black">
            <div className="max-w-4xl w-full bg-[#0e1424] border border-neutral-900 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl shadow-black/60">
                
                {/* Left Side: Branding and Platform Visual Info */}
                <div className="lg:col-span-5 bg-linear-to-br from-green-950/40 via-[#0e1424] to-[#0a0f1d] p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-neutral-900">
                    <div>
                        <div className="flex items-center gap-2 mb-10">
                            <Image src="/flexflow--logo.png" height={32} width={32} alt="FlexFlow Logo" />
                            <p className="font-bold text-xl tracking-wider text-white">
                                Flex<span className="text-green-500">Flow</span>
                            </p>
                        </div>
                        
                        <h2 className="text-2xl font-black text-white leading-tight mb-4">
                            Start Your Journey Today
                        </h2>
                        <p className="text-xs text-gray-400 leading-relaxed mb-8">
                            Create your free account and unlock access to world class workouts, nutrition guidance, and a thriving athlete community.
                        </p>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3 bg-[#0a0f1d]/60 border border-neutral-900 px-4 py-3 rounded-xl text-xs">
                                <span className="text-green-500">🔥</span> Personalized Training Plans
                            </div>
                            <div className="flex items-center gap-3 bg-[#0a0f1d]/60 border border-neutral-900 px-4 py-3 rounded-xl text-xs">
                                <span className="text-green-500">📈</span> Progress Tracking Dashboard
                            </div>
                            <div className="flex items-center gap-3 bg-[#0a0f1d]/60 border border-neutral-900 px-4 py-3 rounded-xl text-xs">
                                <span className="text-green-500">💬</span> Direct Trainer Messaging
                            </div>
                        </div>
                    </div>

                    <div className="text-[10px] text-gray-600 mt-8 lg:mt-0">
                        © 2026 FlexFlow. All rights reserved.
                    </div>
                </div>

                {/* Right Side: Dynamic Form System */}
                <div className="lg:col-span-7 p-8 md:p-10 flex flex-col justify-center">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-white mb-1.5">Create account</h1>
                        <p className="text-xs text-gray-500">
                            Already have an account?{' '}
                            <Link href="/login" className="text-green-500 hover:underline font-medium">
                                Sign in
                            </Link>
                        </p>
                    </div>

                    {/* Server-Side & Duplicate User Status Box */}
                    {serverError && (
                        <div className="w-full bg-red-950/30 border border-red-900 text-red-400 p-3.5 rounded-xl text-xs font-medium mb-5 flex items-center gap-2">
                            <span>⚠️</span> {serverError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name Input Field */}
                        <div>
                            <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Full Name</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Alex Johnson"
                                    className={`w-full bg-[#070b14] border ${errors.name ? 'border-red-500/50' : 'border-neutral-800 focus:border-green-500'} rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition-colors placeholder:text-gray-700`}
                                />
                            </div>
                            {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
                        </div>

                        {/* Email Input Field */}
                        <div>
                            <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Email address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className={`w-full bg-[#070b14] border ${errors.email ? 'border-red-500/50' : 'border-neutral-800 focus:border-green-500'} rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition-colors placeholder:text-gray-700`}
                            />
                            {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                        </div>

                        {/* Profile Image URL Input Field */}
                        <div>
                            <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Profile Image URL <span className="text-gray-600 font-normal text-[10px]">(Optional)</span></label>
                            <input
                                type="url"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="https://example.com/avatar.jpg"
                                className="w-full bg-[#070b14] border border-neutral-800 focus:border-green-500 rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition-colors placeholder:text-gray-700"
                            />
                        </div>

                        {/* Password Input Field */}
                        <div>
                            <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className={`w-full bg-[#070b14] border ${errors.password ? 'border-red-500/50' : 'border-neutral-800 focus:border-green-500'} rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition-colors placeholder:text-gray-700`}
                            />
                            {errors.password && <p className="text-[11px] text-red-500 mt-1">{errors.password}</p>}

                            {/* Password Rules Rule Tracker Interface */}
                            <div className="mt-3 bg-[#070b14] border border-neutral-900 rounded-xl p-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px]">
                                <div className={`flex items-center gap-1.5 ${passwordRules.length ? 'text-green-400' : 'text-gray-600'}`}>
                                    <span>{passwordRules.length ? '✓' : '•'}</span> Min 6 characters
                                </div>
                                <div className={`flex items-center gap-1.5 ${passwordRules.uppercase ? 'text-green-400' : 'text-gray-600'}`}>
                                    <span>{passwordRules.uppercase ? '✓' : '•'}</span> 1 Uppercase (A-Z)
                                </div>
                                <div className={`flex items-center gap-1.5 ${passwordRules.lowercase ? 'text-green-400' : 'text-gray-600'}`}>
                                    <span>{passwordRules.lowercase ? '✓' : '•'}</span> 1 Lowercase (a-z)
                                </div>
                            </div>
                        </div>

                        {/* Terms Notice and Form Action Button */}
                        <div className="pt-2">
                            <Button 
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-green-500 hover:bg-green-400 text-black font-bold text-xs py-3.5 rounded-xl transition-all shadow-lg shadow-green-500/10 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? "Processing Request..." : "Create Account →"}
                            </Button>
                            
                            <p className="text-[10px] text-gray-600 text-center mt-3 leading-relaxed">
                                By creating an account you agree to our{' '}
                                <Link href="/terms" className="underline hover:text-gray-400">Terms of Service</Link>
                                {' '}and{' '}
                                <Link href="/privacy" className="underline hover:text-gray-400">Privacy Policy</Link>.
                            </p>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}