import os
from auth0_api_python import ApiClient, ApiClientOptions
import asyncio

auth_domain = os.environ["AUTH_DOMAIN"]
auth_audience = os.environ["AUTH_AUDIENCE"]

# async def verify_jwt(token: str):
#     client = ApiClient(ApiClientOptions(
#         domain=auth_domain,
#         audience=auth_audience,
#     ))
#     return await client.verify_access_token(access_token=token)

async def aa():
    return "aa"

def verify(token: str):
    client = ApiClient(ApiClientOptions(
        domain=auth_domain,
        audience=auth_audience,
    ))
    return asyncio.run(aa())
