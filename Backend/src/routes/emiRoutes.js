const express = require('express');
const router = express.Router();
const { createEMI, getEMIs } = require('../controllers/emiController');

router.route('/').post(createEMI).get(getEMIs);

module.exports = router;
