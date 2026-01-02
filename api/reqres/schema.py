from pydantic import BaseModel, Field, ConfigDict, field_serializer
from db.models import Bookmark
from typing import List
import azure.functions as func

class ListResponse(BaseModel):
    items: List[Bookmark]

    def ok(self) -> func.HttpResponse:
        return func.HttpResponse(self.model_dump_json(), mimetype='application/json', status_code=200)

class ViewResponse(BaseModel):
    data: Bookmark

    def ok(self) -> func.HttpResponse:
        return func.HttpResponse(self.model_dump_json(), mimetype='application/json', status_code=200)

class MutateResponse(BaseModel):
    success: bool

    def ok(self) -> func.HttpResponse:
        return func.HttpResponse(self.model_dump_json(), mimetype='application/json', status_code=200)

class ErrorResponse(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)
    error: Exception|None = Field(default=None)

    @field_serializer('error')
    def serialize_error(self, e: Exception | None, _):
        return str(e) if e else None

    def err400(self) -> func.HttpResponse:
        return func.HttpResponse(self.model_dump_json(), mimetype='application/json', status_code=400)
    
    def err403(self) -> func.HttpResponse:
        return func.HttpResponse(self.model_dump_json(), mimetype='application/json', status_code=403)

    def err404(self) -> func.HttpResponse:
        return func.HttpResponse('{}', mimetype='application/json', status_code=404)
