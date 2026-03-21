import { NextResponse } from 'next/server';

const firePicks = [
    { pick: 'Team A wins', percentage: 75, rating: '🔥🔥🔥🔥' },
    { pick: 'Team B wins', percentage: 80, rating: '🔥🔥🔥🔥🔥' },
    { pick: 'Team C Draw', percentage: 65, rating: '🔥🔥🔥' },
];

const hotPicks = [
    { pick: 'Team C wins', percentage: 70, rating: '🔥🔥🔥🔥' },
    { pick: 'Team D wins', percentage: 90, rating: '🔥🔥🔥🔥🔥' },
    { pick: 'Team E wins', percentage: 60, rating: '🔥🔥🔥' },
];

export async function GET() {
    const statistics = [
        { name: 'Total Tips Today', value: 12 },
        { name: 'Average ROI', value: '7.2%' },
        { name: 'Win Rate', value: '68%' },
        { name: 'Top Odds', value: '3.0' },
        { name: 'Fire Picks', value: firePicks.length },
        { name: 'Hot Tips', value: hotPicks.length },
    ];

    return NextResponse.json({
        firePicks,
        hotPicks,
        firePicksCount: firePicks.length,
        hotPicksCount: hotPicks.length,
        statistics,
    });
}