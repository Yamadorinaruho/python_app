import React from 'react';
import './Output.css'; // Outputコンポーネント用のCSSファイルをインポート

const Output = () => {
    return (
        <div className="output-container">
            <input type="text" className="rectangleoutput" placeholder="提案１" />
            <input type="text" className="rectangleoutput" placeholder="提案２" />
            <input type="text" className="rectangleoutput" placeholder="提案３" />
            <div className="button-containeroutput">
                <button className="buttonoutput">GoogleCalenderに追加する</button>
                <button className="buttonoutput">もう一度提案してもらう</button>
            </div>
        </div>
    );
};

export default Output;