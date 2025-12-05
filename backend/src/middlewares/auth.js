const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Middleware pour protéger les routes
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Récupérer le token depuis le header
      token = req.headers.authorization.split(' ')[1];

      // Vérifier le token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Récupérer l'utilisateur depuis la base de données
      req.user = await User.findByPk(decoded.id);

      if (!req.user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé' });
      }

      if (!req.user.isActive) {
        return res.status(401).json({ error: 'Compte désactivé' });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ error: 'Non autorisé, token invalide' });
    }
  }

  if (!token) {
    return res.status(401).json({ error: 'Non autorisé, aucun token fourni' });
  }
};

// Middleware pour vérifier les rôles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Non authentifié' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: `Le rôle ${req.user.role} n'est pas autorisé à accéder à cette ressource` 
      });
    }

    next();
  };
};

module.exports = { protect, authorize };
