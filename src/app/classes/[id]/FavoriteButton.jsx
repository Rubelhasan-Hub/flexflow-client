"use client";
import { useState, useEffect } from "react";
import { Button, toast } from "@heroui/react";
import { Heart } from "lucide-react";

export default function FavoriteButton({ classData, userEmail }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const checkFavorite = async () => {
            if (!userEmail) return;
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/favorites/${userEmail}`);
                const data = await res.json();
                

                const exists = data.find(fav => fav.classId === classData._id.toString());
                if (exists) setIsFavorite(true);
            } catch (error) {
                console.error("Error checking favorites:", error);
            }
        };
        checkFavorite();
    }, [userEmail, classData._id]);

    const handleAddToFavorites = async () => {
        if (!userEmail) return alert("Please login first!");
        
        if (isFavorite) return;

        setLoading(true);
        try {
            const payload = {
                classId: classData._id.toString(),
                userEmail: userEmail,
                classDetails: {
                    className: classData.className,
                    classImage: classData.classImage,
                    trainerName: classData.trainerName
                }
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/favorites`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                setIsFavorite(true);
                toast.success("Successfully added to your favorites!");
            } else if (response.status === 400) {
                setIsFavorite(true)
                toast.danger("This class is already in your favorites!");
            }
        } catch (error) {
           toast.danger("Error adding to favorites:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            variant="bordered"
            onClick={handleAddToFavorites}
            isLoading={loading}
            className={`w-full border-neutral-700 text-white font-bold h-12 flex items-center gap-2 ${isFavorite ? 'bg-green-500/10 border-green-500' : 'hover:bg-neutral-800'}`}
        >
            <Heart size={18} fill={isFavorite ? "currentColor" : "none"} /> 
            {isFavorite ? "Saved to Favorites" : "Add to Favorites"}
        </Button>
    );
}