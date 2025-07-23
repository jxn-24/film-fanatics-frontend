import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../index.css';

const ClubList = () => {
  const navigate = useNavigate();
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/clubs')
      .then((response) => response.json())
      .then((data) => setClubs(data))
      .catch((error) => console.error('Error fetching clubs:', error));
  }, []);
  const handleJoin = (id) => {
    navigate(`/clubs/${id}`);
  };

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