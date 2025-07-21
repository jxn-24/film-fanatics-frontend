import React from 'react';
import { useSelector } from 'react-redux';
import { Heart, MessageCircle, Share2, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';


const PostList = () => {
  const posts = useSelector(state => state.posts.posts);
  const dispatch = useDispatch();

  // Debug: Log posts to check Redux state
  console.log('Posts in PostList:', posts);

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
    <div className="page-container">
      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-primary">Explore</h2>
          <Link
            to="/create-post"
            className="btn btn-primary flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Create Post</span>
          </Link>
        </div>
        {posts.length === 0 ? (
          <div className="card text-center">
            <p className="text-secondary text-lg">No posts yet. Create one now!</p>
            <Link
              to="/create-post"
              className="btn btn-primary mt-4 inline-block"
            >
              Create Post
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map(post => (
              <div key={post.id} className="card">
                <div className="flex items-center mb-3">
                  <div className="follower mr-3">
                    <img
                      src="/api/placeholder/40/40"
                      alt={`${post.user}'s avatar`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-primary font-bold">{post.user || 'Unknown User'}</p>
                </div>
                <Link to={`/posts/${post.id}`} className="block">
                  <h3 className="font-bold text-lg mb-2 text-primary">{post.title}</h3>
                </Link>
                {post.movieTitle && (
                  <p className="text-secondary mb-2">About: <span className="font-medium">{post.movieTitle}</span></p>
                )}
                <p className="text-secondary mb-4">{post.content}</p>
                {post.image && (
                  <div className="post-image mb-4">
                    <img
                      src={post.image}
                      alt="Post image"
                      className="w-full h-48 object-cover rounded"
                    />
                  </div>
                )}
                <div className="flex items-center space-x-6 text-secondary">
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