import { createSlice } from '@reduxjs/toolkit';

const storedUser = localStorage.getItem('user');
const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const { email, password } = action.payload;
      const users = JSON.parse(localStorage.getItem('allUsers')) || [];
      const foundUser = users.find(
        (u) => u.email === email && u.password === password
      );
      if (foundUser) {
        state.user = foundUser;
        localStorage.setItem('user', JSON.stringify(foundUser));
      } else {
        alert('Invalid credentials');
      }
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
    registerUser: (state, action) => {
      const newUser = {
        ...action.payload,
        id: Date.now(),
        avatar: `https://ui-avatars.com/api/?name=${action.payload.username}`
      };
      const users = JSON.parse(localStorage.getItem('allUsers')) || [];
      users.push(newUser);
      localStorage.setItem('allUsers', JSON.stringify(users));
      localStorage.setItem('user', JSON.stringify(newUser));
      state.user = newUser;
    },
    syncUsersFromDB: (state, action) => {
      localStorage.setItem('allUsers', JSON.stringify(action.payload));
    }
  },
});

export const { loginUser, logoutUser, registerUser, syncUsersFromDB } = authSlice.actions;
export default authSlice.reducer;
