from fastapi import APIRouter
from db import validate_user, create_user, validate_manager, get_menu, get_restaurants

login_router = APIRouter(
    prefix="",
    tags=["login"]
)

@login_router.post("/login")
async def login_client(login: str, password: str) -> dict:
    return validate_user(login=login, password=password, type="client")


@login_router.post("/register")
async def register_client(login: str, password: str) -> dict:
    return create_user(login=login, password=password)


@login_router.post("/staff")
async def login_staff(login: str, password: str) -> dict:
    return validate_user(login=login, password=password, type="staff")


@login_router.post("/manager/{restaurant}")
async def login_manager(login: str, password: str, restaurant: str) -> dict:
    return validate_manager(login=login, password=password, restaurant=restaurant)


info_router = APIRouter(
    prefix="",
    tags=["info"]
)

@info_router.get("/menu")
async def menu(restaurant: str):
    return get_menu(restaurant=restaurant)


@info_router.get("/restaurants")
async def restaurants():
    return get_restaurants()