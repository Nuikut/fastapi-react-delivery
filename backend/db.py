import os
import psycopg
from dotenv import load_dotenv, find_dotenv
from auth.auth import encode_jwt
import bcrypt


if 'PYDEVD_LOAD_VALUES_ASYNC' in os.environ:
    load_dotenv(find_dotenv(".env.prod"))
else:
    load_dotenv(find_dotenv(".env.dev"))

conn = psycopg.connect(host=os.getenv("postgres_host"), user=os.getenv("postgres_user"),
                       password=os.getenv("postgres_password"), dbname=os.getenv("postgres_dbname"))


def create_user(login: str, password: str) -> dict:
    with conn.cursor() as cursor:
        cursor.execute("SELECT 1 FROM client WHERE EXISTS (SELECT * FROM client WHERE login = %s)", [login])
        if cursor.fetchone():
            return {"status": "Fail"}
        cursor.execute("INSERT INTO client (login, password, active) VALUES (%s, %s, %s)",
                       [login, bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode(), "true"])
        conn.commit()
        return {"status": "Success"}


def validate_user(login: str, password: str, type: str) -> dict:
    with conn.cursor() as cursor:
        cursor.execute(f'SELECT login, password FROM {type} WHERE login = %s', [login])
        data = cursor.fetchone()
        if data and bcrypt.checkpw(password=password.encode(), hashed_password=data[1].encode()):
            return {"access_token": encode_jwt(data[0])}
        return {"access_token": "Fail"}


def validate_manager(login: str, password: str, restaurant: str) -> dict:
    with conn.cursor() as cursor:
        cursor.execute(f'SELECT manager_login, manager_password FROM restaurant WHERE manager_login = %s AND address = %s', [login, restaurant])
        data = cursor.fetchone()
        if data and bcrypt.checkpw(password=password.encode(), hashed_password=data[1].encode()):
            return {"access_token": encode_jwt(data[0])}
        return {"access_token": "Fail"}


def get_menu(restaurant: str) -> dict:
    with conn.cursor() as cursor:
        cursor.execute('SELECT * FROM meal WHERE restaurant = %s AND available = true', [restaurant])
        return {"menu": cursor.fetchall()}


def get_restaurants() -> dict:
    with conn.cursor() as cursor:
        cursor.execute('SELECT address, category FROM restaurant')
        return {"restaurants": cursor.fetchall()}
