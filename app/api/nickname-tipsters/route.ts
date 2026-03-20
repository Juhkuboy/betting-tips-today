import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const nickname = searchParams.get('nickname');

    // Replace with actual data retrieval logic
    const tipsterData = getTipsterDataByNickname(nickname);

    if (!tipsterData) {
        return NextResponse.json({ error: 'Tipster not found' }, { status: 404 });
    }

    return NextResponse.json(tipsterData);
}

function getTipsterDataByNickname(nickname) {
    // Sample data; replace with your actual data source
    const sampleTipsters = {
        'coolTipster': { ROI: 10.5, verified: true, reliability: 75 },
        'expertGambler': { ROI: 15.2, verified: false, reliability: 80 },
    };
    return sampleTipsters[nickname];
}