const express = require('express');
const { verifyToken, requireRole } = require('../middlewares/authMiddleware');
const USER_TYPES = require('../config/userTypes');

const router = express.Router();

router.get('/admin-area', verifyToken, requireRole(USER_TYPES.ADMIN), (req, res) => {
  res.json({ message: "Bienvenido al área de administración" });
});

router.get('/client-area', verifyToken, requireRole(USER_TYPES.CLIENT), (req, res) => {
  res.json({ message: "Bienvenido al área de clientes" });
});

module.exports = router;
