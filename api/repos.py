from conn import connect
from models import Bookmark
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
