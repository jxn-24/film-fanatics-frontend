import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ClubDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [club, setClub] = useState(null);
  const [posts, setPosts] = useState([]);
  const [members, setMembers] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [newMovie, setNewMovie] = useState({ title: '', year: '' });
  const [commentInputs, setCommentInputs] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [id]);

  const fetchData = async () => {
    try {
      const [clubRes, postsRes, membersRes, watchlistRes] = await Promise.all([
        axios.get(`http://localhost:3001/clubs/${id}`),
        axios.get(`http://localhost:3001/posts?clubId=${id}`),
        axios.get(`http://localhost:3001/memberships?clubId=${id}`),
        axios.get(`http://localhost:3001/watchlist?clubId=${id}`),
      ]);
      setClub(clubRes.data);
      setPosts(postsRes.data);
      setMembers(membersRes.data);
      setWatchlist(watchlistRes.data);
    } catch (error) {
      console.error('Error loading club data:', error);
    }
  };

  const handleJoin = async () => {
    if (!user) return alert('Please log in');
    const alreadyMember = members.find(m => m.userId === user.id);
    if (alreadyMember) return alert('You are already a member!');
    await axios.post('http://localhost:3001/memberships', {
      userId: user.id,
      clubId: parseInt(id)
    });
    fetchData();
  };

  const handleLike = async (postId, currentLikes) => {
    await axios.patch(`http://localhost:3001/posts/${postId}`, {
      likes: currentLikes + 1
    });
    fetchData();
  };

  const handleAddComment = async (postId) => {
    const text = commentInputs[postId];
    if (!text || !user) return;

    const updatedPost = posts.find(p => p.id === postId);
    const newComment = {
      id: Date.now(),
      userId: user.id,
      username: user.username,
      avatar: user.avatar,
      text,
      date: new Date().toISOString().split('T')[0]
    };

    await axios.patch(`http://localhost:3001/posts/${postId}`, {
      comments: [...(updatedPost.comments || []), newComment]
    });

    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
    fetchData();
  };

  const handleAddMovie = async (e) => {
    e.preventDefault();
    if (!newMovie.title || !newMovie.year) return;
    await axios.post('http://localhost:3001/watchlist', {
      ...newMovie,
      clubId: parseInt(id)
    });
    setNewMovie({ title: '', year: '' });
    fetchData();
  };

  const handleDeleteClub = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this club?");
    if (confirmDelete) {
      await axios.delete(`http://localhost:3001/clubs/${id}`);
      navigate('/clubs');
    }
  };

  if (isLoading) return <div className="container"><p>Loading...</p></div>;
  if (!club) return <div className="container"><p>Club not found.</p></div>;

  return (
    <div className="container">
      <div className="card">
        <h2>{club.name}</h2>
        <p><strong>Genre:</strong> {club.genre}</p>
        <p>{club.description}</p>
        <img
          src={club.image}
          alt={club.name}
          style={{
            width: '100%',
            maxHeight: '250px',
            objectFit: 'cover',
            borderRadius: '8px',
            marginBottom: '15px'
          }}
        />
        {!members.find(m => m.userId === user?.id) && (
          <button className="btn btn-green" onClick={handleJoin}>Join Club</button>
        )}
      </div>

      <div className="card">
        <h3>Watchlist</h3>
        <ul>
          {watchlist.map(m => (
            <li key={m.id}>{m.title} ({m.year})</li>
          ))}
        </ul>
        {user && (
          <form onSubmit={handleAddMovie} style={{ marginTop: '15px' }}>
            <input
              type="text"
              placeholder="Movie Title"
              className="form-control"
              value={newMovie.title}
              onChange={e => setNewMovie({ ...newMovie, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Year"
              className="form-control"
              value={newMovie.year}
              onChange={e => setNewMovie({ ...newMovie, year: e.target.value })}
            />
            <button className="btn btn-green" type="submit">Add</button>
          </form>
        )}
      </div>

      <div className="card">
        <h3>Posts</h3>
        {posts.map(post => (
          <div key={post.id} className="card" style={{ background: '#f9f9f9' }}>
            <h4>{post.title}</h4>
            <p>{post.body}</p>
            <button className="btn btn-green" onClick={() => handleLike(post.id, post.likes)}>
              👍 {post.likes}
            </button>
            <div style={{ marginTop: '10px' }}>
              {post.comments?.map(c => (
                <div key={c.id} style={{ marginBottom: '5px' }}>
                  <img src={c.avatar} alt={c.username} style={{ width: '25px', borderRadius: '50%', marginRight: '5px' }} />
                  <strong>{c.username}</strong>: {c.text}
                </div>
              ))}
              {user && (
                <>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Add comment..."
                    value={commentInputs[post.id] || ''}
                    onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                  />
                  <button className="btn btn-green" style={{ marginTop: '5px' }} onClick={() => handleAddComment(post.id)}>
                    Submit Comment
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <h3>Members ({members.length})</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {members.map(m => {
            const memberUser = JSON.parse(localStorage.getItem('allUsers') || '[]').find(u => u.id === m.userId);
            return (
              <li key={m.id} style={{ marginBottom: '10px' }}>
                <img
                  src={memberUser?.avatar}
                  alt={memberUser?.username}
                  style={{ width: '30px', borderRadius: '50%', marginRight: '10px' }}
                />
                {memberUser?.username}
              </li>
            );
          })}
        </ul>
      </div>

      {user?.id === club.creatorId && (
        <div style={{ textAlign: 'right', marginTop: '20px' }}>
          <Link to={`/clubs/${club.id}/edit`} className="btn btn-green">Edit Club</Link>
          <button onClick={handleDeleteClub} className="btn btn-green" style={{ marginLeft: '10px' }}>
            Delete Club
          </button>
        </div>
      )}
    </div>
  );
};

export default ClubDetails;
