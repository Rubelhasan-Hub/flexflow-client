"use client";
import React, { useState } from 'react';
import { authClient } from '@/lib/auth-client'; // এই লাইনটি যোগ করুন
import Link from 'next/link';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleQuickLogin = (role) => {
        let emailVal = '';
        if (role === 'admin') emailVal = 'admin@ironpulse.com';
        else if (role === 'trainer') emailVal = 'trainer@ironpulse.com';
        else if (role === 'user') emailVal = 'user@ironpulse.com';

        setFormData({
            email: emailVal,
            password: 'password123' // ডেমো পাসওয়ার্ড সেট করুন
        });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setLoading(true);

        try {
            const { error } = await authClient.signIn.email({
                email: formData.email,
                password: formData.password,
                callbackURL: "/dashboard",
            });

            if (error) {
                setError(error.message || "Invalid credentials.");
            } else {
                setSuccessMessage('Login successful!');
                window.location.href = "/";
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/dashboard",
        });
    };
    

    return (
        <div style={styles.container}>
            <div style={styles.card}>

                {/* LEFT BRAND SECTION (Shudhu Website Header & Welcome Text) */}
                <div style={styles.leftSection}>
                    <div style={styles.brandContainer}>
                        <span style={styles.brandIcon}>💪</span>
                        <h2 style={styles.brandTitle}>IronPulse</h2>
                    </div>

                    <div style={styles.leftMiddleContent}>
                        <h1 style={styles.mainHeading}>Forge Your Strongest Self</h1>
                        <p style={styles.subText}>
                            Join thousands of athletes who train smarter, track harder, and push further — every single day.
                        </p>
                    </div>

                    <p style={styles.footerText}>© 2026 IronPulse. All rights reserved.</p>
                </div>

                {/* RIGHT FORM SECTION */}
                <div style={styles.rightSection}>
                    <h2 style={styles.formTitle}>Welcome back</h2>
                    <p style={styles.signUpText}>
                        Do not have an account? <Link href="/signup"><span style={styles.linkText}>Sign up free</span></Link>
                    </p>

                    {/* QUICK DEMO CONTROLS */}
                    <div style={styles.demoContainer}>
                        <span style={styles.demoLabel}>QUICK DEMO LOGIN</span>
                        <div style={styles.btnRow}>
                            <button onClick={() => handleQuickLogin('admin')} style={styles.demoBtn}>Admin</button>
                            <button onClick={() => handleQuickLogin('trainer')} style={styles.demoBtn}>Trainer</button>
                            <button onClick={() => handleQuickLogin('user')} style={styles.demoBtn}>User</button>
                        </div>
                    </div>

                    {/* ALERTS */}
                    {error && <div style={styles.errorAlert}>{error}</div>}
                    {successMessage && <div style={styles.successAlert}>{successMessage}</div>}

                    {/* MANUAL FORM */}
                    <form onSubmit={handleLoginSubmit} style={styles.form}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Email address</label>
                            <div style={styles.inputWrapper}>
                                <span style={styles.inputIcon}>✉</span>
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={onChange}
                                    placeholder="you@example.com"
                                    style={styles.input}
                                    required
                                />
                            </div>
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Password</label>
                            <div style={styles.inputWrapper}>
                                <span style={styles.inputIcon}>🔒</span>
                                <input
                                    type={showPassword ? 'text' : 'password'} // Dynamic Type Switching
                                    name="password"
                                    value={password}
                                    onChange={onChange}
                                    placeholder="••••••••"
                                    style={styles.input}
                                    required
                                />
                                {/* Clickable Eye Icon for Show/Hide Toggle */}
                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={styles.eyeIcon}
                                >
                                    {showPassword ? '🙈' : '👁️'}
                                </span>
                            </div>
                        </div>

                        <div style={styles.forgotRow}>
                            <span style={styles.forgotLink}>Forgot password?</span>
                        </div>

                        <button type="submit" disabled={loading} style={styles.submitBtn}>
                            {loading ? 'Processing...' : 'Sign In ➔'}
                        </button>
                    </form>

                    <div style={styles.dividerRow}>
                        <div style={styles.line}></div>
                        <span style={styles.dividerText}>OR</span>
                        <div style={styles.line}></div>
                    </div>

                    {/* CONTINUED GOOGLE AUTH BUTTON */}
                    <button onClick={handleGoogleLogin} style={styles.googleBtn}>
                        <svg style={styles.googleIcon} viewBox="0 0 24 24" width="18" height="18">
                            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.53-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-8.17z" />
                            <path fill="#34A853" d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.08 1.16-3.13 0-5.78-2.11-6.73-4.96H1.21v3.15C3.18 21.88 7.31 24 12 24z" />
                            <path fill="#34A853" d="M5.27 14.24A7.16 7.16 0 0 1 5 12c0-.79.13-1.57.38-2.31V6.54H1.21A11.94 11.94 0 0 0 0 12c0 1.92.45 3.74 1.21 5.46l4.06-3.22z" />
                            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.18 2.12 1.21 5.46l4.06 3.22c.95-2.85 3.6-4.93 6.73-4.93z" />
                        </svg>
                        Continue with Google
                    </button>

                </div>
            </div>
        </div>
    );
};

// Styling Configuration
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#070a12',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '20px'
    },
    card: {
        display: 'md:flex',
        width: '100%',
        maxWidth: '960px',
        backgroundColor: '#121826',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
    },
    leftSection: {
        flex: 1.1,
        background: 'linear-gradient(135deg, #112211 0%, #152c15 100%)',
        padding: '48px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative'
    },
    brandContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    brandIcon: {
        fontSize: '22px'
    },
    brandTitle: {
        color: '#34A853',
        fontSize: '22px',
        fontWeight: 'bold',
        margin: 0
    },
    leftMiddleContent: {
        margin: 'auto 0'
    },
    mainHeading: {
        color: '#ffffff',
        fontSize: '34px',
        fontWeight: '800',
        lineHeight: '1.2',
        marginBottom: '16px'
    },
    subText: {
        color: '#94a3b8',
        fontSize: '14px',
        lineHeight: '1.6',
        margin: 0
    },
    footerText: {
        color: '#64748b',
        fontSize: '12px',
        marginTop: '40px'
    },
    rightSection: {
        flex: 1,
        padding: '48px',
        backgroundColor: '#0f1420',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    formTitle: {
        color: '#ffffff',
        fontSize: '28px',
        fontWeight: '700',
        margin: 0
    },
    signUpText: {
        color: '#64748b',
        fontSize: '14px',
        marginTop: '6px',
        marginBottom: '24px'
    },
    linkText: {
        color: '#34A853',
        cursor: 'pointer',
        fontWeight: '600'
    },
    demoContainer: {
        marginBottom: '24px'
    },
    demoLabel: {
        color: '#64748b',
        fontSize: '11px',
        fontWeight: '700',
        letterSpacing: '0.05em',
        display: 'block',
        marginBottom: '8px'
    },
    btnRow: {
        display: 'flex',
        gap: '8px'
    },
    demoBtn: {
        padding: '6px 16px',
        backgroundColor: '#1a2236',
        border: '1px solid #2d3748',
        color: '#94a3b8',
        borderRadius: '20px',
        fontSize: '12px',
        cursor: 'pointer',
        transition: 'all 0.2s'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
    },
    label: {
        color: '#94a3b8',
        fontSize: '13px',
        fontWeight: '500'
    },
    inputWrapper: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
    },
    inputIcon: {
        position: 'absolute',
        left: '14px',
        color: '#475569',
        fontSize: '15px'
    },
    eyeIcon: {
        position: 'absolute',
        right: '14px',
        color: '#94a3b8',
        cursor: 'pointer',
        userSelect: 'none',
        fontSize: '16px'
    },
    input: {
        width: '100%',
        padding: '12px 40px 12px 40px',
        backgroundColor: '#090d16',
        border: '1px solid #1e293b',
        borderRadius: '8px',
        color: '#ffffff',
        fontSize: '14px',
        outline: 'none',
        transition: 'border-color 0.2s'
    },
    forgotRow: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '-4px'
    },
    forgotLink: {
        color: '#34A853',
        fontSize: '12px',
        cursor: 'pointer'
    },
    submitBtn: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#34A853',
        color: '#000000',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '700',
        cursor: 'pointer',
        marginTop: '8px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '6px'
    },
    dividerRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        margin: '20px 0'
    },
    line: {
        flex: 1,
        height: '1px',
        backgroundColor: '#1e293b'
    },
    dividerText: {
        color: '#475569',
        fontSize: '12px',
        fontWeight: '600'
    },
    googleBtn: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#090d16',
        border: '1px solid #1e293b',
        borderRadius: '8px',
        color: '#ffffff',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        transition: 'background-color 0.2s'
    },
    googleIcon: {
        display: 'block'
    },
    errorAlert: {
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        border: '1px solid #ef4444',
        color: '#f87171',
        padding: '12px',
        borderRadius: '8px',
        fontSize: '13px',
        marginBottom: '16px'
    },
    successAlert: {
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        border: '1px solid #22c55e',
        color: '#4ade80',
        padding: '12px',
        borderRadius: '8px',
        fontSize: '13px',
        marginBottom: '16px'
    }
};

export default Login;