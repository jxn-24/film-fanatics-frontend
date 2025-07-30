import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  Star, 
  Clock, 
  Grid, 
  List, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye,
  SortAsc,
  SortDesc,
  Award,
  TrendingUp
} from 'lucide-react';

const WatchedMovies = () => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [sortBy, setSortBy] = useState('dateWatched');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showMovieModal, setShowMovieModal] = useState(false);

  // Sample watched movies data
  const [watchedMovies, setWatchedMovies] = useState([
    {
      id: 1,
      title: 'The Matrix',
      year: 1999,
      genre: 'Science Fiction',
      director: 'The Wachowskis',
      runtime: 136,
      rating: 4.5,
      personalRating: 5,
      dateWatched: '2024-01-15',
      poster: '/api/placeholder/300/450',
      review: 'Mind-bending masterpiece that redefined cinema.',
      rewatched: true,
      watchCount: 3,
      favorite: true
    },
    {
      id: 2,
      title: 'Inception',
      year: 2010,
      genre: 'Science Fiction',
      director: 'Christopher Nolan',
      runtime: 148,
      rating: 4.8,
      personalRating: 4,
      dateWatched: '2024-01-10',
      poster: '/api/placeholder/300/450',
      review: 'Complex and visually stunning. Need to watch again.',
      rewatched: false,
      watchCount: 1,
      favorite: false
    },
    {
      id: 3,
      title: 'The Godfather',
      year: 1972,
      genre: 'Crime',
      director: 'Francis Ford Coppola',
      runtime: 175,
      rating: 4.9,
      personalRating: 5,
      dateWatched: '2024-01-08',
      poster: '/api/placeholder/300/450',
      review: 'Timeless classic. Perfect storytelling.',
      rewatched: true,
      watchCount: 2,
      favorite: true
    },
    {
      id: 4,
      title: 'Pulp Fiction',
      year: 1994,
      genre: 'Crime',
      director: 'Quentin Tarantino',
      runtime: 154,
      rating: 4.6,
      personalRating: 4,
      dateWatched: '2024-01-05',
      poster: '/api/placeholder/300/450',
      review: 'Brilliant dialogue and non-linear storytelling.',
      rewatched: false,
      watchCount: 1,
      favorite: false
    },
    {
      id: 5,
      title: 'Spirited Away',
      year: 2001,
      genre: 'Animation',
      director: 'Hayao Miyazaki',
      runtime: 125,
      rating: 4.7,
      personalRating: 5,
      dateWatched: '2024-01-03',
      poster: '/api/placeholder/300/450',
      review: 'Beautiful animation and magical storytelling.',
      rewatched: true,
      watchCount: 4,
      favorite: true
    },
    {
      id: 6,
      title: 'The Dark Knight',
      year: 2008,
      genre: 'Action',
      director: 'Christopher Nolan',
      runtime: 152,
      rating: 4.8,
      personalRating: 4,
      dateWatched: '2024-01-01',
      poster: '/api/placeholder/300/450',
      review: 'Heath Ledger\'s Joker is unforgettable.',
      rewatched: false,
      watchCount: 1,
      favorite: false
    }
  ]);

  const genres = ['all', 'Action', 'Animation', 'Crime', 'Drama', 'Science Fiction', 'Thriller', 'Comedy'];
  const years = ['all', ...Array.from({length: 30}, (_, i) => 2024 - i)];

  // Filter and sort movies
  const filteredAndSortedMovies = useMemo(() => {
    let filtered = watchedMovies.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           movie.director.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = selectedGenre === 'all' || movie.genre === selectedGenre;
      const matchesYear = selectedYear === 'all' || movie.year.toString() === selectedYear;
      
      return matchesSearch && matchesGenre && matchesYear;
    });

    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'year':
          aValue = a.year;
          bValue = b.year;
          break;
        case 'rating':
          aValue = a.personalRating;
          bValue = b.personalRating;
          break;
        case 'dateWatched':
          aValue = new Date(a.dateWatched);
          bValue = new Date(b.dateWatched);
          break;
        case 'runtime':
          aValue = a.runtime;
          bValue = b.runtime;
          break;
        default:
          aValue = a.dateWatched;
          bValue = b.dateWatched;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [watchedMovies, searchTerm, selectedGenre, selectedYear, sortBy, sortOrder]);

  // Statistics
  const stats = useMemo(() => {
    const totalMovies = watchedMovies.length;
    const totalHours = Math.round(watchedMovies.reduce((sum, movie) => sum + movie.runtime, 0) / 60);
    const averageRating = (watchedMovies.reduce((sum, movie) => sum + movie.personalRating, 0) / totalMovies).toFixed(1);
    const favoriteCount = watchedMovies.filter(movie => movie.favorite).length;
    const rewatchedCount = watchedMovies.filter(movie => movie.rewatched).length;
    
    return {
      totalMovies,
      totalHours,
      averageRating,
      favoriteCount,
      rewatchedCount
    };
  }, [watchedMovies]);

  const handleDeleteMovie = (movieId) => {
    setWatchedMovies(prev => prev.filter(movie => movie.id !== movieId));
  };

  const handleToggleFavorite = (movieId) => {
    setWatchedMovies(prev => 
      prev.map(movie => 
        movie.id === movieId ? { ...movie, favorite: !movie.favorite } : movie
      )
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const StarRating = ({ rating, size = 'w-4 h-4' }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} ${
              star <= rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const MovieCard = ({ movie }) => (
    <div className="movie-card">
      <div className="movie-card-image relative aspect-[2/3] bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
        {movie.title}
        <div className="absolute top-2 right-2 flex space-x-1">
          {movie.favorite && (
            <div className="bg-red-500 text-white p-1 rounded-full">
              <Star className="w-4 h-4 fill-current" />
            </div>
          )}
          {movie.rewatched && (
            <div className="bg-green-500 text-white p-1 rounded-full">
              <Eye className="w-4 h-4" />
            </div>
          )}
        </div>
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
          {movie.year}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 line-clamp-2">{movie.title}</h3>
        <p className="text-gray-600 text-sm mb-2">Dir. {movie.director}</p>
        <div className="flex items-center justify-between mb-2">
          <StarRating rating={movie.personalRating} />
          <span className="text-sm text-gray-500">{formatRuntime(movie.runtime)}</span>
        </div>
        <p className="text-xs text-gray-500 mb-3">
          Watched on {formatDate(movie.dateWatched)}
        </p>
        <div className="flex items-center justify-between">
          <button
            onClick={() => handleToggleFavorite(movie.id)}
            className={`p-2 rounded-full transition-colors ${
              movie.favorite ? 'text-red-500 hover:bg-red-50' : 'text-gray-400 hover:bg-gray-100'
            }`}
          >
            <Star className="w-4 h-4" />
          </button>
          <div className="flex space-x-1">
            <button
              onClick={() => {
                setSelectedMovie(movie);
                setShowMovieModal(true);
              }}
              className="p-2 rounded-full text-blue-500 hover:bg-blue-50 transition-colors"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-full text-gray-400 hover:bg-gray-100 transition-colors">
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDeleteMovie(movie.id)}
              className="p-2 rounded-full text-red-500 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const MovieListItem = ({ movie }) => (
    <div className="movie-list-item">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-24 bg-gradient-to-br from-blue-400 to-purple-600 rounded flex items-center justify-center text-white font-bold text-xs">
          {movie.title.substring(0, 3)}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-lg mb-1">{movie.title}</h3>
              <p className="text-gray-600 text-sm mb-1">
                {movie.year} • Dir. {movie.director} • {formatRuntime(movie.runtime)}
              </p>
              <div className="flex items-center space-x-4 mb-2">
                <StarRating rating={movie.personalRating} />
                <span className="text-sm text-gray-500">
                  Watched on {formatDate(movie.dateWatched)}
                </span>
              </div>
              {movie.review && (
                <p className="text-gray-700 text-sm italic">{movie.review}</p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {movie.favorite && (
                <Star className="w-4 h-4 text-red-500 fill-current" />
              )}
              {movie.rewatched && (
                <Eye className="w-4 h-4 text-green-500" />
              )}
              <button
                onClick={() => handleToggleFavorite(movie.id)}
                className="p-1 rounded-full text-gray-400 hover:bg-gray-100 transition-colors"
              >
                <Star className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setSelectedMovie(movie);
                  setShowMovieModal(true);
                }}
                className="p-1 rounded-full text-blue-500 hover:bg-blue-50 transition-colors"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDeleteMovie(movie.id)}
                className="p-1 rounded-full text-red-500 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="watched-container max-w-7xl mx-auto px-4 py-6">
        {/* Statistics */}
        <div className="stats-grid grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="stats-card bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-2">
              <Film className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-gray-600">Total Movies</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.totalMovies}</p>
          </div>
          <div className="stats-card bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-600">Total Hours</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.totalHours}</p>
          </div>
          <div className="stats-card bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-sm text-gray-600">Avg Rating</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.averageRating}</p>
          </div>
          <div className="stats-card bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-red-500" />
              <span className="text-sm text-gray-600">Favorites</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.favoriteCount}</p>
          </div>
          <div className="stats-card bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-purple-500" />
              <span className="text-sm text-gray-600">Rewatched</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.rewatchedCount}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="controls-panel bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Filter className="w-5 h-5" />
                <span>Filters</span>
              </button>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="dateWatched">Date Watched</option>
                <option value="title">Title</option>
                <option value="year">Year</option>
                <option value="rating">Rating</option>
                <option value="runtime">Runtime</option>
              </select>

              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                {sortOrder === 'asc' ? <SortAsc className="w-5 h-5" /> : <SortDesc className="w-5 h-5" />}
              </button>

              {/* View Mode */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'hover:bg-gray-50'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'hover:bg-gray-50'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
                  <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {genres.map(genre => (
                      <option key={genre} value={genre}>
                        {genre === 'all' ? 'All Genres' : genre}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {years.map(year => (
                      <option key={year} value={year}>
                        {year === 'all' ? 'All Years' : year}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSelectedGenre('all');
                      setSelectedYear('all');
                      setSearchTerm('');
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Movies Grid/List */}
        <div className="mb-6">
          {filteredAndSortedMovies.length === 0 ? (
            <div className="no-results bg-white rounded-lg shadow-sm p-8 text-center">
              <p className="text-gray-500 text-lg">No movies found matching your criteria.</p>
            </div>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? 'movie-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }>
              {filteredAndSortedMovies.map(movie => (
                viewMode === 'grid' 
                  ? <MovieCard key={movie.id} movie={movie} />
                  : <MovieListItem key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>

        {/* Movie Detail Modal */}
        {showMovieModal && selectedMovie && (
          <div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="modal-content bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{selectedMovie.title}</h3>
                <button
                  onClick={() => setShowMovieModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>
              <div className="space-y-4">
                <div className="movie-card-image aspect-[2/3] bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  {selectedMovie.title}
                </div>
                <div className="space-y-2">
                  <p><span className="font-semibold">Director:</span> {selectedMovie.director}</p>
                  <p><span className="font-semibold">Year:</span> {selectedMovie.year}</p>
                  <p><span className="font-semibold">Genre:</span> {selectedMovie.genre}</p>
                  <p><span className="font-semibold">Runtime:</span> {formatRuntime(selectedMovie.runtime)}</p>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">My Rating:</span>
                    <StarRating rating={selectedMovie.personalRating} />
                  </div>
                  <p><span className="font-semibold">Watched:</span> {formatDate(selectedMovie.dateWatched)}</p>
                  {selectedMovie.review && (
                    <div>
                      <p className="font-semibold">Review:</p>
                      <p className="text-gray-700 italic">{selectedMovie.review}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchedMovies;