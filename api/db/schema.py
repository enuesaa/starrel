from pydantic import BaseModel, Field
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

class CreateResponse(BaseModel):
    success: bool

    def ok(self) -> func.HttpResponse:
        return func.HttpResponse(self.model_dump_json(), mimetype='application/json', status_code=200)

class ErrorResponse(BaseModel):
    error: Exception|None = Field(default=None)

    def err400(self) -> func.HttpResponse:
        return func.HttpResponse(self.model_dump_json(), mimetype='application/json', status_code=400)
    
    def err404(self) -> func.HttpResponse:
        return func.HttpResponse('{}', mimetype='application/json', status_code=404)
