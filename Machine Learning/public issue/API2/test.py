# from fastapi import FastAPI
# from pydantic import BaseModel

# app = FastAPI(title="FastAPI Demo")

# # Data model for requests
# class TextRequest(BaseModel):
#     text: str

# @app.get("/")
# def home():
#     return {"message": "API is running fine!"}

# @app.post("/echo")
# def echo_text(req: TextRequest):
#     return {
#         "original_text": req.text,
#         "length": len(req.text),
#         "upper_case": req.text.upper()
#     }
# from helperurgency import urgency_classifier
# print(urgency_classifier("The water pipe has burst and the street is flooding"))

import pickle
import pickle
from helperurgency import classify_urgency

with open("urgency_classifier.pkl", "wb") as f:
    pickle.dump(classify_urgency, f)
