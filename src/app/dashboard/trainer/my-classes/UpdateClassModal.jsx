"use client";
import { toast } from '@heroui/react';
import React, { useState, useEffect } from 'react';

export default function UpdateClassModal({ cls, isOpen, onClose, onUpdate }) {
    const [data, setData] = useState({});

    useEffect(() => {
        if (cls) setData(cls);
    }, [cls]);

    if (!isOpen || !data) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/classes/${data._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (res.ok) {
                onUpdate();
                onClose();
                toast.success('Update Data successfully')
            }
        } catch (error) {
            toast.danger("Update failed:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-[#121826] p-8 rounded-2xl w-full max-w-2xl border border-slate-700 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-6">Update Class</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-slate-400">CLASS NAME</label>
                        <input 
                            className="w-full p-3 bg-[#090d16] border border-slate-700 rounded-lg text-white" 
                            value={data.className || ""} 
                            onChange={e => setData({...data, className: e.target.value})} 
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold text-slate-400">PRICE ($)</label>
                            <input 
                                className="w-full p-3 bg-[#090d16] border border-slate-700 rounded-lg text-white" 
                                type="number" 
                                value={data.price || ""} 
                                onChange={e => setData({...data, price: e.target.value})} 
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold text-slate-400">DURATION</label>
                            <input 
                                className="w-full p-3 bg-[#090d16] border border-slate-700 rounded-lg text-white" 
                                value={data.duration || ""} 
                                onChange={e => setData({...data, duration: e.target.value})} 
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-slate-400">DESCRIPTION</label>
                        <textarea 
                            className="w-full p-3 bg-[#090d16] border border-slate-700 rounded-lg text-white h-32" 
                            value={data.description || ""} 
                            onChange={e => setData({...data, description: e.target.value})} 
                        />
                    </div>
                    
                    <div className="flex gap-3 mt-6 pt-4 border-t border-slate-800">
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="cursor-pointer flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition cursor-pointer"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}