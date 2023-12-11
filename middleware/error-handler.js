module.exports = function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  console.error(err.stack);
  res.status(err.status || 500);
  res.json({ error: err.message || 'Internal Server Error' });
};
