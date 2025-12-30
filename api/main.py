from auth.auth import verify
import os
from reqres.schema import ErrorResponse

try:
    verify(token=os.environ['TOKEN'])
except Exception as e:
    a = ErrorResponse(error=e).err400()
    print(a)
