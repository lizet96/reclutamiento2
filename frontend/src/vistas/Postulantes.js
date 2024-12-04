import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import TablaCandidatos from "../componentes/TablaCandidatos";
import styles from "./estilos/Postulantes.module.css";

const Postulantes = ({ setView, user }) => {
  const location = useLocation(); // Obtén la ubicación actual

  // Función para redirigir a otras vistas
  const handleRedirectToPerfil = () => setView("perfil");
  const handleRedirectToAgregarVacante = () => setView("agregarVacante");
  const handleRedirectToResultados = () => setView("resultados");
  const handleRedirectToPostulantes = () => setView("Postulantes");



  
  // Define las rutas donde NO se debe mostrar este componente
const rutasExcluidas = ["/Resultados", "/formularios", "/cuestionarios"];

// Verifica si la ruta actual está excluida
if (rutasExcluidas.some((ruta) => location.pathname.startsWith(ruta))) {
  return null; // No renderiza el componente
}

  return rutasExcluidas.some((ruta) => location.pathname.startsWith(ruta)) ? null : (
    <div >
      {/* Header */}
      <header className="vacantes-header">
        <div className="user-info">
          <img
            src="https://img.freepik.com/vector-premium/icono-perfil-usuario-estilo-plano-ilustracion-vector-avatar-miembro-sobre-fondo-aislado-concepto-negocio-signo-permiso-humano_157943-15752.jpg?w=360"
            alt="User"
            className="user-photo"
          />
          <span className="user-name">{user?.nombre}</span>
        </div>
  
        {/* Navegación */}
        <nav className="vacante-nav">
          <button className="nav-link" onClick={handleRedirectToPerfil}>
            <i className="fas fa-user"></i>
            <span>Perfil</span>
          </button>
          <button className="nav-link">
            <i className="fas fa-home"></i>
            <span>Home</span>
          </button>
          <button className="nav-link" onClick={handleRedirectToAgregarVacante}>
            <i className="fas fa-plus-circle"></i>
            <span>Agregar Vacante</span>
          </button>
          <button className="nav-link" onClick={handleRedirectToResultados}>
            <i className="fas fa-chart-bar"></i>
            <span>Resultados</span>
          </button>
          <button className="nav-link" onClick={handleRedirectToPostulantes}>
          <i className="fas fa-users"></i>
          <span>Postulantes</span>
          </button>
        </nav>
      </header>
      <div className="Postulantes">

      <h1 className="section-title">Postulantes</h1>
      <TablaCandidatos />

      </div>

  
     
    </div>
  );
};

export default Postulantes;
