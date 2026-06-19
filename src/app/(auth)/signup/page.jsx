"use client";
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@heroui/react";
import { authClient } from '@/lib/auth-client';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [isDragActive, setIsDragActive] = useState(false);
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fileInputRef = useRef(null);

    // Password verification rules tracking
    const passwordRules = {
        length: formData.password.length >= 6,
        uppercase: /[A-Z]/.test(formData.password),
        lowercase: /[a-z]/.test(formData.password)
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        setServerError('');
    };

    // Drag and drop events logic handlers
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragActive(true);
        } else if (e.type === "dragleave") {
            setIsDragActive(false);
        }
    };

    const processFile = (file) => {
        if (file && file.type.startsWith('image/')) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
            if (errors.image) {
                setErrors(prev => ({ ...prev, image: '' }));
            }
        } else {
            setErrors(prev => ({ ...prev, image: "Please select a valid image file" }));
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

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
            tempErrors.password = "Password does not meet validation requirements";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

const [isSuccess, setIsSuccess] = useState(false); // সাকসেস মেসেজের জন্য

const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setServerError('');
    setIsSuccess(false); // নতুন করে ট্রাই করলে সাকসেস মেসেজ মুছে যাবে

    try {
        const { data, error } = await authClient.signUp.email({
            email: formData.email,
            password: formData.password,
            name: formData.name,
            image: imagePreview || undefined,
            callbackURL: "/",
            // Better-Auth এ রোল পাঠানোর স্ট্যান্ডার্ড উপায়
            additionalData: {
                role: "user" 
            }
        });

        if (error) {
            setServerError(error.message || "Registration failed.");
            return;
        }

        // সফল হলে
        setIsSuccess(true);
        console.log("Registration Successful!");
        
        // চাইলে ২ সেকেন্ড পর রিডাইরেক্ট করতে পারেন
        setTimeout(() => {
            window.location.href = "/dashboard"; 
        }, 2000);

    } catch (err) {
        setServerError("Something went wrong!");
    } finally {
        setIsLoading(false);
    }
};

    return (
        <div className="w-full min-h-screen bg-[#070b12] text-gray-300 flex items-center justify-center p-4 md:p-8 font-sans selection:bg-green-500 selection:text-black">
            <div className="max-w-5xl w-full bg-[#0a0f1d] border border-neutral-900 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl">
                
                {/* Left Side Section */}
                <div className="lg:col-span-5 bg-linear-to-b from-[#0f2916] to-[#07110a] p-10 flex flex-col justify-center items-center text-center relative min-h-[350px] lg:min-h-full">
                    {/* Floating Branding Header */}
                    <div className="absolute top-8 left-8 flex items-center gap-2">
                        <Image src="/flexflow--logo.png" height={20} width={20} alt="FlexFlow Logo" />
                        <p className="font-bold text-sm tracking-wide text-white">
                            Flex<span className="text-green-500">Flow</span>
                        </p>
                    </div>

                    <div className="max-w-xs space-y-4">
                        <h2 className="text-3xl font-bold text-white tracking-tight">
                            Welcome Friend!
                        </h2>
                        <p className="text-xs text-gray-300/80 leading-relaxed">
                            To keep connected with us please login with your personal info
                        </p>
                        
                        <div className="pt-4">
                            <Link 
                                href="/signin" 
                                className="inline-block border border-white/60 text-white hover:bg-white hover:text-black text-[11px] font-bold uppercase tracking-wider px-10 py-2.5 rounded-full transition-all"
                            >
                                Sign In
                            </Link>
                        </div>
                    </div>

                    <div className="absolute bottom-8 text-[9px] text-gray-500">
                        © 2026 FlexFlow. All rights reserved.
                    </div>
                </div>

                {/* Right Side Section */}
                <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center bg-[#0a0f1d]">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-white mb-1.5 tracking-tight">Create account</h1>
                        <p className="text-xs text-gray-400">
                            Already have an account?{' '}
                            <Link href="/login" className="text-green-500 hover:underline font-medium">
                                Sign in
                            </Link>
                        </p>
                    </div>

                    {/* Authentication Server Errors Display Banner */}
                    {serverError && (
                        <div className="w-full bg-red-950/20 border border-red-900/50 text-red-400 p-3.5 rounded-xl text-xs font-medium mb-5 flex items-center gap-2">
                            <span>⚠️</span> {serverError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Input Component: Full Name */}
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Alex Johnson"
                                className={`w-full bg-[#070b14] border ${errors.name ? 'border-red-500/50' : 'border-neutral-800/80 focus:border-green-500'} rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none transition-all placeholder:text-gray-700`}
                            />
                            {errors.name && <p className="text-[11px] text-red-500 mt-1.5">{errors.name}</p>}
                        </div>

                        {/* Input Component: Email Address */}
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Email address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className={`w-full bg-[#070b14] border ${errors.email ? 'border-red-500/50' : 'border-neutral-800/80 focus:border-green-500'} rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none transition-all placeholder:text-gray-700`}
                            />
                            {errors.email && <p className="text-[11px] text-red-500 mt-1.5">{errors.email}</p>}
                        </div>

                        {/* Drag and Drop Profile Picture */}
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                                Profile Image <span className="text-gray-600 font-normal normal-case">(optional)</span>
                            </label>
                            
                            <input 
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                            />

                            <div 
                                onDragEnter={handleDrag}
                                onDragOver={handleDrag}
                                onDragLeave={handleDrag}
                                onDrop={handleDrop}
                                onClick={triggerFileInput}
                                className={`w-full bg-[#070b14] border-2 border-dashed ${isDragActive ? 'border-green-500 bg-green-950/10' : 'border-neutral-800 hover:border-neutral-700'} rounded-xl p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-23.75`}
                            >
                                {imagePreview ? (
                                    <div className="flex items-center gap-4 w-full px-2">
                                        <div className="w-11 h-11 rounded-full overflow-hidden border border-neutral-800 relative shrink-0">
                                            {/* FIXED: Next.js <Image> বদলে স্ট্যান্ডার্ড <img> ট্যাগ করা হয়েছে blob এরর এড়াতে */}
                                            <img src={imagePreview} alt="Upload preview" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="text-left overflow-hidden">
                                            <p className="text-xs text-white font-medium truncate max-w-60">{imageFile?.name}</p>
                                            <p className="text-[10px] text-gray-500">{(imageFile?.size / 1024).toFixed(1)} KB — Click to change</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-1">
                                        <p className="text-xs text-gray-400">
                                            <span className="text-green-500 font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-[10px] text-gray-600">SVG, PNG, JPG or GIF</p>
                                    </div>
                                )}
                            </div>
                            {errors.image && <p className="text-[11px] text-red-500 mt-1.5">{errors.image}</p>}
                        </div>

                        {/* Input Component: Password */}
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className={`w-full bg-[#070b14] border ${errors.password ? 'border-red-500/50' : 'border-neutral-800/80 focus:border-green-500'} rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none transition-all placeholder:text-gray-700`}
                            />
                            
                            {errors.password && <p className="text-[11px] text-red-500 mt-1.5">{errors.password}</p>}

                            {/* Verification Criteria Status Bar Row */}
                            <div className="mt-3 bg-[#070b14] border border-neutral-900/80 rounded-xl p-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px]">
                                <div className={`flex items-center gap-1.5 ${passwordRules.length ? 'text-green-400 font-medium' : 'text-gray-600'}`}>
                                    <span>•</span> Min 6 characters
                                </div>
                                <div className={`flex items-center gap-1.5 ${passwordRules.uppercase ? 'text-green-400 font-medium' : 'text-gray-600'}`}>
                                    <span>•</span> 1 Uppercase (A-Z)
                                </div>
                                <div className={`flex items-center gap-1.5 ${passwordRules.lowercase ? 'text-green-400 font-medium' : 'text-gray-600'}`}>
                                    <span>•</span> 1 Lowercase (a-z)
                                </div>
                            </div>
                        </div>

                        {/* Submit Button Trigger Context */}
                        <div className="pt-2">
                            <Button 
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#00ca62] hover:bg-[#00b557] text-black font-bold text-xs py-4 rounded-xl transition-all shadow-lg shadow-green-500/5 flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isLoading ? "Processing Request..." : "Create Account →"}
                            </Button>
                            
                            <p className="text-[10px] text-gray-600 text-center mt-4 leading-relaxed">
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