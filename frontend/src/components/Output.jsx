import React from 'react';
import './Output.css'; // Outputコンポーネント用のCSSファイルをインポート

const Output = () => {
    return (
        <div className="output-container">
            <div className="rectangleoutput">長方形１</div>
            <div className="rectangleoutput">長方形２</div>
            <div className="rectangleoutput">長方形３</div>
            <div className="button-containeroutput">
                <button className="buttonoutput">ボタン１</button>
                <button className="buttonoutput">ボタン２</button>
            </div>
        </div>
    );
};

export default Output;