from flask import Flask, request, json, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/predict_menu", methods=['POST'])
def predict_menu():
    args = request.get_json(force=True)
    print(args)
    response = {
        "result":"success"
    }
    return jsonify(response)

app.run(debug=True, host='0.0.0.0', port=3001)