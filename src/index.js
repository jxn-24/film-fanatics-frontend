import { configureStore } from '@reduxjs/toolkit';
import commentReducer from './store/commentSlice';
import postReducer from './store/postSlice';
import ratingReducer from './store/ratingSlice';
import trackerReducer from './store/trackerSlice';
import './index.css';

export const store = configureStore({
  reducer: {
    comments: commentReducer,
    posts: postReducer,
    ratings: ratingReducer,
    tracker: trackerReducer,
  },
});

export default store; // Ensure this line exists for default export