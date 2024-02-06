const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.js');
const isAuthenticated = require('../middleware/authentication.js');
const csrf = require('../middleware/csrf.js');

// Ön ek adres '/admin'
const prefix_url = '/admin'

//admin/add-product=> GET
router.get('/add-product', csrf, isAuthenticated, adminController.getAddProduct);
//admin/add-product=> POST
router.post('/add-product', csrf, isAuthenticated, adminController.postAddProduct);

//admin/edit-product=> GET
router.get('/edit-product/:productid', isAuthenticated, csrf, adminController.getEditProduct);
//admin/edit-product=> POST

router.post('/edit-product', csrf, isAuthenticated, adminController.postEditProduct);
router.get('/products/:productid', csrf, isAuthenticated, adminController.getEditProduct);

router.get('/products', csrf, isAuthenticated, adminController.getProducts);

router.post('/delete-product', csrf, isAuthenticated, adminController.postDeleteProduct);

// Kategori Sayfaları
router.get('/add-category', csrf, isAuthenticated, adminController.getAddCategory);
router.post('/add-category', csrf, isAuthenticated, adminController.postAddCategory);
router.get('/edit-category/:categoryid', isAuthenticated, csrf, adminController.getEditCategory);
router.post('/edit-category', csrf, isAuthenticated, adminController.postEditCategory);
router.post('/delete-category', csrf, isAuthenticated, adminController.postDeleteCategory);
router.get('/categories', csrf, isAuthenticated, adminController.getCategories);

router.get('/', csrf, isAuthenticated, adminController.adminIndex);

module.exports = router;