"use client";
import React, { useState, useEffect } from 'react';
import UpdateClassModal from './UpdateClassModal';
import DeleteConfirmation from './DeleteConfirmation'; // আপনার তৈরি করা কম্পোনেন্ট
import { useSession } from '@/lib/auth-client';
import { Pencil, Trash2, Users } from 'lucide-react';

export default function MyClassesPage() {
    const { data: session } = useSession();
    const [classes, setClasses] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showStudentModal, setShowStudentModal] = useState(false);

    const [deleteId, setDeleteId] = useState(null);
    const [deleteClassTitle, setDeleteClassTitle] = useState("");

    const fetchClasses = async () => {
        if (!session?.user?.email) return;
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/my-classes/${session.user.email}`);
            const data = await response.json();
            setClasses(data);
        } catch (error) {
            console.error("Error fetching classes:", error);
        }
    };

    useEffect(() => {
        fetchClasses();
    }, [session?.user?.email]);

    const handleDelete = async () => {
        if (deleteId) {
            await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/classes/${deleteId}`, { method: 'DELETE' });
            fetchClasses();
            setDeleteId(null);
        }
    };

    const handleViewStudents = async (id) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/class-students/${id}`);
        const data = await res.json();
        setStudents(data);
        setShowStudentModal(true);
    };

    return (
        <div className="p-8 min-h-screen text-white">
            <h1 className="text-3xl font-bold mb-6">My Classes</h1>

            <div className="overflow-x-auto rounded-xl border border-slate-700">
                <table className="w-full text-left">
                    <thead className="bg-[#334155] text-slate-300 uppercase text-sm">
                        <tr>
                            <th className="p-4">Class Name</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                        {classes.map((cls) => (
                            <tr key={cls._id} className="hover:bg-slate-800 transition">
                                <td className="p-4">{cls.className}</td>
                                <td className="p-4">${cls.price}</td>
                                <td className="p-4">
                                    <span className="px-2 py-1 bg-green-900 text-green-300 rounded text-xs uppercase">{cls.status}</span>
                                </td>
                                <td className="p-4 flex gap-2">
                                    <button
                                        onClick={() => { setSelectedClass(cls); setShowUpdateModal(true); }}
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/10 text-blue-400 border border-blue-600/20 rounded-lg hover:bg-blue-600 hover:text-white transition"
                                    >
                                        <Pencil size={14} /> Update
                                    </button>

                                    <button
                                        onClick={() => { setDeleteId(cls._id); setDeleteClassTitle(cls.className); }}
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600/10 text-red-400 border border-red-600/20 rounded-lg hover:bg-red-600 hover:text-white transition"
                                    >
                                        <Trash2 size={14} /> Delete
                                    </button>

                                    <button
                                        onClick={() => handleViewStudents(cls._id)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600/10 text-purple-400 border border-purple-600/20 rounded-lg hover:bg-purple-600 hover:text-white transition"
                                    >
                                        <Users size={14} /> Students
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <UpdateClassModal cls={selectedClass} isOpen={showUpdateModal} onClose={() => setShowUpdateModal(false)} onUpdate={fetchClasses} />

            <DeleteConfirmation
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
                className={deleteClassTitle}
            />

            {showStudentModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
                    <div className="bg-[#1e293b] p-6 rounded-xl w-full max-w-md border border-slate-700">
                        <h2 className="text-xl font-bold mb-4">Enrolled Students</h2>
                        {students.length > 0 ? students.map(s => (
                            <div key={s._id} className="p-2 border-b border-slate-700 text-white">
                                <div className='font-bold text-xl '>
                                   Enrolled Students : <span className='text-green-600'>{students.length}</span>
                                </div>
                                {s.userName} - {s.userEmail}</div>
                        )) : <p>No students found.</p>}
                        <button onClick={() => setShowStudentModal(false)} className="mt-4 w-full p-2 bg-slate-600 rounded text-white">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}