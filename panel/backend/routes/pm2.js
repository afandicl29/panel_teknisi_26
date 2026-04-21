const express = require('express');
const router = express.Router();
const pm2 = require('../controllers/pm2Controller');

router.post('/start', pm2.startApp);
router.post('/stop', pm2.stopApp);
router.get('/list', pm2.listApps);

module.exports = router;