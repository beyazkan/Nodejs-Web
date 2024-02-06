const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.js');
const isAuthenticated = require('../middleware/authentication.js');
const csrf = require('../middleware/csrf.js');

// Ön ek adres '/admin'
const prefix_url = '/admin'

//admin/add-product=> GET
router.get('/add-product', csrf, adminController.getAddProduct);
//admin/add-product=> POST
router.post('/add-product', csrf, adminController.postAddProduct);

//admin/edit-product=> GET
router.get('/edit-product/:productid', csrf, adminController.getEditProduct);
//admin/edit-product=> POST

router.post('/edit-product', csrf, adminController.postEditProduct);
router.get('/products/:productid', csrf, adminController.getEditProduct);

router.get('/products', csrf, adminController.getProducts);

router.post('/delete-product', csrf, adminController.postDeleteProduct);

// Kategori Sayfaları
router.get('/add-category', csrf, adminController.getAddCategory);
router.post('/add-category', csrf, adminController.postAddCategory);
router.get('/edit-category/:categoryid', csrf, adminController.getEditCategory);
router.post('/edit-category', csrf, adminController.postEditCategory);
router.post('/delete-category', csrf, adminController.postDeleteCategory);
router.get('/categories', csrf, adminController.getCategories);

router.get('/', csrf, adminController.adminIndex);

module.exports = router;