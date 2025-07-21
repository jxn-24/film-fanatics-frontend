import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import  { FaFilm , FaUsers } from "react-icons/fa";
import axios from "axios";
import { useEffect , useState } from "react";

function LandingPage() {
  const { user } = useSelector((state) => state.auth);
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/clubs`)
      .then((response) => setClubs(response.data.slice(0, 3))) // Show up to 3 featured clubs
      .catch((error) => console.error('Error fetching clubs:', error));
  }, []);
  return (
    <div className="container">
      <h1>Welcome to Film Fanatics</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
        Connect with movie enthusiasts, join clubs, share reviews, and track your watched movies!
      </p>
      {user ? (
        <div>
          <h2>Hello, {user.username}!</h2>
          <p>Explore clubs or share your latest movie experience.</p>
        </div>
      ) : (
        <div>
          <Link to="/register" className="button">
            <FaUsers /> Join Now
          </Link>
          <Link to="/login" style={{ marginLeft: '10px' }}>
            <button>Login</button>
          </Link>
        </div>
      )}
      <h2>Featured Clubs</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {clubs.map((club) => (
          <div key={club.id} className="card" style={{ flex: '1 1 300px' }}>
            <img src={club.image_url} alt={club.name} style={{ maxWidth: '100px' }} />
            <h3>{club.name}</h3>
            <p>Genre: {club.genre}</p>
            <p>{club.description}</p>
            <Link to={`/clubs/${club.id}`}><FaFilm /> View Club</Link>
          </div>
        ))}
      </div>
      </div>
  );
}
    
export default LandingPage;