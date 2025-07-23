import React, { useEffect, useState } from 'react';
import '../../index.css';
import { useSelector, useDispatch } from 'react-redux';
import { setPosts, likePost, addCommentToPost } from '../../store/postSlice';

const Explore = () => {
  const [trending, setTrending] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});

  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    setTrending([
      { title: 'The Last Frontier', genre: 'Action, Adventure' },
      { title: 'Echoes of the Past', genre: 'Drama, History' },
      { title: 'Crimson Tide', genre: 'Thriller, Suspense' },
    ]);

    if (posts.length === 0) {
      dispatch(setPosts([
        {
          id: 1,
          user: 'Sophia Carter',
          text: "Just finished watching 'The Last Frontier'. The cinematography was breathtaking!",
          likes: 12,
          comments: ['Amazing right?', 'I loved it too!'],
        },
        {
          id: 2,
          user: 'Ethan Bennett',
          text: "'Echoes of the Past' was a masterpiece. Great character depth.",
          likes: 8,
          comments: [],
        },
      ]));
    }
  }, [dispatch, posts.length]);

  const handleLike = (id) => {
    dispatch(likePost(id));
  };

  const handleComment = (id) => {
    const comment = commentInputs[id]?.trim();
    if (!comment) return;

    dispatch(addCommentToPost({ postId: id, comment }));
    setCommentInputs({ ...commentInputs, [id]: '' });
  };

  return (
    <div className="explore-page">
      <h2>Trending Movies</h2>
      <div className="trending-section">
        {trending.map((movie, idx) => (
          <div key={idx} className="trending-card">
            <h4>{movie.title}</h4>
            <p>{movie.genre}</p>
          </div>
        ))}
      </div>

      <h2>Community Feed</h2>
      <div className="feed">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h4>{post.user}</h4>
            <p>{post.text}</p>
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
              {post.comments.map((c, i) => (
                <li key={i}>💬 {c}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
