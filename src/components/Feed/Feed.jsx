import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPosts, likePost, addCommentToPost } from '../../store/postSlice';
import '../../index.css';

const Feed = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const [commentInputs, setCommentInputs] = useState({});

  useEffect(() => {
    const mockPosts = [
      {
        id: 1,
        user: 'Kelly Murimi',
        avatar: 'https://i.pravatar.cc/150?img=12',
        content: "Just watched *Dune Part Two* — wow! The visuals are unmatched!",
        likes: 10,
        comments: ['🔥🔥🔥', 'Need to watch this!', 'Top tier sci-fi.']
      },
      {
        id: 2,
        user: 'Sophia Carter',
        avatar: 'https://i.pravatar.cc/150?img=18',
        content: "Watched *The Godfather* again. Every scene is art.",
        likes: 7,
        comments: ['Classic!', 'Al Pacino was legendary.']
      }
    ];
    dispatch(setPosts(mockPosts));
  }, [dispatch]);

  const handleLike = (id) => {
    dispatch(likePost(id));
  };

  const handleComment = (postId) => {
    const comment = commentInputs[postId]?.trim();
    if (!comment) return;

    dispatch(addCommentToPost({ postId, comment }));
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
  };

  return (
    <div className="feed">
      <h2>🎬 Latest Posts from Movie Lovers</h2>

      {posts.map((post) => (
        <div className="post-card" key={post.id}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img
              src={post.avatar}
              alt={`${post.user}'s avatar`}
              style={{ width: '50px', height: '50px', borderRadius: '50%' }}
            />
            <strong>{post.user}</strong>
          </div>
          <p style={{ marginTop: '0.5rem' }}>{post.content}</p>

          <div className="post-actions">
            <span onClick={() => handleLike(post.id)}>❤️ {post.likes}</span>
          </div>

          <div className="comment-box">
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentInputs[post.id] || ''}
              onChange={(e) =>
                setCommentInputs({ ...commentInputs, [post.id]: e.target.value })
              }
            />
            <button onClick={() => handleComment(post.id)}>Comment</button>
          </div>

          <ul className="comment-list">
            {post.comments.map((comment, index) => (
              <li key={index}>💬 {comment}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Feed;
