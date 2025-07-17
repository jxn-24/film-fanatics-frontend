import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ClubLists from './components/Clubs/ClubLists';
import CreateClub from './components/Clubs/CreateClub';
import ClubDetails from './components/Clubs/ClubDetails'; 
import EditClub from './components/Clubs/EditClub';       
import './index.css';

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<h1>Welcome to Film Fanatics</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/clubs" element={<ClubLists />} />
          <Route path="/clubs/:id" element={<ClubDetails />} />      
          <Route path="/clubs/:id/edit" element={<EditClub />} />    
          <Route path="/create-club" element={<CreateClub />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
