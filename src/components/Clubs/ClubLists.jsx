import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ClubLists = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await axios.get('http://localhost:3001/clubs');
        setClubs(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchClubs();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="clubs-grid">
        {clubs.map((club) => (
          <div key={club.id} className="club-card">
            <h3>{club.name}</h3>
            <p>{club.genre}</p>
            <p>{club.description}</p>
            <Link to={`/clubs/${club.id}`} className="btn btn-primary">View Club</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubLists;