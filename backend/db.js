// backend/db.js
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// verificar la conexión
db.getConnection((err, connection) => {
  if (err) {
    console.error('Error en la conexión con la db:', err);
    return;
  }
  console.log('Conección exitosa.');
  connection.release();
});

/* const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'reclutamiento',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool.promise(); // Exporta como promesa
 */
module.exports = db;
