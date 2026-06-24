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

    const passwordRules = {
        length: formData.password.length >= 6,
        uppercase: /[A-Z]/.test(formData.password),
        lowercase: /[a-z]/.test(formData.password)
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
        setServerError('');
    };

    // Image Upload Logic
    const uploadImageToImgBB = async (file) => {
        if (!file) return null;
        const imgData = new FormData();
        imgData.append('image', file);

        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API}`, {
                method: 'POST',
                body: imgData,
            });
            const data = await response.json();
            return data.success ? data.data.url : null;
        } catch (error) {
            console.error("Image upload failed:", error);
            return null;
        }
    };

    // File Handlers
    const processFile = (file) => {
        if (file && file.type.startsWith('image/')) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
            setErrors(prev => ({ ...prev, image: '' }));
        } else {
            setErrors(prev => ({ ...prev, image: "Please select a valid image file" }));
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") setIsDragActive(true);
        else if (e.type === "dragleave") setIsDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) processFile(e.dataTransfer.files[0]);
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) processFile(e.target.files[0]);
    };

    const triggerFileInput = () => fileInputRef.current.click();

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.name.trim()) tempErrors.name = "Full Name is required";
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Valid email is required";
        if (!formData.password || !passwordRules.length || !passwordRules.uppercase || !passwordRules.lowercase) {
            tempErrors.password = "Password does not meet requirements";
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
            let imageUrl = undefined;
            if (imageFile) {
                imageUrl = await uploadImageToImgBB(imageFile);
                if (!imageUrl) {
                    setServerError("Image upload failed. Please try again.");
                    setIsLoading(false);
                    return;
                }
            }

            const { error } = await authClient.signUp.email({
                email: formData.email,
                password: formData.password,
                name: formData.name,
                image: imageUrl,
                callbackURL: "/",
                additionalData: { role: "user" }
            });

            if (error) {
                setServerError(error.message || "Registration failed.");
                return;
            }
            window.location.href = "/";
        } catch (err) {
            setServerError("Something went wrong during registration!");
        } finally {
            setIsLoading(false);
        }
    };


    const handleGoogleLogin = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
    };

    return (
        <div className="w-full min-h-screen bg-[#070b12] text-gray-300 flex items-center justify-center p-4 md:p-8 font-sans selection:bg-green-500 selection:text-black">
            <div className="max-w-5xl w-full bg-[#0a0f1d] border border-neutral-900 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl">

                <div className="lg:col-span-5 bg-linear-to-b from-[#0f2916] to-[#07110a] p-10 flex flex-col justify-center items-center text-center relative min-h-[350px] lg:min-h-full">
                    <div className="absolute top-8 left-8 flex items-center gap-2">
                        <Image src="/flexflow--logo.png" height={20} width={20} alt="FlexFlow Logo" />
                        <p className="font-bold text-sm tracking-wide text-white">Flex<span className="text-green-500">Flow</span></p>
                    </div>

                    <div className="max-w-xs space-y-4">
                        <h2 className="text-3xl font-bold text-white tracking-tight">Welcome Friend!</h2>
                        <p className="text-xs text-gray-300/80 leading-relaxed">To keep connected with us please login with your personal info</p>
                        <div className="pt-4">
                            <Link href="/signin" className="inline-block border border-white/60 text-white hover:bg-white hover:text-black text-[11px] font-bold uppercase tracking-wider px-10 py-2.5 rounded-full transition-all">Sign In</Link>
                        </div>
                    </div>

                    <div className="absolute bottom-8 text-[9px] text-gray-500">© 2026 FlexFlow. All rights reserved.</div>
                </div>

                <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center bg-[#0a0f1d]">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-white mb-1.5 tracking-tight">Create account</h1>
                        <p className="text-xs text-gray-400">Already have an account? <Link href="/signin" className="text-green-500 hover:underline font-medium">Sign in</Link></p>
                    </div>

                    {serverError && (
                        <div className="w-full bg-red-950/20 border border-red-900/50 text-red-400 p-3.5 rounded-xl text-xs font-medium mb-5 flex items-center gap-2">
                            <span>⚠️</span> {serverError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Alex Johnson" className={`w-full bg-[#070b14] border ${errors.name ? 'border-red-500/50' : 'border-neutral-800/80 focus:border-green-500'} rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none transition-all`} />
                            {errors.name && <p className="text-[11px] text-red-500 mt-1.5">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Email address</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className={`w-full bg-[#070b14] border ${errors.email ? 'border-red-500/50' : 'border-neutral-800/80 focus:border-green-500'} rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none transition-all`} />
                            {errors.email && <p className="text-[11px] text-red-500 mt-1.5">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Profile Image <span className="text-gray-600 font-normal normal-case">(optional)</span></label>
                            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                            <div onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop} onClick={triggerFileInput} className={`w-full bg-[#070b14] border-2 border-dashed ${isDragActive ? 'border-green-500 bg-green-950/10' : 'border-neutral-800'} rounded-xl p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-23.75`}>
                                {imagePreview ? (
                                    <div className="flex items-center gap-4 w-full px-2">
                                        <div className="w-11 h-11 rounded-full overflow-hidden border border-neutral-800 relative shrink-0"><img src={imagePreview} alt="Preview" className="w-full h-full object-cover" /></div>
                                        <div className="text-left overflow-hidden"><p className="text-xs text-white font-medium truncate">{imageFile?.name}</p><p className="text-[10px] text-gray-500">{(imageFile?.size / 1024).toFixed(1)} KB</p></div>
                                    </div>
                                ) : (
                                    <p className="text-xs text-gray-400"><span className="text-green-500 font-semibold">Click to upload</span> or drag and drop</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Password</label>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className={`w-full bg-[#070b14] border ${errors.password ? 'border-red-500/50' : 'border-neutral-800/80 focus:border-green-500'} rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none transition-all`} />

                            <div className="mt-3 bg-[#070b14] border border-neutral-900/80 rounded-xl p-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px]">
                                <div className={`flex items-center gap-1.5 ${passwordRules.length ? 'text-green-400' : 'text-gray-600'}`}>• Min 6 chars</div>
                                <div className={`flex items-center gap-1.5 ${passwordRules.uppercase ? 'text-green-400' : 'text-gray-600'}`}>• 1 Uppercase</div>
                                <div className={`flex items-center gap-1.5 ${passwordRules.lowercase ? 'text-green-400' : 'text-gray-600'}`}>• 1 Lowercase</div>
                            </div>
                        </div>

                        <Button type="submit" disabled={isLoading} className="w-full bg-[#00ca62] hover:bg-[#00b557] text-black font-bold text-xs py-4 rounded-xl transition-all shadow-lg shadow-green-500/5">
                            {isLoading ? "Processing..." : "Create Account →"}
                        </Button>
                    </form>

                    <div style={styles.dividerRow}>
                        <div style={styles.line}></div>
                        <span style={styles.dividerText}>OR</span>
                        <div style={styles.line}></div>
                    </div>

                    {/* CONTINUED GOOGLE AUTH BUTTON */}
                    <button onClick={handleGoogleLogin} style={styles.googleBtn}>
                        <svg style={styles.googleIcon} viewBox="0 0 24 24" width="18" height="18">
                            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.53-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-8.17z" />
                            <path fill="#34A853" d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.08 1.16-3.13 0-5.78-2.11-6.73-4.96H1.21v3.15C3.18 21.88 7.31 24 12 24z" />
                            <path fill="#34A853" d="M5.27 14.24A7.16 7.16 0 0 1 5 12c0-.79.13-1.57.38-2.31V6.54H1.21A11.94 11.94 0 0 0 0 12c0 1.92.45 3.74 1.21 5.46l4.06-3.22z" />
                            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.18 2.12 1.21 5.46l4.06 3.22c.95-2.85 3.6-4.93 6.73-4.93z" />
                        </svg>
                        Continue with Google
                    </button>

                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#070a12',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '20px'
    },
    card: {
        width: '100%',
        maxWidth: '960px',
        backgroundColor: '#121826',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
    },
    leftSection: {
        flex: 1.1,
        background: 'linear-gradient(135deg, #112211 0%, #152c15 100%)',
        padding: '48px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative'
    },
    brandContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    brandIcon: {
        fontSize: '22px'
    },
    brandTitle: {
        color: '#34A853',
        fontSize: '22px',
        fontWeight: 'bold',
        margin: 0
    },
    leftMiddleContent: {
        margin: 'auto 0'
    },
    mainHeading: {
        color: '#ffffff',
        fontSize: '34px',
        fontWeight: '800',
        lineHeight: '1.2',
        marginBottom: '16px'
    },
    subText: {
        color: '#94a3b8',
        fontSize: '14px',
        lineHeight: '1.6',
        margin: 0
    },
    footerText: {
        color: '#64748b',
        fontSize: '12px',
        marginTop: '40px'
    },
    rightSection: {
        flex: 1,
        padding: '48px',
        backgroundColor: '#0f1420',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    formTitle: {
        color: '#ffffff',
        fontSize: '28px',
        fontWeight: '700',
        margin: 0
    },
    signUpText: {
        color: '#64748b',
        fontSize: '14px',
        marginTop: '6px',
        marginBottom: '24px'
    },
    linkText: {
        color: '#34A853',
        cursor: 'pointer',
        fontWeight: '600'
    },
    demoContainer: {
        marginBottom: '24px'
    },
    demoLabel: {
        color: '#64748b',
        fontSize: '11px',
        fontWeight: '700',
        letterSpacing: '0.05em',
        display: 'block',
        marginBottom: '8px'
    },
    btnRow: {
        display: 'flex',
        gap: '8px'
    },
    demoBtn: {
        padding: '6px 16px',
        backgroundColor: '#1a2236',
        border: '1px solid #2d3748',
        color: '#94a3b8',
        borderRadius: '20px',
        fontSize: '12px',
        cursor: 'pointer',
        transition: 'all 0.2s'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
    },
    label: {
        color: '#94a3b8',
        fontSize: '13px',
        fontWeight: '500'
    },
    inputWrapper: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
    },
    inputIcon: {
        position: 'absolute',
        left: '14px',
        color: '#475569',
        fontSize: '15px'
    },
    eyeIcon: {
        position: 'absolute',
        right: '14px',
        color: '#94a3b8',
        cursor: 'pointer',
        userSelect: 'none',
        fontSize: '16px'
    },
    input: {
        width: '100%',
        padding: '12px 40px 12px 40px',
        backgroundColor: '#090d16',
        border: '1px solid #1e293b',
        borderRadius: '8px',
        color: '#ffffff',
        fontSize: '14px',
        outline: 'none',
        transition: 'border-color 0.2s'
    },
    forgotRow: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '-4px'
    },
    forgotLink: {
        color: '#34A853',
        fontSize: '12px',
        cursor: 'pointer'
    },
    submitBtn: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#34A853',
        color: '#000000',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '700',
        cursor: 'pointer',
        marginTop: '8px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '6px'
    },
    dividerRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        margin: '20px 0'
    },
    line: {
        flex: 1,
        height: '1px',
        backgroundColor: '#1e293b'
    },
    dividerText: {
        color: '#475569',
        fontSize: '12px',
        fontWeight: '600'
    },
    googleBtn: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#090d16',
        border: '1px solid #1e293b',
        borderRadius: '8px',
        color: '#ffffff',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        transition: 'background-color 0.2s'
    },
    googleIcon: {
        display: 'block'
    },
    errorAlert: {
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        border: '1px solid #ef4444',
        color: '#f87171',
        padding: '12px',
        borderRadius: '8px',
        fontSize: '13px',
        marginBottom: '16px'
    },
    successAlert: {
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        border: '1px solid #22c55e',
        color: '#4ade80',
        padding: '12px',
        borderRadius: '8px',
        fontSize: '13px',
        marginBottom: '16px'
    }
};