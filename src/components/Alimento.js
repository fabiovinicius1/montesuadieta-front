import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";

function Alimento() {
  const [filteredAlimentos, setFilteredAlimentos] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = async (searchTerm) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/alimentosApp/pesquisar/nome",
        { nomeAlimentoApp: searchTerm }
      );
      setFilteredAlimentos(response.data);
      setSearchPerformed(true);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setSearchPerformed(true);
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {searchPerformed && filteredAlimentos.length === 0 ? (
        <p>Nenhum alimento encontrado.</p>
      ) : (
        <ul>
          {filteredAlimentos.map((alimento) => (
            <li key={alimento.id}>{alimento.nomeAlimentoApp}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Alimento;
