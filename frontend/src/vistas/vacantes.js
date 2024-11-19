import React from 'react';
import { Link } from 'react-router-dom'; // Importa el componente Link
import '../vistas/estilos/vacantes.css'; // Archivo de estilos CSS para la vista
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Vacantes = () => {
  return (
    <div className="vacantes-container">
      {/* Header */}
      <header className="vacantes-header">
        {/* Navegación fija */}
        <div>
          <nav className="vacante-nav">
           <a href="/perfil">
              <i className="fas fa-user"></i>
              <span>Perfil</span>
            </a>
            <a href="/vacantes">
              <i className="fas fa-home"></i>
              <span>Home</span>
            </a>
            <a href="/agregarVacante">
              <i className="fas fa-plus-circle"></i>
              <span>Agregar Vacante</span>
            </a>
            <a href="/resultados">
              <i className="fas fa-chart-bar"></i>
              <span>Resultados</span>
            </a>
          </nav>
        </div>

        {/* Foto del usuario y nombre */}
        <div className="user-info">
          <span className="user-name"></span >
          <img src="https://img.freepik.com/vector-premium/icono-perfil-usuario-estilo-plano-ilustracion-vector-avatar-miembro-sobre-fondo-aislado-concepto-negocio-signo-permiso-humano_157943-15752.jpg?w=360" alt="User" className="user-photo" />
        </div>
      </header>
      
      {/* Vacantes Dsiponibles */}

      <h1 className="section-title">Vacantes Disponibles</h1>


      {/* Cuerpo con los tres recuadros */}
      <div className="vacantes-body">
        <div className="box" onClick={() => window.location.href = '/vacanteProg'}>
            <nav>
              <p className="title-box">Programación</p>
              <i className="fas fa-code" style={{ fontSize: '2rem', color: '#333' }}></i>
            </nav>
        </div>
        <div className="box" onClick={() => window.location.href = ''}>
              <nav>
                  <p className="title-box">RecursosHumanos</p>
                  <i className="fas fa-users" style={{ fontSize: '2rem', color: '#333' }}></i>
              </nav>
          </div>
          <div className="box" onClick={() => window.location.href = ''}>
              <nav>
                  <p className="title-box">Marketing</p>
                  <i className="fas fa-bullhorn" style={{ fontSize: '2rem', color: '#333' }}></i>
              </nav>
          </div>
        
      </div>
      {/* <div  className="vacantes-body" >
        <div className="box" onClick={() => window.location.href = '/vacante3'}>
          Vacante 3
        </div> 
      </div> */}
    </div>
  );
};

export default Vacantes;
