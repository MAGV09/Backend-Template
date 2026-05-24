const { body } = require('express-validator');
const pool = require('../config/database');
const signUpValidation = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters')
    .custom(async (value, { req }) => {
      const { rows } = await pool.query('SELECT username FROM users WHERE username=$1', [value]);
      const user = rows[0];
      if (user) {
        throw new Error('Username already exists');
      }
    }),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),

  body('confirmPassword')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match'),
];

const loginValidation = [
  body('username').trim().isLength({ max: 50 }),
  body('password').isLength({ max: 100 }),
];

module.exports = { signUpValidation, loginValidation };
