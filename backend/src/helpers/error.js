/* eslint-disable camelcase */

module.exports = function ParqueError(message, http_code) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
  this.http_code = http_code;
};
