import azure.functions as func
from ulid import ULID
from db.repos import upsert_bookmark, list_bookmarks, get_bookmark
from db.models import Bookmark
from reqres.schema import ListResponse, ViewResponse, CreateResponse, ErrorResponse

app = func.FunctionApp()

@app.route(route='bookmarks', methods=['GET'], auth_level=func.AuthLevel.ANONYMOUS)
def handle_list_bookmarks(req: func.HttpRequest) -> func.HttpResponse:
    try:
        bookmarks = list_bookmarks()
        return ListResponse(items=bookmarks).ok()
    except Exception as e:
        return ErrorResponse(error=e).err400()

@app.route(route='bookmarks/{id}', methods=['GET'], auth_level=func.AuthLevel.ANONYMOUS)
def handle_get_bookmarks(req: func.HttpRequest) -> func.HttpResponse:
    id = req.route_params.get('id')
    if id is None:
        return ErrorResponse(error=None).err400()
    try:
        bookmark = get_bookmark(id=id)
        if bookmark is None:
            return ErrorResponse(error=None).err400()
        return ViewResponse(data=bookmark).ok()
    except Exception as e:
        return ErrorResponse(error=e).err400()

@app.route(route='bookmarks', methods=['POST'], auth_level=func.AuthLevel.ANONYMOUS)
def create_bookmark(req: func.HttpRequest) -> func.HttpResponse:
    try:
        bookmark = Bookmark(id=str(ULID()), type='favorite', url='https://example.com/', title='a', description=None, image=None)
        upsert_bookmark(bookmark=bookmark)
        return CreateResponse(success=True).ok()
    except Exception as e:
        return ErrorResponse(error=e).err400()
