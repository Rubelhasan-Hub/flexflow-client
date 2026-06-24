"use client";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'; // নতুন ইমপোর্ট
import { Button } from "@heroui/react";
import { ArrowRightFromSquare } from '@gravity-ui/icons';
import Link from 'next/link';
import Image from 'next/image';
import { authClient, useSession } from '@/lib/auth-client';

const NavbarPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname(); // বর্তমান রুটের জন্য

    const { data: session } = useSession();
    const user = session?.user;

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    window.location.reload();
                },
            },
        });
    };

    if (!mounted) return null;

    return (
        <nav className="w-full bg-[#0a0f1d] border-b border-neutral-900 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-3 h-16 py-10 flex items-center justify-between">

                {/* Logo Section */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="sm:hidden text-gray-300 focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>

                    <Link href="/">
                        <div className="flex items-center cursor-pointer gap-2">
                            <Image
                                src='/flexflow--logo.png'
                                alt='websites logo'
                                width={120}
                                height={90}
                                className="object-contain"
                            />
                            <p className="font-bold text-2xl tracking-wider text-white">
                                Flex<span className="text-green-500">Flow</span>
                            </p>
                        </div>
                    </Link>
                </div>

                {/* Desktop Links */}
                <div className="hidden sm:flex items-center gap-6">
                    <Link href="/" className={`${pathname === '/' ? 'text-green-500' : 'text-gray-300'} font-semibold text-xl transition-colors`}>Home</Link>
                    <Link href="/classes" className={`${pathname === '/classes' ? 'text-green-500' : 'text-gray-300 hover:text-green-500'} font-medium text-xl transition-colors`}>All Classes</Link>
                    <Link href="/forum" className={`${pathname === '/forum' ? 'text-green-500' : 'text-gray-300 hover:text-green-500'} font-medium text-xl transition-colors`}>Community Forum</Link>

                    {user && (
                        <Link href={`/dashboard/${user.role}`} className={`${pathname.startsWith('/dashboard') ? 'text-green-500' : 'text-gray-300 hover:text-green-500'} font-medium text-xl transition-colors`}>
                            Dashboard
                        </Link>
                    )}
                </div>

                {/* Auth Buttons */}
                <div className="flex items-center gap-3">
                    {user ? (
                        <div className="flex items-center gap-3">
                            <span className="text-gray-200 text-xl font-medium hidden md:inline-block">{user?.name}</span>
                            <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-green-500">
                                <Image height={38} width={58} src={user?.image || "/default-avatar.png"} alt={user?.name} className="w-full h-full object-cover" />
                            </div>
                            <Button color="danger" variant="light" size="xl" onClick={handleLogout} className="text-red-500 font-medium h-9 px-3 rounded-xl hover:bg-red-950/20 text-xl" startContent={<ArrowRightFromSquare className="w-4 h-4" />}>
                                Log Out
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link href="/signin" className="text-gray-200 hover:text-green-500 transition-colors text-sm font-medium">Login</Link>
                            <Button className="bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors h-9 px-4 rounded-xl">
                                <Link href="/signup">Register</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="sm:hidden bg-[#0a0f1d] border-b border-neutral-800 p-4 flex flex-col gap-4">
                    <Link href="/" className={`${pathname === '/' ? 'text-green-500' : 'text-gray-300'} font-medium`} onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link href="/classes" className={`${pathname === '/classes' ? 'text-green-500' : 'text-gray-300'} font-medium`} onClick={() => setIsMenuOpen(false)}>All Classes</Link>
                    <Link href="/forum" className={`${pathname === '/forum' ? 'text-green-500' : 'text-gray-300'} font-medium`} onClick={() => setIsMenuOpen(false)}>Community Forum</Link>
                    {user && (
                        <Link href={`/dashboard/${user.role}`} className={`${pathname.startsWith('/dashboard') ? 'text-green-500' : 'text-gray-300'} font-medium`} onClick={() => setIsMenuOpen(false)}>
                            Dashboard
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default NavbarPage;