import json
from time import time
import jwt
from pathlib import Path
from fastapi import Depends, status
from fastapi.security import OAuth2PasswordBearer

private_key_path = Path(__file__).parent / "certs" / "private.pem"
public_key_path = Path(__file__).parent / "certs" / "public.pem"


def encode_jwt(login: str, private_key=private_key_path.read_text(), algorithm="RS256"):
    encoded = jwt.encode({"sub": login, "iat": int(time())}, private_key, algorithm=algorithm)
    return encoded


def decode_jwt(token: str, public_key=public_key_path.read_text(), algorithms=["RS256"]):
    decoded = jwt.decode(token, public_key, algorithms=algorithms)
    return decoded


oauth2_scheme = OAuth2PasswordBearer("/auth/login")
def validate(token: str = Depends(oauth2_scheme)) -> str:
    try:
        iat = decode_jwt(token).get("iat")
        if int(time()) - iat > 900:
            return json.dumps({"status": "Token expired"})
        return iat
    except Exception as e:
        return json.dumps({"status": f"Token error {e}"})

