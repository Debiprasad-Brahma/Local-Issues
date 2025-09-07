from transformers import AutoTokenizer, AutoModelForSequenceClassification, TextClassificationPipeline
import torch

# 1️⃣ Load a PUBLIC pre-trained model
# "bert-base-uncased" is generic English BERT — we'll use it with dummy labels for urgency
model_name = "bert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name, num_labels=2)  
# num_labels=2 → urgent or not urgent

# 2️⃣ Create a pipeline for easy predictions
pipeline = TextClassificationPipeline(model=model, tokenizer=tokenizer, return_all_scores=True)

# 3️⃣ Define label mapping
id2label = {0: "Not Urgent", 1: "Urgent"}

# 4️⃣ Dummy classifier function
def classify_urgency(text):
    # For now, we use rule-based probabilities until fine-tuned
    if any(word in text.lower() for word in ["immediately", "urgent", "asap", "now", "emergency", "broken", "burst", "accident"]):
        pred_id = 1
        prob = 0.95
    else:
        pred_id = 0
        prob = 0.90
    return {"text": text, "label": id2label[pred_id], "confidence": prob}

# 5️⃣ Test
examples = [
    "The water pipe has burst and the street is flooding",
    "Street light is flickering but still works",
    "There is a huge pothole causing accidents"
]

for ex in examples:
    result = classify_urgency(ex)
    print(result)

    
