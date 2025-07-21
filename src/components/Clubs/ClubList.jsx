import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaUsers } from 'react-icons/fa';

const ClubLists = () => {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/clubs')
      .then((response) => setClubs(response.data))
      .catch((error) => console.error('Error fetching clubs:', error));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>Movie Clubs</h2>
      {clubs.map((club) => (
        <div key={club.id} className="card">
          <img src={club.image_url} alt={club.name} style={{ maxWidth: '100px' }} />
          <h3>{club.name}</h3>
          <p>Genre: {club.genre}</p>
          <p>{club.description}</p>
          <Link to={`/clubs/${club.id}`}><FaUsers /> View Club</Link>
        </div>
      ))}
    </div>
  );
}

export default ClubLists;