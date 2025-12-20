from azure.cosmos import CosmosClient, PartitionKey
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

endpoint = "https://localhost:8081"
key = "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw=="

client = CosmosClient(
    endpoint,
    credential=key,
    connection_verify=False,
)

def list_databases():
    return list(client.list_databases())

def create_database():
    database = client.create_database(
        id="sampledb"
    )
    container = database.create_container(
        id="items",
        partition_key=PartitionKey("/pk"),
        offer_throughput=400,
    )

def get_database():
    return client.get_database_client(database="sampledb")

def get_container():
    database = get_database()
    return database.get_container_client(container="items")
