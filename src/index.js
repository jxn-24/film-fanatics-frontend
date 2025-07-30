import { configureStore } from '@reduxjs/toolkit';
import commentReducer, { persistCommentsMiddleware } from './store/commentSlice';
import postReducer, { persistPostsMiddleware } from './store/postSlice';
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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistPostsMiddleware, persistCommentsMiddleware),
});

export default store; // Ensure this line exists for default export
