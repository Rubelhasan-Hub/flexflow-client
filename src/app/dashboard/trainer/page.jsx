"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from '@/lib/auth-client';
import { BookOpen, Users, UserCircle } from 'lucide-react';

export default function OverviewPage() {
    const { data: session } = useSession();
    const [stats, setStats] = useState({ totalClasses: 0, totalStudents: 0 });

    useEffect(() => {
        if (!session?.user?.email) return;

        const fetchData = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/my-classes/${session.user.email}`);
            const classes = await res.json();
            

            const totalClasses = classes.length;

            const totalStudents = classes.reduce((acc, curr) => acc + (curr.enrolledStudents?.length || 0), 0);
            
            setStats({ totalClasses, totalStudents });
        };

        fetchData();
    }, [session?.user?.email]);

    return (
        <div className="p-8 bg-[#0f172a] min-h-screen text-white">
            <h1 className="text-3xl font-bold mb-6">Trainer Overview</h1>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-700 flex items-center gap-4">
                    <div className="p-4 bg-blue-600/20 rounded-lg text-blue-400"><BookOpen size={30} /></div>
                    <div>
                        <h3 className="text-slate-400">Total Classes</h3>
                        <p className="text-3xl font-bold">{stats.totalClasses}</p>
                    </div>
                </div>
                <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-700 flex items-center gap-4">
                    <div className="p-4 bg-purple-600/20 rounded-lg text-purple-400"><Users size={30} /></div>
                    <div>
                        <h3 className="text-slate-400">Total Students</h3>
                        <p className="text-3xl font-bold">{stats.totalStudents}</p>
                    </div>
                </div>
            </div>

            {/* Profile Section */}
            <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-700 flex items-center gap-6">
                <img 
                    src={session?.user?.image || "https://ui-avatars.com/api/?name=User"} 
                    alt="Profile" 
                    className="w-20 h-20 rounded-full border-2 border-slate-600"
                />
                <div>
                    <h2 className="text-2xl font-bold">{session?.user?.name}</h2>
                    <p className="text-slate-400">{session?.user?.email}</p>
                    <span className="inline-block mt-2 px-3 py-1 bg-green-900/30 text-green-400 text-xs font-bold rounded-full border border-green-800">
                        TRAINER
                    </span>
                </div>
            </div>
        </div>
    );
}