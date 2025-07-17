import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const ClubDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [club, setClub] = useState(null);
  const [posts, setPosts] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchClub = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/clubs/${id}`);
        setClub(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/posts?clubId=${id}`);
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchWatchlist = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/watchlist?clubId=${id}`);
        setWatchlist(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchMembers = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/members?clubId=${id}`);
        setMembers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchClub();
    fetchPosts();
    fetchWatchlist();
    fetchMembers();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this club?')) {
      try {
        await axios.delete(`http://localhost:3001/clubs/${id}`);
        navigate('/clubs');
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (!club) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div>
            <h2>{club.name}</h2>
            <p><strong>Genre:</strong> {club.genre}</p>
            <p>{club.description}</p>
            <button className="btn btn-green">Join Club</button>
            <button className="btn btn-green" style={{ marginLeft: '10px' }}>Follow</button>
          </div>
          <img
            src={club.image}
            alt={club.name}
            style={{ width: '180px', height: '120px', borderRadius: '8px', objectFit: 'cover', marginTop: '10px' }}
          />
        </div>
      </div>

      <div className="card">
        <h3>Watchlist</h3>
        {watchlist.length > 0 ? (
          <ul>
            {watchlist.map((movie) => (
              <li key={movie.id}>{movie.title} ({movie.year})</li>
            ))}
          </ul>
        ) : (
          <p>No movies in watchlist yet.</p>
        )}
      </div>

      <div className="card">
        <h3>Posts</h3>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="card">
              <h4>{post.title}</h4>
              <p>{post.content}</p>
              <p>👍 {post.likes} 💬 {post.comments}</p>
            </div>
          ))
        ) : (
          <p>No discussions yet.</p>
        )}
      </div>

      <div className="card">
        <h3>Members ({members.length})</h3>
        {members.length > 0 ? (
          <ul>
            {members.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        ) : (
          <p>No members yet.</p>
        )}
      </div>

      <div style={{ textAlign: 'right' }}>
        <Link to={`/clubs/${club.id}/edit`} className="btn btn-green">Edit Club</Link>
        <button className="btn btn-green" onClick={handleDelete} style={{ marginLeft: '10px' }}>Delete Club</button>
      </div>
    </div>
  );
};

export default ClubDetails;
