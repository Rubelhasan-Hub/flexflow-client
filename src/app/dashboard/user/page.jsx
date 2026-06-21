"use client";
import { useSession } from '@/lib/auth-client';
import React from 'react';



const UserDashboard = () => {
    const { data: session, isPending } = useSession();
    const user = session?.user;

    console.log(user);
    


    return (
        <div style={styles.page}>
            <h1 style={styles.pageTitle}>Overview</h1>

            {/* Stats Section */}
            <div style={styles.statsContainer}>
                <div style={styles.statCard}><span>📖 2 Booked Classes</span></div>
                <div style={styles.statCard}><span>❤️ 2 Favorites</span></div>
                <div style={styles.statCard}><span>⭐ Member (Role)</span></div>
            </div>

            {/* Profile & Application Section */}
            <div style={styles.row}>
                <div style={styles.card}>
                    <h2 style={styles.sectionTitle}>Profile</h2>
                    <div style={styles.profileBox}>
                        <img src={user?.image} style={styles.avatar} alt="Profile" />
                        <div>
                            <div style={{ fontWeight: 'bold' }}>{user?.name}</div>
                            <div style={{ fontSize: '20px', color: '#94a3b8' }}>{user?.email}</div>
                            <span style={styles.badge}>{user?.role}</span>
                        </div>
                    </div>
                </div>

                <div style={styles.card}>
                    <h2 style={styles.sectionTitle}>Trainer Application</h2>
                    <div style={styles.statusBox}>
                        <div style={{ color: '#f87171' }}>✖ Rejected</div>
                        <div style={{ fontSize: '12px', marginTop: '10px' }}>Specialty: Weights</div>
                        <div style={{ fontSize: '12px' }}>Experience: 5 years</div>
                        <div style={styles.feedbackBox}>
                            <p style={{ margin: 0, color: '#f87171' }}>Feedback:</p>
                            Bio thik koro
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Bookings */}
            <div style={styles.card}>
                <h2 style={styles.sectionTitle}>Recent Bookings</h2>
                <div style={styles.bookingItem}>
                    <span>Cardio Blast HIIT (Trainer - Tue, Thu, Sat)</span>
                    <span style={{ color: '#ccff00' }}>$25</span>
                </div>
                <div style={styles.bookingItem}>
                    <span>Endurance Builder Bootcamps (Trainer - Mon, Wed, Sat)</span>
                    <span style={{ color: '#ccff00' }}>$50</span>
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
    row: { display: 'flex', gap: '20px', marginBottom: '20px' },
    card: { flex: 1, padding: '20px', backgroundColor: '#121826', borderRadius: '12px', border: '1px solid #1e293b' },
    sectionTitle: { fontSize: '16px', marginBottom: '15px', color: '#94a3b8' },
    profileBox: { display: 'flex', alignItems: 'center', gap: '15px' },
    avatar: { borderRadius: '50%', width: '100px', height: '100px' },
    badge: { fontSize: '15px', backgroundColor: '#1e293b', padding: '2px 8px', borderRadius: '4px' },
    statusBox: { backgroundColor: '#0f1420', padding: '15px', borderRadius: '8px', border: '1px solid #2d3748' },
    feedbackBox: { marginTop: '10px', padding: '10px', backgroundColor: '#1c1917', borderRadius: '4px', fontSize: '12px' },
    bookingItem: { display: 'flex', justifyContent: 'space-between', padding: '15px', borderBottom: '1px solid #1e293b' }
};

export default UserDashboard;