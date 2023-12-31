const BadRequestError = require('./badRequestError');
const UnauthorizedError = require('./unauthorizedError');
const NotFoundError = require('./notFoundError');
const ConflictError = require('./conflictError');
const ForbiddenError = require('./forbiddenError');

module.exports = {
  BadRequestError, NotFoundError, UnauthorizedError, ConflictError, ForbiddenError,
};
