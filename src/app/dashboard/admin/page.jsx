"use client";
import React, { useEffect, useState } from 'react';
import { Users, BookOpen, CalendarCheck, UserCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useSession } from '@/lib/auth-client';

export default function AdminDashboard() {
    const { data: session } = useSession();
    const [stats, setStats] = useState({ users: 0, classes: 0, bookings: 0 });

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin-stats`)
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(err => console.error(err));
    }, []);

    const chartData = [
        { name: 'Users', value: stats.users, color: '#a855f7' },
        { name: 'Classes', value: stats.classes, color: '#22c55e' },
        { name: 'Bookings', value: stats.bookings, color: '#f97316' },
    ];

    return (
        <div className="p-8 bg-[#0a0f1d] min-h-screen text-white">
            <div className="flex items-center gap-6 mb-10 bg-[#0f172a] p-6 rounded-2xl border border-neutral-800">
                {session?.user?.image ? (
                    <img src={session.user.image} className="w-20 h-20 rounded-full border-2 border-green-500 object-cover" />
                ) : (
                    <UserCircle size={80} className="text-blue-500" />
                )}
                <div>
                    <h1 className="text-3xl font-bold">{session?.user?.name || "Admin"}</h1>
                    <p className="text-neutral-400 mt-1">{session?.user?.email}</p>
                    <span className="inline-block mt-2 px-4 py-1 bg-blue-600/20 text-blue-400 text-xs font-bold rounded-full border border-blue-600/50">ADMIN</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <StatCard title="Total Users" value={stats.users} icon={<Users size={24} />} color="text-purple-400" />
                <StatCard title="Total Classes" value={stats.classes} icon={<BookOpen size={24} />} color="text-green-400" />
                <StatCard title="Total Bookings" value={stats.bookings} icon={<CalendarCheck size={24} />} color="text-orange-400" />
            </div>

            <div className="bg-[#0f172a] p-8 rounded-2xl border border-neutral-800">
                <h2 className="text-xl font-semibold mb-6">Platform Overview</h2>
                <div className="h-75 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <XAxis dataKey="name" stroke="#666" />
                            <YAxis stroke="#666" />
                            <Tooltip contentStyle={{ backgroundColor: '#0a0f1d', border: '1px solid #333' }} />
                            <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                                {chartData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon, color }) {
    return (
        <div className="bg-[#0f172a] p-6 rounded-2xl border border-neutral-800 flex items-center gap-4">
            <div className={`${color} p-4 bg-neutral-900 rounded-xl`}>{icon}</div>
            <div>
                <p className="text-neutral-400 text-sm">{title}</p>
                <h3 className="text-3xl font-bold">{value}</h3>
            </div>
        </div>
    );
}