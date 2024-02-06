const express = require('express');
const router = express.Router();
const csrf = require('../middleware/csrf.js');

const shopController = require('../controllers/shop.js');
const isAuthenticated = require('../middleware/authentication.js');

router.get('/', csrf, shopController.getIndex);
router.get('/products', csrf, shopController.getProducts);
router.get('/product/details/:productid', csrf, shopController.getProduct);
router.get('/categories/:categoryid', csrf, shopController.getProductsByCategoryId);
router.get('/cart', csrf, shopController.getCart);
router.post('/cart', csrf, shopController.postCart);
router.post('/delete-cartItem', csrf, shopController.postCartItemDelete);
router.get('/orders', csrf, shopController.getOrders);
router.post('/create-order', csrf, shopController.postOrder);


module.exports = router;