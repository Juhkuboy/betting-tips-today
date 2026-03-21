import { NextResponse } from 'next/server';

const tipsters = [
    { id: '1', nickname: 'Totally', roi: 12.5, verified: true },
    { id: '2', nickname: 'Long WTA Games', roi: 8.3, verified: true },
    { id: '3', nickname: 'fluttr', roi: 15.2, verified: false },
    { id: '4', nickname: 'Gambling Garden', roi: 6.7, verified: true },
    { id: '5', nickname: 'SlavaG', roi: 9.1, verified: false },
    { id: '6', nickname: 'The Profit Rocket', roi: 18.4, verified: true },
    { id: '7', nickname: 'Pope Picks', roi: 7.9, verified: true },
    { id: '8', nickname: 'Footballer Tips', roi: 11.3, verified: false },
];

export async function GET() {
  return NextResponse.json({ success: true, tipsters });
}
