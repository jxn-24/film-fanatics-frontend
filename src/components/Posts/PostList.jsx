import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPosts } from '../../store/postSlice';

function PostList() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const status = useSelector((state) => state.posts.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  return (
    <div className="container">
      <h2>Posts</h2>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error loading posts</p>}
      {posts.map((post) => (
        <div key={post.id} className="card">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <Link to={`/posts/${post.id}`}>View Details</Link>
        </div>
      ))}
      <Link to="/posts/create">Create New Post</Link>
    </div>
  );
}

export default PostList;