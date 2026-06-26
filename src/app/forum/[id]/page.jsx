"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import { FiThumbsUp, FiThumbsDown, FiTrash2, FiSend } from "react-icons/fi";
import { toast } from "@heroui/react";

export default function PostDetails() {
    const { id } = useParams();
    const { data: session } = useSession();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [dbUser, setDbUser] = useState(null); // ব্লক স্ট্যাটাস চেক করার জন্য
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const fetchData = () => {
        fetch(`${baseUrl}/api/forum-posts/${id}`).then(res => res.json()).then(setPost);
        fetch(`${baseUrl}/api/comments/${id}`).then(res => res.json()).then(setComments);
        
        // ইউজারের স্ট্যাটাস চেক করার জন্য ফেচ
        if (session?.user?.email) {
            fetch(`http://localhost:5000/api/user/${session.user.email}`)
                .then(res => res.json())
                .then(data => setDbUser(data))
                .catch(err => console.error("User fetch error:", err));
        }
    };

    useEffect(() => { fetchData(); }, [id, baseUrl, session?.user?.email]);

    const handleVote = async (voteType) => {
        if (!session?.user) return;
        await fetch(`${baseUrl}/api/forum-posts/${id}/vote`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: session.user.email, voteType })
        });
        fetchData();
    };

    const handleComment = async () => {
        // এখানে চেক করা হচ্ছে ইউজার ব্লকড কি না
        if (dbUser?.status === 'blocked') {
            toast.danger("Action restricted by Admin");
            return;
        }
        if (!newComment.trim()) return;

        await fetch(`${baseUrl}/api/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ postId: id, text: newComment, userEmail: session.user.email, userName: session.user.name })
        });
        setNewComment("");
        fetchData();
    };

    const handleDeleteComment = async (commentId) => {
        await fetch(`${baseUrl}/api/comments/${commentId}`, { method: 'DELETE' });
        fetchData();
    };

    if (!post) return <div className="text-white p-20 text-center">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 md:p-12 text-white">
            <div className="relative w-full h-100 mb-8 rounded-3xl overflow-hidden shadow-2xl">
                <Image src={post.image} alt={post.title} fill className="object-cover" />
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">{post.title}</h1>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">{post.description}</p>

            <div className="flex gap-4 mb-12 bg-[#0a0f1d] p-3 rounded-2xl border border-neutral-800 w-fit">
                <button onClick={() => handleVote('like')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition ${post.likes?.includes(session?.user?.email) ? 'bg-green-500/20 text-green-400' : 'hover:bg-neutral-800'}`}>
                    <FiThumbsUp /> Like ({post.likes?.length || 0})
                </button>
                <button onClick={() => handleVote('dislike')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition ${post.dislikes?.includes(session?.user?.email) ? 'bg-red-500/20 text-red-400' : 'hover:bg-neutral-800'}`}>
                    <FiThumbsDown /> Dislike ({post.dislikes?.length || 0})
                </button>
            </div>

            <div className="pt-8 border-t border-neutral-800">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">Comments</h3>

                <div className="bg-[#0a0f1d] p-4 rounded-2xl border border-neutral-800 mb-8">
                    <textarea 
                        value={newComment} 
                        onChange={(e) => setNewComment(e.target.value)} 
                        className="w-full bg-transparent p-2 focus:outline-none" 
                        placeholder="Share your thoughts..." 
                        rows={3} 
                    />
                    <div className="flex justify-end mt-2">
                        <button 
                            onClick={handleComment} 
                            className={`flex items-center gap-2 px-5 py-2 rounded-lg font-bold transition ${dbUser?.status === 'blocked' ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-500 text-black hover:bg-green-400'}`}
                        >
                            <FiSend /> {dbUser?.status === 'blocked' ? "Blocked by Admin" : "Post"}
                        </button>
                    </div>
                </div>

                <div className="space-y-6">
                    {comments.map(c => (
                        <div key={c._id} className="group flex justify-between items-start p-5 rounded-2xl bg-[#0a0f1d] border border-neutral-800 hover:border-neutral-700 transition">
                            <div>
                                <p className="text-sm font-semibold text-green-400 mb-1">{c.userName}</p>
                                <p className="text-gray-300">{c.text}</p>
                            </div>
                            {session?.user?.email === c.userEmail && (
                                <button onClick={() => handleDeleteComment(c._id)} className="group-hover:opacity-100 text-white hover:text-red-500 transition">
                                    <FiTrash2 size={18} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}