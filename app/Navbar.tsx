'use client';

import React from 'react';

const Navbar: React.FC = () => {
    return (
        <nav style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1a1f35 100%)',
            padding: '1rem 2rem',
            borderBottom: '1px solid #334155',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            <h2 style={{
                color: '#fbbf24',
                fontSize: '1.5rem',
                margin: 0,
            }}>
                ⚽ Betting Tips Today
            </h2>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="/" style={{ color: '#f1f5f9', textDecoration: 'none' }}>Home</a>
                <a href="/hot-tips" style={{ color: '#f1f5f9', textDecoration: 'none' }}>Hot Tips</a>
                <a href="/history" style={{ color: '#f1f5f9', textDecoration: 'none' }}>History</a>
            </div>
        </nav>
    );
};

export default Navbar;
