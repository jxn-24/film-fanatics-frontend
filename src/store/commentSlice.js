import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialComments = (() => {
  const saved = localStorage.getItem('comments');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  } else {
    return [];
  }
})();

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
    comments: initialComments,
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
    },
    addCommentLocal: (state, action) => {
      state.comments.push(action.payload);
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

export const { likeComment, addCommentLocal } = commentSlice.actions;
export default commentSlice.reducer;

// Persist comments to localStorage on state change
export const persistCommentsMiddleware = store => next => action => {
  const result = next(action);
  if (['comments/addComment/fulfilled', 'comments/likeComment', 'comments/addCommentLocal'].includes(action.type)) {
    const comments = store.getState().comments.comments;
    localStorage.setItem('comments', JSON.stringify(comments));
  }
  return result;
};
