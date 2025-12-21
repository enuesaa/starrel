import azure.functions as func

# conn.py
from azure.cosmos import CosmosClient, PartitionKey
import os

dbendpoint = os.environ["DB_ENDPOINT"]
dbkey = os.environ["DB_KEY"]

def get_database():
    client = CosmosClient(
        dbendpoint,
        credential=dbkey,
        connection_verify=False,
    )
    return client.get_database_client(database="starrel")

def connect():
    database = get_database()
    return database.get_container_client(container="bookmarks")

# models.py
from pydantic import BaseModel

class Bookmark(BaseModel):
    id: str
    type: str
    url: str

# repos.py
from azure.cosmos.errors import CosmosResourceNotFoundError

def list_bookmarks() -> list[Bookmark]:
    db = connect()
    items = db.query_items(
        query="SELECT * FROM c WHERE c.type = @type",
        parameters=[{"name": "@type", "value": "favorite"}],
        enable_cross_partition_query=False,
    )
    return [Bookmark.model_validate(i) for i in items]

def get_bookmark(id: str) -> Bookmark|None:
    db = connect()
    try:
        data = db.read_item(
            item=id,
            partition_key="/favorite",
        )
    except CosmosResourceNotFoundError:
        return None
    return Bookmark.model_validate(data)

def upsert_bookmark(bookmark: Bookmark) -> Bookmark:
    bookmark.type = "favorite"
    db = connect()
    data = db.upsert_item(bookmark.model_dump(by_alias=True))
    return Bookmark.model_validate(data)

def delete_bookmark(id: str) -> None:
    db = connect()
    db.delete_item(item=id, partition_key="/favorite")


# main
app = func.FunctionApp()

@app.route(route="bookmarks", methods=["GET"], auth_level=func.AuthLevel.ANONYMOUS)
def handle_list_bookmarks(req: func.HttpRequest) -> func.HttpResponse:
    bookmarks = list_bookmarks()
    count = len(bookmarks)
    return func.HttpResponse(f"count: {count}", status_code=200)

@app.route(route="bookmarks", methods=["POST"], auth_level=func.AuthLevel.ANONYMOUS)
def create_bookmark(req: func.HttpRequest) -> func.HttpResponse:
    bookmark = Bookmark(id='hello', type='favorite', url='https://example.com/')
    upsert_bookmark(bookmark=bookmark)
    return func.HttpResponse('{"ok": true}', mimetype="application/json", status_code=200)
