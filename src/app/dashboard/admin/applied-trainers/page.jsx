"use client";
import React, { useEffect, useState } from 'react';

export default function AppliedTrainersPage() {
    const [applications, setApplications] = useState([]);
    const [selectedApp, setSelectedApp] = useState(null);
    const [feedback, setFeedback] = useState("");

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/trainer-applications`)
            .then(res => res.json())
            .then(data => {
                console.log("Data from DB:", data);
                setApplications(data);
            })
            .catch(err => console.error("Fetch Error:", err));
    }, []);

    const handleAction = async (id, status) => {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/trainer-applications/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status, feedback })
        });
        setSelectedApp(null);
        window.location.reload();
    };

    return (
        <div className="p-6 bg-[#0a0f1d] min-h-screen text-white">
            <h2 className="text-2xl font-bold mb-6">Applied Trainers</h2>

            {applications.length === 0 ? (
                <div className="text-center py-10 text-gray-400">No applications found.</div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-[#0f172a]">
                    <table className="w-full text-left">
                        <thead className="text-gray-400 uppercase text-xs">
                            <tr>
                                <th className="p-4">Name</th>
                                <th className="p-4">Specialty</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800">
                            {applications.map((app) => (
                                <tr key={app._id}>
                                    <td className="p-4">{app.userName}</td>
                                    <td className="p-4">{app.specialty}</td>
                                    <td className="p-4 text-yellow-500">{app.status}</td>
                                    <td className="p-4">
                                        <button 
                                            onClick={() => setSelectedApp(app)}
                                            className="px-3 py-1 bg-blue-600 rounded-lg text-sm"
                                        >
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {selectedApp && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
                    <div className="bg-[#1e293b] p-6 rounded-xl w-full max-w-md border border-neutral-700">
                        <h2 className="text-xl font-bold mb-4">Trainer Details</h2>
                        <div className="space-y-2 text-sm text-gray-300">
                            <p>Name: {selectedApp.userName}</p>
                            <p>Experience: {selectedApp.experience} Years</p>
                            <p>Specialty: {selectedApp.specialty}</p>
                        </div>
                        
                        <textarea 
                            className="w-full mt-4 p-3 bg-black rounded border border-neutral-600 text-white"
                            placeholder="Write feedback..."
                            onChange={(e) => setFeedback(e.target.value)}
                        />
                        
                        <div className="flex gap-2 mt-4">
                            <button onClick={() => handleAction(selectedApp._id, 'approved')} className="flex-1 bg-green-600 py-2 rounded cursor-pointer hover:bg-green-500">Approve</button>
                            <button onClick={() => handleAction(selectedApp._id, 'rejected')} className="flex-1 bg-red-600 py-2 rounded cursor-pointer hover:bg-red-500">Reject</button>
                            <button onClick={() => setSelectedApp(null)} className="bg-gray-600 px-4 py-2 rounded cursor-pointer hover:bg-gray-100 hover:text-black">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}