import { createSlice } from '@reduxjs/toolkit';

const commentSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
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

export const { setComments, addComment } = commentSlice.actions;
export default commentSlice.reducer;