'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Tipster {
    id: string;
    nickname: string;
    roi: number;
    verified: boolean;
}

const TipsterSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tipsters, setTipsters] = useState<Tipster[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTipsters = async () => {
      try {
        const response = await axios.get('/api/tipsters-detailed');
        const data = response.data;
        setTipsters(data.tipsters ?? []);
      } catch (error) {
        console.error('Error fetching tipsters:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTipsters();
  }, []);

  const filteredTipsters = tipsters.filter((tipster: Tipster) =>
    tipster.nickname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{
        minHeight: '100vh',
        padding: '2rem',
        maxWidth: '900px',
        margin: '0 auto',
    }}>
        <div style={{ marginBottom: '1.5rem' }}>
            <Link href="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem' }}>
                ← Back to Home
            </Link>
        </div>

        <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem',
        }}>
            📋 Tipster History
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
            Search and explore verified tipsters and their track records
        </p>

        <input
            type="text"
            placeholder="Search tipster nicknames..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
                width: '100%',
                padding: '0.9rem 1.25rem',
                border: '2px solid #334155',
                borderRadius: '0.75rem',
                background: 'rgba(30, 41, 59, 0.9)',
                color: '#f1f5f9',
                fontSize: '1rem',
                marginBottom: '1.5rem',
                outline: 'none',
                boxSizing: 'border-box',
            }}
        />

        {loading ? (
            <div style={{ textAlign: 'center', color: '#94a3b8', padding: '3rem' }}>
                Loading tipsters...
            </div>
        ) : filteredTipsters.length === 0 ? (
            <div style={{
                textAlign: 'center',
                color: '#64748b',
                padding: '3rem',
                background: 'rgba(30, 41, 59, 0.5)',
                borderRadius: '0.75rem',
                border: '1px solid #334155',
            }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔍</div>
                <div>No tipsters found{searchTerm ? ` matching "${searchTerm}"` : ''}.</div>
            </div>
        ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {filteredTipsters.map((tipster: Tipster) => (
                    <div key={tipster.id} style={{
                        background: 'rgba(30, 41, 59, 0.85)',
                        border: '1px solid #334155',
                        borderRadius: '0.75rem',
                        padding: '1rem 1.25rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{
                                width: '2.5rem',
                                height: '2.5rem',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #334155 0%, #1e293b 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.1rem',
                            }}>
                                👤
                            </div>
                            <div>
                                <div style={{ fontWeight: 600, color: '#f1f5f9' }}>
                                    {tipster.nickname}
                                    {tipster.verified && (
                                        <span style={{
                                            marginLeft: '0.4rem',
                                            background: 'rgba(52, 211, 153, 0.15)',
                                            color: '#34d399',
                                            fontSize: '0.7rem',
                                            padding: '0.1rem 0.4rem',
                                            borderRadius: '0.3rem',
                                            fontWeight: 600,
                                        }}>✓ Verified</span>
                                    )}
                                </div>
                                <div style={{ color: '#64748b', fontSize: '0.8rem' }}>
                                    {tipster.verified ? 'Verified tipster' : 'Unverified tipster'}
                                </div>
                            </div>
                        </div>
                        <div style={{
                            background: tipster.roi >= 0 ? 'rgba(52, 211, 153, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                            color: tipster.roi >= 0 ? '#34d399' : '#f87171',
                            padding: '0.3rem 0.8rem',
                            borderRadius: '1rem',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                        }}>
                            ROI: {tipster.roi}%
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
  );
};

export default TipsterSearch;
