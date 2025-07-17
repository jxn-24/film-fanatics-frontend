import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [
      {
        id: 1,
        title: 'Just finished watching The Silent City. What a masterpiece!',
        content: 'The Silent City is a masterpiece. Director Patel has created a film that resonates in the deepest depths of the human psyche. With a cast that shines with life and emotional depth, viewers are treated to a cinematic experience that will stay with them long after the credits roll.',
        movieId: 1,
        movieTitle: 'The Silent City',
        image: '/api/placeholder/300/200',
        likes: 24,
        comments: 8,
        timestamp: '2025-07-18T00:27:00Z',
        liked: false
      }
    ]
  },
  reducers: {
    addPost: (state, action) => {
      state.posts.push({ ...action.payload, liked: false });
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
  }
});

export const { addPost, likePost, incrementCommentCount } = postSlice.actions;
export default postSlice.reducer;