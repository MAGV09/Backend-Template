const { body } = require('express-validator');
const prisma = require('../lib/prisma');
const signUpValidation = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters')
    .custom(async (value, { req }) => {
      const user = await prisma.user.findFirst({ where: { username: value } });
      if (user) {
        throw new Error('Username already exists');
      }
    }),

  body('email').trim().notEmpty().isEmail().withMessage('Invalid email'),

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
