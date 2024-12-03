import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../vistas/estilos/vacantes.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Vacantes = ({ setView, user }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Obtén la ubicación actual

  // Estados para almacenar las vacantes
  const [vacantes, setVacantes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVacante, setSelectedVacante] = useState(null);
  const [showFormulario, setShowFormulario] = useState(false);

  // Función para obtener las vacantes desde el backend
  useEffect(() => {
    const fetchVacantes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/vacantes"); 
        const data = await response.json();
        setVacantes(data); 
      } catch (error) {
        console.error("Error al obtener las vacantes:", error);
      }
    };
    fetchVacantes();
  }, []);

  // Función para redirigir a la vista de Formularios
  const handleRedirectToFormularios = (vacanteId) => {
    // Redirige a la vista de formularios pasando el vacante_id en la URL
    navigate(`/formularios/${vacanteId}`);
  };

  // Función para redirigir a otras vistas
  const handleRedirectToPerfil = () => setView("perfil");
  const handleRedirectToAgregarVacante = () => setView("agregarVacante");
  const handleRedirectToResultados = () => setView("resultados");

  // Función para abrir la ventana modal
  const handlePostular = (vacante) => {
    setSelectedVacante(vacante); // Guardar vacante seleccionada
    setModalOpen(true); // Abrir la modal
  };

  // Función para cerrar la ventana modal
  const handleCloseModal = () => {
    setModalOpen(false); // Cerrar la modal
  };

  const handleConfirmarPostulacion = () => {
    setSelectedVacante(selectedVacante); // Guarda la vacante seleccionada correctamente
    setShowFormulario(true); // Muestra el formulario
    setModalOpen(false); // Cierra la modal
    handleRedirectToFormularios(selectedVacante.id_vacante); // Redirige a la vista de formularios con el vacante_id
  };
  
  // Define las rutas donde NO se debe mostrar este componente
const rutasExcluidas = ["/Resultados", "/formularios", "/cuestionarios"];

// Verifica si la ruta actual está excluida
if (rutasExcluidas.some((ruta) => location.pathname.startsWith(ruta))) {
  return null; // No renderiza el componente
}

  return rutasExcluidas.some((ruta) => location.pathname.startsWith(ruta)) ? null : (
    <div className="vacantes-container">
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
        </nav>
      </header>
  
      {/* Vacantes Disponibles */}
      <h1 className="section-title">Vacantes Disponibles</h1>
  
      {/* Mostrar las vacantes */}
      <div className="vacantes-grid">
        {vacantes.length > 0 ? (
          vacantes.map((vacante) => (
            <button
              className="vacante-card"
              key={vacante.id_vacante}
              onClick={() => handlePostular(vacante)} // Llamar al manejador de postulación
            >
              <h2 className="vacante-titulo">{vacante.vac_nombre}</h2>
              <p className="vacante-descripcion">{vacante.vac_descripcion}</p>
              <p className="vacante-sueldo">
                Sueldo: ${vacante.sueldoMensual.toFixed(2)}
              </p>
              <p className="vacante-fechas">
                Inicio: {vacante.fecha_inicio} <br />
                Fin: {vacante.fecha_fin}
              </p>
            </button>
          ))
        ) : (
          <p>No hay vacantes disponibles</p>
        )}
      </div>
  
      {/* Modal de confirmación */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>¿Quieres postularte a esta vacante?</h3>
            <div className="modal-buttons">
              <button className="confirm-btn" onClick={handleConfirmarPostulacion}>
                Sí
              </button>
              <button className="cancel-btn" onClick={handleCloseModal}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vacantes;
