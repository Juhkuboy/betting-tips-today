import React, { useEffect, useState } from 'react';

const HotTipsPage: React.FC = () => {
    const [firePicksCount, setFirePicksCount] = useState<number>(0);
    const [hotPicksCount, setHotPicksCount] = useState<number>(0);
    const [statistics, setStatistics] = useState<any[]>([]);

    useEffect(() => {
        const fetchHotTipsConsensus = async () => {
            const response = await fetch('/api/hot-tips-consensus');
            const data = await response.json();

            setFirePicksCount(data.firePicksCount);
            setHotPicksCount(data.hotPicksCount);
            setStatistics(data.statistics);
        };

        fetchHotTipsConsensus();
    }, []);

    return (
        <div>
            <h1>Hot Tips</h1>
            <div>
                <h2>Fire Picks Count: {firePicksCount}</h2>
                <h2>Hot Picks Count: {hotPicksCount}</h2>
            </div>
            <div>
                <h3>Statistics</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Stat Name</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {statistics.map((stat, index) => (
                            <tr key={index}>
                                <td>{stat.name}</td>
                                <td>{stat.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button onClick={() => window.history.back()}>Back</button>
        </div>
    );
};

export default HotTipsPage;
