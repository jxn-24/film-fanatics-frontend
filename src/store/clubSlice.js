// src/store/clubSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchClubs = createAsyncThunk('clubs/fetchClubs', async () => {
  const response = await axios.get('http://localhost:3001/clubs');
  return response.data;
});

// ✅ Add this if you are joining a club and want to store membership
export const joinClub = createAsyncThunk('clubs/joinClub', async ({ userId, clubId }) => {
  const response = await axios.post('http://localhost:3001/memberships', {
    userId,
    clubId
  });
  return response.data;
});

const clubSlice = createSlice({
  name: 'clubs',
  initialState: {
    clubs: [],
    memberships: [],
    joinedClubIds: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClubs.fulfilled, (state, action) => {
        state.clubs = action.payload;
        state.status = 'succeeded';
      })
      .addCase(joinClub.fulfilled, (state, action) => {
        state.memberships.push(action.payload);
        state.joinedClubIds.push(action.payload.clubId);
      });
  },
});

export default clubSlice.reducer;
