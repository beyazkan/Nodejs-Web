const Product = require('../models/product.js');

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        title: 'Ürün Ekle',
        path: '/admin/add-product'
    });
};

exports.postAddProduct = (req, res, next) => {
    // Database Kayıt
    console.log(req.body);
    const product = new Product(
        req.body.name, 
        req.body.price, 
        req.body.imageUrl, 
        req.body.description
        );
    product.saveProduct();
    //res.redirect(prefix_url);
    res.redirect('/');
};

exports.adminIndex = (req, res, next) => {
    res.render('admin-index', {
        title: 'Admin Anasayfa',
        path: '/admin'
    });
};