import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function WatchedMovies() {
  const { user } = useSelector((state) => state.auth);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:3001/watched_movies?user_id=${user.id}`)
        .then((response) => setMovies(response.data))
        .catch((error) => console.error('Error fetching watched movies:', error));
    }
  }, [user]);

  if (!user) return <div>Please log in to view your watched movies.</div>;

  return (
    <div className="container">
      <h2>Watched Movies</h2>
      {movies.map((movie) => (
        <div key={movie.id} className="card">
          <h3>{movie.movie_title}</h3>
          <p>Watched on: {new Date(movie.watched_at).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}

export default WatchedMovies;