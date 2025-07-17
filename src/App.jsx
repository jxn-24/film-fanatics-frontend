import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Layout/Navbar'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import ClubLists from './components/Clubs/ClubLists'
import CreateClub from './components/Clubs/CreateClub'
import './index.css'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/clubs" element={<ClubLists />} />
          <Route path="/clubs/create" element={<CreateClub />} />
          <Route path="/" element={<h1>Welcome to Film Fanatics</h1>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App