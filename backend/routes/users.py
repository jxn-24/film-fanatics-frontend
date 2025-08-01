from flask import Blueprint, request, jsonify
from backend.app import db
from backend.models import User, WatchedMovie, Post, Club
from flask_jwt_extended import jwt_required, get_jwt_identity
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

users_bp = Blueprint('users', __name__)

@users_bp.route('', methods=['GET'])
@jwt_required()
def get_all_users():
    logger.debug("Fetching all users")
    users = User.query.all()
    users_list = [{
        'id': user.id,
        'username': user.username,
        'email': user.email
    } for user in users]
    logger.debug(f"Returning {len(users_list)} users")
    return jsonify(users_list)

@users_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    logger.debug("Fetching user profile")
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        logger.warning(f"User not found for ID: {user_id}")
        return jsonify({'message': 'User not found'}), 404

    # Gather followers and following
    followers = [{"id": u.id, "name": u.username} for u in user.followers]
    following = [{"id": u.id, "name": u.username} for u in user.following]

    # Gather watched movies
    watched_movies = WatchedMovie.query.filter_by(user_id=user.id).all()
    watched_movies_data = [{
        "id": wm.id,
        "title": wm.movie_title,
        "poster": "https://via.placeholder.com/150"  # Replace with actual poster logic
    } for wm in watched_movies]

    # Gather posts
    posts_data = [{
        "id": post.id,
        "content": post.content,
        "created_at": post.created_at.isoformat() if post.created_at else None
    } for post in user.posts]

    # Gather joined clubs
    clubs_data = [{
        "id": club.id,
        "name": club.name,
        "description": club.description
    } for club in user.clubs]

    profile_data = {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "profile_info": user.profile_info,

        "followersCount": len(followers),
        "followingCount": len(following),
        "followers": followers,
        "followingUsers": following,

        "moviesWatchedCount": len(watched_movies),
        "watchedMovies": watched_movies_data,

        "posts": posts_data,
        "joinedClubs": clubs_data
    }

    logger.debug(f"Profile data for user {user_id}: {profile_data}")
    return jsonify(profile_data)

@users_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    logger.debug("Updating user profile with PUT")
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        logger.warning(f"User not found for ID: {user_id}")
        return jsonify({'message': 'User not found'}), 404

    data = request.get_json()
    if not data:
        logger.warning("No data provided for profile update")
        return jsonify({'message': 'No data provided'}), 400

    if 'username' in data:
        user.username = data['username']
    if 'email' in data:
        user.email = data['email']
    if 'profile_info' in data:
        user.profile_info = data['profile_info']

    try:
        db.session.commit()
        logger.debug(f"Profile updated successfully for user {user_id}")
        return jsonify({'message': 'Profile updated successfully', 'id': user.id, 'username': user.username, 'email': user.email, 'profile_info': user.profile_info})
    except Exception as e:
        db.session.rollback()
        logger.error(f"Failed to update profile: {str(e)}")
        return jsonify({'message': 'Profile update failed', 'error': str(e)}), 500

@users_bp.route('/profile', methods=['PATCH'])
@jwt_required()
def patch_profile():
    logger.debug("Updating user profile with PATCH")
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        logger.warning(f"User not found for ID: {user_id}")
        return jsonify({'message': 'User not found'}), 404

    data = request.get_json() or {}
    if not any(key in data for key in ['username', 'email', 'profile_info']):
        logger.warning("No updatable fields provided for PATCH")
        return jsonify({'message': 'No updatable fields provided'}), 400

    if 'username' in data:
        user.username = data['username']
    if 'email' in data:
        user.email = data['email']
    if 'profile_info' in data:
        user.profile_info = data['profile_info']

    try:
        db.session.commit()
        logger.debug(f"Profile patched successfully for user {user_id}")
        return jsonify({'message': 'Profile updated successfully', 'id': user.id, 'username': user.username, 'email': user.email, 'profile_info': user.profile_info})
    except Exception as e:
        db.session.rollback()
        logger.error(f"Failed to patch profile: {str(e)}")
        return jsonify({'message': 'Profile update failed', 'error': str(e)}), 500
