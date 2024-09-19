const express = require('express');
const router = express.Router();
const controller = require('./controller');

const auth = require('../middleware/auth');

router.get('/surveys/:id',auth, controller.results);
router.post('/surveys',auth, controller.createResponses);

module.exports = router