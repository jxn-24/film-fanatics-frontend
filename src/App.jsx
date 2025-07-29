import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ClubList from './components/Clubs/ClubList';
import ClubDetails from './components/Clubs/ClubDetails';
import CreateClub from './components/Clubs/CreateClub';
import Profile from './components/Profile/Profile';
import Explore from './components/Explore/Explore';
import Feed from './components/Feed/Feed';
import Landing from './components/Layout/LandingPage';
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/Auth/ProtectedRoute';

const App = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/clubs" element={<ProtectedRoute><ClubList /></ProtectedRoute>} />
        <Route path="/clubs/:id" element={<ProtectedRoute><ClubDetails /></ProtectedRoute>} />
        <Route path="/create-club" element={<ProtectedRoute><CreateClub /></ProtectedRoute>} />
        <Route path="/explore" element={<ProtectedRoute><Explore /></ProtectedRoute>} />
        <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
    </div>
  );
};

export default App;