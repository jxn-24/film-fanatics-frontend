import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Heart, MessageCircle, Share2, Send, X } from 'lucide-react';
import { addComment } from '../store/CommentSlice';
import { likePost } from '../store/PostSlice';
import { Link, useParams } from 'react-router-dom';

const PostDetails = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const post = useSelector(state => state.posts.posts.find(p => p.id.toString() === postId));
  const comments = useSelector(state => state.comments.comments.filter(c => c.postId.toString() === postId));
  const [commentText, setCommentText] = useState('');

  if (!post) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-500 text-lg">Post not found</p>
    </div>;
  }

  const handleLike = () => {
    dispatch(likePost(post.id));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      dispatch(addComment({
        id: Date.now(),
        postId: post.id,
        content: commentText,
        user: 'Current User', // In a real app, this would be the authenticated user
        timestamp: new Date().toISOString()
      }));
      setCommentText('');
    }
  };

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
        <div className="bg-white rounded-lg shadow-sm p-6">
          <Link to="/posts" className="text-blue-600 hover:underline mb-4 inline-block">
            &larr; Back to Posts
          </Link>
          
          <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
          {post.movieTitle && (
            <p className="text-gray-600 mb-2">About: <span className="font-medium">{post.movieTitle}</span></p>
          )}
          <p className="text-gray-700 mb-4">{post.content}</p>
          {post.image && (
            <div className="mb-4">
              <img
                src={post.image}
                alt="Post image"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}
          <div className="flex items-center space-x-6 text-gray-500 mb-4">
            <button
              onClick={handleLike}
              className="flex items-center space-x-2 hover:text-red-500 transition-colors"
            >
              <Heart className={`w-5 h-5 ${post.liked ? 'text-red-500 fill-current' : ''}`} />
              <span>{post.likes}</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span>{post.comments}</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-green-500 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <span className="text-sm">{formatDate(post.timestamp)}</span>
          </div>

          {/* Comments Section */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold mb-4">Comments</h3>
            {comments.length === 0 ? (
              <p className="text-gray-500">No comments yet. Be the first to comment!</p>
            ) : (
              <div className="space-y-4">
                {comments.map(comment => (
                  <div key={comment.id} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {comment.user[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{comment.user}</p>
                        <p className="text-sm text-gray-500">{formatDate(comment.timestamp)}</p>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Comment Form */}
            <div className="mt-6">
              <form onSubmit={handleCommentSubmit}>
                <div className="flex items-start space-x-4">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="Add a comment..."
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;