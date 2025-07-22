import { createSlice } from '@reduxjs/toolkit';

const trackerSlice = createSlice({
  name: 'watchedMovies',
  initialState: {
    watchedMovies: [],
  },
  reducers: {
    setWatchedMovies: (state, action) => {
      state.watchedMovies = action.payload;
    },
    addWatchedMovie: (state, action) => {
      state.watchedMovies.push(action.payload);
    },
  },
});

export const { setWatchedMovies, addWatchedMovie } = trackerSlice.actions;
export default trackerSlice.reducer;