import React, { useState, useEffect } from "react";
import { useRecipes } from "../../context/RecipeContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import "./EditRecipe.css";

const EditRecipe = () => {
  const { user } = useAuth();
  const { editRecipe, cuisines, getRecipeDetails } = useRecipes();
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    cuisine: "",
    prepTime: "",
    ingredients: "",
    instructions: "",
    imageUrl: "",
  });
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      const loadRecipe = async () => {
        try {
          const recipe = state?.recipe || (await getRecipeDetails(id));
          if (recipe) {
            setFormData({
              title: recipe.title || "",
              description: recipe.description || "",
              cuisine: recipe.cuisine || "",
              prepTime: recipe.prepTime || "",
              ingredients: recipe.ingredients?.join("\n") || "",
              instructions: recipe.instructions?.join("\n") || "",
              imageUrl: recipe.imageUrl || "",
            });
          } else {
            setFormError("Recipe not found");
          }
        } catch (err) {
          setFormError("Failed to load recipe");
        }
      };
      loadRecipe();
    }
  }, [user, id, state, navigate, getRecipeDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    try {
      const updatedRecipe = {
        title: formData.title,
        description: formData.description || "A delicious user-created recipe",
        cuisine: formData.cuisine || "International",
        prepTime: parseInt(formData.prepTime) || 30,
        ingredients: formData.ingredients.split("\n").filter((i) => i.trim()) || [],
        instructions: formData.instructions.split("\n").filter((i) => i.trim()) || [],
        imageUrl: formData.imageUrl || "/placeholder.svg?height=300&width=400",
        isUserRecipe: true,
      };
      await editRecipe(id, updatedRecipe);
      navigate("/add-recipe");
    } catch (err) {
      setFormError("Failed to update recipe. Please try again.");
    }
  };

  return (
    <div className="edit-recipe-page">
      {user && <Sidebar />}
      <div className="edit-recipe-content">
        <div className="container">
          <h1 className="page-title">Edit Recipe</h1>
          <p className="page-subtitle">Update your recipe details</p>
          {formError && <p className="error">{formError}</p>}
          <form onSubmit={handleSubmit} className="recipe-form">
            <div className="form-group">
              <label htmlFor="title">Recipe Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter recipe title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief description of the recipe"
              />
            </div>
            <div className="form-group">
              <label htmlFor="cuisine">Cuisine</label>
              <select
                id="cuisine"
                name="cuisine"
                value={formData.cuisine}
                onChange={handleChange}
              >
                <option value="">Select Cuisine</option>
                {cuisines.map((cuisine) => (
                  <option key={cuisine} value={cuisine}>
                    {cuisine}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="prepTime">Preparation Time (minutes)</label>
              <input
                type="number"
                id="prepTime"
                name="prepTime"
                value={formData.prepTime}
                onChange={handleChange}
                placeholder="Enter prep time"
              />
            </div>
            <div className="form-group">
              <label htmlFor="ingredients">Ingredients (one per line)</label>
              <textarea
                id="ingredients"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                placeholder="Enter ingredients, one per line"
              />
            </div>
            <div className="form-group">
              <label htmlFor="instructions">Instructions (one per line)</label>
              <textarea
                id="instructions"
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                placeholder="Enter instructions, one per line"
              />
            </div>
            <div className="form-group">
              <label htmlFor="imageUrl">Image URL (optional)</label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="Enter image URL"
              />
            </div>
            <button type="submit" className="submit-btn">Update Recipe</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditRecipe;