import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Login() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Lógica de login aqui
    console.log("Login:", login, "Senha:", senha);
	const usuario = { login, senha };
	try {
		const response = await axios.post(
		  "http://localhost:3000/auth/login/usuario",
		  usuario
		);
		console.log("Resposta do servidor:", response.data); // Log da resposta do servidor
  
		if (response.status === 201) {
		  setMensagem('Login feito com sucesso!');
		  const token = response.data;
		  localStorage.setItem("token", token); // Armazena o token no localStorage
		  navigate("/perfil"); // Redireciona para a página de perfil
		} else {
		  setMensagem('erro login');
		}
	  } catch (error) {
		console.error("Erro na requisição:", error);
		setMensagem('Erro na requisição');
	  }
  };

  return (
    <div className="Login">
      <h2>Login</h2>
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
        <button type="submit">Entrar</button>
		</form>
      <button onClick={() => navigate('/cadastro')}>Ir para Cadastro</button> {/* Botão para cadastro */}
	  {mensagem && <p>{mensagem}</p>} {/* Exibir a mensagem */}
    </div>
  );
}

export default Login;
