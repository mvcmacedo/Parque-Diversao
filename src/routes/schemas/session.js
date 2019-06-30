const joi = require('joi');

class SessionSchema {
  static create() {
    return joi
      .object({
        email: joi.string(),
        username: joi.string(),
        password: joi.string().required(),
      })
      .required();
  }
}

module.exports = SessionSchema;
