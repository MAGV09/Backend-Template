const { Router } = require('express');
const authRouter = Router();
const {
  getSignUpPage,
  createUser,
  getLoginPage,
  handleLogin,
  handleLogout,
} = require('../controllers/Auth.controller');
const { redirectIfAuthenticated } = require('../middleware/auth');
const validateRequest = require('../middleware/validateRequest');
const { signUpValidation, loginValidation } = require('../validation/auth');

authRouter.get('/sign-up', redirectIfAuthenticated, getSignUpPage);

authRouter.post('/sign-up', validateRequest(signUpValidation), createUser);

authRouter.get('/login', redirectIfAuthenticated, getLoginPage);

authRouter.post('/login', validateRequest(loginValidation), handleLogin);

authRouter.get('/logout', handleLogout);

module.exports = authRouter;
