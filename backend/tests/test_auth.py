import unittest
import json
from backend.app import create_app, db
from backend.models import User

class AuthTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.app.config['TESTING'] = True
        self.app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        self.client = self.app.test_client()

        with self.app.app_context():
            db.create_all()

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def register_user(self, username, email, password):
        return self.client.post('/auth/register', json={
            'username': username,
            'email': email,
            'password': password
        })

    def login_user(self, username, password):
        return self.client.post('/auth/login', json={
            'username': username,
            'password': password
        })

    def test_register_success(self):
        response = self.register_user('testuser', 'test@example.com', 'password123')
        self.assertEqual(response.status_code, 201)
        data = json.loads(response.data)
        self.assertIn('message', data)
        self.assertEqual(data['message'], 'User registered successfully')

    def test_register_missing_fields(self):
        response = self.client.post('/auth/register', json={})
        self.assertEqual(response.status_code, 400)

    def test_register_duplicate_user(self):
        self.register_user('testuser', 'test@example.com', 'password123')
        response = self.register_user('testuser', 'test@example.com', 'password123')
        self.assertEqual(response.status_code, 400)

    def test_login_success(self):
        self.register_user('testuser', 'test@example.com', 'password123')
        response = self.login_user('testuser', 'password123')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('access_token', data)

    def test_login_invalid_credentials(self):
        response = self.login_user('nonexistent', 'wrongpassword')
        self.assertEqual(response.status_code, 401)

    def test_login_missing_fields(self):
        response = self.client.post('/auth/login', json={})
        self.assertEqual(response.status_code, 400)

if __name__ == '__main__':
    unittest.main()
