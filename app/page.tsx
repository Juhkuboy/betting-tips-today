'use client';

import React, { useState } from 'react';
import './styles.css';

const HomePage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = () => {
        console.log('Search for:', searchQuery);
    };

    return (
        <div className="homepage">
            <div className="animated-background"></div>
            <h1>Welcome to Betting Tips Today</h1>
            <input 
                type="text" 
                value={searchQuery} 
                onChange={handleSearchChange} 
                placeholder="Search for tips..."
            />
            <button onClick={handleSearchSubmit}>Search</button>
        </div>
    );
};

export default HomePage;
