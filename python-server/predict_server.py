from flask import Flask, request, json, jsonify
from flask_cors import CORS
from predict import predict3
from konlpy.tag import Okt

app = Flask(__name__)
CORS(app)

okt = Okt()

@app.route("/predict_menu", methods=['POST'])
def predict_menu():
    args = request.get_json(force=True)
    print(args["order"])

    result = []
    result.extend(predict3(' '.join(okt.morphs(args["order"], stem=True))))
    result.extend(predict3(' '.join(okt.morphs(args["order"]))))
    # result.extend(predict3(' '.join(okt.nouns(args["order"]))))
    # result.extend(predict3(' '.join(okt.normalize(args["order"]))))
    result.extend(predict3(' '.join(okt.phrases(args["order"]))))
    result = list(set(result))
    response = {
        "result": result
    }
    return jsonify(response)

app.run(debug=False, host='0.0.0.0', port=3002)