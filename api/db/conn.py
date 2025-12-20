from azure.cosmos import CosmosClient, PartitionKey
import os
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

dbendpoint = os.environ["DB_ENDPOINT"]
dbkey = os.environ["DB_KEY"]

# def create_database():
#     database = client.create_database(
#         id="sampledb"
#     )
#     container = database.create_container(
#         id="items",
#         partition_key=PartitionKey("/pk"),
#         offer_throughput=400,
#     )

client = CosmosClient(
    dbendpoint,
    credential=dbkey,
    connection_verify=False,
)

def get_database():
    return client.get_database_client(database="starrel")

def connect():
    database = get_database()
    return database.get_container_client(container="bookmarks")
