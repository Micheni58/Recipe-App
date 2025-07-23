import React from "react";

function RecipeCard({ recipe }) {
  if (!recipe) return null;

  const {
    title,
    image,
    ingredients = [],
    procedure = [],
    content,
  } = recipe;

  return (
    <div className="recipe-card">
      <h2>{title}</h2>

      {image && <img src={image} alt={title} className="recipe-image" />}

      {content && <p className="recipe-content">{content}</p>}

      <h3>Ingredients</h3>
      <ul>
        {Array.isArray(ingredients) && ingredients.length > 0 ? (
          ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))
        ) : (
          <li>No ingredients listed.</li>
        )}
      </ul>

      <h3>Procedure</h3>
      <ol>
        {Array.isArray(procedure) && procedure.length > 0 ? (
          procedure.map((step, index) => (
            <li key={index}>{step}</li>
          ))
        ) : (
          <li>No procedure provided.</li>
        )}
      </ol>
    </div>
  );
}

export default RecipeCard;