import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Cadastro() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [pesoF, setPeso] = useState("");
  const [mensagem, setMensagem] = useState(""); // Estado para a mensagem
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const peso = parseFloat(pesoF);
    const usuario = { login, senha, peso };

    console.log("Dados do usuário:", usuario); // Log dos dados do usuário

    try {
      const response = await axios.post(
        "http://localhost:3000/usuarios/adicionar",
        usuario
      );
      console.log("Resposta do servidor:", response); // Log da resposta do servidor

      if (response.status === 201) {
        setMensagem('Usuário cadastrado com sucesso!');
		setTimeout(() => {
			navigate('/login'); // Redirecionar para a tela de login
		  }, 2000);
      } else {
        setMensagem('Erro ao cadastrar usuário');
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
	  setMensagem('Erro na requisição');
    }
  };

  return (
    <div className="Cadastro">
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Login:</label>
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        <div>
          <label>Peso:</label>
          <input
            type="text"
            value={pesoF}
            onChange={(e) => setPeso(e.target.value)}
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      {mensagem && <p>{mensagem}</p>} {/* Exibir a mensagem */}
    </div>
  );
}

export default Cadastro;
