import React, { useEffect, useState } from 'react';
import { Radar } from 'react-chartjs-2';
import styled from 'styled-components'; // Importa styled-components
import { Chart as ChartJS, CategoryScale, RadialLinearScale, Title, Tooltip, Legend, PointElement, LineElement, Filler } from 'chart.js';

ChartJS.register(CategoryScale, RadialLinearScale, Title, Tooltip, Legend, PointElement, LineElement, Filler);

const Resultados = ({ setView }) => {
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/resultados')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error en la respuesta del servidor: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setResultados(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener los resultados:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleRedirectToHome = () => setView("vacantes");

  if (loading) {
    return <div>Cargando resultados...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const vacantes = resultados.reduce((acc, resultado) => {
    const { vacante_nombre, formulario_nombre, habilidad_nombre, promedio_respuestas_correctas } = resultado;

    if (!acc[vacante_nombre]) {
      acc[vacante_nombre] = [];
    }

    acc[vacante_nombre].push({
      formulario_nombre,
      habilidad_nombre,
      promedio_respuestas_correctas: parseFloat(promedio_respuestas_correctas),
    });

    return acc;
  }, {});

  const obtenerDatosGrafica = (vacante) => {
    const formularios = vacantes[vacante];
    const habilidades = formularios.map((formulario) => formulario.habilidad_nombre);
    const promedios = formularios.map((formulario) => formulario.promedio_respuestas_correctas);

    return {
      labels: habilidades,
      datasets: [
        {
          label: 'Promedio de Respuestas Correctas (%)',
          data: promedios,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };


  return (
    <ResultadosContainer>
      <h2>Resultados del Formulario</h2>

      {/* Botón para ir a la página de Vacantes */}
      <HomeButtonContainer>
        <button onClick={handleRedirectToHome}>
          <i className="fas fa-home"></i>
          <span>Home</span>
        </button>
      </HomeButtonContainer>

      {Object.keys(vacantes).length > 0 ? (
        Object.keys(vacantes).map((vacante, index) => {
          const formularios = vacantes[vacante];
          return (
            <VacanteResultados key={index}>
              <h3>Vacante: {vacante}</h3>

              {/* Mostrar gráficos y resultados en una fila */}
              <GraficaYTablaContainer>
                {/* Gráfica de radar */}
                <GraficaContainer>
                  <Radar
                    data={obtenerDatosGrafica(vacante)}
                    options={{
                      responsive: true,
                      plugins: {
                        title: {
                          display: true,
                          text: `Promedio de Respuestas para Vacante: ${vacante}`,
                        },
                      },
                      scales: {
                        r: {
                          min: 0,
                          max: 100,
                          ticks: {
                            stepSize: 10,
                          },
                        },
                      },
                    }}
                  />
                </GraficaContainer>

                {/* Tabla con resultados */}
                <TablaResultados>
                  {formularios.map((formulario, idx) => {
                    return (
                      <FormularioResultados key={idx}>
                        <h4>Habilidad: {formulario.habilidad_nombre}</h4>
                        <p>Promedio de respuestas correctas: {formulario.promedio_respuestas_correctas}</p>
                      </FormularioResultados>
                    );
                  })}
                </TablaResultados>
              </GraficaYTablaContainer>
            </VacanteResultados>
          );
        })
      ) : (
        <div>No se encontraron resultados.</div>
      )}

    </ResultadosContainer>
  );
};

// Estilos con styled-components
const ResultadosContainer = styled.div`
  padding: 20px;
`;

const HomeButtonContainer = styled.div`
  margin: 20px 0;
  button {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
      background-color: #0056b3;
    }

    i {
      margin-right: 10px;
    }
  }
`;

const VacanteResultados = styled.div``;

const GraficaYTablaContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;  // Permite que los elementos se ajusten en pantallas más pequeñas
`;


const GraficaContainer = styled.div`
  flex: 1;
  min-width: 300px;  // Asegura que la gráfica no se vuelva demasiado pequeña en pantallas pequeñas
`;

const TablaResultados = styled.div`
  flex: 1;
  min-width: 300px;  // Asegura que la tabla no se vuelva demasiado pequeña en pantallas pequeñas
`;

const FormularioResultados = styled.div``;



export default Resultados;


