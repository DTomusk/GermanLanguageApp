@echo off
start cmd /k "uvicorn app.main:app --host 127.0.0.1 --port 8000 --env-file .env --reload"
cd web
start cmd /k "npm run dev"