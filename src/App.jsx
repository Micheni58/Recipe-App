import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { RecipeProvider } from "./context/RecipeContext";
import { ToastProvider } from "./context/ToastContext";
// import Home from "./Pages/Home/Home"; 
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Dashboard from "./Pages/Dashboard/Dashboard";
import BrowseRecipe from "./Pages/BrowseRecipe/BrowseRecipe";
import Favorites from "./Pages/Favorites/Favorites";
import AddRecipe from "./Pages/AddRecipe/AddRecipe";
// import EditRecipe from "./Pages/EditRecipe/EditRecipe"; 
import EditRecipe from "./Components/EditRecipe/EditRecipe";
import RecipeDetail from "./Components/RecipeDetail/RecipeDetail";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import "./App.css";
import Home from "./Pages/Home /Home"
// import RecipeList from "./Components/RecipeList/RecipeList";
// ProtectedRoute component to guard authenticated routes
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <RecipeProvider>
          <ToastProvider>
            <div className="App">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/browse-recipes"
                  element={
                    <ProtectedRoute>
                      <BrowseRecipe />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/favorites"
                  element={
                    <ProtectedRoute>
                      <Favorites />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/add-recipe"
                  element={
                    <ProtectedRoute>
                      <AddRecipe />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/edit-recipe/:id"
                  element={
                    <ProtectedRoute>
                      <EditRecipe />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/recipe/:id"
                  element={
                    <ProtectedRoute>
                      <RecipeDetail />
                    </ProtectedRoute>
                  }
                />
              </Routes>
              <Footer />
            </div>
          </ToastProvider>
        </RecipeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;