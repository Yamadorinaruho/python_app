import React, { useState } from 'react';
import axios from 'axios';

const GeminiAPI = () => {
    const [destination, setDestination] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleClick = async () => {
        try {
            const response = await axios.post('http://localhost:8000/plan_trip', {
                location: '京都',
                duration: 1,
                activities: ['観光', '食事', '散策']
            });
            setSuggestions(response.data.plan);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    return (
        <div>
            <h1>Gemini API Travel Suggestions</h1>
            <button onClick={handleClick}>Get Travel Suggestions</button>
            <div>
                {suggestions && suggestions.map((suggestion, index) => (
                    <p key={index}>{suggestion}</p>
                ))}
            </div>
        </div>
    );
};

export default GeminiAPI;
