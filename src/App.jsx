import React, { useState, useEffect } from "react";
import SearchBar from "./Components/SearchBar";
import RecipeList from "./Components/RecipeList";
import Dashboard from "./Components/Dashboard";
import "./Index.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(saved);
  }, []);

  const addOrder = (order) => {
    const updated = [...orders, order];
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

  return (
    <div className="app">
      <h1>Recipe Finder</h1>
      <SearchBar setRecipes={setRecipes} />
      <RecipeList recipes={recipes} onOrder={addOrder} />
      <Dashboard orders={orders} />
    </div>
  );
}

export default App;
