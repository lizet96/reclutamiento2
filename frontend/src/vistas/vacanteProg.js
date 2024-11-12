import React from 'react';
import { Link } from 'react-router-dom'; // Importa el componente Link
import './estilos/vacantes.css'; // Archivo de estilos CSS para la vista

const Vacantes = () => {
  return (
    <div className="vacantes-container">
      {/* Header */}
      <header className="vacantes-header">
        {/* Menú desplegable */}
        <div className="menu">
          <input type="checkbox" id="menu-toggle" />
          <label htmlFor="menu-toggle" className="menu-icon">
            <span></span>
            <span></span>
            <span></span>
          </label>
          <nav className="menu-items">
            <a href="/home">Home</a>
            <a href="/administracion">Administración</a>
            <a href="/perfil">Perfil</a>
            <a href="/vacantes">Secciones de Vacantes </a>
          </nav>
        </div>
        
        {/* Imagen central en el header */}
        <div className="header-image">
          <img src="https://img.freepik.com/vector-premium/icono-perfil-usuario-estilo-plano-ilustracion-vector-avatar-miembro-sobre-fondo-aislado-concepto-negocio-signo-permiso-humano_157943-15752.jpg?w=360" alt="Header Image" />
        </div>

        {/* Foto del usuario y nombre */}
        <div className="user-info">
          <span className="user-name">Lizet Olvera  </span >
          <img src="https://img.freepik.com/vector-premium/icono-perfil-usuario-estilo-plano-ilustracion-vector-avatar-miembro-sobre-fondo-aislado-concepto-negocio-signo-permiso-humano_157943-15752.jpg?w=360" alt="User" className="user-photo" />
        </div>
      </header>
      
      {/* Vacantes Dsiponibles */}
      <br></br>
      <h1 className="section-title">Vacantes Disponibles de Programación</h1>


      {/* Cuerpo con los tres recuadros */}
      <div className="vacantes-body">
        <div className="box" onClick={() => window.location.href = '/cuestionarioFront'}>
          Especialista en Frontend
        </div>
        <div className="box" onClick={() => window.location.href = '/vacante2'}>
         Back-End
        </div>
        <div className="box" onClick={() => window.location.href = '/vacante3'}>
          Movile
        </div>
      </div>
    </div>
  );
};

export default Vacantes;
