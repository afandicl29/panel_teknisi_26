// backend/routes/dbRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../controllers/dbController');

router.post('/create', db.createDb);
router.post('/delete', db.deleteDb);
router.post('/user', db.createUser);
router.post('/grant', db.grant);
router.get('/list', db.list);

module.exports = router;