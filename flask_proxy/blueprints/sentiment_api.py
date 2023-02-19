from flask import Blueprint, request, Response
import requests

SENTIMENT_API_SERVER = "http://flask_sentiment_api:7000/"
sentiment_api = Blueprint('sentiment_api', __name__)

@sentiment_api.route('/api',methods=['POST'])
def api_server():
    try:
        data = request.get_json()
        resp = requests.post(SENTIMENT_API_SERVER, json = {
                'username':data['username'],
                'password':data['password'],
                'text':data['text'],
            })
        excluded_headers = ['content-encoding', 'content-length', 'transfer-encoding', 'connection']
        headers = [(name, value) for (name, value) in resp.raw.headers.items() if name.lower() not in excluded_headers]
        response = Response(resp.content, resp.status_code, headers)
        return response
    except:
        return "Not found", 404
