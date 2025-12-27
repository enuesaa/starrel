from pydantic import BaseModel
from db.models import Bookmark
from typing import List

class ListResponse(BaseModel):
    items: List[Bookmark]

class ViewResponse(BaseModel):
    data: Bookmark

class CreateResponse(BaseModel):
    ok: bool
