"use client";
import React, { useState } from 'react';

// প্রয়োজনীয় UI মডিউল
import { Button, Avatar } from "@heroui/react";
import { ArrowRightFromSquare } from '@gravity-ui/icons';
import Link from 'next/link';
import Image from 'next/image';

const NavbarPage = ({ user }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        { label: "Home", href: "/" },
        { label: "All Classes", href: "/classes" },
        { label: "Community Forum", href: "/forum" },
    ];

    return (
        <nav className="w-full bg-[#0a0f1d] border-b border-neutral-900 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

                {/* বাম পাশ: মোবাইল মেনু বাটন এবং লোগো */}
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
                        <div className="flex items-center cursor-pointer">
                            <Image src='/flexflow--logo.png' height={120} width={120} alt='websites logo' />
                            <p className="font-bold text-xl tracking-wider text-white">
                                Flex<span className="text-green-500">Flow</span>
                            </p>
                        </div>
                    </Link>
                </div>

                {/* মাঝখানে: ডেক্সটপ নেভিগেশন লিংকসমূহ */}
                <div className="hidden sm:flex items-center gap-6">
                    <Link href="/" className="text-green-500 font-semibold text-sm">Home</Link>
                    <Link href="/classes" className="text-gray-300 hover:text-green-500 font-medium text-sm transition-colors">All Classes</Link>
                    <Link href="/forum" className="text-gray-300 hover:text-green-500 font-medium text-sm transition-colors">Community Forum</Link>

                    {user?.role === "admin" && (
                        <Link href="/dashboard" className="text-gray-300 hover:text-green-500 font-medium text-sm transition-colors">
                            Dashboard
                        </Link>
                    )}
                </div>

                {/* ডান পাশ: অ্যাকশন বাটন এবং ইউজার কন্ডিশনাল পার্ট */}
                <div className="flex items-center gap-3">
                    {user ? (
                        /* ইউজার লগইন থাকলে: সরাসরি ছবি এবং লগআউট বাটন */
                        <div className="flex items-center gap-3">
                            <Avatar
                                className="border-2 border-green-500"
                                color="success"
                                name={user?.name || "User"}
                                size="sm"
                                src={user?.avatar}
                            />
                            {/* সরাসরি লগ আউট বাটন */}
                            <Button
                                color="danger"
                                variant="light"
                                size="sm"
                                className="text-red-500 font-medium h-9 px-3 rounded-xl hover:bg-red-950/20 transition-colors"
                                startContent={<ArrowRightFromSquare className="w-4 h-4" />}
                                onClick={() => console.log("Logging out...")} // আপনার লগআউট ফাংশন এখানে বসবে
                            >
                                Log Out
                            </Button>
                        </div>
                    ) : (
                        /* ইউজার লগইন না থাকলে: শুধু লগইন এবং রেজিস্টার বাটন */
                        <div className="flex items-center gap-3">
                            <Link href="/login" className="text-gray-200 hover:text-green-500 transition-colors text-sm font-medium">
                                Login
                            </Link>
                            <Button as={Link} className="bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors h-9 px-4 rounded-xl" href="/register">
                                Register
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* মোবাইল মেনু */}
            {isMenuOpen && (
                <div className="sm:hidden bg-[#0a0f1d] border-t border-neutral-900 px-4 pt-2 pb-6 flex flex-col gap-3 shadow-lg absolute w-full left-0 transition-all">
                    {menuItems.map((item, index) => (
                        <Link
                            key={`${item.label}-${index}`}
                            className="text-gray-200 hover:text-green-500 text-base font-medium py-2 border-b border-neutral-900"
                            href={item.href}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}

                    {user?.role === "admin" && (
                        <Link
                            className="text-green-500 font-semibold text-base py-2 border-b border-neutral-900"
                            href="/dashboard"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Dashboard
                        </Link>
                    )}

                    {/* মোবাইল স্ক্রিনে ইউজার না থাকলে লগইন/রেজিস্টার অপশন */}
                    {!user && (
                        <div className="flex flex-col gap-2 mt-2">
                            <Button as={Link} href="/login" variant="bordered" className="w-full border-green-600 text-green-500 h-10 font-medium" onClick={() => setIsMenuOpen(false)}>
                                Login
                            </Button>
                            <Button as={Link} href="/register" className="w-full bg-green-600 text-white h-10 font-medium" onClick={() => setIsMenuOpen(false)}>
                                Register
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default NavbarPage;