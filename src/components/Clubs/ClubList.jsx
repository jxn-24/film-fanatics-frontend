import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../index.css';

const ClubList = () => {
  const navigate = useNavigate();
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    setClubs([
      { id: 1, name: 'Action Movie Buffs', genre: 'Action', members: 120 },
      { id: 2, name: 'Laugh Riot', genre: 'Comedy', members: 85 },
      { id: 3, name: 'Drama Queens & Kings', genre: 'Drama', members: 150 },
      { id: 4, name: 'Sci-Fi Universe', genre: 'Sci-Fi', members: 110 },
    ]);
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
