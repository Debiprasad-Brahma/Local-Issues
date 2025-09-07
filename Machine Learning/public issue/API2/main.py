# # main.py
# from fastapi import FastAPI
# from pydantic import BaseModel
# import pickle
# import dill

# app = FastAPI(title="Public Opinion Analysis API")

# class TextRequest(BaseModel):
#     text: str

# # Load models at startup
# @app.on_event("startup")
# def load_models():
#     global urgency_classifier, sentiment_classifier
#     print("Loading models...")
#     with open("urgency_classifier_simple.pkl", "rb") as f:
#         urgency_classifier = dill.load(f)
#     with open("sentiment_model.pkl", "rb") as f:
#         sentiment_classifier = pickle.load(f)
#     print("Models loaded successfully!")

# @app.get("/")
# def home():
#     return {"message": "Welcome to the Public Opinion Analysis API!"}

# @app.post("/classify-urgency")
# def classify_urgency_endpoint(req: TextRequest):
#     result = urgency_classifier(req.text)
#     return {
#         "text": req.text,
#         "urgency": result["label"],
#         "confidence": result["confidence"]
#     }

# @app.post("/analyze-sentiment")
# def analyze_sentiment(req: TextRequest):
#     result = sentiment_classifier(req.text)
#     label_map = {"LABEL_0": "Negative", "LABEL_1": "Neutral", "LABEL_2": "Positive"}
#     label = label_map.get(result[0]["label"], result[0]["label"])
#     score = result[0]["score"]
#     return {
#         "text": req.text,
#         "sentiment": label,
#         "confidence": score
#     }
from flask import Flask, request, jsonify
import pickle
import pickle
from helperurgency import classify_urgency  # This ensures the name exists

with open("urgency_classifier.pkl", "rb") as f:
    loaded_classifier = pickle.load(f)


app = Flask(__name__)

# with open("urgency_classifier_simple.pkl", "rb") as f:
#     urgency_classifier = dill.load(f)
with open("sentiment_model.pkl", "rb") as f:
    sentiment_classifier = pickle.load(f)

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Flask API is running!"})

@app.route("/classify-urgency", methods=["POST"])
def classify_urgency():
    data = request.get_json()
    result = loaded_classifier(data["text"])
    return jsonify(result)

@app.route("/analyze-sentiment", methods=["POST"])
def analyze_sentiment():
    data = request.get_json()
    result = sentiment_classifier(data["text"])
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
