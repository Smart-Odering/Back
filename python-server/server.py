# pip install flask_cors
from flask import Flask, request, json, jsonify
from flask_cors import CORS

app = Flask(__name__)
# CORS(app, resources={r'*': {'origins': ['http://localhost:3001']}})
CORS(app)

@app.route("/stt", methods=['GET'])
def stt():
    # params = request.get_json()
    # print("받은 Json 데이터 ", params)

    response = {
        "result": "ok"
    }

    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=3001)