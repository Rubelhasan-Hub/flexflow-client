"use client";
import React, { useState, useEffect } from 'react';

export default function UpdateClassModal({ cls, isOpen, onClose, onUpdate }) {
    const [data, setData] = useState(cls);

    // যখন cls পরিবর্তন হবে তখন স্টেট আপডেট হবে
    useEffect(() => {
        if (cls) setData(cls);
    }, [cls]);

    if (!isOpen || !data) return null;

    const handleSubmit = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/classes/${data._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        onUpdate();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
            <div className="bg-[#1e293b] p-6 rounded-xl w-full max-w-lg border border-slate-700">
                <h2 className="text-2xl font-bold mb-4">Update Class</h2>
                <input className="w-full p-2 mb-3 bg-[#334155] rounded" defaultValue={data.className} onChange={e => setData({...data, className: e.target.value})} />
                <input className="w-full p-2 mb-3 bg-[#334155] rounded" type="number" defaultValue={data.price} onChange={e => setData({...data, price: e.target.value})} />
                <textarea className="w-full p-2 mb-3 bg-[#334155] rounded" defaultValue={data.description} onChange={e => setData({...data, description: e.target.value})} />
                
                <div className="flex gap-2">
                    <button onClick={onClose} className="px-4 py-2 bg-slate-600 rounded">Cancel</button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 rounded">Save</button>
                </div>
            </div>
        </div>
    );
}