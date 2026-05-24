const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const message = err.expose ? err.message : 'Internal Server Error';
  res.status(err.statusCode || 500).json({ message });
};

module.exports = errorHandler;
