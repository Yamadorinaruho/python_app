import os
import logging
import json
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
from dotenv import load_dotenv
import requests

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

def fetch_image(query: str) -> str:
    pixabay_api_key = os.environ["PIXABAY_API_KEY"]
    url = f"https://pixabay.com/api/?key={pixabay_api_key}&q={query}&image_type=photo"
    response = requests.get(url)
    data = response.json()
    if "hits" in data and len(data["hits"]) > 0:
        return data["hits"][0]["webformatURL"]
    return ""

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
                        "朝": "具体的な朝のスケジュール（面白い文章にしてください）",
                        "朝の場所":"具体的な建物名(1つに決めてください)",
                        "昼": "昼の具体的なスケジュール200字（面白い文章にしてください）",
                        "昼の場所": "具体的な建物名(1つに決めてください)",
                        "夜": "夜の具体的なスケジュール200字（面白い文章にしてください）",
                        "夜の場所": "具体的な建物名(1つに決めてください)"
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
        
        # 目的地から画像を取得
        title_image_url = fetch_image(request.destination)
        response_dict["旅行タイトル画像"] = title_image_url

        # 朝、昼、夜の場所の画像を取得
        for schedule in response_dict["詳細スケジュール"]:
            if "朝の場所" in schedule["スケジュール"]:
                morning_place_image = fetch_image(schedule["スケジュール"]["朝の場所"])
                schedule["スケジュール"]["朝の場所画像"] = morning_place_image
            if "昼の場所" in schedule["スケジュール"]:
                afternoon_place_image = fetch_image(schedule["スケジュール"]["昼の場所"])
                schedule["スケジュール"]["昼の場所画像"] = afternoon_place_image
            if "夜の場所" in schedule["スケジュール"]:
                night_place_image = fetch_image(schedule["スケジュール"]["夜の場所"])
                schedule["スケジュール"]["夜の場所画像"] = night_place_image
        
        # Pydanticモデルに変換
        result = GenerateResponse(response=response_dict)
        return result
    except Exception as e:
        logging.error(f"Error in generate_content: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
