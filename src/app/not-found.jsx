"use client";
import React from 'react';

const NotFound = () => {
    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>404</h1>
                <h2 style={styles.heading}>Page Not Found</h2>
                <p style={styles.text}>The page you are looking for does not exist or has been moved.</p>
                <button 
                    onClick={() => window.location.href = "/"} 
                    style={styles.button}
                >
                    Go Back Home
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#070a12',
        color: '#ffffff',
        fontFamily: 'system-ui, sans-serif'
    },
    card: {
        textAlign: 'center',
        padding: '40px',
        backgroundColor: '#121826',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
        maxWidth: '400px'
    },
    title: {
        fontSize: '80px',
        fontWeight: '800',
        color: 'green',
        margin: '0'
    },
    heading: {
        fontSize: '24px',
        margin: '10px 0'
    },
    text: {
        color: '#94a3b8',
        marginBottom: '30px'
    },
    button: {
        padding: '12px 24px',
        backgroundColor: 'green',
        color: '#000000',
        border: 'none',
        borderRadius: '8px',
        fontWeight: 'bold',
        cursor: 'pointer'
    }
};

export default NotFound;