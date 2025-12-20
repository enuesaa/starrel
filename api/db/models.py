from pydantic import BaseModel

class UserItem(BaseModel):
    id: str
    pk: str
    name: str
    count: int
