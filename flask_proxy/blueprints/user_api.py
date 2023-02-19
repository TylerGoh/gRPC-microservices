from flask import Blueprint, request, Response
import requests

USER_API_SERVER = "http://flask_user_api:6000/"
user_api = Blueprint('user_api', __name__)

@user_api.route('/user/<api_type>',methods=['POST'])
def api_server(api_type):
    try:
        data = request.get_json()
        resp = requests.post(USER_API_SERVER+api_type, json = {
                'username':data['username'],
                'password':data['password']
            })
        excluded_headers = ['content-encoding', 'content-length', 'transfer-encoding', 'connection']
        headers = [(name, value) for (name, value) in resp.raw.headers.items() if name.lower() not in excluded_headers]
        response = Response(resp.content, resp.status_code, headers)
        return response
    except:
        return "Not found", 404