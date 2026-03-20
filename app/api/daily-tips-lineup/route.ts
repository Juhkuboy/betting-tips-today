import { NextResponse } from 'next/server';

export async function GET() {
    // Mock data for today and tomorrow's top 6 tips
    const todayTips = [
        { rank: 1, match: 'Team A vs Team B', league: 'Premier League', kickoff: '2026-03-20T15:30:00Z', tipster: 'Tipster1', ROI: '5%', prediction: 'Win', odds: '2.5', source: 'Source1', fire: true, hotTip: true },
        { rank: 2, match: 'Team C vs Team D', league: 'La Liga', kickoff: '2026-03-20T17:00:00Z', tipster: 'Tipster2', ROI: '8%', prediction: 'Draw', odds: '3.0', source: 'Source2', fire: false, hotTip: true },
        { rank: 3, match: 'Team E vs Team F', league: 'Bundesliga', kickoff: '2026-03-20T19:00:00Z', tipster: 'Tipster3', ROI: '6%', prediction: 'Lose', odds: '1.8', source: 'Source3', fire: true, hotTip: false },
        { rank: 4, match: 'Team G vs Team H', league: 'Serie A', kickoff: '2026-03-20T21:00:00Z', tipster: 'Tipster4', ROI: '7%', prediction: 'Win', odds: '2.0', source: 'Source4', fire: false, hotTip: true },
        { rank: 5, match: 'Team I vs Team J', league: 'Ligue 1', kickoff: '2026-03-20T23:00:00Z', tipster: 'Tipster5', ROI: '4%', prediction: 'Draw', odds: '2.2', source: 'Source5', fire: true, hotTip: false },
        { rank: 6, match: 'Team K vs Team L', league: 'Eredivisie', kickoff: '2026-03-20T20:30:00Z', tipster: 'Tipster6', ROI: '10%', prediction: 'Win', odds: '1.6', source: 'Source6', fire: true, hotTip: true },
    ];

    const tomorrowTips = [
        { rank: 1, match: 'Team M vs Team N', league: 'Premier League', kickoff: '2026-03-21T15:30:00Z', tipster: 'Tipster7', ROI: '5%', prediction: 'Win', odds: '2.5', source: 'Source7', fire: true, hotTip: true },
        { rank: 2, match: 'Team O vs Team P', league: 'La Liga', kickoff: '2026-03-21T17:00:00Z', tipster: 'Tipster8', ROI: '8%', prediction: 'Draw', odds: '3.0', source: 'Source8', fire: false, hotTip: true },
        { rank: 3, match: 'Team Q vs Team R', league: 'Bundesliga', kickoff: '2026-03-21T19:00:00Z', tipster: 'Tipster9', ROI: '6%', prediction: 'Lose', odds: '1.8', source: 'Source9', fire: true, hotTip: false },
        { rank: 4, match: 'Team S vs Team T', league: 'Serie A', kickoff: '2026-03-21T21:00:00Z', tipster: 'Tipster10', ROI: '7%', prediction: 'Win', odds: '2.0', source: 'Source10', fire: false, hotTip: true },
        { rank: 5, match: 'Team U vs Team V', league: 'Ligue 1', kickoff: '2026-03-21T23:00:00Z', tipster: 'Tipster11', ROI: '4%', prediction: 'Draw', odds: '2.2', source: 'Source11', fire: true, hotTip: false },
        { rank: 6, match: 'Team W vs Team X', league: 'Eredivisie', kickoff: '2026-03-21T20:30:00Z', tipster: 'Tipster12', ROI: '10%', prediction: 'Win', odds: '1.6', source: 'Source12', fire: true, hotTip: true },
    ];

    const tips = { today: todayTips, tomorrow: tomorrowTips };

    return NextResponse.json(tips);
} 
