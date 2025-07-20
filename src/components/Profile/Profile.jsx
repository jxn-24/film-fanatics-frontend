import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

function Profile() {
  const { user } = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:3001/posts?user_id=${user.id}`)
        .then((response) => setPosts(response.data))
        .catch((error) => console.error('Error fetching posts:', error));
    }
  }, [user]);

  if (!user) return <div>Please log in to view your profile.</div>;

  return (
    <div className="container">
      <h2>{user.username}'s Profile</h2>
      <div className="card">
        <p><strong>Bio:</strong> {user.bio || 'No bio available'}</p>
        <Link to="/edit-profile"><FaEdit /> Edit Profile</Link>
      </div>
      <h3>Your Posts</h3>
      {posts.map((post) => (
        <div key={post.id} className="card">
          <p>{post.content}</p>
          <small>Posted on: {new Date(post.created_at).toLocaleDateString()}</small>
        </div>
      ))}
    </div>
  );
}

export default Profile;