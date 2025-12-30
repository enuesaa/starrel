import azure.functions as func
from db.repos import upsert_bookmark, list_bookmarks, get_bookmark
from db.models import Bookmark
from reqres.schema import ListResponse, ViewResponse, CreateResponse, ErrorResponse
from auth.auth import verify

app = func.FunctionApp()

@app.route(route='bookmarks', methods=['GET'], auth_level=func.AuthLevel.ANONYMOUS)
def handle_list_bookmarks(req: func.HttpRequest) -> func.HttpResponse:
    try:
        authheader = req.headers.get('X-Authorization')
        if not isinstance(authheader, str) or not authheader.startswith('Bearer '):
            return ErrorResponse().err403()
        verify(authheader)
        bookmarks = list_bookmarks()
        return ListResponse(items=bookmarks).ok()
    except Exception as e:
        return ErrorResponse(error=e).err400()

@app.route(route='bookmarks/{id}', methods=['GET'], auth_level=func.AuthLevel.ANONYMOUS)
def handle_get_bookmarks(req: func.HttpRequest) -> func.HttpResponse:
    try:
        id = req.route_params.get('id')
        if id is None:
            return ErrorResponse().err404()
        bookmark = get_bookmark(id=id)
        if bookmark is None:
            return ErrorResponse().err404()
        return ViewResponse(data=bookmark).ok()
    except Exception as e:
        return ErrorResponse(error=e).err400()

@app.route(route='bookmarks', methods=['POST'], auth_level=func.AuthLevel.ANONYMOUS)
def create_bookmark(req: func.HttpRequest) -> func.HttpResponse:
    try:
        bookmark = Bookmark.model_validate(req.get_json())
        upsert_bookmark(bookmark=bookmark)
        return CreateResponse(success=True).ok()
    except Exception as e:
        return ErrorResponse(error=e).err400()
