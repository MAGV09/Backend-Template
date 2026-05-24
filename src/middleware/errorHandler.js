const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const message = err.expose ? err.message : 'Internal Server Error';
  res.status(err.statusCode || 500).send(message);
};

module.exports = errorHandler;
