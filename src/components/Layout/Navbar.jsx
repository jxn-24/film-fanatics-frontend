import { Link } from 'react-router-dom';
import { FaHome, FaUsers, FaPlus, FaUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';

function Navbar () {
  const { user } = useSelector((state) => state.auth);

  return (
    <nav className="navbar">
      <div>
        <Link to="/"><FaHome /> Home</Link>
        <Link to="/posts"><FaUsers /> Posts</Link>
        <Link to="/create-club"><FaPlus /> Create Club</Link>
      </div>
      <div>
        {user ? (
          <Link to="/profile"><FaUser /> {user.username}</Link>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;