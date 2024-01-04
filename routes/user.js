const express = require('express');
const router = express.Router();

const admin = require('./admin');
const productsController = require('../controllers/products.js');

router.get('/', productsController.getProducts);

module.exports = router;