import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
    async (postId) => {
      const response = await fetch('http://localhost:3000/comments?postId=' + postId);
      return await response.json();
    }
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async ({ postId, content, parentId = null }) => {
    const response = await fetch('http://localhost:3000/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId, content, user: 'Current User', timestamp: new Date().toISOString().split('T')[0], parentId }),
    });
    return await response.json();
  }
);

const commentSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    likeComment: (state, action) => {
      const comment = state.comments.find(c => c.id === action.payload);
      if (comment) {
        comment.liked = !comment.liked;
        comment.likes = comment.liked ? (comment.likes || 0) + 1 : (comment.likes || 1) - 1;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      });
  },
});

export const { likeComment } = commentSlice.actions;
export default commentSlice.reducer;
