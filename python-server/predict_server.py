from flask import Flask, request, json, jsonify
from flask_cors import CORS
from predict import predict

app = Flask(__name__)
CORS(app)

@app.route("/predict_menu", methods=['POST'])
def predict_menu():
    args = request.get_json(force=True)
    print(args["order"])
    result = predict(args["order"])
    print(result)
    response = {
        "result": result
    }
    return jsonify(response)

app.run(debug=False, host='0.0.0.0', port=3002)