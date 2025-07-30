import { createSlice } from '@reduxjs/toolkit';

const initialPosts = (() => {
  const saved = localStorage.getItem('posts');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return [
        {
          id: 1,
          title: 'Just finished watching The Silent City. What a masterpiece!',
          content: 'The Silent City is a masterpiece. Director Patel has created a film that resonates in the deepest depths of the human psyche. With a cast that shines with life and emotional depth, viewers are treated to a cinematic experience that will stay with them long after the credits roll.',
          movieId: 101,
          movieTitle: 'The Silent City',
          image: '/api/placeholder/300/200',
          likes: 24,
          comments: 8,
          timestamp: '2025-07-18T00:27:00Z',
          liked: false,
          user: 'Alice'
        },
        {
          id: 2,
          title: 'Stranger Things Season 5 is mind-blowing!',
          content: 'Just binged the latest season of Stranger Things. The plot twists and character development are next level. Highly recommend for sci-fi fans!',
          movieId: 102,
          movieTitle: 'Stranger Things',
          image: '/api/placeholder/300/200',
          likes: 15,
          comments: 5,
          timestamp: '2025-07-19T14:45:00Z',
          liked: false,
          user: 'Bob'
        },
        {
          id: 3,
          title: 'Loved the new Dune adaptation!',
          content: 'Dune Part Two is visually stunning. The cinematography and score are epic. Anyone else obsessed with this franchise?',
          movieId: 103,
          movieTitle: 'Dune Part Two',
          image: '/api/placeholder/300/200',
          likes: 30,
          comments: 12,
          timestamp: '2025-07-20T09:15:00Z',
          liked: false,
          user: 'Charlie'
        }
      ];
    }
  } else {
    return [
      {
        id: 1,
        title: 'Just finished watching The Silent City. What a masterpiece!',
        content: 'The Silent City is a masterpiece. Director Patel has created a film that resonates in the deepest depths of the human psyche. With a cast that shines with life and emotional depth, viewers are treated to a cinematic experience that will stay with them long after the credits roll.',
        movieId: 101,
        movieTitle: 'The Silent City',
        image: '/api/placeholder/300/200',
        likes: 24,
        comments: 8,
        timestamp: '2025-07-18T00:27:00Z',
        liked: false,
        user: 'Alice'
      },
      {
        id: 2,
        title: 'Stranger Things Season 5 is mind-blowing!',
        content: 'Just binged the latest season of Stranger Things. The plot twists and character development are next level. Highly recommend for sci-fi fans!',
        movieId: 102,
        movieTitle: 'Stranger Things',
        image: '/api/placeholder/300/200',
        likes: 15,
        comments: 5,
        timestamp: '2025-07-19T14:45:00Z',
        liked: false,
        user: 'Bob'
      },
      {
        id: 3,
        title: 'Loved the new Dune adaptation!',
        content: 'Dune Part Two is visually stunning. The cinematography and score are epic. Anyone else obsessed with this franchise?',
        movieId: 103,
        movieTitle: 'Dune Part Two',
        image: '/api/placeholder/300/200',
        likes: 30,
        comments: 12,
        timestamp: '2025-07-20T09:15:00Z',
        liked: false,
        user: 'Charlie'
      }
    ];
  }
})();

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: initialPosts
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
