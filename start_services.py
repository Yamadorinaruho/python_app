import subprocess

# Reactアプリケーションの起動
react_start = subprocess.Popen(['npm', 'start'], cwd='frontend')

# FastAPIの起動
fastapi_start = subprocess.Popen(['uvicorn', 'main:app', '--host', '0.0.0.0', '--port', '8000'], cwd='backend')

# プロセスの待機
react_start.wait()
fastapi_start.wait()
