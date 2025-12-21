import azure.functions as func
from ulid import ULID
from db.repos import upsert_bookmark, list_bookmarks
from db.models import Bookmark

app = func.FunctionApp()

@app.route(route="bookmarks", methods=["GET"], auth_level=func.AuthLevel.ANONYMOUS)
def handle_list_bookmarks(req: func.HttpRequest) -> func.HttpResponse:
    try:
        bookmarks = list_bookmarks()
        count = len(bookmarks)
        return func.HttpResponse(f"count: {count}", status_code=200)
    except Exception as e:
        return func.HttpResponse(f"err: {e}", status_code=400)

@app.route(route="bookmarks", methods=["POST"], auth_level=func.AuthLevel.ANONYMOUS)
def create_bookmark(req: func.HttpRequest) -> func.HttpResponse:
    try:
        bookmark = Bookmark(id=str(ULID()), type='favorite', url='https://example.com/')
        upsert_bookmark(bookmark=bookmark)
        return func.HttpResponse('{"ok": true}', mimetype="application/json", status_code=200)
    except Exception as e:
        return func.HttpResponse(f"err: {e}", status_code=400)
