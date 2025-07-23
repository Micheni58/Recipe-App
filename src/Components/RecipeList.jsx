import React from "react";
import RecipeCard from "./RecipeCard";

function RecipeList({ recipes, onOrder }) {
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} onOrder={onOrder} />
      ))}
    </div>
  );
}

export default RecipeList;
