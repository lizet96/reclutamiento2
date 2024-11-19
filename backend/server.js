require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el paquete cors
const authRoutes = require('./routes/auth'); 
const protectedRoutes = require('./routes/protectedRoutes');
const profileRoutes = require('./routes/profileRoutes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000' 
  }));
  
app.use(bodyParser.json());

// Usa tus rutas
app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);
app.use('/api/profile', profileRoutes);
app.options('*', cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
