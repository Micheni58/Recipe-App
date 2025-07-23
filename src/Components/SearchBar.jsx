import React, { useState } from "react";

const apiKey = "3be0cd576f6142acb2d2ec7f327e914e";

function SearchBar({ setRecipes }) {
  const [query, setQuery] = useState("");

  async function fetchRecipes() {
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=10&addRecipeInformation=true&apiKey=${apiKey}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      setRecipes(data.results);
    } catch (err) {
      console.error("API error:", err);
    }
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={fetchRecipes}>Search</button>
    </div>
  );
}

export default SearchBar;
