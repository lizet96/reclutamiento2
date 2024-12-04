import React, { useState, useEffect } from "react";
import "../vistas/estilos/vacantes.css";
import NavigationBar from "../componentes/NavigationBar";
import Header from "../componentes/Header";
import ApiUrl from "../config/ApiUrl";

const Vacantes = ({ user }) => {
  const [vacantes, setVacantes] = useState([]);

  useEffect(() => {
    const fetchVacantes = async () => {
      try {
        const response = await fetch(`${ApiUrl}vacantes`);
        const data = await response.json();
        setVacantes(data);
      } catch (error) {
        console.error("Error al obtener las vacantes:", error);
      }
    };
    fetchVacantes();
  }, []);

  return (
    <div className="vacantes-container">
      <Header/>
      <NavigationBar user={user} />
      <h1 className="section-title">Vacantes Disponibles</h1>
      <div className="vacantes-grid">
        {vacantes.length > 0 ? (
          vacantes.map((vacante) => (
            <button className="vacante-card" key={vacante.id_vacante}>
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
    </div>
  );
};

export default Vacantes;
