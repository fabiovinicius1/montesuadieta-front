import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";

function Alimento() {
  const [filteredAlimentos, setFilteredAlimentos] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = async (searchTerm) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/alimentosApp/pesquisar/nome",
		{
		  params: {
			nomeAlimentoApp: searchTerm
		  }
		}
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
        <div>
          {filteredAlimentos.map((alimento) => (
            <div key={alimento.id} className="alimento-card">
              <h3>{alimento.nomeAlimentoApp}</h3>
              <p>Porção: {alimento.porcao}g</p>
              <p>Calorias: {alimento.caloria.toFixed(2)}</p>
              <p>Proteína: {alimento.proteina.toFixed(2)}g</p>
              <p>Carboidratos: {alimento.carboidrato.toFixed(2)}g</p>
              <p>Gorduras Saturadas: {alimento.saturados.toFixed(2)}g</p>
              <p>Gorduras Monoinsaturadas: {alimento.monoinsaturados.toFixed(2)}g</p>
              <p>Gorduras Poliinsaturadas: {alimento.poliinsaturados.toFixed(2)}g</p>
              <p>Gordura Total: {alimento.gordutaTotal.toFixed(2)}g</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Alimento;
