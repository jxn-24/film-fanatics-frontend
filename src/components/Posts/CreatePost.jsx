import React, { useState } from 'react';
import { X, Camera, Film, Send } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addPost } from '../store/PostSlice';

const CreatePost = ({ onCancel }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    movieId: '',
    movieTitle: ''
  });
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState({});

  // Sample movie data for selection (in a real app, this would come from an API or store)
  const movies = [
    { id: 1, title: 'The Matrix' },
    { id: 2, title: 'Inception' },
    { id: 3, title: 'The Godfather' },
    { id: 4, title: 'Pulp Fiction' },
    { id: 5, title: 'Spirited Away' },
    { id: 6, title: 'The Dark Knight' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreviewImage(null);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    if (formData.content.length > 1000) {
      newErrors.content = 'Content must be 1000 characters or less';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const postData = {
        id: Date.now(),
        title: formData.title,
        content: formData.content,
        movieId: formData.movieId,
        movieTitle: formData.movieTitle,
        image: previewImage,
        likes: 0,
        comments: 0,
        timestamp: new Date().toISOString()
      };
      dispatch(addPost(postData));
      setFormData({ title: '', content: '', movieId: '', movieTitle: '' });
      setImage(null);
      setPreviewImage(null);
      onCancel();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Create New Post</h2>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Movie Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Film className="w-4 h-4 inline mr-1" />
                Select Movie
              </label>
              <select
                name="movieId"
                value={formData.movieId}
                onChange={(e) => {
                  const selectedMovie = movies.find(m => m.id.toString() === e.target.value);
                  setFormData(prev => ({
                    ...prev,
                    movieId: e.target.value,
                    movieTitle: selectedMovie ? selectedMovie.title : ''
                  }));
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a movie</option>
                {movies.map(movie => (
                  <option key={movie.id} value={movie.id}>{movie.title}</option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter post title"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows="6"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.content ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Share your thoughts about the movie..."
              />
              <div className="flex justify-between items-center mt-2">
                {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
                <p className="text-sm text-gray-500 ml-auto">
                  {formData.content.length}/1000 characters
                </p>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Add Image (Optional)</h3>
              <div className="flex items-center space-x-6">
                {previewImage && (
                  <div className="relative">
                    <img
                      src={previewImage}
                      alt="Post preview"
                      className="w-32 h-20 rounded-lg object-cover"
                    />
                    <button
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <label className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer">
                  <Camera className="w-5 h-5" />
                  <span>Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                JPG, PNG or GIF. Max size 5MB.
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={onCancel}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Send className="w-5 h-5" />
                <span>Post</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;