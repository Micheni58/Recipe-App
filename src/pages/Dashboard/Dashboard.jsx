import { useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
    const [recipes, setRecipes] = useState([
        { id: 1, name: "Pasta Carbonara", category: "Italian" },
        { id: 2, name: "Chicken Curry", category: "Indian" },
        { id: 3, name: "Caesar Salad", category: "Salad" }
    ]);
    
    const [newRecipe, setNewRecipe] = useState({ name: "", category: "" });

    const handleAddRecipe = (e) => {
        e.preventDefault();
        if (newRecipe.name && newRecipe.category) {
            setRecipes([...recipes, { id: Date.now(), ...newRecipe }]);
            setNewRecipe({ name: "", category: "" });
        }
    };

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <div className="dashboard-stats">
                <div className="stat-card">
                    <h3>Total Recipes</h3>
                    <p>{recipes.length}</p>
                </div>
                <div className="stat-card">
                    <h3>Favorites</h3>
                    <p>8</p>
                </div>
                <div className="stat-card">
                    <h3>Categories</h3>
                    <p>6</p>
                </div>
            </div>
            
            <div className="dashboard-content">
                <div className="add-recipe-form">
                    <h3>Add New Recipe</h3>
                    <form onSubmit={handleAddRecipe}>
                        <input
                            type="text"
                            placeholder="Recipe Name"
                            value={newRecipe.name}
                            onChange={(e) => setNewRecipe({...newRecipe, name: e.target.value})}
                        />
                        <input
                            type="text"
                            placeholder="Category"
                            value={newRecipe.category}
                            onChange={(e) => setNewRecipe({...newRecipe, category: e.target.value})}
                        />
                        <button type="submit">Add Recipe</button>
                    </form>
                </div>
                
                <div className="recipes-list">
                    <h3>All Recipes</h3>
                    <ul>
                        {recipes.map(recipe => (
                            <li key={recipe.id}>
                                <span>{recipe.name}</span>
                                <span className="category">{recipe.category}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;