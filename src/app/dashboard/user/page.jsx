"use client";
import { useSession } from '@/lib/auth-client';
import { useEffect, useState } from "react";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const UserDashboard = () => {
    // শুধুমাত্র useSession ব্যবহার করুন, getUserSession এর প্রয়োজন নেই
    const { data: session } = useSession();
    
    const [statusData, setStatusData] = useState(null);
    const [stats, setStats] = useState({ bookedCount: 0, favoriteCount: 0 });

    useEffect(() => {
        if (session?.user?.email) {
            // ১. অ্যাপ্লিকেশনের স্ট্যাটাস (আপনার API রুট ঠিক আছে কি না নিশ্চিত করুন)
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/trainer_apply/${session.user.email}`)
                .then((res) => res.json())
                .then((data) => setStatusData(data))
                .catch((err) => console.error("Error fetching status:", err));

            // ২. বুকিং এবং ফেভারিট কাউন্ট (এই রুটটি সার্ভারে তৈরি থাকতে হবে)
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user-stats/${session.user.email}`)
                .then((res) => res.json())
                .then((data) => setStats(data))
                .catch((err) => console.error("Error fetching stats:", err));
        }
    }, [session]);

    const categoryData = [{ name: 'Cardio', count: 3 }, { name: 'Weights', count: 4 }, { name: 'Combat', count: 2 }];
    const roleData = [{ name: 'Admin', value: 8 }, { name: 'Trainer', value: 33 }, { name: 'User', value: 58 }];
    const COLORS = ['#dcfce7', '#60a5fa', 'green'];

    return (
        <div style={styles.page}>
            <h1 style={styles.pageTitle}>Overview</h1>

            {/* ডাইনামিক Stats সেকশন */}
            <div style={styles.statsContainer}>
                <div style={styles.statCard}><span>📖 {stats.bookedCount} Booked Classes</span></div>
                <div style={styles.statCard}><span>❤️ {stats.favoriteCount} Favorites</span></div>
                <div style={styles.statCard}><span>⭐ {session?.user?.role || 'Member'} (Role)</span></div>
            </div>

            {/* Trainer Application Section */}
            <div style={styles.card}>
                <h2 style={styles.sectionTitle}>Trainer Application</h2>
                <div style={styles.statusBox}>
                    {statusData ? (
                        <>
                            <div style={{ color: statusData.status === 'rejected' ? '#f87171' : '#4ade80', fontWeight: 'bold' }}>
                                {(statusData.status || 'pending').toUpperCase()}
                            </div>
                            <div style={{ fontSize: '12px', marginTop: '10px' }}>Specialty: {statusData.specialty || 'N/A'}</div>
                            <div style={{ fontSize: '12px' }}>Experience: {statusData.experience || '0'} years</div>
                            
                            {statusData.status === 'rejected' && (
                                <div style={styles.feedbackBox}>
                                    <p style={{ margin: 0, color: '#f87171' }}>Feedback:</p>
                                    {statusData.rejectionReason || 'No reason provided.'}
                                </div>
                            )}
                        </>
                    ) : (
                        <p>No application submitted yet.</p>
                    )}
                </div>
            </div>

            {/* চার্ট সেকশন */}
            <div style={styles.row}>
                <div style={styles.card}>
                    <h2 style={styles.sectionTitle}>Classes by Category</h2>
                    <div style={{ height: '250px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={categoryData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                <XAxis dataKey="name" stroke="#94a3b8" />
                                <YAxis stroke="#94a3b8" />
                                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none' }} />
                                <Bar dataKey="count" fill="tomato" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div style={styles.card}>
                    <h2 style={styles.sectionTitle}>User Role Distribution</h2>
                    <div style={{ height: '250px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={roleData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                    {roleData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    page: { padding: '20px', backgroundColor: '#070a12', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif' },
    pageTitle: { fontSize: '24px', marginBottom: '20px' },
    statsContainer: { display: 'flex', gap: '20px', marginBottom: '20px' },
    statCard: { flex: 1, padding: '20px', backgroundColor: '#121826', borderRadius: '12px', border: '1px solid #1e293b' },
    card: { flex: 1, padding: '20px', backgroundColor: '#121826', borderRadius: '12px', border: '1px solid #1e293b', marginBottom: '20px' },
    row: { display: 'flex', gap: '20px' },
    sectionTitle: { fontSize: '16px', marginBottom: '15px', color: '#94a3b8' },
    statusBox: { backgroundColor: '#0f1420', padding: '15px', borderRadius: '8px', border: '1px solid #2d3748' },
    feedbackBox: { marginTop: '10px', padding: '10px', backgroundColor: '#1c1917', borderRadius: '4px', fontSize: '12px' }
};

export default UserDashboard;