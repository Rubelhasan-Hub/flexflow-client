"use client";
import React, { useEffect, useState } from 'react';

export default function ForumPostManagePage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/forum-posts`);
            const data = await res.json();
            setPosts(data.posts || []); // ✅ data.posts নিন
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/forum-posts/${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                fetchPosts();
            }
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    return (
        <div className="p-6 bg-[#0a0f1d] min-h-screen text-white">
            <h2 className="text-2xl font-bold mb-6">Forum Post Moderation</h2>

            {loading ? (
                <div className="text-neutral-500">Loading posts...</div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-[#0f172a]">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-neutral-900 text-neutral-400 text-xs uppercase">
                            <tr>
                                <th className="p-4">Author</th>
                                <th className="p-4">Post Title</th>
                                <th className="p-4">Date</th>
                                <th className="p-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800">
                            {posts.length > 0 ? (
                                posts.map((post) => (
                                    <tr key={post._id} className="hover:bg-neutral-900/50">
                                        <td className="p-4 text-sm font-medium">{post.authorName || "Anonymous"}</td>
                                        <td className="p-4 text-sm">{post.title.length > 50 ? post.title.substring(0, 50) + "..." : post.title}</td>
                                        <td className="p-4 text-sm text-neutral-400">
                                            {new Date(post.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 text-center">
                                            <button
                                                onClick={() => handleDelete(post._id)}
                                                className="bg-red-600 hover:bg-red-700 px-4 py-1.5 rounded text-xs font-semibold transition"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-neutral-500">
                                        No forum posts found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}