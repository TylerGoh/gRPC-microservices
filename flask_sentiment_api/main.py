from flask import Flask, request, json 
from flask_cors import CORS
import grpc
import account_pb2
import account_pb2_grpc
from transformers import pipeline

sentiment_pipline = pipeline(model="distilbert-base-uncased-finetuned-sst-2-english")

channel = grpc.insecure_channel('node_server:50051')
stub = account_pb2_grpc.AccountServiceStub(channel)
app = Flask(__name__)
CORS(app)

@app.route('/',methods=['POST'])
def sentiment_api():
    data = request.get_json()
    login_request = account_pb2.LoginRequest(username=data['username'], password=data['password'])
    response = stub.PostLogin(login_request).response
    if(response == "Failed"):
        return response, 401
    data = data['text']
    result = sentiment_pipline(data)[0]
    return json.dumps(result), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7000)


