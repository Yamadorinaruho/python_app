// WaveBackground.js
import React from 'react';
import './WaveBackground.css';
import { useLocation } from 'react-router-dom'; // useLocationをインポート

const WaveBackground = () => {
  // ページのロケーション情報を取得
  const location = useLocation();

  // Outputコンポーネントに遷移しているかどうかを確認
  const isOutputPage = location.pathname === '/output';

  return (
    <div className="wave-container">
      {/* Outputコンポーネントに遷移している場合 */}
      {isOutputPage && (
        <div className="method">
          <h1>おすすめの旅行先を提案します</h1>
          <ul>
            <li>3つの提案を記します</li>
            <li>Google Calendarに追加する</li>
            <li>もう一度提案する</li>
          </ul>
        </div>
      )}
      {/* Homeの場合 */}
      {!isOutputPage && (
        <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
             viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"/>
          </defs>
          <g className="parallax">
            <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(224,247,250,0.7)" />
            <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(224,247,250,0.5)" />
            <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(224,247,250,0.3)" />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="rgba(224,247,250)" />
          </g>
        </svg>
      )}
    </div>
  );
};

export default WaveBackground;
