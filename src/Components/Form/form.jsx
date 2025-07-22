import { useState } from "react";
import "./Form.css";

function AddRecipeForm({ onAddRecipe }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    cookingTime: "",
    image: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Convert comma-separated ingredients to array
    const newRecipe = {
      ...formData,
      ingredients: formData.ingredients.split(",").map(i => i.trim()),
    };

    // Send to parent (App or RecipeList)
    onAddRecipe(newRecipe);

    // Reset form
    setFormData({
      title: "",
      description: "",
      ingredients: "",
      instructions: "",
      cookingTime: "",
     
    });
  }

  return (
    <form id="formdata" onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input name="title" placeholder="Recipe Name" value={formData.title} onChange={handleChange} required /><br />
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required /><br/>
      <textarea name="ingredients" placeholder="Ingredients (comma separated)" value={formData.ingredients} onChange={handleChange} required /><br/>
      <textarea name="instructions" placeholder="Instructions" value={formData.instructions} onChange={handleChange} required /><br/>
      <input name="cookingTime" type="number" placeholder="Cooking Time (min)" value={formData.cookingTime} onChange={handleChange} required /><br/>
      <input name="image" type="url" placeholder="Image URL" value={formData.image} onChange={handleChange} /><br/>
      <button id="button"type="submit">Add Recipe</button>
    </form>
  );
}

export default AddRecipeForm;
