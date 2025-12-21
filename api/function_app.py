import azure.functions as func

# main
app = func.FunctionApp()

@app.route(route="bookmarks", methods=["GET"], auth_level=func.AuthLevel.ANONYMOUS)
def handle_list_bookmarks(req: func.HttpRequest) -> func.HttpResponse:
    try:
        from repos import list_bookmarks
        bookmarks = list_bookmarks()
        count = len(bookmarks)
        return func.HttpResponse(f"count: {count}", status_code=200)
    except Exception as e:
        return func.HttpResponse(f"err: {e}", status_code=400)
    
# @app.route(route="bookmarks", methods=["POST"], auth_level=func.AuthLevel.ANONYMOUS)
# def create_bookmark(req: func.HttpRequest) -> func.HttpResponse:
#     bookmark = Bookmark(id='hello', type='favorite', url='https://example.com/')
#     upsert_bookmark(bookmark=bookmark)
#     return func.HttpResponse('{"ok": true}', mimetype="application/json", status_code=200)
