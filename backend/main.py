import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import login_router, info_router, admin_router

app = FastAPI()

origins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:80',
    'http://127.0.0.1:80'
]

# noinspection PyTypeChecker
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(login_router)
app.include_router(info_router)
app.include_router(admin_router)

if __name__ == '__main__':
    uvicorn.run(app)
