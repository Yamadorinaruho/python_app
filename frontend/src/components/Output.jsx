import React from 'react';
import './Output.css'; 
import { Link } from 'react-router-dom';

const Output = ({ response }) => {
    return (
        <div className="output-container">
            <input type="text" className="rectangleoutput" placeholder="提案" value={response ? response.旅行タイトル : ''} readOnly />
            <div className="button-containeroutput">
                <button className="buttonoutput">GoogleCalenderに追加</button>
                <Link to="/" className="buttonoutput">もう一度提案してもらう</Link>
            </div>
            {response && (
                <div className="response-container">
                    <h2>{response.旅行タイトル}</h2>
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

export default Output;
