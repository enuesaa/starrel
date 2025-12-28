import jwt
import requests
from jwt.algorithms import RSAAlgorithm
import os

auth_domain = os.environ["AUTH_DOMAIN"]
auth_audience = os.environ["AUTH_AUDIENCE"]

def get_signing_key(token):
    jwks = requests.get(f"https://{auth_domain}/.well-known/jwks.json").json()
    unverified = jwt.get_unverified_header(token)
    for key in jwks["keys"]:
        if key["kid"] == unverified["kid"]:
            return RSAAlgorithm.from_jwk(key)
    raise Exception("Signing key not found")

def verify_jwt(token: str):
    key = get_signing_key(token)
    return jwt.decode(
        token,
        key=key, # type: ignore
        algorithms=["RS256"],
        audience=auth_audience,
        issuer=f"https://{auth_domain}/"
    )
