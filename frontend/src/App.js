import logo from './logo.svg';
import './App.css';
import LoginPage from './pages/LoginPage';
import { useState } from 'react';
import SignupPage from './pages/SignupPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AdminDashBoard from './pages/AdminDashboard';
import UserDashBoard from './pages/UserDashboard';

function App() {

  const [role, setRole] = useState("");
  const [jwtToken, setJwtToken] = useState("");

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/signup" element={<SignupPage />}/>
      <Route path="/admin/dashboard" element={<AdminDashBoard />} />
      <Route path="/dashboard" element={<UserDashBoard />} />
    </Routes>
      </BrowserRouter>
  )
}

export default App;
