class RouterNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'RouterNotFoundError';
    this.statusCode = 404;
  }
}

module.exports = RouterNotFoundError;
