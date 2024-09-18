const express = require('express');
const router = express.Router();
const controller = require('./controller');

const auth = require('../middleware/auth');

router.get('/candidates',auth, controller.listCandidate);
router.post('/candidates',auth, controller.createCandidate);
router.put('/candidates/:id',auth, controller.updateCandidate);
router.delete('/candidates/:id',auth, controller.deleteCandidate);


module.exports = router