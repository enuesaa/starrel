from db.conn import get_container
from db.models import UserItem
from azure.cosmos.errors import CosmosResourceNotFoundError

def list_by_pk(pk: str) -> list[UserItem]:
    container = get_container()
    query = """
    SELECT * FROM c
    WHERE c.pk = @pk
    """
    items = container.query_items(
        query=query,
        parameters=[{"name": "@pk", "value": pk}],
        enable_cross_partition_query=False,
    )
    return [UserItem.model_validate(i) for i in items]

def get(user_id: str, pk: str) -> UserItem | None:
    container = get_container()
    try:
        data = container.read_item(
            item=user_id,
            partition_key=pk,
        )
    except CosmosResourceNotFoundError:
        return None
    return UserItem.model_validate(data)

def upsert(user: UserItem) -> UserItem:
    container = get_container()
    data = container.upsert_item(
        user.model_dump(by_alias=True)
    )
    return UserItem.model_validate(data)

def delete(user_id: str, pk: str) -> None:
    container = get_container()
    container.delete_item(
        item=user_id,
        partition_key=pk,
    )
