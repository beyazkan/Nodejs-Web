const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.js');
const isAdmin = require('../middleware/isAdmin.js');
const locals = require('../middleware/locals.js');

// Ön ek adres '/admin'
const prefix_url = '/admin'

//admin/add-product=> GET
router.get('/add-product', locals, isAdmin, adminController.getAddProduct);
//admin/add-product=> POST
router.post('/add-product', locals, isAdmin, adminController.postAddProduct);

//admin/edit-product=> GET
router.get('/edit-product/:productid', isAdmin, locals, adminController.getEditProduct);
//admin/edit-product=> POST

router.post('/edit-product', locals, isAdmin, adminController.postEditProduct);
router.get('/products/:productid', locals, isAdmin, adminController.getEditProduct);

router.get('/products', locals, isAdmin, adminController.getProducts);

router.post('/delete-product', locals, isAdmin, adminController.postDeleteProduct);

// Kategori Sayfaları
router.get('/add-category', locals, isAdmin, adminController.getAddCategory);
router.post('/add-category', locals, isAdmin, adminController.postAddCategory);
router.get('/edit-category/:categoryid', isAdmin, locals, adminController.getEditCategory);
router.post('/edit-category', locals, isAdmin, adminController.postEditCategory);
router.post('/delete-category', locals, isAdmin, adminController.postDeleteCategory);
router.get('/categories', locals, isAdmin, adminController.getCategories);

router.get('/', locals, isAdmin, adminController.adminIndex);

module.exports = router;