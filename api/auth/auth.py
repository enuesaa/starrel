import os
from auth0_api_python import ApiClient, ApiClientOptions
import asyncio

auth_domain = os.environ["AUTH_DOMAIN"]
auth_audience = os.environ["AUTH_AUDIENCE"]

def verify(token: str):
    client = ApiClient(ApiClientOptions(
        domain=auth_domain,
        audience=auth_audience,
    ))
    return asyncio.run(client.verify_access_token(access_token=token))
