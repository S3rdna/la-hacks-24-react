from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

def get_db_connection():
    conn = sqlite3.connect('login.db')
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

def add_user(username, password):
    conn = get_db_connection()
    cursor = conn.cursor()
    # Check if the user already exists
    cursor.execute('SELECT id FROM users WHERE username = ?', (username,))
    user = cursor.fetchone()
    if user:
        conn.close()
        return False  # User already exists

    hashed_password = generate_password_hash(password)
    cursor.execute('INSERT INTO users (username, password) VALUES (?, ?)', (username, hashed_password))
    conn.commit()
    conn.close()
    return True


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.content_type != 'application/json':
        return jsonify({"message": "Content-Type must be application/json", "status": False}), 415

    data = request.json
    username = data['username']
    password = data['password']
    try:
        add_user(username, password)
        return jsonify({"message": "User registered successfully", "status": True}), 201
    except sqlite3.IntegrityError:
        return jsonify({"message": "Username already exists", "status": False}), 409

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.content_type != 'application/json':
        return jsonify({"message": "Content-Type must be application/json", "status": False}), 415

    data = request.json
    username = data.get('username')
    password = data.get('password')

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM users WHERE username = ?', (username,))
    user = cursor.fetchone()
    conn.close()

    if user and check_password_hash(user['password'], password):
        return jsonify({"message": "Login successful", "status": True}), 200
    else:
        return jsonify({"message": "Invalid credentials", "status": False}), 401

def manually_add_user(username, password):
    conn = sqlite3.connect('login.db')
    cursor = conn.cursor()
    # Check if user already exists
    cursor.execute('SELECT id FROM users WHERE username = ?', (username,))
    if cursor.fetchone():
        print("User already exists")
        return False

    # Add new user
    hashed_password = generate_password_hash(password)
    cursor.execute('INSERT INTO users (username, password) VALUES (?, ?)', (username, hashed_password))
    conn.commit()
    conn.close()
    print("User added successfully")
    return True


if __name__ == '__main__':
    init_db()  # Initialize the database and create table if not exists
    manually_add_user('newuser', 'password123')
    app.run(port=8888, debug=True)
