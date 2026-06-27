"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from '@gravity-ui/icons';

export default function HomePage({ classes: rawClasses }) {
    // FIX: Safely extract the array. If rawClasses is an object, get the 'classes' property; otherwise, use it as is.
    const classes = rawClasses?.classes || rawClasses || [];

    // Latest Forum Posts Mock Data (3 most recent posts)
    const latestPosts = [
        { id: 1, title: "Crushing the Mental Barrier: How to Stay Consistent When You Want to Quit", author: "Admin", time: "2 hours ago", replies: 24, category: "Mindset" },
        { id: 2, title: "The Science of Progressive Overload – Build Real Muscle Fast", author: "Trainer Alex", time: "5 hours ago", replies: 18, category: "Training" },
        { id: 3, title: "Fueling the Machine: Pre and Post Workout Nutrition Strategies", author: "Rahat K.", time: "1 day ago", replies: 45, category: "Nutrition" },
    ];

    // Framer Motion Animation Variants (Safe Configuration)
    const fadeInUp = {
        hidden: { opacity: 0, y: 25 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };


    const [posts, setPosts] = useState([]);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    useEffect(() => {
        fetch(`${baseUrl}/api/forum-posts`)
            .then(res => res.json())
            .then(data => {
                setPosts(data.posts || []);
            })
            .catch(err => console.error("Error:", err));
    }, [baseUrl]);

    return (
        <div className="w-full bg-[#0a0f1d] text-gray-300 font-sans selection:bg-green-500 selection:text-black overflow-hidden">
            {/* ================= 1. BANNER / HERO SECTION ================= */}
            <section className="relative md:min-h-screen flex items-center justify-center pb-16">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(34,197,94,0.08),transparent_50%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,15,29,0)_60%,#0a0f1d_100%)]" />

                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
                    {/* Left Content */}
                    <div className="lg:col-span-7 flex flex-col items-start text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium tracking-wide mb-6">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            NO EXCUSES • JUST RESULTS
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
                            Pain Is Temporary. <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-green-400 to-emerald-500">Pride Is Forever.</span>
                        </h1>

                        <p className="text-gray-400 text-base md:text-lg max-w-xl mb-10 leading-relaxed">
                            Your body can stand almost anything. It is your mind that you have to convince. Wake up with determination, crush your daily targets, and go to bed with absolute satisfaction.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                            {/* Requirement: Explore Classes CTA Button */}
                            <Link href="/classes">
                                <button className="cursor-pointer bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-4 rounded-xl shadow-lg shadow-green-500/20 transition-all transform hover:-translate-y-0.5">
                                    Explore Classes
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Right Interactive Images */}
                    <div className="lg:col-span-5 grid grid-cols-12 gap-4 relative w-full h-100 sm:h-112.5">
                        <div className="col-span-7 h-full rounded-2xl overflow-hidden border border-neutral-800 relative group bg-neutral-900/40">
                            <Image height={200} width={300} src="/homepage.jpg" alt="Grind harder" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                        <div className="col-span-5 flex flex-col gap-4 h-full">
                            <div className="h-1/2 rounded-2xl overflow-hidden border border-neutral-800 relative group bg-neutral-900/40">
                                <Image height={100} width={150} src="/charles-gaudreault-xXofYCc3hqc-unsplash.jpg" alt="Stay focused" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                            <div className="h-1/2 rounded-2xl overflow-hidden border border-neutral-800 relative group bg-neutral-900/40">
                                <Image height={100} width={150} src="/wp12424948-fitness-4k-wallpapers.jpg" alt="Push limits" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* ================= EXTRA STATIC SECTION 1: METRICS ================= */}
            <section className="w-full py-10 bg-[#070b14] border-y border-neutral-900/60">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { value: "500k+", label: "Calories Burned" },
                        { value: "100%", label: "Pure Dedication", color: "text-green-400" },
                        { value: "24/7", label: "No Rest Days" },
                        { value: "0", label: "Excuses Allowed", color: "text-green-400" }
                    ].map((stat, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <p className={`text-2xl sm:text-3xl md:text-4xl font-extrabold text-white ${stat.color || ''}`}>{stat.value}</p>
                            <p className="text-xs text-gray-500 uppercase tracking-widest font-medium mt-1.5">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>


            {/* ================= 2. DYNAMIC SECTION 1: FEATURED CLASSES ================= */}
            <section className="max-w-7xl mx-auto px-4 py-10 md:py-10">
                <div className="text-center mb-16">
                    <p className="text-green-400 font-semibold text-xs uppercase tracking-widest mb-2">CHOOSE YOUR WAR</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Elite Training Programs</h2>
                    <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto">Success does not just find you. You have to go out and get it. Pick a discipline and dominate.</p>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {classes.slice(0, 3).map((item) => (
                        <motion.div
                            key={item._id}
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.05 }}
                            className="bg-[#0e1424] border border-neutral-900 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-neutral-800 hover:shadow-2xl hover:shadow-black/40 transition-all duration-300 group"
                        >
                            {/* Card Image Area */}
                            <div className="h-52 w-full overflow-hidden relative bg-neutral-900/40">
                                <Image height={200} width={300} src={item.classImage} alt={item.className} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-neutral-800 text-green-400 text-xs px-2.5 py-1 rounded-md font-medium">
                                    {item.category}
                                </div>
                                <div className="absolute bottom-3 left-4 text-xs text-gray-300 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded">
                                    🔥 {item.bookings} Warriors Joined
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-6 flex-1 flex flex-col justify-between">
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-green-400 transition-colors">{item.className}</h3>
                                </div>

                                <div className="pt-4 border-t border-neutral-900 flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-gray-500 uppercase tracking-wider">Time / Duration</span>
                                        <span className="text-sm font-semibold text-gray-300">{item.duration} | <b className="text-green-400">{item.price}</b></span>
                                    </div>
                                    <div className="text-right">
                                        {/* Requirement: Details Button */}
                                        <Link href={`/classes/${item._id}`}>
                                            <button className="bg-neutral-900 hover:bg-green-500 text-gray-300 hover:text-black border border-neutral-800 hover:border-green-500 text-xs font-bold px-4 py-2 rounded-lg transition-all">
                                                View Details
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
            <div className='flex justify-center text-xl'>
                <Link href='/classes' className="flex justify-content text-green-500">
                    <div className='flex items-center justify-center gap-2'>
                        <p className='pb-0.4 border-b border-green-500'>View All Classes</p>
                        <ArrowRight />
                    </div>
                </Link>
            </div>


            {/* ================= EXTRA STATIC SECTION 2: BMI CALCULATOR ================= */}
            <section className="w-full bg-[#070b14] py-20 md:py-24 border-y border-neutral-900/60">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-6">
                        <span className="text-green-400 font-semibold text-xs uppercase tracking-widest block mb-2">KNOW YOUR RIVAL</span>
                        <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">Evaluate Your Starting Point</h2>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6">
                            The mirror shows your progress, but numbers reveal the truth. Calculate your Body Mass Index right now to map your trajectory toward peak performance.
                        </p>
                        <ul className="grid grid-cols-2 gap-3 text-xs text-gray-500">
                            <li>• Under 18.5 — Underweight</li>
                            <li>• 18.5 – 24.9 — Normal Weight</li>
                            <li>• 25.0 – 29.9 — Overweight</li>
                            <li>• 30.0 + Above — Obese</li>
                        </ul>
                    </div>

                    <div className="lg:col-span-6 bg-[#0e1424] border border-neutral-900 rounded-2xl p-6 md:p-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase text-gray-400 mb-2">Mass (KG)</label>
                                <input type="number" placeholder="e.g. 75" className="w-full bg-[#070b14] border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase text-gray-400 mb-2">Stature (CM)</label>
                                <input type="number" placeholder="e.g. 175" className="w-full bg-[#070b14] border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500" />
                            </div>
                        </div>
                        <button className="w-full bg-green-500 hover:bg-green-400 text-black font-bold text-sm py-3.5 rounded-xl transition-all">
                            Calculate BMI
                        </button>
                    </div>
                </div>
            </section>


            {/* ================= 3. DYNAMIC SECTION 2: LATEST FORUM POSTS ================= */}
            <section className="max-w-7xl mx-auto px-4 py-20 md:py-28">
                <div className="text-center mb-16">
                    <p className="text-green-400 font-semibold text-xs uppercase tracking-widest mb-2">THE COMMUNITY</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Latest From Our Forum</h2>
                    <p className="text-gray-500 text-sm mt-3 max-w-sm mx-auto">Surround yourself with those on the same mission. Read, learn, and share your victories.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {
                        Array.isArray(posts) && posts.slice(0, 3).map((post, index) => (
                            <motion.div
                                key={post._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-[#0a0f1d] border border-neutral-800 rounded-2xl overflow-hidden hover:border-green-500/50 transition-all duration-300 group"
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <Image width={500} height={500} alt={post.title} src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-green-400 border border-white/10">
                                        {post.authorRole || "Trainer"}
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h2 className="text-xl font-bold mb-3 line-clamp-1 group-hover:text-green-500 transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                                        {post.description}
                                    </p>

                                    <div className="flex items-center justify-between border-t border-neutral-800 pt-4">
                                        <span className="text-[10px] text-neutral-500 font-medium">By {post.authorName}</span>
                                        <Link href={`/forum/${post._id}`}>
                                            <button className="bg-white text-black px-4 py-2 rounded-lg font-bold text-xs hover:bg-green-500 transition-colors cursor-pointer">
                                                Read More
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    }

                </div>
            </section>

            <div className='flex justify-center text-xl'>
                <Link href='/forum' className="flex justify-content text-green-500">
                    <div className='flex items-center justify-center gap-2'>
                        <p className='pb-0.4 border-b border-green-500'>View All forum posts</p>
                        <ArrowRight />
                    </div>
                </Link>
            </div>
        </div>
    );
}