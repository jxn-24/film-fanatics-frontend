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
  const [joinedMessage, setJoinedMessage] = useState('');
  const [commentInputs, setCommentInputs] = useState({});
  const [newMovie, setNewMovie] = useState({ title: '', year: '' });

  useEffect(() => {
    fetchAllData();
  }, [id]);

  const fetchAllData = async () => {
    try {
      const [clubRes, postsRes, watchlistRes, membersRes] = await Promise.all([
        axios.get(`http://localhost:3001/clubs/${id}`),
        axios.get(`http://localhost:3001/posts?clubId=${id}`),
        axios.get(`http://localhost:3001/watchlist?clubId=${id}`),
        axios.get(`http://localhost:3001/members?clubId=${id}`)
      ]);

      setClub(clubRes.data);
      setPosts(postsRes.data);
      setWatchlist(watchlistRes.data);
      setMembers(membersRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleJoinClub = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const memberName = storedUser?.name || 'Anonymous';
      const avatar = storedUser?.avatar || `https://ui-avatars.com/api/?name=${memberName}`;

      const alreadyMember = members.some(member => member.name === memberName);
      if (alreadyMember) {
        setJoinedMessage('✅ You are already a member.');
        setTimeout(() => setJoinedMessage(''), 2000);
        return;
      }

      const newMember = {
        name: memberName,
        avatar,
        clubId: parseInt(id),
      };

      await axios.post('http://localhost:3001/members', newMember);
      const updatedMembers = await axios.get(`http://localhost:3001/members?clubId=${id}`);
      setMembers(updatedMembers.data);
      setJoinedMessage('🎉 Joined successfully!');
      setTimeout(() => setJoinedMessage(''), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLike = async (postId) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) return;

    const post = posts.find(p => p.id === postId);
    const alreadyLiked = post.likedBy?.includes(storedUser.name);
    if (alreadyLiked) return;

    try {
      await axios.patch(`http://localhost:3001/posts/${postId}`, {
        likes: post.likes + 1,
        likedBy: [...(post.likedBy || []), storedUser.name]
      });
      const updatedPosts = await axios.get(`http://localhost:3001/posts?clubId=${id}`);
      setPosts(updatedPosts.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCommentChange = (postId, value) => {
    setCommentInputs((prev) => ({ ...prev, [postId]: value }));
  };

  const handleAddComment = async (postId, currentComments) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const newComment = commentInputs[postId];
    if (!newComment || !storedUser) return;

    const post = posts.find(p => p.id === postId);
    const updatedCommentList = [...(post.commentsList || []), { user: storedUser.name, text: newComment }];

    try {
      await axios.patch(`http://localhost:3001/posts/${postId}`, {
        comments: currentComments + 1,
        commentsList: updatedCommentList
      });
      setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
      const updatedPosts = await axios.get(`http://localhost:3001/posts?clubId=${id}`);
      setPosts(updatedPosts.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddToWatchlist = async (e) => {
    e.preventDefault();
    if (!newMovie.title || !newMovie.year) return;
    try {
      const movieToAdd = {
        ...newMovie,
        clubId: parseInt(id)
      };
      await axios.post('http://localhost:3001/watchlist', movieToAdd);
      const updatedWatchlist = await axios.get(`http://localhost:3001/watchlist?clubId=${id}`);
      setWatchlist(updatedWatchlist.data);
      setNewMovie({ title: '', year: '' });
    } catch (err) {
      console.error(err);
    }
  };

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
            <button className="btn btn-green" onClick={handleJoinClub}>Join Club</button>
            {joinedMessage && (
              <p style={{ marginTop: '10px', color: '#2e7d32', fontWeight: 'bold' }}>
                {joinedMessage}
              </p>
            )}
          </div>
          <img
            src={club.image}
            alt={club.name}
            style={{
              width: '180px',
              height: '120px',
              borderRadius: '8px',
              objectFit: 'cover',
              marginTop: '10px'
            }}
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

        <form onSubmit={handleAddToWatchlist} style={{ marginTop: '20px' }}>
          <h4>Suggest a Movie</h4>
          <input
            type="text"
            className="form-control"
            placeholder="Movie Title"
            value={newMovie.title}
            onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
            style={{ marginBottom: '10px' }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Year"
            value={newMovie.year}
            onChange={(e) => setNewMovie({ ...newMovie, year: e.target.value })}
            style={{ marginBottom: '10px' }}
          />
          <button type="submit" className="btn btn-green">Add to Watchlist</button>
        </form>
      </div>

      <div className="card">
        <h3>Posts</h3>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="card" style={{ marginBottom: '20px' }}>
              <h4>{post.title}</h4>
              <p>{post.content}</p>
              <p>
                <button
                  className="btn btn-green"
                  style={{ marginRight: '10px' }}
                  onClick={() => handleLike(post.id)}
                >
                  👍 {post.likes}
                </button>
                💬 {post.comments}
              </p>
              <div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add a comment..."
                  value={commentInputs[post.id] || ''}
                  onChange={(e) => handleCommentChange(post.id, e.target.value)}
                />
                <button
                  className="btn btn-green"
                  style={{ marginTop: '10px' }}
                  onClick={() => handleAddComment(post.id, post.comments)}
                >
                  Submit Comment
                </button>
              </div>

              {/* Show user comments */}
              {post.commentsList?.length > 0 && (
                <ul style={{ marginTop: '10px' }}>
                  {post.commentsList.map((c, i) => (
                    <li key={i}><strong>{c.user}:</strong> {c.text}</li>
                  ))}
                </ul>
              )}
            </div>
          ))
        ) : (
          <p>No discussions yet.</p>
        )}
      </div>

      <div className="card">
        <h3>Members ({members.length})</h3>
        {members.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {members.map((user) => (
              <li key={user.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <img
                  src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`}
                  alt={user.name}
                  style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
                />
                <span>{user.name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No members yet.</p>
        )}
      </div>

      <div style={{ textAlign: 'right' }}>
        <Link to={`/clubs/${club.id}/edit`} className="btn btn-green">Edit Club</Link>
        <button
          className="btn btn-green"
          onClick={handleDelete}
          style={{ marginLeft: '10px' }}
        >
          Delete Club
        </button>
      </div>
    </div>
  );
};

export default ClubDetails;
