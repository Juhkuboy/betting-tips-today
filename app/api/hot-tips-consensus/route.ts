import { NextResponse } from 'next/server';

// Mock data for demonstration purposes
const firePicks = [
    { pick: 'Team A wins', percentage: 75, rating: '🔥🔥🔥🔥', },
    { pick: 'Team B wins', percentage: 80, rating: '🔥🔥🔥🔥🔥', },
];

const hotPicks = [
    { pick: 'Team C wins', percentage: 70, rating: '🔥🔥🔥🔥', },
    { pick: 'Team D wins', percentage: 90, rating: '🔥🔥🔥🔥🔥', },
];

export async function GET() {
    return NextResponse.json({ firePicks, hotPicks });
}