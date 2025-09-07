import pickle
from helperurgency import classify_urgency  # This ensures the name exists

with open("urgency_classifier.pkl", "rb") as f:
    loaded_classifier = pickle.load(f)

print(loaded_classifier("There is a huge pothole causing accidents"))