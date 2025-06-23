const express = require('express');
const router = express.Router();
const pumpController = require('../controllers/pumpController');

router.post('/', pumpController.controlPump);

module.exports = router;
