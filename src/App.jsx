import React, { useState } from "react";
import SearchBar from "./Components/SearchBar";
import RecipeList from "./Components/RecipeList";
import "./index.css"; 

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">🍽 Recipe Finder</h1>
        <SearchBar onSearch={setSearchTerm} />
      </header>

      <RecipeList searchTerm={searchTerm} />
    </div>
  );
}

export default App;
