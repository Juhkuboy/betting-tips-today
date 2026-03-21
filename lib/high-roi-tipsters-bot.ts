// lib/high-roi-tipsters-bot.ts
// Bot 1: High-ROI Tipsters Bot
// Fetches, filters and analyses tips from a curated list of high-ROI tipsters.

import axios from 'axios';

export interface Tip {
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

export interface BotStatistics {
    totalTips: number;
    hotTips: number;
    fireTips: number;
    averageOdds: number;
    averageROI: number;
    tipsByLeague: Record<string, number>;
    tipsByTipster: Record<string, number>;
    predictions: Record<string, number>;
    topTip: Tip | null;
}

export interface BotResult {
    fetchedAt: string;
    tips: Tip[];
    statistics: BotStatistics;
}

class HighRoiTipstersBot {
    private tipsters = [
        'Totally', 'Long WTA Games', 'fluttr', 'Gambling Garden',
        'SlavaG', 'The Profit Rocket', 'wyczkaPL', 'REAL_INFORMATION',
        'Pope Picks', 'Bronze Maison Club', 'Footballer Tips',
        'Dyole', 'don_andres', 'Pacopick', 'YvonBernard', 'nieder',
    ];

    /** Base URL for internal API calls. Defaults to localhost in non-browser environments. */
    private baseUrl: string;

    constructor(baseUrl = 'http://localhost:3000') {
        this.baseUrl = baseUrl;
    }

    /** Fetch today's tips from the daily-tips-lineup API and filter by high-ROI tipsters. */
    public async fetchTips(): Promise<Tip[]> {
        const response = await axios.get<{ today: Tip[]; tomorrow: Tip[] }>(
            `${this.baseUrl}/api/daily-tips-lineup`
        );
        const allTips: Tip[] = [
            ...(response.data.today ?? []),
            ...(response.data.tomorrow ?? []),
        ];
        return this.filterTips(allTips);
    }

    /** Keep only tips from the curated high-ROI tipsters list, excluding horse racing and
     *  restricted to odds between 1.50 and 3.50 (value betting range). */
    private filterTips(tips: Tip[]): Tip[] {
        const horseRacingPattern = /horse.?racing|horses/i;
        return tips.filter((tip) => {
            const odds = parseFloat(tip.odds);
            const isHighRoiTipster = this.tipsters.includes(tip.tipster);
            const isValueOdds = odds >= 1.5 && odds <= 3.5;
            const isNotHorseRacing =
                !horseRacingPattern.test(tip.league) &&
                !horseRacingPattern.test(tip.source);
            return isHighRoiTipster && isValueOdds && isNotHorseRacing;
        });
    }

    /** Derive summary statistics from a set of filtered tips. */
    public calculateStatistics(tips: Tip[]): BotStatistics {
        if (tips.length === 0) {
            return {
                totalTips: 0,
                hotTips: 0,
                fireTips: 0,
                averageOdds: 0,
                averageROI: 0,
                tipsByLeague: {},
                tipsByTipster: {},
                predictions: {},
                topTip: null,
            };
        }

        const hotTips = tips.filter((t) => t.hotTip).length;
        const fireTips = tips.filter((t) => t.fire).length;

        const totalOdds = tips.reduce((sum, t) => sum + parseFloat(t.odds), 0);
        const averageOdds = parseFloat((totalOdds / tips.length).toFixed(2));

        const totalROI = tips.reduce((sum, t) => sum + parseFloat(t.ROI), 0);
        const averageROI = parseFloat((totalROI / tips.length).toFixed(2));

        const tipsByLeague: Record<string, number> = {};
        const tipsByTipster: Record<string, number> = {};
        const predictions: Record<string, number> = {};

        for (const tip of tips) {
            tipsByLeague[tip.league] = (tipsByLeague[tip.league] ?? 0) + 1;
            tipsByTipster[tip.tipster] = (tipsByTipster[tip.tipster] ?? 0) + 1;
            predictions[tip.prediction] = (predictions[tip.prediction] ?? 0) + 1;
        }

        // Top tip = highest ROI among fire or hotTip entries, falling back to all tips.
        const candidates = tips.filter((t) => t.fire || t.hotTip);
        const pool = candidates.length > 0 ? candidates : tips;
        const topTip = pool.reduce((best, t) =>
            parseFloat(t.ROI) > parseFloat(best.ROI) ? t : best
        );

        return {
            totalTips: tips.length,
            hotTips,
            fireTips,
            averageOdds,
            averageROI,
            tipsByLeague,
            tipsByTipster,
            predictions,
            topTip,
        };
    }

    /** Convenience method: fetch tips and return tips + statistics together. */
    public async run(): Promise<BotResult> {
        const tips = await this.fetchTips();
        const statistics = this.calculateStatistics(tips);
        return {
            fetchedAt: new Date().toISOString(),
            tips,
            statistics,
        };
    }
}

export default HighRoiTipstersBot;