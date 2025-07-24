import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import RecipeForm from "../../Components/RecipeForm/RecipeForm";
import RecipeList from "../../Components/RecipeList/RecipeList";
import "./AddRecipe.css";

const AddRecipe = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="add-recipe-page">
      {user && <Sidebar />}
      <div className="add-recipe-content">
        <div className="container">
          <h1 className="page-title">Add a New Recipe</h1>
          <p className="page-subtitle">Share your culinary creations with the world</p>
          <RecipeForm />
          <h2 className="your-recipes-title">Your Recipes</h2>
          <RecipeList showUserRecipesOnly={true} />
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;