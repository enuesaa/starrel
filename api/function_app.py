import azure.functions as func

app = func.FunctionApp()

@app.route(route="bookmarks", methods=["GET"], auth_level=func.AuthLevel.ANONYMOUS)
def list_bookmarks(req: func.HttpRequest) -> func.HttpResponse:
    from db import repos, models
    bookmarks = repos.list_bookmarks()
    count = len(bookmarks)
    return func.HttpResponse(f"count: {count}", status_code=200)

@app.route(route="bookmarks", methods=["POST"], auth_level=func.AuthLevel.ANONYMOUS)
def create_bookmark(req: func.HttpRequest) -> func.HttpResponse:
    from db import repos, models
    bookmark = models.Bookmark(id='hello', type='favorite', url='https://example.com/')
    repos.upsert_bookmark(bookmark=bookmark)
    return func.HttpResponse('{"ok": true}', mimetype="application/json", status_code=200)
