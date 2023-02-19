from flask import Flask, request, send_from_directory
from flask_cors import CORS
from blueprints.user_api import user_api
from blueprints.sentiment_api import sentiment_api
import os
import requests

app = Flask(__name__, static_folder='/app/build')
app.register_blueprint(user_api)
app.register_blueprint(sentiment_api)

#Did not put this into blueprints as it led to more complicated static file serving
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder , path)
    else:
        return send_from_directory(app.static_folder , 'index.html')
CORS(app)



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
    

