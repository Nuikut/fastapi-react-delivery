import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db import create_user, validate_user, validate_manager, get_menu

app = FastAPI()

origins = [
    'http://localhost:3000'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/login")
async def login(username: str, password: str) -> dict:
    return validate_user(username=username, password=password)


@app.post("/register")
async def register_user(username: str, password: str) -> dict:
    return create_user(username=username, password=password)


@app.post("/manager")
async def login_manager(username: str, password: str) -> dict:
    return validate_manager(login=username, password=password)


@app.get("/menu")
async def menu(restaurant: str):
    return get_menu(restaurant=restaurant)


if __name__ == '__main__':
    uvicorn.run(app)
