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
