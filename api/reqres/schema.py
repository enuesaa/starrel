from pydantic import BaseModel, Field, ConfigDict, field_serializer
from db.models import Bookmark
from typing import List
import azure.functions as func

cors_headers = {
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': 'true',
}

class ListResponse(BaseModel):
    items: List[Bookmark]

    def ok(self) -> func.HttpResponse:
        return func.HttpResponse(self.model_dump_json(), mimetype='application/json', status_code=200, headers=cors_headers)

class ViewResponse(BaseModel):
    data: Bookmark

    def ok(self) -> func.HttpResponse:
        return func.HttpResponse(self.model_dump_json(), mimetype='application/json', status_code=200, headers=cors_headers)

class CreateResponse(BaseModel):
    success: bool

    def ok(self) -> func.HttpResponse:
        return func.HttpResponse(self.model_dump_json(), mimetype='application/json', status_code=200, headers=cors_headers)

class ErrorResponse(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)
    error: Exception|None = Field(default=None)

    @field_serializer('error')
    def serialize_error(self, e: Exception | None, _):
        return str(e) if e else None

    def err400(self) -> func.HttpResponse:
        return func.HttpResponse(self.model_dump_json(), mimetype='application/json', status_code=400, headers=cors_headers)
    
    def err403(self) -> func.HttpResponse:
        return func.HttpResponse(self.model_dump_json(), mimetype='application/json', status_code=403, headers=cors_headers)

    def err404(self) -> func.HttpResponse:
        return func.HttpResponse('{}', mimetype='application/json', status_code=404, headers=cors_headers)

class CorsResponse(BaseModel):
    def ok(self) -> func.HttpResponse:
        return func.HttpResponse('', status_code=200, headers=cors_headers)
