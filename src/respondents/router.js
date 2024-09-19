const express = require('express');
const router = express.Router();
const controller = require('./controller');

const auth = require('../middleware/auth');

router.get('/respondents',auth, controller.listRespondents);
router.post('/respondents',auth, controller.createRespondents);
router.put('/respondents/:id',auth, controller.updateRespondents);
router.delete('/respondents/:id',auth, controller.deleteRespondents);


module.exports = router