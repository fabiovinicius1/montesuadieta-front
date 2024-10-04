import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Cadastro from "./components/Cadastro";
import Alimento from "./components/Alimento";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/perfil" element={<Cadastro />} />
            <Route path="/alimento" element={<Alimento />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
