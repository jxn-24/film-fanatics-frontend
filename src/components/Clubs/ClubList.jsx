import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../index.css';

const ClubList = () => {
  const navigate = useNavigate();
  const [clubs, setClubs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:3001/clubs')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch clubs');
        return response.json();
      })
      .then((data) => {
        setClubs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching clubs:', error);
        setError('Failed to load clubs. Please try again later.');
        setLoading(false);
      });
  }, []);

  const handleJoin = (id) => {
    navigate(`/clubs/${id}`);
  };

  if (loading) return <p>Loading clubs...</p>;
  if (error) return <p className="error">{error}</p>;


  return (
    <div className="club-list">
      <h2>Discover Clubs</h2>
      <div className="club-cards">
        {clubs.map((club) => (
          <div key={club.id} className="club-card">
            <img src={club.image} alt={club.name} className="club-image" />
            <h3>{club.name}</h3>
            <p>Genre: {club.genre}</p>
            <p>{club.members} members</p>
            <button onClick={() => handleJoin(club.id)}>Join Club</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubList;