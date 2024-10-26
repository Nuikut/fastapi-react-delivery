import os
import psycopg
from dotenv import load_dotenv, find_dotenv
from auth.auth import encode_jwt
import bcrypt


if 'PYDEVD_LOAD_VALUES_ASYNC' in os.environ:
    load_dotenv(find_dotenv(".env.dev"))
else:
    load_dotenv(find_dotenv(".env.prod"))

conn = psycopg.connect(host=os.getenv("postgres_host"), user=os.getenv("postgres_user"),
                       password=os.getenv("postgres_password"), dbname=os.getenv("postgres_dbname"))


def create_user(username: str, password: str) -> dict:
    with conn.cursor() as cursor:
        cursor.execute("SELECT * FROM client WHERE EXISTS (SELECT * FROM client WHERE username = %s)", [username])
        if cursor.fetchone():
            return {"status": "Fail"}
        cursor.execute("INSERT INTO client (username, password, active) VALUES (%s, %s, %s)",
                       [username, bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode(), "true"])
        conn.commit()
        return {"status": "Success"}


def validate_user(username: str, password: str):
    with conn.cursor() as cursor:
        cursor.execute('SELECT * FROM client WHERE username = %s', [username])
        data = cursor.fetchone()
        print(data)
        if data and bcrypt.checkpw(password=password.encode(), hashed_password=data[1].encode()):
            return {"access_token": encode_jwt(data)}
        return {"access_token": "Fail"}


def validate_manager(login: str, password: str):
    with conn.cursor() as cursor:
        cursor.execute('SELECT * FROM staff WHERE login = %s', [login])
        data = cursor.fetchone()
        if data and bcrypt.checkpw(password=password.encode(), hashed_password=data[1].encode()):
            return {"access_token": encode_jwt(data)}
        return {"access_token": "Fail"}


def get_menu(restaurant: str) -> dict:
    with conn.cursor() as cursor:
        cursor.execute('SELECT * FROM meal WHERE restaurant = %s', [restaurant])
        return cursor.all()
