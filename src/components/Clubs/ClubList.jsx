import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClubs } from '../../store/clubSlice';
import { Link } from 'react-router-dom';

const ClubLists = () => {
  const dispatch = useDispatch();
  const { clubs } = useSelector((state) => state.clubs);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchClubs());
  }, [dispatch]);

  return (
    <div className="container">
      <h2 className="text-center" style={{ marginBottom: '30px' }}>All Clubs</h2>
      <div className="clubs-grid">
        {clubs.map((club) => (
          <div key={club.id} className="club-card">
            <img
              src={club.image}
              alt={club.name}
              style={{
                width: '100%',
                height: '160px',
                objectFit: 'cover',
                borderRadius: '6px',
                marginBottom: '10px'
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/300x160?text=No+Image';
              }}
            />
            <h3>{club.name}</h3>
            <p><strong>Genre:</strong> {club.genre}</p>
            <p>{club.description}</p>
            <div style={{ marginTop: 'auto', textAlign: 'center' }}>
              <Link to={`/clubs/${club.id}`} className="btn btn-green" style={{ marginTop: '10px' }}>
                View Club
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        {user ? (
          <Link to="/create-club" className="btn btn-primary">+ Create New Club</Link>
        ) : (
          <p>Please <Link to="/login">log in</Link> to create a club.</p>
        )}
      </div>
    </div>
  );
};

export default ClubLists;
