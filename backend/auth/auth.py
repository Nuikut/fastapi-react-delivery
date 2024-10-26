import jwt
from pathlib import Path


private_key_path = Path(__file__).parent / "certs" / "private.pem"
public_key_path = Path(__file__).parent / "certs" / "public.pem"


def encode_jwt(data, private_key=private_key_path.read_text(), algorithm="RS256"):
    encoded = jwt.encode({"sub": data[0], "username": data[1]}, private_key, algorithm=algorithm)
    return encoded


def decode_jwt(token, public_key=public_key_path.read_text(), algorithms=["RS256"]):
    decoded = jwt.decode(token, public_key, algorithms=algorithms)
    return decoded
