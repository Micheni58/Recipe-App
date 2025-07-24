import React from "react";

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    margin: "12px",
    maxWidth: "350px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    textAlign: "left",
  },
  image: {
    width: "100%",
    borderRadius: "8px",
    marginBottom: "12px",
  },
};

function RecipeCard({ recipe }) {
  return (
    <div style={styles.card}>
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} style={styles.image} />

      <h4>Ingredients:</h4>
      <ul>
        {recipe.extendedIngredients?.length > 0 ? (
          recipe.extendedIngredients.map((ing, i) => (
            <li key={i}>{ing.original}</li>
          ))
        ) : (
          <li>No ingredients found.</li>
        )}
      </ul>

      <h4>Instructions:</h4>
      <ol>
        {recipe.analyzedInstructions?.[0]?.steps?.length > 0 ? (
          recipe.analyzedInstructions[0].steps.map((step) => (
            <li key={step.number}>{step.step}</li>
          ))
        ) : (
          <li>No instructions found.</li>
        )}
      </ol>
    </div>
  );
}

export default RecipeCard;
