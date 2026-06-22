"use client";
import { useEffect, useState } from 'react';
import { useSession } from '@/lib/auth-client';
import { Trash2, Heart, Clock, User, AlertCircle } from 'lucide-react';
import Image from 'next/image';

export default function FavoritesPage() {
    const { data: session } = useSession();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchFavorites = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/favorites/${session?.user?.email}`);
            const data = await res.json();
            setFavorites(data);
        } catch (error) {
            console.error("Error fetching:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (session?.user?.email) fetchFavorites();
    }, [session]);

    const handleRemove = async (id) => {
        // if (!confirm("Are you sure you want to remove this?")) return;
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/favorites/${id}`, { method: 'DELETE' });
        fetchFavorites();
    };

    if (loading) return <div className="p-8 text-center">Loading your favorites...</div>;

    return (
        <div className="min-h-screen p-4 md:p-8">
            <h1 className="text-3xl font-black mb-8 flex items-center gap-2">
                <Heart className="text-red-500 fill-red-500" /> My Favorite Classes
            </h1>

            {favorites.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 ">
                    <AlertCircle size={48} className="mb-4" />
                    <p className="text-lg text-white">You have not added any classes to favorites yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map((fav) => (
                        <div key={fav._id} className="rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-5">
                                <h2 className="text-xl font-bold text-white mb-2">{fav.classDetails.className}</h2>
                                <div className="space-y-2text-sm mb-4">
                                    <div className="flex items-center gap-2">
                                        <User size={16} /> {fav.classDetails.trainerName}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Image  width={500} height={500} src={fav.classDetails.classImage} alt={fav.classDetails.className}></Image>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => handleRemove(fav._id)}
                                    className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-2.5 rounded-lg transition-colors cursor-pointer"
                                >
                                    <Trash2 size={18} /> Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}