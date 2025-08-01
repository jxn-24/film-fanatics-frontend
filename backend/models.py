from backend.app import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

followers = db.Table('followers',
    db.Column('follower_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('followed_id', db.Integer, db.ForeignKey('users.id'))
)

club_members = db.Table('club_members',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('club_id', db.Integer, db.ForeignKey('clubs.id'))
)

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(512), nullable=False)
    profile_info = db.Column(db.Text)
    posts = db.relationship('Post', backref='author', lazy='dynamic')
    clubs = db.relationship('Club', backref='owner', lazy='dynamic')
    followed = db.relationship(
        'User', secondary=followers,
        primaryjoin=(followers.c.follower_id == id),
        secondaryjoin=(followers.c.followed_id == id),
        backref=db.backref('followers', lazy='dynamic'), lazy='dynamic'
    )
    watched_movies = db.relationship('WatchedMovie', backref='user', lazy='dynamic')
    member_clubs = db.relationship(
        'Club',
        secondary=club_members,
        back_populates='members',
        lazy='dynamic'
    )

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Club(db.Model):
    __tablename__ = 'clubs'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(140), nullable=False)
    genre = db.Column(db.String(64))
    description = db.Column(db.Text)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    posts = db.relationship('Post', backref='club', lazy='dynamic')
    members = db.relationship(
        'User',
        secondary=club_members,
        back_populates='member_clubs',
        lazy='dynamic'
    )

class Post(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    club_id = db.Column(db.Integer, db.ForeignKey('clubs.id'))
    comments = db.relationship('Comment', backref='post', lazy='dynamic')
    ratings = db.relationship('Rating', backref='post', lazy='dynamic')

class Comment(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))

class Rating(db.Model):
    __tablename__ = 'ratings'
    id = db.Column(db.Integer, primary_key=True)
    score = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))

class WatchedMovie(db.Model):
    __tablename__ = 'watched_movies'
    id = db.Column(db.Integer, primary_key=True)
    movie_title = db.Column(db.String(140), nullable=False)
    watched_on = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    review = db.Column(db.Text)
    rating = db.Column(db.Integer)
