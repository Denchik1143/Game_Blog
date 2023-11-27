from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    search_query = "Search the world's largest fan vlog platform"  # Замініть на ваші дані або логіку
    return render_template('index.html', search_query=search_query)

if __name__ == '__main__':
    app.run(debug=True)
