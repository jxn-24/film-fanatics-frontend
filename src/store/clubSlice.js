import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  clubs: [],
  joinedClubIds: [],
};

const clubSlice = createSlice({
  name: 'clubs',
  initialState,
  reducers: {
    setClubs: (state, action) => {
      state.clubs = action.payload;
    },
    joinClub: (state, action) => {
      if (!state.joinedClubIds.includes(action.payload)) {
        state.joinedClubIds.push(action.payload);
      }
    },
    leaveClub: (state, action) => {
      state.joinedClubIds = state.joinedClubIds.filter(id => id !== action.payload);
    },
  },
});

export const { setClubs, joinClub, leaveClub } = clubSlice.actions;
export default clubSlice.reducer;