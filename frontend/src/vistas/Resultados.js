import React, { useEffect, useState } from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, RadialLinearScale, Title, Tooltip, Legend, PointElement, LineElement, Filler } from 'chart.js';
import { useNavigate } from 'react-router-dom';  // Importar useNavigate
import Header from "../componentes/Header";
import NavigationBar from "../componentes/NavigationBar";
import ApiUrl from "../config/ApiUrl";

ChartJS.register(CategoryScale, RadialLinearScale, Title, Tooltip, Legend, PointElement, LineElement, Filler);

const Resultados = ({ user }) => {
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Inicializar useNavigate

  useEffect(() => {
    fetch(`${ApiUrl}resultados`)
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

  const datosInventados = {
    labels: ['Habilidad 1', 'Habilidad 2', 'Habilidad 3', 'Habilidad 4', 'Habilidad 5'],
    datasets: [
      {
        label: 'Promedio Inventado (%)',
        data: [80, 75, 90, 85, 70],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div
      className="resultados-container"
      style={{
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'auto',
      }}
    >
      <Header />
      <NavigationBar user={user} />
      <h2
        style={{
          textAlign: 'center',
          fontSize: '24px',
          color: '#333',
          marginBottom: '20px',
        }}
      >
        Resultados del Formulario
      </h2>

  
      {Object.keys(vacantes).length > 0 ? (
        Object.keys(vacantes).map((vacante, index) => {
          const formularios = vacantes[vacante];
          return (
            <div key={index} className="vacante-resultados" style={{ marginBottom: '30px' }}>
              <h3
                style={{
                  fontSize: '20px',
                  color: '#555',
                  marginBottom: '10px',
                }}
              >
                Vacante: {vacante}
              </h3>

              {/* Mostrar gráficos y resultados en una fila */}
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                {/* Gráfica de radar */}
                <div
                  className="grafica-container"
                  style={{
                    flex: 1,
                    height: '40vh',
                    width: '100%',
                  }}
                >
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
                </div>

                {/* Tabla con resultados */}
                <div
                  className="tabla-resultados"
                  style={{
                    flex: 1,
                    overflowX: 'auto',
                  }}
                >
                  {formularios.map((formulario, idx) => {
                    return (
                      <div key={idx} className="formulario-resultados" style={{ marginBottom: '20px' }}>
                        <h4
                          style={{
                            fontSize: '18px',
                            color: '#666',
                          }}
                        >
                          Habilidad: {formulario.habilidad_nombre}
                        </h4>
                        <p>Promedio de respuestas correctas: {formulario.promedio_respuestas_correctas}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>No se encontraron resultados.</div>
      )}

      {/* Gráfica de radar con datos inventados */}
      <div
        className="grafica-inventada"
        style={{
          marginTop: '40px',
          height: '40vh',
          width: '100%',
        }}
      >
        <Radar
          data={datosInventados}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Gráfica de Radar con Datos Inventados',
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
      </div>
    </div>
  );
};

export default Resultados;
