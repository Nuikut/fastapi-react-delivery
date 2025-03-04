from typing import List

from pydantic import BaseModel


class Client(BaseModel):
    login: str
    password: str

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "login": "client",
                    "password": "client",
                }
            ]
        }
    }

class newClient(BaseModel):
    login: str
    password: str
    newLogin: str

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "login": "client",
                    "password": "root",
                    "newLogin": "root",
                }
            ]
        }
    }

class Admin(BaseModel):
    login: str
    password: str

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "login": "root",
                    "password": "root",
                }
            ]
        }
    }

class Staff(BaseModel):
    login: str
    password: str

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "login": "alex.smith92",
                    "password": "1111",
                }
            ]
        }
    }


class createStaff(BaseModel):
    login: str
    password: str
    restaurant: str

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "login": "manager",
                    "password": "manager",
                    "restaurant": "restaurant",
                }
            ]
        }
    }

class updateStaff(BaseModel):
    login: str
    newLogin:str
    password: str
    restaurant: str

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "login": "manager",
                    "password": "manager",
                    "restaurant": "restaurant",
                }
            ]
        }
    }

class login(BaseModel):
    login: str

class meal(BaseModel):
    name: str
    quantity: int

class Order(BaseModel):
    total_price: int
    client: str
    staff: str
    restaurant: str
    cart: List[meal]

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "total_price": 1,
                    "client":"alex.smith92",
                    "staff":"chef.johnson",
                    "restaurant":"123 Culinary Avenue, Flavor Town, CA 90210",
                    "cart":{"Truffle Risotto": 1}
                }
            ]
        }
    }

class Restaurant(BaseModel):
    name:str
    address: str
    category: str
    manager_login: str
    manager_password: str
    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "address": "124 Culinary Avenue, Flavor Town, CA 90210",
                    "category": "Chinese",
                    "manager_login": "manager",
                    "manager_password": "manager"
                }
            ]
        }
    }


class restaurant(BaseModel):
    address: str


class fullMeal(BaseModel):
    name: str
    description: str
    price: int
    category: str
    available: bool
    restaurant: str