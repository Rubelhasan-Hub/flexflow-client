"use client";
import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { toast } from "@heroui/react";

export default function AddForumPost() {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const imageFile = form.image.files[0];

        if (!imageFile) {
            toast.danger("Please select an image.");
            setLoading(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append("image", imageFile);

            const imgResponse = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API}`, {
                method: 'POST',
                body: formData
            });

            const imgData = await imgResponse.json();

            if (imgData?.success && imgData?.data?.url) {
                const imageUrl = imgData.data.url;

                const postData = {
                    title: form.title.value,
                    description: form.description.value,
                    image: imageUrl,
                    authorName: session.user.name,
                    authorEmail: session.user.email,
                };

                const res = await fetch(`${baseUrl}/api/forum-posts`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(postData)
                });

                if (res.ok) {
                    toast.success("Post published successfully!");
                    form.reset();
                } else {
                    toast.danger("Failed to save post to database.");
                }
            } else {
                toast.danger("Image upload failed: " + (imgData?.error?.message || "Check your API Key"));
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-10 text-white max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Add New Forum Post</h1>
            <form onSubmit={handleSubmit} className="bg-[#0a0f1d] p-8 rounded-2xl border border-neutral-800 space-y-5">
                <div>
                    <label className="block text-sm mb-2 font-semibold">Title</label>
                    <input name="title" placeholder="Enter post title" className="w-full p-3 bg-neutral-900 rounded-lg border border-neutral-700 focus:outline-none focus:border-green-500" required />
                </div>

                <div>
                    <label className="block text-sm mb-2 font-semibold">Upload Image</label>
                    <input type="file" name="image" accept="image/*" className="w-full p-3 bg-neutral-900 rounded-lg border border-neutral-700" required />
                </div>

                <div>
                    <label className="block text-sm mb-2 font-semibold">Description</label>
                    <textarea name="description" placeholder="Write your thoughts..." className="w-full p-3 bg-neutral-900 rounded-lg border border-neutral-700 h-32 focus:outline-none focus:border-green-500" required />
                </div>

                <button
                    disabled={loading}
                    className={`w-full py-3 rounded-lg font-bold transition ${loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-500 hover:bg-green-400 text-black'}`}
                >
                    {loading ? "Publishing..." : "Publish Post"}
                </button>
            </form>
        </div>
    );
}