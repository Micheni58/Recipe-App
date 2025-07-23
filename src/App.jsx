import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';

import './App.css';
import SignUp from './Components/Authentication/SignUp';
import Login from './Components/Authentication/Login';
import HomePage from './pages/Home/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <h1>Recipe App</h1>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
