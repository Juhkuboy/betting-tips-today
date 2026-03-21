'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Pick {
    pick: string;
    percentage: number;
    rating: string;
}

interface Stat {
    name: string;
    value: string | number;
}

interface PickRowProps {
    pick: Pick;
    accentColor: string;
    borderColor: string;
    bgColor: string;
}

const PickRow: React.FC<PickRowProps> = ({ pick, accentColor, borderColor, bgColor }) => (
    <div style={{
        background: 'rgba(30, 41, 59, 0.85)',
        border: `1px solid ${borderColor}`,
        borderRadius: '0.75rem',
        padding: '1rem 1.25rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    }}>
        <div>
            <div style={{ fontWeight: 600, color: '#f1f5f9', marginBottom: '0.25rem' }}>{pick.pick}</div>
            <div style={{ fontSize: '1rem' }}>{pick.rating}</div>
        </div>
        <div style={{
            background: bgColor,
            color: accentColor,
            padding: '0.3rem 0.8rem',
            borderRadius: '1rem',
            fontWeight: 700,
            fontSize: '0.9rem',
        }}>
            {pick.percentage}%
        </div>
    </div>
);

const HotTipsPage: React.FC = () => {
    const [firePicks, setFirePicks] = useState<Pick[]>([]);
    const [hotPicks, setHotPicks] = useState<Pick[]>([]);
    const [firePicksCount, setFirePicksCount] = useState<number>(0);
    const [hotPicksCount, setHotPicksCount] = useState<number>(0);
    const [statistics, setStatistics] = useState<Stat[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHotTipsConsensus = async () => {
            try {
                const response = await fetch('/api/hot-tips-consensus');
                const data = await response.json();
                setFirePicks(data.firePicks ?? []);
                setHotPicks(data.hotPicks ?? []);
                setFirePicksCount(data.firePicksCount ?? 0);
                setHotPicksCount(data.hotPicksCount ?? 0);
                setStatistics(data.statistics ?? []);
            } catch (error) {
                console.error('Error fetching hot tips:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchHotTipsConsensus();
    }, []);

    return (
        <div style={{
            minHeight: '100vh',
            padding: '2rem',
            maxWidth: '900px',
            margin: '0 auto',
        }}>
            <div style={{ marginBottom: '1.5rem' }}>
                <Link href="/" style={{
                    color: '#94a3b8',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                }}>
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
                🔥 Hot Tips
            </h1>
            <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
                Today&apos;s highest-consensus picks from our top tipsters
            </p>

            {loading ? (
                <div style={{ textAlign: 'center', color: '#94a3b8', padding: '3rem' }}>
                    Loading hot tips...
                </div>
            ) : (
                <>
                    {/* Summary Cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            borderRadius: '0.75rem',
                            padding: '1.25rem',
                            textAlign: 'center',
                        }}>
                            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f87171' }}>{firePicksCount}</div>
                            <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>🔥 Fire Picks</div>
                        </div>
                        <div style={{
                            background: 'rgba(251, 191, 36, 0.1)',
                            border: '1px solid rgba(251, 191, 36, 0.3)',
                            borderRadius: '0.75rem',
                            padding: '1.25rem',
                            textAlign: 'center',
                        }}>
                            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fbbf24' }}>{hotPicksCount}</div>
                            <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>⭐ Hot Tips</div>
                        </div>
                    </div>

                    {/* Fire Picks */}
                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ color: '#f87171', fontSize: '1.4rem', marginBottom: '1rem' }}>🔥 Fire Picks</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {firePicks.map((fp, i) => (
                                <PickRow
                                    key={i}
                                    pick={fp}
                                    accentColor="#f87171"
                                    borderColor="rgba(239, 68, 68, 0.3)"
                                    bgColor="rgba(239, 68, 68, 0.15)"
                                />
                            ))}
                        </div>
                    </section>

                    {/* Hot Picks */}
                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ color: '#fbbf24', fontSize: '1.4rem', marginBottom: '1rem' }}>⭐ Hot Tips</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {hotPicks.map((hp, i) => (
                                <PickRow
                                    key={i}
                                    pick={hp}
                                    accentColor="#fbbf24"
                                    borderColor="rgba(251, 191, 36, 0.3)"
                                    bgColor="rgba(251, 191, 36, 0.15)"
                                />
                            ))}
                        </div>
                    </section>


                    {/* Statistics */}
                    <section>
                        <h2 style={{ color: '#60a5fa', fontSize: '1.4rem', marginBottom: '1rem' }}>📊 Statistics</h2>
                        <div style={{
                            background: 'rgba(30, 41, 59, 0.85)',
                            border: '1px solid #334155',
                            borderRadius: '0.75rem',
                            overflow: 'hidden',
                        }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ background: 'rgba(15, 23, 42, 0.5)' }}>
                                        <th style={{ padding: '0.75rem 1.25rem', textAlign: 'left', color: '#94a3b8', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Metric</th>
                                        <th style={{ padding: '0.75rem 1.25rem', textAlign: 'right', color: '#94a3b8', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {statistics.map((stat, index) => (
                                        <tr key={index} style={{ borderTop: '1px solid #1e293b' }}>
                                            <td style={{ padding: '0.75rem 1.25rem', color: '#cbd5e1' }}>{stat.name}</td>
                                            <td style={{ padding: '0.75rem 1.25rem', textAlign: 'right', color: '#fbbf24', fontWeight: 600 }}>{stat.value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </>
            )}
        </div>
    );
};

export default HotTipsPage;
