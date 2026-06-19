"use client";
import React, { useState } from 'react';

import { Button, Avatar } from "@heroui/react";
import { ArrowRightFromSquare } from '@gravity-ui/icons';
import Link from 'next/link';
import Image from 'next/image';
import { authClient, useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

const NavbarPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { data: session, isPending } = useSession();
    const user = session?.user;

    console.log("Current User Data:", user);

    const menuItems = [
        { label: "Home", href: "/" },
        { label: "All Classes", href: "/classes" },
        { label: "Community Forum", href: "/forum" },
    ];

    const Router = useRouter();


    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    Router.push("/");
                },
            },
        });
    }

    return (
        <nav className="w-full bg-[#0a0f1d] border-b border-neutral-900 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

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

                <div className="hidden sm:flex items-center gap-6">
                    <Link href="/" className="text-green-500 font-semibold text-sm">Home</Link>
                    <Link href="/classes" className="text-gray-300 hover:text-green-500 font-medium text-sm transition-colors">All Classes</Link>
                    <Link href="/forum" className="text-gray-300 hover:text-green-500 font-medium text-sm transition-colors">Community Forum</Link>
                    {user?.role === "user" && (
                        <Link href="/dashboardUser" className="text-gray-300 hover:text-green-500 font-medium text-sm transition-colors">
                            Dashboard
                        </Link>
                    )}
                    {user?.role === "admin" && (
                        <Link href="/dashboardAdmin" className="text-gray-300 hover:text-green-500 font-medium text-sm transition-colors">
                            Dashboard
                        </Link>
                    )}
                    {user?.role === "trainer" && (
                        <Link href="/dashboardTrainer" className="text-gray-300 hover:text-green-500 font-medium text-sm transition-colors">
                            Dashboard
                        </Link>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    {user ? (
                        <div className="flex items-center gap-3">
                            <span className="text-gray-200 text-sm font-medium hidden md:inline-block">
                                {user?.name || "User"}
                            </span>

                            <Avatar
                                className="border-2 border-green-500 cursor-pointer text-white font-bold"
                                color="success"
                                name={user?.name ? user.name.substring(0, 2).toUpperCase() : "US"}
                                size="sm"
                                src={user?.image || user?.avatar || ""}
                            />

                            <Button
                                color="danger"
                                variant="light"
                                size="sm"
                                onClick={handleLogout}
                                className="text-red-500 font-medium h-9 px-3 rounded-xl hover:bg-red-950/20 transition-colors"
                                startContent={<ArrowRightFromSquare className="w-4 h-4" />}>
                                Log Out
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link href="/signin" className="text-gray-200 hover:text-green-500 transition-colors text-sm font-medium">
                                Login
                            </Link>
                            <Button as={Link} href="/signup" className="bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors h-9 px-4 rounded-xl">
                                <Link href="/signup">
                                    Register
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* মোবাইল মেনু */}
            {isMenuOpen && (
                <div className="sm:hidden bg-[#0a0f1d] border-t border-neutral-900 px-4 pt-2 pb-6 flex flex-col gap-3 shadow-lg absolute w-full left-0">
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            className="text-gray-200 hover:text-green-500 text-base font-medium py-2 border-b border-neutral-900"
                            href={item.href}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}

                    {user?.role === "user" && (
                        <Link
                            className="text-green-500 font-semibold text-base py-2 border-b border-neutral-900"
                            href="/dashboardUser"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Dashboard
                        </Link>
                    )}
                    {user?.role === "admin" && (
                        <Link
                            className="text-green-500 font-semibold text-base py-2 border-b border-neutral-900"
                            href="/dashboardAdmin"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Dashboard
                        </Link>
                    )}
                    {user?.role === "trainer" && (
                        <Link
                            className="text-green-500 font-semibold text-base py-2 border-b border-neutral-900"
                            href="/dashboardTrainer"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Dashboard
                        </Link>
                    )}

                    {!user && (
                        <div className="flex flex-col gap-2 mt-2">
                            <Button as={Link} href="/signin" variant="bordered" className="w-full border-green-600 text-green-500 h-10" onClick={() => setIsMenuOpen(false)}>
                                <Link href="/signin">
                                    Register
                                </Link>
                            </Button>
                            <Button as={Link} href="/signup" className="w-full bg-green-600 text-white h-10" onClick={() => setIsMenuOpen(false)}>
                                <Link href="/signup">
                                    Register
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default NavbarPage;