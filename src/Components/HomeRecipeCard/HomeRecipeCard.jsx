import React from "react";
import "./HomeRecipeCard.css";

const HomeRecipeCard = ({ recipe }) => {
  if (!recipe) {
    return null;
  }

  const { title = "Untitled Recipe", imageUrl = "/placeholder.svg?height=300&width=400", description = "A delicious recipe" } = recipe;

  return (
    <div className="home-recipe-card">
      <img
        src={imageUrl}
        alt={title}
        className="home-recipe-card-image"
        onError={(e) => {
          e.target.src = "/placeholder.svg?height=300&width=400";
        }}
      />
      <div className="home-recipe-card-content">
        <p className="home-recipe-card-description">{description}</p>
      </div>
    </div>
  );
};

export default HomeRecipeCard;