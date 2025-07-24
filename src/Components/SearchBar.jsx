import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <input
        type="text"
        placeholder="Search for recipes..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{
          padding: "8px",
          width: "250px",
          fontSize: "16px",
          marginRight: "8px",
        }}
      />
      <button type="submit" style={{ padding: "8px 16px" }}>
        Search
      </button>
    </form>
  );
}

export default SearchBar;
