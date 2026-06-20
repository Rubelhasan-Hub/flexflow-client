"use client";
import { CreateClass } from '@/lib/actions/classes';
import { useSession } from '@/lib/auth-client';
import { toast } from "@heroui/react";
import React, { useState } from 'react';

const AddClassForm = () => {
    const { data: session } = useSession();
    const user = session?.user;

    const status = 'pending';
    
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        className: '',
        classImage: null,
        category: 'Yoga',
        difficulty: 'Beginner',
        duration: '',
        price: '',
        scheduleDays: [],
        time: '',
        description: ''
    });

    const handleDays = (day) => {
        setFormData(prev => ({
            ...prev,
            scheduleDays: prev.scheduleDays.includes(day)
                ? prev.scheduleDays.filter(d => d !== day)
                : [...prev.scheduleDays, day]
        }));
    };

    const handleImageUpload = async (file) => {
        const imgData = new FormData();
        imgData.append('image', file);
        
        // Ensure you have this key in your .env.local
        const apiKey = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
        
        const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
            method: 'POST',
            body: imgData,
        });
        const data = await res.json();
        return data.success ? data.data.url : null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Upload image to ImgBB first
            let imageUrl = null;
            if (formData.classImage) {
                imageUrl = await handleImageUpload(formData.classImage);
            }

            if (!imageUrl) {
                toast.danger('Image upload failed!');
                setLoading(false);
                return;
            }

            // 2. Prepare payload with the URL
            const payload = {
                ...formData,
                classImage: imageUrl, 
                trainerEmail: user?.email,
                status: status      
            };

            // 3. Save to Database
            const res = await CreateClass(payload);
            if (res?.insertedId) {
                toast.success('Class added successfully!');
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } else {
                toast.danger('Failed to add class.');
            }
        } catch (error) {
            console.danger("Submission error:", error);
            toast.danger('An error occurred during submission.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.header}>Add New Class</h2>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>CLASS NAME</label>
                    <input type="text" value={formData.className} placeholder="e.g. Power Yoga Flow" style={styles.input} onChange={(e) => setFormData({ ...formData, className: e.target.value })} required />
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>CLASS IMAGE</label>
                    <input type="file" style={styles.input} onChange={(e) => setFormData({ ...formData, classImage: e.target.files[0] })} required />
                </div>

                <div style={styles.row}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>CATEGORY</label>
                        <select style={styles.input} value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                            <option>Yoga</option>
                            <option>HIIT</option>
                            <option>Strength</option>
                        </select>
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>DIFFICULTY LEVEL</label>
                        <select style={styles.input} value={formData.difficulty} onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}>
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Advanced</option>
                        </select>
                    </div>
                </div>

                <div style={styles.row}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>DURATION</label>
                        <input type="text" value={formData.duration} placeholder="e.g. 60 mins" style={styles.input} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>PRICE ($)</label>
                        <input type="number" value={formData.price} placeholder="25" style={styles.input} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                    </div>
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>CLASS SCHEDULE DAYS</label>
                    <div style={styles.daysContainer}>
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                            <button key={day} type="button" onClick={() => handleDays(day)} style={{ ...styles.dayBtn, backgroundColor: formData.scheduleDays.includes(day) ? 'green' : '#1a2236' }}>
                                {day}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>TIME</label>
                    <input type="time" value={formData.time} style={styles.input} onChange={(e) => setFormData({ ...formData, time: e.target.value })} />
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>DESCRIPTION</label>
                    <textarea value={formData.description} placeholder="Describe the class..." style={styles.textarea} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                </div>

                <button type="submit" style={styles.submitBtn} disabled={loading}>
                    {loading ? 'Adding...' : 'Add Class'}
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: { padding: '20px', backgroundColor: '#070a12', minHeight: '100vh', display: 'flex', justifyContent: 'center' },
    form: { width: '100%', maxWidth: '900px', backgroundColor: '#121826', padding: '30px', borderRadius: '16px' },
    header: { color: '#fff', marginBottom: '20px' },
    row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
    inputGroup: { marginBottom: '15px', display: 'flex', flexDirection: 'column' },
    label: { color: '#94a3b8', fontSize: '12px', marginBottom: '5px', fontWeight: 'bold' },
    input: { padding: '12px', borderRadius: '8px', border: '1px solid #1e293b', backgroundColor: '#090d16', color: '#fff' },
    daysContainer: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
    dayBtn: { padding: '8px 16px', border: 'none', borderRadius: '20px', cursor: 'pointer', color: '#fff', fontSize: '12px' },
    textarea: { padding: '12px', borderRadius: '8px', border: '1px solid #1e293b', backgroundColor: '#090d16', color: '#fff', height: '100px' },
    submitBtn: { padding: '12px 24px', backgroundColor: 'green', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', color: '#fff' }
};

export default AddClassForm;