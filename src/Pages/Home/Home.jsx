import React from "react";
import { useNavigate } from "react-router-dom";
import { sampleRecipes } from "../../data/data";
import HomeRecipeCard from "../../Components/HomeRecipeCard/HomeRecipeCard";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-content">
      <div className="container">
        <h1 className="home-title">Welcome to Our Recipe App</h1>
        <p className="home-subtitle">
          Discover delicious recipes from around the world. Sign up to explore, save, and create your own!
        </p>
        <div className="hero-actions">
          <button onClick={() => navigate("/signup")} className="hero-btn">
            Sign Up Now
          </button>
          <button onClick={() => navigate("/login")} className="hero-btn secondary">
            Log In
          </button>
        </div>
        <h2 className="section-title">Recipe Preview</h2>
        <div className="home-recipe-grid">
          {sampleRecipes.map((recipe) => (
            <HomeRecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;