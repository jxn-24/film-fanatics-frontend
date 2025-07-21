import { createSlice } from '@reduxjs/toolkit';

const clubSlice = createSlice({
  name: 'clubs',
  initialState: {
    clubs: [],
  },
  reducers: {
    setClubs: (state, action) => {
      state.clubs = action.payload;
    },
    updateClub: (state, action) => {
      const updatedClub = action.payload;
      const index = state.clubs.findIndex((club) => club.id === updatedClub.id);
      if (index !== -1) {
        state.clubs[index] = updatedClub;
      }
    },
  },
});

export const { setClubs, updateClub } = clubSlice.actions;
export default clubSlice.reducer;