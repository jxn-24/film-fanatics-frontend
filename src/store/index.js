import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import clubReducer from './clubSlice';
import postReducer from './postSlice';
import commentReducer from './commentSlice';
import ratingReducer from './ratingSlice';
import trackReducer from './trackSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    clubs: clubReducer,
    posts: postReducer,
    comments: commentReducer,
    ratings: ratingReducer,
    tracker: trackReducer,
  },
});

export default store;
