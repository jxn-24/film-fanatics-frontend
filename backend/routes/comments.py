from flask import Blueprint, request, jsonify
from backend.app import db
from backend.models import Comment, Post, User
from flask_jwt_extended import jwt_required, get_jwt_identity

comments_bp = Blueprint('comments', __name__)

@comments_bp.route('/<int:post_id>', methods=['POST'])
@jwt_required()
def add_comment(post_id):
    data = request.get_json()
    if not data or not data.get('content'):
        return jsonify({'message': 'Content is required'}), 400

    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    post = Post.query.get(post_id)
    if not post:
        return jsonify({'message': 'Post not found'}), 404

    comment = Comment(content=data['content'], user_id=user_id, post_id=post_id)
    db.session.add(comment)
    db.session.commit()

    return jsonify({'message': 'Comment added successfully', 'comment_id': comment.id}), 201

@comments_bp.route('/<int:comment_id>', methods=['DELETE'])
@jwt_required()
def delete_comment(comment_id):
    user_id = get_jwt_identity()
    comment = Comment.query.get(comment_id)
    if not comment:
        return jsonify({'message': 'Comment not found'}), 404
    if comment.user_id != user_id:
        return jsonify({'message': 'Unauthorized'}), 403

    db.session.delete(comment)
    db.session.commit()
    return jsonify({'message': 'Comment deleted successfully'})
