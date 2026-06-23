"use client";
import React, { useEffect, useState } from 'react';

export default function ManageUsersPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`)
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.error(err));
    }, []);

    const handleAction = async (id, type, value) => {
        const endpoint = type === 'status' ? `/api/user/${id}/status` : `/api/user/${id}/role`;
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(type === 'status' ? { status: value } : {})
        });
        window.location.reload();
    };

    return (
        <div className="p-6 bg-[#0a0f1d] min-h-screen text-white">
            <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

            {/* Responsive Table Container */}
            <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-[#0f172a]">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-neutral-900 text-neutral-400 text-xs uppercase">
                            <th className="p-4 border-b border-neutral-800">Name</th>
                            <th className="p-4 border-b border-neutral-800">Email</th>
                            <th className="p-4 border-b border-neutral-800">Role</th>
                            <th className="p-4 border-b border-neutral-800">Status</th>
                            <th className="p-4 border-b border-neutral-800">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-neutral-900/50 transition">
                                <td className="p-4">{user.name}</td>
                                <td className="p-4 text-neutral-300">{user.email}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-semibold ${user.role === 'admin' ? 'bg-green-500/10 text-green-400' : 'bg-neutral-700 text-neutral-300'}`}>
                                        {user.role || 'User'}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-semibold ${user.status === 'blocked' ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                                        {user.status || 'Active'}
                                    </span>
                                </td>
                                <td className="p-4 flex gap-2">
                                    <button 
                                        onClick={() => handleAction(user._id, 'status', user.status === 'blocked' ? 'active' : 'blocked')}
                                        className={`px-3 py-1 rounded-lg text-xs font-bold transition ${user.status === 'blocked' ? 'bg-green-600' : 'bg-red-600'}`}
                                    >
                                        {user.status === 'blocked' ? 'Unblock' : 'Block'}
                                    </button>
                                    {user.role !== 'admin' && (
                                        <button 
                                            onClick={() => handleAction(user._id, 'role', 'admin')}
                                            className="px-3 py-1 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500"
                                        >
                                            Make Admin
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}