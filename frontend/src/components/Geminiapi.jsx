import React, { useState } from 'react';
import axios from 'axios';
import './GeminiApi.css';

const GeminiApi = () => {
    const [date, setDate] = useState('');
    const [destination, setDestination] = useState('');
    const [details, setDetails] = useState('');
    const [numPeople, setNumPeople] = useState('');
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getSchedule = async () => {
        const requestData = {
            date,
            destination,
            details,
            numPeople,
        };

        setLoading(true);
        setError(null);

        try {
            const res = await axios.post('http://localhost:8000/generate_content', requestData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setResponse(res.data.response);
        } catch (error) {
            console.error('Error fetching schedule:', error);
            setError('Failed to fetch schedule. Please try again later. ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1>旅行提案アプリ</h1>
            <div className="form-group">
                <label>
                    目的地:
                    <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} />
                </label>
            </div>
            <div className="form-group">
                <label>
                    日時:
                    <input type="text" value={date} onChange={(e) => setDate(e.target.value)} />
                </label>
            </div>
            <div className="form-group">
                <label>
                    人数:
                    <input type="number" value={numPeople} onChange={(e) => setNumPeople(e.target.value)} />
                </label>
            </div>
            <div className="form-group">
                <label>
                    目的:
                    <input type="text" value={details} onChange={(e) => setDetails(e.target.value)} />
                </label>
            </div>
            <button onClick={getSchedule} disabled={loading} className="submit-button">
                {loading ? 'Loading...' : 'Get Schedule'}
            </button>
            {error && (
                <div className="error">
                    {error}
                </div>
            )}
            {response && (
                <div className="response-container">
                    <h2>{response.旅行タイトル}</h2>
                    <div>
                        <strong>日時:</strong> {response.日時}
                    </div>
                    <div>
                        <strong>人数:</strong> {response.人数}
                    </div>
                    <div>
                        <strong>説明:</strong> {response.説明}
                    </div>
                    <h3>詳細スケジュール:</h3>
                    {response.詳細スケジュール.map((detail, index) => (
                        <div key={index} className="schedule-detail">
                            <h4>スケジュール {index + 1}:</h4>
                            <p>{detail.スケジュール詳細}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GeminiApi;
