import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Heart, MessageCircle, Share2, Send, X, Reply } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const PostDetails = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const post = useSelector(state => state.posts.posts.find(p => p.id.toString() === postId));
  const comments = useSelector(state => state.comments.comments.filter(c => c.postId.toString() === postId));
  const [commentText, setCommentText] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const user = useSelector(state => state.auth?.user) || { name: 'Current User' }; // Fallback

  // Fetch comments on mount
  useEffect(() => {
    // Removed fetchComments dispatch to prevent resetting comments state and losing persisted comments
  }, [dispatch, postId]);

  if (!post) {
    return (
      <div className="page-container">
        <div className="container">
          <div className="card text-center">
            <p className="text-secondary text-lg">Post not found</p>
            <Link to="/explore" className="btn btn-primary mt-4 inline-block">Back to Explore</Link>
          </div>
        </div>
      </div>
    );
  }

  const handleLike = () => {
    dispatch({ type: 'posts/likePost', payload: post.id });
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      try {
        dispatch({
          type: 'comments/addCommentLocal',
          payload: {
            id: Date.now(),
            postId: post.id,
            content: commentText,
            user: user.name,
            timestamp: new Date().toISOString(),
            likes: 0,
            liked: false,
            parentId: null,
          },
        });
        dispatch({ type: 'posts/incrementCommentCount', payload: post.id });
        setCommentText('');
      } catch (error) {
        console.error('Failed to add comment:', error);
      }
    }
  };

  const handleReplySubmit = async (e, parentId) => {
    e.preventDefault();
    if (replyText.trim()) {
      try {
        dispatch({
          type: 'comments/addCommentLocal',
          payload: {
            id: Date.now(),
            postId: post.id,
            content: replyText,
            user: user.name,
            timestamp: new Date().toISOString(),
            likes: 0,
            liked: false,
            parentId,
          },
        });
        dispatch({ type: 'posts/incrementCommentCount', payload: post.id });
        setReplyText('');
        setReplyingTo(null);
      } catch (error) {
        console.error('Failed to add reply:', error);
      }
    }
  };

  const handleLikeComment = (commentId) => {
    dispatch({ type: 'comments/likeComment', payload: commentId });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Build comment tree for nested replies
  const buildCommentTree = (comments) => {
    const commentMap = {};
    const tree = [];

    // Initialize comment map
    comments.forEach(comment => {
      commentMap[comment.id] = { ...comment, replies: [] };
    });

    // Build tree
    comments.forEach(comment => {
      if (comment.parentId) {
        commentMap[comment.parentId]?.replies.push(commentMap[comment.id]);
      } else {
        tree.push(commentMap[comment.id]);
      }
    });

    return tree;
  };

  const commentTree = buildCommentTree(comments);

  const renderComments = (comments, level = 0) => {
    return comments.map(comment => (
      <div key={comment.id} className={`ml-${level * 4} mb-4`}>
        <div className="flex items-start space-x-4">
          <div className="follower w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
            {comment.user[0]}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-primary font-medium">{comment.user}</p>
              <p className="text-sm text-secondary">{formatDate(comment.timestamp)}</p>
            </div>
            <p className="text-secondary">{comment.content}</p>
            <div className="flex items-center space-x-4 mt-2">
              <button
                onClick={() => handleLikeComment(comment.id)}
                className="flex items-center space-x-2 hover:text-red-500 transition-colors"
              >
                <Heart className={`w-4 h-4 ${comment.liked ? 'text-red-500 fill-current' : ''}`} />
                <span>{comment.likes || 0}</span>
              </button>
              <button
                onClick={() => setReplyingTo(comment.id)}
                className="flex items-center space-x-2 hover:text-blue-500 transition-colors"
              >
                <Reply className="w-4 h-4" />
                <span>Reply</span>
              </button>
            </div>
            {replyingTo === comment.id && (
              <form onSubmit={(e) => handleReplySubmit(e, comment.id)} className="form-container mt-4">
                <div className="flex items-start space-x-4">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="form-textarea flex-1"
                    rows="3"
                    placeholder="Write a reply..."
                  />
                  <div className="form-actions">
                    <button
                      type="button"
                      className="btn btn-cancel"
                      onClick={() => setReplyingTo(null)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </form>
            )}
            {comment.replies && comment.replies.length > 0 && (
              <div className="mt-4">{renderComments(comment.replies, level + 1)}</div>
            )}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="page-container">
      <div className="container">
        <div className="card">
          <Link to="/explore" className="text-primary hover:underline mb-4 inline-block">
            ← Back to Explore
          </Link>
          <h2 className="text-2xl font-bold text-primary mb-4">{post.title}</h2>
          {post.movieTitle && (
            <p className="text-secondary mb-2">About: <span className="font-medium">{post.movieTitle}</span></p>
          )}
          <p className="text-secondary mb-4">{post.content}</p>
          {post.image && (
            <div className="post-image mb-4">
              <img
                src={post.image}
                alt="Post image"
                className="w-full h-64 object-cover rounded"
              />
            </div>
          )}
          <div className="flex items-center space-x-6 text-secondary mb-6">
            <button
              onClick={handleLike}
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

          {/* Comments Section */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-primary mb-4">Comments</h3>
            {commentTree.length === 0 ? (
              <p className="text-secondary">No comments yet. Be the first to comment!</p>
            ) : (
              <div className="space-y-4">{renderComments(commentTree)}</div>
            )}

            {/* Comment Form */}
            <div className="form-container mt-6">
              <form onSubmit={handleCommentSubmit}>
                <div className="flex items-start space-x-4">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="form-textarea flex-1"
                    rows="3"
                    placeholder="Add a comment..."
                  />
                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
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