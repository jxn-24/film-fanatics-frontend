import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import LandingPage from './components/Layout/LandingPage';
import PostList from './components/Posts/PostList';
import CreatePost from './components/Posts/CreatePost';
import PostDetails from './components/Posts/PostDetail';
import Profile from './components/Profile/Profile';
import EditProfile from './components/Profile/EditProfile';
import WatchedMovies from './components/Tracker/WatchedMovies';

// Remove imports for Auth and Clubs components
// They're empty and causing export errors

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/explore" element={<PostList />} />
        <Route path="/posts/:postId" element={<PostDetails />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/tracker" element={<WatchedMovies />} />
      </Routes>
    </>
  );
}
export default App;
