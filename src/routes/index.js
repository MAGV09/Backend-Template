const { Router } = require('express');
const indexRouter = Router();
const { getHomepage } = require('../controllers/Index.controller');

indexRouter.get('/', getHomepage);

module.exports = indexRouter;
