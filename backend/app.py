# backend/app.py
import os
from flask import Flask, jsonify, request, g
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import sqlite3

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Absolute path for the SQLite database
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATABASE = os.path.join(BASE_DIR, 'athena.db')
print(DATABASE)
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DATABASE}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
# print(db)

# SQLite setup function
def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

# Models
class Content(db.Model):
    __tablename__ = 'contents'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    body = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(100))
    meta_description = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

class ContentVersion(db.Model):
    __tablename__ = 'content_versions'
    id = db.Column(db.Integer, primary_key=True)
    content_id = db.Column(db.Integer, db.ForeignKey('contents.id'), nullable=False)
    body = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

# Create tables if they don't exist
with app.app_context():
    db.create_all()

# Routes
@app.route("/content", methods=["POST"])
def create_content():
    data = request.json
    new_content = Content(
        title=data.get("title"),
        body=data.get("body"),
        category=data.get("category"),
        meta_description=data.get("meta_description")
    )
    db.session.add(new_content)
    db.session.commit()
    return jsonify({"message": "Content created"}), 201

@app.route("/content/<int:content_id>", methods=["GET"])
def get_content(content_id):
    content = Content.query.get_or_404(content_id)
    return jsonify({
        "id": content.id,
        "title": content.title,
        "body": content.body,
        "category": content.category,
        "meta_description": content.meta_description
    })

@app.route("/content/<int:content_id>", methods=["PUT"])
def update_content(content_id):
    content = Content.query.get_or_404(content_id)
    data = request.json
    if "title" in data:
        content.title = data["title"]
    if "body" in data:
        content.body = data["body"]
    if "category" in data:
        content.category = data["category"]
    if "meta_description" in data:
        content.meta_description = data["meta_description"]
    
    # Version control - store the old version
    version = ContentVersion(content_id=content.id, body=content.body)
    db.session.add(version)
    db.session.commit()

    db.session.commit()
    return jsonify({"message": "Content updated"}), 200

@app.route("/content/<int:content_id>", methods=["DELETE"])
def delete_content(content_id):
    content = Content.query.get_or_404(content_id)
    db.session.delete(content)
    db.session.commit()
    return jsonify({"message": "Content deleted"}), 204

@app.route("/contents", methods=["GET"])
def get_all_content():
    content_list = Content.query.all()
    result = [
        {
            "id": content.id,
            "title": content.title,
            "category": content.category,
            "meta_description": content.meta_description,
            "created_at": content.created_at
        } for content in content_list
    ]
    return jsonify(result)

# Run the application
if __name__ == "__main__":
    app.run(debug=True)







































# from flask import Flask, jsonify, request
# from flask_sqlalchemy import SQLAlchemy
# from datetime import datetime

# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = r"C:\Users\AYODEJI\Desktop\ultimate-react-course-main\athena_CMS_project\backend\athena.db"

# # app.config['SQLALCHEMY_DATABASE_URI'] = "C:\Users\AYODEJI\Desktop\ultimate-react-course-main\athena_CMS_project\backend\athena.db"#'sqlite:///athena.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# db = SQLAlchemy(app)

# # Import models and routes
# from models import Content
# import routes

# db.create_all()

# if __name__ == "__main__":
#     app.run(debug=True)
