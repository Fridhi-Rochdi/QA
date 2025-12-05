const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Erreur de validation Sequelize
  if (err.name === 'SequelizeValidationError') {
    const errors = err.errors.map(e => e.message);
    return res.status(400).json({ error: 'Erreur de validation', details: errors });
  }

  // Erreur de contrainte unique
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({ error: 'Cette valeur existe déjà' });
  }

  // Erreur JWT
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Token invalide' });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'Token expiré' });
  }

  // Erreur par défaut
  res.status(err.statusCode || 500).json({
    error: err.message || 'Erreur serveur',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

const notFound = (req, res, next) => {
  res.status(404).json({ error: `Route non trouvée - ${req.originalUrl}` });
};

module.exports = { errorHandler, notFound };
