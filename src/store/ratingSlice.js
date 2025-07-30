import { createSlice } from '@reduxjs/toolkit';

const ratingSlice = createSlice({
  name: 'ratings',
  initialState: {
    ratings: []
  },
  reducers: {
    addRating: (state, action) => {
      const { movieId, rating } = action.payload;
      const existingRating = state.ratings.find(r => r.movieId === movieId);
      if (existingRating) {
        existingRating.rating = rating;
      } else {
        state.ratings.push({ movieId, rating });
      }
    },
    removeRating: (state, action) => {
      state.ratings = state.ratings.filter(r => r.movieId !== action.payload);
    }
  }
});

export const { addRating, removeRating } = ratingSlice.actions;
export default ratingSlice.reducer;