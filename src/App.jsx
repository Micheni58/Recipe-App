import React, { useState } from "react";
import SearchBar from "./Components/SearchBar";
import RecipeList from "./Components/RecipeList"
import "./Index.css"

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>🍽 Recipe Finder</h1>
      <SearchBar onSearch={setSearchTerm} />
      <RecipeList searchTerm={searchTerm} />
    </div>
  );
}

export default App;
