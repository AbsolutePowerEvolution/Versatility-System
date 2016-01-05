module.exports = class ValidationError extends Error {
  constructor(errors, options, attributes, constraints) {
    super('Validation error');
    Error.captureStackTrace(this, this.constructor);
    this.name = 'ValidationError';
    this.errors = errors;
    this.options = options;
    this.attributes = attributes;
    this.constraints = constraints;
  }
};
