import React, { useState } from 'react';
import './Home.css'; // CSSファイルをインポート
import { FaMapMarkerAlt, FaCalendarAlt, FaUser } from 'react-icons/fa'; // 使用するアイコンをインポート
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Home = () => {
    const [dateRange, setDateRange] = useState([new Date(), new Date()]);  // 旅行の日付の範囲を管理する

    return (
        <div className="container">
            <div className="rectangle-container">
                <div className="input-with-icon">
                    <FaMapMarkerAlt className="input-icon" />
                    <input type="text" className="rectangle small-rectangle-1" placeholder="目的地" />
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
                    <select className="rectangle small-rectangle-3">
                        <option value="1">1人</option>
                        <option value="2">2人</option>
                        <option value="3">3人</option>
                        <option value="4">4人</option>
                        <option value="5">5人</option>
                        <option value="6">6人</option>
                        <option value="7">7人</option>
                        <option value="8">8人</option>
                        <option value="9">9人</option>
                        <option value="10">10人</option>
                    </select>
                </div>
            </div>
            <input type="text" className="rectangle long-rectangle" placeholder="詳細を書いてください" />
            <Link to="/output" className="btn">提案してもらう</Link>
        </div>
    );
};

export default Home;
