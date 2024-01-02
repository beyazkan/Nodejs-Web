const express = require('express');
const router = express.Router();

const path = require('path');
// Ön ek adres '/admin'
const prefix_url = '/admin'

// /admin/add-product=> GET
router.get('/add-product', (req, res, next) => {
    res.render('add-product', {title: 'Ürün Ekle'});
});

// /admin/add-product=> POST
router.post('/add-product', (req, res, next) => {
    // Database Kayıt
    console.log(req.body);
    res.redirect(prefix_url);
});
router.get('/', (req, res, next) => {
    res.render('admin-index', {title: 'Admin Anasayfa'});
});

module.exports = router;