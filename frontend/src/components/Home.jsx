import React, { useState } from 'react';
import axios from 'axios';
import './Home.css'; // CSSファイルをインポート
import { FaMapMarkerAlt, FaCalendarAlt, FaUser } from 'react-icons/fa'; // 使用するアイコンをインポート
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TravelApp = () => {
    const [dateRange, setDateRange] = useState([new Date(), new Date()]);  // 旅行の日付の範囲を管理する
    const [destination, setDestination] = useState('');
    const [details, setDetails] = useState('');
    const [numPeople, setNumPeople] = useState(1);
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getSchedule = async () => {
        const requestData = {
            date: dateRange.map(date => date.toISOString().split('T')[0]).join(' - '),
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
            <div className="rectangle-container">
                <div className="input-with-icon">
                    <FaMapMarkerAlt className="input-icon" />
                    <input
                        type="text"
                        className="rectangle small-rectangle-1"
                        placeholder="目的地"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                    />
                </div>
                <div className="input-with-icon">
                    <FaCalendarAlt className="input-icon" />
                    <DatePicker
                        onChange={dates => setDateRange(dates)} // 開始日と終了日の配列
                        startDate={dateRange[0]} // 開始日
                        endDate={dateRange[1]} // 終了日
                        dateFormat="yyyy/MM/dd"
                        selectsRange // 日付の範囲
                        placeholderText="旅行の日付を選択"
                        className="rectangle small-rectangle-2"
                    />
                </div>
                <div className="input-with-icon">
                    <FaUser className="input-icon" />
                    <select
                        className="rectangle small-rectangle-3"
                        value={numPeople}
                        onChange={(e) => setNumPeople(parseInt(e.target.value))}
                    >
                        {[...Array(10)].map((_, i) => (
                            <option key={i} value={i + 1}>{i + 1}人</option>
                        ))}
                    </select>
                </div>
            </div>
            <input
                type="text"
                className="rectangle long-rectangle"
                placeholder="詳細を書いてください"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
            />
            <button onClick={getSchedule} disabled={loading} className="btn">
                {loading ? 'Loading...' : '提案してもらう'}
            </button>
            {error && (
                <div className="error">
                    {error}
                </div>
            )}
            {response && (
                <div className="response-container">
                    <h2>{response.旅行タイトル}</h2>
                    {response.旅行タイトル画像 && (
                        <img src={response.旅行タイトル画像} alt="旅行タイトル画像" className="title-image" />
                    )}
                    <h3>詳細スケジュール:</h3>
                    {response.詳細スケジュール.map((detail, index) => (
                        <div key={index} className="schedule-detail">
                            <div>
                                <strong>日付:</strong> {detail.日付}
                            </div>
                            <div>
                                <strong>朝:</strong> {detail.スケジュール.朝}<br />
                                <strong>朝の場所:</strong> {detail.スケジュール.朝の場所}
                                {detail.スケジュール.朝の場所画像 && (
                                    <img src={detail.スケジュール.朝の場所画像} alt="朝の場所画像" className="place-image" />
                                )}
                            </div>
                            <div>
                                <strong>昼:</strong> {detail.スケジュール.昼}<br />
                                <strong>昼の場所:</strong> {detail.スケジュール.昼の場所}
                                {detail.スケジュール.昼の場所画像 && (
                                    <img src={detail.スケジュール.昼の場所画像} alt="昼の場所画像" className="place-image" />
                                )}
                            </div>
                            <div>
                                <strong>夜:</strong> {detail.スケジュール.夜}<br />
                                <strong>夜の場所:</strong> {detail.スケジュール.夜の場所}
                                {detail.スケジュール.夜の場所画像 && (
                                    <img src={detail.スケジュール.夜の場所画像} alt="夜の場所画像" className="place-image" />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TravelApp;