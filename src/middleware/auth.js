function requireAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
}

function redirectIfAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.status(403).json({ message: 'Already authenticated' });
  }
  next();
}

module.exports = { requireAuth, redirectIfAuthenticated };
