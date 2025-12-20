from db.conn import get_container

def upsert():
    item = {
        "id": "1",
        "pk": "user1",
        "name": "hello cosmos",
        "count": 1,
    }
    container = get_container()
    container.upsert_item(item)

# query = """
# SELECT c.id, c.name, c.count
# FROM c
# WHERE c.pk = @pk
# """

# items = container.query_items(
#     query=query,
#     parameters=[
#         {"name": "@pk", "value": "user1"},
#     ],
#     enable_cross_partition_query=False,
# )

def get_user(pkvalue: str):
    container = get_container()
    item = container.read_item(
        item="1",
        partition_key="user1",
    )
    return item

def delete_user(pkvalue: str):
    container = get_container()
    container.delete_item(
        item="1",
        partition_key="user1",
    )
