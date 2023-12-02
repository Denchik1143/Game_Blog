from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    search_query = "Search the world's largest fan vlog platform"  # Замініть на ваші дані або логіку
    return render_template('index.html', search_query=search_query)

@app.route('/form')
def show_form():
    return render_template('form.html')

@app.route('/submit', methods=['POST'])
def submit():
    # Отримайте дані з форми
    title = request.form.get('title')
    image = request.files['image']
    text = request.form.get('text')

if __name__ == '__main__':
    app.run(debug=True)
