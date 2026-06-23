"use client";
import React, { useEffect, useState } from 'react';

export default function ManageTrainersPage() {
    const [trainers, setTrainers] = useState([]);

    useEffect(() => {
        fetchTrainers();
    }, []);

    const fetchTrainers = async () => {
        // শুধুমাত্র যারা 'trainer' রোলের ইউজার তাদের ডাটা ফেচ করুন
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`);
        const data = await res.json();
        const activeTrainers = data.filter(user => user.role === 'trainer');
        setTrainers(activeTrainers);
    };

    const handleDemote = async (id) => {
        if (confirm("Are you sure you want to demote this trainer to a regular user?")) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${id}/demote`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: 'user' })
            });
            if (res.ok) fetchTrainers(); // লিস্ট রিফ্রেশ করুন
        }
    };

    return (
        <div className="p-6 bg-[#0a0f1d] min-h-screen text-white">
            <h2 className="text-2xl font-bold mb-6">Manage Trainers</h2>

            <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-[#0f172a]">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-neutral-900 text-neutral-400 text-xs uppercase">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                        {trainers.map((trainer) => (
                            <tr key={trainer._id} className="hover:bg-neutral-900/50">
                                <td className="p-4">{trainer.userName}</td>
                                <td className="p-4">{trainer.userEmail}</td>
                                <td className="p-4">
                                    <button 
                                        onClick={() => handleDemote(trainer._id)}
                                        className="bg-amber-600 hover:bg-amber-700 px-3 py-1 rounded text-xs transition"
                                    >
                                        Demote to User
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}