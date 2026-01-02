import os
from auth0_api_python import ApiClient, ApiClientOptions
import asyncio
import azure.functions as func

auth_domain = os.environ['AUTH_DOMAIN']
auth_audience = os.environ['AUTH_AUDIENCE']

def verify(authheader: str):
    token = authheader.split(' ')[1]
    client = ApiClient(ApiClientOptions(
        domain=auth_domain,
        audience=auth_audience,
    ))
    return asyncio.run(client.verify_access_token(access_token=token))

def verify_request(req: func.HttpRequest):
    authheader = req.headers.get('X-Authorization')
    if not isinstance(authheader, str) or not authheader.startswith('Bearer '):
        raise Exception('un-authenticated')
    verify(authheader)
