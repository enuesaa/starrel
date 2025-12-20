import azure.functions as func
import os

app = func.FunctionApp()

@app.route(route="hello", methods=["GET"], auth_level=func.AuthLevel.ANONYMOUS)
def hello(req: func.HttpRequest) -> func.HttpResponse:
    value = os.environ["HELLO"]

    return func.HttpResponse(value,
        mimetype="application/json"
    )
