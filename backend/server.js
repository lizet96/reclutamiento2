const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el paquete cors
const authRoutes = require('./routes/auth'); 
const protectedRoutes = require('./routes/protectedRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000' 
  }));
  
app.use(bodyParser.json());

// Usa tus rutas
app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);

app.options('*', cors());

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
