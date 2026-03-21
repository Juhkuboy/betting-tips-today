// app/api/bot1/route.ts
// HTTP endpoint that runs Bot 1 (High-ROI Tipsters Bot) and returns the result.

import { NextResponse } from 'next/server';
import HighRoiTipstersBot from '../../../lib/high-roi-tipsters-bot';

export async function GET(request: Request) {
    const { origin } = new URL(request.url);
    const bot = new HighRoiTipstersBot(origin);

    try {
        const result = await bot.run();
        return NextResponse.json(result);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
