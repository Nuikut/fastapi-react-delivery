import json
from datetime import datetime
from os import environ, getenv
from time import time
from jwt import DecodeError
import psycopg
from dotenv import load_dotenv, find_dotenv
from auth.auth import encode_jwt, decode_jwt
import bcrypt

if 'PYDEVD_LOAD_VALUES_ASYNC' in environ:
    load_dotenv(find_dotenv(".env.prod"))
else:
    load_dotenv(find_dotenv(".env.dev"))

# autocommit is on to omit cursor.commit() on every transaction
conn = psycopg.connect(host=getenv("postgres_host"), user=getenv("postgres_user"),
                       password=getenv("postgres_password"), dbname=getenv("postgres_dbname"), autocommit=True,
                       row_factory=psycopg.rows.dict_row)


def create_user(login: str, password: str) -> str:
    with conn.cursor() as cursor:
        cursor.execute("SELECT 1 FROM client WHERE EXISTS (SELECT * FROM client WHERE login = %s)", [login])
        if cursor.fetchone():
            return json.dumps({"status": "Fail"})
        cursor.execute("INSERT INTO client (login, password, active) VALUES (%s, %s, %s)",
                       [login, bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode(), "true"])
        return json.dumps({"status": "Success"})


def validate_user(login: str, password: str, type: str) -> str:
    with conn.cursor() as cursor:
        cursor.execute(f'SELECT login, password FROM {type} WHERE login = %s', [login])
        data = cursor.fetchone()
        if data and bcrypt.checkpw(password=password.encode(), hashed_password=data['password'].encode()):
            return json.dumps({"access_token": encode_jwt(data['login'])})
        return json.dumps({"access_token": "Fail"})


def validate_manager(login: str, password: str, restaurant: str) -> str:
    with conn.cursor() as cursor:
        cursor.execute(
            f'SELECT manager_login, manager_password FROM restaurant WHERE manager_login = %s AND address = %s',
            [login, restaurant])
        data = cursor.fetchone()
        if data and bcrypt.checkpw(password=password.encode(), hashed_password=data[1].encode()):
            return json.dumps({"access_token": encode_jwt(data['login'])})
        return json.dumps({"access_token": "Fail"})


def get_menu(restaurant: str) -> str:
    with conn.cursor() as cursor:
        cursor.execute('SELECT * FROM meal WHERE restaurant = %s AND available = true', [restaurant])
        return json.dumps(cursor.fetchall())


def get_restaurants() -> str:
    with conn.cursor() as cursor:
        cursor.execute('SELECT address, category FROM restaurant')
        return json.dumps(cursor.fetchall())


def validate_token(token: str) -> str:
    try:
        data = decode_jwt(token=token)
        if int(time()) - data['iat'] < 900:
            return json.dumps({"status": "Success"})
        return json.dumps({"status": "Expired"})
    except DecodeError:
        return json.dumps({"status": "Fail"})


def add_meals_to_order(name: str, quantity: int, order_id: int) -> bool:
    with conn.cursor() as cursor:
        try:
            cursor.execute('INSERT INTO meal_order VALUES (%s, %s, %s)', [order_id, name, quantity])
            return True
        except psycopg.errors.ForeignKeyViolation:
            return False


def make_order(total_price: int, client: str, staff: str, restaurant: str, cart: dict) -> str:
    with conn.cursor() as cursor:
        with conn.transaction():  # to prevent transaction errors stopping other transactions
            try:
                cursor.execute('INSERT INTO orders VALUES (default, %s, %s, %s, %s, %s, %s, %s) RETURNING id',
                               [datetime.today().strftime('%Y-%m-%d %H:%M'), total_price, True, None, client, staff,
                                restaurant])
                new_id = cursor.fetchone()[0]
            except psycopg.errors.ForeignKeyViolation:
                return json.dumps({"status": "ForeignKeyViolation: client/staff/restaurant"})
            for item in cart:
                if not add_meals_to_order(name=item, quantity=cart[item], order_id=new_id):
                    return json.dumps({"status": "Failed to add from cart"})
            return json.dumps({"status": "Success"})


def get_order(login: str) -> str:
    with conn.cursor() as cursor:
        order = list(cursor.execute('SELECT * FROM orders WHERE client = %s AND active = TRUE', [login]).fetchall())
        if not order:
            return json.dumps({"status": "No active orders"})
        meals = cursor.execute('SELECT * FROM meal_order WHERE id = %s', [order[0]['id']]).fetchall()
        cart = dict()
        for item in meals:
            cart[item['name']] = item['quantity']
        order.append(cart)
        return json.dumps(order, default=str)


def get_cart(login: str) -> dict:
    with conn.cursor() as cursor:
        pass
