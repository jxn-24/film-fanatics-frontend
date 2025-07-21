import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import LandingPage from './components/Layout/LandingPage';
import Profile from './components/Profile/Profile';
import EditProfile from './components/Profile/EditProfile';
import PostList from './components/Posts/PostList';
import CreatePost from './components/Posts/CreatePost';
import PostDetails from './components/Posts/PostDetail';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/explore" element={<PostList />} />
        <Route path="/create-post" element={<CreatePost onCancel={() => window.history.back()} />} />
        <Route path="/posts/:postId" element={<PostDetails />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </>
  );
}

export default App;