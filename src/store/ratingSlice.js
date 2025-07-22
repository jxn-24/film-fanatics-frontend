import { createSlice } from '@reduxjs/toolkit';

const ratingSlice = createSlice({
  name: 'ratings',
  initialState: {
    ratings: [],
  },
  reducers: {
    setRatings: (state, action) => {
      state.ratings = action.payload;
    },
    addRating: (state, action) => {
      const newRating = action.payload;
      const index = state.ratings.findIndex(
        (rating) => rating.post_id === newRating.post_id && rating.user_id === newRating.user_id
      );
      if (index !== -1) {
        state.ratings[index] = newRating;
      } else {
        state.ratings.push(newRating);
      }
    },
  },
});

export const { setRatings, addRating } = ratingSlice.actions;
export default ratingSlice.reducer;