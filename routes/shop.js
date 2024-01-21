const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop.js');

router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/product/details/:productid', shopController.getProduct);
router.get('/categories/:categoryid', shopController.getProductsByCategoryId);
router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart);
router.post('/delete-cartItem', shopController.postCartItemDelete);
router.get('/orders', shopController.getOrders);


module.exports = router;