import azure.functions as func
from ulid import ULID
from db.repos import upsert_bookmark, list_bookmarks, get_bookmark
from db.models import Bookmark
from reqres import schema

app = func.FunctionApp()

@app.route(route='bookmarks', methods=['GET'], auth_level=func.AuthLevel.ANONYMOUS)
def handle_list_bookmarks(req: func.HttpRequest) -> func.HttpResponse:
    try:
        bookmarks = list_bookmarks()
        res = schema.ListResponse(items=bookmarks)
        return func.HttpResponse(
            body=res.model_dump_json(),
            mimetype='application/json',
            status_code=200
        )
    except Exception as e:
        return func.HttpResponse(f'err: {e}', status_code=400)

@app.route(route='bookmarks/{id}', methods=['GET'], auth_level=func.AuthLevel.ANONYMOUS)
def handle_get_bookmarks(req: func.HttpRequest) -> func.HttpResponse:
    id = req.route_params.get('id')
    if id is None:
        return func.HttpResponse('Not Found', status_code=404)
    try:
        bookmark = get_bookmark(id=id)
        if bookmark is None:
            return func.HttpResponse('Not Found', status_code=404)
        res = schema.ViewResponse(data=bookmark)
        return func.HttpResponse(res.model_dump_json(), mimetype='application/json', status_code=200)
    except Exception as e:
        return func.HttpResponse(f'err: {e}', status_code=400)

@app.route(route='bookmarks', methods=['POST'], auth_level=func.AuthLevel.ANONYMOUS)
def create_bookmark(req: func.HttpRequest) -> func.HttpResponse:
    try:
        bookmark = Bookmark(id=str(ULID()), type='favorite', url='https://example.com/', title='a', description=None, image=None)
        upsert_bookmark(bookmark=bookmark)
        res = schema.CreateResponse(ok=True)
        return func.HttpResponse(res.model_dump_json(), mimetype='application/json', status_code=200)
    except Exception as e:
        return func.HttpResponse(f'err: {e}', status_code=400)
