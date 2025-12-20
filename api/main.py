from azure.cosmos import CosmosClient, PartitionKey
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

endpoint = "https://localhost:8081"
key = ""

client = CosmosClient(
    endpoint,
    credential=key,
    connection_verify=False,
)

databases = list(client.list_databases())
print(databases)

database = client.create_database_if_not_exists(
    id="sampledb"
)

container = database.create_container_if_not_exists(
    id="items",
    partition_key=PartitionKey("/pk"),
    offer_throughput=400,
)

item = {
    "id": "1",
    "pk": "user1",
    "name": "hello cosmos",
    "count": 1,
}
container.upsert_item(item)

items = list(container.read_all_items())
for item in items:
    print(item)

query = """
SELECT c.id, c.name, c.count
FROM c
WHERE c.pk = @pk
"""

items = container.query_items(
    query=query,
    parameters=[
        {"name": "@pk", "value": "user1"},
    ],
    enable_cross_partition_query=False,
)

for item in items:
    print(item)

item = container.read_item(
    item="1",
    partition_key="user1",
)
print(item)

container.delete_item(
    item="1",
    partition_key="user1",
)
