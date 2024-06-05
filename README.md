# プロジェクトのセットアップ手順

このドキュメントでは、プロジェクトをセットアップし、Dockerを使用してコンテナを立ち上げる手順を説明します。

## 前提条件

- Gitがインストールされていること
- Dockerがインストールされていること
- Docker Composeがインストールされていること

## 手順

### 1. リポジトリのクローン

リポジトリをローカル環境にクローンします。

git clone https://github.com/Yamadorinaruho/python_app.git
cd python_app


2. パッケージのインストール
プロジェクトの依存関係をインストールします。
npm install


3. Dockerコンテナのビルドと起動
Docker Composeを使用してコンテナをビルドし、起動します。
docker-compose up --build

### Reactに関して
以下のコマンド入力が必要かもしれません。

アイコン，DOMのインストール

`npm install react-icons`

`npm install react-router-dom@latest`


ReactのURL 　http://localhost:3000/
PythonのURL 　http://127.0.0.1:8000/
