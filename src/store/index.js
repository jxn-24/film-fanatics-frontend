import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import clubReducer from './clubSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    clubs: clubReducer,
  },
});

export default store;
