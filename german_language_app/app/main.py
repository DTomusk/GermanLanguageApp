from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.routes import router
#from app.seeds import seed_database
#from app.nlp_utils import nlp
import logging

app = FastAPI(openapi_url="/openapi.json", docs_url="/docs", redoc_url="/redoc")

app.add_middleware(
     CORSMiddleware,
     allow_origins=["*"],  
     allow_credentials=True,
     allow_methods=["*"],
     allow_headers=["*"],
)

app.include_router(router)

for route in app.routes:
    print(route)

logging.basicConfig(level=logging.DEBUG)

#seed_database(".\\app\\deu_mixed-typical_2011_10K-words.txt", nlp)

# general case exception handler, improve as we go on 
@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    logging.error(f"Unexpected error: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={"error": "Internal Server Error", "details": str(exc)},
    )