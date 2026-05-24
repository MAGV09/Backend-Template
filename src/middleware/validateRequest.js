const { validationResult } = require('express-validator');

const validateRequest = (validators) => async (req, res, next) => {
  await Promise.all(validators.map((validator) => validator.run(req)));
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = validateRequest;
