import React from "react";
import { useRecipes } from "../../context/RecipeContext";
import "./SearchBar.css";

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useRecipes();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search recipes by title..."
        value={searchQuery}
        onChange={handleSearch}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;