import azure.functions as func
from db.repos import upsert_bookmark, list_bookmarks, get_bookmark, delete_bookmark
from db.models import Bookmark
from reqres.schema import ListResponse, ViewResponse, MutateResponse, ErrorResponse
from auth.auth import verify_request
from web.page import get_pageinfo

app = func.FunctionApp()

@app.route(route='bookmarks', methods=['GET'], auth_level=func.AuthLevel.ANONYMOUS)
def handle_list_bookmarks(req: func.HttpRequest) -> func.HttpResponse:
    try:
        verify_request(req)
        bookmarks = list_bookmarks()
        return ListResponse(items=bookmarks).ok()
    except Exception as e:
        return ErrorResponse(error=e).err400()

@app.route(route='bookmarks/{id}', methods=['GET'], auth_level=func.AuthLevel.ANONYMOUS)
def handle_get_bookmark(req: func.HttpRequest) -> func.HttpResponse:
    try:
        verify_request(req)
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
def handle_create_bookmark(req: func.HttpRequest) -> func.HttpResponse:
    try:
        verify_request(req)
        bookmark = Bookmark.model_validate(req.get_json())
        page = get_pageinfo(bookmark.url)
        bookmark.title = page.title
        bookmark.description = page.description
        upsert_bookmark(bookmark=bookmark)
        return MutateResponse(success=True).ok()
    except Exception as e:
        return ErrorResponse(error=e).err400()

@app.route(route='bookmarks/{id}', methods=['DELETE'], auth_level=func.AuthLevel.ANONYMOUS)
def handle_delete_bookmarks(req: func.HttpRequest) -> func.HttpResponse:
    try:
        verify_request(req)
        id = req.route_params.get('id')
        if id is None:
            return ErrorResponse().err404()
        delete_bookmark(id=id)
        return MutateResponse(success=True).ok()
    except Exception as e:
        return ErrorResponse(error=e).err400()

@app.route(route='bookmarks', methods=['OPTIONS'], auth_level=func.AuthLevel.ANONYMOUS)
def handle_options_bookmarks(req: func.HttpRequest) -> func.HttpResponse:
    return func.HttpResponse('', status_code=200)

@app.route(route='bookmarks/{id}', methods=['OPTIONS'], auth_level=func.AuthLevel.ANONYMOUS)
def handle_options_bookmark(req: func.HttpRequest) -> func.HttpResponse:
    return func.HttpResponse('', status_code=200)
