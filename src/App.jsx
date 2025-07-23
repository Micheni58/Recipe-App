// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './Components/Footer/Footer'
import './App.css'
import HomePage from './pages/Home/Home'
// import Login from './pages/Authentication/Login'    
// import Signup from './pages/Authentication/Signup'   

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Recipe App</h1>

        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/signup" element={<Signup />} /> */}
        </Routes>

        <Footer />
      </div>
    </Router>
  )
}

export default App;
