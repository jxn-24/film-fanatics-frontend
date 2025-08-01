from flask import Blueprint, request, jsonify
from backend.app import db
from backend.models import WatchedMovie, User
from flask_jwt_extended import jwt_required, get_jwt_identity

tracker_bp = Blueprint('tracker', __name__)

@tracker_bp.route('/watched', methods=['POST'])
@jwt_required()
def add_watched_movie():
    data = request.get_json()
    if not data or not data.get('movie_title'):
        return jsonify({'message': 'Movie title is required'}), 400

    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    watched_movie = WatchedMovie(
        movie_title=data['movie_title'],
        watched_on=data.get('watched_on'),
        user_id=user_id,
        review=data.get('review'),
        rating=data.get('rating')
    )
    db.session.add(watched_movie)
    db.session.commit()

    return jsonify({'message': 'Watched movie added successfully', 'id': watched_movie.id}), 201

@tracker_bp.route('/watched', methods=['GET'])
@jwt_required()
def get_watched_movies():
    user_id = get_jwt_identity()
    watched_movies = WatchedMovie.query.filter_by(user_id=user_id).all()
    result = []
    for wm in watched_movies:
        result.append({
            'id': wm.id,
            'movie_title': wm.movie_title,
            'watched_on': wm.watched_on.isoformat() if wm.watched_on else None,
            'review': wm.review,
            'rating': wm.rating
        })
    return jsonify(result)
