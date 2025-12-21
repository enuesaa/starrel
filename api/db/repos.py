# from conn import connect
# from db.models import Bookmark
from azure.cosmos.errors import CosmosResourceNotFoundError

from azure.cosmos import CosmosClient, PartitionKey
import os
# import urllib3
# urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

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


def list_bookmarks():
    db = connect()
    items = db.query_items(
        query="SELECT * FROM c WHERE c.type = @type",
        parameters=[{"name": "@type", "value": "favorite"}],
        enable_cross_partition_query=False,
    )
    # return items
    return [i for i in items]

# def get_bookmark(id: str) -> Bookmark|None:
#     db = connect()
#     try:
#         data = db.read_item(
#             item=id,
#             partition_key="/favorite",
#         )
#     except CosmosResourceNotFoundError:
#         return None
#     return Bookmark.model_validate(data)

# def upsert_bookmark(bookmark: Bookmark) -> Bookmark:
#     bookmark.type = "favorite"
#     db = connect()
#     data = db.upsert_item(bookmark.model_dump(by_alias=True))
#     return Bookmark.model_validate(data)

# def delete_bookmark(id: str) -> None:
#     db = connect()
#     db.delete_item(item=id, partition_key="/favorite")
