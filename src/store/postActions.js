import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPost = createAsyncThunk(
  'posts/fetchPost',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${postId}`);
      if (!response.ok) {
        return rejectWithValue('Failed to fetch post');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
