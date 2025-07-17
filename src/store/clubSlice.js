import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchClubs = createAsyncThunk('clubs/fetch', async () => {
  const res = await axios.get('http://localhost:3001/clubs');
  return res.data;
});

const clubSlice = createSlice({
  name: 'clubs',
  initialState: {
    clubs: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClubs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchClubs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.clubs = action.payload;
      })
      .addCase(fetchClubs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default clubSlice.reducer;