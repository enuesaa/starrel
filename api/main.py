from auth.auth import verify
import os

a = verify(token=os.environ['TOKEN'])
print(a)
