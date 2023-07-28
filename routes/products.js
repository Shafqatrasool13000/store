const express = require('express');
const { getAllProducts, getProductsStatic } = require('../controllers/products');


const router = express.Router();

router.route('/').get(getAllProducts);
router.route('/static').get(getProductsStatic)

module.exports = router;