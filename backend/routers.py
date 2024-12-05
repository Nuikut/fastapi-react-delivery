from fastapi import APIRouter
from db import validate_user, create_user, validate_manager, get_menu, get_restaurants, validate_token, make_order, \
    get_order
from schemas import Client, Manager, Staff, Order

login_router = APIRouter(
    prefix="",
    tags=["login"]
)


@login_router.post("/login")
async def login_client(user: Client) -> dict:
    return validate_user(login=user.login, password=user.password, type="client")


@login_router.post("/register")
async def register_client(user: Client) -> dict:
    return create_user(login=user.login, password=user.password)


@login_router.post("/staff")
async def login_staff(staff: Staff) -> dict:
    return validate_user(login=staff.login, password=staff.password, type="staff")


@login_router.post("/manager")
async def login_manager(manager: Manager) -> dict:
    return validate_manager(login=manager.login, password=manager.password, restaurant=manager.restaurant)


@login_router.get("/token")
async def check_token(token: str = None):
    return validate_token(token=token)


info_router = APIRouter(
    prefix="",
    tags=["info"]
)


@info_router.get("/menu")
async def menu(restaurant: str = None):
    return get_menu(restaurant=restaurant)


@info_router.get("/restaurants")
async def restaurants():
    return get_restaurants()


@info_router.post("/order")
async def place_order(order: Order):
    return make_order(order.total_price, order.client, order.staff, order.restaurant, order.cart)


@info_router.get("/order")
async def order(login: str = None):
    return get_order(login=login)
