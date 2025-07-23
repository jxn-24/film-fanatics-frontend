import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../index.css'; 

const ClubDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [club, setClub] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const mockClub = {
      id,
      name: 'Sci-Fi Universe',
      genre: 'Sci-Fi',
      members: 110,
      topMovie: 'Interstellar',
      watchlist: ['The Matrix', 'Arrival', 'Blade Runner 2049'],
    };

    setClub(mockClub);
    setEditData({
      name: mockClub.name,
      genre: mockClub.genre,
      description: 'A club for sci-fi lovers',
      image: '',
    });

    setComments([
      { id: 1, text: 'I loved Interstellar!', likes: 2 },
      { id: 2, text: 'The Matrix changed cinema forever.', likes: 3 },
    ]);
  }, [id]);

  const handleJoin = () => {
    setIsMember(true);
    setSuccessMessage('Successfully joined the club!');
    setTimeout(() => setSuccessMessage(''), 1500);
  };

  const handleLeave = () => {
    setIsMember(false);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newEntry = {
        id: comments.length + 1,
        text: newComment,
        likes: 0,
      };
      setComments([newEntry, ...comments]);
      setNewComment('');
    }
  };

  const handleLike = (id) => {
    const updated = comments.map((c) =>
      c.id === id ? { ...c, likes: c.likes + 1 } : c
    );
    setComments(updated);
  };

  if (!club) return <p>Loading club...</p>;

  return (
    <div className="club-details">
      <h2>{club.name}</h2>
      <p><strong>Genre:</strong> {club.genre}</p>
      <p><strong>Members:</strong> {club.members + (isMember ? 1 : 0)}</p>

      <h3>Top Movie: {club.topMovie}</h3>

      <h4>Watchlist</h4>
      <ul>
        {club.watchlist.map((movie, idx) => (
          <li key={idx}>{movie}</li>
        ))}
      </ul>

      {!isMember ? (
        <button className="join-btn" onClick={handleJoin}>Join Club</button>
      ) : (
        <button className="leave-btn" onClick={handleLeave}>Leave Club</button>
      )}

      {isMember && (
        <div className="admin-actions">
          <button onClick={() => setEditMode(true)}>Edit Club</button>
          <button onClick={() => {
            alert('Club deleted!');
            navigate('/clubs');
          }}>Delete Club</button>
        </div>
      )}

      {successMessage && <p className="success">{successMessage}</p>}

      {editMode && (
        <div className="edit-form">
          <h4>Edit Club</h4>
          <input
            type="text"
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            placeholder="Club name"
          />
          <input
            type="text"
            value={editData.genre}
            onChange={(e) => setEditData({ ...editData, genre: e.target.value })}
            placeholder="Genre"
          />
          <textarea
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            placeholder="Description"
          />
          <input
            type="text"
            value={editData.image}
            onChange={(e) => setEditData({ ...editData, image: e.target.value })}
            placeholder="Image URL (optional)"
          />
          <button onClick={() => {
            alert('Club updated successfully!');
            setEditMode(false);
          }}>Save Changes</button>
        </div>
      )}

      <div className="comments-section">
        <h4>Comments</h4>
        <div className="add-comment">
          <input
            type="text"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleAddComment}>Comment</button>
        </div>
        <ul className="comments">
          {comments.map((c) => (
            <li key={c.id}>
              {c.text}
              <span className="likes" onClick={() => handleLike(c.id)}>❤️ {c.likes}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClubDetails;