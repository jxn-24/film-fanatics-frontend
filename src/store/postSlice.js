import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await fetch('http://localhost:5000/api/posts');
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return await response.json();
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addPost: (state, action) => {
      state.posts.push({ ...action.payload, id: state.posts.length + 1, likes: 0, comments: 0, liked: false, user: action.payload.user || 'Unknown User' });
    },
    likePost: (state, action) => {
      const post = state.posts.find(p => p.id === action.payload);
      if (post) {
        post.likes = post.liked ? post.likes - 1 : post.likes + 1;
        post.liked = !post.liked;
      }
    },
    incrementCommentCount: (state, action) => {
      const post = state.posts.find(p => p.id === action.payload);
      if (post) {
        post.comments += 1;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { addPost, likePost, incrementCommentCount } = postSlice.actions;
export default postSlice.reducer;

// Persist posts to localStorage on state change
export const persistPostsMiddleware = store => next => action => {
  const result = next(action);
  if (['posts/addPost', 'posts/likePost', 'posts/incrementCommentCount'].includes(action.type)) {
    const posts = store.getState().posts.posts;
    localStorage.setItem('posts', JSON.stringify(posts));
  }
  return result;
};
