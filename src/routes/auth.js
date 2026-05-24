const { Router } = require('express');
const router = Router();
const {
  createUser,
  handleLogin,
  handleLogout,
} = require('../controllers/Auth.controller');

const validateRequest = require('../middleware/validateRequest');
const { signUpValidation, loginValidation } = require('../validation/auth');

router.post('/sign-up', validateRequest(signUpValidation), createUser);
router.post('/login', validateRequest(loginValidation), handleLogin);
router.post('/logout', handleLogout);

module.exports = router;
