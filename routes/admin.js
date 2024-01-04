const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.js');

// Ön ek adres '/admin'
const prefix_url = '/admin'

// /admin/add-product=> GET
router.get('/add-product', productsController.getAddProduct);

// /admin/add-product=> POST
router.post('/add-product', productsController.postAddProduct);
router.get('/', productsController.adminIndex);

module.exports = router;