import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditProfile() {
  const { user } = useSelector((state) => state.auth);
  const [bio, setBio] = useState(user?.bio || '');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3001/users/${user.id}`, { bio });
      dispatch(login({ ...user, bio }));
      navigate('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!user) return <div>Please log in to edit your profile.</div>;

  return (
    <div className="card">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Update your bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditProfile;