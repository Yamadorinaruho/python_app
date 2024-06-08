import React from 'react';
import './Output.css'; 
import { Link } from 'react-router-dom';

const Output = () => {
    return (
        <div className="output-container">
            <input type="text" className="rectangleoutput" placeholder="提案１" />
            <input type="text" className="rectangleoutput" placeholder="提案２" />
            <input type="text" className="rectangleoutput" placeholder="提案３" />
            <div className="button-containeroutput">
                <button className="buttonoutput">GoogleCalenderに追加</button>
                <Link to="/" className="buttonoutput">もう一度提案してもらう</Link>
            </div>
        </div>
    );
};

export default Output;