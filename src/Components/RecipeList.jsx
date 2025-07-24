import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";

function RecipeList({ searchTerm }) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (!searchTerm) return;

    const fetchRecipes = async () => {
      try {
        // Step 1: Search basic results
        const searchRes = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&number=5&apiKey=908232a4ca0849bdb5738dc14e876a86`
        );
        const searchData = await searchRes.json();

        if (!Array.isArray(searchData.results)) {
          console.error("Unexpected API response:", searchData);
          setRecipes([]);
          return;
        }

        // Step 2: Fetch detailed info for each recipe
        const detailedRecipes = await Promise.all(
          searchData.results.map(async (recipe) => {
            const res = await fetch(
              `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=908232a4ca0849bdb5738dc14e876a86`
            );
            return await res.json();
          })
        );

        setRecipes(detailedRecipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setRecipes([]);
      }
    };

    fetchRecipes();
  }, [searchTerm]);

  return (
    <div className="recipe-list" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  );
}

export default RecipeList;
