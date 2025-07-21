import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth?.user); // Assuming auth slice for username

  const [formData, setFormData] = useState({
    title: '',
    movieTitle: '',
    content: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: 'posts/addPost',
      payload: {
        ...formData,
        user: user?.name || 'Unknown User',
        movieId: Date.now(), // Temporary unique ID
        timestamp: new Date().toISOString(),
      },
    });
    navigate('/explore');
  };

  return (
    <div className="page-container">
      <div className="container">
        <h2 className="text-2xl font-bold text-primary mb-6">Create a New Post</h2>
        <div className="card">
          <form onSubmit={handleSubmit} className="form-container">
            <div>
              <label className="form-label">Post Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter post title"
                required
              />
            </div>
            <div>
              <label className="form-label">Movie/Series Title</label>
              <input
                type="text"
                name="movieTitle"
                value={formData.movieTitle}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter movie or series title"
                required
              />
            </div>
            <div>
              <label className="form-label">Your Thoughts</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Share your experience about the movie/series"
                rows="5"
                required
              />
            </div>
            <div>
              <label className="form-label">Image URL (Optional)</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter image URL"
              />
            </div>
            <div className="form-actions">
              <button
                type="button"
                className="btn btn-cancel"
                onClick={() => navigate('/explore')}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Create Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;