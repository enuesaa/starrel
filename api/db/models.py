from pydantic import BaseModel

class Bookmark(BaseModel):
    id: str
    pk: str
    url: str
    count: int
