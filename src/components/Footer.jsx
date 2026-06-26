"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="w-full bg-[#080d16] text-gray-400 border-t border-neutral-900 transition-colors">
            <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                
                <div className="flex flex-col gap-4">
                    <p className="text-white font-semibold text-sm tracking-widest uppercase">Join Our Wave</p>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Get the latest updates on workout challenges, fresh class slots, and exclusive community events directly.
                    </p>
                    <div className="flex items-center bg-[#0d1520] border border-neutral-800 rounded-xl p-1.5 focus-within:border-green-600 transition-colors w-full">
                        <input 
                            type="email" 
                            placeholder="Your email address" 
                            className="bg-transparent pl-2.5 text-sm text-white w-full outline-none placeholder-gray-600"
                        />
                        <button className="bg-green-600 hover:bg-green-700 text-black font-bold text-xs h-9 px-4 rounded-lg transition-colors shrink-0">
                            Join
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <p className="text-white font-semibold text-sm tracking-widest uppercase">Get In Touch</p>
                    <div className="flex flex-col gap-3.5 text-sm">
            
                        <div className="flex items-start gap-2.5">
                            <svg className="w-5 h-5 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                <circle cx="12" cy="10" r="3"/>
                            </svg>
                            <span className="leading-relaxed">Cyber Hub, Level 4, Sector 11, Uttara, Dhaka</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <svg className="w-5 h-5 text-green-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                <polyline points="22,6 12,13 2,6"/>
                            </svg>
                            <span className="truncate">support@flexflow.com</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <svg className="w-5 h-5 text-green-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                            </svg>
                            <span>+880 1999-888777</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <p className="text-white font-semibold text-sm tracking-widest uppercase">Quick Links</p>
                    <div className="flex flex-col gap-2.5 text-sm">
                        <Link href="/classes" className="hover:text-green-600 transition-colors w-fit">Browse Classes</Link>
                        <Link href="/forum" className="hover:text-green-600 transition-colors w-fit">Discussions</Link>
                        <Link href="/" className="hover:text-green-600 transition-colors w-fit">Back to Home</Link>
                        <Link href="/dashboard" className="hover:text-green-600 transition-colors w-fit">Member Area</Link>
                    </div>
                </div>

                <div className="flex flex-col gap-4 lg:items-end lg:text-right">
                    <div className="gap-2 cursor-pointer lg:justify-end">
                        <Image src='/flexflow--logo.png' height={120} width={120} alt='websites logo'/>
                        <p className="font-bold text-xl tracking-wider text-white">
                            Flex<span className="text-green-600">Flow</span>
                        </p>
                    </div>
                    
                    <p className="text-xs leading-relaxed text-gray-500 max-w-xs">
                        A modern ecosystem designed to optimize your digital and physical fitness workflow.
                    </p>
                    
                    <div className="flex items-center gap-3 mt-2 lg:justify-end">
                        <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-xl bg-neutral-900 border border-neutral-800 hover:border-green-600 hover:text-white transition-all" aria-label="X">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                        </a>
                        {/* Instagram */}
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-xl bg-neutral-900 border border-neutral-800 hover:border-green-600 hover:text-white transition-all" aria-label="Instagram">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"/>
                            </svg>
                        </a>
                        {/* YouTube */}
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-xl bg-neutral-900 border border-neutral-800 hover:border-green-600 hover:text-white transition-all" aria-label="YouTube">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                            </svg>
                        </a>
                    </div>
                </div>

            </div>

            <div className="w-full border-t border-neutral-900 bg-[#050910] py-6">
                <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                    <p>© 2026 FlexFlow Ecosystem. All Rights Reserved.</p>
                    
                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="hover:text-green-600 transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-green-600 transition-colors">Terms of Use</Link>
                        <Link href="/support" className="hover:text-green-600 transition-colors">Help Desk</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;