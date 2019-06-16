const joi = require('joi');

class PassportSchema {
  static budget() {
    return joi.object({
      initial_date: joi.date().required(),
      days: joi
        .integer()
        .min(1)
        .max(7)
        .required(),
      promotions: joi.array().items(joi.number()),
    });
  }
}

module.exports = PassportSchema;
