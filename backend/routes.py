# backend/routes.py
from .app import app, db
from .models import Content, ContentVersion
from flask import request, jsonify

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
