const express = require('express');
const router = express.Router();
const { createVariant, getVariants } = require('../controllers/variantController');

router.route('/').post(createVariant).get(getVariants);

module.exports = router;
