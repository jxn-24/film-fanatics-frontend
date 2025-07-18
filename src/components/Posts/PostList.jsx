import React from 'react';
import { useSelector } from 'react-redux';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { likePost } from '../../store/postSlice';
import { useDispatch } from 'react-redux';

const PostList = () => {
  const posts = useSelector(state => state.posts.posts);
  const dispatch = useDispatch();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Posts</h2>
        <Link to="/create-post" className="btn btn-primary mb-6 inline-block">Create Post</Link>
        {posts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-500 text-lg">No posts yet. Create one now!</p>
            <Link to="/create-post" className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Create Post
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map(post => (
              <div key={post.id} className="bg-white rounded-lg shadow-sm p-6">
                <Link to={`/posts/${post.id}`} className="block">
                  <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                </Link>
                {post.movieTitle && (
                  <p className="text-gray-600 mb-2">About: <span className="font-medium">{post.movieTitle}</span></p>
                )}
                <p className="text-gray-700 mb-4">{post.content}</p>
                {post.image && (
                  <div className="mb-4">
                    <img
                      src={post.image}
                      alt="Post image"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
                <div className="flex items-center space-x-6 text-gray-500">
                  <button
                    onClick={() => dispatch(likePost(post.id))}
                    className="flex items-center space-x-2 hover:text-red-500 transition-colors"
                  >
                    <Heart className={`w-5 h-5 ${post.liked ? 'text-red-500 fill-current' : ''}`} />
                    <span>{post.likes}</span>
                  </button>
                  <Link to={`/posts/${post.id}`} className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span>{post.comments}</span>
                  </Link>
                  <button className="flex items-center space-x-2 hover:text-green-500 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <span className="text-sm">{formatDate(post.timestamp)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostList;