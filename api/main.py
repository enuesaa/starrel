from auth.auth import verify
import os

try:
    token = os.environ['TOKEN']
    a = verify(f'Bearer {token}')
    print(a)
except Exception as e:
    print(e)

