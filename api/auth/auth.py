import os
from auth0_api_python import ApiClient, ApiClientOptions
import asyncio
import requests

auth_domain = os.environ["AUTH_DOMAIN"]
auth_audience = os.environ["AUTH_AUDIENCE"]

async def aa(token: str):
    return token

async def fetcher(url: str):
    res = requests.get(url)
    return res

def verify(token: str):
    client = ApiClient(ApiClientOptions(
        domain=auth_domain,
        audience=auth_audience,
        dpop_enabled=False,
        custom_fetch=fetcher,
    ))
    asyncio.run(client.verify_access_token(access_token=token))
    return asyncio.run(aa(token))
