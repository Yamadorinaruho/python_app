import os
import logging
import json
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
from dotenv import load_dotenv

# 環境変数のロード
load_dotenv()

# ログの設定
logging.basicConfig(level=logging.DEBUG)

# FastAPIのインスタンス作成
app = FastAPI()

# 全てのオリジンを許可
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Google Generative AIの設定
genai.configure(api_key=os.environ["GOOGLE_API_KEY"])
model = genai.GenerativeModel('gemini-1.5-pro-latest')

# リクエストモデルの定義
class GenerateRequest(BaseModel):
    date: str
    destination: str
    details: str
    numPeople: int

# レスポンスモデルの定義
class GenerateResponse(BaseModel):
    response: dict

@app.post("/generate_content", response_model=GenerateResponse)
async def generate_content(request: GenerateRequest):
    try:
        prompt = f"""
        旅行計画を立ててください。以下の情報を含めてください：
        - 目的地: {request.destination}
        - 日時: {request.date}
        - 人数: {request.numPeople}人
        - 目的: {request.details}
        
        出力形式は以下のJSON形式にしてください：
        {{
            "旅行タイトル": "旅行の概要を簡単に説明するタイトル",
            "詳細スケジュール": [
                {{
                    "日付": "日付",
                    "スケジュール": {{
                        "朝": "朝のスケジュール(例: 朝食、観光など)",
                        "昼": "昼のスケジュール（例: 昼食、観光など）",
                        "夜": "夜のスケジュール（例: 夕食、観光など）"
                    }}
                }}
            ]
        }}
        """
        logging.debug(f"Generated prompt: {prompt}")
        
        response = model.generate_content(prompt)
        logging.debug(f"Generated response: {response.text}")
        
        # 生成されたJSONをパースして辞書形式に変換
        response_text = response.text.strip().strip('```json').strip()
        response_dict = json.loads(response_text)
        
        # Pydanticモデルに変換
        result = GenerateResponse(response=response_dict)
        return result
    except Exception as e:
        logging.error(f"Error in generate_content: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
