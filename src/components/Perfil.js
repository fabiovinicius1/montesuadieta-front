import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaWeight } from "react-icons/fa"; // Importa um ícone de peso
import { Modal, Button, Form , ListGroup} from "react-bootstrap"; // Usando Bootstrap para modais
import { useNavigate } from "react-router-dom";
function Perfil() {
  const [userData, setUserData] = useState(null);
  const [showRefeicaoModal, setShowRefeicaoModal] = useState(false);
  const [showAlimentoModal, setShowAlimentoModal] = useState(false);
  const [nomeRefeicao, setNomeRefeicao] = useState("");
  const [nomeAlimento, setNomeAlimento] = useState("");
  const [showListarRefeicoesModal, setShowListarRefeicoesModal] =
    useState(false);
  const [refeicoes, setRefeicoes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:3000/usuarios/pesquisar",
            {
              headers: {
                Authorization: `${token}`,
              },
              params: {
                id: 1,
              },
            }
          );
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

  const handleCloseListarRefeicoesModal = () =>
    setShowListarRefeicoesModal(false);
  const handleShowListarRefeicoesModal = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3000/refeicoes/pesquisar/todas",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setRefeicoes(response.data); // Salva a lista de refeições no estado
	  console.log(response.data)
      setShowListarRefeicoesModal(true); // Abre o modal
    } catch (error) {
      console.error(
        "Erro ao listar refeições:",
        error.response?.data || error.message
      );
    }
  };

  const handleAdicionarRefeicao = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3000/refeicoes/adicionar",
        { nomeRefeicao: nomeRefeicao, usuarioId: 1 }, // Enviando o nome da refeição pelo corpo da requisição
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log("Refeição adicionada:", nomeRefeicao);
      handleCloseRefeicaoModal(); // Fecha o modal após salvar
    } catch (error) {
      console.error("Erro ao adicionar refeição:", error);
    }
  };

  const handleAdicionarAlimento = async () => {
	try {
		const token = localStorage.getItem("token");
		await axios.post(
		  "http://localhost:3000/refeicoes/adicionar/alimento/refeicao",
		  { nomeRefeicao: nomeRefeicao, nomeAlimento: nomeAlimento}, // Enviando o nome da refeição pelo corpo da requisição
		  {
			headers: {
			  Authorization: `${token}`,
			},
		  }
		);
		console.log("aliemnto adicionado na refeicao:", nomeRefeicao);
		handleCloseAlimentoModal(); // Fecha o modal após salvar
	  } catch (error) {
		console.error("Erro ao adicionar refeição:", error);
	  }
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
          <Button variant="primary" onClick={handleShowRefeicaoModal}>
            Adicionar Refeição
          </Button>
          <Button variant="primary" onClick={handleShowAlimentoModal}>
            Adicionar Alimento
          </Button>
          <Button variant="primary" onClick={handleShowListarRefeicoesModal}>
            Listar Refeições
          </Button>
          <Button variant="primary" onClick={handlePesquisarAlimento}>
            Pesquisar Alimento
          </Button>
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
          <Button variant="secondary" onClick={handleCloseRefeicaoModal}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleAdicionarRefeicao}>
            Salvar
          </Button>
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
			<Form.Group>
              <Form.Label>Nome da Refeição</Form.Label>
              <Form.Control
                type="text"
                placeholder="Informe o nome da Refeição"
                value={nomeRefeicao}
                onChange={(e) => setNomeRefeicao(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAlimentoModal}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleAdicionarAlimento}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para listar refeições */}
	  <Modal show={showListarRefeicoesModal} onHide={handleCloseListarRefeicoesModal}>
        <Modal.Header closeButton>
          <Modal.Title>Listar Refeições</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {refeicoes.length > 0 ? (
            <ListGroup>
              {refeicoes.map((refeicao, index) => (
                <ListGroup.Item key={index}>
                  <strong>{refeicao.nomeRefeicao}</strong>
                  {refeicao.alimentosRefeicao.length > 0 ? (
                    <ul>
                      {refeicao.alimentosRefeicao.map((alimento, i) => (
                        <li key={i}>
                          Nome: {alimento.nomeAlimentoRefeicao} - Quantidade {alimento.quantidade}g - Caloria {alimento.caloria}g - Proteina {alimento.proteina}g - Carboidrato {alimento.carboidrato}g - GordutaTotal {alimento.gordutaTotal}g
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>Sem alimentos para esta refeição.</p>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>Nenhuma refeição encontrada.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseListarRefeicoesModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Perfil;
