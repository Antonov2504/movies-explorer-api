class CorsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CorsError';
    this.statusCode = 401;
  }
}

module.exports = CorsError;
