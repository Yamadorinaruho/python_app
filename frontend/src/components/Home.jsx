import React from 'react';
import './Home.css'; // CSSファイルをインポート
import { FaMapMarkerAlt, FaCalendarAlt, FaUser } from 'react-icons/fa'; // 使用するアイコンをインポート
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container">
            <img src="/img/oceanhouse2.jpg" alt="Ocean House" className="full-screen-image" />
            <div className="rectangle-container">
                <div className="input-with-icon">
                    <FaMapMarkerAlt className="input-icon" />
                    <input type="text" className="rectangle small-rectangle-1" placeholder="目的地" />
                </div>
                <div className="input-with-icon">
                    <FaCalendarAlt className="input-icon" />
                    <input type="text" className="rectangle small-rectangle-2" placeholder="日付" />
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