'use client';

import React, { useState, useEffect } from 'react';
import './styles.css';

interface Tip {
    rank: number;
    match: string;
    league: string;
    kickoff: string;
    tipster: string;
    ROI: string;
    prediction: string;
    odds: string;
    source: string;
    fire: boolean;
    hotTip: boolean;
}

interface TipsData {
    today: Tip[];
    tomorrow: Tip[];
}

const HomePage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [tips, setTips] = useState<TipsData | null>(null);
    const [activeTab, setActiveTab] = useState<'today' | 'tomorrow'>('today');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTips = async () => {
            try {
                const response = await fetch('/api/daily-tips-lineup');
                const data = await response.json();
                setTips(data);
            } catch (error) {
                console.error('Error fetching tips:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTips();
    }, []);

    const displayedTips = tips ? tips[activeTab] : [];

    const filteredTips = displayedTips.filter(tip =>
        tip.match.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tip.league.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tip.tipster.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatKickoff = (iso: string) => {
        const date = new Date(iso);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="homepage">
            <div className="animated-background"></div>

            <div className="hero-section">
                <h1>⚽ Betting Tips Today</h1>
                <p className="hero-subtitle">AI-powered consensus picks from the top tipsters</p>

                <div className="search-container">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search matches, leagues, or tipsters..."
                        className="search-input"
                    />
                </div>
            </div>

            <div className="tips-section">
                <div className="tabs">
                    <button
                        className={`tab-btn ${activeTab === 'today' ? 'active' : ''}`}
                        onClick={() => setActiveTab('today')}
                    >
                        📅 Today&apos;s Tips
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'tomorrow' ? 'active' : ''}`}
                        onClick={() => setActiveTab('tomorrow')}
                    >
                        🌅 Tomorrow&apos;s Tips
                    </button>
                </div>

                {loading ? (
                    <div className="loading">Loading tips...</div>
                ) : (
                    <div className="tips-grid">
                        {filteredTips.length === 0 ? (
                            <div className="no-results">No tips found matching your search.</div>
                        ) : (
                            filteredTips.map((tip) => (
                                <div key={tip.rank} className={`tip-card ${tip.fire ? 'fire-card' : ''}`}>
                                    <div className="tip-card-header">
                                        <span className="rank">#{tip.rank}</span>
                                        <span className="league">{tip.league}</span>
                                        <span className="badges">
                                            {tip.fire && <span className="badge fire-badge">🔥 Fire</span>}
                                            {tip.hotTip && <span className="badge hot-badge">⭐ Hot</span>}
                                        </span>
                                    </div>
                                    <div className="tip-match">{tip.match}</div>
                                    <div className="tip-details">
                                        <div className="tip-detail">
                                            <span className="label">Prediction</span>
                                            <span className="value prediction">{tip.prediction}</span>
                                        </div>
                                        <div className="tip-detail">
                                            <span className="label">Odds</span>
                                            <span className="value odds">{tip.odds}</span>
                                        </div>
                                        <div className="tip-detail">
                                            <span className="label">ROI</span>
                                            <span className="value roi">{tip.ROI}</span>
                                        </div>
                                        <div className="tip-detail">
                                            <span className="label">Kickoff</span>
                                            <span className="value">{formatKickoff(tip.kickoff)}</span>
                                        </div>
                                    </div>
                                    <div className="tip-footer">
                                        <span className="tipster">👤 {tip.tipster}</span>
                                        <span className="source">📡 {tip.source}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
