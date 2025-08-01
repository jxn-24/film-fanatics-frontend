from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object('backend.config.Config')

    # CORS setup for frontend-backend communication
    CORS(app,
         resources={r"/api/*": {"origins": "*"}},
         supports_credentials=True,
         allow_headers=["Content-Type", "Authorization"],
         expose_headers=["Content-Type", "Authorization"],
         methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"])

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    # Custom error responses for JWT
    @jwt.unauthorized_loader
    def unauthorized_response(callback):
        return jsonify({'message': 'Missing Authorization Header'}), 401

    @jwt.expired_token_loader
    def expired_token_response(jwt_header, jwt_payload):
        return jsonify({'message': 'Token has expired'}), 401

    # Register all blueprints
    from backend.routes.auth import auth_bp
    from backend.routes.users import users_bp
    from backend.routes.clubs import clubs_bp
    from backend.routes.posts import posts_bp
    from backend.routes.comments import comments_bp
    from backend.routes.follows import follows_bp
    from backend.routes.tracker import tracker_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(users_bp, url_prefix='/api/users')
    app.register_blueprint(clubs_bp, url_prefix='/api/clubs')
    app.register_blueprint(posts_bp, url_prefix='/api/posts')
    app.register_blueprint(comments_bp, url_prefix='/api/comments')
    app.register_blueprint(follows_bp, url_prefix='/api/follows')
    app.register_blueprint(tracker_bp, url_prefix='/api/tracker')

    return app

# Create and run the app
app = create_app()

if __name__ == '__main__':
    app.run(debug=True, port=5000)
