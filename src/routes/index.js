const { Router } = require('express');
const indexRouter = Router();
const { getHomepage } = require('../controllers/Index.controller');
const {requireAuth} = require('../middleware/auth')
indexRouter.get('/',requireAuth, getHomepage);

module.exports = indexRouter;
