import azure.functions as func

app = func.FunctionApp()

@app.route(route="hello", methods=["GET"], auth_level=func.AuthLevel.ANONYMOUS)
def hello(req: func.HttpRequest) -> func.HttpResponse:
    return func.HttpResponse(
        '{"ok": true, "message": "hello from python"}',
        mimetype="application/json"
    )
