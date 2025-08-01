import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import clubReducer from './clubSlice';
import commentReducer from './commentSlice';
import postReducer from './postSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    club: clubReducer,
    comment: commentReducer,
    post: postReducer,
  },
});

export default store;
