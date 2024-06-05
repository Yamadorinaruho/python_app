import React from 'react';
import { RiHome2Line, RiSearchLine, RiUserLine, RiInformationLine } from 'react-icons/ri'; // react-icons/riから必要なアイコンをインポート
import './Header.css'; // スタイルを定義したCSSファイルをインポート

const Header = () => {
    return (
        <header>
            <nav>
                {/* 左側のナビゲーション */}
            </nav>
            <div className="center">
                <div className="title">
                    <h1>旅行提案アプリ</h1>
                </div>
                <div className="actions">
                    <div className="action-item">
                        <a href="#"><RiHome2Line />　ホーム</a>
                    </div>
                    <div className="action-item">
                        <a href="#"><RiSearchLine />　見つける</a>
                    </div>
                    <div className="action-item">
                        <a href="#"><RiSearchLine />　検索</a>
                    </div>
                    <div className="action-item">
                        <a href="#"><RiInformationLine />　概要</a>
                    </div>
                    <div className="action-item">
                        <a href="#"><RiUserLine />　ユーザー</a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;