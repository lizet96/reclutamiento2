import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./estilos/Formularios.css";
import NavigationBar from "../componentes/NavigationBar";
import Header from "../componentes/Header";
import ApiUrl from "../config/ApiUrl";

const Formularios = ({ user }) => {
  const [formularios, setFormularios] = useState([]);
  const [selectedFormulario, setSelectedFormulario] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { vacante_id } = useParams();
  const navigate = useNavigate();

  // Fetch the formularios based on the vacante_id
  useEffect(() => {
    if (!vacante_id) {
      console.error("Falta el id_vacante en la URL");
      return;
    }

    fetch(`${ApiUrl}formularios?vacante_id=${vacante_id}`)
      .then((response) => response.json())
      .then((data) => setFormularios(data))
      .catch((error) => console.error("Error al obtener formularios:", error));
  }, [vacante_id]);

  // Open the modal with the selected formulario
  const handleFormularioClick = (formulario) => {
    setSelectedFormulario(formulario);
    setShowModal(true);
  };

  // Start the selected formulario and navigate to its cuestionario
  const handleEmpezar = () => {
    if (selectedFormulario) {
      navigate(`/cuestionario/${selectedFormulario.id_formulario}`);
    }
    setShowModal(false);
  };

  // Close the modal without starting
  const handleCancelar = () => {
    setSelectedFormulario(null);
    setShowModal(false);
  };

  // Navigation handlers
  const handleRedirectToPerfil = () => navigate("/perfil");
  const handleRedirectToHome = () => navigate("/vacantes");
  const handleRedirectToAgregarVacante = () => navigate("/agregarVacante");
  const handleRedirectToResultados = () => navigate("/resultados");

  return (
    <div className="vacantes-container">
      <Header />
      <NavigationBar user={user} />
      <div className="formularios-container">
        <h1>Formularios</h1>
        <div className="formularios-list">
          {formularios.length > 0 ? (
            formularios.map((formulario) => (
              <div
                key={formulario.id_formulario}
                className="formulario-card"
                onClick={() => handleFormularioClick(formulario)}
              >
                <h2>{formulario.for_nombre}</h2>
                <p>{formulario.for_descripcion}</p>
              </div>
            ))
          ) : (
            <p>No hay formularios disponibles para esta vacante.</p>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>¿Quieres empezar con el formulario?</h2>
            <p>Dispones de 1 hora para terminar.</p>
            <div className="modal-buttons">
              <button className="btn btn-green" onClick={handleEmpezar}>
                Empezar
              </button>
              <button className="btn btn-red" onClick={handleCancelar}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Formularios;
