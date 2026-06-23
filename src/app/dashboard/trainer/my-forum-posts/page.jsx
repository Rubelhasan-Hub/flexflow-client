"use client";
import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { Trash2, Loader2 } from "lucide-react";
import Image from "next/image";

export default function MyForumPosts() {
    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    // useEffect এর ভেতরে সরাসরি লজিক রাখলে কম্পাইলার এরর দেয় না
    useEffect(() => {
        const fetchMyPosts = async () => {
            if (!session?.user?.email) return;
            
            setLoading(true);
            try {
                const res = await fetch(`${baseUrl}/api/forum-posts`);
                const data = await res.json();
                // ফিল্টার করা ডাটা
                const myPosts = data.filter(p => p.authorEmail === session.user.email);
                setPosts(myPosts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMyPosts();
    }, [session?.user?.email, baseUrl]); // শুধুমাত্র এই দুটি চেঞ্জ হলেই ডাটা রি-ফেচ হবে

    const handleDelete = async (id) => {
        // const isConfirmed = window.confirm("Are you sure? This action cannot be undone.");
        // if (!isConfirmed) return;

        try {
            const res = await fetch(`${baseUrl}/api/forum-posts/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setPosts(prev => prev.filter(post => post._id !== id));
            } else {
                alert("Failed to delete the post.");
            }
        } catch (error) {
            alert("Error occurred while deleting.");
        }
    };

    if (loading) return <div className="p-10 text-center text-white"><Loader2 className="animate-spin mx-auto" /> Loading...</div>;

    return (
        <div className="p-10 text-white max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">My Forum Posts</h1>
            
            {posts.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-neutral-800 rounded-2xl">
                    <p className="text-gray-500">You have not created any posts yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map(post => (
                        <div key={post._id} className="bg-[#0a0f1d] rounded-2xl border border-neutral-800 p-5 flex flex-col hover:border-neutral-600 transition-all duration-300">
                            {post.image && (
                                <div className="relative w-full h-40 mb-4">
                                    <Image fill src={post.image} alt="Post" className="object-cover rounded-xl" />
                                </div>
                            )}
                            <h2 className="font-bold text-xl mb-2 grow">{post.title}</h2>
                            <p className="text-gray-400 text-sm mb-4 line-clamp-3">{post.description}</p>
                            
                            <button 
                                onClick={() => handleDelete(post._id)}
                                className="flex items-center justify-center gap-2 w-full py-2 bg-red-950/20 text-red-500 border border-red-900/50 rounded-lg hover:bg-red-600 hover:text-white transition-all"
                            >
                                <Trash2 size={18} /> Delete Post
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}