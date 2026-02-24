const express = require('express');
const router = express.Router();
const { createProduct, getProducts, getProductBySlug } = require('../controllers/productController');

router.route('/').post(createProduct).get(getProducts);
router.route('/:slug').get(getProductBySlug);

module.exports = router;
