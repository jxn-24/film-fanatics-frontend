import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/${id}`)
      .then((response) => setPost(response.data))
      .catch((error) => console.error('Error fetching post:', error));

    axios.get(`http://localhost:3001/comments?post_id=${id}`)
      .then((response) => setComments(response.data))
      .catch((error) => console.error('Error fetching comments:', error));
  }, [id]);

  const handleRating = async () => {
    try {
      await axios.post('http://localhost:3001/ratings', { post_id: id, rating });
      alert('Rating submitted!');
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/comments', { post_id: id, content: comment });
      setComment('');
      // Refresh comments
      axios.get(`http://localhost:3001/comments?post_id=${id}`)
        .then((response) => setComments(response.data));
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>Post Details</h2>
      <div className="card">
        <p>{post.content}</p>
        <small>Posted on: {new Date(post.created_at).toLocaleDateString()}</small>
      </div>
      <div>
        <h3>Rate this Post</h3>
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          <option value="0">Select Rating</option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>{num} Stars</option>
          ))}
        </select>
        <button onClick={handleRating}><FaStar /> Submit Rating</button>
      </div>
      <div>
        <h3>Comments</h3>
        {comments.map((comment) => (
          <div key={comment.id} className="card">
            <p>{comment.content}</p>
            <small>Posted on: {new Date(comment.created_at).toLocaleDateString()}</small>
          </div>
        ))}
        <form onSubmit={handleComment}>
          <textarea
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <button type="submit">Comment</button>
        </form>
      </div>
    </div>
  );
}

export default PostDetail;