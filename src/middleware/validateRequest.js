const { validationResult } = require('express-validator');

const validateRequest = (validators) => async (req, res, next) => {
  await Promise.all(validators.map((validator) => validator.run(req)));
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.locals.validationErrors = errors.array();
    res.locals.formData = req.body;
  }
  next();
};

module.exports = validateRequest;
