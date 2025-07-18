import { createSlice } from '@reduxjs/toolkit';

const trackerSlice = createSlice({
  name: 'tracker',
  initialState: {
    watchedMovies: [
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
        review: 'Complex and visually stunning. Need to watch again.',
        rewatched: false,
        watchCount: 1,
        favorite: false
      }
    ]
  },
  reducers: {
    addWatchedMovie: (state, action) => {
      state.watchedMovies.push(action.payload);
    },
    updateWatchedMovie: (state, action) => {
      const index = state.watchedMovies.findIndex(m => m.id === action.payload.id);
      if (index !== -1) {
        state.watchedMovies[index] = action.payload;
      }
    },
    deleteWatchedMovie: (state, action) => {
      state.watchedMovies = state.watchedMovies.filter(m => m.id !== action.payload);
    },
    toggleFavorite: (state, action) => {
      const movie = state.watchedMovies.find(m => m.id === action.payload);
      if (movie) {
        movie.favorite = !movie.favorite;
      }
    }
  }
});

export const { addWatchedMovie, updateWatchedMovie, deleteWatchedMovie, toggleFavorite } = trackerSlice.actions;
export default trackerSlice.reducer;