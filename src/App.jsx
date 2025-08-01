import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import LandingPage from './components/Layout/LandingPage';
import Profile from './components/Profile/Profile';
import EditProfile from './components/Profile/EditProfile';
import PostList from './components/Posts/PostList';
import CreatePost from './components/Posts/CreatePost';
import PostDetails from './components/Posts/PostDetail';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import ClubList from './components/Clubs/ClubList';
import CreateClub from './components/Clubs/CreateClub';
import ProtectedRoute from './components/Auth/ProtectedRoute';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/clubs" element={<ClubList />} />
        <Route path="/clubs/create" element={<ProtectedRoute><CreateClub /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
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
