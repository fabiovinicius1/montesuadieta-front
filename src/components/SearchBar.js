import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function SearchBar({ onSearch }) {
	const [searchTerm, setSearchTerm] = useState("");
	const navigate = useNavigate(); 

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="button-group">
      <input
        type="text"
        placeholder="Pesquisar alimento..."
        value={searchTerm}
        onChange={handleChange}
      />
      <button onClick={handleSearch}>Pesquisar</button>
	  <button onClick={() => navigate('/perfil')}>Voltar Home</button>
    </div>
  );
}

export default SearchBar;
