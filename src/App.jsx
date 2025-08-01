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
import ClubDetail from './components/Clubs/ClubDetail';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/clubs" element={<ProtectedRoute><ClubList /></ProtectedRoute>} />
        <Route path="/clubs/create" element={<ProtectedRoute><CreateClub /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
        <Route path="/posts" element={<ProtectedRoute><PostList /></ProtectedRoute>} />
        <Route path="/explore" element={<ProtectedRoute><PostList /></ProtectedRoute>} />
        <Route path="/create-post" element={<ProtectedRoute><CreatePost onCancel={() => window.history.back()} /></ProtectedRoute>} />
        <Route path="/posts/:postId" element={<ProtectedRoute><PostDetails /></ProtectedRoute>} />
        <Route path="/clubs/:id" element={<ProtectedRoute><ClubDetail /></ProtectedRoute>} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </>
  );
}

export default App;
