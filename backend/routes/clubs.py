from flask import Blueprint, request, jsonify
from backend.app import db
from backend.models import Club, User
from flask_jwt_extended import jwt_required, get_jwt_identity

clubs_bp = Blueprint('clubs', __name__, url_prefix='')

# Handle POST and OPTIONS (preflight) for club creation
@clubs_bp.route('', methods=['POST', 'OPTIONS'])
@jwt_required(optional=True)  # optional=True allows OPTIONS requests without JWT
def create_club():
    if request.method == 'OPTIONS':
        # Respond to CORS preflight request
        response = jsonify({'message': 'CORS preflight passed'})
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:5173")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
        response.headers.add("Access-Control-Allow-Methods", "POST,OPTIONS")
        return response, 204

    # Require JWT after OPTIONS
    user_id = get_jwt_identity()
    if not user_id:
        return jsonify({'message': 'Missing or invalid token'}), 401

    data = request.get_json()
    if not data or not data.get('name') or not data.get('genre'):
        return jsonify({'message': 'Missing required fields'}), 400

    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    club = Club(
        name=data['name'],
        genre=data['genre'],
        description=data.get('description', ''),
        owner_id=user_id
    )
    db.session.add(club)
    db.session.commit()

    return jsonify({'message': 'Club created successfully', 'club_id': club.id}), 201


# List all clubs, with optional genre filtering
@clubs_bp.route('', methods=['GET'])
def list_clubs():
    genre = request.args.get('genre')
    if genre:
        clubs = Club.query.filter_by(genre=genre).all()
    else:
        clubs = Club.query.all()

    clubs_list = [{
        'id': club.id,
        'name': club.name,
        'genre': club.genre,
        'description': club.description,
        'owner_id': club.owner_id
    } for club in clubs]

    return jsonify(clubs_list)


# Get single club by ID
@clubs_bp.route('/<int:club_id>', methods=['GET'])
def get_club(club_id):
    club = Club.query.get(club_id)
    if not club:
        return jsonify({'message': 'Club not found'}), 404

    return jsonify({
        'id': club.id,
        'name': club.name,
        'genre': club.genre,
        'description': club.description,
        'owner_id': club.owner_id
    })


# Handle POST and OPTIONS (preflight) for joining a club
@clubs_bp.route('/<int:club_id>/join', methods=['POST', 'OPTIONS'])
@jwt_required(optional=True)  # optional=True allows OPTIONS requests without JWT
def join_club(club_id):
    if request.method == 'OPTIONS':
        # Respond to CORS preflight request
        response = jsonify({'message': 'CORS preflight passed'})
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:5173")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
        response.headers.add("Access-Control-Allow-Methods", "POST,OPTIONS")
        return response, 204

    try:
        # Require JWT after OPTIONS
        user_id = get_jwt_identity()
        if not user_id:
            return jsonify({'message': 'Missing or invalid token'}), 401

        user = User.query.get(user_id)
        if not user:
            return jsonify({'message': 'User not found'}), 404

        club = Club.query.get(club_id)
        if not club:
            return jsonify({'message': 'Club not found'}), 404

        # Assuming Club has a members relationship (many-to-many with User)
        if user in club.members:
            return jsonify({'message': 'User already a member of the club'}), 400

        club.members.append(user)
        db.session.commit()

        return jsonify({'message': 'Successfully joined the club'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Internal server error', 'error': str(e)}), 500
