"use client";
import { useSession } from '@/lib/auth-client';
import { toast } from '@heroui/react'; 
import { useEffect, useState } from "react";

export default function ApplyTrainer() {
    const { data: session } = useSession();
    const [dbUser, setDbUser] = useState(null);

    useEffect(() => {
        if (session?.user?.email) {
            fetch(`http://localhost:5000/api/user/${session.user.email}`)
                .then(res => res.json())
                .then(data => setDbUser(data))
                .catch(err => console.error("User fetch error:", err));
        }
    }, [session?.user?.email]);

    const handleBlockedClick = () => {
        toast.danger("Action restricted by Admin");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (dbUser?.status === 'blocked') {
            handleBlockedClick();
            return;
        }

        const form = e.target;
        const application = {
            userName: session.user.name,
            userEmail: session.user.email,
            experience: form.experience.value,
            specialty: form.specialty.value,
            bio: form.bio.value
        };

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/trainer_apply`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(application)
        });

        if (res.ok) {
            toast.success("Application submitted! Status: Pending");
            form.reset();
        } else {
            const errorData = await res.json();
            toast.danger(errorData.message || "Failed to submit");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 rounded-xl shadow-md space-y-4 border border-green-600">
            <h2 className="text-xl font-bold">Apply as Trainer</h2>

            <input name="experience" type="number" placeholder="Years of Experience" className="w-full border p-2" required disabled={dbUser?.status === 'blocked'} />
            <input name="specialty" type="text" placeholder="Specialty (e.g., Yoga)" className="w-full border p-2" required disabled={dbUser?.status === 'blocked'} />
            <textarea name="bio" placeholder="Tell us about yourself" className="w-full border p-2" required disabled={dbUser?.status === 'blocked'} />

            <button
                type={dbUser?.status === 'blocked' ? "button" : "submit"}
                onClick={dbUser?.status === 'blocked' ? handleBlockedClick : undefined}
                className={`px-4 py-2 rounded text-white font-bold transition-all ${
                    dbUser?.status === 'blocked' 
                    ? 'bg-gray-400 cursor-not-allowed opacity-70' 
                    : 'bg-green-600 hover:bg-green-500 cursor-pointer'
                }`}
            >
                {dbUser?.status === 'blocked' ? "Blocked by Admin" : "Submit Application"}
            </button>
        </form>
    );
}