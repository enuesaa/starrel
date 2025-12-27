from pydantic import BaseModel, Field
from ulid import ULID

class Bookmark(BaseModel):
    id: str = Field(default_factory=lambda: str(ULID()))
    type: str = Field(default='favorite')
    url: str
    title: str = Field(default='')
    description: str|None = Field(default=None)
    image: str|None = Field(default=None)
