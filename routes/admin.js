const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.js');

// Ön ek adres '/admin'
const prefix_url = '/admin'

//admin/add-product=> GET
router.get('/add-product', adminController.getAddProduct);

//admin/add-product=> POST
router.post('/add-product', adminController.postAddProduct);
//admin/edit-product=> GET
// router.get('/edit-product/:productid', adminController.getEditProduct);
//admin/edit-product=> POST
// router.post('/edit-product', adminController.postEditProduct);

// router.get('/products', adminController.getProducts)
// router.post('/delete-product', adminController.postDeleteProduct);
// router.get('/', adminController.adminIndex);

module.exports = router;