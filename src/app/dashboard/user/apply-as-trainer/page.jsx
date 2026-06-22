"use client";
import { useSession } from '@/lib/auth-client';
import { toast } from "@heroui/react";

export default function ApplyTrainer() {
    const { data: session } = useSession();

    const handleSubmit = async (e) => {
        e.preventDefault();
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

        if (res.ok) toast.success("Application submitted! Status: Pending");
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 rounded-xl shadow-md space-y-4 border border-green-600">
            <h2 className="text-xl font-bold">Apply as Trainer</h2>
            <input name="experience" type="number" placeholder="Years of Experience" className="w-full border p-2" required />
            <input name="specialty" type="text" placeholder="Specialty (e.g., Yoga)" className="w-full border p-2" required />
            <textarea name="bio" placeholder="Tell us about yourself" className="w-full border p-2" required />
            <button type="submit" className="bg-green-600 px-4 py-2 rounded cursor-pointer hover:bg-green-500">Submit Application</button>
        </form>
    );
}