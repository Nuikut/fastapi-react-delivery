from auth.auth import validate
from fastapi import APIRouter, Depends
from db import validate_user, create_user, validate_manager, get_menu, get_restaurants, validate_token, make_order, \
    get_active_client_orders, get_staff, admin, alter_staff, add_staff, create_restaurant, get_all_user_orders, alter_restaurant, \
    get_staff_active_orders
from schemas import Client, createStaff, Staff, Order, Admin, login, Restaurant, restaurant

login_router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)


@login_router.post("/login")
async def login_client(user: Client) -> str:
    return validate_user(login=user.login, password=user.password, type="client")


@login_router.post("/register")
async def register_client(user: Client) -> str:
    return create_user(login=user.login, password=user.password)


@login_router.post("/staff")
async def login_staff(staff: Staff) -> str:
    return validate_user(login=staff.login, password=staff.password, type="staff")


@login_router.post("/manager")
async def login_manager(manager: createStaff) -> str:
    return validate_manager(login=manager.login, password=manager.password, restaurant=manager.restaurant)


@login_router.get("/token")
async def check_token(iat: str = Depends(validate)):
    return validate_token(iat=iat)


info_router = APIRouter(
    prefix="/ordering",
    tags=["ordering info"]
)


@info_router.get("/menu")
async def menu(restaurant: str = None):
    return get_menu(restaurant=restaurant)


@info_router.get("/restaurants")
async def restaurants():
    return get_restaurants()


@info_router.post("/order")
async def place_order(order: Order, token: str = Depends(validate)):
    return make_order(order.total_price, order.client, order.staff, order.restaurant, order.cart)


@info_router.get("/order")
async def get_active_client_order(login: str = None):
    return get_active_client_orders(login=login)

@info_router.get("/orders")
async def get_history_user_orders(login: str = None):
    return get_all_user_orders(login=login)

@info_router.get("/restaurant/orders")
async def get_restaurant_active_orders(restaurant: str = None, login: str = None, token: str = Depends(validate)):
    return get_staff_active_orders(restaurant=restaurant, staff=login)

admin_router = APIRouter(
    prefix="/admin",
    tags=["admin info"]
)


@admin_router.post("/login")
async def login_admin(admin_user: Admin):
    return admin(login=admin_user.login, password=admin_user.password)


@admin_router.get("/staff")
async def staff():
    return get_staff()


@admin_router.patch("/staff")
async def alter_staff_status(login: login):
    return alter_staff(login=login.login)


@admin_router.post("/staff")
async def create_staff(staff: createStaff):
    return add_staff(login=staff.login, password=staff.password, restaurant=staff.restaurant)


@admin_router.post("/restaurant")
async def add_restaurant(restaurant: Restaurant):
    return create_restaurant(address=restaurant.address, category=restaurant.category, login=restaurant.manager_login, password=restaurant.manager_password)

@admin_router.delete("/restaurant")
async def delete_restaurant(restaurant: restaurant):
    return alter_restaurant(restaurant.address)
