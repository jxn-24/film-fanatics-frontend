from flask import Blueprint, jsonify
from backend.app import db
from backend.models import User
from flask_jwt_extended import jwt_required, get_jwt_identity

follows_bp = Blueprint('follows', __name__)

@follows_bp.route('/follow/<int:user_id>', methods=['POST'])
@jwt_required()
def follow_user(user_id):
    current_user_id = get_jwt_identity()
    if current_user_id == user_id:
        return jsonify({'message': 'Cannot follow yourself'}), 400

    current_user = User.query.get(current_user_id)
    user_to_follow = User.query.get(user_id)
    if not user_to_follow:
        return jsonify({'message': 'User to follow not found'}), 404

    if user_to_follow in current_user.followed:
        return jsonify({'message': 'Already following this user'}), 400

    current_user.followed.append(user_to_follow)
    db.session.commit()
    return jsonify({'message': f'Now following user {user_to_follow.username}'})

@follows_bp.route('/unfollow/<int:user_id>', methods=['POST'])
@jwt_required()
def unfollow_user(user_id):
    current_user_id = get_jwt_identity()
    if current_user_id == user_id:
        return jsonify({'message': 'Cannot unfollow yourself'}), 400

    current_user = User.query.get(current_user_id)
    user_to_unfollow = User.query.get(user_id)
    if not user_to_unfollow:
        return jsonify({'message': 'User to unfollow not found'}), 404

    if user_to_unfollow not in current_user.followed:
        return jsonify({'message': 'Not following this user'}), 400

    current_user.followed.remove(user_to_unfollow)
    db.session.commit()
    return jsonify({'message': f'Unfollowed user {user_to_unfollow.username}'})
