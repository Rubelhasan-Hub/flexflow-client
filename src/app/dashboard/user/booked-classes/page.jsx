"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from '@/lib/auth-client';
import { LayoutList, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function MyBookingsPage() {
    const { data: session } = useSession();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            if (!session?.user?.email) return;
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/my-bookings/${session.user.email}`);
                const data = await response.json();
                setBookings(data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [session?.user?.email]);

    return (
        <div className="p-8 min-h-screen text-white">
            <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <LayoutList className="text-blue-500" /> My Enrolled Classes
            </h1>

            <div className="overflow-x-auto rounded-xl border border-slate-700">
                <table className="w-full text-left">
                    <thead className="bg-[#334155] text-slate-300 uppercase text-sm">
                        <tr>
                            <th className="p-4">Class Name</th>
                            <th className="p-4">Trainer</th>
                            <th className="p-4">Schedule</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                        {loading ? (
                            <tr><td colSpan="5" className="p-8 text-center">Loading...</td></tr>
                        ) : bookings.length > 0 ? (
                            bookings.map((booking) => (
                                <tr key={booking._id} className="hover:bg-slate-800 transition">
                                    <td className="p-4 font-semibold text-blue-400">{booking.className}</td>
                                    <td className="p-4">{booking.trainerName}</td>
                                    <td className="p-4">{booking.scheduleDays?.join(", ")}</td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 bg-green-900/50 text-green-400 border border-green-700 rounded text-xs uppercase">
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="p-4">

                                        <Link href={`/classes/${booking.classId}`}>
                                            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition">
                                                <ExternalLink size={14} /> Details
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="5" className="p-8 text-center text-slate-500">You have not enrolled in any classes yet.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}