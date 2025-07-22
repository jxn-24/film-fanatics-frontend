import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ClubList() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/clubs`);
        setClubs(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching clubs:', error);
        setLoading(false);
      }
    };
    fetchClubs();
  }, []);

  if (loading) {
    return <p>Loading clubs...</p>;
  }

  return (
    <div>
      <h2>Movie Clubs</h2>
      {clubs.length === 0 ? (
        <p>No clubs found.</p>
      ) : (
        <ul>
          {clubs.map((club) => (
            <li key={club.id}>
              <Link to={`/clubs/${club.id}`}>
                <h3>{club.name}</h3>
                <p>{club.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ClubList;