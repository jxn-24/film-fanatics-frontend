import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaEdit } from 'react-icons/fa';

function ClubDetails() {
  const { id } = useParams();
  const [club, setClub] = useState(null);
  const [posts, setPosts] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/clubs/${id}`)
      .then((response) => setClub(response.data))
      .catch((error) => console.error('Error fetching club:', error));

    axios.get(`${process.env.REACT_APP_API_URL}/posts?club_id=${id}`)
      .then((response) => setPosts(response.data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, [id]);

  if (!club) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>{club.name}</h2>
      <img src={club.image_url} alt={club.name} style={{ maxWidth: '200px' }} />
      <p>Genre: {club.genre}</p>
      <p>{club.description}</p>
      {user && (
        <Link to={`/clubs/${id}/edit`}><FaEdit /> Edit Club</Link>
      )}
      <h3>Club Posts</h3>
      {posts.map((post) => (
        <div key={post.id} className="card">
          <p>{post.content}</p>
          <small>Posted on: {new Date(post.created_at).toLocaleDateString()}</small>
        </div>
      ))}
    </div>
  );
}

export default ClubDetails;
