import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

const TablaCandidatos = () => {
  const [vacantes, setVacantes] = useState([]); // Para guardar las vacantes de la API
  const [candidatos, setCandidatos] = useState([]); // Para guardar los candidatos filtrados
  const [selectedVacante, setSelectedVacante] = useState(''); // Para manejar la vacante seleccionada

  useEffect(() => {
    // Traemos las vacantes de la API
    const fetchVacantes = async () => {
      try {
        const response = await fetch('https://rrhbackend.onrender.com/api/VacanteEmpresa?id_empresa=1'); // Asegúrate de pasar el id de la empresa correcto
        const data = await response.json();
        setVacantes(data);
      } catch (error) {
        console.error("Error al obtener las vacantes:", error);
      }
    };
    fetchVacantes();
  }, []); // Se ejecuta solo una vez al cargar el componente

  useEffect(() => {
    // Función para obtener los candidatos cuando se selecciona una vacante
    const fetchCandidatos = async () => {
      if (selectedVacante) {
        try {
          const response = await fetch(`https://rrhbackend.onrender.com/api/Postulantes?id_vacante=${selectedVacante}`);
          const data = await response.json();
          setCandidatos(data);
        } catch (error) {
          console.error("Error al obtener los postulantes:", error);
        }
      }
    };
    fetchCandidatos();
  }, [selectedVacante]); // Se ejecuta cada vez que cambia selectedVacante

  return (
    <div>
      <h1>Tabla de Candidatos</h1>
      
      {/* Filtro de Vacantes */}
      <label htmlFor="vacante">Selecciona una vacante: </label>
      <select 
        id="vacante"
        value={selectedVacante} 
        onChange={(e) => setSelectedVacante(e.target.value)} 
        style={{ padding: '8px', marginBottom: '20px' }}
      >
        <option value="">-- Selecciona una vacante --</option>
        {vacantes.map((vacante) => (
          <option key={vacante.id_vacante} value={vacante.id_vacante}>
            {vacante.vac_nombre}
          </option>
        ))}
      </select>

      {/* Tabla de Candidatos */}
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
        <thead>
          <tr style={{ backgroundColor: '#000', color: 'white' }}>
            <th style={{ padding: '15px' }}>Candidato</th>
            <th style={{ padding: '15px' }}>Total</th>
            <th style={{ padding: '15px' }}>Correo</th>
            <th style={{ padding: '15px' }}>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {candidatos.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ padding: '15px', textAlign: 'center' }}>No hay postulantes para esta vacante.</td>
            </tr>
          ) : (
            candidatos.map((dato) => (
              <tr key={dato.id_candidato} style={{ borderBottom: '1px solid #C9C9C9' }}>
                <td style={{ padding: '15px', fontSize: '16px' }}>{dato.candidato}</td>
                <td style={{ padding: '15px', fontSize: '16px' }}>{dato.total}</td>
                <td style={{ padding: '15px', fontSize: '16px' }}>{dato.correo}</td>
                <td style={{ padding: '15px', fontSize: '16px' }}>{dato.telefono}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TablaCandidatos;
