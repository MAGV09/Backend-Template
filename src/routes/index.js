const { Router } = require('express');
const router = Router();
const { getHomepage } = require('../controllers/Index.controller');
const {requireAuth} = require('../middleware/auth')

router.get('/',requireAuth, getHomepage);
module.exports = router;
