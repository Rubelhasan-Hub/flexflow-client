"use client";
import React, { useEffect, useState } from 'react';

export default function ManageClassesPage() {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/all-classes`);
            const data = await res.json();
            setClasses(Array.isArray(data) ? data : (data.classes || []));
        } catch (error) {
            console.error("Error fetching classes:", error);
            setClasses([]);
        }
    };

    const handleUpdateStatus = async (id, newStatus) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/classes/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        });
        if (res.ok) fetchClasses();
    };

    const handleDelete = async (id) => {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/classes/${id}`, { method: 'DELETE' });
        fetchClasses();
    };

    return (
        <div className="p-6 bg-[#0a0f1d] min-h-screen text-white">
            <h2 className="text-2xl font-bold mb-6">Manage Classes</h2>

            <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-[#0f172a]">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-neutral-900 text-neutral-400 text-xs uppercase">
                        <tr>
                            <th className="p-4">Class Name</th>
                            <th className="p-4">Trainer</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                        {classes.map((cls) => (
                            <tr key={cls._id} className="hover:bg-neutral-900/50">
                                <td className="p-4">{cls.className}</td>
                                <td className="p-4">{cls.trainerName}</td>
                                <td className="p-4 capitalize">
                                    <span className={`px-2 py-1 rounded text-xs ${cls.status === 'approved' ? 'bg-green-500/10 text-green-400' : cls.status === 'rejected' ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                                        {cls.status || 'Pending'}
                                    </span>
                                </td>
                                <td className="p-4 flex gap-2 justify-center">
                                    {/* Approve Button */}
                                    {(cls.status !== 'approved') && (
                                        <button
                                            onClick={() => handleUpdateStatus(cls._id, 'approved')}
                                            className="bg-green-600 px-3 py-1 rounded text-xs hover:bg-green-700 transition"
                                        >
                                            Approve
                                        </button>
                                    )}

                                    {/* Reject Button */}
                                    {(cls.status !== 'rejected') && (
                                        <button
                                            onClick={() => handleUpdateStatus(cls._id, 'rejected')}
                                            className="bg-red-600 px-3 py-1 rounded text-xs hover:bg-red-700 transition"
                                        >
                                            Reject
                                        </button>
                                    )}

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleDelete(cls._id)}
                                        className="bg-neutral-600 px-3 py-1 rounded text-xs hover:bg-neutral-700 transition"
                                    >
                                        Delete
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