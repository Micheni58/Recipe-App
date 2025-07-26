import React, { createContext, useContext, useState, useEffect } from "react";
import { useToasts } from "./ToastContext";
import { getRecipes, getCuisines, saveRecipe, getRecipeById } from "../services/api";

const RecipeContext = createContext();

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("useRecipes must be used within a RecipeProvider");
  }
  return context;
};

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cuisines, setCuisines] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const { addToast } = useToasts();

  const loadRecipes = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch Spoonacular recipes
      const spoonacularRecipes = await getRecipes(searchQuery, selectedCuisine);

      // Fetch user recipes from db.json
      const response = await fetch("http://localhost:4000/recipes");
      if (!response.ok) {
        throw new Error("Failed to fetch user recipes");
      }
      const userRecipes = await response.json();

      // Combine recipes
      const combinedRecipes = [...spoonacularRecipes, ...userRecipes];
      setRecipes(combinedRecipes);

      // Apply filtering
      let filtered = combinedRecipes;
      if (searchQuery) {
        filtered = filtered.filter((recipe) =>
          recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      if (selectedCuisine && selectedCuisine !== "all") {
        filtered = filtered.filter(
          (recipe) => recipe.cuisine.toLowerCase() === selectedCuisine.toLowerCase()
        );
      }
      setFilteredRecipes(filtered);

      // Set cuisines
      const predefinedCuisines = getCuisines();
      const userCuisines = [...new Set(userRecipes.map((recipe) => recipe.cuisine))];
      const allCuisines = [...new Set([...predefinedCuisines, ...userCuisines])];
      setCuisines(allCuisines);
    } catch (err) {
      setError("Failed to load recipes");
      setFilteredRecipes([]);
      addToast("Failed to load recipes", "error");
    } finally {
      setLoading(false);
    }
  };

  const getRecipeDetails = async (id) => {
    try {
      const recipe = await getRecipeById(id);
      if (!recipe) {
        throw new Error("Recipe not found");
      }
      return recipe;
    } catch (err) {
      throw new Error("Failed to load recipe details");
    }
  };

  const addRecipe = async (recipe) => {
    try {
      const newRecipe = await saveRecipe(recipe);
      if (!newRecipe) {
        throw new Error("Failed to add recipe");
      }
      setRecipes((prev) => [...prev, newRecipe]);

      // Update filteredRecipes if matches filters
      let shouldAddToFiltered = true;
      if (searchQuery && !newRecipe.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        shouldAddToFiltered = false;
      }
      if (selectedCuisine && newRecipe.cuisine.toLowerCase() !== selectedCuisine.toLowerCase()) {
        shouldAddToFiltered = false;
      }
      if (shouldAddToFiltered) {
        setFilteredRecipes((prev) => [...prev, newRecipe]);
      }

      // Update cuisines
      if (!cuisines.includes(newRecipe.cuisine)) {
        setCuisines((prev) => [...prev, newRecipe.cuisine]);
      }

      return newRecipe;
    } catch (err) {
      setError("Failed to save recipe");
      addToast("Failed to add recipe", "error");
      throw err;
    }
  };

  useEffect(() => {
    loadRecipes();
  }, [searchQuery, selectedCuisine]);

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        filteredRecipes,
        loading,
        error,
        cuisines,
        searchQuery,
        setSearchQuery,
        selectedCuisine,
        setSelectedCuisine,
        loadRecipes,
        addRecipe,
        getRecipeDetails,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};