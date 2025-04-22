from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from tensorflow.keras.models import load_model
import os
import json

app = Flask(__name__)
CORS(app)

# Load model and class names once on startup
MODEL_PATH = "model.h5"
CLASS_NAMES_PATH = "class_names.json"
IMG_HEIGHT = 224
IMG_WIDTH = 224

model = load_model(MODEL_PATH)

with open(CLASS_NAMES_PATH, "r") as f:
    class_names = json.load(f)

def predict_image(image_file):
    img = tf.keras.utils.load_img(image_file, target_size=(IMG_HEIGHT, IMG_WIDTH))
    img_array = tf.keras.utils.img_to_array(img)
    img_array = tf.expand_dims(img_array, axis=0)

    predictions = model.predict(img_array)
    probs = tf.nn.softmax(predictions[0]).numpy()

    predicted_index = np.argmax(probs)
    predicted_class = class_names[predicted_index]
    confidence = float(probs[predicted_index] * 100)

    return predicted_class, confidence

@app.route("/api/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    try:
        predicted_class, confidence = predict_image(file)
        return jsonify({
            "predicted_class": predicted_class,
            "confidence": round(confidence, 2)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
