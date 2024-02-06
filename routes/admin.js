const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.js');
const isAuthenticated = require('../middleware/authentication.js');

// Ön ek adres '/admin'
const prefix_url = '/admin'

//admin/add-product=> GET
router.get('/add-product', isAuthenticated, adminController.getAddProduct);
//admin/add-product=> POST
router.post('/add-product', isAuthenticated, adminController.postAddProduct);

//admin/edit-product=> GET
router.get('/edit-product/:productid', isAuthenticated, adminController.getEditProduct);
//admin/edit-product=> POST

router.post('/edit-product', isAuthenticated, adminController.postEditProduct);
router.get('/products/:productid', isAuthenticated, adminController.getEditProduct);

router.get('/products', isAuthenticated, adminController.getProducts);

router.post('/delete-product', isAuthenticated, adminController.postDeleteProduct);

// Kategori Sayfaları
router.get('/add-category', isAuthenticated, adminController.getAddCategory);
router.post('/add-category', isAuthenticated, adminController.postAddCategory);
router.get('/edit-category/:categoryid', isAuthenticated, adminController.getEditCategory);
router.post('/edit-category', isAuthenticated, adminController.postEditCategory);
router.post('/delete-category', isAuthenticated, adminController.postDeleteCategory);
router.get('/categories', isAuthenticated, adminController.getCategories);

router.get('/', isAuthenticated, adminController.adminIndex);

module.exports = router;