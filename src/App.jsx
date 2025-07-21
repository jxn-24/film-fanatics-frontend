import { Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ClubList from './components/Clubs/ClubList';
import ClubDetail from './components/Clubs/ClubDetail';
import CreateClub from './components/Clubs/CreateClub';
import EditClub from './components/Clubs/EditClub';
import Navbar from './components/Layout/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/clubs" element={<ClubList />} />
          <Route path="/clubs/:id" element={<ClubDetail />} />
          <Route path="/clubs/create" element={<CreateClub />} />
          <Route path="/clubs/:id/edit" element={<EditClub />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;