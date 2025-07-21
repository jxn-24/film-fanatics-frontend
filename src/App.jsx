import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/Layout/LandingPage';
import ClubList from './components/Clubs/ClubList';
import ClubDetail from './components/Clubs/ClubDetail';
import CreateClub from './components/Clubs/CreateClub';
import EditClub from './components/Clubs/EditClub';
import PostList from './components/Posts/PostList';
import PostDetail from './components/Posts/PostDetail';
import CreatePost from './components/Posts/CreatePost';
import Profile from './components/Profile/Profile';
import EditProfile from './components/Profile/EditProfile';
import WatchedMovies from './components/Tracker/WatchedMovies';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Navbar from './components/Layout/Navbar';

function App() {
  return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/clubs" element={<ClubList />} />
        <Route path="/clubs/:id" element={<ClubDetail />} />
        <Route path="/clubs/create" element={<CreateClub />} />
        <Route path="/clubs/:id/edit" element={<EditClub />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/posts/create" element={<CreatePost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/watched-movies" element={<WatchedMovies />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;