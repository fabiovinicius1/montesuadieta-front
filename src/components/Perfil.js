import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaWeight } from "react-icons/fa"; // Importa um ícone de peso
import { Modal, Button, Form } from "react-bootstrap"; // Usando Bootstrap para modais
import { useNavigate } from 'react-router-dom';
function Perfil() {
  const [userData, setUserData] = useState(null);
  const [showRefeicaoModal, setShowRefeicaoModal] = useState(false);
  const [showAlimentoModal, setShowAlimentoModal] = useState(false);
  const [nomeRefeicao, setNomeRefeicao] = useState("");
  const [nomeAlimento, setNomeAlimento] = useState("");
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("http://localhost:3000/usuarios/pesquisar", {
            headers: {
              Authorization: `${token}`,
            },
            params: {
              id: 1,
            },
          });
          setUserData(response.data);
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handlePesquisarAlimento = () => {
    navigate("/alimento");
  };

  const handleCloseRefeicaoModal = () => setShowRefeicaoModal(false);
  const handleShowRefeicaoModal = () => setShowRefeicaoModal(true);

  const handleCloseAlimentoModal = () => setShowAlimentoModal(false);
  const handleShowAlimentoModal = () => setShowAlimentoModal(true);

  const handleAdicionarRefeicao = () => {
    console.log("Refeição adicionada:", nomeRefeicao);
    handleCloseRefeicaoModal();
  };

  const handleAdicionarAlimento = () => {
    console.log("Alimento adicionado:", nomeAlimento);
    handleCloseAlimentoModal();
  };

  if (!userData) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="perfil">
      <header className="perfil-header">
        <div className="welcome-section">
          <span className="welcome-message">Bem vindo, {userData.login}</span>
          <div className="weight-info">
            <FaWeight size={24} /> {/* Ícone de peso */}
            <span>{userData.peso} kg</span> {/* Mostrando o peso do usuário */}
          </div>
        </div>
        <div className="action-buttons">
          <Button variant="primary" onClick={handleShowRefeicaoModal}>Adicionar Refeição</Button>
          <Button variant="primary" onClick={handleShowAlimentoModal}>Adicionar Alimento</Button>
          <Button variant="primary" onClick={handlePesquisarAlimento}>Pesquisar Alimento</Button>
        </div>
      </header>

      {/* Modal para adicionar refeição */}
      <Modal show={showRefeicaoModal} onHide={handleCloseRefeicaoModal}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Refeição</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nome da Refeição</Form.Label>
              <Form.Control
                type="text"
                placeholder="Informe o nome da refeição"
                value={nomeRefeicao}
                onChange={(e) => setNomeRefeicao(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRefeicaoModal}>Fechar</Button>
          <Button variant="primary" onClick={handleAdicionarRefeicao}>Salvar</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para adicionar alimento */}
      <Modal show={showAlimentoModal} onHide={handleCloseAlimentoModal}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Alimento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nome do Alimento</Form.Label>
              <Form.Control
                type="text"
                placeholder="Informe o nome do alimento"
                value={nomeAlimento}
                onChange={(e) => setNomeAlimento(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAlimentoModal}>Fechar</Button>
          <Button variant="primary" onClick={handleAdicionarAlimento}>Salvar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Perfil;
