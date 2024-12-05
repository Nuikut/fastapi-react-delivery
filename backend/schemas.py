from pydantic import BaseModel


class Client(BaseModel):
    login: str
    password: str

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "login": "admin",
                    "password": "admin",
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


class Manager(BaseModel):
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


class Order(BaseModel):
    total_price: int
    client: str
    staff: str
    restaurant: str
    cart: dict = None

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
