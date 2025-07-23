import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUser: (state, action) => {
      const newUser = action.payload;
      localStorage.setItem('user', JSON.stringify(newUser));
      state.user = newUser;
    },
    loginUser: (state, action) => {
      const user = action.payload;
      localStorage.setItem('user', JSON.stringify(user));
      state.user = user;
    },
    logoutUser: (state) => {
      localStorage.removeItem('user');
      state.user = null;
    },
  },
});

export const { registerUser, loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
