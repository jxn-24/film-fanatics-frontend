import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import clubReducer from './clubSlice';
import postReducer from './postSlice';
import commentReducer from './commentSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    clubs: clubReducer,
    posts: postReducer,
    comments: commentReducer,
  },
});