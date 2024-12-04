import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Styles/NavigationBar.module.css"; // Importa el módulo CSS
import "font-awesome/css/font-awesome.min.css";

const NavigationBar = ({ user }) => {
  const navigate = useNavigate();

  const handleRedirectToPerfil = () => navigate("/perfil");
  const handleRedirectToHome = () => navigate("/vacantes");
  const handleRedirectToAgregarVacante = () => navigate("/agregarVacante");
  const handleRedirectToResultados = () => navigate("/resultados");
  const handleRedirectToPostulantes = () => navigate("/postulantes");

  return (
    <div className={styles.sidebar}>
      

      <nav className={styles.navigationLinks}>
        <a className={styles.navLink} onClick={handleRedirectToHome}>
          <i className="fas fa-home"></i>
          <span>Home</span>
        </a>
        <a className={styles.navLink} onClick={handleRedirectToPerfil}>
          <i className="fas fa-user"></i>
          <span>Perfil</span>
        </a>
        <a className={styles.navLink} onClick={handleRedirectToAgregarVacante}>
          <i className="fas fa-plus-circle"></i>
          <span>Agregar Vacante</span>
        </a>
        <a className={styles.navLink} onClick={handleRedirectToResultados}>
          <i className="fas fa-chart-bar"></i>
          <span>Resultados</span>
        </a>
        <a className={styles.navLink} onClick={handleRedirectToPostulantes}>
          <i className="fas fa-users"></i>
          <span>Postulantes</span>
        </a>
      </nav>
    </div>
  );
};

export default NavigationBar;
