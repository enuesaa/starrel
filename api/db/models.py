from pydantic import BaseModel

class Bookmark(BaseModel):
    id: str
    type: str
    url: str
    title: str
    description: str|None
    image: str|None
