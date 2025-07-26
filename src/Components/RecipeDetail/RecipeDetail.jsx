import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecipes } from "../../context/RecipeContext";
import { useToasts } from "../../context/ToastContext";
import Sidebar from "../Sidebar/Sidebar";
import "./RecipeDetail.css";

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getRecipeDetails } = useRecipes();
  const { addToast } = useToasts();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getRecipeDetails(id);
        if (!data) {
          throw new Error("Recipe not found");
        }
        setRecipe(data);
      } catch (err) {
        setError(err.message || "Failed to load recipe details");
        addToast(err.message || "Failed to load recipe details", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id, getRecipeDetails, addToast]);

  const toggleFavorite = (recipe) => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const isFavorited = favorites.some((fav) => fav.id === recipe.id);
    if (isFavorited) {
      const updatedFavorites = favorites.filter((fav) => fav.id !== recipe.id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      addToast(`${recipe.title} removed from favorites`, "info");
    } else {
      favorites.push(recipe);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      addToast(`${recipe.title} added to favorites`, "success");
    }
  };

  if (loading) {
    return (
      <div className="recipe-detail-page">
        <Sidebar />
        <div className="recipe-detail-content">
          <div className="container">
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading recipe details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="recipe-detail-page">
        <Sidebar />
        <div className="recipe-detail-content">
          <div className="container">
            <div className="error-state">
              <h2>Recipe Not Found</h2>
              <p>{error || "The requested recipe could not be found."}</p>
              <button onClick={() => navigate(-1)} className="back-btn">
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isFavorited = JSON.parse(localStorage.getItem("favorites") || "[]").some(
    (fav) => fav.id === recipe.id
  );

  return (
    <div className="recipe-detail-page">
      <Sidebar />
      <div className="recipe-detail-content">
        <div className="container">
          <button onClick={() => navigate(-1)} className="back-btn">
            ← Back
          </button>
          <div className="recipe-detail">
            <div className="recipe-header">
              <img
                src={recipe.imageUrl || "/placeholder.svg?height=300&width=400"}
                alt={recipe.title}
                className="recipe-detail-image"
                onError={(e) => (e.target.src = "/placeholder.svg?height=300&width=400")}
              />
              <div className="recipe-info">
                <h1 className="recipe-title">{recipe.title}</h1>
                <p className="recipe-description">{recipe.description}</p>
                <div className="recipe-meta">
                  <span className="cuisine-tag">{recipe.cuisine}</span>
                  <span className="prep-time">{recipe.prepTime} min</span>
                  <button
                    onClick={() => toggleFavorite(recipe)}
                    className={`favorite-btn ${isFavorited ? "favorited" : ""}`}
                  >
                    {isFavorited ? "★ Remove Favorite" : "☆ Add Favorite"}
                  </button>
                </div>
              </div>
            </div>
            <div className="recipe-content">
              <div className="ingredients-section">
                <h2>Ingredients</h2>
                <ul className="ingredients-list">
                  {recipe.ingredients && recipe.ingredients.length > 0 ? (
                    recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))
                  ) : (
                    <li>No ingredients available.</li>
                  )}
                </ul>
              </div>
              <div className="instructions-section">
                <h2>Instructions</h2>
                <ol className="instructions-list">
                  {recipe.instructions && recipe.instructions.length > 0 ? (
                    recipe.instructions.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))
                  ) : (
                    <li>No instructions available.</li>
                  )}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;