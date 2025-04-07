@echo off
start cmd /k "uvicorn app.main:app --host 127.0.0.1 --port 8080 --env-file .env --reload --log-level debug"
cd web
start cmd /k "npm run dev"