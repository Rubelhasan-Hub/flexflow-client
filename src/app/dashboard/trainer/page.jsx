"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from '@/lib/auth-client';
import { BookOpen, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function OverviewPage() {
    const { data: session } = useSession();
    const [stats, setStats] = useState({ totalClasses: 0, totalStudents: 0 });
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (!session?.user?.email) return;

        const fetchData = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/my-classes/${session.user.email}`);
            const classes = await res.json();
            
            const totalClasses = classes.length;
            const totalStudents = classes.reduce((acc, curr) => acc + (curr.enrolledStudents?.length || 0), 0);
            
            setStats({ totalClasses, totalStudents });

            // চার্টের জন্য ডাটা তৈরি
            const data = classes.map(cls => ({
                name: cls.className.slice(0, 10) + '...',
                students: cls.enrolledStudents?.length || 0
            }));
            setChartData(data);
        };

        fetchData();
    }, [session?.user?.email]);

    return (
        <div className="p-8 bg-[#0f172a] min-h-screen text-white">
            <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold mb-6">Trainer Overview</motion.h1>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <motion.div whileHover={{ scale: 1.02 }} className="bg-[#1e293b] p-6 rounded-xl border border-slate-700 flex items-center gap-4 shadow-lg">
                    <div className="p-4 bg-blue-600/20 rounded-lg text-blue-400"><BookOpen size={30} /></div>
                    <div>
                        <h3 className="text-slate-400">Total Classes</h3>
                        <p className="text-3xl font-bold">{stats.totalClasses}</p>
                    </div>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} className="bg-[#1e293b] p-6 rounded-xl border border-slate-700 flex items-center gap-4 shadow-lg">
                    <div className="p-4 bg-purple-600/20 rounded-lg text-purple-400"><Users size={30} /></div>
                    <div>
                        <h3 className="text-slate-400">Total Students</h3>
                        <p className="text-3xl font-bold">{stats.totalStudents}</p>
                    </div>
                </motion.div>
            </div>

            {/* Chart Section */}
            <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-700 mb-8 h-80">
                <h3 className="text-lg font-bold mb-4">Students per Class</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <XAxis dataKey="name" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none' }} />
                        <Bar dataKey="students" radius={[5, 5, 0, 0]}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#3b82f6' : '#8b5cf6'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Profile Section */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="bg-[#1e293b] p-6 rounded-xl border border-slate-700 flex items-center gap-6">
                <img src={session?.user?.image || "https://ui-avatars.com/api/?name=User"} className="w-20 h-20 rounded-full border-2 border-slate-600" />
                <div>
                    <h2 className="text-2xl font-bold">{session?.user?.name}</h2>
                    <p className="text-slate-400">{session?.user?.email}</p>
                    <span className="inline-block mt-2 px-3 py-1 bg-green-900/30 text-green-400 text-xs font-bold rounded-full border border-green-800">TRAINER</span>
                </div>
            </motion.div>
        </div>
    );
}