import json
from datetime import datetime
from os import environ, getenv
from time import time
from jwt import DecodeError
import psycopg
from dotenv import load_dotenv, find_dotenv

from auth.auth import encode_jwt
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
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT 1 FROM client WHERE EXISTS (SELECT * FROM client WHERE login = %s)", [login])
            if cursor.fetchone():
                return json.dumps({"status": "Fail"})
            cursor.execute("INSERT INTO client (login, password, active) VALUES (%s, %s, %s)",
                           [login, bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode(), "true"])
            return json.dumps({"status": "Success"})
    except Exception as e:
        return json.dumps({"status": str(e)})


def validate_user(login: str, password: str, type: str) -> str:
    try:
        with conn.cursor() as cursor:
            cursor.execute(f'SELECT login, password FROM {type} WHERE login = %s AND active = TRUE', [login])
            data = cursor.fetchone()
            if data and bcrypt.checkpw(password=password.encode(), hashed_password=data['password'].encode()):
                return json.dumps({"access_token": encode_jwt(data['login'])})
            return json.dumps({"access_token": "Fail"})
    except Exception as e:
        return json.dumps({"status": str(e)})


def update_user(login: str, password: str, newLogin: str) -> str:
    with conn.cursor() as cursor:
        try:
            if newLogin == '':
                cursor.execute(f'UPDATE client SET password = %s WHERE login = %s',
                               [bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode(), login])
            elif password == '':
                cursor.execute(f'UPDATE client SET login = %s WHERE login = %s',
                                   [newLogin, login])
            else:
                cursor.execute(f'UPDATE client SET login = %s, password = %s WHERE login = %s',
                           [newLogin, bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode(), login])
            if cursor.rowcount == 1:
                return json.dumps({"status": "Success"})
            return json.dumps({"status": "Fail"})
        except psycopg.errors.UniqueViolation:
            return json.dumps({"status": "Username taken"})


def validate_manager(login: str, password: str, restaurant: str) -> str:
    try:
        with conn.cursor() as cursor:
            cursor.execute(
                f'SELECT manager_login, manager_password FROM restaurant WHERE manager_login = %s AND name = %s',
                [login, restaurant])
            data = cursor.fetchone()
            if data and bcrypt.checkpw(password=password.encode(), hashed_password=data['manager_password'].encode()):
                return json.dumps({"access_token": encode_jwt(data['manager_login'])})
            return json.dumps({"access_token": "Fail"})
    except Exception as e:
        return json.dumps({"status": str(e)})


def get_menu(restaurant: str) -> str:
    try:
        with conn.cursor() as cursor:
            cursor.execute('SELECT * FROM meal WHERE restaurant = %s AND available = true', [restaurant])
            return json.dumps({"menu": cursor.fetchall()})
    except Exception as e:
        return json.dumps({"menu": str(e)})


def get_restaurants() -> str:
    try:
        with conn.cursor() as cursor:
            cursor.execute('SELECT name, address, category FROM restaurant')
            return json.dumps({"restaurants": cursor.fetchall()})
    except Exception as e:
        return json.dumps({"restaurants": str(e)})


def validate_token(iat: str) -> str:
    try:
        if int(time()) - int(iat) < 900:
            return json.dumps({"status": "Success"})
        return json.dumps({"status": "Expired"})
    except DecodeError:
        return json.dumps({"status": "Fail"})
    except ValueError:
        return json.dumps({"status": "Empty"})


def add_meals_to_order(name: str, quantity: int, order_id: int) -> bool:
    try:
        with conn.cursor() as cursor:
            try:
                cursor.execute('INSERT INTO meal_order VALUES (%s, %s, %s)', [order_id, name, quantity])
                return True
            except psycopg.errors.ForeignKeyViolation:
                return False
    except psycopg.errors.UniqueViolation:
        return False


def make_order(total_price: int, client: str, staff: str, restaurant: str, cart: list) -> str:
    print(total_price, datetime.today().strftime('%Y-%m-%d %H:%M'), client, staff, restaurant, cart)
    with conn.cursor() as cursor:
        with conn.transaction():  # to prevent transaction errors stopping other transactions
            try:
                cursor.execute('INSERT INTO orders VALUES (default, %s, %s, %s, %s, %s, %s, %s) RETURNING id',
                               [datetime.today().strftime('%Y-%m-%d %H:%M'), total_price, True, None, client, staff,
                                restaurant])
                new_id = cursor.fetchall()[0]
            except psycopg.errors.ForeignKeyViolation:
                return json.dumps({"status": "ForeignKeyViolation: client/staff/restaurant"})
            for item in cart:
                if not add_meals_to_order(name=item.name, quantity=item.quantity, order_id=new_id['id']):
                    return json.dumps({"status": "Failed to add from cart"})
            return json.dumps({"status": "Success"})


def get_active_client_orders(login: str) -> str:
    try:
        with conn.cursor() as cursor:
            order = list(cursor.execute('SELECT * FROM orders WHERE client = %s AND active = TRUE', [login]).fetchall())
            if not order:
                return json.dumps({"order": "No active orders"})
            for item in order:
                meals = cursor.execute('SELECT * FROM meal_order WHERE id = %s', [item['id']]).fetchall()
                cart = list()
                for meal in meals:
                    cart.append([meal['name'], meal['quantity']])
                item['cart'] = cart
            return json.dumps({"order": order}, default=str)
    except Exception as e:
        return json.dumps({"order": str(e)})


def get_all_user_orders(login: str) -> str:
    try:
        with conn.cursor() as cursor:
            order = list(cursor.execute('SELECT * FROM orders WHERE client = %s AND active = FALSE', [login]).fetchall())
            if not order:
                return json.dumps({"status": "No user orders"})
            for item in order:
                meals = cursor.execute('SELECT * FROM meal_order WHERE id = %s', [item['id']]).fetchall()
                cart = list()
                for meal in meals:
                    cart.append([meal['name'], meal['quantity']])
                item['cart'] = cart
            return json.dumps({"order": order}, default=str)
    except Exception as e:
        return json.dumps({"order": str(e)})


def rate_order(id: str, rating: int):
    try:
        with conn.cursor() as cursor:
            cursor.execute('UPDATE orders SET rating = %s WHERE id = %s', [rating, id])
            if cursor.rowcount == 1:
                return json.dumps({"status": "Success"})
            return json.dumps({"status": "Fail"})
    except psycopg.errors.ForeignKeyViolation:
        return json.dumps({"status": "ForeignKeyViolation"})
    except Exception as e:
        return json.dumps({"status": str(e)})


def admin(login: str, password: str) -> str:
    try:
        admin_login = getenv("admin_login")
        admin_password = getenv("admin_password")
        if login == admin_login and bcrypt.checkpw(password=password.encode(), hashed_password=admin_password.encode()):
            return json.dumps({"access_token": encode_jwt('admin')})
        return json.dumps({"access_token": "Fail"})
    except FileNotFoundError:
        return json.dumps({"access_token": "fail"})


def get_staff() -> str:
    try:
        with conn.cursor() as cursor:
            staff = list(cursor.execute('SELECT * FROM staff').fetchall())
            if not staff:
                return json.dumps({"staff": "No staff"})
            return json.dumps({"staff": staff})
    except Exception as e:
        return json.dumps({"staff": str(e)})


def get_staff_random(restaurant: str) -> str:
    try:
        with conn.cursor() as cursor:
            staff = list(cursor.execute('SELECT login FROM staff WHERE restaurant = %s AND active = TRUE ORDER BY RANDOM() LIMIT 1',
                                        [restaurant]).fetchall())
            if not staff:
                return json.dumps({"staff": "No staff"})
            return json.dumps({"staff": staff})
    except Exception as e:
        return json.dumps({"staff": str(e)})


def alter_staff(login: str) -> str:
    try:
        with conn.cursor() as cursor:
            if cursor.execute('UPDATE staff SET active = not active WHERE login = %s', [login]).rowcount:
                return json.dumps({"status": "Success"})
            return json.dumps({"status": "Fail"})
    except Exception as e:
        return json.dumps({"status": str(e)})


def add_staff(login: str, password: str, restaurant: str) -> str:
    with conn.cursor() as cursor:
        try:
            if cursor.execute('INSERT INTO staff VALUES (%s, %s, TRUE, %s)',
                              [login, bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode(), restaurant]):
                return json.dumps({"status": "Success"})
        except psycopg.errors.ForeignKeyViolation:
            return json.dumps({"status": "Не найден такой ресторан"})
        except psycopg.errors.UniqueViolation:
            return json.dumps({"status": "Такой менеджер уже существует"})
    return json.dumps({"status": "Fail"})


def get_staff_active_orders(staff: str):
    try:
        with conn.cursor() as cursor:
            order = list(cursor.execute('SELECT * FROM orders WHERE staff = %s AND active = TRUE',
                               [staff]))
            if not order:
                return json.dumps({"status": "No active orders"})
            for item in order:
                meals = cursor.execute('SELECT * FROM meal_order WHERE id = %s', [item['id']]).fetchall()
                cart = list()
                for meal in meals:
                    cart.append([meal['name'], meal['quantity']])
                item['cart'] = cart
            return json.dumps({"order": order}, default=str)
    except Exception as e:
        return json.dumps({"status": str(e)})


def get_staff_history_orders(staff: str):
    try:
        with conn.cursor() as cursor:
            order = list(cursor.execute('SELECT * FROM orders WHERE staff = %s AND active = FALSE',
                                        [staff]))
            if not order:
                return json.dumps({"status": "No active orders"})
            for item in order:
                meals = cursor.execute('SELECT * FROM meal_order WHERE id = %s', [item['id']]).fetchall()
                cart = list()
                for meal in meals:
                    cart.append([meal['name'], meal['quantity']])
                item['cart'] = cart
            return json.dumps({"order": order}, default=str)
    except Exception as e:
        return json.dumps({'order': str(e)})


def create_restaurant(name: str, address: str, category: str, login: str, password: str):
    with conn.cursor() as cursor:
        try:
            if cursor.execute('INSERT INTO restaurant VALUES (%s, %s, %s, %s, %s)',
                              [name, address, category, login,
                               bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()]).rowcount:
                return json.dumps({"status": "Success"})
        except BaseException as e:
            return json.dumps({"status": str(e)})


def alter_restaurant(name: str) -> str:
    with conn.cursor() as cursor:
        try:
            if cursor.execute('DELETE FROM restaurant WHERE name = %s', [name]).rowcount:
                return json.dumps({"status": "Success"})
        except psycopg.errors.ForeignKeyViolation:
            return json.dumps({"status": "Foreign key violation"})  # TODO: frontend popup
        return json.dumps({"status": "Fail"})


def get_cart(login: str) -> dict:
    with conn.cursor() as cursor:
        pass


def order_ready(id: str):
    with conn.cursor() as  cursor:
        try:
            if cursor.execute('UPDATE orders SET active = FALSE WHERE id = %s', [id]).rowcount:
                return json.dumps({"status": "Success"})
            return json.dumps({"status": "Fail"})
        except Exception as e:
            return json.dumps({"status": str(e)})


def change_staff(login: str, newLogin: str,  password: str, restaurant: str) -> str:
    try:
        with conn.cursor() as cursor:
            cursor.execute('UPDATE staff SET login = %s, password = %s WHERE login = %s AND restaurant = %s', [newLogin, password, login, restaurant])
            if cursor.rowcount == 1:
                return json.dumps({"status": "Success"})
            else:
                return json.dumps({"status": "Fail"})
    except Exception as e:
        return json.dumps({"status": str(e)})


def delete_staff(login: str, restaurant: str):
    try:
        with conn.cursor() as cursor:
            cursor.execute('DELETE FROM staff WHERE login = %s AND restaurant = %s', [login, restaurant])
            if cursor.rowcount == 1:
                return json.dumps({"status": "Success"})
            return json.dumps({"status": "Fail"})
    except Exception as e:
        return json.dumps({"status": str(e)})


def create_meal(name:str, description: str, price: int, category: str, available: bool, restaurant: str):
    try:
        with conn.cursor() as cursor:
            cursor.execute('INSERT INTO meal VALUES (%s, %s, %s, %s, %s, %s)',[name, description, price, category, available, restaurant])
            if cursor.rowcount == 1:
                return json.dumps({"status": "Success"})
            return json.dumps({"status": "Fail"})
    except Exception as e:
        return json.dumps({"status": str(e)})