from flask import Flask, render_template, request, jsonify, url_for
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

UPLOAD_FOLDER = 'seves'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    if request.method == 'POST':
        title = request.form['title']
        text = request.form['text']
        image = request.files['image']
        if image:
            filename = secure_filename(image.filename)
            image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            image_src = url_for('static', filename=filename)
        else:
            image_src = None
        return jsonify({'title': title, 'imageSrc': image_src, 'text': text})
    


if __name__ == '__main__':
    app.run(debug=True)

