// server.js

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protectedRoutes');
const vacanteRoutes = require('./routes/vacanteRoutes');
const vacanteHabilidadRoutes = require('./routes/vacanteHabilidadRoutes'); // Nueva ruta
const profileRoutes = require('./routes/profileRoutes');
const formularios = require("./routes/formularios"); // Importa las rutas de formularios
const preguntas = require("./routes/preguntas"); // Importa las rutas de preguntas
const respuestasRoutes = require('./routes/respuestas'); // Importa las rutas

// Importa las rutas que has definido
const resultadosRoutes = require('./routes/resultadosRoutes');

const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

const mysql = require('mysql');

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost', // Cambia por el host de tu base de datos
  user: 'root', // Cambia por el usuario de tu base de datos
  password: '', // Cambia por la contraseña de tu base de datos
  database: 'reclutamiento', // Cambia por el nombre de tu base de datos
});

// Middleware
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);
app.use(bodyParser.json());

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1); // Termina la aplicación si no puede conectarse
  }
  console.log('Conexión exitosa a la base de datos');
});

// Rutas
app.get('/api/empresas', (req, res) => {
  const query = 'SELECT id_empresa, emp_nombre FROM empresas';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error al obtener las empresas:', err);
      return res.status(500).send('Error al obtener las empresas');
    }
    res.json(result);
  });
});

app.get('/api/categorias', (req, res) => {
  const query = 'SELECT id_categoria, cat_nombre FROM categoriavacante';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error al obtener las categorías:', err);
      return res.status(500).send('Error al obtener las categorías');
    }
    res.json(result);
  });
});

// Controlador para obtener todas las vacantes
app.get('/api/vacantes', (req, res) => {
  const query = 'SELECT id_vacante, vac_nombre, vac_descripcion, fecha_inicio, fecha_fin, sueldoMensual FROM vacante'; // Modifica según las columnas de tu tabla vacante
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error al obtener las vacantes:', err);
      return res.status(500).send('Error al obtener las vacantes');
    }
    res.json(result);  // Devuelve los resultados como JSON
  });
});


app.get('/api/habilidades', (req, res) => {
  const query = 'SELECT id_habilidad, hab_nombre FROM habilidad';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error al obtener las habilidades:', err);
      return res.status(500).send('Error al obtener las habilidades');
    }
    res.json(result);
  });
});

// Montar las rutas
app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);
app.use('/api/vacante', vacanteRoutes);
app.use('/api/vacantehabilidad', vacanteHabilidadRoutes); // Montar la nueva ruta
app.use('/api/profile', profileRoutes);
app.use("/api", formularios); // Agrega las rutas de formularios
app.use("/api", preguntas); // Agrega las rutas de formularios
app.use('/api', respuestasRoutes);  // Registra las rutas de respuestas
// Usa las rutas definidas en el archivo de rutas
app.use(resultadosRoutes);


// Rutas estáticas
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
