from flask import Flask, render_template, request, redirect, url_for, jsonify
from ultralytics import YOLO
import sqlite3
import os
import base64
from io import BytesIO
from PIL import Image

# Setup
app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Load YOLOv8 model
model = YOLO('yolov8s.pt')

# Allowed detected objects
allowed_objects = ["bottle", "fork", "spoon", "knife", "cup", "cell phone", "toothbrush"]

# Helper function to query database
def query_microplastic_data(object_name):
    conn = sqlite3.connect('microplastics.sqlite')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM microplastic_data WHERE object_name = ?", (object_name,))
    data = cursor.fetchone()
    conn.close()
    return data

# Helper function to calculate spoon percentage
def calculate_spoon_percentage(particles_per_use):
    grams_per_particle = 0.0000002  # 200 nanograms per particle
    spoon_grams = 5.0  # average plastic spoon ~5 grams
    days = 365 * 10  # 10 years

    accumulated_mass = particles_per_use * grams_per_particle * days
    spoon_fraction = accumulated_mass / spoon_grams
    return round(spoon_fraction * 100, 2)  # Convert to percentage

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return "No file part", 400

    file = request.files['file']
    if file.filename == '':
        return "No selected file", 400

    filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(filepath)

    results = model.predict(source=filepath, show=False)
    final_object = None
    boxes = results[0].boxes

    if boxes is not None and boxes.cls.numel() > 0:
        for i in range(len(boxes.cls)):
            class_id = int(boxes.cls[i])
            confidence = float(boxes.conf[i])
            label = results[0].names[class_id]

            if label in allowed_objects and confidence >= 0.75:
                final_object = label
                break

    os.remove(filepath)

    if final_object:
        return redirect(url_for('refine', detected_object=final_object))
    else:
        return "No suitable object detected", 400

@app.route('/detect_frame', methods=['POST'])
def detect_frame():
    data = request.get_json()
    if not data or 'image' not in data:
        return jsonify({'success': False}), 400

    image_data = data['image'].split(",")[1]
    image_bytes = base64.b64decode(image_data)
    image = Image.open(BytesIO(image_bytes)).convert('RGB')

    temp_path = os.path.join(UPLOAD_FOLDER, "frame.jpg")
    image.save(temp_path)

    results = model.predict(source=temp_path, show=False)
    final_object = None
    boxes = results[0].boxes

    if boxes is not None and boxes.cls.numel() > 0:
        for i in range(len(boxes.cls)):
            class_id = int(boxes.cls[i])
            confidence = float(boxes.conf[i])
            label = results[0].names[class_id]

            if label in allowed_objects and confidence >= 0.75:
                final_object = label
                break

    os.remove(temp_path)

    if final_object:
        return jsonify({'success': True, 'redirect_url': url_for('refine', detected_object=final_object)})
    else:
        return jsonify({'success': False})

@app.route('/refine')
def refine():
    detected_object = request.args.get('detected_object', None)
    if not detected_object:
        return "No object detected", 400

    if detected_object == 'bottle':
        options = ['small bottle', 'medium bottle', 'large bottle', 'very large bottle']
    elif detected_object == 'toothbrush':
        options = ['new toothbrush', 'old toothbrush']
    elif detected_object == 'cell phone':
        options = ['new plastic phone case', 'old plastic phone case']
    else:
        options = [f"plastic {detected_object}"]

    return render_template('refine.html', options=options, detected_object=detected_object)

@app.route('/result', methods=['POST'])
def result():
    selected_object = request.form.get('selected_object', None)
    if not selected_object:
        return "No object selected", 400

    data = query_microplastic_data(selected_object)
    if data:
        id, object_name, notes, microplastic_particles, risk_level, alternative = data
        spoon_percentage = calculate_spoon_percentage(microplastic_particles)

        return render_template('result.html',
                               object_name=object_name,
                               notes=notes,
                               microplastic_particles=microplastic_particles,
                               risk_level=risk_level,
                               alternative=alternative,
                               spoon_percentage=spoon_percentage)
    else:
        return "No data found for selected object", 404

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/references')
def references():
    return render_template('references.html')

@app.route('/future-work')
def future_work():
    return render_template('future_work.html')

# Start server
if __name__ == '__main__':
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.run(debug=True)
