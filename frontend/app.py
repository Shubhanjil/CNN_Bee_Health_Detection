import os
from flask import Flask, render_template, request, jsonify
import tensorflow as tf
from tensorflow.keras.utils import load_img, img_to_array  # <-- TF version
import numpy as np
import io

app = Flask(__name__)

#loading keras model
MODEL_PATH = os.path.join("model", "bee_cnn_model.keras")
if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"Model not found at {MODEL_PATH}")

model = tf.keras.models.load_model(MODEL_PATH)
IMG_SIZE = (128, 128)  # Must match training

def prepare_image(image_bytes):
    # Use TensorFlow's load_img → identical to Colab
    img = load_img(io.BytesIO(image_bytes), target_size=IMG_SIZE)
    arr = img_to_array(img) / 255.0
    arr = np.expand_dims(arr, axis=0)  # (1, 128, 128, 3)
    return arr

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "no file"}), 400
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "empty filename"}), 400

    try:
        img_bytes = file.read()
        x = prepare_image(img_bytes)
    except Exception as e:
        return jsonify({"error": f"invalid image: {e}"}), 400

    # Inference
    prob = float(model.predict(x, verbose=0)[0][0])  # sigmoid output
    label = "healthy" if prob < 0.5 else "unhealthy"
    confidence = prob if label == "unhealthy" else 1 - prob

    return jsonify({
        "label": label,
        "confidence": round(confidence, 4)  # e.g., 0.7348
    })

# -------------------------------------------------
if __name__ == "__main__":
    print(f"Model loaded: {MODEL_PATH}")
    print("Server starting at http://127.0.0.1:5000")
    app.run(host="0.0.0.0", port=5000, debug=True)