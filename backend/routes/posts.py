from flask import Blueprint, request, jsonify
from backend.app import db
from backend.models import Post, User, Club, Comment, Rating
from flask_jwt_extended import jwt_required, get_jwt_identity

posts_bp = Blueprint('posts', __name__)

@posts_bp.route('/', methods=['GET', 'POST', 'OPTIONS'])
@jwt_required()
def posts():
    if request.method == 'OPTIONS':
        # CORS preflight request handling
        return '', 200

    if request.method == 'POST':
        data = request.get_json()
        print("Received post data:", data)  # Debug log
        if not data or not data.get('content'):
            return jsonify({'message': 'Content is required'}), 400

        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if not user:
            return jsonify({'message': 'User not found'}), 404

        club_id = data.get('club_id')
        if club_id:
            club = Club.query.get(club_id)
            if not club:
                return jsonify({'message': 'Club not found'}), 404
        else:
            club = None

        post = Post(content=data['content'], user_id=user_id, club_id=club_id if club else None)
        db.session.add(post)
        db.session.commit()

        return jsonify({'message': 'Post created successfully', 'post_id': post.id}), 201

    elif request.method == 'GET':
        posts = Post.query.all()
        return jsonify([{
            'id': p.id,
            'content': p.content,
            'timestamp': p.timestamp.isoformat(),
            'user_id': p.user_id,
            'club_id': p.club_id
        } for p in posts]), 200

@posts_bp.route('/<int:post_id>', methods=['GET'])
def get_post(post_id):
    post = Post.query.get(post_id)
    if not post:
        return jsonify({'message': 'Post not found'}), 404

    comments = [{'id': c.id, 'content': c.content, 'user_id': c.user_id, 'timestamp': c.timestamp.isoformat()} for c in post.comments]
    ratings = [{'id': r.id, 'score': r.score, 'user_id': r.user_id} for r in post.ratings]

    return jsonify({
        'id': post.id,
        'content': post.content,
        'timestamp': post.timestamp.isoformat(),
        'user_id': post.user_id,
        'club_id': post.club_id,
        'comments': comments,
        'ratings': ratings
    })

@posts_bp.route('/<int:post_id>/rate', methods=['POST'])
@jwt_required()
def rate_post(post_id):
    data = request.get_json()
    if not data or 'score' not in data:
        return jsonify({'message': 'Score is required'}), 400

    score = data['score']
    if not isinstance(score, int) or score < 1 or score > 5:
        return jsonify({'message': 'Score must be an integer between 1 and 5'}), 400

    user_id = get_jwt_identity()
    post = Post.query.get(post_id)
    if not post:
        return jsonify({'message': 'Post not found'}), 404

    rating = Rating.query.filter_by(user_id=user_id, post_id=post_id).first()
    if rating:
        rating.score = score
    else:
        rating = Rating(score=score, user_id=user_id, post_id=post_id)
        db.session.add(rating)

    db.session.commit()
    return jsonify({'message': 'Rating submitted successfully'})