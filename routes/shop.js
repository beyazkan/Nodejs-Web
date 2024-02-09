const express = require('express');
const router = express.Router();
const locals = require('../middleware/locals.js');

const shopController = require('../controllers/shop.js');
const isAuthenticated = require('../middleware/authentication.js');

router.get('/', locals, shopController.getIndex);
router.get('/products', locals, shopController.getProducts);
router.get('/product/details/:productid', locals, shopController.getProduct);
router.get('/categories/:categoryid', locals, shopController.getProductsByCategoryId);
router.get('/cart', locals, isAuthenticated, shopController.getCart);
router.post('/cart', locals, isAuthenticated, shopController.postCart);
router.post('/delete-cartItem', locals, isAuthenticated, shopController.postCartItemDelete);
router.get('/orders', locals, isAuthenticated, shopController.getOrders);
router.post('/create-order', locals, isAuthenticated, shopController.postOrder);


module.exports = router;