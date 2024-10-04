import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Pesquisar alimento..."
        value={searchTerm}
        onChange={handleChange}
      />
      <button onClick={handleSearch}>Pesquisar</button>
    </div>
  );
}

export default SearchBar;
