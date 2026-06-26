"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "@gravity-ui/icons"; // অথবা আপনার নিজস্ব আইকন

export default function ForumPage() {
    const [postsData, setPostsData] = useState({ posts: [], totalPages: 1 });
    const [page, setPage] = useState(1);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    useEffect(() => {
        fetch(`${baseUrl}/api/forum-posts?page=${page}&limit=6`)
            .then(res => res.json())
            .then(data => {
                setPostsData(data);
            })
            .catch(err => {
                console.error("Error:", err);
            });
    }, [baseUrl, page]);

    return (
        <div className="min-h-screen bg-[#070b12] text-white py-16 px-6 md:px-20">
            {/* Header Section */}
            <div className="max-w-3xl mx-auto text-center mb-16">
                <h1 className="text-5xl font-black mb-4">Community <span className="text-green-500">Forum</span></h1>
                <p className="text-gray-400">Connect with trainers, share your fitness journey, and learn from the community.</p>
            </div>

            {/* Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {postsData.posts.map((post, index) => (
                        <motion.div
                            key={post._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-[#0a0f1d] border border-neutral-800 rounded-2xl overflow-hidden hover:border-green-500/50 transition-all duration-300 group"
                        >
                            <div className="relative h-56 overflow-hidden">
                                <Image width={500} height={500} alt={post.title} src={post.image || "/placeholder.jpg"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
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
                                        <button className="bg-white text-black px-4 py-2 rounded-lg font-bold text-xs hover:bg-green-500 transition-colors">
                                            Read More
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-6 mt-16">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    className="flex items-center gap-2 bg-green-700 px-5 py-2 rounded-lg font-bold text-sm hover:bg-green-500"
                >
                    <ArrowLeft size={16} /> Previous
                </button>

                <span className="text-white font-black tracking-widest text-sm">
                    PAGE {page} OF {postsData.totalPages}
                </span>

                <button
                    disabled={page >= postsData.totalPages}
                    onClick={() => setPage(prev => Math.min(prev + 1, postsData.totalPages))}
                    className="flex items-center gap-2 bg-green-700 px-5 py-2 rounded-lg font-bold text-sm hover:bg-green-500"
                >
                    Next <ArrowRight size={16} />
                </button>
            </div>
        </div>
    );
}