const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Acceso denegado" });

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) return res.status(401).json({ error: "Token inválido" });
    req.user = decoded;
    next();
  });
}

function requireRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) return res.status(403).json({ error: "No tienes permiso para acceder" });
    next();
  };
}

module.exports = { verifyToken, requireRole };
