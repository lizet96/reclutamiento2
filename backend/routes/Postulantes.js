const express = require('express');
const router = express.Router();
const postulanteController = require('../controllers/postulanteController');

// Ruta para obtener vacantes por ID de empresa
router.get('/api/VacanteEmpresa', postulanteController.getVacantesEmpresa);

// Ruta para obtener postulantes con totalcompleto >= 80 por ID de vacante
router.get('/api/Postulantes', postulanteController.getPostulantes);

module.exports = router;
